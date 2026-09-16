import { ValidationError } from '../errors';

// Tried in order. ipfs.io and dweb.link reject server-side requests with a 429.
const GATEWAYS = [
  'https://gateway.pinata.cloud/ipfs/',
  'https://ipfs.filebase.io/ipfs/',
  'https://gateway.lighthouse.storage/ipfs/',
];

const CID_RE = /^(Qm[1-9A-HJ-NP-Za-km-z]{44}|b[a-z2-7]{58,})$/;
const SEGMENT_RE = /^[A-Za-z0-9._~%-]+$/;
const FETCH_TIMEOUT_MS = 10_000;
const MAX_BYTES = 20 * 1024 ** 2;
// Anything that could render as a page on our origin (HTML, JS) is refused.
const SERVABLE_TYPE_RE =
  /^(image\/|video\/|audio\/|application\/json|text\/plain|application\/octet-stream)/;

export type IpfsFile = { contentType: string; body: Buffer };

// `<cid>` or `<cid>/<path>`, from an ipfs:// URI or any path- or
// subdomain-style gateway URL; null for anything else.
export function ipfsRef(url: string): string | null {
  let ref: string | null = null;
  if (url.startsWith('ipfs://')) {
    ref = url.slice(7).replace(/^ipfs\//, '');
  } else {
    try {
      const u = new URL(url);
      const sub = u.hostname.match(/^([^.]+)\.ipfs\./);
      if (sub) ref = `${sub[1]}${u.pathname}`;
      else if (u.pathname.startsWith('/ipfs/')) ref = u.pathname.slice(6);
    } catch {
      return null;
    }
  }
  if (!ref) return null;
  ref = ref.split(/[?#]/)[0].replace(/\/+$/, '');
  return isValidRef(ref) ? ref : null;
}

export function publicGatewayUrl(ref: string): string {
  return `${GATEWAYS[0]}${ref}`;
}

function isValidRef(ref: string): boolean {
  const [cid, ...segments] = ref.split('/');
  return CID_RE.test(cid) && segments.every(isValidSegment);
}

function isValidSegment(segment: string): boolean {
  if (!SEGMENT_RE.test(segment)) return false;
  let decoded: string;
  try {
    decoded = decodeURIComponent(segment);
  } catch {
    return false;
  }
  return !/[/\\]/.test(decoded) && decoded !== '.' && decoded !== '..';
}

export class IpfsGateway {
  private readonly fetchImpl: typeof fetch;

  constructor(opts: { fetchImpl?: typeof fetch } = {}) {
    this.fetchImpl = opts.fetchImpl ?? fetch;
  }

  async fetch(ref: string): Promise<IpfsFile | null> {
    if (!isValidRef(ref)) {
      throw new ValidationError('Invalid IPFS path');
    }
    for (const gateway of GATEWAYS) {
      const url = `${gateway}${ref}`;
      try {
        const res = await this.fetchImpl(url, {
          signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        });
        if (!res.ok) {
          console.error(`IpfsGateway: ${url} answered ${res.status}`);
          continue;
        }
        const contentType = res.headers.get('content-type') ?? '';
        if (!SERVABLE_TYPE_RE.test(contentType)) {
          console.error(`IpfsGateway: ${url} is ${contentType || 'untyped'}`);
          return null;
        }
        if (Number(res.headers.get('content-length')) > MAX_BYTES) {
          console.error(`IpfsGateway: ${url} is over ${MAX_BYTES} bytes`);
          return null;
        }
        const body = Buffer.from(await res.arrayBuffer());
        if (body.length > MAX_BYTES) return null;
        return { contentType, body };
      } catch (e) {
        console.error(`IpfsGateway: ${url} failed: ${(e as Error).message}`);
      }
    }
    return null;
  }
}
