import { _ as Ie } from './iframe-d50da200.js';
const ue = Symbol(),
  Z = Object.getPrototypeOf,
  z = new WeakMap(),
  _e = (e) =>
    e &&
    (z.has(e)
      ? z.get(e)
      : Z(e) === Object.prototype || Z(e) === Array.prototype),
  fe = (e) => (_e(e) && e[ue]) || null,
  ee = (e, t = !0) => {
    z.set(e, t);
  },
  K = (e) => typeof e == 'object' && e !== null,
  w = new WeakMap(),
  k = new WeakSet(),
  pe = (
    e = Object.is,
    t = (o, p) => new Proxy(o, p),
    s = (o) =>
      K(o) &&
      !k.has(o) &&
      (Array.isArray(o) || !(Symbol.iterator in o)) &&
      !(o instanceof WeakMap) &&
      !(o instanceof WeakSet) &&
      !(o instanceof Error) &&
      !(o instanceof Number) &&
      !(o instanceof Date) &&
      !(o instanceof String) &&
      !(o instanceof RegExp) &&
      !(o instanceof ArrayBuffer),
    r = (o) => {
      switch (o.status) {
        case 'fulfilled':
          return o.value;
        case 'rejected':
          throw o.reason;
        default:
          throw o;
      }
    },
    l = new WeakMap(),
    c = (o, p, m = r) => {
      const T = l.get(o);
      if ((T == null ? void 0 : T[0]) === p) return T[1];
      const L = Array.isArray(o) ? [] : Object.create(Object.getPrototypeOf(o));
      return (
        ee(L, !0),
        l.set(o, [p, L]),
        Reflect.ownKeys(o).forEach((W) => {
          if (Object.getOwnPropertyDescriptor(L, W)) return;
          const C = Reflect.get(o, W),
            V = { value: C, enumerable: !0, configurable: !0 };
          if (k.has(C)) ee(C, !1);
          else if (C instanceof Promise) delete V.value, (V.get = () => m(C));
          else if (w.has(C)) {
            const [A, $] = w.get(C);
            V.value = c(A, $(), m);
          }
          Object.defineProperty(L, W, V);
        }),
        Object.preventExtensions(L)
      );
    },
    _ = new WeakMap(),
    u = [1, 1],
    O = (o) => {
      if (!K(o)) throw new Error('object required');
      const p = _.get(o);
      if (p) return p;
      let m = u[0];
      const T = new Set(),
        L = (i, a = ++u[0]) => {
          m !== a && ((m = a), T.forEach((n) => n(i, a)));
        };
      let W = u[1];
      const C = (i = ++u[1]) => (
          W !== i &&
            !T.size &&
            ((W = i),
            A.forEach(([a]) => {
              const n = a[1](i);
              n > m && (m = n);
            })),
          m
        ),
        V = (i) => (a, n) => {
          const f = [...a];
          (f[1] = [i, ...f[1]]), L(f, n);
        },
        A = new Map(),
        $ = (i, a) => {
          if (T.size) {
            const n = a[3](V(i));
            A.set(i, [a, n]);
          } else A.set(i, [a]);
        },
        Q = (i) => {
          var a;
          const n = A.get(i);
          n && (A.delete(i), (a = n[1]) == null || a.call(n));
        },
        de = (i) => (
          T.add(i),
          T.size === 1 &&
            A.forEach(([n, f], N) => {
              const P = n[3](V(N));
              A.set(N, [n, P]);
            }),
          () => {
            T.delete(i),
              T.size === 0 &&
                A.forEach(([n, f], N) => {
                  f && (f(), A.set(N, [n]));
                });
          }
        ),
        G = Array.isArray(o) ? [] : Object.create(Object.getPrototypeOf(o)),
        M = t(G, {
          deleteProperty(i, a) {
            const n = Reflect.get(i, a);
            Q(a);
            const f = Reflect.deleteProperty(i, a);
            return f && L(['delete', [a], n]), f;
          },
          set(i, a, n, f) {
            const N = Reflect.has(i, a),
              P = Reflect.get(i, a, f);
            if (N && (e(P, n) || (_.has(n) && e(P, _.get(n))))) return !0;
            Q(a), K(n) && (n = fe(n) || n);
            let B = n;
            if (n instanceof Promise)
              n.then((y) => {
                (n.status = 'fulfilled'), (n.value = y), L(['resolve', [a], y]);
              }).catch((y) => {
                (n.status = 'rejected'), (n.reason = y), L(['reject', [a], y]);
              });
            else {
              !w.has(n) && s(n) && (B = O(n));
              const y = !k.has(B) && w.get(B);
              y && $(a, y);
            }
            return Reflect.set(i, a, B, f), L(['set', [a], n, P]), !0;
          },
        });
      _.set(o, M);
      const Ee = [G, C, c, de];
      return (
        w.set(M, Ee),
        Reflect.ownKeys(o).forEach((i) => {
          const a = Object.getOwnPropertyDescriptor(o, i);
          'value' in a && ((M[i] = o[i]), delete a.value, delete a.writable),
            Object.defineProperty(G, i, a);
        }),
        M
      );
    }
  ) => [O, w, k, e, t, s, r, l, c, _, u],
  [Te] = pe();
