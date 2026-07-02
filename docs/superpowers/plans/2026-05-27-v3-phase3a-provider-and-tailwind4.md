# kemis-library v3.0.0 — Phase 3a: KemisProvider + Tailwind 4 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Introduce the new `<KemisProvider>` (theme + i18n + global Toast + ConfirmDialog), migrate the `utils/toast.ts` API from `sweetalert2` to PrimeReact via the provider, and upgrade Tailwind 3 → 4 (CSS-first config). No PrimeReact major bump and no React major bump in this phase — those land in Phase 3b.

**Architecture:** `<KemisProvider>` becomes the single root the consumer wraps their app with. It mounts `PrimeReactProvider` (still v9 here, will become v10 in 3b), a global `<Toast />`, a global `<ConfirmDialog />`, and exposes refs through React context so utility functions (`Toast.success`, `Toast.confirm`, etc.) can imperatively trigger them without React tree access. The legacy `utils/toast.ts` keeps the same exported function signatures so consumers don't have to change call sites — only the internals swap from SweetAlert to PrimeReact. Tailwind 4 brings CSS-first configuration: theme tokens move from `tailwind.config.js` into a `@theme {}` block in `src/styles/index.css`, and the build CLI moves to `@tailwindcss/cli`.

**Tech Stack additions:** Tailwind 4, `@tailwindcss/cli`, `@tailwindcss/postcss`. PrimeReact stays on 9 in this phase.

**Reference spec:** `docs/superpowers/specs/2026-05-27-kemis-library-v3-migration-design.md` (sections 5.2, 9, 10)

**Deferred to Phase 3b:**
- React 18 → 19
- PrimeReact 9 → 10
- Quill → Tiptap (in `EditorHtml`)
- Per-component PassThrough adjustments

---

## File Structure

**Will be created:**
- `src/components/KemisProvider/index.tsx` — the provider component
- `src/components/KemisProvider/context.ts` — internal context type + refs
- `src/components/KemisProvider/types.ts` — provider props

**Will be modified:**
- `src/components/index.ts` — export `KemisProvider`
- `src/utils/toast.ts` — rewrite implementation using PrimeReact Toast/ConfirmDialog via the provider context
- `src/utils/index.ts` — `Toast` export stays (same name, new implementation)
- `src/styles/index.css` — Tailwind 4 entry (`@import "tailwindcss"` + `@theme {}` block)
- `tailwind.config.js` — DELETED (config moves into `@theme {}` in CSS). If small bits of legacy plugin config remain, keep a minimal `tailwind.config.js` that v4 still supports for backward compat — note in the relevant task.
- `postcss.config.js` — switch plugin to `@tailwindcss/postcss`
- `package.json` — install `tailwindcss@^4`, `@tailwindcss/cli`, `@tailwindcss/postcss`; update `build:css` script; uninstall `sweetalert2`

**Untouched:** PrimeReact components (Phase 3b), React version, every other component besides those touched here.

---

## Task 1: Tailwind 3 → 4 migration

The largest infra change in this phase. Tailwind 4 uses CSS-first config and a new PostCSS plugin package.

**Files:**
- Modify: `src/styles/index.css`
- Modify: `postcss.config.js`
- Delete or trim: `tailwind.config.js`
- Modify: `package.json` (`build:css` script)

- [ ] **Step 1: Read current state**

Read these files (with the Read tool):
- `src/styles/index.css`
- `tailwind.config.js`
- `postcss.config.js`

Inventory what's there: theme extensions (colors, fontFamily, spacing, etc.), plugins, content globs.

- [ ] **Step 2: Install Tailwind 4 stack**

```bash
npm uninstall tailwindcss --legacy-peer-deps
npm install --save tailwindcss@^4 @tailwindcss/cli@^4 @tailwindcss/postcss@^4 --legacy-peer-deps
```

(Note: in v4, `tailwindcss` is the runtime + `@tailwindcss/postcss` is the PostCSS plugin + `@tailwindcss/cli` is the standalone CLI binary. All three are needed.)

- [ ] **Step 3: Rewrite `src/styles/index.css`**

Replace any `@tailwind base; @tailwind components; @tailwind utilities;` with the v4 import + theme block. Use this template (fill in tokens from Step 1):

```css
@import "tailwindcss";

@theme {
  /* Migrate any theme.extend.colors → --color-* */
  /* Migrate any theme.extend.fontFamily → --font-* */
  /* Migrate any theme.extend.spacing → --spacing-* */
  /* Migrate any theme.extend.borderRadius → --radius-* */
}

/* Any custom @layer base / @layer components / @layer utilities content
   from the previous file goes here unchanged. */
```

