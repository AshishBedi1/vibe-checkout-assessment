import type { CartItem } from '../types';

export function CartLine({ item }: { item: CartItem }) {
  const lineTotal = item.unitPrice * item.quantity;

  return (
    <div className="cart-line" data-testid={`cart-line-${item.productId}`}>
      <span>
        {item.name} × {item.quantity}
      </span>
      <span data-testid={`cart-line-total-${item.productId}`}>${lineTotal.toFixed(2)}</span>
    </div>
  );
}
