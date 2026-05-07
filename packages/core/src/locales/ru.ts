import type { LocaleConfig } from '../types';

/**
 * 🇷🇺 Russian - Russia (ru)
 *
 * @example
 * ```ts
 * import { ru } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(ru);
 * const russian = n.locale('ru');
 *
 * russian(1234567.89).format('0,0.00')  // → '1 234 567,89'
 * russian(1000).format('$0,0.00')       // → '1 000,00 ₽'
 * russian(1).format('0o')               // → '1-й'
 * russian(1000).format('0a')            // → '1тыс'
 * russian(1000000).format('0a')         // → '1млн'
 * ```
 *
 * @remarks
 * - Thousands separator: ` ` (space)
 * - Decimal separator: `,` (comma)
 * - Currency: `₽` RUB (suffix with space)
 * - Ordinals: -й suffix
 * - Abbreviations: тыс, млн, млрд, трлн
 */
export const ru: LocaleConfig = {
  name: 'ru',
  delimiters: {
    thousands: ' ', // Russia uses SPACE for thousands
    decimal: ',', // Russia uses COMMA for decimal
  },
  abbreviations: {
    thousand: 'тыс',
    million: 'млн',
    billion: 'млрд',
    trillion: 'трлн',
  },
  ordinal: (_number: number): string => {
    // Russian ordinals are complex
    // Simplified version
    return '-й';
  },
  currency: {
    symbol: '₽',
    position: 'suffix', // Russia: 1 000,00 ₽
    code: 'RUB',
    spaceBetween: true, // 1 000,00 ₽ → space
  },
};
