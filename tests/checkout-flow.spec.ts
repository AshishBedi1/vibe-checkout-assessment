import { expect, test } from '@playwright/test';

test('full checkout flow passes when cart, checkout, and payment work', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('products-page')).toBeVisible();

  await page.getByTestId('add-to-cart-tea').click();
  await page.getByTestId('add-to-cart-tea').click();

  await expect(page.getByTestId('cart-badge')).toHaveText('2');

  await page.getByRole('link', { name: 'Cart' }).click();
  await expect(page.getByTestId('cart-page')).toBeVisible();
  await expect(page.getByTestId('cart-line-tea')).toBeVisible();

  await expect(page.getByTestId('cart-subtotal')).toHaveText('Subtotal: $24.00');
  await expect(page.getByTestId('cart-line-total-tea')).toHaveText('$24.00');

  await page.getByTestId('go-checkout').click();
  await expect(page.getByTestId('checkout-page')).toBeVisible();
  await expect(page.getByTestId('checkout-subtotal')).toHaveText('Total due: $24.00');

  const payButton = page.getByTestId('pay-button');
  await expect(payButton).toBeEnabled();

  await payButton.click();
  await expect(page.getByTestId('success-message')).toContainText('successful');
});
