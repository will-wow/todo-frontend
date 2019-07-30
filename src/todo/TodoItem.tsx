import React from "react";
import cx from "classnames";
import * as Todo from "./todo";
import { Button, Card } from "rebass";
import Input from "../theme/Input";

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
    <Card className={cx("TodoItem", { "TodoItem--done": done })} my="1">
      <Input
        placeholder="Enter a todo item"
        value={title}
        onChange={handleChange}
        className="TodoItem__input"
      />
      {!Todo.isNew(todo) && (
        <>
          <Button onClick={handleStatusChange} mx="1" bg="blue">
            {done ? "Undo" : "Done"}
          </Button>
          <Button onClick={handleDelete} bg="red">
            X
          </Button>
        </>
      )}
    </Card>
  );
};

export default TodoItem;
