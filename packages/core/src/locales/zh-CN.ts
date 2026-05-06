import type { LocaleConfig } from '../types';

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
