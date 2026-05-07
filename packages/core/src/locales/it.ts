import type { LocaleConfig } from '../types';

/**
 * 🇮🇹 Italian - Italy (it)
 *
 * @example
 * ```ts
 * import { it } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(it);
 * const italian = n.locale('it');
 *
 * italian(1234567.89).format('0,0.00')  // → '1.234.567,89'
 * italian(1000).format('$0,0.00')       // → '1.000,00 €'
 * italian(1).format('0o')               // → '1°'
 * italian(1000000).format('0a')         // → '1Mln'
 * ```
 *
 * @remarks
 * - Thousands separator: `.` (dot)
 * - Decimal separator: `,` (comma)
 * - Currency: `€` EUR (suffix with space)
 * - Ordinals: 1° 2° 3° (degree symbol)
 * - Abbreviations: mila, Mln, Mrd, Bln
 */
export const it: LocaleConfig = {
  name: 'it',
  delimiters: {
    thousands: '.', // Italy uses DOT for thousands
    decimal: ',', // Italy uses COMMA for decimal
  },
  abbreviations: {
    thousand: 'mila',
    million: 'Mln',
    billion: 'Mrd',
    trillion: 'Bln',
  },
  ordinal: (_number: number): string => {
    // Italian: 1° 2° 3°
    return '°';
  },
  currency: {
    symbol: '€',
    position: 'suffix', // Italy: 1.000,00 €
    code: 'EUR',
    spaceBetween: true, // 1.000,00 € → space
  },
};
