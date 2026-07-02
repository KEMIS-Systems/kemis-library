# kemis-library

## 3.0.0-rc.2

### Patch Changes

- 458bbea: Ship signature fonts in the package. `dist/styles/components.css` references
  `@font-face` files under `fonts/` but the TTFs were never copied into `dist`,
  so any bundler (webpack/Turbopack) failed to resolve them (`Module not found:
Can't resolve 'fonts/.../*.ttf'`). The `build:css` step now copies
  `src/styles/fonts` into `dist/styles/fonts`.

## 3.0.0-rc.1

### Patch Changes

- 2f9bb27: Phase 4 — public API surface + compatibility fixes:
  - Establish barrel imports as the public API (`kemis-library`, `kemis-library/components`, `kemis-library/utils`); internal deep paths are no longer exported. See MIGRATION.md.
  - Restore `cpf` export in `kemis-library/utils` (accidentally dropped from the barrel).
  - Export model interfaces as named types from the root: `import type { IMCnpj, IMIP } from "kemis-library"`.
  - Widen `react`/`react-dom` peer range to `^18.2.0 || ^19.0.0` so consumers can migrate one project at a time.
  - Accept the `.css` suffix on style entry points (`kemis-library/styles/components.css` and `.../base.css` now resolve).

## 3.0.0-rc.0

### Major Changes

- 72df28f: v3.0.0 — modernize build, test, lint, hooks and release infra (Phase 1 of v3 migration).
  - Replace tsc+webpack build with tsup (ESM + CJS + d.ts in dist/)
  - Replace Jest with Vitest
  - Migrate to ESLint 9 flat config
  - Add Prettier, Husky, lint-staged
  - Add Changesets and GitHub Actions for release automation
  - Modernize package.json exports map
