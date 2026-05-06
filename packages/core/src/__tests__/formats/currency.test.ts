import { describe, it, expect } from 'vitest';

// Currency Format
import { formatCurrency } from '../../formats/currency';

// Locales
import { enUS } from '../../locales/en-US';

describe('formatCurrency()', () => {
  describe('basic currency formatting', () => {
    it('should format with dollar sign prefix', () => {
      expect(formatCurrency(1000, '$0,0', enUS)).toBe('$1,000');
    });

    it('should format with decimals', () => {
      expect(formatCurrency(1000, '$0,0.00', enUS)).toBe('$1,000.00');
    });

    it('should format without thousands', () => {
      expect(formatCurrency(1000, '$0', enUS)).toBe('$1000');
    });

    it('should format zero', () => {
      expect(formatCurrency(0, '$0,0.00', enUS)).toBe('$0.00');
    });

    // ✅ NEW - space between symbol and number (covers line 75)
    it('should format with space between symbol and number', () => {
      expect(formatCurrency(1000, '$ 0,0.00', enUS)).toBe('$ 1,000.00');
    });

    // ✅ NEW - currency code format
    it('should format with currency code', () => {
      expect(formatCurrency(1000, 'USD 0,0.00', enUS)).toBe('USD 1,000.00');
    });
  });

  describe('negative currency formatting', () => {
    it('should format negative with minus', () => {
      expect(formatCurrency(-1000, '$0,0.00', enUS)).toBe('-$1,000.00');
    });

    it('should format negative with brackets', () => {
      expect(formatCurrency(-1000, '($0,0.00)', enUS)).toBe('($1,000.00)');
    });

    // ✅ NEW - negative suffix currency (covers lines 92-93)
    it('should format negative suffix currency', () => {
      expect(formatCurrency(-1000, '0,0.00 $', enUS)).toBe('-1,000.00 $');
    });

    // ✅ NEW - negative with space prefix
    it('should format negative with space prefix symbol', () => {
      expect(formatCurrency(-1000, '$ 0,0.00', enUS)).toBe('-$ 1,000.00');
    });
  });

  describe('suffix currency formatting', () => {
    it('should format with symbol suffix', () => {
      expect(formatCurrency(1000, '0,0 $', enUS)).toBe('1,000 $');
    });

    it('should format suffix with decimals', () => {
      expect(formatCurrency(1000, '0,0.00 $', enUS)).toBe('1,000.00 $');
    });
  });

  describe('large currency amounts', () => {
    it('should format millions', () => {
      expect(formatCurrency(1000000, '$0,0.00', enUS)).toBe('$1,000,000.00');
    });

    it('should format billions', () => {
      expect(formatCurrency(1000000000, '$0,0.00', enUS)).toBe(
        '$1,000,000,000.00',
      );
    });
  });

  describe('negative currency edge cases', () => {
    it('should format negative suffix with locale suffix position', () => {
      const suffixLocale = {
        ...enUS,
        currency: {
          ...enUS.currency,
          position: 'suffix' as const,
          symbol: '€',
        },
      };
      expect(formatCurrency(-1000, '0,0.00€', suffixLocale)).toBe('-1,000.00€');
    });

    it('should format positive with suffix locale', () => {
      const suffixLocale = {
        ...enUS,
        currency: {
          ...enUS.currency,
          position: 'suffix' as const,
          symbol: '€',
        },
      };
      expect(formatCurrency(1000, '0,0.00€', suffixLocale)).toBe('1,000.00€');
    });
  });
});
