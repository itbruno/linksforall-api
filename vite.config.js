import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'prisma': path.resolve(__dirname, './prisma')
    }
  },
  test: {
    coverage: {
      reporter: ['text', 'json-summary', 'json'],
      reportOnFailure: true,
      exclude: [
        'prisma/generated/**',
        '**/prisma/generated/**',
        '**/node_modules/**',
      ],
    }
  }
});
