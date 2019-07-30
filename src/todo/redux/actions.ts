import { isError } from "result-async";

import * as Todo from "../todo";
import * as Api from "../../api";

interface LoadTodoListSuccess {
  type: "loadTodoListSuccess";
  payload: {
    todoList: Todo.List;
  };
}

interface UpdateTodo {
  type: "updateTodo";
  payload: {
    todo: Todo.T;
  };
}

interface CreateTodoSuccess {
  type: "createTodoSuccess";
  payload: {
    todo: Todo.T;
  };
}

interface RemoveTodo {
  type: "removeTodo";
  payload: {
    todo: Todo.T;
  };
}

interface NewTodo {
  type: "newTodo";
}

export type TodoAction =
  | LoadTodoListSuccess
  | UpdateTodo
  | CreateTodoSuccess
  | RemoveTodo
  | NewTodo;

export const loadTodoList = () => async (
  dispatch: React.Dispatch<TodoAction>
) => {
  const response = await Api.get<Todo.List, string>("/");

  if (isError(response)) return null;

  const todoList = response.ok;

  dispatch({ type: "loadTodoListSuccess", payload: { todoList } });
  dispatch({ type: "newTodo" });
};

export const updateTodo = (todo: Todo.T) => async (
  dispatch: React.Dispatch<TodoAction>
) => {
  dispatch({ type: "updateTodo", payload: { todo: todo } });

  if (!Todo.isNew(todo)) {
    return Api.put<Todo.T, string>(`/${todo.id}`, Todo.toApi(todo));
  } else {
    const newTodo = await Api.post<Todo.T, string>("/", Todo.toApi(todo));

    if (isError(newTodo)) return null;

    const updatedTodo = { ...todo, ...newTodo.ok };

    dispatch({ type: "createTodoSuccess", payload: { todo: updatedTodo } });
    dispatch({ type: "newTodo" });
  }
};

export const deleteTodo = (todo: Todo.T) => async (
  dispatch: React.Dispatch<TodoAction>
) => {
  await Api.remove<Todo.T, string>(`/${todo.id}`);

  dispatch({ type: "removeTodo", payload: { todo } });
};
