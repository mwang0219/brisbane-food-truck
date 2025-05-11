import { Booking, FoodTruck, BookingWithTruck } from '@/types/api';

/**
 * Maps food truck details to bookings based on truck_id
 * @param bookings Array of bookings
 * @param foodTrucks Array of food trucks
 * @returns Array of bookings with mapped food truck details
 */
export function mapBookingsWithTrucks(
  bookings: Booking[],
  foodTrucks: FoodTruck[]
): BookingWithTruck[] {
  // Create a map of food trucks for quick lookup
  const foodTruckMap = new Map(
    foodTrucks.map(truck => [truck.truck_id, truck])
  );

  // Map bookings with their corresponding food truck details
  return bookings.map(booking => ({
    ...booking,
    foodTruckDetails: booking.truck_id ? foodTruckMap.get(booking.truck_id) : undefined
  }));
} 