import type { LocaleConfig } from '../types';

/**
 * 🇫🇮 Finnish - Finland (fi)
 *
 * @example
 * ```ts
 * import { fi } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(fi);
 * const finnish = n.locale('fi');
 *
 * finnish(1234567.89).format('0,0.00')  // → '1 234 567,89'
 * finnish(1000).format('$0,0.00')       // → '1 000,00 €'
 * finnish(1).format('0o')               // → '1.'
 * finnish(1000000).format('0a')         // → '1milj'
 * ```
 *
 * @remarks
 * - Thousands separator: ` ` (space)
 * - Decimal separator: `,` (comma)
 * - Currency: `€` EUR (suffix with space)
 * - Ordinals: dot suffix
 * - Abbreviations: t, milj, mrd, bilj
 */
export const fi: LocaleConfig = {
  name: 'fi',
  delimiters: {
    thousands: ' ',
    decimal: ',',
  },
  abbreviations: {
    thousand: 't',
    million: 'milj',
    billion: 'mrd',
    trillion: 'bilj',
  },
  ordinal: (_number: number): string => {
    return '.';
  },
  currency: {
    symbol: '€',
    position: 'suffix', // Finland: 1 000,00 €
    code: 'EUR',
    spaceBetween: true,
  },
};
