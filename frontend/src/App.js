import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as userActions from "./store/thunks/user";
import * as cartActions from "./store/thunks/cart";
import * as orderActions from "./store/thunks/order";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import { v4 as uuid } from 'uuid';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(userActions.restoreUser())
      .then(user => {
        if (user) {
          dispatch(cartActions.getOneCart(user.id))
            .then(dispatch(orderActions.getAllOrders(user.id)));
        } else {
          let userId = localStorage.getItem('userId');
          if (userId) {
            dispatch(cartActions.getOneCart(userId))
              .then(dispatch(orderActions.getAllOrders(userId)));
          } else {
            userId = uuid();
            localStorage.setItem('userId', userId);
            dispatch(cartActions.postOneCart(userId))
              .then(dispatch(cartActions.getOneCart(userId)))
              .then(dispatch(orderActions.getAllOrders(userId)));
          };
        };
      })
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route excat path="/login">
            <LoginFormPage />
          </Route>
          <Route excat path="/signup">
            <SignupFormPage />
          </Route>
          <Route excat path="/cart">
            <Cart />
          </Route>
          <Route excat path="/orders">
            <Orders />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
