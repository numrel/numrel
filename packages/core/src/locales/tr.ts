import type { LocaleConfig } from '../types';

/**
 * 🇹🇷 Turkish - Turkey (tr)
 *
 * @example
 * ```ts
 * import { tr } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(tr);
 * const turkish = n.locale('tr');
 *
 * turkish(1234567.89).format('0,0.00')  // → '1.234.567,89'
 * turkish(1000).format('$0,0')          // → '₺1.000'
 * turkish(1).format('0o')               // → "1'inci"
 * turkish(1000).format('0a')            // → '1B'
 * ```
 *
 * @remarks
 * - Thousands separator: `.` (dot)
 * - Decimal separator: `,` (comma)
 * - Currency: `₺` TRY (prefix, no space)
 * - Ordinals: vowel harmony based (Turkish grammar)
 * - Abbreviations: B (bin), Mn, Mr, Tr
 */
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
