# kemis-library v3.0.0 — Phase 1: Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the library's build, test, lint, format, hook, and release infrastructure to a modern toolchain on a new `v3` branch — without changing any component source code or third-party major versions yet.

**Architecture:** Replace `tsc` + `webpack` + `postcss-cli` + handwritten `copyFiles.js` build with a single **tsup** build that emits ESM + CJS + d.ts + sourcemaps to `dist/`. Swap **Jest** for **Vitest**. Wire up **ESLint 9 flat config**, **Prettier**, **Husky + lint-staged**, **Changesets**, and **GitHub Actions** (CI + release). Library code stays on PrimeReact 9, Tailwind 3, React 18 in this phase — only infra changes.

**Tech Stack:** tsup, Vitest, Tailwind 3 (kept), PostCSS, ESLint 9 (flat), Prettier 3, Husky 9, lint-staged 15, Changesets, GitHub Actions, TypeScript 5 (latest patch).

**Reference spec:** `docs/superpowers/specs/2026-05-27-kemis-library-v3-migration-design.md`

---

## File Structure

**Will be created:**
- `src/index.ts` — single public barrel re-exporting `components/*`, `hooks/*`, `utils/*`
- `tsup.config.ts` — build config
- `vitest.config.ts` — test config
- `eslint.config.js` — ESLint 9 flat config
- `.prettierrc.json`, `.prettierignore`
- `.husky/pre-commit`
- `.changeset/config.json` (created by `changeset init`)
- `.github/workflows/ci.yml`
- `.github/workflows/release.yml`
- `MIGRATION.md` (header stub only; full content lands in Phase 4)

**Will be deleted (Task 12):**
- `copyFiles.js`
- `webpack.config.js`
- `jest.config.js`
- `vite.config.ts` (replaced by Storybook config in Phase 4)
- `yarn-error.log`
- `.babelrc` (if present)

**Will be modified:**
- `package.json` — scripts, dependencies, exports map, files list, sideEffects
- `tsconfig.json` — adjust `outDir` to `dist`, exclude `dist/`
- `src/setupTests.js` → renamed to `src/setupTests.ts` and adapted for Vitest if needed
- `README.md` — mark v3-in-progress + add infra usage notes

**Untouched in this phase:**
- All files under `src/components/`, `src/hooks/`, `src/utils/` (only barrels touched if needed)
- `src/styles/`
- `tailwind.config.js`, `postcss.config.js` (stay on Tailwind 3 in this phase)

---

## Task 1: Create `v3` branch and scaffolding marker

**Files:**
- Modify: `README.md` (add v3-in-progress notice)

- [ ] **Step 1: Create branch from `v2-legacy`**

```bash
git checkout v2-legacy
git pull
git checkout -b v3
```

- [ ] **Step 2: Add v3-in-progress banner to README**

Insert at the top of `README.md` (right after the title line):

```markdown
> ⚠️ **v3.0.0 in progress** — this branch holds the in-flight migration described in `docs/superpowers/specs/2026-05-27-kemis-library-v3-migration-design.md`. For the current stable line, see branch `v2-legacy`.
```

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "chore(v3): create v3 branch and mark in-progress in README"
```

---

## Task 2: Create single public barrel `src/index.ts`

The library currently relies on subpath imports (`kemis-library/components`, `kemis-library/utils`). For tsup's clean ESM/CJS output we add one top-level entry that re-exports everything. Subpath imports remain working in Task 7 via the `exports` map.

**Files:**
- Create: `src/index.ts`

- [ ] **Step 1: Write `src/index.ts`**

```ts
export * from "./components";
export * from "./utils";
export * from "./hooks/Language";
export * from "./hooks/form";
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no new errors caused by the new barrel.
If errors: it means a re-export name collision exists between `components`, `utils`, `hooks/Language`, `hooks/form`. Resolve by switching the colliding re-export to a namespaced form, e.g.:

```ts
export * as components from "./components";
```

