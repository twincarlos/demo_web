import * as userThunks from './thunks/user';
import * as itemThunks from './thunks/item';
import * as cartThunks from './thunks/cart';

const initialState = { user: null, items: null, cart: null };

const sessionReducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case userThunks.SET_USER:
      newState.user = action.user;
      return newState;
    case userThunks.REMOVE_USER:
      newState.user = null;
      return newState;
    case userThunks.POST_CART:
      newState.cart = action.cart;
      return newState;

    case itemThunks.GET_ITEMS:
      newState.items = action.items;
      return newState;
    case itemThunks.POST_ITEM:
    case itemThunks.PUT_ITEM:
      if (newState.items) newState.items[action.item.id] = action.item;
      return newState;
    case itemThunks.DELETE_ITEM:
      if (newState.items) delete newState.items[action.itemId];
      return newState;

    case cartThunks.GET_CART:
      newState.cart = action.cart;
      return newState;
    case cartThunks.POST_CART_ITEM:
    case cartThunks.PUT_CART_ITEM:
      newState.cart.items[action.cartItem.item.id] = action.cartItem;
      return newState;
    case cartThunks.DELETE_CART_ITEM:
      delete newState.cart.items[action.itemId];
      return newState;
    case cartThunks.DELETE_CART_ITEMS:
      newState.cart.Items = {};
      return newState;

    default:
      return state;
  }
};

export default sessionReducer;
