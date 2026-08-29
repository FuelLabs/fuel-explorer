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

  it('accepts a custom maxPageSize', () => {
    expect(() => new PaginatedParams({ last: '5' }, 4)).toThrow(
      'Maximum page size allowed is 4',
    );
  });
});
