import { z } from 'zod';
import { api } from '.';
import { ErrorResponse } from './error-response';

export interface CategoryItem {
  id: number;
  name: string;
  items: Item[];
}

export interface Item {
  id: number;
  name: string;
  imageUrl?: string;
  note?: string;
  userId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}

export async function getItems() {
  try {
    const res = await api.get('/items');
    return res.data as CategoryItem[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const res = error.response.data;
    throw new ErrorResponse(res.error, res.message, res.statusCode);
  }
}

export const createItemSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(50).trim(),
  note: z.union([z.string().max(255).nullish(), z.literal('')]),
  imageUrl: z.union([z.string().max(255).nullish(), z.literal('')]),
  categoryName: z
    .string()
    .min(1, { message: 'Category is required' })
    .max(50)
    .trim(),
});

export type CreateItem = z.infer<typeof createItemSchema>;

export async function createItem(data: CreateItem) {
  try {
    const res = await api.post('/items', data);
    return res.data as Item[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const res = error.response.data;
    throw new ErrorResponse(res.error, res.message, res.statusCode);
  }
}
