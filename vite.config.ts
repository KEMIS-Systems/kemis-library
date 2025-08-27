import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsPaths from "vite-tsconfig-paths"

export default defineConfig({
    root: "./web",
    plugins: [react(), tsPaths()],
    css: {
        modules: {
            localsConvention: "camelCase",            
        }
    }
})