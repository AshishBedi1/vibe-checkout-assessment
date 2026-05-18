export interface Product {
  id: string;
  name: string;
  price: number;
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
