const express = require('express');
const { Item } = require('../../db/models');

const router = express.Router();

function toObj(arr) {
    const obj = {};
    arr.forEach(ele => obj[ele.id] = ele);
    return obj;
};

// GET ALL ITEMS
router.get('/', async (req, res) => {
    const items = await Item.findAll();
    return res.json(toObj(items));
});

// GET ONE ITEM
router.get('/:itemId', async (req, res) => {
    const item = await Item.findByPk(req.params.itemId);
    return res.json(item);
});

// POST ITEM
router.post('/', async (req , res) => {
    const item = await Item.create(req.body);
    return res.json(item);
});

// PUT ITEM
router.put('/:itemId', async (req, res) => {
    const item = await Item.findByPk(req.params.itemId);
    await item.update(req.body);
    await item.save();
    return res.json(item);
});

// DELETE ITEM
router.delete('/:itemId', async (req, res) => {
    const item = await Item.findByPk(req.params.itemId);
    await item.destroy();
});

module.exports = router;
