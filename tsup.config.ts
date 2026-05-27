import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    components: "src/components/index.ts",
    utils: "src/utils/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  target: "es2020",
  external: [
    "react",
    "react-dom",
    "primereact",
    "next",
    "react-icons",
    "react-international-phone",
    "react-image-crop",
    "quill",
    "styled-components",
    "tailwindcss",
    "tailwind-merge",
    "zod",
    "@hookform/resolvers",
  ],
});
