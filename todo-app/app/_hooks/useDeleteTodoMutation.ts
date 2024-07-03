'use client';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../_interceptor/axiosInstance";



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
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
      onError: (error: Error) => {
        console.log(error);
      },
    })
  };
  