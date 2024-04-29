import { defineConfig } from "vite"
import { resolve } from "path";
export default defineConfig({
  base: '/minesweeper/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        settings: resolve(__dirname, "settings.html"),
      },
    },
  },
});