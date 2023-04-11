const express = require('express');
const { Item, Cart_Item, Order, Order_Item } = require('../../db/models');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); 

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
    const line_items = [];

    for (let cartItem of cartItems) {
        const item = await Item.findByPk(cartItem.itemId);

        if (cartItem.quantity > item.stock) {
            throw new Error(`Only ${item.stock} ${item.name} are available`);
        };

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

    const stripeCheckout = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${process.env.CORS_ORIGIN}/stripe-checkout/success/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CORS_ORIGIN}/stripe-checkout/cancel/{CHECKOUT_SESSION_ID}`,
    });

    return res.json(stripeCheckout);
});

    // const confirmationNumber = stripeCheckout.id;
    // const newOrder = await Order.create({ userId, userFirstName, userLastName, userEmail, userPhoneNumber, confirmationNumber, netTotal: netTotal.toFixed(2) });

    // for (let cartItem of cartItems) {
    //     const item = await Item.findByPk(cartItem.itemId);
    //     await item.update({ stock: item.stock - cartItem.quantity });
    //     await item.save();
    //     await Order_Item.create({ orderId: newOrder.id, itemName: item.name, itemDescription: item.description, itemPrice: item.price, itemQuantity: cartItem.quantity, netTotal: (item.price * cartItem.quantity).toFixed(2) });
    // };

    // const order = await Order.findByPk(newOrder.id, { include: { model: Order_Item, as: 'orderItems' } });
    // return res.json(order);

module.exports = router;