# kemis-library v3.0.0 — Phase 2: Dependency Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate dead dependencies, consolidate duplicates, and rewrite the few internal call-sites that block deletion, all while keeping the public component API unchanged.

**Architecture:** Phase 2 is a sequence of small, focused refactors. First we rewrite any source code that holds a dependency in place (e.g., `next/image` in DialogPhoto, `react-cropper` in CropImage, `styled-components` in 3 files, `file-saver` in ShowFile). Then we reclassify remaining runtime dependencies from `devDependencies` to `dependencies` so consumers get them automatically. Finally we delete the now-unreferenced packages. Library still runs on PrimeReact 9 / Tailwind 3 / React 18 — the major upgrades land in Phase 3.

**Tech Stack:** Same as end of Phase 1 (tsup, Vitest, ESLint 9 flat, Prettier, Husky, Changesets, GitHub Actions). New small additions: `clsx` for conditional classnames; relying more heavily on `tailwind-merge` (already present).

**Reference spec:** `docs/superpowers/specs/2026-05-27-kemis-library-v3-migration-design.md`

**Deferred to Phase 3:**
- Replacing `sweetalert2` with PrimeReact `Toast` + `ConfirmDialog` — depends on `<KemisProvider>` for global Toast/Confirm mounting, which is created in Phase 3.

---

## File Structure

**Will be created:**
- `src/utils/cn.ts` — single `cn(...)` helper combining `clsx` + `tailwind-merge`
- `src/utils/downloadFile.ts` — Blob + anchor download helper, replaces `file-saver`

**Will be modified:**
- `src/components/DialogPhoto/index.tsx` — replace `next/image` with native `<img>`
- `src/components/CropImage/index.tsx` — switch from `react-cropper` to `react-image-crop`
- `src/components/Loading/index.tsx` — inline Tailwind classes (drop styles.ts import)
- `src/components/Form/InputNumber/index.tsx` — inline Tailwind classes (drop `styled` usage)
- `src/components/ShowFile/index.tsx` — switch from `file-saver` to `utils/downloadFile`
- `package.json` — reclassify and remove deps

**Will be deleted:**
- `src/components/Loading/styles.ts`
- `src/components/CropImage/styles.ts`
- `src/utils/fontsGoogle.ts` (dead code; `.load()` is commented out)
- Removal of the `returnFontsArray` export from `src/utils/index.ts`

**Untouched in this phase:**
- All other components, hooks, validators, styles.
- `sweetalert2` (`utils/toast.ts`) — stays exactly as-is, removal deferred to Phase 3.

---

## Task 1: Replace `next/image` with native `<img>` in `DialogPhoto`

**Files:**
- Modify: `src/components/DialogPhoto/index.tsx`

- [ ] **Step 1: Read `DialogPhoto/index.tsx`** and identify the `next/image` import and its single (or few) usages.

- [ ] **Step 2: Edit the file**
  - Remove `import Image from "next/image";`
  - Replace each `<Image src={...} alt={...} width={...} height={...} ... />` with `<img src={...} alt={...} width={...} height={...} ... />`
  - Keep all surrounding JSX, props, styles, and behavior identical.
  - `next/image` provides automatic optimization that `<img>` does not — this is an intentional trade-off documented in the spec.

- [ ] **Step 3: Verify typecheck and build**

```bash
npx tsc --noEmit && npm run build
```
Both must exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/DialogPhoto/index.tsx
git commit -m "refactor(v3): replace next/image with native img in DialogPhoto"
```

---

## Task 2: Delete dead `utils/fontsGoogle.ts`

The `.load()` call inside this file has been commented out for a long time. No other code calls it in a way that triggers loading. The `returnFontsArray` export is removed too — verify no consumer uses it inside `src/`.

**Files:**
- Delete: `src/utils/fontsGoogle.ts`
- Modify: `src/utils/index.ts` (remove the `returnFontsArray` re-export)

- [ ] **Step 1: Verify no internal callers**

Use Grep tool with pattern `fontsGoogle|returnFontsArray` across `src/`. Expect: only the file itself and its export in `utils/index.ts`. If you find a real caller, STOP and report.

- [ ] **Step 2: Delete the file and edit the barrel**

```bash
git rm src/utils/fontsGoogle.ts
```

Edit `src/utils/index.ts`:
- Remove the line `export { default as returnFontsArray } from "./fontsGoogle";`

- [ ] **Step 3: Typecheck and build**

```bash
npx tsc --noEmit && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore(v3): delete dead utils/fontsGoogle.ts (webfontloader code path)"
```

---

## Task 3: Create `utils/cn.ts` (clsx + tailwind-merge)

A `cn(...classes)` helper used by upcoming Tailwind migrations.

**Files:**
- Create: `src/utils/cn.ts`
- Modify: `src/utils/index.ts` (export `cn`)

- [ ] **Step 1: Install `clsx`**

```bash
npm install clsx --legacy-peer-deps
```

(`tailwind-merge` is already a runtime dep — confirm in `package.json`.)

- [ ] **Step 2: Write `src/utils/cn.ts`**

```ts
import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 3: Add export to `src/utils/index.ts`**

