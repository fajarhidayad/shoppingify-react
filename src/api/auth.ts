import axios from 'axios';
import { z } from 'zod';

const BASE_URL_API = import.meta.env.BASE_URL_API as string;

const api = axios.create({
  baseURL: BASE_URL_API,
});

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
    const response = await api.post('/login', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function registerFn(data: RegisterParams) {
  try {
    const response = await api.post('/register', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
