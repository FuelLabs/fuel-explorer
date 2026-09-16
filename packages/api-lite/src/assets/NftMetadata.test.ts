import { NftMetadata, collectionFor } from './NftMetadata';

const FUEL_PUMPS =
  '0x45c964371490bdfc2610ca116853d22a9b6e0de1abb67f61b81ab9d291b0015c';
const OTHER = `0x${'ab'.repeat(32)}`;
const SUB_7 = `0x${'7'.padStart(64, '0')}`;

function jsonResponse(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

describe('collectionFor', () => {
  it('names a known collection regardless of hex casing', () => {
    expect(collectionFor(`0x${FUEL_PUMPS.slice(2).toUpperCase()}`)).toBe(
      'Fuel Pumps',
    );
  });

  it('is null for other or missing contracts', () => {
    expect(collectionFor(OTHER)).toBeNull();
    expect(collectionFor(null)).toBeNull();
  });
});

describe('NftMetadata', () => {
  let errSpy: jest.SpyInstance;
  beforeEach(() => {
    errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => errSpy.mockRestore());

  it('fetches the token JSON by decimal subId and rewrites ipfs:// images to the gateway', async () => {
    const fetchImpl = jest.fn(async (_url: string) =>
      jsonResponse({ name: 'Fuel Pumps #7', image: 'ipfs://QmImg/7.png' }),
    );
    const nft = new NftMetadata({ fetchImpl: fetchImpl as any });
    const metadata = await nft.get(FUEL_PUMPS, SUB_7);
    expect(fetchImpl.mock.calls[0][0]).toBe(
      'https://gateway.pinata.cloud/ipfs/QmXyd5j7dDaYDuXZZ62uqh5CsrG9nUXNy7eQmedxEEwU25/7.json',
    );
    expect(metadata).toEqual({
      name: 'Fuel Pumps #7',
      image: 'https://gateway.pinata.cloud/ipfs/QmImg/7.png',
    });
  });

  it('never fetches for a contract outside the known collections', async () => {
    const fetchImpl = jest.fn();
    const nft = new NftMetadata({ fetchImpl });
    expect(await nft.get(OTHER, SUB_7)).toBeNull();
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('serves a hit from cache and shares one in-flight fetch', async () => {
    const fetchImpl = jest.fn(async () => jsonResponse({ name: 'x' }));
    const nft = new NftMetadata({ fetchImpl: fetchImpl as any });
    await Promise.all([nft.get(FUEL_PUMPS, SUB_7), nft.get(FUEL_PUMPS, SUB_7)]);
    await nft.get(FUEL_PUMPS, SUB_7);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('never fetches for a collection without a metadata source', async () => {
    const griffy =
      '0x0c10a1c5ef62b346a27a16cc4c270f5e74c1c94a7f8233fcf0223716b6c9f326';
    const fetchImpl = jest.fn();
    const nft = new NftMetadata({ fetchImpl });
    expect(collectionFor(griffy)).toBe('Griffy Amplify');
    expect(await nft.get(griffy, SUB_7)).toBeNull();
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('doubles the retry delay after each failure, up to a day', async () => {
    let now = 0;
    const fetchImpl = jest.fn(async () => jsonResponse({}, 504));
    const nft = new NftMetadata({
      fetchImpl: fetchImpl as any,
      now: () => now,
    });
    const MIN = 60_000;

    await nft.get(FUEL_PUMPS, SUB_7);
    now = MIN - 1;
    await nft.get(FUEL_PUMPS, SUB_7);
    expect(fetchImpl).toHaveBeenCalledTimes(1);

    now = MIN;
    await nft.get(FUEL_PUMPS, SUB_7);
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    now = MIN + 2 * MIN - 1;
    await nft.get(FUEL_PUMPS, SUB_7);
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    now = MIN + 2 * MIN;
    await nft.get(FUEL_PUMPS, SUB_7);
    expect(fetchImpl).toHaveBeenCalledTimes(3);

    const DAY = 24 * 60 * MIN;
    for (let i = 0; i < 20; i++) {
      now += DAY;
      await nft.get(FUEL_PUMPS, SUB_7);
    }
    expect(fetchImpl).toHaveBeenCalledTimes(23);
    now += DAY - 1;
    await nft.get(FUEL_PUMPS, SUB_7);
    expect(fetchImpl).toHaveBeenCalledTimes(23);
    now += 1;
    await nft.get(FUEL_PUMPS, SUB_7);
    expect(fetchImpl).toHaveBeenCalledTimes(24);
  });

  it('keeps a hit indefinitely once a retry succeeds', async () => {
    let now = 0;
    const fetchImpl = jest
      .fn()
      .mockResolvedValueOnce(jsonResponse({}, 429))
      .mockResolvedValueOnce(jsonResponse({ name: 'x' }));
    const nft = new NftMetadata({ fetchImpl, now: () => now });
    expect(await nft.get(FUEL_PUMPS, SUB_7)).toBeNull();
    now = 60_000;
    expect(await nft.get(FUEL_PUMPS, SUB_7)).toEqual({ name: 'x' });
    now = 365 * 24 * 60 * 60_000;
    expect(await nft.get(FUEL_PUMPS, SUB_7)).toEqual({ name: 'x' });
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });
});
