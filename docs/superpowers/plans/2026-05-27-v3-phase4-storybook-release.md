# v3 Phase 4 — Storybook 8 + RC Release Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Storybook 8 with stories for the top 10 components, then publish a `3.0.0-rc.1` pre-release to npm and open a PR from `v3` → `master`.

**Architecture:** Storybook 8 with `@storybook/react-vite` builder sits alongside the tsup library build — no build system conflict. Vite picks up our existing `postcss.config.js` automatically so Tailwind 4 works unchanged. Stories live in `src/stories/`. After stories land, Changesets pre-release mode produces `3.0.0-rc.1`, then a PR targets `master` for the final `3.0.0` GitHub Actions release.

**Tech Stack:** Storybook 8, `@storybook/react-vite`, `@storybook/addon-essentials`, react-hook-form (for form component stories), Changesets pre-release mode, GitHub CLI (`gh`).

**Branch:** All work on `v3`. Current state: clean, synced to `origin/v3` at commit `fd3b37d`.

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `.storybook/main.ts` | Create | Storybook config: framework, stories glob, addons |
| `.storybook/preview.tsx` | Create | Global decorator wrapping every story in `<KemisProvider>` + CSS import |
| `src/stories/KemisProvider.stories.tsx` | Create | KemisProvider default story |
| `src/stories/Button.stories.tsx` | Create | Button stories (primary variant) |
| `src/stories/Dialog.stories.tsx` | Create | Dialog open/close story |
| `src/stories/InputText.stories.tsx` | Create | InputText controlled story |
| `src/stories/Dropdown.stories.tsx` | Create | Dropdown with options |
| `src/stories/InputDate.stories.tsx` | Create | InputDate date picker |
| `src/stories/MultiSelect.stories.tsx` | Create | MultiSelect with options |
| `src/stories/EditorHtml.stories.tsx` | Create | EditorHtml rich text editor |
| `package.json` | Modify | Add `storybook` and `build-storybook` scripts |

---

### Task 1: Install Storybook 8 and configure base files

**Context:** We need Storybook 8 with Vite builder. Do NOT run `npx storybook init` (it rewrites package.json and installs unwanted addons). Install manually.

The library CSS lives at `src/styles/index.css` (`@import "tailwindcss"` + PrimeReact theme + primeicons). Our `postcss.config.js` already has `@tailwindcss/postcss` — Vite picks this up automatically, so no `viteFinal` config is needed.

**Files:**
- Modify: `package.json` (scripts block)
- Create: `.storybook/main.ts`
- Create: `.storybook/preview.tsx`

- [ ] **Step 1: Install Storybook packages**

```bash
npm install --save-dev \
  @storybook/react-vite@^8 \
  @storybook/addon-essentials@^8 \
  @storybook/blocks@^8 \
  storybook@^8 \
  vite@^5 \
  @vitejs/plugin-react@^4 \
  --legacy-peer-deps
```

Expected: packages install without errors. `package.json` devDependencies now includes `storybook`, `@storybook/react-vite`, etc.

- [ ] **Step 2: Add storybook scripts to package.json**

In `package.json`, add to the `scripts` block (after `"release"`):

```json
"storybook": "storybook dev -p 6006",
"build-storybook": "storybook build"
```

- [ ] **Step 3: Create `.storybook/main.ts`**

```typescript
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};

export default config;
```

- [ ] **Step 4: Create `.storybook/preview.tsx`**

```tsx
import type { Preview } from "@storybook/react";
import React from "react";
import { KemisProvider } from "../src/components/KemisProvider";
import "../src/styles/index.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <KemisProvider>
        <div className="p-4">
          <Story />
        </div>
      </KemisProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

- [ ] **Step 5: Verify Storybook starts**

```bash
npm run storybook -- --ci &
sleep 10 && curl -s http://localhost:6006 | grep -q "storybook" && echo "OK" || echo "FAIL"
kill %1
```

Expected: `OK`. If it fails, check console for errors — most likely a missing peer dep or vite version conflict.

- [ ] **Step 6: Commit**

```bash
git add .storybook/ package.json package-lock.json
git commit -m "chore(storybook): install Storybook 8 with react-vite builder"
```

---

### Task 2: Stories for KemisProvider, Button, and Dialog

**Context:** These three components have simple props. `Button` at `src/components/Button/index.tsx` is a plain button with `text` and `type` props. `Dialog` at `src/components/Dialog/index.tsx` wraps PrimeReact Dialog with `header, visible, onHide, className, children`. `KemisProvider` is the root wrapper — its story shows that Toast + ConfirmDialog render without errors.

For stories that need state (Dialog visible/hidden), use `useState` inside a render function.

All stories use `react-hook-form` only when needed. Button and Dialog do not need it.

**Files:**
- Create: `src/stories/KemisProvider.stories.tsx`
- Create: `src/stories/Button.stories.tsx`
- Create: `src/stories/Dialog.stories.tsx`

- [ ] **Step 1: Create `src/stories/KemisProvider.stories.tsx`**

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { KemisProvider } from "../components/KemisProvider";

const meta: Meta<typeof KemisProvider> = {
  title: "Core/KemisProvider",
  component: KemisProvider,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof KemisProvider>;

export const Default: Story = {
  render: () => (
    <KemisProvider>
      <p className="text-gray-700">KemisProvider is active. Toast and ConfirmDialog are mounted.</p>
    </KemisProvider>
  ),
};
```