If `tailwind.config.js` declared `content: [...]` globs, v4 auto-detects them — you can drop that config entirely.

If `tailwind.config.js` declared plugins (e.g., `@tailwindcss/typography`), keep the file minimal:

```js
/** @type {import('tailwindcss').Config} */
export default {
  plugins: [],
};
```

…and install the plugin's v4-compatible version. If no plugins, delete `tailwind.config.js` entirely:

```bash
git rm tailwind.config.js
```

- [ ] **Step 4: Update `postcss.config.js`**

Replace the existing config with:

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
```

(Drop the legacy `tailwindcss: {}` entry. If `postcss-import` or `postcss-nested` were present, KEEP them — Tailwind 4 doesn't subsume those.)

- [ ] **Step 5: Update `build:css` script in `package.json`**

Old:
```json
"build:css": "postcss src/styles/components/components.css --dir dist/styles && tailwindcss -i ./src/styles/index.css -o ./dist/styles/base.css"
```

New:
```json
"build:css": "postcss src/styles/components/components.css --dir dist/styles && npx @tailwindcss/cli -i ./src/styles/index.css -o ./dist/styles/base.css"
```

- [ ] **Step 6: Build and verify CSS output**

```bash
npm run build
```

Expected: `dist/styles/base.css` exists, contains generated utility classes, no v3-vs-v4 syntax errors in console.

Inspect with the Read tool: open `dist/styles/base.css` and check that classes like `.bg-black\/33`, `.animate-spin`, `[&_.p-inputtext]\:w-full` (used by `Form/InputNumber`) appear in the generated output. If they don't, investigate — Tailwind 4's content auto-detection should pick them up from `src/**`.

- [ ] **Step 7: Re-check lint and types**

```bash
npm run lint
npx tsc --noEmit
```

Both exit 0.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "build(v3): upgrade Tailwind 3 → 4 (CSS-first config, @tailwindcss/postcss)"
```

---

## Task 2: Scaffold `KemisProvider` (theme + i18n wrapper)

Initial provider with PrimeReact 9 PrimeReactProvider + language hook bridge. Toast and Confirm refs come in Task 3.

**Files:**
- Create: `src/components/KemisProvider/types.ts`
- Create: `src/components/KemisProvider/context.ts`
- Create: `src/components/KemisProvider/index.tsx`
- Modify: `src/components/index.ts` (re-export)

- [ ] **Step 1: Read existing language hook**

Open `src/hooks/Language/index.tsx` to confirm its `<LanguageProvider>` (or equivalent) signature and the props it exposes (e.g., `defaultLanguage` or none).

- [ ] **Step 2: Write `src/components/KemisProvider/types.ts`**

```ts
import type { ReactNode } from "react";

export type KemisProviderProps = {
  children: ReactNode;
  /** Default locale code (e.g., "pt-BR", "en-US"). Passed through to the i18n provider. */
  locale?: string;
};
```

- [ ] **Step 3: Write `src/components/KemisProvider/context.ts`**

This file becomes more interesting in Task 3 when toast refs land. For now, just a placeholder export so the import path stabilizes:

```ts
import { createContext } from "react";

export type KemisContextValue = {
  /** Filled in Task 3 — toast/confirm imperative refs. */
  __placeholder?: never;
};

export const KemisContext = createContext<KemisContextValue>({});
```

- [ ] **Step 4: Write `src/components/KemisProvider/index.tsx`**

```tsx
import { PrimeReactProvider } from "primereact/api";
import { useMemo } from "react";
import { LanguageProvider } from "../../hooks/Language";
import { KemisContext, type KemisContextValue } from "./context";
import type { KemisProviderProps } from "./types";

export function KemisProvider({ children, locale }: KemisProviderProps) {
  const value = useMemo<KemisContextValue>(() => ({}), []);

  return (
    <PrimeReactProvider>
      <LanguageProvider defaultLanguage={locale}>
        <KemisContext.Provider value={value}>{children}</KemisContext.Provider>
      </LanguageProvider>
    </PrimeReactProvider>
  );
}

