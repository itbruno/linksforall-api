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
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'UNIT',
          dir: 'src/use-cases',
        },
      },
      {
        extends: true,
        test: {
          name: 'E2E',
          dir: 'src/http',
          fileParallelism: false,
          pool: 'forks'
        },
      },
    ]
  }
});
