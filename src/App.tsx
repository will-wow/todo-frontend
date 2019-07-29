import React from "react";
import "./App.scss";
import TodoContainer from "./todo/TodoContainer";

const App: React.FC = () => {
  return (
    <div className="App">
      <TodoContainer />
    </div>
  );
};

export default App;
