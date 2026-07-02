# kemis-library v3.0.0 — Phase 3b: React 19 + PrimeReact 10 + Tiptap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the major upgrade trio: React 18 → 19, PrimeReact 9 → 10 (with PassThrough adjustments across all wrapped components), and rewrite `EditorHtml` from Quill to Tiptap. Adopt PrimeReact 10 CSS-variable theming via the existing `<KemisProvider>` (from Phase 3a).

**Architecture:** Single big-bang dependency bump (React 19 + PrimeReact 10 together — PR10 explicitly supports React 18/19 so they go together safely; PR9 does not support React 19). After the bump, run typecheck to catalogue every breakage and produce a per-file fix list. Then sweep through component groups making per-file adjustments — most fixes are mechanical (e.g., `inputClassName="..."` → `pt={{ input: { className: "..." } }}`). EditorHtml is a separate full rewrite (different mental model). Theming switches from PrimeReact 9 SCSS imports to PrimeReact 10's `lara-light-blue` CSS theme, imported through `KemisProvider`.

**Tech Stack changes:** React 18 → 19, react-dom 18 → 19, primereact 9 → 10, quill → @tiptap/react + @tiptap/starter-kit.

**Reference spec:** `docs/superpowers/specs/2026-05-27-kemis-library-v3-migration-design.md` (sections 5.1, 7, 9)

**Cheat sheet — common PrimeReact 9 → 10 patterns:**
| Old (v9)                              | New (v10)                                                      |
|---------------------------------------|----------------------------------------------------------------|
| `inputClassName="x"`                  | `pt={{ input: { className: "x" } }}`                           |
| `panelClassName="x"`                  | `pt={{ panel: { className: "x" } }}`                           |
| `Calendar` (date)                     | `Calendar` (largely API-compatible; defaults differ — verify)  |
| `style` / `className` on root         | Still works                                                    |
| Removed `appendTo` props on some      | Use `pt` or document the break                                 |
| `optionLabel`/`optionValue`           | Same                                                           |
| `tooltip` / `tooltipOptions`          | Same                                                           |
| Theme CSS via `primereact/resources`  | `primereact/resources/themes/lara-light-blue/theme.css` (kept) |

If any v10 change has no straightforward equivalent, the implementer flags DONE_WITH_CONCERNS.

---

## File Structure

**Will be created (during execution):**
- `docs/v3-phase3b-fix-list.md` — transient working document capturing per-file PR10 breakages from typecheck (deleted at end of phase).

**Will be modified:**
- `package.json` — version bumps + new Tiptap packages
- `peerDependencies` — React 19, react-dom 19
- `src/components/KemisProvider/index.tsx` — import + theme CSS
- `src/styles/index.css` — possibly add `@import "primereact/resources/themes/lara-light-blue/theme.css"` (if not loaded via JS import)
- `src/components/Form/EditorHtml/index.tsx` — full rewrite on Tiptap
- All component files that use deprecated/removed PR10 props
- `tsup.config.ts` — drop `quill` from external list, add `@tiptap/*` packages

**Will be deleted at end of phase:**
- `docs/v3-phase3b-fix-list.md`
- `quill` from `dependencies`

**Untouched:** `utils/`, `hooks/`, anything that doesn't import PrimeReact or Quill.

---

## Task 1: Bump React 19 + PrimeReact 10 + supporting deps

The single big-bang version bump. Expect typecheck failures after this — that's intentional and tracked in Task 2.

**Files:**
- Modify: `package.json` (and `package-lock.json` via npm)

- [ ] **Step 1: Update peerDependencies**

Read `package.json`. Replace the `peerDependencies` block:
```json
"peerDependencies": {
  "react": "^19",
  "react-dom": "^19"
}
```

- [ ] **Step 2: Install React 19 + types**

```bash
npm install --save-dev react@^19 react-dom@^19 @types/react@^19 @types/react-dom@^19 --legacy-peer-deps
```

- [ ] **Step 3: Install PrimeReact 10**

```bash
npm install --save primereact@^10 --legacy-peer-deps
```

(PrimeReact 10 still expects `primeicons` as a sibling — leave the existing version pinned. If not installed, run `npm install --save primeicons --legacy-peer-deps`.)

- [ ] **Step 4: Verify build doesn't crash catastrophically**

```bash
npm run build 2>&1 | tail -20
```

If tsup errors out completely (cannot generate any output), STOP and report. If it builds but produces typecheck warnings, that's expected — proceed to Task 2.

- [ ] **Step 5: Commit (do NOT push yet)**

```bash
git add -A
git commit -m "build(v3): bump React 19 + PrimeReact 10 (expect typecheck breaks)"
```

