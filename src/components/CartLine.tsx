import type { CartItem } from '../types';
import { useCart } from '../context/CartContext';

export function CartLine({ item }: { item: CartItem }) {
  const { incrementQuantity, decrementQuantity, removeItem } = useCart();
  const lineTotal = item.unitPrice * item.quantity;

  return (
    <div className="cart-line" data-testid={`cart-line-${item.productId}`}>
      <div className="cart-line-info">
        <span>
          {item.name} × {item.quantity}
        </span>
        <span data-testid={`cart-line-total-${item.productId}`}>${lineTotal.toFixed(2)}</span>
      </div>
      <div className="cart-line-actions">
        <button
          type="button"
          className="btn-secondary btn-sm"
          data-testid={`decrease-${item.productId}`}
          onClick={() => decrementQuantity(item.productId)}
          aria-label={`Decrease ${item.name}`}
        >
          −
        </button>
        <button
          type="button"
          className="btn-secondary btn-sm"
          data-testid={`increase-${item.productId}`}
          onClick={() => incrementQuantity(item.productId)}
          aria-label={`Increase ${item.name}`}
        >
          +
        </button>
        <button
          type="button"
          className="btn-secondary btn-sm"
          data-testid={`remove-${item.productId}`}
          onClick={() => removeItem(item.productId)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
