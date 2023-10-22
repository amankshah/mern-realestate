import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
