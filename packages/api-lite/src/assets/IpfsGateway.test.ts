import { ValidationError } from '../errors';
import { IpfsGateway, ipfsRef } from './IpfsGateway';

const V0 = 'QmXyd5j7dDaYDuXZZ62uqh5CsrG9nUXNy7eQmedxEEwU25';
const V1 = 'bafkreihefr4svblaje3zohbfvrbwx3hogwyizqkryvuwjoph3f3smeb4iy';

function response(
  body: string,
  { status = 200, type = 'image/png' }: { status?: number; type?: string } = {},
) {
  return new Response(body, { status, headers: { 'content-type': type } });
}

describe('ipfsRef', () => {
  it.each([
    [`ipfs://${V0}/1.png`, `${V0}/1.png`],
    [`ipfs://ipfs/${V0}/1.png`, `${V0}/1.png`],
    [`https://ipfs.io/ipfs/${V0}/1.png`, `${V0}/1.png`],
    [`https://gateway.lighthouse.storage/ipfs/${V1}?filename=monkee-1.png`, V1],
    [`https://${V1}.ipfs.w3s.link/Monkee%201.json`, `${V1}/Monkee%201.json`],
  ])('extracts the ref from %s', (url, ref) => {
    expect(ipfsRef(url)).toBe(ref);
  });

  it.each([
    'https://example.com/1.png',
    `ipfs://${V0}/../secret`,
    'ipfs://not-a-cid/1.png',
    'not a url',
  ])('rejects %s', (url) => {
    expect(ipfsRef(url)).toBeNull();
  });
});

describe('IpfsGateway', () => {
  let errSpy: jest.SpyInstance;
  beforeEach(() => {
    errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => errSpy.mockRestore());

  it.each([
    `${V0}/../x`,
    `${V0}/..%2F..%2Fx`,
    `${V0}/%2E%2E`,
    `${V0}/a%5Cb`,
    `${V0}/%E0%A4%A`,
    'notacid/1.png',
  ])('rejects %s before fetching', async (ref) => {
    const fetchImpl = jest.fn();
    const gateway = new IpfsGateway({ fetchImpl });
    await expect(gateway.fetch(ref)).rejects.toThrow(ValidationError);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('accepts an encoded space in a file name', async () => {
    const fetchImpl = jest.fn(async () =>
      response('{}', { type: 'text/plain' }),
    );
    const gateway = new IpfsGateway({ fetchImpl });
    expect(await gateway.fetch(`${V1}/Monkee%201.json`)).not.toBeNull();
  });

  it('falls through to the next gateway when one fails', async () => {
    const fetchImpl = jest
      .fn()
      .mockResolvedValueOnce(response('', { status: 429 }))
      .mockRejectedValueOnce(new Error('timeout'))
      .mockResolvedValueOnce(response('png-bytes'));
    const gateway = new IpfsGateway({ fetchImpl });
    const file = await gateway.fetch(`${V0}/1.png`);
    expect(fetchImpl.mock.calls.map((c) => c[0])).toEqual([
      `https://gateway.pinata.cloud/ipfs/${V0}/1.png`,
      `https://ipfs.filebase.io/ipfs/${V0}/1.png`,
      `https://gateway.lighthouse.storage/ipfs/${V0}/1.png`,
    ]);
    expect(file?.contentType).toBe('image/png');
    expect(file?.body.toString()).toBe('png-bytes');
  });

  it('returns null when every gateway fails', async () => {
    const fetchImpl = jest.fn(async () => response('', { status: 504 }));
    const gateway = new IpfsGateway({ fetchImpl });
    expect(await gateway.fetch(V1)).toBeNull();
    expect(fetchImpl).toHaveBeenCalledTimes(3);
  });

  it('refuses content that could render as a page on our origin', async () => {
    const fetchImpl = jest.fn(async () =>
      response('<script>', { type: 'text/html' }),
    );
    const gateway = new IpfsGateway({ fetchImpl });
    expect(await gateway.fetch(V1)).toBeNull();
  });

  it('refuses a body over the size cap', async () => {
    const fetchImpl = jest.fn(
      async () =>
        new Response('x', {
          headers: {
            'content-type': 'image/png',
            'content-length': String(21 * 1024 ** 2),
          },
        }),
    );
    const gateway = new IpfsGateway({ fetchImpl });
    expect(await gateway.fetch(V1)).toBeNull();
  });
});