Only do this for the colliding namespace; keep the others flat. Re-run typecheck.

- [ ] **Step 3: Commit**

```bash
git add src/index.ts
git commit -m "chore(v3): add top-level src/index.ts barrel"
```

---

## Task 3: Setup Prettier and format the codebase

**Files:**
- Create: `.prettierrc.json`
- Create: `.prettierignore`
- Modify: `package.json` (add `prettier` devDep + `format` script)

- [ ] **Step 1: Install Prettier**

```bash
npm install --save-dev --save-exact prettier@latest
```

- [ ] **Step 2: Create `.prettierrc.json`**

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

- [ ] **Step 3: Create `.prettierignore`**

```
node_modules
build
dist
coverage
*.log
package-lock.json
.next
.changeset
```

- [ ] **Step 4: Add format scripts to `package.json`**

Add inside `"scripts"`:

```json
"format": "prettier --write \"src/**/*.{ts,tsx,css,md,json}\"",
"format:check": "prettier --check \"src/**/*.{ts,tsx,css,md,json}\""
```

- [ ] **Step 5: Format the codebase once**

```bash
npm run format
```

- [ ] **Step 6: Commit (single sweep formatting commit)**

```bash
git add -A
git commit -m "style(v3): apply Prettier across src/"
```

---

## Task 4: ESLint 9 flat config

**Files:**
- Create: `eslint.config.js`
- Modify: `package.json` (replace `eslint-config-next` with modern set; bump eslint to v9)
- Delete: any existing `.eslintrc*` files at repo root if present

- [ ] **Step 1: Replace ESLint deps**

```bash
npm uninstall eslint eslint-config-next
npm install --save-dev \
  eslint@^9 \
  typescript-eslint@latest \
  @eslint/js@latest \
  eslint-plugin-react@latest \
  eslint-plugin-react-hooks@latest \
  eslint-config-prettier@latest \
  globals@latest
```

- [ ] **Step 2: Remove legacy ESLint config files**

```bash
# Run only if they exist:
[ -f .eslintrc.json ] && git rm .eslintrc.json || true
[ -f .eslintrc.js ] && git rm .eslintrc.js || true
[ -f .eslintrc ] && git rm .eslintrc || true
```

- [ ] **Step 3: Create `eslint.config.js`**

```js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default [
  { ignores: ["dist/**", "build/**", "coverage/**", "node_modules/**", "web/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { react, "react-hooks": reactHooks },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.browser, ...globals.es2022 },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  prettier,
];
```

- [ ] **Step 4: Make `package.json` ESM-aware for the config file**

If `package.json` does not already have `"type": "module"`, leave it as is — using the `.js` extension with `import` works in Node 20+ when ESLint loads it. If running on Node < 20, rename the config to `eslint.config.mjs`. Verify Node version:

```bash
node --version
```
Expected: `v20.x` or newer. If older, rename `eslint.config.js` → `eslint.config.mjs`.

- [ ] **Step 5: Update lint script in `package.json`**

Replace existing lint script with:

```json
"lint": "eslint src",
"lint:fix": "eslint src --fix"
```

- [ ] **Step 6: Run lint and fix what's auto-fixable**

```bash
npm run lint:fix
npm run lint
```

If hard errors remain, **do not silently change source code**. For each failing rule that touches existing logic, either:
- Disable the rule for the offending line with an inline `// eslint-disable-next-line <rule>` and add a one-line reason, OR
- Demote the rule to `"warn"` in `eslint.config.js`.

The goal in Phase 1 is a green pipeline, not a code overhaul.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore(v3): migrate to ESLint 9 flat config"
```

---

## Task 5: Migrate Jest → Vitest

There are currently no `*.test.*` files in `src/`, so no test conversions are needed — only infra setup so future tests work.

**Files:**
- Create: `vitest.config.ts`
- Rename: `src/setupTests.js` → `src/setupTests.ts`
- Delete: `jest.config.js`
- Modify: `package.json` (remove jest deps, add vitest deps, update scripts)

- [ ] **Step 1: Remove Jest stack**

```bash
npm uninstall jest jest-environment-jsdom ts-jest @types/jest @testing-library/jest-dom
```

- [ ] **Step 2: Install Vitest stack**

```bash
npm install --save-dev \
  vitest@latest \
  @vitest/ui@latest \
  jsdom@latest \
  @testing-library/jest-dom@latest \
  happy-dom@latest
