import * as userThunks from './thunks/user';
import * as itemThunks from './thunks/items';

const initialState = { user: null, items: null, item: null };

const sessionReducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case userThunks.SET_USER:
      newState.user = action.user;
      return newState;
    case userThunks.REMOVE_USER:
      newState.user = null;
      return newState;
    
    case itemThunks.GET_ITEMS:
      newState.items = action.items;
      return newState;
    case itemThunks.GET_ITEM:
      newState.item = action.item;
      return newState;
    case itemThunks.POST_ITEM:
    case itemThunks.PUT_ITEM:
      newState.item = action.item;
      if (newState.items) newState.items[action.item.id] = action.item;
      return newState;
    case itemThunks.DELETE_ITEM:
      newState.item = null;
      if (newState.items) delete newState.items[action.itemId];
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
