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

## Phase 2 — dependency cleanup (no public API changes)

This phase removes dead/redundant dependencies and reclassifies runtime libraries so consumers no longer need to install them manually.

**Consumers do not need to change anything.** A `npm install kemis-library@v3-rc.x` (or the eventual `@3.0.0`) is sufficient — the library now ships all runtime peer dependencies.

**Notable internal changes:**
- `DialogPhoto` no longer uses `next/image` (uses native `<img>`).
- `CropImage` rewritten on top of `react-image-crop` (was `react-cropper`).
- File downloads use a native helper (`downloadFile`) instead of `file-saver`.
- `Loading`, `CropImage`, `Form/InputNumber` use Tailwind instead of `styled-components`.

**Removed dependencies (no replacement needed):** `next`, `yup`, `styled-components`, `@types/styled-components`, `webfontloader`, `@types/webfontloader`, `file-saver`, `@types/file-saver`, `axios-mock-adapter`, `react-router-dom`, `react-cropper`, `date-fns`.

> `sweetalert2` removal is deferred to Phase 3 where the new `<KemisProvider>` provides a global Toast mount point.

## Phase 3a — `<KemisProvider>` + Tailwind 4

**Breaking changes:**

1. **Consumers must wrap their app with `<KemisProvider>`** to get global Toast/Confirm support:
   ```tsx
   import { KemisProvider } from "kemis-library";
   import "kemis-library/styles";

   <KemisProvider locale="pt-BR">
     <App />
   </KemisProvider>
   ```
   Calling `Toast.success(...)` without `<KemisProvider />` mounted now logs a warning and drops the message (previously SweetAlert would mount itself ad-hoc).

2. **Tailwind 4** is now the styling engine. If consumers were relying on the library's exported `tailwind.config.js`, they should switch to importing `kemis-library/styles` (CSS) and using v4's CSS-first `@theme {}` for their own customizations. The library no longer ships a `tailwind.config.js`.

3. **`Toast` API** has a new preferred surface:
   - **New (recommended):** `Toast.success({ title?, message, durationMs? })`, `.info(...)`, `.warning(...)`, `.error(...)`, `.confirm({ title?, message, acceptLabel?, rejectLabel?, onAccept?, onReject? })`.
   - **Legacy compat:** `Toast.fire({ icon, title, text })` still works (Swal-shaped) — marked `@deprecated`. Will be removed in v4.

**Internal changes (no consumer impact):**
- `sweetalert2` removed; replaced by PrimeReact `Toast` + `confirmDialog`.
- Tailwind config moved from `tailwind.config.js` (deleted) to a single `@import "tailwindcss"` in `src/styles/index.css`.
- PostCSS now uses `@tailwindcss/postcss`.

## Phase 3b — React 19 + PrimeReact 10 + Tiptap

**Breaking changes:**

1. **React 19 is now the peer dependency.** Consumers on React 18 must upgrade (or stay on `kemis-library@^2`).
2. **PrimeReact 10 is now bundled.** Public component APIs are preserved where possible. Two internal type fixes were required (the `JSX` namespace removal and `RefObject` nullability tightening); both are transparent to consumers.
3. **`EditorHtml` is rewritten on Tiptap**, replacing Quill:
   - **Public props are unchanged** — `name`, `label`, `form`, `rules`, `autoFocus`, `disabled`, `className`. Drop-in replacement for the typical use case.
   - **Toolbar features ported:** bold, italic, underline, ordered list, bullet list, link, code block, clear formatting.
   - **Toolbar features NOT ported in v3.0.0 (regressions vs Quill):**
     - Text color picker (30+ swatches)
     - Background color picker
     - Font family selector
     - Heading selector UI (the engine supports headings via Tiptap's StarterKit; just no toolbar button)
     - Text alignment buttons
   - The `headerTemplate` prop is kept (marked `@deprecated`) but silently ignored — Tiptap's toolbar is built into the component.
   - If you relied on any of the missing features, file an issue and we'll add the matching Tiptap extension(s) in a v3.x patch.
4. **PrimeReact 10 theme**: the library ships `lara-light-blue` by default (loaded by importing `kemis-library/styles`). The `<KemisProvider theme="...">` prop exists but is informational in v3.0.0 — full runtime theme switching is a v3.x follow-up.
5. **`quill` is no longer a dependency** — removed alongside the EditorHtml rewrite.

## Phase 4 — public API surface: barrel imports + compatibility fixes

**The import convention changed.** v2 shipped one built file per source file, so consumers
could deep-import any internal path (`kemis-library/components/Loading`,
`kemis-library/utils/cpf`, `kemis-library/models/IP`, …). v3 bundles into a small,
stable set of entry points. The internal folder layout is **no longer public API** —
import from the barrels instead.

**Before → after:**

```ts
// ❌ v2 deep imports (internal paths — removed in v3)
import Loading from "kemis-library/components/Loading";
import BoxElement from "kemis-library/components/BoxElement";
import FormDialog from "kemis-library/components/Form/FormDialog";
import { cpf } from "kemis-library/utils/cpf";
import getIP from "kemis-library/utils/getIP";
import IMIP from "kemis-library/models/IP";
import { useFormIntegration } from "kemis-library/hooks/form";

// ✅ v3 barrels
import { Loading, BoxElement } from "kemis-library/components";
import { FormDialog } from "kemis-library/components";
import { cpf, getIP } from "kemis-library/utils";
import { useFormIntegration } from "kemis-library";
import type { IMIP } from "kemis-library"; // model interfaces are named type exports now
```

Public entry points in v3:

| Entry | Contents |
|---|---|
| `kemis-library` | everything (components + utils + hooks + model types) |
| `kemis-library/components` | all components |
| `kemis-library/utils` | all utils |
| `kemis-library/styles`, `kemis-library/styles/components` | CSS (both with and without the `.css` suffix resolve) |

Note default → named: many v2 deep imports were default exports; the barrels export
them as **named** members. Convert `import Loading from …` to `import { Loading } from …`.

**Bundle size / tree-shaking:** the barrels are ESM with `sideEffects: ["*.css"]`, so
modern bundlers tree-shake unused named exports — importing one component does not pull
the whole library. On Next.js, enable
`experimental.optimizePackageImports: ["kemis-library"]` (Next ≥ 13.5) to also get the
per-file compile speed of deep imports automatically; on older Next use `modularizeImports`.

**Compatibility fixes in this phase:**

1. **`react`/`react-dom` peer widened to `^18.2.0 || ^19.0.0`.** v3 no longer hard-requires
   React 19, so projects can migrate one at a time. (v3 still targets React 19 as the
   recommended runtime; no React-19-only runtime APIs are used.)
2. **`cpf` restored** in `kemis-library/utils` (it was accidentally dropped from the barrel).
3. **Model interfaces** (`IMCnpj`, `IMIP`) are exported as named types from the root:
   `import type { IMIP } from "kemis-library"`.
4. **CSS paths accept the `.css` suffix** — both `kemis-library/styles/components` and
   `kemis-library/styles/components.css` resolve, so existing `_app` CSS imports keep working.
