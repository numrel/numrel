import type { LocaleConfig } from '../types';

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
