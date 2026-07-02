---
"kemis-library": patch
---

Ship signature fonts in the package. `dist/styles/components.css` references
`@font-face` files under `fonts/` but the TTFs were never copied into `dist`,
so any bundler (webpack/Turbopack) failed to resolve them (`Module not found:
Can't resolve 'fonts/.../*.ttf'`). The `build:css` step now copies
`src/styles/fonts` into `dist/styles/fonts`.
