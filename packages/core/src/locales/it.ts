import type { LocaleConfig } from '../types';

export const it: LocaleConfig = {
  name: 'it',
  delimiters: {
    thousands: '.', // Italy uses DOT for thousands
    decimal: ',', // Italy uses COMMA for decimal
  },
  abbreviations: {
    thousand: 'mila',
    million: 'Mln',
    billion: 'Mrd',
    trillion: 'Bln',
  },
  ordinal: (_number: number): string => {
    // Italian: 1° 2° 3°
    return '°';
  },
  currency: {
    symbol: '€',
    position: 'suffix', // Italy: 1.000,00 €
    code: 'EUR',
    spaceBetween: true, // 1.000,00 € → space
  },
};
