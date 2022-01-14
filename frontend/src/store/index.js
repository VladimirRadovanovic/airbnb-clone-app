import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import sessionReducer from './session';
import sessionListingsReducer from "./Listings/sessionListings";
import allListingsReducer from "./Listings/allListings";
import sessionBookingsReducer from "./bookings/sessionBookings";


const rootReducer = combineReducers({
  // add reducer functions here
  session: sessionReducer,
  sessionListings: sessionListingsReducer,
  listings: allListingsReducer,
  bookings: sessionBookingsReducer,

});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
