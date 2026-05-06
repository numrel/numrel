import type { LocaleConfig } from '../types';

export const ru: LocaleConfig = {
  name: 'ru',
  delimiters: {
    thousands: ' ', // Russia uses SPACE for thousands
    decimal: ',', // Russia uses COMMA for decimal
  },
  abbreviations: {
    thousand: 'тыс',
    million: 'млн',
    billion: 'млрд',
    trillion: 'трлн',
  },
  ordinal: (_number: number): string => {
    // Russian ordinals are complex
    // Simplified version
    return '-й';
  },
  currency: {
    symbol: '₽',
    position: 'suffix', // Russia: 1 000,00 ₽
    code: 'RUB',
    spaceBetween: true, // 1 000,00 ₽ → space
  },
};
