import * as userThunks from './thunks/user';
import * as itemThunks from './thunks/item';
import * as cartThunks from './thunks/cart';
import * as orderThunks from './thunks/order';

const initialState = { user: null, items: null, cart: null, item: null, order: null, orders: null };

const sessionReducer = (state = initialState, action) => {

  switch (action.type) {
    case userThunks.SET_USER:
      return {
        ...state,
        user: action.user
      };
    case userThunks.REMOVE_USER:
      return {
        ...state,
        user: null
      };

    case itemThunks.GET_ITEMS:
      return {
        ...state,
        items: action.items
      };
    case itemThunks.GET_ITEM:
      return {
        ...state,
        item: action.item
      };
    case itemThunks.POST_ITEM:
    case itemThunks.PUT_ITEM:
      if (state.items) {
        return {
          ...state,
          items: {
            ...state.items,
            [action.item.id]: action.item
          }
        };
      };
      break;
    case itemThunks.DELETE_ITEM:
      const newItems = { ...state.items };
      delete newItems[action.itemId];
      if (state.items) {
        return {
          ...state,
          items: newItems
        };
      };
      break;

    case cartThunks.GET_CART:
    case cartThunks.POST_CART:
      return {
        ...state,
        cart: action.cart
      };
    case cartThunks.POST_CART_ITEM:
    case cartThunks.PUT_CART_ITEM:
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: {
            ...state.cart.cartItems,
            [action.cartItem.id]: action.cartItem
          }
        }
      };
    case cartThunks.DELETE_CART_ITEM:
      const newCartItems = { ...state.cart.cartItems };
      delete newCartItems[action.cartItemId];
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: newCartItems
        }
      };
    case cartThunks.DELETE_CART_ITEMS:
      return {
        ...state,
        cart: {
          ...state.cartItems,
          cartItems: {}
        }
      };

    case orderThunks.GET_ORDERS:
      return {
        ...state,
        orders: action.orders
      };
    case orderThunks.GET_ORDER:
      return {
        ...state,
        order: action.order
      };
    case orderThunks.POST_ORDER:
      return {
        ...state,
        orders: {
          ...state.orders,
          [action.order.id]: action.order
        }
      };

    default:
      return state;
  }
};

export default sessionReducer;
