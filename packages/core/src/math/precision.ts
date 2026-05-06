// ─────────────────────────────────────────
// Floating Point Precision Fixes
// ─────────────────────────────────────────

/**
 * The function `getDecimalPlaces` calculates the number of decimal places in a given number.
 * @param {number} value - The `getDecimalPlaces` function takes a number `value` as input and
 * calculates the number of decimal places in that number. The function checks if the input number is
 * finite, then converts it to a string to analyze its decimal representation. It handles scientific
 * notation (e.g., 1.23
 * @returns The function `getDecimalPlaces` returns the number of decimal places in the given `value`.
 */
export const getDecimalPlaces = (value: number): number => {
  if (!isFinite(value)) return 0;

  const str = value.toString();

  if (str.includes('e-')) {
    const parts = str.split('e-');
    const exp = parseInt(parts[1] ?? '0', 10);
    return exp;
  }

  if (str.includes('e')) {
    return 0;
  }

  const decimalPart = str.split('.')[1];

  return decimalPart ? decimalPart.length : 0;
};

/**
 * The `preciseAdd` function in TypeScript provides a more accurate addition operation for
 * floating-point numbers to avoid common precision issues.
 * @param {number} a - The `a` parameter in the `preciseAdd` function represents the first number that
 * you want to add precisely.
 * @param {number} b - The `b` parameter in the `preciseAdd` function represents the second number that
 * you want to add with the first number `a` while maintaining precision in the result.
 * @returns The `preciseAdd` function returns the sum of two numbers `a` and `b` with improved
 * precision to avoid floating-point arithmetic errors.
 * @fixes Fixes: 0.1 + 0.2 = 0.30000000000000004
 */
export const preciseAdd = (a: number, b: number): number => {
  const aDecimals = getDecimalPlaces(a);

  const bDecimals = getDecimalPlaces(b);

  const multiplier = Math.pow(10, Math.max(aDecimals, bDecimals));

  const aInt = Math.round(a * multiplier);

  const bInt = Math.round(b * multiplier);

  return (aInt + bInt) / multiplier;
};

/**
 * The `preciseSubtract` function calculates the precise subtraction of two numbers with decimal places
 * taken into account.
 * @param {number} a - The `a` parameter in the `preciseSubtract` function represents the first number
 * from which the second number will be subtracted with precision.
 * @param {number} b - Thank you for providing the code snippet. Could you please clarify what
 * information you would like to know about parameter `b`?
 * @returns The `preciseSubtract` function is returning the result of subtracting two numbers `a` and
 * `b` with precision. It calculates the difference between the two numbers after considering their
 * decimal places and returns the result with the correct precision.
 */
export const preciseSubtract = (a: number, b: number): number => {
  const aDecimals = getDecimalPlaces(a);

  const bDecimals = getDecimalPlaces(b);

  const multiplier = Math.pow(10, Math.max(aDecimals, bDecimals));

  const aInt = Math.round(a * multiplier);

  const bInt = Math.round(b * multiplier);

  return (aInt - bInt) / multiplier;
};

/**
 * The `preciseMultiply` function in TypeScript calculates the product of two numbers with precision
 * handling for decimal places.
 * @param {number} a - The `preciseMultiply` function takes two parameters `a` and `b`, both of type
 * number. The function calculates the product of these two numbers with precision handling for decimal
 * places.
 * @param {number} b - Thank you for providing the code snippet. Could you please provide the value of
 * parameter `b` so that I can assist you further with the precise multiplication function?
 * @returns The `preciseMultiply` function returns the result of multiplying two numbers `a` and `b`
 * with precision handling for decimal places.
 */
export const preciseMultiply = (a: number, b: number): number => {
  const aDecimals = getDecimalPlaces(a);

  const bDecimals = getDecimalPlaces(b);

  const multiplier = Math.pow(10, aDecimals + bDecimals);

  const aInt = Math.round(a * Math.pow(10, aDecimals));

  const bInt = Math.round(b * Math.pow(10, bDecimals));

  return (aInt * bInt) / multiplier;
};

/**
 * The `preciseDivide` function in TypeScript performs division between two numbers and cleans up
 * floating point artifacts for more accurate results.
 * @param {number} a - Thank you for providing the code snippet. Could you please provide the value of
 * parameter `a` so that I can assist you further?
 * @param {number} b - Thank you for providing the code snippet. Could you please clarify what specific
 * information or value you would like to know about parameter `b`?
 * @returns The `preciseDivide` function returns the result of dividing `a` by `b`, with floating point
 * artifacts cleaned up using `toPrecision(12)`.
 */
export const preciseDivide = (a: number, b: number): number => {
  if (b === 0) throw new Error('[numrel] Division by zero');

  // Direct division is actually correct for most cases
  // We just clean up floating point artifacts

  const result = a / b;

  // Clean up floating point artifacts using toPrecision
  const cleaned = parseFloat(result.toPrecision(12));

  return cleaned;
};

/**
 * The `preciseRound` function in TypeScript rounds a number to a specified number of decimal places
 * with precision.
 * @param {number} value - The `value` parameter is the number that you want to round to a specific
 * number of decimal places.
 * @param {number} [decimals=0] - The `decimals` parameter in the `preciseRound` function specifies the
 * number of decimal places to round the `value` to. By default, if the `decimals` parameter is not
 * provided when calling the function, it is set to 0, which means the function will round the
 * @returns The `preciseRound` function is returning a number that has been rounded to the specified
 * number of decimal places.
 * @fixes - Fixes 1.005 rounding bug
 */
export const preciseRound = (value: number, decimals: number = 0): number => {
  const multiplier = Math.pow(10, decimals);

  return (
    Math.round(parseFloat((value * multiplier).toPrecision(15))) / multiplier
  );
};

/**
 * The `preciseCeil` function in TypeScript rounds up a number to a specified number of decimal places
 * with precision.
 * @param {number} value - The `value` parameter is the number that you want to round up to a precise
 * ceiling value.
 * @param {number} [decimals=0] - The `decimals` parameter in the `preciseCeil` function specifies the
 * number of decimal places to round the `value` to. By default, if no value is provided for
 * `decimals`, it is set to 0, which means the `value` will be rounded to the
 * @returns The `preciseCeil` function returns a number that is the result of rounding up the `value`
 * parameter to the specified number of `decimals` using precise arithmetic calculations.
 */
export const preciseCeil = (value: number, decimals: number = 0): number => {
  const multiplier = Math.pow(10, decimals);

  return (
    Math.ceil(parseFloat((value * multiplier).toPrecision(15))) / multiplier
  );
};

/**
 * The `preciseFloor` function in TypeScript rounds down a number to a specified number of decimal
 * places with precision.
 * @param {number} value - The `value` parameter is the number that you want to round down to a
 * specific number of decimal places.
 * @param {number} [decimals=0] - The `decimals` parameter in the `preciseFloor` function specifies the
 * number of decimal places to which you want to floor the `value`. By default, if the `decimals`
 * parameter is not provided when calling the function, it is set to 0, meaning the function will floor
 * @returns The `preciseFloor` function returns a number that is the result of flooring the input
 * `value` to a specified number of `decimals`.
 */
export const preciseFloor = (value: number, decimals: number = 0): number => {
  const multiplier = Math.pow(10, decimals);

  return (
    Math.floor(parseFloat((value * multiplier).toPrecision(15))) / multiplier
  );
};
