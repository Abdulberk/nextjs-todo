import { Role } from "../_enums/role.enum";

export interface UserProfile {
    id: number | string;
    email: string;
    name: string;
    role: Role
    createdAt: string;
    updatedAt: string;
  }
  