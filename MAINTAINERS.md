# Maintainer notes (not for candidates)

## Features (assessment branch)

- Product **search** + **Search** button
- **Category** filter (All / Beverages / Pantry)
- **Sort** (name, price)
- Cart **coupon** `SAVE10` (10% off)
- Cart **+ / − / Remove** per line
- Full flow covered by `tests/checkout-flow.spec.ts`

## Nine intentional bugs on `bug/vibe/multi-checkout/v1`

| # | File | Symptom | Fix |
|---|------|---------|-----|
| 1 | `src/utils/productFilters.ts` | Search is case-sensitive (`includes` without lowercasing) | Compare `name.toLowerCase().includes(q.toLowerCase())` |
| 2 | `src/utils/productFilters.ts` | Category filter compares `p.category.toLowerCase() === "Beverages"` | Use `p.category === options.category` |
| 3 | `src/utils/productFilters.ts` | `price-asc` sorts descending | `return a.price - b.price` |
| 4 | `src/context/CartContext.tsx` | Subtotal ignores quantity | `unitPrice * quantity` in reduce |
| 5 | `src/components/CartLine.tsx` | Line total ignores quantity | `unitPrice * quantity` |
| 6 | `src/context/CartContext.tsx` | `SAVE10` sets `couponPercent` to 0 | Set to `10` |
| 7 | `src/context/CartContext.tsx` | `removeItem` keeps only matching id (`===`) | Filter `!== productId` |
| 8 | `src/context/CartContext.tsx` | `decrementQuantity` adds 1 | Subtract 1, drop qty 0 |
| 9 | `src/pages/CheckoutPage.tsx` | `canPay = items.length === 0` | `items.length > 0 && totalDue > 0` |
| 10 | `src/api/checkoutClient.ts` | Rejects `totalCents > 500` | Remove `> 500` check |

`main` has all fixes. Golden E2E: search **tea** → Beverages → 2× tea → SAVE10 → $21.60 checkout → pay.

## Validation

See `VALIDATION.md`.
