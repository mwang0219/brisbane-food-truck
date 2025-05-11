'use client';

import { useBookings } from '@/hooks/useBookings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function BookingList() {
  const { bookings, isLoading, isError } = useBookings();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-[250px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-[200px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return <div>Error loading bookings</div>;
  }

  return (
    <div className="space-y-4">
      {bookings?.results.map((booking) => (
        <Card key={`${booking.title}-${booking.start}`}>
          <CardHeader>
            <CardTitle>{booking.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Time:</span>{' '}
                {new Date(booking.start).toLocaleString()} -{' '}
                {new Date(booking.finish).toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Location:</span>{' '}
                {booking.address}
              </p>
              {booking.foodTruckDetails && (
                <div className="mt-4 border-t pt-4">
                  <h3 className="font-semibold mb-2">Food Truck Details:</h3>
                  <p>
                    <span className="font-semibold">Name:</span>{' '}
                    {booking.foodTruckDetails.name}
                  </p>
                  <p>
                    <span className="font-semibold">Category:</span>{' '}
                    {booking.foodTruckDetails.category}
                  </p>
                  {booking.foodTruckDetails.bio && (
                    <p>
                      <span className="font-semibold">Bio:</span>{' '}
                      {booking.foodTruckDetails.bio}
                    </p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 