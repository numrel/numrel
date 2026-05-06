import { describe, it, expect } from 'vitest';

// Numrel Core Factory
import { numrel } from '../../core/factory';

describe('Numrel Core Instance', () => {
  // ─────────────────────────────────────────
  // value()
  // ─────────────────────────────────────────

  describe('value()', () => {
    it('should return numeric value', () => {
      expect(numrel(1000).value()).toBe(1000);
    });

    it('should return null for null input', () => {
      expect(numrel(null).value()).toBeNull();
    });

    it('should return null for undefined input', () => {
      expect(numrel(undefined).value()).toBeNull();
    });

    it('should return null for NaN', () => {
      expect(numrel(NaN).value()).toBeNull();
    });

    it('should return null for invalid string', () => {
      expect(numrel('abc').value()).toBeNull();
    });

    it('should return null for boolean true', () => {
      expect(numrel(true as never).value()).toBeNull();
    });

    it('should return null for boolean false', () => {
      expect(numrel(false as never).value()).toBeNull();
    });

    it('should return 0 for zero', () => {
      expect(numrel(0).value()).toBe(0);
    });

    it('should return negative number', () => {
      expect(numrel(-1000).value()).toBe(-1000);
    });

    it('should parse string number', () => {
      expect(numrel('1,000').value()).toBe(1000);
    });

    it('should parse currency string', () => {
      expect(numrel('$1,000').value()).toBe(1000);
    });
  });

  // ─────────────────────────────────────────
  // format()
  // ─────────────────────────────────────────

  describe('format()', () => {
    it('should format number', () => {
      expect(numrel(1000).format('0,0')).toBe('1,000');
    });

    it('should format with decimals', () => {
      expect(numrel(1000).format('0,0.00')).toBe('1,000.00');
    });

    it('should format currency', () => {
      expect(numrel(1000).format('$0,0.00')).toBe('$1,000.00');
    });

    it('should format percentage', () => {
      expect(numrel(0.5).format('0%')).toBe('50%');
    });

    it('should format bytes', () => {
      expect(numrel(1000).format('0b')).toBe('1 KB');
    });

    it('should format time', () => {
      expect(numrel(3661).format('00:00:00')).toBe('01:01:01');
    });

    it('should format ordinal', () => {
      expect(numrel(1).format('0o')).toBe('1st');
    });

    it('should format abbreviation', () => {
      expect(numrel(1000).format('0a')).toBe('1k');
    });

    it('should return nullFormat for null', () => {
      expect(numrel(null).format('0,0')).toBe('');
    });

    it('should return nanFormat for NaN', () => {
      expect(numrel(NaN).format('0,0')).toBe('NaN');
    });

    it('should return infinityFormat for Infinity', () => {
      expect(numrel(Infinity).format('0,0')).toBe('∞');
    });

    it('should return -infinityFormat for -Infinity', () => {
      expect(numrel(-Infinity).format('0,0')).toBe('-∞');
    });
  });

  // ─────────────────────────────────────────
  // Math Operations - Chaining
  // ─────────────────────────────────────────

  describe('math operations chaining', () => {
    it('should chain add operations', () => {
      expect(numrel(10).add(5).add(5).value()).toBe(20);
    });

    it('should chain mixed operations', () => {
      expect(numrel(10).add(5).subtract(3).multiply(2).value()).toBe(24);
    });

    it('should be immutable', () => {
      const n = numrel(10);
      const n2 = n.add(5);
      expect(n.value()).toBe(10); // original unchanged
      expect(n2.value()).toBe(15); // new instance
    });

    it('should handle null in chain', () => {
      expect(numrel(null).add(5).value()).toBeNull();
    });

    it('should fix floating point in chain', () => {
      expect(numrel(0.1).add(0.2).value()).toBe(0.3);
    });
  });

  // ─────────────────────────────────────────
  // Validation Methods
  // ─────────────────────────────────────────

  describe('validation methods', () => {
    it('isValid() → true for valid number', () => {
      expect(numrel(1000).isValid()).toBe(true);
    });

    it('isValid() → false for null', () => {
      expect(numrel(null).isValid()).toBe(false);
    });

    it('isInteger() → true for integer', () => {
      expect(numrel(1000).isInteger()).toBe(true);
    });

    it('isInteger() → false for float', () => {
      expect(numrel(1.5).isInteger()).toBe(false);
    });

    it('isFloat() → true for float', () => {
      expect(numrel(1.5).isFloat()).toBe(true);
    });

    it('isPositive() → true for positive', () => {
      expect(numrel(1000).isPositive()).toBe(true);
    });

    it('isPositive() → false for negative', () => {
      expect(numrel(-1000).isPositive()).toBe(false);
    });

    it('isNegative() → true for negative', () => {
      expect(numrel(-1000).isNegative()).toBe(true);
    });

    it('isZero() → true for zero', () => {
      expect(numrel(0).isZero()).toBe(true);
    });

    it('isFinite() → true for finite', () => {
      expect(numrel(1000).isFinite()).toBe(true);
    });

    it('isFinite() → false for Infinity', () => {
      expect(numrel(Infinity).isFinite()).toBe(false);
    });

    // ✅ FIXED TESTS - null and NaN are different!
    it('isNaN() → false for null (null is not NaN!)', () => {
      expect(numrel(null).isNaN()).toBe(false);
    });

    it('isNaN() → true for actual NaN', () => {
      expect(numrel(NaN).isNaN()).toBe(true);
    });

    it('isNaN() → false for valid number', () => {
      expect(numrel(1000).isNaN()).toBe(false);
    });

    it('isValid() → false for NaN', () => {
      expect(numrel(NaN).isValid()).toBe(false);
    });
  });

  // ─────────────────────────────────────────
  // Comparison Methods
  // ─────────────────────────────────────────

  describe('comparison methods', () => {
    it('greaterThan() → true', () => {
      expect(numrel(10).greaterThan(5)).toBe(true);
    });

    it('greaterThan() → false', () => {
      expect(numrel(5).greaterThan(10)).toBe(false);
    });

    it('greaterThanOrEqualTo() → true for equal', () => {
      expect(numrel(10).greaterThanOrEqualTo(10)).toBe(true);
    });

    it('lessThan() → true', () => {
      expect(numrel(5).lessThan(10)).toBe(true);
    });

    it('lessThanOrEqualTo() → true for equal', () => {
      expect(numrel(10).lessThanOrEqualTo(10)).toBe(true);
    });

    it('equalTo() → true for equal values', () => {
      expect(numrel(10).equalTo(10)).toBe(true);
    });

    it('equalTo() → false for different values', () => {
      expect(numrel(10).equalTo(20)).toBe(false);
    });

    it('between() → true when in range', () => {
      expect(numrel(5).between(1, 10)).toBe(true);
    });

    it('between() → false when out of range', () => {
      expect(numrel(15).between(1, 10)).toBe(false);
    });

    it('should return false for null comparisons', () => {
      expect(numrel(null).greaterThan(5)).toBe(false);
      expect(numrel(null).lessThan(5)).toBe(false);
      expect(numrel(null).equalTo(5)).toBe(false);
    });
  });

  // ─────────────────────────────────────────
  // Native JS Integration
  // ─────────────────────────────────────────

  describe('native JS integration', () => {
    it('toString() should return formatted string', () => {
      expect(numrel(1000).toString()).toBe('1,000');
    });

    it('toJSON() should return raw number', () => {
      expect(numrel(1000).toJSON()).toBe(1000);
    });

    it('toJSON() should return null for invalid', () => {
      expect(numrel(null).toJSON()).toBeNull();
    });

    it('valueOf() should return number for math ops', () => {
      expect(numrel(1000).valueOf()).toBe(1000);
    });

    it('valueOf() should return 0 for null', () => {
      expect(numrel(null).valueOf()).toBe(0);
    });
  });

  // ─────────────────────────────────────────
  // clone()
  // ─────────────────────────────────────────

  describe('clone()', () => {
    it('should create independent copy', () => {
      const original = numrel(1000);
      const cloned = original.clone();
      expect(cloned.value()).toBe(1000);
      expect(cloned).not.toBe(original);
    });
  });
});
