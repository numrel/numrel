import type { LocaleConfig } from '../types';

/**
 * 🇮🇳 English - India (en-IN)
 *
 * @example
 * ```ts
 * import { enIN } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(enIN);
 * const india = n.locale('en-IN');
 *
 * india(1234567.89).format('0,0.00')  // → '1,234,567.89'
 * india(1000).format('$0,0.00')       // → '₹1,000.00'
 * india(1).format('0o')               // → '1st'
 * india(1000000).format('0a')         // → '1M'
 * ```
 *
 * @remarks
 * - Thousands separator: `,` (comma)
 * - Decimal separator: `.` (dot)
 * - Currency: `₹` INR (prefix, no space)
 * - Ordinals: 1st, 2nd, 3rd, 4th
 * - Abbreviations: K, M, B, T (uppercase)
 */
export const enIN: LocaleConfig = {
  name: 'en-IN',
  delimiters: {
    thousands: ',',
    decimal: '.',
  },
  abbreviations: {
    thousand: 'K',
    million: 'M',
    billion: 'B',
    trillion: 'T',
  },
  ordinal: (number: number): string => {
    // Same as en-US
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
    symbol: '₹',
    position: 'prefix', // India: ₹1,00,000.00
    code: 'INR',
    spaceBetween: false, // ₹1,000.00 → no space
  },
};
