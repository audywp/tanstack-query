import React from "react";
import { useTodos } from "../hooks";

export const TodoList = () => {
  const { data, isLoading, isError } = useTodos({
    page: 1,
    limit: 10,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading todos</div>;
  }

  return (
    <div>
      <h1>TodoList</h1>
      <ul>
        {data?.data.todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};
