import { describe, it, expect } from 'vitest';

// Number Formatter
import { formatNumber } from '../../formats/number';

// Locale
import { enUS } from '../../locales/en-US';

// ✅ NEW - German locale for delimiter tests
const deLocale = {
  ...enUS,
  name: 'de',
  delimiters: { thousands: '.', decimal: ',' },
};

describe('formatNumber()', () => {
  describe('basic number formatting', () => {
    it('should format integer with no format', () => {
      expect(formatNumber(1000, '0', enUS)).toBe('1000');
    });

    it('should format with thousands separator', () => {
      expect(formatNumber(1000, '0,0', enUS)).toBe('1,000');
    });

    it('should format with decimal places', () => {
      expect(formatNumber(1000, '0.00', enUS)).toBe('1000.00');
    });

    it('should format with thousands and decimals', () => {
      expect(formatNumber(1000, '0,0.00', enUS)).toBe('1,000.00');
    });

    it('should format large numbers', () => {
      expect(formatNumber(1000000, '0,0', enUS)).toBe('1,000,000');
    });

    it('should format zero', () => {
      expect(formatNumber(0, '0,0', enUS)).toBe('0');
    });

    it('should format zero with decimals', () => {
      expect(formatNumber(0, '0.00', enUS)).toBe('0.00');
    });
  });

  describe('negative number formatting', () => {
    it('should format negative number', () => {
      expect(formatNumber(-1000, '0,0', enUS)).toBe('-1,000');
    });

    it('should format negative with decimals', () => {
      expect(formatNumber(-1000.5, '0,0.00', enUS)).toBe('-1,000.50');
    });

    it('should format negative with brackets', () => {
      expect(formatNumber(-1000, '(0,0)', enUS)).toBe('(1,000)');
    });

    // ✅ NEW - negative with brackets and decimals
    it('should format negative with brackets and decimals', () => {
      expect(formatNumber(-1000.5, '(0,0.00)', enUS)).toBe('(1,000.50)');
    });
  });

  describe('signed number formatting', () => {
    it('should show + for positive numbers', () => {
      expect(formatNumber(1000, '+0,0', enUS)).toBe('+1,000');
    });

    it('should show - for negative numbers', () => {
      expect(formatNumber(-1000, '+0,0', enUS)).toBe('-1,000');
    });

    it('should show + for zero', () => {
      expect(formatNumber(0, '+0', enUS)).toBe('+0');
    });
  });

  describe('decimal places', () => {
    it('should format with 1 decimal', () => {
      expect(formatNumber(1000.5, '0.0', enUS)).toBe('1000.5');
    });

    it('should format with 3 decimals', () => {
      expect(formatNumber(1000.555, '0.000', enUS)).toBe('1000.555');
    });

    it('should format with 4 decimals', () => {
      expect(formatNumber(1000.5555, '0.0000', enUS)).toBe('1000.5555');
    });

    it('should pad decimals with zeros', () => {
      expect(formatNumber(1000.5, '0.000', enUS)).toBe('1000.500');
    });
  });

  // ✅ NEW - Optional decimals (covers lines 147-164)
  describe('optional decimal formatting [0]', () => {
    it('should trim trailing zeros with optional format', () => {
      expect(formatNumber(1.5, '0[.00]', enUS)).toBe('1.5');
    });

    it('should remove decimal when no fraction', () => {
      expect(formatNumber(1, '0[.00]', enUS)).toBe('1');
    });

    it('should keep needed decimals', () => {
      expect(formatNumber(1.56, '0[.00]', enUS)).toBe('1.56');
    });

    it('should handle optional decimals with thousands', () => {
      expect(formatNumber(1000.5, '0,0[.00]', enUS)).toBe('1,000.5');
    });

    it('should handle optional decimals with zero value', () => {
      expect(formatNumber(0, '0[.00]', enUS)).toBe('0');
    });
  });

  // ✅ NEW - Non-US locale delimiter (covers lines 58-59)
  describe('locale specific delimiters', () => {
    it('should use locale thousands delimiter', () => {
      expect(formatNumber(1000, '0,0', deLocale)).toBe('1.000');
    });

    it('should use locale decimal delimiter', () => {
      expect(formatNumber(1000.5, '0,0.00', deLocale)).toBe('1.000,50');
    });

    it('should use locale decimal without thousands', () => {
      expect(formatNumber(1.5, '0.00', deLocale)).toBe('1,50');
    });
  });

  describe('edge cases', () => {
    it('should handle very large numbers', () => {
      expect(formatNumber(1000000000, '0,0', enUS)).toBe('1,000,000,000');
    });

    it('should handle very small decimals', () => {
      expect(formatNumber(0.0001, '0.0000', enUS)).toBe('0.0001');
    });

    it('should handle negative zero', () => {
      expect(formatNumber(-0, '0,0', enUS)).toBe('0');
    });
  });

  describe('optional decimal edge cases', () => {
    it('should remove decimal point entirely when no fraction', () => {
      expect(formatNumber(1000, '0[.00]', enUS)).toBe('1000');
    });

    it('should handle optional with exact decimals', () => {
      expect(formatNumber(1.1, '0[.00]', enUS)).toBe('1.1');
    });

    it('should handle optional decimals with thousands separator', () => {
      expect(formatNumber(1000, '0,0[.00]', enUS)).toBe('1,000');
    });

    it('should keep decimals when present in optional format', () => {
      expect(formatNumber(1000.55, '0,0[.00]', enUS)).toBe('1,000.55');
    });
  });
});
