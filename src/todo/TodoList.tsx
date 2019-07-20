import React from "react";
import { filter } from "lodash";
import * as Todo from "./todo";

interface Props {
  todoList: Todo.List;
  updateTodo: (todo: Todo.T) => void;
}

const TodoList: React.FC<Props> = ({ todoList, updateTodo }) => {
  const notDone = filter(todoList, { done: false });
  const done = filter(todoList, { done: true });

  return (
    <div className="TodoList">
      <h1>Todo List</h1>
      {notDone.map(todo => (
        <div className="Todo" key={todo.id}>
          {todo.title}
          <button onClick={() => updateTodo({ ...todo, done: true })}>
            Done
          </button>
        </div>
      ))}
      <h2>Done Items</h2>
      {done.map(todo => (
        <div className="Todo Todo--done" key={todo.id}>
          {todo.title}
          <button onClick={() => updateTodo({ ...todo, done: false })}>
            Undo
          </button>
        </div>
      ))}
    </div>
  );
};

TodoList.defaultProps = {
  todoList: []
};

export default TodoList;
