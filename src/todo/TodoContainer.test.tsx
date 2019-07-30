import React from "react";
import { shallow, ShallowWrapper, mount, ReactWrapper } from "enzyme";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import Container, { TodoContainer, TodoContainerProps } from "./TodoContainer";
import { Store } from "../redux/reducers";
import defaultStore from "../redux/defaultStore";

const middleware = [thunk];
const mockStore = configureMockStore<Store>(middleware);

const TODO_STORE = {
  todoMap: {
    1: {
      id: 1,
      title: "Pending Item",
      done: false,
      createdAt: "2019-01-01"
    },
    abc: {
      id: "",
      uuid: "abc",
      title: "New Item",
      done: false,
      createdAt: "2019-02-01"
    },
    3: {
      id: 1,
      title: "Done Item",
      done: true,
      createdAt: "2019-01-01"
    }
  }
};

describe("TodoContainer", () => {
  describe("connected component", () => {
    let wrapper: ReactWrapper;
    beforeEach(() => {
      const store = mockStore({
        ...defaultStore,
        todo: TODO_STORE
      });

      wrapper = mount(
        <Provider store={store}>
          <Container />
        </Provider>
      );
    });

    it("snapshots", () => {
      expect(wrapper.debug()).toMatchSnapshot();
    });
  });

  describe("component", () => {
    let wrapper: ShallowWrapper;
    let props: TodoContainerProps;

    beforeEach(() => {
      jest
        .spyOn(React, "useEffect")
        .mockImplementation((f: React.EffectCallback) => f());

      props = {
        todoList: [],
        loadTodoList: jest.fn(),
        updateTodo: jest.fn(),
        deleteTodo: jest.fn()
      };

      wrapper = shallow(<TodoContainer {...props} />);
    });

    it("loads the list on start", () => {
      expect(props.loadTodoList).toHaveBeenCalled();
    });

    describe("given a list", () => {
      beforeEach(() => {
        props.todoList = [
          {
            id: 1,
            title: "Test",
            done: false,
            createdAt: "2019-01-01"
          }
        ];

        wrapper = shallow(<TodoContainer {...props} />);
      });

      it("renders a list", () => {
        expect(wrapper.find("TodoList").prop("todoList")).toEqual(
          props.todoList
        );
      });
    });
  });
});
