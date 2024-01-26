import { c as a, q as C, e as m, b2 as f } from './index-4d435dca.js';
const S = (t) =>
    JSON.stringify(t, (e, n) =>
      typeof n == 'bigint' ? n.toString() + 'n' : n
    ),
  A = (t) => {
    const e =
        /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g,
      n = t.replace(e, '$1"$2n"$3');
    return JSON.parse(n, (s, r) =>
      typeof r == 'string' && r.match(/^\d+n$/)
        ? BigInt(r.substring(0, r.length - 1))
        : r
    );
  };
function L(t) {
  if (typeof t != 'string')
    throw new Error(`Cannot safe json parse value of type ${typeof t}`);
  try {
    return A(t);
  } catch {
    return t;
  }
}
function d(t) {
  return typeof t == 'string' ? t : S(t) || '';
}
const N = 'PARSE_ERROR',
  I = 'INVALID_REQUEST',
  M = 'METHOD_NOT_FOUND',
  D = 'INVALID_PARAMS',
  y = 'INTERNAL_ERROR',
  u = 'SERVER_ERROR',
  j = [-32700, -32600, -32601, -32602, -32603],
  h = {
    [N]: { code: -32700, message: 'Parse error' },
    [I]: { code: -32600, message: 'Invalid Request' },
    [M]: { code: -32601, message: 'Method not found' },
    [D]: { code: -32602, message: 'Invalid params' },
    [y]: { code: -32603, message: 'Internal error' },
    [u]: { code: -32e3, message: 'Server error' },
  },
  w = u;
function x(t) {
  return j.includes(t);
}
function l(t) {
  return Object.keys(h).includes(t) ? h[t] : h[w];
}
function J(t) {
  const e = Object.values(h).find((n) => n.code === t);
  return e || h[w];
}
function U(t, e, n) {
  return t.message.includes('getaddrinfo ENOTFOUND') ||
    t.message.includes('connect ECONNREFUSED')
    ? new Error(`Unavailable ${n} RPC url at ${e}`)
    : t;
}
var B = {},
  o = {},
  p;
function $() {
  if (p) return o;
  (p = 1),
    Object.defineProperty(o, '__esModule', { value: !0 }),
    (o.isBrowserCryptoAvailable =
      o.getSubtleCrypto =
      o.getBrowerCrypto =
        void 0);
  function t() {
    return (
      (a === null || a === void 0 ? void 0 : a.crypto) ||
      (a === null || a === void 0 ? void 0 : a.msCrypto) ||
      {}
    );
  }
  o.getBrowerCrypto = t;
  function e() {
    const s = t();
    return s.subtle || s.webkitSubtle;
  }
  o.getSubtleCrypto = e;
  function n() {
    return !!t() && !!e();
  }
  return (o.isBrowserCryptoAvailable = n), o;
}
var c = {},
  g;
function H() {
  if (g) return c;
  (g = 1),
    Object.defineProperty(c, '__esModule', { value: !0 }),
    (c.isBrowser = c.isNode = c.isReactNative = void 0);
  function t() {
    return (
      typeof document > 'u' &&
      typeof navigator < 'u' &&
      navigator.product === 'ReactNative'
    );
  }
  c.isReactNative = t;
  function e() {
    return (
      typeof process < 'u' &&
      typeof process.versions < 'u' &&
      typeof process.versions.node < 'u'
    );
  }
  c.isNode = e;
  function n() {
    return !t() && !e();
  }
  return (c.isBrowser = n), c;
}
(function (t) {
  Object.defineProperty(t, '__esModule', { value: !0 });
  const e = C;
  e.__exportStar($(), t), e.__exportStar(H(), t);
})(B);
function _(t = 3) {
  const e = Date.now() * Math.pow(10, t),
    n = Math.floor(Math.random() * Math.pow(10, t));
  return e + n;
}
function F(t = 6) {
  return BigInt(_(t));
}
function q(t, e, n) {
  return { id: n || _(), jsonrpc: '2.0', method: t, params: e };
}
function ne(t, e) {
  return { id: t, jsonrpc: '2.0', result: e };
}
function V(t, e, n) {
  return { id: t, jsonrpc: '2.0', error: k(e, n) };
}
function k(t, e) {
  return typeof t > 'u'
    ? l(y)
    : (typeof t == 'string' &&
        (t = Object.assign(Object.assign({}, l(u)), { message: t })),
      typeof e < 'u' && (t.data = e),
      x(t.code) && (t = J(t.code)),
      t);
}
class b {}
class se extends b {
  constructor(e) {
    super();
  }
}
class G extends b {
  constructor() {
    super();
  }
}
class W extends G {
  constructor(e) {
    super();
  }
}
const X = '^https?:',
  Q = '^wss?:';
