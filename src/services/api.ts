import { ApiError } from '@/types/api';

export class ApiService {
  private static async fetchWithErrorHandling<T>(
    url: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : 'An unknown error occurred',
        status: error instanceof Response ? error.status : undefined,
      };
      throw apiError;
    }
  }

  static async get<T>(url: string, options?: RequestInit): Promise<T> {
    return this.fetchWithErrorHandling<T>(url, {
      ...options,
      method: 'GET',
    });
  }
} 