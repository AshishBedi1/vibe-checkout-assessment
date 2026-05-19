export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Beverages' | 'Pantry';
}

export interface CartItem {
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface CheckoutResult {
  ok: boolean;
  orderId?: string;
  message?: string;
}

export type ProductCategory = Product['category'] | 'all';
export type ProductSort = 'name-asc' | 'price-asc' | 'price-desc';