function z(t) {
  const e = t.match(new RegExp(/^\w+:/, 'gi'));
  if (!(!e || !e.length)) return e[0];
}
function O(t, e) {
  const n = z(t);
  return typeof n > 'u' ? !1 : new RegExp(e).test(n);
}
function E(t) {
  return O(t, X);
}
function re(t) {
  return O(t, Q);
}
function ie(t) {
  return new RegExp('wss?://localhost(:d{2,5})?').test(t);
}
function P(t) {
  return (
    typeof t == 'object' && 'id' in t && 'jsonrpc' in t && t.jsonrpc === '2.0'
  );
}
function oe(t) {
  return P(t) && 'method' in t;
}
function K(t) {
  return P(t) && (Y(t) || T(t));
}
function Y(t) {
  return 'result' in t;
}
function T(t) {
  return 'error' in t;
}
class ce extends W {
  constructor(e) {
    super(e),
      (this.events = new m.EventEmitter()),
      (this.hasRegisteredEventListeners = !1),
      (this.connection = this.setConnection(e)),
      this.connection.connected && this.registerEventListeners();
  }
  async connect(e = this.connection) {
    await this.open(e);
  }
  async disconnect() {
    await this.close();
  }
  on(e, n) {
    this.events.on(e, n);
  }
  once(e, n) {
    this.events.once(e, n);
  }
  off(e, n) {
    this.events.off(e, n);
  }
  removeListener(e, n) {
    this.events.removeListener(e, n);
  }
  async request(e, n) {
    return this.requestStrict(
      q(e.method, e.params || [], e.id || F().toString()),
      n
    );
  }
  async requestStrict(e, n) {
    return new Promise(async (s, r) => {
      if (!this.connection.connected)
        try {
          await this.open();
        } catch (i) {
          r(i);
        }
      this.events.on(`${e.id}`, (i) => {
        T(i) ? r(i.error) : s(i.result);
      });
      try {
        await this.connection.send(e, n);
      } catch (i) {
        r(i);
      }
    });
  }
  setConnection(e = this.connection) {
    return e;
  }
  onPayload(e) {
    this.events.emit('payload', e),
      K(e)
        ? this.events.emit(`${e.id}`, e)
        : this.events.emit('message', { type: e.method, data: e.params });
  }
  onClose(e) {
    e &&
      e.code === 3e3 &&
      this.events.emit(
        'error',
        new Error(
          `WebSocket connection closed abnormally with code: ${e.code} ${e.reason ? `(${e.reason})` : ''}`
        )
      ),
      this.events.emit('disconnect');
  }
  async open(e = this.connection) {
    (this.connection === e && this.connection.connected) ||
      (this.connection.connected && this.close(),
      typeof e == 'string' &&
        (await this.connection.open(e), (e = this.connection)),
      (this.connection = this.setConnection(e)),
      await this.connection.open(),
      this.registerEventListeners(),
      this.events.emit('connect'));
  }
  async close() {
    await this.connection.close();
  }
  registerEventListeners() {
    this.hasRegisteredEventListeners ||
      (this.connection.on('payload', (e) => this.onPayload(e)),
      this.connection.on('close', (e) => this.onClose(e)),
      this.connection.on('error', (e) => this.events.emit('error', e)),
      this.connection.on('register_error', (e) => this.onClose()),
      (this.hasRegisteredEventListeners = !0));
  }
}
const Z = { Accept: 'application/json', 'Content-Type': 'application/json' },
  ee = 'POST',
  R = { headers: Z, method: ee },
  v = 10;
