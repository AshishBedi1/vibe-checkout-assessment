import type { Product, ProductCategory, ProductSort } from '../types';

export interface ProductFilterOptions {
  search: string;
  category: ProductCategory;
  sort: ProductSort;
}

/** Filter and sort catalog for the products page. */
export function filterProducts(products: Product[], options: ProductFilterOptions): Product[] {
  const search = options.search;
  let list = [...products];

  if (search) {
    list = list.filter((p) => p.name.includes(search));
  }

  if (options.category !== 'all') {
    list = list.filter((p) => p.category.toLowerCase() === options.category);
  }

  list.sort((a, b) => {
    switch (options.sort) {
      case 'price-asc':
        return b.price - a.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return list;
}
