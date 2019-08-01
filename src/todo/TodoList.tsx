import React from "react";
import { filter } from "lodash";
import { Box, Heading, Flex } from "rebass";

import * as Todo from "./todo";
import TodoItem from "./TodoItem";

import InboxZero from "../user/InboxZero";
import UsernameInput from "../user/UsernameInput";
import Hr from "../theme/Hr";

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
  const isAllDone = notDone.length === 1;

  return (
    <Box className="TodoList" mx="auto" style={{ maxWidth: "25rem" }}>
      <Flex mb={2} justifyContent="space-between" alignItems="flex-end">
        <Heading>Todo List for:</Heading>
        <UsernameInput />
      </Flex>

      <Hr borderColor="gray" />

      {isAllDone && <InboxZero />}

      {notDone.map(todo => (
        <TodoItem
          key={todo.uuid || todo.id}
          todo={todo}
          onChange={onTodoChange}
          onDelete={onDelete}
        />
      ))}

      <Heading fontSize={3} mt={2}>
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
    </Box>
  );
};

TodoList.defaultProps = {
  todoList: []
};

export default TodoList;
