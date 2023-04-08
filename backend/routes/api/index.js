const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const itemsRouter = require('./items.js');
const cartsRouter = require('./carts.js');
const ordersRouter = require('./orders');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/items', itemsRouter);
router.use('/carts', cartsRouter);
router.use('/orders', ordersRouter);

module.exports = router;
