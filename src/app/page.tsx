'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { BookingList } from '@/components/BookingList';
import { Map } from '@/components/Map';

export default function Home() {
  return (
    <MainLayout>
      <div className="container mx-auto py-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：预订列表 */}
          <div className="bg-card rounded-lg shadow">
            <BookingList />
          </div>

          {/* 右侧：地图 */}
          <div className="bg-card rounded-lg shadow h-[800px]">
            <Map />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
