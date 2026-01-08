import { keepPreviousData, useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query';
import type {
  TodosFilters,
  TodosListResponse,
  ICreateTodoBody,
  ICreateTodoResponse,
  IInfiniteTodosResponse,
} from './types';
import { AxiosError } from 'axios';
import { getTodos, createTodo, deleteTodo, getInfiniteTodos } from './api';
import { toast } from 'sonner';

import { useQueryClient } from '@tanstack/react-query';

export type TodosQueryKey = ['todos', TodosFilters];
export type TInfiniteTodosQueryKey = ['infinite-todos', TodosFilters];

export function useTodos(filters: TodosFilters) {
  return useQuery<TodosListResponse, AxiosError, TodosListResponse, TodosQueryKey>({
    queryKey: ['todos', filters],

    queryFn: ({ queryKey, signal }) => {
      const [, params] = queryKey;

      return getTodos({
        ...params,
        signal,
      });
    },
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
    enabled: !!filters,
  });
}

export function useInfiniteTodos(filter: TodosFilters) {
  return useInfiniteQuery<TodosListResponse, AxiosError, IInfiniteTodosResponse, TInfiniteTodosQueryKey>({
    initialPageParam: 1,
    queryKey: ['infinite-todos', filter],
    queryFn: ({ queryKey, signal, pageParam }) => {
      const [, params] = queryKey;
      return getInfiniteTodos({
        ...params,
        page: pageParam as number,
        signal,
      });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.hasNextPage) return lastPage.data.nextPage;
      return undefined;
    },
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation<ICreateTodoResponse, AxiosError, ICreateTodoBody>({
    mutationFn: (body) => createTodo(body),
    onSuccess: () => {
      toast.success('todo berhasil di buat');
    },
    onError: (error) => {
      console.log(error);
      toast.error('terjadi kesalahan di server');
    },

    onMutate: (data) => {
      queryClient.cancelQueries({ queryKey: ['todos'] });

      const todosCopy = queryClient.getQueryData<TodosListResponse>(['todos']);

      queryClient.setQueryData(['todos'], () => {
        return {
          ...todosCopy,
          data: {
            ...todosCopy?.data,
            todos: [...(todosCopy?.data.todos || []), data],
          },
        };
      });

      return { todosCopy };
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });
}

export function useDeleteTodos() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Todo berhasil dihapus');
    },
    onError: () => {
      toast.error('Gagal menghapus todo');
    },
  });
}
