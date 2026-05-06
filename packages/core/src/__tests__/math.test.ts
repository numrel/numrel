import { describe, it, expect } from 'vitest';

// Math Operations => Operations + Precisions
import {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  abs,
  clamp,
  round,
  ceil,
  floor,
} from '../math/operations';
import { getDecimalPlaces, preciseRound } from '../math/precision';

describe('Math Operations', () => {
  // ─────────────────────────────────────────
  // Precision - The #1 Bug Fix!
  // ─────────────────────────────────────────

  describe('Floating Point Precision Fixes', () => {
    it('should fix 0.1 + 0.2 floating point issue', () => {
      expect(add(0.1, 0.2)).toBe(0.3);
    });

    it('should fix 0.1 + 0.2 !== 0.30000000000000004', () => {
      expect(add(0.1, 0.2)).not.toBe(0.30000000000000004);
    });

    it('should fix floating point in subtraction', () => {
      expect(subtract(0.3, 0.1)).toBe(0.2);
    });

    it('should fix floating point in multiplication', () => {
      expect(multiply(0.1, 0.2)).toBe(0.02);
    });

    it('should fix 1.005 rounding', () => {
      expect(preciseRound(1.005, 2)).toBe(1.01);
    });

    it('should get correct decimal places', () => {
      expect(getDecimalPlaces(1.005)).toBe(3);
      expect(getDecimalPlaces(1.5)).toBe(1);
      expect(getDecimalPlaces(1000)).toBe(0);
    });
  });

  // ─────────────────────────────────────────
  // Add
  // ─────────────────────────────────────────

  describe('add()', () => {
    it('should add two positive numbers', () => {
      expect(add(1000, 500)).toBe(1500);
    });

    it('should add positive and negative', () => {
      expect(add(1000, -500)).toBe(500);
    });

    it('should add two negative numbers', () => {
      expect(add(-1000, -500)).toBe(-1500);
    });

    it('should add decimals precisely', () => {
      expect(add(1.1, 2.2)).toBe(3.3);
    });

    it('should add zero', () => {
      expect(add(1000, 0)).toBe(1000);
    });

    it('should handle large numbers', () => {
      expect(add(999999999, 1)).toBe(1000000000);
    });
  });

  // ─────────────────────────────────────────
  // Subtract
  // ─────────────────────────────────────────

  describe('subtract()', () => {
    it('should subtract two positive numbers', () => {
      expect(subtract(1000, 500)).toBe(500);
    });

    it('should subtract resulting in negative', () => {
      expect(subtract(500, 1000)).toBe(-500);
    });

    it('should subtract decimals precisely', () => {
      expect(subtract(1.3, 0.3)).toBe(1.0);
    });

    it('should subtract zero', () => {
      expect(subtract(1000, 0)).toBe(1000);
    });

    it('should subtract negative number', () => {
      expect(subtract(1000, -500)).toBe(1500);
    });
  });

  // ─────────────────────────────────────────
  // Multiply
  // ─────────────────────────────────────────

  describe('multiply()', () => {
    it('should multiply two positive numbers', () => {
      expect(multiply(10, 5)).toBe(50);
    });

    it('should multiply with decimal', () => {
      expect(multiply(1.5, 2)).toBe(3);
    });

    it('should multiply by zero', () => {
      expect(multiply(1000, 0)).toBe(0);
    });

    it('should multiply negative numbers', () => {
      expect(multiply(-10, 5)).toBe(-50);
    });

    it('should multiply two negative numbers', () => {
      expect(multiply(-10, -5)).toBe(50);
    });

    it('should multiply decimals precisely', () => {
      expect(multiply(0.1, 0.2)).toBe(0.02);
    });
  });

  // ─────────────────────────────────────────
  // Divide
  // ─────────────────────────────────────────

  describe('divide()', () => {
    it('should divide two positive numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    it('should divide resulting in decimal', () => {
      expect(divide(10, 3)).toBeCloseTo(3.333, 3);
    });

    it('should divide negative numbers', () => {
      expect(divide(-10, 2)).toBe(-5);
    });

    it('should throw error on division by zero', () => {
      expect(() => divide(10, 0)).toThrow('[numrel] Division by zero');
    });

    it('should divide decimals', () => {
      expect(divide(0.6, 0.2)).toBeCloseTo(3, 10);
    });
  });

  // ─────────────────────────────────────────
  // Modulo
  // ─────────────────────────────────────────

  describe('modulo()', () => {
    it('should return remainder', () => {
      expect(modulo(10, 3)).toBe(1);
    });

    it('should return 0 for exact division', () => {
      expect(modulo(10, 2)).toBe(0);
    });

    it('should throw error for modulo by zero', () => {
      expect(() => modulo(10, 0)).toThrow('[numrel] Modulo by zero');
    });
  });

  // ─────────────────────────────────────────
  // Power
  // ─────────────────────────────────────────

  describe('power()', () => {
    it('should calculate power correctly', () => {
      expect(power(2, 10)).toBe(1024);
    });

    it('should handle power of 0', () => {
      expect(power(1000, 0)).toBe(1);
    });

    it('should handle power of 1', () => {
      expect(power(1000, 1)).toBe(1000);
    });

    it('should handle negative exponent', () => {
      expect(power(2, -1)).toBe(0.5);
    });

    it('should handle square root via 0.5', () => {
      expect(power(9, 0.5)).toBe(3);
    });
  });

  // ─────────────────────────────────────────
  // Abs
  // ─────────────────────────────────────────

  describe('abs()', () => {
    it('should return positive for negative number', () => {
      expect(abs(-1000)).toBe(1000);
    });

    it('should return same for positive number', () => {
      expect(abs(1000)).toBe(1000);
    });

    it('should return 0 for zero', () => {
      expect(abs(0)).toBe(0);
    });
  });

  // ─────────────────────────────────────────
  // Clamp
  // ─────────────────────────────────────────

  describe('clamp()', () => {
    it('should return value when within range', () => {
      expect(clamp(5, 1, 10)).toBe(5);
    });

    it('should return min when value is below min', () => {
      expect(clamp(0, 1, 10)).toBe(1);
    });

    it('should return max when value is above max', () => {
      expect(clamp(15, 1, 10)).toBe(10);
    });

    it('should throw when min > max', () => {
      expect(() => clamp(5, 10, 1)).toThrow(
        '[numrel] clamp: min cannot be greater than max',
      );
    });

    it('should handle equal min and max', () => {
      expect(clamp(5, 3, 3)).toBe(3);
    });
  });

  // ─────────────────────────────────────────
  // Round
  // ─────────────────────────────────────────

  describe('round()', () => {
    it('should round to integer by default', () => {
      expect(round(1.5)).toBe(2);
    });

    it('should round down', () => {
      expect(round(1.4)).toBe(1);
    });

    it('should round to decimal places', () => {
      expect(round(1.005, 2)).toBe(1.01);
    });

    it('should round negative numbers', () => {
      expect(round(-1.5)).toBe(-1);
    });

    it('should round to 0 decimal places', () => {
      expect(round(1.567, 0)).toBe(2);
    });
  });

  // ─────────────────────────────────────────
  // Ceil
  // ─────────────────────────────────────────

  describe('ceil()', () => {
    it('should ceil to integer', () => {
      expect(ceil(1.1)).toBe(2);
    });

    it('should ceil to decimal places', () => {
      expect(ceil(1.001, 2)).toBe(1.01);
    });

    it('should not change integer', () => {
      expect(ceil(2, 0)).toBe(2);
    });

    it('should ceil negative number', () => {
      expect(ceil(-1.5)).toBe(-1);
    });
  });

  // ─────────────────────────────────────────
  // Floor
  // ─────────────────────────────────────────

  describe('floor()', () => {
    it('should floor to integer', () => {
      expect(floor(1.9)).toBe(1);
    });

    it('should floor to decimal places', () => {
      expect(floor(1.999, 2)).toBe(1.99);
    });

    it('should not change integer', () => {
      expect(floor(2, 0)).toBe(2);
    });

    it('should floor negative number', () => {
      expect(floor(-1.1)).toBe(-2);
    });
  });
});
