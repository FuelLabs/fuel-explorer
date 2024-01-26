import {
  o as p,
  p as w,
  q as y,
  r as f,
  I as m,
  t as g,
  u as k,
  v as O,
  w as L,
  H as h,
  x as E,
} from './AccountConnectionInput-7bc330b7.js';
import './index-0c70cacd.js';
import './index-76fb7be0.js';
import './_commonjsHelpers-de833af9.js';
import './extends-98964cd2.js';
import './index-d3ea75b5.js';
import './index-8d47fad6.js';
import './BridgeSteps-30389492.js';
import './v4-4a60fe23.js';
import './iframe-d50da200.js';
import '../sb-preview/runtime.js';
import './_commonjs-dynamic-modules-302442b1.js';
import './ActionRequiredBadge-4c3ae44d.js';
import './BridgeTxListNotConnected-80d83e43.js';
import './EcosystemTags-615f572a.js';
class x extends p {
  constructor({
    callbackSelector: e,
    cause: r,
    data: o,
    extraData: i,
    sender: d,
    urls: t,
  }) {
    var c;
    super(
      r.shortMessage ||
        'An error occurred while fetching for an offchain result.',
      {
        cause: r,
        metaMessages: [
          ...(r.metaMessages || []),
          (c = r.metaMessages) != null && c.length ? '' : [],
          'Offchain Gateway Call:',
          t && ['  Gateway URL(s):', ...t.map((u) => `    ${w(u)}`)],
          `  Sender: ${d}`,
          `  Data: ${o}`,
          `  Callback selector: ${e}`,
          `  Extra data: ${i}`,
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
class M extends p {
  constructor({ result: e, url: r }) {
    super(
      'Offchain gateway response is malformed. Response data must be a hex value.',
      { metaMessages: [`Gateway URL: ${w(r)}`, `Response: ${y(e)}`] }
    ),
      Object.defineProperty(this, 'name', {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 'OffchainLookupResponseMalformedError',
      });
  }
}
class R extends p {
  constructor({ sender: e, to: r }) {
    super(
      'Reverted sender address does not match target contract address (`to`).',
      {
        metaMessages: [
          `Contract address: ${r}`,
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
function $(s, e) {
  if (!f(s)) throw new m({ address: s });
  if (!f(e)) throw new m({ address: e });
  return s.toLowerCase() === e.toLowerCase();
}
const W = '0x556f1830',
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
async function _(s, { blockNumber: e, blockTag: r, data: o, to: i }) {
  const { args: d } = g({ data: o, abi: [S] }),
    [t, c, u, a, n] = d;
  try {
    if (!$(i, t)) throw new R({ sender: t, to: i });
    const l = await v({ data: u, sender: t, urls: c }),
      { data: b } = await k(s, {
        blockNumber: e,
        blockTag: r,
        data: O([a, L([{ type: 'bytes' }, { type: 'bytes' }], [l, n])]),
        to: i,
      });
    return b;
  } catch (l) {
    throw new x({
      callbackSelector: a,
      cause: l,
      data: o,
      extraData: n,
      sender: t,
      urls: c,
    });
  }
}
async function v({ data: s, sender: e, urls: r }) {
  var i;
  let o = new Error('An unknown error occurred.');
  for (let d = 0; d < r.length; d++) {
    const t = r[d],
      c = t.includes('{sender}') || t.includes('{data}') ? 'GET' : 'POST',
      u = c === 'POST' ? { data: s, sender: e } : void 0;
    try {
      const a = await fetch(t.replace('{sender}', e).replace('{data}', s), {
        body: JSON.stringify(u),
        method: c,
      });
      let n;
      if (
        ((i = a.headers.get('Content-Type')) != null &&
        i.startsWith('application/json')
          ? (n = (await a.json()).data)
          : (n = await a.text()),
        !a.ok)
      ) {
        o = new h({
          body: u,
          details: y(n.error) || a.statusText,
          headers: a.headers,
          status: a.status,
          url: t,
        });
        continue;
      }
      if (!E(n)) {
        o = new M({ result: n, url: t });
        continue;
      }
      return n;
    } catch (a) {
      o = new h({ body: u, details: a.message, url: t });
    }
  }
  throw o;
}
export {
  v as ccipFetch,
  _ as offchainLookup,
  S as offchainLookupAbiItem,
  W as offchainLookupSignature,
};
