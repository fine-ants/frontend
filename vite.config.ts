import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr(), excludeMsw()],
  build: {
    target: "es2022",
  },
});

function excludeMsw() {
  return {
    name: "exclude-msw",
    resolveId(source: string) {
      return source === "virtual-module" ? source : null;
    },
    renderStart(outputOptions: { dir: string }) {
      const outDir = outputOptions.dir;
      const msWorker = path.resolve(outDir, "mockServiceWorker.js");
      fs.rm(msWorker, () => {});
    },
  };
}
