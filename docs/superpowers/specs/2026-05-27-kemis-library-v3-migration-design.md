# kemis-library v3.0.0 — Migration Design

**Date:** 2026-05-27
**Branch:** `v3` (to be created from `v2-legacy` or `master`)
**Target release:** `kemis-library@3.0.0`
**Consumers:** 2 internal Kemis projects (will be migrated together with the library release)

---

## 1. Goals

1. Consumer should run `npm i kemis-library` and have **zero extra dependencies to install manually**.
2. Bring all third-party libraries to their latest stable versions.
3. Modernize build, release, and developer infrastructure (Storybook, CI, Changesets, hooks, formatting).
4. Remove dead/redundant dependencies and consolidate duplicates.
5. Provide a clean `MIGRATION.md` so the 2 consumer projects can be updated to v3 quickly.

## 2. Non-goals

- No support for v2 alongside v3 in the same release (v2 stays on `v2-legacy` branch for emergency hotfixes only).
- No monorepo split (single package stays `kemis-library`); subpath imports are enough.
- No new feature work — this is purely modernization + dependency reorganization.

## 3. Decisions summary

| # | Decision | Choice | Rationale |
|---|---|---|---|
| 1 | Dependency strategy | All runtime libs in `dependencies` | Consumer-friendly: one install command, zero extra setup. |
| 2 | Migration approach | Big-bang in single branch, release as `v3.0.0` | Only 2 consumers, both internal — controlled blast radius. |
| 3 | Public API compatibility | Break where it makes sense, document in `MIGRATION.md` | Pragmatic; alignment with PrimeReact 10 is more valuable than legacy wrappers. |
| 4 | `styled-components` | Remove, migrate 3 files to Tailwind | Aligns with Tailwind 4 upgrade; eliminates a runtime dep. |
| 5 | Build system | Migrate to **tsup** | Generates ESM + CJS + d.ts + sourcemaps. Replaces `tsc` + `copyFiles.js` + webpack/postcss-cli combo. |
| 6 | `peerDependencies` | Keep only `react` and `react-dom` (^19) | Standard for React libs. |
| 7 | Test runner | Jest → **Vitest** | Same Vite ecosystem; faster; modern. |
| 8 | React major | 18 → 19 | Latest stable. |

## 4. Dependency reorganization

### 4.1 Move from `devDependencies` → `dependencies`
These are required at runtime by the library's public API:
- `react-hook-form`
- `axios`
- `react-cropper` *(see 5.3 — may consolidate)*
- `react-canvas-draw`
- `react-dropzone`
- `react-webcam`
- `cep-promise`
- `cpf-cnpj-validator`
- `date-fns`

### 4.2 Remove completely
| Dependency | Why |
|---|---|
| `next` + `eslint-config-next` | Used only in `DialogPhoto/index.tsx` (`next/image`) → replace with `<img>`. |
| `yup` + `@hookform/resolvers` (yup parts) | Real validator is `zod`. |
| `styled-components` + `@types/styled-components` | 3 files → migrate to Tailwind classes. |
| `webpack`, `webpack-cli`, `ts-loader`, `babel-loader`, `css-loader`, `style-loader` | Build moves to `tsup`. |
| `react-router-dom` | Not imported anywhere in `src/` — dead dep. |
| `webfontloader` + `@types/webfontloader` | Imported but `.load()` call is commented out — dead code. |
| `axios-mock-adapter` | Only useful if Vitest mocks call it — re-add if needed during test migration. |
| `sweetalert2` | Replaced by PrimeReact `Toast` + `ConfirmDialog`. |
| `file-saver` + `@types/file-saver` | Replaced by ~6-line Blob + `<a download>` helper. |
| `react-image-crop` *(or react-cropper — pick one)* | Consolidate (see 5.3). |

### 4.3 Keep in `peerDependencies`
```jsonc
{
  "peerDependencies": {
    "react": "^19",
    "react-dom": "^19"
  }
}
```

### 4.4 Version bumps (all to latest stable as of release day)
| Lib | Current | Target |
|---|---|---|
| `primereact` | 9.2.2 | 10.x |
| `tailwindcss` | 3.3 | 4.x |
| `quill` | 1.3.7 | *(replaced by Tiptap — see 5.1)* |
| `zod` | ^3 | latest 3.x |
| `react-icons` | 5.5 | latest |
| `tailwind-merge` | 3.0 | latest |
| `react` (peer) | 18.3 | 19.x |
| `typescript` | 5.1 | latest 5.x |
| `eslint` | 8.39 | 9.x (flat config) |
| `vite` | 7 | latest |
| `jest` | 29 | **replaced by `vitest` latest** |
| `react-international-phone` | 4.3 | latest |
| `react-image-crop` *or* `react-cropper` | — | latest of chosen one |
| `date-fns` | 4 | latest 4.x |

