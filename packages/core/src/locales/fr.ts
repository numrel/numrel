import type { LocaleConfig } from '../types';

/**
 * 🇫🇷 French - France (fr)
 *
 * @example
 * ```ts
 * import { fr } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(fr);
 * const french = n.locale('fr');
 *
 * french(1234567.89).format('0,0.00')  // → '1 234 567,89'
 * french(1000).format('$0,0.00')       // → '1 000,00 €'
 * french(1).format('0o')               // → '1er'
 * french(2).format('0o')               // → '2e'
 * french(1000000).format('0a')         // → '1M'
 * ```
 *
 * @remarks
 * - Thousands separator: ` ` (space)
 * - Decimal separator: `,` (comma)
 * - Currency: `€` EUR (suffix with space)
 * - Ordinals: 1er, 2e, 3e (French style)
 * - Million abbreviation: `M` (uppercase)
 */
export const fr: LocaleConfig = {
  name: 'fr',
  delimiters: {
    thousands: ' ', // France uses SPACE for thousands
    decimal: ',', // France uses COMMA for decimal
  },
  abbreviations: {
    thousand: 'k',
    million: 'M', // French uses uppercase M
    billion: 'Md',
    trillion: 'Bn',
  },
  ordinal: (number: number): string => {
    // French: 1er, 2e, 3e, 4e
    return number === 1 ? 'er' : 'e';
  },
  currency: {
    symbol: '€',
    position: 'suffix', // France: 1 000,00 €
    code: 'EUR',
    spaceBetween: true, // 1 000,00 € → space before €
  },
};