The pre-commit hook may fail because Husky runs `eslint --fix` on staged source files — if eslint errors out due to React 19 type changes, use `git commit --no-verify` (this is the ONE place where bypassing the hook is acceptable, because the next tasks fix the errors). Note in your report if you had to use `--no-verify`.

## Task 2: Catalogue PrimeReact 10 + React 19 breaks

Generate a structured fix list so subsequent tasks have a precise per-file work plan.

**Files:**
- Create: `docs/v3-phase3b-fix-list.md`

- [ ] **Step 1: Run typecheck and capture output**

```bash
npx tsc --noEmit > /tmp/tsc-output.txt 2>&1 || true
wc -l /tmp/tsc-output.txt
```

- [ ] **Step 2: Read the typecheck output and group errors by file**

Use the Read tool on `/tmp/tsc-output.txt`. Bucket errors per source file. For each file, note:
- File path
- Number of errors
- Error categories (e.g., "removed prop `inputClassName`", "type mismatch on `<Calendar>` onChange handler")

- [ ] **Step 3: Write `docs/v3-phase3b-fix-list.md`**

Use this template:

```markdown
# Phase 3b PrimeReact 10 / React 19 Fix List

Generated automatically from `npx tsc --noEmit` after the major bump.
This document is consumed by Tasks 3–9 and DELETED at end of Phase 3b.

## Summary

- Total error count: N
- Files affected: M

## Files

### src/components/<...>/index.tsx (X errors)
- TS2322: Type 'X' is not assignable to type 'Y' on prop `<propName>` — see line 42
- ...

### src/components/<...>/index.tsx (X errors)
...
```

Include every file with at least 1 error. Don't omit any.

- [ ] **Step 4: Commit the fix list**

```bash
git add docs/v3-phase3b-fix-list.md
git commit -m "docs(v3): catalogue PR10/React 19 typecheck breaks for Phase 3b"
```

(If pre-commit hook blocks because Prettier reflows the markdown, accept the reflow.)

## Task 3: Fix leaf inputs (Group A)

Files (only those that appear in the fix list — skip any that are clean):
- `src/components/Form/InputText/index.tsx`
- `src/components/Form/InputNumber/index.tsx`
- `src/components/Form/InputMask/index.tsx`
- `src/components/Form/InputPassword/index.tsx`
- `src/components/Form/InputTextArea/index.tsx`
- `src/components/Form/InputSwitch/index.tsx`

- [ ] **Step 1: Open each file listed for this group in `docs/v3-phase3b-fix-list.md`**

- [ ] **Step 2: Apply the PrimeReact 10 cheat-sheet rewrites**

For each file, use the patterns in the plan header. Common operations:
- Replace `inputClassName="x"` with `pt={{ input: { className: "x" } }}`.
- Replace `panelClassName="x"` with `pt={{ panel: { className: "x" } }}`.
- If a prop simply doesn't exist anymore, use `pt={{ ... }}` to inject equivalent classes onto the matching internal element. Use `cn()` from `../../../utils` for class composition.
- If the typecheck error is a React 19 ref-typing issue (e.g., `RefObject<X | null>` vs `RefObject<X>`), update the local `useRef` initializer (`useRef<X>(null)` → `useRef<X | null>(null)`).
- For `defaultProps` on function components (removed in React 19), move defaults into destructuring (`function X({ foo = 1 }: Props)`).

If a fix requires non-trivial design judgment (e.g., a prop has no equivalent at all), STOP and report DONE_WITH_CONCERNS with the proposed alternative.

- [ ] **Step 3: Verify typecheck shrinks**

```bash
npx tsc --noEmit 2>&1 | tee /tmp/tsc-output.txt | grep "error TS" | wc -l
```

The count should be LOWER than before. Update `docs/v3-phase3b-fix-list.md` removing the fixed files.

