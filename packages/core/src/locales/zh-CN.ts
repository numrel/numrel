import type { LocaleConfig } from '../types';

/**
 * 🇨🇳 Chinese Simplified - China (zh-CN)
 *
 * @example
 * ```ts
 * import { zhCN } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(zhCN);
 * const chinese = n.locale('zh-CN');
 *
 * chinese(1234567).format('0,0')      // → '1,234,567'
 * chinese(1000).format('$0,0')        // → '¥1,000'
 * chinese(1000).format('0a')          // → '1千'
 * chinese(1000000).format('0a')       // → '1百万'
 * ```
 *
 * @remarks
 * - Thousands separator: `,` (comma)
 * - Decimal separator: `.` (dot)
 * - Currency: `¥` CNY (prefix, no space)
 * - Abbreviations: 千, 百万, 十亿, 万亿
 */
export const zhCN: LocaleConfig = {
  name: 'zh-CN',
  delimiters: {
    thousands: ',',
    decimal: '.',
  },
  abbreviations: {
    thousand: '千',
    million: '百万',
    billion: '十亿',
    trillion: '万亿',
  },
  ordinal: (_number: number): string => {
    // Chinese ordinal uses 第 prefix but
    // as suffix marker we use simple '.'
    return '.';
  },
  currency: {
    symbol: '¥',
    position: 'prefix',
    code: 'CNY',
    spaceBetween: false,
  },
};
