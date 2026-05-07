import type { LocaleConfig } from '../types';

/**
 * 🇰🇷 Korean - South Korea (ko)
 *
 * @example
 * ```ts
 * import { ko } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(ko);
 * const korean = n.locale('ko');
 *
 * korean(1234567).format('0,0')       // → '1,234,567'
 * korean(1000).format('$0,0')         // → '₩1,000'
 * korean(1).format('0o')              // → '1번째'
 * korean(1000).format('0a')           // → '1천'
 * ```
 *
 * @remarks
 * - Thousands separator: `,` (comma)
 * - Decimal separator: `.` (dot)
 * - Currency: `₩` KRW (prefix, no space)
 * - Ordinals: 번째 (beonjjae)
 * - Abbreviations: 천, 백만, 십억, 조
 */
export const ko: LocaleConfig = {
  name: 'ko',
  delimiters: {
    thousands: ',',
    decimal: '.',
  },
  abbreviations: {
    thousand: '천',
    million: '백만',
    billion: '십억',
    trillion: '조',
  },
  ordinal: (_number: number): string => {
    return '번째';
  },
  currency: {
    symbol: '₩',
    position: 'prefix',
    code: 'KRW',
    spaceBetween: false,
  },
};
