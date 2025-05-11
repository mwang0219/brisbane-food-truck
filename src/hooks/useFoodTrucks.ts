'use client';

import useSWR from 'swr';
import { getFoodTrucks } from '@/services/api/api';
import { FoodTruckWithSocialUrls } from '@/types/food-truck';

export function useFoodTrucks() {
  const { data, error, isLoading, mutate } = useSWR<FoodTruckWithSocialUrls[]>(
    'food-trucks',
    getFoodTrucks
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
      const trucks = await getFoodTrucks();
      return trucks.find(t => t.truck_id === id) || null;
    }
  );

  return {
    foodTruck: data,
    isLoading,
    isError: error,
    mutate,
  };
} 