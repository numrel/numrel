// ─────────────────────────────────────────
// Input Types
// ─────────────────────────────────────────
export type NumrelInput = number | string | null | undefined | NumrelInstance;

// ─────────────────────────────────────────
// Format Token Types
// ─────────────────────────────────────────
export type FormatToken =
  // Numbers
  | '0'
  | '0,0'
  | '0.00'
  | '0,0.00'
  | '0,0.000'
  | '0,0.0000'
  // Signed
  | '+0'
  | '+0,0'
  | '+0,0.00'
  // Currency
  | '$0'
  | '$0,0'
  | '$0,0.00'
  | '$0,0.000'
  // Percentage
  | '0%'
  | '0.0%'
  | '0.00%'
  // Bytes
  | '0b'
  | '0kb'
  | '0mb'
  | '0gb'
  | '0.0b'
  | '0.00b'
  // Time
  | '00:00:00'
  | '00:00'
  // Abbreviations
  | '0a'
  | '0.0a'
  | '0.00a'
  | '0,0a'
  | '0,0.0a'
  // Ordinals
  | '0o'
  | '0,0o'
  // Exponential
  | '0e+0'
  | '0.00e+0'
  // Custom string (escape hatch)
  | (string & {});

// ─────────────────────────────────────────
// Locale Types
// ─────────────────────────────────────────

export interface LocaleDelimiters {
  thousands: string;
  decimal: string;
}

export interface LocaleAbbreviations {
  thousand: string;
  million: string;
  billion: string;
  trillion: string;
}

export interface LocaleCurrency {
  symbol: string;
  position: 'prefix' | 'suffix';
  code: string;
}

export interface LocaleConfig {
  name: string;
  delimiters: LocaleDelimiters;
  abbreviations: LocaleAbbreviations;
  ordinal: (number: number) => string;
  currency: LocaleCurrency;
}

// ─────────────────────────────────────────
// Config Types
// ─────────────────────────────────────────

export interface NumrelConfig {
  locale: string;
  defaultFormat: FormatToken;
  nullFormat: string;
  zeroFormat: string;
  nanFormat: string;
  infinityFormat: string;
  scalePercentBy100: boolean;
}

// ─────────────────────────────────────────
// Instance Interface
// ─────────────────────────────────────────

export interface NumrelInstance {
  // Core
  value(): number | null;
  format(formatString?: FormatToken): string;
  clone(): NumrelInstance;

  // Math Operations
  add(value: NumrelInput): NumrelInstance;
  subtract(value: NumrelInput): NumrelInstance;
  multiply(value: NumrelInput): NumrelInstance;
  divide(value: NumrelInput): NumrelInstance;
  modulo(value: NumrelInput): NumrelInstance;
  power(value: NumrelInput): NumrelInstance;
  abs(): NumrelInstance;
  ceil(precision?: number): NumrelInstance;
  floor(precision?: number): NumrelInstance;
  round(precision?: number): NumrelInstance;
  clamp(min: NumrelInput, max: NumrelInput): NumrelInstance;

  // Validation
  isValid(): boolean;
  isInteger(): boolean;
  isFloat(): boolean;
  isPositive(): boolean;
  isNegative(): boolean;
  isZero(): boolean;
  isFinite(): boolean;
  isNaN(): boolean;

  // Comparison
  greaterThan(value: NumrelInput): boolean;
  greaterThanOrEqualTo(value: NumrelInput): boolean;
  lessThan(value: NumrelInput): boolean;
  lessThanOrEqualTo(value: NumrelInput): boolean;
  equalTo(value: NumrelInput): boolean;
  between(min: NumrelInput, max: NumrelInput): boolean;

  // Output
  toString(): string;
  toJSON(): number | null;
  valueOf(): number;
}

// ─────────────────────────────────────────
// Factory Types
// ─────────────────────────────────────────

export interface NumrelFactory {
  (value: NumrelInput): NumrelInstance;
  locale(name: string): NumrelFactory;
  registerLocale(config: LocaleConfig): NumrelFactory;
  getLocale(name?: string): LocaleConfig;
  setDefaults(config: Partial<NumrelConfig>): NumrelFactory;
  reset(): NumrelFactory;
}

// ─────────────────────────────────────────
// Plugin Types
// ─────────────────────────────────────────

export interface NumrelPlugin {
  name: string;
  format?: (
    value: number,
    formatString: string,
    config: NumrelConfig,
    locale: LocaleConfig,
  ) => string | null;
  unformat?: (
    value: string,
    config: NumrelConfig,
    locale: LocaleConfig,
  ) => number | null;
}
