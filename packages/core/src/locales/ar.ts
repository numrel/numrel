import type { LocaleConfig } from '../types';

/**
 * 🇸🇦 Arabic - Saudi Arabia (ar)
 *
 * @example
 * ```ts
 * import { ar } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(ar);
 * const arabic = n.locale('ar');
 *
 * arabic(1234567).format('0,0')       // → '1٬234٬567'
 * arabic(1000).format('$0,0')         // → '1٬000 ر.س'
 * arabic(1000).format('0a')           // → '1ألف'
 * arabic(1000000).format('0a')        // → '1مليون'
 * ```
 *
 * @remarks
 * - Thousands separator: `٬` (Arabic thousands separator)
 * - Decimal separator: `٫` (Arabic decimal separator)
 * - Currency: `ر.س` SAR (suffix with space)
 * - RTL language - currency always appears on the right
 * - Abbreviations in Arabic: ألف, مليون, مليار, تريليون
 */
export const ar: LocaleConfig = {
  name: 'ar',
  delimiters: {
    thousands: '٬', // Arabic thousands separator
    decimal: '٫', // Arabic decimal separator
  },
  abbreviations: {
    thousand: 'ألف',
    million: 'مليون',
    billion: 'مليار',
    trillion: 'تريليون',
  },
  ordinal: (_number: number): string => {
    return '.';
  },
  currency: {
    symbol: 'ر.س',
    position: 'suffix', // Arabic RTL: 1,000.00 ر.س
    code: 'SAR',
    spaceBetween: true, // 1,000.00 ر.س → space
  },
};
