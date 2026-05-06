import { describe, it, expect } from 'vitest';

// Bytes Formatter
import { formatBytes } from '../../formats/bytes';

// Locales
import { enUS } from '../../locales/en-US';

describe('formatBytes()', () => {
  // ─────────────────────────────────────────
  // Auto Scaling
  // ─────────────────────────────────────────

  describe('auto scaling', () => {
    it('should format bytes', () => {
      expect(formatBytes(500, '0b', enUS)).toBe('500 B');
    });

    it('should auto scale to KB', () => {
      expect(formatBytes(1000, '0b', enUS)).toBe('1 KB');
    });

    it('should auto scale to MB', () => {
      expect(formatBytes(1000000, '0b', enUS)).toBe('1 MB');
    });

    it('should auto scale to GB', () => {
      expect(formatBytes(1000000000, '0b', enUS)).toBe('1 GB');
    });

    it('should auto scale to TB', () => {
      expect(formatBytes(1000000000000, '0b', enUS)).toBe('1 TB');
    });
  });

  // ─────────────────────────────────────────
  // Specific Units
  // ─────────────────────────────────────────

  describe('specific units', () => {
    it('should format as KB', () => {
      expect(formatBytes(1000, '0kb', enUS)).toBe('1 KB');
    });

    it('should format as MB', () => {
      expect(formatBytes(1000000, '0mb', enUS)).toBe('1 MB');
    });

    it('should format as GB', () => {
      expect(formatBytes(1000000000, '0gb', enUS)).toBe('1 GB');
    });
  });

  // ─────────────────────────────────────────
  // Decimal Places
  // ─────────────────────────────────────────

  describe('with decimal places', () => {
    it('should format with 1 decimal', () => {
      expect(formatBytes(1500, '0.0b', enUS)).toBe('1.5 KB');
    });

    it('should format with 2 decimals', () => {
      expect(formatBytes(1500, '0.00b', enUS)).toBe('1.50 KB');
    });
  });

  // ─────────────────────────────────────────
  // IEC Units (new feature!)
  // ─────────────────────────────────────────

  describe('IEC units (base 1024)', () => {
    it('should format as KiB', () => {
      expect(formatBytes(1024, '0ib', enUS)).toBe('1 KiB');
    });

    it('should format as MiB', () => {
      expect(formatBytes(1024 ** 2, '0ib', enUS)).toBe('1 MiB');
    });

    it('should format as GiB', () => {
      expect(formatBytes(1024 ** 3, '0ib', enUS)).toBe('1 GiB');
    });
  });

  // ─────────────────────────────────────────
  // Edge Cases
  // ─────────────────────────────────────────

  describe('edge cases', () => {
    it('should format zero bytes', () => {
      expect(formatBytes(0, '0b', enUS)).toBe('0 B');
    });

    it('should format negative bytes', () => {
      expect(formatBytes(-1000, '0b', enUS)).toBe('-1 KB');
    });
  });
});
