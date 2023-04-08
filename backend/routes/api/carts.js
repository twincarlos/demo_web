const express = require('express');
const { Item, Cart, Cart_Item } = require('../../db/models');

const router = express.Router();

// GET CART
router.get('/:id', async (req, res) => {
    console.log(req.params.id);
    const cart = await Cart.findOne({ where: { userId: req.params.id } });
    const cartItems = await Cart_Item.findAll({ where: { cartId: cart.id } });
    const items = {};
    for (let cartItem of cartItems) {
        const item = await Item.findByPk(cartItem.itemId);
        items[item.id] = { ...item.dataValues, ...cartItem.dataValues };
    };
    return res.json({ cartDetails: cart, cartItems: items });
});

// POST CART
router.post('/new-cart', async (req, res) => {
    const cart = await Cart.create(req.body);
    return res.json({ cartDetails: cart, cartItems: {} });
});

// POST CART ITEM
router.post('/', async (req, res) => {
    let cartItem;

    cartItem = await Cart_Item.findOne({ where: { cartId: req.body.cartId, itemId: req.body.itemId } });

    if (cartItem) {
        await cartItem.update({ quantity: cartItem.quantity + req.body.quantity });
    } else {
        cartItem = await Cart_Item.create(req.body);
    };
    
    const item = await Item.findByPk(cartItem.itemId);
    return res.json({ ...item.dataValues, ...cartItem.dataValues });
});

// PUT CART ITEM
router.put('/', async (req, res) => {
    const { cartId, itemId, quantity } = req.body;
    const cartItem = await Cart_Item.findOne({ where: { cartId, itemId } });
    await cartItem.update({ quantity });
    await cartItem.save();
    const item = await Item.findByPk(cartItem.itemId);
    return res.json({ ...item.dataValues, ...cartItem.dataValues });
});

// DELETE CART ITEM
router.delete('/delete-cart-item', async (req, res) => {
    const cartItem = await Cart_Item.findOne({ where: req.body });
    await cartItem.destroy();
    return res.json(req.body.itemId);
});

// DELETE ALL CART ITEMS
router.delete('/clear-cart/:id', async (req, res) => {
    const cartItems = await Cart_Item.findAll({ where: { cartId: req.params.id } });
    for (let cartItem of cartItems) await cartItem.destroy();
});

module.exports = router;
