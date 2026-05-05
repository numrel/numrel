import type { LocaleConfig } from '../types';

// ─────────────────────────────────────────
// Parse any input to number
// ─────────────────────────────────────────

/**
 * The `parseInput` function in TypeScript parses various types of input values into numbers based on a
 * specified locale configuration.
 * @param {unknown} value - The `value` parameter in the `parseInput` function is the input value that
 * needs to be parsed into a number. It can be of type `unknown`, which means it can be any type of
 * value. The function will attempt to parse this value into a number based on certain conditions and
 * return
 * @param {LocaleConfig} locale - The `locale` parameter in the `parseInput` function is used to
 * provide configuration settings related to the locale or region-specific formatting rules for parsing
 * input values. It helps in determining how to interpret and convert input values, especially when
 * dealing with strings that represent numbers in different formats based on the locale settings
 * @returns The `parseInput` function returns a number if the input value can be successfully parsed as
 * a number based on the provided conditions and locale configuration. If the input value is not a
 * valid number or cannot be parsed, the function returns `null`.
 */
export const parseInput = (
  value: unknown,
  locale: LocaleConfig,
): number | null => {
  // null/undefined → null (explicit, not silent 0!)
  if (value === null || value === undefined) return null;

  // Already a number
  if (typeof value === 'number') {
    if (isNaN(value)) return null;
    if (!isFinite(value)) return value; // keep Infinity/-Infinity
    return value;
  }

  // Boolean - explicit rejection
  if (typeof value === 'boolean') return null;

  // String parsing
  if (typeof value === 'string') {
    return parseString(value, locale);
  }

  // NumrelInstance - extract value
  if (
    typeof value === 'object' &&
    value !== null &&
    'value' in value &&
    typeof (value as { value: unknown }).value === 'function'
  ) {
    return parseInput((value as { value: () => unknown }).value(), locale);
  }

  return null;
};

const parseString = (value: string, locale: LocaleConfig): number | null => {
  // Empty string → null
  const trimmed = value.trim();
  if (trimmed === '') return null;

  // Remove thousand delimiters
  const thousandRegex = new RegExp(`\\${locale.delimiters.thousands}`, 'g');
  let cleaned = trimmed.replace(thousandRegex, '');

  // Replace decimal delimiter with standard dot
  if (locale.delimiters.decimal !== '.') {
    cleaned = cleaned.replace(locale.delimiters.decimal, '.');
  }

  // Remove currency symbol
  cleaned = cleaned.replace(locale.currency.symbol, '').trim();

  // Handle percentage
  const isPercentage = cleaned.endsWith('%');
  if (isPercentage) {
    cleaned = cleaned.replace('%', '').trim();
  }

  // Handle abbreviations
  const abbrevMap: Record<string, number> = {
    [locale.abbreviations.thousand]: 1e3,
    [locale.abbreviations.million]: 1e6,
    [locale.abbreviations.billion]: 1e9,
    [locale.abbreviations.trillion]: 1e12,
  };

  let multiplier = 1;
  for (const [abbrev, mult] of Object.entries(abbrevMap)) {
    if (cleaned.toLowerCase().endsWith(abbrev.toLowerCase())) {
      cleaned = cleaned.slice(0, -abbrev.length).trim();
      multiplier = mult;
      break;
    }
  }

  // Parse the number
  const parsed = parseFloat(cleaned);
  if (isNaN(parsed)) return null;

  let result = parsed * multiplier;

  // Scale percentage
  if (isPercentage) {
    result = result / 100;
  }

  return result;
};
