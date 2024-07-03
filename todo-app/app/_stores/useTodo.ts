import {create} from 'zustand';
import { Todo } from '@/app/_interfaces/todo.interface';

interface TodoState {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (id: number | string, updatedTodo: Partial<Todo>) => void;
  deleteTodo: (id: number | string) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  updateTodo: (id, updatedTodo) => set((state) => ({
    todos: state.todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo)),
  })),
  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter((todo) => todo.id !== id),
  })),
}));