```

(We install both `jsdom` and `happy-dom` so tests can opt into either; default below uses `jsdom` to stay closest to the previous setup.)

- [ ] **Step 3: Delete `jest.config.js`**

```bash
git rm jest.config.js
```

- [ ] **Step 4: Read existing `src/setupTests.js`**

```bash
cat src/setupTests.js
```
Note: if it only contains `import "@testing-library/jest-dom"` or similar, the file is portable as-is.

- [ ] **Step 5: Rename to `.ts` and ensure it imports the jest-dom matchers Vitest-style**

```bash
git mv src/setupTests.js src/setupTests.ts
```

Then overwrite `src/setupTests.ts` with:

```ts
import "@testing-library/jest-dom/vitest";
```

(If the original file had additional setup logic, prepend that logic above the import line — do not lose it.)

- [ ] **Step 6: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTests.ts"],
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/index.ts", "src/setupTests.ts"],
    },
  },
});
```

- [ ] **Step 7: Update `package.json` scripts**

Replace the Jest scripts with:

```json
"test": "vitest",
"test:run": "vitest run",
"test:ui": "vitest --ui",
"test:coverage": "vitest run --coverage"
```

- [ ] **Step 8: Smoke-run Vitest**

```bash
npm run test:run
```
Expected: "No test files found, exiting with code 0" — that is success at this stage.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "test(v3): migrate test runner from Jest to Vitest"
```

---

## Task 6: Add `tsup` build

**Files:**
- Create: `tsup.config.ts`
- Modify: `tsconfig.json` (change `outDir` to `dist`, add `"dist"` to `exclude`)
- Modify: `package.json` (install tsup, replace `build` scripts)

- [ ] **Step 1: Install `tsup` and ancillary tools**

```bash
npm install --save-dev tsup@latest tsx@latest
```

- [ ] **Step 2: Update `tsconfig.json`**

Change two fields:

```jsonc
{
  "compilerOptions": {
    // ...existing fields...
    "outDir": "dist"
    // ...existing fields...
  },
  "exclude": [
    "node_modules",
    "dist",
    "build",
    "src/setupTests.ts",
    "src/**/__tests__",
    "**/*.test.*",
    "**/*.spec.*"
  ]
}
```

- [ ] **Step 3: Create `tsup.config.ts`**

```ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    components: "src/components/index.ts",
    utils: "src/utils/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  target: "es2020",
  external: [
    "react",
    "react-dom",
    "primereact",
    "next",
    "react-icons",
    "react-international-phone",
    "react-image-crop",
    "quill",
    "styled-components",
    "tailwindcss",
    "tailwind-merge",
    "zod",
    "@hookform/resolvers",
  ],
});
```

The `entry` map preserves the current subpath import contract (`kemis-library/components`, `kemis-library/utils`) while adding the new root entry.

`external` keeps every runtime dep out of the bundle so consumers resolve their own versions through `node_modules`.

- [ ] **Step 4: Replace `build` scripts in `package.json`**

Remove the old `web:dev`, `web:build`, `build:ts`, `build:css`, `build`, `postbuild`, `auto_publish` scripts and replace with:

```json
"clean": "rm -rf dist",
"build": "npm run clean && npm run build:js && npm run build:css",
"build:js": "tsup",
"build:css": "postcss src/styles/components/components.css --dir dist/styles && tailwindcss -i ./src/styles/index.css -o ./dist/styles/base.css",
"prepublishOnly": "npm run build"
```

Note: `build:css` is kept as a separate script that still runs PostCSS + Tailwind 3 against `dist/`. Tailwind 4 migration is Phase 3.

- [ ] **Step 5: Run the build**

```bash
npm run build
```
Expected: `dist/` contains `index.js`, `index.cjs`, `index.d.ts`, `components.js`, `components.cjs`, `components.d.ts`, `utils.js`, `utils.cjs`, `utils.d.ts`, sourcemaps, and `dist/styles/base.css` + `dist/styles/components.css`.

If a `tsup` error mentions a missing export from a barrel: look at the offending source file, ensure its declarations are valid TypeScript that `tsc --noEmit` already accepts (from Task 2). Do not fix logic, only ensure typecheck-clean.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "build(v3): replace tsc/webpack build with tsup"
```

