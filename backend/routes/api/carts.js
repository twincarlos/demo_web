const express = require('express');
const { Item, Cart, Cart_Item } = require('../../db/models');

const router = express.Router();

// GET CART
router.get('/:id', async (req, res) => {
    const cart = await Cart.findOne({ where: { userId: req.params.id }});
    const cartItems = await Cart_Item.findAll({ where: { cartId: cart.id }, include: { model: Item, through: Cart_Item } });
    const items = {};
    cartItems.forEach(cartItem => items[cartItem.Item.id] = cartItem.Item);
    return res.json({ cart, Items: items });
});

// POST CART ITEM
router.post('/', async (req, res) => {
    const newCartItem = await Cart_Item.create(req.body);
    const cartItem = await Cart_Item.findByPk(newCartItem.id, { include: { model: Item, through: Cart_Item } });
    return res.json(cartItem.Item);
});

// PUT CART ITEM
router.put('/', async (req, res) => {
    const cartItem = await Cart_Item.findByPk(req.body.id);
    await cartItem.update(req.body);
    await cartItem.save();
    return res.json(cartItem);
});

// DELETE CART ITEM
router.delete('/delete-cart-item/:id', async (req, res) => {
    const cartItem = await Cart_Item.findByPk(req.params.id);
    await cartItem.destroy();
});

// DELETE ALL CART ITEMS
router.delete('/clear-cart/:id', async (req, res) => {
    const cartItems = await Cart_Item.findAll({ where: { cartId: req.params.id } });
    for (let cartItem of cartItems) await cartItem.destroy();
});

module.exports = router;
