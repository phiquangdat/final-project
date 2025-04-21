import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["**/*.{test,spec}.{js,ts,jsx,tsx}"],
    setupFiles: "./src/setupTests.js", // Use a proper setup file
  },
});
