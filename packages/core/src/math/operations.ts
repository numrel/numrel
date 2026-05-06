// src/math/operations.ts
import {
  preciseAdd,
  preciseSubtract,
  preciseMultiply,
  preciseDivide,
  preciseRound,
  preciseCeil,
  preciseFloor,
} from './precision';

/**
 * The `add` function in TypeScript calls the `preciseAdd` function to add two numbers and returns the
 * result.
 * @param {number} a - number - the first number to be added
 * @param {number} b - The parameter `b` in the `add` function represents the second number that will
 * be added to the first number `a`.
 * @returns The `add` function is returning the result of calling the `preciseAdd` function with the
 * arguments `a` and `b`.
 */
export const add = (a: number, b: number): number => {
  return preciseAdd(a, b);
};

/**
 * The `subtract` function in TypeScript calls the `preciseSubtract` function to subtract two numbers
 * and returns the result.
 * @param {number} a - The `subtract` function takes two parameters, `a` and `b`, both of which are
 * numbers. The function subtracts `b` from `a` and returns the result.
 * @param {number} b - The parameter `b` represents the second number that will be subtracted from the
 * first number `a` in the `subtract` function.
 * @returns The `subtract` function is returning the result of calling the `preciseSubtract` function
 * with the arguments `a` and `b`.
 */
export const subtract = (a: number, b: number): number => {
  return preciseSubtract(a, b);
};

/**
 * The `multiply` function in TypeScript takes two numbers as input and returns their product using the
 * `preciseMultiply` function.
 * @param {number} a - The `multiply` function takes two parameters, `a` and `b`, both of which are
 * numbers. The function multiplies these two numbers together and returns the result.
 * @param {number} b - The parameter `b` is a number that is being passed to the `multiply` function.
 * @returns The `multiply` function is returning the result of calling the `preciseMultiply` function
 * with the arguments `a` and `b`.
 */
export const multiply = (a: number, b: number): number => {
  return preciseMultiply(a, b);
};

/**
 * The `divide` function in TypeScript divides two numbers while guarding against division by zero.
 * @param {number} a - The `a` parameter in the `divide` function represents the dividend, which is the
 * number that is being divided.
 * @param {number} b - The parameter `b` represents the divisor in a division operation. It is the
 * number by which the dividend (`a`) is divided.
 * @returns The `divide` function is returning the result of calling the `preciseDivide` function with
 * the arguments `a` and `b`.
 */
export const divide = (a: number, b: number): number => {
  // Guard is also inside preciseDivide
  // but we keep it here for clarity
  if (b === 0) throw new Error('[numrel] Division by zero');

  return preciseDivide(a, b);
};

/* The `export const modulo` function is defining a function named `modulo` that calculates the
remainder of dividing the first number `a` by the second number `b`. It includes a check to ensure
that division by zero does not occur. If the divisor `b` is equal to 0, it throws an error with the
message '[numrel] Modulo by zero'. This function helps in performing the modulo operation while
handling the edge case of dividing by zero. */
export const modulo = (a: number, b: number): number => {
  if (b === 0) throw new Error('[numrel] Modulo by zero');

  return a % b;
};

/**
 * The function `power` calculates the result of raising a base number to a specified exponent.
 * @param {number} base - The `base` parameter represents the number that will be raised to a power.
 * @param {number} exp - The `exp` parameter in the `power` function represents the exponent to which
 * the `base` number is raised. It determines how many times the `base` number is multiplied by itself.
 * @returns The `power` function is returning the result of raising the `base` to the power of `exp`
 * using `Math.pow` function.
 */
export const power = (base: number, exp: number): number => {
  return Math.pow(base, exp);
};

/**
 * The function `abs` takes a number as input and returns its absolute value.
 * @param {number} value - The `value` parameter is a number for which you want to calculate the
 * absolute value.
 * @returns The absolute value of the input number is being returned.
 */
export const abs = (value: number): number => {
  return Math.abs(value);
};

/**
 * The `clamp` function ensures a given value stays within a specified range defined by minimum and
 * maximum values.
 * @param {number} value - The `value` parameter represents the number that you want to clamp within
 * the specified range defined by `min` and `max`.
 * @param {number} min - The `min` parameter represents the minimum value that the `value` parameter
 * can be clamped to.
 * @param {number} max - The `max` parameter in the `clamp` function represents the maximum value that
 * the `value` parameter can be clamped to. It ensures that the `value` does not exceed this upper
 * limit.
 * @returns The `clamp` function returns the value that is clamped within the specified range defined
 * by the `min` and `max` values.
 */
export const clamp = (value: number, min: number, max: number): number => {
  if (min > max) {
    throw new Error('[numrel] clamp: min cannot be greater than max');
  }

  return Math.min(Math.max(value, min), max);
};

export { preciseRound as round, preciseCeil as ceil, preciseFloor as floor };
