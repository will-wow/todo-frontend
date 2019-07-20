import React, { useState, ChangeEvent } from "react";
import * as Todo from "./todo";

interface Props {
  onCreate: (todo: Todo.T) => void;
}

const CreateTodo: React.FC<Props> = ({ onCreate }) => {
  const [title, setTitle] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = () => {
    onCreate({ ...Todo.EMPTY, title, createdAt: Date.now() });
  };

  return (
    <div className="CreateTodo">
      <input onChange={handleChange} />
    </div>
  );
};

export default CreateTodo;
