import { csrfFetch } from '../csrf';

const GET_ITEMS = 'items/getItems';
const GET_ITEM = 'items/getItem';
const POST_ITEM = 'items/postItem';
const PUT_ITEM = 'items/putItem';
const DELETE_ITEM = 'items/deleteItem';

const getItems = items => {
    return {
        type: GET_ITEMS,
        items
    }
};

const getItem = item => {
    return {
        type: GET_ITEM,
        item
    }
};

const postItem = item => {
    return {
        type: POST_ITEM,
        item
    }
};

const putItem = item => {
    return {
        type: PUT_ITEM,
        item
    }
};

const deleteItem = itemId => {
    return {
        type: DELETE_ITEM,
        itemId
    }
};

export const getAllItems = () => async dispatch => {
    const response = await csrfFetch('/api/items');
    const items = await response.json();
    dispatch(getItems(items));
    return items;
};

export const getOneItem = itemId => async dispatch => {
    const response = await csrfFetch(`/api/items/${itemId}`);
    const item = await response.json();
    dispatch(getItem(item));
    return item;
};

export const postOneItem = data => async dispatch => {
    const response = await csrfFetch('/api/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const item = await response.json();
    dispatch(postItem(item));
    return item;
};

export const putOneItem = data => async dispatch => {
    const response = await csrfFetch('/api/items', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const item = await response.json();
    dispatch(putItem(item));
    return item;
};

export const deleteOneItem = itemId => async dispatch => {
    await csrfFetch(`/api/items/${itemId}`, { method: 'DELETE' })
        .then(dispatch(deleteItem(itemId)));
};