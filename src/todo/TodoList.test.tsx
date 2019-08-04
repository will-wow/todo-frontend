import React, { ReactComponentElement } from "react";
import { shallow, ShallowWrapper, mount, ReactWrapper } from "enzyme";

import renderer from "react-test-renderer";
import { createRenderer } from "react-test-renderer/shallow";
import ReactTestUtils from "react-dom/test-utils";

import { render, fireEvent, RenderResult } from "@testing-library/react";

import { Provider } from "react-redux";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
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
    let store: MockStoreEnhanced<Store, {}>;
    let element: ReactComponentElement<any>;

    beforeEach(() => {
      store = mockStore(defaultStore);

      element = (
        <Provider store={store}>
          <TodoList {...props} />
        </Provider>
      );
    });

    describe("react-test-renderer", () => {
      let component: renderer.ReactTestRenderer;

      beforeEach(() => {
        component = renderer.create(element);
      });

      it("snapshots", () => {
        expect(component.toJSON()).toMatchSnapshot();
      });
    });

    describe("enzyme mount", () => {
      let wrapper: ReactWrapper;

      beforeEach(() => {
        wrapper = mount(element);
      });

      it("snapshots", () => {
        expect(wrapper.debug()).toMatchSnapshot();
      });

      it("has an editable title", () => {
        expect(
          wrapper
            .find(".todo-item input")
            .first()
            .prop("value")
        ).toEqual(TODO_LIST[0].title);
      });

      it("changes todo items", () => {
        wrapper
          .find(".todo-item input")
          .first()
          .simulate("change", { target: { value: "New Title" } });

        expect(props.onTodoChange).toHaveBeenCalledWith({
          ...TODO_LIST[0],
          title: "New Title"
        });
      });
    });

    describe("react test library", () => {
      let result: RenderResult;

      beforeEach(() => {
        result = render(element);
      });

      it("snapshots", () => {
        result.queryByPlaceholderText("Enter a todo item");
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
