import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { clearToken, getToken } from './authToken';

/**
 * The single axios instance for every HTTP call in the app — never use
 * `axios.get`/`fetch` directly. It attaches the bearer token, toasts failures
 * and bounces rejected sessions back to the login page.
 */
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const status = error.response?.status;

    // backend rejected the token — drop it so the middleware keeps /admin gated
    if (status === 401 || status === 403) {
      clearToken();
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }

    toast.error(apiErrorMessage(error));
    return Promise.reject(error);
  },
);

/** Backend errors come back as `{ message }` — surface that, fall back to a generic line. */
export function apiErrorMessage(error: unknown): string {
  const message = (error as AxiosError<{ message?: string | string[] }>)?.response?.data?.message;
  if (Array.isArray(message)) return message.join(', ');
  if (message) return message;
  return (error as AxiosError)?.response ? 'Something went wrong' : 'Cannot reach the server';
}

/** Backend wraps every payload as `{ data, message }`. */
export type ApiResponse<T> = { data: T; message?: string };