---

## Task 7: Modernize `package.json` (exports, files, deps removed)

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Update top-level fields**

Replace `main`, `types`, `files` and add `module`, `exports`, `sideEffects`, `engines`:

```jsonc
{
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./components": {
      "types": "./dist/components.d.ts",
      "import": "./dist/components.js",
      "require": "./dist/components.cjs"
    },
    "./utils": {
      "types": "./dist/utils.d.ts",
      "import": "./dist/utils.js",
      "require": "./dist/utils.cjs"
    },
    "./styles": "./dist/styles/base.css",
    "./styles/components": "./dist/styles/components.css"
  },
  "sideEffects": ["*.css"],
  "files": ["dist"],
  "engines": { "node": ">=20" }
}
```

- [ ] **Step 2: Remove obsolete build dependencies**

```bash
npm uninstall \
  webpack webpack-cli ts-loader babel-loader css-loader style-loader \
  @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript \
  vite @vitejs/plugin-react vite-tsconfig-paths @tailwindcss/vite
```

- [ ] **Step 3: Verify `package.json` is still valid JSON and matches expectations**

```bash
node -e "JSON.parse(require('fs').readFileSync('package.json'))" && echo OK
```
Expected: `OK`

- [ ] **Step 4: Rebuild and re-test**

```bash
npm run build
npm run lint
npm run test:run
```
All three must exit 0.

- [ ] **Step 5: Inspect the published payload**

```bash
npm pack --dry-run
```
Expected: only `dist/**` and `package.json` (+ standard `README.md`/`LICENSE`) appear in the listing. Nothing from `src/`, `web/`, `build/` should be present.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "build(v3): modernize package.json exports map and prune build deps"
```

---

## Task 8: Husky + lint-staged

**Files:**
- Create: `.husky/pre-commit`
- Modify: `package.json` (add `lint-staged` config + `prepare` script)

- [ ] **Step 1: Install Husky + lint-staged**

```bash
npm install --save-dev husky@latest lint-staged@latest
```

- [ ] **Step 2: Initialize Husky**

```bash
npx husky init
```
This creates `.husky/pre-commit` containing `npm test`. Overwrite it in Step 3.

- [ ] **Step 3: Overwrite `.husky/pre-commit`**

```bash
#!/usr/bin/env sh
npx lint-staged
```

Ensure it is executable:

```bash
chmod +x .husky/pre-commit
```

- [ ] **Step 4: Add `lint-staged` config to `package.json`**

Add a top-level key:

```json
"lint-staged": {
  "src/**/*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "src/**/*.{css,md,json}": ["prettier --write"]
}
```

- [ ] **Step 5: Add `prepare` script**

Inside `"scripts"`:

```json
"prepare": "husky"
```

- [ ] **Step 6: Smoke-test the hook**

```bash
echo "// touch" >> src/index.ts
git add src/index.ts
git commit -m "test: husky hook smoke"
```
Expected: lint-staged runs prettier/eslint and the commit completes. Then revert the touch:

```bash
git reset --soft HEAD~1
git restore --staged src/index.ts
git checkout src/index.ts
```

- [ ] **Step 7: Commit the hook setup**

```bash
git add -A
git commit -m "chore(v3): add Husky + lint-staged pre-commit hook"
```

---

## Task 9: Changesets

**Files:**
- Create: `.changeset/config.json` (created by `init`)
- Modify: `package.json` (add `changeset` scripts; remove old `version` and `merge` scripts)

- [ ] **Step 1: Install Changesets**

```bash
npm install --save-dev @changesets/cli@latest
```

- [ ] **Step 2: Initialize**

```bash
npx changeset init
```
This creates `.changeset/config.json` and `.changeset/README.md`.

- [ ] **Step 3: Tune the config**

Open `.changeset/config.json` and set:

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "master",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

- [ ] **Step 4: Replace `version`/`merge`/`auto_publish` scripts in `package.json`**

Add these scripts (and remove the old `version`, `merge`, `auto_publish` if still present):

```json
"changeset": "changeset",
"version-packages": "changeset version",
"release": "npm run build && changeset publish"
```

- [ ] **Step 5: Create the v3 changeset**

```bash
npx changeset
```
Interactive prompt:
- Package: `kemis-library`
- Bump: `major`
- Summary: `v3.0.0 — modernize build, test, lint, hooks and release infra (Phase 1 of v3 migration)`

This writes a markdown file under `.changeset/`. Do not run `version-packages` yet — that happens at release time.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore(v3): add Changesets for version + changelog automation"
```

