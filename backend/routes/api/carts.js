const express = require('express');
const { Item, Cart, Cart_Item } = require('../../db/models');

const router = express.Router();

// GET CART
router.get('/:id', async (req, res) => {
    const cart = await Cart.findOne({ where: { userId: req.params.id } });
    const cartItems = await Cart_Item.findAll({ where: { cartId: cart.id } });
    const items = {};
    for (let cartItem of cartItems) {
        const item = await Item.findByPk(cartItem.itemId);
        items[item.id] = { item, cartItem };
    };
    return res.json({ cart, items });
});

// POST CART ITEM
router.post('/', async (req, res) => {
    const cartItem = await Cart_Item.create(req.body);
    const item = await Item.findByPk(cartItem.itemId);
    return res.json({ item, cartItem });
});

// PUT CART ITEM
router.put('/', async (req, res) => {
    const { cartId, itemId, quantity } = req.body;
    const cartItem = await Cart_Item.findOne({ where: { cartId, itemId } });
    await cartItem.update({ quantity });
    await cartItem.save();
    const item = await Item.findByPk(cartItem.itemId);
    return res.json({ item, cartItem });
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
