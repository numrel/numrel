// packages/core/vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      // ─────────────────────────────────────────
      // What to include in coverage
      // ─────────────────────────────────────────
      include: ['src/**/*.ts'],
      // ─────────────────────────────────────────
      // Exclude test files and type files
      // ─────────────────────────────────────────
      exclude: ['src/__tests__/**', 'src/types/**', 'src/**/*.d.ts'],
      // ─────────────────────────────────────────
      // Coverage thresholds - our targets!
      // ─────────────────────────────────────────
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
