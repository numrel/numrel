import { defineConfig } from 'tsup';

export default defineConfig({
  // ✅ Multiple entry points for tree shaking!
  entry: {
    index: 'src/index.ts',
    // Each locale as separate entry
    'locales/en-US': 'src/locales/en-US.ts',
    'locales/en-GB': 'src/locales/en-GB.ts',
    'locales/de': 'src/locales/de.ts',
    'locales/fr': 'src/locales/fr.ts',
    'locales/es': 'src/locales/es.ts',
    'locales/it': 'src/locales/it.ts',
    'locales/pt-BR': 'src/locales/pt-BR.ts',
    'locales/en-IN': 'src/locales/en-IN.ts',
    'locales/ja': 'src/locales/ja.ts',
    'locales/zh-CN': 'src/locales/zh-CN.ts',
    'locales/ko': 'src/locales/ko.ts',
    'locales/hi': 'src/locales/hi.ts',
    'locales/ru': 'src/locales/ru.ts',
    'locales/ar': 'src/locales/ar.ts',
    'locales/tr': 'src/locales/tr.ts',
    'locales/nl': 'src/locales/nl.ts',
    'locales/pl': 'src/locales/pl.ts',
    'locales/sv': 'src/locales/sv.ts',
    'locales/da': 'src/locales/da.ts',
    'locales/nb': 'src/locales/nb.ts',
    'locales/fi': 'src/locales/fi.ts',
    'locales/cs': 'src/locales/cs.ts',
    'locales/hu': 'src/locales/hu.ts',
    'locales/ro': 'src/locales/ro.ts',
    'locales/uk': 'src/locales/uk.ts',
    'locales/pt-PT': 'src/locales/pt-PT.ts',
  },
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
      js: format === 'esm' ? '.mjs' : '.cjs',
    };
  },
});
