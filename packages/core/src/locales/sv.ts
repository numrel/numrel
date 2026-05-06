import type { LocaleConfig } from '../types';

export const sv: LocaleConfig = {
  name: 'sv',
  delimiters: {
    thousands: ' ',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'tn',
    million: 'mn',
    billion: 'md',
    trillion: 'bn',
  },
  ordinal: (number: number): string => {
    const mod10 = number % 10;

    if (mod10 === 1 || mod10 === 2) return ':a';

    return ':e';
  },
  currency: {
    symbol: 'kr',
    position: 'suffix',
    code: 'SEK',
    spaceBetween: true, // 1 234,56 kr → space
  },
};
