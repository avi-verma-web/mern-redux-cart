import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { productsReducer } from "./reducer";

import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  productsReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
