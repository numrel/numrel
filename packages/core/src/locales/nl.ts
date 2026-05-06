import type { LocaleConfig } from '../types';

export const nl: LocaleConfig = {
  name: 'nl',
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'k',
    million: 'mln',
    billion: 'mrd',
    trillion: 'bln',
  },
  ordinal: (_number: number): string => {
    return 'de';
  },
  currency: {
    symbol: '€',
    position: 'prefix', // Netherlands: € 1.000,00
    code: 'EUR',
    spaceBetween: true, // € 1.000,00 → space
  },
};
