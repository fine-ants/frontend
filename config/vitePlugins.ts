import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const srcDir = path.resolve(__dirname, "../src");
  const fcmSwCode = fs.readFileSync(
    `${srcDir}/firebase-messaging-sw.js`,
    "utf8"
  );

  const transformedCode = fcmSwCode.replace(
    new RegExp(`import.meta.env.(\\w+)`, "g"),
    (_, varName) => `"${process.env[varName]}"`
  );
  const finalCode =
    "// IMPORTANT: This file only exists for dev mode purposes. Do not modify this file. Any changes should be made in `src/firebase-messaging-sw.js`.\n\n" +
    transformedCode;

  const outputPath = path.resolve("public", "./firebase-messaging-sw.js");
  fs.writeFileSync(outputPath, finalCode);

  return {
    name: "rollup-plugin-fcm-sw-env",
  };
}
