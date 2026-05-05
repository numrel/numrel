// packages/core/tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: true,
  outDir: 'dist',
  outExtension({ format }) {
    return {
      // ✅ explicitly define extensions
      js: format === 'esm' ? '.mjs' : '.cjs',
    };
  },
});
