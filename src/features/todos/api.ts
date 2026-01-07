import { api } from '../../lib/api';
import type { GetTodosParams, TodosListResponse, ICreateTodoResponse, ICreateTodoBody } from './types';

export async function getTodos({
  page = 1,
  limit = 10,
  completed,
  dateGte,
  dateLte,
  order = 'asc',
  priority,
  signal,
  sort,
}: GetTodosParams) {
  const response = await api.get<TodosListResponse>('/todos', {
    params: {
      page,
      limit,
      completed,
      priority,
      dateGte,
      dateLte,
      sort,
      order,
    },
    signal,
  });

  return response.data;
}

export async function createTodo({ title, completed, date, priority }: ICreateTodoBody) {
  const response = await api.post<ICreateTodoResponse>('/todos', {
    title,
    completed,
    date,
    priority,
  });

  return response.data;
}
