'use client';

import { ExternalLink, Facebook } from 'lucide-react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { FoodTruck } from '@/types/api';

interface FoodTruckCardProps {
  truck: FoodTruck;
}

export function FoodTruckCard({ truck }: FoodTruckCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* 左侧图片 */}
          <div className="flex-shrink-0">
            <img
              src={truck.avatar}
              alt={truck.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
          </div>

          {/* 右侧内容 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg truncate">{truck.name}</h3>
                {truck.category && (
                  <span className="inline-block px-2 py-1 text-xs bg-gray-100 rounded-full mt-1">
                    {truck.category}
                  </span>
                )}
              </div>
              {/* 社交媒体链接 */}
              <div className="flex gap-2 ml-2">
                {truck.website && (
                  <a
                    href={truck.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {truck.facebook_url && (
                  <a
                    href={truck.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
            {truck.bio && (
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {truck.bio}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 