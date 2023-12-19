export interface Product {
  id?: string;
  price: string;
  created_at?: string;
  category: string;
  description: string;
  quantity: number;
  user_id?: string;
  name: string;
  updated_at?: string;
  photos?: string[];
}

export interface User {
  address?: string;
  birthdate?: string;
  city?: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  user_id: string;
  photo_url?: string;
}

export interface Category {
  key: string;
  name: string;
}
export interface UserProfile {
  role: "admin" | "user";
}

export * from "./zodTypes";
