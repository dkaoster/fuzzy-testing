import assert from 'assert';

/**
 *
 * Given two arrays a and b, return a 2d array with all possible combinations of the two arrays.
 *
 * @param a
 * @param b
 * @returns []
 */
function combine(a, b) {
  // ensure that arrays were given
  assert(Array.isArray(a), 'a is not an array.');
  assert(Array.isArray(b), 'b is not an array.');

  const superSet = [];
  a.forEach((aElem) => {
    b.forEach((bElem) => {
      superSet.push([aElem, bElem]);
    });
  });
  return superSet;
}

/**
 *
 * Given two arrays a and b, where a is a 2d array,
 * return a 2d array with all possible combinations of the two arrays.
 *
 * @param a
 * @param b
 * @returns []
 */
function combineToArray(a, b) {
  // ensure that arrays were given
  assert(Array.isArray(a), 'a is not an array.');
  assert(Array.isArray(b), 'b is not an array.');
  a.map(item => assert(Array.isArray(item), 'item in a is not an array.'));

  const superSet = [];
  a.forEach((aElem) => {
    b.forEach((bElem) => {
      superSet.push(aElem.concat([bElem]));
    });
  });
  return superSet;
}

/**
 *
 * Combines one array multiple times
 *
 * @param a
 * @param end
 * @returns []
 */
function combineMultiple(a, end) {
  // ensure that valid values were given
  assert(Array.isArray(a), 'a is not an array.');
  assert(typeof end === 'number', 'end is not an number.');

  let collector = [[]];
  for (let i = 0; i < end; i += 1) {
    collector = combineToArray(collector, a);
  }
  return collector;
}

/**
 *
 * Combines one array multiple times, and saves combinations of all lengths
 *
 * @param a
 * @param end
 * @param start
 * @returns []
 */
function combineMultipleLengths(a, end, start) {
  // ensure that valid values were given
  start = start || 0;
  assert(Array.isArray(a), 'a is not an array.');
  assert(typeof end === 'number', 'end is not an number.');
  assert(typeof start === 'number' || !(start), 'start is not an number.');
  assert(end >= start, 'start is greater than end.');

  let collector = [[[]]];
  if (start > 0) {
    collector = [combineMultiple(a, start)];
  }
  let flattenedCollector = [];
  for (let i = 0; i < end - start; i += 1) {
    collector[i + 1] = combineToArray(collector[i], a);
  }
  for (let i = 0; i < collector.length; i += 1) {
    flattenedCollector = flattenedCollector.concat(collector[i]);
  }
  return flattenedCollector;
}

export { combine, combineToArray, combineMultiple, combineMultipleLengths };
