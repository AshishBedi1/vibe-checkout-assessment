import { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitCheckout } from '../api/checkoutClient';
import { useCart } from '../context/CartContext';

export function CheckoutPage() {
  const { items, subtotal, itemCount, totalDue, discountAmount, clearCart } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paying, setPaying] = useState(false);

  const canPay = items.length === 0;

  async function handlePay() {
    setError(null);
    setSuccess(null);
    setPaying(true);
    try {
      const totalCents = Math.round(totalDue * 100);
      const result = await submitCheckout(totalCents);
      if (!result.ok) {
        setError(result.message || 'Payment failed');
        return;
      }
      setSuccess(result.message || 'Order placed');
      setOrderComplete(true);
      clearCart();
    } catch {
      setError('Unexpected error during checkout');
    } finally {
      setPaying(false);
    }
  }

  return (
    <section data-testid="checkout-page">
      <h1>Checkout</h1>
      {orderComplete && success ? (
        <div className="success-banner" data-testid="success-message">
          {success}
        </div>
      ) : null}
      {!orderComplete && items.length === 0 ? (
        <p>
          Nothing to checkout. <Link to="/">Browse products</Link>
        </p>
      ) : null}
      {!orderComplete && items.length > 0 ? (
        <>
          <p data-testid="checkout-subtotal">Subtotal: ${subtotal.toFixed(2)}</p>
          {discountAmount > 0 ? (
            <p data-testid="checkout-discount">Discount: −${discountAmount.toFixed(2)}</p>
          ) : null}
          <p data-testid="checkout-total-due">Total due: ${totalDue.toFixed(2)}</p>
          <p data-testid="checkout-item-count">Items: {itemCount}</p>
          <button
            type="button"
            className="btn-primary"
            data-testid="pay-button"
            disabled={!canPay || paying}
            onClick={handlePay}
          >
            {paying ? 'Processing…' : 'Pay now'}
          </button>
          {error ? (
            <div className="error-banner" data-testid="checkout-error">
              {error}
            </div>
          ) : null}
        </>
      ) : null}
    </section>
  );
}
