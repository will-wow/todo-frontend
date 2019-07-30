import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import TodoList from "./TodoList";
import * as Todo from "./todo";
import { getTodoList } from "./redux/selectors";
import { loadTodoList, updateTodo, deleteTodo } from "./redux/actions";
import { Store } from "../redux/reducers";

interface StateToProps {
  todoList: Todo.List;
}

interface DispatchFromProps {
  loadTodoList: () => void;
  updateTodo: (todo: Todo.T) => void;
  deleteTodo: (todo: Todo.T) => void;
}

export interface TodoContainerProps extends StateToProps, DispatchFromProps {}

const TodoContainer: React.FC<TodoContainerProps> = ({
  todoList,
  loadTodoList,
  updateTodo,
  deleteTodo
}) => {
  React.useEffect(() => {
    loadTodoList();
  }, []);

  return (
    <div className="Todo">
      <TodoList
        todoList={todoList}
        onTodoChange={updateTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
};

export { TodoContainer };

const mapStateToProps = (state: Store): StateToProps => ({
  todoList: getTodoList(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchFromProps =>
  bindActionCreators(
    {
      loadTodoList,
      updateTodo,
      deleteTodo
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoContainer);
