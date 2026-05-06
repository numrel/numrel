import { Numrel, DEFAULT_CONFIG } from './numrel';

// Locales
import { LocaleRegistry } from '../locales';

import type {
  NumrelInput,
  NumrelInstance,
  NumrelConfig,
  NumrelFactory,
  LocaleConfig,
} from '../types';

/**
 * The function `createNumrel` in TypeScript creates a factory function for creating instances of
 * `Numrel` with configurable options and locale support.
 * @param [config] - The `config` parameter in the `createNumrel` function is an optional parameter of
 * type `Partial<NumrelConfig>`. It allows you to provide configuration options for creating a
 * `NumrelFactory`. If no `config` is provided, default configuration values will be used.
 * @param {LocaleRegistry} [existingRegistry] - The `existingRegistry` parameter in the `createNumrel`
 * function is used to optionally pass in an existing `LocaleRegistry` instance. This allows you to
 * share the same registry across multiple instances of `NumrelFactory`. If you don't pass in an
 * existing registry, a new one will be
 * @returns The `createNumrel` function returns a `NumrelFactory`, which is a factory function used to
 * create instances of `NumrelInstance`.
 */
export const createNumrel = (
  config?: Partial<NumrelConfig>,
  // ✅ Accept existing registry to share it!
  existingRegistry?: LocaleRegistry,
): NumrelFactory => {
  // ✅ Reuse existing registry OR create new one
  const registry = existingRegistry ?? new LocaleRegistry();

  const currentConfig: NumrelConfig = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  const factory = (value: NumrelInput): NumrelInstance => {
    return new Numrel(value, currentConfig, registry);
  };

  factory.locale = (name: string): NumrelFactory => {
    // ✅ Pass SAME registry so registered locales persist!
    return createNumrel({ ...currentConfig, locale: name }, registry);
  };

  factory.registerLocale = (localeConfig: LocaleConfig): NumrelFactory => {
    registry.register(localeConfig);
    // ✅ Return same factory (same registry)
    return factory;
  };

  factory.getLocale = (name?: string): LocaleConfig => {
    return registry.get(name);
  };

  factory.setDefaults = (newConfig: Partial<NumrelConfig>): NumrelFactory => {
    // ✅ Pass SAME registry
    return createNumrel({ ...currentConfig, ...newConfig }, registry);
  };

  factory.reset = (): NumrelFactory => {
    // ✅ Fresh registry on reset
    return createNumrel(DEFAULT_CONFIG);
  };

  return factory as NumrelFactory;
};

export const numrel = createNumrel();
