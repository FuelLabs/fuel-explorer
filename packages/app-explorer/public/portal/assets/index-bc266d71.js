import { aK as Ie } from './index-4d435dca.js';
const _e = Symbol(),
  Z = Object.getPrototypeOf,
  z = new WeakMap(),
  fe = (e) =>
    e &&
    (z.has(e)
      ? z.get(e)
      : Z(e) === Object.prototype || Z(e) === Array.prototype),
  ue = (e) => (fe(e) && e[_e]) || null,
  ee = (e, t = !0) => {
    z.set(e, t);
  },
  K = (e) => typeof e == 'object' && e !== null,
  V = new WeakMap(),
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
    c = (o, p, g = r) => {
      const T = l.get(o);
      if (T?.[0] === p) return T[1];
      const L = Array.isArray(o) ? [] : Object.create(Object.getPrototypeOf(o));
      return (
        ee(L, !0),
        l.set(o, [p, L]),
        Reflect.ownKeys(o).forEach((W) => {
          if (Object.getOwnPropertyDescriptor(L, W)) return;
          const C = Reflect.get(o, W),
            S = { value: C, enumerable: !0, configurable: !0 };
          if (k.has(C)) ee(C, !1);
          else if (C instanceof Promise) delete S.value, (S.get = () => g(C));
          else if (V.has(C)) {
            const [A, $] = V.get(C);
            S.value = c(A, $(), g);
          }
          Object.defineProperty(L, W, S);
        }),
        Object.preventExtensions(L)
      );
    },
    f = new WeakMap(),
    _ = [1, 1],
    y = (o) => {
      if (!K(o)) throw new Error('object required');
      const p = f.get(o);
      if (p) return p;
      let g = _[0];
      const T = new Set(),
        L = (i, a = ++_[0]) => {
          g !== a && ((g = a), T.forEach((n) => n(i, a)));
        };
      let W = _[1];
      const C = (i = ++_[1]) => (
          W !== i &&
            !T.size &&
            ((W = i),
            A.forEach(([a]) => {
              const n = a[1](i);
              n > g && (g = n);
            })),
          g
        ),
        S = (i) => (a, n) => {
          const u = [...a];
          (u[1] = [i, ...u[1]]), L(u, n);
        },
        A = new Map(),
        $ = (i, a) => {
          if (T.size) {
            const n = a[3](S(i));
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
            A.forEach(([n, u], N) => {
              const P = n[3](S(N));
              A.set(N, [n, P]);
            }),
          () => {
            T.delete(i),
              T.size === 0 &&
                A.forEach(([n, u], N) => {
                  u && (u(), A.set(N, [n]));
                });
          }
        ),
        G = Array.isArray(o) ? [] : Object.create(Object.getPrototypeOf(o)),
        M = t(G, {
          deleteProperty(i, a) {
            const n = Reflect.get(i, a);
            Q(a);
            const u = Reflect.deleteProperty(i, a);
            return u && L(['delete', [a], n]), u;
          },
          set(i, a, n, u) {
            const N = Reflect.has(i, a),
              P = Reflect.get(i, a, u);
            if (N && (e(P, n) || (f.has(n) && e(P, f.get(n))))) return !0;
            Q(a), K(n) && (n = ue(n) || n);
            let B = n;
            if (n instanceof Promise)
              n.then((w) => {
                (n.status = 'fulfilled'), (n.value = w), L(['resolve', [a], w]);
              }).catch((w) => {
                (n.status = 'rejected'), (n.reason = w), L(['reject', [a], w]);
              });
            else {
              !V.has(n) && s(n) && (B = y(n));
              const w = !k.has(B) && V.get(B);
              w && $(a, w);
            }
            return Reflect.set(i, a, B, u), L(['set', [a], n, P]), !0;
          },
        });
      f.set(o, M);
      const Ee = [G, C, c, de];
      return (
        V.set(M, Ee),
        Reflect.ownKeys(o).forEach((i) => {
          const a = Object.getOwnPropertyDescriptor(o, i);
          'value' in a && ((M[i] = o[i]), delete a.value, delete a.writable),
            Object.defineProperty(G, i, a);
        }),
        M
      );
    }
  ) => [y, V, k, e, t, s, r, l, c, f, _],
  [Te] = pe();
