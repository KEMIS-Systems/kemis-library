---
"kemis-library": patch
---

Phase 4 — public API surface + compatibility fixes:

- Establish barrel imports as the public API (`kemis-library`, `kemis-library/components`, `kemis-library/utils`); internal deep paths are no longer exported. See MIGRATION.md.
- Restore `cpf` export in `kemis-library/utils` (accidentally dropped from the barrel).
- Export model interfaces as named types from the root: `import type { IMCnpj, IMIP } from "kemis-library"`.
- Widen `react`/`react-dom` peer range to `^18.2.0 || ^19.0.0` so consumers can migrate one project at a time.
- Accept the `.css` suffix on style entry points (`kemis-library/styles/components.css` and `.../base.css` now resolve).
