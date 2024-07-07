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
      onMutate: async (updatedData: { id: number | string; updatedTodo: UpdateTodo }) => {
          await queryClient.cancelQueries({ queryKey: ["todos"] });

          const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

          queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) =>
              oldTodos?.map((todo) =>
                  todo.id === updatedData.id ? { ...todo, ...updatedData.updatedTodo } : todo
              )
          );

          return { previousTodos, updatedData };
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

  