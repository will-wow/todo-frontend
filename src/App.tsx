import React from "react";
import "./App.scss";
import Todo from "./todo/Todo";

const App: React.FC = () => {
  return (
    <div className="App">
      <Todo />
    </div>
  );
};

export default App;
