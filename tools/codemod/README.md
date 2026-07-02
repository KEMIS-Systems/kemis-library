# kemis-library codemod: deep imports → barrel imports

Migrates a consumer project from v2-style deep imports to the v3 barrel API.

```ts
// before (v2)                                  // after (v3)
import Loading from "kemis-library/components/Loading";        import { Loading } from "kemis-library/components";
import { cpf } from "kemis-library/utils/cpf";                 import { cpf } from "kemis-library/utils";
import Toast from "kemis-library/utils/toast";                 import { Toast } from "kemis-library/utils";
import IMIP from "kemis-library/models/IP";                    import type { IMIP } from "kemis-library";
import { useFormIntegration } from "kemis-library/hooks/form"; import { useFormIntegration } from "kemis-library";
```

It handles the non-obvious cases automatically: default → named conversion,
export names that differ from the file name (`utils/toast` → `Toast`,
`models/IP` → `IMIP`), aliased imports, model interfaces as `import type`,
and merging into any barrel import the file already has. CSS imports
(`kemis-library/styles/...`) are left untouched — they resolve as-is in v3.

## Usage

Run from the **consumer project** root (the app you are migrating):

```bash
npx jscodeshift@0.15.2 \
  -t path/to/kemis-library/tools/codemod/deep-to-barrel.cjs \
  --parser=tsx --extensions=ts,tsx \
  src/
```

Add `--dry --print` first to preview without writing. After it runs, format
with the project's own tooling (`eslint --fix` / prettier) to normalise import
order.

## The mapping

`import-map.json` is generated from the library barrels — the single source of
truth. If the library adds/renames exports, regenerate it:

```bash
node tools/codemod/build-map.mjs
```

Any deep path **not** in the map is left unchanged and a warning is printed, so
nothing is silently dropped. Namespace imports (`import * as X`) are also left
for manual review.

## Recommended: keep bundle/compile fast on Next.js

After migrating, enable barrel-import optimisation so importing from
`kemis-library/components` keeps the per-file compile speed of deep imports:

```js
// next.config.js  (Next ≥ 13.5)
module.exports = {
  experimental: { optimizePackageImports: ["kemis-library"] },
};
```

On older Next, use `modularizeImports` instead.
