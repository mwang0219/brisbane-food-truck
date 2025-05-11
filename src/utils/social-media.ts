import { FoodTruck } from '@/types/api';
import { FoodTruckWithSocialUrls } from '@/types/food-truck';

/**
 * 生成社交媒体 URL
 */

/**
 * 生成 Instagram URL
 * @param handle Instagram 用户名（不包含 @ 符号）
 * @returns Instagram 个人主页 URL
 */
export function generateInstagramUrl(handle: string | null): string | null {
  if (!handle) return null;
  // 移除可能的 @ 符号
  const cleanHandle = handle.replace('@', '');
  return `https://instagram.com/${cleanHandle}`;
}

/**
 * 生成 Twitter URL
 * @param handle Twitter 用户名（不包含 @ 符号）
 * @returns Twitter 个人主页 URL
 */
export function generateTwitterUrl(handle: string | null): string | null {
  if (!handle) return null;
  // 移除可能的 @ 符号
  const cleanHandle = handle.replace('@', '');
  return `https://twitter.com/${cleanHandle}`;
}

/**
 * 扩展 FoodTruck 数据，添加社交媒体 URL
 * @param truck 原始 FoodTruck 数据
 * @returns 扩展后的 FoodTruck 数据
 */
export function extendFoodTruckWithSocialUrls(truck: FoodTruck): FoodTruckWithSocialUrls {
  return {
    ...truck,
    instagram_url: generateInstagramUrl(truck.instagram_handle),
    twitter_url: generateTwitterUrl(truck.twitter_handle),
  };
} 