import type { LocaleConfig } from '../types';

/**
 * 🇷🇴 Romanian - Romania (ro)
 *
 * @example
 * ```ts
 * import { ro } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(ro);
 * const romanian = n.locale('ro');
 *
 * romanian(1234567.89).format('0,0.00')  // → '1.234.567,89'
 * romanian(1000).format('$0,0')          // → '1.000 lei'
 * romanian(1).format('0o')               // → '1-lea'
 * romanian(1000000).format('0a')         // → '1mil'
 * ```
 *
 * @remarks
 * - Thousands separator: `.` (dot)
 * - Decimal separator: `,` (comma)
 * - Currency: `lei` RON (suffix with space)
 * - Ordinals: -lea suffix
 * - Abbreviations: mii, mil, mld, tril
 */
export const ro: LocaleConfig = {
  name: 'ro',
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'mii',
    million: 'mil',
    billion: 'mld',
    trillion: 'tril',
  },
  ordinal: (_number: number): string => {
    return '-lea';
  },
  currency: {
    symbol: 'lei',
    position: 'suffix',
    code: 'RON',
    spaceBetween: true,
  },
};
