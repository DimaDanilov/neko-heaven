import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      public: "/public",
      src: "/src",
      api: "/src/api",
      assets: "/src/assets",
      components: "/src/components",
      store: "/src/store",
      types: "/src/types",
    },
  },
});
