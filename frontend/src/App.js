import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { NavLink } from "react-router-dom";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <main className="main">
        <div className="black-box">
          <div className="splash-img-container">
            {/* <img src={splashImg} /> */}
            <div className="img-text-container">
              <h2>Not sure where to go? Perfect.</h2>

              <div className="spots-link-container">
                <NavLink className='explore-spots-link' to='/api/spots'>I'm flexible</NavLink>
              </div>

            </div>
          </div>

        </div>
        <div className="img2-container">
        <div className="splash-img-container2">
        <div className="img-text-container2">
              <h2>Share your home.</h2>

              <div className="host-link-container">
                <NavLink className='host-link' to='/api/spots'>Try hosting</NavLink>
              </div>

            </div>
              <div className="inner-img-container"></div>
          </div>

        </div>
        {/* <div className="white-box"></div> */}
      </main>
      {isLoaded && (
        <Switch>

        </Switch>
      )}
    </>
  );
}

export default App;
