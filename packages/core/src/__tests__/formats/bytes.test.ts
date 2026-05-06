import { describe, it, expect } from 'vitest';

// Bytes Formatter
import { formatBytes } from '../../formats/bytes';

// Locales
import { enUS } from '../../locales/en-US';

describe('formatBytes()', () => {
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

    // ✅ NEW - PB unit (covers 108-119)
    it('should auto scale to PB', () => {
      expect(formatBytes(1000000000000000, '0b', enUS)).toBe('1 PB');
    });
  });

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

    // ✅ NEW - TB specific
    it('should format as TB specific', () => {
      expect(formatBytes(1000000000000, '0tb', enUS)).toBe('1 TB');
    });

    // ✅ NEW - PB specific (covers lines)
    it('should format as PB specific', () => {
      expect(formatBytes(1000000000000000, '0pb', enUS)).toBe('1 PB');
    });
  });

  describe('with decimal places', () => {
    it('should format with 1 decimal', () => {
      expect(formatBytes(1500, '0.0b', enUS)).toBe('1.5 KB');
    });

    it('should format with 2 decimals', () => {
      expect(formatBytes(1500, '0.00b', enUS)).toBe('1.50 KB');
    });

    // ✅ FIX: 1,500,000 bytes = 1.5 MB (auto scales to best unit)
    // With 0 decimals it rounds to 2 MB
    // To get 1,500 KB we need to force KB unit
    it('should format with thousands separator auto scale', () => {
      // 1,500,000 bytes auto-scales to MB
      expect(formatBytes(1500000, '0,0b', enUS)).toBe('2 MB');
    });

    // ✅ Force KB to get 1,500 KB
    it('should format with thousands separator forced KB', () => {
      expect(formatBytes(1500000, '0,0kb', enUS)).toBe('1,500 KB');
    });

    // ✅ Force KB with decimal
    it('should format KB with decimal and thousands', () => {
      expect(formatBytes(1500000, '0,0.0kb', enUS)).toBe('1,500.0 KB');
    });
  });

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

    // ✅ NEW - TiB
    it('should format as TiB', () => {
      expect(formatBytes(1024 ** 4, '0ib', enUS)).toBe('1 TiB');
    });

    // ✅ NEW - PiB (covers 147-149)
    it('should format as PiB', () => {
      expect(formatBytes(1024 ** 5, '0ib', enUS)).toBe('1 PiB');
    });

    // ✅ NEW - specific IEC KiB
    it('should format specific KiB', () => {
      expect(formatBytes(1024, '0kib', enUS)).toBe('1 KiB');
    });

    // ✅ NEW - specific IEC MiB
    it('should format specific MiB', () => {
      expect(formatBytes(1024 ** 2, '0mib', enUS)).toBe('1 MiB');
    });

    // ✅ NEW - specific IEC GiB
    it('should format specific GiB', () => {
      expect(formatBytes(1024 ** 3, '0gib', enUS)).toBe('1 GiB');
    });

    // ✅ NEW - specific IEC TiB
    it('should format specific TiB', () => {
      expect(formatBytes(1024 ** 4, '0tib', enUS)).toBe('1 TiB');
    });

    // ✅ NEW - specific IEC PiB
    it('should format specific PiB', () => {
      expect(formatBytes(1024 ** 5, '0pib', enUS)).toBe('1 PiB');
    });
  });

  describe('edge cases', () => {
    it('should format zero bytes', () => {
      expect(formatBytes(0, '0b', enUS)).toBe('0 B');
    });

    it('should format negative bytes', () => {
      expect(formatBytes(-1000, '0b', enUS)).toBe('-1 KB');
    });

    // ✅ NEW - negative IEC
    it('should format negative IEC bytes', () => {
      expect(formatBytes(-1024, '0ib', enUS)).toBe('-1 KiB');
    });

    // ✅ NEW - zero IEC
    it('should format zero IEC bytes', () => {
      expect(formatBytes(0, '0ib', enUS)).toBe('0 B');
    });
  });

  describe('autoScale edge cases', () => {
    it('should return B for very small value in IEC', () => {
      expect(formatBytes(100, '0ib', enUS)).toBe('100 B');
    });

    it('should return B for 1 byte in IEC', () => {
      expect(formatBytes(1, '0ib', enUS)).toBe('1 B');
    });

    it('should return B for 0 in SI', () => {
      expect(formatBytes(0, '0.0b', enUS)).toBe('0.0 B');
    });
  });
});
