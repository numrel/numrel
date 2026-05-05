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

// Locales
export { enUS } from './locales/en-US';

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
