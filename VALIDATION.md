# E2E validation log

Commands: `npm install` then `npm run test:e2e` (app on **http://127.0.0.1:5174**).

| Branch | Expected | Result |
|--------|----------|--------|
| `main` | All steps pass | PASS (verified locally) |
| `bug/vibe/multi-checkout/v1` | Fails until all 3 bugs fixed | FAIL at cart subtotal / pay / success |

## Partial-fix expectations (bug branch)

| Fixes applied | Expected E2E |
|---------------|--------------|
| Bug 1 only (cart total) | Still fails (pay disabled or payment) |
| Bugs 1 + 2 | Still fails (payment API) |
| All 3 | PASS |
