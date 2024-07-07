import { ErrorResponse } from "@/app/_interfaces/error-response.interface";
import { UserResponse } from "@/app/_interfaces/user-response.interface";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { UseMutationOptions } from "@tanstack/react-query";
import cookie from 'js-cookie';
import { useRouter } from "next/navigation";







const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function signIn(email: string, password: string): Promise<UserResponse> {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorResponse: ErrorResponse = await response.json();
    throw new Error(errorResponse.message);
  }

  const data: UserResponse = await response.json();
  return data;
}

interface UseLoginProps {
  email: string;
  password: string;
}

async function signOut(): Promise<void> {
  cookie.remove("token");
  cookie.remove("refreshToken");
  cookie.remove("user");
}

export default function useLogin(): {
  signInMutation: UseMutationResult<UserResponse, Error, UseLoginProps>;
} {
  const router = useRouter(); 

  const options: UseMutationOptions<UserResponse, Error, UseLoginProps> = {
    mutationFn: (data: UseLoginProps) => signIn(data.email, data.password),
    onSuccess: (data: UserResponse) => {
      cookie.set("token", data.accessToken);
      cookie.set("refreshToken", data.refreshToken);
      cookie.set("user", JSON.stringify(data.user));
      router.push('/');
    },
    onError: (error: Error) => {
      console.log(error);
    }
  };

  const signInMutation = useMutation(options);

  return { signInMutation };
}

export function useLogout(): {
  signOutMutation: UseMutationResult<void, Error, void>;
} {
  const router = useRouter();

  const options: UseMutationOptions<void, Error, void> = {
    mutationFn: () => signOut(),
    onSuccess: () => {
      router.push('/login');
    },
    onError: (error: Error) => {
      console.log(error);
    },
  };

  const signOutMutation = useMutation(options);

  return { signOutMutation };
}
