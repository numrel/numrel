import type { LocaleConfig } from '../types';

/**
 * 🇵🇱 Polish - Poland (pl)
 *
 * @example
 * ```ts
 * import { pl } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(pl);
 * const polish = n.locale('pl');
 *
 * polish(1234567.89).format('0,0.00')  // → '1 234 567,89'
 * polish(1000).format('$0,0')          // → '1 000 zł'
 * polish(1).format('0o')               // → '1.'
 * polish(1000000).format('0a')         // → '1mln'
 * ```
 *
 * @remarks
 * - Thousands separator: ` ` (space)
 * - Decimal separator: `,` (comma)
 * - Currency: `zł` PLN (suffix with space)
 * - Ordinals: dot suffix
 * - Abbreviations: tys, mln, mld, bln
 */
export const pl: LocaleConfig = {
  name: 'pl',
  delimiters: {
    thousands: ' ',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'tys',
    million: 'mln',
    billion: 'mld',
    trillion: 'bln',
  },
  ordinal: (_number: number): string => {
    return '.';
  },
  currency: {
    symbol: 'zł',
    position: 'suffix', // Poland: 1 000,00 zł
    code: 'PLN',
    spaceBetween: true, // 1 000,00 zł → space
  },
};
