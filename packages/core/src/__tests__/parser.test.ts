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
});
