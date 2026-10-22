import type { Project } from '~/types/ecosystem';
import {
  appsInBlock,
  collectApps,
  indexByContract,
  rankApps,
} from './matchApps';

// The app-commons entry pulls in wallet libraries that jest cannot parse.
jest.mock('app-commons', () => ({ ETH_CHAIN_NAME: 'eth' }));
const ETH_CHAIN_NAME = 'eth';

const projects = [
  {
    name: 'Alpha',
    image: 'a.png',
    url: 'https://alpha.test',
    contracts: { [ETH_CHAIN_NAME]: [{ id: '0xAA' }, { id: '0xAB' }] },
  },
  {
    name: 'Beta',
    contracts: { [ETH_CHAIN_NAME]: [{ id: '0xBB' }] },
  },
  { name: 'NoContracts' },
] as unknown as Project[];

describe('matchApps', () => {
  const index = indexByContract(projects);

  it('indexes contracts case-insensitively', () => {
    expect(index.get('0xaa')?.name).toBe('Alpha');
    expect(index.get('0xbb')?.name).toBe('Beta');
    expect(index.size).toBe(3);
  });

  it('counts one call per transaction even with several contracts', () => {
    const apps = appsInBlock(
      [
        { inputContracts: ['0xAA', '0xAB'] },
        { inputContracts: ['0xaa'] },
        { inputContracts: ['0xBB', '0xdead'] },
        { inputContracts: null },
      ],
      index,
    );
    expect(apps.find((app) => app.name === 'Alpha')?.count).toBe(2);
    expect(apps.find((app) => app.name === 'Beta')?.count).toBe(1);
  });

  it('ranks by total count, then name, and drops empty counts', () => {
    const ranked = rankApps([
      [
        { name: 'B', count: 2 },
        { name: 'A', count: 2 },
        { name: 'Z', count: 0 },
      ],
      [{ name: 'C', count: 1 }],
      [{ name: 'C', count: 5 }],
    ]);
    expect(ranked.map((app) => app.name)).toEqual(['C', 'A', 'B']);
    expect(ranked[0].count).toBe(6);
  });

  it('respects the ranking limit', () => {
    const group = ['A', 'B', 'C', 'D'].map((name) => ({ name, count: 1 }));
    expect(rankApps([group], 2)).toHaveLength(2);
  });

  it('collects each app once and skips empty ids', () => {
    const apps = collectApps(['0xAA', '0xab', null, undefined, '0x00'], index);
    expect(apps.map((app) => app.name)).toEqual(['Alpha']);
  });
});
