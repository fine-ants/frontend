import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr(), swEnvPlugin(), excludeMsw()],
  build: {
    target: "es2022",
  },
});

function swEnvPlugin() {
  return {
    name: "sw-env",
    transform(code: string, id: string) {
      if (id.endsWith("/firebase-messaging-service.js")) {
        // Replace process.env variables with their actual values
        return code.replace(
          new RegExp(`process.env.(\\w+)`, "g"),
          (match, varName) => `"${process.env[varName]}"`
        );
      }
      return null;
    },
  };
}

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
