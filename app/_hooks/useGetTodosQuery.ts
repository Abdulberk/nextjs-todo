'use client';
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../_interceptor/axiosInstance";
import cookie from 'js-cookie';
import { Todo } from "../_interfaces/todo.interface";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface GetTodosQueryOptions {
    page: number;
    limit: number;
}

const fetchTodos = async ({ page, limit }: GetTodosQueryOptions) => {
    const response = await axiosInstance.get('/todos/all', {
        params: {
            page,
            limit
        }
    });
    const data: { todos: Todo[], count: number, totalPages: number, currentPage: number } = response.data;
    if (!data) {
      throw new Error("Error fetching todos !");
    }
    return data;
  };
  
 export const useGetTodosQuery = ({ limit }: {limit:number}) => {
    const hasToken = !!cookie.get('token');
    const { data, isLoading, error, refetch, status, isError, fetchNextPage, hasNextPage,isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['todos'],
        queryFn: ( { pageParam = 1 }) => fetchTodos({ page:pageParam, limit }),
        initialPageParam: 1,
        
        getNextPageParam: (lastPage) => {
            if (lastPage.currentPage < lastPage.totalPages) {
                return lastPage.currentPage + 1;
            } else {
                return undefined;
            }

        },
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        enabled: hasToken,
        

    })


    return {
        data,
        isLoading,
        error,
        refetch,
        status,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage

    }
};