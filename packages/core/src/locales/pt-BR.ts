import type { LocaleConfig } from '../types';

export const ptBR: LocaleConfig = {
  name: 'pt-BR',
  delimiters: {
    thousands: '.', // Brazil uses DOT for thousands
    decimal: ',', // Brazil uses COMMA for decimal
  },
  abbreviations: {
    thousand: 'mil',
    million: 'mi',
    billion: 'bi',
    trillion: 'tri',
  },
  ordinal: (_number: number): string => {
    // Portuguese: 1.º 2.º 3.º
    return '.º';
  },
  currency: {
    symbol: 'R$',
    position: 'prefix', // Brazil: R$ 1.000,00
    code: 'BRL',
    spaceBetween: false, // R$1.000,00 → no space
  },
};
