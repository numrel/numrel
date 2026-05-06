import { describe, it, expect } from 'vitest';

// Core Factory
import { createNumrel, numrel } from '../../core/factory';

// Locales
import { enUS } from '../../locales/en-US';

describe('Factory - createNumrel()', () => {
  // ─────────────────────────────────────────
  // Default Factory
  // ─────────────────────────────────────────

  describe('default factory (numrel)', () => {
    it('should create instance with default config', () => {
      expect(numrel(1000).value()).toBe(1000);
    });

    it('should use en-US locale by default', () => {
      expect(numrel(1000).format('0,0')).toBe('1,000');
    });
  });

  // ─────────────────────────────────────────
  // Custom Factory
  // ─────────────────────────────────────────

  describe('createNumrel() with custom config', () => {
    it('should create factory with custom nullFormat', () => {
      const custom = createNumrel({ nullFormat: 'N/A' });
      expect(custom(null).format('0,0')).toBe('N/A');
    });

    it('should create factory with custom zeroFormat', () => {
      const custom = createNumrel({ zeroFormat: '-' });
      expect(custom(0).format('0,0')).toBe('-');
    });

    it('should create factory with custom nanFormat', () => {
      const custom = createNumrel({ nanFormat: 'Invalid' });
      expect(custom(NaN).format('0,0')).toBe('Invalid');
    });

    it('should create factory with custom defaultFormat', () => {
      const custom = createNumrel({ defaultFormat: '0,0.00' });
      expect(custom(1000).format()).toBe('1,000.00');
    });
  });

  // ─────────────────────────────────────────
  // SSR Safety
  // ─────────────────────────────────────────

  describe('SSR Safety - isolated instances', () => {
    it('should be isolated between factories', () => {
      const factory1 = createNumrel({ nullFormat: 'N/A' });
      const factory2 = createNumrel({ nullFormat: 'NULL' });

      // Each factory maintains its own config
      expect(factory1(null).format('0,0')).toBe('N/A');
      expect(factory2(null).format('0,0')).toBe('NULL');
    });

    it('should not share state between factories', () => {
      const factory1 = createNumrel({ zeroFormat: 'zero' });
      const factory2 = createNumrel();

      expect(factory1(0).format('0,0')).toBe('zero');
      expect(factory2(0).format('0,0')).toBe('0');
    });
  });

  // ─────────────────────────────────────────
  // Locale Methods
  // ─────────────────────────────────────────

  describe('locale methods', () => {
    it('should register and use custom locale', () => {
      const custom = createNumrel();
      custom.registerLocale(enUS);
      expect(custom.getLocale('en-US')).toEqual(enUS);
    });

    it('should get current locale', () => {
      const custom = createNumrel();
      expect(custom.getLocale()).toEqual(enUS);
    });

    it('should switch locale', () => {
      const custom = createNumrel();
      custom.registerLocale({
        ...enUS,
        name: 'test',
        delimiters: { thousands: '.', decimal: ',' },
      });
      const withLocale = custom.locale('test');
      expect(withLocale(1000).format('0,0')).toBe('1.000');
    });
  });

  // ─────────────────────────────────────────
  // setDefaults & reset
  // ─────────────────────────────────────────

  describe('setDefaults() and reset()', () => {
    it('should set default format', () => {
      const custom = createNumrel().setDefaults({
        defaultFormat: '0,0.00',
      });
      expect(custom(1000).format()).toBe('1,000.00');
    });

    it('should reset to defaults', () => {
      const custom = createNumrel({ nullFormat: 'N/A' });
      const reset = custom.reset();
      expect(reset(null).format('0,0')).toBe('');
    });
  });
});
