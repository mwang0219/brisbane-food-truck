export interface FoodTruck {
  truck_id: string;
  name: string;
  category: string | null;
  bio: string | null;
  avatar: string | null;
  website: string | null;
  instagram_handle: string | null;
  twitter_handle: string | null;
  facebook_url: string | null;
}

export interface FoodTruckResponse {
  results: FoodTruck[];
  total: number;
}

export interface ApiError {
  message: string;
  code: string;
} 