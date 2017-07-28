import { typesMap, primitiveTypesMap } from '../typeUtils';

describe('typeUtils tests', () => {
  it('typesMap test', () => {
    expect(typeof typesMap.boolean()).toBe('boolean');
    expect(typesMap.null()).toBe(null);
    expect(typesMap.undefined()).toBe(undefined);
    expect(typeof typesMap.number()).toBe('number');
    expect(typeof typesMap.int()).toBe('number');
    expect(typeof typesMap.string()).toBe('string');
    expect(typeof typesMap.object()).toBe('object');
    expect(Array.isArray(typesMap.array())).toBe(true);
    expect(typeof typesMap.function()).toBe('function');
  });

  it('primitiveTypesMap test', () => {
    expect(typeof primitiveTypesMap.boolean()).toBe('boolean');
    expect(primitiveTypesMap.null()).toBe(null);
    expect(primitiveTypesMap.undefined()).toBe(undefined);
    expect(typeof primitiveTypesMap.number()).toBe('number');
    expect(typeof primitiveTypesMap.int()).toBe('number');
    expect(typeof primitiveTypesMap.string()).toBe('string');
  });
});
