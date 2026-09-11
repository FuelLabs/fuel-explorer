import { ValidationError } from '../errors';
import { PaginatedParams } from './PaginatedParams';

describe('PaginatedParams', () => {
  it('defaults to direction=before, cursor=null, last=10', () => {
    const p = new PaginatedParams({});
    expect(p.direction).toBe('before');
    expect(p.cursor).toBeNull();
    expect(p.last).toBe(10);
  });

  it('after sets direction=after and a numeric cursor', () => {
    const p = new PaginatedParams({ after: '42' });
    expect(p.direction).toBe('after');
    expect(p.cursor).toBe(42);
  });

  it('before sets direction=before and a numeric cursor', () => {
    const p = new PaginatedParams({ before: '42' });
    expect(p.direction).toBe('before');
    expect(p.cursor).toBe(42);
  });

  it('throws when last exceeds maxPageSize', () => {
    expect(() => new PaginatedParams({ last: '51' })).toThrow(
      'Maximum page size allowed is 50',
    );
  });

  // rest/router.ts's shared catch uses instanceof ValidationError to decide
  // 400 vs 502, so the class matters, not just the message.
  it('throws a ValidationError, not a plain Error', () => {
    expect(() => new PaginatedParams({ last: '51' })).toThrow(ValidationError);
  });

  it('accepts a custom maxPageSize', () => {
    expect(() => new PaginatedParams({ last: '5' }, 4)).toThrow(
      'Maximum page size allowed is 4',
    );
  });

  // SQLite treats a negative LIMIT as unlimited, so last=-1 must not reach
  // L1Index's `LIMIT @limit`.
  it('throws on a negative last', () => {
    expect(() => new PaginatedParams({ last: '-1' })).toThrow(
      'Page size must be an integer between 1 and 50',
    );
  });

  it('throws on a zero last', () => {
    expect(() => new PaginatedParams({ last: '0' })).toThrow(
      'Page size must be an integer between 1 and 50',
    );
  });

  it('throws on a non-integer last', () => {
    expect(() => new PaginatedParams({ last: '1.5' })).toThrow(
      'Page size must be an integer between 1 and 50',
    );
  });

  it('throws on a non-numeric last', () => {
    expect(() => new PaginatedParams({ last: 'abc' })).toThrow(
      'Page size must be an integer between 1 and 50',
    );
  });

  it('throws a ValidationError for an invalid last, not a plain Error', () => {
    expect(() => new PaginatedParams({ last: '-1' })).toThrow(ValidationError);
  });

  it('throws on a non-numeric after cursor instead of silently becoming NaN', () => {
    expect(() => new PaginatedParams({ after: 'abc' })).toThrow(
      ValidationError,
    );
  });

  it('throws on a non-numeric before cursor instead of silently becoming NaN', () => {
    expect(() => new PaginatedParams({ before: 'abc' })).toThrow(
      ValidationError,
    );
  });
});
