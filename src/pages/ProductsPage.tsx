import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

export function ProductsPage() {
  return (
    <section data-testid="products-page">
      <h1>Products</h1>
      <div className="product-grid">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
