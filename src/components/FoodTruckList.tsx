'use client';

import { useMemo } from 'react';
import { useFoodTrucks } from '@/hooks/useFoodTrucks';
import { useDebounce } from '@/hooks/useDebounce';
import { Loading } from '@/components/ui/loading';
import { ErrorMessage } from '@/components/ui/error-message';
import { FoodTruckCard } from '@/components/FoodTruckCard';

interface FoodTruckListProps {
  selectedCategories: string[];
  searchQuery: string;
}

export function FoodTruckList({ selectedCategories, searchQuery }: FoodTruckListProps) {
  const { foodTrucks, isLoading, isError, mutate } = useFoodTrucks();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredTrucks = useMemo(() => {
    if (!foodTrucks) return [];
    
    return foodTrucks.filter((truck) => {
      const searchLower = debouncedSearchQuery.toLowerCase();
      const matchesSearch =
        truck.name.toLowerCase().includes(searchLower) ||
        (truck.category?.toLowerCase() || '').includes(searchLower) ||
        (truck.bio?.toLowerCase() || '').includes(searchLower);
      
      const matchesCategory = 
        selectedCategories.length === 0 || 
        (truck.category && selectedCategories.includes(truck.category));
      
      return matchesSearch && matchesCategory;
    });
  }, [foodTrucks, debouncedSearchQuery, selectedCategories]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message="加载美食车数据时发生错误"
        onRetry={() => mutate()}
      />
    );
  }

  if (!foodTrucks?.length) {
    return (
      <ErrorMessage
        message="暂无美食车数据"
      />
    );
  }

  return (
    <div>
      {filteredTrucks.length === 0 ? (
        <ErrorMessage message="没有找到匹配的美食车" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTrucks.map((truck) => (
            <FoodTruckCard key={truck.truck_id} truck={truck} />
          ))}
        </div>
      )}
    </div>
  );
} 