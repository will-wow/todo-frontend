interface Todo {
  id: string | number | null;
  title: string;
  done: boolean;
  createdAt: string | null;
}

type TodoList = Todo[];

export type T = Todo;
export type List = TodoList;

export const EMPTY: Todo = {
  id: null,
  title: "",
  done: false,
  createdAt: null
};
