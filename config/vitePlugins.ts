import fs from "fs";
import path from "path";

export function swEnvPlugin() {
  return {
    name: "sw-env",
    transform(code: string, id: string) {
      if (id.endsWith("/firebase-messaging-service.js")) {
        // Replace process.env variables with their actual values
        return code.replace(
          new RegExp(`process.env.(\\w+)`, "g"),
          (_, varName) => `"${process.env[varName]}"`
        );
      }
      return null;
    },
  };
}

export function excludeMsw() {
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
