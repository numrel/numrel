import type {
  NumrelInput,
  NumrelInstance,
  NumrelConfig,
  FormatToken,
  LocaleConfig,
} from '../types';
import { parseInput } from '../parser';
import { LocaleRegistry } from '../locales';
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
import {
  isValidNumber,
  isInteger,
  isFloat,
  isPositive,
  isNegative,
  isZero,
  isFiniteNumber,
  greaterThan,
  greaterThanOrEqualTo,
  lessThan,
  lessThanOrEqualTo,
  equalTo,
  between,
} from '../validation';
import { format } from '../formats';

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
// Special internal sentinel values
// ─────────────────────────────────────────
const NUMREL_NAN = 'NaN' as const;
const NUMREL_NULL = 'NULL' as const;
type InternalValue = number | typeof NUMREL_NAN | typeof NUMREL_NULL;

// ─────────────────────────────────────────
// Parse input keeping NaN distinct from null
// ─────────────────────────────────────────
function parseRawInput(
  value: NumrelInput,
  locale: LocaleConfig,
): InternalValue {
  // ✅ Explicit NaN check BEFORE parseInput
  if (typeof value === 'number' && isNaN(value)) {
    return NUMREL_NAN;
  }

  const parsed = parseInput(value, locale);

  if (parsed === null) return NUMREL_NULL;

  return parsed;
}

/* The `Numrel` class in TypeScript provides a flexible and robust way to work with numeric values,
including formatting, math operations, validation, and comparison methods. */
export class Numrel implements NumrelInstance {
  readonly #internal: InternalValue;
  readonly #config: NumrelConfig;
  readonly #registry: LocaleRegistry;

  constructor(
    value: NumrelInput,
    config: NumrelConfig,
    registry: LocaleRegistry,
  ) {
    this.#config = config;
    this.#registry = registry;
    this.#internal = parseRawInput(value, registry.get(config.locale));
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

  #new(value: NumrelInput | typeof NUMREL_NAN): NumrelInstance {
    if (value === NUMREL_NAN) {
      return new Numrel(NaN, this.#config, this.#registry);
    }

    return new Numrel(value, this.#config, this.#registry);
  }

  #isNull(): boolean {
    return this.#internal === NUMREL_NULL;
  }

  #isNaNInternal(): boolean {
    return this.#internal === NUMREL_NAN;
  }

