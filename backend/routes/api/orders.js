const express = require('express');

const { Item, Cart, Cart_Item, Order, Order_Item } = require('../../db/models');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const ShortUniqueId = require('short-unique-id');

const router = express.Router();

// GET ALL ORDERS
router.get('/user-orders/:userId', async (req, res) => {
    const orders = await Order.findAll({ where: { userId: req.params.userId }, include: { model: Order_Item, as: 'orderItems' } });
    const ordersObj = {};
    orders.forEach(order => ordersObj[order.id] = order);
    return res.json(ordersObj);
});

// GET ONE ORDER
router.get('/one-order/:orderId', async (req, res) => {
    const order = await Order.findOne({ where: { orderId: req.params.orderId }, include: { model: Order_Item, as: 'orderItems' } });
    return res.json(order);
});

// CHECKOUT
router.post('/checkout/:cartId', async (req, res) => {
    const cartItems = await Cart_Item.findAll({ where: { cartId: req.params.cartId } });
    const cart = await Cart.findByPk(req.params.cartId);
    const line_items = [];
    let netTotal = 0.00;

    for (let cartItem of cartItems) {
        const item = await Item.findByPk(cartItem.itemId);

        if (cartItem.quantity > item.stock) {
            throw new Error(`Only ${item.stock} ${item.name} are available`);
        };

        netTotal += item.price * cartItem.quantity;

        line_items.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: cartItem.quantity
        });
    };

    const uuid = new ShortUniqueId({ length: 6 })().toUpperCase();

    const stripeCheckout = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${process.env.CORS_ORIGIN}/stripe-checkout/success/${uuid}/${req.params.cartId}/${cart.userId}/${netTotal.toFixed(2)}`,
        cancel_url: `${process.env.CORS_ORIGIN}/stripe-checkout/cancel/${uuid}/${req.params.cartId}/${cart.userId}/${netTotal.toFixed(2)}`,
    });

    return res.json(stripeCheckout);
});

// POST ORDER
router.post('/', async (req, res) => {
    const { userId, cartId, userFirstName, userLastName, userEmail, userPhoneNumber, confirmationNumber, netTotal } = req.body;

    const verifyOrder = await Order.findOne({ where: { confirmationNumber } });

    if (verifyOrder) {
        return res.json(null);
    };

    const newOrder = await Order.create({ userId, userFirstName, userLastName, userEmail, userPhoneNumber, confirmationNumber, netTotal });
    const cartItems = await Cart_Item.findAll({ where: { cartId } });

    for (let cartItem of cartItems) {
        const item = await Item.findByPk(cartItem.itemId);
        await Order_Item.create({ orderId: newOrder.id, itemName: item.name, itemImage: item.image, itemDescription: item.description, itemPrice: item.price, itemQuantity: cartItem.quantity, netTotal: (item.price * cartItem.quantity).toFixed(2) });
        item.update({ stock: item.stock - cartItem.quantity });
        item.save();
    };

    const order = await Order.findByPk(newOrder.id, { include: { model: Order_Item, as: 'orderItems' } });
    return res.json(order);
});

module.exports = router;
