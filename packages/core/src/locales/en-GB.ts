import type { LocaleConfig } from '../types';

/**
 * 🇬🇧 English - United Kingdom (en-GB)
 *
 * @example
 * ```ts
 * import { enGB } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(enGB);
 * const uk = n.locale('en-GB');
 *
 * uk(1234567.89).format('0,0.00')   // → '1,234,567.89'
 * uk(1000).format('$0,0.00')        // → '£1,000.00'
 * uk(1).format('0o')                // → '1st'
 * uk(1000000000).format('0.0a')     // → '1.0bn'
 * ```
 *
 * @remarks
 * - Thousands separator: `,` (comma)
 * - Decimal separator: `.` (dot)
 * - Currency: `£` GBP (prefix)
 * - Ordinals: 1st, 2nd, 3rd, 4th
 * - Billion abbreviation: `bn` (not `b`)
 * - Trillion abbreviation: `tn` (not `t`)
 */
export const enGB: LocaleConfig = {
  name: 'en-GB',
  delimiters: {
    thousands: ',',
    decimal: '.',
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'bn', // UK uses 'bn' not 'b'
    trillion: 'tn', // UK uses 'tn' not 't'
  },
  ordinal: (number: number): string => {
    const abs = Math.abs(number);
    const mod10 = abs % 10;
    const mod100 = abs % 100;

    if (mod100 >= 11 && mod100 <= 13) return 'th';

    if (mod10 === 1) return 'st';

    if (mod10 === 2) return 'nd';

    if (mod10 === 3) return 'rd';

    return 'th';
  },
  currency: {
    symbol: '£',
    position: 'prefix',
    code: 'GBP',
    spaceBetween: false, // £1,000.00 → no space
  },
};
