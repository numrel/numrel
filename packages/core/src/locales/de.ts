import type { LocaleConfig } from '../types';

export const de: LocaleConfig = {
  name: 'de',
  delimiters: {
    thousands: '.', // Germany uses DOT for thousands
    decimal: ',', // Germany uses COMMA for decimal
  },
  abbreviations: {
    thousand: ' Tsd',
    million: ' Mio',
    billion: ' Mrd',
    trillion: ' Bio',
  },
  ordinal: (_number: number): string => {
    // German ordinals just add a dot
    // 1. 2. 3. 4.

    return '.';
  },
  currency: {
    symbol: '€',
    position: 'suffix', // Germany: 1.000,00 €
    code: 'EUR',
    spaceBetween: true, // 1.000,00 € → space before €
  },
};
