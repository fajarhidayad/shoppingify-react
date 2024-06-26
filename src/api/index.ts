import axios from 'axios';

const BASE_URL_API = import.meta.env.VITE_BASE_URL_API as string;

export const api = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
