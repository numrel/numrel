import type { LocaleConfig } from '../types';

export const ro: LocaleConfig = {
  name: 'ro',
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'mii',
    million: 'mil',
    billion: 'mld',
    trillion: 'tril',
  },
  ordinal: (_number: number): string => {
    return '-lea';
  },
  currency: {
    symbol: 'lei',
    position: 'suffix',
    code: 'RON',
    spaceBetween: true,
  },
};
