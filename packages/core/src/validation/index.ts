const isValidNumber = (value: number | null): value is number => {
  return value !== null && !isNaN(value);
};

const isInteger = (value: number): boolean => {
  return Number.isInteger(value);
};

const isFloat = (value: number): boolean => {
  return !Number.isInteger(value);
};

const isPositive = (value: number): boolean => {
  return value > 0;
};

const isNegative = (value: number): boolean => {
  return value < 0;
};

const isZero = (value: number): boolean => {
  return value === 0;
};

const isFiniteNumber = (value: number): boolean => {
  return isFinite(value);
};

const isNaNNumber = (value: number): boolean => {
  return isNaN(value);
};

const greaterThan = (a: number, b: number): boolean => {
  return a > b;
};

const greaterThanOrEqualTo = (a: number, b: number): boolean => {
  return a >= b;
};

const lessThan = (a: number, b: number): boolean => {
  return a < b;
};

const lessThanOrEqualTo = (a: number, b: number): boolean => {
  return a <= b;
};

const equalTo = (a: number, b: number): boolean => {
  return a === b;
};

const between = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

export {
  between,
  equalTo,
  greaterThan,
  greaterThanOrEqualTo,
  isFiniteNumber,
  isFloat,
  isInteger,
  isNaNNumber,
  isNegative,
  isPositive,
  isValidNumber,
  isZero,
  lessThan,
  lessThanOrEqualTo,
};
