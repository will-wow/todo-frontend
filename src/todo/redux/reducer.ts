import * as Todo from "../todo";
import { TodoAction } from "./actions";
import { Reducer } from "redux";
import defaultStore from "../../redux/defaultStore";

export interface TodoStore {
  todoMap: Todo.Map;
}

const reducer: Reducer<TodoStore, TodoAction> = (
  state = defaultStore.todo,
  action
) => {
  switch (action.type) {
    case "newTodo": {
      const todo = Todo.build();
      return {
        ...state,
        todoMap: {
          ...state.todoMap,
          [Todo.key(todo)]: todo
        }
      };
    }
    case "loadTodoListSuccess": {
      return {
        ...state,
        todoMap: Todo.listToMap(action.payload.todoList)
      };
    }
    case "updateTodo": {
      const { todo } = action.payload;
      const { todoMap } = state;

      const updatedMap = { ...todoMap, [Todo.key(todo)]: todo };

      return { ...state, todoMap: updatedMap };
    }
    case "createTodoSuccess": {
      const { todo } = action.payload;
      const { todoMap } = state;

      const updatedMap = {
        ...todoMap,
        [Todo.key(todo)]: todo
      };

      return { ...state, todoMap: updatedMap };
    }
    case "removeTodo": {
      const { todo } = action.payload;
      const { todoMap } = state;

      const updatedMap = { ...todoMap };
      delete updatedMap[Todo.key(todo)];

      return { ...state, todoMap: updatedMap };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
