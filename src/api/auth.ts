import { z } from 'zod';
import { api } from '.';
import { ErrorResponse } from './error-response';

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
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const res = error.response.data;
    throw new ErrorResponse(res.error, res.message, res.statusCode);
  }
}

export async function registerFn(data: RegisterParams) {
  try {
    const res = await api.post('/auth/register', data);

    return res.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const res = error.response.data;
    throw new ErrorResponse(res.error, res.message, res.statusCode);
  }
}

export async function getProfile() {
  try {
    const res = await api.get('/auth/profile');
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const res = error.response.data;
    throw new ErrorResponse(res.error, res.message, res.statusCode);
  }
}

export async function logoutFn() {
  try {
    const res = await api.post('/auth/logout');
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const res = error.response.data;
    throw new ErrorResponse(res.error, res.message, res.statusCode);
  }
}