function S(e = {}) {
  return Te(e);
}
function D(e, t, s) {
  const r = w.get(e);
  let l;
  const c = [],
    _ = r[3];
  let u = !1;
  const o = _((p) => {
    if ((c.push(p), s)) {
      t(c.splice(0));
      return;
    }
    l ||
      (l = Promise.resolve().then(() => {
        (l = void 0), u && t(c.splice(0));
      }));
  });
  return (
    (u = !0),
    () => {
      (u = !1), o();
    }
  );
}
function Le(e, t) {
  const s = w.get(e),
    [r, l, c] = s;
  return c(r, l(), t);
}
const d = S({
    history: ['ConnectWallet'],
    view: 'ConnectWallet',
    data: void 0,
  }),
  ce = {
    state: d,
    subscribe(e) {
      return D(d, () => e(d));
    },
    push(e, t) {
      e !== d.view && ((d.view = e), t && (d.data = t), d.history.push(e));
    },
    reset(e) {
      (d.view = e), (d.history = [e]);
    },
    replace(e) {
      d.history.length > 1 &&
        ((d.history[d.history.length - 1] = e), (d.view = e));
    },
    goBack() {
      if (d.history.length > 1) {
        d.history.pop();
        const [e] = d.history.slice(-1);
        d.view = e;
      }
    },
    setData(e) {
      d.data = e;
    },
  },
  I = {
    WALLETCONNECT_DEEPLINK_CHOICE: 'WALLETCONNECT_DEEPLINK_CHOICE',
    WCM_VERSION: 'WCM_VERSION',
    RECOMMENDED_WALLET_AMOUNT: 9,
    isMobile() {
      return typeof window < 'u'
        ? !!(
            window.matchMedia('(pointer:coarse)').matches ||
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(
              navigator.userAgent
            )
          )
        : !1;
    },
    isAndroid() {
      return (
        I.isMobile() && navigator.userAgent.toLowerCase().includes('android')
      );
    },
    isIos() {
      const e = navigator.userAgent.toLowerCase();
      return I.isMobile() && (e.includes('iphone') || e.includes('ipad'));
    },
    isHttpUrl(e) {
      return e.startsWith('http://') || e.startsWith('https://');
    },
    isArray(e) {
      return Array.isArray(e) && e.length > 0;
    },
    formatNativeUrl(e, t, s) {
      if (I.isHttpUrl(e)) return this.formatUniversalUrl(e, t, s);
      let r = e;
      r.includes('://') ||
        ((r = e.replaceAll('/', '').replaceAll(':', '')), (r = `${r}://`)),
        r.endsWith('/') || (r = `${r}/`),
        this.setWalletConnectDeepLink(r, s);
      const l = encodeURIComponent(t);
      return `${r}wc?uri=${l}`;
    },
    formatUniversalUrl(e, t, s) {
      if (!I.isHttpUrl(e)) return this.formatNativeUrl(e, t, s);
      let r = e;
      r.endsWith('/') || (r = `${r}/`), this.setWalletConnectDeepLink(r, s);
      const l = encodeURIComponent(t);
      return `${r}wc?uri=${l}`;
    },
    async wait(e) {
      return new Promise((t) => {
        setTimeout(t, e);
      });
    },
    openHref(e, t) {
      window.open(e, t, 'noreferrer noopener');
    },
    setWalletConnectDeepLink(e, t) {
      try {
        localStorage.setItem(
          I.WALLETCONNECT_DEEPLINK_CHOICE,
          JSON.stringify({ href: e, name: t })
        );
      } catch {
        console.info('Unable to set WalletConnect deep link');
      }
    },
    setWalletConnectAndroidDeepLink(e) {
      try {
        const [t] = e.split('?');
        localStorage.setItem(
          I.WALLETCONNECT_DEEPLINK_CHOICE,
          JSON.stringify({ href: t, name: 'Android' })
        );
      } catch {
        console.info('Unable to set WalletConnect android deep link');
      }
    },
    removeWalletConnectDeepLink() {
      try {
        localStorage.removeItem(I.WALLETCONNECT_DEEPLINK_CHOICE);
      } catch {
        console.info('Unable to remove WalletConnect deep link');
      }
    },
    setModalVersionInStorage() {
      try {
        typeof localStorage < 'u' &&
          localStorage.setItem(I.WCM_VERSION, '2.6.2');
      } catch {
        console.info('Unable to set Web3Modal version in storage');
      }
    },
    getWalletRouterData() {
      var e;
      const t = (e = ce.state.data) == null ? void 0 : e.Wallet;
      if (!t) throw new Error('Missing "Wallet" view data');
      return t;
    },
  },
  Ae =
    typeof location < 'u' &&
    (location.hostname.includes('localhost') ||
      location.protocol.includes('https')),
  E = S({
    enabled: Ae,
    userSessionId: '',
    events: [],
    connectedWalletId: void 0,
  }),
  be = {
    state: E,
    subscribe(e) {
      return D(E.events, () => e(Le(E.events[E.events.length - 1])));
    },
    initialize() {
      E.enabled &&
        typeof (crypto == null ? void 0 : crypto.randomUUID) < 'u' &&
        (E.userSessionId = crypto.randomUUID());
    },
    setConnectedWalletId(e) {
      E.connectedWalletId = e;
    },
    click(e) {
      if (E.enabled) {
        const t = {
          type: 'CLICK',
          name: e.name,
          userSessionId: E.userSessionId,
          timestamp: Date.now(),
          data: e,
        };
        E.events.push(t);
      }
    },
    track(e) {
      if (E.enabled) {
        const t = {
          type: 'TRACK',
          name: e.name,
          userSessionId: E.userSessionId,
          timestamp: Date.now(),
          data: e,
        };
        E.events.push(t);
      }
    },
    view(e) {
      if (E.enabled) {
        const t = {
          type: 'VIEW',
          name: e.name,
          userSessionId: E.userSessionId,
          timestamp: Date.now(),
          data: e,
        };
        E.events.push(t);
      }
    },
  },
  g = S({
    chains: void 0,
    walletConnectUri: void 0,
    isAuth: !1,
    isCustomDesktop: !1,
    isCustomMobile: !1,
    isDataLoaded: !1,
    isUiLoaded: !1,
  }),
  b = {
    state: g,
    subscribe(e) {
      return D(g, () => e(g));
    },
    setChains(e) {
      g.chains = e;
    },
    setWalletConnectUri(e) {
      g.walletConnectUri = e;
    },
    setIsCustomDesktop(e) {
      g.isCustomDesktop = e;
    },
    setIsCustomMobile(e) {
      g.isCustomMobile = e;
    },
    setIsDataLoaded(e) {
      g.isDataLoaded = e;
    },
    setIsUiLoaded(e) {
      g.isUiLoaded = e;
    },
    setIsAuth(e) {
      g.isAuth = e;
    },
  },
  H = S({
    projectId: '',
    mobileWallets: void 0,
    desktopWallets: void 0,
    walletImages: void 0,
    chains: void 0,
    enableAuthMode: !1,
    enableExplorer: !0,
    explorerExcludedWalletIds: void 0,
    explorerRecommendedWalletIds: void 0,
    termsOfServiceUrl: void 0,
    privacyPolicyUrl: void 0,
  }),
  j = {
    state: H,
    subscribe(e) {
      return D(H, () => e(H));
    },
    setConfig(e) {
      var t, s;
      be.initialize(),
        b.setChains(e.chains),
        b.setIsAuth(!!e.enableAuthMode),
        b.setIsCustomMobile(!!((t = e.mobileWallets) != null && t.length)),
        b.setIsCustomDesktop(!!((s = e.desktopWallets) != null && s.length)),
        I.setModalVersionInStorage(),
        Object.assign(H, e);
    },
  };