- [ ] **Step 2: Create `src/stories/Button.stories.tsx`**

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Button from "../components/Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: { layout: "centered" },
  args: {
    text: "Salvar",
    type: "button",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Submit: Story = {
  args: {
    text: "Enviar",
    type: "submit",
  },
};
```

- [ ] **Step 3: Create `src/stories/Dialog.stories.tsx`**

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import Dialog from "../components/Dialog";
import Button from "../components/Button";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button type="button" text="Abrir Dialog" onClick={() => setVisible(true)} />
        <Dialog
          header="Exemplo de Dialog"
          visible={visible}
          className="w-[500px]"
          onHide={() => setVisible(false)}
        >
          <p>Conteúdo do dialog.</p>
        </Dialog>
      </>
    );
  },
};
```

**Note:** `Button` at `src/components/Button/index.tsx` renders a `<button>` element but its interface `IButtonProps` doesn't declare an `onClick` prop. Add it to the interface before writing the story:

In `src/components/Button/index.tsx`, change:
```typescript
interface IButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  text: string;
}
```
to:
```typescript
interface IButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
```

And in the `<button>` element add `onClick={onClick}` and destructure `onClick` from props.

- [ ] **Step 4: Verify stories load in browser**

```bash
npm run storybook -- --ci &
sleep 10
curl -s http://localhost:6006/index.json | grep -q "KemisProvider" && echo "OK" || echo "FAIL"
kill %1
```

- [ ] **Step 5: Commit**

```bash
git add src/stories/ src/components/Button/index.tsx
git commit -m "feat(storybook): add KemisProvider, Button, Dialog stories"
```

---

### Task 3: Form field stories — InputText, Dropdown, InputDate, MultiSelect

**Context:** These components all use `react-hook-form` via `UseFormReturn<T>`. Stories must create a form with `useForm()` and pass it to each component. Each story is a render function that calls `useForm` at the top.

- `InputText` at `src/components/Form/InputText/index.tsx` — props: `name, label, form, rules?, type?, disabled?, placeholder?, className?, child?`
- `Dropdown` at `src/components/Form/Dropdown/index.tsx` — props: `name, label, form, options, optionLabel?, optionValue?, rules?, disabled?, filter?`
- `InputDate` at `src/components/Form/InputDate/index.tsx` — props: `name, label, form, rules?, disabled?, view?, showTime?, dateFormat?`
- `MultiSelect` at `src/components/Form/MultiSelect/index.tsx` — props: `name, label, form, options, optionLabel?, optionValue?, rules?, disabled?`

**Files:**
- Create: `src/stories/InputText.stories.tsx`
- Create: `src/stories/Dropdown.stories.tsx`
- Create: `src/stories/InputDate.stories.tsx`
- Create: `src/stories/MultiSelect.stories.tsx`

- [ ] **Step 1: Create `src/stories/InputText.stories.tsx`**

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useForm } from "react-hook-form";
import InputText from "../components/Form/InputText";

const meta: Meta = {
  title: "Form/InputText",
  parameters: { layout: "padded" },
};

export default meta;

type FormValues = { nome: string };

export const Default: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({ defaultValues: { nome: "" } });
    return (
      <InputText<FormValues>
        name="nome"
        label="Nome"
        form={form}
        placeholder="Digite seu nome"
      />
    );
  },
};

export const Required: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({ defaultValues: { nome: "" } });
    return (
      <InputText<FormValues>
        name="nome"
        label="Nome"
        form={form}
        rules={{ required: "Nome é obrigatório" }}
        placeholder="Campo obrigatório"
      />
    );
  },
};

