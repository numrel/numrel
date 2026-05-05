// ─────────────────────────────────────────
// Floating Point Precision Fixes
// The #1 bug in Numeral.js!
// ─────────────────────────────────────────

/**
 * The function `getDecimalPlaces` calculates the number of decimal places in a given number, handling
 * exponential notation as well.
 * @param {number} value - The `value` parameter is a number for which you want to determine the number
 * of decimal places.
 * @returns The `getDecimalPlaces` function returns the number of decimal places in the given `value`.
 */
const getDecimalPlaces = (value: number): number => {
  if (!isFinite(value)) return 0;

  const str = value.toString();

  // Handle exponential notation
  if (str.includes('e')) {
    const [base, exp] = str.split('e');
    const expNum = parseInt(exp ?? '0', 10);
    const baseDecimals = (base ?? '').split('.')[1]?.length ?? 0;
    return Math.max(0, baseDecimals - expNum);
  }

  return str.split('.')[1]?.length ?? 0;
};

/**
 * The `preciseOperation` function performs arithmetic operations with precision handling for addition,
 * subtraction, multiplication, and division.
 * @example Fixes: 0.1 + 0.2 = 0.30000000000000004
 * @param {number} a - The `a` parameter in the `preciseOperation` function represents the first number
 * involved in the operation (addition, subtraction, multiplication, or division).
 * @param {number} b - The `b` parameter in the `preciseOperation` function represents the second
 * number that will be used in the mathematical operation specified by the `operation` parameter. It
 * can be any valid number, positive or negative, integer or decimal, depending on the operation you
 * want to perform (addition,
 * @param {'add' | 'subtract' | 'multiply' | 'divide'} operation - The `operation` parameter in the
 * `preciseOperation` function specifies the type of mathematical operation to be performed on the two
 * input numbers `a` and `b`. The possible values for the `operation` parameter are:
 * @returns The `preciseOperation` function performs arithmetic operations on two numbers `a` and `b`
 * based on the specified operation. Depending on the operation provided ('add', 'subtract',
 * 'multiply', 'divide'), it calculates the result with precision handling for floating-point
 * arithmetic.
 */
const preciseOperation = (
  a: number,
  b: number,
  operation: 'add' | 'subtract' | 'multiply' | 'divide',
): number => {
  const aDecimals = getDecimalPlaces(a);
  const bDecimals = getDecimalPlaces(b);
  const multiplier = Math.pow(10, Math.max(aDecimals, bDecimals));

  const aInt = Math.round(a * multiplier);
  const bInt = Math.round(b * multiplier);

  switch (operation) {
    case 'add':
      return (aInt + bInt) / multiplier;

    case 'subtract':
      return (aInt - bInt) / multiplier;

    case 'multiply': {
      // For multiply we need different approach
      const result = (aInt * bInt) / (multiplier * multiplier);
      return parseFloat(result.toPrecision(15));
    }

    case 'divide': {
      if (bInt === 0) throw new Error('[numrel] Division by zero');
      const result = aInt / bInt;
      return parseFloat(result.toPrecision(15));
    }
  }
};

/**
 * The `preciseRound` function in TypeScript rounds a number to a specified number of decimal places
 * with precision.
 * @param {number} value - The `value` parameter is the number that you want to round to a specific
 * number of decimal places.
 * @param {number} [decimals=0] - The `decimals` parameter in the `preciseRound` function specifies the
 * number of decimal places to round the `value` to. By default, if no value is provided for
 * `decimals`, it will be set to 0, meaning the function will round the `value` to the
 * @returns The function `preciseRound` is returning a number that has been rounded to the specified
 * number of decimal places.
 * @example Fixes: 1.005 rounding to 1.00 instead of 1.01
 */
const preciseRound = (value: number, decimals: number = 0): number => {
  const multiplier = Math.pow(10, decimals);

  return (
    Math.round(parseFloat((value * multiplier).toPrecision(15))) / multiplier
  );
};

/**
 * The `preciseCeil` function rounds a number up to a specified number of decimal places with
 * precision.
 * @param {number} value - The `value` parameter is the number that you want to round up to the nearest
 * integer or a specified number of decimal places.
 * @param {number} [decimals=0] - The `decimals` parameter in the `preciseCeil` function specifies the
 * number of decimal places to round the `value` to before applying the `Math.ceil` function. By
 * default, if the `decimals` parameter is not provided when calling the function, it is set to
 * @returns The function `preciseCeil` returns the input `value` rounded up to the nearest integer with
 * the specified number of `decimals`.
 */
const preciseCeil = (value: number, decimals: number = 0): number => {
  const multiplier = Math.pow(10, decimals);

  return (
    Math.ceil(parseFloat((value * multiplier).toPrecision(15))) / multiplier
  );
};

/**
 * The `preciseFloor` function rounds a number to a specified number of decimal places with precision.
 * @param {number} value - The `value` parameter is the number that you want to round down to a
 * specific number of decimal places.
 * @param {number} [decimals=0] - The `decimals` parameter in the `preciseFloor` function specifies the
 * number of decimal places to which you want to floor the `value`. By default, if the `decimals`
 * parameter is not provided when calling the function, it is set to 0, meaning the function will floor
 * @returns The `preciseFloor` function is returning a number that is the result of flooring the value
 * multiplied by 10 to the power of the specified decimals, divided by the same multiplier. The value
 * is first multiplied by the multiplier to shift the decimal point to the right based on the number of
 * decimals specified. The `toPrecision(15)` method is used to ensure precision up to 15 digits before
 */
const preciseFloor = (value: number, decimals: number = 0): number => {
  const multiplier = Math.pow(10, decimals);

  return (
    Math.floor(parseFloat((value * multiplier).toPrecision(15))) / multiplier
  );
};

export {
  getDecimalPlaces,
  preciseCeil,
  preciseFloor,
  preciseOperation,
  preciseRound,
};
