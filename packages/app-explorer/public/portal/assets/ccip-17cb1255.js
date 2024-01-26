import {
  b3 as l,
  b4 as m,
  b5 as w,
  b6 as p,
  b7 as h,
  b8 as g,
  b9 as k,
  ba as O,
  bb as L,
  bc as b,
  bd as E,
} from './index-4d435dca.js';
class x extends l {
  constructor({
    callbackSelector: e,
    cause: a,
    data: o,
    extraData: c,
    sender: s,
    urls: n,
  }) {
    super(
      a.shortMessage ||
        'An error occurred while fetching for an offchain result.',
      {
        cause: a,
        metaMessages: [
          ...(a.metaMessages || []),
          a.metaMessages?.length ? '' : [],
          'Offchain Gateway Call:',
          n && ['  Gateway URL(s):', ...n.map((d) => `    ${m(d)}`)],
          `  Sender: ${s}`,
          `  Data: ${o}`,
          `  Callback selector: ${e}`,
          `  Extra data: ${c}`,
        ].flat(),
      }
    ),
      Object.defineProperty(this, 'name', {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 'OffchainLookupError',
      });
  }
}
class M extends l {
  constructor({ result: e, url: a }) {
    super(
      'Offchain gateway response is malformed. Response data must be a hex value.',
      { metaMessages: [`Gateway URL: ${m(a)}`, `Response: ${w(e)}`] }
    ),
      Object.defineProperty(this, 'name', {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 'OffchainLookupResponseMalformedError',
      });
  }
}
class R extends l {
  constructor({ sender: e, to: a }) {
    super(
      'Reverted sender address does not match target contract address (`to`).',
      {
        metaMessages: [
          `Contract address: ${a}`,
          `OffchainLookup sender address: ${e}`,
        ],
      }
    ),
      Object.defineProperty(this, 'name', {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 'OffchainLookupSenderMismatchError',
      });
  }
}
function $(t, e) {
  if (!p(t)) throw new h({ address: t });
  if (!p(e)) throw new h({ address: e });
  return t.toLowerCase() === e.toLowerCase();
}
const C = '0x556f1830',
  S = {
    name: 'OffchainLookup',
    type: 'error',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'urls', type: 'string[]' },
      { name: 'callData', type: 'bytes' },
      { name: 'callbackFunction', type: 'bytes4' },
      { name: 'extraData', type: 'bytes' },
    ],
  };
async function P(t, { blockNumber: e, blockTag: a, data: o, to: c }) {
  const { args: s } = g({ data: o, abi: [S] }),
    [n, d, r, i, f] = s;
  try {
    if (!$(c, n)) throw new R({ sender: n, to: c });
    const u = await A({ data: r, sender: n, urls: d }),
      { data: y } = await k(t, {
        blockNumber: e,
        blockTag: a,
        data: O([i, L([{ type: 'bytes' }, { type: 'bytes' }], [u, f])]),
        to: c,
      });
    return y;
  } catch (u) {
    throw new x({
      callbackSelector: i,
      cause: u,
      data: o,
      extraData: f,
      sender: n,
      urls: d,
    });
  }
}
async function A({ data: t, sender: e, urls: a }) {
  let o = new Error('An unknown error occurred.');
  for (let c = 0; c < a.length; c++) {
    const s = a[c],
      n = s.includes('{sender}') || s.includes('{data}') ? 'GET' : 'POST',
      d = n === 'POST' ? { data: t, sender: e } : void 0;
    try {
      const r = await fetch(s.replace('{sender}', e).replace('{data}', t), {
        body: JSON.stringify(d),
        method: n,
      });
      let i;
      if (
        (r.headers.get('Content-Type')?.startsWith('application/json')
          ? (i = (await r.json()).data)
          : (i = await r.text()),
        !r.ok)
      ) {
        o = new b({
          body: d,
          details: w(i.error) || r.statusText,
          headers: r.headers,
          status: r.status,
          url: s,
        });
        continue;
      }
      if (!E(i)) {
        o = new M({ result: i, url: s });
        continue;
      }
      return i;
    } catch (r) {
      o = new b({ body: d, details: r.message, url: s });
    }
  }
  throw o;
}
export {
  A as ccipFetch,
  P as offchainLookup,
  S as offchainLookupAbiItem,
  C as offchainLookupSignature,
};
