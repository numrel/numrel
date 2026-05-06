import { applyThousandsSeparator, applyDecimalDelimiter } from './number';

import type { LocaleConfig } from '../types';

/**
 * The `formatCurrency` function in TypeScript formats a number value as currency based on specified
 * format options and locale settings.
 * @param {number} value - The `value` parameter represents the numerical value that you want to format
 * as currency. It should be a number, such as 1000 or -500.
 * @param {string} formatString - The `formatString` parameter in the `formatCurrency` function is a
 * string that represents the format in which the currency value should be displayed. It can contain
 * placeholders for the currency symbol, currency code, decimal places, thousands separator, and other
 * formatting options. This string is used to determine how the
 * @param {LocaleConfig} locale - The `locale` parameter is an object that contains information about
 * the currency formatting rules for a specific region or language. It includes properties such as
 * `currency.symbol` (currency symbol), `currency.position` (position of the currency symbol), and
 * `currency.code` (currency code). These properties are used
 * @returns The `formatCurrency` function returns a formatted string representing the input `value` as
 * a currency value based on the provided `formatString` and `locale` configuration. The formatting
 * includes considerations for negative values, currency symbol or code, position of the symbol or
 * code, presence of brackets for negative values, thousands separator, decimal places, and spacing
 * based on the detected format options.
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
  const code = locale.currency.code;

  const hasBrackets = formatString.includes('(') && formatString.includes(')');

  // ✅ Use locale spaceBetween as default
  // But allow format string to override
  const hasExplicitSpacePrefix =
    formatString.includes(`${symbol} `) || formatString.includes(`${code} `);

  const hasExplicitSpaceSuffix =
    formatString.includes(` ${symbol}`) || formatString.includes(` ${code}`);

  // ✅ Determine space from locale config
  const space =
    hasExplicitSpacePrefix ||
    hasExplicitSpaceSuffix ||
    locale.currency.spaceBetween
      ? ' '
      : '';

  const hasCurrencyCode = formatString.includes(code);
  const hasThousands = formatString.includes(',');

  const decimalIndex = formatString.indexOf('.');
  const decimalPlaces =
    decimalIndex !== -1
      ? (formatString.slice(decimalIndex + 1).match(/0+/)?.[0]?.length ?? 0)
      : 0;

  // ─────────────────────────────────────────
  // Format Number Part
  // ─────────────────────────────────────────

  let numberPart = absValue.toFixed(decimalPlaces);

  if (hasThousands) {
    numberPart = applyThousandsSeparator(numberPart, locale);
  } else {
    numberPart = applyDecimalDelimiter(numberPart, locale);
  }

  // ─────────────────────────────────────────
  // Determine Currency Mark
  // ─────────────────────────────────────────

  const currencyMark = hasCurrencyCode ? code : symbol;

  // ─────────────────────────────────────────
  // Determine Position
  // ─────────────────────────────────────────

  const isExplicitSuffix =
    formatString.endsWith(symbol) ||
    formatString.endsWith(` ${symbol}`) ||
    formatString.endsWith(code) ||
    formatString.endsWith(` ${code}`);

  let formatted: string;

  if (isExplicitSuffix || position === 'suffix') {
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
    if (!isExplicitSuffix && position !== 'suffix') {
      return `-${currencyMark}${space}${numberPart}`;
    }
    return `-${numberPart}${space}${currencyMark}`;
  }

  return formatted;
};
