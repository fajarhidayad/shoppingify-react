import { api } from '.';
import { ErrorResponse } from './error-response';

interface Item {
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
    return res.data as Item[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const res = error.response.data;
    throw new ErrorResponse(res.error, res.message, res.statusCode);
  }
}
