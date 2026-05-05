// src/formats/bytes.ts
import type { LocaleConfig } from '../types';

// ─────────────────────────────────────────
// Bytes Formatter
// Handles: 0b, 0kb, 0mb, 0gb, 0tb
// Also supports IEC: KiB, MiB, GiB (new!)
// ─────────────────────────────────────────

// SI Units (base 1000)
const SI_UNITS = [
  { suffix: 'B', value: 1 },
  { suffix: 'KB', value: 1e3 },
  { suffix: 'MB', value: 1e6 },
  { suffix: 'GB', value: 1e9 },
  { suffix: 'TB', value: 1e12 },
  { suffix: 'PB', value: 1e15 },
] as const;

// IEC Units (base 1024) - new feature!
const IEC_UNITS = [
  { suffix: 'B', value: 1 },
  { suffix: 'KiB', value: 1024 },
  { suffix: 'MiB', value: 1024 ** 2 },
  { suffix: 'GiB', value: 1024 ** 3 },
  { suffix: 'TiB', value: 1024 ** 4 },
  { suffix: 'PiB', value: 1024 ** 5 },
] as const;

/**
 * The function `formatBytes` in TypeScript formats a given number of bytes into a human-readable
 * string with specified formatting options.
 * @param {number} value - The `value` parameter is a number representing the size in bytes that you
 * want to format.
 * @param {string} formatString - The `formatString` parameter is a string that specifies how the bytes
 * should be formatted. It can contain various options such as specifying the unit (e.g., KB, MB) and
 * the number of decimal places to display. The function uses this string to determine how to format
 * the bytes before displaying them
 * @param {LocaleConfig} locale - The `locale` parameter is an object that contains information about
 * the formatting conventions specific to a particular region or language. It typically includes
 * properties such as `delimiters` which specify the characters used for thousands separators and
 * decimal points in numeric formatting.
 * @returns The `formatBytes` function returns a formatted string representing the input `value` in
 * bytes, based on the provided `formatString` and `locale`. The formatted string includes the value
 * with the appropriate unit suffix (e.g., KB, MB, GB) and may include thousands separators and decimal
 * places as specified in the `formatString`.
 */
export const formatBytes = (
  value: number,
  formatString: string,
  locale: LocaleConfig,
): string => {
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  // ─────────────────────────────────────────
  // Detect IEC vs SI
  // ─────────────────────────────────────────

  const isIEC = formatString.toLowerCase().includes('ib');
  const units = isIEC ? IEC_UNITS : SI_UNITS;
  const base = isIEC ? 1024 : 1000;

  // ─────────────────────────────────────────
  // Get Decimal Places
  // ─────────────────────────────────────────

  const decimalIndex = formatString.indexOf('.');
  const decimalPlaces =
    decimalIndex !== -1
      ? (formatString.slice(decimalIndex + 1).match(/0+/)?.[0]?.length ?? 0)
      : 0;

  // ─────────────────────────────────────────
  // Detect Specific Unit or Auto Scale
  // ─────────────────────────────────────────

  const lowerFormat = formatString.toLowerCase();

  let unit: { suffix: string; value: number };
  let scaledValue: number;

  if (lowerFormat.includes('pb') || lowerFormat.includes('pib')) {
    unit = units[5] ?? units[units.length - 1]!;
  } else if (lowerFormat.includes('tb') || lowerFormat.includes('tib')) {
    unit = units[4] ?? units[units.length - 1]!;
  } else if (lowerFormat.includes('gb') || lowerFormat.includes('gib')) {
    unit = units[3] ?? units[units.length - 1]!;
  } else if (lowerFormat.includes('mb') || lowerFormat.includes('mib')) {
    unit = units[2] ?? units[units.length - 1]!;
  } else if (lowerFormat.includes('kb') || lowerFormat.includes('kib')) {
    unit = units[1] ?? units[units.length - 1]!;
  } else {
    // Auto scale → find best unit
    unit = autoScaleBytes(absValue, units, base);
  }

  scaledValue = absValue / unit.value;

  // ─────────────────────────────────────────
  // Format Number
  // ─────────────────────────────────────────

  let formatted = scaledValue.toFixed(decimalPlaces);

  // Apply thousands if needed
  if (formatString.includes(',')) {
    const parts = formatted.split('.');
    const intPart = parts[0] ?? '';
    const decPart = parts[1];
    const withThousands = intPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      locale.delimiters.thousands,
    );
    formatted =
      decPart !== undefined
        ? `${withThousands}${locale.delimiters.decimal}${decPart}`
        : withThousands;
  }

  // ─────────────────────────────────────────
  // Apply Sign + Unit
  // ─────────────────────────────────────────

  const sign = isNegative ? '-' : '';
  return `${sign}${formatted} ${unit.suffix}`;
};

// ─────────────────────────────────────────
// Auto Scale Helper
// ─────────────────────────────────────────

const autoScaleBytes = (
  value: number,
  units: readonly { suffix: string; value: number }[],
  _base: number,
): { suffix: string; value: number } => {
  if (value === 0) return units[0]!;

  // Find the best unit
  for (let i = units.length - 1; i >= 0; i--) {
    const unit = units[i]!;
    if (value >= unit.value) {
      return unit;
    }
  }

  return units[0]!;
};
