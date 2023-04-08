import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Navigation.css';
import * as userActions from '../../store/thunks/user';
import * as cartActions from '../../store/thunks/cart';
import { v4 as uuid } from 'uuid';

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  if (!isLoaded) return null;

  function logOut(e) {
    e.preventDefault();
    dispatch(userActions.logout())
    .then(() => {
      let userId = localStorage.getItem('userId');
      if (userId) {
        dispatch(cartActions.getOneCart(userId));
      } else {
        let userId = uuid();
        localStorage.setItem('userId', userId)
        dispatch(cartActions.postOneCart(userId))
          .then(dispatch(cartActions.getOneCart(userId)));
      };
    })
  };

  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
        <NavLink to="/cart">My Cart</NavLink>
        <NavLink to="/orders">My Orders</NavLink>
        {sessionUser ?
          (
            <>
              <button className='logout' onClick={logOut}>Log Out</button>
            </>
          ) :
          (
            <>
              <NavLink to="/login">Log In</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
            </>
          )
        }
      </li>
    </ul>
  );
}

export default Navigation;
