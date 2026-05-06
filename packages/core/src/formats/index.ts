import { formatNumber } from './number';
import { formatCurrency } from './currency';
import { formatPercentage } from './percentage';
import { formatBytes } from './bytes';
import { formatTime } from './time';
import { formatOrdinal } from './ordinal';
import { formatAbbreviation } from './abbreviation';

import type { NumrelConfig, LocaleConfig } from '../types';

/**
 * The `format` function in TypeScript handles formatting of numbers based on different format strings
 * such as time, percentage, bytes, currency, ordinal, abbreviation, exponential, and default number
 * formatting.
 * @param {number} value - The `value` parameter in the `format` function represents the number that
 * you want to format according to the specified format string. This is the numerical value that you
 * want to convert into a formatted string based on the rules defined in the function.
 * @param {string} formatString - The `formatString` parameter is a string that specifies how the
 * `value` should be formatted. It can contain special characters or placeholders that define the
 * format of the output value. The function `format` checks the `formatString` to determine the type of
 * formatting to apply to the `value`.
 * @param {NumrelConfig} config - The `config` parameter in the `format` function is of type
 * `NumrelConfig`. It is used to provide additional configuration options for formatting the number
 * value. You can define properties and methods within the `NumrelConfig` interface to customize the
 * formatting behavior based on your requirements.
 * @param {LocaleConfig} locale - The `locale` parameter in the `format` function is used to specify
 * the locale configuration for formatting the number. It contains information such as the decimal
 * separator, grouping separator, currency symbol, and other locale-specific formatting rules. This
 * information is important for correctly formatting the number according to the conventions of the
 * @returns The `format` function returns a formatted string based on the provided `value`,
 * `formatString`, `config`, and `locale` parameters. The function checks the `formatString` for
 * specific formatting patterns such as time format, percentage, bytes, currency, ordinal,
 * abbreviation, exponential, and default number formatting, and then delegates the formatting to
 * corresponding helper functions (`formatTime`, `formatPercentage`,
 */
export const format = (
  value: number,
  formatString: string,
  config: NumrelConfig,
  locale: LocaleConfig,
): string => {
  // Time format → 00:00:00
  if (formatString === 'duration' || formatString.includes(':')) {
    return formatTime(value, formatString);
  }

  // Percentage → 0%
  if (formatString.includes('%')) {
    return formatPercentage(value, formatString, config, locale);
  }

  // Bytes → 0b, 0kb, 0mb
  if (/[kmgt]?i?b$/i.test(formatString) && !formatString.includes('$')) {
    return formatBytes(value, formatString, locale);
  }

  // Currency → $0,0.00
  if (
    formatString.includes('$') ||
    formatString.includes(locale.currency.symbol)
  ) {
    return formatCurrency(value, formatString, locale);
  }

  // Ordinal → 0o
  if (formatString.endsWith('o') || formatString.endsWith('0o')) {
    return formatOrdinal(value, formatString, locale);
  }

  // Abbreviation → 0a, 0.0a
  if (formatString.includes('a')) {
    return formatAbbreviation(value, formatString, locale);
  }

  // ✅ FIX: Exponential → 0e+0, 0.00e+0
  if (formatString.toLowerCase().includes('e')) {
    return formatExponential(value, formatString);
  }

  // Default → number formatting
  return formatNumber(value, formatString, locale);
};

// ─────────────────────────────────────────
// Exponential Format Helper
// Handles: 0e+0, 0.00e+0
// ─────────────────────────────────────────

const formatExponential = (value: number, formatString: string): string => {
  // ✅ Extract decimal places correctly
  // '0.00e+0' → split by 'e' → ['0.00', '+0']
  // then split by '.' → decimal part is '00' → length 2
  const beforeE = formatString.toLowerCase().split('e')[0] ?? '0';
  const decimalPart = beforeE.split('.')[1] ?? '';

  // Count only digit characters for decimal places
  const decimalPlaces = decimalPart.replace(/[^0]/g, '').length;

  // Use toExponential with correct decimal places
  const result = value.toExponential(decimalPlaces);

  return result;
};

export { formatNumber } from './number';
export { formatCurrency } from './currency';
export { formatPercentage } from './percentage';
export { formatBytes } from './bytes';
export { formatTime } from './time';
export { formatOrdinal } from './ordinal';
export { formatAbbreviation } from './abbreviation';
