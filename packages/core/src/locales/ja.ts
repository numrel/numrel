import type { LocaleConfig } from '../types';

/**
 * 🇯🇵 Japanese - Japan (ja)
 *
 * @example
 * ```ts
 * import { ja } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(ja);
 * const japanese = n.locale('ja');
 *
 * japanese(1234567).format('0,0')     // → '1,234,567'
 * japanese(1000).format('$0,0')       // → '¥1,000'
 * japanese(1).format('0o')            // → '1番'
 * japanese(1000).format('0a')         // → '1千'
 * japanese(1000000).format('0a')      // → '1百万'
 * ```
 *
 * @remarks
 * - Thousands separator: `,` (comma)
 * - Decimal separator: `.` (dot)
 * - Currency: `¥` JPY (prefix, no space)
 * - Ordinals: 番 (ban)
 * - Abbreviations: 千, 百万, 十億, 兆
 */
export const ja: LocaleConfig = {
  name: 'ja',
  delimiters: {
    thousands: ',',
    decimal: '.',
  },
  abbreviations: {
    thousand: '千', // sen
    million: '百万', // hyakuman
    billion: '十億', // jūoku
    trillion: '兆', // chō
  },
  ordinal: (_number: number): string => {
    // Japanese doesn't use ordinals the same way
    // Use 番 (ban) as general ordinal marker
    return '番';
  },
  currency: {
    symbol: '¥',
    position: 'prefix', // Japan: ¥1,000 (no decimals!)
    code: 'JPY',
    spaceBetween: false, // ¥1,000 → no space
  },
};
