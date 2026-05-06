import { describe, it, expect } from 'vitest';

// Locales Registry
import { LocaleRegistry } from '../../locales';

// Locales
import { enUS } from '../../locales/en-US';

describe('LocaleRegistry', () => {
  // ─────────────────────────────────────────
  // Default Setup
  // ─────────────────────────────────────────

  describe('default setup', () => {
    it('should have en-US registered by default', () => {
      const registry = new LocaleRegistry();
      expect(registry.has('en-US')).toBe(true);
    });

    it('should return en-US as default locale', () => {
      const registry = new LocaleRegistry();
      expect(registry.get()).toEqual(enUS);
    });

    it('should return en-US as current locale name', () => {
      const registry = new LocaleRegistry();
      expect(registry.getCurrent()).toBe('en-US');
    });
  });

  // ─────────────────────────────────────────
  // Register
  // ─────────────────────────────────────────

  describe('register()', () => {
    it('should register new locale', () => {
      const registry = new LocaleRegistry();
      const deLocale = { ...enUS, name: 'de' };
      registry.register(deLocale);
      expect(registry.has('de')).toBe(true);
    });

    it('should retrieve registered locale', () => {
      const registry = new LocaleRegistry();
      const deLocale = { ...enUS, name: 'de' };
      registry.register(deLocale);
      expect(registry.get('de')).toEqual(deLocale);
    });
  });

  // ─────────────────────────────────────────
  // Get
  // ─────────────────────────────────────────

  describe('get()', () => {
    it('should return en-US for unknown locale with warning', () => {
      const registry = new LocaleRegistry();
      const result = registry.get('unknown');
      expect(result).toEqual(enUS);
    });

    it('should return specific locale by name', () => {
      const registry = new LocaleRegistry();
      expect(registry.get('en-US')).toEqual(enUS);
    });
  });

  // ─────────────────────────────────────────
  // SetCurrent
  // ─────────────────────────────────────────

  describe('setCurrent()', () => {
    it('should set current locale', () => {
      const registry = new LocaleRegistry();
      const deLocale = { ...enUS, name: 'de' };
      registry.register(deLocale);
      registry.setCurrent('de');
      expect(registry.getCurrent()).toBe('de');
    });

    it('should throw for unregistered locale', () => {
      const registry = new LocaleRegistry();
      expect(() => registry.setCurrent('unknown')).toThrow(
        '[numrel] Cannot set locale "unknown"',
      );
    });
  });

  // ─────────────────────────────────────────
  // List
  // ─────────────────────────────────────────

  describe('list()', () => {
    it('should list registered locales', () => {
      const registry = new LocaleRegistry();
      expect(registry.list()).toContain('en-US');
    });

    it('should list all registered locales', () => {
      const registry = new LocaleRegistry();
      registry.register({ ...enUS, name: 'de' });
      registry.register({ ...enUS, name: 'fr' });
      const list = registry.list();
      expect(list).toContain('en-US');
      expect(list).toContain('de');
      expect(list).toContain('fr');
    });
  });
});