- [ ] **Step 4: Build smoke test**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "fix(v3): PR10 PassThrough for leaf inputs (Text/Number/Mask/Password/TextArea/Switch)"
```

## Task 4: Fix select inputs (Group B)

Same procedure as Task 3, for:
- `src/components/Form/Dropdown/index.tsx`
- `src/components/Form/MultiSelect/index.tsx`
- `src/components/Form/AutoComplete/index.tsx`
- `src/components/Form/ListBox/index.tsx`
- `src/components/Form/SelectButton/index.tsx`
- `src/components/Form/RadioButton/index.tsx`
- `src/components/Form/CheckBox/index.tsx`
- `src/components/Form/Chips/index.tsx`

- [ ] **Step 1: Read each file's entry in `docs/v3-phase3b-fix-list.md`** and apply cheat-sheet rewrites as in Task 3.

- [ ] **Step 2–4: Same verify/build/commit cycle.**

```bash
git commit -m "fix(v3): PR10 PassThrough for select inputs (Dropdown/MultiSelect/AutoComplete/etc.)"
```

## Task 5: Fix date / phone inputs (Group C)

- `src/components/Form/InputDate/index.tsx`
- `src/components/Form/InputCellPhone/index.tsx`

PrimeReact's `Calendar` is renamed/refactored slightly in v10 (datePicker mode etc.); confirm via PrimeReact 10 docs (`node_modules/primereact/calendar` types) before rewriting.

- [ ] **Step 1: Read each file + its fix list entry**
- [ ] **Step 2: Apply fixes. If `Calendar`'s `onChange` event shape changed, adapt.**
- [ ] **Step 3: Verify typecheck shrinks**
- [ ] **Step 4: Build smoke test**
- [ ] **Step 5: Commit**
  ```bash
  git commit -m "fix(v3): PR10 PassThrough for date + cellphone inputs"
  ```

## Task 6: Fix file / media inputs (Group D)

- `src/components/Form/InputFile/index.tsx`
- `src/components/Form/InputImage/index.tsx`
- `src/components/Form/InputImage/Partials/Box/index.tsx`
- `src/components/UploadPhoto/index.tsx`

PrimeReact's `FileUpload` had API tweaks; confirm shape.

- [ ] **Steps 1–5: Same as Tasks 3–5.**
  ```bash
  git commit -m "fix(v3): PR10 PassThrough for file/image inputs and UploadPhoto"
  ```

## Task 7: Fix dialogs (Group F)

- `src/components/Dialog/index.tsx`
- `src/components/DialogFile/index.tsx`
- `src/components/DialogPhoto/index.tsx`

- [ ] **Steps 1–5: Same as above.**
  ```bash
  git commit -m "fix(v3): PR10 PassThrough for Dialog/DialogFile/DialogPhoto"
  ```

## Task 8: Fix form composites + misc (Group G + remaining)

- `src/components/Form/Form/index.tsx`
- `src/components/Form/FormDialog/index.tsx`
- `src/components/Form/MessageError/index.tsx`
- `src/components/Button/index.tsx`
- `src/components/SplitButton/index.tsx`
- `src/components/BoxElement/index.tsx`
- `src/components/ShowFile/index.tsx`
- `src/components/Signature/*/index.tsx` (any of: ColorPalette, DialogSignature, DrawSignature, UploadSignature, WriteSignature)
- `src/components/CropImage/index.tsx`
- `src/components/Dropzone/index.tsx`

Skip any file not listed in `docs/v3-phase3b-fix-list.md`.

- [ ] **Steps 1–5: Same.**
  ```bash
  git commit -m "fix(v3): PR10 PassThrough for form composites + misc components"
  ```

## Task 9: Wire PrimeReact 10 theme into `KemisProvider`

PrimeReact 10 uses CSS-variable theming. Adopt `lara-light-blue` by default (configurable later).

**Files:**
- Modify: `src/components/KemisProvider/index.tsx`
- Modify: `src/styles/index.css`
- (Verify) `src/components/KemisProvider/types.ts`

- [ ] **Step 1: Add a `theme` prop to `KemisProviderProps`**

```ts
// src/components/KemisProvider/types.ts
import type { ReactNode } from "react";

export type KemisProviderProps = {
  children: ReactNode;
  locale?: string;
  /** PrimeReact 10 theme name (CSS file under primereact/resources/themes/<name>/theme.css). Defaults to "lara-light-blue". */
  theme?: string;
};
```

- [ ] **Step 2: Import the default theme CSS in `src/styles/index.css`**

Append:
```css
@import "primereact/resources/themes/lara-light-blue/theme.css";
@import "primeicons/primeicons.css";
```

(These are static imports — the `theme` prop is informational for now; future versions can switch dynamically.)

- [ ] **Step 3: Pass-through the `theme` prop in KemisProvider** (no runtime swap yet — see TODO comment below)

```tsx
// In KemisProvider/index.tsx, accept the prop and store it in context.
// The dynamic theme swap is a v3.x follow-up; v3.0.0 ships the lara-light-blue
// CSS pre-bundled via src/styles/index.css.
```

- [ ] **Step 4: Verify build**

```bash
npm run build 2>&1 | tail -5
```

The `dist/styles/base.css` should now contain PrimeReact's lara-light-blue rules (`--p-primary-color`, `.p-button`, etc.). Smoke-check with Read.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(v3): adopt PrimeReact 10 lara-light-blue theme via KemisProvider"
```

## Task 10: Rewrite `EditorHtml` on Tiptap (replace Quill)

The single largest functional rewrite in Phase 3b.

**Files:**
- Modify: `src/components/Form/EditorHtml/index.tsx`
- Modify: `tsup.config.ts` (remove `quill` from `external`, add `@tiptap/*`)
- Modify: `package.json` (install Tiptap, uninstall `quill`)

