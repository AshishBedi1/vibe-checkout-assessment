import type { Product, ProductCategory, ProductSort } from '../types';

export interface ProductFilterOptions {
  search: string;
  category: ProductCategory;
  sort: ProductSort;
}

/** Filter and sort catalog for the products page. */
export function filterProducts(products: Product[], options: ProductFilterOptions): Product[] {
  const search = options.search.trim();
  let list = [...products];

  if (search) {
    const q = search.toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(q));
  }

  if (options.category !== 'all') {
    list = list.filter((p) => p.category === options.category);
  }

  list.sort((a, b) => {
    switch (options.sort) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return list;
}
