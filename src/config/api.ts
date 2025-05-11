export const API_BASE_URL = 'https://data.brisbane.qld.gov.au/api/explore/v2.1/catalog/datasets';

export const API_ENDPOINTS = {
  FOOD_TRUCKS: `${API_BASE_URL}/brisbane-food-trucks/records`,
  BOOKINGS: `${API_BASE_URL}/brisbane-food-trucks-bookings/records`
} as const;

export const API_LIMIT = 100; 