Append the line:
```ts
export { cn } from "./cn";
```
(Place it alphabetically near the other named exports.)

- [ ] **Step 4: Typecheck and build**

```bash
npx tsc --noEmit && npm run build
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(v3): add utils/cn (clsx + tailwind-merge helper)"
```

---

## Task 4: Migrate `Loading` from styled-components to Tailwind

**Files:**
- Modify: `src/components/Loading/index.tsx`
- Delete: `src/components/Loading/styles.ts`

- [ ] **Step 1: Read both files** to map every styled-component to equivalent Tailwind classes.

- [ ] **Step 2: Edit `index.tsx`**
  - Remove the `import { ... } from "./styles";` line.
  - Replace each styled-component element with the underlying HTML element + Tailwind classes via the new `cn()` helper imported from `../../utils`.
  - Preserve all conditional class logic (use `cn(base, condition && "extra")`).
  - Preserve all data attributes, ARIA, event handlers, props.

- [ ] **Step 3: Delete the styles file**

```bash
git rm src/components/Loading/styles.ts
```

- [ ] **Step 4: Typecheck, build, lint**

```bash
npx tsc --noEmit && npm run build && npm run lint
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor(v3): migrate Loading from styled-components to Tailwind"
```

---

## Task 5: Migrate `Form/InputNumber` from styled-components to Tailwind

**Files:**
- Modify: `src/components/Form/InputNumber/index.tsx`

- [ ] **Step 1: Read the file** and locate every `styled.xxx\`...\`` usage and every imported component from `styled-components`.

- [ ] **Step 2: Replace inline**
  - Remove the `import styled from "styled-components";` line.
  - Replace each `const StyledX = styled.div\`...\`` with a Tailwind class string assigned to a `const x_styles = "..."` constant near the top of the file, OR inline directly in the JSX via `cn()`.
  - Use `cn()` from `../../../utils` for any conditional class composition.
  - Preserve all props, refs, behavior.

- [ ] **Step 3: Typecheck, build, lint**

```bash
npx tsc --noEmit && npm run build && npm run lint
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor(v3): migrate Form/InputNumber from styled-components to Tailwind"
```

---

## Task 6: Migrate `CropImage` from `react-cropper` + `styled-components` to `react-image-crop` + Tailwind

This is the largest task in Phase 2. `react-cropper` is being removed; `react-image-crop` (already in `dependencies`) becomes the sole crop library.

**Files:**
- Modify: `src/components/CropImage/index.tsx`
- Delete: `src/components/CropImage/styles.ts`

- [ ] **Step 1: Read the existing CropImage implementation and its styles**

Use Read on both files. Inventory: what props does the component accept? What does it call back to consumers? What ref-imperative API does it expose (if any)?

- [ ] **Step 2: Read `src/utils/canvasPreview.ts`** — it already uses `react-image-crop`. The new CropImage will call this helper to produce a cropped output. Note the function signature.

- [ ] **Step 3: Rewrite CropImage on top of `react-image-crop`**