---

## Task 10: GitHub Actions — CI workflow

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Create the CI workflow**

```yaml
name: CI

on:
  push:
    branches: [master, v3, v2-legacy]
  pull_request:

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm run test:run
      - run: npm run build
```

- [ ] **Step 2: Validate the YAML locally**

```bash
node -e "require('yaml').parse(require('fs').readFileSync('.github/workflows/ci.yml','utf8'))" 2>/dev/null || npx --yes js-yaml .github/workflows/ci.yml > /dev/null
```
Expected: no parsing error.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci(v3): add CI workflow (lint, typecheck, test, build)"
```

---

## Task 11: GitHub Actions — Release workflow

**Files:**
- Create: `.github/workflows/release.yml`

- [ ] **Step 1: Create the Release workflow**

```yaml
name: Release

on:
  push:
    branches: [master]

concurrency: ${{ github.workflow }}-${{ github.ref }}

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          registry-url: "https://registry.npmjs.org"
      - run: npm ci
      - run: npm run build
      - name: Create Release Pull Request or Publish
        uses: changesets/action@v1
        with:
          publish: npm run release
          version: npm run version-packages
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

- [ ] **Step 2: Document the required secret**

Add the following short section to `README.md` (under a new `## Release` heading near the bottom):

```markdown
## Release

Releases are automated via Changesets + GitHub Actions. To enable publishing:

1. Generate an npm Automation token (`npm token create --automation`).
2. Add it as `NPM_TOKEN` in the repo's GitHub Actions secrets.
3. Merge a Changesets "Version Packages" PR to `master` — the workflow publishes automatically.
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "ci(v3): add Changesets release workflow"
```

---

## Task 12: Delete obsolete build files

**Files:**
- Delete: `copyFiles.js`, `webpack.config.js`, `vite.config.ts`, `yarn-error.log`, `.babelrc` (if present), `build/` (directory, if present)

- [ ] **Step 1: Verify nothing still references the files**

Run via Grep tool:
- pattern: `copyFiles|webpack\\.config|vite\\.config|\\.babelrc`
- path: repo root
- expect: no matches in `package.json`, `tsup.config.ts`, `vitest.config.ts`, `eslint.config.js`, workflows.

If any match exists, fix the reference before deleting.

- [ ] **Step 2: Delete the files**

```bash
git rm copyFiles.js webpack.config.js vite.config.ts
[ -f yarn-error.log ] && git rm yarn-error.log || true
[ -f .babelrc ] && git rm .babelrc || true
[ -d build ] && git rm -rf build || true
```

- [ ] **Step 3: Update `.gitignore`**

