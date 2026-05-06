import { describe, it, expect } from 'vitest';

// Ordinal Formatter
import { formatOrdinal } from '../../formats/ordinal';

// Locales
import { enUS } from '../../locales/en-US';

describe('formatOrdinal()', () => {
  // ─────────────────────────────────────────
  // Basic Ordinals
  // ─────────────────────────────────────────

  describe('basic ordinals', () => {
    it('should format 1 as 1st', () => {
      expect(formatOrdinal(1, '0o', enUS)).toBe('1st');
    });

    it('should format 2 as 2nd', () => {
      expect(formatOrdinal(2, '0o', enUS)).toBe('2nd');
    });

    it('should format 3 as 3rd', () => {
      expect(formatOrdinal(3, '0o', enUS)).toBe('3rd');
    });

    it('should format 4 as 4th', () => {
      expect(formatOrdinal(4, '0o', enUS)).toBe('4th');
    });

    it('should format 11 as 11th', () => {
      expect(formatOrdinal(11, '0o', enUS)).toBe('11th');
    });

    it('should format 12 as 12th', () => {
      expect(formatOrdinal(12, '0o', enUS)).toBe('12th');
    });

    it('should format 13 as 13th', () => {
      expect(formatOrdinal(13, '0o', enUS)).toBe('13th');
    });

    it('should format 21 as 21st', () => {
      expect(formatOrdinal(21, '0o', enUS)).toBe('21st');
    });

    it('should format 22 as 22nd', () => {
      expect(formatOrdinal(22, '0o', enUS)).toBe('22nd');
    });

    it('should format 100 as 100th', () => {
      expect(formatOrdinal(100, '0o', enUS)).toBe('100th');
    });
  });

  // ─────────────────────────────────────────
  // With Thousands
  // ─────────────────────────────────────────

  describe('with thousands separator', () => {
    it('should format 1000 as 1,000th', () => {
      expect(formatOrdinal(1000, '0,0o', enUS)).toBe('1,000th');
    });

    it('should format 1001 as 1,001st', () => {
      expect(formatOrdinal(1001, '0,0o', enUS)).toBe('1,001st');
    });
  });

  // ─────────────────────────────────────────
  // Negative
  // ─────────────────────────────────────────

  describe('negative ordinals', () => {
    it('should format negative ordinal', () => {
      expect(formatOrdinal(-1, '0o', enUS)).toBe('-1st');
    });
  });
});
