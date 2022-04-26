import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import thunk from "redux-thunk";

export const store = configureStore(
  { reducer: reducers },
  {},
  applyMiddleware(thunk)
);

/* import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";

export const store = createStore(reducers, {}, applyMiddleware(thunk)); */
