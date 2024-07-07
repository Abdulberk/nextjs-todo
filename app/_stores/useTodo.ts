import {create} from 'zustand';
import { Todo } from '@/app/_interfaces/todo.interface';
import { CreateTodo } from '../_interfaces/create-todo.interface';


export interface TodoState {
  todos: Todo[];
  newTodo: CreateTodo;
  isEdited: boolean;
  editId: number | string | null;
  isFocused: boolean;
  hasInput: boolean;
  setTodos: (todos: Todo[]) => void;
  setNewTodo: (newTodo: CreateTodo) => void;
  setIsEdited: (isEdited: boolean) => void;
  setEditId: (editId: number | string | null) => void;
  setIsFocused: (isFocused: boolean) => void;
  setHasInput: (hasInput: boolean) => void;
  resetNewTodo: () => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (id: number | string, updatedTodo: Partial<Todo>) => void;
  deleteTodo: (id: number | string) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  newTodo: { title: '', description: '' },
  isEdited: false,
  editId: null,
  isFocused: false,
  hasInput: false,
  setTodos: (todos) => set({ todos }),
  setNewTodo: (newTodo) => set({ newTodo }),
  setIsEdited: (isEdited) => set({ isEdited }),
  setEditId: (editId) => set({ editId }),
  setIsFocused: (isFocused) => set({ isFocused }),
  setHasInput: (hasInput) => set({ hasInput }),
  resetNewTodo: () => set({ newTodo: { title: '', description: '' } }),
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  updateTodo: (id, updatedTodo) => set((state) => ({
    todos: state.todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo)),
  })),
  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter((todo) => todo.id !== id),
  })),
}));