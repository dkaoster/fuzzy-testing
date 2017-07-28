import assert from 'assert';
import { combineMultipleLengths, typesMap } from './utils';

/*
 *  _____ _   _ ____________   __
 * |  ___| | | |__  /__  /\ \ / /
 * | |_  | | | | / /  / /  \ V /
 * |  _| | |_| |/ /_ / /_   | |
 * |_|    \___//____/____|  |_|
 *
 * Functions for fuzz testing in Javascript.
 *
 * Author: Daniel Kao (dkao@diplateevo.com)
 *
 */

/**
 *
 * fuzzFunction
 *
 * fuzzFunction takes a function and an object of options and fuzzes the function.
 * It returns the results of the fuzz in an array.
 *
 * options:
 *    returnTypes: can be an array of types represented by strings, or a function that validates.
 *    returnFirstError: boolean that does short circuit evaluation if true.
 *    maxArgs: the maximum number of arguments to send to the function.
 *    minArgs: the minimum number of arguments to send to the function.
 *    argumentTypes: an array of argument types.
 *    argumentValues: an array of values that will be tested.
 *    iterations: the number of times that a function will be run per argument combination.
 *    canThrowError: whether or not the function can throw an error or not.
 *
 * @param func
 * @param options
 * @returns {Array}
 */
function fuzzFunction(func, options) {
  // Process options
  options = Object.assign({
    returnTypes: Object.keys(typesMap),
    returnFirstError: true,
    maxArgs: 5,
    minArgs: 0,
    argumentTypes: Object.keys(typesMap),
    argumentValues: [],
    iterations: 3,
    canThrowError: false,
  }, options);

  // validate options
  assert(typeof options.returnTypes === 'function' || Array.isArray(options.returnTypes),
    'returnTypes is not a function or an array');
  assert.equal(typeof options.returnFirstError, 'boolean', 'returnFirstError is not a boolean');
  assert(Number.isInteger(options.maxArgs), 'maxArgs is not an integer');
  assert(Number.isInteger(options.minArgs), 'minArgs is not an integer');
  assert(Array.isArray(options.argumentTypes), 'argumentTypes is not an array');
  assert(Array.isArray(options.argumentValues), 'argumentValues is not an array');
  assert.equal(typeof options.iterations, 'number', 'Iterations is not a number');
  assert.equal(typeof options.canThrowError, 'boolean', 'canThrowError is not a boolean');

  // Generates an array of all the functions to generate the argument types and values
  // that we want to fuzz with. If argument type does not exist, filter it out.
  const argsFunc = options.argumentTypes.filter(argType => typeof typesMap[argType] === 'function')
    .map(argType => typesMap[argType])
    .concat(options.argumentValues.map(value => (() => value)));

  // Generates all combinations of arguments
  const randomArgs = combineMultipleLengths(argsFunc, options.maxArgs, options.minArgs);

  // An array for keeping track of errors
  const errors = [];

  // Loop through all arguments, execute the functions to generate the values, and run the
  // fuzzer on the function.
  for (let index = 0; index < randomArgs.length; index += 1) {
    // Run the fuzzer on the function multiple times.
    for (let iteration = 0; iteration < options.iterations; iteration += 1) {
      // Instantiate all the arguments.
      const args = randomArgs[index].map(arg => arg());

      // Try the fuzzer, and compare the result to returnTypes.
      try {
        // If returnTypes is an array, look for the type inside the array.
        if (Array.isArray(options.returnTypes) &&
          options.returnTypes.indexOf(typeof func(...args)) < 0
        ) {
          errors.push(`arguments ${args} did not return one of ${options.returnTypes}`);
          if (options.returnFirstError) {
            return errors;
          }
        }
        // If returnTypes is a function, execute the validation function on the result.
        if (
          (typeof options.returnTypes === 'function' && !options.returnTypes(func(...args)))
        ) {
          errors.push(`arguments ${args} did not satisfy ${options.returnTypes}`);
          if (options.returnFirstError) {
            return errors;
          }
        }
      } catch (e) {
        if (!options.canThrowError) {
          errors.push(`arguments ${args} threw error ${e}`);
          if (options.returnFirstError) {
            return errors;
          }
        }
      }
    }
  }

  // Return the errors
  return errors;
}

// eslint-disable-next-line import/prefer-default-export
export { fuzzFunction };
