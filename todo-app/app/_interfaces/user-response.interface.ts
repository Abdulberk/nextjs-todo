import { UserProfile } from "./user-profile.interface";

export interface UserResponse {
    accessToken: string;
    refreshToken: string;
    user: UserProfile;
  }