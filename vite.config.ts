import { fileURLToPath, URL } from 'url';

import { defineConfig, mergeConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    reactivityTransform: true
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    snapshotFormat: {
      escapeString: false
    },
    coverage: {
      clean: true
    }
  }
});