### 4.5 New additions (infra/DX)
| Package | Purpose |
|---|---|
| `@tiptap/react` + `@tiptap/starter-kit` | Replace Quill in `EditorHtml`. |
| `clsx` | Conditional className utility (pairs with `tailwind-merge`). |
| `@changesets/cli` | Versioning + changelog automation. |
| `husky` + `lint-staged` | Pre-commit hooks. |
| `prettier` | Code formatting. |
| `tsx` | Run TS scripts directly. |
| `tsup` | Build tool. |
| `vitest` + `@vitest/ui` + `jsdom` (already present) | Test runner. |
| `@storybook/react-vite` (+ deps) | Component dev/docs. |

## 5. Library swaps & consolidations

### 5.1 Editor: Quill → Tiptap
- `EditorHtml` rewritten on top of `@tiptap/react` + `@tiptap/starter-kit`.
- Public API of `EditorHtml` aligned to Tiptap's `useEditor` model — **breaking change**, documented in `MIGRATION.md`.
- Headless = full control over toolbar; first version reproduces current toolbar (bold/italic/list/link).

### 5.2 Toast/Alert: `sweetalert2` → PrimeReact
- `utils/toast.ts` is rewritten as a thin wrapper around a global PrimeReact `Toast` ref + `ConfirmDialog`.
- Module exports the same function names (`toast.success`, `toast.error`, `toast.confirm`, etc.) — **no break for consumers** if signatures match.
- A `<KemisProvider>` mounts the global `Toast` + `ConfirmDialog` once (see 6.4).

### 5.3 Image crop: keep one library
- Decision: **keep `react-image-crop`** (lighter, more actively maintained, MIT, no jQuery legacy).
- `CropImage` component rewritten on top of `react-image-crop`.
- `canvasPreview.ts` stays (already uses `react-image-crop`).
- `react-cropper` removed.

### 5.4 File download: remove `file-saver`
- New helper `utils/downloadFile.ts` (~10 lines): creates `Blob`, anchor with `download`, click, revoke URL.
- `ShowFile` updated.

### 5.5 Dead code removal
- Delete `utils/fontsGoogle.ts` (entire file — `.load()` is commented out and no caller imports it; verify during impl).
- Remove `webfontloader` from deps.
- Remove `react-router-dom` from devDeps.

## 6. Build system

### 6.1 Tooling
- Replace `tsc`-based build + `copyFiles.js` + `postcss-cli` + webpack with **tsup**.
- Tailwind 4 uses CSS-first config (`@import "tailwindcss"` + theme via `@theme {}` in CSS).

### 6.2 New entry layout
```
src/
  index.ts            ← single public entry, re-exports components/hooks/utils
  components/index.ts
  hooks/index.ts
  utils/index.ts
  styles/
    index.css         ← Tailwind v4 entry + theme tokens
```

### 6.3 `tsup.config.ts`
```ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: true,
  external: ["react", "react-dom"],
  onSuccess: "postcss src/styles/index.css -o dist/styles.css",
});
```

### 6.4 `package.json` exports
```jsonc
{
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles.css"
  },
  "sideEffects": ["*.css"],
  "files": ["dist"]
}
```

### 6.5 Files removed
- `copyFiles.js`
- `webpack.config.js`
- `postcss.config.js` (kept only if Tailwind 4 still needs it; v4 may not)
- `tailwind.config.js` (Tailwind 4 = CSS-first; tokens move to `styles/index.css`)
- `.babelrc` (tsup uses esbuild)
- `vite.config.ts` *(or repurposed for Storybook)*
- `yarn-error.log`

## 7. PrimeReact 9 → 10 migration

### 7.1 Approach
1. Bump `primereact` to latest 10.x in `v3` branch.
2. Run `tsc --noEmit` → catalog every breakage.
3. Migrate component-by-component in this order:
   1. Leaf input wrappers: `InputText`, `InputNumber`, `InputMask`, `InputPassword`, `InputDate`, `InputTextArea`, `InputSwitch`, `Dropdown`, `MultiSelect`, `AutoComplete`, `RadioButton`, `CheckBox`, `Chips`, `SelectButton`, `ListBox`.
   2. File/media inputs: `InputFile`, `InputImage`, `UploadPhoto`.
   3. Composite: `Form`, `FormDialog`, `Dialog`, `DialogFile`, `DialogPhoto`, `EditorHtml` (this one combined with 5.1 Tiptap).
   4. Misc: `Button`, `SplitButton`, `BoxElement`, `Loading`, `ShowFile`, `Signature`, `CropImage`, `Dropzone`.
4. For each migrated component, record API diffs (props removed/renamed) in `MIGRATION.md`.

### 7.2 Theming
- Drop SASS imports.
- Adopt PrimeReact 10 CSS-variable theming via `primereact/resources/themes/lara-light-blue/theme.css` (or chosen theme) imported from `src/styles/index.css`.
- Expose `<KemisProvider theme="lara-light-blue">` for consumers (defaults to Kemis-preferred theme).

