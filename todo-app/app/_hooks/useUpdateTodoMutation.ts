'use client';
import {useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../_interceptor/axiosInstance";
import { UpdateTodo } from "../_interfaces/update-todo.interface";
import { UpdatedTodoResponse } from "../_interfaces/updated-todo-response.interface";


const updateTodo = async ({ id, updatedTodo }: { id: number | string; updatedTodo: UpdateTodo }) => {
    const response = await axiosInstance.patch(`/todos/${id}`, updatedTodo);
       const data: UpdatedTodoResponse = response.data
  
    if (!data) {
      throw new Error("Error updating todo !");
    }
    return data;
  };
  
  export const useUpdateTodoMutation = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (data: { id: number | string; updatedTodo: UpdateTodo }) => updateTodo(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
      onError: (error: Error) => {
        console.log(error);
      },
    })
  };
  