import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.tsx'],
    include: ['__tests__/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    exclude: [
      'node_modules',
      'e2e',
      // FlexSearch causes memory issues in test environment
      '__tests__/unit/hooks/useSearch.test.jsx',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '.next/',
        'e2e/',
        '**/*.config.*',
        '**/*.d.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
});
