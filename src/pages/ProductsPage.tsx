import { useMemo, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCT_CATEGORIES, PRODUCTS } from '../data/products';
import type { ProductCategory, ProductSort } from '../types';
import { filterProducts } from '../utils/productFilters';

export function ProductsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<ProductCategory>('all');
  const [sort, setSort] = useState<ProductSort>('name-asc');

  const visible = useMemo(
    () => filterProducts(PRODUCTS, { search, category, sort }),
    [search, category, sort]
  );

  return (
    <section data-testid="products-page">
      <h1>Products</h1>

      <div className="catalog-toolbar" data-testid="catalog-toolbar">
        <label className="field">
          Search
          <input
            type="search"
            placeholder="Search by name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-testid="product-search"
          />
        </label>
        <label className="field">
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ProductCategory)}
            data-testid="category-filter"
          >
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'All categories' : c}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as ProductSort)}
            data-testid="sort-products"
          >
            <option value="name-asc">Name (A–Z)</option>
            <option value="price-asc">Price (low to high)</option>
            <option value="price-desc">Price (high to low)</option>
          </select>
        </label>
        <button
          type="button"
          className="btn-secondary"
          data-testid="search-submit"
          onClick={() => setSearch((s) => s.trim())}
        >
          Search
        </button>
      </div>

      {visible.length === 0 ? (
        <p className="empty-catalog" data-testid="no-products">
          No products match your filters.
        </p>
      ) : (
        <div className="product-grid" data-testid="product-results">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
