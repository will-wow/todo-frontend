import React, { useReducer } from "react";
import { either } from "result-async";
import { map } from "lodash";

import TodoList from "./TodoList";
import * as Todo from "./todo";
import * as Api from "../api";

export interface TodoStore {
  todoList: Todo.List;
}

export interface LoadTodoListSuccess {
  type: "loadTodoListSuccess";
  payload: {
    todoList: Todo.List;
  };
}

export interface UpdateTodoSuccess {
  type: "updateTodoSuccess";
  payload: {
    todo: Todo.T;
  };
}

export type TodoAction = LoadTodoListSuccess | UpdateTodoSuccess;

const reducer = (state: TodoStore, action: TodoAction) => {
  switch (action.type) {
    case "loadTodoListSuccess": {
      return { ...state, todoList: action.payload.todoList };
    }
    case "updateTodoSuccess": {
      const { todo } = action.payload;
      const { todoList } = state;

      const updatedList = map(todoList, todoItem =>
        todoItem.id === todo.id ? todo : todoItem
      );

      return { ...state, todoList: updatedList };
    }
  }
};

const loadTodoList = async (dispatch: React.Dispatch<TodoAction>) => {
  return either(
    await Api.get<Todo.List, string>("/"),
    todoList =>
      dispatch({ type: "loadTodoListSuccess", payload: { todoList } }),
    _error => {}
  );
};

const updateTodo = async (
  todo: Todo.T,
  dispatch: React.Dispatch<TodoAction>
) => {
  return either(
    await Api.put<Todo.T, string>(`/${todo.id}`, todo),
    todo => dispatch({ type: "updateTodoSuccess", payload: { todo } }),
    () => {}
  );
};

const TodoContainer: React.FC = () => {
  const [state, dispatch] = useReducer<React.Reducer<TodoStore, TodoAction>>(
    reducer,
    {
      todoList: []
    }
  );

  const { todoList } = state;

  React.useEffect(() => {
    loadTodoList(dispatch);
  }, []);

  const handleUpdateTodo = (todo: Todo.T) => updateTodo(todo, dispatch);

  return (
    <div className="Todo">
      <TodoList todoList={todoList} updateTodo={handleUpdateTodo} />
    </div>
  );
};

export default TodoContainer;
