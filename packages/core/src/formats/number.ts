import type { LocaleConfig } from '../types';

// ─────────────────────────────────────────
// Number Formatter
// ─────────────────────────────────────────

/**
 * The `formatNumber` function in TypeScript formats a number according to a specified format string,
 * locale, and handles negative values, decimal places, thousands separator, and sign or brackets.
 * @param {number} value - The `value` parameter is the number that you want to format. It represents
 * the numerical value that you want to convert into a formatted string according to the specified
 * format and locale.
 * @param {string} formatString - The `formatString` parameter is a string that specifies how the
 * number should be formatted. It can contain special characters like:
 * @param {LocaleConfig} locale - The `locale` parameter in the `formatNumber` function is used to
 * specify the locale configuration for formatting the number. It helps determine how numbers are
 * formatted based on the specific locale settings such as decimal separator, thousands separator,
 * currency symbol, and other formatting rules specific to a particular region or language.
 * @returns The `formatNumber` function returns a formatted string representation of a number based on
 * the provided value, format string, and locale configuration. The formatted string includes
 * considerations for negative numbers, signs, thousands separators, decimal places, and optional
 * decimals.
 */
export const formatNumber = (
  value: number,
  formatString: string,
  locale: LocaleConfig,
): string => {
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  const hasSign = formatString.startsWith('+');
  const hasThousands = formatString.includes(',');
  const hasBrackets = formatString.startsWith('(');

  // Get decimal places from format string
  const decimalIndex = formatString.indexOf('.');
  const decimalPlaces =
    decimalIndex !== -1
      ? formatString.slice(decimalIndex + 1).replace(/[^0]/g, '').length
      : 0;

  const hasOptionalDecimals =
    formatString.includes('[') && formatString.includes(']');

  // ─────────────────────────────────────────
  // Format the Number
  // ─────────────────────────────────────────

  let formatted: string;

  if (hasOptionalDecimals) {
    formatted = trimOptionalDecimals(absValue, formatString, locale);
  } else {
    formatted = absValue.toFixed(decimalPlaces);
  }

  // ─────────────────────────────────────────
  // Apply Thousands Separator
  // ─────────────────────────────────────────

  if (hasThousands) {
    formatted = applyThousandsSeparator(formatted, locale);
  } else {
    // ✅ FIX: Even without thousands separator
    // we still need to replace decimal delimiter!
    formatted = applyDecimalDelimiter(formatted, locale);
  }

  // ─────────────────────────────────────────
  // Apply Sign / Brackets
  // ─────────────────────────────────────────

  if (hasBrackets && isNegative) {
    formatted = `(${formatted})`;
  } else if (isNegative) {
    formatted = `-${formatted}`;
  } else if (hasSign && !isNegative) {
    formatted = `+${formatted}`;
  }

  return formatted;
};

// ─────────────────────────────────────────
// Apply Decimal Delimiter Only
// Used when no thousands separator needed
// ─────────────────────────────────────────

/**
 * The function `applyDecimalDelimiter` replaces the decimal delimiter in a string value based on the
 * specified locale configuration.
 * @param {string} value - The `value` parameter is a string representing a numerical value that may or
 * may not contain a decimal delimiter.
 * @param {LocaleConfig} locale - The `locale` parameter is an object that contains configuration
 * settings for a specific locale. It includes information such as the decimal delimiter used in that
 * locale.
 * @returns The function `applyDecimalDelimiter` returns the input `value` with the decimal delimiter
 * replaced based on the specified `locale` configuration. If the locale uses a different decimal
 * delimiter than '.', the function replaces '.' with the locale's decimal delimiter and returns the
 * updated string. If the locale's decimal delimiter is '.', the function returns the original input
 * `value` without any changes.
 */
export const applyDecimalDelimiter = (
  value: string,
  locale: LocaleConfig,
): string => {
  // Only replace if locale uses different decimal delimiter
  if (locale.delimiters.decimal === '.') return value;

  return value.replace('.', locale.delimiters.decimal);
};

// ─────────────────────────────────────────
// Apply Thousands Separator
// Also handles decimal delimiter replacement
// ─────────────────────────────────────────

/**
 * The function `applyThousandsSeparator` formats a numeric value by adding thousands separators based
 * on the provided locale configuration.
 * @param {string} value - The `value` parameter is a string representing a numerical value that you
 * want to format with thousands separators. It can include an integer part and an optional decimal
 * part separated by a decimal point.
 * @param {LocaleConfig} locale - The `locale` parameter in the `applyThousandsSeparator` function is
 * an object that contains configuration settings for formatting numbers according to a specific
 * locale. It includes properties such as `delimiters` which specify the characters used for thousands
 * separator and decimal separator in that locale.
 * @returns The function `applyThousandsSeparator` returns a string with the integer part formatted
 * with thousands separators based on the provided locale configuration. If the input value contains a
 * decimal part, the function also includes the decimal part with the appropriate decimal delimiter
 * from the locale configuration.
 */
export const applyThousandsSeparator = (
  value: string,
  locale: LocaleConfig,
): string => {
  // Split integer and decimal parts
  const parts = value.split('.');
  const integerPart = parts[0] ?? '';
  const decimalPart = parts[1];

  // Apply thousands separator to integer part
  const withThousands = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    locale.delimiters.thousands,
  );

  // ✅ Always use locale decimal delimiter
  if (decimalPart !== undefined) {
    return `${withThousands}${locale.delimiters.decimal}${decimalPart}`;
  }

  return withThousands;
};

// ─────────────────────────────────────────
// Handle Optional Decimals [0]
// ─────────────────────────────────────────

const trimOptionalDecimals = (
  value: number,
  formatString: string,
  _locale: LocaleConfig,
): string => {
  const optionalMatch = formatString.match(/\[\.?(0+)\]/);
  const maxDecimals = optionalMatch?.[1]?.length ?? 0;

  let formatted = value.toFixed(maxDecimals);

  if (formatted.includes('.')) {
    formatted = formatted.replace(/\.?0+$/, '');
  }

  return formatted;
};