export type { KemisProviderProps } from "./types";
```

If the actual `LanguageProvider` accepts a different prop name (e.g., `language` instead of `defaultLanguage`), adjust accordingly based on what you read in Step 1.

- [ ] **Step 5: Re-export from `src/components/index.ts`**

Append:
```ts
// KemisProvider:
export { KemisProvider } from "./KemisProvider";
export type { KemisProviderProps } from "./KemisProvider";
```
Place near the top of the file, before the alphabetical component exports — it's the root provider.

- [ ] **Step 6: Typecheck and build**

```bash
npx tsc --noEmit && npm run build
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(v3): add KemisProvider scaffold (PrimeReactProvider + i18n)"
```

---

## Task 3: Wire Toast + ConfirmDialog refs into `KemisProvider`

The provider mounts a single PrimeReact `<Toast />` and `<ConfirmDialog />` and exposes their refs via a module-level singleton so the imperative `Toast.success(...)` / `Toast.confirm(...)` API in `utils/toast.ts` keeps working without React tree access.

**Files:**
- Modify: `src/components/KemisProvider/index.tsx`
- Modify: `src/components/KemisProvider/context.ts`
- Create: `src/components/KemisProvider/refs.ts` (module-level singleton refs)

- [ ] **Step 1: Write `src/components/KemisProvider/refs.ts`**

```ts
import type { Toast as PrimeToast } from "primereact/toast";
import { createRef, type RefObject } from "react";

/**
 * Module-level refs to the global Toast and ConfirmDialog mounted by
 * <KemisProvider />. Used by utils/toast.ts to fire imperatively from
 * outside the React tree.
 *
 * If <KemisProvider /> is not mounted, the refs' .current will be null
 * and callers should fall back to a no-op (or a console.warn).
 */
export const toastRef: RefObject<PrimeToast | null> = createRef<PrimeToast | null>();
```

(ConfirmDialog has a separate imperative API — `confirmDialog(...)` is a global function exported by `primereact/confirmdialog`, so we don't need a ref for it. Mount it once and call the global from `utils/toast.ts`.)

- [ ] **Step 2: Update `src/components/KemisProvider/index.tsx`**

```tsx
import { PrimeReactProvider } from "primereact/api";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useMemo } from "react";
import { LanguageProvider } from "../../hooks/Language";
import { KemisContext, type KemisContextValue } from "./context";
import { toastRef } from "./refs";
import type { KemisProviderProps } from "./types";

export function KemisProvider({ children, locale }: KemisProviderProps) {
  const value = useMemo<KemisContextValue>(() => ({}), []);

  return (
    <PrimeReactProvider>
      <LanguageProvider defaultLanguage={locale}>
        <KemisContext.Provider value={value}>
          {children}
          <Toast ref={toastRef} position="top-right" />
          <ConfirmDialog />
        </KemisContext.Provider>
      </LanguageProvider>
    </PrimeReactProvider>
  );
}

export type { KemisProviderProps } from "./types";
```

- [ ] **Step 3: Typecheck and build**

```bash
npx tsc --noEmit && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(v3): mount global Toast + ConfirmDialog in KemisProvider"
```

---

## Task 4: Rewrite `utils/toast.ts` on top of PrimeReact

Replace the SweetAlert internals with PrimeReact `Toast` (via `toastRef`) and `confirmDialog`. Preserve the public function signatures so consumers don't have to change call sites.

**Files:**
- Modify: `src/utils/toast.ts`

- [ ] **Step 1: Read current `src/utils/toast.ts`**

Inventory: what exports does it expose? Common surface in such helpers: `success`, `error`, `info`, `warning`, `confirm`. Capture the exact signatures.

- [ ] **Step 2: Read PrimeReact Toast and ConfirmDialog APIs from `node_modules/primereact`**

Confirm:
- `toastRef.current?.show({ severity: "success", summary, detail, life })`
- `confirmDialog({ message, header, icon, accept, reject, acceptLabel, rejectLabel })`

- [ ] **Step 3: Rewrite `src/utils/toast.ts`** to keep the exported API stable while using the new implementation under the hood.

Template (adapt to match the exact surface you saw in Step 1):

```ts
import { confirmDialog } from "primereact/confirmdialog";
import { toastRef } from "../components/KemisProvider/refs";

type ToastOptions = {
  title?: string;
  message: string;
  durationMs?: number;
};

type ConfirmOptions = {
  title?: string;
  message: string;
  acceptLabel?: string;
  rejectLabel?: string;
  onAccept?: () => void;
  onReject?: () => void;
};

function show(severity: "success" | "info" | "warn" | "error", opts: ToastOptions) {
  if (!toastRef.current) {
    console.warn(
      "[kemis-library] Toast called before <KemisProvider /> mounted; message dropped:",
      opts.message,
    );
    return;
  }
  toastRef.current.show({
    severity,
    summary: opts.title,
    detail: opts.message,
    life: opts.durationMs ?? 4000,
  });
}

