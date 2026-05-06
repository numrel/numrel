import type { LocaleConfig } from '../types';

export const fr: LocaleConfig = {
  name: 'fr',
  delimiters: {
    thousands: ' ', // France uses SPACE for thousands
    decimal: ',', // France uses COMMA for decimal
  },
  abbreviations: {
    thousand: 'k',
    million: 'M', // French uses uppercase M
    billion: 'Md',
    trillion: 'Bn',
  },
  ordinal: (number: number): string => {
    // French: 1er, 2e, 3e, 4e
    return number === 1 ? 'er' : 'e';
  },
  currency: {
    symbol: '€',
    position: 'suffix', // France: 1 000,00 €
    code: 'EUR',
    spaceBetween: true, // 1 000,00 € → space before €
  },
};
