import type { LocaleConfig } from '../types';

/**
 * 🇺🇦 Ukrainian - Ukraine (uk)
 *
 * @example
 * ```ts
 * import { uk } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(uk);
 * const ukrainian = n.locale('uk');
 *
 * ukrainian(1234567.89).format('0,0.00')  // → '1 234 567,89'
 * ukrainian(1000).format('$0,0.00')       // → '1 000,00 ₴'
 * ukrainian(1).format('0o')               // → '1-й'
 * ukrainian(1000).format('0a')            // → '1тис'
 * ukrainian(1000000).format('0a')         // → '1млн'
 * ```
 *
 * @remarks
 * - Thousands separator: ` ` (space)
 * - Decimal separator: `,` (comma)
 * - Currency: `₴` UAH (suffix with space)
 * - Ordinals: -й suffix
 * - Abbreviations: тис, млн, млрд, трлн
 */
export const uk: LocaleConfig = {
  name: 'uk',
  delimiters: {
    thousands: ' ',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'тис',
    million: 'млн',
    billion: 'млрд',
    trillion: 'трлн',
  },
  ordinal: (_number: number): string => {
    return '-й';
  },
  currency: {
    symbol: '₴',
    position: 'suffix',
    code: 'UAH',
    spaceBetween: true,
  },
};