Public props/exports must stay the same. Internally:
  - Replace `import Cropper from "react-cropper"` with `import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop"` plus `import "react-image-crop/dist/ReactCrop.css"` at the top of the file (or import in `src/styles/index.css` — your choice; pick whichever doesn't require touching the global stylesheet entry).
  - Manage `crop` and `completedCrop` state with `useState`.
  - When the user finalizes, call `canvasPreview(...)` from `utils/canvasPreview` to generate the cropped image (Blob or DataURL — match what the old onChange contract was).
  - Layout: use Tailwind classes (no styled-components). Use `cn()` for conditional classes.
  - Preserve aspect ratio prop handling and any min/max constraints.

- [ ] **Step 4: Delete the styles file**

```bash
git rm src/components/CropImage/styles.ts
```

- [ ] **Step 5: Typecheck, build, lint**

```bash
npx tsc --noEmit && npm run build && npm run lint
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor(v3): migrate CropImage from react-cropper to react-image-crop"
```

If the rewrite turns out larger than expected (e.g., the public API needs adjustment because `react-cropper`'s imperative ref API was used by consumers), STOP and report DONE_WITH_CONCERNS with the proposed API delta — controller will decide whether to defer.

---

## Task 7: Replace `file-saver` with `utils/downloadFile`

**Files:**
- Create: `src/utils/downloadFile.ts`
- Modify: `src/components/ShowFile/index.tsx`
- Modify: `src/utils/index.ts` (export the new helper)

- [ ] **Step 1: Write `src/utils/downloadFile.ts`**

```ts
/**
 * Trigger a browser download for a Blob or URL.
 * Replaces `file-saver` (saveAs) with a tiny native equivalent.
 */
export function downloadFile(source: Blob | string, filename: string): void {
  const url = typeof source === "string" ? source : URL.createObjectURL(source);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  if (typeof source !== "string") {
    // Revoke after the click so the browser has had a chance to grab the bytes.
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }
}
```

- [ ] **Step 2: Export from `src/utils/index.ts`**

Append:
```ts
export { downloadFile } from "./downloadFile";
```

- [ ] **Step 3: Edit `src/components/ShowFile/index.tsx`**

- Remove `import { saveAs } from "file-saver";`
- Replace every `saveAs(blob, filename)` call with `downloadFile(blob, filename)` (import from `../../utils`).
- No other behavior changes.

- [ ] **Step 4: Typecheck, build, lint**

```bash
npx tsc --noEmit && npm run build && npm run lint
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor(v3): replace file-saver with downloadFile helper"
```

---

## Task 8: Reclassify runtime libs from `devDependencies` → `dependencies`

These libraries are imported by the library's public API. Today they sit in `devDependencies`, which forces consumers to install them manually. Move them so a plain `npm install kemis-library` is enough.

Libraries to move (verify each is imported under `src/` via Grep before moving — if a library is NOT imported, REMOVE it instead and note it in your report):
- `react-hook-form`
- `axios` (verify usage)
- `react-canvas-draw`
- `react-dropzone`
- `react-webcam`
- `cep-promise`
- `cpf-cnpj-validator`
- `date-fns`

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Verify each import exists**

Run a Grep for each library name (e.g., `from ['"]react-hook-form['"]`) under `src/`. Build a small table: lib → number of files that import it.

If a lib has 0 imports inside `src/`, do not move it — flag for deletion in Task 9.

- [ ] **Step 2: Edit `package.json`**

For each lib with ≥1 import, move its entry from `devDependencies` to `dependencies`. Keep the same version range.

Use Edit tool, one entry at a time, or carefully rewrite the dependency blocks.

- [ ] **Step 3: Run `npm install` to refresh `package-lock.json`**

```bash
npm install --legacy-peer-deps
```

- [ ] **Step 4: Verify build still works**

```bash
npm run build && npm run lint
```

- [ ] **Step 5: Verify `npm pack --dry-run`** still ships only `dist/**` + `package.json` + `README.md` (+ `MIGRATION.md` if added to `files`).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore(v3): move runtime libs from devDependencies to dependencies"
```

---

## Task 9: Remove dead and replaced dependencies

After Tasks 1–7 nothing in `src/` imports these libraries. Verify with Grep, then remove.

Candidates for removal (run Grep on each name first to confirm zero imports under `src/`):
- `next` (Task 1 removed the only call site)
- `eslint-config-next` (Task 4 of Phase 1 already removed; double-check)
- `yup` (validator is `zod`; verify zero imports)
- `@hookform/resolvers` — KEEP if zod resolver is imported under `src/`; otherwise remove. Verify.
- `styled-components` and `@types/styled-components` (Tasks 4–6 removed all uses)
- `webfontloader` and `@types/webfontloader` (Task 2 deleted the file that imported them)
- `file-saver` and `@types/file-saver` (Task 7 replaced)
- `axios-mock-adapter` (no tests currently using it; remove)
- `react-router-dom` (verified 0 imports in Phase 1 reconnaissance)
- `react-cropper` (Task 6 replaced)

**Files:**
- Modify: `package.json` (and `package-lock.json` via `npm uninstall`)

- [ ] **Step 1: Grep each candidate**

For each library above, run a Grep under `src/`. Confirm ZERO imports. If any has imports, STOP and report — that's a missed migration.

- [ ] **Step 2: Uninstall**

Run a single `npm uninstall` with every confirmed-dead package as args:

```bash
npm uninstall \
  next eslint-config-next yup styled-components @types/styled-components \
  webfontloader @types/webfontloader file-saver @types/file-saver \
  axios-mock-adapter react-router-dom react-cropper \
  --legacy-peer-deps
```

(Include `@hookform/resolvers` ONLY if Step 1 showed zero imports of it.)

- [ ] **Step 3: Verify build, lint, typecheck, test**

```bash
npm run lint
npx tsc --noEmit
npm run test:run
npm run build
```

All must exit 0.

- [ ] **Step 4: Inspect package size**

```bash
npm pack --dry-run
```

The published payload should still be ~22 files (dist + package.json + README). Note any change in size.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore(v3): remove dead dependencies (next, yup, styled-components, file-saver, sweetalert deferred, etc.)"
```

(Adjust the commit message to reflect what was actually removed.)

---

## Task 10: Final verification, MIGRATION.md update, push

**Files:**
- Modify: `MIGRATION.md` (add a Phase 2 section)

- [ ] **Step 1: Append a Phase 2 section to `MIGRATION.md`**

```markdown

## Phase 2 — dependency cleanup (no public API changes)

This phase removes dead/redundant dependencies and reclassifies runtime libraries so consumers no longer need to install them manually.

**Consumers do not need to change anything.** A `npm install kemis-library@v3-rc.x` (or the eventual `@3.0.0`) is sufficient — the library now ships all runtime peer dependencies.

**Notable internal changes:**
- `DialogPhoto` no longer uses `next/image` (uses native `<img>`).
- `CropImage` rewritten on top of `react-image-crop` (was `react-cropper`).
- File downloads use a native helper (`downloadFile`) instead of `file-saver`.
- `Loading`, `CropImage`, `Form/InputNumber` use Tailwind instead of `styled-components`.

**Removed dependencies (no replacement needed):** `next`, `yup`, `styled-components`, `@types/styled-components`, `webfontloader`, `@types/webfontloader`, `file-saver`, `@types/file-saver`, `axios-mock-adapter`, `react-router-dom`, `react-cropper`.

> `sweetalert2` removal is deferred to Phase 3 where the new `<KemisProvider>` provides a global Toast mount point.
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
git commit -m "docs(v3): document Phase 2 in MIGRATION.md"
git push origin v3
```

(The branch already tracks `origin/v3` from Phase 1; push is a fast-forward.)

---

## Definition of Done — Phase 2

- [ ] `next`, `eslint-config-next`, `yup`, `styled-components`, `@types/styled-components`, `webfontloader`, `@types/webfontloader`, `file-saver`, `@types/file-saver`, `axios-mock-adapter`, `react-router-dom`, `react-cropper` all absent from `package.json`.
- [ ] Grep across `src/` shows zero imports of the removed packages.
- [ ] `react-hook-form`, `axios`, `react-canvas-draw`, `react-dropzone`, `react-webcam`, `cep-promise`, `cpf-cnpj-validator`, `date-fns` are in `dependencies` (not `devDependencies`).
- [ ] `clsx` is in `dependencies`; `tailwind-merge` is in `dependencies`.
- [ ] `src/utils/cn.ts` and `src/utils/downloadFile.ts` exist and are exported from `src/utils/index.ts`.
- [ ] `src/utils/fontsGoogle.ts`, `src/components/Loading/styles.ts`, `src/components/CropImage/styles.ts` are deleted.
- [ ] `sweetalert2` and `@hookform/resolvers` are still present (their removal is intentional Phase 3 / Phase 3-or-later work).
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run test:run`, `npm run build`, `npm pack --dry-run` all exit 0.
- [ ] `MIGRATION.md` has a Phase 2 section.
- [ ] `v3` branch is pushed to `origin`.
