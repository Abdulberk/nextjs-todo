'use client';
import {useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../_interceptor/axiosInstance";
import { UpdateTodo } from "../_interfaces/update-todo.interface";
import { UpdatedTodoResponse } from "../_interfaces/updated-todo-response.interface";
import { Todo } from "../_interfaces/todo.interface";


const updateTodo = async ({ id, updatedTodo }: { id: number | string; updatedTodo: UpdateTodo }) => {
  const response = await axiosInstance.patch(`/todos/${id}`, updatedTodo);
  const data: UpdatedTodoResponse = response.data;

  if (!data) {
    throw new Error("Error updating todo!");
  }
  return data;
};

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: number | string; updatedTodo: UpdateTodo }) => updateTodo(data),
    onMutate: async ({ id, updatedTodo }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (oldTodos: any) => 
        oldTodos.map((todo: Todo) => 
          todo.id === id ? { ...todo, ...updatedTodo } : todo
        )
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
  