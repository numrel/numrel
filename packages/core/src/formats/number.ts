import type { LocaleConfig } from '../types';

// ─────────────────────────────────────────
// Number Formatter
// Handles: 0, 0,0, 0.00, 0,0.00, +0, etc.
// ─────────────────────────────────────────

/**
 * The `formatNumber` function in TypeScript formats a number according to a specified format string,
 * locale, and optional decimal places.
 * @param {number} value - The `value` parameter is the number that you want to format according to the
 * specified format string and locale.
 * @param {string} formatString - The `formatString` parameter is a string that specifies how the
 * number should be formatted. It can include special characters to indicate things like whether the
 * number should have a sign, thousands separator, decimal places, or be enclosed in brackets for
 * negative values.
 * @param {LocaleConfig} locale - The `locale` parameter in the `formatNumber` function is used to
 * specify the locale configuration for formatting the number. It helps determine how numbers are
 * formatted based on the specific rules and conventions of a particular region or language. This can
 * include things like decimal separators, thousands separators, currency symbols, and
 * @returns The `formatNumber` function returns a formatted string representation of a number based on
 * the provided format string and locale configuration. The formatted string includes options for sign,
 * thousands separator, decimal places, and accounting brackets for negative numbers.
 */
const formatNumber = (
  value: number,
  formatString: string,
  locale: LocaleConfig,
): string => {
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  // ─────────────────────────────────────────
  // Parse Format String
  // ─────────────────────────────────────────
  const hasSign = formatString.startsWith('+');
  const hasThousands = formatString.includes(',');
  const hasBrackets = formatString.startsWith('(');

  // Get decimal places from format string
  const decimalIndex = formatString.indexOf('.');
  const decimalPlaces =
    decimalIndex !== -1
      ? formatString.slice(decimalIndex + 1).replace(/[^0]/g, '').length
      : 0;

  // Check if decimal places are optional (use '0[0]' style)
  const hasOptionalDecimals =
    formatString.includes('[') && formatString.includes(']');

  // ─────────────────────────────────────────
  // Format the Number
  // ─────────────────────────────────────────

  let formatted: string;

  if (hasOptionalDecimals) {
    // Remove trailing zeros for optional decimals
    formatted = trimOptionalDecimals(absValue, formatString, locale);
  } else {
    // Fixed decimal places
    formatted = absValue.toFixed(decimalPlaces);
  }

  // ─────────────────────────────────────────
  // Apply Thousands Separator
  // ─────────────────────────────────────────

  if (hasThousands) {
    formatted = applyThousandsSeparator(formatted, locale);
  }

  // ─────────────────────────────────────────
  // Apply Sign / Brackets
  // ─────────────────────────────────────────

  if (hasBrackets && isNegative) {
    // Accounting format: (1,000.00)
    formatted = `(${formatted})`;
  } else if (isNegative) {
    formatted = `-${formatted}`;
  } else if (hasSign && !isNegative) {
    formatted = `+${formatted}`;
  }

  return formatted;
};

// ─────────────────────────────────────────
// Apply Thousands Separator
// ─────────────────────────────────────────

/**
 * The function `applyThousandsSeparator` takes a numeric value as a string and applies thousands
 * separators based on the provided locale configuration.
 * @param {string} value - The `value` parameter is a string representing a numerical value that you
 * want to format with thousands separators based on the provided locale configuration.
 * @param {LocaleConfig} locale - The `locale` parameter is an object that contains configuration
 * settings for formatting numbers according to a specific locale. It includes information such as the
 * thousands separator and decimal delimiter used in that locale.
 * @returns The function `applyThousandsSeparator` returns a formatted string with thousands separators
 * applied to the integer part of the input value based on the provided locale configuration. If the
 * input value contains a decimal part, the function also includes the locale's decimal delimiter
 * between the formatted integer part and the decimal part.
 */
const applyThousandsSeparator = (
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

  // Rejoin with locale decimal delimiter
  if (decimalPart !== undefined) {
    return `${withThousands}${locale.delimiters.decimal}${decimalPart}`;
  }

  return withThousands;
};

/**
 * The function `trimOptionalDecimals` takes a number value, a format string, and a locale
 * configuration, extracts the maximum decimal places from the format string, formats the value with
 * the maximum decimals, and trims any trailing zeros after the decimal point.
 * @param {number} value - The `value` parameter is a number that you want to format and trim optional
 * decimals from.
 * @param {string} formatString - The `formatString` parameter is a string that specifies the format in
 * which the number should be displayed. It may contain optional decimal places enclosed in square
 * brackets, such as `[.000]`, indicating the maximum number of decimal places to show.
 * @param {LocaleConfig} _locale - The `_locale` parameter typically refers to a configuration object
 * that contains locale-specific information such as date formats, number formats, currency symbols,
 * and other localization settings. It is often used in internationalization and localization libraries
 * to customize the display of data based on the user's locale or language preferences.
 * @returns The function `trimOptionalDecimals` returns a string that represents the input `value`
 * number formatted with a maximum number of decimal places extracted from the `formatString`, with any
 * trailing zeros after the decimal point trimmed.
 */
const trimOptionalDecimals = (
  value: number,
  formatString: string,
  _locale: LocaleConfig,
): string => {
  // Extract max decimal places from format
  const optionalMatch = formatString.match(/\[\.?(0+)\]/);
  const maxDecimals = optionalMatch?.[1]?.length ?? 0;

  // Format with max decimals then trim zeros
  let formatted = value.toFixed(maxDecimals);

  // Trim trailing zeros after decimal
  if (formatted.includes('.')) {
    formatted = formatted.replace(/\.?0+$/, '');
  }

  return formatted;
};

export { applyThousandsSeparator, formatNumber };
