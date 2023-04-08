import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from "redux-thunk";

import userReducer from './user.js';
import menuReducer from './menu.js';
import recipeReducer from './recipes.js';

const rootReducer = combineReducers({
    user: userReducer,
    menu: menuReducer,
    recipes: recipeReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
};

const configureStore = (preLoadedState) => {
    return createStore(rootReducer, preLoadedState, enhancer);
};

export default configureStore;