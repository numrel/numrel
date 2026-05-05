// src/formats/currency.ts
import { applyThousandsSeparator } from './number';

import type { LocaleConfig } from '../types';

// ─────────────────────────────────────────
// Currency Formatter
// Handles: $0,0.00, 0,0.00$, ($ 0,0.00)
// ─────────────────────────────────────────

/**
 * The `formatCurrency` function in TypeScript formats a number as currency based on the provided
 * format string and locale configuration, handling options like symbol position, decimal places,
 * thousands separator, and negative values.
 * @param {number} value - The `value` parameter is the numerical value that you want to format as
 * currency. It represents the amount of money you want to convert into a specific currency format.
 * @param {string} formatString - The `formatString` parameter is a string that represents the desired
 * format for the currency value. It can include placeholders for symbols, decimal places, thousands
 * separators, and currency codes. The function `formatCurrency` uses this format string to determine
 * how the currency value should be displayed.
 * @param {LocaleConfig} locale - The `locale` parameter is an object that contains information about
 * the currency formatting for a specific region or language. It includes properties such as
 * `currency.symbol` (currency symbol like '$'), `currency.position` (position of the currency symbol),
 * and `currency.code` (currency code like 'USD').
 * @returns The `formatCurrency` function returns a formatted currency string based on the input
 * `value`, `formatString`, and `locale`. The formatted string includes the currency symbol or code,
 * decimal places, thousands separator, and handles negative values with optional accounting brackets.
 */
export const formatCurrency = (
  value: number,
  formatString: string,
  locale: LocaleConfig,
): string => {
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  // ─────────────────────────────────────────
  // Detect Format Options
  // ─────────────────────────────────────────

  const symbol = locale.currency.symbol;
  const position = locale.currency.position;

  // Check for brackets (accounting format)
  const hasBrackets = formatString.includes('(') && formatString.includes(')');

  // Check for space between symbol and number
  const hasSpacePrefix = formatString.includes('$ ');
  const hasSpaceSuffix = formatString.includes(' $');

  // Check for currency code instead of symbol
  const hasCurrencyCode =
    formatString.includes('USD') || formatString.includes(locale.currency.code);

  // Get decimal places
  const decimalIndex = formatString.indexOf('.');
  const decimalPlaces =
    decimalIndex !== -1
      ? (formatString.slice(decimalIndex + 1).match(/0+/)?.[0]?.length ?? 0)
      : 2; // default 2 decimal places for currency

  // Check thousands
  const hasThousands = formatString.includes(',');

  // ─────────────────────────────────────────
  // Format The Number Part
  // ─────────────────────────────────────────

  let numberPart = absValue.toFixed(decimalPlaces);

  if (hasThousands) {
    numberPart = applyThousandsSeparator(numberPart, locale);
  }

  // ─────────────────────────────────────────
  // Determine Symbol or Code
  // ─────────────────────────────────────────

  const currencyMark = hasCurrencyCode ? locale.currency.code : symbol;

  const space = hasSpacePrefix || hasSpaceSuffix ? ' ' : '';

  // ─────────────────────────────────────────
  // Combine Symbol + Number
  // ─────────────────────────────────────────

  let formatted: string;

  // Explicit suffix in format string
  if (formatString.endsWith('$') || formatString.endsWith(' $')) {
    formatted = `${numberPart}${space}${currencyMark}`;
  }
  // Use locale position
  else if (position === 'suffix') {
    formatted = `${numberPart}${space}${currencyMark}`;
  }
  // Default prefix
  else {
    formatted = `${currencyMark}${space}${numberPart}`;
  }

  // ─────────────────────────────────────────
  // Apply Sign / Brackets
  // ─────────────────────────────────────────

  if (hasBrackets && isNegative) {
    // Accounting: ($1,000.00)
    return `(${formatted})`;
  }

  if (isNegative) {
    // Check where to put minus sign
    if (position === 'prefix' && !formatString.endsWith('$')) {
      // -$1,000.00
      return `-${currencyMark}${space}${numberPart}`;
    }
    // -1,000.00$
    return `-${formatted}`;
  }

  return formatted;
};
