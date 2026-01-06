import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { TodosFilters, TodosListResponse } from "./types";
import type { AxiosError } from "axios";
import { getTodos } from "./api";

export type TodosQueryKey = ["todos", TodosFilters];

export function useTodos(filters: TodosFilters) {
  return useQuery<
    TodosListResponse,
    AxiosError,
    TodosListResponse,
    TodosQueryKey
  >({
    queryKey: ["todos", filters],

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
