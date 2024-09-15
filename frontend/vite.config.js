// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensure this is set correctly for NW.js
  build: {
    outDir: 'dist', // Output directory for your build
  },
});
