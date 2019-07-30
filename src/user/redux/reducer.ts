import { Reducer } from "redux";
import defaultStore from "../../redux/defaultStore";
import { UserAction } from "./actions";

export interface UserStore {
  username: string;
}

const reducer: Reducer<UserStore, UserAction> = (
  state = defaultStore.user,
  action
) => {
  switch (action.type) {
    case "user::UpdateUsername": {
      return { username: action.payload.username };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
