# Vibe Shop — Savyre assessment repository

Small e-commerce flow (products → cart → checkout) for **vibe coding** assessments in Savyre.

## Branches

| Branch | Purpose |
|--------|---------|
| `main` | Golden reference — all E2E tests pass |
| `bug/vibe/multi-checkout/v1` | Assessment branch — three related bugs; E2E fails until all are fixed |

Candidates should use the **bug branch**, not `main`.

## Commands

```bash
npm install
npm run dev          # http://127.0.0.1:5174
npm run test:e2e     # Playwright (starts dev server automatically)
```

## Savyre setup

1. Whitelist this GitHub repo in Savyre.
2. Register branch `bug/vibe/multi-checkout/v1` (BugBranch or assessment picker).
3. Create assessment with repo-backed debugging question pointing at that branch.
4. Enable **Vibe coding (VS Code workspace)** on the assessment.

Metadata for scoring lives in `.savyre/bug-info.json` on the bug branch only.

## Maintainer notes

See `MAINTAINERS.md` for the three intentional bugs.
