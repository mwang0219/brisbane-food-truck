export interface FoodTruck {
  truck_id: string;
  name: string;
  category: string;
  bio: string | null;
  avatar: string;
  cover_photo: string;
  website: string | null;
  facebook_url: string | null;
  instagram_handle: string | null;
  twitter_handle: string | null;
}

export interface FoodTruckResponse {
  total_count: number;
  results: FoodTruck[];
}

export interface ApiError {
  message: string;
  status?: number;
} 