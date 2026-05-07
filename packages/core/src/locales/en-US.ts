import type { LocaleConfig } from '../types';

/**
 * 🇺🇸 English - United States (en-US)
 *
 * @example
 * ```ts
 * import { enUS } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(enUS);
 * const us = n.locale('en-US');
 *
 * us(1234567.89).format('0,0.00')   // → '1,234,567.89'
 * us(1000).format('$0,0.00')        // → '$1,000.00'
 * us(0.5).format('0%')              // → '50%'
 * us(1).format('0o')                // → '1st'
 * us(1000).format('0.0a')           // → '1.0k'
 * ```
 *
 * @remarks
 * - Thousands separator: `,` (comma)
 * - Decimal separator: `.` (dot)
 * - Currency: `$` USD (prefix)
 * - Ordinals: 1st, 2nd, 3rd, 4th
 */
export const enUS: LocaleConfig = {
  name: 'en-US',
  delimiters: {
    thousands: ',',
    decimal: '.',
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't',
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
    symbol: '$',
    position: 'prefix',
    code: 'USD',
    spaceBetween: false, // $1,000.00 → no space
  },
};
