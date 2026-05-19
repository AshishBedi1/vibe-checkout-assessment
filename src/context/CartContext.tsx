import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode
} from 'react';
import { COUPON_PERCENT, VALID_COUPON_CODE } from '../data/products';
import type { CartItem } from '../types';

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  couponPercent: number;
  discountAmount: number;
  totalDue: number;
  couponMessage: string | null;
  addProduct: (productId: string, name: string, unitPrice: number) => void;
  removeItem: (productId: string) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  applyCoupon: (code: string) => boolean;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponPercent, setCouponPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  const addProduct = useCallback((productId: string, name: string, unitPrice: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { productId, name, unitPrice, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const incrementQuantity = useCallback((productId: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  }, []);

  const decrementQuantity = useCallback((productId: string) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const applyCoupon = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === VALID_COUPON_CODE) {
      setCouponPercent(COUPON_PERCENT);
      setCouponMessage(`Coupon applied: ${COUPON_PERCENT}% off`);
      return true;
    }
    setCouponPercent(0);
    setCouponMessage('Invalid coupon code');
    return false;
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCouponPercent(0);
    setCouponMessage(null);
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const discountAmount = useMemo(
    () => Math.round(subtotal * (couponPercent / 100) * 100) / 100,
    [subtotal, couponPercent]
  );

  const totalDue = useMemo(
    () => Math.max(0, Math.round((subtotal - discountAmount) * 100) / 100),
    [subtotal, discountAmount]
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      couponPercent,
      discountAmount,
      totalDue,
      couponMessage,
      addProduct,
      removeItem,
      incrementQuantity,
      decrementQuantity,
      applyCoupon,
      clearCart
    }),
    [
      items,
      itemCount,
      subtotal,
      couponPercent,
      discountAmount,
      totalDue,
      couponMessage,
      addProduct,
      removeItem,
      incrementQuantity,
      decrementQuantity,
      applyCoupon,
      clearCart
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
