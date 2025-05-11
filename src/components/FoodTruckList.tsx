'use client';

import { useFoodTrucks } from '@/hooks/useFoodTrucks';
import { Button } from '@/components/ui/button';

export function FoodTruckList() {
  const { foodTrucks, isLoading, isError, mutate } = useFoodTrucks();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p>Error loading food trucks</p>
        <Button onClick={() => mutate()}>Retry</Button>
      </div>
    );
  }

  if (!foodTrucks?.length) {
    return <div>No food trucks found</div>;
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