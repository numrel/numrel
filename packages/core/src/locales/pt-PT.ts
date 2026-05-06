import type { LocaleConfig } from '../types';

export const ptPT: LocaleConfig = {
  name: 'pt-PT',
  delimiters: {
    thousands: ' ', // Portugal uses SPACE (different from Brazil!)
    decimal: ',',
  },
  abbreviations: {
    thousand: 'mil',
    million: 'mi',
    billion: 'bi',
    trillion: 'tri',
  },
  ordinal: (_number: number): string => {
    return '.º';
  },
  currency: {
    symbol: '€',
    position: 'suffix',
    code: 'EUR',
    spaceBetween: true,
  },
};
