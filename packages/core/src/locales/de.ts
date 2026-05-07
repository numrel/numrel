import type { LocaleConfig } from '../types';

/**
 * 🇩🇪 German - Germany (de)
 *
 * @example
 * ```ts
 * import { de } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(de);
 * const german = n.locale('de');
 *
 * german(1234567.89).format('0,0.00')  // → '1.234.567,89'
 * german(1000).format('$0,0.00')       // → '1.000,00 €'
 * german(1).format('0o')               // → '1.'
 * german(1000).format('0a')            // → '1 Tsd'
 * german(1000000).format('0a')         // → '1 Mio'
 * ```
 *
 * @remarks
 * - Thousands separator: `.` (dot)
 * - Decimal separator: `,` (comma)
 * - Currency: `€` EUR (suffix with space)
 * - Ordinals: 1. 2. 3. (dot suffix)
 * - Abbreviations: Tsd, Mio, Mrd, Bio
 */
export const de: LocaleConfig = {
  name: 'de',
  delimiters: {
    thousands: '.', // Germany uses DOT for thousands
    decimal: ',', // Germany uses COMMA for decimal
  },
  abbreviations: {
    thousand: ' Tsd',
    million: ' Mio',
    billion: ' Mrd',
    trillion: ' Bio',
  },
  ordinal: (_number: number): string => {
    // German ordinals just add a dot
    // 1. 2. 3. 4.

    return '.';
  },
  currency: {
    symbol: '€',
    position: 'suffix', // Germany: 1.000,00 €
    code: 'EUR',
    spaceBetween: true, // 1.000,00 € → space before €
  },
};
