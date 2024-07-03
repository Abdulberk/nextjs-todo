import { Status } from "../_enums/todo-status.enum";

export interface UpdateTodo {
    title?: string;
    description?: string;
    status?: Status
  }
  