# Vibe Shop — Savyre assessment repository

E-commerce flow (search → filter → cart → coupon → checkout) for **vibe coding** assessments in Savyre.

## Branches

| Branch | Purpose |
|--------|---------|
| `main` | Golden reference — all E2E tests pass |
| `bug/vibe/multi-checkout/v1` | Assessment branch — catalog, cart, and checkout bugs; E2E fails until fixed |

Candidates should use the **bug branch**, not `main`.

## Commands

```bash
npm install
npm run dev          # http://127.0.0.1:5174
npm run test:e2e     # Playwright (starts dev server automatically)
```

## Savyre setup

1. Whitelist this GitHub repo in Savyre.
2. Register branch `bug/vibe/multi-checkout/v1`.
3. Create a vibe coding assessment pointing at that branch.
4. Enable **Vibe coding (VS Code workspace)**.

Metadata: `.savyre/bug-info.json` on the bug branch.

## Maintainer notes

See `MAINTAINERS.md` for the full bug list (search, filter, coupon, cart math, checkout).
