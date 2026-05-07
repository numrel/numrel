import type { LocaleConfig } from '../types';

/**
 * 🇩🇰 Danish - Denmark (da)
 *
 * @example
 * ```ts
 * import { da } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(da);
 * const danish = n.locale('da');
 *
 * danish(1234567.89).format('0,0.00')  // → '1.234.567,89'
 * danish(1000).format('$0,0')          // → 'kr.1.000'
 * danish(1).format('0o')               // → '1.'
 * danish(1000000).format('0a')         // → '1mio'
 * ```
 *
 * @remarks
 * - Thousands separator: `.` (dot)
 * - Decimal separator: `,` (comma)
 * - Currency: `kr.` DKK (prefix, no space)
 * - Ordinals: dot suffix
 * - Abbreviations: k, mio, mia, bio
 */
export const da: LocaleConfig = {
  name: 'da',
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'k',
    million: 'mio',
    billion: 'mia',
    trillion: 'bio',
  },
  ordinal: (_number: number): string => {
    return '.';
  },
  currency: {
    symbol: 'kr.',
    position: 'prefix',
    code: 'DKK',
    spaceBetween: false,
  },
};