export const Disabled: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({ defaultValues: { nome: "Valor fixo" } });
    return (
      <InputText<FormValues>
        name="nome"
        label="Nome (desabilitado)"
        form={form}
        disabled
      />
    );
  },
};
```

- [ ] **Step 2: Create `src/stories/Dropdown.stories.tsx`**

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useForm } from "react-hook-form";
import Dropdown from "../components/Form/Dropdown";

const meta: Meta = {
  title: "Form/Dropdown",
  parameters: { layout: "padded" },
};

export default meta;

type FormValues = { status: string };

const OPTIONS = [
  { label: "Ativo", value: "ativo" },
  { label: "Inativo", value: "inativo" },
  { label: "Pendente", value: "pendente" },
];

export const Default: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({ defaultValues: { status: "" } });
    return (
      <Dropdown<FormValues>
        name="status"
        label="Status"
        form={form}
        options={OPTIONS}
      />
    );
  },
};

export const Required: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({ defaultValues: { status: "" } });
    return (
      <Dropdown<FormValues>
        name="status"
        label="Status"
        form={form}
        options={OPTIONS}
        rules={{ required: "Selecione um status" }}
      />
    );
  },
};
```

- [ ] **Step 3: Create `src/stories/InputDate.stories.tsx`**

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useForm } from "react-hook-form";
import InputDate from "../components/Form/InputDate";

const meta: Meta = {
  title: "Form/InputDate",
  parameters: { layout: "padded" },
};

export default meta;

type FormValues = { data: Date | null };

export const Default: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({ defaultValues: { data: null } });
    return (
      <InputDate<FormValues>
        name="data"
        label="Data"
        form={form}
        dateFormat="dd/mm/yy"
      />
    );
  },
};

export const WithTime: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({ defaultValues: { data: null } });
    return (
      <InputDate<FormValues>
        name="data"
        label="Data e Hora"
        form={form}
        showTime
        hourFormat="24"
        dateFormat="dd/mm/yy"
      />
    );
  },
};

export const MonthView: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({ defaultValues: { data: null } });
    return (
      <InputDate<FormValues>
        name="data"
        label="Mês"
        form={form}
        view="month"
        dateFormat="mm/yy"
      />
    );
  },
};
```

- [ ] **Step 4: Create `src/stories/MultiSelect.stories.tsx`**

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useForm } from "react-hook-form";
import MultiSelect from "../components/Form/MultiSelect";

const meta: Meta = {
  title: "Form/MultiSelect",
  parameters: { layout: "padded" },
};

export default meta;

type FormValues = { tags: string[] };

const OPTIONS = [
  { label: "React", value: "react" },
  { label: "TypeScript", value: "typescript" },
  { label: "Node.js", value: "nodejs" },
  { label: "Python", value: "python" },
];

export const Default: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({ defaultValues: { tags: [] } });
    return (
      <MultiSelect<FormValues>
        name="tags"
        label="Tecnologias"
        form={form}
        options={OPTIONS}
      />
    );
  },
};

export const Required: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({ defaultValues: { tags: [] } });
    return (
      <MultiSelect<FormValues>
        name="tags"
        label="Tecnologias"
        form={form}
        options={OPTIONS}
        rules={{ required: "Selecione ao menos uma tecnologia" }}
      />
    );
  },
};
```

- [ ] **Step 5: Verify stories compile**

```bash
npm run build-storybook 2>&1 | tail -20
```

Expected: build completes with exit code 0, `storybook-static/` directory created.

- [ ] **Step 6: Commit**

```bash
git add src/stories/
git commit -m "feat(storybook): add InputText, Dropdown, InputDate, MultiSelect stories"
```

---

### Task 4: EditorHtml story

**Context:** `EditorHtml` at `src/components/Form/EditorHtml/index.tsx` was rewritten on Tiptap 3 in Phase 3b. Props: `name, label, form, rules?, autoFocus?, disabled?, className?`. The `headerTemplate` prop is deprecated and ignored. This component requires `react-hook-form`.

**Files:**
- Create: `src/stories/EditorHtml.stories.tsx`

- [ ] **Step 1: Create `src/stories/EditorHtml.stories.tsx`**

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useForm } from "react-hook-form";
import EditorHtml from "../components/Form/EditorHtml";

const meta: Meta = {
  title: "Form/EditorHtml",
  parameters: { layout: "padded" },
};

export default meta;

type FormValues = { conteudo: string };

export const Default: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({ defaultValues: { conteudo: "" } });
    return (
      <EditorHtml<FormValues>
        name="conteudo"
        label="Conteúdo"
        form={form}
      />
    );
  },
};

export const WithInitialContent: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({
      defaultValues: { conteudo: "<p>Conteúdo <strong>inicial</strong> do editor.</p>" },
    });
    return (
      <EditorHtml<FormValues>
        name="conteudo"
        label="Conteúdo"
        form={form}
      />
    );
  },
};

