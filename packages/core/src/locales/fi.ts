import type { LocaleConfig } from '../types';

export const fi: LocaleConfig = {
  name: 'fi',
  delimiters: {
    thousands: ' ',
    decimal: ',',
  },
  abbreviations: {
    thousand: 't',
    million: 'milj',
    billion: 'mrd',
    trillion: 'bilj',
  },
  ordinal: (_number: number): string => {
    return '.';
  },
  currency: {
    symbol: '€',
    position: 'suffix', // Finland: 1 000,00 €
    code: 'EUR',
    spaceBetween: true,
  },
};
