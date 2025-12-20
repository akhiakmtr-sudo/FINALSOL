
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  images: string[];
  rating: number;
  stock: number;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  address: string;
}

export type AppState = 'HOME' | 'PRODUCT_DETAIL' | 'CART' | 'CHECKOUT' | 'PROFILE' | 'ADMIN' | 'LOGIN' | 'TRACKING' | 'CATEGORY_VIEW';