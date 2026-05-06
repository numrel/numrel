import { enUS } from './en-US';

import type { LocaleConfig } from '../types';

export class LocaleRegistry {
  readonly #locales: Map<string, LocaleConfig>;
  #currentLocale: string;

  constructor() {
    this.#locales = new Map();
    this.#currentLocale = 'en-US';
    this.register(enUS);
  }

  register(config: LocaleConfig): void {
    this.#locales.set(config.name, config);
  }

  get(name?: string): LocaleConfig {
    const localeName = name ?? this.#currentLocale;
    const locale = this.#locales.get(localeName);
    if (!locale) {
      console.warn(
        `[numrel] Locale "${localeName}" not found, falling back to en-US`,
      );
      return enUS;
    }
    return locale;
  }

  setCurrent(name: string): void {
    if (!this.#locales.has(name)) {
      throw new Error(
        `[numrel] Cannot set locale "${name}" - not registered. Register it first with registerLocale()`,
      );
    }
    this.#currentLocale = name;
  }

  getCurrent(): string {
    return this.#currentLocale;
  }

  has(name: string): boolean {
    return this.#locales.has(name);
  }

  list(): string[] {
    return Array.from(this.#locales.keys());
  }
}
