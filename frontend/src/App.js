import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as userActions from "./store/thunks/user";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Cart from "./components/Cart";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(userActions.restoreUser())
      .then(user => console.log(user))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route excat path="/login">
            <LoginFormPage />
          </Route>
          <Route excat path="/signup">
            <SignupFormPage />
          </Route>
          <Route excat path="/home">
            <Home />
          </Route>
          <Route excat path="/cart">
            <Cart />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
