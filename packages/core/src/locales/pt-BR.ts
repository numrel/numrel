import type { LocaleConfig } from '../types';

/**
 * 🇧🇷 Portuguese - Brazil (pt-BR)
 *
 * @example
 * ```ts
 * import { ptBR } from '@numrel/core';
 *
 * const n = createNumrel();
 * n.registerLocale(ptBR);
 * const brazil = n.locale('pt-BR');
 *
 * brazil(1234567.89).format('0,0.00')  // → '1.234.567,89'
 * brazil(1000).format('$0,0.00')       // → 'R$1.000,00'
 * brazil(1).format('0o')               // → '1.º'
 * brazil(1000).format('0a')            // → '1mil'
 * ```
 *
 * @remarks
 * - Thousands separator: `.` (dot)
 * - Decimal separator: `,` (comma)
 * - Currency: `R$` BRL (prefix, no space)
 * - Ordinals: 1.º 2.º 3.º
 * - Different from pt-PT (Portugal uses space for thousands)
 */
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
