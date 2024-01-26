import { _ as G0 } from './iframe-d50da200.js';
import {
  y as Vs,
  D as ie,
  z as kr,
  E as W0,
  F as Al,
  G as Rl,
  J as yc,
  K as ga,
  L as J0,
  M as _i,
  V as Q0,
  N as Y0,
  O as Y,
  Q as X0,
  R as cc,
  T as Z0,
  U as em,
  W as tm,
  X as Ch,
  Y as rm,
  Z as im,
  _ as sm,
  $ as Oh,
  a0 as nm,
  a1 as am,
  a2 as om,
  a3 as Bs,
  a4 as Ah,
  a5 as cm,
  a6 as um,
  a7 as mc,
  a8 as Tl,
  a9 as Fr,
  aa as hm,
  ab as Rh,
  ac as us,
  ad as $t,
  ae as Gt,
  af as wi,
  ag as hr,
  ah as lm,
  ai as hs,
  aj as Nl,
  ak as fm,
  al as pm,
  am as dm,
  an as $l,
  ao as gm,
  ap as Fl,
  aq as Dl,
  ar as fs,
  as as uc,
  at as ca,
  au as ps,
  av as vm,
  aw as ua,
  ax as ym,
  ay as mm,
  az as wm,
  aA as _m,
  aB as ta,
  aC as bm,
  aD as Em,
  aE as Bo,
  aF as Th,
  aG as Im,
  aH as xm,
  aI as Pm,
  aJ as Nh,
  aK as Sm,
  aL as Cm,
  aM as Om,
  aN as Am,
  aO as Rm,
  aP as Tm,
  aQ as Nm,
  aR as Us,
  aS as Ll,
  aT as Vo,
  aU as $m,
  aV as Fm,
} from './AccountConnectionInput-7bc330b7.js';
import {
  s as Gs,
  a as va,
  i as $h,
  c as Dm,
  b as Lm,
  f as wc,
  p as qm,
  J as ni,
  d as _c,
  e as bc,
  g as ya,
  h as mi,
  j as si,
  k as Ks,
  l as Mm,
  m as jm,
  H as Ii,
} from './http-b2a62645.js';
import { a as ql, c as ra, g as Ml } from './_commonjsHelpers-de833af9.js';
import '../sb-preview/runtime.js';
import './index-0c70cacd.js';
import './index-76fb7be0.js';
import './extends-98964cd2.js';
import './index-d3ea75b5.js';
import './index-8d47fad6.js';
import './BridgeSteps-30389492.js';
import './v4-4a60fe23.js';
import './_commonjs-dynamic-modules-302442b1.js';
import './ActionRequiredBadge-4c3ae44d.js';
import './BridgeTxListNotConnected-80d83e43.js';
import './EcosystemTags-615f572a.js';
const zm =
    /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
  Um =
    /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
  Hm = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function km(c, i) {
  if (
    c === '__proto__' ||
    (c === 'constructor' && i && typeof i == 'object' && 'prototype' in i)
  ) {
    Km(c);
    return;
  }
  return i;
}
function Km(c) {
  console.warn(`[destr] Dropping "${c}" key to prevent prototype pollution.`);
}
function ia(c, i = {}) {
  if (typeof c != 'string') return c;
  const r = c.trim();
  if (c[0] === '"' && c.at(-1) === '"' && !c.includes('\\'))
    return r.slice(1, -1);
  if (r.length <= 9) {
    const n = r.toLowerCase();
    if (n === 'true') return !0;
    if (n === 'false') return !1;
    if (n === 'undefined') return;
    if (n === 'null') return null;
    if (n === 'nan') return Number.NaN;
    if (n === 'infinity') return Number.POSITIVE_INFINITY;
    if (n === '-infinity') return Number.NEGATIVE_INFINITY;
  }
  if (!Hm.test(c)) {
    if (i.strict) throw new SyntaxError('[destr] Invalid JSON');
    return c;
  }
  try {
    if (zm.test(c) || Um.test(c)) {
      if (i.strict) throw new Error('[destr] Possible prototype pollution');
      return JSON.parse(c, km);
    }
    return JSON.parse(c);
  } catch (n) {
    if (i.strict) throw n;
    return c;
  }
}
function Bm(c) {
  return !c || typeof c.then != 'function' ? Promise.resolve(c) : c;
}
function zt(c, ...i) {
  try {
    return Bm(c(...i));
  } catch (r) {
    return Promise.reject(r);
  }
}
function Vm(c) {
  const i = typeof c;
  return c === null || (i !== 'object' && i !== 'function');
}
function Gm(c) {
  const i = Object.getPrototypeOf(c);
  return !i || i.isPrototypeOf(Object);
}
function ha(c) {
  if (Vm(c)) return String(c);
  if (Gm(c) || Array.isArray(c)) return JSON.stringify(c);
  if (typeof c.toJSON == 'function') return ha(c.toJSON());
  throw new Error('[unstorage] Cannot stringify value!');
}
function jl() {
  if (typeof Buffer === void 0)
    throw new TypeError('[unstorage] Buffer is not supported!');
}
const hc = 'base64:';
function Wm(c) {
  if (typeof c == 'string') return c;
  jl();
  const i = Buffer.from(c).toString('base64');
  return hc + i;
}
function Jm(c) {
  return typeof c != 'string' || !c.startsWith(hc)
    ? c
    : (jl(), Buffer.from(c.slice(hc.length), 'base64'));
}
function ur(c) {
  return c
    ? c
        .split('?')[0]
        .replace(/[/\\]/g, ':')
        .replace(/:+/g, ':')
        .replace(/^:|:$/g, '')
    : '';
}
function Qm(...c) {
  return ur(c.join(':'));
}
function sa(c) {
  return (c = ur(c)), c ? c + ':' : '';
}
const Ym = 'memory',
  Xm = () => {
    const c = new Map();
    return {
      name: Ym,
      options: {},
      hasItem(i) {
        return c.has(i);
      },
      getItem(i) {
        return c.get(i) ?? null;
      },
      getItemRaw(i) {
        return c.get(i) ?? null;
      },
      setItem(i, r) {
        c.set(i, r);
      },
      setItemRaw(i, r) {
        c.set(i, r);
      },
      removeItem(i) {
        c.delete(i);
      },
      getKeys() {
        return Array.from(c.keys());
      },
      clear() {
        c.clear();
      },
      dispose() {
        c.clear();
      },
    };
  };
function Zm(c = {}) {
  const i = {
      mounts: { '': c.driver || Xm() },
      mountpoints: [''],
      watching: !1,
      watchListeners: [],
      unwatch: {},
    },
    r = (y) => {
      for (const E of i.mountpoints)
        if (y.startsWith(E))
          return {
            base: E,
            relativeKey: y.slice(E.length),
            driver: i.mounts[E],
          };
      return { base: '', relativeKey: y, driver: i.mounts[''] };
    },
    n = (y, E) =>
      i.mountpoints
        .filter((C) => C.startsWith(y) || (E && y.startsWith(C)))
        .map((C) => ({
          relativeBase: y.length > C.length ? y.slice(C.length) : void 0,
          mountpoint: C,
          driver: i.mounts[C],
        })),
    a = (y, E) => {
      if (i.watching) {
        E = ur(E);
        for (const C of i.watchListeners) C(y, E);
      }
    },
    l = async () => {
      if (!i.watching) {
        i.watching = !0;
        for (const y in i.mounts) i.unwatch[y] = await Fh(i.mounts[y], a, y);
      }
    },
    d = async () => {
      if (i.watching) {
        for (const y in i.unwatch) await i.unwatch[y]();
        (i.unwatch = {}), (i.watching = !1);
      }
    },
    v = (y, E, C) => {
      const A = new Map(),
        j = (F) => {
          let K = A.get(F.base);
          return (
            K ||
              ((K = { driver: F.driver, base: F.base, items: [] }),
              A.set(F.base, K)),
            K
          );
        };
      for (const F of y) {
        const K = typeof F == 'string',
          re = ur(K ? F : F.key),
          ce = K ? void 0 : F.value,
          ue = K || !F.options ? E : { ...E, ...F.options },
          he = r(re);
        j(he).items.push({
          key: re,
          value: ce,
          relativeKey: he.relativeKey,
          options: ue,
        });
      }
      return Promise.all([...A.values()].map((F) => C(F))).then((F) =>
        F.flat()
      );
    },
    w = {
      hasItem(y, E = {}) {
        y = ur(y);
        const { relativeKey: C, driver: A } = r(y);
        return zt(A.hasItem, C, E);
      },
      getItem(y, E = {}) {
        y = ur(y);
        const { relativeKey: C, driver: A } = r(y);
        return zt(A.getItem, C, E).then((j) => ia(j));
      },
      getItems(y, E) {
        return v(y, E, (C) =>
          C.driver.getItems
            ? zt(
                C.driver.getItems,
                C.items.map((A) => ({
                  key: A.relativeKey,
                  options: A.options,
                })),
                E
              ).then((A) =>
                A.map((j) => ({ key: Qm(C.base, j.key), value: ia(j.value) }))
              )
            : Promise.all(
                C.items.map((A) =>
                  zt(C.driver.getItem, A.relativeKey, A.options).then((j) => ({
                    key: A.key,
                    value: ia(j),
                  }))
                )
              )
        );
      },
      getItemRaw(y, E = {}) {
        y = ur(y);
        const { relativeKey: C, driver: A } = r(y);
        return A.getItemRaw
          ? zt(A.getItemRaw, C, E)
          : zt(A.getItem, C, E).then((j) => Jm(j));
      },
      async setItem(y, E, C = {}) {
        if (E === void 0) return w.removeItem(y);
        y = ur(y);
        const { relativeKey: A, driver: j } = r(y);
        j.setItem &&
          (await zt(j.setItem, A, ha(E), C), j.watch || a('update', y));
      },
      async setItems(y, E) {
        await v(y, E, async (C) => {
          C.driver.setItems &&
            (await zt(
              C.driver.setItems,
              C.items.map((A) => ({
                key: A.relativeKey,
                value: ha(A.value),
                options: A.options,
              })),
              E
            )),
            C.driver.setItem &&
              (await Promise.all(
                C.items.map((A) =>
                  zt(C.driver.setItem, A.relativeKey, ha(A.value), A.options)
                )
              ));
        });
      },
      async setItemRaw(y, E, C = {}) {
        if (E === void 0) return w.removeItem(y, C);
        y = ur(y);
        const { relativeKey: A, driver: j } = r(y);
        if (j.setItemRaw) await zt(j.setItemRaw, A, E, C);
        else if (j.setItem) await zt(j.setItem, A, Wm(E), C);
        else return;
        j.watch || a('update', y);
      },
      async removeItem(y, E = {}) {
        typeof E == 'boolean' && (E = { removeMeta: E }), (y = ur(y));
        const { relativeKey: C, driver: A } = r(y);
        A.removeItem &&
          (await zt(A.removeItem, C, E),
          (E.removeMeta || E.removeMata) &&
            (await zt(A.removeItem, C + '$', E)),
          A.watch || a('remove', y));
      },
      async getMeta(y, E = {}) {
        typeof E == 'boolean' && (E = { nativeOnly: E }), (y = ur(y));
        const { relativeKey: C, driver: A } = r(y),
          j = Object.create(null);
        if (
          (A.getMeta && Object.assign(j, await zt(A.getMeta, C, E)),
          !E.nativeOnly)
        ) {
          const F = await zt(A.getItem, C + '$', E).then((K) => ia(K));
          F &&
            typeof F == 'object' &&
            (typeof F.atime == 'string' && (F.atime = new Date(F.atime)),
            typeof F.mtime == 'string' && (F.mtime = new Date(F.mtime)),
            Object.assign(j, F));
        }
        return j;
      },
      setMeta(y, E, C = {}) {
        return this.setItem(y + '$', E, C);
      },
      removeMeta(y, E = {}) {
        return this.removeItem(y + '$', E);
      },
      async getKeys(y, E = {}) {
        y = sa(y);
        const C = n(y, !0);
        let A = [];
        const j = [];
        for (const F of C) {
          const re = (await zt(F.driver.getKeys, F.relativeBase, E))
            .map((ce) => F.mountpoint + ur(ce))
            .filter((ce) => !A.some((ue) => ce.startsWith(ue)));
          j.push(...re),
            (A = [
              F.mountpoint,
              ...A.filter((ce) => !ce.startsWith(F.mountpoint)),
            ]);
        }
        return y
          ? j.filter((F) => F.startsWith(y) && !F.endsWith('$'))
          : j.filter((F) => !F.endsWith('$'));
      },
      async clear(y, E = {}) {
        (y = sa(y)),
          await Promise.all(
            n(y, !1).map(async (C) => {
              if (C.driver.clear) return zt(C.driver.clear, C.relativeBase, E);
              if (C.driver.removeItem) {
                const A = await C.driver.getKeys(C.relativeBase || '', E);
                return Promise.all(A.map((j) => C.driver.removeItem(j, E)));
              }
            })
          );
      },
      async dispose() {
        await Promise.all(Object.values(i.mounts).map((y) => Dh(y)));
      },
      async watch(y) {
        return (
          await l(),
          i.watchListeners.push(y),
          async () => {
            (i.watchListeners = i.watchListeners.filter((E) => E !== y)),
              i.watchListeners.length === 0 && (await d());
          }
        );
      },
      async unwatch() {
        (i.watchListeners = []), await d();
      },
      mount(y, E) {
        if (((y = sa(y)), y && i.mounts[y]))
          throw new Error(`already mounted at ${y}`);
        return (
          y &&
            (i.mountpoints.push(y),
            i.mountpoints.sort((C, A) => A.length - C.length)),
          (i.mounts[y] = E),
          i.watching &&
            Promise.resolve(Fh(E, a, y))
              .then((C) => {
                i.unwatch[y] = C;
              })
              .catch(console.error),
          w
        );
      },
      async unmount(y, E = !0) {
        (y = sa(y)),
          !(!y || !i.mounts[y]) &&
            (i.watching &&
              y in i.unwatch &&
              (i.unwatch[y](), delete i.unwatch[y]),
            E && (await Dh(i.mounts[y])),
            (i.mountpoints = i.mountpoints.filter((C) => C !== y)),
            delete i.mounts[y]);
      },
      getMount(y = '') {
        y = ur(y) + ':';
        const E = r(y);
        return { driver: E.driver, base: E.base };
      },
      getMounts(y = '', E = {}) {
        return (
          (y = ur(y)),
          n(y, E.parents).map((A) => ({ driver: A.driver, base: A.mountpoint }))
        );
      },
    };
  return w;
}
function Fh(c, i, r) {
  return c.watch ? c.watch((n, a) => i(n, r + a)) : () => {};
}
async function Dh(c) {
  typeof c.dispose == 'function' && (await zt(c.dispose));
}
function zi(c) {
  return new Promise((i, r) => {
    (c.oncomplete = c.onsuccess = () => i(c.result)),
      (c.onabort = c.onerror = () => r(c.error));
  });
}
function zl(c, i) {
  const r = indexedDB.open(c);
  r.onupgradeneeded = () => r.result.createObjectStore(i);
  const n = zi(r);
  return (a, l) => n.then((d) => l(d.transaction(i, a).objectStore(i)));
}
let Go;
function Ws() {
  return Go || (Go = zl('keyval-store', 'keyval')), Go;
}
function Lh(c, i = Ws()) {
  return i('readonly', (r) => zi(r.get(c)));
}
function e1(c, i, r = Ws()) {
  return r('readwrite', (n) => (n.put(i, c), zi(n.transaction)));
}
function t1(c, i = Ws()) {
  return i('readwrite', (r) => (r.delete(c), zi(r.transaction)));
}
function r1(c = Ws()) {
  return c('readwrite', (i) => (i.clear(), zi(i.transaction)));
}
function i1(c, i) {
  return (
    (c.openCursor().onsuccess = function () {
      this.result && (i(this.result), this.result.continue());
    }),
    zi(c.transaction)
  );
}
function s1(c = Ws()) {
  return c('readonly', (i) => {
    if (i.getAllKeys) return zi(i.getAllKeys());
    const r = [];
    return i1(i, (n) => r.push(n.key)).then(() => r);
  });
}
const n1 = 'idb-keyval';
var a1 = (c = {}) => {
  const i = c.base && c.base.length > 0 ? `${c.base}:` : '',
    r = (a) => i + a;
  let n;
  return (
    c.dbName && c.storeName && (n = zl(c.dbName, c.storeName)),
    {
      name: n1,
      options: c,
      async hasItem(a) {
        return !(typeof (await Lh(r(a), n)) > 'u');
      },
      async getItem(a) {
        return (await Lh(r(a), n)) ?? null;
      },
      setItem(a, l) {
        return e1(r(a), l, n);
      },
      removeItem(a) {
        return t1(r(a), n);
      },
      getKeys() {
        return s1(n);
      },
      clear() {
        return r1(n);
      },
    }
  );
};
const o1 = 'WALLET_CONNECT_V2_INDEXED_DB',
  c1 = 'keyvaluestorage';
let u1 = class {
  constructor() {
    this.indexedDb = Zm({ driver: a1({ dbName: o1, storeName: c1 }) });
  }
  async getKeys() {
    return this.indexedDb.getKeys();
  }
  async getEntries() {
    return (await this.indexedDb.getItems(await this.indexedDb.getKeys())).map(
      (i) => [i.key, i.value]
    );
  }
  async getItem(i) {
    const r = await this.indexedDb.getItem(i);
    if (r !== null) return r;
  }
  async setItem(i, r) {
    await this.indexedDb.setItem(i, Gs(r));
  }
  async removeItem(i) {
    await this.indexedDb.removeItem(i);
  }
};
var Wo =
    typeof globalThis < 'u'
      ? globalThis
      : typeof window < 'u'
        ? window
        : typeof global < 'u'
          ? global
          : typeof self < 'u'
            ? self
            : {},
  la = { exports: {} };
(function () {
  let c;
  function i() {}
  (c = i),
    (c.prototype.getItem = function (r) {
      return this.hasOwnProperty(r) ? String(this[r]) : null;
    }),
    (c.prototype.setItem = function (r, n) {
      this[r] = String(n);
    }),
    (c.prototype.removeItem = function (r) {
      delete this[r];
    }),
    (c.prototype.clear = function () {
      const r = this;
      Object.keys(r).forEach(function (n) {
        (r[n] = void 0), delete r[n];
      });
    }),
    (c.prototype.key = function (r) {
      return (r = r || 0), Object.keys(this)[r];
    }),
    c.prototype.__defineGetter__('length', function () {
      return Object.keys(this).length;
    }),
    typeof Wo < 'u' && Wo.localStorage
      ? (la.exports = Wo.localStorage)
      : typeof window < 'u' && window.localStorage
        ? (la.exports = window.localStorage)
        : (la.exports = new i());
})();
function h1(c) {
  var i;
  return [c[0], va((i = c[1]) != null ? i : '')];
}
class l1 {
  constructor() {
    this.localStorage = la.exports;
  }
  async getKeys() {
    return Object.keys(this.localStorage);
  }
  async getEntries() {
    return Object.entries(this.localStorage).map(h1);
  }
  async getItem(i) {
    const r = this.localStorage.getItem(i);
    if (r !== null) return va(r);
  }
  async setItem(i, r) {
    this.localStorage.setItem(i, Gs(r));
  }
  async removeItem(i) {
    this.localStorage.removeItem(i);
  }
}
const f1 = 'wc_storage_version',
  qh = 1,
  p1 = async (c, i, r) => {
    const n = f1,
      a = await i.getItem(n);
    if (a && a >= qh) {
      r(i);
      return;
    }
    const l = await c.getKeys();
    if (!l.length) {
      r(i);
      return;
    }
    const d = [];
    for (; l.length; ) {
      const v = l.shift();
      if (!v) continue;
      const w = v.toLowerCase();
      if (
        w.includes('wc@') ||
        w.includes('walletconnect') ||
        w.includes('wc_') ||
        w.includes('wallet_connect')
      ) {
        const y = await c.getItem(v);
        await i.setItem(v, y), d.push(v);
      }
    }
    await i.setItem(n, qh), r(i), d1(c, d);
  },
  d1 = async (c, i) => {
    i.length &&
      i.forEach(async (r) => {
        await c.removeItem(r);
      });
  };
let g1 = class {
  constructor() {
    (this.initialized = !1),
      (this.setInitialized = (r) => {
        (this.storage = r), (this.initialized = !0);
      });
    const i = new l1();
    this.storage = i;
    try {
      const r = new u1();
      p1(i, r, this.setInitialized);
    } catch {
      this.initialized = !0;
    }
  }
  async getKeys() {
    return await this.initialize(), this.storage.getKeys();
  }
  async getEntries() {
    return await this.initialize(), this.storage.getEntries();
  }
  async getItem(i) {
    return await this.initialize(), this.storage.getItem(i);
  }
  async setItem(i, r) {
    return await this.initialize(), this.storage.setItem(i, r);
  }
  async removeItem(i) {
    return await this.initialize(), this.storage.removeItem(i);
  }
  async initialize() {
    this.initialized ||
      (await new Promise((i) => {
        const r = setInterval(() => {
          this.initialized && (clearInterval(r), i());
        }, 20);
      }));
  }
};
var ds = {},
  Fs = {},
  Jo = {},
  Ds = {};
class Ui {}
const v1 = Object.freeze(
    Object.defineProperty(
      { __proto__: null, IEvents: Ui },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  y1 = ql(v1);
var Mh;
function m1() {
  if (Mh) return Ds;
  (Mh = 1),
    Object.defineProperty(Ds, '__esModule', { value: !0 }),
    (Ds.IHeartBeat = void 0);
  const c = y1;
  class i extends c.IEvents {
    constructor(n) {
      super();
    }
  }
  return (Ds.IHeartBeat = i), Ds;
}
var jh;
function Ul() {
  return (
    jh ||
      ((jh = 1),
      (function (c) {
        Object.defineProperty(c, '__esModule', { value: !0 }),
          Vs.__exportStar(m1(), c);
      })(Jo)),
    Jo
  );
}
var Qo = {},
  Mi = {},
  zh;
function w1() {
  if (zh) return Mi;
  (zh = 1),
    Object.defineProperty(Mi, '__esModule', { value: !0 }),
    (Mi.HEARTBEAT_EVENTS = Mi.HEARTBEAT_INTERVAL = void 0);
  const c = ie;
  return (
    (Mi.HEARTBEAT_INTERVAL = c.FIVE_SECONDS),
    (Mi.HEARTBEAT_EVENTS = { pulse: 'heartbeat_pulse' }),
    Mi
  );
}
var Uh;
function Hl() {
  return (
    Uh ||
      ((Uh = 1),
      (function (c) {
        Object.defineProperty(c, '__esModule', { value: !0 }),
          Vs.__exportStar(w1(), c);
      })(Qo)),
    Qo
  );
}
var Hh;
function _1() {
  if (Hh) return Fs;
  (Hh = 1),
    Object.defineProperty(Fs, '__esModule', { value: !0 }),
    (Fs.HeartBeat = void 0);
  const c = Vs,
    i = kr,
    r = ie,
    n = Ul(),
    a = Hl();
  class l extends n.IHeartBeat {
    constructor(v) {
      super(v),
        (this.events = new i.EventEmitter()),
        (this.interval = a.HEARTBEAT_INTERVAL),
        (this.interval =
          (v == null ? void 0 : v.interval) || a.HEARTBEAT_INTERVAL);
    }
    static init(v) {
      return c.__awaiter(this, void 0, void 0, function* () {
        const w = new l(v);
        return yield w.init(), w;
      });
    }
    init() {
      return c.__awaiter(this, void 0, void 0, function* () {
        yield this.initialize();
      });
    }
    stop() {
      clearInterval(this.intervalRef);
    }
    on(v, w) {
      this.events.on(v, w);
    }
    once(v, w) {
      this.events.once(v, w);
    }
    off(v, w) {
      this.events.off(v, w);
    }
    removeListener(v, w) {
      this.events.removeListener(v, w);
    }
    initialize() {
      return c.__awaiter(this, void 0, void 0, function* () {
        this.intervalRef = setInterval(
          () => this.pulse(),
          r.toMiliseconds(this.interval)
        );
      });
    }
    pulse() {
      this.events.emit(a.HEARTBEAT_EVENTS.pulse);
    }
  }
  return (Fs.HeartBeat = l), Fs;
}
(function (c) {
  Object.defineProperty(c, '__esModule', { value: !0 });
  const i = Vs;
  i.__exportStar(_1(), c), i.__exportStar(Ul(), c), i.__exportStar(Hl(), c);
})(ds);
var Se = {},
  Yo,
  kh;
function b1() {
  if (kh) return Yo;
  kh = 1;
  function c(r) {
    try {
      return JSON.stringify(r);
    } catch {
      return '"[Circular]"';
    }
  }
  Yo = i;
  function i(r, n, a) {
    var l = (a && a.stringify) || c,
      d = 1;
    if (typeof r == 'object' && r !== null) {
      var v = n.length + d;
      if (v === 1) return r;
      var w = new Array(v);
      w[0] = l(r);
      for (var y = 1; y < v; y++) w[y] = l(n[y]);
      return w.join(' ');
    }
    if (typeof r != 'string') return r;
    var E = n.length;
    if (E === 0) return r;
    for (
      var C = '', A = 1 - d, j = -1, F = (r && r.length) || 0, K = 0;
      K < F;

    ) {
      if (r.charCodeAt(K) === 37 && K + 1 < F) {
        switch (((j = j > -1 ? j : 0), r.charCodeAt(K + 1))) {
          case 100:
          case 102:
            if (A >= E || n[A] == null) break;
            j < K && (C += r.slice(j, K)),
              (C += Number(n[A])),
              (j = K + 2),
              K++;
            break;
          case 105:
            if (A >= E || n[A] == null) break;
            j < K && (C += r.slice(j, K)),
              (C += Math.floor(Number(n[A]))),
              (j = K + 2),
              K++;
            break;
          case 79:
          case 111:
          case 106:
            if (A >= E || n[A] === void 0) break;
            j < K && (C += r.slice(j, K));
            var re = typeof n[A];
            if (re === 'string') {
              (C += "'" + n[A] + "'"), (j = K + 2), K++;
              break;
            }
            if (re === 'function') {
              (C += n[A].name || '<anonymous>'), (j = K + 2), K++;
              break;
            }
            (C += l(n[A])), (j = K + 2), K++;
            break;
          case 115:
            if (A >= E) break;
            j < K && (C += r.slice(j, K)),
              (C += String(n[A])),
              (j = K + 2),
              K++;
            break;
          case 37:
            j < K && (C += r.slice(j, K)), (C += '%'), (j = K + 2), K++, A--;
            break;
        }
        ++A;
      }
      ++K;
    }
    return j === -1 ? r : (j < F && (C += r.slice(j)), C);
  }
  return Yo;
}
var Xo, Kh;
function E1() {
  if (Kh) return Xo;
  Kh = 1;
  const c = b1();
  Xo = a;
  const i = pe().console || {},
    r = {
      mapHttpRequest: F,
      mapHttpResponse: F,
      wrapRequestSerializer: K,
      wrapResponseSerializer: K,
      wrapErrorSerializer: K,
      req: F,
      res: F,
      err: A,
    };
  function n($, H) {
    return Array.isArray($)
      ? $.filter(function (ve) {
          return ve !== '!stdSerializers.err';
        })
      : $ === !0
        ? Object.keys(H)
        : !1;
  }
  function a($) {
    ($ = $ || {}), ($.browser = $.browser || {});
    const H = $.browser.transmit;
    if (H && typeof H.send != 'function')
      throw Error('pino: transmit option must have a send function');
    const W = $.browser.write || i;
    $.browser.write && ($.browser.asObject = !0);
    const ve = $.serializers || {},
      te = n($.browser.serialize, ve);
    let Ee = $.browser.serialize;
    Array.isArray($.browser.serialize) &&
      $.browser.serialize.indexOf('!stdSerializers.err') > -1 &&
      (Ee = !1);
    const Ae = ['error', 'fatal', 'warn', 'info', 'debug', 'trace'];
    typeof W == 'function' &&
      (W.error = W.fatal = W.warn = W.info = W.debug = W.trace = W),
      $.enabled === !1 && ($.level = 'silent');
    const et = $.level || 'info',
      R = Object.create(W);
    R.log || (R.log = re),
      Object.defineProperty(R, 'levelVal', { get: je }),
      Object.defineProperty(R, 'level', { get: Re, set: J });
    const M = {
      transmit: H,
      serialize: te,
      asObject: $.browser.asObject,
      levels: Ae,
      timestamp: j($),
    };
    (R.levels = a.levels),
      (R.level = et),
      (R.setMaxListeners =
        R.getMaxListeners =
        R.emit =
        R.addListener =
        R.on =
        R.prependListener =
        R.once =
        R.prependOnceListener =
        R.removeListener =
        R.removeAllListeners =
        R.listeners =
        R.listenerCount =
        R.eventNames =
        R.write =
        R.flush =
          re),
      (R.serializers = ve),
      (R._serialize = te),
      (R._stdErrSerialize = Ee),
      (R.child = B),
      H && (R._logEvent = C());
    function je() {
      return this.level === 'silent' ? 1 / 0 : this.levels.values[this.level];
    }
    function Re() {
      return this._level;
    }
    function J(k) {
      if (k !== 'silent' && !this.levels.values[k])
        throw Error('unknown level ' + k);
      (this._level = k),
        l(M, R, 'error', 'log'),
        l(M, R, 'fatal', 'error'),
        l(M, R, 'warn', 'error'),
        l(M, R, 'info', 'log'),
        l(M, R, 'debug', 'log'),
        l(M, R, 'trace', 'log');
    }
    function B(k, V) {
      if (!k) throw new Error('missing bindings for child Pino');
      (V = V || {}), te && k.serializers && (V.serializers = k.serializers);
      const ut = V.serializers;
      if (te && ut) {
        var He = Object.assign({}, ve, ut),
          Dr = $.browser.serialize === !0 ? Object.keys(He) : te;
        delete k.serializers, w([k], Dr, He, this._stdErrSerialize);
      }
      function _e(It) {
        (this._childLevel = (It._childLevel | 0) + 1),
          (this.error = y(It, k, 'error')),
          (this.fatal = y(It, k, 'fatal')),
          (this.warn = y(It, k, 'warn')),
          (this.info = y(It, k, 'info')),
          (this.debug = y(It, k, 'debug')),
          (this.trace = y(It, k, 'trace')),
          He && ((this.serializers = He), (this._serialize = Dr)),
          H && (this._logEvent = C([].concat(It._logEvent.bindings, k)));
      }
      return (_e.prototype = this), new _e(this);
    }
    return R;
  }
  (a.levels = {
    values: { fatal: 60, error: 50, warn: 40, info: 30, debug: 20, trace: 10 },
    labels: {
      10: 'trace',
      20: 'debug',
      30: 'info',
      40: 'warn',
      50: 'error',
      60: 'fatal',
    },
  }),
    (a.stdSerializers = r),
    (a.stdTimeFunctions = Object.assign(
      {},
      { nullTime: ce, epochTime: ue, unixTime: he, isoTime: fe }
    ));
  function l($, H, W, ve) {
    const te = Object.getPrototypeOf(H);
    (H[W] =
      H.levelVal > H.levels.values[W]
        ? re
        : te[W]
          ? te[W]
          : i[W] || i[ve] || re),
      d($, H, W);
  }
  function d($, H, W) {
    (!$.transmit && H[W] === re) ||
      (H[W] = (function (ve) {
        return function () {
          const Ee = $.timestamp(),
            Ae = new Array(arguments.length),
            et =
              Object.getPrototypeOf && Object.getPrototypeOf(this) === i
                ? i
                : this;
          for (var R = 0; R < Ae.length; R++) Ae[R] = arguments[R];
          if (
            ($.serialize &&
              !$.asObject &&
              w(Ae, this._serialize, this.serializers, this._stdErrSerialize),
            $.asObject ? ve.call(et, v(this, W, Ae, Ee)) : ve.apply(et, Ae),
            $.transmit)
          ) {
            const M = $.transmit.level || H.level,
              je = a.levels.values[M],
              Re = a.levels.values[W];
            if (Re < je) return;
            E(
              this,
              {
                ts: Ee,
                methodLevel: W,
                methodValue: Re,
                transmitLevel: M,
                transmitValue: a.levels.values[$.transmit.level || H.level],
                send: $.transmit.send,
                val: H.levelVal,
              },
              Ae
            );
          }
        };
      })(H[W]));
  }
  function v($, H, W, ve) {
    $._serialize && w(W, $._serialize, $.serializers, $._stdErrSerialize);
    const te = W.slice();
    let Ee = te[0];
    const Ae = {};
    ve && (Ae.time = ve), (Ae.level = a.levels.values[H]);
    let et = ($._childLevel | 0) + 1;
    if ((et < 1 && (et = 1), Ee !== null && typeof Ee == 'object')) {
      for (; et-- && typeof te[0] == 'object'; ) Object.assign(Ae, te.shift());
      Ee = te.length ? c(te.shift(), te) : void 0;
    } else typeof Ee == 'string' && (Ee = c(te.shift(), te));
    return Ee !== void 0 && (Ae.msg = Ee), Ae;
  }
  function w($, H, W, ve) {
    for (const te in $)
      if (ve && $[te] instanceof Error) $[te] = a.stdSerializers.err($[te]);
      else if (typeof $[te] == 'object' && !Array.isArray($[te]))
        for (const Ee in $[te])
          H && H.indexOf(Ee) > -1 && Ee in W && ($[te][Ee] = W[Ee]($[te][Ee]));
  }
  function y($, H, W) {
    return function () {
      const ve = new Array(1 + arguments.length);
      ve[0] = H;
      for (var te = 1; te < ve.length; te++) ve[te] = arguments[te - 1];
      return $[W].apply(this, ve);
    };
  }
  function E($, H, W) {
    const ve = H.send,
      te = H.ts,
      Ee = H.methodLevel,
      Ae = H.methodValue,
      et = H.val,
      R = $._logEvent.bindings;
    w(
      W,
      $._serialize || Object.keys($.serializers),
      $.serializers,
      $._stdErrSerialize === void 0 ? !0 : $._stdErrSerialize
    ),
      ($._logEvent.ts = te),
      ($._logEvent.messages = W.filter(function (M) {
        return R.indexOf(M) === -1;
      })),
      ($._logEvent.level.label = Ee),
      ($._logEvent.level.value = Ae),
      ve(Ee, $._logEvent, et),
      ($._logEvent = C(R));
  }
  function C($) {
    return {
      ts: 0,
      messages: [],
      bindings: $ || [],
      level: { label: '', value: 0 },
    };
  }
  function A($) {
    const H = { type: $.constructor.name, msg: $.message, stack: $.stack };
    for (const W in $) H[W] === void 0 && (H[W] = $[W]);
    return H;
  }
  function j($) {
    return typeof $.timestamp == 'function'
      ? $.timestamp
      : $.timestamp === !1
        ? ce
        : ue;
  }
  function F() {
    return {};
  }
  function K($) {
    return $;
  }
  function re() {}
  function ce() {
    return !1;
  }
  function ue() {
    return Date.now();
  }
  function he() {
    return Math.round(Date.now() / 1e3);
  }
  function fe() {
    return new Date(Date.now()).toISOString();
  }
  function pe() {
    function $(H) {
      return typeof H < 'u' && H;
    }
    try {
      return (
        typeof globalThis < 'u' ||
          Object.defineProperty(Object.prototype, 'globalThis', {
            get: function () {
              return (
                delete Object.prototype.globalThis, (this.globalThis = this)
              );
            },
            configurable: !0,
          }),
        globalThis
      );
    } catch {
      return $(self) || $(window) || $(this) || {};
    }
  }
  return Xo;
}
var ji = {},
  Bh;
function kl() {
  return (
    Bh ||
      ((Bh = 1),
      Object.defineProperty(ji, '__esModule', { value: !0 }),
      (ji.PINO_CUSTOM_CONTEXT_KEY = ji.PINO_LOGGER_DEFAULTS = void 0),
      (ji.PINO_LOGGER_DEFAULTS = { level: 'info' }),
      (ji.PINO_CUSTOM_CONTEXT_KEY = 'custom_context')),
    ji
  );
}
var tr = {},
  Vh;
function I1() {
  if (Vh) return tr;
  (Vh = 1),
    Object.defineProperty(tr, '__esModule', { value: !0 }),
    (tr.generateChildLogger =
      tr.formatChildLoggerContext =
      tr.getLoggerContext =
      tr.setBrowserLoggerContext =
      tr.getBrowserLoggerContext =
      tr.getDefaultLoggerOptions =
        void 0);
  const c = kl();
  function i(v) {
    return Object.assign(Object.assign({}, v), {
      level: (v == null ? void 0 : v.level) || c.PINO_LOGGER_DEFAULTS.level,
    });
  }
  tr.getDefaultLoggerOptions = i;
  function r(v, w = c.PINO_CUSTOM_CONTEXT_KEY) {
    return v[w] || '';
  }
  tr.getBrowserLoggerContext = r;
  function n(v, w, y = c.PINO_CUSTOM_CONTEXT_KEY) {
    return (v[y] = w), v;
  }
  tr.setBrowserLoggerContext = n;
  function a(v, w = c.PINO_CUSTOM_CONTEXT_KEY) {
    let y = '';
    return (
      typeof v.bindings > 'u'
        ? (y = r(v, w))
        : (y = v.bindings().context || ''),
      y
    );
  }
  tr.getLoggerContext = a;
  function l(v, w, y = c.PINO_CUSTOM_CONTEXT_KEY) {
    const E = a(v, y);
    return E.trim() ? `${E}/${w}` : w;
  }
  tr.formatChildLoggerContext = l;
  function d(v, w, y = c.PINO_CUSTOM_CONTEXT_KEY) {
    const E = l(v, w, y),
      C = v.child({ context: E });
    return n(C, E, y);
  }
  return (tr.generateChildLogger = d), tr;
}
(function (c) {
  Object.defineProperty(c, '__esModule', { value: !0 }), (c.pino = void 0);
  const i = Vs,
    r = i.__importDefault(E1());
  Object.defineProperty(c, 'pino', {
    enumerable: !0,
    get: function () {
      return r.default;
    },
  }),
    i.__exportStar(kl(), c),
    i.__exportStar(I1(), c);
})(Se);
class x1 extends Ui {
  constructor(i) {
    super(), (this.opts = i), (this.protocol = 'wc'), (this.version = 2);
  }
}
let P1 = class extends Ui {
    constructor(i, r) {
      super(), (this.core = i), (this.logger = r), (this.records = new Map());
    }
  },
  S1 = class {
    constructor(i, r) {
      (this.logger = i), (this.core = r);
    }
  },
  C1 = class extends Ui {
    constructor(i, r) {
      super(), (this.relayer = i), (this.logger = r);
    }
  },
  O1 = class extends Ui {
    constructor(i) {
      super();
    }
  },
  A1 = class {
    constructor(i, r, n, a) {
      (this.core = i), (this.logger = r), (this.name = n);
    }
  };
class R1 extends Ui {
  constructor(i, r) {
    super(), (this.relayer = i), (this.logger = r);
  }
}
let T1 = class extends Ui {
    constructor(i, r) {
      super(), (this.core = i), (this.logger = r);
    }
  },
  N1 = class {
    constructor(i, r) {
      (this.projectId = i), (this.logger = r);
    }
  },
  $1 = class {
    constructor(i, r) {
      (this.projectId = i), (this.logger = r);
    }
  },
  F1 = class {
    constructor(i) {
      (this.opts = i), (this.protocol = 'wc'), (this.version = 2);
    }
  },
  D1 = class {
    constructor(i) {
      this.client = i;
    }
  };
var Ec = {},
  Kl = {};
(function (c) {
  Object.defineProperty(c, '__esModule', { value: !0 });
  var i = W0,
    r = Al;
  (c.DIGEST_LENGTH = 64), (c.BLOCK_SIZE = 128);
  var n = (function () {
    function v() {
      (this.digestLength = c.DIGEST_LENGTH),
        (this.blockSize = c.BLOCK_SIZE),
        (this._stateHi = new Int32Array(8)),
        (this._stateLo = new Int32Array(8)),
        (this._tempHi = new Int32Array(16)),
        (this._tempLo = new Int32Array(16)),
        (this._buffer = new Uint8Array(256)),
        (this._bufferLength = 0),
        (this._bytesHashed = 0),
        (this._finished = !1),
        this.reset();
    }
    return (
      (v.prototype._initState = function () {
        (this._stateHi[0] = 1779033703),
          (this._stateHi[1] = 3144134277),
          (this._stateHi[2] = 1013904242),
          (this._stateHi[3] = 2773480762),
          (this._stateHi[4] = 1359893119),
          (this._stateHi[5] = 2600822924),
          (this._stateHi[6] = 528734635),
          (this._stateHi[7] = 1541459225),
          (this._stateLo[0] = 4089235720),
          (this._stateLo[1] = 2227873595),
          (this._stateLo[2] = 4271175723),
          (this._stateLo[3] = 1595750129),
          (this._stateLo[4] = 2917565137),
          (this._stateLo[5] = 725511199),
          (this._stateLo[6] = 4215389547),
          (this._stateLo[7] = 327033209);
      }),
      (v.prototype.reset = function () {
        return (
          this._initState(),
          (this._bufferLength = 0),
          (this._bytesHashed = 0),
          (this._finished = !1),
          this
        );
      }),
      (v.prototype.clean = function () {
        r.wipe(this._buffer),
          r.wipe(this._tempHi),
          r.wipe(this._tempLo),
          this.reset();
      }),
      (v.prototype.update = function (w, y) {
        if ((y === void 0 && (y = w.length), this._finished))
          throw new Error("SHA512: can't update because hash was finished.");
        var E = 0;
        if (((this._bytesHashed += y), this._bufferLength > 0)) {
          for (; this._bufferLength < c.BLOCK_SIZE && y > 0; )
            (this._buffer[this._bufferLength++] = w[E++]), y--;
          this._bufferLength === this.blockSize &&
            (l(
              this._tempHi,
              this._tempLo,
              this._stateHi,
              this._stateLo,
              this._buffer,
              0,
              this.blockSize
            ),
            (this._bufferLength = 0));
        }
        for (
          y >= this.blockSize &&
          ((E = l(
            this._tempHi,
            this._tempLo,
            this._stateHi,
            this._stateLo,
            w,
            E,
            y
          )),
          (y %= this.blockSize));
          y > 0;

        )
          (this._buffer[this._bufferLength++] = w[E++]), y--;
        return this;
      }),
      (v.prototype.finish = function (w) {
        if (!this._finished) {
          var y = this._bytesHashed,
            E = this._bufferLength,
            C = (y / 536870912) | 0,
            A = y << 3,
            j = y % 128 < 112 ? 128 : 256;
          this._buffer[E] = 128;
          for (var F = E + 1; F < j - 8; F++) this._buffer[F] = 0;
          i.writeUint32BE(C, this._buffer, j - 8),
            i.writeUint32BE(A, this._buffer, j - 4),
            l(
              this._tempHi,
              this._tempLo,
              this._stateHi,
              this._stateLo,
              this._buffer,
              0,
              j
            ),
            (this._finished = !0);
        }
        for (var F = 0; F < this.digestLength / 8; F++)
          i.writeUint32BE(this._stateHi[F], w, F * 8),
            i.writeUint32BE(this._stateLo[F], w, F * 8 + 4);
        return this;
      }),
      (v.prototype.digest = function () {
        var w = new Uint8Array(this.digestLength);
        return this.finish(w), w;
      }),
      (v.prototype.saveState = function () {
        if (this._finished)
          throw new Error('SHA256: cannot save finished state');
        return {
          stateHi: new Int32Array(this._stateHi),
          stateLo: new Int32Array(this._stateLo),
          buffer:
            this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
          bufferLength: this._bufferLength,
          bytesHashed: this._bytesHashed,
        };
      }),
      (v.prototype.restoreState = function (w) {
        return (
          this._stateHi.set(w.stateHi),
          this._stateLo.set(w.stateLo),
          (this._bufferLength = w.bufferLength),
          w.buffer && this._buffer.set(w.buffer),
          (this._bytesHashed = w.bytesHashed),
          (this._finished = !1),
          this
        );
      }),
      (v.prototype.cleanSavedState = function (w) {
        r.wipe(w.stateHi),
          r.wipe(w.stateLo),
          w.buffer && r.wipe(w.buffer),
          (w.bufferLength = 0),
          (w.bytesHashed = 0);
      }),
      v
    );
  })();
  c.SHA512 = n;
  var a = new Int32Array([
    1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399,
    3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265,
    2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394,
    310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994,
    1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317,
    3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139,
    264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901,
    1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837,
    2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879,
    3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901,
    113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964,
    773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823,
    1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142,
    2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273,
    3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344,
    3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720,
    430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593,
    883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403,
    1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012,
    2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044,
    2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573,
    3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711,
    3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554,
    174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315,
    685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100,
    1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866,
    1607167915, 987167468, 1816402316, 1246189591,
  ]);
  function l(v, w, y, E, C, A, j) {
    for (
      var F = y[0],
        K = y[1],
        re = y[2],
        ce = y[3],
        ue = y[4],
        he = y[5],
        fe = y[6],
        pe = y[7],
        $ = E[0],
        H = E[1],
        W = E[2],
        ve = E[3],
        te = E[4],
        Ee = E[5],
        Ae = E[6],
        et = E[7],
        R,
        M,
        je,
        Re,
        J,
        B,
        k,
        V;
      j >= 128;

    ) {
      for (var ut = 0; ut < 16; ut++) {
        var He = 8 * ut + A;
        (v[ut] = i.readUint32BE(C, He)), (w[ut] = i.readUint32BE(C, He + 4));
      }
      for (var ut = 0; ut < 80; ut++) {
        var Dr = F,
          _e = K,
          It = re,
          N = ce,
          T = ue,
          S = he,
          u = fe,
          b = pe,
          Z = $,
          oe = H,
          me = W,
          Te = ve,
          $e = te,
          xe = Ee,
          xt = Ae,
          mt = et;
        if (
          ((R = pe),
          (M = et),
          (J = M & 65535),
          (B = M >>> 16),
          (k = R & 65535),
          (V = R >>> 16),
          (R =
            ((ue >>> 14) | (te << (32 - 14))) ^
            ((ue >>> 18) | (te << (32 - 18))) ^
            ((te >>> (41 - 32)) | (ue << (32 - (41 - 32))))),
          (M =
            ((te >>> 14) | (ue << (32 - 14))) ^
            ((te >>> 18) | (ue << (32 - 18))) ^
            ((ue >>> (41 - 32)) | (te << (32 - (41 - 32))))),
          (J += M & 65535),
          (B += M >>> 16),
          (k += R & 65535),
          (V += R >>> 16),
          (R = (ue & he) ^ (~ue & fe)),
          (M = (te & Ee) ^ (~te & Ae)),
          (J += M & 65535),
          (B += M >>> 16),
          (k += R & 65535),
          (V += R >>> 16),
          (R = a[ut * 2]),
          (M = a[ut * 2 + 1]),
          (J += M & 65535),
          (B += M >>> 16),
          (k += R & 65535),
          (V += R >>> 16),
          (R = v[ut % 16]),
          (M = w[ut % 16]),
          (J += M & 65535),
          (B += M >>> 16),
          (k += R & 65535),
          (V += R >>> 16),
          (B += J >>> 16),
          (k += B >>> 16),
          (V += k >>> 16),
          (je = (k & 65535) | (V << 16)),
          (Re = (J & 65535) | (B << 16)),
          (R = je),
          (M = Re),
          (J = M & 65535),
          (B = M >>> 16),
          (k = R & 65535),
          (V = R >>> 16),
          (R =
            ((F >>> 28) | ($ << (32 - 28))) ^
            (($ >>> (34 - 32)) | (F << (32 - (34 - 32)))) ^
            (($ >>> (39 - 32)) | (F << (32 - (39 - 32))))),
          (M =
            (($ >>> 28) | (F << (32 - 28))) ^
            ((F >>> (34 - 32)) | ($ << (32 - (34 - 32)))) ^
            ((F >>> (39 - 32)) | ($ << (32 - (39 - 32))))),
          (J += M & 65535),
          (B += M >>> 16),
          (k += R & 65535),
          (V += R >>> 16),
          (R = (F & K) ^ (F & re) ^ (K & re)),
          (M = ($ & H) ^ ($ & W) ^ (H & W)),
          (J += M & 65535),
          (B += M >>> 16),
          (k += R & 65535),
          (V += R >>> 16),
          (B += J >>> 16),
          (k += B >>> 16),
          (V += k >>> 16),
          (b = (k & 65535) | (V << 16)),
          (mt = (J & 65535) | (B << 16)),
          (R = N),
          (M = Te),
          (J = M & 65535),
          (B = M >>> 16),
          (k = R & 65535),
          (V = R >>> 16),
          (R = je),
          (M = Re),
          (J += M & 65535),
          (B += M >>> 16),
          (k += R & 65535),
          (V += R >>> 16),
          (B += J >>> 16),
          (k += B >>> 16),
          (V += k >>> 16),
          (N = (k & 65535) | (V << 16)),
          (Te = (J & 65535) | (B << 16)),
          (K = Dr),
          (re = _e),
          (ce = It),
          (ue = N),
          (he = T),
          (fe = S),
          (pe = u),
          (F = b),
          (H = Z),
          (W = oe),
          (ve = me),
          (te = Te),
          (Ee = $e),
          (Ae = xe),
          (et = xt),
          ($ = mt),
          ut % 16 === 15)
        )
          for (var He = 0; He < 16; He++)
            (R = v[He]),
              (M = w[He]),
              (J = M & 65535),
              (B = M >>> 16),
              (k = R & 65535),
              (V = R >>> 16),
              (R = v[(He + 9) % 16]),
              (M = w[(He + 9) % 16]),
              (J += M & 65535),
              (B += M >>> 16),
              (k += R & 65535),
              (V += R >>> 16),
              (je = v[(He + 1) % 16]),
              (Re = w[(He + 1) % 16]),
              (R =
                ((je >>> 1) | (Re << (32 - 1))) ^
                ((je >>> 8) | (Re << (32 - 8))) ^
                (je >>> 7)),
              (M =
                ((Re >>> 1) | (je << (32 - 1))) ^
                ((Re >>> 8) | (je << (32 - 8))) ^
                ((Re >>> 7) | (je << (32 - 7)))),
              (J += M & 65535),
              (B += M >>> 16),
              (k += R & 65535),
              (V += R >>> 16),
              (je = v[(He + 14) % 16]),
              (Re = w[(He + 14) % 16]),
              (R =
                ((je >>> 19) | (Re << (32 - 19))) ^
                ((Re >>> (61 - 32)) | (je << (32 - (61 - 32)))) ^
                (je >>> 6)),
              (M =
                ((Re >>> 19) | (je << (32 - 19))) ^
                ((je >>> (61 - 32)) | (Re << (32 - (61 - 32)))) ^
                ((Re >>> 6) | (je << (32 - 6)))),
              (J += M & 65535),
              (B += M >>> 16),
              (k += R & 65535),
              (V += R >>> 16),
              (B += J >>> 16),
              (k += B >>> 16),
              (V += k >>> 16),
              (v[He] = (k & 65535) | (V << 16)),
              (w[He] = (J & 65535) | (B << 16));
      }
      (R = F),
        (M = $),
        (J = M & 65535),
        (B = M >>> 16),
        (k = R & 65535),
        (V = R >>> 16),
        (R = y[0]),
        (M = E[0]),
        (J += M & 65535),
        (B += M >>> 16),
        (k += R & 65535),
        (V += R >>> 16),
        (B += J >>> 16),
        (k += B >>> 16),
        (V += k >>> 16),
        (y[0] = F = (k & 65535) | (V << 16)),
        (E[0] = $ = (J & 65535) | (B << 16)),
        (R = K),
        (M = H),
        (J = M & 65535),
        (B = M >>> 16),
        (k = R & 65535),
        (V = R >>> 16),
        (R = y[1]),
        (M = E[1]),
        (J += M & 65535),
        (B += M >>> 16),
        (k += R & 65535),
        (V += R >>> 16),
        (B += J >>> 16),
        (k += B >>> 16),
        (V += k >>> 16),
        (y[1] = K = (k & 65535) | (V << 16)),
        (E[1] = H = (J & 65535) | (B << 16)),
        (R = re),
        (M = W),
        (J = M & 65535),
        (B = M >>> 16),
        (k = R & 65535),
        (V = R >>> 16),
        (R = y[2]),
        (M = E[2]),
        (J += M & 65535),
        (B += M >>> 16),
        (k += R & 65535),
        (V += R >>> 16),
        (B += J >>> 16),
        (k += B >>> 16),
        (V += k >>> 16),
        (y[2] = re = (k & 65535) | (V << 16)),
        (E[2] = W = (J & 65535) | (B << 16)),
        (R = ce),
        (M = ve),
        (J = M & 65535),
        (B = M >>> 16),
        (k = R & 65535),
        (V = R >>> 16),
        (R = y[3]),
        (M = E[3]),
        (J += M & 65535),
        (B += M >>> 16),
        (k += R & 65535),
        (V += R >>> 16),
        (B += J >>> 16),
        (k += B >>> 16),
        (V += k >>> 16),
        (y[3] = ce = (k & 65535) | (V << 16)),
        (E[3] = ve = (J & 65535) | (B << 16)),
        (R = ue),
        (M = te),
        (J = M & 65535),
        (B = M >>> 16),
        (k = R & 65535),
        (V = R >>> 16),
        (R = y[4]),
        (M = E[4]),
        (J += M & 65535),
        (B += M >>> 16),
        (k += R & 65535),
        (V += R >>> 16),
        (B += J >>> 16),
        (k += B >>> 16),
        (V += k >>> 16),
        (y[4] = ue = (k & 65535) | (V << 16)),
        (E[4] = te = (J & 65535) | (B << 16)),
        (R = he),
        (M = Ee),
        (J = M & 65535),
        (B = M >>> 16),
        (k = R & 65535),
        (V = R >>> 16),
        (R = y[5]),
        (M = E[5]),
        (J += M & 65535),
        (B += M >>> 16),
        (k += R & 65535),
        (V += R >>> 16),
        (B += J >>> 16),
        (k += B >>> 16),
        (V += k >>> 16),
        (y[5] = he = (k & 65535) | (V << 16)),
        (E[5] = Ee = (J & 65535) | (B << 16)),
        (R = fe),
        (M = Ae),
        (J = M & 65535),
        (B = M >>> 16),
        (k = R & 65535),
        (V = R >>> 16),
        (R = y[6]),
        (M = E[6]),
        (J += M & 65535),
        (B += M >>> 16),
        (k += R & 65535),
        (V += R >>> 16),
        (B += J >>> 16),
        (k += B >>> 16),
        (V += k >>> 16),
        (y[6] = fe = (k & 65535) | (V << 16)),
        (E[6] = Ae = (J & 65535) | (B << 16)),
        (R = pe),
        (M = et),
        (J = M & 65535),
        (B = M >>> 16),
        (k = R & 65535),
        (V = R >>> 16),
        (R = y[7]),
        (M = E[7]),
        (J += M & 65535),
        (B += M >>> 16),
        (k += R & 65535),
        (V += R >>> 16),
        (B += J >>> 16),
        (k += B >>> 16),
        (V += k >>> 16),
        (y[7] = pe = (k & 65535) | (V << 16)),
        (E[7] = et = (J & 65535) | (B << 16)),
        (A += 128),
        (j -= 128);
    }
    return A;
  }
  function d(v) {
    var w = new n();
    w.update(v);
    var y = w.digest();
    return w.clean(), y;
  }
  c.hash = d;
})(Kl);
(function (c) {
  Object.defineProperty(c, '__esModule', { value: !0 }),
    (c.convertSecretKeyToX25519 =
      c.convertPublicKeyToX25519 =
      c.verify =
      c.sign =
      c.extractPublicKeyFromSecretKey =
      c.generateKeyPair =
      c.generateKeyPairFromSeed =
      c.SEED_LENGTH =
      c.SECRET_KEY_LENGTH =
      c.PUBLIC_KEY_LENGTH =
      c.SIGNATURE_LENGTH =
        void 0);
  const i = Rl,
    r = Kl,
    n = Al;
  (c.SIGNATURE_LENGTH = 64),
    (c.PUBLIC_KEY_LENGTH = 32),
    (c.SECRET_KEY_LENGTH = 64),
    (c.SEED_LENGTH = 32);
  function a(N) {
    const T = new Float64Array(16);
    if (N) for (let S = 0; S < N.length; S++) T[S] = N[S];
    return T;
  }
  const l = new Uint8Array(32);
  l[0] = 9;
  const d = a(),
    v = a([1]),
    w = a([
      30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505,
      36039, 65139, 11119, 27886, 20995,
    ]),
    y = a([
      61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010,
      6542, 64743, 22239, 55772, 9222,
    ]),
    E = a([
      54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982,
      57905, 49316, 21502, 52590, 14035, 8553,
    ]),
    C = a([
      26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214,
      26214, 26214, 26214, 26214, 26214, 26214,
    ]),
    A = a([
      41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153,
      11085, 57099, 20417, 9344, 11139,
    ]);
  function j(N, T) {
    for (let S = 0; S < 16; S++) N[S] = T[S] | 0;
  }
  function F(N) {
    let T = 1;
    for (let S = 0; S < 16; S++) {
      let u = N[S] + T + 65535;
      (T = Math.floor(u / 65536)), (N[S] = u - T * 65536);
    }
    N[0] += T - 1 + 37 * (T - 1);
  }
  function K(N, T, S) {
    const u = ~(S - 1);
    for (let b = 0; b < 16; b++) {
      const Z = u & (N[b] ^ T[b]);
      (N[b] ^= Z), (T[b] ^= Z);
    }
  }
  function re(N, T) {
    const S = a(),
      u = a();
    for (let b = 0; b < 16; b++) u[b] = T[b];
    F(u), F(u), F(u);
    for (let b = 0; b < 2; b++) {
      S[0] = u[0] - 65517;
      for (let oe = 1; oe < 15; oe++)
        (S[oe] = u[oe] - 65535 - ((S[oe - 1] >> 16) & 1)), (S[oe - 1] &= 65535);
      S[15] = u[15] - 32767 - ((S[14] >> 16) & 1);
      const Z = (S[15] >> 16) & 1;
      (S[14] &= 65535), K(u, S, 1 - Z);
    }
    for (let b = 0; b < 16; b++)
      (N[2 * b] = u[b] & 255), (N[2 * b + 1] = u[b] >> 8);
  }
  function ce(N, T) {
    let S = 0;
    for (let u = 0; u < 32; u++) S |= N[u] ^ T[u];
    return (1 & ((S - 1) >>> 8)) - 1;
  }
  function ue(N, T) {
    const S = new Uint8Array(32),
      u = new Uint8Array(32);
    return re(S, N), re(u, T), ce(S, u);
  }
  function he(N) {
    const T = new Uint8Array(32);
    return re(T, N), T[0] & 1;
  }
  function fe(N, T) {
    for (let S = 0; S < 16; S++) N[S] = T[2 * S] + (T[2 * S + 1] << 8);
    N[15] &= 32767;
  }
  function pe(N, T, S) {
    for (let u = 0; u < 16; u++) N[u] = T[u] + S[u];
  }
  function $(N, T, S) {
    for (let u = 0; u < 16; u++) N[u] = T[u] - S[u];
  }
  function H(N, T, S) {
    let u,
      b,
      Z = 0,
      oe = 0,
      me = 0,
      Te = 0,
      $e = 0,
      xe = 0,
      xt = 0,
      mt = 0,
      nt = 0,
      De = 0,
      Je = 0,
      Qe = 0,
      at = 0,
      ze = 0,
      Ye = 0,
      Ne = 0,
      ke = 0,
      ht = 0,
      qe = 0,
      Pt = 0,
      Ft = 0,
      Ut = 0,
      Ht = 0,
      qt = 0,
      Jt = 0,
      rr = 0,
      Lr = 0,
      Qt = 0,
      Kr = 0,
      oi = 0,
      xi = 0,
      lt = S[0],
      tt = S[1],
      ft = S[2],
      pt = S[3],
      ot = S[4],
      rt = S[5],
      St = S[6],
      Ct = S[7],
      dt = S[8],
      Ot = S[9],
      gt = S[10],
      wt = S[11],
      vt = S[12],
      We = S[13],
      At = S[14],
      Rt = S[15];
    (u = T[0]),
      (Z += u * lt),
      (oe += u * tt),
      (me += u * ft),
      (Te += u * pt),
      ($e += u * ot),
      (xe += u * rt),
      (xt += u * St),
      (mt += u * Ct),
      (nt += u * dt),
      (De += u * Ot),
      (Je += u * gt),
      (Qe += u * wt),
      (at += u * vt),
      (ze += u * We),
      (Ye += u * At),
      (Ne += u * Rt),
      (u = T[1]),
      (oe += u * lt),
      (me += u * tt),
      (Te += u * ft),
      ($e += u * pt),
      (xe += u * ot),
      (xt += u * rt),
      (mt += u * St),
      (nt += u * Ct),
      (De += u * dt),
      (Je += u * Ot),
      (Qe += u * gt),
      (at += u * wt),
      (ze += u * vt),
      (Ye += u * We),
      (Ne += u * At),
      (ke += u * Rt),
      (u = T[2]),
      (me += u * lt),
      (Te += u * tt),
      ($e += u * ft),
      (xe += u * pt),
      (xt += u * ot),
      (mt += u * rt),
      (nt += u * St),
      (De += u * Ct),
      (Je += u * dt),
      (Qe += u * Ot),
      (at += u * gt),
      (ze += u * wt),
      (Ye += u * vt),
      (Ne += u * We),
      (ke += u * At),
      (ht += u * Rt),
      (u = T[3]),
      (Te += u * lt),
      ($e += u * tt),
      (xe += u * ft),
      (xt += u * pt),
      (mt += u * ot),
      (nt += u * rt),
      (De += u * St),
      (Je += u * Ct),
      (Qe += u * dt),
      (at += u * Ot),
      (ze += u * gt),
      (Ye += u * wt),
      (Ne += u * vt),
      (ke += u * We),
      (ht += u * At),
      (qe += u * Rt),
      (u = T[4]),
      ($e += u * lt),
      (xe += u * tt),
      (xt += u * ft),
      (mt += u * pt),
      (nt += u * ot),
      (De += u * rt),
      (Je += u * St),
      (Qe += u * Ct),
      (at += u * dt),
      (ze += u * Ot),
      (Ye += u * gt),
      (Ne += u * wt),
      (ke += u * vt),
      (ht += u * We),
      (qe += u * At),
      (Pt += u * Rt),
      (u = T[5]),
      (xe += u * lt),
      (xt += u * tt),
      (mt += u * ft),
      (nt += u * pt),
      (De += u * ot),
      (Je += u * rt),
      (Qe += u * St),
      (at += u * Ct),
      (ze += u * dt),
      (Ye += u * Ot),
      (Ne += u * gt),
      (ke += u * wt),
      (ht += u * vt),
      (qe += u * We),
      (Pt += u * At),
      (Ft += u * Rt),
      (u = T[6]),
      (xt += u * lt),
      (mt += u * tt),
      (nt += u * ft),
      (De += u * pt),
      (Je += u * ot),
      (Qe += u * rt),
      (at += u * St),
      (ze += u * Ct),
      (Ye += u * dt),
      (Ne += u * Ot),
      (ke += u * gt),
      (ht += u * wt),
      (qe += u * vt),
      (Pt += u * We),
      (Ft += u * At),
      (Ut += u * Rt),
      (u = T[7]),
      (mt += u * lt),
      (nt += u * tt),
      (De += u * ft),
      (Je += u * pt),
      (Qe += u * ot),
      (at += u * rt),
      (ze += u * St),
      (Ye += u * Ct),
      (Ne += u * dt),
      (ke += u * Ot),
      (ht += u * gt),
      (qe += u * wt),
      (Pt += u * vt),
      (Ft += u * We),
      (Ut += u * At),
      (Ht += u * Rt),
      (u = T[8]),
      (nt += u * lt),
      (De += u * tt),
      (Je += u * ft),
      (Qe += u * pt),
      (at += u * ot),
      (ze += u * rt),
      (Ye += u * St),
      (Ne += u * Ct),
      (ke += u * dt),
      (ht += u * Ot),
      (qe += u * gt),
      (Pt += u * wt),
      (Ft += u * vt),
      (Ut += u * We),
      (Ht += u * At),
      (qt += u * Rt),
      (u = T[9]),
      (De += u * lt),
      (Je += u * tt),
      (Qe += u * ft),
      (at += u * pt),
      (ze += u * ot),
      (Ye += u * rt),
      (Ne += u * St),
      (ke += u * Ct),
      (ht += u * dt),
      (qe += u * Ot),
      (Pt += u * gt),
      (Ft += u * wt),
      (Ut += u * vt),
      (Ht += u * We),
      (qt += u * At),
      (Jt += u * Rt),
      (u = T[10]),
      (Je += u * lt),
      (Qe += u * tt),
      (at += u * ft),
      (ze += u * pt),
      (Ye += u * ot),
      (Ne += u * rt),
      (ke += u * St),
      (ht += u * Ct),
      (qe += u * dt),
      (Pt += u * Ot),
      (Ft += u * gt),
      (Ut += u * wt),
      (Ht += u * vt),
      (qt += u * We),
      (Jt += u * At),
      (rr += u * Rt),
      (u = T[11]),
      (Qe += u * lt),
      (at += u * tt),
      (ze += u * ft),
      (Ye += u * pt),
      (Ne += u * ot),
      (ke += u * rt),
      (ht += u * St),
      (qe += u * Ct),
      (Pt += u * dt),
      (Ft += u * Ot),
      (Ut += u * gt),
      (Ht += u * wt),
      (qt += u * vt),
      (Jt += u * We),
      (rr += u * At),
      (Lr += u * Rt),
      (u = T[12]),
      (at += u * lt),
      (ze += u * tt),
      (Ye += u * ft),
      (Ne += u * pt),
      (ke += u * ot),
      (ht += u * rt),
      (qe += u * St),
      (Pt += u * Ct),
      (Ft += u * dt),
      (Ut += u * Ot),
      (Ht += u * gt),
      (qt += u * wt),
      (Jt += u * vt),
      (rr += u * We),
      (Lr += u * At),
      (Qt += u * Rt),
      (u = T[13]),
      (ze += u * lt),
      (Ye += u * tt),
      (Ne += u * ft),
      (ke += u * pt),
      (ht += u * ot),
      (qe += u * rt),
      (Pt += u * St),
      (Ft += u * Ct),
      (Ut += u * dt),
      (Ht += u * Ot),
      (qt += u * gt),
      (Jt += u * wt),
      (rr += u * vt),
      (Lr += u * We),
      (Qt += u * At),
      (Kr += u * Rt),
      (u = T[14]),
      (Ye += u * lt),
      (Ne += u * tt),
      (ke += u * ft),
      (ht += u * pt),
      (qe += u * ot),
      (Pt += u * rt),
      (Ft += u * St),
      (Ut += u * Ct),
      (Ht += u * dt),
      (qt += u * Ot),
      (Jt += u * gt),
      (rr += u * wt),
      (Lr += u * vt),
      (Qt += u * We),
      (Kr += u * At),
      (oi += u * Rt),
      (u = T[15]),
      (Ne += u * lt),
      (ke += u * tt),
      (ht += u * ft),
      (qe += u * pt),
      (Pt += u * ot),
      (Ft += u * rt),
      (Ut += u * St),
      (Ht += u * Ct),
      (qt += u * dt),
      (Jt += u * Ot),
      (rr += u * gt),
      (Lr += u * wt),
      (Qt += u * vt),
      (Kr += u * We),
      (oi += u * At),
      (xi += u * Rt),
      (Z += 38 * ke),
      (oe += 38 * ht),
      (me += 38 * qe),
      (Te += 38 * Pt),
      ($e += 38 * Ft),
      (xe += 38 * Ut),
      (xt += 38 * Ht),
      (mt += 38 * qt),
      (nt += 38 * Jt),
      (De += 38 * rr),
      (Je += 38 * Lr),
      (Qe += 38 * Qt),
      (at += 38 * Kr),
      (ze += 38 * oi),
      (Ye += 38 * xi),
      (b = 1),
      (u = Z + b + 65535),
      (b = Math.floor(u / 65536)),
      (Z = u - b * 65536),
      (u = oe + b + 65535),
      (b = Math.floor(u / 65536)),
      (oe = u - b * 65536),
      (u = me + b + 65535),
      (b = Math.floor(u / 65536)),
      (me = u - b * 65536),
      (u = Te + b + 65535),
      (b = Math.floor(u / 65536)),
      (Te = u - b * 65536),
      (u = $e + b + 65535),
      (b = Math.floor(u / 65536)),
      ($e = u - b * 65536),
      (u = xe + b + 65535),
      (b = Math.floor(u / 65536)),
      (xe = u - b * 65536),
      (u = xt + b + 65535),
      (b = Math.floor(u / 65536)),
      (xt = u - b * 65536),
      (u = mt + b + 65535),
      (b = Math.floor(u / 65536)),
      (mt = u - b * 65536),
      (u = nt + b + 65535),
      (b = Math.floor(u / 65536)),
      (nt = u - b * 65536),
      (u = De + b + 65535),
      (b = Math.floor(u / 65536)),
      (De = u - b * 65536),
      (u = Je + b + 65535),
      (b = Math.floor(u / 65536)),
      (Je = u - b * 65536),
      (u = Qe + b + 65535),
      (b = Math.floor(u / 65536)),
      (Qe = u - b * 65536),
      (u = at + b + 65535),
      (b = Math.floor(u / 65536)),
      (at = u - b * 65536),
      (u = ze + b + 65535),
      (b = Math.floor(u / 65536)),
      (ze = u - b * 65536),
      (u = Ye + b + 65535),
      (b = Math.floor(u / 65536)),
      (Ye = u - b * 65536),
      (u = Ne + b + 65535),
      (b = Math.floor(u / 65536)),
      (Ne = u - b * 65536),
      (Z += b - 1 + 37 * (b - 1)),
      (b = 1),
      (u = Z + b + 65535),
      (b = Math.floor(u / 65536)),
      (Z = u - b * 65536),
      (u = oe + b + 65535),
      (b = Math.floor(u / 65536)),
      (oe = u - b * 65536),
      (u = me + b + 65535),
      (b = Math.floor(u / 65536)),
      (me = u - b * 65536),
      (u = Te + b + 65535),
      (b = Math.floor(u / 65536)),
      (Te = u - b * 65536),
      (u = $e + b + 65535),
      (b = Math.floor(u / 65536)),
      ($e = u - b * 65536),
      (u = xe + b + 65535),
      (b = Math.floor(u / 65536)),
      (xe = u - b * 65536),
      (u = xt + b + 65535),
      (b = Math.floor(u / 65536)),
      (xt = u - b * 65536),
      (u = mt + b + 65535),
      (b = Math.floor(u / 65536)),
      (mt = u - b * 65536),
      (u = nt + b + 65535),
      (b = Math.floor(u / 65536)),
      (nt = u - b * 65536),
      (u = De + b + 65535),
      (b = Math.floor(u / 65536)),
      (De = u - b * 65536),
      (u = Je + b + 65535),
      (b = Math.floor(u / 65536)),
      (Je = u - b * 65536),
      (u = Qe + b + 65535),
      (b = Math.floor(u / 65536)),
      (Qe = u - b * 65536),
      (u = at + b + 65535),
      (b = Math.floor(u / 65536)),
      (at = u - b * 65536),
      (u = ze + b + 65535),
      (b = Math.floor(u / 65536)),
      (ze = u - b * 65536),
      (u = Ye + b + 65535),
      (b = Math.floor(u / 65536)),
      (Ye = u - b * 65536),
      (u = Ne + b + 65535),
      (b = Math.floor(u / 65536)),
      (Ne = u - b * 65536),
      (Z += b - 1 + 37 * (b - 1)),
      (N[0] = Z),
      (N[1] = oe),
      (N[2] = me),
      (N[3] = Te),
      (N[4] = $e),
      (N[5] = xe),
      (N[6] = xt),
      (N[7] = mt),
      (N[8] = nt),
      (N[9] = De),
      (N[10] = Je),
      (N[11] = Qe),
      (N[12] = at),
      (N[13] = ze),
      (N[14] = Ye),
      (N[15] = Ne);
  }
  function W(N, T) {
    H(N, T, T);
  }
  function ve(N, T) {
    const S = a();
    let u;
    for (u = 0; u < 16; u++) S[u] = T[u];
    for (u = 253; u >= 0; u--) W(S, S), u !== 2 && u !== 4 && H(S, S, T);
    for (u = 0; u < 16; u++) N[u] = S[u];
  }
  function te(N, T) {
    const S = a();
    let u;
    for (u = 0; u < 16; u++) S[u] = T[u];
    for (u = 250; u >= 0; u--) W(S, S), u !== 1 && H(S, S, T);
    for (u = 0; u < 16; u++) N[u] = S[u];
  }
  function Ee(N, T) {
    const S = a(),
      u = a(),
      b = a(),
      Z = a(),
      oe = a(),
      me = a(),
      Te = a(),
      $e = a(),
      xe = a();
    $(S, N[1], N[0]),
      $(xe, T[1], T[0]),
      H(S, S, xe),
      pe(u, N[0], N[1]),
      pe(xe, T[0], T[1]),
      H(u, u, xe),
      H(b, N[3], T[3]),
      H(b, b, y),
      H(Z, N[2], T[2]),
      pe(Z, Z, Z),
      $(oe, u, S),
      $(me, Z, b),
      pe(Te, Z, b),
      pe($e, u, S),
      H(N[0], oe, me),
      H(N[1], $e, Te),
      H(N[2], Te, me),
      H(N[3], oe, $e);
  }
  function Ae(N, T, S) {
    for (let u = 0; u < 4; u++) K(N[u], T[u], S);
  }
  function et(N, T) {
    const S = a(),
      u = a(),
      b = a();
    ve(b, T[2]), H(S, T[0], b), H(u, T[1], b), re(N, u), (N[31] ^= he(S) << 7);
  }
  function R(N, T, S) {
    j(N[0], d), j(N[1], v), j(N[2], v), j(N[3], d);
    for (let u = 255; u >= 0; --u) {
      const b = (S[(u / 8) | 0] >> (u & 7)) & 1;
      Ae(N, T, b), Ee(T, N), Ee(N, N), Ae(N, T, b);
    }
  }
  function M(N, T) {
    const S = [a(), a(), a(), a()];
    j(S[0], E), j(S[1], C), j(S[2], v), H(S[3], E, C), R(N, S, T);
  }
  function je(N) {
    if (N.length !== c.SEED_LENGTH)
      throw new Error(`ed25519: seed must be ${c.SEED_LENGTH} bytes`);
    const T = (0, r.hash)(N);
    (T[0] &= 248), (T[31] &= 127), (T[31] |= 64);
    const S = new Uint8Array(32),
      u = [a(), a(), a(), a()];
    M(u, T), et(S, u);
    const b = new Uint8Array(64);
    return b.set(N), b.set(S, 32), { publicKey: S, secretKey: b };
  }
  c.generateKeyPairFromSeed = je;
  function Re(N) {
    const T = (0, i.randomBytes)(32, N),
      S = je(T);
    return (0, n.wipe)(T), S;
  }
  c.generateKeyPair = Re;
  function J(N) {
    if (N.length !== c.SECRET_KEY_LENGTH)
      throw new Error(
        `ed25519: secret key must be ${c.SECRET_KEY_LENGTH} bytes`
      );
    return new Uint8Array(N.subarray(32));
  }
  c.extractPublicKeyFromSecretKey = J;
  const B = new Float64Array([
    237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16,
  ]);
  function k(N, T) {
    let S, u, b, Z;
    for (u = 63; u >= 32; --u) {
      for (S = 0, b = u - 32, Z = u - 12; b < Z; ++b)
        (T[b] += S - 16 * T[u] * B[b - (u - 32)]),
          (S = Math.floor((T[b] + 128) / 256)),
          (T[b] -= S * 256);
      (T[b] += S), (T[u] = 0);
    }
    for (S = 0, b = 0; b < 32; b++)
      (T[b] += S - (T[31] >> 4) * B[b]), (S = T[b] >> 8), (T[b] &= 255);
    for (b = 0; b < 32; b++) T[b] -= S * B[b];
    for (u = 0; u < 32; u++) (T[u + 1] += T[u] >> 8), (N[u] = T[u] & 255);
  }
  function V(N) {
    const T = new Float64Array(64);
    for (let S = 0; S < 64; S++) T[S] = N[S];
    for (let S = 0; S < 64; S++) N[S] = 0;
    k(N, T);
  }
  function ut(N, T) {
    const S = new Float64Array(64),
      u = [a(), a(), a(), a()],
      b = (0, r.hash)(N.subarray(0, 32));
    (b[0] &= 248), (b[31] &= 127), (b[31] |= 64);
    const Z = new Uint8Array(64);
    Z.set(b.subarray(32), 32);
    const oe = new r.SHA512();
    oe.update(Z.subarray(32)), oe.update(T);
    const me = oe.digest();
    oe.clean(),
      V(me),
      M(u, me),
      et(Z, u),
      oe.reset(),
      oe.update(Z.subarray(0, 32)),
      oe.update(N.subarray(32)),
      oe.update(T);
    const Te = oe.digest();
    V(Te);
    for (let $e = 0; $e < 32; $e++) S[$e] = me[$e];
    for (let $e = 0; $e < 32; $e++)
      for (let xe = 0; xe < 32; xe++) S[$e + xe] += Te[$e] * b[xe];
    return k(Z.subarray(32), S), Z;
  }
  c.sign = ut;
  function He(N, T) {
    const S = a(),
      u = a(),
      b = a(),
      Z = a(),
      oe = a(),
      me = a(),
      Te = a();
    return (
      j(N[2], v),
      fe(N[1], T),
      W(b, N[1]),
      H(Z, b, w),
      $(b, b, N[2]),
      pe(Z, N[2], Z),
      W(oe, Z),
      W(me, oe),
      H(Te, me, oe),
      H(S, Te, b),
      H(S, S, Z),
      te(S, S),
      H(S, S, b),
      H(S, S, Z),
      H(S, S, Z),
      H(N[0], S, Z),
      W(u, N[0]),
      H(u, u, Z),
      ue(u, b) && H(N[0], N[0], A),
      W(u, N[0]),
      H(u, u, Z),
      ue(u, b)
        ? -1
        : (he(N[0]) === T[31] >> 7 && $(N[0], d, N[0]), H(N[3], N[0], N[1]), 0)
    );
  }
  function Dr(N, T, S) {
    const u = new Uint8Array(32),
      b = [a(), a(), a(), a()],
      Z = [a(), a(), a(), a()];
    if (S.length !== c.SIGNATURE_LENGTH)
      throw new Error(`ed25519: signature must be ${c.SIGNATURE_LENGTH} bytes`);
    if (He(Z, N)) return !1;
    const oe = new r.SHA512();
    oe.update(S.subarray(0, 32)), oe.update(N), oe.update(T);
    const me = oe.digest();
    return (
      V(me), R(b, Z, me), M(Z, S.subarray(32)), Ee(b, Z), et(u, b), !ce(S, u)
    );
  }
  c.verify = Dr;
  function _e(N) {
    let T = [a(), a(), a(), a()];
    if (He(T, N)) throw new Error('Ed25519: invalid public key');
    let S = a(),
      u = a(),
      b = T[1];
    pe(S, v, b), $(u, v, b), ve(u, u), H(S, S, u);
    let Z = new Uint8Array(32);
    return re(Z, S), Z;
  }
  c.convertPublicKeyToX25519 = _e;
  function It(N) {
    const T = (0, r.hash)(N.subarray(0, 32));
    (T[0] &= 248), (T[31] &= 127), (T[31] |= 64);
    const S = new Uint8Array(T.subarray(0, 32));
    return (0, n.wipe)(T), S;
  }
  c.convertSecretKeyToX25519 = It;
})(Ec);
const L1 = 'EdDSA',
  q1 = 'JWT',
  Bl = '.',
  Vl = 'base64url',
  M1 = 'utf8',
  j1 = 'utf8',
  z1 = ':',
  U1 = 'did',
  H1 = 'key',
  Gh = 'base58btc',
  k1 = 'z',
  K1 = 'K36',
  B1 = 32;
function fa(c) {
  return ga(yc(Gs(c), M1), Vl);
}
function Gl(c) {
  const i = yc(K1, Gh),
    r = k1 + ga(J0([i, c]), Gh);
  return [U1, H1, r].join(z1);
}
function V1(c) {
  return ga(c, Vl);
}
function G1(c) {
  return yc([fa(c.header), fa(c.payload)].join(Bl), j1);
}
function W1(c) {
  return [fa(c.header), fa(c.payload), V1(c.signature)].join(Bl);
}
function Wh(c = Rl.randomBytes(B1)) {
  return Ec.generateKeyPairFromSeed(c);
}
async function J1(c, i, r, n, a = ie.fromMiliseconds(Date.now())) {
  const l = { alg: L1, typ: q1 },
    d = Gl(n.publicKey),
    v = a + r,
    w = { iss: d, sub: c, aud: i, iat: a, exp: v },
    y = G1({ header: l, payload: w }),
    E = Ec.sign(n.secretKey, y);
  return W1({ header: l, payload: w, signature: E });
}
const Q1 = () =>
    typeof WebSocket < 'u'
      ? WebSocket
      : typeof global < 'u' && typeof global.WebSocket < 'u'
        ? global.WebSocket
        : typeof window < 'u' && typeof window.WebSocket < 'u'
          ? window.WebSocket
          : typeof self < 'u' && typeof self.WebSocket < 'u'
            ? self.WebSocket
            : require('ws'),
  Y1 = () =>
    typeof WebSocket < 'u' ||
    (typeof global < 'u' && typeof global.WebSocket < 'u') ||
    (typeof window < 'u' && typeof window.WebSocket < 'u') ||
    (typeof self < 'u' && typeof self.WebSocket < 'u'),
  Jh = (c) => c.split('?')[0],
  Qh = 10,
  X1 = Q1();
let Z1 = class {
  constructor(i) {
    if (
      ((this.url = i),
      (this.events = new kr.EventEmitter()),
      (this.registering = !1),
      !$h(i))
    )
      throw new Error(
        `Provided URL is not compatible with WebSocket connection: ${i}`
      );
    this.url = i;
  }
  get connected() {
    return typeof this.socket < 'u';
  }
  get connecting() {
    return this.registering;
  }
  on(i, r) {
    this.events.on(i, r);
  }
  once(i, r) {
    this.events.once(i, r);
  }
  off(i, r) {
    this.events.off(i, r);
  }
  removeListener(i, r) {
    this.events.removeListener(i, r);
  }
  async open(i = this.url) {
    await this.register(i);
  }
  async close() {
    return new Promise((i, r) => {
      if (typeof this.socket > 'u') {
        r(new Error('Connection already closed'));
        return;
      }
      (this.socket.onclose = (n) => {
        this.onClose(n), i();
      }),
        this.socket.close();
    });
  }
  async send(i) {
    typeof this.socket > 'u' && (this.socket = await this.register());
    try {
      this.socket.send(Gs(i));
    } catch (r) {
      this.onError(i.id, r);
    }
  }
  register(i = this.url) {
    if (!$h(i))
      throw new Error(
        `Provided URL is not compatible with WebSocket connection: ${i}`
      );
    if (this.registering) {
      const r = this.events.getMaxListeners();
      return (
        (this.events.listenerCount('register_error') >= r ||
          this.events.listenerCount('open') >= r) &&
          this.events.setMaxListeners(r + 1),
        new Promise((n, a) => {
          this.events.once('register_error', (l) => {
            this.resetMaxListeners(), a(l);
          }),
            this.events.once('open', () => {
              if ((this.resetMaxListeners(), typeof this.socket > 'u'))
                return a(
                  new Error('WebSocket connection is missing or invalid')
                );
              n(this.socket);
            });
        })
      );
    }
    return (
      (this.url = i),
      (this.registering = !0),
      new Promise((r, n) => {
        const a = new URLSearchParams(i).get('origin'),
          l = Dm.isReactNative()
            ? { headers: { origin: a } }
            : { rejectUnauthorized: !Lm(i) },
          d = new X1(i, [], l);
        Y1()
          ? (d.onerror = (v) => {
              const w = v;
              n(this.emitError(w.error));
            })
          : d.on('error', (v) => {
              n(this.emitError(v));
            }),
          (d.onopen = () => {
            this.onOpen(d), r(d);
          });
      })
    );
  }
  onOpen(i) {
    (i.onmessage = (r) => this.onPayload(r)),
      (i.onclose = (r) => this.onClose(r)),
      (this.socket = i),
      (this.registering = !1),
      this.events.emit('open');
  }
  onClose(i) {
    (this.socket = void 0),
      (this.registering = !1),
      this.events.emit('close', i);
  }
  onPayload(i) {
    if (typeof i.data > 'u') return;
    const r = typeof i.data == 'string' ? va(i.data) : i.data;
    this.events.emit('payload', r);
  }
  onError(i, r) {
    const n = this.parseError(r),
      a = n.message || n.toString(),
      l = wc(i, a);
    this.events.emit('payload', l);
  }
  parseError(i, r = this.url) {
    return qm(i, Jh(r), 'WS');
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > Qh && this.events.setMaxListeners(Qh);
  }
  emitError(i) {
    const r = this.parseError(
      new Error(
        (i == null ? void 0 : i.message) ||
          `WebSocket connection failed for host: ${Jh(this.url)}`
      )
    );
    return this.events.emit('register_error', r), r;
  }
};
var pa = { exports: {} };
pa.exports;
(function (c, i) {
  var r = 200,
    n = '__lodash_hash_undefined__',
    a = 1,
    l = 2,
    d = 9007199254740991,
    v = '[object Arguments]',
    w = '[object Array]',
    y = '[object AsyncFunction]',
    E = '[object Boolean]',
    C = '[object Date]',
    A = '[object Error]',
    j = '[object Function]',
    F = '[object GeneratorFunction]',
    K = '[object Map]',
    re = '[object Number]',
    ce = '[object Null]',
    ue = '[object Object]',
    he = '[object Promise]',
    fe = '[object Proxy]',
    pe = '[object RegExp]',
    $ = '[object Set]',
    H = '[object String]',
    W = '[object Symbol]',
    ve = '[object Undefined]',
    te = '[object WeakMap]',
    Ee = '[object ArrayBuffer]',
    Ae = '[object DataView]',
    et = '[object Float32Array]',
    R = '[object Float64Array]',
    M = '[object Int8Array]',
    je = '[object Int16Array]',
    Re = '[object Int32Array]',
    J = '[object Uint8Array]',
    B = '[object Uint8ClampedArray]',
    k = '[object Uint16Array]',
    V = '[object Uint32Array]',
    ut = /[\\^$.*+?()[\]{}|]/g,
    He = /^\[object .+?Constructor\]$/,
    Dr = /^(?:0|[1-9]\d*)$/,
    _e = {};
  (_e[et] =
    _e[R] =
    _e[M] =
    _e[je] =
    _e[Re] =
    _e[J] =
    _e[B] =
    _e[k] =
    _e[V] =
      !0),
    (_e[v] =
      _e[w] =
      _e[Ee] =
      _e[E] =
      _e[Ae] =
      _e[C] =
      _e[A] =
      _e[j] =
      _e[K] =
      _e[re] =
      _e[ue] =
      _e[pe] =
      _e[$] =
      _e[H] =
      _e[te] =
        !1);
  var It = typeof ra == 'object' && ra && ra.Object === Object && ra,
    N = typeof self == 'object' && self && self.Object === Object && self,
    T = It || N || Function('return this')(),
    S = i && !i.nodeType && i,
    u = S && !0 && c && !c.nodeType && c,
    b = u && u.exports === S,
    Z = b && It.process,
    oe = (function () {
      try {
        return Z && Z.binding && Z.binding('util');
      } catch {}
    })(),
    me = oe && oe.isTypedArray;
  function Te(g, I) {
    for (var z = -1, Q = g == null ? 0 : g.length, Be = 0, de = []; ++z < Q; ) {
      var Xe = g[z];
      I(Xe, z, g) && (de[Be++] = Xe);
    }
    return de;
  }
  function $e(g, I) {
    for (var z = -1, Q = I.length, Be = g.length; ++z < Q; ) g[Be + z] = I[z];
    return g;
  }
  function xe(g, I) {
    for (var z = -1, Q = g == null ? 0 : g.length; ++z < Q; )
      if (I(g[z], z, g)) return !0;
    return !1;
  }
  function xt(g, I) {
    for (var z = -1, Q = Array(g); ++z < g; ) Q[z] = I(z);
    return Q;
  }
  function mt(g) {
    return function (I) {
      return g(I);
    };
  }
  function nt(g, I) {
    return g.has(I);
  }
  function De(g, I) {
    return g == null ? void 0 : g[I];
  }
  function Je(g) {
    var I = -1,
      z = Array(g.size);
    return (
      g.forEach(function (Q, Be) {
        z[++I] = [Be, Q];
      }),
      z
    );
  }
  function Qe(g, I) {
    return function (z) {
      return g(I(z));
    };
  }
  function at(g) {
    var I = -1,
      z = Array(g.size);
    return (
      g.forEach(function (Q) {
        z[++I] = Q;
      }),
      z
    );
  }
  var ze = Array.prototype,
    Ye = Function.prototype,
    Ne = Object.prototype,
    ke = T['__core-js_shared__'],
    ht = Ye.toString,
    qe = Ne.hasOwnProperty,
    Pt = (function () {
      var g = /[^.]+$/.exec((ke && ke.keys && ke.keys.IE_PROTO) || '');
      return g ? 'Symbol(src)_1.' + g : '';
    })(),
    Ft = Ne.toString,
    Ut = RegExp(
      '^' +
        ht
          .call(qe)
          .replace(ut, '\\$&')
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            '$1.*?'
          ) +
        '$'
    ),
    Ht = b ? T.Buffer : void 0,
    qt = T.Symbol,
    Jt = T.Uint8Array,
    rr = Ne.propertyIsEnumerable,
    Lr = ze.splice,
    Qt = qt ? qt.toStringTag : void 0,
    Kr = Object.getOwnPropertySymbols,
    oi = Ht ? Ht.isBuffer : void 0,
    xi = Qe(Object.keys, Object),
    lt = lr(T, 'DataView'),
    tt = lr(T, 'Map'),
    ft = lr(T, 'Promise'),
    pt = lr(T, 'Set'),
    ot = lr(T, 'WeakMap'),
    rt = lr(Object, 'create'),
    St = Vr(lt),
    Ct = Vr(tt),
    dt = Vr(ft),
    Ot = Vr(pt),
    gt = Vr(ot),
    wt = qt ? qt.prototype : void 0,
    vt = wt ? wt.valueOf : void 0;
  function We(g) {
    var I = -1,
      z = g == null ? 0 : g.length;
    for (this.clear(); ++I < z; ) {
      var Q = g[I];
      this.set(Q[0], Q[1]);
    }
  }
  function At() {
    (this.__data__ = rt ? rt(null) : {}), (this.size = 0);
  }
  function Rt(g) {
    var I = this.has(g) && delete this.__data__[g];
    return (this.size -= I ? 1 : 0), I;
  }
  function _a(g) {
    var I = this.__data__;
    if (rt) {
      var z = I[g];
      return z === n ? void 0 : z;
    }
    return qe.call(I, g) ? I[g] : void 0;
  }
  function ba(g) {
    var I = this.__data__;
    return rt ? I[g] !== void 0 : qe.call(I, g);
  }
  function Ea(g, I) {
    var z = this.__data__;
    return (
      (this.size += this.has(g) ? 0 : 1),
      (z[g] = rt && I === void 0 ? n : I),
      this
    );
  }
  (We.prototype.clear = At),
    (We.prototype.delete = Rt),
    (We.prototype.get = _a),
    (We.prototype.has = ba),
    (We.prototype.set = Ea);
  function yr(g) {
    var I = -1,
      z = g == null ? 0 : g.length;
    for (this.clear(); ++I < z; ) {
      var Q = g[I];
      this.set(Q[0], Q[1]);
    }
  }
  function Ia() {
    (this.__data__ = []), (this.size = 0);
  }
  function xa(g) {
    var I = this.__data__,
      z = Pi(I, g);
    if (z < 0) return !1;
    var Q = I.length - 1;
    return z == Q ? I.pop() : Lr.call(I, z, 1), --this.size, !0;
  }
  function Pa(g) {
    var I = this.__data__,
      z = Pi(I, g);
    return z < 0 ? void 0 : I[z][1];
  }
  function Sa(g) {
    return Pi(this.__data__, g) > -1;
  }
  function Ca(g, I) {
    var z = this.__data__,
      Q = Pi(z, g);
    return Q < 0 ? (++this.size, z.push([g, I])) : (z[Q][1] = I), this;
  }
  (yr.prototype.clear = Ia),
    (yr.prototype.delete = xa),
    (yr.prototype.get = Pa),
    (yr.prototype.has = Sa),
    (yr.prototype.set = Ca);
  function Br(g) {
    var I = -1,
      z = g == null ? 0 : g.length;
    for (this.clear(); ++I < z; ) {
      var Q = g[I];
      this.set(Q[0], Q[1]);
    }
  }
  function ki() {
    (this.size = 0),
      (this.__data__ = {
        hash: new We(),
        map: new (tt || yr)(),
        string: new We(),
      });
  }
  function Oa(g) {
    var I = ci(this, g).delete(g);
    return (this.size -= I ? 1 : 0), I;
  }
  function Ki(g) {
    return ci(this, g).get(g);
  }
  function Aa(g) {
    return ci(this, g).has(g);
  }
  function Ra(g, I) {
    var z = ci(this, g),
      Q = z.size;
    return z.set(g, I), (this.size += z.size == Q ? 0 : 1), this;
  }
  (Br.prototype.clear = ki),
    (Br.prototype.delete = Oa),
    (Br.prototype.get = Ki),
    (Br.prototype.has = Aa),
    (Br.prototype.set = Ra);
  function Bi(g) {
    var I = -1,
      z = g == null ? 0 : g.length;
    for (this.__data__ = new Br(); ++I < z; ) this.add(g[I]);
  }
  function Qs(g) {
    return this.__data__.set(g, n), this;
  }
  function Ys(g) {
    return this.__data__.has(g);
  }
  (Bi.prototype.add = Bi.prototype.push = Qs), (Bi.prototype.has = Ys);
  function Cr(g) {
    var I = (this.__data__ = new yr(g));
    this.size = I.size;
  }
  function Ta() {
    (this.__data__ = new yr()), (this.size = 0);
  }
  function Na(g) {
    var I = this.__data__,
      z = I.delete(g);
    return (this.size = I.size), z;
  }
  function $a(g) {
    return this.__data__.get(g);
  }
  function Fa(g) {
    return this.__data__.has(g);
  }
  function Xs(g, I) {
    var z = this.__data__;
    if (z instanceof yr) {
      var Q = z.__data__;
      if (!tt || Q.length < r - 1)
        return Q.push([g, I]), (this.size = ++z.size), this;
      z = this.__data__ = new Br(Q);
    }
    return z.set(g, I), (this.size = z.size), this;
  }
  (Cr.prototype.clear = Ta),
    (Cr.prototype.delete = Na),
    (Cr.prototype.get = $a),
    (Cr.prototype.has = Fa),
    (Cr.prototype.set = Xs);
  function Zs(g, I) {
    var z = Wi(g),
      Q = !z && fn(g),
      Be = !z && !Q && ys(g),
      de = !z && !Q && !Be && gn(g),
      Xe = z || Q || Be || de,
      Tt = Xe ? xt(g.length, String) : [],
      Ce = Tt.length;
    for (var Ve in g)
      (I || qe.call(g, Ve)) &&
        !(
          Xe &&
          (Ve == 'length' ||
            (Be && (Ve == 'offset' || Ve == 'parent')) ||
            (de &&
              (Ve == 'buffer' || Ve == 'byteLength' || Ve == 'byteOffset')) ||
            on(Ve, Ce))
        ) &&
        Tt.push(Ve);
    return Tt;
  }
  function Pi(g, I) {
    for (var z = g.length; z--; ) if (ln(g[z][0], I)) return z;
    return -1;
  }
  function gs(g, I, z) {
    var Q = I(g);
    return Wi(g) ? Q : $e(Q, z(g));
  }
  function Si(g) {
    return g == null
      ? g === void 0
        ? ve
        : ce
      : Qt && Qt in Object(g)
        ? nn(g)
        : qa(g);
  }
  function vs(g) {
    return Oi(g) && Si(g) == v;
  }
  function Ci(g, I, z, Q, Be) {
    return g === I
      ? !0
      : g == null || I == null || (!Oi(g) && !Oi(I))
        ? g !== g && I !== I
        : en(g, I, z, Q, Ci, Be);
  }
  function en(g, I, z, Q, Be, de) {
    var Xe = Wi(g),
      Tt = Wi(I),
      Ce = Xe ? w : qr(g),
      Ve = Tt ? w : qr(I);
    (Ce = Ce == v ? ue : Ce), (Ve = Ve == v ? ue : Ve);
    var _t = Ce == ue,
      ir = Ve == ue,
      Nt = Ce == Ve;
    if (Nt && ys(g)) {
      if (!ys(I)) return !1;
      (Xe = !0), (_t = !1);
    }
    if (Nt && !_t)
      return (
        de || (de = new Cr()),
        Xe || gn(g) ? Vi(g, I, z, Q, Be, de) : La(g, I, Ce, z, Q, Be, de)
      );
    if (!(z & a)) {
      var Ze = _t && qe.call(g, '__wrapped__'),
        Yt = ir && qe.call(I, '__wrapped__');
      if (Ze || Yt) {
        var Or = Ze ? g.value() : g,
          mr = Yt ? I.value() : I;
        return de || (de = new Cr()), Be(Or, mr, z, Q, de);
      }
    }
    return Nt ? (de || (de = new Cr()), sn(g, I, z, Q, Be, de)) : !1;
  }
  function Da(g) {
    if (!dn(g) || un(g)) return !1;
    var I = Ji(g) ? Ut : He;
    return I.test(Vr(g));
  }
  function tn(g) {
    return Oi(g) && pn(g.length) && !!_e[Si(g)];
  }
  function rn(g) {
    if (!hn(g)) return xi(g);
    var I = [];
    for (var z in Object(g)) qe.call(g, z) && z != 'constructor' && I.push(z);
    return I;
  }
  function Vi(g, I, z, Q, Be, de) {
    var Xe = z & a,
      Tt = g.length,
      Ce = I.length;
    if (Tt != Ce && !(Xe && Ce > Tt)) return !1;
    var Ve = de.get(g);
    if (Ve && de.get(I)) return Ve == I;
    var _t = -1,
      ir = !0,
      Nt = z & l ? new Bi() : void 0;
    for (de.set(g, I), de.set(I, g); ++_t < Tt; ) {
      var Ze = g[_t],
        Yt = I[_t];
      if (Q) var Or = Xe ? Q(Yt, Ze, _t, I, g, de) : Q(Ze, Yt, _t, g, I, de);
      if (Or !== void 0) {
        if (Or) continue;
        ir = !1;
        break;
      }
      if (Nt) {
        if (
          !xe(I, function (mr, Mr) {
            if (!nt(Nt, Mr) && (Ze === mr || Be(Ze, mr, z, Q, de)))
              return Nt.push(Mr);
          })
        ) {
          ir = !1;
          break;
        }
      } else if (!(Ze === Yt || Be(Ze, Yt, z, Q, de))) {
        ir = !1;
        break;
      }
    }
    return de.delete(g), de.delete(I), ir;
  }
  function La(g, I, z, Q, Be, de, Xe) {
    switch (z) {
      case Ae:
        if (g.byteLength != I.byteLength || g.byteOffset != I.byteOffset)
          return !1;
        (g = g.buffer), (I = I.buffer);
      case Ee:
        return !(g.byteLength != I.byteLength || !de(new Jt(g), new Jt(I)));
      case E:
      case C:
      case re:
        return ln(+g, +I);
      case A:
        return g.name == I.name && g.message == I.message;
      case pe:
      case H:
        return g == I + '';
      case K:
        var Tt = Je;
      case $:
        var Ce = Q & a;
        if ((Tt || (Tt = at), g.size != I.size && !Ce)) return !1;
        var Ve = Xe.get(g);
        if (Ve) return Ve == I;
        (Q |= l), Xe.set(g, I);
        var _t = Vi(Tt(g), Tt(I), Q, Be, de, Xe);
        return Xe.delete(g), _t;
      case W:
        if (vt) return vt.call(g) == vt.call(I);
    }
    return !1;
  }
  function sn(g, I, z, Q, Be, de) {
    var Xe = z & a,
      Tt = Gi(g),
      Ce = Tt.length,
      Ve = Gi(I),
      _t = Ve.length;
    if (Ce != _t && !Xe) return !1;
    for (var ir = Ce; ir--; ) {
      var Nt = Tt[ir];
      if (!(Xe ? Nt in I : qe.call(I, Nt))) return !1;
    }
    var Ze = de.get(g);
    if (Ze && de.get(I)) return Ze == I;
    var Yt = !0;
    de.set(g, I), de.set(I, g);
    for (var Or = Xe; ++ir < Ce; ) {
      Nt = Tt[ir];
      var mr = g[Nt],
        Mr = I[Nt];
      if (Q) var ms = Xe ? Q(Mr, mr, Nt, I, g, de) : Q(mr, Mr, Nt, g, I, de);
      if (!(ms === void 0 ? mr === Mr || Be(mr, Mr, z, Q, de) : ms)) {
        Yt = !1;
        break;
      }
      Or || (Or = Nt == 'constructor');
    }
    if (Yt && !Or) {
      var Ai = g.constructor,
        Mt = I.constructor;
      Ai != Mt &&
        'constructor' in g &&
        'constructor' in I &&
        !(
          typeof Ai == 'function' &&
          Ai instanceof Ai &&
          typeof Mt == 'function' &&
          Mt instanceof Mt
        ) &&
        (Yt = !1);
    }
    return de.delete(g), de.delete(I), Yt;
  }
  function Gi(g) {
    return gs(g, za, an);
  }
  function ci(g, I) {
    var z = g.__data__;
    return cn(I) ? z[typeof I == 'string' ? 'string' : 'hash'] : z.map;
  }
  function lr(g, I) {
    var z = De(g, I);
    return Da(z) ? z : void 0;
  }
  function nn(g) {
    var I = qe.call(g, Qt),
      z = g[Qt];
    try {
      g[Qt] = void 0;
      var Q = !0;
    } catch {}
    var Be = Ft.call(g);
    return Q && (I ? (g[Qt] = z) : delete g[Qt]), Be;
  }
  var an = Kr
      ? function (g) {
          return g == null
            ? []
            : ((g = Object(g)),
              Te(Kr(g), function (I) {
                return rr.call(g, I);
              }));
        }
      : Ke,
    qr = Si;
  ((lt && qr(new lt(new ArrayBuffer(1))) != Ae) ||
    (tt && qr(new tt()) != K) ||
    (ft && qr(ft.resolve()) != he) ||
    (pt && qr(new pt()) != $) ||
    (ot && qr(new ot()) != te)) &&
    (qr = function (g) {
      var I = Si(g),
        z = I == ue ? g.constructor : void 0,
        Q = z ? Vr(z) : '';
      if (Q)
        switch (Q) {
          case St:
            return Ae;
          case Ct:
            return K;
          case dt:
            return he;
          case Ot:
            return $;
          case gt:
            return te;
        }
      return I;
    });
  function on(g, I) {
    return (
      (I = I ?? d),
      !!I &&
        (typeof g == 'number' || Dr.test(g)) &&
        g > -1 &&
        g % 1 == 0 &&
        g < I
    );
  }
  function cn(g) {
    var I = typeof g;
    return I == 'string' || I == 'number' || I == 'symbol' || I == 'boolean'
      ? g !== '__proto__'
      : g === null;
  }
  function un(g) {
    return !!Pt && Pt in g;
  }
  function hn(g) {
    var I = g && g.constructor,
      z = (typeof I == 'function' && I.prototype) || Ne;
    return g === z;
  }
  function qa(g) {
    return Ft.call(g);
  }
  function Vr(g) {
    if (g != null) {
      try {
        return ht.call(g);
      } catch {}
      try {
        return g + '';
      } catch {}
    }
    return '';
  }
  function ln(g, I) {
    return g === I || (g !== g && I !== I);
  }
  var fn = vs(
      (function () {
        return arguments;
      })()
    )
      ? vs
      : function (g) {
          return Oi(g) && qe.call(g, 'callee') && !rr.call(g, 'callee');
        },
    Wi = Array.isArray;
  function Ma(g) {
    return g != null && pn(g.length) && !Ji(g);
  }
  var ys = oi || Ue;
  function ja(g, I) {
    return Ci(g, I);
  }
  function Ji(g) {
    if (!dn(g)) return !1;
    var I = Si(g);
    return I == j || I == F || I == y || I == fe;
  }
  function pn(g) {
    return typeof g == 'number' && g > -1 && g % 1 == 0 && g <= d;
  }
  function dn(g) {
    var I = typeof g;
    return g != null && (I == 'object' || I == 'function');
  }
  function Oi(g) {
    return g != null && typeof g == 'object';
  }
  var gn = me ? mt(me) : tn;
  function za(g) {
    return Ma(g) ? Zs(g) : rn(g);
  }
  function Ke() {
    return [];
  }
  function Ue() {
    return !1;
  }
  c.exports = ja;
})(pa, pa.exports);
var ew = pa.exports;
const tw = Ml(ew);
function rw(c, i) {
  return (
    (i = i || {}),
    new Promise(function (r, n) {
      var a = new XMLHttpRequest(),
        l = [],
        d = [],
        v = {},
        w = function () {
          return {
            ok: ((a.status / 100) | 0) == 2,
            statusText: a.statusText,
            status: a.status,
            url: a.responseURL,
            text: function () {
              return Promise.resolve(a.responseText);
            },
            json: function () {
              return Promise.resolve(a.responseText).then(JSON.parse);
            },
            blob: function () {
              return Promise.resolve(new Blob([a.response]));
            },
            clone: w,
            headers: {
              keys: function () {
                return l;
              },
              entries: function () {
                return d;
              },
              get: function (E) {
                return v[E.toLowerCase()];
              },
              has: function (E) {
                return E.toLowerCase() in v;
              },
            },
          };
        };
      for (var y in (a.open(i.method || 'get', c, !0),
      (a.onload = function () {
        a
          .getAllResponseHeaders()
          .replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function (E, C, A) {
            l.push((C = C.toLowerCase())),
              d.push([C, A]),
              (v[C] = v[C] ? v[C] + ',' + A : A);
          }),
          r(w());
      }),
      (a.onerror = n),
      (a.withCredentials = i.credentials == 'include'),
      i.headers))
        a.setRequestHeader(y, i.headers[y]);
      a.send(i.body || null);
    })
  );
}
const iw = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: rw },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  Yh = ql(iw);
var sw = self.fetch || (self.fetch = Yh.default || Yh);
const nw = Ml(sw);
function aw(c, i) {
  if (c.length >= 255) throw new TypeError('Alphabet too long');
  for (var r = new Uint8Array(256), n = 0; n < r.length; n++) r[n] = 255;
  for (var a = 0; a < c.length; a++) {
    var l = c.charAt(a),
      d = l.charCodeAt(0);
    if (r[d] !== 255) throw new TypeError(l + ' is ambiguous');
    r[d] = a;
  }
  var v = c.length,
    w = c.charAt(0),
    y = Math.log(v) / Math.log(256),
    E = Math.log(256) / Math.log(v);
  function C(F) {
    if (
      (F instanceof Uint8Array ||
        (ArrayBuffer.isView(F)
          ? (F = new Uint8Array(F.buffer, F.byteOffset, F.byteLength))
          : Array.isArray(F) && (F = Uint8Array.from(F))),
      !(F instanceof Uint8Array))
    )
      throw new TypeError('Expected Uint8Array');
    if (F.length === 0) return '';
    for (var K = 0, re = 0, ce = 0, ue = F.length; ce !== ue && F[ce] === 0; )
      ce++, K++;
    for (
      var he = ((ue - ce) * E + 1) >>> 0, fe = new Uint8Array(he);
      ce !== ue;

    ) {
      for (
        var pe = F[ce], $ = 0, H = he - 1;
        (pe !== 0 || $ < re) && H !== -1;
        H--, $++
      )
        (pe += (256 * fe[H]) >>> 0),
          (fe[H] = pe % v >>> 0),
          (pe = (pe / v) >>> 0);
      if (pe !== 0) throw new Error('Non-zero carry');
      (re = $), ce++;
    }
    for (var W = he - re; W !== he && fe[W] === 0; ) W++;
    for (var ve = w.repeat(K); W < he; ++W) ve += c.charAt(fe[W]);
    return ve;
  }
  function A(F) {
    if (typeof F != 'string') throw new TypeError('Expected String');
    if (F.length === 0) return new Uint8Array();
    var K = 0;
    if (F[K] !== ' ') {
      for (var re = 0, ce = 0; F[K] === w; ) re++, K++;
      for (
        var ue = ((F.length - K) * y + 1) >>> 0, he = new Uint8Array(ue);
        F[K];

      ) {
        var fe = r[F.charCodeAt(K)];
        if (fe === 255) return;
        for (
          var pe = 0, $ = ue - 1;
          (fe !== 0 || pe < ce) && $ !== -1;
          $--, pe++
        )
          (fe += (v * he[$]) >>> 0),
            (he[$] = fe % 256 >>> 0),
            (fe = (fe / 256) >>> 0);
        if (fe !== 0) throw new Error('Non-zero carry');
        (ce = pe), K++;
      }
      if (F[K] !== ' ') {
        for (var H = ue - ce; H !== ue && he[H] === 0; ) H++;
        for (var W = new Uint8Array(re + (ue - H)), ve = re; H !== ue; )
          W[ve++] = he[H++];
        return W;
      }
    }
  }
  function j(F) {
    var K = A(F);
    if (K) return K;
    throw new Error(`Non-${i} character`);
  }
  return { encode: C, decodeUnsafe: A, decode: j };
}
var ow = aw,
  cw = ow;
const Wl = (c) => {
    if (c instanceof Uint8Array && c.constructor.name === 'Uint8Array')
      return c;
    if (c instanceof ArrayBuffer) return new Uint8Array(c);
    if (ArrayBuffer.isView(c))
      return new Uint8Array(c.buffer, c.byteOffset, c.byteLength);
    throw new Error('Unknown type, must be binary type');
  },
  uw = (c) => new TextEncoder().encode(c),
  hw = (c) => new TextDecoder().decode(c);
class lw {
  constructor(i, r, n) {
    (this.name = i), (this.prefix = r), (this.baseEncode = n);
  }
  encode(i) {
    if (i instanceof Uint8Array) return `${this.prefix}${this.baseEncode(i)}`;
    throw Error('Unknown type, must be binary type');
  }
}
class fw {
  constructor(i, r, n) {
    if (((this.name = i), (this.prefix = r), r.codePointAt(0) === void 0))
      throw new Error('Invalid prefix character');
    (this.prefixCodePoint = r.codePointAt(0)), (this.baseDecode = n);
  }
  decode(i) {
    if (typeof i == 'string') {
      if (i.codePointAt(0) !== this.prefixCodePoint)
        throw Error(
          `Unable to decode multibase string ${JSON.stringify(i)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`
        );
      return this.baseDecode(i.slice(this.prefix.length));
    } else throw Error('Can only multibase decode strings');
  }
  or(i) {
    return Jl(this, i);
  }
}
class pw {
  constructor(i) {
    this.decoders = i;
  }
  or(i) {
    return Jl(this, i);
  }
  decode(i) {
    const r = i[0],
      n = this.decoders[r];
    if (n) return n.decode(i);
    throw RangeError(
      `Unable to decode multibase string ${JSON.stringify(i)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`
    );
  }
}
const Jl = (c, i) =>
  new pw({
    ...(c.decoders || { [c.prefix]: c }),
    ...(i.decoders || { [i.prefix]: i }),
  });
class dw {
  constructor(i, r, n, a) {
    (this.name = i),
      (this.prefix = r),
      (this.baseEncode = n),
      (this.baseDecode = a),
      (this.encoder = new lw(i, r, n)),
      (this.decoder = new fw(i, r, a));
  }
  encode(i) {
    return this.encoder.encode(i);
  }
  decode(i) {
    return this.decoder.decode(i);
  }
}
const ma = ({ name: c, prefix: i, encode: r, decode: n }) => new dw(c, i, r, n),
  Js = ({ prefix: c, name: i, alphabet: r }) => {
    const { encode: n, decode: a } = cw(r, i);
    return ma({ prefix: c, name: i, encode: n, decode: (l) => Wl(a(l)) });
  },
  gw = (c, i, r, n) => {
    const a = {};
    for (let E = 0; E < i.length; ++E) a[i[E]] = E;
    let l = c.length;
    for (; c[l - 1] === '='; ) --l;
    const d = new Uint8Array(((l * r) / 8) | 0);
    let v = 0,
      w = 0,
      y = 0;
    for (let E = 0; E < l; ++E) {
      const C = a[c[E]];
      if (C === void 0) throw new SyntaxError(`Non-${n} character`);
      (w = (w << r) | C),
        (v += r),
        v >= 8 && ((v -= 8), (d[y++] = 255 & (w >> v)));
    }
    if (v >= r || 255 & (w << (8 - v)))
      throw new SyntaxError('Unexpected end of data');
    return d;
  },
  vw = (c, i, r) => {
    const n = i[i.length - 1] === '=',
      a = (1 << r) - 1;
    let l = '',
      d = 0,
      v = 0;
    for (let w = 0; w < c.length; ++w)
      for (v = (v << 8) | c[w], d += 8; d > r; )
        (d -= r), (l += i[a & (v >> d)]);
    if ((d && (l += i[a & (v << (r - d))]), n))
      for (; (l.length * r) & 7; ) l += '=';
    return l;
  },
  Kt = ({ name: c, prefix: i, bitsPerChar: r, alphabet: n }) =>
    ma({
      prefix: i,
      name: c,
      encode(a) {
        return vw(a, n, r);
      },
      decode(a) {
        return gw(a, n, r, c);
      },
    }),
  yw = ma({
    prefix: '\0',
    name: 'identity',
    encode: (c) => hw(c),
    decode: (c) => uw(c),
  });
var mw = Object.freeze({ __proto__: null, identity: yw });
const ww = Kt({ prefix: '0', name: 'base2', alphabet: '01', bitsPerChar: 1 });
var _w = Object.freeze({ __proto__: null, base2: ww });
const bw = Kt({
  prefix: '7',
  name: 'base8',
  alphabet: '01234567',
  bitsPerChar: 3,
});
var Ew = Object.freeze({ __proto__: null, base8: bw });
const Iw = Js({ prefix: '9', name: 'base10', alphabet: '0123456789' });
var xw = Object.freeze({ __proto__: null, base10: Iw });
const Pw = Kt({
    prefix: 'f',
    name: 'base16',
    alphabet: '0123456789abcdef',
    bitsPerChar: 4,
  }),
  Sw = Kt({
    prefix: 'F',
    name: 'base16upper',
    alphabet: '0123456789ABCDEF',
    bitsPerChar: 4,
  });
var Cw = Object.freeze({ __proto__: null, base16: Pw, base16upper: Sw });
const Ow = Kt({
    prefix: 'b',
    name: 'base32',
    alphabet: 'abcdefghijklmnopqrstuvwxyz234567',
    bitsPerChar: 5,
  }),
  Aw = Kt({
    prefix: 'B',
    name: 'base32upper',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
    bitsPerChar: 5,
  }),
  Rw = Kt({
    prefix: 'c',
    name: 'base32pad',
    alphabet: 'abcdefghijklmnopqrstuvwxyz234567=',
    bitsPerChar: 5,
  }),
  Tw = Kt({
    prefix: 'C',
    name: 'base32padupper',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=',
    bitsPerChar: 5,
  }),
  Nw = Kt({
    prefix: 'v',
    name: 'base32hex',
    alphabet: '0123456789abcdefghijklmnopqrstuv',
    bitsPerChar: 5,
  }),
  $w = Kt({
    prefix: 'V',
    name: 'base32hexupper',
    alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUV',
    bitsPerChar: 5,
  }),
  Fw = Kt({
    prefix: 't',
    name: 'base32hexpad',
    alphabet: '0123456789abcdefghijklmnopqrstuv=',
    bitsPerChar: 5,
  }),
  Dw = Kt({
    prefix: 'T',
    name: 'base32hexpadupper',
    alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUV=',
    bitsPerChar: 5,
  }),
  Lw = Kt({
    prefix: 'h',
    name: 'base32z',
    alphabet: 'ybndrfg8ejkmcpqxot1uwisza345h769',
    bitsPerChar: 5,
  });
var qw = Object.freeze({
  __proto__: null,
  base32: Ow,
  base32upper: Aw,
  base32pad: Rw,
  base32padupper: Tw,
  base32hex: Nw,
  base32hexupper: $w,
  base32hexpad: Fw,
  base32hexpadupper: Dw,
  base32z: Lw,
});
const Mw = Js({
    prefix: 'k',
    name: 'base36',
    alphabet: '0123456789abcdefghijklmnopqrstuvwxyz',
  }),
  jw = Js({
    prefix: 'K',
    name: 'base36upper',
    alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  });
var zw = Object.freeze({ __proto__: null, base36: Mw, base36upper: jw });
const Uw = Js({
    name: 'base58btc',
    prefix: 'z',
    alphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
  }),
  Hw = Js({
    name: 'base58flickr',
    prefix: 'Z',
    alphabet: '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
  });
var kw = Object.freeze({ __proto__: null, base58btc: Uw, base58flickr: Hw });
const Kw = Kt({
    prefix: 'm',
    name: 'base64',
    alphabet:
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    bitsPerChar: 6,
  }),
  Bw = Kt({
    prefix: 'M',
    name: 'base64pad',
    alphabet:
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    bitsPerChar: 6,
  }),
  Vw = Kt({
    prefix: 'u',
    name: 'base64url',
    alphabet:
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
    bitsPerChar: 6,
  }),
  Gw = Kt({
    prefix: 'U',
    name: 'base64urlpad',
    alphabet:
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=',
    bitsPerChar: 6,
  });
var Ww = Object.freeze({
  __proto__: null,
  base64: Kw,
  base64pad: Bw,
  base64url: Vw,
  base64urlpad: Gw,
});
const Ql = Array.from(
    '🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂'
  ),
  Jw = Ql.reduce((c, i, r) => ((c[r] = i), c), []),
  Qw = Ql.reduce((c, i, r) => ((c[i.codePointAt(0)] = r), c), []);
function Yw(c) {
  return c.reduce((i, r) => ((i += Jw[r]), i), '');
}
function Xw(c) {
  const i = [];
  for (const r of c) {
    const n = Qw[r.codePointAt(0)];
    if (n === void 0) throw new Error(`Non-base256emoji character: ${r}`);
    i.push(n);
  }
  return new Uint8Array(i);
}
const Zw = ma({ prefix: '🚀', name: 'base256emoji', encode: Yw, decode: Xw });
var e_ = Object.freeze({ __proto__: null, base256emoji: Zw }),
  t_ = Yl,
  Xh = 128,
  r_ = 127,
  i_ = ~r_,
  s_ = Math.pow(2, 31);
function Yl(c, i, r) {
  (i = i || []), (r = r || 0);
  for (var n = r; c >= s_; ) (i[r++] = (c & 255) | Xh), (c /= 128);
  for (; c & i_; ) (i[r++] = (c & 255) | Xh), (c >>>= 7);
  return (i[r] = c | 0), (Yl.bytes = r - n + 1), i;
}
var n_ = lc,
  a_ = 128,
  Zh = 127;
function lc(c, n) {
  var r = 0,
    n = n || 0,
    a = 0,
    l = n,
    d,
    v = c.length;
  do {
    if (l >= v)
      throw ((lc.bytes = 0), new RangeError('Could not decode varint'));
    (d = c[l++]),
      (r += a < 28 ? (d & Zh) << a : (d & Zh) * Math.pow(2, a)),
      (a += 7);
  } while (d >= a_);
  return (lc.bytes = l - n), r;
}
var o_ = Math.pow(2, 7),
  c_ = Math.pow(2, 14),
  u_ = Math.pow(2, 21),
  h_ = Math.pow(2, 28),
  l_ = Math.pow(2, 35),
  f_ = Math.pow(2, 42),
  p_ = Math.pow(2, 49),
  d_ = Math.pow(2, 56),
  g_ = Math.pow(2, 63),
  v_ = function (c) {
    return c < o_
      ? 1
      : c < c_
        ? 2
        : c < u_
          ? 3
          : c < h_
            ? 4
            : c < l_
              ? 5
              : c < f_
                ? 6
                : c < p_
                  ? 7
                  : c < d_
                    ? 8
                    : c < g_
                      ? 9
                      : 10;
  },
  y_ = { encode: t_, decode: n_, encodingLength: v_ },
  Xl = y_;
const el = (c, i, r = 0) => (Xl.encode(c, i, r), i),
  tl = (c) => Xl.encodingLength(c),
  fc = (c, i) => {
    const r = i.byteLength,
      n = tl(c),
      a = n + tl(r),
      l = new Uint8Array(a + r);
    return el(c, l, 0), el(r, l, n), l.set(i, a), new m_(c, r, i, l);
  };
class m_ {
  constructor(i, r, n, a) {
    (this.code = i), (this.size = r), (this.digest = n), (this.bytes = a);
  }
}
const Zl = ({ name: c, code: i, encode: r }) => new w_(c, i, r);
class w_ {
  constructor(i, r, n) {
    (this.name = i), (this.code = r), (this.encode = n);
  }
  digest(i) {
    if (i instanceof Uint8Array) {
      const r = this.encode(i);
      return r instanceof Uint8Array
        ? fc(this.code, r)
        : r.then((n) => fc(this.code, n));
    } else throw Error('Unknown type, must be binary type');
  }
}
const ef = (c) => async (i) => new Uint8Array(await crypto.subtle.digest(c, i)),
  __ = Zl({ name: 'sha2-256', code: 18, encode: ef('SHA-256') }),
  b_ = Zl({ name: 'sha2-512', code: 19, encode: ef('SHA-512') });
var E_ = Object.freeze({ __proto__: null, sha256: __, sha512: b_ });
const tf = 0,
  I_ = 'identity',
  rf = Wl,
  x_ = (c) => fc(tf, rf(c)),
  P_ = { code: tf, name: I_, encode: rf, digest: x_ };
var S_ = Object.freeze({ __proto__: null, identity: P_ });
new TextEncoder(), new TextDecoder();
const rl = {
  ...mw,
  ..._w,
  ...Ew,
  ...xw,
  ...Cw,
  ...qw,
  ...zw,
  ...kw,
  ...Ww,
  ...e_,
};
({ ...E_, ...S_ });
function sf(c) {
  return globalThis.Buffer != null
    ? new Uint8Array(c.buffer, c.byteOffset, c.byteLength)
    : c;
}
function C_(c = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null
    ? sf(globalThis.Buffer.allocUnsafe(c))
    : new Uint8Array(c);
}
function nf(c, i, r, n) {
  return {
    name: c,
    prefix: i,
    encoder: { name: c, prefix: i, encode: r },
    decoder: { decode: n },
  };
}
const il = nf(
    'utf8',
    'u',
    (c) => 'u' + new TextDecoder('utf8').decode(c),
    (c) => new TextEncoder().encode(c.substring(1))
  ),
  Zo = nf(
    'ascii',
    'a',
    (c) => {
      let i = 'a';
      for (let r = 0; r < c.length; r++) i += String.fromCharCode(c[r]);
      return i;
    },
    (c) => {
      c = c.substring(1);
      const i = C_(c.length);
      for (let r = 0; r < c.length; r++) i[r] = c.charCodeAt(r);
      return i;
    }
  ),
  O_ = {
    utf8: il,
    'utf-8': il,
    hex: rl.base16,
    latin1: Zo,
    ascii: Zo,
    binary: Zo,
    ...rl,
  };
function A_(c, i = 'utf8') {
  const r = O_[i];
  if (!r) throw new Error(`Unsupported encoding "${i}"`);
  return (i === 'utf8' || i === 'utf-8') &&
    globalThis.Buffer != null &&
    globalThis.Buffer.from != null
    ? sf(globalThis.Buffer.from(c, 'utf-8'))
    : r.decoder.decode(`${r.prefix}${c}`);
}
const af = 'wc',
  R_ = 2,
  Ic = 'core',
  bi = `${af}@2:${Ic}:`,
  T_ = { name: Ic, logger: 'error' },
  N_ = { database: ':memory:' },
  $_ = 'crypto',
  sl = 'client_ed25519_seed',
  F_ = ie.ONE_DAY,
  D_ = 'keychain',
  L_ = '0.3',
  q_ = 'messages',
  M_ = '0.3',
  j_ = ie.SIX_HOURS,
  z_ = 'publisher',
  of = 'irn',
  U_ = 'error',
  cf = 'wss://relay.walletconnect.com',
  nl = 'wss://relay.walletconnect.org',
  H_ = 'relayer',
  Wt = {
    message: 'relayer_message',
    message_ack: 'relayer_message_ack',
    connect: 'relayer_connect',
    disconnect: 'relayer_disconnect',
    error: 'relayer_error',
    connection_stalled: 'relayer_connection_stalled',
    transport_closed: 'relayer_transport_closed',
    publish: 'relayer_publish',
  },
  k_ = '_subscription',
  ri = {
    payload: 'payload',
    connect: 'connect',
    disconnect: 'disconnect',
    error: 'error',
  },
  K_ = ie.ONE_SECOND,
  B_ = '2.11.0',
  V_ = 1e4,
  G_ = '0.3',
  W_ = 'WALLETCONNECT_CLIENT_ID',
  $r = {
    created: 'subscription_created',
    deleted: 'subscription_deleted',
    expired: 'subscription_expired',
    disabled: 'subscription_disabled',
    sync: 'subscription_sync',
    resubscribed: 'subscription_resubscribed',
  },
  J_ = 'subscription',
  Q_ = '0.3',
  Y_ = ie.FIVE_SECONDS * 1e3,
  X_ = 'pairing',
  Z_ = '0.3',
  Ls = {
    wc_pairingDelete: {
      req: { ttl: ie.ONE_DAY, prompt: !1, tag: 1e3 },
      res: { ttl: ie.ONE_DAY, prompt: !1, tag: 1001 },
    },
    wc_pairingPing: {
      req: { ttl: ie.THIRTY_SECONDS, prompt: !1, tag: 1002 },
      res: { ttl: ie.THIRTY_SECONDS, prompt: !1, tag: 1003 },
    },
    unregistered_method: {
      req: { ttl: ie.ONE_DAY, prompt: !1, tag: 0 },
      res: { ttl: ie.ONE_DAY, prompt: !1, tag: 0 },
    },
  },
  Hs = {
    create: 'pairing_create',
    expire: 'pairing_expire',
    delete: 'pairing_delete',
    ping: 'pairing_ping',
  },
  Hr = {
    created: 'history_created',
    updated: 'history_updated',
    deleted: 'history_deleted',
    sync: 'history_sync',
  },
  eb = 'history',
  tb = '0.3',
  rb = 'expirer',
  Sr = {
    created: 'expirer_created',
    deleted: 'expirer_deleted',
    expired: 'expirer_expired',
    sync: 'expirer_sync',
  },
  ib = '0.3',
  ec = 'verify-api',
  ls = 'https://verify.walletconnect.com',
  pc = 'https://verify.walletconnect.org',
  sb = [ls, pc],
  nb = 'echo',
  ab = 'https://echo.walletconnect.com';
class ob {
  constructor(i, r) {
    (this.core = i),
      (this.logger = r),
      (this.keychain = new Map()),
      (this.name = D_),
      (this.version = L_),
      (this.initialized = !1),
      (this.storagePrefix = bi),
      (this.init = async () => {
        if (!this.initialized) {
          const n = await this.getKeyChain();
          typeof n < 'u' && (this.keychain = n), (this.initialized = !0);
        }
      }),
      (this.has = (n) => (this.isInitialized(), this.keychain.has(n))),
      (this.set = async (n, a) => {
        this.isInitialized(), this.keychain.set(n, a), await this.persist();
      }),
      (this.get = (n) => {
        this.isInitialized();
        const a = this.keychain.get(n);
        if (typeof a > 'u') {
          const { message: l } = Y('NO_MATCHING_KEY', `${this.name}: ${n}`);
          throw new Error(l);
        }
        return a;
      }),
      (this.del = async (n) => {
        this.isInitialized(), this.keychain.delete(n), await this.persist();
      }),
      (this.core = i),
      (this.logger = Se.generateChildLogger(r, this.name));
  }
  get context() {
    return Se.getLoggerContext(this.logger);
  }
  get storageKey() {
    return (
      this.storagePrefix +
      this.version +
      this.core.customStoragePrefix +
      '//' +
      this.name
    );
  }
  async setKeyChain(i) {
    await this.core.storage.setItem(this.storageKey, Fl(i));
  }
  async getKeyChain() {
    const i = await this.core.storage.getItem(this.storageKey);
    return typeof i < 'u' ? Dl(i) : void 0;
  }
  async persist() {
    await this.setKeyChain(this.keychain);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: i } = Y('NOT_INITIALIZED', this.name);
      throw new Error(i);
    }
  }
}
class cb {
  constructor(i, r, n) {
    (this.core = i),
      (this.logger = r),
      (this.name = $_),
      (this.initialized = !1),
      (this.init = async () => {
        this.initialized ||
          (await this.keychain.init(), (this.initialized = !0));
      }),
      (this.hasKeys = (a) => (this.isInitialized(), this.keychain.has(a))),
      (this.getClientId = async () => {
        this.isInitialized();
        const a = await this.getClientSeed(),
          l = Wh(a);
        return Gl(l.publicKey);
      }),
      (this.generateKeyPair = () => {
        this.isInitialized();
        const a = X0();
        return this.setPrivateKey(a.publicKey, a.privateKey);
      }),
      (this.signJWT = async (a) => {
        this.isInitialized();
        const l = await this.getClientSeed(),
          d = Wh(l),
          v = cc();
        return await J1(v, a, F_, d);
      }),
      (this.generateSharedKey = (a, l, d) => {
        this.isInitialized();
        const v = this.getPrivateKey(a),
          w = Z0(v, l);
        return this.setSymKey(w, d);
      }),
      (this.setSymKey = async (a, l) => {
        this.isInitialized();
        const d = l || em(a);
        return await this.keychain.set(d, a), d;
      }),
      (this.deleteKeyPair = async (a) => {
        this.isInitialized(), await this.keychain.del(a);
      }),
      (this.deleteSymKey = async (a) => {
        this.isInitialized(), await this.keychain.del(a);
      }),
      (this.encode = async (a, l, d) => {
        this.isInitialized();
        const v = tm(d),
          w = Gs(l);
        if (Ch(v)) {
          const A = v.senderPublicKey,
            j = v.receiverPublicKey;
          a = await this.generateSharedKey(A, j);
        }
        const y = this.getSymKey(a),
          { type: E, senderPublicKey: C } = v;
        return rm({ type: E, symKey: y, message: w, senderPublicKey: C });
      }),
      (this.decode = async (a, l, d) => {
        this.isInitialized();
        const v = im(l, d);
        if (Ch(v)) {
          const w = v.receiverPublicKey,
            y = v.senderPublicKey;
          a = await this.generateSharedKey(w, y);
        }
        try {
          const w = this.getSymKey(a),
            y = sm({ symKey: w, encoded: l });
          return va(y);
        } catch (w) {
          this.logger.error(
            `Failed to decode message from topic: '${a}', clientId: '${await this.getClientId()}'`
          ),
            this.logger.error(w);
        }
      }),
      (this.getPayloadType = (a) => {
        const l = Oh(a);
        return nm(l.type);
      }),
      (this.getPayloadSenderPublicKey = (a) => {
        const l = Oh(a);
        return l.senderPublicKey ? ga(l.senderPublicKey, am) : void 0;
      }),
      (this.core = i),
      (this.logger = Se.generateChildLogger(r, this.name)),
      (this.keychain = n || new ob(this.core, this.logger));
  }
  get context() {
    return Se.getLoggerContext(this.logger);
  }
  async setPrivateKey(i, r) {
    return await this.keychain.set(i, r), i;
  }
  getPrivateKey(i) {
    return this.keychain.get(i);
  }
  async getClientSeed() {
    let i = '';
    try {
      i = this.keychain.get(sl);
    } catch {
      (i = cc()), await this.keychain.set(sl, i);
    }
    return A_(i, 'base16');
  }
  getSymKey(i) {
    return this.keychain.get(i);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: i } = Y('NOT_INITIALIZED', this.name);
      throw new Error(i);
    }
  }
}
class ub extends S1 {
  constructor(i, r) {
    super(i, r),
      (this.logger = i),
      (this.core = r),
      (this.messages = new Map()),
      (this.name = q_),
      (this.version = M_),
      (this.initialized = !1),
      (this.storagePrefix = bi),
      (this.init = async () => {
        if (!this.initialized) {
          this.logger.trace('Initialized');
          try {
            const n = await this.getRelayerMessages();
            typeof n < 'u' && (this.messages = n),
              this.logger.debug(
                `Successfully Restored records for ${this.name}`
              ),
              this.logger.trace({
                type: 'method',
                method: 'restore',
                size: this.messages.size,
              });
          } catch (n) {
            this.logger.debug(`Failed to Restore records for ${this.name}`),
              this.logger.error(n);
          } finally {
            this.initialized = !0;
          }
        }
      }),
      (this.set = async (n, a) => {
        this.isInitialized();
        const l = fs(a);
        let d = this.messages.get(n);
        return (
          typeof d > 'u' && (d = {}),
          typeof d[l] < 'u' ||
            ((d[l] = a), this.messages.set(n, d), await this.persist()),
          l
        );
      }),
      (this.get = (n) => {
        this.isInitialized();
        let a = this.messages.get(n);
        return typeof a > 'u' && (a = {}), a;
      }),
      (this.has = (n, a) => {
        this.isInitialized();
        const l = this.get(n),
          d = fs(a);
        return typeof l[d] < 'u';
      }),
      (this.del = async (n) => {
        this.isInitialized(), this.messages.delete(n), await this.persist();
      }),
      (this.logger = Se.generateChildLogger(i, this.name)),
      (this.core = r);
  }
  get context() {
    return Se.getLoggerContext(this.logger);
  }
  get storageKey() {
    return (
      this.storagePrefix +
      this.version +
      this.core.customStoragePrefix +
      '//' +
      this.name
    );
  }
  async setRelayerMessages(i) {
    await this.core.storage.setItem(this.storageKey, Fl(i));
  }
  async getRelayerMessages() {
    const i = await this.core.storage.getItem(this.storageKey);
    return typeof i < 'u' ? Dl(i) : void 0;
  }
  async persist() {
    await this.setRelayerMessages(this.messages);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: i } = Y('NOT_INITIALIZED', this.name);
      throw new Error(i);
    }
  }
}
class hb extends C1 {
  constructor(i, r) {
    super(i, r),
      (this.relayer = i),
      (this.logger = r),
      (this.events = new kr.EventEmitter()),
      (this.name = z_),
      (this.queue = new Map()),
      (this.publishTimeout = ie.toMiliseconds(ie.TEN_SECONDS)),
      (this.needsTransportRestart = !1),
      (this.publish = async (n, a, l) => {
        var d;
        this.logger.debug('Publishing Payload'),
          this.logger.trace({
            type: 'method',
            method: 'publish',
            params: { topic: n, message: a, opts: l },
          });
        try {
          const v = (l == null ? void 0 : l.ttl) || j_,
            w = uc(l),
            y = (l == null ? void 0 : l.prompt) || !1,
            E = (l == null ? void 0 : l.tag) || 0,
            C = (l == null ? void 0 : l.id) || Mm().toString(),
            A = {
              topic: n,
              message: a,
              opts: { ttl: v, relay: w, prompt: y, tag: E, id: C },
            },
            j = setTimeout(() => this.queue.set(C, A), this.publishTimeout);
          try {
            await await Bs(
              this.rpcPublish(n, a, v, w, y, E, C),
              this.publishTimeout,
              'Failed to publish payload, please try again.'
            ),
              this.removeRequestFromQueue(C),
              this.relayer.events.emit(Wt.publish, A);
          } catch (F) {
            if (
              (this.logger.debug('Publishing Payload stalled'),
              (this.needsTransportRestart = !0),
              (d = l == null ? void 0 : l.internal) != null &&
                d.throwOnFailedPublish)
            )
              throw (this.removeRequestFromQueue(C), F);
            return;
          } finally {
            clearTimeout(j);
          }
          this.logger.debug('Successfully Published Payload'),
            this.logger.trace({
              type: 'method',
              method: 'publish',
              params: { topic: n, message: a, opts: l },
            });
        } catch (v) {
          throw (
            (this.logger.debug('Failed to Publish Payload'),
            this.logger.error(v),
            v)
          );
        }
      }),
      (this.on = (n, a) => {
        this.events.on(n, a);
      }),
      (this.once = (n, a) => {
        this.events.once(n, a);
      }),
      (this.off = (n, a) => {
        this.events.off(n, a);
      }),
      (this.removeListener = (n, a) => {
        this.events.removeListener(n, a);
      }),
      (this.relayer = i),
      (this.logger = Se.generateChildLogger(r, this.name)),
      this.registerEventListeners();
  }
  get context() {
    return Se.getLoggerContext(this.logger);
  }
  rpcPublish(i, r, n, a, l, d, v) {
    var w, y, E, C;
    const A = {
      method: ca(a.protocol).publish,
      params: { topic: i, message: r, ttl: n, prompt: l, tag: d },
      id: v,
    };
    return (
      _i((w = A.params) == null ? void 0 : w.prompt) &&
        ((y = A.params) == null || delete y.prompt),
      _i((E = A.params) == null ? void 0 : E.tag) &&
        ((C = A.params) == null || delete C.tag),
      this.logger.debug('Outgoing Relay Payload'),
      this.logger.trace({ type: 'message', direction: 'outgoing', request: A }),
      this.relayer.request(A)
    );
  }
  removeRequestFromQueue(i) {
    this.queue.delete(i);
  }
  checkQueue() {
    this.queue.forEach(async (i) => {
      const { topic: r, message: n, opts: a } = i;
      await this.publish(r, n, a);
    });
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(ds.HEARTBEAT_EVENTS.pulse, () => {
      if (this.needsTransportRestart) {
        (this.needsTransportRestart = !1),
          this.relayer.events.emit(Wt.connection_stalled);
        return;
      }
      this.checkQueue();
    }),
      this.relayer.on(Wt.message_ack, (i) => {
        this.removeRequestFromQueue(i.id.toString());
      });
  }
}
class lb {
  constructor() {
    (this.map = new Map()),
      (this.set = (i, r) => {
        const n = this.get(i);
        this.exists(i, r) || this.map.set(i, [...n, r]);
      }),
      (this.get = (i) => this.map.get(i) || []),
      (this.exists = (i, r) => this.get(i).includes(r)),
      (this.delete = (i, r) => {
        if (typeof r > 'u') {
          this.map.delete(i);
          return;
        }
        if (!this.map.has(i)) return;
        const n = this.get(i);
        if (!this.exists(i, r)) return;
        const a = n.filter((l) => l !== r);
        if (!a.length) {
          this.map.delete(i);
          return;
        }
        this.map.set(i, a);
      }),
      (this.clear = () => {
        this.map.clear();
      });
  }
  get topics() {
    return Array.from(this.map.keys());
  }
}
var fb = Object.defineProperty,
  pb = Object.defineProperties,
  db = Object.getOwnPropertyDescriptors,
  al = Object.getOwnPropertySymbols,
  gb = Object.prototype.hasOwnProperty,
  vb = Object.prototype.propertyIsEnumerable,
  ol = (c, i, r) =>
    i in c
      ? fb(c, i, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (c[i] = r),
  qs = (c, i) => {
    for (var r in i || (i = {})) gb.call(i, r) && ol(c, r, i[r]);
    if (al) for (var r of al(i)) vb.call(i, r) && ol(c, r, i[r]);
    return c;
  },
  tc = (c, i) => pb(c, db(i));
class yb extends R1 {
  constructor(i, r) {
    super(i, r),
      (this.relayer = i),
      (this.logger = r),
      (this.subscriptions = new Map()),
      (this.topicMap = new lb()),
      (this.events = new kr.EventEmitter()),
      (this.name = J_),
      (this.version = Q_),
      (this.pending = new Map()),
      (this.cached = []),
      (this.initialized = !1),
      (this.pendingSubscriptionWatchLabel = 'pending_sub_watch_label'),
      (this.pollingInterval = 20),
      (this.storagePrefix = bi),
      (this.subscribeTimeout = 1e4),
      (this.restartInProgress = !1),
      (this.batchSubscribeTopicsLimit = 500),
      (this.init = async () => {
        this.initialized ||
          (this.logger.trace('Initialized'),
          this.registerEventListeners(),
          (this.clientId = await this.relayer.core.crypto.getClientId()));
      }),
      (this.subscribe = async (n, a) => {
        await this.restartToComplete(),
          this.isInitialized(),
          this.logger.debug('Subscribing Topic'),
          this.logger.trace({
            type: 'method',
            method: 'subscribe',
            params: { topic: n, opts: a },
          });
        try {
          const l = uc(a),
            d = { topic: n, relay: l };
          this.pending.set(n, d);
          const v = await this.rpcSubscribe(n, l);
          return (
            this.onSubscribe(v, d),
            this.logger.debug('Successfully Subscribed Topic'),
            this.logger.trace({
              type: 'method',
              method: 'subscribe',
              params: { topic: n, opts: a },
            }),
            v
          );
        } catch (l) {
          throw (
            (this.logger.debug('Failed to Subscribe Topic'),
            this.logger.error(l),
            l)
          );
        }
      }),
      (this.unsubscribe = async (n, a) => {
        await this.restartToComplete(),
          this.isInitialized(),
          typeof (a == null ? void 0 : a.id) < 'u'
            ? await this.unsubscribeById(n, a.id, a)
            : await this.unsubscribeByTopic(n, a);
      }),
      (this.isSubscribed = async (n) =>
        this.topics.includes(n)
          ? !0
          : await new Promise((a, l) => {
              const d = new ie.Watch();
              d.start(this.pendingSubscriptionWatchLabel);
              const v = setInterval(() => {
                !this.pending.has(n) &&
                  this.topics.includes(n) &&
                  (clearInterval(v),
                  d.stop(this.pendingSubscriptionWatchLabel),
                  a(!0)),
                  d.elapsed(this.pendingSubscriptionWatchLabel) >= Y_ &&
                    (clearInterval(v),
                    d.stop(this.pendingSubscriptionWatchLabel),
                    l(new Error('Subscription resolution timeout')));
              }, this.pollingInterval);
            }).catch(() => !1)),
      (this.on = (n, a) => {
        this.events.on(n, a);
      }),
      (this.once = (n, a) => {
        this.events.once(n, a);
      }),
      (this.off = (n, a) => {
        this.events.off(n, a);
      }),
      (this.removeListener = (n, a) => {
        this.events.removeListener(n, a);
      }),
      (this.restart = async () => {
        (this.restartInProgress = !0),
          await this.restore(),
          await this.reset(),
          (this.restartInProgress = !1);
      }),
      (this.relayer = i),
      (this.logger = Se.generateChildLogger(r, this.name)),
      (this.clientId = '');
  }
  get context() {
    return Se.getLoggerContext(this.logger);
  }
  get storageKey() {
    return (
      this.storagePrefix +
      this.version +
      this.relayer.core.customStoragePrefix +
      '//' +
      this.name
    );
  }
  get length() {
    return this.subscriptions.size;
  }
  get ids() {
    return Array.from(this.subscriptions.keys());
  }
  get values() {
    return Array.from(this.subscriptions.values());
  }
  get topics() {
    return this.topicMap.topics;
  }
  hasSubscription(i, r) {
    let n = !1;
    try {
      n = this.getSubscription(i).topic === r;
    } catch {}
    return n;
  }
  onEnable() {
    (this.cached = []), (this.initialized = !0);
  }
  onDisable() {
    (this.cached = this.values),
      this.subscriptions.clear(),
      this.topicMap.clear();
  }
  async unsubscribeByTopic(i, r) {
    const n = this.topicMap.get(i);
    await Promise.all(n.map(async (a) => await this.unsubscribeById(i, a, r)));
  }
  async unsubscribeById(i, r, n) {
    this.logger.debug('Unsubscribing Topic'),
      this.logger.trace({
        type: 'method',
        method: 'unsubscribe',
        params: { topic: i, id: r, opts: n },
      });
    try {
      const a = uc(n);
      await this.rpcUnsubscribe(i, r, a);
      const l = Gt('USER_DISCONNECTED', `${this.name}, ${i}`);
      await this.onUnsubscribe(i, r, l),
        this.logger.debug('Successfully Unsubscribed Topic'),
        this.logger.trace({
          type: 'method',
          method: 'unsubscribe',
          params: { topic: i, id: r, opts: n },
        });
    } catch (a) {
      throw (
        (this.logger.debug('Failed to Unsubscribe Topic'),
        this.logger.error(a),
        a)
      );
    }
  }
  async rpcSubscribe(i, r) {
    const n = { method: ca(r.protocol).subscribe, params: { topic: i } };
    this.logger.debug('Outgoing Relay Payload'),
      this.logger.trace({ type: 'payload', direction: 'outgoing', request: n });
    try {
      await await Bs(this.relayer.request(n), this.subscribeTimeout);
    } catch {
      this.logger.debug('Outgoing Relay Subscribe Payload stalled'),
        this.relayer.events.emit(Wt.connection_stalled);
    }
    return fs(i + this.clientId);
  }
  async rpcBatchSubscribe(i) {
    if (!i.length) return;
    const r = i[0].relay,
      n = {
        method: ca(r.protocol).batchSubscribe,
        params: { topics: i.map((a) => a.topic) },
      };
    this.logger.debug('Outgoing Relay Payload'),
      this.logger.trace({ type: 'payload', direction: 'outgoing', request: n });
    try {
      return await await Bs(this.relayer.request(n), this.subscribeTimeout);
    } catch {
      this.logger.debug('Outgoing Relay Payload stalled'),
        this.relayer.events.emit(Wt.connection_stalled);
    }
  }
  rpcUnsubscribe(i, r, n) {
    const a = {
      method: ca(n.protocol).unsubscribe,
      params: { topic: i, id: r },
    };
    return (
      this.logger.debug('Outgoing Relay Payload'),
      this.logger.trace({ type: 'payload', direction: 'outgoing', request: a }),
      this.relayer.request(a)
    );
  }
  onSubscribe(i, r) {
    this.setSubscription(i, tc(qs({}, r), { id: i })),
      this.pending.delete(r.topic);
  }
  onBatchSubscribe(i) {
    i.length &&
      i.forEach((r) => {
        this.setSubscription(r.id, qs({}, r)), this.pending.delete(r.topic);
      });
  }
  async onUnsubscribe(i, r, n) {
    this.events.removeAllListeners(r),
      this.hasSubscription(r, i) && this.deleteSubscription(r, n),
      await this.relayer.messages.del(i);
  }
  async setRelayerSubscriptions(i) {
    await this.relayer.core.storage.setItem(this.storageKey, i);
  }
  async getRelayerSubscriptions() {
    return await this.relayer.core.storage.getItem(this.storageKey);
  }
  setSubscription(i, r) {
    this.subscriptions.has(i) ||
      (this.logger.debug('Setting subscription'),
      this.logger.trace({
        type: 'method',
        method: 'setSubscription',
        id: i,
        subscription: r,
      }),
      this.addSubscription(i, r));
  }
  addSubscription(i, r) {
    this.subscriptions.set(i, qs({}, r)),
      this.topicMap.set(r.topic, i),
      this.events.emit($r.created, r);
  }
  getSubscription(i) {
    this.logger.debug('Getting subscription'),
      this.logger.trace({ type: 'method', method: 'getSubscription', id: i });
    const r = this.subscriptions.get(i);
    if (!r) {
      const { message: n } = Y('NO_MATCHING_KEY', `${this.name}: ${i}`);
      throw new Error(n);
    }
    return r;
  }
  deleteSubscription(i, r) {
    this.logger.debug('Deleting subscription'),
      this.logger.trace({
        type: 'method',
        method: 'deleteSubscription',
        id: i,
        reason: r,
      });
    const n = this.getSubscription(i);
    this.subscriptions.delete(i),
      this.topicMap.delete(n.topic, i),
      this.events.emit($r.deleted, tc(qs({}, n), { reason: r }));
  }
  async persist() {
    await this.setRelayerSubscriptions(this.values), this.events.emit($r.sync);
  }
  async reset() {
    if (this.cached.length) {
      const i = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
      for (let r = 0; r < i; r++) {
        const n = this.cached.splice(0, this.batchSubscribeTopicsLimit);
        await this.batchSubscribe(n);
      }
    }
    this.events.emit($r.resubscribed);
  }
  async restore() {
    try {
      const i = await this.getRelayerSubscriptions();
      if (typeof i > 'u' || !i.length) return;
      if (this.subscriptions.size) {
        const { message: r } = Y('RESTORE_WILL_OVERRIDE', this.name);
        throw (
          (this.logger.error(r),
          this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`),
          new Error(r))
        );
      }
      (this.cached = i),
        this.logger.debug(
          `Successfully Restored subscriptions for ${this.name}`
        ),
        this.logger.trace({
          type: 'method',
          method: 'restore',
          subscriptions: this.values,
        });
    } catch (i) {
      this.logger.debug(`Failed to Restore subscriptions for ${this.name}`),
        this.logger.error(i);
    }
  }
  async batchSubscribe(i) {
    if (!i.length) return;
    const r = await this.rpcBatchSubscribe(i);
    ps(r) &&
      this.onBatchSubscribe(r.map((n, a) => tc(qs({}, i[a]), { id: n })));
  }
  async onConnect() {
    this.restartInProgress || (await this.restart(), this.onEnable());
  }
  onDisconnect() {
    this.onDisable();
  }
  async checkPending() {
    if (!this.initialized || this.relayer.transportExplicitlyClosed) return;
    const i = [];
    this.pending.forEach((r) => {
      i.push(r);
    }),
      await this.batchSubscribe(i);
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(ds.HEARTBEAT_EVENTS.pulse, async () => {
      await this.checkPending();
    }),
      this.relayer.on(Wt.connect, async () => {
        await this.onConnect();
      }),
      this.relayer.on(Wt.disconnect, () => {
        this.onDisconnect();
      }),
      this.events.on($r.created, async (i) => {
        const r = $r.created;
        this.logger.info(`Emitting ${r}`),
          this.logger.debug({ type: 'event', event: r, data: i }),
          await this.persist();
      }),
      this.events.on($r.deleted, async (i) => {
        const r = $r.deleted;
        this.logger.info(`Emitting ${r}`),
          this.logger.debug({ type: 'event', event: r, data: i }),
          await this.persist();
      });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: i } = Y('NOT_INITIALIZED', this.name);
      throw new Error(i);
    }
  }
  async restartToComplete() {
    this.restartInProgress &&
      (await new Promise((i) => {
        const r = setInterval(() => {
          this.restartInProgress || (clearInterval(r), i());
        }, this.pollingInterval);
      }));
  }
}
var mb = Object.defineProperty,
  cl = Object.getOwnPropertySymbols,
  wb = Object.prototype.hasOwnProperty,
  _b = Object.prototype.propertyIsEnumerable,
  ul = (c, i, r) =>
    i in c
      ? mb(c, i, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (c[i] = r),
  bb = (c, i) => {
    for (var r in i || (i = {})) wb.call(i, r) && ul(c, r, i[r]);
    if (cl) for (var r of cl(i)) _b.call(i, r) && ul(c, r, i[r]);
    return c;
  };
class Eb extends O1 {
  constructor(i) {
    super(i),
      (this.protocol = 'wc'),
      (this.version = 2),
      (this.events = new kr.EventEmitter()),
      (this.name = H_),
      (this.transportExplicitlyClosed = !1),
      (this.initialized = !1),
      (this.connectionAttemptInProgress = !1),
      (this.connectionStatusPollingInterval = 20),
      (this.staleConnectionErrors = ['socket hang up', 'socket stalled']),
      (this.hasExperiencedNetworkDisruption = !1),
      (this.request = async (r) => {
        this.logger.debug('Publishing Request Payload');
        try {
          return (
            await this.toEstablishConnection(), await this.provider.request(r)
          );
        } catch (n) {
          throw (
            (this.logger.debug('Failed to Publish Request'),
            this.logger.error(n),
            n)
          );
        }
      }),
      (this.onPayloadHandler = (r) => {
        this.onProviderPayload(r);
      }),
      (this.onConnectHandler = () => {
        this.events.emit(Wt.connect);
      }),
      (this.onDisconnectHandler = () => {
        this.onProviderDisconnect();
      }),
      (this.onProviderErrorHandler = (r) => {
        this.logger.error(r),
          this.events.emit(Wt.error, r),
          this.logger.info('Fatal socket error received, closing transport'),
          this.transportClose();
      }),
      (this.registerProviderListeners = () => {
        this.provider.on(ri.payload, this.onPayloadHandler),
          this.provider.on(ri.connect, this.onConnectHandler),
          this.provider.on(ri.disconnect, this.onDisconnectHandler),
          this.provider.on(ri.error, this.onProviderErrorHandler);
      }),
      (this.core = i.core),
      (this.logger =
        typeof i.logger < 'u' && typeof i.logger != 'string'
          ? Se.generateChildLogger(i.logger, this.name)
          : Se.pino(Se.getDefaultLoggerOptions({ level: i.logger || U_ }))),
      (this.messages = new ub(this.logger, i.core)),
      (this.subscriber = new yb(this, this.logger)),
      (this.publisher = new hb(this, this.logger)),
      (this.relayUrl = (i == null ? void 0 : i.relayUrl) || cf),
      (this.projectId = i.projectId),
      (this.bundleId = om()),
      (this.provider = {});
  }
  async init() {
    this.logger.trace('Initialized'),
      this.registerEventListeners(),
      await this.createProvider(),
      await Promise.all([this.messages.init(), this.subscriber.init()]);
    try {
      await this.transportOpen();
    } catch {
      this.logger.warn(
        `Connection via ${this.relayUrl} failed, attempting to connect via failover domain ${nl}...`
      ),
        await this.restartTransport(nl);
    }
    (this.initialized = !0),
      setTimeout(async () => {
        this.subscriber.topics.length === 0 &&
          (this.logger.info(
            'No topics subscribed to after init, closing transport'
          ),
          await this.transportClose(),
          (this.transportExplicitlyClosed = !1));
      }, V_);
  }
  get context() {
    return Se.getLoggerContext(this.logger);
  }
  get connected() {
    return this.provider.connection.connected;
  }
  get connecting() {
    return this.provider.connection.connecting;
  }
  async publish(i, r, n) {
    this.isInitialized(),
      await this.publisher.publish(i, r, n),
      await this.recordMessageEvent({
        topic: i,
        message: r,
        publishedAt: Date.now(),
      });
  }
  async subscribe(i, r) {
    var n;
    this.isInitialized();
    let a =
      ((n = this.subscriber.topicMap.get(i)) == null ? void 0 : n[0]) || '';
    if (a) return a;
    let l;
    const d = (v) => {
      v.topic === i && (this.subscriber.off($r.created, d), l());
    };
    return (
      await Promise.all([
        new Promise((v) => {
          (l = v), this.subscriber.on($r.created, d);
        }),
        new Promise(async (v) => {
          (a = await this.subscriber.subscribe(i, r)), v();
        }),
      ]),
      a
    );
  }
  async unsubscribe(i, r) {
    this.isInitialized(), await this.subscriber.unsubscribe(i, r);
  }
  on(i, r) {
    this.events.on(i, r);
  }
  once(i, r) {
    this.events.once(i, r);
  }
  off(i, r) {
    this.events.off(i, r);
  }
  removeListener(i, r) {
    this.events.removeListener(i, r);
  }
  async transportClose() {
    (this.transportExplicitlyClosed = !0),
      this.hasExperiencedNetworkDisruption && this.connected
        ? await Bs(
            this.provider.disconnect(),
            1e3,
            'provider.disconnect()'
          ).catch(() => this.onProviderDisconnect())
        : this.connected && (await this.provider.disconnect());
  }
  async transportOpen(i) {
    if (
      ((this.transportExplicitlyClosed = !1),
      await this.confirmOnlineStateOrThrow(),
      !this.connectionAttemptInProgress)
    ) {
      i &&
        i !== this.relayUrl &&
        ((this.relayUrl = i),
        await this.transportClose(),
        await this.createProvider()),
        (this.connectionAttemptInProgress = !0);
      try {
        await Promise.all([
          new Promise((r) => {
            if (!this.initialized) return r();
            this.subscriber.once($r.resubscribed, () => {
              r();
            });
          }),
          new Promise(async (r, n) => {
            try {
              await Bs(
                this.provider.connect(),
                1e4,
                `Socket stalled when trying to connect to ${this.relayUrl}`
              );
            } catch (a) {
              n(a);
              return;
            }
            r();
          }),
        ]);
      } catch (r) {
        this.logger.error(r);
        const n = r;
        if (!this.isConnectionStalled(n.message)) throw r;
        this.provider.events.emit(ri.disconnect);
      } finally {
        (this.connectionAttemptInProgress = !1),
          (this.hasExperiencedNetworkDisruption = !1);
      }
    }
  }
  async restartTransport(i) {
    await this.confirmOnlineStateOrThrow(),
      !this.connectionAttemptInProgress &&
        ((this.relayUrl = i || this.relayUrl),
        await this.transportClose(),
        await this.createProvider(),
        await this.transportOpen());
  }
  async confirmOnlineStateOrThrow() {
    if (!(await Ah()))
      throw new Error(
        'No internet connection detected. Please restart your network and try again.'
      );
  }
  isConnectionStalled(i) {
    return this.staleConnectionErrors.some((r) => i.includes(r));
  }
  async createProvider() {
    this.provider.connection && this.unregisterProviderListeners();
    const i = await this.core.crypto.signJWT(this.relayUrl);
    (this.provider = new ni(
      new Z1(
        cm({
          sdkVersion: B_,
          protocol: this.protocol,
          version: this.version,
          relayUrl: this.relayUrl,
          projectId: this.projectId,
          auth: i,
          useOnCloseEvent: !0,
          bundleId: this.bundleId,
        })
      )
    )),
      this.registerProviderListeners();
  }
  async recordMessageEvent(i) {
    const { topic: r, message: n } = i;
    await this.messages.set(r, n);
  }
  async shouldIgnoreMessageEvent(i) {
    const { topic: r, message: n } = i;
    if (!n || n.length === 0)
      return this.logger.debug(`Ignoring invalid/empty message: ${n}`), !0;
    if (!(await this.subscriber.isSubscribed(r)))
      return (
        this.logger.debug(`Ignoring message for non-subscribed topic ${r}`), !0
      );
    const a = this.messages.has(r, n);
    return a && this.logger.debug(`Ignoring duplicate message: ${n}`), a;
  }
  async onProviderPayload(i) {
    if (
      (this.logger.debug('Incoming Relay Payload'),
      this.logger.trace({ type: 'payload', direction: 'incoming', payload: i }),
      _c(i))
    ) {
      if (!i.method.endsWith(k_)) return;
      const r = i.params,
        { topic: n, message: a, publishedAt: l } = r.data,
        d = { topic: n, message: a, publishedAt: l };
      this.logger.debug('Emitting Relayer Payload'),
        this.logger.trace(bb({ type: 'event', event: r.id }, d)),
        this.events.emit(r.id, d),
        await this.acknowledgePayload(i),
        await this.onMessageEvent(d);
    } else bc(i) && this.events.emit(Wt.message_ack, i);
  }
  async onMessageEvent(i) {
    (await this.shouldIgnoreMessageEvent(i)) ||
      (this.events.emit(Wt.message, i), await this.recordMessageEvent(i));
  }
  async acknowledgePayload(i) {
    const r = ya(i.id, !0);
    await this.provider.connection.send(r);
  }
  unregisterProviderListeners() {
    this.provider.off(ri.payload, this.onPayloadHandler),
      this.provider.off(ri.connect, this.onConnectHandler),
      this.provider.off(ri.disconnect, this.onDisconnectHandler),
      this.provider.off(ri.error, this.onProviderErrorHandler);
  }
  async registerEventListeners() {
    this.events.on(Wt.connection_stalled, () => {
      this.restartTransport().catch((r) => this.logger.error(r));
    });
    let i = await Ah();
    um(async (r) => {
      this.initialized &&
        i !== r &&
        ((i = r),
        r
          ? await this.restartTransport().catch((n) => this.logger.error(n))
          : ((this.hasExperiencedNetworkDisruption = !0),
            await this.transportClose().catch((n) => this.logger.error(n))));
    });
  }
  onProviderDisconnect() {
    this.events.emit(Wt.disconnect), this.attemptToReconnect();
  }
  attemptToReconnect() {
    this.transportExplicitlyClosed ||
      (this.logger.info('attemptToReconnect called. Connecting...'),
      setTimeout(async () => {
        await this.restartTransport().catch((i) => this.logger.error(i));
      }, ie.toMiliseconds(K_)));
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: i } = Y('NOT_INITIALIZED', this.name);
      throw new Error(i);
    }
  }
  async toEstablishConnection() {
    if ((await this.confirmOnlineStateOrThrow(), !this.connected)) {
      if (this.connectionAttemptInProgress)
        return await new Promise((i) => {
          const r = setInterval(() => {
            this.connected && (clearInterval(r), i());
          }, this.connectionStatusPollingInterval);
        });
      await this.restartTransport();
    }
  }
}
var Ib = Object.defineProperty,
  hl = Object.getOwnPropertySymbols,
  xb = Object.prototype.hasOwnProperty,
  Pb = Object.prototype.propertyIsEnumerable,
  ll = (c, i, r) =>
    i in c
      ? Ib(c, i, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (c[i] = r),
  fl = (c, i) => {
    for (var r in i || (i = {})) xb.call(i, r) && ll(c, r, i[r]);
    if (hl) for (var r of hl(i)) Pb.call(i, r) && ll(c, r, i[r]);
    return c;
  };
class wa extends A1 {
  constructor(i, r, n, a = bi, l = void 0) {
    super(i, r, n, a),
      (this.core = i),
      (this.logger = r),
      (this.name = n),
      (this.map = new Map()),
      (this.version = G_),
      (this.cached = []),
      (this.initialized = !1),
      (this.storagePrefix = bi),
      (this.init = async () => {
        this.initialized ||
          (this.logger.trace('Initialized'),
          await this.restore(),
          this.cached.forEach((d) => {
            this.getKey && d !== null && !_i(d)
              ? this.map.set(this.getKey(d), d)
              : Q0(d)
                ? this.map.set(d.id, d)
                : Y0(d) && this.map.set(d.topic, d);
          }),
          (this.cached = []),
          (this.initialized = !0));
      }),
      (this.set = async (d, v) => {
        this.isInitialized(),
          this.map.has(d)
            ? await this.update(d, v)
            : (this.logger.debug('Setting value'),
              this.logger.trace({
                type: 'method',
                method: 'set',
                key: d,
                value: v,
              }),
              this.map.set(d, v),
              await this.persist());
      }),
      (this.get = (d) => (
        this.isInitialized(),
        this.logger.debug('Getting value'),
        this.logger.trace({ type: 'method', method: 'get', key: d }),
        this.getData(d)
      )),
      (this.getAll = (d) => (
        this.isInitialized(),
        d
          ? this.values.filter((v) =>
              Object.keys(d).every((w) => tw(v[w], d[w]))
            )
          : this.values
      )),
      (this.update = async (d, v) => {
        this.isInitialized(),
          this.logger.debug('Updating value'),
          this.logger.trace({
            type: 'method',
            method: 'update',
            key: d,
            update: v,
          });
        const w = fl(fl({}, this.getData(d)), v);
        this.map.set(d, w), await this.persist();
      }),
      (this.delete = async (d, v) => {
        this.isInitialized(),
          this.map.has(d) &&
            (this.logger.debug('Deleting value'),
            this.logger.trace({
              type: 'method',
              method: 'delete',
              key: d,
              reason: v,
            }),
            this.map.delete(d),
            await this.persist());
      }),
      (this.logger = Se.generateChildLogger(r, this.name)),
      (this.storagePrefix = a),
      (this.getKey = l);
  }
  get context() {
    return Se.getLoggerContext(this.logger);
  }
  get storageKey() {
    return (
      this.storagePrefix +
      this.version +
      this.core.customStoragePrefix +
      '//' +
      this.name
    );
  }
  get length() {
    return this.map.size;
  }
  get keys() {
    return Array.from(this.map.keys());
  }
  get values() {
    return Array.from(this.map.values());
  }
  async setDataStore(i) {
    await this.core.storage.setItem(this.storageKey, i);
  }
  async getDataStore() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getData(i) {
    const r = this.map.get(i);
    if (!r) {
      const { message: n } = Y('NO_MATCHING_KEY', `${this.name}: ${i}`);
      throw (this.logger.error(n), new Error(n));
    }
    return r;
  }
  async persist() {
    await this.setDataStore(this.values);
  }
  async restore() {
    try {
      const i = await this.getDataStore();
      if (typeof i > 'u' || !i.length) return;
      if (this.map.size) {
        const { message: r } = Y('RESTORE_WILL_OVERRIDE', this.name);
        throw (this.logger.error(r), new Error(r));
      }
      (this.cached = i),
        this.logger.debug(`Successfully Restored value for ${this.name}`),
        this.logger.trace({
          type: 'method',
          method: 'restore',
          value: this.values,
        });
    } catch (i) {
      this.logger.debug(`Failed to Restore value for ${this.name}`),
        this.logger.error(i);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: i } = Y('NOT_INITIALIZED', this.name);
      throw new Error(i);
    }
  }
}
class Sb {
  constructor(i, r) {
    (this.core = i),
      (this.logger = r),
      (this.name = X_),
      (this.version = Z_),
      (this.events = new mc()),
      (this.initialized = !1),
      (this.storagePrefix = bi),
      (this.ignoredPayloadTypes = [Tl]),
      (this.registeredMethods = []),
      (this.init = async () => {
        this.initialized ||
          (await this.pairings.init(),
          await this.cleanup(),
          this.registerRelayerEvents(),
          this.registerExpirerEvents(),
          (this.initialized = !0),
          this.logger.trace('Initialized'));
      }),
      (this.register = ({ methods: n }) => {
        this.isInitialized(),
          (this.registeredMethods = [
            ...new Set([...this.registeredMethods, ...n]),
          ]);
      }),
      (this.create = async () => {
        this.isInitialized();
        const n = cc(),
          a = await this.core.crypto.setSymKey(n),
          l = Fr(ie.FIVE_MINUTES),
          d = { protocol: of },
          v = { topic: a, expiry: l, relay: d, active: !1 },
          w = hm({
            protocol: this.core.protocol,
            version: this.core.version,
            topic: a,
            symKey: n,
            relay: d,
          });
        return (
          await this.pairings.set(a, v),
          await this.core.relayer.subscribe(a),
          this.core.expirer.set(a, l),
          { topic: a, uri: w }
        );
      }),
      (this.pair = async (n) => {
        this.isInitialized(), this.isValidPair(n);
        const { topic: a, symKey: l, relay: d } = Rh(n.uri);
        let v;
        if (
          this.pairings.keys.includes(a) &&
          ((v = this.pairings.get(a)), v.active)
        )
          throw new Error(
            `Pairing already exists: ${a}. Please try again with a new connection URI.`
          );
        const w = Fr(ie.FIVE_MINUTES),
          y = { topic: a, relay: d, expiry: w, active: !1 };
        return (
          await this.pairings.set(a, y),
          this.core.expirer.set(a, w),
          n.activatePairing && (await this.activate({ topic: a })),
          this.events.emit(Hs.create, y),
          this.core.crypto.keychain.has(a) ||
            (await this.core.crypto.setSymKey(l, a),
            await this.core.relayer.subscribe(a, { relay: d })),
          y
        );
      }),
      (this.activate = async ({ topic: n }) => {
        this.isInitialized();
        const a = Fr(ie.THIRTY_DAYS);
        await this.pairings.update(n, { active: !0, expiry: a }),
          this.core.expirer.set(n, a);
      }),
      (this.ping = async (n) => {
        this.isInitialized(), await this.isValidPing(n);
        const { topic: a } = n;
        if (this.pairings.keys.includes(a)) {
          const l = await this.sendRequest(a, 'wc_pairingPing', {}),
            { done: d, resolve: v, reject: w } = us();
          this.events.once($t('pairing_ping', l), ({ error: y }) => {
            y ? w(y) : v();
          }),
            await d();
        }
      }),
      (this.updateExpiry = async ({ topic: n, expiry: a }) => {
        this.isInitialized(), await this.pairings.update(n, { expiry: a });
      }),
      (this.updateMetadata = async ({ topic: n, metadata: a }) => {
        this.isInitialized(),
          await this.pairings.update(n, { peerMetadata: a });
      }),
      (this.getPairings = () => (this.isInitialized(), this.pairings.values)),
      (this.disconnect = async (n) => {
        this.isInitialized(), await this.isValidDisconnect(n);
        const { topic: a } = n;
        this.pairings.keys.includes(a) &&
          (await this.sendRequest(
            a,
            'wc_pairingDelete',
            Gt('USER_DISCONNECTED')
          ),
          await this.deletePairing(a));
      }),
      (this.sendRequest = async (n, a, l) => {
        const d = Ks(a, l),
          v = await this.core.crypto.encode(n, d),
          w = Ls[a].req;
        return (
          this.core.history.set(n, d), this.core.relayer.publish(n, v, w), d.id
        );
      }),
      (this.sendResult = async (n, a, l) => {
        const d = ya(n, l),
          v = await this.core.crypto.encode(a, d),
          w = await this.core.history.get(a, n),
          y = Ls[w.request.method].res;
        await this.core.relayer.publish(a, v, y),
          await this.core.history.resolve(d);
      }),
      (this.sendError = async (n, a, l) => {
        const d = wc(n, l),
          v = await this.core.crypto.encode(a, d),
          w = await this.core.history.get(a, n),
          y = Ls[w.request.method]
            ? Ls[w.request.method].res
            : Ls.unregistered_method.res;
        await this.core.relayer.publish(a, v, y),
          await this.core.history.resolve(d);
      }),
      (this.deletePairing = async (n, a) => {
        await this.core.relayer.unsubscribe(n),
          await Promise.all([
            this.pairings.delete(n, Gt('USER_DISCONNECTED')),
            this.core.crypto.deleteSymKey(n),
            a ? Promise.resolve() : this.core.expirer.del(n),
          ]);
      }),
      (this.cleanup = async () => {
        const n = this.pairings.getAll().filter((a) => wi(a.expiry));
        await Promise.all(n.map((a) => this.deletePairing(a.topic)));
      }),
      (this.onRelayEventRequest = (n) => {
        const { topic: a, payload: l } = n;
        switch (l.method) {
          case 'wc_pairingPing':
            return this.onPairingPingRequest(a, l);
          case 'wc_pairingDelete':
            return this.onPairingDeleteRequest(a, l);
          default:
            return this.onUnknownRpcMethodRequest(a, l);
        }
      }),
      (this.onRelayEventResponse = async (n) => {
        const { topic: a, payload: l } = n,
          d = (await this.core.history.get(a, l.id)).request.method;
        switch (d) {
          case 'wc_pairingPing':
            return this.onPairingPingResponse(a, l);
          default:
            return this.onUnknownRpcMethodResponse(d);
        }
      }),
      (this.onPairingPingRequest = async (n, a) => {
        const { id: l } = a;
        try {
          this.isValidPing({ topic: n }),
            await this.sendResult(l, n, !0),
            this.events.emit(Hs.ping, { id: l, topic: n });
        } catch (d) {
          await this.sendError(l, n, d), this.logger.error(d);
        }
      }),
      (this.onPairingPingResponse = (n, a) => {
        const { id: l } = a;
        setTimeout(() => {
          mi(a)
            ? this.events.emit($t('pairing_ping', l), {})
            : si(a) &&
              this.events.emit($t('pairing_ping', l), { error: a.error });
        }, 500);
      }),
      (this.onPairingDeleteRequest = async (n, a) => {
        const { id: l } = a;
        try {
          this.isValidDisconnect({ topic: n }),
            await this.deletePairing(n),
            this.events.emit(Hs.delete, { id: l, topic: n });
        } catch (d) {
          await this.sendError(l, n, d), this.logger.error(d);
        }
      }),
      (this.onUnknownRpcMethodRequest = async (n, a) => {
        const { id: l, method: d } = a;
        try {
          if (this.registeredMethods.includes(d)) return;
          const v = Gt('WC_METHOD_UNSUPPORTED', d);
          await this.sendError(l, n, v), this.logger.error(v);
        } catch (v) {
          await this.sendError(l, n, v), this.logger.error(v);
        }
      }),
      (this.onUnknownRpcMethodResponse = (n) => {
        this.registeredMethods.includes(n) ||
          this.logger.error(Gt('WC_METHOD_UNSUPPORTED', n));
      }),
      (this.isValidPair = (n) => {
        var a;
        if (!hr(n)) {
          const { message: d } = Y('MISSING_OR_INVALID', `pair() params: ${n}`);
          throw new Error(d);
        }
        if (!lm(n.uri)) {
          const { message: d } = Y(
            'MISSING_OR_INVALID',
            `pair() uri: ${n.uri}`
          );
          throw new Error(d);
        }
        const l = Rh(n.uri);
        if (!((a = l == null ? void 0 : l.relay) != null && a.protocol)) {
          const { message: d } = Y(
            'MISSING_OR_INVALID',
            'pair() uri#relay-protocol'
          );
          throw new Error(d);
        }
        if (!(l != null && l.symKey)) {
          const { message: d } = Y('MISSING_OR_INVALID', 'pair() uri#symKey');
          throw new Error(d);
        }
      }),
      (this.isValidPing = async (n) => {
        if (!hr(n)) {
          const { message: l } = Y('MISSING_OR_INVALID', `ping() params: ${n}`);
          throw new Error(l);
        }
        const { topic: a } = n;
        await this.isValidPairingTopic(a);
      }),
      (this.isValidDisconnect = async (n) => {
        if (!hr(n)) {
          const { message: l } = Y(
            'MISSING_OR_INVALID',
            `disconnect() params: ${n}`
          );
          throw new Error(l);
        }
        const { topic: a } = n;
        await this.isValidPairingTopic(a);
      }),
      (this.isValidPairingTopic = async (n) => {
        if (!hs(n, !1)) {
          const { message: a } = Y(
            'MISSING_OR_INVALID',
            `pairing topic should be a string: ${n}`
          );
          throw new Error(a);
        }
        if (!this.pairings.keys.includes(n)) {
          const { message: a } = Y(
            'NO_MATCHING_KEY',
            `pairing topic doesn't exist: ${n}`
          );
          throw new Error(a);
        }
        if (wi(this.pairings.get(n).expiry)) {
          await this.deletePairing(n);
          const { message: a } = Y('EXPIRED', `pairing topic: ${n}`);
          throw new Error(a);
        }
      }),
      (this.core = i),
      (this.logger = Se.generateChildLogger(r, this.name)),
      (this.pairings = new wa(
        this.core,
        this.logger,
        this.name,
        this.storagePrefix
      ));
  }
  get context() {
    return Se.getLoggerContext(this.logger);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: i } = Y('NOT_INITIALIZED', this.name);
      throw new Error(i);
    }
  }
  registerRelayerEvents() {
    this.core.relayer.on(Wt.message, async (i) => {
      const { topic: r, message: n } = i;
      if (
        !this.pairings.keys.includes(r) ||
        this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(n))
      )
        return;
      const a = await this.core.crypto.decode(r, n);
      try {
        _c(a)
          ? (this.core.history.set(r, a),
            this.onRelayEventRequest({ topic: r, payload: a }))
          : bc(a) &&
            (await this.core.history.resolve(a),
            await this.onRelayEventResponse({ topic: r, payload: a }),
            this.core.history.delete(r, a.id));
      } catch (l) {
        this.logger.error(l);
      }
    });
  }
  registerExpirerEvents() {
    this.core.expirer.on(Sr.expired, async (i) => {
      const { topic: r } = Nl(i.target);
      r &&
        this.pairings.keys.includes(r) &&
        (await this.deletePairing(r, !0),
        this.events.emit(Hs.expire, { topic: r }));
    });
  }
}
class Cb extends P1 {
  constructor(i, r) {
    super(i, r),
      (this.core = i),
      (this.logger = r),
      (this.records = new Map()),
      (this.events = new kr.EventEmitter()),
      (this.name = eb),
      (this.version = tb),
      (this.cached = []),
      (this.initialized = !1),
      (this.storagePrefix = bi),
      (this.init = async () => {
        this.initialized ||
          (this.logger.trace('Initialized'),
          await this.restore(),
          this.cached.forEach((n) => this.records.set(n.id, n)),
          (this.cached = []),
          this.registerEventListeners(),
          (this.initialized = !0));
      }),
      (this.set = (n, a, l) => {
        if (
          (this.isInitialized(),
          this.logger.debug('Setting JSON-RPC request history record'),
          this.logger.trace({
            type: 'method',
            method: 'set',
            topic: n,
            request: a,
            chainId: l,
          }),
          this.records.has(a.id))
        )
          return;
        const d = {
          id: a.id,
          topic: n,
          request: { method: a.method, params: a.params || null },
          chainId: l,
          expiry: Fr(ie.THIRTY_DAYS),
        };
        this.records.set(d.id, d), this.events.emit(Hr.created, d);
      }),
      (this.resolve = async (n) => {
        if (
          (this.isInitialized(),
          this.logger.debug('Updating JSON-RPC response history record'),
          this.logger.trace({ type: 'method', method: 'update', response: n }),
          !this.records.has(n.id))
        )
          return;
        const a = await this.getRecord(n.id);
        typeof a.response > 'u' &&
          ((a.response = si(n) ? { error: n.error } : { result: n.result }),
          this.records.set(a.id, a),
          this.events.emit(Hr.updated, a));
      }),
      (this.get = async (n, a) => (
        this.isInitialized(),
        this.logger.debug('Getting record'),
        this.logger.trace({ type: 'method', method: 'get', topic: n, id: a }),
        await this.getRecord(a)
      )),
      (this.delete = (n, a) => {
        this.isInitialized(),
          this.logger.debug('Deleting record'),
          this.logger.trace({ type: 'method', method: 'delete', id: a }),
          this.values.forEach((l) => {
            if (l.topic === n) {
              if (typeof a < 'u' && l.id !== a) return;
              this.records.delete(l.id), this.events.emit(Hr.deleted, l);
            }
          });
      }),
      (this.exists = async (n, a) => (
        this.isInitialized(),
        this.records.has(a) ? (await this.getRecord(a)).topic === n : !1
      )),
      (this.on = (n, a) => {
        this.events.on(n, a);
      }),
      (this.once = (n, a) => {
        this.events.once(n, a);
      }),
      (this.off = (n, a) => {
        this.events.off(n, a);
      }),
      (this.removeListener = (n, a) => {
        this.events.removeListener(n, a);
      }),
      (this.logger = Se.generateChildLogger(r, this.name));
  }
  get context() {
    return Se.getLoggerContext(this.logger);
  }
  get storageKey() {
    return (
      this.storagePrefix +
      this.version +
      this.core.customStoragePrefix +
      '//' +
      this.name
    );
  }
  get size() {
    return this.records.size;
  }
  get keys() {
    return Array.from(this.records.keys());
  }
  get values() {
    return Array.from(this.records.values());
  }
  get pending() {
    const i = [];
    return (
      this.values.forEach((r) => {
        if (typeof r.response < 'u') return;
        const n = {
          topic: r.topic,
          request: Ks(r.request.method, r.request.params, r.id),
          chainId: r.chainId,
        };
        return i.push(n);
      }),
      i
    );
  }
  async setJsonRpcRecords(i) {
    await this.core.storage.setItem(this.storageKey, i);
  }
  async getJsonRpcRecords() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getRecord(i) {
    this.isInitialized();
    const r = this.records.get(i);
    if (!r) {
      const { message: n } = Y('NO_MATCHING_KEY', `${this.name}: ${i}`);
      throw new Error(n);
    }
    return r;
  }
  async persist() {
    await this.setJsonRpcRecords(this.values), this.events.emit(Hr.sync);
  }
  async restore() {
    try {
      const i = await this.getJsonRpcRecords();
      if (typeof i > 'u' || !i.length) return;
      if (this.records.size) {
        const { message: r } = Y('RESTORE_WILL_OVERRIDE', this.name);
        throw (this.logger.error(r), new Error(r));
      }
      (this.cached = i),
        this.logger.debug(`Successfully Restored records for ${this.name}`),
        this.logger.trace({
          type: 'method',
          method: 'restore',
          records: this.values,
        });
    } catch (i) {
      this.logger.debug(`Failed to Restore records for ${this.name}`),
        this.logger.error(i);
    }
  }
  registerEventListeners() {
    this.events.on(Hr.created, (i) => {
      const r = Hr.created;
      this.logger.info(`Emitting ${r}`),
        this.logger.debug({ type: 'event', event: r, record: i }),
        this.persist();
    }),
      this.events.on(Hr.updated, (i) => {
        const r = Hr.updated;
        this.logger.info(`Emitting ${r}`),
          this.logger.debug({ type: 'event', event: r, record: i }),
          this.persist();
      }),
      this.events.on(Hr.deleted, (i) => {
        const r = Hr.deleted;
        this.logger.info(`Emitting ${r}`),
          this.logger.debug({ type: 'event', event: r, record: i }),
          this.persist();
      }),
      this.core.heartbeat.on(ds.HEARTBEAT_EVENTS.pulse, () => {
        this.cleanup();
      });
  }
  cleanup() {
    try {
      this.records.forEach((i) => {
        ie.toMiliseconds(i.expiry || 0) - Date.now() <= 0 &&
          (this.logger.info(`Deleting expired history log: ${i.id}`),
          this.delete(i.topic, i.id));
      });
    } catch (i) {
      this.logger.warn(i);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: i } = Y('NOT_INITIALIZED', this.name);
      throw new Error(i);
    }
  }
}
class Ob extends T1 {
  constructor(i, r) {
    super(i, r),
      (this.core = i),
      (this.logger = r),
      (this.expirations = new Map()),
      (this.events = new kr.EventEmitter()),
      (this.name = rb),
      (this.version = ib),
      (this.cached = []),
      (this.initialized = !1),
      (this.storagePrefix = bi),
      (this.init = async () => {
        this.initialized ||
          (this.logger.trace('Initialized'),
          await this.restore(),
          this.cached.forEach((n) => this.expirations.set(n.target, n)),
          (this.cached = []),
          this.registerEventListeners(),
          (this.initialized = !0));
      }),
      (this.has = (n) => {
        try {
          const a = this.formatTarget(n);
          return typeof this.getExpiration(a) < 'u';
        } catch {
          return !1;
        }
      }),
      (this.set = (n, a) => {
        this.isInitialized();
        const l = this.formatTarget(n),
          d = { target: l, expiry: a };
        this.expirations.set(l, d),
          this.checkExpiry(l, d),
          this.events.emit(Sr.created, { target: l, expiration: d });
      }),
      (this.get = (n) => {
        this.isInitialized();
        const a = this.formatTarget(n);
        return this.getExpiration(a);
      }),
      (this.del = (n) => {
        if ((this.isInitialized(), this.has(n))) {
          const a = this.formatTarget(n),
            l = this.getExpiration(a);
          this.expirations.delete(a),
            this.events.emit(Sr.deleted, { target: a, expiration: l });
        }
      }),
      (this.on = (n, a) => {
        this.events.on(n, a);
      }),
      (this.once = (n, a) => {
        this.events.once(n, a);
      }),
      (this.off = (n, a) => {
        this.events.off(n, a);
      }),
      (this.removeListener = (n, a) => {
        this.events.removeListener(n, a);
      }),
      (this.logger = Se.generateChildLogger(r, this.name));
  }
  get context() {
    return Se.getLoggerContext(this.logger);
  }
  get storageKey() {
    return (
      this.storagePrefix +
      this.version +
      this.core.customStoragePrefix +
      '//' +
      this.name
    );
  }
  get length() {
    return this.expirations.size;
  }
  get keys() {
    return Array.from(this.expirations.keys());
  }
  get values() {
    return Array.from(this.expirations.values());
  }
  formatTarget(i) {
    if (typeof i == 'string') return fm(i);
    if (typeof i == 'number') return pm(i);
    const { message: r } = Y('UNKNOWN_TYPE', `Target type: ${typeof i}`);
    throw new Error(r);
  }
  async setExpirations(i) {
    await this.core.storage.setItem(this.storageKey, i);
  }
  async getExpirations() {
    return await this.core.storage.getItem(this.storageKey);
  }
  async persist() {
    await this.setExpirations(this.values), this.events.emit(Sr.sync);
  }
  async restore() {
    try {
      const i = await this.getExpirations();
      if (typeof i > 'u' || !i.length) return;
      if (this.expirations.size) {
        const { message: r } = Y('RESTORE_WILL_OVERRIDE', this.name);
        throw (this.logger.error(r), new Error(r));
      }
      (this.cached = i),
        this.logger.debug(`Successfully Restored expirations for ${this.name}`),
        this.logger.trace({
          type: 'method',
          method: 'restore',
          expirations: this.values,
        });
    } catch (i) {
      this.logger.debug(`Failed to Restore expirations for ${this.name}`),
        this.logger.error(i);
    }
  }
  getExpiration(i) {
    const r = this.expirations.get(i);
    if (!r) {
      const { message: n } = Y('NO_MATCHING_KEY', `${this.name}: ${i}`);
      throw (this.logger.error(n), new Error(n));
    }
    return r;
  }
  checkExpiry(i, r) {
    const { expiry: n } = r;
    ie.toMiliseconds(n) - Date.now() <= 0 && this.expire(i, r);
  }
  expire(i, r) {
    this.expirations.delete(i),
      this.events.emit(Sr.expired, { target: i, expiration: r });
  }
  checkExpirations() {
    this.core.relayer.connected &&
      this.expirations.forEach((i, r) => this.checkExpiry(r, i));
  }
  registerEventListeners() {
    this.core.heartbeat.on(ds.HEARTBEAT_EVENTS.pulse, () =>
      this.checkExpirations()
    ),
      this.events.on(Sr.created, (i) => {
        const r = Sr.created;
        this.logger.info(`Emitting ${r}`),
          this.logger.debug({ type: 'event', event: r, data: i }),
          this.persist();
      }),
      this.events.on(Sr.expired, (i) => {
        const r = Sr.expired;
        this.logger.info(`Emitting ${r}`),
          this.logger.debug({ type: 'event', event: r, data: i }),
          this.persist();
      }),
      this.events.on(Sr.deleted, (i) => {
        const r = Sr.deleted;
        this.logger.info(`Emitting ${r}`),
          this.logger.debug({ type: 'event', event: r, data: i }),
          this.persist();
      });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: i } = Y('NOT_INITIALIZED', this.name);
      throw new Error(i);
    }
  }
}
class Ab extends N1 {
  constructor(i, r) {
    super(i, r),
      (this.projectId = i),
      (this.logger = r),
      (this.name = ec),
      (this.initialized = !1),
      (this.queue = []),
      (this.verifyDisabled = !1),
      (this.init = async (n) => {
        if (this.verifyDisabled || dm() || !$l()) return;
        const a = this.getVerifyUrl(n == null ? void 0 : n.verifyUrl);
        this.verifyUrl !== a && this.removeIframe(), (this.verifyUrl = a);
        try {
          await this.createIframe();
        } catch (l) {
          this.logger.info(`Verify iframe failed to load: ${this.verifyUrl}`),
            this.logger.info(l);
        }
        if (!this.initialized) {
          this.removeIframe(), (this.verifyUrl = pc);
          try {
            await this.createIframe();
          } catch (l) {
            this.logger.info(`Verify iframe failed to load: ${this.verifyUrl}`),
              this.logger.info(l),
              (this.verifyDisabled = !0);
          }
        }
      }),
      (this.register = async (n) => {
        this.initialized
          ? this.sendPost(n.attestationId)
          : (this.addToQueue(n.attestationId), await this.init());
      }),
      (this.resolve = async (n) => {
        if (this.isDevEnv) return '';
        const a = this.getVerifyUrl(n == null ? void 0 : n.verifyUrl);
        let l;
        try {
          l = await this.fetchAttestation(n.attestationId, a);
        } catch (d) {
          this.logger.info(
            `failed to resolve attestation: ${n.attestationId} from url: ${a}`
          ),
            this.logger.info(d),
            (l = await this.fetchAttestation(n.attestationId, pc));
        }
        return l;
      }),
      (this.fetchAttestation = async (n, a) => {
        this.logger.info(`resolving attestation: ${n} from url: ${a}`);
        const l = this.startAbortTimer(ie.ONE_SECOND * 2),
          d = await fetch(`${a}/attestation/${n}`, {
            signal: this.abortController.signal,
          });
        return clearTimeout(l), d.status === 200 ? await d.json() : void 0;
      }),
      (this.addToQueue = (n) => {
        this.queue.push(n);
      }),
      (this.processQueue = () => {
        this.queue.length !== 0 &&
          (this.queue.forEach((n) => this.sendPost(n)), (this.queue = []));
      }),
      (this.sendPost = (n) => {
        var a;
        try {
          if (!this.iframe) return;
          (a = this.iframe.contentWindow) == null || a.postMessage(n, '*'),
            this.logger.info(`postMessage sent: ${n} ${this.verifyUrl}`);
        } catch {}
      }),
      (this.createIframe = async () => {
        let n;
        const a = (l) => {
          l.data === 'verify_ready' &&
            ((this.initialized = !0),
            this.processQueue(),
            window.removeEventListener('message', a),
            n());
        };
        await Promise.race([
          new Promise((l) => {
            if (document.getElementById(ec)) return l();
            window.addEventListener('message', a);
            const d = document.createElement('iframe');
            (d.id = ec),
              (d.src = `${this.verifyUrl}/${this.projectId}`),
              (d.style.display = 'none'),
              document.body.append(d),
              (this.iframe = d),
              (n = l);
          }),
          new Promise((l, d) =>
            setTimeout(() => {
              window.removeEventListener('message', a),
                d('verify iframe load timeout');
            }, ie.toMiliseconds(ie.FIVE_SECONDS))
          ),
        ]);
      }),
      (this.removeIframe = () => {
        this.iframe &&
          (this.iframe.remove(),
          (this.iframe = void 0),
          (this.initialized = !1));
      }),
      (this.getVerifyUrl = (n) => {
        let a = n || ls;
        return (
          sb.includes(a) ||
            (this.logger.info(
              `verify url: ${a}, not included in trusted list, assigning default: ${ls}`
            ),
            (a = ls)),
          a
        );
      }),
      (this.logger = Se.generateChildLogger(r, this.name)),
      (this.verifyUrl = ls),
      (this.abortController = new AbortController()),
      (this.isDevEnv = gm() && {}.IS_VITEST);
  }
  get context() {
    return Se.getLoggerContext(this.logger);
  }
  startAbortTimer(i) {
    return (
      (this.abortController = new AbortController()),
      setTimeout(() => this.abortController.abort(), ie.toMiliseconds(i))
    );
  }
}
class Rb extends $1 {
  constructor(i, r) {
    super(i, r),
      (this.projectId = i),
      (this.logger = r),
      (this.context = nb),
      (this.registerDeviceToken = async (n) => {
        const {
            clientId: a,
            token: l,
            notificationType: d,
            enableEncrypted: v = !1,
          } = n,
          w = `${ab}/${this.projectId}/clients`;
        await nw(w, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client_id: a,
            type: d,
            token: l,
            always_raw: v,
          }),
        });
      }),
      (this.logger = Se.generateChildLogger(r, this.context));
  }
}
var Tb = Object.defineProperty,
  pl = Object.getOwnPropertySymbols,
  Nb = Object.prototype.hasOwnProperty,
  $b = Object.prototype.propertyIsEnumerable,
  dl = (c, i, r) =>
    i in c
      ? Tb(c, i, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (c[i] = r),
  gl = (c, i) => {
    for (var r in i || (i = {})) Nb.call(i, r) && dl(c, r, i[r]);
    if (pl) for (var r of pl(i)) $b.call(i, r) && dl(c, r, i[r]);
    return c;
  };
class xc extends x1 {
  constructor(i) {
    super(i),
      (this.protocol = af),
      (this.version = R_),
      (this.name = Ic),
      (this.events = new kr.EventEmitter()),
      (this.initialized = !1),
      (this.on = (n, a) => this.events.on(n, a)),
      (this.once = (n, a) => this.events.once(n, a)),
      (this.off = (n, a) => this.events.off(n, a)),
      (this.removeListener = (n, a) => this.events.removeListener(n, a)),
      (this.projectId = i == null ? void 0 : i.projectId),
      (this.relayUrl = (i == null ? void 0 : i.relayUrl) || cf),
      (this.customStoragePrefix =
        i != null && i.customStoragePrefix ? `:${i.customStoragePrefix}` : '');
    const r =
      typeof (i == null ? void 0 : i.logger) < 'u' &&
      typeof (i == null ? void 0 : i.logger) != 'string'
        ? i.logger
        : Se.pino(
            Se.getDefaultLoggerOptions({
              level: (i == null ? void 0 : i.logger) || T_.logger,
            })
          );
    (this.logger = Se.generateChildLogger(r, this.name)),
      (this.heartbeat = new ds.HeartBeat()),
      (this.crypto = new cb(
        this,
        this.logger,
        i == null ? void 0 : i.keychain
      )),
      (this.history = new Cb(this, this.logger)),
      (this.expirer = new Ob(this, this.logger)),
      (this.storage =
        i != null && i.storage
          ? i.storage
          : new g1(gl(gl({}, N_), i == null ? void 0 : i.storageOptions))),
      (this.relayer = new Eb({
        core: this,
        logger: this.logger,
        relayUrl: this.relayUrl,
        projectId: this.projectId,
      })),
      (this.pairing = new Sb(this, this.logger)),
      (this.verify = new Ab(this.projectId || '', this.logger)),
      (this.echoClient = new Rb(this.projectId || '', this.logger));
  }
  static async init(i) {
    const r = new xc(i);
    await r.initialize();
    const n = await r.crypto.getClientId();
    return await r.storage.setItem(W_, n), r;
  }
  get context() {
    return Se.getLoggerContext(this.logger);
  }
  async start() {
    this.initialized || (await this.initialize());
  }
  async initialize() {
    this.logger.trace('Initialized');
    try {
      await this.crypto.init(),
        await this.history.init(),
        await this.expirer.init(),
        await this.relayer.init(),
        await this.heartbeat.init(),
        await this.pairing.init(),
        (this.initialized = !0),
        this.logger.info('Core Initialization Success');
    } catch (i) {
      throw (
        (this.logger.warn(
          `Core Initialization Failure at epoch ${Date.now()}`,
          i
        ),
        this.logger.error(i.message),
        i)
      );
    }
  }
}
const Fb = xc,
  uf = 'wc',
  hf = 2,
  lf = 'client',
  Pc = `${uf}@${hf}:${lf}:`,
  rc = {
    name: lf,
    logger: 'error',
    controller: !1,
    relayUrl: 'wss://relay.walletconnect.com',
  },
  vl = 'WALLETCONNECT_DEEPLINK_CHOICE',
  Db = 'proposal',
  ff = 'Proposal expired',
  Lb = 'session',
  na = ie.SEVEN_DAYS,
  qb = 'engine',
  Ms = {
    wc_sessionPropose: {
      req: { ttl: ie.FIVE_MINUTES, prompt: !0, tag: 1100 },
      res: { ttl: ie.FIVE_MINUTES, prompt: !1, tag: 1101 },
    },
    wc_sessionSettle: {
      req: { ttl: ie.FIVE_MINUTES, prompt: !1, tag: 1102 },
      res: { ttl: ie.FIVE_MINUTES, prompt: !1, tag: 1103 },
    },
    wc_sessionUpdate: {
      req: { ttl: ie.ONE_DAY, prompt: !1, tag: 1104 },
      res: { ttl: ie.ONE_DAY, prompt: !1, tag: 1105 },
    },
    wc_sessionExtend: {
      req: { ttl: ie.ONE_DAY, prompt: !1, tag: 1106 },
      res: { ttl: ie.ONE_DAY, prompt: !1, tag: 1107 },
    },
    wc_sessionRequest: {
      req: { ttl: ie.FIVE_MINUTES, prompt: !0, tag: 1108 },
      res: { ttl: ie.FIVE_MINUTES, prompt: !1, tag: 1109 },
    },
    wc_sessionEvent: {
      req: { ttl: ie.FIVE_MINUTES, prompt: !0, tag: 1110 },
      res: { ttl: ie.FIVE_MINUTES, prompt: !1, tag: 1111 },
    },
    wc_sessionDelete: {
      req: { ttl: ie.ONE_DAY, prompt: !1, tag: 1112 },
      res: { ttl: ie.ONE_DAY, prompt: !1, tag: 1113 },
    },
    wc_sessionPing: {
      req: { ttl: ie.THIRTY_SECONDS, prompt: !1, tag: 1114 },
      res: { ttl: ie.THIRTY_SECONDS, prompt: !1, tag: 1115 },
    },
  },
  ic = { min: ie.FIVE_MINUTES, max: ie.SEVEN_DAYS },
  ii = { idle: 'IDLE', active: 'ACTIVE' },
  Mb = 'request',
  jb = ['wc_sessionPropose', 'wc_sessionRequest', 'wc_authRequest'];
var zb = Object.defineProperty,
  Ub = Object.defineProperties,
  Hb = Object.getOwnPropertyDescriptors,
  yl = Object.getOwnPropertySymbols,
  kb = Object.prototype.hasOwnProperty,
  Kb = Object.prototype.propertyIsEnumerable,
  ml = (c, i, r) =>
    i in c
      ? zb(c, i, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (c[i] = r),
  cr = (c, i) => {
    for (var r in i || (i = {})) kb.call(i, r) && ml(c, r, i[r]);
    if (yl) for (var r of yl(i)) Kb.call(i, r) && ml(c, r, i[r]);
    return c;
  },
  js = (c, i) => Ub(c, Hb(i));
class Bb extends D1 {
  constructor(i) {
    super(i),
      (this.name = qb),
      (this.events = new mc()),
      (this.initialized = !1),
      (this.ignoredPayloadTypes = [Tl]),
      (this.requestQueue = { state: ii.idle, queue: [] }),
      (this.sessionRequestQueue = { state: ii.idle, queue: [] }),
      (this.requestQueueDelay = ie.ONE_SECOND),
      (this.init = async () => {
        this.initialized ||
          (await this.cleanup(),
          this.registerRelayerEvents(),
          this.registerExpirerEvents(),
          this.registerPairingEvents(),
          this.client.core.pairing.register({ methods: Object.keys(Ms) }),
          (this.initialized = !0),
          setTimeout(() => {
            (this.sessionRequestQueue.queue = this.getPendingSessionRequests()),
              this.processSessionRequestQueue();
          }, ie.toMiliseconds(this.requestQueueDelay)));
      }),
      (this.connect = async (r) => {
        await this.isInitialized();
        const n = js(cr({}, r), {
          requiredNamespaces: r.requiredNamespaces || {},
          optionalNamespaces: r.optionalNamespaces || {},
        });
        await this.isValidConnect(n);
        const {
          pairingTopic: a,
          requiredNamespaces: l,
          optionalNamespaces: d,
          sessionProperties: v,
          relays: w,
        } = n;
        let y = a,
          E,
          C = !1;
        if (
          (y && (C = this.client.core.pairing.pairings.get(y).active), !y || !C)
        ) {
          const { topic: he, uri: fe } =
            await this.client.core.pairing.create();
          (y = he), (E = fe);
        }
        const A = await this.client.core.crypto.generateKeyPair(),
          j = cr(
            {
              requiredNamespaces: l,
              optionalNamespaces: d,
              relays: w ?? [{ protocol: of }],
              proposer: { publicKey: A, metadata: this.client.metadata },
            },
            v && { sessionProperties: v }
          ),
          { reject: F, resolve: K, done: re } = us(ie.FIVE_MINUTES, ff);
        if (
          (this.events.once(
            $t('session_connect'),
            async ({ error: he, session: fe }) => {
              if (he) F(he);
              else if (fe) {
                fe.self.publicKey = A;
                const pe = js(cr({}, fe), {
                  requiredNamespaces: fe.requiredNamespaces,
                  optionalNamespaces: fe.optionalNamespaces,
                });
                await this.client.session.set(fe.topic, pe),
                  await this.setExpiry(fe.topic, fe.expiry),
                  y &&
                    (await this.client.core.pairing.updateMetadata({
                      topic: y,
                      metadata: fe.peer.metadata,
                    })),
                  K(pe);
              }
            }
          ),
          !y)
        ) {
          const { message: he } = Y(
            'NO_MATCHING_KEY',
            `connect() pairing topic: ${y}`
          );
          throw new Error(he);
        }
        const ce = await this.sendRequest({
            topic: y,
            method: 'wc_sessionPropose',
            params: j,
          }),
          ue = Fr(ie.FIVE_MINUTES);
        return (
          await this.setProposal(ce, cr({ id: ce, expiry: ue }, j)),
          { uri: E, approval: re }
        );
      }),
      (this.pair = async (r) => (
        await this.isInitialized(), await this.client.core.pairing.pair(r)
      )),
      (this.approve = async (r) => {
        await this.isInitialized(), await this.isValidApprove(r);
        const {
            id: n,
            relayProtocol: a,
            namespaces: l,
            sessionProperties: d,
          } = r,
          v = this.client.proposal.get(n);
        let {
          pairingTopic: w,
          proposer: y,
          requiredNamespaces: E,
          optionalNamespaces: C,
        } = v;
        (w = w || ''), ua(E) || (E = ym(l, 'approve()'));
        const A = await this.client.core.crypto.generateKeyPair(),
          j = y.publicKey,
          F = await this.client.core.crypto.generateSharedKey(A, j);
        w &&
          n &&
          (await this.client.core.pairing.updateMetadata({
            topic: w,
            metadata: y.metadata,
          }),
          await this.sendResult({
            id: n,
            topic: w,
            result: { relay: { protocol: a ?? 'irn' }, responderPublicKey: A },
          }),
          await this.client.proposal.delete(n, Gt('USER_DISCONNECTED')),
          await this.client.core.pairing.activate({ topic: w }));
        const K = cr(
          {
            relay: { protocol: a ?? 'irn' },
            namespaces: l,
            requiredNamespaces: E,
            optionalNamespaces: C,
            pairingTopic: w,
            controller: { publicKey: A, metadata: this.client.metadata },
            expiry: Fr(na),
          },
          d && { sessionProperties: d }
        );
        await this.client.core.relayer.subscribe(F),
          await this.sendRequest({
            topic: F,
            method: 'wc_sessionSettle',
            params: K,
            throwOnFailedPublish: !0,
          });
        const re = js(cr({}, K), {
          topic: F,
          pairingTopic: w,
          acknowledged: !1,
          self: K.controller,
          peer: { publicKey: y.publicKey, metadata: y.metadata },
          controller: A,
        });
        return (
          await this.client.session.set(F, re),
          await this.setExpiry(F, Fr(na)),
          {
            topic: F,
            acknowledged: () =>
              new Promise((ce) =>
                setTimeout(() => ce(this.client.session.get(F)), 500)
              ),
          }
        );
      }),
      (this.reject = async (r) => {
        await this.isInitialized(), await this.isValidReject(r);
        const { id: n, reason: a } = r,
          { pairingTopic: l } = this.client.proposal.get(n);
        l &&
          (await this.sendError(n, l, a),
          await this.client.proposal.delete(n, Gt('USER_DISCONNECTED')));
      }),
      (this.update = async (r) => {
        await this.isInitialized(), await this.isValidUpdate(r);
        const { topic: n, namespaces: a } = r,
          l = await this.sendRequest({
            topic: n,
            method: 'wc_sessionUpdate',
            params: { namespaces: a },
          }),
          { done: d, resolve: v, reject: w } = us();
        return (
          this.events.once($t('session_update', l), ({ error: y }) => {
            y ? w(y) : v();
          }),
          await this.client.session.update(n, { namespaces: a }),
          { acknowledged: d }
        );
      }),
      (this.extend = async (r) => {
        await this.isInitialized(), await this.isValidExtend(r);
        const { topic: n } = r,
          a = await this.sendRequest({
            topic: n,
            method: 'wc_sessionExtend',
            params: {},
          }),
          { done: l, resolve: d, reject: v } = us();
        return (
          this.events.once($t('session_extend', a), ({ error: w }) => {
            w ? v(w) : d();
          }),
          await this.setExpiry(n, Fr(na)),
          { acknowledged: l }
        );
      }),
      (this.request = async (r) => {
        await this.isInitialized(), await this.isValidRequest(r);
        const { chainId: n, request: a, topic: l, expiry: d } = r,
          v = jm(),
          {
            done: w,
            resolve: y,
            reject: E,
          } = us(d, 'Request expired. Please try again.');
        return (
          this.events.once(
            $t('session_request', v),
            ({ error: C, result: A }) => {
              C ? E(C) : y(A);
            }
          ),
          await Promise.all([
            new Promise(async (C) => {
              await this.sendRequest({
                clientRpcId: v,
                topic: l,
                method: 'wc_sessionRequest',
                params: { request: a, chainId: n },
                expiry: d,
                throwOnFailedPublish: !0,
              }).catch((A) => E(A)),
                this.client.events.emit('session_request_sent', {
                  topic: l,
                  request: a,
                  chainId: n,
                  id: v,
                }),
                C();
            }),
            new Promise(async (C) => {
              const A = await mm(this.client.core.storage, vl);
              wm({ id: v, topic: l, wcDeepLink: A }), C();
            }),
            w(),
          ]).then((C) => C[2])
        );
      }),
      (this.respond = async (r) => {
        await this.isInitialized(), await this.isValidRespond(r);
        const { topic: n, response: a } = r,
          { id: l } = a;
        mi(a)
          ? await this.sendResult({
              id: l,
              topic: n,
              result: a.result,
              throwOnFailedPublish: !0,
            })
          : si(a) && (await this.sendError(l, n, a.error)),
          this.cleanupAfterResponse(r);
      }),
      (this.ping = async (r) => {
        await this.isInitialized(), await this.isValidPing(r);
        const { topic: n } = r;
        if (this.client.session.keys.includes(n)) {
          const a = await this.sendRequest({
              topic: n,
              method: 'wc_sessionPing',
              params: {},
            }),
            { done: l, resolve: d, reject: v } = us();
          this.events.once($t('session_ping', a), ({ error: w }) => {
            w ? v(w) : d();
          }),
            await l();
        } else
          this.client.core.pairing.pairings.keys.includes(n) &&
            (await this.client.core.pairing.ping({ topic: n }));
      }),
      (this.emit = async (r) => {
        await this.isInitialized(), await this.isValidEmit(r);
        const { topic: n, event: a, chainId: l } = r;
        await this.sendRequest({
          topic: n,
          method: 'wc_sessionEvent',
          params: { event: a, chainId: l },
        });
      }),
      (this.disconnect = async (r) => {
        await this.isInitialized(), await this.isValidDisconnect(r);
        const { topic: n } = r;
        this.client.session.keys.includes(n)
          ? (await this.sendRequest({
              topic: n,
              method: 'wc_sessionDelete',
              params: Gt('USER_DISCONNECTED'),
              throwOnFailedPublish: !0,
            }),
            await this.deleteSession(n))
          : await this.client.core.pairing.disconnect({ topic: n });
      }),
      (this.find = (r) => (
        this.isInitialized(),
        this.client.session.getAll().filter((n) => _m(n, r))
      )),
      (this.getPendingSessionRequests = () => (
        this.isInitialized(), this.client.pendingRequest.getAll()
      )),
      (this.cleanupDuplicatePairings = async (r) => {
        if (r.pairingTopic)
          try {
            const n = this.client.core.pairing.pairings.get(r.pairingTopic),
              a = this.client.core.pairing.pairings.getAll().filter((l) => {
                var d, v;
                return (
                  ((d = l.peerMetadata) == null ? void 0 : d.url) &&
                  ((v = l.peerMetadata) == null ? void 0 : v.url) ===
                    r.peer.metadata.url &&
                  l.topic &&
                  l.topic !== n.topic
                );
              });
            if (a.length === 0) return;
            this.client.logger.info(
              `Cleaning up ${a.length} duplicate pairing(s)`
            ),
              await Promise.all(
                a.map((l) =>
                  this.client.core.pairing.disconnect({ topic: l.topic })
                )
              ),
              this.client.logger.info('Duplicate pairings clean up finished');
          } catch (n) {
            this.client.logger.error(n);
          }
      }),
      (this.deleteSession = async (r, n) => {
        const { self: a } = this.client.session.get(r);
        await this.client.core.relayer.unsubscribe(r),
          this.client.session.delete(r, Gt('USER_DISCONNECTED')),
          this.client.core.crypto.keychain.has(a.publicKey) &&
            (await this.client.core.crypto.deleteKeyPair(a.publicKey)),
          this.client.core.crypto.keychain.has(r) &&
            (await this.client.core.crypto.deleteSymKey(r)),
          n || this.client.core.expirer.del(r),
          this.client.core.storage
            .removeItem(vl)
            .catch((l) => this.client.logger.warn(l)),
          this.getPendingSessionRequests().forEach((l) => {
            l.topic === r &&
              this.deletePendingSessionRequest(l.id, Gt('USER_DISCONNECTED'));
          });
      }),
      (this.deleteProposal = async (r, n) => {
        await Promise.all([
          this.client.proposal.delete(r, Gt('USER_DISCONNECTED')),
          n ? Promise.resolve() : this.client.core.expirer.del(r),
        ]);
      }),
      (this.deletePendingSessionRequest = async (r, n, a = !1) => {
        await Promise.all([
          this.client.pendingRequest.delete(r, n),
          a ? Promise.resolve() : this.client.core.expirer.del(r),
        ]),
          (this.sessionRequestQueue.queue =
            this.sessionRequestQueue.queue.filter((l) => l.id !== r)),
          a && (this.sessionRequestQueue.state = ii.idle);
      }),
      (this.setExpiry = async (r, n) => {
        this.client.session.keys.includes(r) &&
          (await this.client.session.update(r, { expiry: n })),
          this.client.core.expirer.set(r, n);
      }),
      (this.setProposal = async (r, n) => {
        await this.client.proposal.set(r, n),
          this.client.core.expirer.set(r, n.expiry);
      }),
      (this.setPendingSessionRequest = async (r) => {
        const n = Ms.wc_sessionRequest.req.ttl,
          { id: a, topic: l, params: d, verifyContext: v } = r;
        await this.client.pendingRequest.set(a, {
          id: a,
          topic: l,
          params: d,
          verifyContext: v,
        }),
          n && this.client.core.expirer.set(a, Fr(n));
      }),
      (this.sendRequest = async (r) => {
        const {
            topic: n,
            method: a,
            params: l,
            expiry: d,
            relayRpcId: v,
            clientRpcId: w,
            throwOnFailedPublish: y,
          } = r,
          E = Ks(a, l, w);
        if ($l() && jb.includes(a)) {
          const j = fs(JSON.stringify(E));
          this.client.core.verify.register({ attestationId: j });
        }
        const C = await this.client.core.crypto.encode(n, E),
          A = Ms[a].req;
        return (
          d && (A.ttl = d),
          v && (A.id = v),
          this.client.core.history.set(n, E),
          y
            ? ((A.internal = js(cr({}, A.internal), {
                throwOnFailedPublish: !0,
              })),
              await this.client.core.relayer.publish(n, C, A))
            : this.client.core.relayer
                .publish(n, C, A)
                .catch((j) => this.client.logger.error(j)),
          E.id
        );
      }),
      (this.sendResult = async (r) => {
        const { id: n, topic: a, result: l, throwOnFailedPublish: d } = r,
          v = ya(n, l),
          w = await this.client.core.crypto.encode(a, v),
          y = await this.client.core.history.get(a, n),
          E = Ms[y.request.method].res;
        d
          ? ((E.internal = js(cr({}, E.internal), {
              throwOnFailedPublish: !0,
            })),
            await this.client.core.relayer.publish(a, w, E))
          : this.client.core.relayer
              .publish(a, w, E)
              .catch((C) => this.client.logger.error(C)),
          await this.client.core.history.resolve(v);
      }),
      (this.sendError = async (r, n, a) => {
        const l = wc(r, a),
          d = await this.client.core.crypto.encode(n, l),
          v = await this.client.core.history.get(n, r),
          w = Ms[v.request.method].res;
        this.client.core.relayer.publish(n, d, w),
          await this.client.core.history.resolve(l);
      }),
      (this.cleanup = async () => {
        const r = [],
          n = [];
        this.client.session.getAll().forEach((a) => {
          wi(a.expiry) && r.push(a.topic);
        }),
          this.client.proposal.getAll().forEach((a) => {
            wi(a.expiry) && n.push(a.id);
          }),
          await Promise.all([
            ...r.map((a) => this.deleteSession(a)),
            ...n.map((a) => this.deleteProposal(a)),
          ]);
      }),
      (this.onRelayEventRequest = async (r) => {
        this.requestQueue.queue.push(r), await this.processRequestsQueue();
      }),
      (this.processRequestsQueue = async () => {
        if (this.requestQueue.state === ii.active) {
          this.client.logger.info('Request queue already active, skipping...');
          return;
        }
        for (
          this.client.logger.info(
            `Request queue starting with ${this.requestQueue.queue.length} requests`
          );
          this.requestQueue.queue.length > 0;

        ) {
          this.requestQueue.state = ii.active;
          const r = this.requestQueue.queue.shift();
          if (r)
            try {
              this.processRequest(r),
                await new Promise((n) => setTimeout(n, 300));
            } catch (n) {
              this.client.logger.warn(n);
            }
        }
        this.requestQueue.state = ii.idle;
      }),
      (this.processRequest = (r) => {
        const { topic: n, payload: a } = r,
          l = a.method;
        switch (l) {
          case 'wc_sessionPropose':
            return this.onSessionProposeRequest(n, a);
          case 'wc_sessionSettle':
            return this.onSessionSettleRequest(n, a);
          case 'wc_sessionUpdate':
            return this.onSessionUpdateRequest(n, a);
          case 'wc_sessionExtend':
            return this.onSessionExtendRequest(n, a);
          case 'wc_sessionPing':
            return this.onSessionPingRequest(n, a);
          case 'wc_sessionDelete':
            return this.onSessionDeleteRequest(n, a);
          case 'wc_sessionRequest':
            return this.onSessionRequest(n, a);
          case 'wc_sessionEvent':
            return this.onSessionEventRequest(n, a);
          default:
            return this.client.logger.info(`Unsupported request method ${l}`);
        }
      }),
      (this.onRelayEventResponse = async (r) => {
        const { topic: n, payload: a } = r,
          l = (await this.client.core.history.get(n, a.id)).request.method;
        switch (l) {
          case 'wc_sessionPropose':
            return this.onSessionProposeResponse(n, a);
          case 'wc_sessionSettle':
            return this.onSessionSettleResponse(n, a);
          case 'wc_sessionUpdate':
            return this.onSessionUpdateResponse(n, a);
          case 'wc_sessionExtend':
            return this.onSessionExtendResponse(n, a);
          case 'wc_sessionPing':
            return this.onSessionPingResponse(n, a);
          case 'wc_sessionRequest':
            return this.onSessionRequestResponse(n, a);
          default:
            return this.client.logger.info(`Unsupported response method ${l}`);
        }
      }),
      (this.onRelayEventUnknownPayload = (r) => {
        const { topic: n } = r,
          { message: a } = Y(
            'MISSING_OR_INVALID',
            `Decoded payload on topic ${n} is not identifiable as a JSON-RPC request or a response.`
          );
        throw new Error(a);
      }),
      (this.onSessionProposeRequest = async (r, n) => {
        const { params: a, id: l } = n;
        try {
          this.isValidConnect(cr({}, n.params));
          const d = Fr(ie.FIVE_MINUTES),
            v = cr({ id: l, pairingTopic: r, expiry: d }, a);
          await this.setProposal(l, v);
          const w = fs(JSON.stringify(n)),
            y = await this.getVerifyContext(w, v.proposer.metadata);
          this.client.events.emit('session_proposal', {
            id: l,
            params: v,
            verifyContext: y,
          });
        } catch (d) {
          await this.sendError(l, r, d), this.client.logger.error(d);
        }
      }),
      (this.onSessionProposeResponse = async (r, n) => {
        const { id: a } = n;
        if (mi(n)) {
          const { result: l } = n;
          this.client.logger.trace({
            type: 'method',
            method: 'onSessionProposeResponse',
            result: l,
          });
          const d = this.client.proposal.get(a);
          this.client.logger.trace({
            type: 'method',
            method: 'onSessionProposeResponse',
            proposal: d,
          });
          const v = d.proposer.publicKey;
          this.client.logger.trace({
            type: 'method',
            method: 'onSessionProposeResponse',
            selfPublicKey: v,
          });
          const w = l.responderPublicKey;
          this.client.logger.trace({
            type: 'method',
            method: 'onSessionProposeResponse',
            peerPublicKey: w,
          });
          const y = await this.client.core.crypto.generateSharedKey(v, w);
          this.client.logger.trace({
            type: 'method',
            method: 'onSessionProposeResponse',
            sessionTopic: y,
          });
          const E = await this.client.core.relayer.subscribe(y);
          this.client.logger.trace({
            type: 'method',
            method: 'onSessionProposeResponse',
            subscriptionId: E,
          }),
            await this.client.core.pairing.activate({ topic: r });
        } else
          si(n) &&
            (await this.client.proposal.delete(a, Gt('USER_DISCONNECTED')),
            this.events.emit($t('session_connect'), { error: n.error }));
      }),
      (this.onSessionSettleRequest = async (r, n) => {
        const { id: a, params: l } = n;
        try {
          this.isValidSessionSettleRequest(l);
          const {
              relay: d,
              controller: v,
              expiry: w,
              namespaces: y,
              requiredNamespaces: E,
              optionalNamespaces: C,
              sessionProperties: A,
              pairingTopic: j,
            } = n.params,
            F = cr(
              {
                topic: r,
                relay: d,
                expiry: w,
                namespaces: y,
                acknowledged: !0,
                pairingTopic: j,
                requiredNamespaces: E,
                optionalNamespaces: C,
                controller: v.publicKey,
                self: { publicKey: '', metadata: this.client.metadata },
                peer: { publicKey: v.publicKey, metadata: v.metadata },
              },
              A && { sessionProperties: A }
            );
          await this.sendResult({ id: n.id, topic: r, result: !0 }),
            this.events.emit($t('session_connect'), { session: F }),
            this.cleanupDuplicatePairings(F);
        } catch (d) {
          await this.sendError(a, r, d), this.client.logger.error(d);
        }
      }),
      (this.onSessionSettleResponse = async (r, n) => {
        const { id: a } = n;
        mi(n)
          ? (await this.client.session.update(r, { acknowledged: !0 }),
            this.events.emit($t('session_approve', a), {}))
          : si(n) &&
            (await this.client.session.delete(r, Gt('USER_DISCONNECTED')),
            this.events.emit($t('session_approve', a), { error: n.error }));
      }),
      (this.onSessionUpdateRequest = async (r, n) => {
        const { params: a, id: l } = n;
        try {
          const d = `${r}_session_update`,
            v = ta.get(d);
          if (v && this.isRequestOutOfSync(v, l)) {
            this.client.logger.info(`Discarding out of sync request - ${l}`);
            return;
          }
          this.isValidUpdate(cr({ topic: r }, a)),
            await this.client.session.update(r, { namespaces: a.namespaces }),
            await this.sendResult({ id: l, topic: r, result: !0 }),
            this.client.events.emit('session_update', {
              id: l,
              topic: r,
              params: a,
            }),
            ta.set(d, l);
        } catch (d) {
          await this.sendError(l, r, d), this.client.logger.error(d);
        }
      }),
      (this.isRequestOutOfSync = (r, n) =>
        parseInt(n.toString().slice(0, -3)) <=
        parseInt(r.toString().slice(0, -3))),
      (this.onSessionUpdateResponse = (r, n) => {
        const { id: a } = n;
        mi(n)
          ? this.events.emit($t('session_update', a), {})
          : si(n) &&
            this.events.emit($t('session_update', a), { error: n.error });
      }),
      (this.onSessionExtendRequest = async (r, n) => {
        const { id: a } = n;
        try {
          this.isValidExtend({ topic: r }),
            await this.setExpiry(r, Fr(na)),
            await this.sendResult({ id: a, topic: r, result: !0 }),
            this.client.events.emit('session_extend', { id: a, topic: r });
        } catch (l) {
          await this.sendError(a, r, l), this.client.logger.error(l);
        }
      }),
      (this.onSessionExtendResponse = (r, n) => {
        const { id: a } = n;
        mi(n)
          ? this.events.emit($t('session_extend', a), {})
          : si(n) &&
            this.events.emit($t('session_extend', a), { error: n.error });
      }),
      (this.onSessionPingRequest = async (r, n) => {
        const { id: a } = n;
        try {
          this.isValidPing({ topic: r }),
            await this.sendResult({ id: a, topic: r, result: !0 }),
            this.client.events.emit('session_ping', { id: a, topic: r });
        } catch (l) {
          await this.sendError(a, r, l), this.client.logger.error(l);
        }
      }),
      (this.onSessionPingResponse = (r, n) => {
        const { id: a } = n;
        setTimeout(() => {
          mi(n)
            ? this.events.emit($t('session_ping', a), {})
            : si(n) &&
              this.events.emit($t('session_ping', a), { error: n.error });
        }, 500);
      }),
      (this.onSessionDeleteRequest = async (r, n) => {
        const { id: a } = n;
        try {
          this.isValidDisconnect({ topic: r, reason: n.params }),
            await Promise.all([
              new Promise((l) => {
                this.client.core.relayer.once(Wt.publish, async () => {
                  l(await this.deleteSession(r));
                });
              }),
              this.sendResult({ id: a, topic: r, result: !0 }),
            ]),
            this.client.events.emit('session_delete', { id: a, topic: r });
        } catch (l) {
          this.client.logger.error(l);
        }
      }),
      (this.onSessionRequest = async (r, n) => {
        const { id: a, params: l } = n;
        try {
          this.isValidRequest(cr({ topic: r }, l));
          const d = fs(JSON.stringify(Ks('wc_sessionRequest', l, a))),
            v = this.client.session.get(r),
            w = await this.getVerifyContext(d, v.peer.metadata),
            y = { id: a, topic: r, params: l, verifyContext: w };
          await this.setPendingSessionRequest(y),
            this.addSessionRequestToSessionRequestQueue(y),
            this.processSessionRequestQueue();
        } catch (d) {
          await this.sendError(a, r, d), this.client.logger.error(d);
        }
      }),
      (this.onSessionRequestResponse = (r, n) => {
        const { id: a } = n;
        mi(n)
          ? this.events.emit($t('session_request', a), { result: n.result })
          : si(n) &&
            this.events.emit($t('session_request', a), { error: n.error });
      }),
      (this.onSessionEventRequest = async (r, n) => {
        const { id: a, params: l } = n;
        try {
          const d = `${r}_session_event_${l.event.name}`,
            v = ta.get(d);
          if (v && this.isRequestOutOfSync(v, a)) {
            this.client.logger.info(`Discarding out of sync request - ${a}`);
            return;
          }
          this.isValidEmit(cr({ topic: r }, l)),
            this.client.events.emit('session_event', {
              id: a,
              topic: r,
              params: l,
            }),
            ta.set(d, a);
        } catch (d) {
          await this.sendError(a, r, d), this.client.logger.error(d);
        }
      }),
      (this.addSessionRequestToSessionRequestQueue = (r) => {
        this.sessionRequestQueue.queue.push(r);
      }),
      (this.cleanupAfterResponse = (r) => {
        this.deletePendingSessionRequest(r.response.id, {
          message: 'fulfilled',
          code: 0,
        }),
          setTimeout(() => {
            (this.sessionRequestQueue.state = ii.idle),
              this.processSessionRequestQueue();
          }, ie.toMiliseconds(this.requestQueueDelay));
      }),
      (this.processSessionRequestQueue = () => {
        if (this.sessionRequestQueue.state === ii.active) {
          this.client.logger.info('session request queue is already active.');
          return;
        }
        const r = this.sessionRequestQueue.queue[0];
        if (!r) {
          this.client.logger.info('session request queue is empty.');
          return;
        }
        try {
          (this.sessionRequestQueue.state = ii.active),
            this.client.events.emit('session_request', r);
        } catch (n) {
          this.client.logger.error(n);
        }
      }),
      (this.onPairingCreated = (r) => {
        if (r.active) return;
        const n = this.client.proposal
          .getAll()
          .find((a) => a.pairingTopic === r.topic);
        n &&
          this.onSessionProposeRequest(
            r.topic,
            Ks(
              'wc_sessionPropose',
              {
                requiredNamespaces: n.requiredNamespaces,
                optionalNamespaces: n.optionalNamespaces,
                relays: n.relays,
                proposer: n.proposer,
                sessionProperties: n.sessionProperties,
              },
              n.id
            )
          );
      }),
      (this.isValidConnect = async (r) => {
        if (!hr(r)) {
          const { message: w } = Y(
            'MISSING_OR_INVALID',
            `connect() params: ${JSON.stringify(r)}`
          );
          throw new Error(w);
        }
        const {
          pairingTopic: n,
          requiredNamespaces: a,
          optionalNamespaces: l,
          sessionProperties: d,
          relays: v,
        } = r;
        if ((_i(n) || (await this.isValidPairingTopic(n)), !bm(v, !0))) {
          const { message: w } = Y(
            'MISSING_OR_INVALID',
            `connect() relays: ${v}`
          );
          throw new Error(w);
        }
        !_i(a) &&
          ua(a) !== 0 &&
          this.validateNamespaces(a, 'requiredNamespaces'),
          !_i(l) &&
            ua(l) !== 0 &&
            this.validateNamespaces(l, 'optionalNamespaces'),
          _i(d) || this.validateSessionProps(d, 'sessionProperties');
      }),
      (this.validateNamespaces = (r, n) => {
        const a = Em(r, 'connect()', n);
        if (a) throw new Error(a.message);
      }),
      (this.isValidApprove = async (r) => {
        if (!hr(r))
          throw new Error(
            Y('MISSING_OR_INVALID', `approve() params: ${r}`).message
          );
        const {
          id: n,
          namespaces: a,
          relayProtocol: l,
          sessionProperties: d,
        } = r;
        await this.isValidProposalId(n);
        const v = this.client.proposal.get(n),
          w = Bo(a, 'approve()');
        if (w) throw new Error(w.message);
        const y = Th(v.requiredNamespaces, a, 'approve()');
        if (y) throw new Error(y.message);
        if (!hs(l, !0)) {
          const { message: E } = Y(
            'MISSING_OR_INVALID',
            `approve() relayProtocol: ${l}`
          );
          throw new Error(E);
        }
        _i(d) || this.validateSessionProps(d, 'sessionProperties');
      }),
      (this.isValidReject = async (r) => {
        if (!hr(r)) {
          const { message: l } = Y(
            'MISSING_OR_INVALID',
            `reject() params: ${r}`
          );
          throw new Error(l);
        }
        const { id: n, reason: a } = r;
        if ((await this.isValidProposalId(n), !Im(a))) {
          const { message: l } = Y(
            'MISSING_OR_INVALID',
            `reject() reason: ${JSON.stringify(a)}`
          );
          throw new Error(l);
        }
      }),
      (this.isValidSessionSettleRequest = (r) => {
        if (!hr(r)) {
          const { message: y } = Y(
            'MISSING_OR_INVALID',
            `onSessionSettleRequest() params: ${r}`
          );
          throw new Error(y);
        }
        const { relay: n, controller: a, namespaces: l, expiry: d } = r;
        if (!xm(n)) {
          const { message: y } = Y(
            'MISSING_OR_INVALID',
            'onSessionSettleRequest() relay protocol should be a string'
          );
          throw new Error(y);
        }
        const v = Pm(a, 'onSessionSettleRequest()');
        if (v) throw new Error(v.message);
        const w = Bo(l, 'onSessionSettleRequest()');
        if (w) throw new Error(w.message);
        if (wi(d)) {
          const { message: y } = Y('EXPIRED', 'onSessionSettleRequest()');
          throw new Error(y);
        }
      }),
      (this.isValidUpdate = async (r) => {
        if (!hr(r)) {
          const { message: w } = Y(
            'MISSING_OR_INVALID',
            `update() params: ${r}`
          );
          throw new Error(w);
        }
        const { topic: n, namespaces: a } = r;
        await this.isValidSessionTopic(n);
        const l = this.client.session.get(n),
          d = Bo(a, 'update()');
        if (d) throw new Error(d.message);
        const v = Th(l.requiredNamespaces, a, 'update()');
        if (v) throw new Error(v.message);
      }),
      (this.isValidExtend = async (r) => {
        if (!hr(r)) {
          const { message: a } = Y(
            'MISSING_OR_INVALID',
            `extend() params: ${r}`
          );
          throw new Error(a);
        }
        const { topic: n } = r;
        await this.isValidSessionTopic(n);
      }),
      (this.isValidRequest = async (r) => {
        if (!hr(r)) {
          const { message: w } = Y(
            'MISSING_OR_INVALID',
            `request() params: ${r}`
          );
          throw new Error(w);
        }
        const { topic: n, request: a, chainId: l, expiry: d } = r;
        await this.isValidSessionTopic(n);
        const { namespaces: v } = this.client.session.get(n);
        if (!Nh(v, l)) {
          const { message: w } = Y(
            'MISSING_OR_INVALID',
            `request() chainId: ${l}`
          );
          throw new Error(w);
        }
        if (!Sm(a)) {
          const { message: w } = Y(
            'MISSING_OR_INVALID',
            `request() ${JSON.stringify(a)}`
          );
          throw new Error(w);
        }
        if (!Cm(v, l, a.method)) {
          const { message: w } = Y(
            'MISSING_OR_INVALID',
            `request() method: ${a.method}`
          );
          throw new Error(w);
        }
        if (d && !Om(d, ic)) {
          const { message: w } = Y(
            'MISSING_OR_INVALID',
            `request() expiry: ${d}. Expiry must be a number (in seconds) between ${ic.min} and ${ic.max}`
          );
          throw new Error(w);
        }
      }),
      (this.isValidRespond = async (r) => {
        var n;
        if (!hr(r)) {
          const { message: d } = Y(
            'MISSING_OR_INVALID',
            `respond() params: ${r}`
          );
          throw new Error(d);
        }
        const { topic: a, response: l } = r;
        try {
          await this.isValidSessionTopic(a);
        } catch (d) {
          throw (
            ((n = r == null ? void 0 : r.response) != null &&
              n.id &&
              this.cleanupAfterResponse(r),
            d)
          );
        }
        if (!Am(l)) {
          const { message: d } = Y(
            'MISSING_OR_INVALID',
            `respond() response: ${JSON.stringify(l)}`
          );
          throw new Error(d);
        }
      }),
      (this.isValidPing = async (r) => {
        if (!hr(r)) {
          const { message: a } = Y('MISSING_OR_INVALID', `ping() params: ${r}`);
          throw new Error(a);
        }
        const { topic: n } = r;
        await this.isValidSessionOrPairingTopic(n);
      }),
      (this.isValidEmit = async (r) => {
        if (!hr(r)) {
          const { message: v } = Y('MISSING_OR_INVALID', `emit() params: ${r}`);
          throw new Error(v);
        }
        const { topic: n, event: a, chainId: l } = r;
        await this.isValidSessionTopic(n);
        const { namespaces: d } = this.client.session.get(n);
        if (!Nh(d, l)) {
          const { message: v } = Y(
            'MISSING_OR_INVALID',
            `emit() chainId: ${l}`
          );
          throw new Error(v);
        }
        if (!Rm(a)) {
          const { message: v } = Y(
            'MISSING_OR_INVALID',
            `emit() event: ${JSON.stringify(a)}`
          );
          throw new Error(v);
        }
        if (!Tm(d, l, a.name)) {
          const { message: v } = Y(
            'MISSING_OR_INVALID',
            `emit() event: ${JSON.stringify(a)}`
          );
          throw new Error(v);
        }
      }),
      (this.isValidDisconnect = async (r) => {
        if (!hr(r)) {
          const { message: a } = Y(
            'MISSING_OR_INVALID',
            `disconnect() params: ${r}`
          );
          throw new Error(a);
        }
        const { topic: n } = r;
        await this.isValidSessionOrPairingTopic(n);
      }),
      (this.getVerifyContext = async (r, n) => {
        const a = {
          verified: {
            verifyUrl: n.verifyUrl || ls,
            validation: 'UNKNOWN',
            origin: n.url || '',
          },
        };
        try {
          const l = await this.client.core.verify.resolve({
            attestationId: r,
            verifyUrl: n.verifyUrl,
          });
          l &&
            ((a.verified.origin = l.origin),
            (a.verified.isScam = l.isScam),
            (a.verified.validation =
              l.origin === new URL(n.url).origin ? 'VALID' : 'INVALID'));
        } catch (l) {
          this.client.logger.info(l);
        }
        return (
          this.client.logger.info(`Verify context: ${JSON.stringify(a)}`), a
        );
      }),
      (this.validateSessionProps = (r, n) => {
        Object.values(r).forEach((a) => {
          if (!hs(a, !1)) {
            const { message: l } = Y(
              'MISSING_OR_INVALID',
              `${n} must be in Record<string, string> format. Received: ${JSON.stringify(a)}`
            );
            throw new Error(l);
          }
        });
      });
  }
  async isInitialized() {
    if (!this.initialized) {
      const { message: i } = Y('NOT_INITIALIZED', this.name);
      throw new Error(i);
    }
    await this.client.core.relayer.confirmOnlineStateOrThrow();
  }
  registerRelayerEvents() {
    this.client.core.relayer.on(Wt.message, async (i) => {
      const { topic: r, message: n } = i;
      if (
        this.ignoredPayloadTypes.includes(
          this.client.core.crypto.getPayloadType(n)
        )
      )
        return;
      const a = await this.client.core.crypto.decode(r, n);
      try {
        _c(a)
          ? (this.client.core.history.set(r, a),
            this.onRelayEventRequest({ topic: r, payload: a }))
          : bc(a)
            ? (await this.client.core.history.resolve(a),
              await this.onRelayEventResponse({ topic: r, payload: a }),
              this.client.core.history.delete(r, a.id))
            : this.onRelayEventUnknownPayload({ topic: r, payload: a });
      } catch (l) {
        this.client.logger.error(l);
      }
    });
  }
  registerExpirerEvents() {
    this.client.core.expirer.on(Sr.expired, async (i) => {
      const { topic: r, id: n } = Nl(i.target);
      if (n && this.client.pendingRequest.keys.includes(n))
        return await this.deletePendingSessionRequest(n, Y('EXPIRED'), !0);
      r
        ? this.client.session.keys.includes(r) &&
          (await this.deleteSession(r, !0),
          this.client.events.emit('session_expire', { topic: r }))
        : n &&
          (await this.deleteProposal(n, !0),
          this.client.events.emit('proposal_expire', { id: n }));
    });
  }
  registerPairingEvents() {
    this.client.core.pairing.events.on(Hs.create, (i) =>
      this.onPairingCreated(i)
    );
  }
  isValidPairingTopic(i) {
    if (!hs(i, !1)) {
      const { message: r } = Y(
        'MISSING_OR_INVALID',
        `pairing topic should be a string: ${i}`
      );
      throw new Error(r);
    }
    if (!this.client.core.pairing.pairings.keys.includes(i)) {
      const { message: r } = Y(
        'NO_MATCHING_KEY',
        `pairing topic doesn't exist: ${i}`
      );
      throw new Error(r);
    }
    if (wi(this.client.core.pairing.pairings.get(i).expiry)) {
      const { message: r } = Y('EXPIRED', `pairing topic: ${i}`);
      throw new Error(r);
    }
  }
  async isValidSessionTopic(i) {
    if (!hs(i, !1)) {
      const { message: r } = Y(
        'MISSING_OR_INVALID',
        `session topic should be a string: ${i}`
      );
      throw new Error(r);
    }
    if (!this.client.session.keys.includes(i)) {
      const { message: r } = Y(
        'NO_MATCHING_KEY',
        `session topic doesn't exist: ${i}`
      );
      throw new Error(r);
    }
    if (wi(this.client.session.get(i).expiry)) {
      await this.deleteSession(i);
      const { message: r } = Y('EXPIRED', `session topic: ${i}`);
      throw new Error(r);
    }
  }
  async isValidSessionOrPairingTopic(i) {
    if (this.client.session.keys.includes(i)) await this.isValidSessionTopic(i);
    else if (this.client.core.pairing.pairings.keys.includes(i))
      this.isValidPairingTopic(i);
    else if (hs(i, !1)) {
      const { message: r } = Y(
        'NO_MATCHING_KEY',
        `session or pairing topic doesn't exist: ${i}`
      );
      throw new Error(r);
    } else {
      const { message: r } = Y(
        'MISSING_OR_INVALID',
        `session or pairing topic should be a string: ${i}`
      );
      throw new Error(r);
    }
  }
  async isValidProposalId(i) {
    if (!Nm(i)) {
      const { message: r } = Y(
        'MISSING_OR_INVALID',
        `proposal id should be a number: ${i}`
      );
      throw new Error(r);
    }
    if (!this.client.proposal.keys.includes(i)) {
      const { message: r } = Y(
        'NO_MATCHING_KEY',
        `proposal id doesn't exist: ${i}`
      );
      throw new Error(r);
    }
    if (wi(this.client.proposal.get(i).expiry)) {
      await this.deleteProposal(i);
      const { message: r } = Y('EXPIRED', `proposal id: ${i}`);
      throw new Error(r);
    }
  }
}
class Vb extends wa {
  constructor(i, r) {
    super(i, r, Db, Pc), (this.core = i), (this.logger = r);
  }
}
class Gb extends wa {
  constructor(i, r) {
    super(i, r, Lb, Pc), (this.core = i), (this.logger = r);
  }
}
class Wb extends wa {
  constructor(i, r) {
    super(i, r, Mb, Pc, (n) => n.id), (this.core = i), (this.logger = r);
  }
}
let Jb = class pf extends F1 {
  constructor(i) {
    super(i),
      (this.protocol = uf),
      (this.version = hf),
      (this.name = rc.name),
      (this.events = new kr.EventEmitter()),
      (this.on = (n, a) => this.events.on(n, a)),
      (this.once = (n, a) => this.events.once(n, a)),
      (this.off = (n, a) => this.events.off(n, a)),
      (this.removeListener = (n, a) => this.events.removeListener(n, a)),
      (this.removeAllListeners = (n) => this.events.removeAllListeners(n)),
      (this.connect = async (n) => {
        try {
          return await this.engine.connect(n);
        } catch (a) {
          throw (this.logger.error(a.message), a);
        }
      }),
      (this.pair = async (n) => {
        try {
          return await this.engine.pair(n);
        } catch (a) {
          throw (this.logger.error(a.message), a);
        }
      }),
      (this.approve = async (n) => {
        try {
          return await this.engine.approve(n);
        } catch (a) {
          throw (this.logger.error(a.message), a);
        }
      }),
      (this.reject = async (n) => {
        try {
          return await this.engine.reject(n);
        } catch (a) {
          throw (this.logger.error(a.message), a);
        }
      }),
      (this.update = async (n) => {
        try {
          return await this.engine.update(n);
        } catch (a) {
          throw (this.logger.error(a.message), a);
        }
      }),
      (this.extend = async (n) => {
        try {
          return await this.engine.extend(n);
        } catch (a) {
          throw (this.logger.error(a.message), a);
        }
      }),
      (this.request = async (n) => {
        try {
          return await this.engine.request(n);
        } catch (a) {
          throw (this.logger.error(a.message), a);
        }
      }),
      (this.respond = async (n) => {
        try {
          return await this.engine.respond(n);
        } catch (a) {
          throw (this.logger.error(a.message), a);
        }
      }),
      (this.ping = async (n) => {
        try {
          return await this.engine.ping(n);
        } catch (a) {
          throw (this.logger.error(a.message), a);
        }
      }),
      (this.emit = async (n) => {
        try {
          return await this.engine.emit(n);
        } catch (a) {
          throw (this.logger.error(a.message), a);
        }
      }),
      (this.disconnect = async (n) => {
        try {
          return await this.engine.disconnect(n);
        } catch (a) {
          throw (this.logger.error(a.message), a);
        }
      }),
      (this.find = (n) => {
        try {
          return this.engine.find(n);
        } catch (a) {
          throw (this.logger.error(a.message), a);
        }
      }),
      (this.getPendingSessionRequests = () => {
        try {
          return this.engine.getPendingSessionRequests();
        } catch (n) {
          throw (this.logger.error(n.message), n);
        }
      }),
      (this.name = (i == null ? void 0 : i.name) || rc.name),
      (this.metadata = (i == null ? void 0 : i.metadata) || vm());
    const r =
      typeof (i == null ? void 0 : i.logger) < 'u' &&
      typeof (i == null ? void 0 : i.logger) != 'string'
        ? i.logger
        : Se.pino(
            Se.getDefaultLoggerOptions({
              level: (i == null ? void 0 : i.logger) || rc.logger,
            })
          );
    (this.core = (i == null ? void 0 : i.core) || new Fb(i)),
      (this.logger = Se.generateChildLogger(r, this.name)),
      (this.session = new Gb(this.core, this.logger)),
      (this.proposal = new Vb(this.core, this.logger)),
      (this.pendingRequest = new Wb(this.core, this.logger)),
      (this.engine = new Bb(this));
  }
  static async init(i) {
    const r = new pf(i);
    return await r.initialize(), r;
  }
  get context() {
    return Se.getLoggerContext(this.logger);
  }
  get pairing() {
    return this.core.pairing.pairings;
  }
  async initialize() {
    this.logger.trace('Initialized');
    try {
      await this.core.start(),
        await this.session.init(),
        await this.proposal.init(),
        await this.pendingRequest.init(),
        await this.engine.init(),
        this.core.verify.init({ verifyUrl: this.metadata.verifyUrl }),
        this.logger.info('SignClient Initialization Success');
    } catch (i) {
      throw (
        (this.logger.info('SignClient Initialization Failure'),
        this.logger.error(i.message),
        i)
      );
    }
  }
};
const wl = 'error',
  Qb = 'wss://relay.walletconnect.com',
  Yb = 'wc',
  Xb = 'universal_provider',
  _l = `${Yb}@2:${Xb}:`,
  Zb = 'https://rpc.walletconnect.com/v1/',
  ai = { DEFAULT_CHAIN_CHANGED: 'default_chain_changed' };
var zs =
    typeof globalThis < 'u'
      ? globalThis
      : typeof window < 'u'
        ? window
        : typeof global < 'u'
          ? global
          : typeof self < 'u'
            ? self
            : {},
  dc = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ (function (c, i) {
  (function () {
    var r,
      n = '4.17.21',
      a = 200,
      l = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',
      d = 'Expected a function',
      v = 'Invalid `variable` option passed into `_.template`',
      w = '__lodash_hash_undefined__',
      y = 500,
      E = '__lodash_placeholder__',
      C = 1,
      A = 2,
      j = 4,
      F = 1,
      K = 2,
      re = 1,
      ce = 2,
      ue = 4,
      he = 8,
      fe = 16,
      pe = 32,
      $ = 64,
      H = 128,
      W = 256,
      ve = 512,
      te = 30,
      Ee = '...',
      Ae = 800,
      et = 16,
      R = 1,
      M = 2,
      je = 3,
      Re = 1 / 0,
      J = 9007199254740991,
      B = 17976931348623157e292,
      k = 0 / 0,
      V = 4294967295,
      ut = V - 1,
      He = V >>> 1,
      Dr = [
        ['ary', H],
        ['bind', re],
        ['bindKey', ce],
        ['curry', he],
        ['curryRight', fe],
        ['flip', ve],
        ['partial', pe],
        ['partialRight', $],
        ['rearg', W],
      ],
      _e = '[object Arguments]',
      It = '[object Array]',
      N = '[object AsyncFunction]',
      T = '[object Boolean]',
      S = '[object Date]',
      u = '[object DOMException]',
      b = '[object Error]',
      Z = '[object Function]',
      oe = '[object GeneratorFunction]',
      me = '[object Map]',
      Te = '[object Number]',
      $e = '[object Null]',
      xe = '[object Object]',
      xt = '[object Promise]',
      mt = '[object Proxy]',
      nt = '[object RegExp]',
      De = '[object Set]',
      Je = '[object String]',
      Qe = '[object Symbol]',
      at = '[object Undefined]',
      ze = '[object WeakMap]',
      Ye = '[object WeakSet]',
      Ne = '[object ArrayBuffer]',
      ke = '[object DataView]',
      ht = '[object Float32Array]',
      qe = '[object Float64Array]',
      Pt = '[object Int8Array]',
      Ft = '[object Int16Array]',
      Ut = '[object Int32Array]',
      Ht = '[object Uint8Array]',
      qt = '[object Uint8ClampedArray]',
      Jt = '[object Uint16Array]',
      rr = '[object Uint32Array]',
      Lr = /\b__p \+= '';/g,
      Qt = /\b(__p \+=) '' \+/g,
      Kr = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
      oi = /&(?:amp|lt|gt|quot|#39);/g,
      xi = /[&<>"']/g,
      lt = RegExp(oi.source),
      tt = RegExp(xi.source),
      ft = /<%-([\s\S]+?)%>/g,
      pt = /<%([\s\S]+?)%>/g,
      ot = /<%=([\s\S]+?)%>/g,
      rt = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      St = /^\w*$/,
      Ct =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      dt = /[\\^$.*+?()[\]{}|]/g,
      Ot = RegExp(dt.source),
      gt = /^\s+/,
      wt = /\s/,
      vt = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
      We = /\{\n\/\* \[wrapped with (.+)\] \*/,
      At = /,? & /,
      Rt = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
      _a = /[()=,{}\[\]\/\s]/,
      ba = /\\(\\)?/g,
      Ea = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
      yr = /\w*$/,
      Ia = /^[-+]0x[0-9a-f]+$/i,
      xa = /^0b[01]+$/i,
      Pa = /^\[object .+?Constructor\]$/,
      Sa = /^0o[0-7]+$/i,
      Ca = /^(?:0|[1-9]\d*)$/,
      Br = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
      ki = /($^)/,
      Oa = /['\n\r\u2028\u2029\\]/g,
      Ki = '\\ud800-\\udfff',
      Aa = '\\u0300-\\u036f',
      Ra = '\\ufe20-\\ufe2f',
      Bi = '\\u20d0-\\u20ff',
      Qs = Aa + Ra + Bi,
      Ys = '\\u2700-\\u27bf',
      Cr = 'a-z\\xdf-\\xf6\\xf8-\\xff',
      Ta = '\\xac\\xb1\\xd7\\xf7',
      Na = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
      $a = '\\u2000-\\u206f',
      Fa =
        ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
      Xs = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
      Zs = '\\ufe0e\\ufe0f',
      Pi = Ta + Na + $a + Fa,
      gs = "['’]",
      Si = '[' + Ki + ']',
      vs = '[' + Pi + ']',
      Ci = '[' + Qs + ']',
      en = '\\d+',
      Da = '[' + Ys + ']',
      tn = '[' + Cr + ']',
      rn = '[^' + Ki + Pi + en + Ys + Cr + Xs + ']',
      Vi = '\\ud83c[\\udffb-\\udfff]',
      La = '(?:' + Ci + '|' + Vi + ')',
      sn = '[^' + Ki + ']',
      Gi = '(?:\\ud83c[\\udde6-\\uddff]){2}',
      ci = '[\\ud800-\\udbff][\\udc00-\\udfff]',
      lr = '[' + Xs + ']',
      nn = '\\u200d',
      an = '(?:' + tn + '|' + rn + ')',
      qr = '(?:' + lr + '|' + rn + ')',
      on = '(?:' + gs + '(?:d|ll|m|re|s|t|ve))?',
      cn = '(?:' + gs + '(?:D|LL|M|RE|S|T|VE))?',
      un = La + '?',
      hn = '[' + Zs + ']?',
      qa = '(?:' + nn + '(?:' + [sn, Gi, ci].join('|') + ')' + hn + un + ')*',
      Vr = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
      ln = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
      fn = hn + un + qa,
      Wi = '(?:' + [Da, Gi, ci].join('|') + ')' + fn,
      Ma = '(?:' + [sn + Ci + '?', Ci, Gi, ci, Si].join('|') + ')',
      ys = RegExp(gs, 'g'),
      ja = RegExp(Ci, 'g'),
      Ji = RegExp(Vi + '(?=' + Vi + ')|' + Ma + fn, 'g'),
      pn = RegExp(
        [
          lr + '?' + tn + '+' + on + '(?=' + [vs, lr, '$'].join('|') + ')',
          qr + '+' + cn + '(?=' + [vs, lr + an, '$'].join('|') + ')',
          lr + '?' + an + '+' + on,
          lr + '+' + cn,
          ln,
          Vr,
          en,
          Wi,
        ].join('|'),
        'g'
      ),
      dn = RegExp('[' + nn + Ki + Qs + Zs + ']'),
      Oi = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
      gn = [
        'Array',
        'Buffer',
        'DataView',
        'Date',
        'Error',
        'Float32Array',
        'Float64Array',
        'Function',
        'Int8Array',
        'Int16Array',
        'Int32Array',
        'Map',
        'Math',
        'Object',
        'Promise',
        'RegExp',
        'Set',
        'String',
        'Symbol',
        'TypeError',
        'Uint8Array',
        'Uint8ClampedArray',
        'Uint16Array',
        'Uint32Array',
        'WeakMap',
        '_',
        'clearTimeout',
        'isFinite',
        'parseInt',
        'setTimeout',
      ],
      za = -1,
      Ke = {};
    (Ke[ht] =
      Ke[qe] =
      Ke[Pt] =
      Ke[Ft] =
      Ke[Ut] =
      Ke[Ht] =
      Ke[qt] =
      Ke[Jt] =
      Ke[rr] =
        !0),
      (Ke[_e] =
        Ke[It] =
        Ke[Ne] =
        Ke[T] =
        Ke[ke] =
        Ke[S] =
        Ke[b] =
        Ke[Z] =
        Ke[me] =
        Ke[Te] =
        Ke[xe] =
        Ke[nt] =
        Ke[De] =
        Ke[Je] =
        Ke[ze] =
          !1);
    var Ue = {};
    (Ue[_e] =
      Ue[It] =
      Ue[Ne] =
      Ue[ke] =
      Ue[T] =
      Ue[S] =
      Ue[ht] =
      Ue[qe] =
      Ue[Pt] =
      Ue[Ft] =
      Ue[Ut] =
      Ue[me] =
      Ue[Te] =
      Ue[xe] =
      Ue[nt] =
      Ue[De] =
      Ue[Je] =
      Ue[Qe] =
      Ue[Ht] =
      Ue[qt] =
      Ue[Jt] =
      Ue[rr] =
        !0),
      (Ue[b] = Ue[Z] = Ue[ze] = !1);
    var g = {
        À: 'A',
        Á: 'A',
        Â: 'A',
        Ã: 'A',
        Ä: 'A',
        Å: 'A',
        à: 'a',
        á: 'a',
        â: 'a',
        ã: 'a',
        ä: 'a',
        å: 'a',
        Ç: 'C',
        ç: 'c',
        Ð: 'D',
        ð: 'd',
        È: 'E',
        É: 'E',
        Ê: 'E',
        Ë: 'E',
        è: 'e',
        é: 'e',
        ê: 'e',
        ë: 'e',
        Ì: 'I',
        Í: 'I',
        Î: 'I',
        Ï: 'I',
        ì: 'i',
        í: 'i',
        î: 'i',
        ï: 'i',
        Ñ: 'N',
        ñ: 'n',
        Ò: 'O',
        Ó: 'O',
        Ô: 'O',
        Õ: 'O',
        Ö: 'O',
        Ø: 'O',
        ò: 'o',
        ó: 'o',
        ô: 'o',
        õ: 'o',
        ö: 'o',
        ø: 'o',
        Ù: 'U',
        Ú: 'U',
        Û: 'U',
        Ü: 'U',
        ù: 'u',
        ú: 'u',
        û: 'u',
        ü: 'u',
        Ý: 'Y',
        ý: 'y',
        ÿ: 'y',
        Æ: 'Ae',
        æ: 'ae',
        Þ: 'Th',
        þ: 'th',
        ß: 'ss',
        Ā: 'A',
        Ă: 'A',
        Ą: 'A',
        ā: 'a',
        ă: 'a',
        ą: 'a',
        Ć: 'C',
        Ĉ: 'C',
        Ċ: 'C',
        Č: 'C',
        ć: 'c',
        ĉ: 'c',
        ċ: 'c',
        č: 'c',
        Ď: 'D',
        Đ: 'D',
        ď: 'd',
        đ: 'd',
        Ē: 'E',
        Ĕ: 'E',
        Ė: 'E',
        Ę: 'E',
        Ě: 'E',
        ē: 'e',
        ĕ: 'e',
        ė: 'e',
        ę: 'e',
        ě: 'e',
        Ĝ: 'G',
        Ğ: 'G',
        Ġ: 'G',
        Ģ: 'G',
        ĝ: 'g',
        ğ: 'g',
        ġ: 'g',
        ģ: 'g',
        Ĥ: 'H',
        Ħ: 'H',
        ĥ: 'h',
        ħ: 'h',
        Ĩ: 'I',
        Ī: 'I',
        Ĭ: 'I',
        Į: 'I',
        İ: 'I',
        ĩ: 'i',
        ī: 'i',
        ĭ: 'i',
        į: 'i',
        ı: 'i',
        Ĵ: 'J',
        ĵ: 'j',
        Ķ: 'K',
        ķ: 'k',
        ĸ: 'k',
        Ĺ: 'L',
        Ļ: 'L',
        Ľ: 'L',
        Ŀ: 'L',
        Ł: 'L',
        ĺ: 'l',
        ļ: 'l',
        ľ: 'l',
        ŀ: 'l',
        ł: 'l',
        Ń: 'N',
        Ņ: 'N',
        Ň: 'N',
        Ŋ: 'N',
        ń: 'n',
        ņ: 'n',
        ň: 'n',
        ŋ: 'n',
        Ō: 'O',
        Ŏ: 'O',
        Ő: 'O',
        ō: 'o',
        ŏ: 'o',
        ő: 'o',
        Ŕ: 'R',
        Ŗ: 'R',
        Ř: 'R',
        ŕ: 'r',
        ŗ: 'r',
        ř: 'r',
        Ś: 'S',
        Ŝ: 'S',
        Ş: 'S',
        Š: 'S',
        ś: 's',
        ŝ: 's',
        ş: 's',
        š: 's',
        Ţ: 'T',
        Ť: 'T',
        Ŧ: 'T',
        ţ: 't',
        ť: 't',
        ŧ: 't',
        Ũ: 'U',
        Ū: 'U',
        Ŭ: 'U',
        Ů: 'U',
        Ű: 'U',
        Ų: 'U',
        ũ: 'u',
        ū: 'u',
        ŭ: 'u',
        ů: 'u',
        ű: 'u',
        ų: 'u',
        Ŵ: 'W',
        ŵ: 'w',
        Ŷ: 'Y',
        ŷ: 'y',
        Ÿ: 'Y',
        Ź: 'Z',
        Ż: 'Z',
        Ž: 'Z',
        ź: 'z',
        ż: 'z',
        ž: 'z',
        Ĳ: 'IJ',
        ĳ: 'ij',
        Œ: 'Oe',
        œ: 'oe',
        ŉ: "'n",
        ſ: 's',
      },
      I = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      },
      z = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
      },
      Q = {
        '\\': '\\',
        "'": "'",
        '\n': 'n',
        '\r': 'r',
        '\u2028': 'u2028',
        '\u2029': 'u2029',
      },
      Be = parseFloat,
      de = parseInt,
      Xe = typeof zs == 'object' && zs && zs.Object === Object && zs,
      Tt = typeof self == 'object' && self && self.Object === Object && self,
      Ce = Xe || Tt || Function('return this')(),
      Ve = i && !i.nodeType && i,
      _t = Ve && !0 && c && !c.nodeType && c,
      ir = _t && _t.exports === Ve,
      Nt = ir && Xe.process,
      Ze = (function () {
        try {
          var x = _t && _t.require && _t.require('util').types;
          return x || (Nt && Nt.binding && Nt.binding('util'));
        } catch {}
      })(),
      Yt = Ze && Ze.isArrayBuffer,
      Or = Ze && Ze.isDate,
      mr = Ze && Ze.isMap,
      Mr = Ze && Ze.isRegExp,
      ms = Ze && Ze.isSet,
      Ai = Ze && Ze.isTypedArray;
    function Mt(x, D, O) {
      switch (O.length) {
        case 0:
          return x.call(D);
        case 1:
          return x.call(D, O[0]);
        case 2:
          return x.call(D, O[0], O[1]);
        case 3:
          return x.call(D, O[0], O[1], O[2]);
      }
      return x.apply(D, O);
    }
    function vf(x, D, O, X) {
      for (var le = -1, Fe = x == null ? 0 : x.length; ++le < Fe; ) {
        var Dt = x[le];
        D(X, Dt, O(Dt), x);
      }
      return X;
    }
    function wr(x, D) {
      for (
        var O = -1, X = x == null ? 0 : x.length;
        ++O < X && D(x[O], O, x) !== !1;

      );
      return x;
    }
    function yf(x, D) {
      for (var O = x == null ? 0 : x.length; O-- && D(x[O], O, x) !== !1; );
      return x;
    }
    function Oc(x, D) {
      for (var O = -1, X = x == null ? 0 : x.length; ++O < X; )
        if (!D(x[O], O, x)) return !1;
      return !0;
    }
    function ui(x, D) {
      for (
        var O = -1, X = x == null ? 0 : x.length, le = 0, Fe = [];
        ++O < X;

      ) {
        var Dt = x[O];
        D(Dt, O, x) && (Fe[le++] = Dt);
      }
      return Fe;
    }
    function vn(x, D) {
      var O = x == null ? 0 : x.length;
      return !!O && Qi(x, D, 0) > -1;
    }
    function Ua(x, D, O) {
      for (var X = -1, le = x == null ? 0 : x.length; ++X < le; )
        if (O(D, x[X])) return !0;
      return !1;
    }
    function it(x, D) {
      for (var O = -1, X = x == null ? 0 : x.length, le = Array(X); ++O < X; )
        le[O] = D(x[O], O, x);
      return le;
    }
    function hi(x, D) {
      for (var O = -1, X = D.length, le = x.length; ++O < X; ) x[le + O] = D[O];
      return x;
    }
    function Ha(x, D, O, X) {
      var le = -1,
        Fe = x == null ? 0 : x.length;
      for (X && Fe && (O = x[++le]); ++le < Fe; ) O = D(O, x[le], le, x);
      return O;
    }
    function mf(x, D, O, X) {
      var le = x == null ? 0 : x.length;
      for (X && le && (O = x[--le]); le--; ) O = D(O, x[le], le, x);
      return O;
    }
    function ka(x, D) {
      for (var O = -1, X = x == null ? 0 : x.length; ++O < X; )
        if (D(x[O], O, x)) return !0;
      return !1;
    }
    var wf = Ka('length');
    function _f(x) {
      return x.split('');
    }
    function bf(x) {
      return x.match(Rt) || [];
    }
    function Ac(x, D, O) {
      var X;
      return (
        O(x, function (le, Fe, Dt) {
          if (D(le, Fe, Dt)) return (X = Fe), !1;
        }),
        X
      );
    }
    function yn(x, D, O, X) {
      for (var le = x.length, Fe = O + (X ? 1 : -1); X ? Fe-- : ++Fe < le; )
        if (D(x[Fe], Fe, x)) return Fe;
      return -1;
    }
    function Qi(x, D, O) {
      return D === D ? $f(x, D, O) : yn(x, Rc, O);
    }
    function Ef(x, D, O, X) {
      for (var le = O - 1, Fe = x.length; ++le < Fe; )
        if (X(x[le], D)) return le;
      return -1;
    }
    function Rc(x) {
      return x !== x;
    }
    function Tc(x, D) {
      var O = x == null ? 0 : x.length;
      return O ? Va(x, D) / O : k;
    }
    function Ka(x) {
      return function (D) {
        return D == null ? r : D[x];
      };
    }
    function Ba(x) {
      return function (D) {
        return x == null ? r : x[D];
      };
    }
    function Nc(x, D, O, X, le) {
      return (
        le(x, function (Fe, Dt, Ge) {
          O = X ? ((X = !1), Fe) : D(O, Fe, Dt, Ge);
        }),
        O
      );
    }
    function If(x, D) {
      var O = x.length;
      for (x.sort(D); O--; ) x[O] = x[O].value;
      return x;
    }
    function Va(x, D) {
      for (var O, X = -1, le = x.length; ++X < le; ) {
        var Fe = D(x[X]);
        Fe !== r && (O = O === r ? Fe : O + Fe);
      }
      return O;
    }
    function Ga(x, D) {
      for (var O = -1, X = Array(x); ++O < x; ) X[O] = D(O);
      return X;
    }
    function xf(x, D) {
      return it(D, function (O) {
        return [O, x[O]];
      });
    }
    function $c(x) {
      return x && x.slice(0, qc(x) + 1).replace(gt, '');
    }
    function fr(x) {
      return function (D) {
        return x(D);
      };
    }
    function Wa(x, D) {
      return it(D, function (O) {
        return x[O];
      });
    }
    function ws(x, D) {
      return x.has(D);
    }
    function Fc(x, D) {
      for (var O = -1, X = x.length; ++O < X && Qi(D, x[O], 0) > -1; );
      return O;
    }
    function Dc(x, D) {
      for (var O = x.length; O-- && Qi(D, x[O], 0) > -1; );
      return O;
    }
    function Pf(x, D) {
      for (var O = x.length, X = 0; O--; ) x[O] === D && ++X;
      return X;
    }
    var Sf = Ba(g),
      Cf = Ba(I);
    function Of(x) {
      return '\\' + Q[x];
    }
    function Af(x, D) {
      return x == null ? r : x[D];
    }
    function Yi(x) {
      return dn.test(x);
    }
    function Rf(x) {
      return Oi.test(x);
    }
    function Tf(x) {
      for (var D, O = []; !(D = x.next()).done; ) O.push(D.value);
      return O;
    }
    function Ja(x) {
      var D = -1,
        O = Array(x.size);
      return (
        x.forEach(function (X, le) {
          O[++D] = [le, X];
        }),
        O
      );
    }
    function Lc(x, D) {
      return function (O) {
        return x(D(O));
      };
    }
    function li(x, D) {
      for (var O = -1, X = x.length, le = 0, Fe = []; ++O < X; ) {
        var Dt = x[O];
        (Dt === D || Dt === E) && ((x[O] = E), (Fe[le++] = O));
      }
      return Fe;
    }
    function mn(x) {
      var D = -1,
        O = Array(x.size);
      return (
        x.forEach(function (X) {
          O[++D] = X;
        }),
        O
      );
    }
    function Nf(x) {
      var D = -1,
        O = Array(x.size);
      return (
        x.forEach(function (X) {
          O[++D] = [X, X];
        }),
        O
      );
    }
    function $f(x, D, O) {
      for (var X = O - 1, le = x.length; ++X < le; ) if (x[X] === D) return X;
      return -1;
    }
    function Ff(x, D, O) {
      for (var X = O + 1; X--; ) if (x[X] === D) return X;
      return X;
    }
    function Xi(x) {
      return Yi(x) ? Lf(x) : wf(x);
    }
    function Ar(x) {
      return Yi(x) ? qf(x) : _f(x);
    }
    function qc(x) {
      for (var D = x.length; D-- && wt.test(x.charAt(D)); );
      return D;
    }
    var Df = Ba(z);
    function Lf(x) {
      for (var D = (Ji.lastIndex = 0); Ji.test(x); ) ++D;
      return D;
    }
    function qf(x) {
      return x.match(Ji) || [];
    }
    function Mf(x) {
      return x.match(pn) || [];
    }
    var jf = function x(D) {
        D = D == null ? Ce : Zi.defaults(Ce.Object(), D, Zi.pick(Ce, gn));
        var O = D.Array,
          X = D.Date,
          le = D.Error,
          Fe = D.Function,
          Dt = D.Math,
          Ge = D.Object,
          Qa = D.RegExp,
          zf = D.String,
          _r = D.TypeError,
          wn = O.prototype,
          Uf = Fe.prototype,
          es = Ge.prototype,
          _n = D['__core-js_shared__'],
          bn = Uf.toString,
          Me = es.hasOwnProperty,
          Hf = 0,
          Mc = (function () {
            var e = /[^.]+$/.exec((_n && _n.keys && _n.keys.IE_PROTO) || '');
            return e ? 'Symbol(src)_1.' + e : '';
          })(),
          En = es.toString,
          kf = bn.call(Ge),
          Kf = Ce._,
          Bf = Qa(
            '^' +
              bn
                .call(Me)
                .replace(dt, '\\$&')
                .replace(
                  /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                  '$1.*?'
                ) +
              '$'
          ),
          In = ir ? D.Buffer : r,
          fi = D.Symbol,
          xn = D.Uint8Array,
          jc = In ? In.allocUnsafe : r,
          Pn = Lc(Ge.getPrototypeOf, Ge),
          zc = Ge.create,
          Uc = es.propertyIsEnumerable,
          Sn = wn.splice,
          Hc = fi ? fi.isConcatSpreadable : r,
          _s = fi ? fi.iterator : r,
          Ri = fi ? fi.toStringTag : r,
          Cn = (function () {
            try {
              var e = Di(Ge, 'defineProperty');
              return e({}, '', {}), e;
            } catch {}
          })(),
          Vf = D.clearTimeout !== Ce.clearTimeout && D.clearTimeout,
          Gf = X && X.now !== Ce.Date.now && X.now,
          Wf = D.setTimeout !== Ce.setTimeout && D.setTimeout,
          On = Dt.ceil,
          An = Dt.floor,
          Ya = Ge.getOwnPropertySymbols,
          Jf = In ? In.isBuffer : r,
          kc = D.isFinite,
          Qf = wn.join,
          Yf = Lc(Ge.keys, Ge),
          Lt = Dt.max,
          Bt = Dt.min,
          Xf = X.now,
          Zf = D.parseInt,
          Kc = Dt.random,
          ep = wn.reverse,
          Xa = Di(D, 'DataView'),
          bs = Di(D, 'Map'),
          Za = Di(D, 'Promise'),
          ts = Di(D, 'Set'),
          Es = Di(D, 'WeakMap'),
          Is = Di(Ge, 'create'),
          Rn = Es && new Es(),
          rs = {},
          tp = Li(Xa),
          rp = Li(bs),
          ip = Li(Za),
          sp = Li(ts),
          np = Li(Es),
          Tn = fi ? fi.prototype : r,
          xs = Tn ? Tn.valueOf : r,
          Bc = Tn ? Tn.toString : r;
        function f(e) {
          if (yt(e) && !ge(e) && !(e instanceof Pe)) {
            if (e instanceof br) return e;
            if (Me.call(e, '__wrapped__')) return Vu(e);
          }
          return new br(e);
        }
        var is = (function () {
          function e() {}
          return function (t) {
            if (!ct(t)) return {};
            if (zc) return zc(t);
            e.prototype = t;
            var s = new e();
            return (e.prototype = r), s;
          };
        })();
        function Nn() {}
        function br(e, t) {
          (this.__wrapped__ = e),
            (this.__actions__ = []),
            (this.__chain__ = !!t),
            (this.__index__ = 0),
            (this.__values__ = r);
        }
        (f.templateSettings = {
          escape: ft,
          evaluate: pt,
          interpolate: ot,
          variable: '',
          imports: { _: f },
        }),
          (f.prototype = Nn.prototype),
          (f.prototype.constructor = f),
          (br.prototype = is(Nn.prototype)),
          (br.prototype.constructor = br);
        function Pe(e) {
          (this.__wrapped__ = e),
            (this.__actions__ = []),
            (this.__dir__ = 1),
            (this.__filtered__ = !1),
            (this.__iteratees__ = []),
            (this.__takeCount__ = V),
            (this.__views__ = []);
        }
        function ap() {
          var e = new Pe(this.__wrapped__);
          return (
            (e.__actions__ = sr(this.__actions__)),
            (e.__dir__ = this.__dir__),
            (e.__filtered__ = this.__filtered__),
            (e.__iteratees__ = sr(this.__iteratees__)),
            (e.__takeCount__ = this.__takeCount__),
            (e.__views__ = sr(this.__views__)),
            e
          );
        }
        function op() {
          if (this.__filtered__) {
            var e = new Pe(this);
            (e.__dir__ = -1), (e.__filtered__ = !0);
          } else (e = this.clone()), (e.__dir__ *= -1);
          return e;
        }
        function cp() {
          var e = this.__wrapped__.value(),
            t = this.__dir__,
            s = ge(e),
            o = t < 0,
            h = s ? e.length : 0,
            p = _d(0, h, this.__views__),
            m = p.start,
            _ = p.end,
            P = _ - m,
            L = o ? _ : m - 1,
            q = this.__iteratees__,
            U = q.length,
            G = 0,
            ee = Bt(P, this.__takeCount__);
          if (!s || (!o && h == P && ee == P)) return gu(e, this.__actions__);
          var ne = [];
          e: for (; P-- && G < ee; ) {
            L += t;
            for (var we = -1, ae = e[L]; ++we < U; ) {
              var Ie = q[we],
                Oe = Ie.iteratee,
                gr = Ie.type,
                er = Oe(ae);
              if (gr == M) ae = er;
              else if (!er) {
                if (gr == R) continue e;
                break e;
              }
            }
            ne[G++] = ae;
          }
          return ne;
        }
        (Pe.prototype = is(Nn.prototype)), (Pe.prototype.constructor = Pe);
        function Ti(e) {
          var t = -1,
            s = e == null ? 0 : e.length;
          for (this.clear(); ++t < s; ) {
            var o = e[t];
            this.set(o[0], o[1]);
          }
        }
        function up() {
          (this.__data__ = Is ? Is(null) : {}), (this.size = 0);
        }
        function hp(e) {
          var t = this.has(e) && delete this.__data__[e];
          return (this.size -= t ? 1 : 0), t;
        }
        function lp(e) {
          var t = this.__data__;
          if (Is) {
            var s = t[e];
            return s === w ? r : s;
          }
          return Me.call(t, e) ? t[e] : r;
        }
        function fp(e) {
          var t = this.__data__;
          return Is ? t[e] !== r : Me.call(t, e);
        }
        function pp(e, t) {
          var s = this.__data__;
          return (
            (this.size += this.has(e) ? 0 : 1),
            (s[e] = Is && t === r ? w : t),
            this
          );
        }
        (Ti.prototype.clear = up),
          (Ti.prototype.delete = hp),
          (Ti.prototype.get = lp),
          (Ti.prototype.has = fp),
          (Ti.prototype.set = pp);
        function Gr(e) {
          var t = -1,
            s = e == null ? 0 : e.length;
          for (this.clear(); ++t < s; ) {
            var o = e[t];
            this.set(o[0], o[1]);
          }
        }
        function dp() {
          (this.__data__ = []), (this.size = 0);
        }
        function gp(e) {
          var t = this.__data__,
            s = $n(t, e);
          if (s < 0) return !1;
          var o = t.length - 1;
          return s == o ? t.pop() : Sn.call(t, s, 1), --this.size, !0;
        }
        function vp(e) {
          var t = this.__data__,
            s = $n(t, e);
          return s < 0 ? r : t[s][1];
        }
        function yp(e) {
          return $n(this.__data__, e) > -1;
        }
        function mp(e, t) {
          var s = this.__data__,
            o = $n(s, e);
          return o < 0 ? (++this.size, s.push([e, t])) : (s[o][1] = t), this;
        }
        (Gr.prototype.clear = dp),
          (Gr.prototype.delete = gp),
          (Gr.prototype.get = vp),
          (Gr.prototype.has = yp),
          (Gr.prototype.set = mp);
        function Wr(e) {
          var t = -1,
            s = e == null ? 0 : e.length;
          for (this.clear(); ++t < s; ) {
            var o = e[t];
            this.set(o[0], o[1]);
          }
        }
        function wp() {
          (this.size = 0),
            (this.__data__ = {
              hash: new Ti(),
              map: new (bs || Gr)(),
              string: new Ti(),
            });
        }
        function _p(e) {
          var t = Bn(this, e).delete(e);
          return (this.size -= t ? 1 : 0), t;
        }
        function bp(e) {
          return Bn(this, e).get(e);
        }
        function Ep(e) {
          return Bn(this, e).has(e);
        }
        function Ip(e, t) {
          var s = Bn(this, e),
            o = s.size;
          return s.set(e, t), (this.size += s.size == o ? 0 : 1), this;
        }
        (Wr.prototype.clear = wp),
          (Wr.prototype.delete = _p),
          (Wr.prototype.get = bp),
          (Wr.prototype.has = Ep),
          (Wr.prototype.set = Ip);
        function Ni(e) {
          var t = -1,
            s = e == null ? 0 : e.length;
          for (this.__data__ = new Wr(); ++t < s; ) this.add(e[t]);
        }
        function xp(e) {
          return this.__data__.set(e, w), this;
        }
        function Pp(e) {
          return this.__data__.has(e);
        }
        (Ni.prototype.add = Ni.prototype.push = xp), (Ni.prototype.has = Pp);
        function Rr(e) {
          var t = (this.__data__ = new Gr(e));
          this.size = t.size;
        }
        function Sp() {
          (this.__data__ = new Gr()), (this.size = 0);
        }
        function Cp(e) {
          var t = this.__data__,
            s = t.delete(e);
          return (this.size = t.size), s;
        }
        function Op(e) {
          return this.__data__.get(e);
        }
        function Ap(e) {
          return this.__data__.has(e);
        }
        function Rp(e, t) {
          var s = this.__data__;
          if (s instanceof Gr) {
            var o = s.__data__;
            if (!bs || o.length < a - 1)
              return o.push([e, t]), (this.size = ++s.size), this;
            s = this.__data__ = new Wr(o);
          }
          return s.set(e, t), (this.size = s.size), this;
        }
        (Rr.prototype.clear = Sp),
          (Rr.prototype.delete = Cp),
          (Rr.prototype.get = Op),
          (Rr.prototype.has = Ap),
          (Rr.prototype.set = Rp);
        function Vc(e, t) {
          var s = ge(e),
            o = !s && qi(e),
            h = !s && !o && yi(e),
            p = !s && !o && !h && os(e),
            m = s || o || h || p,
            _ = m ? Ga(e.length, zf) : [],
            P = _.length;
          for (var L in e)
            (t || Me.call(e, L)) &&
              !(
                m &&
                (L == 'length' ||
                  (h && (L == 'offset' || L == 'parent')) ||
                  (p &&
                    (L == 'buffer' ||
                      L == 'byteLength' ||
                      L == 'byteOffset')) ||
                  Xr(L, P))
              ) &&
              _.push(L);
          return _;
        }
        function Gc(e) {
          var t = e.length;
          return t ? e[ho(0, t - 1)] : r;
        }
        function Tp(e, t) {
          return Vn(sr(e), $i(t, 0, e.length));
        }
        function Np(e) {
          return Vn(sr(e));
        }
        function eo(e, t, s) {
          ((s !== r && !Tr(e[t], s)) || (s === r && !(t in e))) && Jr(e, t, s);
        }
        function Ps(e, t, s) {
          var o = e[t];
          (!(Me.call(e, t) && Tr(o, s)) || (s === r && !(t in e))) &&
            Jr(e, t, s);
        }
        function $n(e, t) {
          for (var s = e.length; s--; ) if (Tr(e[s][0], t)) return s;
          return -1;
        }
        function $p(e, t, s, o) {
          return (
            pi(e, function (h, p, m) {
              t(o, h, s(h), m);
            }),
            o
          );
        }
        function Wc(e, t) {
          return e && zr(t, jt(t), e);
        }
        function Fp(e, t) {
          return e && zr(t, ar(t), e);
        }
        function Jr(e, t, s) {
          t == '__proto__' && Cn
            ? Cn(e, t, {
                configurable: !0,
                enumerable: !0,
                value: s,
                writable: !0,
              })
            : (e[t] = s);
        }
        function to(e, t) {
          for (var s = -1, o = t.length, h = O(o), p = e == null; ++s < o; )
            h[s] = p ? r : Lo(e, t[s]);
          return h;
        }
        function $i(e, t, s) {
          return (
            e === e &&
              (s !== r && (e = e <= s ? e : s),
              t !== r && (e = e >= t ? e : t)),
            e
          );
        }
        function Er(e, t, s, o, h, p) {
          var m,
            _ = t & C,
            P = t & A,
            L = t & j;
          if ((s && (m = h ? s(e, o, h, p) : s(e)), m !== r)) return m;
          if (!ct(e)) return e;
          var q = ge(e);
          if (q) {
            if (((m = Ed(e)), !_)) return sr(e, m);
          } else {
            var U = Vt(e),
              G = U == Z || U == oe;
            if (yi(e)) return mu(e, _);
            if (U == xe || U == _e || (G && !h)) {
              if (((m = P || G ? {} : qu(e)), !_))
                return P ? ld(e, Fp(m, e)) : hd(e, Wc(m, e));
            } else {
              if (!Ue[U]) return h ? e : {};
              m = Id(e, U, _);
            }
          }
          p || (p = new Rr());
          var ee = p.get(e);
          if (ee) return ee;
          p.set(e, m),
            fh(e)
              ? e.forEach(function (ae) {
                  m.add(Er(ae, t, s, ae, e, p));
                })
              : hh(e) &&
                e.forEach(function (ae, Ie) {
                  m.set(Ie, Er(ae, t, s, Ie, e, p));
                });
          var ne = L ? (P ? Eo : bo) : P ? ar : jt,
            we = q ? r : ne(e);
          return (
            wr(we || e, function (ae, Ie) {
              we && ((Ie = ae), (ae = e[Ie])),
                Ps(m, Ie, Er(ae, t, s, Ie, e, p));
            }),
            m
          );
        }
        function Dp(e) {
          var t = jt(e);
          return function (s) {
            return Jc(s, e, t);
          };
        }
        function Jc(e, t, s) {
          var o = s.length;
          if (e == null) return !o;
          for (e = Ge(e); o--; ) {
            var h = s[o],
              p = t[h],
              m = e[h];
            if ((m === r && !(h in e)) || !p(m)) return !1;
          }
          return !0;
        }
        function Qc(e, t, s) {
          if (typeof e != 'function') throw new _r(d);
          return Ns(function () {
            e.apply(r, s);
          }, t);
        }
        function Ss(e, t, s, o) {
          var h = -1,
            p = vn,
            m = !0,
            _ = e.length,
            P = [],
            L = t.length;
          if (!_) return P;
          s && (t = it(t, fr(s))),
            o
              ? ((p = Ua), (m = !1))
              : t.length >= a && ((p = ws), (m = !1), (t = new Ni(t)));
          e: for (; ++h < _; ) {
            var q = e[h],
              U = s == null ? q : s(q);
            if (((q = o || q !== 0 ? q : 0), m && U === U)) {
              for (var G = L; G--; ) if (t[G] === U) continue e;
              P.push(q);
            } else p(t, U, o) || P.push(q);
          }
          return P;
        }
        var pi = Iu(jr),
          Yc = Iu(io, !0);
        function Lp(e, t) {
          var s = !0;
          return (
            pi(e, function (o, h, p) {
              return (s = !!t(o, h, p)), s;
            }),
            s
          );
        }
        function Fn(e, t, s) {
          for (var o = -1, h = e.length; ++o < h; ) {
            var p = e[o],
              m = t(p);
            if (m != null && (_ === r ? m === m && !dr(m) : s(m, _)))
              var _ = m,
                P = p;
          }
          return P;
        }
        function qp(e, t, s, o) {
          var h = e.length;
          for (
            s = ye(s),
              s < 0 && (s = -s > h ? 0 : h + s),
              o = o === r || o > h ? h : ye(o),
              o < 0 && (o += h),
              o = s > o ? 0 : dh(o);
            s < o;

          )
            e[s++] = t;
          return e;
        }
        function Xc(e, t) {
          var s = [];
          return (
            pi(e, function (o, h, p) {
              t(o, h, p) && s.push(o);
            }),
            s
          );
        }
        function kt(e, t, s, o, h) {
          var p = -1,
            m = e.length;
          for (s || (s = Pd), h || (h = []); ++p < m; ) {
            var _ = e[p];
            t > 0 && s(_)
              ? t > 1
                ? kt(_, t - 1, s, o, h)
                : hi(h, _)
              : o || (h[h.length] = _);
          }
          return h;
        }
        var ro = xu(),
          Zc = xu(!0);
        function jr(e, t) {
          return e && ro(e, t, jt);
        }
        function io(e, t) {
          return e && Zc(e, t, jt);
        }
        function Dn(e, t) {
          return ui(t, function (s) {
            return Zr(e[s]);
          });
        }
        function Fi(e, t) {
          t = gi(t, e);
          for (var s = 0, o = t.length; e != null && s < o; ) e = e[Ur(t[s++])];
          return s && s == o ? e : r;
        }
        function eu(e, t, s) {
          var o = t(e);
          return ge(e) ? o : hi(o, s(e));
        }
        function Xt(e) {
          return e == null
            ? e === r
              ? at
              : $e
            : Ri && Ri in Ge(e)
              ? wd(e)
              : Nd(e);
        }
        function so(e, t) {
          return e > t;
        }
        function Mp(e, t) {
          return e != null && Me.call(e, t);
        }
        function jp(e, t) {
          return e != null && t in Ge(e);
        }
        function zp(e, t, s) {
          return e >= Bt(t, s) && e < Lt(t, s);
        }
        function no(e, t, s) {
          for (
            var o = s ? Ua : vn,
              h = e[0].length,
              p = e.length,
              m = p,
              _ = O(p),
              P = 1 / 0,
              L = [];
            m--;

          ) {
            var q = e[m];
            m && t && (q = it(q, fr(t))),
              (P = Bt(q.length, P)),
              (_[m] =
                !s && (t || (h >= 120 && q.length >= 120))
                  ? new Ni(m && q)
                  : r);
          }
          q = e[0];
          var U = -1,
            G = _[0];
          e: for (; ++U < h && L.length < P; ) {
            var ee = q[U],
              ne = t ? t(ee) : ee;
            if (
              ((ee = s || ee !== 0 ? ee : 0), !(G ? ws(G, ne) : o(L, ne, s)))
            ) {
              for (m = p; --m; ) {
                var we = _[m];
                if (!(we ? ws(we, ne) : o(e[m], ne, s))) continue e;
              }
              G && G.push(ne), L.push(ee);
            }
          }
          return L;
        }
        function Up(e, t, s, o) {
          return (
            jr(e, function (h, p, m) {
              t(o, s(h), p, m);
            }),
            o
          );
        }
        function Cs(e, t, s) {
          (t = gi(t, e)), (e = Uu(e, t));
          var o = e == null ? e : e[Ur(xr(t))];
          return o == null ? r : Mt(o, e, s);
        }
        function tu(e) {
          return yt(e) && Xt(e) == _e;
        }
        function Hp(e) {
          return yt(e) && Xt(e) == Ne;
        }
        function kp(e) {
          return yt(e) && Xt(e) == S;
        }
        function Os(e, t, s, o, h) {
          return e === t
            ? !0
            : e == null || t == null || (!yt(e) && !yt(t))
              ? e !== e && t !== t
              : Kp(e, t, s, o, Os, h);
        }
        function Kp(e, t, s, o, h, p) {
          var m = ge(e),
            _ = ge(t),
            P = m ? It : Vt(e),
            L = _ ? It : Vt(t);
          (P = P == _e ? xe : P), (L = L == _e ? xe : L);
          var q = P == xe,
            U = L == xe,
            G = P == L;
          if (G && yi(e)) {
            if (!yi(t)) return !1;
            (m = !0), (q = !1);
          }
          if (G && !q)
            return (
              p || (p = new Rr()),
              m || os(e) ? Fu(e, t, s, o, h, p) : yd(e, t, P, s, o, h, p)
            );
          if (!(s & F)) {
            var ee = q && Me.call(e, '__wrapped__'),
              ne = U && Me.call(t, '__wrapped__');
            if (ee || ne) {
              var we = ee ? e.value() : e,
                ae = ne ? t.value() : t;
              return p || (p = new Rr()), h(we, ae, s, o, p);
            }
          }
          return G ? (p || (p = new Rr()), md(e, t, s, o, h, p)) : !1;
        }
        function Bp(e) {
          return yt(e) && Vt(e) == me;
        }
        function ao(e, t, s, o) {
          var h = s.length,
            p = h,
            m = !o;
          if (e == null) return !p;
          for (e = Ge(e); h--; ) {
            var _ = s[h];
            if (m && _[2] ? _[1] !== e[_[0]] : !(_[0] in e)) return !1;
          }
          for (; ++h < p; ) {
            _ = s[h];
            var P = _[0],
              L = e[P],
              q = _[1];
            if (m && _[2]) {
              if (L === r && !(P in e)) return !1;
            } else {
              var U = new Rr();
              if (o) var G = o(L, q, P, e, t, U);
              if (!(G === r ? Os(q, L, F | K, o, U) : G)) return !1;
            }
          }
          return !0;
        }
        function ru(e) {
          if (!ct(e) || Cd(e)) return !1;
          var t = Zr(e) ? Bf : Pa;
          return t.test(Li(e));
        }
        function Vp(e) {
          return yt(e) && Xt(e) == nt;
        }
        function Gp(e) {
          return yt(e) && Vt(e) == De;
        }
        function Wp(e) {
          return yt(e) && Xn(e.length) && !!Ke[Xt(e)];
        }
        function iu(e) {
          return typeof e == 'function'
            ? e
            : e == null
              ? or
              : typeof e == 'object'
                ? ge(e)
                  ? au(e[0], e[1])
                  : nu(e)
                : Ph(e);
        }
        function oo(e) {
          if (!Ts(e)) return Yf(e);
          var t = [];
          for (var s in Ge(e)) Me.call(e, s) && s != 'constructor' && t.push(s);
          return t;
        }
        function Jp(e) {
          if (!ct(e)) return Td(e);
          var t = Ts(e),
            s = [];
          for (var o in e)
            (o == 'constructor' && (t || !Me.call(e, o))) || s.push(o);
          return s;
        }
        function co(e, t) {
          return e < t;
        }
        function su(e, t) {
          var s = -1,
            o = nr(e) ? O(e.length) : [];
          return (
            pi(e, function (h, p, m) {
              o[++s] = t(h, p, m);
            }),
            o
          );
        }
        function nu(e) {
          var t = xo(e);
          return t.length == 1 && t[0][2]
            ? ju(t[0][0], t[0][1])
            : function (s) {
                return s === e || ao(s, e, t);
              };
        }
        function au(e, t) {
          return So(e) && Mu(t)
            ? ju(Ur(e), t)
            : function (s) {
                var o = Lo(s, e);
                return o === r && o === t ? qo(s, e) : Os(t, o, F | K);
              };
        }
        function Ln(e, t, s, o, h) {
          e !== t &&
            ro(
              t,
              function (p, m) {
                if ((h || (h = new Rr()), ct(p))) Qp(e, t, m, s, Ln, o, h);
                else {
                  var _ = o ? o(Oo(e, m), p, m + '', e, t, h) : r;
                  _ === r && (_ = p), eo(e, m, _);
                }
              },
              ar
            );
        }
        function Qp(e, t, s, o, h, p, m) {
          var _ = Oo(e, s),
            P = Oo(t, s),
            L = m.get(P);
          if (L) {
            eo(e, s, L);
            return;
          }
          var q = p ? p(_, P, s + '', e, t, m) : r,
            U = q === r;
          if (U) {
            var G = ge(P),
              ee = !G && yi(P),
              ne = !G && !ee && os(P);
            (q = P),
              G || ee || ne
                ? ge(_)
                  ? (q = _)
                  : bt(_)
                    ? (q = sr(_))
                    : ee
                      ? ((U = !1), (q = mu(P, !0)))
                      : ne
                        ? ((U = !1), (q = wu(P, !0)))
                        : (q = [])
                : $s(P) || qi(P)
                  ? ((q = _),
                    qi(_) ? (q = gh(_)) : (!ct(_) || Zr(_)) && (q = qu(P)))
                  : (U = !1);
          }
          U && (m.set(P, q), h(q, P, o, p, m), m.delete(P)), eo(e, s, q);
        }
        function ou(e, t) {
          var s = e.length;
          if (s) return (t += t < 0 ? s : 0), Xr(t, s) ? e[t] : r;
        }
        function cu(e, t, s) {
          t.length
            ? (t = it(t, function (p) {
                return ge(p)
                  ? function (m) {
                      return Fi(m, p.length === 1 ? p[0] : p);
                    }
                  : p;
              }))
            : (t = [or]);
          var o = -1;
          t = it(t, fr(se()));
          var h = su(e, function (p, m, _) {
            var P = it(t, function (L) {
              return L(p);
            });
            return { criteria: P, index: ++o, value: p };
          });
          return If(h, function (p, m) {
            return ud(p, m, s);
          });
        }
        function Yp(e, t) {
          return uu(e, t, function (s, o) {
            return qo(e, o);
          });
        }
        function uu(e, t, s) {
          for (var o = -1, h = t.length, p = {}; ++o < h; ) {
            var m = t[o],
              _ = Fi(e, m);
            s(_, m) && As(p, gi(m, e), _);
          }
          return p;
        }
        function Xp(e) {
          return function (t) {
            return Fi(t, e);
          };
        }
        function uo(e, t, s, o) {
          var h = o ? Ef : Qi,
            p = -1,
            m = t.length,
            _ = e;
          for (e === t && (t = sr(t)), s && (_ = it(e, fr(s))); ++p < m; )
            for (
              var P = 0, L = t[p], q = s ? s(L) : L;
              (P = h(_, q, P, o)) > -1;

            )
              _ !== e && Sn.call(_, P, 1), Sn.call(e, P, 1);
          return e;
        }
        function hu(e, t) {
          for (var s = e ? t.length : 0, o = s - 1; s--; ) {
            var h = t[s];
            if (s == o || h !== p) {
              var p = h;
              Xr(h) ? Sn.call(e, h, 1) : po(e, h);
            }
          }
          return e;
        }
        function ho(e, t) {
          return e + An(Kc() * (t - e + 1));
        }
        function Zp(e, t, s, o) {
          for (var h = -1, p = Lt(On((t - e) / (s || 1)), 0), m = O(p); p--; )
            (m[o ? p : ++h] = e), (e += s);
          return m;
        }
        function lo(e, t) {
          var s = '';
          if (!e || t < 1 || t > J) return s;
          do t % 2 && (s += e), (t = An(t / 2)), t && (e += e);
          while (t);
          return s;
        }
        function be(e, t) {
          return Ao(zu(e, t, or), e + '');
        }
        function ed(e) {
          return Gc(cs(e));
        }
        function td(e, t) {
          var s = cs(e);
          return Vn(s, $i(t, 0, s.length));
        }
        function As(e, t, s, o) {
          if (!ct(e)) return e;
          t = gi(t, e);
          for (
            var h = -1, p = t.length, m = p - 1, _ = e;
            _ != null && ++h < p;

          ) {
            var P = Ur(t[h]),
              L = s;
            if (P === '__proto__' || P === 'constructor' || P === 'prototype')
              return e;
            if (h != m) {
              var q = _[P];
              (L = o ? o(q, P, _) : r),
                L === r && (L = ct(q) ? q : Xr(t[h + 1]) ? [] : {});
            }
            Ps(_, P, L), (_ = _[P]);
          }
          return e;
        }
        var lu = Rn
            ? function (e, t) {
                return Rn.set(e, t), e;
              }
            : or,
          rd = Cn
            ? function (e, t) {
                return Cn(e, 'toString', {
                  configurable: !0,
                  enumerable: !1,
                  value: jo(t),
                  writable: !0,
                });
              }
            : or;
        function id(e) {
          return Vn(cs(e));
        }
        function Ir(e, t, s) {
          var o = -1,
            h = e.length;
          t < 0 && (t = -t > h ? 0 : h + t),
            (s = s > h ? h : s),
            s < 0 && (s += h),
            (h = t > s ? 0 : (s - t) >>> 0),
            (t >>>= 0);
          for (var p = O(h); ++o < h; ) p[o] = e[o + t];
          return p;
        }
        function sd(e, t) {
          var s;
          return (
            pi(e, function (o, h, p) {
              return (s = t(o, h, p)), !s;
            }),
            !!s
          );
        }
        function qn(e, t, s) {
          var o = 0,
            h = e == null ? o : e.length;
          if (typeof t == 'number' && t === t && h <= He) {
            for (; o < h; ) {
              var p = (o + h) >>> 1,
                m = e[p];
              m !== null && !dr(m) && (s ? m <= t : m < t)
                ? (o = p + 1)
                : (h = p);
            }
            return h;
          }
          return fo(e, t, or, s);
        }
        function fo(e, t, s, o) {
          var h = 0,
            p = e == null ? 0 : e.length;
          if (p === 0) return 0;
          t = s(t);
          for (
            var m = t !== t, _ = t === null, P = dr(t), L = t === r;
            h < p;

          ) {
            var q = An((h + p) / 2),
              U = s(e[q]),
              G = U !== r,
              ee = U === null,
              ne = U === U,
              we = dr(U);
            if (m) var ae = o || ne;
            else
              L
                ? (ae = ne && (o || G))
                : _
                  ? (ae = ne && G && (o || !ee))
                  : P
                    ? (ae = ne && G && !ee && (o || !we))
                    : ee || we
                      ? (ae = !1)
                      : (ae = o ? U <= t : U < t);
            ae ? (h = q + 1) : (p = q);
          }
          return Bt(p, ut);
        }
        function fu(e, t) {
          for (var s = -1, o = e.length, h = 0, p = []; ++s < o; ) {
            var m = e[s],
              _ = t ? t(m) : m;
            if (!s || !Tr(_, P)) {
              var P = _;
              p[h++] = m === 0 ? 0 : m;
            }
          }
          return p;
        }
        function pu(e) {
          return typeof e == 'number' ? e : dr(e) ? k : +e;
        }
        function pr(e) {
          if (typeof e == 'string') return e;
          if (ge(e)) return it(e, pr) + '';
          if (dr(e)) return Bc ? Bc.call(e) : '';
          var t = e + '';
          return t == '0' && 1 / e == -Re ? '-0' : t;
        }
        function di(e, t, s) {
          var o = -1,
            h = vn,
            p = e.length,
            m = !0,
            _ = [],
            P = _;
          if (s) (m = !1), (h = Ua);
          else if (p >= a) {
            var L = t ? null : gd(e);
            if (L) return mn(L);
            (m = !1), (h = ws), (P = new Ni());
          } else P = t ? [] : _;
          e: for (; ++o < p; ) {
            var q = e[o],
              U = t ? t(q) : q;
            if (((q = s || q !== 0 ? q : 0), m && U === U)) {
              for (var G = P.length; G--; ) if (P[G] === U) continue e;
              t && P.push(U), _.push(q);
            } else h(P, U, s) || (P !== _ && P.push(U), _.push(q));
          }
          return _;
        }
        function po(e, t) {
          return (
            (t = gi(t, e)), (e = Uu(e, t)), e == null || delete e[Ur(xr(t))]
          );
        }
        function du(e, t, s, o) {
          return As(e, t, s(Fi(e, t)), o);
        }
        function Mn(e, t, s, o) {
          for (
            var h = e.length, p = o ? h : -1;
            (o ? p-- : ++p < h) && t(e[p], p, e);

          );
          return s
            ? Ir(e, o ? 0 : p, o ? p + 1 : h)
            : Ir(e, o ? p + 1 : 0, o ? h : p);
        }
        function gu(e, t) {
          var s = e;
          return (
            s instanceof Pe && (s = s.value()),
            Ha(
              t,
              function (o, h) {
                return h.func.apply(h.thisArg, hi([o], h.args));
              },
              s
            )
          );
        }
        function go(e, t, s) {
          var o = e.length;
          if (o < 2) return o ? di(e[0]) : [];
          for (var h = -1, p = O(o); ++h < o; )
            for (var m = e[h], _ = -1; ++_ < o; )
              _ != h && (p[h] = Ss(p[h] || m, e[_], t, s));
          return di(kt(p, 1), t, s);
        }
        function vu(e, t, s) {
          for (var o = -1, h = e.length, p = t.length, m = {}; ++o < h; ) {
            var _ = o < p ? t[o] : r;
            s(m, e[o], _);
          }
          return m;
        }
        function vo(e) {
          return bt(e) ? e : [];
        }
        function yo(e) {
          return typeof e == 'function' ? e : or;
        }
        function gi(e, t) {
          return ge(e) ? e : So(e, t) ? [e] : Bu(Le(e));
        }
        var nd = be;
        function vi(e, t, s) {
          var o = e.length;
          return (s = s === r ? o : s), !t && s >= o ? e : Ir(e, t, s);
        }
        var yu =
          Vf ||
          function (e) {
            return Ce.clearTimeout(e);
          };
        function mu(e, t) {
          if (t) return e.slice();
          var s = e.length,
            o = jc ? jc(s) : new e.constructor(s);
          return e.copy(o), o;
        }
        function mo(e) {
          var t = new e.constructor(e.byteLength);
          return new xn(t).set(new xn(e)), t;
        }
        function ad(e, t) {
          var s = t ? mo(e.buffer) : e.buffer;
          return new e.constructor(s, e.byteOffset, e.byteLength);
        }
        function od(e) {
          var t = new e.constructor(e.source, yr.exec(e));
          return (t.lastIndex = e.lastIndex), t;
        }
        function cd(e) {
          return xs ? Ge(xs.call(e)) : {};
        }
        function wu(e, t) {
          var s = t ? mo(e.buffer) : e.buffer;
          return new e.constructor(s, e.byteOffset, e.length);
        }
        function _u(e, t) {
          if (e !== t) {
            var s = e !== r,
              o = e === null,
              h = e === e,
              p = dr(e),
              m = t !== r,
              _ = t === null,
              P = t === t,
              L = dr(t);
            if (
              (!_ && !L && !p && e > t) ||
              (p && m && P && !_ && !L) ||
              (o && m && P) ||
              (!s && P) ||
              !h
            )
              return 1;
            if (
              (!o && !p && !L && e < t) ||
              (L && s && h && !o && !p) ||
              (_ && s && h) ||
              (!m && h) ||
              !P
            )
              return -1;
          }
          return 0;
        }
        function ud(e, t, s) {
          for (
            var o = -1,
              h = e.criteria,
              p = t.criteria,
              m = h.length,
              _ = s.length;
            ++o < m;

          ) {
            var P = _u(h[o], p[o]);
            if (P) {
              if (o >= _) return P;
              var L = s[o];
              return P * (L == 'desc' ? -1 : 1);
            }
          }
          return e.index - t.index;
        }
        function bu(e, t, s, o) {
          for (
            var h = -1,
              p = e.length,
              m = s.length,
              _ = -1,
              P = t.length,
              L = Lt(p - m, 0),
              q = O(P + L),
              U = !o;
            ++_ < P;

          )
            q[_] = t[_];
          for (; ++h < m; ) (U || h < p) && (q[s[h]] = e[h]);
          for (; L--; ) q[_++] = e[h++];
          return q;
        }
        function Eu(e, t, s, o) {
          for (
            var h = -1,
              p = e.length,
              m = -1,
              _ = s.length,
              P = -1,
              L = t.length,
              q = Lt(p - _, 0),
              U = O(q + L),
              G = !o;
            ++h < q;

          )
            U[h] = e[h];
          for (var ee = h; ++P < L; ) U[ee + P] = t[P];
          for (; ++m < _; ) (G || h < p) && (U[ee + s[m]] = e[h++]);
          return U;
        }
        function sr(e, t) {
          var s = -1,
            o = e.length;
          for (t || (t = O(o)); ++s < o; ) t[s] = e[s];
          return t;
        }
        function zr(e, t, s, o) {
          var h = !s;
          s || (s = {});
          for (var p = -1, m = t.length; ++p < m; ) {
            var _ = t[p],
              P = o ? o(s[_], e[_], _, s, e) : r;
            P === r && (P = e[_]), h ? Jr(s, _, P) : Ps(s, _, P);
          }
          return s;
        }
        function hd(e, t) {
          return zr(e, Po(e), t);
        }
        function ld(e, t) {
          return zr(e, Du(e), t);
        }
        function jn(e, t) {
          return function (s, o) {
            var h = ge(s) ? vf : $p,
              p = t ? t() : {};
            return h(s, e, se(o, 2), p);
          };
        }
        function ss(e) {
          return be(function (t, s) {
            var o = -1,
              h = s.length,
              p = h > 1 ? s[h - 1] : r,
              m = h > 2 ? s[2] : r;
            for (
              p = e.length > 3 && typeof p == 'function' ? (h--, p) : r,
                m && Zt(s[0], s[1], m) && ((p = h < 3 ? r : p), (h = 1)),
                t = Ge(t);
              ++o < h;

            ) {
              var _ = s[o];
              _ && e(t, _, o, p);
            }
            return t;
          });
        }
        function Iu(e, t) {
          return function (s, o) {
            if (s == null) return s;
            if (!nr(s)) return e(s, o);
            for (
              var h = s.length, p = t ? h : -1, m = Ge(s);
              (t ? p-- : ++p < h) && o(m[p], p, m) !== !1;

            );
            return s;
          };
        }
        function xu(e) {
          return function (t, s, o) {
            for (var h = -1, p = Ge(t), m = o(t), _ = m.length; _--; ) {
              var P = m[e ? _ : ++h];
              if (s(p[P], P, p) === !1) break;
            }
            return t;
          };
        }
        function fd(e, t, s) {
          var o = t & re,
            h = Rs(e);
          function p() {
            var m = this && this !== Ce && this instanceof p ? h : e;
            return m.apply(o ? s : this, arguments);
          }
          return p;
        }
        function Pu(e) {
          return function (t) {
            t = Le(t);
            var s = Yi(t) ? Ar(t) : r,
              o = s ? s[0] : t.charAt(0),
              h = s ? vi(s, 1).join('') : t.slice(1);
            return o[e]() + h;
          };
        }
        function ns(e) {
          return function (t) {
            return Ha(Ih(Eh(t).replace(ys, '')), e, '');
          };
        }
        function Rs(e) {
          return function () {
            var t = arguments;
            switch (t.length) {
              case 0:
                return new e();
              case 1:
                return new e(t[0]);
              case 2:
                return new e(t[0], t[1]);
              case 3:
                return new e(t[0], t[1], t[2]);
              case 4:
                return new e(t[0], t[1], t[2], t[3]);
              case 5:
                return new e(t[0], t[1], t[2], t[3], t[4]);
              case 6:
                return new e(t[0], t[1], t[2], t[3], t[4], t[5]);
              case 7:
                return new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
            }
            var s = is(e.prototype),
              o = e.apply(s, t);
            return ct(o) ? o : s;
          };
        }
        function pd(e, t, s) {
          var o = Rs(e);
          function h() {
            for (var p = arguments.length, m = O(p), _ = p, P = as(h); _--; )
              m[_] = arguments[_];
            var L = p < 3 && m[0] !== P && m[p - 1] !== P ? [] : li(m, P);
            if (((p -= L.length), p < s))
              return Ru(e, t, zn, h.placeholder, r, m, L, r, r, s - p);
            var q = this && this !== Ce && this instanceof h ? o : e;
            return Mt(q, this, m);
          }
          return h;
        }
        function Su(e) {
          return function (t, s, o) {
            var h = Ge(t);
            if (!nr(t)) {
              var p = se(s, 3);
              (t = jt(t)),
                (s = function (_) {
                  return p(h[_], _, h);
                });
            }
            var m = e(t, s, o);
            return m > -1 ? h[p ? t[m] : m] : r;
          };
        }
        function Cu(e) {
          return Yr(function (t) {
            var s = t.length,
              o = s,
              h = br.prototype.thru;
            for (e && t.reverse(); o--; ) {
              var p = t[o];
              if (typeof p != 'function') throw new _r(d);
              if (h && !m && Kn(p) == 'wrapper') var m = new br([], !0);
            }
            for (o = m ? o : s; ++o < s; ) {
              p = t[o];
              var _ = Kn(p),
                P = _ == 'wrapper' ? Io(p) : r;
              P &&
              Co(P[0]) &&
              P[1] == (H | he | pe | W) &&
              !P[4].length &&
              P[9] == 1
                ? (m = m[Kn(P[0])].apply(m, P[3]))
                : (m = p.length == 1 && Co(p) ? m[_]() : m.thru(p));
            }
            return function () {
              var L = arguments,
                q = L[0];
              if (m && L.length == 1 && ge(q)) return m.plant(q).value();
              for (var U = 0, G = s ? t[U].apply(this, L) : q; ++U < s; )
                G = t[U].call(this, G);
              return G;
            };
          });
        }
        function zn(e, t, s, o, h, p, m, _, P, L) {
          var q = t & H,
            U = t & re,
            G = t & ce,
            ee = t & (he | fe),
            ne = t & ve,
            we = G ? r : Rs(e);
          function ae() {
            for (var Ie = arguments.length, Oe = O(Ie), gr = Ie; gr--; )
              Oe[gr] = arguments[gr];
            if (ee)
              var er = as(ae),
                vr = Pf(Oe, er);
            if (
              (o && (Oe = bu(Oe, o, h, ee)),
              p && (Oe = Eu(Oe, p, m, ee)),
              (Ie -= vr),
              ee && Ie < L)
            ) {
              var Et = li(Oe, er);
              return Ru(e, t, zn, ae.placeholder, s, Oe, Et, _, P, L - Ie);
            }
            var Nr = U ? s : this,
              ti = G ? Nr[e] : e;
            return (
              (Ie = Oe.length),
              _ ? (Oe = $d(Oe, _)) : ne && Ie > 1 && Oe.reverse(),
              q && P < Ie && (Oe.length = P),
              this && this !== Ce && this instanceof ae && (ti = we || Rs(ti)),
              ti.apply(Nr, Oe)
            );
          }
          return ae;
        }
        function Ou(e, t) {
          return function (s, o) {
            return Up(s, e, t(o), {});
          };
        }
        function Un(e, t) {
          return function (s, o) {
            var h;
            if (s === r && o === r) return t;
            if ((s !== r && (h = s), o !== r)) {
              if (h === r) return o;
              typeof s == 'string' || typeof o == 'string'
                ? ((s = pr(s)), (o = pr(o)))
                : ((s = pu(s)), (o = pu(o))),
                (h = e(s, o));
            }
            return h;
          };
        }
        function wo(e) {
          return Yr(function (t) {
            return (
              (t = it(t, fr(se()))),
              be(function (s) {
                var o = this;
                return e(t, function (h) {
                  return Mt(h, o, s);
                });
              })
            );
          });
        }
        function Hn(e, t) {
          t = t === r ? ' ' : pr(t);
          var s = t.length;
          if (s < 2) return s ? lo(t, e) : t;
          var o = lo(t, On(e / Xi(t)));
          return Yi(t) ? vi(Ar(o), 0, e).join('') : o.slice(0, e);
        }
        function dd(e, t, s, o) {
          var h = t & re,
            p = Rs(e);
          function m() {
            for (
              var _ = -1,
                P = arguments.length,
                L = -1,
                q = o.length,
                U = O(q + P),
                G = this && this !== Ce && this instanceof m ? p : e;
              ++L < q;

            )
              U[L] = o[L];
            for (; P--; ) U[L++] = arguments[++_];
            return Mt(G, h ? s : this, U);
          }
          return m;
        }
        function Au(e) {
          return function (t, s, o) {
            return (
              o && typeof o != 'number' && Zt(t, s, o) && (s = o = r),
              (t = ei(t)),
              s === r ? ((s = t), (t = 0)) : (s = ei(s)),
              (o = o === r ? (t < s ? 1 : -1) : ei(o)),
              Zp(t, s, o, e)
            );
          };
        }
        function kn(e) {
          return function (t, s) {
            return (
              (typeof t == 'string' && typeof s == 'string') ||
                ((t = Pr(t)), (s = Pr(s))),
              e(t, s)
            );
          };
        }
        function Ru(e, t, s, o, h, p, m, _, P, L) {
          var q = t & he,
            U = q ? m : r,
            G = q ? r : m,
            ee = q ? p : r,
            ne = q ? r : p;
          (t |= q ? pe : $), (t &= ~(q ? $ : pe)), t & ue || (t &= ~(re | ce));
          var we = [e, t, h, ee, U, ne, G, _, P, L],
            ae = s.apply(r, we);
          return Co(e) && Hu(ae, we), (ae.placeholder = o), ku(ae, e, t);
        }
        function _o(e) {
          var t = Dt[e];
          return function (s, o) {
            if (
              ((s = Pr(s)), (o = o == null ? 0 : Bt(ye(o), 292)), o && kc(s))
            ) {
              var h = (Le(s) + 'e').split('e'),
                p = t(h[0] + 'e' + (+h[1] + o));
              return (
                (h = (Le(p) + 'e').split('e')), +(h[0] + 'e' + (+h[1] - o))
              );
            }
            return t(s);
          };
        }
        var gd =
          ts && 1 / mn(new ts([, -0]))[1] == Re
            ? function (e) {
                return new ts(e);
              }
            : Ho;
        function Tu(e) {
          return function (t) {
            var s = Vt(t);
            return s == me ? Ja(t) : s == De ? Nf(t) : xf(t, e(t));
          };
        }
        function Qr(e, t, s, o, h, p, m, _) {
          var P = t & ce;
          if (!P && typeof e != 'function') throw new _r(d);
          var L = o ? o.length : 0;
          if (
            (L || ((t &= ~(pe | $)), (o = h = r)),
            (m = m === r ? m : Lt(ye(m), 0)),
            (_ = _ === r ? _ : ye(_)),
            (L -= h ? h.length : 0),
            t & $)
          ) {
            var q = o,
              U = h;
            o = h = r;
          }
          var G = P ? r : Io(e),
            ee = [e, t, s, o, h, q, U, p, m, _];
          if (
            (G && Rd(ee, G),
            (e = ee[0]),
            (t = ee[1]),
            (s = ee[2]),
            (o = ee[3]),
            (h = ee[4]),
            (_ = ee[9] = ee[9] === r ? (P ? 0 : e.length) : Lt(ee[9] - L, 0)),
            !_ && t & (he | fe) && (t &= ~(he | fe)),
            !t || t == re)
          )
            var ne = fd(e, t, s);
          else
            t == he || t == fe
              ? (ne = pd(e, t, _))
              : (t == pe || t == (re | pe)) && !h.length
                ? (ne = dd(e, t, s, o))
                : (ne = zn.apply(r, ee));
          var we = G ? lu : Hu;
          return ku(we(ne, ee), e, t);
        }
        function Nu(e, t, s, o) {
          return e === r || (Tr(e, es[s]) && !Me.call(o, s)) ? t : e;
        }
        function $u(e, t, s, o, h, p) {
          return (
            ct(e) && ct(t) && (p.set(t, e), Ln(e, t, r, $u, p), p.delete(t)), e
          );
        }
        function vd(e) {
          return $s(e) ? r : e;
        }
        function Fu(e, t, s, o, h, p) {
          var m = s & F,
            _ = e.length,
            P = t.length;
          if (_ != P && !(m && P > _)) return !1;
          var L = p.get(e),
            q = p.get(t);
          if (L && q) return L == t && q == e;
          var U = -1,
            G = !0,
            ee = s & K ? new Ni() : r;
          for (p.set(e, t), p.set(t, e); ++U < _; ) {
            var ne = e[U],
              we = t[U];
            if (o) var ae = m ? o(we, ne, U, t, e, p) : o(ne, we, U, e, t, p);
            if (ae !== r) {
              if (ae) continue;
              G = !1;
              break;
            }
            if (ee) {
              if (
                !ka(t, function (Ie, Oe) {
                  if (!ws(ee, Oe) && (ne === Ie || h(ne, Ie, s, o, p)))
                    return ee.push(Oe);
                })
              ) {
                G = !1;
                break;
              }
            } else if (!(ne === we || h(ne, we, s, o, p))) {
              G = !1;
              break;
            }
          }
          return p.delete(e), p.delete(t), G;
        }
        function yd(e, t, s, o, h, p, m) {
          switch (s) {
            case ke:
              if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
                return !1;
              (e = e.buffer), (t = t.buffer);
            case Ne:
              return !(
                e.byteLength != t.byteLength || !p(new xn(e), new xn(t))
              );
            case T:
            case S:
            case Te:
              return Tr(+e, +t);
            case b:
              return e.name == t.name && e.message == t.message;
            case nt:
            case Je:
              return e == t + '';
            case me:
              var _ = Ja;
            case De:
              var P = o & F;
              if ((_ || (_ = mn), e.size != t.size && !P)) return !1;
              var L = m.get(e);
              if (L) return L == t;
              (o |= K), m.set(e, t);
              var q = Fu(_(e), _(t), o, h, p, m);
              return m.delete(e), q;
            case Qe:
              if (xs) return xs.call(e) == xs.call(t);
          }
          return !1;
        }
        function md(e, t, s, o, h, p) {
          var m = s & F,
            _ = bo(e),
            P = _.length,
            L = bo(t),
            q = L.length;
          if (P != q && !m) return !1;
          for (var U = P; U--; ) {
            var G = _[U];
            if (!(m ? G in t : Me.call(t, G))) return !1;
          }
          var ee = p.get(e),
            ne = p.get(t);
          if (ee && ne) return ee == t && ne == e;
          var we = !0;
          p.set(e, t), p.set(t, e);
          for (var ae = m; ++U < P; ) {
            G = _[U];
            var Ie = e[G],
              Oe = t[G];
            if (o) var gr = m ? o(Oe, Ie, G, t, e, p) : o(Ie, Oe, G, e, t, p);
            if (!(gr === r ? Ie === Oe || h(Ie, Oe, s, o, p) : gr)) {
              we = !1;
              break;
            }
            ae || (ae = G == 'constructor');
          }
          if (we && !ae) {
            var er = e.constructor,
              vr = t.constructor;
            er != vr &&
              'constructor' in e &&
              'constructor' in t &&
              !(
                typeof er == 'function' &&
                er instanceof er &&
                typeof vr == 'function' &&
                vr instanceof vr
              ) &&
              (we = !1);
          }
          return p.delete(e), p.delete(t), we;
        }
        function Yr(e) {
          return Ao(zu(e, r, Ju), e + '');
        }
        function bo(e) {
          return eu(e, jt, Po);
        }
        function Eo(e) {
          return eu(e, ar, Du);
        }
        var Io = Rn
          ? function (e) {
              return Rn.get(e);
            }
          : Ho;
        function Kn(e) {
          for (
            var t = e.name + '', s = rs[t], o = Me.call(rs, t) ? s.length : 0;
            o--;

          ) {
            var h = s[o],
              p = h.func;
            if (p == null || p == e) return h.name;
          }
          return t;
        }
        function as(e) {
          var t = Me.call(f, 'placeholder') ? f : e;
          return t.placeholder;
        }
        function se() {
          var e = f.iteratee || zo;
          return (
            (e = e === zo ? iu : e),
            arguments.length ? e(arguments[0], arguments[1]) : e
          );
        }
        function Bn(e, t) {
          var s = e.__data__;
          return Sd(t) ? s[typeof t == 'string' ? 'string' : 'hash'] : s.map;
        }
        function xo(e) {
          for (var t = jt(e), s = t.length; s--; ) {
            var o = t[s],
              h = e[o];
            t[s] = [o, h, Mu(h)];
          }
          return t;
        }
        function Di(e, t) {
          var s = Af(e, t);
          return ru(s) ? s : r;
        }
        function wd(e) {
          var t = Me.call(e, Ri),
            s = e[Ri];
          try {
            e[Ri] = r;
            var o = !0;
          } catch {}
          var h = En.call(e);
          return o && (t ? (e[Ri] = s) : delete e[Ri]), h;
        }
        var Po = Ya
            ? function (e) {
                return e == null
                  ? []
                  : ((e = Ge(e)),
                    ui(Ya(e), function (t) {
                      return Uc.call(e, t);
                    }));
              }
            : ko,
          Du = Ya
            ? function (e) {
                for (var t = []; e; ) hi(t, Po(e)), (e = Pn(e));
                return t;
              }
            : ko,
          Vt = Xt;
        ((Xa && Vt(new Xa(new ArrayBuffer(1))) != ke) ||
          (bs && Vt(new bs()) != me) ||
          (Za && Vt(Za.resolve()) != xt) ||
          (ts && Vt(new ts()) != De) ||
          (Es && Vt(new Es()) != ze)) &&
          (Vt = function (e) {
            var t = Xt(e),
              s = t == xe ? e.constructor : r,
              o = s ? Li(s) : '';
            if (o)
              switch (o) {
                case tp:
                  return ke;
                case rp:
                  return me;
                case ip:
                  return xt;
                case sp:
                  return De;
                case np:
                  return ze;
              }
            return t;
          });
        function _d(e, t, s) {
          for (var o = -1, h = s.length; ++o < h; ) {
            var p = s[o],
              m = p.size;
            switch (p.type) {
              case 'drop':
                e += m;
                break;
              case 'dropRight':
                t -= m;
                break;
              case 'take':
                t = Bt(t, e + m);
                break;
              case 'takeRight':
                e = Lt(e, t - m);
                break;
            }
          }
          return { start: e, end: t };
        }
        function bd(e) {
          var t = e.match(We);
          return t ? t[1].split(At) : [];
        }
        function Lu(e, t, s) {
          t = gi(t, e);
          for (var o = -1, h = t.length, p = !1; ++o < h; ) {
            var m = Ur(t[o]);
            if (!(p = e != null && s(e, m))) break;
            e = e[m];
          }
          return p || ++o != h
            ? p
            : ((h = e == null ? 0 : e.length),
              !!h && Xn(h) && Xr(m, h) && (ge(e) || qi(e)));
        }
        function Ed(e) {
          var t = e.length,
            s = new e.constructor(t);
          return (
            t &&
              typeof e[0] == 'string' &&
              Me.call(e, 'index') &&
              ((s.index = e.index), (s.input = e.input)),
            s
          );
        }
        function qu(e) {
          return typeof e.constructor == 'function' && !Ts(e) ? is(Pn(e)) : {};
        }
        function Id(e, t, s) {
          var o = e.constructor;
          switch (t) {
            case Ne:
              return mo(e);
            case T:
            case S:
              return new o(+e);
            case ke:
              return ad(e, s);
            case ht:
            case qe:
            case Pt:
            case Ft:
            case Ut:
            case Ht:
            case qt:
            case Jt:
            case rr:
              return wu(e, s);
            case me:
              return new o();
            case Te:
            case Je:
              return new o(e);
            case nt:
              return od(e);
            case De:
              return new o();
            case Qe:
              return cd(e);
          }
        }
        function xd(e, t) {
          var s = t.length;
          if (!s) return e;
          var o = s - 1;
          return (
            (t[o] = (s > 1 ? '& ' : '') + t[o]),
            (t = t.join(s > 2 ? ', ' : ' ')),
            e.replace(
              vt,
              `{
/* [wrapped with ` +
                t +
                `] */
`
            )
          );
        }
        function Pd(e) {
          return ge(e) || qi(e) || !!(Hc && e && e[Hc]);
        }
        function Xr(e, t) {
          var s = typeof e;
          return (
            (t = t ?? J),
            !!t &&
              (s == 'number' || (s != 'symbol' && Ca.test(e))) &&
              e > -1 &&
              e % 1 == 0 &&
              e < t
          );
        }
        function Zt(e, t, s) {
          if (!ct(s)) return !1;
          var o = typeof t;
          return (
            o == 'number' ? nr(s) && Xr(t, s.length) : o == 'string' && t in s
          )
            ? Tr(s[t], e)
            : !1;
        }
        function So(e, t) {
          if (ge(e)) return !1;
          var s = typeof e;
          return s == 'number' ||
            s == 'symbol' ||
            s == 'boolean' ||
            e == null ||
            dr(e)
            ? !0
            : St.test(e) || !rt.test(e) || (t != null && e in Ge(t));
        }
        function Sd(e) {
          var t = typeof e;
          return t == 'string' ||
            t == 'number' ||
            t == 'symbol' ||
            t == 'boolean'
            ? e !== '__proto__'
            : e === null;
        }
        function Co(e) {
          var t = Kn(e),
            s = f[t];
          if (typeof s != 'function' || !(t in Pe.prototype)) return !1;
          if (e === s) return !0;
          var o = Io(s);
          return !!o && e === o[0];
        }
        function Cd(e) {
          return !!Mc && Mc in e;
        }
        var Od = _n ? Zr : Ko;
        function Ts(e) {
          var t = e && e.constructor,
            s = (typeof t == 'function' && t.prototype) || es;
          return e === s;
        }
        function Mu(e) {
          return e === e && !ct(e);
        }
        function ju(e, t) {
          return function (s) {
            return s == null ? !1 : s[e] === t && (t !== r || e in Ge(s));
          };
        }
        function Ad(e) {
          var t = Qn(e, function (o) {
              return s.size === y && s.clear(), o;
            }),
            s = t.cache;
          return t;
        }
        function Rd(e, t) {
          var s = e[1],
            o = t[1],
            h = s | o,
            p = h < (re | ce | H),
            m =
              (o == H && s == he) ||
              (o == H && s == W && e[7].length <= t[8]) ||
              (o == (H | W) && t[7].length <= t[8] && s == he);
          if (!(p || m)) return e;
          o & re && ((e[2] = t[2]), (h |= s & re ? 0 : ue));
          var _ = t[3];
          if (_) {
            var P = e[3];
            (e[3] = P ? bu(P, _, t[4]) : _), (e[4] = P ? li(e[3], E) : t[4]);
          }
          return (
            (_ = t[5]),
            _ &&
              ((P = e[5]),
              (e[5] = P ? Eu(P, _, t[6]) : _),
              (e[6] = P ? li(e[5], E) : t[6])),
            (_ = t[7]),
            _ && (e[7] = _),
            o & H && (e[8] = e[8] == null ? t[8] : Bt(e[8], t[8])),
            e[9] == null && (e[9] = t[9]),
            (e[0] = t[0]),
            (e[1] = h),
            e
          );
        }
        function Td(e) {
          var t = [];
          if (e != null) for (var s in Ge(e)) t.push(s);
          return t;
        }
        function Nd(e) {
          return En.call(e);
        }
        function zu(e, t, s) {
          return (
            (t = Lt(t === r ? e.length - 1 : t, 0)),
            function () {
              for (
                var o = arguments, h = -1, p = Lt(o.length - t, 0), m = O(p);
                ++h < p;

              )
                m[h] = o[t + h];
              h = -1;
              for (var _ = O(t + 1); ++h < t; ) _[h] = o[h];
              return (_[t] = s(m)), Mt(e, this, _);
            }
          );
        }
        function Uu(e, t) {
          return t.length < 2 ? e : Fi(e, Ir(t, 0, -1));
        }
        function $d(e, t) {
          for (var s = e.length, o = Bt(t.length, s), h = sr(e); o--; ) {
            var p = t[o];
            e[o] = Xr(p, s) ? h[p] : r;
          }
          return e;
        }
        function Oo(e, t) {
          if (
            !(t === 'constructor' && typeof e[t] == 'function') &&
            t != '__proto__'
          )
            return e[t];
        }
        var Hu = Ku(lu),
          Ns =
            Wf ||
            function (e, t) {
              return Ce.setTimeout(e, t);
            },
          Ao = Ku(rd);
        function ku(e, t, s) {
          var o = t + '';
          return Ao(e, xd(o, Fd(bd(o), s)));
        }
        function Ku(e) {
          var t = 0,
            s = 0;
          return function () {
            var o = Xf(),
              h = et - (o - s);
            if (((s = o), h > 0)) {
              if (++t >= Ae) return arguments[0];
            } else t = 0;
            return e.apply(r, arguments);
          };
        }
        function Vn(e, t) {
          var s = -1,
            o = e.length,
            h = o - 1;
          for (t = t === r ? o : t; ++s < t; ) {
            var p = ho(s, h),
              m = e[p];
            (e[p] = e[s]), (e[s] = m);
          }
          return (e.length = t), e;
        }
        var Bu = Ad(function (e) {
          var t = [];
          return (
            e.charCodeAt(0) === 46 && t.push(''),
            e.replace(Ct, function (s, o, h, p) {
              t.push(h ? p.replace(ba, '$1') : o || s);
            }),
            t
          );
        });
        function Ur(e) {
          if (typeof e == 'string' || dr(e)) return e;
          var t = e + '';
          return t == '0' && 1 / e == -Re ? '-0' : t;
        }
        function Li(e) {
          if (e != null) {
            try {
              return bn.call(e);
            } catch {}
            try {
              return e + '';
            } catch {}
          }
          return '';
        }
        function Fd(e, t) {
          return (
            wr(Dr, function (s) {
              var o = '_.' + s[0];
              t & s[1] && !vn(e, o) && e.push(o);
            }),
            e.sort()
          );
        }
        function Vu(e) {
          if (e instanceof Pe) return e.clone();
          var t = new br(e.__wrapped__, e.__chain__);
          return (
            (t.__actions__ = sr(e.__actions__)),
            (t.__index__ = e.__index__),
            (t.__values__ = e.__values__),
            t
          );
        }
        function Dd(e, t, s) {
          (s ? Zt(e, t, s) : t === r) ? (t = 1) : (t = Lt(ye(t), 0));
          var o = e == null ? 0 : e.length;
          if (!o || t < 1) return [];
          for (var h = 0, p = 0, m = O(On(o / t)); h < o; )
            m[p++] = Ir(e, h, (h += t));
          return m;
        }
        function Ld(e) {
          for (
            var t = -1, s = e == null ? 0 : e.length, o = 0, h = [];
            ++t < s;

          ) {
            var p = e[t];
            p && (h[o++] = p);
          }
          return h;
        }
        function qd() {
          var e = arguments.length;
          if (!e) return [];
          for (var t = O(e - 1), s = arguments[0], o = e; o--; )
            t[o - 1] = arguments[o];
          return hi(ge(s) ? sr(s) : [s], kt(t, 1));
        }
        var Md = be(function (e, t) {
            return bt(e) ? Ss(e, kt(t, 1, bt, !0)) : [];
          }),
          jd = be(function (e, t) {
            var s = xr(t);
            return (
              bt(s) && (s = r), bt(e) ? Ss(e, kt(t, 1, bt, !0), se(s, 2)) : []
            );
          }),
          zd = be(function (e, t) {
            var s = xr(t);
            return bt(s) && (s = r), bt(e) ? Ss(e, kt(t, 1, bt, !0), r, s) : [];
          });
        function Ud(e, t, s) {
          var o = e == null ? 0 : e.length;
          return o
            ? ((t = s || t === r ? 1 : ye(t)), Ir(e, t < 0 ? 0 : t, o))
            : [];
        }
        function Hd(e, t, s) {
          var o = e == null ? 0 : e.length;
          return o
            ? ((t = s || t === r ? 1 : ye(t)),
              (t = o - t),
              Ir(e, 0, t < 0 ? 0 : t))
            : [];
        }
        function kd(e, t) {
          return e && e.length ? Mn(e, se(t, 3), !0, !0) : [];
        }
        function Kd(e, t) {
          return e && e.length ? Mn(e, se(t, 3), !0) : [];
        }
        function Bd(e, t, s, o) {
          var h = e == null ? 0 : e.length;
          return h
            ? (s && typeof s != 'number' && Zt(e, t, s) && ((s = 0), (o = h)),
              qp(e, t, s, o))
            : [];
        }
        function Gu(e, t, s) {
          var o = e == null ? 0 : e.length;
          if (!o) return -1;
          var h = s == null ? 0 : ye(s);
          return h < 0 && (h = Lt(o + h, 0)), yn(e, se(t, 3), h);
        }
        function Wu(e, t, s) {
          var o = e == null ? 0 : e.length;
          if (!o) return -1;
          var h = o - 1;
          return (
            s !== r && ((h = ye(s)), (h = s < 0 ? Lt(o + h, 0) : Bt(h, o - 1))),
            yn(e, se(t, 3), h, !0)
          );
        }
        function Ju(e) {
          var t = e == null ? 0 : e.length;
          return t ? kt(e, 1) : [];
        }
        function Vd(e) {
          var t = e == null ? 0 : e.length;
          return t ? kt(e, Re) : [];
        }
        function Gd(e, t) {
          var s = e == null ? 0 : e.length;
          return s ? ((t = t === r ? 1 : ye(t)), kt(e, t)) : [];
        }
        function Wd(e) {
          for (var t = -1, s = e == null ? 0 : e.length, o = {}; ++t < s; ) {
            var h = e[t];
            o[h[0]] = h[1];
          }
          return o;
        }
        function Qu(e) {
          return e && e.length ? e[0] : r;
        }
        function Jd(e, t, s) {
          var o = e == null ? 0 : e.length;
          if (!o) return -1;
          var h = s == null ? 0 : ye(s);
          return h < 0 && (h = Lt(o + h, 0)), Qi(e, t, h);
        }
        function Qd(e) {
          var t = e == null ? 0 : e.length;
          return t ? Ir(e, 0, -1) : [];
        }
        var Yd = be(function (e) {
            var t = it(e, vo);
            return t.length && t[0] === e[0] ? no(t) : [];
          }),
          Xd = be(function (e) {
            var t = xr(e),
              s = it(e, vo);
            return (
              t === xr(s) ? (t = r) : s.pop(),
              s.length && s[0] === e[0] ? no(s, se(t, 2)) : []
            );
          }),
          Zd = be(function (e) {
            var t = xr(e),
              s = it(e, vo);
            return (
              (t = typeof t == 'function' ? t : r),
              t && s.pop(),
              s.length && s[0] === e[0] ? no(s, r, t) : []
            );
          });
        function eg(e, t) {
          return e == null ? '' : Qf.call(e, t);
        }
        function xr(e) {
          var t = e == null ? 0 : e.length;
          return t ? e[t - 1] : r;
        }
        function tg(e, t, s) {
          var o = e == null ? 0 : e.length;
          if (!o) return -1;
          var h = o;
          return (
            s !== r && ((h = ye(s)), (h = h < 0 ? Lt(o + h, 0) : Bt(h, o - 1))),
            t === t ? Ff(e, t, h) : yn(e, Rc, h, !0)
          );
        }
        function rg(e, t) {
          return e && e.length ? ou(e, ye(t)) : r;
        }
        var ig = be(Yu);
        function Yu(e, t) {
          return e && e.length && t && t.length ? uo(e, t) : e;
        }
        function sg(e, t, s) {
          return e && e.length && t && t.length ? uo(e, t, se(s, 2)) : e;
        }
        function ng(e, t, s) {
          return e && e.length && t && t.length ? uo(e, t, r, s) : e;
        }
        var ag = Yr(function (e, t) {
          var s = e == null ? 0 : e.length,
            o = to(e, t);
          return (
            hu(
              e,
              it(t, function (h) {
                return Xr(h, s) ? +h : h;
              }).sort(_u)
            ),
            o
          );
        });
        function og(e, t) {
          var s = [];
          if (!(e && e.length)) return s;
          var o = -1,
            h = [],
            p = e.length;
          for (t = se(t, 3); ++o < p; ) {
            var m = e[o];
            t(m, o, e) && (s.push(m), h.push(o));
          }
          return hu(e, h), s;
        }
        function Ro(e) {
          return e == null ? e : ep.call(e);
        }
        function cg(e, t, s) {
          var o = e == null ? 0 : e.length;
          return o
            ? (s && typeof s != 'number' && Zt(e, t, s)
                ? ((t = 0), (s = o))
                : ((t = t == null ? 0 : ye(t)), (s = s === r ? o : ye(s))),
              Ir(e, t, s))
            : [];
        }
        function ug(e, t) {
          return qn(e, t);
        }
        function hg(e, t, s) {
          return fo(e, t, se(s, 2));
        }
        function lg(e, t) {
          var s = e == null ? 0 : e.length;
          if (s) {
            var o = qn(e, t);
            if (o < s && Tr(e[o], t)) return o;
          }
          return -1;
        }
        function fg(e, t) {
          return qn(e, t, !0);
        }
        function pg(e, t, s) {
          return fo(e, t, se(s, 2), !0);
        }
        function dg(e, t) {
          var s = e == null ? 0 : e.length;
          if (s) {
            var o = qn(e, t, !0) - 1;
            if (Tr(e[o], t)) return o;
          }
          return -1;
        }
        function gg(e) {
          return e && e.length ? fu(e) : [];
        }
        function vg(e, t) {
          return e && e.length ? fu(e, se(t, 2)) : [];
        }
        function yg(e) {
          var t = e == null ? 0 : e.length;
          return t ? Ir(e, 1, t) : [];
        }
        function mg(e, t, s) {
          return e && e.length
            ? ((t = s || t === r ? 1 : ye(t)), Ir(e, 0, t < 0 ? 0 : t))
            : [];
        }
        function wg(e, t, s) {
          var o = e == null ? 0 : e.length;
          return o
            ? ((t = s || t === r ? 1 : ye(t)),
              (t = o - t),
              Ir(e, t < 0 ? 0 : t, o))
            : [];
        }
        function _g(e, t) {
          return e && e.length ? Mn(e, se(t, 3), !1, !0) : [];
        }
        function bg(e, t) {
          return e && e.length ? Mn(e, se(t, 3)) : [];
        }
        var Eg = be(function (e) {
            return di(kt(e, 1, bt, !0));
          }),
          Ig = be(function (e) {
            var t = xr(e);
            return bt(t) && (t = r), di(kt(e, 1, bt, !0), se(t, 2));
          }),
          xg = be(function (e) {
            var t = xr(e);
            return (
              (t = typeof t == 'function' ? t : r), di(kt(e, 1, bt, !0), r, t)
            );
          });
        function Pg(e) {
          return e && e.length ? di(e) : [];
        }
        function Sg(e, t) {
          return e && e.length ? di(e, se(t, 2)) : [];
        }
        function Cg(e, t) {
          return (
            (t = typeof t == 'function' ? t : r),
            e && e.length ? di(e, r, t) : []
          );
        }
        function To(e) {
          if (!(e && e.length)) return [];
          var t = 0;
          return (
            (e = ui(e, function (s) {
              if (bt(s)) return (t = Lt(s.length, t)), !0;
            })),
            Ga(t, function (s) {
              return it(e, Ka(s));
            })
          );
        }
        function Xu(e, t) {
          if (!(e && e.length)) return [];
          var s = To(e);
          return t == null
            ? s
            : it(s, function (o) {
                return Mt(t, r, o);
              });
        }
        var Og = be(function (e, t) {
            return bt(e) ? Ss(e, t) : [];
          }),
          Ag = be(function (e) {
            return go(ui(e, bt));
          }),
          Rg = be(function (e) {
            var t = xr(e);
            return bt(t) && (t = r), go(ui(e, bt), se(t, 2));
          }),
          Tg = be(function (e) {
            var t = xr(e);
            return (t = typeof t == 'function' ? t : r), go(ui(e, bt), r, t);
          }),
          Ng = be(To);
        function $g(e, t) {
          return vu(e || [], t || [], Ps);
        }
        function Fg(e, t) {
          return vu(e || [], t || [], As);
        }
        var Dg = be(function (e) {
          var t = e.length,
            s = t > 1 ? e[t - 1] : r;
          return (s = typeof s == 'function' ? (e.pop(), s) : r), Xu(e, s);
        });
        function Zu(e) {
          var t = f(e);
          return (t.__chain__ = !0), t;
        }
        function Lg(e, t) {
          return t(e), e;
        }
        function Gn(e, t) {
          return t(e);
        }
        var qg = Yr(function (e) {
          var t = e.length,
            s = t ? e[0] : 0,
            o = this.__wrapped__,
            h = function (p) {
              return to(p, e);
            };
          return t > 1 ||
            this.__actions__.length ||
            !(o instanceof Pe) ||
            !Xr(s)
            ? this.thru(h)
            : ((o = o.slice(s, +s + (t ? 1 : 0))),
              o.__actions__.push({ func: Gn, args: [h], thisArg: r }),
              new br(o, this.__chain__).thru(function (p) {
                return t && !p.length && p.push(r), p;
              }));
        });
        function Mg() {
          return Zu(this);
        }
        function jg() {
          return new br(this.value(), this.__chain__);
        }
        function zg() {
          this.__values__ === r && (this.__values__ = ph(this.value()));
          var e = this.__index__ >= this.__values__.length,
            t = e ? r : this.__values__[this.__index__++];
          return { done: e, value: t };
        }
        function Ug() {
          return this;
        }
        function Hg(e) {
          for (var t, s = this; s instanceof Nn; ) {
            var o = Vu(s);
            (o.__index__ = 0),
              (o.__values__ = r),
              t ? (h.__wrapped__ = o) : (t = o);
            var h = o;
            s = s.__wrapped__;
          }
          return (h.__wrapped__ = e), t;
        }
        function kg() {
          var e = this.__wrapped__;
          if (e instanceof Pe) {
            var t = e;
            return (
              this.__actions__.length && (t = new Pe(this)),
              (t = t.reverse()),
              t.__actions__.push({ func: Gn, args: [Ro], thisArg: r }),
              new br(t, this.__chain__)
            );
          }
          return this.thru(Ro);
        }
        function Kg() {
          return gu(this.__wrapped__, this.__actions__);
        }
        var Bg = jn(function (e, t, s) {
          Me.call(e, s) ? ++e[s] : Jr(e, s, 1);
        });
        function Vg(e, t, s) {
          var o = ge(e) ? Oc : Lp;
          return s && Zt(e, t, s) && (t = r), o(e, se(t, 3));
        }
        function Gg(e, t) {
          var s = ge(e) ? ui : Xc;
          return s(e, se(t, 3));
        }
        var Wg = Su(Gu),
          Jg = Su(Wu);
        function Qg(e, t) {
          return kt(Wn(e, t), 1);
        }
        function Yg(e, t) {
          return kt(Wn(e, t), Re);
        }
        function Xg(e, t, s) {
          return (s = s === r ? 1 : ye(s)), kt(Wn(e, t), s);
        }
        function eh(e, t) {
          var s = ge(e) ? wr : pi;
          return s(e, se(t, 3));
        }
        function th(e, t) {
          var s = ge(e) ? yf : Yc;
          return s(e, se(t, 3));
        }
        var Zg = jn(function (e, t, s) {
          Me.call(e, s) ? e[s].push(t) : Jr(e, s, [t]);
        });
        function ev(e, t, s, o) {
          (e = nr(e) ? e : cs(e)), (s = s && !o ? ye(s) : 0);
          var h = e.length;
          return (
            s < 0 && (s = Lt(h + s, 0)),
            Zn(e) ? s <= h && e.indexOf(t, s) > -1 : !!h && Qi(e, t, s) > -1
          );
        }
        var tv = be(function (e, t, s) {
            var o = -1,
              h = typeof t == 'function',
              p = nr(e) ? O(e.length) : [];
            return (
              pi(e, function (m) {
                p[++o] = h ? Mt(t, m, s) : Cs(m, t, s);
              }),
              p
            );
          }),
          rv = jn(function (e, t, s) {
            Jr(e, s, t);
          });
        function Wn(e, t) {
          var s = ge(e) ? it : su;
          return s(e, se(t, 3));
        }
        function iv(e, t, s, o) {
          return e == null
            ? []
            : (ge(t) || (t = t == null ? [] : [t]),
              (s = o ? r : s),
              ge(s) || (s = s == null ? [] : [s]),
              cu(e, t, s));
        }
        var sv = jn(
          function (e, t, s) {
            e[s ? 0 : 1].push(t);
          },
          function () {
            return [[], []];
          }
        );
        function nv(e, t, s) {
          var o = ge(e) ? Ha : Nc,
            h = arguments.length < 3;
          return o(e, se(t, 4), s, h, pi);
        }
        function av(e, t, s) {
          var o = ge(e) ? mf : Nc,
            h = arguments.length < 3;
          return o(e, se(t, 4), s, h, Yc);
        }
        function ov(e, t) {
          var s = ge(e) ? ui : Xc;
          return s(e, Yn(se(t, 3)));
        }
        function cv(e) {
          var t = ge(e) ? Gc : ed;
          return t(e);
        }
        function uv(e, t, s) {
          (s ? Zt(e, t, s) : t === r) ? (t = 1) : (t = ye(t));
          var o = ge(e) ? Tp : td;
          return o(e, t);
        }
        function hv(e) {
          var t = ge(e) ? Np : id;
          return t(e);
        }
        function lv(e) {
          if (e == null) return 0;
          if (nr(e)) return Zn(e) ? Xi(e) : e.length;
          var t = Vt(e);
          return t == me || t == De ? e.size : oo(e).length;
        }
        function fv(e, t, s) {
          var o = ge(e) ? ka : sd;
          return s && Zt(e, t, s) && (t = r), o(e, se(t, 3));
        }
        var pv = be(function (e, t) {
            if (e == null) return [];
            var s = t.length;
            return (
              s > 1 && Zt(e, t[0], t[1])
                ? (t = [])
                : s > 2 && Zt(t[0], t[1], t[2]) && (t = [t[0]]),
              cu(e, kt(t, 1), [])
            );
          }),
          Jn =
            Gf ||
            function () {
              return Ce.Date.now();
            };
        function dv(e, t) {
          if (typeof t != 'function') throw new _r(d);
          return (
            (e = ye(e)),
            function () {
              if (--e < 1) return t.apply(this, arguments);
            }
          );
        }
        function rh(e, t, s) {
          return (
            (t = s ? r : t),
            (t = e && t == null ? e.length : t),
            Qr(e, H, r, r, r, r, t)
          );
        }
        function ih(e, t) {
          var s;
          if (typeof t != 'function') throw new _r(d);
          return (
            (e = ye(e)),
            function () {
              return (
                --e > 0 && (s = t.apply(this, arguments)), e <= 1 && (t = r), s
              );
            }
          );
        }
        var No = be(function (e, t, s) {
            var o = re;
            if (s.length) {
              var h = li(s, as(No));
              o |= pe;
            }
            return Qr(e, o, t, s, h);
          }),
          sh = be(function (e, t, s) {
            var o = re | ce;
            if (s.length) {
              var h = li(s, as(sh));
              o |= pe;
            }
            return Qr(t, o, e, s, h);
          });
        function nh(e, t, s) {
          t = s ? r : t;
          var o = Qr(e, he, r, r, r, r, r, t);
          return (o.placeholder = nh.placeholder), o;
        }
        function ah(e, t, s) {
          t = s ? r : t;
          var o = Qr(e, fe, r, r, r, r, r, t);
          return (o.placeholder = ah.placeholder), o;
        }
        function oh(e, t, s) {
          var o,
            h,
            p,
            m,
            _,
            P,
            L = 0,
            q = !1,
            U = !1,
            G = !0;
          if (typeof e != 'function') throw new _r(d);
          (t = Pr(t) || 0),
            ct(s) &&
              ((q = !!s.leading),
              (U = 'maxWait' in s),
              (p = U ? Lt(Pr(s.maxWait) || 0, t) : p),
              (G = 'trailing' in s ? !!s.trailing : G));
          function ee(Et) {
            var Nr = o,
              ti = h;
            return (o = h = r), (L = Et), (m = e.apply(ti, Nr)), m;
          }
          function ne(Et) {
            return (L = Et), (_ = Ns(Ie, t)), q ? ee(Et) : m;
          }
          function we(Et) {
            var Nr = Et - P,
              ti = Et - L,
              Sh = t - Nr;
            return U ? Bt(Sh, p - ti) : Sh;
          }
          function ae(Et) {
            var Nr = Et - P,
              ti = Et - L;
            return P === r || Nr >= t || Nr < 0 || (U && ti >= p);
          }
          function Ie() {
            var Et = Jn();
            if (ae(Et)) return Oe(Et);
            _ = Ns(Ie, we(Et));
          }
          function Oe(Et) {
            return (_ = r), G && o ? ee(Et) : ((o = h = r), m);
          }
          function gr() {
            _ !== r && yu(_), (L = 0), (o = P = h = _ = r);
          }
          function er() {
            return _ === r ? m : Oe(Jn());
          }
          function vr() {
            var Et = Jn(),
              Nr = ae(Et);
            if (((o = arguments), (h = this), (P = Et), Nr)) {
              if (_ === r) return ne(P);
              if (U) return yu(_), (_ = Ns(Ie, t)), ee(P);
            }
            return _ === r && (_ = Ns(Ie, t)), m;
          }
          return (vr.cancel = gr), (vr.flush = er), vr;
        }
        var gv = be(function (e, t) {
            return Qc(e, 1, t);
          }),
          vv = be(function (e, t, s) {
            return Qc(e, Pr(t) || 0, s);
          });
        function yv(e) {
          return Qr(e, ve);
        }
        function Qn(e, t) {
          if (typeof e != 'function' || (t != null && typeof t != 'function'))
            throw new _r(d);
          var s = function () {
            var o = arguments,
              h = t ? t.apply(this, o) : o[0],
              p = s.cache;
            if (p.has(h)) return p.get(h);
            var m = e.apply(this, o);
            return (s.cache = p.set(h, m) || p), m;
          };
          return (s.cache = new (Qn.Cache || Wr)()), s;
        }
        Qn.Cache = Wr;
        function Yn(e) {
          if (typeof e != 'function') throw new _r(d);
          return function () {
            var t = arguments;
            switch (t.length) {
              case 0:
                return !e.call(this);
              case 1:
                return !e.call(this, t[0]);
              case 2:
                return !e.call(this, t[0], t[1]);
              case 3:
                return !e.call(this, t[0], t[1], t[2]);
            }
            return !e.apply(this, t);
          };
        }
        function mv(e) {
          return ih(2, e);
        }
        var wv = nd(function (e, t) {
            t =
              t.length == 1 && ge(t[0])
                ? it(t[0], fr(se()))
                : it(kt(t, 1), fr(se()));
            var s = t.length;
            return be(function (o) {
              for (var h = -1, p = Bt(o.length, s); ++h < p; )
                o[h] = t[h].call(this, o[h]);
              return Mt(e, this, o);
            });
          }),
          $o = be(function (e, t) {
            var s = li(t, as($o));
            return Qr(e, pe, r, t, s);
          }),
          ch = be(function (e, t) {
            var s = li(t, as(ch));
            return Qr(e, $, r, t, s);
          }),
          _v = Yr(function (e, t) {
            return Qr(e, W, r, r, r, t);
          });
        function bv(e, t) {
          if (typeof e != 'function') throw new _r(d);
          return (t = t === r ? t : ye(t)), be(e, t);
        }
        function Ev(e, t) {
          if (typeof e != 'function') throw new _r(d);
          return (
            (t = t == null ? 0 : Lt(ye(t), 0)),
            be(function (s) {
              var o = s[t],
                h = vi(s, 0, t);
              return o && hi(h, o), Mt(e, this, h);
            })
          );
        }
        function Iv(e, t, s) {
          var o = !0,
            h = !0;
          if (typeof e != 'function') throw new _r(d);
          return (
            ct(s) &&
              ((o = 'leading' in s ? !!s.leading : o),
              (h = 'trailing' in s ? !!s.trailing : h)),
            oh(e, t, { leading: o, maxWait: t, trailing: h })
          );
        }
        function xv(e) {
          return rh(e, 1);
        }
        function Pv(e, t) {
          return $o(yo(t), e);
        }
        function Sv() {
          if (!arguments.length) return [];
          var e = arguments[0];
          return ge(e) ? e : [e];
        }
        function Cv(e) {
          return Er(e, j);
        }
        function Ov(e, t) {
          return (t = typeof t == 'function' ? t : r), Er(e, j, t);
        }
        function Av(e) {
          return Er(e, C | j);
        }
        function Rv(e, t) {
          return (t = typeof t == 'function' ? t : r), Er(e, C | j, t);
        }
        function Tv(e, t) {
          return t == null || Jc(e, t, jt(t));
        }
        function Tr(e, t) {
          return e === t || (e !== e && t !== t);
        }
        var Nv = kn(so),
          $v = kn(function (e, t) {
            return e >= t;
          }),
          qi = tu(
            (function () {
              return arguments;
            })()
          )
            ? tu
            : function (e) {
                return yt(e) && Me.call(e, 'callee') && !Uc.call(e, 'callee');
              },
          ge = O.isArray,
          Fv = Yt ? fr(Yt) : Hp;
        function nr(e) {
          return e != null && Xn(e.length) && !Zr(e);
        }
        function bt(e) {
          return yt(e) && nr(e);
        }
        function Dv(e) {
          return e === !0 || e === !1 || (yt(e) && Xt(e) == T);
        }
        var yi = Jf || Ko,
          Lv = Or ? fr(Or) : kp;
        function qv(e) {
          return yt(e) && e.nodeType === 1 && !$s(e);
        }
        function Mv(e) {
          if (e == null) return !0;
          if (
            nr(e) &&
            (ge(e) ||
              typeof e == 'string' ||
              typeof e.splice == 'function' ||
              yi(e) ||
              os(e) ||
              qi(e))
          )
            return !e.length;
          var t = Vt(e);
          if (t == me || t == De) return !e.size;
          if (Ts(e)) return !oo(e).length;
          for (var s in e) if (Me.call(e, s)) return !1;
          return !0;
        }
        function jv(e, t) {
          return Os(e, t);
        }
        function zv(e, t, s) {
          s = typeof s == 'function' ? s : r;
          var o = s ? s(e, t) : r;
          return o === r ? Os(e, t, r, s) : !!o;
        }
        function Fo(e) {
          if (!yt(e)) return !1;
          var t = Xt(e);
          return (
            t == b ||
            t == u ||
            (typeof e.message == 'string' &&
              typeof e.name == 'string' &&
              !$s(e))
          );
        }
        function Uv(e) {
          return typeof e == 'number' && kc(e);
        }
        function Zr(e) {
          if (!ct(e)) return !1;
          var t = Xt(e);
          return t == Z || t == oe || t == N || t == mt;
        }
        function uh(e) {
          return typeof e == 'number' && e == ye(e);
        }
        function Xn(e) {
          return typeof e == 'number' && e > -1 && e % 1 == 0 && e <= J;
        }
        function ct(e) {
          var t = typeof e;
          return e != null && (t == 'object' || t == 'function');
        }
        function yt(e) {
          return e != null && typeof e == 'object';
        }
        var hh = mr ? fr(mr) : Bp;
        function Hv(e, t) {
          return e === t || ao(e, t, xo(t));
        }
        function kv(e, t, s) {
          return (s = typeof s == 'function' ? s : r), ao(e, t, xo(t), s);
        }
        function Kv(e) {
          return lh(e) && e != +e;
        }
        function Bv(e) {
          if (Od(e)) throw new le(l);
          return ru(e);
        }
        function Vv(e) {
          return e === null;
        }
        function Gv(e) {
          return e == null;
        }
        function lh(e) {
          return typeof e == 'number' || (yt(e) && Xt(e) == Te);
        }
        function $s(e) {
          if (!yt(e) || Xt(e) != xe) return !1;
          var t = Pn(e);
          if (t === null) return !0;
          var s = Me.call(t, 'constructor') && t.constructor;
          return typeof s == 'function' && s instanceof s && bn.call(s) == kf;
        }
        var Do = Mr ? fr(Mr) : Vp;
        function Wv(e) {
          return uh(e) && e >= -J && e <= J;
        }
        var fh = ms ? fr(ms) : Gp;
        function Zn(e) {
          return typeof e == 'string' || (!ge(e) && yt(e) && Xt(e) == Je);
        }
        function dr(e) {
          return typeof e == 'symbol' || (yt(e) && Xt(e) == Qe);
        }
        var os = Ai ? fr(Ai) : Wp;
        function Jv(e) {
          return e === r;
        }
        function Qv(e) {
          return yt(e) && Vt(e) == ze;
        }
        function Yv(e) {
          return yt(e) && Xt(e) == Ye;
        }
        var Xv = kn(co),
          Zv = kn(function (e, t) {
            return e <= t;
          });
        function ph(e) {
          if (!e) return [];
          if (nr(e)) return Zn(e) ? Ar(e) : sr(e);
          if (_s && e[_s]) return Tf(e[_s]());
          var t = Vt(e),
            s = t == me ? Ja : t == De ? mn : cs;
          return s(e);
        }
        function ei(e) {
          if (!e) return e === 0 ? e : 0;
          if (((e = Pr(e)), e === Re || e === -Re)) {
            var t = e < 0 ? -1 : 1;
            return t * B;
          }
          return e === e ? e : 0;
        }
        function ye(e) {
          var t = ei(e),
            s = t % 1;
          return t === t ? (s ? t - s : t) : 0;
        }
        function dh(e) {
          return e ? $i(ye(e), 0, V) : 0;
        }
        function Pr(e) {
          if (typeof e == 'number') return e;
          if (dr(e)) return k;
          if (ct(e)) {
            var t = typeof e.valueOf == 'function' ? e.valueOf() : e;
            e = ct(t) ? t + '' : t;
          }
          if (typeof e != 'string') return e === 0 ? e : +e;
          e = $c(e);
          var s = xa.test(e);
          return s || Sa.test(e)
            ? de(e.slice(2), s ? 2 : 8)
            : Ia.test(e)
              ? k
              : +e;
        }
        function gh(e) {
          return zr(e, ar(e));
        }
        function ey(e) {
          return e ? $i(ye(e), -J, J) : e === 0 ? e : 0;
        }
        function Le(e) {
          return e == null ? '' : pr(e);
        }
        var ty = ss(function (e, t) {
            if (Ts(t) || nr(t)) {
              zr(t, jt(t), e);
              return;
            }
            for (var s in t) Me.call(t, s) && Ps(e, s, t[s]);
          }),
          vh = ss(function (e, t) {
            zr(t, ar(t), e);
          }),
          ea = ss(function (e, t, s, o) {
            zr(t, ar(t), e, o);
          }),
          ry = ss(function (e, t, s, o) {
            zr(t, jt(t), e, o);
          }),
          iy = Yr(to);
        function sy(e, t) {
          var s = is(e);
          return t == null ? s : Wc(s, t);
        }
        var ny = be(function (e, t) {
            e = Ge(e);
            var s = -1,
              o = t.length,
              h = o > 2 ? t[2] : r;
            for (h && Zt(t[0], t[1], h) && (o = 1); ++s < o; )
              for (var p = t[s], m = ar(p), _ = -1, P = m.length; ++_ < P; ) {
                var L = m[_],
                  q = e[L];
                (q === r || (Tr(q, es[L]) && !Me.call(e, L))) && (e[L] = p[L]);
              }
            return e;
          }),
          ay = be(function (e) {
            return e.push(r, $u), Mt(yh, r, e);
          });
        function oy(e, t) {
          return Ac(e, se(t, 3), jr);
        }
        function cy(e, t) {
          return Ac(e, se(t, 3), io);
        }
        function uy(e, t) {
          return e == null ? e : ro(e, se(t, 3), ar);
        }
        function hy(e, t) {
          return e == null ? e : Zc(e, se(t, 3), ar);
        }
        function ly(e, t) {
          return e && jr(e, se(t, 3));
        }
        function fy(e, t) {
          return e && io(e, se(t, 3));
        }
        function py(e) {
          return e == null ? [] : Dn(e, jt(e));
        }
        function dy(e) {
          return e == null ? [] : Dn(e, ar(e));
        }
        function Lo(e, t, s) {
          var o = e == null ? r : Fi(e, t);
          return o === r ? s : o;
        }
        function gy(e, t) {
          return e != null && Lu(e, t, Mp);
        }
        function qo(e, t) {
          return e != null && Lu(e, t, jp);
        }
        var vy = Ou(function (e, t, s) {
            t != null && typeof t.toString != 'function' && (t = En.call(t)),
              (e[t] = s);
          }, jo(or)),
          yy = Ou(function (e, t, s) {
            t != null && typeof t.toString != 'function' && (t = En.call(t)),
              Me.call(e, t) ? e[t].push(s) : (e[t] = [s]);
          }, se),
          my = be(Cs);
        function jt(e) {
          return nr(e) ? Vc(e) : oo(e);
        }
        function ar(e) {
          return nr(e) ? Vc(e, !0) : Jp(e);
        }
        function wy(e, t) {
          var s = {};
          return (
            (t = se(t, 3)),
            jr(e, function (o, h, p) {
              Jr(s, t(o, h, p), o);
            }),
            s
          );
        }
        function _y(e, t) {
          var s = {};
          return (
            (t = se(t, 3)),
            jr(e, function (o, h, p) {
              Jr(s, h, t(o, h, p));
            }),
            s
          );
        }
        var by = ss(function (e, t, s) {
            Ln(e, t, s);
          }),
          yh = ss(function (e, t, s, o) {
            Ln(e, t, s, o);
          }),
          Ey = Yr(function (e, t) {
            var s = {};
            if (e == null) return s;
            var o = !1;
            (t = it(t, function (p) {
              return (p = gi(p, e)), o || (o = p.length > 1), p;
            })),
              zr(e, Eo(e), s),
              o && (s = Er(s, C | A | j, vd));
            for (var h = t.length; h--; ) po(s, t[h]);
            return s;
          });
        function Iy(e, t) {
          return mh(e, Yn(se(t)));
        }
        var xy = Yr(function (e, t) {
          return e == null ? {} : Yp(e, t);
        });
        function mh(e, t) {
          if (e == null) return {};
          var s = it(Eo(e), function (o) {
            return [o];
          });
          return (
            (t = se(t)),
            uu(e, s, function (o, h) {
              return t(o, h[0]);
            })
          );
        }
        function Py(e, t, s) {
          t = gi(t, e);
          var o = -1,
            h = t.length;
          for (h || ((h = 1), (e = r)); ++o < h; ) {
            var p = e == null ? r : e[Ur(t[o])];
            p === r && ((o = h), (p = s)), (e = Zr(p) ? p.call(e) : p);
          }
          return e;
        }
        function Sy(e, t, s) {
          return e == null ? e : As(e, t, s);
        }
        function Cy(e, t, s, o) {
          return (
            (o = typeof o == 'function' ? o : r), e == null ? e : As(e, t, s, o)
          );
        }
        var wh = Tu(jt),
          _h = Tu(ar);
        function Oy(e, t, s) {
          var o = ge(e),
            h = o || yi(e) || os(e);
          if (((t = se(t, 4)), s == null)) {
            var p = e && e.constructor;
            h
              ? (s = o ? new p() : [])
              : ct(e)
                ? (s = Zr(p) ? is(Pn(e)) : {})
                : (s = {});
          }
          return (
            (h ? wr : jr)(e, function (m, _, P) {
              return t(s, m, _, P);
            }),
            s
          );
        }
        function Ay(e, t) {
          return e == null ? !0 : po(e, t);
        }
        function Ry(e, t, s) {
          return e == null ? e : du(e, t, yo(s));
        }
        function Ty(e, t, s, o) {
          return (
            (o = typeof o == 'function' ? o : r),
            e == null ? e : du(e, t, yo(s), o)
          );
        }
        function cs(e) {
          return e == null ? [] : Wa(e, jt(e));
        }
        function Ny(e) {
          return e == null ? [] : Wa(e, ar(e));
        }
        function $y(e, t, s) {
          return (
            s === r && ((s = t), (t = r)),
            s !== r && ((s = Pr(s)), (s = s === s ? s : 0)),
            t !== r && ((t = Pr(t)), (t = t === t ? t : 0)),
            $i(Pr(e), t, s)
          );
        }
        function Fy(e, t, s) {
          return (
            (t = ei(t)),
            s === r ? ((s = t), (t = 0)) : (s = ei(s)),
            (e = Pr(e)),
            zp(e, t, s)
          );
        }
        function Dy(e, t, s) {
          if (
            (s && typeof s != 'boolean' && Zt(e, t, s) && (t = s = r),
            s === r &&
              (typeof t == 'boolean'
                ? ((s = t), (t = r))
                : typeof e == 'boolean' && ((s = e), (e = r))),
            e === r && t === r
              ? ((e = 0), (t = 1))
              : ((e = ei(e)), t === r ? ((t = e), (e = 0)) : (t = ei(t))),
            e > t)
          ) {
            var o = e;
            (e = t), (t = o);
          }
          if (s || e % 1 || t % 1) {
            var h = Kc();
            return Bt(e + h * (t - e + Be('1e-' + ((h + '').length - 1))), t);
          }
          return ho(e, t);
        }
        var Ly = ns(function (e, t, s) {
          return (t = t.toLowerCase()), e + (s ? bh(t) : t);
        });
        function bh(e) {
          return Mo(Le(e).toLowerCase());
        }
        function Eh(e) {
          return (e = Le(e)), e && e.replace(Br, Sf).replace(ja, '');
        }
        function qy(e, t, s) {
          (e = Le(e)), (t = pr(t));
          var o = e.length;
          s = s === r ? o : $i(ye(s), 0, o);
          var h = s;
          return (s -= t.length), s >= 0 && e.slice(s, h) == t;
        }
        function My(e) {
          return (e = Le(e)), e && tt.test(e) ? e.replace(xi, Cf) : e;
        }
        function jy(e) {
          return (e = Le(e)), e && Ot.test(e) ? e.replace(dt, '\\$&') : e;
        }
        var zy = ns(function (e, t, s) {
            return e + (s ? '-' : '') + t.toLowerCase();
          }),
          Uy = ns(function (e, t, s) {
            return e + (s ? ' ' : '') + t.toLowerCase();
          }),
          Hy = Pu('toLowerCase');
        function ky(e, t, s) {
          (e = Le(e)), (t = ye(t));
          var o = t ? Xi(e) : 0;
          if (!t || o >= t) return e;
          var h = (t - o) / 2;
          return Hn(An(h), s) + e + Hn(On(h), s);
        }
        function Ky(e, t, s) {
          (e = Le(e)), (t = ye(t));
          var o = t ? Xi(e) : 0;
          return t && o < t ? e + Hn(t - o, s) : e;
        }
        function By(e, t, s) {
          (e = Le(e)), (t = ye(t));
          var o = t ? Xi(e) : 0;
          return t && o < t ? Hn(t - o, s) + e : e;
        }
        function Vy(e, t, s) {
          return (
            s || t == null ? (t = 0) : t && (t = +t),
            Zf(Le(e).replace(gt, ''), t || 0)
          );
        }
        function Gy(e, t, s) {
          return (
            (s ? Zt(e, t, s) : t === r) ? (t = 1) : (t = ye(t)), lo(Le(e), t)
          );
        }
        function Wy() {
          var e = arguments,
            t = Le(e[0]);
          return e.length < 3 ? t : t.replace(e[1], e[2]);
        }
        var Jy = ns(function (e, t, s) {
          return e + (s ? '_' : '') + t.toLowerCase();
        });
        function Qy(e, t, s) {
          return (
            s && typeof s != 'number' && Zt(e, t, s) && (t = s = r),
            (s = s === r ? V : s >>> 0),
            s
              ? ((e = Le(e)),
                e &&
                (typeof t == 'string' || (t != null && !Do(t))) &&
                ((t = pr(t)), !t && Yi(e))
                  ? vi(Ar(e), 0, s)
                  : e.split(t, s))
              : []
          );
        }
        var Yy = ns(function (e, t, s) {
          return e + (s ? ' ' : '') + Mo(t);
        });
        function Xy(e, t, s) {
          return (
            (e = Le(e)),
            (s = s == null ? 0 : $i(ye(s), 0, e.length)),
            (t = pr(t)),
            e.slice(s, s + t.length) == t
          );
        }
        function Zy(e, t, s) {
          var o = f.templateSettings;
          s && Zt(e, t, s) && (t = r), (e = Le(e)), (t = ea({}, t, o, Nu));
          var h = ea({}, t.imports, o.imports, Nu),
            p = jt(h),
            m = Wa(h, p),
            _,
            P,
            L = 0,
            q = t.interpolate || ki,
            U = "__p += '",
            G = Qa(
              (t.escape || ki).source +
                '|' +
                q.source +
                '|' +
                (q === ot ? Ea : ki).source +
                '|' +
                (t.evaluate || ki).source +
                '|$',
              'g'
            ),
            ee =
              '//# sourceURL=' +
              (Me.call(t, 'sourceURL')
                ? (t.sourceURL + '').replace(/\s/g, ' ')
                : 'lodash.templateSources[' + ++za + ']') +
              `
`;
          e.replace(G, function (ae, Ie, Oe, gr, er, vr) {
            return (
              Oe || (Oe = gr),
              (U += e.slice(L, vr).replace(Oa, Of)),
              Ie &&
                ((_ = !0),
                (U +=
                  `' +
__e(` +
                  Ie +
                  `) +
'`)),
              er &&
                ((P = !0),
                (U +=
                  `';
` +
                  er +
                  `;
__p += '`)),
              Oe &&
                (U +=
                  `' +
((__t = (` +
                  Oe +
                  `)) == null ? '' : __t) +
'`),
              (L = vr + ae.length),
              ae
            );
          }),
            (U += `';
`);
          var ne = Me.call(t, 'variable') && t.variable;
          if (!ne)
            U =
              `with (obj) {
` +
              U +
              `
}
`;
          else if (_a.test(ne)) throw new le(v);
          (U = (P ? U.replace(Lr, '') : U)
            .replace(Qt, '$1')
            .replace(Kr, '$1;')),
            (U =
              'function(' +
              (ne || 'obj') +
              `) {
` +
              (ne
                ? ''
                : `obj || (obj = {});
`) +
              "var __t, __p = ''" +
              (_ ? ', __e = _.escape' : '') +
              (P
                ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
`
                : `;
`) +
              U +
              `return __p
}`);
          var we = xh(function () {
            return Fe(p, ee + 'return ' + U).apply(r, m);
          });
          if (((we.source = U), Fo(we))) throw we;
          return we;
        }
        function e0(e) {
          return Le(e).toLowerCase();
        }
        function t0(e) {
          return Le(e).toUpperCase();
        }
        function r0(e, t, s) {
          if (((e = Le(e)), e && (s || t === r))) return $c(e);
          if (!e || !(t = pr(t))) return e;
          var o = Ar(e),
            h = Ar(t),
            p = Fc(o, h),
            m = Dc(o, h) + 1;
          return vi(o, p, m).join('');
        }
        function i0(e, t, s) {
          if (((e = Le(e)), e && (s || t === r))) return e.slice(0, qc(e) + 1);
          if (!e || !(t = pr(t))) return e;
          var o = Ar(e),
            h = Dc(o, Ar(t)) + 1;
          return vi(o, 0, h).join('');
        }
        function s0(e, t, s) {
          if (((e = Le(e)), e && (s || t === r))) return e.replace(gt, '');
          if (!e || !(t = pr(t))) return e;
          var o = Ar(e),
            h = Fc(o, Ar(t));
          return vi(o, h).join('');
        }
        function n0(e, t) {
          var s = te,
            o = Ee;
          if (ct(t)) {
            var h = 'separator' in t ? t.separator : h;
            (s = 'length' in t ? ye(t.length) : s),
              (o = 'omission' in t ? pr(t.omission) : o);
          }
          e = Le(e);
          var p = e.length;
          if (Yi(e)) {
            var m = Ar(e);
            p = m.length;
          }
          if (s >= p) return e;
          var _ = s - Xi(o);
          if (_ < 1) return o;
          var P = m ? vi(m, 0, _).join('') : e.slice(0, _);
          if (h === r) return P + o;
          if ((m && (_ += P.length - _), Do(h))) {
            if (e.slice(_).search(h)) {
              var L,
                q = P;
              for (
                h.global || (h = Qa(h.source, Le(yr.exec(h)) + 'g')),
                  h.lastIndex = 0;
                (L = h.exec(q));

              )
                var U = L.index;
              P = P.slice(0, U === r ? _ : U);
            }
          } else if (e.indexOf(pr(h), _) != _) {
            var G = P.lastIndexOf(h);
            G > -1 && (P = P.slice(0, G));
          }
          return P + o;
        }
        function a0(e) {
          return (e = Le(e)), e && lt.test(e) ? e.replace(oi, Df) : e;
        }
        var o0 = ns(function (e, t, s) {
            return e + (s ? ' ' : '') + t.toUpperCase();
          }),
          Mo = Pu('toUpperCase');
        function Ih(e, t, s) {
          return (
            (e = Le(e)),
            (t = s ? r : t),
            t === r ? (Rf(e) ? Mf(e) : bf(e)) : e.match(t) || []
          );
        }
        var xh = be(function (e, t) {
            try {
              return Mt(e, r, t);
            } catch (s) {
              return Fo(s) ? s : new le(s);
            }
          }),
          c0 = Yr(function (e, t) {
            return (
              wr(t, function (s) {
                (s = Ur(s)), Jr(e, s, No(e[s], e));
              }),
              e
            );
          });
        function u0(e) {
          var t = e == null ? 0 : e.length,
            s = se();
          return (
            (e = t
              ? it(e, function (o) {
                  if (typeof o[1] != 'function') throw new _r(d);
                  return [s(o[0]), o[1]];
                })
              : []),
            be(function (o) {
              for (var h = -1; ++h < t; ) {
                var p = e[h];
                if (Mt(p[0], this, o)) return Mt(p[1], this, o);
              }
            })
          );
        }
        function h0(e) {
          return Dp(Er(e, C));
        }
        function jo(e) {
          return function () {
            return e;
          };
        }
        function l0(e, t) {
          return e == null || e !== e ? t : e;
        }
        var f0 = Cu(),
          p0 = Cu(!0);
        function or(e) {
          return e;
        }
        function zo(e) {
          return iu(typeof e == 'function' ? e : Er(e, C));
        }
        function d0(e) {
          return nu(Er(e, C));
        }
        function g0(e, t) {
          return au(e, Er(t, C));
        }
        var v0 = be(function (e, t) {
            return function (s) {
              return Cs(s, e, t);
            };
          }),
          y0 = be(function (e, t) {
            return function (s) {
              return Cs(e, s, t);
            };
          });
        function Uo(e, t, s) {
          var o = jt(t),
            h = Dn(t, o);
          s == null &&
            !(ct(t) && (h.length || !o.length)) &&
            ((s = t), (t = e), (e = this), (h = Dn(t, jt(t))));
          var p = !(ct(s) && 'chain' in s) || !!s.chain,
            m = Zr(e);
          return (
            wr(h, function (_) {
              var P = t[_];
              (e[_] = P),
                m &&
                  (e.prototype[_] = function () {
                    var L = this.__chain__;
                    if (p || L) {
                      var q = e(this.__wrapped__),
                        U = (q.__actions__ = sr(this.__actions__));
                      return (
                        U.push({ func: P, args: arguments, thisArg: e }),
                        (q.__chain__ = L),
                        q
                      );
                    }
                    return P.apply(e, hi([this.value()], arguments));
                  });
            }),
            e
          );
        }
        function m0() {
          return Ce._ === this && (Ce._ = Kf), this;
        }
        function Ho() {}
        function w0(e) {
          return (
            (e = ye(e)),
            be(function (t) {
              return ou(t, e);
            })
          );
        }
        var _0 = wo(it),
          b0 = wo(Oc),
          E0 = wo(ka);
        function Ph(e) {
          return So(e) ? Ka(Ur(e)) : Xp(e);
        }
        function I0(e) {
          return function (t) {
            return e == null ? r : Fi(e, t);
          };
        }
        var x0 = Au(),
          P0 = Au(!0);
        function ko() {
          return [];
        }
        function Ko() {
          return !1;
        }
        function S0() {
          return {};
        }
        function C0() {
          return '';
        }
        function O0() {
          return !0;
        }
        function A0(e, t) {
          if (((e = ye(e)), e < 1 || e > J)) return [];
          var s = V,
            o = Bt(e, V);
          (t = se(t)), (e -= V);
          for (var h = Ga(o, t); ++s < e; ) t(s);
          return h;
        }
        function R0(e) {
          return ge(e) ? it(e, Ur) : dr(e) ? [e] : sr(Bu(Le(e)));
        }
        function T0(e) {
          var t = ++Hf;
          return Le(e) + t;
        }
        var N0 = Un(function (e, t) {
            return e + t;
          }, 0),
          $0 = _o('ceil'),
          F0 = Un(function (e, t) {
            return e / t;
          }, 1),
          D0 = _o('floor');
        function L0(e) {
          return e && e.length ? Fn(e, or, so) : r;
        }
        function q0(e, t) {
          return e && e.length ? Fn(e, se(t, 2), so) : r;
        }
        function M0(e) {
          return Tc(e, or);
        }
        function j0(e, t) {
          return Tc(e, se(t, 2));
        }
        function z0(e) {
          return e && e.length ? Fn(e, or, co) : r;
        }
        function U0(e, t) {
          return e && e.length ? Fn(e, se(t, 2), co) : r;
        }
        var H0 = Un(function (e, t) {
            return e * t;
          }, 1),
          k0 = _o('round'),
          K0 = Un(function (e, t) {
            return e - t;
          }, 0);
        function B0(e) {
          return e && e.length ? Va(e, or) : 0;
        }
        function V0(e, t) {
          return e && e.length ? Va(e, se(t, 2)) : 0;
        }
        return (
          (f.after = dv),
          (f.ary = rh),
          (f.assign = ty),
          (f.assignIn = vh),
          (f.assignInWith = ea),
          (f.assignWith = ry),
          (f.at = iy),
          (f.before = ih),
          (f.bind = No),
          (f.bindAll = c0),
          (f.bindKey = sh),
          (f.castArray = Sv),
          (f.chain = Zu),
          (f.chunk = Dd),
          (f.compact = Ld),
          (f.concat = qd),
          (f.cond = u0),
          (f.conforms = h0),
          (f.constant = jo),
          (f.countBy = Bg),
          (f.create = sy),
          (f.curry = nh),
          (f.curryRight = ah),
          (f.debounce = oh),
          (f.defaults = ny),
          (f.defaultsDeep = ay),
          (f.defer = gv),
          (f.delay = vv),
          (f.difference = Md),
          (f.differenceBy = jd),
          (f.differenceWith = zd),
          (f.drop = Ud),
          (f.dropRight = Hd),
          (f.dropRightWhile = kd),
          (f.dropWhile = Kd),
          (f.fill = Bd),
          (f.filter = Gg),
          (f.flatMap = Qg),
          (f.flatMapDeep = Yg),
          (f.flatMapDepth = Xg),
          (f.flatten = Ju),
          (f.flattenDeep = Vd),
          (f.flattenDepth = Gd),
          (f.flip = yv),
          (f.flow = f0),
          (f.flowRight = p0),
          (f.fromPairs = Wd),
          (f.functions = py),
          (f.functionsIn = dy),
          (f.groupBy = Zg),
          (f.initial = Qd),
          (f.intersection = Yd),
          (f.intersectionBy = Xd),
          (f.intersectionWith = Zd),
          (f.invert = vy),
          (f.invertBy = yy),
          (f.invokeMap = tv),
          (f.iteratee = zo),
          (f.keyBy = rv),
          (f.keys = jt),
          (f.keysIn = ar),
          (f.map = Wn),
          (f.mapKeys = wy),
          (f.mapValues = _y),
          (f.matches = d0),
          (f.matchesProperty = g0),
          (f.memoize = Qn),
          (f.merge = by),
          (f.mergeWith = yh),
          (f.method = v0),
          (f.methodOf = y0),
          (f.mixin = Uo),
          (f.negate = Yn),
          (f.nthArg = w0),
          (f.omit = Ey),
          (f.omitBy = Iy),
          (f.once = mv),
          (f.orderBy = iv),
          (f.over = _0),
          (f.overArgs = wv),
          (f.overEvery = b0),
          (f.overSome = E0),
          (f.partial = $o),
          (f.partialRight = ch),
          (f.partition = sv),
          (f.pick = xy),
          (f.pickBy = mh),
          (f.property = Ph),
          (f.propertyOf = I0),
          (f.pull = ig),
          (f.pullAll = Yu),
          (f.pullAllBy = sg),
          (f.pullAllWith = ng),
          (f.pullAt = ag),
          (f.range = x0),
          (f.rangeRight = P0),
          (f.rearg = _v),
          (f.reject = ov),
          (f.remove = og),
          (f.rest = bv),
          (f.reverse = Ro),
          (f.sampleSize = uv),
          (f.set = Sy),
          (f.setWith = Cy),
          (f.shuffle = hv),
          (f.slice = cg),
          (f.sortBy = pv),
          (f.sortedUniq = gg),
          (f.sortedUniqBy = vg),
          (f.split = Qy),
          (f.spread = Ev),
          (f.tail = yg),
          (f.take = mg),
          (f.takeRight = wg),
          (f.takeRightWhile = _g),
          (f.takeWhile = bg),
          (f.tap = Lg),
          (f.throttle = Iv),
          (f.thru = Gn),
          (f.toArray = ph),
          (f.toPairs = wh),
          (f.toPairsIn = _h),
          (f.toPath = R0),
          (f.toPlainObject = gh),
          (f.transform = Oy),
          (f.unary = xv),
          (f.union = Eg),
          (f.unionBy = Ig),
          (f.unionWith = xg),
          (f.uniq = Pg),
          (f.uniqBy = Sg),
          (f.uniqWith = Cg),
          (f.unset = Ay),
          (f.unzip = To),
          (f.unzipWith = Xu),
          (f.update = Ry),
          (f.updateWith = Ty),
          (f.values = cs),
          (f.valuesIn = Ny),
          (f.without = Og),
          (f.words = Ih),
          (f.wrap = Pv),
          (f.xor = Ag),
          (f.xorBy = Rg),
          (f.xorWith = Tg),
          (f.zip = Ng),
          (f.zipObject = $g),
          (f.zipObjectDeep = Fg),
          (f.zipWith = Dg),
          (f.entries = wh),
          (f.entriesIn = _h),
          (f.extend = vh),
          (f.extendWith = ea),
          Uo(f, f),
          (f.add = N0),
          (f.attempt = xh),
          (f.camelCase = Ly),
          (f.capitalize = bh),
          (f.ceil = $0),
          (f.clamp = $y),
          (f.clone = Cv),
          (f.cloneDeep = Av),
          (f.cloneDeepWith = Rv),
          (f.cloneWith = Ov),
          (f.conformsTo = Tv),
          (f.deburr = Eh),
          (f.defaultTo = l0),
          (f.divide = F0),
          (f.endsWith = qy),
          (f.eq = Tr),
          (f.escape = My),
          (f.escapeRegExp = jy),
          (f.every = Vg),
          (f.find = Wg),
          (f.findIndex = Gu),
          (f.findKey = oy),
          (f.findLast = Jg),
          (f.findLastIndex = Wu),
          (f.findLastKey = cy),
          (f.floor = D0),
          (f.forEach = eh),
          (f.forEachRight = th),
          (f.forIn = uy),
          (f.forInRight = hy),
          (f.forOwn = ly),
          (f.forOwnRight = fy),
          (f.get = Lo),
          (f.gt = Nv),
          (f.gte = $v),
          (f.has = gy),
          (f.hasIn = qo),
          (f.head = Qu),
          (f.identity = or),
          (f.includes = ev),
          (f.indexOf = Jd),
          (f.inRange = Fy),
          (f.invoke = my),
          (f.isArguments = qi),
          (f.isArray = ge),
          (f.isArrayBuffer = Fv),
          (f.isArrayLike = nr),
          (f.isArrayLikeObject = bt),
          (f.isBoolean = Dv),
          (f.isBuffer = yi),
          (f.isDate = Lv),
          (f.isElement = qv),
          (f.isEmpty = Mv),
          (f.isEqual = jv),
          (f.isEqualWith = zv),
          (f.isError = Fo),
          (f.isFinite = Uv),
          (f.isFunction = Zr),
          (f.isInteger = uh),
          (f.isLength = Xn),
          (f.isMap = hh),
          (f.isMatch = Hv),
          (f.isMatchWith = kv),
          (f.isNaN = Kv),
          (f.isNative = Bv),
          (f.isNil = Gv),
          (f.isNull = Vv),
          (f.isNumber = lh),
          (f.isObject = ct),
          (f.isObjectLike = yt),
          (f.isPlainObject = $s),
          (f.isRegExp = Do),
          (f.isSafeInteger = Wv),
          (f.isSet = fh),
          (f.isString = Zn),
          (f.isSymbol = dr),
          (f.isTypedArray = os),
          (f.isUndefined = Jv),
          (f.isWeakMap = Qv),
          (f.isWeakSet = Yv),
          (f.join = eg),
          (f.kebabCase = zy),
          (f.last = xr),
          (f.lastIndexOf = tg),
          (f.lowerCase = Uy),
          (f.lowerFirst = Hy),
          (f.lt = Xv),
          (f.lte = Zv),
          (f.max = L0),
          (f.maxBy = q0),
          (f.mean = M0),
          (f.meanBy = j0),
          (f.min = z0),
          (f.minBy = U0),
          (f.stubArray = ko),
          (f.stubFalse = Ko),
          (f.stubObject = S0),
          (f.stubString = C0),
          (f.stubTrue = O0),
          (f.multiply = H0),
          (f.nth = rg),
          (f.noConflict = m0),
          (f.noop = Ho),
          (f.now = Jn),
          (f.pad = ky),
          (f.padEnd = Ky),
          (f.padStart = By),
          (f.parseInt = Vy),
          (f.random = Dy),
          (f.reduce = nv),
          (f.reduceRight = av),
          (f.repeat = Gy),
          (f.replace = Wy),
          (f.result = Py),
          (f.round = k0),
          (f.runInContext = x),
          (f.sample = cv),
          (f.size = lv),
          (f.snakeCase = Jy),
          (f.some = fv),
          (f.sortedIndex = ug),
          (f.sortedIndexBy = hg),
          (f.sortedIndexOf = lg),
          (f.sortedLastIndex = fg),
          (f.sortedLastIndexBy = pg),
          (f.sortedLastIndexOf = dg),
          (f.startCase = Yy),
          (f.startsWith = Xy),
          (f.subtract = K0),
          (f.sum = B0),
          (f.sumBy = V0),
          (f.template = Zy),
          (f.times = A0),
          (f.toFinite = ei),
          (f.toInteger = ye),
          (f.toLength = dh),
          (f.toLower = e0),
          (f.toNumber = Pr),
          (f.toSafeInteger = ey),
          (f.toString = Le),
          (f.toUpper = t0),
          (f.trim = r0),
          (f.trimEnd = i0),
          (f.trimStart = s0),
          (f.truncate = n0),
          (f.unescape = a0),
          (f.uniqueId = T0),
          (f.upperCase = o0),
          (f.upperFirst = Mo),
          (f.each = eh),
          (f.eachRight = th),
          (f.first = Qu),
          Uo(
            f,
            (function () {
              var e = {};
              return (
                jr(f, function (t, s) {
                  Me.call(f.prototype, s) || (e[s] = t);
                }),
                e
              );
            })(),
            { chain: !1 }
          ),
          (f.VERSION = n),
          wr(
            [
              'bind',
              'bindKey',
              'curry',
              'curryRight',
              'partial',
              'partialRight',
            ],
            function (e) {
              f[e].placeholder = f;
            }
          ),
          wr(['drop', 'take'], function (e, t) {
            (Pe.prototype[e] = function (s) {
              s = s === r ? 1 : Lt(ye(s), 0);
              var o = this.__filtered__ && !t ? new Pe(this) : this.clone();
              return (
                o.__filtered__
                  ? (o.__takeCount__ = Bt(s, o.__takeCount__))
                  : o.__views__.push({
                      size: Bt(s, V),
                      type: e + (o.__dir__ < 0 ? 'Right' : ''),
                    }),
                o
              );
            }),
              (Pe.prototype[e + 'Right'] = function (s) {
                return this.reverse()[e](s).reverse();
              });
          }),
          wr(['filter', 'map', 'takeWhile'], function (e, t) {
            var s = t + 1,
              o = s == R || s == je;
            Pe.prototype[e] = function (h) {
              var p = this.clone();
              return (
                p.__iteratees__.push({ iteratee: se(h, 3), type: s }),
                (p.__filtered__ = p.__filtered__ || o),
                p
              );
            };
          }),
          wr(['head', 'last'], function (e, t) {
            var s = 'take' + (t ? 'Right' : '');
            Pe.prototype[e] = function () {
              return this[s](1).value()[0];
            };
          }),
          wr(['initial', 'tail'], function (e, t) {
            var s = 'drop' + (t ? '' : 'Right');
            Pe.prototype[e] = function () {
              return this.__filtered__ ? new Pe(this) : this[s](1);
            };
          }),
          (Pe.prototype.compact = function () {
            return this.filter(or);
          }),
          (Pe.prototype.find = function (e) {
            return this.filter(e).head();
          }),
          (Pe.prototype.findLast = function (e) {
            return this.reverse().find(e);
          }),
          (Pe.prototype.invokeMap = be(function (e, t) {
            return typeof e == 'function'
              ? new Pe(this)
              : this.map(function (s) {
                  return Cs(s, e, t);
                });
          })),
          (Pe.prototype.reject = function (e) {
            return this.filter(Yn(se(e)));
          }),
          (Pe.prototype.slice = function (e, t) {
            e = ye(e);
            var s = this;
            return s.__filtered__ && (e > 0 || t < 0)
              ? new Pe(s)
              : (e < 0 ? (s = s.takeRight(-e)) : e && (s = s.drop(e)),
                t !== r &&
                  ((t = ye(t)), (s = t < 0 ? s.dropRight(-t) : s.take(t - e))),
                s);
          }),
          (Pe.prototype.takeRightWhile = function (e) {
            return this.reverse().takeWhile(e).reverse();
          }),
          (Pe.prototype.toArray = function () {
            return this.take(V);
          }),
          jr(Pe.prototype, function (e, t) {
            var s = /^(?:filter|find|map|reject)|While$/.test(t),
              o = /^(?:head|last)$/.test(t),
              h = f[o ? 'take' + (t == 'last' ? 'Right' : '') : t],
              p = o || /^find/.test(t);
            h &&
              (f.prototype[t] = function () {
                var m = this.__wrapped__,
                  _ = o ? [1] : arguments,
                  P = m instanceof Pe,
                  L = _[0],
                  q = P || ge(m),
                  U = function (Ie) {
                    var Oe = h.apply(f, hi([Ie], _));
                    return o && G ? Oe[0] : Oe;
                  };
                q &&
                  s &&
                  typeof L == 'function' &&
                  L.length != 1 &&
                  (P = q = !1);
                var G = this.__chain__,
                  ee = !!this.__actions__.length,
                  ne = p && !G,
                  we = P && !ee;
                if (!p && q) {
                  m = we ? m : new Pe(this);
                  var ae = e.apply(m, _);
                  return (
                    ae.__actions__.push({ func: Gn, args: [U], thisArg: r }),
                    new br(ae, G)
                  );
                }
                return ne && we
                  ? e.apply(this, _)
                  : ((ae = this.thru(U)),
                    ne ? (o ? ae.value()[0] : ae.value()) : ae);
              });
          }),
          wr(
            ['pop', 'push', 'shift', 'sort', 'splice', 'unshift'],
            function (e) {
              var t = wn[e],
                s = /^(?:push|sort|unshift)$/.test(e) ? 'tap' : 'thru',
                o = /^(?:pop|shift)$/.test(e);
              f.prototype[e] = function () {
                var h = arguments;
                if (o && !this.__chain__) {
                  var p = this.value();
                  return t.apply(ge(p) ? p : [], h);
                }
                return this[s](function (m) {
                  return t.apply(ge(m) ? m : [], h);
                });
              };
            }
          ),
          jr(Pe.prototype, function (e, t) {
            var s = f[t];
            if (s) {
              var o = s.name + '';
              Me.call(rs, o) || (rs[o] = []), rs[o].push({ name: t, func: s });
            }
          }),
          (rs[zn(r, ce).name] = [{ name: 'wrapper', func: r }]),
          (Pe.prototype.clone = ap),
          (Pe.prototype.reverse = op),
          (Pe.prototype.value = cp),
          (f.prototype.at = qg),
          (f.prototype.chain = Mg),
          (f.prototype.commit = jg),
          (f.prototype.next = zg),
          (f.prototype.plant = Hg),
          (f.prototype.reverse = kg),
          (f.prototype.toJSON = f.prototype.valueOf = f.prototype.value = Kg),
          (f.prototype.first = f.prototype.head),
          _s && (f.prototype[_s] = Ug),
          f
        );
      },
      Zi = jf();
    _t ? (((_t.exports = Zi)._ = Zi), (Ve._ = Zi)) : (Ce._ = Zi);
  }).call(zs);
})(dc, dc.exports);
var eE = Object.defineProperty,
  tE = Object.defineProperties,
  rE = Object.getOwnPropertyDescriptors,
  bl = Object.getOwnPropertySymbols,
  iE = Object.prototype.hasOwnProperty,
  sE = Object.prototype.propertyIsEnumerable,
  El = (c, i, r) =>
    i in c
      ? eE(c, i, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (c[i] = r),
  aa = (c, i) => {
    for (var r in i || (i = {})) iE.call(i, r) && El(c, r, i[r]);
    if (bl) for (var r of bl(i)) sE.call(i, r) && El(c, r, i[r]);
    return c;
  },
  nE = (c, i) => tE(c, rE(i));
function Ei(c, i, r) {
  var n;
  const a = $m(c);
  return (
    ((n = i.rpcMap) == null ? void 0 : n[a.reference]) ||
    `${Zb}?chainId=${a.namespace}:${a.reference}&projectId=${r}`
  );
}
function Hi(c) {
  return c.includes(':') ? c.split(':')[1] : c;
}
function df(c) {
  return c.map((i) => `${i.split(':')[0]}:${i.split(':')[1]}`);
}
function aE(c, i) {
  const r = Object.keys(i.namespaces).filter((a) => a.includes(c));
  if (!r.length) return [];
  const n = [];
  return (
    r.forEach((a) => {
      const l = i.namespaces[a].accounts;
      n.push(...l);
    }),
    n
  );
}
function oE(c = {}, i = {}) {
  const r = Il(c),
    n = Il(i);
  return dc.exports.merge(r, n);
}
function Il(c) {
  var i, r, n, a;
  const l = {};
  if (!ua(c)) return l;
  for (const [d, v] of Object.entries(c)) {
    const w = Ll(d) ? [d] : v.chains,
      y = v.methods || [],
      E = v.events || [],
      C = v.rpcMap || {},
      A = Us(d);
    l[A] = nE(aa(aa({}, l[A]), v), {
      chains: Vo(w, (i = l[A]) == null ? void 0 : i.chains),
      methods: Vo(y, (r = l[A]) == null ? void 0 : r.methods),
      events: Vo(E, (n = l[A]) == null ? void 0 : n.events),
      rpcMap: aa(aa({}, C), (a = l[A]) == null ? void 0 : a.rpcMap),
    });
  }
  return l;
}
function cE(c) {
  return c.includes(':') ? c.split(':')[2] : c;
}
function uE(c) {
  const i = {};
  for (const [r, n] of Object.entries(c)) {
    const a = n.methods || [],
      l = n.events || [],
      d = n.accounts || [],
      v = Ll(r) ? [r] : n.chains ? n.chains : df(n.accounts);
    i[r] = { chains: v, methods: a, events: l, accounts: d };
  }
  return i;
}
function sc(c) {
  return typeof c == 'number'
    ? c
    : c.includes('0x')
      ? parseInt(c, 16)
      : c.includes(':')
        ? Number(c.split(':')[1])
        : Number(c);
}
const gf = {},
  st = (c) => gf[c],
  nc = (c, i) => {
    gf[c] = i;
  };
class hE {
  constructor(i) {
    (this.name = 'polkadot'),
      (this.namespace = i.namespace),
      (this.events = st('events')),
      (this.client = st('client')),
      (this.chainId = this.getDefaultChain()),
      (this.httpProviders = this.createHttpProviders());
  }
  updateNamespace(i) {
    this.namespace = Object.assign(this.namespace, i);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const i = this.namespace.chains[0];
    if (!i) throw new Error('ChainId not found');
    return i.split(':')[1];
  }
  request(i) {
    return this.namespace.methods.includes(i.request.method)
      ? this.client.request(i)
      : this.getHttpProvider().request(i.request);
  }
  setDefaultChain(i, r) {
    this.httpProviders[i] || this.setHttpProvider(i, r),
      (this.chainId = i),
      this.events.emit(ai.DEFAULT_CHAIN_CHANGED, `${this.name}:${i}`);
  }
  getAccounts() {
    const i = this.namespace.accounts;
    return i
      ? i
          .filter((r) => r.split(':')[1] === this.chainId.toString())
          .map((r) => r.split(':')[2]) || []
      : [];
  }
  createHttpProviders() {
    const i = {};
    return (
      this.namespace.chains.forEach((r) => {
        var n;
        const a = Hi(r);
        i[a] = this.createHttpProvider(
          a,
          (n = this.namespace.rpcMap) == null ? void 0 : n[r]
        );
      }),
      i
    );
  }
  getHttpProvider() {
    const i = `${this.name}:${this.chainId}`,
      r = this.httpProviders[i];
    if (typeof r > 'u') throw new Error(`JSON-RPC provider for ${i} not found`);
    return r;
  }
  setHttpProvider(i, r) {
    const n = this.createHttpProvider(i, r);
    n && (this.httpProviders[i] = n);
  }
  createHttpProvider(i, r) {
    const n = r || Ei(i, this.namespace, this.client.core.projectId);
    if (!n) throw new Error(`No RPC url provided for chainId: ${i}`);
    return new ni(new Ii(n, st('disableProviderPing')));
  }
}
class lE {
  constructor(i) {
    (this.name = 'eip155'),
      (this.namespace = i.namespace),
      (this.events = st('events')),
      (this.client = st('client')),
      (this.httpProviders = this.createHttpProviders()),
      (this.chainId = parseInt(this.getDefaultChain()));
  }
  async request(i) {
    switch (i.request.method) {
      case 'eth_requestAccounts':
        return this.getAccounts();
      case 'eth_accounts':
        return this.getAccounts();
      case 'wallet_switchEthereumChain':
        return await this.handleSwitchChain(i);
      case 'eth_chainId':
        return parseInt(this.getDefaultChain());
    }
    return this.namespace.methods.includes(i.request.method)
      ? await this.client.request(i)
      : this.getHttpProvider().request(i.request);
  }
  updateNamespace(i) {
    this.namespace = Object.assign(this.namespace, i);
  }
  setDefaultChain(i, r) {
    this.httpProviders[i] || this.setHttpProvider(parseInt(i), r),
      (this.chainId = parseInt(i)),
      this.events.emit(ai.DEFAULT_CHAIN_CHANGED, `${this.name}:${i}`);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId.toString();
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const i = this.namespace.chains[0];
    if (!i) throw new Error('ChainId not found');
    return i.split(':')[1];
  }
  createHttpProvider(i, r) {
    const n =
      r || Ei(`${this.name}:${i}`, this.namespace, this.client.core.projectId);
    if (!n) throw new Error(`No RPC url provided for chainId: ${i}`);
    return new ni(new Ii(n, st('disableProviderPing')));
  }
  setHttpProvider(i, r) {
    const n = this.createHttpProvider(i, r);
    n && (this.httpProviders[i] = n);
  }
  createHttpProviders() {
    const i = {};
    return (
      this.namespace.chains.forEach((r) => {
        var n;
        const a = parseInt(Hi(r));
        i[a] = this.createHttpProvider(
          a,
          (n = this.namespace.rpcMap) == null ? void 0 : n[r]
        );
      }),
      i
    );
  }
  getAccounts() {
    const i = this.namespace.accounts;
    return i
      ? [
          ...new Set(
            i
              .filter((r) => r.split(':')[1] === this.chainId.toString())
              .map((r) => r.split(':')[2])
          ),
        ]
      : [];
  }
  getHttpProvider() {
    const i = this.chainId,
      r = this.httpProviders[i];
    if (typeof r > 'u') throw new Error(`JSON-RPC provider for ${i} not found`);
    return r;
  }
  async handleSwitchChain(i) {
    var r, n;
    let a = i.request.params
      ? (r = i.request.params[0]) == null
        ? void 0
        : r.chainId
      : '0x0';
    a = a.startsWith('0x') ? a : `0x${a}`;
    const l = parseInt(a, 16);
    if (this.isChainApproved(l)) this.setDefaultChain(`${l}`);
    else if (this.namespace.methods.includes('wallet_switchEthereumChain'))
      await this.client.request({
        topic: i.topic,
        request: { method: i.request.method, params: [{ chainId: a }] },
        chainId: (n = this.namespace.chains) == null ? void 0 : n[0],
      }),
        this.setDefaultChain(`${l}`);
    else
      throw new Error(
        `Failed to switch to chain 'eip155:${l}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`
      );
    return null;
  }
  isChainApproved(i) {
    return this.namespace.chains.includes(`${this.name}:${i}`);
  }
}
class fE {
  constructor(i) {
    (this.name = 'solana'),
      (this.namespace = i.namespace),
      (this.events = st('events')),
      (this.client = st('client')),
      (this.chainId = this.getDefaultChain()),
      (this.httpProviders = this.createHttpProviders());
  }
  updateNamespace(i) {
    this.namespace = Object.assign(this.namespace, i);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(i) {
    return this.namespace.methods.includes(i.request.method)
      ? this.client.request(i)
      : this.getHttpProvider().request(i.request);
  }
  setDefaultChain(i, r) {
    this.httpProviders[i] || this.setHttpProvider(i, r),
      (this.chainId = i),
      this.events.emit(ai.DEFAULT_CHAIN_CHANGED, `${this.name}:${i}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const i = this.namespace.chains[0];
    if (!i) throw new Error('ChainId not found');
    return i.split(':')[1];
  }
  getAccounts() {
    const i = this.namespace.accounts;
    return i
      ? [
          ...new Set(
            i
              .filter((r) => r.split(':')[1] === this.chainId.toString())
              .map((r) => r.split(':')[2])
          ),
        ]
      : [];
  }
  createHttpProviders() {
    const i = {};
    return (
      this.namespace.chains.forEach((r) => {
        var n;
        const a = Hi(r);
        i[a] = this.createHttpProvider(
          a,
          (n = this.namespace.rpcMap) == null ? void 0 : n[r]
        );
      }),
      i
    );
  }
  getHttpProvider() {
    const i = `${this.name}:${this.chainId}`,
      r = this.httpProviders[i];
    if (typeof r > 'u') throw new Error(`JSON-RPC provider for ${i} not found`);
    return r;
  }
  setHttpProvider(i, r) {
    const n = this.createHttpProvider(i, r);
    n && (this.httpProviders[i] = n);
  }
  createHttpProvider(i, r) {
    const n = r || Ei(i, this.namespace, this.client.core.projectId);
    if (!n) throw new Error(`No RPC url provided for chainId: ${i}`);
    return new ni(new Ii(n, st('disableProviderPing')));
  }
}
class pE {
  constructor(i) {
    (this.name = 'cosmos'),
      (this.namespace = i.namespace),
      (this.events = st('events')),
      (this.client = st('client')),
      (this.chainId = this.getDefaultChain()),
      (this.httpProviders = this.createHttpProviders());
  }
  updateNamespace(i) {
    this.namespace = Object.assign(this.namespace, i);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const i = this.namespace.chains[0];
    if (!i) throw new Error('ChainId not found');
    return i.split(':')[1];
  }
  request(i) {
    return this.namespace.methods.includes(i.request.method)
      ? this.client.request(i)
      : this.getHttpProvider().request(i.request);
  }
  setDefaultChain(i, r) {
    this.httpProviders[i] || this.setHttpProvider(i, r),
      (this.chainId = i),
      this.events.emit(
        ai.DEFAULT_CHAIN_CHANGED,
        `${this.name}:${this.chainId}`
      );
  }
  getAccounts() {
    const i = this.namespace.accounts;
    return i
      ? [
          ...new Set(
            i
              .filter((r) => r.split(':')[1] === this.chainId.toString())
              .map((r) => r.split(':')[2])
          ),
        ]
      : [];
  }
  createHttpProviders() {
    const i = {};
    return (
      this.namespace.chains.forEach((r) => {
        var n;
        const a = Hi(r);
        i[a] = this.createHttpProvider(
          a,
          (n = this.namespace.rpcMap) == null ? void 0 : n[r]
        );
      }),
      i
    );
  }
  getHttpProvider() {
    const i = `${this.name}:${this.chainId}`,
      r = this.httpProviders[i];
    if (typeof r > 'u') throw new Error(`JSON-RPC provider for ${i} not found`);
    return r;
  }
  setHttpProvider(i, r) {
    const n = this.createHttpProvider(i, r);
    n && (this.httpProviders[i] = n);
  }
  createHttpProvider(i, r) {
    const n = r || Ei(i, this.namespace, this.client.core.projectId);
    if (!n) throw new Error(`No RPC url provided for chainId: ${i}`);
    return new ni(new Ii(n, st('disableProviderPing')));
  }
}
class dE {
  constructor(i) {
    (this.name = 'cip34'),
      (this.namespace = i.namespace),
      (this.events = st('events')),
      (this.client = st('client')),
      (this.chainId = this.getDefaultChain()),
      (this.httpProviders = this.createHttpProviders());
  }
  updateNamespace(i) {
    this.namespace = Object.assign(this.namespace, i);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const i = this.namespace.chains[0];
    if (!i) throw new Error('ChainId not found');
    return i.split(':')[1];
  }
  request(i) {
    return this.namespace.methods.includes(i.request.method)
      ? this.client.request(i)
      : this.getHttpProvider().request(i.request);
  }
  setDefaultChain(i, r) {
    this.httpProviders[i] || this.setHttpProvider(i, r),
      (this.chainId = i),
      this.events.emit(
        ai.DEFAULT_CHAIN_CHANGED,
        `${this.name}:${this.chainId}`
      );
  }
  getAccounts() {
    const i = this.namespace.accounts;
    return i
      ? [
          ...new Set(
            i
              .filter((r) => r.split(':')[1] === this.chainId.toString())
              .map((r) => r.split(':')[2])
          ),
        ]
      : [];
  }
  createHttpProviders() {
    const i = {};
    return (
      this.namespace.chains.forEach((r) => {
        const n = this.getCardanoRPCUrl(r),
          a = Hi(r);
        i[a] = this.createHttpProvider(a, n);
      }),
      i
    );
  }
  getHttpProvider() {
    const i = `${this.name}:${this.chainId}`,
      r = this.httpProviders[i];
    if (typeof r > 'u') throw new Error(`JSON-RPC provider for ${i} not found`);
    return r;
  }
  getCardanoRPCUrl(i) {
    const r = this.namespace.rpcMap;
    if (r) return r[i];
  }
  setHttpProvider(i, r) {
    const n = this.createHttpProvider(i, r);
    n && (this.httpProviders[i] = n);
  }
  createHttpProvider(i, r) {
    const n = r || this.getCardanoRPCUrl(i);
    if (!n) throw new Error(`No RPC url provided for chainId: ${i}`);
    return new ni(new Ii(n, st('disableProviderPing')));
  }
}
class gE {
  constructor(i) {
    (this.name = 'elrond'),
      (this.namespace = i.namespace),
      (this.events = st('events')),
      (this.client = st('client')),
      (this.chainId = this.getDefaultChain()),
      (this.httpProviders = this.createHttpProviders());
  }
  updateNamespace(i) {
    this.namespace = Object.assign(this.namespace, i);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(i) {
    return this.namespace.methods.includes(i.request.method)
      ? this.client.request(i)
      : this.getHttpProvider().request(i.request);
  }
  setDefaultChain(i, r) {
    this.httpProviders[i] || this.setHttpProvider(i, r),
      (this.chainId = i),
      this.events.emit(ai.DEFAULT_CHAIN_CHANGED, `${this.name}:${i}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const i = this.namespace.chains[0];
    if (!i) throw new Error('ChainId not found');
    return i.split(':')[1];
  }
  getAccounts() {
    const i = this.namespace.accounts;
    return i
      ? [
          ...new Set(
            i
              .filter((r) => r.split(':')[1] === this.chainId.toString())
              .map((r) => r.split(':')[2])
          ),
        ]
      : [];
  }
  createHttpProviders() {
    const i = {};
    return (
      this.namespace.chains.forEach((r) => {
        var n;
        const a = Hi(r);
        i[a] = this.createHttpProvider(
          a,
          (n = this.namespace.rpcMap) == null ? void 0 : n[r]
        );
      }),
      i
    );
  }
  getHttpProvider() {
    const i = `${this.name}:${this.chainId}`,
      r = this.httpProviders[i];
    if (typeof r > 'u') throw new Error(`JSON-RPC provider for ${i} not found`);
    return r;
  }
  setHttpProvider(i, r) {
    const n = this.createHttpProvider(i, r);
    n && (this.httpProviders[i] = n);
  }
  createHttpProvider(i, r) {
    const n = r || Ei(i, this.namespace, this.client.core.projectId);
    if (!n) throw new Error(`No RPC url provided for chainId: ${i}`);
    return new ni(new Ii(n, st('disableProviderPing')));
  }
}
class vE {
  constructor(i) {
    (this.name = 'multiversx'),
      (this.namespace = i.namespace),
      (this.events = st('events')),
      (this.client = st('client')),
      (this.chainId = this.getDefaultChain()),
      (this.httpProviders = this.createHttpProviders());
  }
  updateNamespace(i) {
    this.namespace = Object.assign(this.namespace, i);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(i) {
    return this.namespace.methods.includes(i.request.method)
      ? this.client.request(i)
      : this.getHttpProvider().request(i.request);
  }
  setDefaultChain(i, r) {
    this.httpProviders[i] || this.setHttpProvider(i, r),
      (this.chainId = i),
      this.events.emit(ai.DEFAULT_CHAIN_CHANGED, `${this.name}:${i}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const i = this.namespace.chains[0];
    if (!i) throw new Error('ChainId not found');
    return i.split(':')[1];
  }
  getAccounts() {
    const i = this.namespace.accounts;
    return i
      ? [
          ...new Set(
            i
              .filter((r) => r.split(':')[1] === this.chainId.toString())
              .map((r) => r.split(':')[2])
          ),
        ]
      : [];
  }
  createHttpProviders() {
    const i = {};
    return (
      this.namespace.chains.forEach((r) => {
        var n;
        const a = Hi(r);
        i[a] = this.createHttpProvider(
          a,
          (n = this.namespace.rpcMap) == null ? void 0 : n[r]
        );
      }),
      i
    );
  }
  getHttpProvider() {
    const i = `${this.name}:${this.chainId}`,
      r = this.httpProviders[i];
    if (typeof r > 'u') throw new Error(`JSON-RPC provider for ${i} not found`);
    return r;
  }
  setHttpProvider(i, r) {
    const n = this.createHttpProvider(i, r);
    n && (this.httpProviders[i] = n);
  }
  createHttpProvider(i, r) {
    const n = r || Ei(i, this.namespace, this.client.core.projectId);
    if (!n) throw new Error(`No RPC url provided for chainId: ${i}`);
    return new ni(new Ii(n, st('disableProviderPing')));
  }
}
class yE {
  constructor(i) {
    (this.name = 'near'),
      (this.namespace = i.namespace),
      (this.events = st('events')),
      (this.client = st('client')),
      (this.chainId = this.getDefaultChain()),
      (this.httpProviders = this.createHttpProviders());
  }
  updateNamespace(i) {
    this.namespace = Object.assign(this.namespace, i);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const i = this.namespace.chains[0];
    if (!i) throw new Error('ChainId not found');
    return i.split(':')[1];
  }
  request(i) {
    return this.namespace.methods.includes(i.request.method)
      ? this.client.request(i)
      : this.getHttpProvider().request(i.request);
  }
  setDefaultChain(i, r) {
    if (((this.chainId = i), !this.httpProviders[i])) {
      const n = r || Ei(`${this.name}:${i}`, this.namespace);
      if (!n) throw new Error(`No RPC url provided for chainId: ${i}`);
      this.setHttpProvider(i, n);
    }
    this.events.emit(ai.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const i = this.namespace.accounts;
    return i
      ? i
          .filter((r) => r.split(':')[1] === this.chainId.toString())
          .map((r) => r.split(':')[2]) || []
      : [];
  }
  createHttpProviders() {
    const i = {};
    return (
      this.namespace.chains.forEach((r) => {
        var n;
        i[r] = this.createHttpProvider(
          r,
          (n = this.namespace.rpcMap) == null ? void 0 : n[r]
        );
      }),
      i
    );
  }
  getHttpProvider() {
    const i = `${this.name}:${this.chainId}`,
      r = this.httpProviders[i];
    if (typeof r > 'u') throw new Error(`JSON-RPC provider for ${i} not found`);
    return r;
  }
  setHttpProvider(i, r) {
    const n = this.createHttpProvider(i, r);
    n && (this.httpProviders[i] = n);
  }
  createHttpProvider(i, r) {
    const n = r || Ei(i, this.namespace);
    return typeof n > 'u'
      ? void 0
      : new ni(new Ii(n, st('disableProviderPing')));
  }
}
var mE = Object.defineProperty,
  wE = Object.defineProperties,
  _E = Object.getOwnPropertyDescriptors,
  xl = Object.getOwnPropertySymbols,
  bE = Object.prototype.hasOwnProperty,
  EE = Object.prototype.propertyIsEnumerable,
  Pl = (c, i, r) =>
    i in c
      ? mE(c, i, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (c[i] = r),
  oa = (c, i) => {
    for (var r in i || (i = {})) bE.call(i, r) && Pl(c, r, i[r]);
    if (xl) for (var r of xl(i)) EE.call(i, r) && Pl(c, r, i[r]);
    return c;
  },
  ac = (c, i) => wE(c, _E(i));
class Sc {
  constructor(i) {
    (this.events = new mc()),
      (this.rpcProviders = {}),
      (this.shouldAbortPairingAttempt = !1),
      (this.maxPairingAttempts = 10),
      (this.disableProviderPing = !1),
      (this.providerOpts = i),
      (this.logger =
        typeof (i == null ? void 0 : i.logger) < 'u' &&
        typeof (i == null ? void 0 : i.logger) != 'string'
          ? i.logger
          : Se.pino(
              Se.getDefaultLoggerOptions({
                level: (i == null ? void 0 : i.logger) || wl,
              })
            )),
      (this.disableProviderPing =
        (i == null ? void 0 : i.disableProviderPing) || !1);
  }
  static async init(i) {
    const r = new Sc(i);
    return await r.initialize(), r;
  }
  async request(i, r) {
    const [n, a] = this.validateChain(r);
    if (!this.session)
      throw new Error('Please call connect() before request()');
    return await this.getProvider(n).request({
      request: oa({}, i),
      chainId: `${n}:${a}`,
      topic: this.session.topic,
    });
  }
  sendAsync(i, r, n) {
    const a = new Date().getTime();
    this.request(i, n)
      .then((l) => r(null, ya(a, l)))
      .catch((l) => r(l, void 0));
  }
  async enable() {
    if (!this.client) throw new Error('Sign Client not initialized');
    return (
      this.session ||
        (await this.connect({
          namespaces: this.namespaces,
          optionalNamespaces: this.optionalNamespaces,
          sessionProperties: this.sessionProperties,
        })),
      await this.requestAccounts()
    );
  }
  async disconnect() {
    var i;
    if (!this.session) throw new Error('Please call connect() before enable()');
    await this.client.disconnect({
      topic: (i = this.session) == null ? void 0 : i.topic,
      reason: Gt('USER_DISCONNECTED'),
    }),
      await this.cleanup();
  }
  async connect(i) {
    if (!this.client) throw new Error('Sign Client not initialized');
    if (
      (this.setNamespaces(i),
      await this.cleanupPendingPairings(),
      !i.skipPairing)
    )
      return await this.pair(i.pairingTopic);
  }
  on(i, r) {
    this.events.on(i, r);
  }
  once(i, r) {
    this.events.once(i, r);
  }
  removeListener(i, r) {
    this.events.removeListener(i, r);
  }
  off(i, r) {
    this.events.off(i, r);
  }
  get isWalletConnect() {
    return !0;
  }
  async pair(i) {
    this.shouldAbortPairingAttempt = !1;
    let r = 0;
    do {
      if (this.shouldAbortPairingAttempt) throw new Error('Pairing aborted');
      if (r >= this.maxPairingAttempts)
        throw new Error('Max auto pairing attempts reached');
      const { uri: n, approval: a } = await this.client.connect({
        pairingTopic: i,
        requiredNamespaces: this.namespaces,
        optionalNamespaces: this.optionalNamespaces,
        sessionProperties: this.sessionProperties,
      });
      n && ((this.uri = n), this.events.emit('display_uri', n)),
        await a()
          .then((l) => {
            (this.session = l),
              this.namespaces ||
                ((this.namespaces = uE(l.namespaces)),
                this.persist('namespaces', this.namespaces));
          })
          .catch((l) => {
            if (l.message !== ff) throw l;
            r++;
          });
    } while (!this.session);
    return this.onConnect(), this.session;
  }
  setDefaultChain(i, r) {
    try {
      if (!this.session) return;
      const [n, a] = this.validateChain(i);
      this.getProvider(n).setDefaultChain(a, r);
    } catch (n) {
      if (!/Please call connect/.test(n.message)) throw n;
    }
  }
  async cleanupPendingPairings(i = {}) {
    this.logger.info('Cleaning up inactive pairings...');
    const r = this.client.pairing.getAll();
    if (ps(r)) {
      for (const n of r)
        i.deletePairings
          ? this.client.core.expirer.set(n.topic, 0)
          : await this.client.core.relayer.subscriber.unsubscribe(n.topic);
      this.logger.info(`Inactive pairings cleared: ${r.length}`);
    }
  }
  abortPairingAttempt() {
    this.shouldAbortPairingAttempt = !0;
  }
  async checkStorage() {
    if (
      ((this.namespaces = await this.getFromStore('namespaces')),
      (this.optionalNamespaces =
        (await this.getFromStore('optionalNamespaces')) || {}),
      this.client.session.length)
    ) {
      const i = this.client.session.keys.length - 1;
      (this.session = this.client.session.get(this.client.session.keys[i])),
        this.createProviders();
    }
  }
  async initialize() {
    this.logger.trace('Initialized'),
      await this.createClient(),
      await this.checkStorage(),
      this.registerEventListeners();
  }
  async createClient() {
    (this.client =
      this.providerOpts.client ||
      (await Jb.init({
        logger: this.providerOpts.logger || wl,
        relayUrl: this.providerOpts.relayUrl || Qb,
        projectId: this.providerOpts.projectId,
        metadata: this.providerOpts.metadata,
        storageOptions: this.providerOpts.storageOptions,
        storage: this.providerOpts.storage,
        name: this.providerOpts.name,
      }))),
      this.logger.trace('SignClient Initialized');
  }
  createProviders() {
    if (!this.client) throw new Error('Sign Client not initialized');
    if (!this.session)
      throw new Error(
        'Session not initialized. Please call connect() before enable()'
      );
    const i = [
      ...new Set(Object.keys(this.session.namespaces).map((r) => Us(r))),
    ];
    nc('client', this.client),
      nc('events', this.events),
      nc('disableProviderPing', this.disableProviderPing),
      i.forEach((r) => {
        if (!this.session) return;
        const n = aE(r, this.session),
          a = df(n),
          l = oE(this.namespaces, this.optionalNamespaces),
          d = ac(oa({}, l[r]), { accounts: n, chains: a });
        switch (r) {
          case 'eip155':
            this.rpcProviders[r] = new lE({ namespace: d });
            break;
          case 'solana':
            this.rpcProviders[r] = new fE({ namespace: d });
            break;
          case 'cosmos':
            this.rpcProviders[r] = new pE({ namespace: d });
            break;
          case 'polkadot':
            this.rpcProviders[r] = new hE({ namespace: d });
            break;
          case 'cip34':
            this.rpcProviders[r] = new dE({ namespace: d });
            break;
          case 'elrond':
            this.rpcProviders[r] = new gE({ namespace: d });
            break;
          case 'multiversx':
            this.rpcProviders[r] = new vE({ namespace: d });
            break;
          case 'near':
            this.rpcProviders[r] = new yE({ namespace: d });
            break;
        }
      });
  }
  registerEventListeners() {
    if (typeof this.client > 'u')
      throw new Error('Sign Client is not initialized');
    this.client.on('session_ping', (i) => {
      this.events.emit('session_ping', i);
    }),
      this.client.on('session_event', (i) => {
        const { params: r } = i,
          { event: n } = r;
        if (n.name === 'accountsChanged') {
          const a = n.data;
          a && ps(a) && this.events.emit('accountsChanged', a.map(cE));
        } else if (n.name === 'chainChanged') {
          const a = r.chainId,
            l = r.event.data,
            d = Us(a),
            v = sc(a) !== sc(l) ? `${d}:${sc(l)}` : a;
          this.onChainChanged(v);
        } else this.events.emit(n.name, n.data);
        this.events.emit('session_event', i);
      }),
      this.client.on('session_update', ({ topic: i, params: r }) => {
        var n;
        const { namespaces: a } = r,
          l = (n = this.client) == null ? void 0 : n.session.get(i);
        (this.session = ac(oa({}, l), { namespaces: a })),
          this.onSessionUpdate(),
          this.events.emit('session_update', { topic: i, params: r });
      }),
      this.client.on('session_delete', async (i) => {
        await this.cleanup(),
          this.events.emit('session_delete', i),
          this.events.emit(
            'disconnect',
            ac(oa({}, Gt('USER_DISCONNECTED')), { data: i.topic })
          );
      }),
      this.on(ai.DEFAULT_CHAIN_CHANGED, (i) => {
        this.onChainChanged(i, !0);
      });
  }
  getProvider(i) {
    if (!this.rpcProviders[i]) throw new Error(`Provider not found: ${i}`);
    return this.rpcProviders[i];
  }
  onSessionUpdate() {
    Object.keys(this.rpcProviders).forEach((i) => {
      var r;
      this.getProvider(i).updateNamespace(
        (r = this.session) == null ? void 0 : r.namespaces[i]
      );
    });
  }
  setNamespaces(i) {
    const { namespaces: r, optionalNamespaces: n, sessionProperties: a } = i;
    r && Object.keys(r).length && (this.namespaces = r),
      n && Object.keys(n).length && (this.optionalNamespaces = n),
      (this.sessionProperties = a),
      this.persist('namespaces', r),
      this.persist('optionalNamespaces', n);
  }
  validateChain(i) {
    const [r, n] = (i == null ? void 0 : i.split(':')) || ['', ''];
    if (!this.namespaces || !Object.keys(this.namespaces).length) return [r, n];
    if (
      r &&
      !Object.keys(this.namespaces || {})
        .map((d) => Us(d))
        .includes(r)
    )
      throw new Error(
        `Namespace '${r}' is not configured. Please call connect() first with namespace config.`
      );
    if (r && n) return [r, n];
    const a = Us(Object.keys(this.namespaces)[0]),
      l = this.rpcProviders[a].getDefaultChain();
    return [a, l];
  }
  async requestAccounts() {
    const [i] = this.validateChain();
    return await this.getProvider(i).requestAccounts();
  }
  onChainChanged(i, r = !1) {
    var n;
    if (!this.namespaces) return;
    const [a, l] = this.validateChain(i);
    r || this.getProvider(a).setDefaultChain(l),
      (((n = this.namespaces[a]) != null
        ? n
        : this.namespaces[`${a}:${l}`]
      ).defaultChain = l),
      this.persist('namespaces', this.namespaces),
      this.events.emit('chainChanged', l);
  }
  onConnect() {
    this.createProviders(),
      this.events.emit('connect', { session: this.session });
  }
  async cleanup() {
    (this.session = void 0),
      (this.namespaces = void 0),
      (this.optionalNamespaces = void 0),
      (this.sessionProperties = void 0),
      this.persist('namespaces', void 0),
      this.persist('optionalNamespaces', void 0),
      this.persist('sessionProperties', void 0),
      await this.cleanupPendingPairings({ deletePairings: !0 });
  }
  persist(i, r) {
    this.client.core.storage.setItem(`${_l}/${i}`, r);
  }
  async getFromStore(i) {
    return await this.client.core.storage.getItem(`${_l}/${i}`);
  }
}
const IE = Sc,
  xE = 'wc',
  PE = 'ethereum_provider',
  SE = `${xE}@2:${PE}:`,
  CE = 'https://rpc.walletconnect.com/v1/',
  gc = ['eth_sendTransaction', 'personal_sign'],
  OE = [
    'eth_accounts',
    'eth_requestAccounts',
    'eth_sendRawTransaction',
    'eth_sign',
    'eth_signTransaction',
    'eth_signTypedData',
    'eth_signTypedData_v3',
    'eth_signTypedData_v4',
    'eth_sendTransaction',
    'personal_sign',
    'wallet_switchEthereumChain',
    'wallet_addEthereumChain',
    'wallet_getPermissions',
    'wallet_requestPermissions',
    'wallet_registerOnboarding',
    'wallet_watchAsset',
    'wallet_scanQRCode',
  ],
  vc = ['chainChanged', 'accountsChanged'],
  AE = ['chainChanged', 'accountsChanged', 'message', 'disconnect', 'connect'];
var RE = Object.defineProperty,
  TE = Object.defineProperties,
  NE = Object.getOwnPropertyDescriptors,
  Sl = Object.getOwnPropertySymbols,
  $E = Object.prototype.hasOwnProperty,
  FE = Object.prototype.propertyIsEnumerable,
  Cl = (c, i, r) =>
    i in c
      ? RE(c, i, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (c[i] = r),
  ks = (c, i) => {
    for (var r in i || (i = {})) $E.call(i, r) && Cl(c, r, i[r]);
    if (Sl) for (var r of Sl(i)) FE.call(i, r) && Cl(c, r, i[r]);
    return c;
  },
  Ol = (c, i) => TE(c, NE(i));
function da(c) {
  return Number(c[0].split(':')[1]);
}
function oc(c) {
  return `0x${c.toString(16)}`;
}
function DE(c) {
  const {
    chains: i,
    optionalChains: r,
    methods: n,
    optionalMethods: a,
    events: l,
    optionalEvents: d,
    rpcMap: v,
  } = c;
  if (!ps(i)) throw new Error('Invalid chains');
  const w = {
      chains: i,
      methods: n || gc,
      events: l || vc,
      rpcMap: ks({}, i.length ? { [da(i)]: v[da(i)] } : {}),
    },
    y = l == null ? void 0 : l.filter((j) => !vc.includes(j)),
    E = n == null ? void 0 : n.filter((j) => !gc.includes(j));
  if (!r && !d && !a && !(y != null && y.length) && !(E != null && E.length))
    return { required: i.length ? w : void 0 };
  const C =
      ((y == null ? void 0 : y.length) && (E == null ? void 0 : E.length)) ||
      !r,
    A = {
      chains: [...new Set(C ? w.chains.concat(r || []) : r)],
      methods: [...new Set(w.methods.concat(a != null && a.length ? a : OE))],
      events: [...new Set(w.events.concat(d != null && d.length ? d : AE))],
      rpcMap: v,
    };
  return { required: i.length ? w : void 0, optional: r.length ? A : void 0 };
}
class Cc {
  constructor() {
    (this.events = new kr.EventEmitter()),
      (this.namespace = 'eip155'),
      (this.accounts = []),
      (this.chainId = 1),
      (this.STORAGE_KEY = SE),
      (this.on = (i, r) => (this.events.on(i, r), this)),
      (this.once = (i, r) => (this.events.once(i, r), this)),
      (this.removeListener = (i, r) => (
        this.events.removeListener(i, r), this
      )),
      (this.off = (i, r) => (this.events.off(i, r), this)),
      (this.parseAccount = (i) =>
        this.isCompatibleChainId(i) ? this.parseAccountId(i).address : i),
      (this.signer = {}),
      (this.rpc = {});
  }
  static async init(i) {
    const r = new Cc();
    return await r.initialize(i), r;
  }
  async request(i) {
    return await this.signer.request(i, this.formatChainId(this.chainId));
  }
  sendAsync(i, r) {
    this.signer.sendAsync(i, r, this.formatChainId(this.chainId));
  }
  get connected() {
    return this.signer.client ? this.signer.client.core.relayer.connected : !1;
  }
  get connecting() {
    return this.signer.client ? this.signer.client.core.relayer.connecting : !1;
  }
  async enable() {
    return (
      this.session || (await this.connect()),
      await this.request({ method: 'eth_requestAccounts' })
    );
  }
  async connect(i) {
    if (!this.signer.client)
      throw new Error('Provider not initialized. Call init() first');
    this.loadConnectOpts(i);
    const { required: r, optional: n } = DE(this.rpc);
    try {
      const a = await new Promise(async (d, v) => {
        var w;
        this.rpc.showQrModal &&
          ((w = this.modal) == null ||
            w.subscribeModal((y) => {
              !y.open &&
                !this.signer.session &&
                (this.signer.abortPairingAttempt(),
                v(new Error('Connection request reset. Please try again.')));
            })),
          await this.signer
            .connect(
              Ol(
                ks(
                  { namespaces: ks({}, r && { [this.namespace]: r }) },
                  n && { optionalNamespaces: { [this.namespace]: n } }
                ),
                { pairingTopic: i == null ? void 0 : i.pairingTopic }
              )
            )
            .then((y) => {
              d(y);
            })
            .catch((y) => {
              v(new Error(y.message));
            });
      });
      if (!a) return;
      const l = Fm(a.namespaces, [this.namespace]);
      this.setChainIds(this.rpc.chains.length ? this.rpc.chains : l),
        this.setAccounts(l),
        this.events.emit('connect', { chainId: oc(this.chainId) });
    } catch (a) {
      throw (this.signer.logger.error(a), a);
    } finally {
      this.modal && this.modal.closeModal();
    }
  }
  async disconnect() {
    this.session && (await this.signer.disconnect()), this.reset();
  }
  get isWalletConnect() {
    return !0;
  }
  get session() {
    return this.signer.session;
  }
  registerEventListeners() {
    this.signer.on('session_event', (i) => {
      const { params: r } = i,
        { event: n } = r;
      n.name === 'accountsChanged'
        ? ((this.accounts = this.parseAccounts(n.data)),
          this.events.emit('accountsChanged', this.accounts))
        : n.name === 'chainChanged'
          ? this.setChainId(this.formatChainId(n.data))
          : this.events.emit(n.name, n.data),
        this.events.emit('session_event', i);
    }),
      this.signer.on('chainChanged', (i) => {
        const r = parseInt(i);
        (this.chainId = r),
          this.events.emit('chainChanged', oc(this.chainId)),
          this.persist();
      }),
      this.signer.on('session_update', (i) => {
        this.events.emit('session_update', i);
      }),
      this.signer.on('session_delete', (i) => {
        this.reset(),
          this.events.emit('session_delete', i),
          this.events.emit(
            'disconnect',
            Ol(ks({}, Gt('USER_DISCONNECTED')), {
              data: i.topic,
              name: 'USER_DISCONNECTED',
            })
          );
      }),
      this.signer.on('display_uri', (i) => {
        var r, n;
        this.rpc.showQrModal &&
          ((r = this.modal) == null || r.closeModal(),
          (n = this.modal) == null || n.openModal({ uri: i })),
          this.events.emit('display_uri', i);
      });
  }
  switchEthereumChain(i) {
    this.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: i.toString(16) }],
    });
  }
  isCompatibleChainId(i) {
    return typeof i == 'string' ? i.startsWith(`${this.namespace}:`) : !1;
  }
  formatChainId(i) {
    return `${this.namespace}:${i}`;
  }
  parseChainId(i) {
    return Number(i.split(':')[1]);
  }
  setChainIds(i) {
    const r = i
      .filter((n) => this.isCompatibleChainId(n))
      .map((n) => this.parseChainId(n));
    r.length &&
      ((this.chainId = r[0]),
      this.events.emit('chainChanged', oc(this.chainId)),
      this.persist());
  }
  setChainId(i) {
    if (this.isCompatibleChainId(i)) {
      const r = this.parseChainId(i);
      (this.chainId = r), this.switchEthereumChain(r);
    }
  }
  parseAccountId(i) {
    const [r, n, a] = i.split(':');
    return { chainId: `${r}:${n}`, address: a };
  }
  setAccounts(i) {
    (this.accounts = i
      .filter(
        (r) =>
          this.parseChainId(this.parseAccountId(r).chainId) === this.chainId
      )
      .map((r) => this.parseAccountId(r).address)),
      this.events.emit('accountsChanged', this.accounts);
  }
  getRpcConfig(i) {
    var r, n;
    const a = (r = i == null ? void 0 : i.chains) != null ? r : [],
      l = (n = i == null ? void 0 : i.optionalChains) != null ? n : [],
      d = a.concat(l);
    if (!d.length)
      throw new Error(
        'No chains specified in either `chains` or `optionalChains`'
      );
    const v = a.length ? (i == null ? void 0 : i.methods) || gc : [],
      w = a.length ? (i == null ? void 0 : i.events) || vc : [],
      y = (i == null ? void 0 : i.optionalMethods) || [],
      E = (i == null ? void 0 : i.optionalEvents) || [],
      C = (i == null ? void 0 : i.rpcMap) || this.buildRpcMap(d, i.projectId),
      A = (i == null ? void 0 : i.qrModalOptions) || void 0;
    return {
      chains: a == null ? void 0 : a.map((j) => this.formatChainId(j)),
      optionalChains: l.map((j) => this.formatChainId(j)),
      methods: v,
      events: w,
      optionalMethods: y,
      optionalEvents: E,
      rpcMap: C,
      showQrModal: !!(i != null && i.showQrModal),
      qrModalOptions: A,
      projectId: i.projectId,
      metadata: i.metadata,
    };
  }
  buildRpcMap(i, r) {
    const n = {};
    return (
      i.forEach((a) => {
        n[a] = this.getRpcUrl(a, r);
      }),
      n
    );
  }
  async initialize(i) {
    if (
      ((this.rpc = this.getRpcConfig(i)),
      (this.chainId = this.rpc.chains.length
        ? da(this.rpc.chains)
        : da(this.rpc.optionalChains)),
      (this.signer = await IE.init({
        projectId: this.rpc.projectId,
        metadata: this.rpc.metadata,
        disableProviderPing: i.disableProviderPing,
        relayUrl: i.relayUrl,
        storageOptions: i.storageOptions,
      })),
      this.registerEventListeners(),
      await this.loadPersistedSession(),
      this.rpc.showQrModal)
    ) {
      let r;
      try {
        const { WalletConnectModal: n } = await G0(
          () => import('./index-22d8af47.js').then((a) => a.i),
          ['./index-22d8af47.js', './iframe-d50da200.js'],
          import.meta.url
        );
        r = n;
      } catch {
        throw new Error(
          'To use QR modal, please install @walletconnect/modal package'
        );
      }
      if (r)
        try {
          this.modal = new r(
            ks({ projectId: this.rpc.projectId }, this.rpc.qrModalOptions)
          );
        } catch (n) {
          throw (
            (this.signer.logger.error(n),
            new Error('Could not generate WalletConnectModal Instance'))
          );
        }
    }
  }
  loadConnectOpts(i) {
    if (!i) return;
    const { chains: r, optionalChains: n, rpcMap: a } = i;
    r &&
      ps(r) &&
      ((this.rpc.chains = r.map((l) => this.formatChainId(l))),
      r.forEach((l) => {
        this.rpc.rpcMap[l] = (a == null ? void 0 : a[l]) || this.getRpcUrl(l);
      })),
      n &&
        ps(n) &&
        ((this.rpc.optionalChains = []),
        (this.rpc.optionalChains =
          n == null ? void 0 : n.map((l) => this.formatChainId(l))),
        n.forEach((l) => {
          this.rpc.rpcMap[l] = (a == null ? void 0 : a[l]) || this.getRpcUrl(l);
        }));
  }
  getRpcUrl(i, r) {
    var n;
    return (
      ((n = this.rpc.rpcMap) == null ? void 0 : n[i]) ||
      `${CE}?chainId=eip155:${i}&projectId=${r || this.rpc.projectId}`
    );
  }
  async loadPersistedSession() {
    if (!this.session) return;
    const i = await this.signer.client.core.storage.getItem(
        `${this.STORAGE_KEY}/chainId`
      ),
      r = this.session.namespaces[`${this.namespace}:${i}`]
        ? this.session.namespaces[`${this.namespace}:${i}`]
        : this.session.namespaces[this.namespace];
    this.setChainIds(
      i ? [this.formatChainId(i)] : r == null ? void 0 : r.accounts
    ),
      this.setAccounts(r == null ? void 0 : r.accounts);
  }
  reset() {
    (this.chainId = 1), (this.accounts = []);
  }
  persist() {
    this.session &&
      this.signer.client.core.storage.setItem(
        `${this.STORAGE_KEY}/chainId`,
        this.chainId
      );
  }
  parseAccounts(i) {
    return typeof i == 'string' || i instanceof String
      ? [this.parseAccount(i)]
      : i.map((r) => this.parseAccount(r));
  }
}
const lI = Cc;
export {
  lI as EthereumProvider,
  AE as OPTIONAL_EVENTS,
  OE as OPTIONAL_METHODS,
  vc as REQUIRED_EVENTS,
  gc as REQUIRED_METHODS,
  Cc as default,
};
