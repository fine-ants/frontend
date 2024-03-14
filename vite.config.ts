import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { excludeMsw, swEnvPlugin } from "./config/vitePlugins";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), swEnvPlugin(), excludeMsw()],
  build: {
    target: "es2022",
  },
});