- [ ] **Step 1: Install Tiptap**

```bash
npm install --save @tiptap/react@latest @tiptap/starter-kit@latest @tiptap/pm@latest --legacy-peer-deps
```

- [ ] **Step 2: Read current `EditorHtml/index.tsx` and inventory:**
  - Public props (value, onChange, placeholder, etc.)
  - Initial value handling
  - Toolbar surface
  - Any imperative refs

- [ ] **Step 3: Rewrite using Tiptap**

```tsx
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { cn } from "../../../utils";

type EditorHtmlProps = {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
};

export default function EditorHtml({
  value = "",
  onChange,
  placeholder,
  className,
  readOnly = false,
}: EditorHtmlProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editable: !readOnly,
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "min-h-[120px] rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring",
          className
        ),
        placeholder: placeholder ?? "",
      },
    },
  });

  // Keep the editor in sync if the parent updates `value` externally
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  return <EditorContent editor={editor} />;
}
```

**Match the public surface** of the original. If the original had a custom toolbar with bold/italic/list/link buttons, port them using Tiptap's command API. If the original surface differs from this template, prioritize keeping the old prop names + callbacks over the template above.

- [ ] **Step 4: Update `tsup.config.ts` external list**

Replace `"quill"` with `"@tiptap/react"`, `"@tiptap/starter-kit"`, `"@tiptap/pm"`.

- [ ] **Step 5: Uninstall quill**

```bash
npm uninstall quill --legacy-peer-deps
```

- [ ] **Step 6: Typecheck + build + lint**

```bash
npx tsc --noEmit && npm run build && npm run lint
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "refactor(v3): rewrite EditorHtml on Tiptap (replaces Quill)"
```

## Task 11: Final verification, MIGRATION update, delete fix list, push

**Files:**
- Modify: `MIGRATION.md`
- Delete: `docs/v3-phase3b-fix-list.md`

- [ ] **Step 1: Run full local CI**

```bash
npm run lint
npx tsc --noEmit
npm run test:run
npm run build
npm pack --dry-run 2>&1 | tail -5
```

All five must exit 0. If typecheck has ANY remaining errors, STOP and report — we need to fix them before pushing.

- [ ] **Step 2: Delete the transient fix list**

```bash
git rm docs/v3-phase3b-fix-list.md
```

- [ ] **Step 3: Append Phase 3b section to `MIGRATION.md`**

```markdown

## Phase 3b — React 19 + PrimeReact 10 + Tiptap

**Breaking changes:**

1. **React 19 is now the peer dependency.** Consumers on React 18 must upgrade (or pin to `kemis-library@^2`).
2. **PrimeReact 10 is now bundled.** Components that wrap PrimeReact (most of them) now use the PassThrough (`pt`) API internally. Public component APIs are unchanged where possible; some prop renames may have leaked through (see file-by-file diffs in the commits under `fix(v3): PR10 PassThrough ...`).
3. **`EditorHtml` is Tiptap-based.** The public prop surface (`value`, `onChange`, `placeholder`, `readOnly`) is preserved. Custom Quill-era toolbars or extensions need re-implementation as Tiptap extensions — file an issue if you relied on something specific.
4. **PrimeReact 10 theme**: the library ships `lara-light-blue` by default. The `theme` prop on `<KemisProvider>` exists but is informational in v3.0.0 (full runtime switching is a v3.x follow-up).
5. **`quill` is no longer a dependency** — removed alongside the EditorHtml rewrite.

**Internal notes:**
- All component fixes were grouped by family (leaf inputs, selects, dates, files, dialogs, composites) and committed separately — see `git log --grep="fix(v3): PR10"` for the per-group diff.
```

- [ ] **Step 4: Commit + push**

```bash
git add -A
git commit -m "docs(v3): document Phase 3b + delete fix list; close Phase 3b"
git push origin v3
```

## Definition of Done — Phase 3b

- [ ] `react`, `react-dom` peer deps pinned to `^19`.
- [ ] `primereact@^10` in dependencies.
- [ ] `quill` absent from package.json.
- [ ] `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/pm` in dependencies.
- [ ] `npx tsc --noEmit` exits 0 — zero typecheck errors.
- [ ] `npm run lint` exits 0 (warnings allowed, but no new errors introduced).
- [ ] `npm run build` exits 0; `dist/` contains updated ESM/CJS/d.ts.
- [ ] `dist/styles/base.css` includes PrimeReact 10 lara-light-blue rules.
- [ ] `npm pack --dry-run` still ships only `dist/**`, `package.json`, `README.md`, `MIGRATION.md`.
- [ ] `docs/v3-phase3b-fix-list.md` removed.
- [ ] `MIGRATION.md` has a Phase 3b section.
- [ ] `v3` pushed to `origin`.
