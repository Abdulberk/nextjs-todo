
import { Status } from "../_enums/todo-status.enum";
import { User } from "./user.interface";
export interface Todo {
    id: number | string;
    title: string;
    description: string;
    status: Status
    createdAt: string;
    updatedAt: string;
    user: User;
  }