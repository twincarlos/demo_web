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
import Success from "./components/Checkout/Success";
import Cancel from "./components/Checkout/Cancel";
import Item from "./components/Item";
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
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/orders">
            <Orders />
          </Route>
          <Route exact path="/item/:itemId">
            <Item />
          </Route>
          <Route exact path="/stripe-checkout/success/:stripeCheckoutId/:cartId/:userId/:netTotal">
            <Success />
          </Route>
          <Route exact path="/stripe-checkout/cancel/:stripeCheckoutId/:cartId/:userId/:netTotal">
            <Cancel />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
