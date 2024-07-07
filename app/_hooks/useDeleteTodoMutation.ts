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
    mutationFn: (data: any) => deleteTodo(data),
    onMutate: async (id: number | string) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (oldTodos: any) => 
        oldTodos.filter((todo: Todo) => todo.id !== id)
      );

      return { previousTodos };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
     
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
  
    }
  });
};