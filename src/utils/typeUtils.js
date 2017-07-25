// Import the list of bad strings
import badStrings from './strings/badStrings';

/**
 * Types
 *
 * Random value generators for fuzzing.
 */

/* eslint-disable no-use-before-define  */

// A map of types to functions that will generate random values of said type.
const typesMap = {
  boolean: randomBool,
  null: randomNull,
  undefined: randomUndefined,
  number: randomNumber,
  int: randomInt,
  string: randomString,
  object: randomObject,
  array: randomArray,
  function: randomFunc,
};

const primitiveTypesMap = {
  string: randomString,
  bool: randomBool,
  number: randomNumber,
  int: randomInt,
  undefined: randomUndefined,
  null: randomNull,
};

/* eslint-enable no-use-before-define  */

/**
 * Generates a random primitive value.
 *
 * @returns {*}
 */
function randomPrimitive() {
  return Object.values(primitiveTypesMap)[Math.floor(Math.random() *
    Object.values(primitiveTypesMap).length)]();
}

/**
 * Pulls a random string from the provided list of bad strings.
 *
 * @returns {string}
 */
function randomString() {
  return badStrings[Math.floor(Math.random() * badStrings.length)];
}

/**
 * Generates a random object.
 *
 * @returns {{}}
 */
function randomObject() {
  const obj = {};
  for (let i = 0; i < Math.floor(Math.random() * 50); i += 1) {
    obj[randomString()] = randomPrimitive();
  }
  return obj;
}

/**
 * Generates a random array
 *
 * @returns {Array}
 */
function randomArray() {
  return (new Array(Math.floor(Math.random() * 50))).map(() => randomPrimitive());
}

/**
 * Generates a random boolean
 *
 * @returns {boolean}
 */
function randomBool() {
  return Math.random() > 0.5;
}

/**
 * Generates a random floating point number.
 *
 * @returns {number}
 */
function randomNumber() {
  return (Math.random() * Number.MAX_VALUE);
}

/**
 * Generates a random integer
 *
 * @returns {number}
 */
function randomInt() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

/**
 * Generates undefined.
 *
 * @returns {undefined}
 */
function randomUndefined() {
  return undefined;
}

/**
 * Generates null.
 *
 * @returns {null}
 */
function randomNull() {
  return null;
}

/**
 * generates a random function that returns a random primitive.
 *
 * @returns {function(): *}
 */
function randomFunc() {
  return () => randomPrimitive();
}

export { typesMap, primitiveTypesMap };