  #numericValue(): number | null {
    if (this.#internal === NUMREL_NULL) return null;

    if (this.#internal === NUMREL_NAN) return null;

    return this.#internal;
  }

  // ─────────────────────────────────────────
  // Core Methods
  // ─────────────────────────────────────────

  value(): number | null {
    if (this.#isNull() || this.#isNaNInternal()) return null;

    return this.#internal as number;
  }

  format(formatString?: FormatToken): string {
    const fmt = formatString ?? this.#config.defaultFormat;

    // ✅ Handle NaN first (before null!)
    if (this.#isNaNInternal()) {
      return this.#config.nanFormat;
    }

    // Handle null
    if (this.#isNull()) {
      return this.#config.nullFormat;
    }

    const numValue = this.#internal as number;

    // Handle Infinity
    if (!isFinite(numValue)) {
      return numValue > 0
        ? this.#config.infinityFormat
        : `-${this.#config.infinityFormat}`;
    }

    // Handle zero format
    if (numValue === 0 && this.#config.zeroFormat !== '') {
      return this.#config.zeroFormat;
    }

    return format(numValue, fmt, this.#config, this.#getLocale());
  }

  clone(): NumrelInstance {
    return new Numrel(this.#numericValue(), this.#config, this.#registry);
  }

  // ─────────────────────────────────────────
  // Math Operations
  // ─────────────────────────────────────────

  add(value: NumrelInput): NumrelInstance {
    const num = this.#numericValue();

    if (num === null) return this.#new(null);

    return this.#new(add(num, this.#getNumericValue(value)));
  }

  subtract(value: NumrelInput): NumrelInstance {
    const num = this.#numericValue();

    if (num === null) return this.#new(null);

    return this.#new(subtract(num, this.#getNumericValue(value)));
  }

  multiply(value: NumrelInput): NumrelInstance {
    const num = this.#numericValue();

    if (num === null) return this.#new(null);

    return this.#new(multiply(num, this.#getNumericValue(value)));
  }

  divide(value: NumrelInput): NumrelInstance {
    const num = this.#numericValue();

    if (num === null) return this.#new(null);

    return this.#new(divide(num, this.#getNumericValue(value)));
  }

  modulo(value: NumrelInput): NumrelInstance {
    const num = this.#numericValue();

    if (num === null) return this.#new(null);

    return this.#new(modulo(num, this.#getNumericValue(value)));
  }

  power(value: NumrelInput): NumrelInstance {
    const num = this.#numericValue();

    if (num === null) return this.#new(null);

    return this.#new(power(num, this.#getNumericValue(value)));
  }

  abs(): NumrelInstance {
    const num = this.#numericValue();

    if (num === null) return this.#new(null);

    return this.#new(abs(num));
  }

  ceil(precision: number = 0): NumrelInstance {
    const num = this.#numericValue();

    if (num === null) return this.#new(null);

    return this.#new(ceil(num, precision));
  }

  floor(precision: number = 0): NumrelInstance {
    const num = this.#numericValue();

    if (num === null) return this.#new(null);

    return this.#new(floor(num, precision));
  }

  round(precision: number = 0): NumrelInstance {
    const num = this.#numericValue();

    if (num === null) return this.#new(null);

    return this.#new(round(num, precision));
  }

  clamp(min: NumrelInput, max: NumrelInput): NumrelInstance {
    const num = this.#numericValue();

    if (num === null) return this.#new(null);

    return this.#new(
      clamp(num, this.#getNumericValue(min), this.#getNumericValue(max)),
    );
  }

  // ─────────────────────────────────────────
  // Validation Methods
  // ─────────────────────────────────────────

  isValid(): boolean {
    const num = this.#numericValue();

    return isValidNumber(num);
  }

  isInteger(): boolean {
    const num = this.#numericValue();

    if (num === null) return false;

    return isInteger(num);
  }

  isFloat(): boolean {
    const num = this.#numericValue();

    if (num === null) return false;

    return isFloat(num);
  }

  isPositive(): boolean {
    const num = this.#numericValue();

    if (num === null) return false;

    return isPositive(num);
  }

  isNegative(): boolean {
    const num = this.#numericValue();

    if (num === null) return false;

    return isNegative(num);
  }

  isZero(): boolean {
    const num = this.#numericValue();

    if (num === null) return false;

    return isZero(num);
  }

  isFinite(): boolean {
    const num = this.#numericValue();

    if (num === null) return false;

    return isFiniteNumber(num);
  }

  isNaN(): boolean {
    // ✅ null is NOT NaN, NaN sentinel IS NaN
    return this.#isNaNInternal();
  }

  // ─────────────────────────────────────────
  // Comparison Methods
  // ─────────────────────────────────────────

  greaterThan(value: NumrelInput): boolean {
    const num = this.#numericValue();

    if (num === null) return false;

    return greaterThan(num, this.#getNumericValue(value));
  }

  greaterThanOrEqualTo(value: NumrelInput): boolean {
    const num = this.#numericValue();

    if (num === null) return false;

    return greaterThanOrEqualTo(num, this.#getNumericValue(value));
  }

  lessThan(value: NumrelInput): boolean {
    const num = this.#numericValue();

    if (num === null) return false;

    return lessThan(num, this.#getNumericValue(value));
  }

  lessThanOrEqualTo(value: NumrelInput): boolean {
    const num = this.#numericValue();

    if (num === null) return false;

    return lessThanOrEqualTo(num, this.#getNumericValue(value));
  }

  equalTo(value: NumrelInput): boolean {
    const num = this.#numericValue();

    if (num === null) return false;

    return equalTo(num, this.#getNumericValue(value));
  }

  between(min: NumrelInput, max: NumrelInput): boolean {
    const num = this.#numericValue();

    if (num === null) return false;

    return between(num, this.#getNumericValue(min), this.#getNumericValue(max));
  }

  // ─────────────────────────────────────────
  // Native JS Integration
  // ─────────────────────────────────────────

  toString(): string {
    return this.format();
  }

  toJSON(): number | null {
    return this.#numericValue();
  }

  valueOf(): number {
    return this.#numericValue() ?? 0;
  }
}
