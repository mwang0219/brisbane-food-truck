import { ApiError } from '@/types/api';
import { FoodTruckResponse } from '@/types/api';
import { API_ENDPOINTS, API_LIMIT } from '@/config/api';
import { fetcher } from '@/lib/fetcher';

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
        code: error instanceof Response ? `HTTP_${error.status}` : 'UNKNOWN_ERROR'
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

export async function getFoodTrucks(): Promise<FoodTruckResponse> {
  // First batch
  const firstBatch = await fetcher<FoodTruckResponse>(
    `${API_ENDPOINTS.FOOD_TRUCKS}?limit=${API_LIMIT}&offset=0`
  );

  // Second batch
  const secondBatch = await fetcher<FoodTruckResponse>(
    `${API_ENDPOINTS.FOOD_TRUCKS}?limit=${API_LIMIT}&offset=${API_LIMIT}`
  );

  // Combine results
  return {
    results: [...firstBatch.results, ...secondBatch.results],
    total: firstBatch.total + secondBatch.total
  };
} 