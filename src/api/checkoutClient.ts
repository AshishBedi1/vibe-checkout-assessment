import type { CheckoutResult } from '../types';

/**
 * Simulated checkout API used by the assessment app.
 */
export async function submitCheckout(totalCents: number): Promise<CheckoutResult> {
  await new Promise((r) => setTimeout(r, 120));

  if (!Number.isFinite(totalCents) || totalCents <= 0) {
    return { ok: false, message: 'Invalid payment amount' };
  }

  return {
    ok: true,
    orderId: `ord_${Date.now()}`,
    message: 'Payment successful'
  };
}
