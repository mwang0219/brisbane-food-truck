'use client';

import { useBookings } from '@/hooks/useBookings';
import { useState } from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

export function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { bookings } = useBookings();

  // 获取选定日期的预订
  const selectedDateBookings = bookings?.results.filter(booking => {
    if (!date) return false;
    const bookingDate = new Date(booking.start);
    return (
      bookingDate.getDate() === date.getDate() &&
      bookingDate.getMonth() === date.getMonth() &&
      bookingDate.getFullYear() === date.getFullYear()
    );
  });

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Calendar</h2>
        <p className="text-sm text-muted-foreground">
          {date ? format(date, 'MMMM d, yyyy') : 'Select a date'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 日历部分 */}
        <div className="bg-card rounded-lg border p-4">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </div>

        {/* 预订列表部分 */}
        <div className="space-y-2">
          <h3 className="font-medium mb-2">Bookings for {date ? format(date, 'MMMM d') : 'selected date'}</h3>
          {selectedDateBookings?.map(booking => (
            <div
              key={`${booking.title}-${booking.start}`}
              className="p-2 rounded-md bg-muted"
            >
              <p className="font-medium">{booking.title}</p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(booking.start), 'h:mm a')} -{' '}
                {format(new Date(booking.finish), 'h:mm a')}
              </p>
              {booking.foodTruckDetails && (
                <p className="text-sm text-muted-foreground">
                  {booking.foodTruckDetails.name}
                </p>
              )}
            </div>
          ))}
          {selectedDateBookings?.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No bookings for this date
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 