class ae {
  constructor(e, n = !1) {
    if (
      ((this.url = e),
      (this.disableProviderPing = n),
      (this.events = new m.EventEmitter()),
      (this.isAvailable = !1),
      (this.registering = !1),
      !E(e))
    )
      throw new Error(
        `Provided URL is not compatible with HTTP connection: ${e}`
      );
    (this.url = e), (this.disableProviderPing = n);
  }
  get connected() {
    return this.isAvailable;
  }
  get connecting() {
    return this.registering;
  }
  on(e, n) {
    this.events.on(e, n);
  }
  once(e, n) {
    this.events.once(e, n);
  }
  off(e, n) {
    this.events.off(e, n);
  }
  removeListener(e, n) {
    this.events.removeListener(e, n);
  }
  async open(e = this.url) {
    await this.register(e);
  }
  async close() {
    if (!this.isAvailable) throw new Error('Connection already closed');
    this.onClose();
  }
  async send(e, n) {
    this.isAvailable || (await this.register());
    try {
      const s = d(e),
        i = await (
          await f(this.url, Object.assign(Object.assign({}, R), { body: s }))
        ).json();
      this.onPayload({ data: i });
    } catch (s) {
      this.onError(e.id, s);
    }
  }
  async register(e = this.url) {
    if (!E(e))
      throw new Error(
        `Provided URL is not compatible with HTTP connection: ${e}`
      );
    if (this.registering) {
      const n = this.events.getMaxListeners();
      return (
        (this.events.listenerCount('register_error') >= n ||
          this.events.listenerCount('open') >= n) &&
          this.events.setMaxListeners(n + 1),
        new Promise((s, r) => {
          this.events.once('register_error', (i) => {
            this.resetMaxListeners(), r(i);
          }),
            this.events.once('open', () => {
              if ((this.resetMaxListeners(), typeof this.isAvailable > 'u'))
                return r(new Error('HTTP connection is missing or invalid'));
              s();
            });
        })
      );
    }
    (this.url = e), (this.registering = !0);
    try {
      if (!this.disableProviderPing) {
        const n = d({ id: 1, jsonrpc: '2.0', method: 'test', params: [] });
        await f(e, Object.assign(Object.assign({}, R), { body: n }));
      }
      this.onOpen();
    } catch (n) {
      const s = this.parseError(n);
      throw (this.events.emit('register_error', s), this.onClose(), s);
    }
  }
  onOpen() {
    (this.isAvailable = !0), (this.registering = !1), this.events.emit('open');
  }
  onClose() {
    (this.isAvailable = !1), (this.registering = !1), this.events.emit('close');
  }
  onPayload(e) {
    if (typeof e.data > 'u') return;
    const n = typeof e.data == 'string' ? L(e.data) : e.data;
    this.events.emit('payload', n);
  }
  onError(e, n) {
    const s = this.parseError(n),
      r = s.message || s.toString(),
      i = V(e, r);
    this.events.emit('payload', i);
  }
  parseError(e, n = this.url) {
    return U(e, n, 'HTTP');
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > v && this.events.setMaxListeners(v);
  }
}
export {
  ae as H,
  se as I,
  ce as J,
  L as a,
  ie as b,
  B as c,
  oe as d,
  K as e,
  V as f,
  ne as g,
  Y as h,
  re as i,
  T as j,
  q as k,
  F as l,
  _ as m,
  U as p,
  d as s,
};
