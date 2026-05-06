import type { LocaleConfig } from '../types';

export const hi: LocaleConfig = {
  name: 'hi',
  delimiters: {
    thousands: ',',
    decimal: '.',
  },
  abbreviations: {
    thousand: 'हज़ार',
    million: 'दस लाख',
    billion: 'अरब',
    trillion: 'खरब',
  },
  ordinal: (_number: number): string => {
    return 'वां';
  },
  currency: {
    symbol: '₹',
    position: 'prefix',
    code: 'INR',
    spaceBetween: false,
  },
};
