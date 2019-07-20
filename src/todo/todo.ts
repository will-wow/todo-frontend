interface Todo {
  id: string | number;
  title: string;
  done: boolean;
  createdAt: string;
}

type TodoList = Todo[];

export type T = Todo;
export type List = TodoList;
