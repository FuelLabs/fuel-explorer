import type { IpfsFile } from './IpfsGateway';
import { NftMetadata, collectionFor } from './NftMetadata';

const FUEL_PUMPS =
  '0x45c964371490bdfc2610ca116853d22a9b6e0de1abb67f61b81ab9d291b0015c';
const GRIFFY =
  '0x0c10a1c5ef62b346a27a16cc4c270f5e74c1c94a7f8233fcf0223716b6c9f326';
const OTHER = `0x${'ab'.repeat(32)}`;
const SUB_7 = `0x${'7'.padStart(64, '0')}`;
const IMAGE_CID = 'QmSCPhbsgjLosYN47sq6ZSNg4xUGr8EsoN2zr6q7pcTTMZ';

function json(body: unknown): IpfsFile {
  return {
    contentType: 'application/json',
    body: Buffer.from(JSON.stringify(body)),
  };
}

function gateway(...results: (IpfsFile | null)[]) {
  const fetch = jest.fn(async (_ref: string) =>
    results.length > 1 ? (results.shift() ?? null) : (results[0] ?? null),
  );
  return { fetch };
}

describe('collectionFor', () => {
  it('names a known collection regardless of hex casing', () => {
    expect(collectionFor(`0x${FUEL_PUMPS.slice(2).toUpperCase()}`)).toBe(
      'Fuel Pumps',
    );
  });

  it('names a collection that has no metadata source', () => {
    expect(collectionFor(GRIFFY)).toBe('Griffy Amplify');
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

  it('fetches the token JSON by decimal subId and serves its image through PUBLIC_URL', async () => {
    const gw = gateway(
      json({ name: 'Fuel Pumps #7', image: `ipfs://${IMAGE_CID}/7.png` }),
    );
    const nft = new NftMetadata({
      gateway: gw,
      publicUrl: 'https://indexer.example/',
    });
    expect(await nft.get(FUEL_PUMPS, SUB_7)).toEqual({
      name: 'Fuel Pumps #7',
      image: `https://indexer.example/ipfs/${IMAGE_CID}/7.png`,
    });
    expect(gw.fetch).toHaveBeenCalledWith(
      'QmXyd5j7dDaYDuXZZ62uqh5CsrG9nUXNy7eQmedxEEwU25/7.json',
    );
  });

  it('points images at the public gateway when PUBLIC_URL is unset', async () => {
    const gw = gateway(json({ image: `ipfs://${IMAGE_CID}/7.png` }));
    const nft = new NftMetadata({ gateway: gw });
    expect(await nft.get(FUEL_PUMPS, SUB_7)).toEqual({
      image: `https://gateway.pinata.cloud/ipfs/${IMAGE_CID}/7.png`,
    });
  });

  it('leaves a non-IPFS image untouched', async () => {
    const gw = gateway(json({ image: 'https://cdn.example/7.png' }));
    const nft = new NftMetadata({ gateway: gw, publicUrl: 'https://x' });
    expect(await nft.get(FUEL_PUMPS, SUB_7)).toEqual({
      image: 'https://cdn.example/7.png',
    });
  });

  it('treats a body that is not JSON as a failure', async () => {
    const gw = gateway({ contentType: 'text/plain', body: Buffer.from('<') });
    const nft = new NftMetadata({ gateway: gw });
    expect(await nft.get(FUEL_PUMPS, SUB_7)).toBeNull();
  });

  it('never fetches for an unknown contract or a collection without a source', async () => {
    const gw = gateway(null);
    const nft = new NftMetadata({ gateway: gw });
    expect(await nft.get(OTHER, SUB_7)).toBeNull();
    expect(await nft.get(GRIFFY, SUB_7)).toBeNull();
    expect(gw.fetch).not.toHaveBeenCalled();
  });

  it('serves a hit from cache and shares one in-flight fetch', async () => {
    const gw = gateway(json({ name: 'x' }));
    const nft = new NftMetadata({ gateway: gw });
    await Promise.all([nft.get(FUEL_PUMPS, SUB_7), nft.get(FUEL_PUMPS, SUB_7)]);
    await nft.get(FUEL_PUMPS, SUB_7);
    expect(gw.fetch).toHaveBeenCalledTimes(1);
  });

  it('doubles the retry delay after each failure, up to a day', async () => {
    let now = 0;
    const gw = gateway(null);
    const nft = new NftMetadata({ gateway: gw, now: () => now });
    const MIN = 60_000;

    await nft.get(FUEL_PUMPS, SUB_7);
    now = MIN - 1;
    await nft.get(FUEL_PUMPS, SUB_7);
    expect(gw.fetch).toHaveBeenCalledTimes(1);

    now = MIN;
    await nft.get(FUEL_PUMPS, SUB_7);
    expect(gw.fetch).toHaveBeenCalledTimes(2);
    now = MIN + 2 * MIN - 1;
    await nft.get(FUEL_PUMPS, SUB_7);
    expect(gw.fetch).toHaveBeenCalledTimes(2);
    now = MIN + 2 * MIN;
    await nft.get(FUEL_PUMPS, SUB_7);
    expect(gw.fetch).toHaveBeenCalledTimes(3);

    const DAY = 24 * 60 * MIN;
    for (let i = 0; i < 20; i++) {
      now += DAY;
      await nft.get(FUEL_PUMPS, SUB_7);
    }
    expect(gw.fetch).toHaveBeenCalledTimes(23);
    now += DAY - 1;
    await nft.get(FUEL_PUMPS, SUB_7);
    expect(gw.fetch).toHaveBeenCalledTimes(23);
    now += 1;
    await nft.get(FUEL_PUMPS, SUB_7);
    expect(gw.fetch).toHaveBeenCalledTimes(24);
  });

  it('keeps a hit indefinitely once a retry succeeds', async () => {
    let now = 0;
    const gw = gateway(null, json({ name: 'x' }));
    const nft = new NftMetadata({ gateway: gw, now: () => now });
    expect(await nft.get(FUEL_PUMPS, SUB_7)).toBeNull();
    now = 60_000;
    expect(await nft.get(FUEL_PUMPS, SUB_7)).toEqual({ name: 'x' });
    now = 365 * 24 * 60 * 60_000;
    expect(await nft.get(FUEL_PUMPS, SUB_7)).toEqual({ name: 'x' });
    expect(gw.fetch).toHaveBeenCalledTimes(2);
  });
});
