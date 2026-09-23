import { GraphQLError } from 'graphql';
import { connection, pageSize } from './pagination';

describe('pageSize', () => {
  it('returns first, then last, then defaults to 10', () => {
    expect(pageSize({ first: 5 })).toBe(5);
    expect(pageSize({ last: 7 })).toBe(7);
    expect(pageSize({})).toBe(10);
  });

  it('rejects non-integers', () => {
    expect(() => pageSize({ first: 2.5 })).toThrow(GraphQLError);
    expect(() => pageSize({ first: Number.NaN })).toThrow(GraphQLError);
    expect(() => pageSize({ first: Number.POSITIVE_INFINITY })).toThrow(
      GraphQLError,
    );
  });

  it('rejects values below 1', () => {
    expect(() => pageSize({ first: 0 })).toThrow(GraphQLError);
    expect(() => pageSize({ first: -2 })).toThrow(GraphQLError);
  });

  it('rejects values above max', () => {
    expect(() => pageSize({ first: 51 })).toThrow(GraphQLError);
    expect(() => pageSize({ first: 200 }, 100)).toThrow(GraphQLError);
    expect(pageSize({ first: 100 }, 100)).toBe(100);
  });
});

describe('connection', () => {
  it('builds each edge.node from the same index as its cursor, even with duplicate cursors', () => {
    const items = [
      { cursor: 'c1', value: 'a' },
      { cursor: 'c1', value: 'b' }, // duplicate cursor: indexOf-based lookup would give both edges item 'a'
      { cursor: 'c2', value: 'c' },
    ];
    const result = connection(items, {
      hasNextPage: false,
      hasPreviousPage: false,
    });
    expect(
      result.edges.map((e) => (e.node as { value: string }).value),
    ).toEqual(['a', 'b', 'c']);
  });
});
