// ─────────────────────────────────────────
// Main Entry Point
// ─────────────────────────────────────────

// Default instance - ready to use!
export { numrel, createNumrel } from './core/factory';

// Types - all exported for consumers
export type {
  NumrelInput,
  NumrelInstance,
  NumrelConfig,
  NumrelFactory,
  NumrelPlugin,
  LocaleConfig,
  LocaleDelimiters,
  LocaleAbbreviations,
  LocaleCurrency,
  FormatToken,
} from './types';

// ─────────────────────────────────────────
// All Locales - tree shakeable!
// Users import only what they need
// ─────────────────────────────────────────

// Tier 1 - Most Used
export { enUS } from './locales/en-US';
export { enGB } from './locales/en-GB';
export { de } from './locales/de';
export { fr } from './locales/fr';
export { es } from './locales/es';
export { it } from './locales/it';
export { ptBR } from './locales/pt-BR';
export { enIN } from './locales/en-IN';

// Tier 2 - Asia Pacific
export { ja } from './locales/ja';
export { zhCN } from './locales/zh-CN';
export { ko } from './locales/ko';
export { hi } from './locales/hi';

// Tier 3 - Other Major
export { ru } from './locales/ru';
export { ar } from './locales/ar';
export { tr } from './locales/tr';
export { nl } from './locales/nl';
export { pl } from './locales/pl';
export { sv } from './locales/sv';

// Tier 4 - Extended
export { da } from './locales/da';
export { nb } from './locales/nb';
export { fi } from './locales/fi';
export { cs } from './locales/cs';
export { hu } from './locales/hu';
export { ro } from './locales/ro';
export { uk } from './locales/uk';
export { ptPT } from './locales/pt-PT';

// Individual format functions (tree-shakeable!)
export {
  formatNumber,
  formatCurrency,
  formatPercentage,
  formatBytes,
  formatTime,
  formatOrdinal,
  formatAbbreviation,
} from './formats';
