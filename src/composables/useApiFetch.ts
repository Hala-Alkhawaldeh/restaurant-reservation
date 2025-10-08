import axiosInstance from '@/plugins/axios';
import type { AxiosRequestConfig, AxiosError } from 'axios';


export const useApiFetch = async <T = any>(
  url: string,
  options: AxiosRequestConfig = {}
): Promise<{ data: T | null; error: AxiosError | null }> => {
  let data: T | null = null;
  let error: AxiosError | null = null;

  try {
    const response = await axiosInstance({ url, ...options });
    data = response.data as T;
  } catch (err) {
    error = err as AxiosError;
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
  }

  return { data, error };
};
