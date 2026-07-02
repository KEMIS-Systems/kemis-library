// Builds import-map.json from the library barrels — the single source of truth
// for the deep-import -> barrel codemod. Run from the library repo root:
//   node tools/codemod/build-map.mjs
//
// The map tells the codemod, for every deep source path a consumer might have
// used (e.g. "kemis-library/utils/toast"), which barrel entry to import from
// and what the exported name is (which is NOT always the file basename:
// utils/toast -> Toast, models/IP -> IMIP).

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "..", "..", "src");

// Parse `export { default as Name } from "./path";`  and
//       `export { Name1, Name2 } from "./path";`
// Returns [{ path, name, wasDefault }]
function parseBarrel(file) {
  const text = readFileSync(file, "utf8");
  const out = [];
  const re = /export\s+(type\s+)?\{([^}]*)\}\s+from\s+["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(text))) {
    const isType = Boolean(m[1]);
    const specifiers = m[2];
    const from = m[3].replace(/^\.\//, ""); // "./Form/FormDialog" -> "Form/FormDialog"
    for (const raw of specifiers.split(",")) {
      const spec = raw.trim();
      if (!spec) continue;
      // "default as Name" | "Name" | "Orig as Name"
      const asMatch = spec.match(/^(.+?)\s+as\s+(.+)$/);
      if (asMatch) {
        const orig = asMatch[1].trim();
        const name = asMatch[2].trim();
        out.push({ path: from, name, wasDefault: orig === "default", isType });
      } else {
        out.push({ path: from, name: spec, wasDefault: false, isType });
      }
    }
  }
  return out;
}

const map = {}; // deepSpecifier -> { entry, name, wasDefault, isType }

function add(deepPath, entry, name, wasDefault, isType) {
  map[`kemis-library/${deepPath}`] = { entry, name, wasDefault, isType };
}

// components barrel: every entry is importable via kemis-library/components/<path>
for (const e of parseBarrel(join(SRC, "components", "index.ts"))) {
  add(`components/${e.path}`, "kemis-library/components", e.name, e.wasDefault, e.isType);
}
// utils barrel
for (const e of parseBarrel(join(SRC, "utils", "index.ts"))) {
  add(`utils/${e.path}`, "kemis-library/utils", e.name, e.wasDefault, e.isType);
}
// root index: model type re-exports (export type { default as IMIP } from "./models/IP")
for (const e of parseBarrel(join(SRC, "index.ts"))) {
  add(e.path, "kemis-library", e.name, e.wasDefault, e.isType);
}

// hooks/form is re-exported via `export * from "./hooks/form"` in index.ts (star,
// not a named export line), so add its public members explicitly -> root barrel.
add("hooks/form", "kemis-library", "useFormIntegration", false, false);

const outFile = join(__dirname, "import-map.json");
writeFileSync(outFile, JSON.stringify(map, null, 2) + "\n");
console.log(`Wrote ${Object.keys(map).length} mappings to ${outFile}`);
