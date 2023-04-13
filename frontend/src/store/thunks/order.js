import { csrfFetch } from "../csrf";

export const GET_ORDERS = 'orders/getOrders';
export const GET_ORDER = 'orders/getOrder';
export const POST_ORDER = 'orders/postOrder';

const getOrders = orders => {
    return {
        type: GET_ORDERS,
        orders
    };
};

const getOrder = order => {
    return {
        type: GET_ORDER,
        order
    };
};

const postOrder = order => {
    return {
        type: POST_ORDER,
        order
    };
};

export const getAllOrders = userId => async dispatch => {
    const response = await csrfFetch(`/api/orders/user-orders/${userId}`);
    const orders = await response.json();
    dispatch(getOrders(orders))
    return orders;
};

export const getOneOrder = orderId => async dispatch => {
    const response = await csrfFetch(`/api/orders/one-order/${orderId}`);
    const order = await response.json();
    dispatch(getOrder(order));
    return order;
};

export const postOneOrder = data => async dispatch => {
    const response = await csrfFetch('/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const order = await response.json();
    if (order) {
        dispatch(postOrder(order));
        return order;
    };
};

export const checkout = cartId => async () => {
    const response = await csrfFetch(`/api/orders/checkout/${cartId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const stripeCheckout = response.json();
    return stripeCheckout;
};
