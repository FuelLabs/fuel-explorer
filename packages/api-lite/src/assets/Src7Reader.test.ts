import { Contract, ErrorCode, FuelError, type Provider } from 'fuels';
import { Src7Reader } from './Src7Reader';

jest.mock('fuels', () => ({
  ...jest.requireActual('fuels'),
  Contract: jest.fn(),
}));

const CONTRACT = `0x${'ab'.repeat(32)}`;
const ASSET_A = `0x${'01'.repeat(32)}`;
const ASSET_B = `0x${'02'.repeat(32)}`;

const reverted = () =>
  new FuelError(ErrorCode.SCRIPT_REVERTED, 'Transaction reverted.');
const timeout = () => new Error('fetch failed');

type Answer = string | undefined | Error;

// name: the SRC-20 name answer; metadata: answers by `${assetId}:${key}`.
function contract(name: Answer, metadata: Record<string, Answer> = {}) {
  const call = (answer: Answer, wrap: (v: string) => unknown) => ({
    get: async () => {
      if (answer instanceof Error) throw answer;
      return { value: answer === undefined ? undefined : wrap(answer) };
    },
  });
  const functions = {
    name: jest.fn(() => call(name, (v) => v)),
    metadata: jest.fn((asset: { bits: string }, key: string) =>
      call(metadata[`${asset.bits}:${key}`], (v) => ({ String: v })),
    ),
  };
  (Contract as unknown as jest.Mock).mockImplementation(() => ({ functions }));
  return functions;
}

const reader = () => new Src7Reader({} as Provider);

describe('Src7Reader', () => {
  it('returns the SRC-9 image with the SRC-20 name', async () => {
    contract('@nelitow', { [`${ASSET_A}:image:png`]: 'https://x/a.png' });
    expect(await reader().read(CONTRACT, ASSET_A)).toEqual({
      name: '@nelitow',
      image: 'https://x/a.png',
      link: null,
    });
  });

  it('stops calling a contract whose name() reverts', async () => {
    const fns = contract(reverted());
    const r = reader();
    expect(await r.read(CONTRACT, ASSET_A)).toBeNull();
    expect(await r.read(CONTRACT, ASSET_B)).toBeNull();
    expect(fns.name).toHaveBeenCalledTimes(1);
  });

  it('throws a failed name() request and calls the contract again', async () => {
    const r = reader();
    contract(timeout());
    await expect(r.read(CONTRACT, ASSET_A)).rejects.toThrow('fetch failed');
    contract('@nelitow', { [`${ASSET_A}:image`]: 'https://x/a.png' });
    expect(await r.read(CONTRACT, ASSET_A)).toEqual({
      name: '@nelitow',
      image: 'https://x/a.png',
      link: null,
    });
  });

  it('throws a failed metadata request instead of reporting no image', async () => {
    contract('@nelitow', { [`${ASSET_A}:image:png`]: timeout() });
    await expect(reader().read(CONTRACT, ASSET_A)).rejects.toThrow(
      'fetch failed',
    );
  });

  it('keeps probing keys for later tokens when one token has none', async () => {
    contract('Bear', { [`${ASSET_B}:metadata`]: 'ipfs://cid/2' });
    const r = reader();
    expect(await r.read(CONTRACT, ASSET_A)).toEqual({
      name: 'Bear',
      image: null,
      link: null,
    });
    expect(await r.read(CONTRACT, ASSET_B)).toEqual({
      name: 'Bear',
      image: null,
      link: 'ipfs://cid/2',
    });
  });

  it('tries the key that answered first, then the others', async () => {
    const fns = contract('Bear', {
      [`${ASSET_A}:uri`]: 'ipfs://cid/1',
      [`${ASSET_B}:image`]: 'https://x/2.png',
    });
    const r = reader();
    await r.read(CONTRACT, ASSET_A);
    fns.metadata.mockClear();
    expect(await r.read(CONTRACT, ASSET_B)).toEqual({
      name: 'Bear',
      image: 'https://x/2.png',
      link: null,
    });
    expect(fns.metadata.mock.calls[0][1]).toBe('uri');
  });

  it('stops asking for metadata when the contract has no SRC-7', async () => {
    const fns = contract('Token', { [`${ASSET_A}:image:png`]: reverted() });
    const r = reader();
    const none = { name: 'Token', image: null, link: null };
    expect(await r.read(CONTRACT, ASSET_A)).toEqual(none);
    expect(await r.read(CONTRACT, ASSET_B)).toEqual(none);
    expect(fns.metadata).toHaveBeenCalledTimes(1);
  });
});
