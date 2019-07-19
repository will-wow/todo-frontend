import React from "react";
import { filter } from "lodash";
import cx from "classnames";
import { ITodoList } from "./todo";

interface IProps {
  todoList: ITodoList;
}

const TodoList: React.FC<IProps> = ({ todoList }) => {
  const notDone = filter(todoList, { done: false });
  const done = filter(todoList, { done: true });

  return (
    <div className="TodoList">
      {notDone.map(todo => (
        <div className="Todo">{todo.title}</div>
      ))}
      {done.map(todo => (
        <div className="Todo Todo--done">{todo.title}</div>
      ))}
    </div>
  );
};

TodoList.defaultProps = {
  todoList: []
};

export default TodoList;
