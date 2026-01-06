export type TodoPriority = "LOW" | "MEDIUM" | "HIGH";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  date: string;
  priority: TodoPriority;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodosListData {
  todos: Todo[];
  totalTodos: number;
  hasNextPage: boolean;
  nextPage: number | null;
}

export interface TodosListResponse {
  success: boolean;
  message: string;
  data: TodosListData;
}
export interface TodosFilters {
  page?: number;
  limit?: number;
  completed?: boolean;
  priority?: TodoPriority;
  dateGte?: string;
  dateLte?: string;
  sort?: string;
  order?: "asc" | "desc";
}

export interface GetTodosParams extends TodosFilters {
  signal?: AbortSignal;
}