export const Disabled: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({
      defaultValues: { conteudo: "<p>Este editor está desabilitado.</p>" },
    });
    return (
      <EditorHtml<FormValues>
        name="conteudo"
        label="Conteúdo (desabilitado)"
        form={form}
        disabled
      />
    );
  },
};
```

- [ ] **Step 2: Run build-storybook to verify no compile errors**

```bash
npm run build-storybook 2>&1 | grep -E "(error|Error|FAIL|✓|done)" | tail -10
```

Expected: no `error` lines, build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/stories/EditorHtml.stories.tsx
git commit -m "feat(storybook): add EditorHtml story (Tiptap 3)"
```

---

### Task 5: Changeset RC publish + create PR v3 → master

**Context:** There is already one changeset at `.changeset/*.md` with `"kemis-library": major` (added in Phase 1). Running `changeset version` will bump to `3.0.0`. We publish an RC first using Changesets pre-release mode, then create the PR for final release.

Pre-release mode flow:
1. `changeset pre enter rc` — creates `.changeset/pre.json`, tags future versions as `rc`
2. `changeset version` — bumps `package.json` to `3.0.0-rc.1` and updates `CHANGELOG.md`
3. Build + publish to npm with `--tag next`
4. Commit the version bump
5. Create PR `v3` → `master` via `gh pr create`

The GitHub Actions `release.yml` fires on merge to `master` and will call `changeset publish` for `3.0.0`. So DO NOT exit pre-release mode here — leave `.changeset/pre.json` intact. The Changesets action on master merge handles the final release.

**Files:**
- Modify: `package.json` (version bumped automatically)
- Modify: `CHANGELOG.md` (generated automatically)
- Create: `.changeset/pre.json` (generated by `changeset pre enter rc`)

- [ ] **Step 1: Enter Changesets pre-release mode**

```bash
npx changeset pre enter rc
```

Expected output: `Entered pre mode with tag rc`
A file `.changeset/pre.json` is created.

- [ ] **Step 2: Run changeset version**

```bash
npx changeset version
```

Expected: `package.json` version changes to `3.0.0-rc.1`, `CHANGELOG.md` is updated, the changeset markdown file is consumed (deleted).

Verify:
```bash
node -e "console.log(require('./package.json').version)"
```

Expected output: `3.0.0-rc.1`

- [ ] **Step 3: Build the library**

```bash
npm run build
```

Expected: `dist/` populated with `.js`, `.mjs`, `.d.ts`, `.css` files. Exit code 0.

- [ ] **Step 4: Publish RC to npm**

```bash
npx changeset publish --tag next
```

Expected: publishes `kemis-library@3.0.0-rc.1` to npm with tag `next`.

If this fails with auth error, the user must run `npm login` first (interactive). In that case, stop and report BLOCKED.

- [ ] **Step 5: Commit the version bump**

```bash
git add package.json CHANGELOG.md .changeset/
git commit -m "chore(release): kemis-library@3.0.0-rc.1 pre-release"
```

- [ ] **Step 6: Push v3 to origin**

```bash
git push origin v3
```

- [ ] **Step 7: Create PR v3 → master**

```bash
gh pr create \
  --title "feat: v3.0.0 — React 19 + PrimeReact 10 + Tailwind 4 + Tiptap + Storybook" \
  --base master \
  --head v3 \
  --body "$(cat <<'EOF'
## Summary

- **React 19** + **PrimeReact 10** + **Tailwind 4** (CSS-first) + **Tiptap 3** (replaces Quill)
- New `<KemisProvider>` root wrapper (mounts global Toast + ConfirmDialog)
- tsup build (ESM + CJS + d.ts), Vitest 4, ESLint 9 flat config, Prettier 3, Husky, Changesets
- All dead dependencies removed (quill, sweetalert2, styled-components, webfontloader, file-saver, react-cropper, date-fns, axios-mock-adapter, react-router-dom, yup, next)
- Storybook 8 stories for top components
- See MIGRATION.md for breaking changes and consumer upgrade guide

## Test plan

- [ ] Run `npm run build` — must exit 0
- [ ] Run `npm run test:run` — must exit 0
- [ ] Run `npm run lint` — must exit 0
- [ ] Run `npm run storybook` — browse all stories in browser
- [ ] Install `kemis-library@next` in a consumer project, wrap app with `<KemisProvider>`, verify components render

## RC

`kemis-library@3.0.0-rc.1` is published under the `next` tag:
```
npm install kemis-library@next
```

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Expected: PR URL printed. Return the URL.

- [ ] **Step 8: Report completion**

Print the PR URL and confirm:
- `kemis-library@3.0.0-rc.1` published to npm (`npm install kemis-library@next` works)
- PR is open targeting `master`
- After PR is merged, GitHub Actions `release.yml` will auto-publish `3.0.0` (no manual step needed)
