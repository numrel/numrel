import { describe, expect, it } from 'vitest';

// Parser
import { parseInput } from '../parser';

// enUS Locale
import { enUS } from '../locales/en-US';

describe('Parser - parseInput()', () => {
  // ─────────────────────────────────────────
  // Null / Undefined
  // ─────────────────────────────────────────

  describe('null and undefined handling', () => {
    it('should return null for null input', () => {
      expect(parseInput(null, enUS)).toBeNull();
    });

    it('should return null for undefined input', () => {
      expect(parseInput(undefined, enUS)).toBeNull();
    });
  });

  // ─────────────────────────────────────────
  // Numbers
  // ─────────────────────────────────────────

  describe('number inputs', () => {
    it('should return the number as-is for valid number', () => {
      expect(parseInput(1000, enUS)).toBe(1000);
    });

    it('should return 0 for zero', () => {
      expect(parseInput(0, enUS)).toBe(0);
    });

    it('should return negative numbers correctly', () => {
      expect(parseInput(-1000, enUS)).toBe(-1000);
    });

    it('should return float numbers correctly', () => {
      expect(parseInput(1.5, enUS)).toBe(1.5);
    });

    it('should return null for NaN', () => {
      expect(parseInput(NaN, enUS)).toBeNull();
    });

    it('should return Infinity as-is', () => {
      expect(parseInput(Infinity, enUS)).toBe(Infinity);
    });

    it('should return -Infinity as-is', () => {
      expect(parseInput(-Infinity, enUS)).toBe(-Infinity);
    });
  });

  // ─────────────────────────────────────────
  // Boolean
  // ─────────────────────────────────────────

  describe('boolean inputs', () => {
    it('should return null for true', () => {
      expect(parseInput(true, enUS)).toBeNull();
    });

    it('should return null for false', () => {
      expect(parseInput(false, enUS)).toBeNull();
    });
  });

  // ─────────────────────────────────────────
  // String inputs
  // ─────────────────────────────────────────

  describe('string inputs', () => {
    it('should return null for empty string', () => {
      expect(parseInput('', enUS)).toBeNull();
    });

    it('should return null for whitespace string', () => {
      expect(parseInput('   ', enUS)).toBeNull();
    });

    it('should parse basic number string', () => {
      expect(parseInput('1000', enUS)).toBe(1000);
    });

    it('should parse number string with thousands separator', () => {
      expect(parseInput('1,000', enUS)).toBe(1000);
    });

    it('should parse number string with decimal', () => {
      expect(parseInput('1,000.50', enUS)).toBe(1000.5);
    });

    it('should parse negative number string', () => {
      expect(parseInput('-1000', enUS)).toBe(-1000);
    });

    it('should parse currency string', () => {
      expect(parseInput('$1,000', enUS)).toBe(1000);
    });

    it('should parse currency string with decimals', () => {
      expect(parseInput('$1,000.50', enUS)).toBe(1000.5);
    });

    it('should parse percentage string', () => {
      expect(parseInput('50%', enUS)).toBe(0.5);
    });

    it('should parse percentage string with decimal', () => {
      expect(parseInput('12.5%', enUS)).toBe(0.125);
    });

    it('should return null for non-numeric string', () => {
      expect(parseInput('abc', enUS)).toBeNull();
    });

    it('should parse abbreviated thousands', () => {
      expect(parseInput('1k', enUS)).toBe(1000);
    });

    it('should parse abbreviated millions', () => {
      expect(parseInput('1m', enUS)).toBe(1000000);
    });

    it('should parse abbreviated billions', () => {
      expect(parseInput('1b', enUS)).toBe(1000000000);
    });

    it('should parse abbreviated trillions', () => {
      expect(parseInput('1t', enUS)).toBe(1000000000000);
    });

    it('should parse abbreviated with decimals', () => {
      expect(parseInput('1.5k', enUS)).toBe(1500);
    });
  });

  // ✅ NEW - covers lines 43-49 (locale specific string parsing)
  describe('locale specific parsing', () => {
    const deLocale = {
      ...enUS,
      name: 'de',
      delimiters: { thousands: '.', decimal: ',' },
      currency: { ...enUS.currency, symbol: '€' },
    };

    it('should parse German formatted number', () => {
      expect(parseInput('1.000', deLocale)).toBe(1000);
    });

    it('should parse German decimal', () => {
      expect(parseInput('1,50', deLocale)).toBe(1.5);
    });

    it('should parse German currency', () => {
      expect(parseInput('€1.000', deLocale)).toBe(1000);
    });
  });

  // ✅ NEW - covers lines 51-55 (percentage edge cases)
  describe('percentage parsing edge cases', () => {
    it('should parse 0%', () => {
      expect(parseInput('0%', enUS)).toBe(0);
    });

    it('should parse 100%', () => {
      expect(parseInput('100%', enUS)).toBe(1);
    });

    it('should parse negative percentage', () => {
      expect(parseInput('-50%', enUS)).toBe(-0.5);
    });
  });

  // ✅ NEW - covers lines 68-69 (NumrelInstance input)
  describe('NumrelInstance as input', () => {
    it('should extract value from NumrelInstance', () => {
      const mockInstance = {
        value: () => 1000,
      };
      expect(parseInput(mockInstance, enUS)).toBe(1000);
    });

    it('should handle NumrelInstance returning null', () => {
      const mockInstance = {
        value: () => null,
      };
      expect(parseInput(mockInstance, enUS)).toBeNull();
    });
  });

  // ✅ NEW - abbreviation edge cases
  describe('abbreviation parsing edge cases', () => {
    it('should parse 1.5k', () => {
      expect(parseInput('1.5k', enUS)).toBe(1500);
    });

    it('should parse 2.5m', () => {
      expect(parseInput('2.5m', enUS)).toBe(2500000);
    });

    it('should parse 1.5b', () => {
      expect(parseInput('1.5b', enUS)).toBe(1500000000);
    });

    it('should parse 1.5t', () => {
      expect(parseInput('1.5t', enUS)).toBe(1500000000000);
    });

    // ✅ Uppercase abbreviations
    it('should parse uppercase K', () => {
      expect(parseInput('1K', enUS)).toBe(1000);
    });

    it('should parse uppercase M', () => {
      expect(parseInput('1M', enUS)).toBe(1000000);
    });
  });

  describe('negative string parsing edge cases', () => {
    it('should parse negative percentage string', () => {
      expect(parseInput('-25%', enUS)).toBe(-0.25);
    });

    it('should parse negative currency string', () => {
      expect(parseInput('-$1,000', enUS)).toBe(-1000);
    });

    it('should parse string with only decimal', () => {
      expect(parseInput('.5', enUS)).toBe(0.5);
    });

    it('should parse negative abbreviated', () => {
      expect(parseInput('-1.5k', enUS)).toBe(-1500);
    });
  });
});
