const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie } = require('../../utils/auth');
const { User, Cart } = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('phoneNumber')
        .exists({ checkFalsy: true })
        .isLength({ min: 10 })
        .withMessage('Please provide a valid phone number'),
    check('firstName')
        .isLength({ min: 3 })
        .withMessage('Please provide a valid first name'),
    check('lastName')
        .isLength({ min: 3 })
        .withMessage('Please provide a valid last name'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
        const { phoneNumber, email, firstName, lastName, password, username } = req.body;
        const user = await User.signup({ phoneNumber, email, firstName, lastName, password, username });

        await setTokenCookie(res, user);

        const cart = await Cart.create({ userId: user.id });

        return res.json({
            user,
            cart: { cart, Items: {} }
        });
    }),
);

module.exports = router;
