import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { excludeMsw } from "./config/vitePlugins";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), excludeMsw()],
  build: {
    target: "es2022",
    rollupOptions: {
      input: {
        "main": "./index.html",
        "firebase-messaging-sw": "./src/firebase-messaging-sw.js",
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === "firebase-messaging-sw"
            ? "[name].js" // put service worker in root
            : "assets/[name]-[hash].js"; // others in `assets/`
        },
      },
    },
  },
});
