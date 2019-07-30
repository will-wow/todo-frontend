import todo, { TodoStore } from "../todo/redux/reducer";

import { combineReducers } from "redux";

export interface Store {
  todo: TodoStore;
}

const reducers = combineReducers({ todo });

export default reducers;
