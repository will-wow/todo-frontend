import reducer from "./reducer";
import defaultStore from "../../redux/defaultStore";

describe("todo reducer", () => {
  it("adds a todo", () => {
    const state = reducer(defaultStore.user, {
      type: "user::UpdateUsername",
      payload: { username: "Alice" }
    });

    expect(state.username).toBe("Alice");
  });
});
