// The app-commons entry pulls in wallet libraries that jest cannot parse.
jest.mock('app-commons', () => ({ ECOSYSTEM_PROJECTS_URL: 'https://x.test' }));

import { readBlockApps, writeBlockApps } from './txAppsCache';

describe('txAppsCache', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runAllTimers();
    jest.useRealTimers();
  });

  it('splits ids into hits and misses', () => {
    writeBlockApps({ '1': [{ name: 'Alpha', count: 1 }] });
    const { hits, misses } = readBlockApps(['1', '2']);
    expect(Object.keys(hits)).toEqual(['1']);
    expect(misses).toEqual(['2']);
  });

  it('keeps entries readable before the idle save runs', () => {
    writeBlockApps({ '10': [{ name: 'Beta', count: 2 }] });
    expect(readBlockApps(['10']).misses).toEqual([]);
  });

  it('saves to localStorage once for several writes', () => {
    const spy = jest.spyOn(Storage.prototype, 'setItem');
    writeBlockApps({ '20': [{ name: 'A', count: 1 }] });
    writeBlockApps({ '21': [{ name: 'B', count: 1 }] });
    expect(spy).not.toHaveBeenCalled();
    jest.runAllTimers();
    const dataWrites = spy.mock.calls.filter(
      ([key]) => !String(key).endsWith(':saved-at'),
    );
    expect(dataWrites).toHaveLength(1);
    spy.mockRestore();
  });

  it('drops the oldest block when the cap is exceeded', () => {
    const ids = Array.from({ length: 205 }, (_, i) => String(1000 + i));
    for (const id of ids) writeBlockApps({ [id]: [{ name: id, count: 1 }] });
    const { misses } = readBlockApps(ids);
    expect(misses).toHaveLength(5);
    expect(misses[0]).toBe('1000');
  });
});
