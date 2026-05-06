import type { LocaleConfig } from '../types';

export const cs: LocaleConfig = {
  name: 'cs',
  delimiters: {
    thousands: ' ',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'tis',
    million: 'mil',
    billion: 'mld',
    trillion: 'bil',
  },
  ordinal: (_number: number): string => {
    return '.';
  },
  currency: {
    symbol: 'Kč',
    position: 'suffix',
    code: 'CZK',
    spaceBetween: true,
  },
};
