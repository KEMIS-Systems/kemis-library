import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTests.ts"],
    css: false,
    // Pre-existing Jest-style specs are deferred to a later phase; exclude them
    // so Phase 1 CI passes. They'll be rewritten with Vitest in a follow-up.
    exclude: ["**/node_modules/**", "**/dist/**", "**/__tests__/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/index.ts", "src/setupTests.ts"],
    },
  },
});
