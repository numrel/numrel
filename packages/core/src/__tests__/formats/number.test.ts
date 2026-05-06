import { describe, it, expect } from 'vitest';

// Number Formatter
import { formatNumber } from '../../formats/number';

// Locale
import { enUS } from '../../locales/en-US';

describe('formatNumber()', () => {
  // ─────────────────────────────────────────
  // Basic Numbers
  // ─────────────────────────────────────────

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

  // ─────────────────────────────────────────
  // Negative Numbers
  // ─────────────────────────────────────────

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
  });

  // ─────────────────────────────────────────
  // Signed Numbers
  // ─────────────────────────────────────────

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

  // ─────────────────────────────────────────
  // Decimal Places
  // ─────────────────────────────────────────

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

  // ─────────────────────────────────────────
  // Edge Cases
  // ─────────────────────────────────────────

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
});
