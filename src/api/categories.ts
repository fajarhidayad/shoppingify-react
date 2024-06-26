import { api } from '.';
import { ErrorResponse } from './error-response';

export interface Category {
  id: number;
  name: string;
}

export async function getCategories() {
  try {
    const res = await api.get('/categories');
    return res.data as Category[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const res = error.response.data;
    throw new ErrorResponse(res.error, res.message, res.statusCode);
  }
}
