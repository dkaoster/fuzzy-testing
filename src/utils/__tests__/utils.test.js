import { combine, combineToArray, combineMultiple, combineMultipleLengths } from '../arrayUtils';

describe('combine', () => {
  it('combines two arrays', () => {
    expect(combine(
      [1, 2, 3], [4, 5, 6]
    )).toEqual(
      [[1, 4], [1, 5], [1, 6], [2, 4], [2, 5], [2, 6], [3, 4], [3, 5], [3, 6]]
    );
  });
});

describe('combineToArray', () => {
  it('combines two arrays, one of which is a 2d array', () => {
    expect(combineToArray(
      [[1], [2], [3]], [4, 5, 6]
    )).toEqual(
      [[1, 4], [1, 5], [1, 6], [2, 4], [2, 5], [2, 6], [3, 4], [3, 5], [3, 6]]
    );
  });
});

describe('combineMultiple', () => {
  it('combines one array multiple times', () => {
    expect(combineMultiple(
      [1, 2], 3
    )).toEqual(
      [[1, 1, 1], [1, 1, 2], [1, 2, 1], [1, 2, 2], [2, 1, 1], [2, 1, 2], [2, 2, 1], [2, 2, 2]]
    );
  });
});

describe('combineMultipleLengths', () => {
  it('combines one array multiple times and saves all lengths', () => {
    expect(combineMultipleLengths(
      [1, 2], 3
    )).toEqual(
      [[], [1], [2], [1, 1], [1, 2], [2, 1], [2, 2], [1, 1, 1], [1, 1, 2],
        [1, 2, 1], [1, 2, 2], [2, 1, 1], [2, 1, 2], [2, 2, 1], [2, 2, 2]]
    );
  });

  it('combines one array multiple times and saves all lengths greater than or equal to 1', () => {
    expect(combineMultipleLengths(
      [1, 2], 3, 2
    )).toEqual(
      [[1, 1], [1, 2], [2, 1], [2, 2], [1, 1, 1], [1, 1, 2], [1, 2, 1],
        [1, 2, 2], [2, 1, 1], [2, 1, 2], [2, 2, 1], [2, 2, 2]]
    );
  });
});
