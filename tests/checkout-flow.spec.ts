import { expect, test } from '@playwright/test';

test('catalog search, coupon, and full checkout flow', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('products-page')).toBeVisible();

  await page.getByTestId('product-search').fill('tea');
  await page.getByTestId('search-submit').click();
  await expect(page.getByTestId('product-card-tea')).toBeVisible();
  await expect(page.getByTestId('product-card-mug')).not.toBeVisible();

  await page.getByTestId('category-filter').selectOption('Beverages');
  await expect(page.getByTestId('product-card-tea')).toBeVisible();
  await expect(page.getByTestId('product-card-honey')).not.toBeVisible();

  await page.getByTestId('add-to-cart-tea').click();
  await page.getByTestId('add-to-cart-tea').click();

  await expect(page.getByTestId('cart-badge')).toHaveText('2');

  await page.getByRole('link', { name: 'Cart' }).click();
  await expect(page.getByTestId('cart-page')).toBeVisible();
  await expect(page.getByTestId('cart-line-tea')).toBeVisible();

  await expect(page.getByTestId('cart-subtotal')).toHaveText('Subtotal: $24.00');
  await expect(page.getByTestId('cart-line-total-tea')).toHaveText('$24.00');

  await page.getByTestId('coupon-input').fill('SAVE10');
  await page.getByTestId('apply-coupon').click();
  await expect(page.getByTestId('coupon-message')).toContainText('Coupon applied');
  await expect(page.getByTestId('cart-discount')).toHaveText('Discount: −$2.40');
  await expect(page.getByTestId('cart-total-due')).toHaveText('Total due: $21.60');

  await page.getByTestId('go-checkout').click();
  await expect(page.getByTestId('checkout-page')).toBeVisible();
  await expect(page.getByTestId('checkout-total-due')).toHaveText('Total due: $21.60');

  const payButton = page.getByTestId('pay-button');
  await expect(payButton).toBeEnabled();

  await payButton.click();
  await expect(page.getByTestId('success-message')).toContainText('successful');
});
