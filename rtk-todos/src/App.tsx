import React, { useCallback, useRef } from "react";
import { ApiProvider } from "@reduxjs/toolkit/query/react";

import { todoApi, Todo } from "./store";

function TodoApp() {
  const { data: todos } = todoApi.useGetAllQuery();
  const [deleteTodo] = todoApi.useDeleteTodoMutation();
  const [updateTodo] = todoApi.useUpdateTodoMutation();
  const [addTodo] = todoApi.useAddTodoMutation();

  const textRef = useRef<HTMLInputElement>(null);
  const onAdd = useCallback(() => {
    addTodo(textRef.current!.value ?? "");
    textRef.current!.value = "";
  }, [addTodo]);

  const onToggle = useCallback(
    (todo: Todo) => updateTodo({ ...todo, done: !todo.done }),
    [updateTodo]
  );

  const onDelete = useCallback((todo: Todo) => deleteTodo(todo), [deleteTodo]);

  return (
    <div className="App">
      <div className="todos">
        {todos?.map((todo) => (
          <React.Fragment key={todo.id}>
            <div>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggle(todo)}
              />
              <span>{todo.text}</span>
            </div>
            <button onClick={() => onDelete(todo)}>Delete</button>
          </React.Fragment>
        ))}
      </div>
      <div className="add">
        <input type="text" ref={textRef} />
        <button onClick={onAdd}>Add</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <ApiProvider api={todoApi}>
      <TodoApp />
    </ApiProvider>
  );
}

export default App;
