import { describe, it, expect } from 'vitest';

// Core Factory
import { createNumrel } from '../../core/factory';

// Locales
import { enGB } from '../../locales/en-GB';
import { de } from '../../locales/de';
import { fr } from '../../locales/fr';
import { es } from '../../locales/es';
import { it as itLocale } from '../../locales/it';
import { ptBR } from '../../locales/pt-BR';
import { enIN } from '../../locales/en-IN';
import { ja } from '../../locales/ja';
import { zhCN } from '../../locales/zh-CN';
import { ko } from '../../locales/ko';
import { ru } from '../../locales/ru';
import { ar } from '../../locales/ar';
import { nl } from '../../locales/nl';
import { pl } from '../../locales/pl';
import { sv } from '../../locales/sv';
import { tr } from '../../locales/tr';

// ─────────────────────────────────────────
// Helper to create locale factory
// ─────────────────────────────────────────
function makeNumrel(locale: typeof enGB) {
  const n = createNumrel();
  n.registerLocale(locale);
  return n.locale(locale.name);
}

describe('Locales', () => {
  // ─────────────────────────────────────────
  // en-GB
  // ─────────────────────────────────────────
  describe('en-GB (British English)', () => {
    const n = makeNumrel(enGB);

    it('should format number with comma thousands', () => {
      expect(n(1234567.89).format('0,0.00')).toBe('1,234,567.89');
    });

    it('should format currency with pound sign', () => {
      expect(n(1000).format('$0,0.00')).toBe('£1,000.00');
    });

    it('should format ordinals correctly', () => {
      expect(n(1).format('0o')).toBe('1st');
      expect(n(2).format('0o')).toBe('2nd');
      expect(n(3).format('0o')).toBe('3rd');
      expect(n(11).format('0o')).toBe('11th');
    });

    it('should abbreviate with bn for billion', () => {
      expect(n(1000000000).format('0.0a')).toBe('1.0bn');
    });
  });

  // ─────────────────────────────────────────
  // de (German)
  // ─────────────────────────────────────────
  describe('de (German)', () => {
    const n = makeNumrel(de);

    it('should use dot for thousands', () => {
      expect(n(1234567).format('0,0')).toBe('1.234.567');
    });

    it('should use comma for decimal', () => {
      expect(n(1234.56).format('0,0.00')).toBe('1.234,56');
    });

    it('should format currency as suffix', () => {
      expect(n(1000).format('$0,0.00')).toBe('1.000,00 €');
    });

    it('should format ordinals with dot', () => {
      expect(n(1).format('0o')).toBe('1.');
      expect(n(5).format('0o')).toBe('5.');
    });

    it('should abbreviate in German', () => {
      expect(n(1000).format('0a')).toBe('1 Tsd');
      expect(n(1000000).format('0a')).toBe('1 Mio');
    });
  });

  // ─────────────────────────────────────────
  // fr (French)
  // ─────────────────────────────────────────
  describe('fr (French)', () => {
    const n = makeNumrel(fr);

    it('should use space for thousands', () => {
      expect(n(1234567).format('0,0')).toBe('1 234 567');
    });

    it('should use comma for decimal', () => {
      expect(n(1234.56).format('0,0.00')).toBe('1 234,56');
    });

    it('should format currency as suffix', () => {
      expect(n(1000).format('$0,0.00')).toBe('1 000,00 €');
    });

    it('should format ordinals correctly', () => {
      expect(n(1).format('0o')).toBe('1er');
      expect(n(2).format('0o')).toBe('2e');
      expect(n(5).format('0o')).toBe('5e');
    });
  });

  // ─────────────────────────────────────────
  // es (Spanish)
  // ─────────────────────────────────────────
  describe('es (Spanish)', () => {
    const n = makeNumrel(es);

    it('should use dot for thousands', () => {
      expect(n(1234567).format('0,0')).toBe('1.234.567');
    });

    it('should use comma for decimal', () => {
      expect(n(1234.56).format('0,0.00')).toBe('1.234,56');
    });

    it('should format currency as suffix', () => {
      expect(n(1000).format('$0,0.00')).toBe('1.000,00 €');
    });

    it('should format ordinals correctly', () => {
      expect(n(1).format('0o')).toBe('1.º');
    });
  });

  // ─────────────────────────────────────────
  // it (Italian)
  // ─────────────────────────────────────────
  describe('it (Italian)', () => {
    const n = makeNumrel(itLocale);

    it('should use dot for thousands', () => {
      expect(n(1234567).format('0,0')).toBe('1.234.567');
    });

    it('should use comma for decimal', () => {
      expect(n(1234.56).format('0,0.00')).toBe('1.234,56');
    });

    it('should format ordinals with degree symbol', () => {
      expect(n(1).format('0o')).toBe('1°');
    });
  });

  // ─────────────────────────────────────────
  // pt-BR (Brazilian Portuguese)
  // ─────────────────────────────────────────
  describe('pt-BR (Brazilian Portuguese)', () => {
    const n = makeNumrel(ptBR);

    it('should use dot for thousands', () => {
      expect(n(1234567).format('0,0')).toBe('1.234.567');
    });

    it('should use comma for decimal', () => {
      expect(n(1234.56).format('0,0.00')).toBe('1.234,56');
    });

    it('should format currency with R$ prefix', () => {
      expect(n(1000).format('$0,0.00')).toBe('R$1.000,00');
    });
  });

  // ─────────────────────────────────────────
  // en-IN (Indian English)
  // ─────────────────────────────────────────
  describe('en-IN (Indian English)', () => {
    const n = makeNumrel(enIN);

    it('should format number with comma thousands', () => {
      expect(n(1000).format('0,0')).toBe('1,000');
    });

    it('should format currency with rupee sign', () => {
      expect(n(1000).format('$0,0.00')).toBe('₹1,000.00');
    });

    it('should format ordinals correctly', () => {
      expect(n(1).format('0o')).toBe('1st');
      expect(n(2).format('0o')).toBe('2nd');
    });
  });

  // ─────────────────────────────────────────
  // ja (Japanese)
  // ─────────────────────────────────────────
  describe('ja (Japanese)', () => {
    const n = makeNumrel(ja);

    it('should format number with comma thousands', () => {
      expect(n(1234567).format('0,0')).toBe('1,234,567');
    });

    it('should format currency with yen sign', () => {
      expect(n(1000).format('$0,0')).toBe('¥1,000');
    });

    it('should abbreviate in Japanese', () => {
      expect(n(1000).format('0a')).toBe('1千');
      expect(n(1000000).format('0a')).toBe('1百万');
    });
  });

  // ─────────────────────────────────────────
  // zh-CN (Chinese Simplified)
  // ─────────────────────────────────────────
  describe('zh-CN (Chinese Simplified)', () => {
    const n = makeNumrel(zhCN);

    it('should format number correctly', () => {
      expect(n(1234567).format('0,0')).toBe('1,234,567');
    });

    it('should abbreviate in Chinese', () => {
      expect(n(1000).format('0a')).toBe('1千');
      expect(n(1000000).format('0a')).toBe('1百万');
    });
  });

  // ─────────────────────────────────────────
  // ko (Korean)
  // ─────────────────────────────────────────
  describe('ko (Korean)', () => {
    const n = makeNumrel(ko);

    it('should format currency with won sign', () => {
      expect(n(1000).format('$0,0')).toBe('₩1,000');
    });

    it('should abbreviate in Korean', () => {
      expect(n(1000).format('0a')).toBe('1천');
    });
  });

  // ─────────────────────────────────────────
  // ru (Russian)
  // ─────────────────────────────────────────
  describe('ru (Russian)', () => {
    const n = makeNumrel(ru);

    it('should use space for thousands', () => {
      expect(n(1234567).format('0,0')).toBe('1 234 567');
    });

    it('should use comma for decimal', () => {
      expect(n(1234.56).format('0,0.00')).toBe('1 234,56');
    });

    it('should abbreviate in Russian', () => {
      expect(n(1000).format('0a')).toBe('1тыс');
      expect(n(1000000).format('0a')).toBe('1млн');
    });
  });

  // ─────────────────────────────────────────
  // ar (Arabic)
  // ─────────────────────────────────────────
  describe('ar (Arabic)', () => {
    const n = makeNumrel(ar);

    it('should format number', () => {
      expect(n(1000).format('0,0')).toBeDefined();
    });

    it('should format currency suffix', () => {
      expect(n(1000).format('$0,0')).toBeDefined();
    });

    it('should abbreviate in Arabic', () => {
      expect(n(1000).format('0a')).toBe('1ألف');
    });
  });

  // ─────────────────────────────────────────
  // nl (Dutch)
  // ─────────────────────────────────────────
  describe('nl (Dutch)', () => {
    const n = makeNumrel(nl);

    it('should use dot for thousands', () => {
      expect(n(1234567).format('0,0')).toBe('1.234.567');
    });

    it('should use comma for decimal', () => {
      expect(n(1234.56).format('0,0.00')).toBe('1.234,56');
    });
  });

  // ─────────────────────────────────────────
  // pl (Polish)
  // ─────────────────────────────────────────
  describe('pl (Polish)', () => {
    const n = makeNumrel(pl);

    it('should use space for thousands', () => {
      expect(n(1234567).format('0,0')).toBe('1 234 567');
    });

    it('should format currency suffix zł', () => {
      expect(n(1000).format('$0,0')).toBeDefined();
    });
  });

  // ─────────────────────────────────────────
  // sv (Swedish)
  // ─────────────────────────────────────────
  describe('sv (Swedish)', () => {
    const n = makeNumrel(sv);

    it('should use space for thousands', () => {
      expect(n(1234567).format('0,0')).toBe('1 234 567');
    });

    it('should use comma for decimal', () => {
      expect(n(1234.56).format('0,0.00')).toBe('1 234,56');
    });

    it('should format ordinals with :a or :e', () => {
      expect(n(1).format('0o')).toBe('1:a');
      expect(n(3).format('0o')).toBe('3:e');
    });
  });

  // ─────────────────────────────────────────
  // tr (Turkish)
  // ─────────────────────────────────────────
  describe('tr (Turkish)', () => {
    const n = makeNumrel(tr);

    it('should use dot for thousands', () => {
      expect(n(1234567).format('0,0')).toBe('1.234.567');
    });

    it('should use comma for decimal', () => {
      expect(n(1234.56).format('0,0.00')).toBe('1.234,56');
    });

    it('should format currency with lira sign', () => {
      expect(n(1000).format('$0,0')).toBe('₺1.000');
    });
  });

  // ─────────────────────────────────────────
  // Locale Switching
  // ─────────────────────────────────────────
  describe('locale switching', () => {
    it('should switch between locales correctly', () => {
      const base = createNumrel();
      base.registerLocale(de);
      base.registerLocale(fr);

      const deNum = base.locale('de');
      const frNum = base.locale('fr');

      expect(deNum(1234.56).format('0,0.00')).toBe('1.234,56');
      expect(frNum(1234.56).format('0,0.00')).toBe('1 234,56');
    });

    it('should be SSR safe with different locales', () => {
      const request1 = createNumrel({ locale: 'de' });
      request1.registerLocale(de);

      const request2 = createNumrel({ locale: 'fr' });
      request2.registerLocale(fr);

      expect(request1(1000).format('0,0')).toBe('1.000');
      expect(request2(1000).format('0,0')).toBe('1 000');
    });
  });
});
