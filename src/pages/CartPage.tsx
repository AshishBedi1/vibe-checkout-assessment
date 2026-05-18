import { Link } from 'react-router-dom';
import { CartLine } from '../components/CartLine';
import { useCart } from '../context/CartContext';

export function CartPage() {
  const { items, subtotal, itemCount } = useCart();

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
          <p className="totals" data-testid="cart-subtotal">
            Subtotal: ${subtotal.toFixed(2)}
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
