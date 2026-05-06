import { describe, it, expect } from 'vitest';

// Currency Format
import { formatCurrency } from '../../formats/currency';

// Locales
import { enUS } from '../../locales/en-US';

describe('formatCurrency()', () => {
  // ─────────────────────────────────────────
  // Basic Currency
  // ─────────────────────────────────────────

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
  });

  // ─────────────────────────────────────────
  // Negative Currency
  // ─────────────────────────────────────────

  describe('negative currency formatting', () => {
    it('should format negative with minus', () => {
      expect(formatCurrency(-1000, '$0,0.00', enUS)).toBe('-$1,000.00');
    });

    it('should format negative with brackets', () => {
      expect(formatCurrency(-1000, '($0,0.00)', enUS)).toBe('($1,000.00)');
    });
  });

  // ─────────────────────────────────────────
  // Suffix Currency
  // ─────────────────────────────────────────

  describe('suffix currency formatting', () => {
    it('should format with symbol suffix', () => {
      expect(formatCurrency(1000, '0,0 $', enUS)).toBe('1,000 $');
    });

    it('should format suffix with decimals', () => {
      expect(formatCurrency(1000, '0,0.00 $', enUS)).toBe('1,000.00 $');
    });
  });

  // ─────────────────────────────────────────
  // Large Numbers
  // ─────────────────────────────────────────

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
});
