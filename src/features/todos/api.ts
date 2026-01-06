import { api } from "../../lib/api";
import type { GetTodosParams, TodosListResponse } from "./types";

export async function getTodos({
  page = 1,
  limit = 10,
  completed,
  dateGte,
  dateLte,
  order = "asc",
  priority,
  signal,
  sort,
}: GetTodosParams) {
  const response = (await api.get)<TodosListResponse>("/todos", {
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

  return (await response).data;
}
