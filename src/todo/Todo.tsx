import React, { useReducer } from "react";
import { isError } from "result-async";

import TodoList from "./TodoList";
import * as Todo from "./todo";
import * as Api from "../api";

export interface TodoStore {
  todoMap: Todo.Map;
}

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

const reducer = (state: TodoStore, action: TodoAction) => {
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
  }
};

const loadTodoList = async (dispatch: React.Dispatch<TodoAction>) => {
  const response = await Api.get<Todo.List, string>("/");

  if (isError(response)) return null;

  const todoList = response.ok;

  dispatch({ type: "loadTodoListSuccess", payload: { todoList } });
  dispatch({ type: "newTodo" });
};

const updateTodo = async (
  todo: Todo.T,
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

const deleteTodo = async (
  todo: Todo.T,
  dispatch: React.Dispatch<TodoAction>
) => {
  await Api.remove<Todo.T, string>(`/${todo.id}`);

  dispatch({ type: "removeTodo", payload: { todo } });
};

const TodoContainer: React.FC = () => {
  const [state, dispatch] = useReducer<React.Reducer<TodoStore, TodoAction>>(
    reducer,
    { todoMap: {} }
  );

  const { todoMap } = state;
  const todoList = Todo.mapToList(todoMap);

  console.log("LIST", todoList);

  React.useEffect(() => {
    loadTodoList(dispatch);
  }, []);

  const handleUpdateTodo = (todo: Todo.T) => updateTodo(todo, dispatch);

  const handleDelete = (todo: Todo.T) => deleteTodo(todo, dispatch);

  return (
    <div className="Todo">
      <TodoList
        todoList={todoList}
        onTodoChange={handleUpdateTodo}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TodoContainer;
