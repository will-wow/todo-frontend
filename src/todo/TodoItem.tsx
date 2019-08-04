import React from "react";
import * as Todo from "./todo";
import { Button, Flex } from "rebass";
import Input from "../theme/Input";

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

  const buttonText = done ? "Undo" : "Done";
  const buttonColor = done ? "salmon" : "blue";
  const textDecoration = done ? "line-through" : "";

  return (
    <Flex className="todo-item" my="1">
      <Input
        placeholder="Enter a todo item"
        value={title}
        onChange={handleChange}
        className="todo-item__input"
        style={{ flexGrow: 1, textDecoration }}
      />
      {!Todo.isNew(todo) && (
        <>
          <Button onClick={handleStatusChange} bg={buttonColor} mx="1">
            {buttonText}
          </Button>
          <Button onClick={handleDelete} bg="red">
            X
          </Button>
        </>
      )}
    </Flex>
  );
};

export default TodoItem;
