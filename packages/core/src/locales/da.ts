import type { LocaleConfig } from '../types';

export const da: LocaleConfig = {
  name: 'da',
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'k',
    million: 'mio',
    billion: 'mia',
    trillion: 'bio',
  },
  ordinal: (_number: number): string => {
    return '.';
  },
  currency: {
    symbol: 'kr.',
    position: 'prefix',
    code: 'DKK',
    spaceBetween: false,
  },
};