var me = Object.defineProperty,
  te = Object.getOwnPropertySymbols,
  ge = Object.prototype.hasOwnProperty,
  he = Object.prototype.propertyIsEnumerable,
  se = (e, t, s) =>
    t in e
      ? me(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s })
      : (e[t] = s),
  Ce = (e, t) => {
    for (var s in t || (t = {})) ge.call(t, s) && se(e, s, t[s]);
    if (te) for (var s of te(t)) he.call(t, s) && se(e, s, t[s]);
    return e;
  };
const X = 'https://explorer-api.walletconnect.com',
  J = 'wcm',
  q = 'js-2.6.2';
async function x(e, t) {
  const s = Ce({ sdkType: J, sdkVersion: q }, t),
    r = new URL(e, X);
  return (
    r.searchParams.append('projectId', j.state.projectId),
    Object.entries(s).forEach(([l, c]) => {
      c && r.searchParams.append(l, String(c));
    }),
    (await fetch(r)).json()
  );
}
const U = {
  async getDesktopListings(e) {
    return x('/w3m/v1/getDesktopListings', e);
  },
  async getMobileListings(e) {
    return x('/w3m/v1/getMobileListings', e);
  },
  async getInjectedListings(e) {
    return x('/w3m/v1/getInjectedListings', e);
  },
  async getAllListings(e) {
    return x('/w3m/v1/getAllListings', e);
  },
  getWalletImageUrl(e) {
    return `${X}/w3m/v1/getWalletImage/${e}?projectId=${j.state.projectId}&sdkType=${J}&sdkVersion=${q}`;
  },
  getAssetImageUrl(e) {
    return `${X}/w3m/v1/getAssetImage/${e}?projectId=${j.state.projectId}&sdkType=${J}&sdkVersion=${q}`;
  },
};
var Oe = Object.defineProperty,
  oe = Object.getOwnPropertySymbols,
  ye = Object.prototype.hasOwnProperty,
  we = Object.prototype.propertyIsEnumerable,
  ne = (e, t, s) =>
    t in e
      ? Oe(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s })
      : (e[t] = s),
  Se = (e, t) => {
    for (var s in t || (t = {})) ye.call(t, s) && ne(e, s, t[s]);
    if (oe) for (var s of oe(t)) we.call(t, s) && ne(e, s, t[s]);
    return e;
  };
