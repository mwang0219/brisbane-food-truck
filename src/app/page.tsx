'use client';

import { useState, useMemo } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Sidebar } from '@/components/layout/sidebar';
import { FoodTruckList } from '@/components/FoodTruckList';
import { useFoodTrucks } from '@/hooks/useFoodTrucks';

export default function Home() {
  const { foodTrucks } = useFoodTrucks();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // 提取所有唯一的分类
  const categories = useMemo(() => {
    if (!foodTrucks) return [];
    const uniqueCategories = new Set(
      foodTrucks
        .map((truck) => truck.category)
        .filter((category): category is string => !!category)
    );
    return Array.from(uniqueCategories).sort();
  }, [foodTrucks]);

  return (
    <MainLayout>
      <div className="flex h-full">
        <Sidebar
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
        />
        <div className="flex-1">
          <FoodTruckList selectedCategories={selectedCategories} />
        </div>
      </div>
    </MainLayout>
  );
}
