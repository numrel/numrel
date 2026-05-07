import type { LocaleConfig } from '../types';

/**
 * 🇭🇺 Hungarian - Hungary (hu)
 *
 * @example
 * ```ts
 * import { hu } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(hu);
 * const hungarian = n.locale('hu');
 *
 * hungarian(1234567.89).format('0,0.00')  // → '1 234 567,89'
 * hungarian(1000).format('$0,0')          // → '1 000 Ft'
 * hungarian(1).format('0o')               // → '1.'
 * hungarian(1000000).format('0a')         // → '1M'
 * ```
 *
 * @remarks
 * - Thousands separator: ` ` (space)
 * - Decimal separator: `,` (comma)
 * - Currency: `Ft` HUF (suffix with space)
 * - Ordinals: dot suffix
 * - Abbreviations: E, M, Mrd, T
 */
export const hu: LocaleConfig = {
  name: 'hu',
  delimiters: {
    thousands: ' ',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'E',
    million: 'M',
    billion: 'Mrd',
    trillion: 'T',
  },
  ordinal: (_number: number): string => {
    return '.';
  },
  currency: {
    symbol: 'Ft',
    position: 'suffix',
    code: 'HUF',
    spaceBetween: true,
  },
};
