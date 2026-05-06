import { describe, it, expect } from 'vitest';

// Time Formatter
import { formatTime } from '../../formats/time';

describe('formatTime()', () => {
  // ─────────────────────────────────────────
  // HH:MM:SS Format
  // ─────────────────────────────────────────

  describe('HH:MM:SS format', () => {
    it('should format seconds to HH:MM:SS', () => {
      expect(formatTime(3661, '00:00:00')).toBe('01:01:01');
    });

    it('should format zero', () => {
      expect(formatTime(0, '00:00:00')).toBe('00:00:00');
    });

    it('should format 1 hour', () => {
      expect(formatTime(3600, '00:00:00')).toBe('01:00:00');
    });

    it('should format 1 minute', () => {
      expect(formatTime(60, '00:00:00')).toBe('00:01:00');
    });

    it('should format 1 second', () => {
      expect(formatTime(1, '00:00:00')).toBe('00:00:01');
    });

    it('should format large hours', () => {
      expect(formatTime(36000, '00:00:00')).toBe('10:00:00');
    });
  });

  // ─────────────────────────────────────────
  // MM:SS Format
  // ─────────────────────────────────────────

  describe('MM:SS format', () => {
    it('should format seconds to MM:SS', () => {
      expect(formatTime(90, '00:00')).toBe('01:30');
    });

    it('should format zero to MM:SS', () => {
      expect(formatTime(0, '00:00')).toBe('00:00');
    });

    it('should format large minutes', () => {
      expect(formatTime(3600, '00:00')).toBe('60:00');
    });
  });

  // ─────────────────────────────────────────
  // Duration Format (new feature!)
  // ─────────────────────────────────────────

  describe('duration format', () => {
    it('should format as duration with hours', () => {
      expect(formatTime(3661, 'duration')).toBe('1h 1m 1s');
    });

    it('should format as duration minutes only', () => {
      expect(formatTime(90, 'duration')).toBe('1m 30s');
    });

    it('should format as duration seconds only', () => {
      expect(formatTime(45, 'duration')).toBe('45s');
    });

    it('should format zero duration', () => {
      expect(formatTime(0, 'duration')).toBe('0s');
    });
  });

  // ─────────────────────────────────────────
  // Negative Time
  // ─────────────────────────────────────────

  describe('negative time', () => {
    it('should format negative time', () => {
      expect(formatTime(-3661, '00:00:00')).toBe('-01:01:01');
    });
  });
});
