import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import splashImg from '../src/images/splash-img3.jpg'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div className="black-box">
        <div className="splash-img-container">
          <img src={splashImg} />
        </div>
      </div>
      <div className="white-box"></div>
      {isLoaded && (
        <Switch>

        </Switch>
      )}
    </>
  );
}

export default App;
