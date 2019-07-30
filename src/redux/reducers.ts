import todo, { TodoStore } from "../todo/redux/reducer";
import user, { UserStore } from "../user/redux/reducer";

import { combineReducers } from "redux";

export interface Store {
  todo: TodoStore;
  user: UserStore;
}

const reducers = combineReducers({ todo, user });

export default reducers;
