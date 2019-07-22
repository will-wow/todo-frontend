import React from "react";
import cx from "classnames";
import * as Todo from "./todo";

import "./TodoItem.scss";

interface Props {
  todo: Todo.T;
  onChange: (todo: Todo.T) => void;
  onDelete: (todo: Todo.T) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onChange, onDelete }) => {
  const { done, title } = todo;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...todo, title: event.target.value });
  };

  const handleStatusChange = () => {
    onChange({ ...todo, done: !done });
  };

  const handleDelete = () => onDelete(todo);

  return (
    <div className={cx("TodoItem", { "TodoItem--done": done })}>
      <input
        value={title}
        onChange={handleChange}
        className="TodoItem__input"
      />
      {!Todo.isNew(todo) && (
        <>
          <button onClick={handleStatusChange}>{done ? "Undo" : "Done"}</button>
          <button onClick={handleDelete}>X</button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
