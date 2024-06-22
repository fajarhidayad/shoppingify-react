import { z } from 'zod';
import { api } from '.';

// interface FetchHelperOpts {
//   method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   data?: Record<string, any>;
//   headers?: HeadersInit;
// }
// async function fetchHelper<T>(
//   url: string,
//   options: FetchHelperOpts = {}
// ): Promise<T> {
//   const { method = 'GET', data, headers = {} } = options;

//   const defaultHeaders: HeadersInit = {
//     'Content-Type': 'application/json',
//     ...headers,
//   };

//   const fetchOptions: RequestInit = {
//     method,
//     headers: defaultHeaders,
//   };

//   if (data) fetchOptions.body = JSON.stringify(data);

//   const response = await fetch(url, fetchOptions);

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || 'Something went wrong');
//   }

//   return response.json();
// }

class ErrorResponse extends Error {
  statusCode: number;
  constructor(name: string, message: string, statusCode: number) {
    super();
    this.name = name;
    this.message = message;
    this.statusCode = statusCode;
  }
}

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(6).max(32),
});

export const registerSchema = z.object({
  name: z.string().trim().max(100),
  email: z.string().email(),
  password: z.string().trim().min(6).max(32),
});

export type LoginParams = z.infer<typeof loginSchema>;
export type RegisterParams = z.infer<typeof registerSchema>;

export async function login(data: LoginParams) {
  try {
    const res = await api.post('/auth/login', data);

    if (res.data.access_token) {
      return res.data as { access_token: string };
    } else {
      throw new Error('Something went wrong');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const res = error.response.data;
    throw new ErrorResponse(res.error, res.message, res.statusCode);
  }
}

export async function registerFn(data: RegisterParams) {
  return data;
}
