---
"kemis-library": major
---

v3.0.0 — modernize build, test, lint, hooks and release infra (Phase 1 of v3 migration).

- Replace tsc+webpack build with tsup (ESM + CJS + d.ts in dist/)
- Replace Jest with Vitest
- Migrate to ESLint 9 flat config
- Add Prettier, Husky, lint-staged
- Add Changesets and GitHub Actions for release automation
- Modernize package.json exports map
