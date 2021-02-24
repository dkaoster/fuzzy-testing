/* eslint-disable no-undef */

import { objectMap } from '../objectUtils';

describe('objectUtils tests', () => {
  it('objectMap should apply functions to properties', () => {
    expect(objectMap({
      test: 1,
      test2: 2,
    },
    (item) => item + 1)).toEqual({
      test: 2,
      test2: 3,
    });
  });

  it('objectMap should apply functions to properties recursively', () => {
    expect(objectMap({
      test: 1,
      test2: 2,
      test3: {
        test: 1,
        test2: 2,
      },
    },
    (item) => item + 1)).toEqual({
      test: 2,
      test2: 3,
      test3: {
        test: 2,
        test2: 3,
      },
    });
  });

  it('objectMap should only take valid arguments', () => {
    expect(() => objectMap({}, [4, 5, 6])).toThrow();
    expect(() => objectMap(undefined, () => {})).toThrow();
  });
});
