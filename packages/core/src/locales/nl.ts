import type { LocaleConfig } from '../types';

/**
 * 🇳🇱 Dutch - Netherlands (nl)
 *
 * @example
 * ```ts
 * import { nl } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(nl);
 * const dutch = n.locale('nl');
 *
 * dutch(1234567.89).format('0,0.00')  // → '1.234.567,89'
 * dutch(1000).format('$0,0.00')       // → '€ 1.000,00'
 * dutch(1).format('0o')               // → '1de'
 * dutch(1000000).format('0a')         // → '1mln'
 * ```
 *
 * @remarks
 * - Thousands separator: `.` (dot)
 * - Decimal separator: `,` (comma)
 * - Currency: `€` EUR (prefix with space)
 * - Ordinals: de suffix
 * - Abbreviations: k, mln, mrd, bln
 */
export const nl: LocaleConfig = {
  name: 'nl',
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'k',
    million: 'mln',
    billion: 'mrd',
    trillion: 'bln',
  },
  ordinal: (_number: number): string => {
    return 'de';
  },
  currency: {
    symbol: '€',
    position: 'prefix', // Netherlands: € 1.000,00
    code: 'EUR',
    spaceBetween: true, // € 1.000,00 → space
  },
};
