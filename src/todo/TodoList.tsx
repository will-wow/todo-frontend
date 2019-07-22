import React from "react";
import { filter } from "lodash";
import * as Todo from "./todo";
import TodoItem from "./TodoItem";

import "./TodoList.scss";

interface Props {
  todoList: Todo.List;
  onTodoChange: (todo: Todo.T) => void;
  onDelete: (todo: Todo.T) => void;
}

const TodoList: React.FC<Props> = ({ todoList, onTodoChange, onDelete }) => {
  const notDone = filter(todoList, { done: false });
  const done = filter(todoList, { done: true });

  return (
    <div className="TodoList">
      <h1>Todo List</h1>
      {notDone.map(todo => (
        <TodoItem
          key={todo.uuid || todo.id}
          todo={todo}
          onChange={onTodoChange}
          onDelete={onDelete}
        />
      ))}

      <h2>Done Items</h2>
      {done.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.uuid || todo.id}
          onChange={onTodoChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

TodoList.defaultProps = {
  todoList: []
};

export default TodoList;
