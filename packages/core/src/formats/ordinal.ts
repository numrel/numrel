import { applyThousandsSeparator } from './number';

import type { LocaleConfig } from '../types';

// ─────────────────────────────────────────
// Ordinal Formatter
// Handles: 1st, 2nd, 3rd, 4th
// Locale aware!
// ─────────────────────────────────────────

/**
 * The `formatOrdinal` function formats a number with ordinal suffix based on the locale and format
 * string provided.
 * @param {number} value - The `value` parameter is the number that you want to format as an ordinal.
 * It represents the numeric value for which you want to generate the ordinal representation.
 * @param {string} formatString - The `formatString` parameter is a string that specifies the format in
 * which the ordinal value should be displayed. It may contain special characters or symbols to
 * indicate how the ordinal value should be formatted, such as commas for thousands separators.
 * @param {LocaleConfig} locale - The `locale` parameter in the `formatOrdinal` function is a
 * configuration object that contains information about the formatting rules specific to a particular
 * locale or region. It likely includes functions or data related to formatting numbers, dates, and
 * other locale-specific information.
 * @returns The `formatOrdinal` function returns a formatted string representing the input number value
 * with the ordinal suffix based on the locale configuration provided.
 */
export const formatOrdinal = (
  value: number,
  formatString: string,
  locale: LocaleConfig,
): string => {
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  // ─────────────────────────────────────────
  // Get integer part only for ordinals
  // ─────────────────────────────────────────

  const intValue = Math.floor(absValue);

  // ─────────────────────────────────────────
  // Format number part
  // ─────────────────────────────────────────

  const hasThousands = formatString.includes(',');

  let numberPart = String(intValue);

  if (hasThousands) {
    numberPart = applyThousandsSeparator(numberPart, locale);
  }

  // ─────────────────────────────────────────
  // Get ordinal suffix from locale
  // ─────────────────────────────────────────

  const suffix = locale.ordinal(intValue);

  // ─────────────────────────────────────────
  // Combine
  // ─────────────────────────────────────────

  const sign = isNegative ? '-' : '';

  return `${sign}${numberPart}${suffix}`;
};
