import type { Product } from '../types';

export const PRODUCTS: Product[] = [
  { id: 'tea', name: 'Herbal Tea', price: 12, category: 'Beverages' },
  { id: 'syrup', name: 'Maple Syrup', price: 14, category: 'Beverages' },
  { id: 'mug', name: 'Ceramic Mug', price: 18, category: 'Pantry' },
  { id: 'honey', name: 'Local Honey', price: 9, category: 'Pantry' }
];

export const PRODUCT_CATEGORIES = ['all', 'Beverages', 'Pantry'] as const;

export const VALID_COUPON_CODE = 'SAVE10';
export const COUPON_PERCENT = 10;
