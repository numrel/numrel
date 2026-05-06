import type { LocaleConfig } from '../types';

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
