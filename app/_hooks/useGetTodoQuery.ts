'use client';
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../_interceptor/axiosInstance";
import cookie from "js-cookie";
import { Todo } from "../_interfaces/todo.interface";

const fetchTodo = async (id: number | string) => {
  const response = await axiosInstance.get(`/todos/${id}`);
  const data: Todo = response.data;
  if (!data) {
    throw new Error("Error fetching todo");
  }
  return data;
};

export const useGetTodoQuery = (id: number | string) => {
  const hasToken = !!cookie.get("token");
  const { data, isLoading, error, refetch, status, isError } = useQuery({
    queryKey: ["todos", id],
    queryFn: () => fetchTodo(id),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: hasToken,
  });

  return {
    data,
    isLoading,
    error,
    refetch,
    status,
    isError,
  };
};
