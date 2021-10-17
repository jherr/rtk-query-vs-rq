export const BASE_URL = "http://localhost:4000/todos";

export interface Todo {
  id: number;
  text: string;
  active: boolean;
  done: boolean;
}

export const getTodos = async (): Promise<Todo[]> =>
  fetch(BASE_URL).then((res) => res.json());

export const getTodo = async (id: number): Promise<Todo> =>
  fetch(`${BASE_URL}/${id}`).then((res) => res.json());

export const createTodo = async (text: string): Promise<Todo> =>
  fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  }).then((res) => res.json());

export const updateTodo = async (todo: Todo): Promise<Todo> =>
  fetch(`${BASE_URL}/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then((res) => res.json());

export const deleteTodo = async (todo: Todo): Promise<Todo> =>
  fetch(`${BASE_URL}/${todo.id}`, {
    method: "DELETE",
  }).then(() => todo);
