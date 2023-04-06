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
router.get('/:id', async (req, res) => {
    const item = await Item.findByPk(req.params.id);
    return res.json(item);
});

// POST ITEM
router.post('/', async (req , res) => {
    const item = await Item.create(req.body);
    return res.json(item);
});

// PUT ITEM
router.put('/:id', async (req, res) => {
    const item = await Item.findByPk(req.params.id);
    await item.update(req.body);
    await item.save();
    return res.json(item);
});

// DELETE ITEM
router.delete('/:id', async (req, res) => {
    const item = await Item.findByPk(req.params.id);
    await item.destroy();
});

module.exports = router;
