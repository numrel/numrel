import type { LocaleConfig } from '../types';

/**
 * 🇳🇴 Norwegian Bokmål - Norway (nb)
 *
 * @example
 * ```ts
 * import { nb } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(nb);
 * const norwegian = n.locale('nb');
 *
 * norwegian(1234567.89).format('0,0.00')  // → '1 234 567,89'
 * norwegian(1000).format('$0,0')          // → 'kr1 000'
 * norwegian(1).format('0o')               // → '1.'
 * norwegian(1000000).format('0a')         // → '1mill'
 * ```
 *
 * @remarks
 * - Thousands separator: ` ` (space)
 * - Decimal separator: `,` (comma)
 * - Currency: `kr` NOK (prefix, no space)
 * - Ordinals: dot suffix
 * - Abbreviations: k, mill, mrd, bill
 */
export const nb: LocaleConfig = {
  name: 'nb',
  delimiters: {
    thousands: ' ',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'k',
    million: 'mill',
    billion: 'mrd',
    trillion: 'bill',
  },
  ordinal: (_number: number): string => {
    return '.';
  },
  currency: {
    symbol: 'kr',
    position: 'prefix',
    code: 'NOK',
    spaceBetween: false,
  },
};
