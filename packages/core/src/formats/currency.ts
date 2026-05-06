import { applyThousandsSeparator } from './number';

import type { LocaleConfig } from '../types';

/**
 * The `formatCurrency` function in TypeScript formats a number value as currency based on the provided
 * format string and locale configuration.
 * @param {number} value - The `value` parameter is the numerical value that you want to format as a
 * currency. It represents the amount of money you want to display in a specific currency format.
 * @param {string} formatString - The `formatString` parameter is a string that represents the desired
 * format for the currency value. It can include placeholders for the currency symbol, code, position,
 * and formatting options such as decimal places and thousands separators. The function
 * `formatCurrency` uses this format string to determine how the currency value should
 * @param {LocaleConfig} locale - The `locale` parameter is an object that contains information about
 * the currency formatting rules for a specific region or language. It typically includes properties
 * like `currency.symbol` (currency symbol), `currency.position` (position of the currency symbol), and
 * `currency.code` (currency code). This information is used
 * @returns The `formatCurrency` function returns a formatted string representing the input `value` as
 * a currency value based on the provided `formatString` and `locale` configuration. The formatting
 * includes considerations for negative values, currency symbols or codes, decimal places, thousands
 * separators, and the position of the currency symbol in relation to the number. The final formatted
 * string may include the currency symbol or code, the number
 */
export const formatCurrency = (
  value: number,
  formatString: string,
  locale: LocaleConfig,
): string => {
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  const symbol = locale.currency.symbol;
  const position = locale.currency.position;

  const hasBrackets = formatString.includes('(') && formatString.includes(')');
  const hasSpacePrefix = formatString.includes('$ ');
  const hasSpaceSuffix = formatString.includes(' $');
  const hasCurrencyCode = formatString.includes(locale.currency.code);
  const hasThousands = formatString.includes(',');

  // ✅ KEY FIX: Only use decimals if format has '.'
  const decimalIndex = formatString.indexOf('.');
  const decimalPlaces =
    decimalIndex !== -1
      ? (formatString.slice(decimalIndex + 1).match(/0+/)?.[0]?.length ?? 0)
      : 0; // ✅ 0 not 2 when no decimal in format!

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

  if (formatString.endsWith('$') || formatString.endsWith(' $')) {
    formatted = `${numberPart}${space}${currencyMark}`;
  } else if (position === 'suffix') {
    formatted = `${numberPart}${space}${currencyMark}`;
  } else {
    formatted = `${currencyMark}${space}${numberPart}`;
  }

  // ─────────────────────────────────────────
  // Apply Sign / Brackets
  // ─────────────────────────────────────────

  if (hasBrackets && isNegative) {
    return `(${formatted})`;
  }

  if (isNegative) {
    if (position === 'prefix' && !formatString.endsWith('$')) {
      return `-${currencyMark}${space}${numberPart}`;
    }
    return `-${formatted}`;
  }

  return formatted;
};
