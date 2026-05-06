import type { LocaleConfig } from '../types';

export const ar: LocaleConfig = {
  name: 'ar',
  delimiters: {
    thousands: '٬', // Arabic thousands separator
    decimal: '٫', // Arabic decimal separator
  },
  abbreviations: {
    thousand: 'ألف',
    million: 'مليون',
    billion: 'مليار',
    trillion: 'تريليون',
  },
  ordinal: (_number: number): string => {
    return '.';
  },
  currency: {
    symbol: 'ر.س',
    position: 'suffix', // Arabic RTL: 1,000.00 ر.س
    code: 'SAR',
    spaceBetween: true, // 1,000.00 ر.س → space
  },
};
