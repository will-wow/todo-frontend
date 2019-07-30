import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { Store } from "./redux/reducers";
import defaultStore from "./redux/defaultStore";

const middleware = [thunk];
const mockStore = configureMockStore<Store>(middleware);

it("renders without crashing", () => {
  const store = mockStore(defaultStore);
  const div = document.createElement("div");

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
