'use client';

import { FoodTruckWithSocialUrls } from '@/types/food-truck';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Facebook, Instagram, Globe } from 'lucide-react';
import Image from 'next/image';

interface FoodTruckCardProps {
  truck: FoodTruckWithSocialUrls;
}

export function FoodTruckCard({ truck }: FoodTruckCardProps) {
  return (
    <Card className="relative transition-all duration-300 ease-in-out hover:-translate-y-1 hover:z-10 hover:shadow-lg group">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="p-4 flex items-start gap-4 relative">
        <Avatar className="h-16 w-16 flex-shrink-0 ring-2 ring-orange-200 group-hover:ring-orange-400 transition-all duration-300">
          <AvatarImage src={truck.avatar || ''} alt={truck.name} />
          <AvatarFallback className="bg-gradient-to-br from-orange-100 to-red-100 text-orange-600">
            {truck.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate group-hover:text-orange-600 transition-colors">
            {truck.name}
          </h3>
          <p className="text-sm text-muted-foreground truncate">
            {truck.category || '未分类'}
          </p>
          {truck.bio && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
              {truck.bio}
            </p>
          )}
        </div>
        {/* 社交媒体图标竖向排列 */}
        <div className="flex flex-col gap-3 items-center border-l border-orange-200 pl-3 ml-2">
          {truck.website && (
            <a
              href={truck.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600 transition-colors hover:scale-110 transform"
              title="访问网站"
            >
              <Globe className="h-5 w-5" />
            </a>
          )}
          {truck.instagram_url && (
            <a
              href={truck.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600 transition-colors hover:scale-110 transform"
              title="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          )}
          {truck.twitter_url && (
            <a
              href={truck.twitter_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transform transition-transform"
              title="X (Twitter)"
            >
              <Image
                src="/X.svg"
                alt="X"
                width={15}
                height={15}
                className="dark:invert [filter:brightness(0)]"
              />
            </a>
          )}
          {truck.facebook_url && (
            <a
              href={truck.facebook_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition-colors hover:scale-110 transform"
              title="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 