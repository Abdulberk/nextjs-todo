'use client';
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../_interceptor/axiosInstance";
import { CreateTodo } from "../_interfaces/create-todo.interface";
import { Todo } from "../_interfaces/todo.interface";


const createTodo = async (newTodo: CreateTodo) => {
    const response = await axiosInstance.post("/todos/create", newTodo);
    const data:Todo = response.data;
    if (!data) {
      throw new Error("Error creating todo !");
    }
    return data;
  };
  
  export const useCreateTodoMutation = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (data: CreateTodo) => createTodo(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
       
      },
      onError: (error: Error) => {
        console.log(error);
      },
    })
  };
  