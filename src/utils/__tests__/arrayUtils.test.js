import { combine, combineToArray, combineMultiple, combineMultipleLengths } from '../arrayUtils';

describe('arrayUtils tests', () => {
  it('combines two arrays', () => {
    expect(combine(
      [1, 2, 3], [4, 5, 6]
    )).toEqual(
      [[1, 4], [1, 5], [1, 6], [2, 4], [2, 5], [2, 6], [3, 4], [3, 5], [3, 6]]
    );
  });

  it('combine only takes valid args', () => {
    expect(() => combine({}, [4, 5, 6])).toThrow();
    expect(() => combine([4, 5, 6], null)).toThrow();
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

  it('combineToArray only takes valid args', () => {
    expect(() => combineToArray([1, 2], [4, 5, 6])).toThrow();
    expect(() => combineToArray({}, [4, 5, 6])).toThrow();
    expect(() => combineToArray([4, 5, 6], null)).toThrow();
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

  it('combineMultiple only takes valid args', () => {
    expect(() => combineMultiple([1, 2], [4, 5, 6])).toThrow();
    expect(() => combineMultiple({}, 5)).toThrow();
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

  it('combineMultipleLengths only takes valid args', () => {
    expect(() => combineMultipleLengths([1, 2], [4, 5, 6])).toThrow();
    expect(() => combineMultipleLengths({}, 5)).toThrow();
    expect(() => combineMultipleLengths({}, 5, {})).toThrow();
    expect(() => combineMultipleLengths({}, 5, 10)).toThrow();
  });
});
