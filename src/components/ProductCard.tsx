import type { Product } from '../types';
import { useCart } from '../context/CartContext';

export function ProductCard({ product }: { product: Product }) {
  const { addProduct } = useCart();

  return (
    <article className="card" data-testid={`product-card-${product.id}`}>
      <p className="product-category" data-testid={`product-category-${product.id}`}>
        {product.category}
      </p>
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button
        type="button"
        className="btn-primary"
        data-testid={`add-to-cart-${product.id}`}
        onClick={() => addProduct(product.id, product.name, product.price)}
      >
        Add to cart
      </button>
    </article>
  );
}
