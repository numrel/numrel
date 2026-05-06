import type { LocaleConfig } from '../types';

export const tr: LocaleConfig = {
  name: 'tr',
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'B',
    million: 'Mn',
    billion: 'Mr',
    trillion: 'Tr',
  },
  ordinal: (number: number): string => {
    // Turkish ordinals based on vowel harmony
    // Simplified version
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return "'inci";

    if (lastDigit === 1) return "'inci";

    if (lastDigit === 2) return "'nci";

    if (lastDigit === 3) return "'üncü";

    if (lastDigit === 4) return "'üncü";

    if (lastDigit === 5) return "'inci";

    if (lastDigit === 6) return "'ncı";

    if (lastDigit === 7) return "'nci";

    if (lastDigit === 8) return "'inci";

    if (lastDigit === 9) return "'uncu";

    return "'uncu";
  },
  currency: {
    symbol: '₺',
    position: 'prefix',
    code: 'TRY',
    spaceBetween: false, // ₺1.000 → no space
  },
};
