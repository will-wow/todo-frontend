import React from "react";
import { shallow, ShallowWrapper, mount, ReactWrapper } from "enzyme";

import renderer from "react-test-renderer";
import { createRenderer } from "react-test-renderer/shallow";
import ReactTestUtils from "react-dom/test-utils";

import { render, fireEvent } from "@testing-library/react";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import TodoList, { TodoListProps } from "./TodoList";

import { Store } from "../redux/reducers";
import defaultStore from "../redux/defaultStore";

const middleware = [thunk];
const mockStore = configureMockStore<Store>(middleware);

const TODO_LIST = [
  {
    id: 1,
    title: "Pending Item",
    done: false,
    createdAt: "2019-01-01"
  },
  {
    id: "",
    uuid: "abc",
    title: "New Item",
    done: false,
    createdAt: "2019-02-01"
  },
  {
    id: 2,
    title: "Done Item",
    done: true,
    createdAt: "2019-01-01"
  }
];

describe("TodoList", () => {
  let props: TodoListProps;

  beforeEach(() => {
    props = {
      todoList: TODO_LIST,
      onTodoChange: jest.fn(),
      onDelete: jest.fn()
    };
  });

  describe("full render", () => {
    describe("react-test-renderer", () => {
      let component: renderer.ReactTestRenderer;

      beforeEach(() => {
        const store = mockStore(defaultStore);

        component = renderer.create(
          <Provider store={store}>
            <TodoList {...props} />
          </Provider>
        );
      });

      it("snapshots", () => {
        expect(component.toJSON()).toMatchSnapshot();
      });
    });
  });

  describe("shallow", () => {
    describe("react-test-renderer", () => {
      let component: React.ReactElement;

      beforeEach(() => {
        const renderer = createRenderer();
        renderer.render(<TodoList {...props} />);
        component = renderer.getRenderOutput();
      });

      it("snapshots", () => {
        expect(component).toMatchSnapshot();
      });
    });

    describe("enzyme", () => {
      let wrapper: ShallowWrapper;

      beforeEach(() => {
        wrapper = shallow(<TodoList {...props} />);
      });

      it("snapshots", () => {
        expect(wrapper.debug()).toMatchSnapshot();
      });

      it("renders all todo items", () => {
        const items = wrapper.find("TodoItem");

        // Correct number of items exist
        expect(items).toHaveLength(TODO_LIST.length);

        // Passing todo list
        expect(items.first().prop("todo")).toEqual(TODO_LIST[0]);
      });

      it("changes todo items", () => {
        wrapper
          .find("TodoItem")
          .first()
          .simulate("change", TODO_LIST[0]);

        expect(props.onTodoChange).toHaveBeenCalledWith(TODO_LIST[0]);
      });
    });
  });
});
