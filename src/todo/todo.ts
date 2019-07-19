interface Todo {
  title: string;
  done: boolean;
  createdAt: string;
}

type TodoList = Todo[];

export type T = Todo