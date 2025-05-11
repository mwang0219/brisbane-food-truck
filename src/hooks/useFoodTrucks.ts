'use client';

import useSWR from 'swr';
import { getFoodTrucks } from '@/services/api';
import { FoodTruckWithSocialUrls } from '@/types/food-truck';
import { extendFoodTruckWithSocialUrls } from '@/utils/social-media';
import { FoodTruck } from '@/types/api';

export function useFoodTrucks() {
  const { data, error, isLoading, mutate } = useSWR<FoodTruckWithSocialUrls[]>(
    'food-trucks',
    async () => {
      const response = await getFoodTrucks();
      console.log('API Response:', response.results[0]);
      return response.results.map(extendFoodTruckWithSocialUrls);
    }
  );

  return {
    foodTrucks: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useFoodTruck(id: string) {
  const { data, error, isLoading, mutate } = useSWR<FoodTruckWithSocialUrls | null>(
    id ? `food-truck-${id}` : null,
    async () => {
      const response = await getFoodTrucks();
      const truck = response.results.find((t: FoodTruck) => t.truck_id === id);
      return truck ? extendFoodTruckWithSocialUrls(truck) : null;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 5000,
      errorRetryCount: 3,
    }
  );

  return {
    foodTruck: data,
    isLoading,
    isError: error,
    mutate,
  };
} 