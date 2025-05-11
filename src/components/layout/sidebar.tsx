'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

export function Sidebar({
  categories,
  selectedCategories,
  onCategoryChange,
}: SidebarProps) {
  const handleCategoryToggle = (category: string) => {
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    onCategoryChange(newSelectedCategories);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">分类筛选</h2>
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                />
                <Label htmlFor={category}>{category}</Label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* 预留历史记录功能的位置 */}
      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold mb-4">历史记录</h2>
        <p className="text-sm text-gray-500">即将推出...</p>
      </div>
    </div>
  );
} 