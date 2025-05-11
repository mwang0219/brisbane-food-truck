'use client';

import { useState, useMemo } from 'react';
import { useFoodTrucks } from '@/hooks/useFoodTrucks';
import { useDebounce } from '@/hooks/useDebounce';
import { Loading } from '@/components/ui/loading';
import { ErrorMessage } from '@/components/ui/error-message';
import { Search } from '@/components/ui/search';
import { FoodTruck } from '@/types/api';

interface FoodTruckListProps {
  selectedCategories: string[];
}

export function FoodTruckList({ selectedCategories }: FoodTruckListProps) {
  const { foodTrucks, isLoading, isError, mutate } = useFoodTrucks();
  const [searchQuery, setSearchQuery] = useState('');
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
    <div className="space-y-6">
      <div className="max-w-md">
        <Search
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="搜索美食车名称、类别或描述..."
        />
      </div>

      {filteredTrucks.length === 0 ? (
        <ErrorMessage message="没有找到匹配的美食车" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTrucks.map((truck) => (
            <div
              key={truck.truck_id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={truck.avatar}
                alt={truck.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{truck.name}</h3>
              <p className="text-sm text-gray-600">{truck.category || '未分类'}</p>
              {truck.bio && (
                <p className="mt-2 text-sm text-gray-500 line-clamp-3">{truck.bio}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 