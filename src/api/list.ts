import { z } from 'zod';
import { api } from '.';
import { ErrorResponse } from './error-response';
import { Item } from './items';

export interface List {
  id: number;
  name: string;
  status: 'ACTIVE' | 'CANCELLED' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
}

export async function getAllLists() {
  try {
    const res = await api.get('/lists');
    return res.data as List[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const res = error.response.data;
    throw new ErrorResponse(res.error, res.message, res.statusCode);
  }
}

export async function getListDetails(id: number) {
  try {
    const res = await api.get(`/lists/${id}`);
    return res.data as List;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const res = error.response.data;
    throw new ErrorResponse(res.error, res.message, res.statusCode);
  }
}

export async function getActiveList() {
  try {
    const res = await api.get('/lists/active');
    return res.data as List & {
      itemListDetails: Item[];
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
    const res = error.response.data;
    throw new ErrorResponse(res.error, res.message, res.statusCode);
  }
}

export const createItemSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(50).trim(),
});

export type CreateItem = z.infer<typeof createItemSchema>;

export async function createList(data: CreateItem) {
  try {
    const res = await api.post('/lists', data);
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const res = error.response.data;
    console.log(error);
    throw new ErrorResponse(res.error, res.message, res.statusCode);
  }
}
