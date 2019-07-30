import React from "react";
import { filter } from "lodash";
import { Heading } from "rebass";

import * as Todo from "./todo";
import TodoItem from "./TodoItem";

import "./TodoList.scss";

export interface TodoListProps {
  todoList: Todo.List;
  onTodoChange: (todo: Todo.T) => void;
  onDelete: (todo: Todo.T) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todoList,
  onTodoChange,
  onDelete
}) => {
  const notDone = filter(todoList, { done: false });
  const done = filter(todoList, { done: true });

  return (
    <div className="TodoList">
      <Heading mb={2}>Todo List</Heading>
      {notDone.map(todo => (
        <TodoItem
          key={todo.uuid || todo.id}
          todo={todo}
          onChange={onTodoChange}
          onDelete={onDelete}
        />
      ))}

      <Heading fontSize={3} mt={1}>
        Done Items
      </Heading>
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
