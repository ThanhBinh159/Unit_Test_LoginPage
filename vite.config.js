import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // You can add global variables or mixins here if needed
        // For example:
        // additionalData: `@import "@/styles/variables.scss";`
      },
    },
  },
});
