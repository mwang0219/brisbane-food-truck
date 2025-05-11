'use client';

import { useState, useMemo } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Sidebar } from '@/components/layout/sidebar';
import { FoodTruckList } from '@/components/FoodTruckList';
import { useFoodTrucks } from '@/hooks/useFoodTrucks';

export default function TrucksPage() {
  const { foodTrucks } = useFoodTrucks();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

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
      <div className="flex w-full">
        <div className="w-64 border-r">
          <Sidebar
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        <div className="flex-1 px-4">
          <FoodTruckList 
            selectedCategories={selectedCategories}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </MainLayout>
  );
} 