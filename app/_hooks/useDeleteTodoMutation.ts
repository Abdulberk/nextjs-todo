'use client';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../_interceptor/axiosInstance";
import { Todo } from "../_interfaces/todo.interface";



const deleteTodo = async (id: number | string) => {
  const response = await axiosInstance.delete(`/todos/${id}`);
  if (!response.data) {
    throw new Error("Error deleting todo");
  }
  return response.data;
};

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => deleteTodo(id),
    onMutate: async (id: number | string) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo>(["todos"]);

      queryClient.setQueryData<Todo>(["todos"], (oldTodos: any) => ({
        ...oldTodos,
        pages: oldTodos.pages.map((page: any) => ({
          ...page,
          todos: page.todos.filter((todo: Todo) => todo.id !== id),
        })),
      }));

      return { previousTodos };
    },
    onError: (error, variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};