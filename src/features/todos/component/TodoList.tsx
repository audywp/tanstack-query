import { useCreateTodo, useTodos } from '../hooks';

export const TodoList = () => {
  const { data, isLoading, isError } = useTodos({
    page: 1,
    limit: 10,
  });

  const { mutate } = useCreateTodo();

  const onCreateTodo = () => {
    mutate({
      title: 'Assignment 5',
      completed: false,
      date: new Date(),
      priority: 'HIGH',
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading todos</div>;
  }

  return (
    <div>
      <h1>TodoList</h1>
      <button
        onClick={onCreateTodo}
        className='cursor-pointer bg-blue-200 rounded-md mt-2 text-black px-4 py-2'
      >
        Create Todo
      </button>
      <ul>
        {data?.data.todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};
