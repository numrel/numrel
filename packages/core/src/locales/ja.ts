import type { LocaleConfig } from '../types';

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