const re = I.isMobile(),
  h = S({
    wallets: { listings: [], total: 0, page: 1 },
    search: { listings: [], total: 0, page: 1 },
    recomendedWallets: [],
  }),
  Pe = {
    state: h,
    async getRecomendedWallets() {
      const { explorerRecommendedWalletIds: e, explorerExcludedWalletIds: t } =
        j.state;
      if (e === 'NONE' || (t === 'ALL' && !e)) return h.recomendedWallets;
      if (I.isArray(e)) {
        const s = { recommendedIds: e.join(',') },
          { listings: r } = await U.getAllListings(s),
          l = Object.values(r);
        l.sort((c, _) => {
          const u = e.indexOf(c.id),
            O = e.indexOf(_.id);
          return u - O;
        }),
          (h.recomendedWallets = l);
      } else {
        const { chains: s, isAuth: r } = b.state,
          l = s == null ? void 0 : s.join(','),
          c = I.isArray(t),
          _ = {
            page: 1,
            sdks: r ? 'auth_v1' : void 0,
            entries: I.RECOMMENDED_WALLET_AMOUNT,
            chains: l,
            version: 2,
            excludedIds: c ? t.join(',') : void 0,
          },
          { listings: u } = re
            ? await U.getMobileListings(_)
            : await U.getDesktopListings(_);
        h.recomendedWallets = Object.values(u);
      }
      return h.recomendedWallets;
    },
    async getWallets(e) {
      const t = Se({}, e),
        { explorerRecommendedWalletIds: s, explorerExcludedWalletIds: r } =
          j.state,
        { recomendedWallets: l } = h;
      if (r === 'ALL') return h.wallets;
      l.length
        ? (t.excludedIds = l.map((m) => m.id).join(','))
        : I.isArray(s) && (t.excludedIds = s.join(',')),
        I.isArray(r) &&
          (t.excludedIds = [t.excludedIds, r].filter(Boolean).join(',')),
        b.state.isAuth && (t.sdks = 'auth_v1');
      const { page: c, search: _ } = e,
        { listings: u, total: O } = re
          ? await U.getMobileListings(t)
          : await U.getDesktopListings(t),
        o = Object.values(u),
        p = _ ? 'search' : 'wallets';
      return (
        (h[p] = { listings: [...h[p].listings, ...o], total: O, page: c ?? 1 }),
        { listings: o, total: O }
      );
    },
    getWalletImageUrl(e) {
      return U.getWalletImageUrl(e);
    },
    getAssetImageUrl(e) {
      return U.getAssetImageUrl(e);
    },
    resetSearch() {
      h.search = { listings: [], total: 0, page: 1 };
    },
  },
  R = S({ open: !1 }),
  Y = {
    state: R,
    subscribe(e) {
      return D(R, () => e(R));
    },
    async open(e) {
      return new Promise((t) => {
        const { isUiLoaded: s, isDataLoaded: r } = b.state;
        if (
          (I.removeWalletConnectDeepLink(),
          b.setWalletConnectUri(e == null ? void 0 : e.uri),
          b.setChains(e == null ? void 0 : e.chains),
          ce.reset('ConnectWallet'),
          s && r)
        )
          (R.open = !0), t();
        else {
          const l = setInterval(() => {
            const c = b.state;
            c.isUiLoaded &&
              c.isDataLoaded &&
              (clearInterval(l), (R.open = !0), t());
          }, 200);
        }
      });
    },
    close() {
      R.open = !1;
    },
  };
