import { ApiError, FoodTruckResponse } from '@/types/api';
import { API_ENDPOINTS, API_LIMIT } from '@/config/api';
import { fetcher } from '@/lib/fetcher';
import { handleApiError } from '@/utils/error-handler';
import { extendFoodTruckWithSocialUrls } from '@/utils/social-media';
import { FoodTruckWithSocialUrls } from '@/types/food-truck';

export class ApiService {
  private static async fetchWithErrorHandling<T>(
    url: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw response;
      }
      
      return await response.json();
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async get<T>(url: string, options?: RequestInit): Promise<T> {
    return this.fetchWithErrorHandling<T>(url, {
      ...options,
      method: 'GET',
    });
  }
}

export async function getFoodTrucks(): Promise<FoodTruckWithSocialUrls[]> {
  try {
    // First batch
    const firstBatch = await fetcher<FoodTruckResponse>(
      `${API_ENDPOINTS.FOOD_TRUCKS}?limit=${API_LIMIT}&offset=0`
    );

    // Second batch
    const secondBatch = await fetcher<FoodTruckResponse>(
      `${API_ENDPOINTS.FOOD_TRUCKS}?limit=${API_LIMIT}&offset=${API_LIMIT}`
    );

    // Combine and transform results
    const allTrucks = [...firstBatch.results, ...secondBatch.results];
    return allTrucks.map(extendFoodTruckWithSocialUrls);
  } catch (error) {
    throw handleApiError(error);
  }
} 