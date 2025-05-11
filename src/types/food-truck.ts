import { FoodTruck as BaseFoodTruck } from './api';

/**
 * 扩展的 FoodTruck 类型，包含社交媒体 URL
 */
export interface FoodTruckWithSocialUrls extends BaseFoodTruck {
  instagram_url: string | null;
  twitter_url: string | null;
} 