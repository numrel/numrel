import type {
  FormatToken,
  LocaleConfig,
  NumrelConfig,
  NumrelInput,
  NumrelInstance,
} from '../types';

// Parser
import { parseInput } from '../parser';

// Locales
import { LocaleRegistry } from '../locales';

// Maths => Operations
import {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  abs,
  clamp,
  round,
  ceil,
  floor,
} from '../math/operations';

// Validation
import {
  isValidNumber,
  isInteger,
  isFloat,
  isPositive,
  isNegative,
  isZero,
  isFiniteNumber,
  isNaNNumber,
  greaterThan,
  greaterThanOrEqualTo,
  lessThan,
  lessThanOrEqualTo,
  equalTo,
  between,
} from '../validation';

// Formats
import { format } from '../formats';

// ─────────────────────────────────────────
// Default Config
// ─────────────────────────────────────────

export const DEFAULT_CONFIG: NumrelConfig = {
  locale: 'en-US',
  defaultFormat: '0,0',
  nullFormat: '',
  zeroFormat: '',
  nanFormat: 'NaN',
  infinityFormat: '∞',
  scalePercentBy100: true,
};

// ─────────────────────────────────────────
// Main Numrel Class
// Immutable - every operation returns new instance
// SSR Safe - no global state
// ─────────────────────────────────────────
export class Numrel implements NumrelInstance {
  readonly #value: number | null;
  readonly #config: NumrelConfig;
  readonly #registry: LocaleRegistry;

  constructor(
    value: NumrelInput,
    config: NumrelConfig,
    registry: LocaleRegistry,
  ) {
    this.#config = config;
    this.#registry = registry;
    this.#value = parseInput(value, registry.get(config.locale));
  }

  // ─────────────────────────────────────────
  // Private Helpers
  // ─────────────────────────────────────────

  #getLocale(): LocaleConfig {
    return this.#registry.get(this.#config.locale);
  }

  #getNumericValue(input: NumrelInput): number {
    const parsed = parseInput(input, this.#getLocale());
    return parsed ?? 0;
  }

  #new(value: number | null): NumrelInstance {
    const instance = new Numrel(value, this.#config, this.#registry);
    return instance;
  }

  // ─────────────────────────────────────────
  // Core Methods
  // ─────────────────────────────────────────

  value(): number | null {
    return this.#value;
  }

  format(formatString?: FormatToken): string {
    const fmt = formatString ?? this.#config.defaultFormat;

    // Handle null
    if (this.#value === null) {
      return this.#config.nullFormat;
    }

    // Handle NaN
    if (isNaN(this.#value)) {
      return this.#config.nanFormat;
    }

    // Handle Infinity
    if (!isFinite(this.#value)) {
      return this.#value > 0
        ? this.#config.infinityFormat
        : `-${this.#config.infinityFormat}`;
    }

    // Handle zero format
    if (this.#value === 0 && this.#config.zeroFormat !== '') {
      return this.#config.zeroFormat;
    }

    return format(this.#value, fmt, this.#config, this.#getLocale());
  }

  clone(): NumrelInstance {
    return this.#new(this.#value);
  }

  // ─────────────────────────────────────────
  // Math Operations (all immutable!)
  // ─────────────────────────────────────────

  add(value: NumrelInput): NumrelInstance {
    if (this.#value === null) return this.#new(null);
    return this.#new(add(this.#value, this.#getNumericValue(value)));
  }

  subtract(value: NumrelInput): NumrelInstance {
    if (this.#value === null) return this.#new(null);
    return this.#new(subtract(this.#value, this.#getNumericValue(value)));
  }

  multiply(value: NumrelInput): NumrelInstance {
    if (this.#value === null) return this.#new(null);
    return this.#new(multiply(this.#value, this.#getNumericValue(value)));
  }

  divide(value: NumrelInput): NumrelInstance {
    if (this.#value === null) return this.#new(null);
    return this.#new(divide(this.#value, this.#getNumericValue(value)));
  }

  modulo(value: NumrelInput): NumrelInstance {
    if (this.#value === null) return this.#new(null);
    return this.#new(modulo(this.#value, this.#getNumericValue(value)));
  }

  power(value: NumrelInput): NumrelInstance {
    if (this.#value === null) return this.#new(null);
    return this.#new(power(this.#value, this.#getNumericValue(value)));
  }

  abs(): NumrelInstance {
    if (this.#value === null) return this.#new(null);
    return this.#new(abs(this.#value));
  }

  ceil(precision: number = 0): NumrelInstance {
    if (this.#value === null) return this.#new(null);
    return this.#new(ceil(this.#value, precision));
  }

  floor(precision: number = 0): NumrelInstance {
    if (this.#value === null) return this.#new(null);
    return this.#new(floor(this.#value, precision));
  }

  round(precision: number = 0): NumrelInstance {
    if (this.#value === null) return this.#new(null);
    return this.#new(round(this.#value, precision));
  }

  clamp(min: NumrelInput, max: NumrelInput): NumrelInstance {
    if (this.#value === null) return this.#new(null);
    return this.#new(
      clamp(
        this.#value,
        this.#getNumericValue(min),
        this.#getNumericValue(max),
      ),
    );
  }

  // ─────────────────────────────────────────
  // Validation Methods
  // ─────────────────────────────────────────

  isValid(): boolean {
    return isValidNumber(this.#value);
  }

  isInteger(): boolean {
    if (this.#value === null) return false;
    return isInteger(this.#value);
  }

  isFloat(): boolean {
    if (this.#value === null) return false;
    return isFloat(this.#value);
  }

  isPositive(): boolean {
    if (this.#value === null) return false;
    return isPositive(this.#value);
  }

  isNegative(): boolean {
    if (this.#value === null) return false;
    return isNegative(this.#value);
  }

  isZero(): boolean {
    if (this.#value === null) return false;
    return isZero(this.#value);
  }

  isFinite(): boolean {
    if (this.#value === null) return false;
    return isFiniteNumber(this.#value);
  }

  isNaN(): boolean {
    if (this.#value === null) return true;
    return isNaNNumber(this.#value);
  }

  // ─────────────────────────────────────────
  // Comparison Methods
  // ─────────────────────────────────────────

  greaterThan(value: NumrelInput): boolean {
    if (this.#value === null) return false;
    return greaterThan(this.#value, this.#getNumericValue(value));
  }

  greaterThanOrEqualTo(value: NumrelInput): boolean {
    if (this.#value === null) return false;
    return greaterThanOrEqualTo(this.#value, this.#getNumericValue(value));
  }

  lessThan(value: NumrelInput): boolean {
    if (this.#value === null) return false;
    return lessThan(this.#value, this.#getNumericValue(value));
  }

  lessThanOrEqualTo(value: NumrelInput): boolean {
    if (this.#value === null) return false;
    return lessThanOrEqualTo(this.#value, this.#getNumericValue(value));
  }

  equalTo(value: NumrelInput): boolean {
    if (this.#value === null) return false;
    return equalTo(this.#value, this.#getNumericValue(value));
  }

  between(min: NumrelInput, max: NumrelInput): boolean {
    if (this.#value === null) return false;
    return between(
      this.#value,
      this.#getNumericValue(min),
      this.#getNumericValue(max),
    );
  }

  // ─────────────────────────────────────────
  // Native JS Integration
  // ─────────────────────────────────────────

  toString(): string {
    return this.format();
  }

  toJSON(): number | null {
    return this.#value;
  }

  valueOf(): number {
    return this.#value ?? 0;
  }
}