### 7.3 PassThrough adoption
- Where v9 props (e.g., `inputClassName`, `panelClassName`) are removed in v10, use the `pt` prop to inject classes.

## 8. styled-components removal

3 files to convert to Tailwind:
- `src/components/Form/InputNumber/index.tsx`
- `src/components/Loading/styles.ts`
- `src/components/CropImage/styles.ts`

For dynamic class composition use `clsx` + `tailwind-merge` (`cn` helper to be added in `utils/cn.ts`).

Delete `styles.ts` siblings; inline classes in the component JSX.

## 9. `<KemisProvider>` (new)

New top-level provider component that consumers wrap their app with:
```tsx
import { KemisProvider } from "kemis-library";
import "kemis-library/styles";

<KemisProvider locale="pt-BR" theme="lara-light-blue">
  <App />
</KemisProvider>
```
Responsibilities:
- Mount PrimeReact `PrimeReactProvider` with chosen theme/PT config.
- Mount global `Toast` ref (so `utils/toast.ts` works without per-page setup).
- Mount `ConfirmDialog`.
- Provide i18n language context (already exists under `src/hooks/Language`).

## 10. Validator consolidation

- Remove `yup`.
- Keep `zod` as the single validator across `src/hooks/form/schemas/` and `src/hooks/form/`.
- If `@hookform/resolvers` was bringing yup transitively, ensure only the `zod` resolver path is used.

## 11. Infrastructure additions

### 11.1 Changesets
- `npx changeset init`
- Replace manual `npm version` + `git commit -m 'Bump version'` with `pnpm changeset` / `pnpm changeset version`.
- Generates `CHANGELOG.md` per release.

### 11.2 GitHub Actions
Two workflows under `.github/workflows/`:
- `ci.yml`: on push/PR — install, lint, typecheck, test, build.
- `release.yml`: on push to `master` — runs Changesets action, publishes to npm when a release PR is merged.

### 11.3 Husky + lint-staged + Prettier
- `husky init` → `.husky/pre-commit` runs `lint-staged`.
- `lint-staged` runs Prettier + ESLint on staged `*.{ts,tsx,css,md,json}`.
- Add `.prettierrc` (2-space, single quotes, semi, trailing comma `es5`, printWidth 100).

### 11.4 Storybook 8 (`@storybook/react-vite`)
- `npx storybook init`
- Folder `.storybook/` with `main.ts`, `preview.tsx` (wraps stories in `<KemisProvider>`).
- One `*.stories.tsx` per component, starting with the most-used: `InputText`, `Dropdown`, `Form`, `Dialog`.
- Storybook replaces the current `web/` dev playground; `web/` folder can be removed.

## 12. Branching, release & rollout

1. **Create `v3` branch** from current `v2-legacy` (already the active dev branch).
2. Implement all sections above on `v3`.
3. Publish a release candidate `3.0.0-rc.1` to npm (under `next` dist-tag).
4. Update both consumer projects to `3.0.0-rc.1` in feature branches; validate.
5. Iterate RCs until consumers are green.
6. Merge `v3` → `master`, run release workflow → publish `3.0.0`.
7. Merge consumer-project feature branches.
8. `v2-legacy` stays open for emergency hotfixes only; no new features.

## 13. `MIGRATION.md` for consumers

To be created at repo root. Contents:
- **Install:** all peer-deps for v2 are no longer needed; just `npm i kemis-library@3`.
- **Provider:** wrap app with `<KemisProvider>` and import `kemis-library/styles`.
- **Per-component diffs** for every component whose props changed (filled in during implementation).
- **Validator:** any remaining `yup` schemas must be ported to `zod`.
- **Editor:** Tiptap-based `EditorHtml` has new API — examples included.
- **Toast/Confirm:** new globally-mounted versions — examples included.

## 14. Acceptance criteria

A v3.0.0 release is acceptable when:
1. `npm i kemis-library@3` in a clean Vite/Next project requires no extra installs to use the library.
2. All upgraded libraries are on their latest stable major.
3. `tsup` build produces ESM + CJS + types + CSS in `dist/`.
4. Storybook builds locally with stories for at least the top 10 most-used components.
5. CI workflow runs on every PR; release workflow publishes from `master` via Changesets.
6. Pre-commit hook formats + lints staged files.
7. Both consumer projects build and run on v3 without manual dependency installs beyond `kemis-library`.
8. `MIGRATION.md` exists and is referenced from `README.md`.

## 15. Resolved defaults

- **PrimeReact 10 theme:** default to `lara-light-blue` (closest to current visual).
- **`web/` playground:** deleted in favor of Storybook.
- **`axios`:** kept in `dependencies`; revisit only if `vitest` migration reveals it is test-only.
- **Branch base:** `v3` created from `v2-legacy`.

## 16. Out of scope (explicit)

- No monorepo migration.
- No new components.
- No design-system token overhaul (use Kemis-preferred Lara theme as-is).
- No backwards-compatibility layer for v2 APIs.
