import { keepPreviousData, useQuery, useMutation } from '@tanstack/react-query';
import type { TodosFilters, TodosListResponse, ICreateTodoBody, ICreateTodoResponse } from './types';
import type { AxiosError } from 'axios';
import { getTodos, createTodo } from './api';
import { toast } from 'sonner';
import { queryClient } from '../../lib/react-query';

export type TodosQueryKey = ['todos', TodosFilters];

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
  });
}

export function useCreateTodo() {
  return useMutation<ICreateTodoResponse, AxiosError, ICreateTodoBody>({
    mutationFn: (body) => createTodo(body),
    onSuccess: () => {
      toast.success('todo berhasil di buat');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: () => {
      toast.error('terjadi kesalahan di server');
    },
  });
}
