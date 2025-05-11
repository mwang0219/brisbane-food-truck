import { ApiError, FoodTruckResponse, BookingResponse, BookingResponseWithTrucks } from '@/types/api';
import { API_ENDPOINTS, API_LIMIT } from '@/config/api';
import { fetcher } from '@/lib/fetcher';
import { handleApiError } from '@/utils/error-handler';
import { extendFoodTruckWithSocialUrls } from '@/utils/social-media';
import { FoodTruckWithSocialUrls } from '@/types/food-truck';
import { mapBookingsWithTrucks } from '@/utils/booking-mapper';

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

    // Combine and transform results, filter out truck_id "47641"
    const allTrucks = [...firstBatch.results, ...secondBatch.results]
      .filter(truck => truck.truck_id !== "47641");
    return allTrucks.map(extendFoodTruckWithSocialUrls);
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function getBookings(): Promise<BookingResponse> {
  try {
    const response = await fetcher<BookingResponse>(
      `${API_ENDPOINTS.BOOKINGS}?limit=${API_LIMIT}`
    );

    // 处理地址逻辑
    const processedResults = response.results.map(booking => ({
      ...booking,
      address: booking.address || [
        booking.street,
        booking.suburb,
        booking.state,
        booking.postcode
      ].filter(Boolean).join(', ')
    }));

    return {
      ...response,
      results: processedResults
    };
  } catch (error) {
    throw handleApiError(error);
  }
}

/**
 * Combines bookings with food truck details
 * This function is meant to be used with React Query's useQueries
 */
export async function getBookingsWithTrucks(
  foodTrucks: FoodTruckWithSocialUrls[]
): Promise<BookingResponseWithTrucks> {
  try {
    const bookingsResponse = await getBookings();
    return {
      total_count: bookingsResponse.total_count,
      results: mapBookingsWithTrucks(bookingsResponse.results, foodTrucks)
    };
  } catch (error) {
    throw handleApiError(error);
  }
} 