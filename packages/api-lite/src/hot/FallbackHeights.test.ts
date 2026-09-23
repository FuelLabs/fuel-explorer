import { FallbackHeights } from './FallbackHeights';

describe('FallbackHeights', () => {
  it('keeps the most recently served heights first, without duplicates', () => {
    const f = new FallbackHeights(5);
    f.record('0xa', [30, 29, 28]);
    f.record('0xa', [28, 27]);
    expect(f.heightsFor('0xa')).toEqual([28, 27, 30, 29]);
  });

  it('caps the heights kept per account', () => {
    const f = new FallbackHeights(3);
    f.record('0xa', [10, 9, 8]);
    f.record('0xa', [7, 6]);
    expect(f.heightsFor('0xa')).toEqual([7, 6, 10]);
  });

  it('drops the least recently recorded account past the account cap', () => {
    const f = new FallbackHeights(3, 2);
    f.record('0xa', [1]);
    f.record('0xb', [2]);
    f.record('0xa', [3]);
    f.record('0xc', [4]);
    expect(f.heightsFor('0xb')).toEqual([]);
    expect(f.heightsFor('0xa')).toEqual([3, 1]);
    expect(f.heightsFor('0xc')).toEqual([4]);
  });

  it('ignores an empty record', () => {
    const f = new FallbackHeights();
    f.record('0xa', []);
    expect(f.heightsFor('0xa')).toEqual([]);
  });
});