Ensure `.gitignore` contains:
```
node_modules
dist
coverage
*.log
.DS_Store
```
Add any missing lines; do not remove existing entries unrelated to this task.

- [ ] **Step 4: Final rebuild**

```bash
npm run build
npm run lint
npm run test:run
npx tsc --noEmit
```
All four must exit 0.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore(v3): remove obsolete build files (webpack, copyFiles, vite, babel)"
```

---

## Task 13: Stub `MIGRATION.md` and final verification

**Files:**
- Create: `MIGRATION.md`

- [ ] **Step 1: Create stub `MIGRATION.md`**

```markdown
# Migration Guide — kemis-library v2 → v3

> This document is filled in progressively across the v3 migration phases. Phase 1 (Foundation) does not change the public API; consumer code does not need to change yet.

## Phases

- **Phase 1 (this branch):** Infra-only (build, tests, lint, hooks, CI/release). No public API changes.
- **Phase 2:** Dependency cleanup (dead deps removed, `sweetalert2`/`file-saver` replaced internally). No public API changes expected.
- **Phase 3:** Major upgrades (React 19, PrimeReact 10, Tailwind 4, Quill → Tiptap, new `<KemisProvider>`). **Breaking changes here — full diff will be documented in this file.**
- **Phase 4:** Release prep (Storybook, RC validation against the two consumer projects, `3.0.0` publish).

## Phase 1 — install / publish workflow changes

- The library now publishes from `dist/` (was `build/`). Consumers do not need to do anything; the package is still installed as `npm install kemis-library`.
- Maintainers: releases are now driven by [Changesets](https://github.com/changesets/changesets). See `README.md > Release`.
```

- [ ] **Step 2: Run the full local CI sequence one last time**

```bash
npm run lint
npx tsc --noEmit
npm run test:run
npm run build
npm pack --dry-run
```
All five must succeed. Inspect `npm pack --dry-run` output — confirm only `dist/**`, `package.json`, `README.md`, `MIGRATION.md` (and `LICENSE` if present) are listed.

- [ ] **Step 3: Commit the marker**

```bash
git add -A
git commit -m "docs(v3): add MIGRATION.md stub and close Phase 1"
```

- [ ] **Step 4: Push and open a draft PR for review**

```bash
git push -u origin v3
gh pr create --base v2-legacy --head v3 --draft \
  --title "v3.0.0 — Phase 1: foundation (build/test/lint/hooks/CI)" \
  --body "Implements Phase 1 of the v3 migration spec: tsup build, Vitest, ESLint 9 flat, Prettier, Husky + lint-staged, Changesets, GitHub Actions CI/Release. No source-code changes. See docs/superpowers/specs/2026-05-27-kemis-library-v3-migration-design.md and docs/superpowers/plans/2026-05-27-v3-phase1-foundation.md."
```

(If `gh` is not installed or authenticated, skip and open the PR through the web UI later.)

---

## Definition of Done — Phase 1

- [ ] `npm run lint` exits 0
- [ ] `npx tsc --noEmit` exits 0
- [ ] `npm run test:run` exits 0 (no tests yet is acceptable)
- [ ] `npm run build` exits 0; `dist/` contains `index.{js,cjs,d.ts}`, `components.{js,cjs,d.ts}`, `utils.{js,cjs,d.ts}`, `styles/base.css`, `styles/components.css`, sourcemaps
- [ ] `npm pack --dry-run` only ships `dist/`, `package.json`, `README.md`, `MIGRATION.md`, `LICENSE` (if present)
- [ ] Husky pre-commit hook fires `lint-staged` on staged files
- [ ] One pending changeset exists for the upcoming `3.0.0` major bump
- [ ] CI workflow file and Release workflow file are committed
- [ ] No file under `src/components/`, `src/hooks/`, `src/utils/` has had logic changed (only formatting + the new `src/index.ts` barrel)
- [ ] `v3` branch is pushed; draft PR is opened against `v2-legacy`
