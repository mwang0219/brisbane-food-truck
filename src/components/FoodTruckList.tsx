'use client';

import { useFoodTrucks } from '@/hooks/useFoodTrucks';
import { Loading } from '@/components/ui/loading';
import { ErrorMessage } from '@/components/ui/error-message';

export function FoodTruckList() {
  const { foodTrucks, isLoading, isError, mutate } = useFoodTrucks();

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {foodTrucks.map((truck) => (
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
          <p className="text-sm text-gray-600">{truck.category}</p>
          {truck.bio && (
            <p className="mt-2 text-sm text-gray-500 line-clamp-3">{truck.bio}</p>
          )}
        </div>
      ))}
    </div>
  );
} 