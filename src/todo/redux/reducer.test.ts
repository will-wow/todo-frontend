import reducer from "./reducer";
import defaultStore from "../../redux/defaultStore";

describe("todo reducer", () => {
  it("adds a todo", () => {
    const state = reducer(defaultStore.todo, { type: "newTodo" });

    const todoList = Object.values(state.todoMap);

    expect(todoList).toHaveLength(1);
  });
});
