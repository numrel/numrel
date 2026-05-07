import type { LocaleConfig } from '../types';

/**
 * 🇵🇹 Portuguese - Portugal (pt-PT)
 *
 * @example
 * ```ts
 * import { ptPT } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(ptPT);
 * const portuguese = n.locale('pt-PT');
 *
 * portuguese(1234567.89).format('0,0.00')  // → '1 234 567,89'
 * portuguese(1000).format('$0,0.00')       // → '1 000,00 €'
 * portuguese(1).format('0o')               // → '1.º'
 * portuguese(1000).format('0a')            // → '1mil'
 * ```
 *
 * @remarks
 * - Thousands separator: ` ` (space) ← different from pt-BR!
 * - Decimal separator: `,` (comma)
 * - Currency: `€` EUR (suffix with space)
 * - Ordinals: .º suffix
 * - pt-PT uses SPACE for thousands, pt-BR uses DOT!
 */
export const ptPT: LocaleConfig = {
  name: 'pt-PT',
  delimiters: {
    thousands: ' ', // Portugal uses SPACE (different from Brazil!)
    decimal: ',',
  },
  abbreviations: {
    thousand: 'mil',
    million: 'mi',
    billion: 'bi',
    trillion: 'tri',
  },
  ordinal: (_number: number): string => {
    return '.º';
  },
  currency: {
    symbol: '€',
    position: 'suffix',
    code: 'EUR',
    spaceBetween: true,
  },
};
