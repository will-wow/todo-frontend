import * as Todo from "../todo";
import { Store } from "../../redux/reducers";

export const getTodoList = (state: Store): Todo.List =>
  Todo.mapToList(state.todo.todoMap);
