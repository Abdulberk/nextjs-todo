import { Role } from "../_enums/role.enum";


export interface User {
    id: number | string;
    email: string;
    name: string;
    password?: string;
    role: Role
    createdAt: string;
    updatedAt: string;
  }