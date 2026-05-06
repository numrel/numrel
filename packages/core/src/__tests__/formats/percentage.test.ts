import { describe, it, expect } from 'vitest';

// Percentage Formatter
import { formatPercentage } from '../../formats/percentage';

// Locales
import { enUS } from '../../locales/en-US';

// Config
import { DEFAULT_CONFIG } from '../../core/numrel';

describe('formatPercentage()', () => {
  // ─────────────────────────────────────────
  // Basic Percentage
  // ─────────────────────────────────────────

  describe('basic percentage formatting', () => {
    it('should format 0.5 as 50%', () => {
      expect(formatPercentage(0.5, '0%', DEFAULT_CONFIG, enUS)).toBe('50%');
    });

    it('should format 1 as 100%', () => {
      expect(formatPercentage(1, '0%', DEFAULT_CONFIG, enUS)).toBe('100%');
    });

    it('should format 0 as 0%', () => {
      expect(formatPercentage(0, '0%', DEFAULT_CONFIG, enUS)).toBe('0%');
    });

    it('should format with decimal places', () => {
      expect(formatPercentage(0.1234, '0.00%', DEFAULT_CONFIG, enUS)).toBe(
        '12.34%',
      );
    });

    it('should format with one decimal', () => {
      expect(formatPercentage(0.505, '0.0%', DEFAULT_CONFIG, enUS)).toBe(
        '50.5%',
      );
    });
  });

  // ─────────────────────────────────────────
  // Negative Percentage
  // ─────────────────────────────────────────

  describe('negative percentage formatting', () => {
    it('should format negative percentage', () => {
      expect(formatPercentage(-0.5, '0%', DEFAULT_CONFIG, enUS)).toBe('-50%');
    });

    it('should format negative with decimals', () => {
      expect(formatPercentage(-0.1234, '0.00%', DEFAULT_CONFIG, enUS)).toBe(
        '-12.34%',
      );
    });
  });

  // ─────────────────────────────────────────
  // No Scaling
  // ─────────────────────────────────────────

  describe('without scaling', () => {
    it('should not scale when scalePercentBy100 is false', () => {
      const config = { ...DEFAULT_CONFIG, scalePercentBy100: false };
      expect(formatPercentage(50, '0%', config, enUS)).toBe('50%');
    });
  });
});
