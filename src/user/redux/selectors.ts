import { Store } from "../../redux/reducers";

export const getUsername = (state: Store): string => state.user.username;
