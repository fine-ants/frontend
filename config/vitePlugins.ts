import "dotenv/config";
import fs from "fs";
import path from "path";

export function excludeMsw() {
  return {
    name: "rollup-plugin-exclude-msw",
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

export function fcmSwEnvPlugin() {
  return {
    name: "rollup-plugin-fcm-sw-env",
    transform(code: string, id: string) {
      if (id.endsWith("firebase-messaging-sw.js")) {
        // Replace import.meta.env variables with their actual values
        const transformedCode = code.replace(
          new RegExp(`import.meta.env.(\\w+)`, "g"),
          (_, varName) => `"${process.env[varName]}"`
        );

        const finalCode =
          "// IMPORTANT: This file only exists for dev mode purposes. Do not modify this file. Any changes should be made in `src/firebase-messaging-sw.js`.\n\n" +
          transformedCode;

        const outputPath = path.resolve("public", "./firebase-messaging-sw.js");

        fs.writeFileSync(outputPath, finalCode);

        return null;
      }
      return null;
    },
  };
}
