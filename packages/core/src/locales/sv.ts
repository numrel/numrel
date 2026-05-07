import type { LocaleConfig } from '../types';

/**
 * 🇸🇪 Swedish - Sweden (sv)
 *
 * @example
 * ```ts
 * import { sv } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(sv);
 * const swedish = n.locale('sv');
 *
 * swedish(1234567.89).format('0,0.00')  // → '1 234 567,89'
 * swedish(1000).format('$0,0')          // → '1 000 kr'
 * swedish(1).format('0o')               // → '1:a'
 * swedish(3).format('0o')               // → '3:e'
 * ```
 *
 * @remarks
 * - Thousands separator: ` ` (space)
 * - Decimal separator: `,` (comma)
 * - Currency: `kr` SEK (suffix with space)
 * - Ordinals: :a for 1,2 and :e for others
 * - Abbreviations: tn, mn, md, bn
 */
export const sv: LocaleConfig = {
  name: 'sv',
  delimiters: {
    thousands: ' ',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'tn',
    million: 'mn',
    billion: 'md',
    trillion: 'bn',
  },
  ordinal: (number: number): string => {
    const mod10 = number % 10;

    if (mod10 === 1 || mod10 === 2) return ':a';

    return ':e';
  },
  currency: {
    symbol: 'kr',
    position: 'suffix',
    code: 'SEK',
    spaceBetween: true, // 1 234,56 kr → space
  },
};
