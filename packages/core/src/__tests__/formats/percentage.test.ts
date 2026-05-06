import { describe, it, expect } from 'vitest';

// Percentage Formatter
import { formatPercentage } from '../../formats/percentage';

// Locales
import { enUS } from '../../locales/en-US';

// Config
import { DEFAULT_CONFIG } from '../../core/numrel';

describe('formatPercentage()', () => {
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

    // ✅ NEW - thousands separator in percentage
    it('should format large percentage with thousands', () => {
      expect(formatPercentage(10, '0,0%', DEFAULT_CONFIG, enUS)).toBe('1,000%');
    });
  });

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

  describe('without scaling', () => {
    it('should not scale when scalePercentBy100 is false', () => {
      const config = { ...DEFAULT_CONFIG, scalePercentBy100: false };
      expect(formatPercentage(50, '0%', config, enUS)).toBe('50%');
    });

    // ✅ NEW - no scale with decimal
    it('should not scale decimal when scalePercentBy100 is false', () => {
      const config = { ...DEFAULT_CONFIG, scalePercentBy100: false };
      expect(formatPercentage(12.34, '0.00%', config, enUS)).toBe('12.34%');
    });
  });

  // ✅ NEW - prefix % format (covers lines 50-51)
  describe('prefix percentage format', () => {
    it('should format with % as prefix', () => {
      expect(formatPercentage(0.5, '%0', DEFAULT_CONFIG, enUS)).toBe('%50');
    });

    it('should format negative with % as prefix', () => {
      expect(formatPercentage(-0.5, '%0', DEFAULT_CONFIG, enUS)).toBe('-%50');
    });
  });

  describe('percentage with thousands', () => {
    it('should format negative large percentage with thousands', () => {
      expect(formatPercentage(-10, '0,0%', DEFAULT_CONFIG, enUS)).toBe(
        '-1,000%',
      );
    });

    it('should format large percentage with thousands and decimal', () => {
      expect(formatPercentage(10, '0,0.00%', DEFAULT_CONFIG, enUS)).toBe(
        '1,000.00%',
      );
    });
  });
});
