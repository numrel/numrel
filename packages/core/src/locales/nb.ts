import type { LocaleConfig } from '../types';

export const nb: LocaleConfig = {
  name: 'nb',
  delimiters: {
    thousands: ' ',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'k',
    million: 'mill',
    billion: 'mrd',
    trillion: 'bill',
  },
  ordinal: (_number: number): string => {
    return '.';
  },
  currency: {
    symbol: 'kr',
    position: 'prefix',
    code: 'NOK',
    spaceBetween: false,
  },
};
