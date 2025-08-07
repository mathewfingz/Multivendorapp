import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    coverage: {
      reporter: ['text', 'html'],
    },
  },
  esbuild: {
    jsx: 'automatic',
  },
  resolve: {
    alias: {
      '@/src': resolve(__dirname, 'src'),
      '@/app': resolve(__dirname, 'app'),
    },
  },
});

