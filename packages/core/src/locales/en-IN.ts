import type { LocaleConfig } from '../types';

export const enIN: LocaleConfig = {
  name: 'en-IN',
  delimiters: {
    thousands: ',',
    decimal: '.',
  },
  abbreviations: {
    thousand: 'K',
    million: 'M',
    billion: 'B',
    trillion: 'T',
  },
  ordinal: (number: number): string => {
    // Same as en-US
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
    symbol: '₹',
    position: 'prefix', // India: ₹1,00,000.00
    code: 'INR',
    spaceBetween: false, // ₹1,000.00 → no space
  },
};
