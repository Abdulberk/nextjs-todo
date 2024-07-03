'use client';
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../_interceptor/axiosInstance";
import cookie from 'js-cookie';
import { Todo } from "../_interfaces/todo.interface";

const fetchTodos = async () => {
    const response = await axiosInstance.get("/todos/all");
    const data: Todo[] = response.data;
    if (!data) {
      throw new Error("Error fetching todos !");
    }
    return data;
  };
  
  export const useGetTodosQuery = () => {
      const hasToken = !!cookie.get('token');
      const { data, isLoading, error,refetch,status,isError } =  useQuery(
          {
              queryKey:["todos"],
              queryFn: fetchTodos,
              refetchOnWindowFocus:false,
              refetchOnMount:true,
               enabled: hasToken,
              
          },        
      )
  
      return {
          data,
          isLoading,
          error,
          refetch,
          status,
          isError
          
      }
  };