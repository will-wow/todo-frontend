import { Store } from "./reducers";

const defaultStore: Store = {
  todo: {
    todoMap: {}
  },
  user: {
    username: "User"
  }
};

export default defaultStore;
