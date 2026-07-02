# kemis-library

## 3.0.0-rc.0

### Major Changes

- 72df28f: v3.0.0 — modernize build, test, lint, hooks and release infra (Phase 1 of v3 migration).
  - Replace tsc+webpack build with tsup (ESM + CJS + d.ts in dist/)
  - Replace Jest with Vitest
  - Migrate to ESLint 9 flat config
  - Add Prettier, Husky, lint-staged
  - Add Changesets and GitHub Actions for release automation
  - Modernize package.json exports map
