import type { LocaleConfig } from '../types';

/**
 * 🇮🇳 Hindi - India (hi)
 *
 * @example
 * ```ts
 * import { hi } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(hi);
 * const hindi = n.locale('hi');
 *
 * hindi(1234567).format('0,0')        // → '1,234,567'
 * hindi(1000).format('$0,0')          // → '₹1,000'
 * hindi(1000).format('0a')            // → '1हज़ार'
 * hindi(1000000).format('0a')         // → '1दस लाख'
 * ```
 *
 * @remarks
 * - Thousands separator: `,` (comma)
 * - Decimal separator: `.` (dot)
 * - Currency: `₹` INR (prefix, no space)
 * - Ordinals: वां
 * - Abbreviations in Hindi: हज़ार, दस लाख, अरब, खरब
 */
export const hi: LocaleConfig = {
  name: 'hi',
  delimiters: {
    thousands: ',',
    decimal: '.',
  },
  abbreviations: {
    thousand: 'हज़ार',
    million: 'दस लाख',
    billion: 'अरब',
    trillion: 'खरब',
  },
  ordinal: (_number: number): string => {
    return 'वां';
  },
  currency: {
    symbol: '₹',
    position: 'prefix',
    code: 'INR',
    spaceBetween: false,
  },
};
