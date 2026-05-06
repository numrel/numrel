import { describe, it, expect } from 'vitest';

// Abbreviation Formatter
import { formatAbbreviation } from '../../formats/abbreviation';

// Locales
import { enUS } from '../../locales/en-US';

describe('formatAbbreviation()', () => {
  // ─────────────────────────────────────────
  // Basic Abbreviations
  // ─────────────────────────────────────────

  describe('basic abbreviations', () => {
    it('should format thousands as k', () => {
      expect(formatAbbreviation(1000, '0a', enUS)).toBe('1k');
    });

    it('should format millions as m', () => {
      expect(formatAbbreviation(1000000, '0a', enUS)).toBe('1m');
    });

    it('should format billions as b', () => {
      expect(formatAbbreviation(1000000000, '0a', enUS)).toBe('1b');
    });

    it('should format trillions as t', () => {
      expect(formatAbbreviation(1000000000000, '0a', enUS)).toBe('1t');
    });

    it('should not abbreviate below 1000', () => {
      expect(formatAbbreviation(999, '0a', enUS)).toBe('999');
    });

    it('should format zero', () => {
      expect(formatAbbreviation(0, '0a', enUS)).toBe('0');
    });
  });

  // ─────────────────────────────────────────
  // With Decimal Places
  // ─────────────────────────────────────────

  describe('with decimal places', () => {
    it('should format 1500 as 1.5k', () => {
      expect(formatAbbreviation(1500, '0.0a', enUS)).toBe('1.5k');
    });

    it('should format with 2 decimals', () => {
      expect(formatAbbreviation(1234567, '0.00a', enUS)).toBe('1.23m');
    });
  });

  // ─────────────────────────────────────────
  // Negative
  // ─────────────────────────────────────────

  describe('negative abbreviations', () => {
    it('should format negative thousands', () => {
      expect(formatAbbreviation(-1000, '0a', enUS)).toBe('-1k');
    });

    it('should format negative millions', () => {
      expect(formatAbbreviation(-1000000, '0a', enUS)).toBe('-1m');
    });
  });

  // ─────────────────────────────────────────
  // Long Form (new feature!)
  // ─────────────────────────────────────────

  describe('long form abbreviations', () => {
    it('should format thousand in long form', () => {
      expect(formatAbbreviation(1000, '0al', enUS)).toBe('1 thousand');
    });

    it('should format million in long form', () => {
      expect(formatAbbreviation(1000000, '0al', enUS)).toBe('1 million');
    });

    it('should format billion in long form', () => {
      expect(formatAbbreviation(1000000000, '0al', enUS)).toBe('1 billion');
    });
  });

  describe('long form edge cases', () => {
    it('should not abbreviate below 1000 in long form', () => {
      expect(formatAbbreviation(999, '0al', enUS)).toBe('999');
    });

    it('should format 500 with no long form suffix', () => {
      expect(formatAbbreviation(500, '0al', enUS)).toBe('500');
    });

    it('should format trillion in long form', () => {
      expect(formatAbbreviation(1000000000000, '0al', enUS)).toBe('1 trillion');
    });

    it('should format negative billion in long form', () => {
      expect(formatAbbreviation(-1000000000, '0al', enUS)).toBe('-1 billion');
    });
  });
});