var Ve = Object.defineProperty,
  ae = Object.getOwnPropertySymbols,
  Ue = Object.prototype.hasOwnProperty,
  ve = Object.prototype.propertyIsEnumerable,
  ie = (e, t, s) =>
    t in e
      ? Ve(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s })
      : (e[t] = s),
  De = (e, t) => {
    for (var s in t || (t = {})) Ue.call(t, s) && ie(e, s, t[s]);
    if (ae) for (var s of ae(t)) ve.call(t, s) && ie(e, s, t[s]);
    return e;
  };
function We() {
  return (
    typeof matchMedia < 'u' &&
    matchMedia('(prefers-color-scheme: dark)').matches
  );
}
const F = S({ themeMode: We() ? 'dark' : 'light' }),
  le = {
    state: F,
    subscribe(e) {
      return D(F, () => e(F));
    },
    setThemeConfig(e) {
      const { themeMode: t, themeVariables: s } = e;
      t && (F.themeMode = t), s && (F.themeVariables = De({}, s));
    },
  },
  v = S({ open: !1, message: '', variant: 'success' }),
  Fe = {
    state: v,
    subscribe(e) {
      return D(v, () => e(v));
    },
    openToast(e, t) {
      (v.open = !0), (v.message = e), (v.variant = t);
    },
    closeToast() {
      v.open = !1;
    },
  };
class Ne {
  constructor(t) {
    (this.openModal = Y.open),
      (this.closeModal = Y.close),
      (this.subscribeModal = Y.subscribe),
      (this.setTheme = le.setThemeConfig),
      le.setThemeConfig(t),
      j.setConfig(t),
      this.initUi();
  }
  async initUi() {
    if (typeof window < 'u') {
      await Ie(
        () => import('./index-d7a11d1c.js'),
        [
          './index-d7a11d1c.js',
          './AccountConnectionInput-7bc330b7.js',
          './index-0c70cacd.js',
          './index-76fb7be0.js',
          './_commonjsHelpers-de833af9.js',
          './extends-98964cd2.js',
          './index-d3ea75b5.js',
          './index-8d47fad6.js',
          './BridgeSteps-30389492.js',
          './v4-4a60fe23.js',
          './iframe-d50da200.js',
          './_commonjs-dynamic-modules-302442b1.js',
          './ActionRequiredBadge-4c3ae44d.js',
          './BridgeTxListNotConnected-80d83e43.js',
          './EcosystemTags-615f572a.js',
        ],
        import.meta.url
      );
      const t = document.createElement('wcm-modal');
      document.body.insertAdjacentElement('beforeend', t), b.setIsUiLoaded(!0);
    }
  }
}
const Me = Object.freeze(
  Object.defineProperty(
    { __proto__: null, WalletConnectModal: Ne },
    Symbol.toStringTag,
    { value: 'Module' }
  )
);
export {
  be as R,
  ce as T,
  I as a,
  Me as i,
  le as n,
  Fe as o,
  b as p,
  Y as s,
  Pe as t,
  j as y,
};
