import type { LocaleConfig } from '../types';

export const hu: LocaleConfig = {
  name: 'hu',
  delimiters: {
    thousands: ' ',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'E',
    million: 'M',
    billion: 'Mrd',
    trillion: 'T',
  },
  ordinal: (_number: number): string => {
    return '.';
  },
  currency: {
    symbol: 'Ft',
    position: 'suffix',
    code: 'HUF',
    spaceBetween: true,
  },
};