const Toast = {
  success: (opts: ToastOptions) => show("success", opts),
  info: (opts: ToastOptions) => show("info", opts),
  warning: (opts: ToastOptions) => show("warn", opts),
  error: (opts: ToastOptions) => show("error", opts),
  confirm: (opts: ConfirmOptions) =>
    confirmDialog({
      header: opts.title,
      message: opts.message,
      acceptLabel: opts.acceptLabel ?? "OK",
      rejectLabel: opts.rejectLabel ?? "Cancel",
      accept: opts.onAccept,
      reject: opts.onReject,
    }),
};

export default Toast;
```

**Important: match the original export shape.** If the previous module had a different surface (e.g., `Toast.success(message)` taking a plain string instead of an options object), adjust the parameter shape to match. If the original was a `Swal.fire(...)` proxy, port the most-used 2-3 patterns and document any unsupported calls in MIGRATION.md.

- [ ] **Step 4: Typecheck and build**

```bash
npx tsc --noEmit && npm run build
```

If a consumer in `src/` calls `Toast.something(...)` and the signature changed, the typecheck will flag the call site. Adjust the consumer to use the new signature (and note in MIGRATION.md).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor(v3): rewrite utils/toast on PrimeReact (Toast + ConfirmDialog)"
```

---

## Task 5: Remove `sweetalert2` and verify

After Task 4 nothing should import `sweetalert2`. Confirm with Grep, then uninstall.

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Verify zero imports**

Grep `from ['"]sweetalert2['"]|require\(['"]sweetalert2['"]\)` under `src/`. Expect zero results. If any remain, STOP and report.

- [ ] **Step 2: Uninstall**

```bash
npm uninstall sweetalert2 --legacy-peer-deps
```

- [ ] **Step 3: Verify build, lint, typecheck, test, pack**

```bash
npm run lint
npx tsc --noEmit
npm run test:run
npm run build
npm pack --dry-run
```

All exit 0.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore(v3): remove sweetalert2 (replaced by PrimeReact via KemisProvider)"
```

---

## Task 6: Update `MIGRATION.md` and push

**Files:**
- Modify: `MIGRATION.md`

- [ ] **Step 1: Append a Phase 3a section to `MIGRATION.md`**

```markdown

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

2. **Tailwind 4** is now the styling engine. If consumers were relying on the library's exported `tailwind.config.js`, they should switch to importing `kemis-library/styles` (CSS) and using v4's CSS-first `@theme {}` for their own customizations.

3. **`Toast.confirm`** signature changed:
   - Was: `Swal.fire(...)`-shaped options bag with `text`, `icon`, `showCancelButton`, etc.
   - Now: `{ title?, message, acceptLabel?, rejectLabel?, onAccept?, onReject? }`.
   Other `Toast.success/info/warning/error` calls keep the same `{ title, message }` shape.

**Internal changes (no consumer impact):**
- `sweetalert2` removed; replaced by PrimeReact `Toast` + `confirmDialog`.
```

- [ ] **Step 2: Full local CI sequence**

```bash
npm run lint
npx tsc --noEmit
npm run test:run
npm run build
npm pack --dry-run
```
All five must exit 0.

- [ ] **Step 3: Commit + push**

```bash
git add MIGRATION.md
git commit -m "docs(v3): document Phase 3a in MIGRATION.md"
git push origin v3
```

---

## Definition of Done — Phase 3a

- [ ] Tailwind 4 installed; `tailwind.config.js` either deleted or trimmed to plugins-only.
- [ ] `postcss.config.js` uses `@tailwindcss/postcss`.
- [ ] `npm run build` produces a `dist/styles/base.css` that includes all utility classes used in `src/` (smoke-checked via Read).
- [ ] `src/components/KemisProvider/{index.tsx, context.ts, refs.ts, types.ts}` all exist.
- [ ] `KemisProvider` is exported from `src/components/index.ts` and re-exported from `src/index.ts` via the components barrel.
- [ ] `utils/toast.ts` no longer imports `sweetalert2`; uses `toastRef` + `confirmDialog`.
- [ ] `sweetalert2` is absent from `package.json`.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run test:run`, `npm run build`, `npm pack --dry-run` all exit 0.
- [ ] `MIGRATION.md` has a Phase 3a section noting the provider requirement and the `Toast.confirm` API change.
- [ ] `v3` is pushed.
