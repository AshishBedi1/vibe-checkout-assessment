import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function Layout({ children }: { children: React.ReactNode }) {
  const { itemCount } = useCart();

  return (
    <div className="app-shell">
      <nav className="nav" data-testid="main-nav">
        <NavLink to="/" end>
          Products
        </NavLink>
        <NavLink to="/cart">
          Cart
          {itemCount > 0 ? (
            <span className="badge" data-testid="cart-badge">
              {itemCount}
            </span>
          ) : null}
        </NavLink>
        <NavLink to="/checkout">Checkout</NavLink>
      </nav>
      {children}
    </div>
  );
}
