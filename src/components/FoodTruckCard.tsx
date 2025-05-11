'use client';

import { FoodTruckWithSocialUrls } from '@/types/food-truck';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Facebook, Instagram, Twitter, Globe } from 'lucide-react';

interface FoodTruckCardProps {
  truck: FoodTruckWithSocialUrls;
}

export function FoodTruckCard({ truck }: FoodTruckCardProps) {
  return (
    <Card className="relative transition-all duration-300 ease-in-out hover:-translate-y-1 hover:z-10 hover:shadow-lg">
      <CardContent className="p-4 flex items-start gap-4">
        <Avatar className="h-16 w-16 flex-shrink-0">
          <AvatarImage src={truck.avatar || ''} alt={truck.name} />
          <AvatarFallback>{truck.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate">{truck.name}</h3>
          <p className="text-sm text-muted-foreground truncate">
            {truck.category || '未分类'}
          </p>
          {truck.bio && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2 hover:line-clamp-none transition-all duration-300">
              {truck.bio}
            </p>
          )}
          <div className="flex gap-2 mt-2">
            {truck.website && (
              <a
                href={truck.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Globe className="h-4 w-4" />
              </a>
            )}
            {truck.instagram_url && (
              <a
                href={truck.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
            )}
            {truck.twitter_url && (
              <a
                href={truck.twitter_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            )}
            {truck.facebook_url && (
              <a
                href={truck.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 