# Maintainer notes (not for candidates)

## Three bugs on `bug/vibe/multi-checkout/v1`

| # | File | Symptom | Fix |
|---|------|---------|-----|
| 1 | `src/context/CartContext.tsx` | Subtotal ignores quantity (sums unit price only) | Use `unitPrice * quantity` in reduce |
| 2 | `src/pages/CheckoutPage.tsx` | Pay button disabled whenever cart has items | `canPay` should be `items.length > 0 && subtotal > 0` |
| 3 | `src/api/checkoutClient.ts` | API rejects payload using wrong field name | Client must send `totalCents`; server checks that key |

Partial fix (bug 1 only): cart subtotal still wrong in E2E when qty=2 ($12 vs $24).

## Validation

Documented in `VALIDATION.md`.
