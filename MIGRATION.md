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
