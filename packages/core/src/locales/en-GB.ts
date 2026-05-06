import type { LocaleConfig } from '../types';

export const enGB: LocaleConfig = {
  name: 'en-GB',
  delimiters: {
    thousands: ',',
    decimal: '.',
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'bn', // UK uses 'bn' not 'b'
    trillion: 'tn', // UK uses 'tn' not 't'
  },
  ordinal: (number: number): string => {
    const abs = Math.abs(number);
    const mod10 = abs % 10;
    const mod100 = abs % 100;

    if (mod100 >= 11 && mod100 <= 13) return 'th';

    if (mod10 === 1) return 'st';

    if (mod10 === 2) return 'nd';

    if (mod10 === 3) return 'rd';

    return 'th';
  },
  currency: {
    symbol: '£',
    position: 'prefix',
    code: 'GBP',
    spaceBetween: false, // £1,000.00 → no space
  },
};
