import * as fetchMock from "fetch-mock";

const baseUrl = process.env.REACT_APP_BASE_URL || "";

let nextId = 3;

const DEFAULT_TODOS = {
  1: {
    id: 1,
    title: "Learn Elixir",
    createdAt: "2019-07-04",
    done: false
  },
  2: {
    id: 2,
    title: "Get milk",
    createdAt: "2019-07-06",
    done: true
  }
};

let todos = [];

const loadTodos = () => {
  const json = localStorage.getItem("todos");
  todos = json ? JSON.parse(json) : DEFAULT_TODOS;

  nextId = Math.max(...Object.values(todos).map(todo => todo.id)) + 1;
};

const updateTodos = todo => {
  todos[todo.id] = todo;
  localStorage.setItem("todos", JSON.stringify(todos));
};

const mockServer = () => {
  loadTodos();

  fetchMock.get(`${baseUrl}/`, todos);

  fetchMock.post(`${baseUrl}/`, (url, res) => {
    const json = JSON.parse(res.body);

    const todo = { ...json, id: nextId };
    nextId += 1;

    updateTodos(todo);

    return todo;
  });

  fetchMock.put(`express:/todos/:id`, (url, res) => {
    const todo = JSON.parse(res.body);

    updateTodos(todo);

    return todo;
  });
};

export default mockServer;
