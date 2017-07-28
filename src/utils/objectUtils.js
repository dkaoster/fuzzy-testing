import assert from 'assert';

/**
 *
 * objectMap applies function func to all items in the object
 *
 * @param object
 * @param func
 * @returns {{}}
 */
function objectMap(object, func) {
  assert(typeof object === 'object', 'typeof object is not an object.');
  assert(typeof func === 'function', 'typeof func is not an function.');

  const objRet = {};
  const keys = Object.keys(object);
  for (let i = 0; i < keys.length; i += 1) {
    if (object[keys[i]]
      && typeof object[keys[i]] === 'object'
      && !Array.isArray(object[keys[i]])) {
      objRet[keys[i]] = objectMap(object[keys[i]], func);
    } else {
      objRet[keys[i]] = func(object[keys[i]]);
    }
  }
  return objRet;
}

export { objectMap };
