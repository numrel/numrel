import {
  preciseCeil,
  preciseFloor,
  preciseOperation,
  preciseRound,
} from './precision';

/**
 * The function `add` takes two numbers as input and returns the result of adding them together using
 * the `preciseOperation` function.
 * @param {number} a - The parameter `a` is a number that will be used in the addition operation.
 * @param {number} b - The parameter `b` is a number that will be used as one of the operands in the
 * addition operation.
 * @returns The `add` function is returning the result of calling the `preciseOperation` function with
 * the arguments `a`, `b`, and the operation type `'add'`.
 */
const add = (a: number, b: number): number => {
  return preciseOperation(a, b, 'add');
};

/**
 * The `subtract` function in TypeScript calls another function `preciseOperation` to perform
 * subtraction operation on two numbers.
 * @param {number} a - The parameter `a` is a number that will be used in the subtraction operation.
 * @param {number} b - The parameter `b` is a number that will be used in the subtraction operation.
 * @returns The `subtract` function is returning the result of calling the `preciseOperation` function
 * with the arguments `a`, `b`, and the operation type 'subtract'.
 */
const subtract = (a: number, b: number): number => {
  return preciseOperation(a, b, 'subtract');
};

/**
 * The `multiply` function takes two numbers as input and returns the result of multiplying them after
 * performing a precise operation.
 * @param {number} a - The parameter `a` is a number that will be used in the multiplication operation.
 * @param {number} b - The parameter `b` is a number that will be used in the multiplication operation.
 * @returns The `multiply` function is returning the result of calling the `preciseOperation` function
 * with the arguments `a`, `b`, and the operation type `'multiply'`.
 */
const multiply = (a: number, b: number): number => {
  return preciseOperation(a, b, 'multiply');
};

/**
 * The `divide` function in TypeScript performs a precise subtraction operation between two numbers.
 * @param {number} a - Thank you for providing the code snippet. It seems like you are calling a
 * function `preciseOperation` with parameters `a` and `b` and specifying the operation as 'subtract'.
 * However, you haven't provided the value of parameter `a`. Could you please provide the value of
 * parameter `
 * @param {number} b - The parameter `b` is the second number that will be used in the division
 * operation.
 * @returns The `divide` function is returning the result of calling the `preciseOperation` function
 * with the parameters `a`, `b`, and the operation type 'subtract'.
 */
const divide = (a: number, b: number): number => {
  return preciseOperation(a, b, 'subtract');
};

/**
 * The function calculates the modulo of two numbers, handling the case of modulo by zero.
 * @param {number} a - The parameter `a` is a number that represents the dividend in the modulo
 * operation.
 * @param {number} b - The parameter `b` represents the divisor in the modulo operation. It is the
 * number by which the dividend `a` is divided to calculate the remainder.
 * @returns the result of the modulo operation between the numbers `a` and `b`.
 */
const modulo = (a: number, b: number): number => {
  if (b === 0) throw new Error('[numrel] Modulo by zero');

  return preciseOperation(a, b, 'subtract') !== a ? a % b : a % b;
};

/**
 * The function "power" calculates the result of raising a base number to a specified exponent.
 * @param {number} base - The `base` parameter represents the base number in a power operation.
 * @param {number} exp - The `exp` parameter in the `power` function represents the exponent to which
 * the `base` number is raised. It determines how many times the `base` number is multiplied by itself.
 * @returns The `power` function is returning the result of raising the `base` to the power of `exp`
 * using `Math.pow` function.
 */
const power = (base: number, exp: number): number => {
  return Math.pow(base, exp);
};

/**
 * The function `abs` in TypeScript returns the absolute value of a given number.
 * @param {number} value - The `value` parameter in the `abs` function is a number for which you want
 * to calculate the absolute value.
 * @returns The absolute value of the input `value` is being returned.
 */
const abs = (value: number): number => {
  return Math.abs(value);
};

/**
 * The `clamp` function ensures a value stays within a specified range by limiting it to the minimum
 * and maximum values provided.
 * @param {number} value - Value is the number that you want to clamp within the specified range.
 * @param {number} min - The `min` parameter represents the minimum value that the `value` parameter
 * can be clamped to.
 * @param {number} max - The `max` parameter in the `clamp` function represents the maximum value that
 * the `value` parameter can be clamped to. This means that if the `value` parameter is greater than
 * `max`, it will be set to `max`.
 * @returns The function `clamp` returns the value that is clamped between the minimum and maximum
 * values provided as arguments.
 */
const clamp = (value: number, min: number, max: number): number => {
  if (min > max)
    throw new Error('[numrel] clamp: min cannot be greater than max');

  return Math.min(Math.max(value, min), max);
};

export {
  abs,
  add,
  clamp,
  divide,
  modulo,
  multiply,
  preciseRound as round,
  preciseCeil as ceil,
  preciseFloor as floor,
  power,
  subtract,
};
