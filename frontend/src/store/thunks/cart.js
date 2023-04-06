import { csrfFetch } from "../csrf";

export const GET_CART = 'cart/getCart';
export const POST_CART = 'cart/postCart';
export const POST_CART_ITEM = 'cart/postCartItem';
export const PUT_CART_ITEM = 'cart/putCartItem';
export const DELETE_CART_ITEM = 'cart/deleteCartItem';
export const DELETE_CART_ITEMS = 'cart/deleteCartItems';

const getCart = cart => {
    return {
        type: GET_CART,
        cart
    };
};

const postCart = cart => {
    return {
        type: POST_CART,
        cart
    };
};

const postCartItem = cartItem => {
    return {
        type: POST_CART_ITEM,
        cartItem
    };
};

const putCartItem = cartItem => {
    return {
        type: PUT_CART_ITEM,
        cartItem
    };
};

const deleteCartItem = cartItemId => {
    return {
        type: DELETE_CART_ITEM,
        cartItemId
    };
};

const deleteCartItems = () => {
    return {
        type: DELETE_CART_ITEMS
    };
};

export const getOneCart = cartId => async dispatch => {
    const response = await csrfFetch(`/api/carts/${cartId}`);
    const cart = await response.json();
    dispatch(getCart(cart));
    return cart;
};

export const postOneCart = userId => async dispatch => {
    const response = await csrfFetch('/api/carts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    });
    const cart = await response.json();
    dispatch(postCart(cart));
    return cart;
};

export const postOneCartItem = data => async dispatch => {
    const response = await csrfFetch('/api/carts/new-cart-item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const cartItem = await response.json();
    dispatch(postCartItem(cartItem));
    return cartItem;
};

export const putOneCartItem = data => async dispatch => {
    const response = await csrfFetch('/api/carts', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const cartItem = await response.json();
    dispatch(putCartItem(cartItem));
    return cartItem;
};

export const deleteOneCartItem = cartItemId => async dispatch => {
    await csrfFetch(`/api/carts/delete-cart-item/${cartItemId}`, { method: 'DELETE' })
        .then(dispatch(deleteCartItem(cartItemId)));
};

export const deleteAllCartItems = cartId => async dispatch => {
    await csrfFetch(`/api/carts/delete-cart-item/${cartId}`, { method: 'DELETE' })
        .then(dispatch(deleteCartItems()));
};
