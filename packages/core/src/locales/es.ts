import type { LocaleConfig } from '../types';

/**
 * 🇪🇸 Spanish - Spain (es)
 *
 * @example
 * ```ts
 * import { es } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(es);
 * const spanish = n.locale('es');
 *
 * spanish(1234567.89).format('0,0.00')  // → '1.234.567,89'
 * spanish(1000).format('$0,0.00')       // → '1.000,00 €'
 * spanish(1).format('0o')               // → '1.º'
 * spanish(1000).format('0a')            // → '1mil'
 * ```
 *
 * @remarks
 * - Thousands separator: `.` (dot)
 * - Decimal separator: `,` (comma)
 * - Currency: `€` EUR (suffix with space)
 * - Ordinals: 1.º 2.º 3.º (Spanish style)
 */
export const es: LocaleConfig = {
  name: 'es',
  delimiters: {
    thousands: '.', // Spain uses DOT for thousands
    decimal: ',', // Spain uses COMMA for decimal
  },
  abbreviations: {
    thousand: 'mil',
    million: 'mill',
    billion: 'bill',
    trillion: 'trill',
  },
  ordinal: (_number: number): string => {
    // Spanish: 1.º 2.º 3.º
    return '.º';
  },
  currency: {
    symbol: '€',
    position: 'suffix', // Spain: 1.000,00 €
    code: 'EUR',
    spaceBetween: true, // 1.000,00 € → space before €
  },
};
