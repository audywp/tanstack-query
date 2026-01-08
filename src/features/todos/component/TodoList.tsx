import { useCreateTodo, useDeleteTodos, useInfiniteTodos } from '../hooks';

export const TodoList = () => {
  const { isFetchingNextPage, hasNextPage, fetchNextPage, data, isLoading, isError } = useInfiniteTodos({
    page: 1,
    limit: 2,
  });

  const { mutate: createTodoMutation } = useCreateTodo();
  const { mutate: deleteTodoMutation } = useDeleteTodos();

  const onCreateTodo = () => {
    createTodoMutation({
      title: 'Assignment 18',
      completed: false,
      date: new Date(),
      priority: 'HIGH',
    });
  };

  const onDeleteTodo = (id: string) => {
    deleteTodoMutation(id);
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
        {/* useInfiniteTodos mengembalikan array pages dan setiap array pages baru ada response todos nya */}
        {data?.pages.map(
          (
            page // array pages.
          ) =>
            page.data.todos.map(
              (
                todo // array todos di setiap pages.
              ) => (
                <li
                  key={todo.id}
                  className='flex items-center gap-4'
                >
                  <span>{todo.title}</span>
                  <button onClick={() => onDeleteTodo(todo.id)}>delete</button>
                </li>
              )
            )
        )}
      </ul>

      <button
        disabled={!hasNextPage}
        onClick={() => fetchNextPage()}
        className='cursor-pointer bg-blue-200 rounded-md mt-2 text-black px-4 py-2'
      >
        {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'No more todos'}
      </button>
    </div>
  );
};
