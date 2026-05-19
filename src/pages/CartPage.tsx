import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CartLine } from '../components/CartLine';
import { useCart } from '../context/CartContext';

export function CartPage() {
  const {
    items,
    subtotal,
    itemCount,
    discountAmount,
    totalDue,
    couponMessage,
    applyCoupon
  } = useCart();
  const [couponInput, setCouponInput] = useState('');

  function handleApplyCoupon() {
    applyCoupon(couponInput);
  }

  return (
    <section data-testid="cart-page">
      <h1>Your cart</h1>
      {items.length === 0 ? (
        <p data-testid="cart-empty">Cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <CartLine key={item.productId} item={item} />
          ))}

          <div className="coupon-row" data-testid="coupon-section">
            <label className="field">
              Coupon code
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="e.g. SAVE10"
                data-testid="coupon-input"
              />
            </label>
            <button
              type="button"
              className="btn-secondary"
              data-testid="apply-coupon"
              onClick={handleApplyCoupon}
            >
              Apply coupon
            </button>
          </div>

          {couponMessage ? (
            <p className="coupon-message" data-testid="coupon-message">
              {couponMessage}
            </p>
          ) : null}

          <p className="totals" data-testid="cart-subtotal">
            Subtotal: ${subtotal.toFixed(2)}
          </p>
          {discountAmount > 0 ? (
            <p data-testid="cart-discount">Discount: −${discountAmount.toFixed(2)}</p>
          ) : null}
          <p className="totals" data-testid="cart-total-due">
            Total due: ${totalDue.toFixed(2)}
          </p>
          <p data-testid="cart-item-count">Items: {itemCount}</p>
          <Link to="/checkout" className="btn-primary" data-testid="go-checkout">
            Go to checkout
          </Link>
        </>
      )}
    </section>
  );
}
