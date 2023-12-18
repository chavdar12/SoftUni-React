export interface Product {
  id: string;
  price: number;
  created_at: string;
  category: string;
  description: string;
  size: string;
  user_id: string;
  name: string;
  updated_at: string;
  photos: string[];
}

export * from "./zodTypes";
