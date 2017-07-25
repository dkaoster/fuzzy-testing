import assert from 'assert';
import { fuzzFunction } from '../';

// Test functions
function add(a, b) {
  return a + b;
}

function divide(a, b) {
  return a / b;
}

function onlyBools(a) {
  assert.equal(typeof a, 'boolean');
}

// Tests
describe('fuzzFunction', () => {
  it('returns a bad result', () => {
    expect(fuzzFunction(add, {
      returnTypes: ['number'],
    })).not.toEqual([]);
  });

  it('has multiple results', () => {
    expect(fuzzFunction(add, {
      returnFirstError: false,
      returnTypes: ['number'],
      maxArgs: 2,
    }).length > 1).toBe(true);
  });

  it('test divide', () => {
    expect(fuzzFunction(divide, {
      argumentValues: [0],
    })).toEqual([]);
  });

  it('test error', () => {
    expect(fuzzFunction(onlyBools, {
      canThrowError: true,
    })).toEqual([]);
  });
});
