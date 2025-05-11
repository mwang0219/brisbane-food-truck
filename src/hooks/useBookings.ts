import useSWR from 'swr';
import { getBookingsWithTrucks } from '@/services/api/api';
import { useFoodTrucks } from './useFoodTrucks';
import { BookingResponseWithTrucks } from '@/types/api';

export function useBookings() {
  const { foodTrucks } = useFoodTrucks();

  const { data: bookings, error, isLoading } = useSWR<BookingResponseWithTrucks>(
    foodTrucks ? ['bookings', foodTrucks] : null,
    () => getBookingsWithTrucks(foodTrucks || [])
  );

  return {
    bookings,
    isLoading,
    isError: error,
    error,
  };
} 