function O(e = {}) {
  return Te(e);
}
function D(e, t, s) {
  const r = V.get(e);
  let l;
  const c = [],
    f = r[3];
  let _ = !1;
  const o = f((p) => {
    if ((c.push(p), s)) {
      t(c.splice(0));
      return;
    }
    l ||
      (l = Promise.resolve().then(() => {
        (l = void 0), _ && t(c.splice(0));
      }));
  });
  return (
    (_ = !0),
    () => {
      (_ = !1), o();
    }
  );
}
function Le(e, t) {
  const s = V.get(e),
    [r, l, c] = s;
  return c(r, l(), t);
}
const d = O({
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
  E = O({
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
  m = O({
    chains: void 0,
    walletConnectUri: void 0,
    isAuth: !1,
    isCustomDesktop: !1,
    isCustomMobile: !1,
    isDataLoaded: !1,
    isUiLoaded: !1,
  }),
  b = {
    state: m,
    subscribe(e) {
      return D(m, () => e(m));
    },
    setChains(e) {
      m.chains = e;
    },
    setWalletConnectUri(e) {
      m.walletConnectUri = e;
    },
    setIsCustomDesktop(e) {
      m.isCustomDesktop = e;
    },
    setIsCustomMobile(e) {
      m.isCustomMobile = e;
    },
    setIsDataLoaded(e) {
      m.isDataLoaded = e;
    },
    setIsUiLoaded(e) {
      m.isUiLoaded = e;
    },
    setIsAuth(e) {
      m.isAuth = e;
    },
  },
  H = O({
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
var ge = Object.defineProperty,
  te = Object.getOwnPropertySymbols,
  me = Object.prototype.hasOwnProperty,
  he = Object.prototype.propertyIsEnumerable,
  se = (e, t, s) =>
    t in e
      ? ge(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s })
      : (e[t] = s),
  Ce = (e, t) => {
    for (var s in t || (t = {})) me.call(t, s) && se(e, s, t[s]);
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
var ye = Object.defineProperty,
  oe = Object.getOwnPropertySymbols,
  we = Object.prototype.hasOwnProperty,
  Ve = Object.prototype.propertyIsEnumerable,
  ne = (e, t, s) =>
    t in e
      ? ye(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s })
      : (e[t] = s),
  Oe = (e, t) => {
    for (var s in t || (t = {})) we.call(t, s) && ne(e, s, t[s]);
    if (oe) for (var s of oe(t)) Ve.call(t, s) && ne(e, s, t[s]);
    return e;
  };
const re = I.isMobile(),
  h = O({
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
        l.sort((c, f) => {
          const _ = e.indexOf(c.id),
            y = e.indexOf(f.id);
          return _ - y;
        }),
          (h.recomendedWallets = l);
      } else {
        const { chains: s, isAuth: r } = b.state,
          l = s?.join(','),
          c = I.isArray(t),
          f = {
            page: 1,
            sdks: r ? 'auth_v1' : void 0,
            entries: I.RECOMMENDED_WALLET_AMOUNT,
            chains: l,
            version: 2,
            excludedIds: c ? t.join(',') : void 0,
          },
          { listings: _ } = re
            ? await U.getMobileListings(f)
            : await U.getDesktopListings(f);
        h.recomendedWallets = Object.values(_);
      }
      return h.recomendedWallets;
    },
    async getWallets(e) {
      const t = Oe({}, e),
        { explorerRecommendedWalletIds: s, explorerExcludedWalletIds: r } =
          j.state,
        { recomendedWallets: l } = h;
      if (r === 'ALL') return h.wallets;
      l.length
        ? (t.excludedIds = l.map((g) => g.id).join(','))
        : I.isArray(s) && (t.excludedIds = s.join(',')),
        I.isArray(r) &&
          (t.excludedIds = [t.excludedIds, r].filter(Boolean).join(',')),
        b.state.isAuth && (t.sdks = 'auth_v1');
      const { page: c, search: f } = e,
        { listings: _, total: y } = re
          ? await U.getMobileListings(t)
          : await U.getDesktopListings(t),
        o = Object.values(_),
        p = f ? 'search' : 'wallets';
      return (
        (h[p] = { listings: [...h[p].listings, ...o], total: y, page: c ?? 1 }),
        { listings: o, total: y }
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
  R = O({ open: !1 }),
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
          b.setWalletConnectUri(e?.uri),
          b.setChains(e?.chains),
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
var Se = Object.defineProperty,
  ae = Object.getOwnPropertySymbols,
  Ue = Object.prototype.hasOwnProperty,
  ve = Object.prototype.propertyIsEnumerable,
  ie = (e, t, s) =>
    t in e
      ? Se(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s })
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
const F = O({ themeMode: We() ? 'dark' : 'light' }),
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
  v = O({ open: !1, message: '', variant: 'success' }),
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
        () => import('./index-b07723a5.js'),
        ['assets/index-b07723a5.js', 'assets/index-4d435dca.js']
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
