import { applyThousandsSeparator } from './number';

import type { LocaleConfig } from '../types';

// ─────────────────────────────────────────
// Abbreviation Formatter
// Handles: 1k, 1.5m, 2.3b, 1t
// New: long form '1 thousand', '1 million'
// ─────────────────────────────────────────

interface AbbreviationUnit {
  value: number;
  short: string;
  long: string;
}

const getUnits = (locale: LocaleConfig): AbbreviationUnit[] => {
  return [
    {
      value: 1e12,
      short: locale.abbreviations.trillion,
      long: 'trillion',
    },
    {
      value: 1e9,
      short: locale.abbreviations.billion,
      long: 'billion',
    },
    {
      value: 1e6,
      short: locale.abbreviations.million,
      long: 'million',
    },
    {
      value: 1e3,
      short: locale.abbreviations.thousand,
      long: 'thousand',
    },
  ];
};

/**
 * The function `formatAbbreviation` formats a number with abbreviation based on a given format string
 * and locale configuration.
 * @param {number} value - The `value` parameter is a number that you want to format using the
 * `formatAbbreviation` function.
 * @param {string} formatString - The `formatString` parameter is a string that specifies how the
 * number should be formatted. It can contain the following placeholders:
 * @param {LocaleConfig} locale - The `locale` parameter in the `formatAbbreviation` function is used
 * to specify the locale configuration for formatting the abbreviation. It helps determine how numbers
 * are formatted based on the specific locale settings such as decimal separators, thousands
 * separators, and number formats specific to a particular region or language.
 * @returns The `formatAbbreviation` function returns a formatted string representation of a number
 * value based on the provided format string and locale configuration. The formatted string includes
 * the number value, optional decimal places, unit abbreviation (if applicable), and sign (positive or
 * negative).
 */
export const formatAbbreviation = (
  value: number,
  formatString: string,
  locale: LocaleConfig,
): string => {
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  // ─────────────────────────────────────────
  // Long form: 'al' suffix → '1 thousand'
  // ─────────────────────────────────────────

  const isLongForm = formatString.includes('al');

  // ─────────────────────────────────────────
  // Get Decimal Places
  // ─────────────────────────────────────────

  const numberFormat = formatString.replace('a', '').replace('l', '');
  const decimalIndex = numberFormat.indexOf('.');
  const decimalPlaces =
    decimalIndex !== -1
      ? (numberFormat.slice(decimalIndex + 1).match(/0+/)?.[0]?.length ?? 0)
      : 0;

  // Check thousands in format
  const hasThousands = formatString.includes(',');

  // ─────────────────────────────────────────
  // Find Best Unit
  // ─────────────────────────────────────────

  const units = getUnits(locale);
  const unit = units.find((u) => absValue >= u.value);

  // ─────────────────────────────────────────
  // Format Number
  // ─────────────────────────────────────────

  let formatted: string;
  let suffix: string;

  if (unit) {
    const scaledValue = absValue / unit.value;
    formatted = scaledValue.toFixed(decimalPlaces);
    suffix = isLongForm ? ` ${unit.long}` : unit.short;
  } else {
    // Less than 1000 - no abbreviation
    formatted = absValue.toFixed(decimalPlaces);
    suffix = '';
  }

  // ─────────────────────────────────────────
  // Apply Thousands if needed
  // ─────────────────────────────────────────

  if (hasThousands) {
    formatted = applyThousandsSeparator(formatted, locale);
  }

  // ─────────────────────────────────────────
  // Apply Sign
  // ─────────────────────────────────────────

  const sign = isNegative ? '-' : '';

  return `${sign}${formatted}${suffix}`;
};
