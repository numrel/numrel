import type {
  LocaleConfig,
  NumrelConfig,
  NumrelFactory,
  NumrelInput,
  NumrelInstance,
} from '../types';

// Core Numrel
import { Numrel, DEFAULT_CONFIG } from './numrel';

// Locales
import { LocaleRegistry } from '../locales';

// ─────────────────────────────────────────
// Factory Creator
// Each factory = isolated config + registry
// 100% SSR Safe!
// ─────────────────────────────────────────
export const createNumrel = (config?: Partial<NumrelConfig>): NumrelFactory => {
  const registry = new LocaleRegistry();
  const currentConfig: NumrelConfig = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  const factory = (value: NumrelInput): NumrelInstance => {
    return new Numrel(value, currentConfig, registry);
  };

  factory.locale = (name: string): NumrelFactory => {
    return createNumrel({ ...currentConfig, locale: name });
  };

  factory.registerLocale = (localeConfig: LocaleConfig): NumrelFactory => {
    registry.register(localeConfig);
    return factory;
  };

  factory.getLocale = (name?: string): LocaleConfig => {
    return registry.get(name);
  };

  factory.setDefaults = (newConfig: Partial<NumrelConfig>): NumrelFactory => {
    return createNumrel({ ...currentConfig, ...newConfig });
  };

  factory.reset = (): NumrelFactory => {
    return createNumrel(DEFAULT_CONFIG);
  };

  return factory as NumrelFactory;
};

// ─────────────────────────────────────────
// Default Export - Ready to use!
// ─────────────────────────────────────────

export const numrel = createNumrel();
