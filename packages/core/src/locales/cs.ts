import type { LocaleConfig } from '../types';

/**
 * 🇨🇿 Czech - Czech Republic (cs)
 *
 * @example
 * ```ts
 * import { cs } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(cs);
 * const czech = n.locale('cs');
 *
 * czech(1234567.89).format('0,0.00')  // → '1 234 567,89'
 * czech(1000).format('$0,0')          // → '1 000 Kč'
 * czech(1).format('0o')               // → '1.'
 * czech(1000000).format('0a')         // → '1mil'
 * ```
 *
 * @remarks
 * - Thousands separator: ` ` (space)
 * - Decimal separator: `,` (comma)
 * - Currency: `Kč` CZK (suffix with space)
 * - Ordinals: dot suffix
 * - Abbreviations: tis, mil, mld, bil
 */
export const cs: LocaleConfig = {
  name: 'cs',
  delimiters: {
    thousands: ' ',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'tis',
    million: 'mil',
    billion: 'mld',
    trillion: 'bil',
  },
  ordinal: (_number: number): string => {
    return '.';
  },
  currency: {
    symbol: 'Kč',
    position: 'suffix',
    code: 'CZK',
    spaceBetween: true,
  },
};
