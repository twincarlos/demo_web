import { csrfFetch } from '../csrf';

export const SET_USER = 'session/setUser';
export const REMOVE_USER = 'session/removeUser';

const setUser = user => {
  return {
    type: SET_USER,
    user
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return data.user;
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return data.user;
};

export const signup = (user) => async (dispatch) => {
  const { phoneNumber, email, firstName, lastName, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",

    body: JSON.stringify({
      phoneNumber,
      email,
      firstName,
      lastName,
      password
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return data.user;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};
