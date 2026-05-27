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
