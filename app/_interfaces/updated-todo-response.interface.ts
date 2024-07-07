import { Status } from "../_enums/todo-status.enum";

export interface UpdatedTodoResponse {
    id : number | string;
    title?: string;
    description?: string;
    status?: Status
    createdAt?: string;
    updatedAt?: string;
    userId?: number | string;

  }