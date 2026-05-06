import type { LocaleConfig } from '../types';

export const pl: LocaleConfig = {
  name: 'pl',
  delimiters: {
    thousands: ' ',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'tys',
    million: 'mln',
    billion: 'mld',
    trillion: 'bln',
  },
  ordinal: (_number: number): string => {
    return '.';
  },
  currency: {
    symbol: 'zł',
    position: 'suffix', // Poland: 1 000,00 zł
    code: 'PLN',
    spaceBetween: true, // 1 000,00 zł → space
  },
};
