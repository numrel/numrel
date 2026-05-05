import { applyThousandsSeparator } from './number';

import type { NumrelConfig, LocaleConfig } from '../types';

// ─────────────────────────────────────────
// Percentage Formatter
// Handles: 0%, 0.00%, 0,0.00%
// ─────────────────────────────────────────

export const formatPercentage = (
  value: number,
  formatString: string,
  config: NumrelConfig,
  locale: LocaleConfig,
): string => {
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  // ─────────────────────────────────────────
  // Scale value
  // 0.5 → 50% (when scalePercentBy100 is true)
  // ─────────────────────────────────────────

  const scaledValue = config.scalePercentBy100 ? absValue * 100 : absValue;

  // ─────────────────────────────────────────
  // Parse Format String
  // ─────────────────────────────────────────

  // Remove % from format to get number format
  const numberFormat = formatString.replace('%', '').trim();

  // Get decimal places
  const decimalIndex = numberFormat.indexOf('.');
  const decimalPlaces =
    decimalIndex !== -1
      ? (numberFormat.slice(decimalIndex + 1).match(/0+/)?.[0]?.length ?? 0)
      : 0;

  // Check thousands
  const hasThousands = numberFormat.includes(',');

  // ─────────────────────────────────────────
  // Format Number Part
  // ─────────────────────────────────────────

  let formatted = scaledValue.toFixed(decimalPlaces);

  if (hasThousands) {
    formatted = applyThousandsSeparator(formatted, locale);
  }

  // ─────────────────────────────────────────
  // Check % position (suffix is default)
  // ─────────────────────────────────────────

  const percentSign = '%';
  const isPrefix = formatString.startsWith('%');

  let result: string;

  if (isPrefix) {
    result = `${percentSign}${formatted}`;
  } else {
    result = `${formatted}${percentSign}`;
  }

  // ─────────────────────────────────────────
  // Apply Sign
  // ─────────────────────────────────────────

  if (isNegative) {
    result = `-${result}`;
  }

  return result;
};
