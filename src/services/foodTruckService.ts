import { FoodTruck, FoodTruckResponse } from '@/types/api';
import { ApiService } from './api';
import { API_ENDPOINTS, API_LIMIT } from '@/config/api';

export class FoodTruckService {
  static async getAllFoodTrucks(): Promise<FoodTruck[]> {
    try {
      // First batch
      const firstBatch = await ApiService.get<FoodTruckResponse>(
        `${API_ENDPOINTS.FOOD_TRUCKS}?limit=${API_LIMIT}&offset=0`
      );

      // Second batch
      const secondBatch = await ApiService.get<FoodTruckResponse>(
        `${API_ENDPOINTS.FOOD_TRUCKS}?limit=${API_LIMIT}&offset=${API_LIMIT}`
      );

      // Combine results
      return [...firstBatch.results, ...secondBatch.results];
    } catch (error) {
      console.error('Error fetching food trucks:', error);
      throw error;
    }
  }

  static async getFoodTruckById(id: string): Promise<FoodTruck | null> {
    try {
      const response = await ApiService.get<FoodTruckResponse>(
        `${API_ENDPOINTS.FOOD_TRUCKS}?where=truck_id="${id}"`
      );
      return response.results[0] || null;
    } catch (error) {
      console.error(`Error fetching food truck with id ${id}:`, error);
      throw error;
    }
  }
} 