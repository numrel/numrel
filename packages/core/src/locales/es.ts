import type { LocaleConfig } from '../types';

export const es: LocaleConfig = {
  name: 'es',
  delimiters: {
    thousands: '.', // Spain uses DOT for thousands
    decimal: ',', // Spain uses COMMA for decimal
  },
  abbreviations: {
    thousand: 'mil',
    million: 'mill',
    billion: 'bill',
    trillion: 'trill',
  },
  ordinal: (_number: number): string => {
    // Spanish: 1.º 2.º 3.º
    return '.º';
  },
  currency: {
    symbol: '€',
    position: 'suffix', // Spain: 1.000,00 €
    code: 'EUR',
    spaceBetween: true, // 1.000,00 € → space before €
  },
};
