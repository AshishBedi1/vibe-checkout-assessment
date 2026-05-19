# E2E validation log

Commands: `npm install` then `npm run test:e2e`.

| Branch | Expected |
|--------|----------|
| `main` | PASS — full catalog → coupon → checkout flow |
| `bug/vibe/multi-checkout/v1` | FAIL until all bugs in MAINTAINERS.md are fixed |

## Golden path (E2E)

1. Search `tea` → Herbal Tea visible  
2. Filter Beverages  
3. Add tea × 2  
4. Cart subtotal $24.00, SAVE10 → total $21.60  
5. Checkout → Pay → success  

## Partial fixes (bug branch)

Any single-area fix (search only, cart math only, etc.) should still leave E2E failing.
