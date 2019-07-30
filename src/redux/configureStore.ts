import { applyMiddleware, createStore, Store as ReduxStore } from "redux";
import thunkMiddleware from "redux-thunk";

import rootReducer, { Store } from "./reducers";

export default function configureStore(): ReduxStore<Store> {
  const preloadedState = {};

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware)
  );

  return store;
}
