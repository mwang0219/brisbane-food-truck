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

export interface Booking {
  type: string;
  title: string;
  food_truck: string | null;
  start: string;
  finish: string;
  address: string | null;
  geolocation: string | null;
  truck_id: string | null;
  site_id: string | null;
  geolocation_coordinates: string | null;
  longitude: number;
  latitude: number;
  street: string | null;
  suburb: string | null;
  state: string | null;
  postcode: string | null;
  geopoint: {
    lon: number;
    lat: number;
  };
  name: string | null;
  category: string | null;
  bio: string | null;
}

export interface BookingResponse {
  total_count: number;
  results: Booking[];
}

export interface BookingWithTruck extends Booking {
  foodTruckDetails?: FoodTruck;
}

export interface BookingResponseWithTrucks {
  total_count: number;
  results: BookingWithTruck[];
} 