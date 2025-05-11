import { ApiService } from '@/services/api';

export const fetcher = async <T>(url: string): Promise<T> => {
  return ApiService.get<T>(url);
}; 