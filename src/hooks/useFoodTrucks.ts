import useSWR from 'swr';
import { FoodTruck, FoodTruckResponse } from '@/types/api';
import { API_ENDPOINTS, API_LIMIT } from '@/config/api';
import { fetcher } from '@/lib/fetcher';

export function useFoodTrucks() {
  const { data, error, isLoading, mutate } = useSWR<FoodTruck[]>(
    'food-trucks',
    async () => {
      // First batch
      const firstBatch = await fetcher<FoodTruckResponse>(
        `${API_ENDPOINTS.FOOD_TRUCKS}?limit=${API_LIMIT}&offset=0`
      );

      // Second batch
      const secondBatch = await fetcher<FoodTruckResponse>(
        `${API_ENDPOINTS.FOOD_TRUCKS}?limit=${API_LIMIT}&offset=${API_LIMIT}`
      );

      // Combine results
      return [...firstBatch.results, ...secondBatch.results];
    },
    {
      revalidateOnFocus: false, // 禁用窗口聚焦时重新验证
      revalidateOnReconnect: true, // 重新连接时重新验证
      dedupingInterval: 5000, // 5秒内的重复请求会被合并
      errorRetryCount: 3, // 错误重试次数
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
  const { data, error, isLoading, mutate } = useSWR<FoodTruck | null>(
    id ? `food-truck-${id}` : null,
    async () => {
      const response = await fetcher<FoodTruckResponse>(
        `${API_ENDPOINTS.FOOD_TRUCKS}?where=truck_id="${id}"`
      );
      return response.results[0] || null;
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