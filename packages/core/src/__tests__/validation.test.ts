import { describe, it, expect } from 'vitest';

// Validations
import {
  isValidNumber,
  isInteger,
  isFloat,
  isPositive,
  isNegative,
  isZero,
  isFiniteNumber,
  isNaNNumber,
  greaterThan,
  greaterThanOrEqualTo,
  lessThan,
  lessThanOrEqualTo,
  equalTo,
  between,
} from '../validation';

describe('Validation', () => {
  // ─────────────────────────────────────────
  // isValidNumber
  // ─────────────────────────────────────────

  describe('isValidNumber()', () => {
    it('should return true for valid number', () => {
      expect(isValidNumber(1000)).toBe(true);
    });

    it('should return true for zero', () => {
      expect(isValidNumber(0)).toBe(true);
    });

    it('should return true for negative number', () => {
      expect(isValidNumber(-1000)).toBe(true);
    });

    it('should return true for float', () => {
      expect(isValidNumber(1.5)).toBe(true);
    });

    it('should return false for null', () => {
      expect(isValidNumber(null)).toBe(false);
    });
  });

  // ─────────────────────────────────────────
  // isInteger
  // ─────────────────────────────────────────

  describe('isInteger()', () => {
    it('should return true for integer', () => {
      expect(isInteger(1000)).toBe(true);
    });

    it('should return true for zero', () => {
      expect(isInteger(0)).toBe(true);
    });

    it('should return true for negative integer', () => {
      expect(isInteger(-1000)).toBe(true);
    });

    it('should return false for float', () => {
      expect(isInteger(1.5)).toBe(false);
    });
  });

  // ─────────────────────────────────────────
  // isFloat
  // ─────────────────────────────────────────

  describe('isFloat()', () => {
    it('should return true for float', () => {
      expect(isFloat(1.5)).toBe(true);
    });

    it('should return false for integer', () => {
      expect(isFloat(1000)).toBe(false);
    });

    it('should return false for zero', () => {
      expect(isFloat(0)).toBe(false);
    });
  });

  // ─────────────────────────────────────────
  // isPositive
  // ─────────────────────────────────────────

  describe('isPositive()', () => {
    it('should return true for positive number', () => {
      expect(isPositive(1000)).toBe(true);
    });

    it('should return false for zero', () => {
      expect(isPositive(0)).toBe(false);
    });

    it('should return false for negative number', () => {
      expect(isPositive(-1000)).toBe(false);
    });
  });

  // ─────────────────────────────────────────
  // isNegative
  // ─────────────────────────────────────────

  describe('isNegative()', () => {
    it('should return true for negative number', () => {
      expect(isNegative(-1000)).toBe(true);
    });

    it('should return false for zero', () => {
      expect(isNegative(0)).toBe(false);
    });

    it('should return false for positive number', () => {
      expect(isNegative(1000)).toBe(false);
    });
  });

  // ─────────────────────────────────────────
  // isZero
  // ─────────────────────────────────────────

  describe('isZero()', () => {
    it('should return true for zero', () => {
      expect(isZero(0)).toBe(true);
    });

    it('should return false for positive number', () => {
      expect(isZero(1000)).toBe(false);
    });

    it('should return false for negative number', () => {
      expect(isZero(-1000)).toBe(false);
    });
  });

  // ─────────────────────────────────────────
  // isFiniteNumber
  // ─────────────────────────────────────────

  describe('isFiniteNumber()', () => {
    it('should return true for finite number', () => {
      expect(isFiniteNumber(1000)).toBe(true);
    });

    it('should return false for Infinity', () => {
      expect(isFiniteNumber(Infinity)).toBe(false);
    });

    it('should return false for -Infinity', () => {
      expect(isFiniteNumber(-Infinity)).toBe(false);
    });

    it('should return false for NaN', () => {
      expect(isFiniteNumber(NaN)).toBe(false);
    });
  });

  // ─────────────────────────────────────────
  // isNaNNumber
  // ─────────────────────────────────────────

  describe('isNaNNumber()', () => {
    it('should return true for NaN', () => {
      expect(isNaNNumber(NaN)).toBe(true);
    });

    it('should return false for valid number', () => {
      expect(isNaNNumber(1000)).toBe(false);
    });

    it('should return false for zero', () => {
      expect(isNaNNumber(0)).toBe(false);
    });
  });

  // ─────────────────────────────────────────
  // Comparison
  // ─────────────────────────────────────────

  describe('greaterThan()', () => {
    it('should return true when a > b', () => {
      expect(greaterThan(10, 5)).toBe(true);
    });

    it('should return false when a === b', () => {
      expect(greaterThan(5, 5)).toBe(false);
    });

    it('should return false when a < b', () => {
      expect(greaterThan(3, 5)).toBe(false);
    });
  });

  describe('greaterThanOrEqualTo()', () => {
    it('should return true when a > b', () => {
      expect(greaterThanOrEqualTo(10, 5)).toBe(true);
    });

    it('should return true when a === b', () => {
      expect(greaterThanOrEqualTo(5, 5)).toBe(true);
    });

    it('should return false when a < b', () => {
      expect(greaterThanOrEqualTo(3, 5)).toBe(false);
    });
  });

  describe('lessThan()', () => {
    it('should return true when a < b', () => {
      expect(lessThan(3, 5)).toBe(true);
    });

    it('should return false when a === b', () => {
      expect(lessThan(5, 5)).toBe(false);
    });

    it('should return false when a > b', () => {
      expect(lessThan(10, 5)).toBe(false);
    });
  });

  describe('lessThanOrEqualTo()', () => {
    it('should return true when a < b', () => {
      expect(lessThanOrEqualTo(3, 5)).toBe(true);
    });

    it('should return true when a === b', () => {
      expect(lessThanOrEqualTo(5, 5)).toBe(true);
    });

    it('should return false when a > b', () => {
      expect(lessThanOrEqualTo(10, 5)).toBe(false);
    });
  });

  describe('equalTo()', () => {
    it('should return true when a === b', () => {
      expect(equalTo(5, 5)).toBe(true);
    });

    it('should return false when a !== b', () => {
      expect(equalTo(5, 10)).toBe(false);
    });
  });

  describe('between()', () => {
    it('should return true when value is between min and max', () => {
      expect(between(5, 1, 10)).toBe(true);
    });

    it('should return true when value equals min', () => {
      expect(between(1, 1, 10)).toBe(true);
    });

    it('should return true when value equals max', () => {
      expect(between(10, 1, 10)).toBe(true);
    });

    it('should return false when value is below min', () => {
      expect(between(0, 1, 10)).toBe(false);
    });

    it('should return false when value is above max', () => {
      expect(between(11, 1, 10)).toBe(false);
    });
  });
});
