import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";
import { excludeMsw, fcmSwEnvPlugin } from "./config/vitePlugins";

export default defineConfig(({ command }) => {
  const vitePwaBaseConfig: Partial<VitePWAOptions> = {
    filename: "pwa-sw.js",
    registerType: "autoUpdate",
    manifestFilename: "manifest.json",
    manifest: {
      name: "FineAnts",
      short_name: "FineAnts",
      description: "Your portfolio management platform",
      icons: [
        {
          src: "/icons/Icon_192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icons/Icon_512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      display: "standalone",
      scope: "/",
      start_url: "/",
      theme_color: "#21222a",
    },
  };

  if (command === "serve") {
    return {
      plugins: [
        react(),
        tsconfigPaths(),
        fcmSwEnvPlugin(),
        // VitePWA({
        //   ...vitePwaBaseConfig,
        //   devOptions: {
        //     enabled: true,
        //   },
        // }),
      ],
    };
  } else {
    // command === 'build'
    return {
      plugins: [
        react(),
        tsconfigPaths(),
        excludeMsw(),
        VitePWA(vitePwaBaseConfig),
      ],
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
                ? "[name].js" // put fcm service worker in root
                : "assets/[name]-[hash].js"; // others in `assets/`
            },
          },
        },
      },
    };
  }
});
