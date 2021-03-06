import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { NavLink } from "react-router-dom";
import SplashPage from "./components/Splash/SplashPage";
import UserProfile from "./components/UserProfilePage/UserProfile";
import AllListingsList from "./components/AllListingsList/AllListingsList";
import ListingDetails from "./components/AllListingsList/ListingDetails/ListingDetails";
import Footer from "./components/Footer/Footer";


function App() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="main-page-container">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
          <SplashPage isLoaded={isLoaded} />
          </Route>
          <Route path='/api/user/profile'>
            <UserProfile user={sessionUser} />
          </Route>
          <Route path='/api/listings/all'>
            <AllListingsList user={sessionUser} />
          </Route>
          <Route path='/api/listings/:id' >
            <ListingDetails user={sessionUser} />
          </Route>

        </Switch>
      )}
      <Footer />
    </div>
  );
}

export default App;
