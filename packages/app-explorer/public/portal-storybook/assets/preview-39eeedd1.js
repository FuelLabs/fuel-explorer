import {
  g as Cr,
  l as Dr,
  j as ve,
  u as Gr,
  h as Fr,
} from './index-0c70cacd.js';
import { r as K, R as J } from './index-76fb7be0.js';
import { g as se, c as Pe } from './_commonjsHelpers-de833af9.js';
import {
  g as Ut,
  h as Mt,
  k as tt,
  i as Ur,
  q as qt,
  r as rt,
  s as Mr,
  t as qr,
  c as st,
  u as kr,
  v as Vr,
  w as Br,
  x as Xr,
  y as kt,
  n as Hr,
  z as Yr,
  A as Wr,
  B as Kr,
  C as zr,
  D as Qr,
  E as Jr,
  m as Zr,
} from './_getPrototype-aecc109d.js';
import {
  _ as es,
  k as Vt,
  a as ts,
  b as rs,
  c as ss,
  d as ns,
  e as as,
  m as ne,
  f as is,
  s as os,
  p as ls,
  t as Oe,
} from './_basePickBy-2c05180b.js';
import { i as us } from './isPlainObject-0882b9c6.js';
import { N as ge, L as Be } from './index-b75c9059.js';
import { d as Bt } from './index-356e4a49.js';
import { q as Xt } from './index-578a7485.js';
import { S as cs } from './AccountConnectionInput-7bc330b7.js';
import './extends-98964cd2.js';
import './index-d3ea75b5.js';
import './_commonjs-dynamic-modules-302442b1.js';
import './index-8d47fad6.js';
import './BridgeSteps-30389492.js';
import './v4-4a60fe23.js';
import './iframe-d50da200.js';
import '../sb-preview/runtime.js';
import './ActionRequiredBadge-4c3ae44d.js';
import './BridgeTxListNotConnected-80d83e43.js';
import './EcosystemTags-615f572a.js';
const Ce = '#00E182',
  hs =
    'https://assets-global.website-files.com/62e273f312d561347ce33306/6400d0b82c501d62b75963ff_Fuel%20New.png',
  ft = {
    brandTitle: 'Fuel',
    brandUrl: 'https://fuel.sh',
    brandImage: hs,
    colorPrimary: Ce,
    colorSecondary: Ce,
    barSelectedColor: Ce,
    fontBase:
      '"PxGrotesk", system-ui, -apple-system, BlinkMacSystemFont,"Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",sans-serif',
    fontCode:
      '"PxGrotesk Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  };
var pt = 'DARK_MODE',
  fs = Ut,
  ps = Mt;
function gs(t, e, r) {
  ((r !== void 0 && !ps(t[e], r)) || (r === void 0 && !(e in t))) &&
    fs(t, e, r);
}
var Ht = gs,
  ds = tt,
  ms = Ur;
function vs(t) {
  return ms(t) && ds(t);
}
var ys = vs;
function Ss(t, e) {
  if (!(e === 'constructor' && typeof t[e] == 'function') && e != '__proto__')
    return t[e];
}
var Yt = Ss,
  Es = es,
  _s = Vt;
function Os(t) {
  return Es(t, _s(t));
}
var bs = Os,
  gt = Ht,
  Rs = ts,
  ws = rs,
  Ts = ss,
  As = ns,
  dt = qt,
  mt = rt,
  $s = ys,
  xs = Mr,
  Is = qr,
  Ns = st,
  js = us,
  Ls = kr,
  vt = Yt,
  Ps = bs;
function Cs(t, e, r, s, i, o, l) {
  var n = vt(t, r),
    a = vt(e, r),
    u = l.get(a);
  if (u) {
    gt(t, r, u);
    return;
  }
  var c = o ? o(n, a, r + '', t, e, l) : void 0,
    h = c === void 0;
  if (h) {
    var f = mt(a),
      p = !f && xs(a),
      g = !f && !p && Ls(a);
    (c = a),
      f || p || g
        ? mt(n)
          ? (c = n)
          : $s(n)
            ? (c = Ts(n))
            : p
              ? ((h = !1), (c = Rs(a, !0)))
              : g
                ? ((h = !1), (c = ws(a, !0)))
                : (c = [])
        : js(a) || dt(a)
          ? ((c = n), dt(n) ? (c = Ps(n)) : (!Ns(n) || Is(n)) && (c = As(a)))
          : (h = !1);
  }
  h && (l.set(a, c), i(c, a, s, o, l), l.delete(a)), gt(t, r, c);
}
var Ds = Cs,
  Gs = Vr,
  Fs = Ht,
  Us = Br,
  Ms = Ds,
  qs = st,
  ks = Vt,
  Vs = Yt;
function Wt(t, e, r, s, i) {
  t !== e &&
    Us(
      e,
      function (o, l) {
        if ((i || (i = new Gs()), qs(o))) Ms(t, e, l, r, Wt, s, i);
        else {
          var n = s ? s(Vs(t, l), o, l + '', t, e, i) : void 0;
          n === void 0 && (n = o), Fs(t, l, n);
        }
      },
      ks
    );
}
var Bs = Wt;
function Xs(t, e, r) {
  switch (r.length) {
    case 0:
      return t.call(e);
    case 1:
      return t.call(e, r[0]);
    case 2:
      return t.call(e, r[0], r[1]);
    case 3:
      return t.call(e, r[0], r[1], r[2]);
  }
  return t.apply(e, r);
}
var Hs = Xs,
  Ys = Hs,
  yt = Math.max;
function Ws(t, e, r) {
  return (
    (e = yt(e === void 0 ? t.length - 1 : e, 0)),
    function () {
      for (
        var s = arguments, i = -1, o = yt(s.length - e, 0), l = Array(o);
        ++i < o;

      )
        l[i] = s[e + i];
      i = -1;
      for (var n = Array(e + 1); ++i < e; ) n[i] = s[i];
      return (n[e] = r(l)), Ys(t, this, n);
    }
  );
}
var Kt = Ws;
function Ks(t) {
  return function () {
    return t;
  };
}
var zs = Ks,
  Qs = zs,
  St = Xr,
  Js = kt,
  Zs = St
    ? function (t, e) {
        return St(t, 'toString', {
          configurable: !0,
          enumerable: !1,
          value: Qs(e),
          writable: !0,
        });
      }
    : Js,
  en = Zs,
  tn = 800,
  rn = 16,
  sn = Date.now;
function nn(t) {
  var e = 0,
    r = 0;
  return function () {
    var s = sn(),
      i = rn - (s - r);
    if (((r = s), i > 0)) {
      if (++e >= tn) return arguments[0];
    } else e = 0;
    return t.apply(void 0, arguments);
  };
}
var an = nn,
  on = en,
  ln = an,
  un = ln(on),
  zt = un,
  cn = kt,
  hn = Kt,
  fn = zt;
function pn(t, e) {
  return fn(hn(t, e, cn), t + '');
}
var gn = pn,
  dn = Mt,
  mn = tt,
  vn = Hr,
  yn = st;
function Sn(t, e, r) {
  if (!yn(r)) return !1;
  var s = typeof e;
  return (s == 'number' ? mn(r) && vn(e, r.length) : s == 'string' && e in r)
    ? dn(r[e], t)
    : !1;
}
var En = Sn,
  _n = gn,
  On = En;
function bn(t) {
  return _n(function (e, r) {
    var s = -1,
      i = r.length,
      o = i > 1 ? r[i - 1] : void 0,
      l = i > 2 ? r[2] : void 0;
    for (
      o = t.length > 3 && typeof o == 'function' ? (i--, o) : void 0,
        l && On(r[0], r[1], l) && ((o = i < 3 ? void 0 : o), (i = 1)),
        e = Object(e);
      ++s < i;

    ) {
      var n = r[s];
      n && t(e, n, s, o);
    }
    return e;
  });
}
var Rn = bn,
  wn = Bs,
  Tn = Rn,
  An = Tn(function (t, e, r, s) {
    wn(t, e, r, s);
  }),
  $n = An;
const Qt = se($n);
var Jt = { exports: {} };
/*! store2 - v2.14.2 - 2022-07-18
 * Copyright (c) 2022 Nathan Bubna; Licensed (MIT OR GPL-3.0) */ (function (t) {
  (function (e, r) {
    var s = {
        version: '2.14.2',
        areas: {},
        apis: {},
        nsdelim: '.',
        inherit: function (o, l) {
          for (var n in o)
            l.hasOwnProperty(n) ||
              Object.defineProperty(
                l,
                n,
                Object.getOwnPropertyDescriptor(o, n)
              );
          return l;
        },
        stringify: function (o, l) {
          return o === void 0 || typeof o == 'function'
            ? o + ''
            : JSON.stringify(o, l || s.replace);
        },
        parse: function (o, l) {
          try {
            return JSON.parse(o, l || s.revive);
          } catch {
            return o;
          }
        },
        fn: function (o, l) {
          s.storeAPI[o] = l;
          for (var n in s.apis) s.apis[n][o] = l;
        },
        get: function (o, l) {
          return o.getItem(l);
        },
        set: function (o, l, n) {
          o.setItem(l, n);
        },
        remove: function (o, l) {
          o.removeItem(l);
        },
        key: function (o, l) {
          return o.key(l);
        },
        length: function (o) {
          return o.length;
        },
        clear: function (o) {
          o.clear();
        },
        Store: function (o, l, n) {
          var a = s.inherit(s.storeAPI, function (c, h, f) {
            return arguments.length === 0
              ? a.getAll()
              : typeof h == 'function'
                ? a.transact(c, h, f)
                : h !== void 0
                  ? a.set(c, h, f)
                  : typeof c == 'string' || typeof c == 'number'
                    ? a.get(c)
                    : typeof c == 'function'
                      ? a.each(c)
                      : c
                        ? a.setAll(c, h)
                        : a.clear();
          });
          a._id = o;
          try {
            var u = '__store2_test';
            l.setItem(u, 'ok'), (a._area = l), l.removeItem(u);
          } catch {
            a._area = s.storage('fake');
          }
          return (
            (a._ns = n || ''),
            s.areas[o] || (s.areas[o] = a._area),
            s.apis[a._ns + a._id] || (s.apis[a._ns + a._id] = a),
            a
          );
        },
        storeAPI: {
          area: function (o, l) {
            var n = this[o];
            return (
              (!n || !n.area) &&
                ((n = s.Store(o, l, this._ns)), this[o] || (this[o] = n)),
              n
            );
          },
          namespace: function (o, l, n) {
            if (((n = n || this._delim || s.nsdelim), !o))
              return this._ns
                ? this._ns.substring(0, this._ns.length - n.length)
                : '';
            var a = o,
              u = this[a];
            if (
              (!u || !u.namespace) &&
              ((u = s.Store(this._id, this._area, this._ns + a + n)),
              (u._delim = n),
              this[a] || (this[a] = u),
              !l)
            )
              for (var c in s.areas) u.area(c, s.areas[c]);
            return u;
          },
          isFake: function (o) {
            return (
              o
                ? ((this._real = this._area), (this._area = s.storage('fake')))
                : o === !1 && (this._area = this._real || this._area),
              this._area.name === 'fake'
            );
          },
          toString: function () {
            return (
              'store' +
              (this._ns ? '.' + this.namespace() : '') +
              '[' +
              this._id +
              ']'
            );
          },
          has: function (o) {
            return this._area.has
              ? this._area.has(this._in(o))
              : this._in(o) in this._area;
          },
          size: function () {
            return this.keys().length;
          },
          each: function (o, l) {
            for (var n = 0, a = s.length(this._area); n < a; n++) {
              var u = this._out(s.key(this._area, n));
              if (u !== void 0 && o.call(this, u, this.get(u), l) === !1) break;
              a > s.length(this._area) && (a--, n--);
            }
            return l || this;
          },
          keys: function (o) {
            return this.each(function (l, n, a) {
              a.push(l);
            }, o || []);
          },
          get: function (o, l) {
            var n = s.get(this._area, this._in(o)),
              a;
            return (
              typeof l == 'function' && ((a = l), (l = null)),
              n !== null ? s.parse(n, a) : l ?? n
            );
          },
          getAll: function (o) {
            return this.each(function (l, n, a) {
              a[l] = n;
            }, o || {});
          },
          transact: function (o, l, n) {
            var a = this.get(o, n),
              u = l(a);
            return this.set(o, u === void 0 ? a : u), this;
          },
          set: function (o, l, n) {
            var a = this.get(o),
              u;
            return a != null && n === !1
              ? l
              : (typeof n == 'function' && ((u = n), (n = void 0)),
                s.set(this._area, this._in(o), s.stringify(l, u), n) || a);
          },
          setAll: function (o, l) {
            var n, a;
            for (var u in o) (a = o[u]), this.set(u, a, l) !== a && (n = !0);
            return n;
          },
          add: function (o, l, n) {
            var a = this.get(o);
            if (a instanceof Array) l = a.concat(l);
            else if (a !== null) {
              var u = typeof a;
              if (u === typeof l && u === 'object') {
                for (var c in l) a[c] = l[c];
                l = a;
              } else l = a + l;
            }
            return s.set(this._area, this._in(o), s.stringify(l, n)), l;
          },
          remove: function (o, l) {
            var n = this.get(o, l);
            return s.remove(this._area, this._in(o)), n;
          },
          clear: function () {
            return (
              this._ns
                ? this.each(function (o) {
                    s.remove(this._area, this._in(o));
                  }, 1)
                : s.clear(this._area),
              this
            );
          },
          clearAll: function () {
            var o = this._area;
            for (var l in s.areas)
              s.areas.hasOwnProperty(l) &&
                ((this._area = s.areas[l]), this.clear());
            return (this._area = o), this;
          },
          _in: function (o) {
            return (
              typeof o != 'string' && (o = s.stringify(o)),
              this._ns ? this._ns + o : o
            );
          },
          _out: function (o) {
            return this._ns
              ? o && o.indexOf(this._ns) === 0
                ? o.substring(this._ns.length)
                : void 0
              : o;
          },
        },
        storage: function (o) {
          return s.inherit(s.storageAPI, { items: {}, name: o });
        },
        storageAPI: {
          length: 0,
          has: function (o) {
            return this.items.hasOwnProperty(o);
          },
          key: function (o) {
            var l = 0;
            for (var n in this.items) if (this.has(n) && o === l++) return n;
          },
          setItem: function (o, l) {
            this.has(o) || this.length++, (this.items[o] = l);
          },
          removeItem: function (o) {
            this.has(o) && (delete this.items[o], this.length--);
          },
          getItem: function (o) {
            return this.has(o) ? this.items[o] : null;
          },
          clear: function () {
            for (var o in this.items) this.removeItem(o);
          },
        },
      },
      i = s.Store(
        'local',
        (function () {
          try {
            return localStorage;
          } catch {}
        })()
      );
    (i.local = i),
      (i._ = s),
      i.area(
        'session',
        (function () {
          try {
            return sessionStorage;
          } catch {}
        })()
      ),
      i.area('page', s.storage('page')),
      typeof r == 'function' && r.amd !== void 0
        ? r('store2', [], function () {
            return i;
          })
        : t.exports
          ? (t.exports = i)
          : (e.store && (s.conflict = e.store), (e.store = i));
  })(Pe, Pe && Pe.define);
})(Jt);
var xn = Jt.exports;
const ue = se(xn);
var In = Yr;
function Nn(t, e) {
  return In(t, e);
}
var jn = Nn;
const Ln = se(jn);
function Pn(t, e, r, s) {
  for (var i = -1, o = t == null ? 0 : t.length; ++i < o; ) {
    var l = t[i];
    e(s, l, r(l), t);
  }
  return s;
}
var Cn = Pn,
  Dn = tt;
function Gn(t, e) {
  return function (r, s) {
    if (r == null) return r;
    if (!Dn(r)) return t(r, s);
    for (
      var i = r.length, o = e ? i : -1, l = Object(r);
      (e ? o-- : ++o < i) && s(l[o], o, l) !== !1;

    );
    return r;
  };
}
var Fn = Gn,
  Un = Wr,
  Mn = Fn,
  qn = Mn(Un),
  kn = qn,
  Vn = kn;
function Bn(t, e, r, s) {
  return (
    Vn(t, function (i, o, l) {
      e(s, i, r(i), l);
    }),
    s
  );
}
var Xn = Bn,
  Hn = Cn,
  Yn = Xn,
  Wn = Kr,
  Kn = rt;
function zn(t, e) {
  return function (r, s) {
    var i = Kn(r) ? Hn : Yn,
      o = e ? e() : {};
    return i(r, t, Wn(s), o);
  };
}
var Qn = zn,
  Jn = Ut,
  Zn = Qn,
  ea = Object.prototype,
  ta = ea.hasOwnProperty,
  ra = Zn(function (t, e, r) {
    ta.call(t, r) ? ++t[r] : Jn(t, r, 1);
  }),
  sa = ra;
const na = se(sa);
var aa = as,
  ia = zr;
function oa(t, e) {
  return aa(t, e, function (r, s) {
    return ia(t, s);
  });
}
var la = oa,
  Et = Qr,
  ua = qt,
  ca = rt,
  _t = Et ? Et.isConcatSpreadable : void 0;
function ha(t) {
  return ca(t) || ua(t) || !!(_t && t && t[_t]);
}
var fa = ha,
  pa = Jr,
  ga = fa;
function Zt(t, e, r, s, i) {
  var o = -1,
    l = t.length;
  for (r || (r = ga), i || (i = []); ++o < l; ) {
    var n = t[o];
    e > 0 && r(n)
      ? e > 1
        ? Zt(n, e - 1, r, s, i)
        : pa(i, n)
      : s || (i[i.length] = n);
  }
  return i;
}
var da = Zt,
  ma = da;
function va(t) {
  var e = t == null ? 0 : t.length;
  return e ? ma(t, 1) : [];
}
var ya = va,
  Sa = ya,
  Ea = Kt,
  _a = zt;
function Oa(t) {
  return _a(Ea(t, void 0, Sa), t + '');
}
var ba = Oa,
  Ra = la,
  wa = ba,
  Ta = wa(function (t, e) {
    return t == null ? {} : Ra(t, e);
  }),
  Aa = Ta;
const oe = se(Aa);
var Ot = Object.prototype.hasOwnProperty;
function bt(t, e, r) {
  for (r of t.keys()) if (V(r, e)) return r;
}
function V(t, e) {
  var r, s, i;
  if (t === e) return !0;
  if (t && e && (r = t.constructor) === e.constructor) {
    if (r === Date) return t.getTime() === e.getTime();
    if (r === RegExp) return t.toString() === e.toString();
    if (r === Array) {
      if ((s = t.length) === e.length) for (; s-- && V(t[s], e[s]); );
      return s === -1;
    }
    if (r === Set) {
      if (t.size !== e.size) return !1;
      for (s of t)
        if (
          ((i = s),
          (i && typeof i == 'object' && ((i = bt(e, i)), !i)) || !e.has(i))
        )
          return !1;
      return !0;
    }
    if (r === Map) {
      if (t.size !== e.size) return !1;
      for (s of t)
        if (
          ((i = s[0]),
          (i && typeof i == 'object' && ((i = bt(e, i)), !i)) ||
            !V(s[1], e.get(i)))
        )
          return !1;
      return !0;
    }
    if (r === ArrayBuffer) (t = new Uint8Array(t)), (e = new Uint8Array(e));
    else if (r === DataView) {
      if ((s = t.byteLength) === e.byteLength)
        for (; s-- && t.getInt8(s) === e.getInt8(s); );
      return s === -1;
    }
    if (ArrayBuffer.isView(t)) {
      if ((s = t.byteLength) === e.byteLength) for (; s-- && t[s] === e[s]; );
      return s === -1;
    }
    if (!r || typeof t == 'object') {
      s = 0;
      for (r in t)
        if (
          (Ot.call(t, r) && ++s && !Ot.call(e, r)) ||
          !(r in e) ||
          !V(t[r], e[r])
        )
          return !1;
      return Object.keys(e).length === s;
    }
  }
  return t !== t && e !== e;
}
const { once: $a } = __STORYBOOK_MODULE_CLIENT_LOGGER__;
var xa = Object.create,
  er = Object.defineProperty,
  Ia = Object.getOwnPropertyDescriptor,
  tr = Object.getOwnPropertyNames,
  Na = Object.getPrototypeOf,
  ja = Object.prototype.hasOwnProperty,
  W = (t, e) =>
    function () {
      return e || (0, t[tr(t)[0]])((e = { exports: {} }).exports, e), e.exports;
    },
  La = (t, e, r, s) => {
    if ((e && typeof e == 'object') || typeof e == 'function')
      for (let i of tr(e))
        !ja.call(t, i) &&
          i !== r &&
          er(t, i, {
            get: () => e[i],
            enumerable: !(s = Ia(e, i)) || s.enumerable,
          });
    return t;
  },
  Pa = (t, e, r) => (
    (r = t != null ? xa(Na(t)) : {}),
    La(
      e || !t || !t.__esModule
        ? er(r, 'default', { value: t, enumerable: !0 })
        : r,
      t
    )
  ),
  Ca = W({
    '../../node_modules/lodash/_freeGlobal.js'(t, e) {
      var r =
        typeof global == 'object' &&
        global &&
        global.Object === Object &&
        global;
      e.exports = r;
    },
  }),
  Da = W({
    '../../node_modules/lodash/_root.js'(t, e) {
      var r = Ca(),
        s = typeof self == 'object' && self && self.Object === Object && self,
        i = r || s || Function('return this')();
      e.exports = i;
    },
  }),
  rr = W({
    '../../node_modules/lodash/_Symbol.js'(t, e) {
      var r = Da(),
        s = r.Symbol;
      e.exports = s;
    },
  }),
  Ga = W({
    '../../node_modules/lodash/_getRawTag.js'(t, e) {
      var r = rr(),
        s = Object.prototype,
        i = s.hasOwnProperty,
        o = s.toString,
        l = r ? r.toStringTag : void 0;
      function n(a) {
        var u = i.call(a, l),
          c = a[l];
        try {
          a[l] = void 0;
          var h = !0;
        } catch {}
        var f = o.call(a);
        return h && (u ? (a[l] = c) : delete a[l]), f;
      }
      e.exports = n;
    },
  }),
  Fa = W({
    '../../node_modules/lodash/_objectToString.js'(t, e) {
      var r = Object.prototype,
        s = r.toString;
      function i(o) {
        return s.call(o);
      }
      e.exports = i;
    },
  }),
  Ua = W({
    '../../node_modules/lodash/_baseGetTag.js'(t, e) {
      var r = rr(),
        s = Ga(),
        i = Fa(),
        o = '[object Null]',
        l = '[object Undefined]',
        n = r ? r.toStringTag : void 0;
      function a(u) {
        return u == null
          ? u === void 0
            ? l
            : o
          : n && n in Object(u)
            ? s(u)
            : i(u);
      }
      e.exports = a;
    },
  }),
  Ma = W({
    '../../node_modules/lodash/_overArg.js'(t, e) {
      function r(s, i) {
        return function (o) {
          return s(i(o));
        };
      }
      e.exports = r;
    },
  }),
  qa = W({
    '../../node_modules/lodash/_getPrototype.js'(t, e) {
      var r = Ma(),
        s = r(Object.getPrototypeOf, Object);
      e.exports = s;
    },
  }),
  ka = W({
    '../../node_modules/lodash/isObjectLike.js'(t, e) {
      function r(s) {
        return s != null && typeof s == 'object';
      }
      e.exports = r;
    },
  }),
  Va = W({
    '../../node_modules/lodash/isPlainObject.js'(t, e) {
      var r = Ua(),
        s = qa(),
        i = ka(),
        o = '[object Object]',
        l = Function.prototype,
        n = Object.prototype,
        a = l.toString,
        u = n.hasOwnProperty,
        c = a.call(Object);
      function h(f) {
        if (!i(f) || r(f) != o) return !1;
        var p = s(f);
        if (p === null) return !0;
        var g = u.call(p, 'constructor') && p.constructor;
        return typeof g == 'function' && g instanceof g && a.call(g) == c;
      }
      e.exports = h;
    },
  }),
  Rt = Object.prototype.hasOwnProperty;
function wt(t, e, r) {
  for (r of t.keys()) if (he(r, e)) return r;
}
function he(t, e) {
  var r, s, i;
  if (t === e) return !0;
  if (t && e && (r = t.constructor) === e.constructor) {
    if (r === Date) return t.getTime() === e.getTime();
    if (r === RegExp) return t.toString() === e.toString();
    if (r === Array) {
      if ((s = t.length) === e.length) for (; s-- && he(t[s], e[s]); );
      return s === -1;
    }
    if (r === Set) {
      if (t.size !== e.size) return !1;
      for (s of t)
        if (
          ((i = s),
          (i && typeof i == 'object' && ((i = wt(e, i)), !i)) || !e.has(i))
        )
          return !1;
      return !0;
    }
    if (r === Map) {
      if (t.size !== e.size) return !1;
      for (s of t)
        if (
          ((i = s[0]),
          (i && typeof i == 'object' && ((i = wt(e, i)), !i)) ||
            !he(s[1], e.get(i)))
        )
          return !1;
      return !0;
    }
    if (r === ArrayBuffer) (t = new Uint8Array(t)), (e = new Uint8Array(e));
    else if (r === DataView) {
      if ((s = t.byteLength) === e.byteLength)
        for (; s-- && t.getInt8(s) === e.getInt8(s); );
      return s === -1;
    }
    if (ArrayBuffer.isView(t)) {
      if ((s = t.byteLength) === e.byteLength) for (; s-- && t[s] === e[s]; );
      return s === -1;
    }
    if (!r || typeof t == 'object') {
      s = 0;
      for (r in t)
        if (
          (Rt.call(t, r) && ++s && !Rt.call(e, r)) ||
          !(r in e) ||
          !he(t[r], e[r])
        )
          return !1;
      return Object.keys(e).length === s;
    }
  }
  return t !== t && e !== e;
}
var be = Pa(Va());
function Ba(t) {
  for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
  var s = Array.from(typeof t == 'string' ? [t] : t);
  s[s.length - 1] = s[s.length - 1].replace(/\r?\n([\t ]*)$/, '');
  var i = s.reduce(function (n, a) {
    var u = a.match(/\n([\t ]+|(?!\s).)/g);
    return u
      ? n.concat(
          u.map(function (c) {
            var h, f;
            return (f =
              (h = c.match(/[\t ]/g)) === null || h === void 0
                ? void 0
                : h.length) !== null && f !== void 0
              ? f
              : 0;
          })
        )
      : n;
  }, []);
  if (i.length) {
    var o = new RegExp(
      `
[	 ]{` +
        Math.min.apply(Math, i) +
        '}',
      'g'
    );
    s = s.map(function (n) {
      return n.replace(
        o,
        `
`
      );
    });
  }
  s[0] = s[0].replace(/^\r?\n/, '');
  var l = s[0];
  return (
    e.forEach(function (n, a) {
      var u = l.match(/(?:^|\n)( *)$/),
        c = u ? u[1] : '',
        h = n;
      typeof n == 'string' &&
        n.includes(`
`) &&
        (h = String(n)
          .split(
            `
`
          )
          .map(function (f, p) {
            return p === 0 ? f : '' + c + f;
          }).join(`
`)),
        (l += h + s[a + 1]);
    }),
    l
  );
}
var Xa = /\/([^/]+)\/(?:(.*)_)?([^/]+)?/;
ne(1e3)((t) => {
  let e = { viewMode: void 0, storyId: void 0, refId: void 0 };
  if (t) {
    let [, r, s, i] = t.toLowerCase().match(Xa) || [];
    r && Object.assign(e, { viewMode: r, storyId: i, refId: s });
  }
  return e;
});
var ye = Symbol('Deeply equal'),
  Xe = (t, e) => {
    if (typeof t != typeof e) return e;
    if (he(t, e)) return ye;
    if (Array.isArray(t) && Array.isArray(e)) {
      let r = e.reduce((s, i, o) => {
        let l = Xe(t[o], i);
        return l !== ye && (s[o] = l), s;
      }, new Array(e.length));
      return e.length >= t.length
        ? r
        : r.concat(new Array(t.length - e.length).fill(void 0));
    }
    return (0, be.default)(t) && (0, be.default)(e)
      ? Object.keys({ ...t, ...e }).reduce((r, s) => {
          let i = Xe(t == null ? void 0 : t[s], e == null ? void 0 : e[s]);
          return i === ye ? r : Object.assign(r, { [s]: i });
        }, {})
      : e;
  },
  Tt = /^[a-zA-Z0-9 _-]*$/,
  Ha = /^-?[0-9]+(\.[0-9]+)?$/,
  sr = /^#([a-f0-9]{3,4}|[a-f0-9]{6}|[a-f0-9]{8})$/i,
  nr =
    /^(rgba?|hsla?)\(([0-9]{1,3}),\s?([0-9]{1,3})%?,\s?([0-9]{1,3})%?,?\s?([0-9](\.[0-9]{1,2})?)?\)$/i,
  He = (t = '', e) =>
    t === null || t === '' || !Tt.test(t)
      ? !1
      : e == null ||
          e instanceof Date ||
          typeof e == 'number' ||
          typeof e == 'boolean'
        ? !0
        : typeof e == 'string'
          ? Tt.test(e) || Ha.test(e) || sr.test(e) || nr.test(e)
          : Array.isArray(e)
            ? e.every((r) => He(t, r))
            : (0, be.default)(e)
              ? Object.entries(e).every(([r, s]) => He(r, s))
              : !1,
  Ye = (t) =>
    t === void 0
      ? '!undefined'
      : t === null
        ? '!null'
        : typeof t == 'string'
          ? sr.test(t)
            ? `!hex(${t.slice(1)})`
            : nr.test(t)
              ? `!${t.replace(/[\s%]/g, '')}`
              : t
          : typeof t == 'boolean'
            ? `!${t}`
            : Array.isArray(t)
              ? t.map(Ye)
              : (0, be.default)(t)
                ? Object.entries(t).reduce(
                    (e, [r, s]) => Object.assign(e, { [r]: Ye(s) }),
                    {}
                  )
                : t,
  Ya = {
    encode: !1,
    delimiter: ';',
    allowDots: !0,
    format: 'RFC1738',
    serializeDate: (t) => `!date(${t.toISOString()})`,
  },
  At = (t, e) => {
    let r = Xe(t, e);
    if (!r || r === ye) return '';
    let s = Object.entries(r).reduce(
      (i, [o, l]) =>
        He(o, l)
          ? Object.assign(i, { [o]: l })
          : ($a.warn(Ba`
      Omitted potentially unsafe URL args.

      More info: https://storybook.js.org/docs/react/writing-stories/args#setting-args-through-the-url
    `),
            i),
      {}
    );
    return Xt.stringify(Ye(s), Ya)
      .replace(/ /g, '+')
      .split(';')
      .map((i) => i.replace('=', ':'))
      .join(';');
  },
  Wa = ne(1e3)((t) =>
    t !== void 0 ? Xt.parse(t, { ignoreQueryPrefix: !0 }) : {}
  ),
  Ka = (t) => Wa(t.search);
ne(1e3)((t, e, r = !0) => {
  if (r) {
    if (typeof e != 'string')
      throw new Error('startsWith only works with string targets');
    return t && t.startsWith(e) ? { path: t } : null;
  }
  let s = typeof e == 'string' && t === e,
    i = t && e && t.match(e);
  return s || i ? { path: t } : null;
});
const {
    STORY_SPECIFIED: za,
    SET_CURRENT_STORY: ar,
    CURRENT_STORY_WAS_SET: Qa,
    STORY_CHANGED: Ja,
    STORY_PREPARED: Za,
    PRELOAD_ENTRIES: ei,
    DOCS_PREPARED: ti,
    SET_INDEX: ri,
    SET_STORIES: si,
    SELECT_STORY: ni,
    STORY_ARGS_UPDATED: ir,
    CONFIG_ERROR: ai,
    STORY_MISSING: ii,
    SET_CONFIG: Re,
    STORY_INDEX_INVALIDATED: oi,
    PREVIEW_KEYDOWN: li,
    GLOBALS_UPDATED: or,
    NAVIGATE_URL: ui,
    SET_GLOBALS: ci,
    SHARED_STATE_CHANGED: ql,
    STORIES_COLLAPSE_ALL: hi,
    STORIES_EXPAND_ALL: fi,
    UPDATE_STORY_ARGS: pi,
    RESET_STORY_ARGS: gi,
    FORCE_REMOUNT: di,
    UPDATE_QUERY_PARAMS: mi,
    TOGGLE_WHATS_NEW_NOTIFICATIONS: vi,
    REQUEST_WHATS_NEW_DATA: yi,
    RESULT_WHATS_NEW_DATA: Si,
    SET_WHATS_NEW_CACHE: Ei,
    UPDATE_GLOBALS: _i,
    SHARED_STATE_SET: kl,
  } = __STORYBOOK_MODULE_CORE_EVENTS__,
  { logger: re, deprecate: Vl } = __STORYBOOK_MODULE_CLIENT_LOGGER__,
  { Addon_TypesEnum: ce } = __STORYBOOK_MODULE_TYPES__,
  { global: B } = __STORYBOOK_MODULE_GLOBAL__,
  { Channel: Oi } = __STORYBOOK_MODULE_CHANNELS__;
var bi = Object.create,
  nt = Object.defineProperty,
  Ri = Object.getOwnPropertyDescriptor,
  lr = Object.getOwnPropertyNames,
  wi = Object.getPrototypeOf,
  Ti = Object.prototype.hasOwnProperty,
  N = (t, e) =>
    function () {
      return e || (0, t[lr(t)[0]])((e = { exports: {} }).exports, e), e.exports;
    },
  q = (t, e) => {
    for (var r in e) nt(t, r, { get: e[r], enumerable: !0 });
  },
  Ai = (t, e, r, s) => {
    if ((e && typeof e == 'object') || typeof e == 'function')
      for (let i of lr(e))
        !Ti.call(t, i) &&
          i !== r &&
          nt(t, i, {
            get: () => e[i],
            enumerable: !(s = Ri(e, i)) || s.enumerable,
          });
    return t;
  },
  $i = (t, e, r) => (
    (r = t != null ? bi(wi(t)) : {}),
    Ai(
      e || !t || !t.__esModule
        ? nt(r, 'default', { value: t, enumerable: !0 })
        : r,
      t
    )
  ),
  Te = N({
    '../../node_modules/semver/internal/constants.js'(t, e) {
      var r = '2.0.0',
        s = Number.MAX_SAFE_INTEGER || 9007199254740991,
        i = 16,
        o = 256 - 6,
        l = [
          'major',
          'premajor',
          'minor',
          'preminor',
          'patch',
          'prepatch',
          'prerelease',
        ];
      e.exports = {
        MAX_LENGTH: 256,
        MAX_SAFE_COMPONENT_LENGTH: i,
        MAX_SAFE_BUILD_LENGTH: o,
        MAX_SAFE_INTEGER: s,
        RELEASE_TYPES: l,
        SEMVER_SPEC_VERSION: r,
        FLAG_INCLUDE_PRERELEASE: 1,
        FLAG_LOOSE: 2,
      };
    },
  }),
  Ae = N({
    '../../node_modules/semver/internal/debug.js'(t, e) {
      var r =
        typeof process == 'object' &&
        {} &&
        {}.NODE_DEBUG &&
        /\bsemver\b/i.test({}.NODE_DEBUG)
          ? (...s) => console.error('SEMVER', ...s)
          : () => {};
      e.exports = r;
    },
  }),
  pe = N({
    '../../node_modules/semver/internal/re.js'(t, e) {
      var {
          MAX_SAFE_COMPONENT_LENGTH: r,
          MAX_SAFE_BUILD_LENGTH: s,
          MAX_LENGTH: i,
        } = Te(),
        o = Ae();
      t = e.exports = {};
      var l = (t.re = []),
        n = (t.safeRe = []),
        a = (t.src = []),
        u = (t.t = {}),
        c = 0,
        h = '[a-zA-Z0-9-]',
        f = [
          ['\\s', 1],
          ['\\d', i],
          [h, s],
        ],
        p = (d) => {
          for (let [v, y] of f)
            d = d
              .split(`${v}*`)
              .join(`${v}{0,${y}}`)
              .split(`${v}+`)
              .join(`${v}{1,${y}}`);
          return d;
        },
        g = (d, v, y) => {
          let w = p(v),
            L = c++;
          o(d, L, v),
            (u[d] = L),
            (a[L] = v),
            (l[L] = new RegExp(v, y ? 'g' : void 0)),
            (n[L] = new RegExp(w, y ? 'g' : void 0));
        };
      g('NUMERICIDENTIFIER', '0|[1-9]\\d*'),
        g('NUMERICIDENTIFIERLOOSE', '\\d+'),
        g('NONNUMERICIDENTIFIER', `\\d*[a-zA-Z-]${h}*`),
        g(
          'MAINVERSION',
          `(${a[u.NUMERICIDENTIFIER]})\\.(${a[u.NUMERICIDENTIFIER]})\\.(${a[u.NUMERICIDENTIFIER]})`
        ),
        g(
          'MAINVERSIONLOOSE',
          `(${a[u.NUMERICIDENTIFIERLOOSE]})\\.(${a[u.NUMERICIDENTIFIERLOOSE]})\\.(${a[u.NUMERICIDENTIFIERLOOSE]})`
        ),
        g(
          'PRERELEASEIDENTIFIER',
          `(?:${a[u.NUMERICIDENTIFIER]}|${a[u.NONNUMERICIDENTIFIER]})`
        ),
        g(
          'PRERELEASEIDENTIFIERLOOSE',
          `(?:${a[u.NUMERICIDENTIFIERLOOSE]}|${a[u.NONNUMERICIDENTIFIER]})`
        ),
        g(
          'PRERELEASE',
          `(?:-(${a[u.PRERELEASEIDENTIFIER]}(?:\\.${a[u.PRERELEASEIDENTIFIER]})*))`
        ),
        g(
          'PRERELEASELOOSE',
          `(?:-?(${a[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${a[u.PRERELEASEIDENTIFIERLOOSE]})*))`
        ),
        g('BUILDIDENTIFIER', `${h}+`),
        g(
          'BUILD',
          `(?:\\+(${a[u.BUILDIDENTIFIER]}(?:\\.${a[u.BUILDIDENTIFIER]})*))`
        ),
        g(
          'FULLPLAIN',
          `v?${a[u.MAINVERSION]}${a[u.PRERELEASE]}?${a[u.BUILD]}?`
        ),
        g('FULL', `^${a[u.FULLPLAIN]}$`),
        g(
          'LOOSEPLAIN',
          `[v=\\s]*${a[u.MAINVERSIONLOOSE]}${a[u.PRERELEASELOOSE]}?${a[u.BUILD]}?`
        ),
        g('LOOSE', `^${a[u.LOOSEPLAIN]}$`),
        g('GTLT', '((?:<|>)?=?)'),
        g('XRANGEIDENTIFIERLOOSE', `${a[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`),
        g('XRANGEIDENTIFIER', `${a[u.NUMERICIDENTIFIER]}|x|X|\\*`),
        g(
          'XRANGEPLAIN',
          `[v=\\s]*(${a[u.XRANGEIDENTIFIER]})(?:\\.(${a[u.XRANGEIDENTIFIER]})(?:\\.(${a[u.XRANGEIDENTIFIER]})(?:${a[u.PRERELEASE]})?${a[u.BUILD]}?)?)?`
        ),
        g(
          'XRANGEPLAINLOOSE',
          `[v=\\s]*(${a[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${a[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${a[u.XRANGEIDENTIFIERLOOSE]})(?:${a[u.PRERELEASELOOSE]})?${a[u.BUILD]}?)?)?`
        ),
        g('XRANGE', `^${a[u.GTLT]}\\s*${a[u.XRANGEPLAIN]}$`),
        g('XRANGELOOSE', `^${a[u.GTLT]}\\s*${a[u.XRANGEPLAINLOOSE]}$`),
        g(
          'COERCE',
          `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?(?:$|[^\\d])`
        ),
        g('COERCERTL', a[u.COERCE], !0),
        g('LONETILDE', '(?:~>?)'),
        g('TILDETRIM', `(\\s*)${a[u.LONETILDE]}\\s+`, !0),
        (t.tildeTrimReplace = '$1~'),
        g('TILDE', `^${a[u.LONETILDE]}${a[u.XRANGEPLAIN]}$`),
        g('TILDELOOSE', `^${a[u.LONETILDE]}${a[u.XRANGEPLAINLOOSE]}$`),
        g('LONECARET', '(?:\\^)'),
        g('CARETTRIM', `(\\s*)${a[u.LONECARET]}\\s+`, !0),
        (t.caretTrimReplace = '$1^'),
        g('CARET', `^${a[u.LONECARET]}${a[u.XRANGEPLAIN]}$`),
        g('CARETLOOSE', `^${a[u.LONECARET]}${a[u.XRANGEPLAINLOOSE]}$`),
        g('COMPARATORLOOSE', `^${a[u.GTLT]}\\s*(${a[u.LOOSEPLAIN]})$|^$`),
        g('COMPARATOR', `^${a[u.GTLT]}\\s*(${a[u.FULLPLAIN]})$|^$`),
        g(
          'COMPARATORTRIM',
          `(\\s*)${a[u.GTLT]}\\s*(${a[u.LOOSEPLAIN]}|${a[u.XRANGEPLAIN]})`,
          !0
        ),
        (t.comparatorTrimReplace = '$1$2$3'),
        g(
          'HYPHENRANGE',
          `^\\s*(${a[u.XRANGEPLAIN]})\\s+-\\s+(${a[u.XRANGEPLAIN]})\\s*$`
        ),
        g(
          'HYPHENRANGELOOSE',
          `^\\s*(${a[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${a[u.XRANGEPLAINLOOSE]})\\s*$`
        ),
        g('STAR', '(<|>)?=?\\s*\\*'),
        g('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$'),
        g('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$');
    },
  }),
  at = N({
    '../../node_modules/semver/internal/parse-options.js'(t, e) {
      var r = Object.freeze({ loose: !0 }),
        s = Object.freeze({}),
        i = (o) => (o ? (typeof o != 'object' ? r : o) : s);
      e.exports = i;
    },
  }),
  ur = N({
    '../../node_modules/semver/internal/identifiers.js'(t, e) {
      var r = /^[0-9]+$/,
        s = (o, l) => {
          let n = r.test(o),
            a = r.test(l);
          return (
            n && a && ((o = +o), (l = +l)),
            o === l ? 0 : n && !a ? -1 : a && !n ? 1 : o < l ? -1 : 1
          );
        },
        i = (o, l) => s(l, o);
      e.exports = { compareIdentifiers: s, rcompareIdentifiers: i };
    },
  }),
  U = N({
    '../../node_modules/semver/classes/semver.js'(t, e) {
      var r = Ae(),
        { MAX_LENGTH: s, MAX_SAFE_INTEGER: i } = Te(),
        { safeRe: o, t: l } = pe(),
        n = at(),
        { compareIdentifiers: a } = ur(),
        u = class Y {
          constructor(h, f) {
            if (((f = n(f)), h instanceof Y)) {
              if (
                h.loose === !!f.loose &&
                h.includePrerelease === !!f.includePrerelease
              )
                return h;
              h = h.version;
            } else if (typeof h != 'string')
              throw new TypeError(
                `Invalid version. Must be a string. Got type "${typeof h}".`
              );
            if (h.length > s)
              throw new TypeError(`version is longer than ${s} characters`);
            r('SemVer', h, f),
              (this.options = f),
              (this.loose = !!f.loose),
              (this.includePrerelease = !!f.includePrerelease);
            let p = h.trim().match(f.loose ? o[l.LOOSE] : o[l.FULL]);
            if (!p) throw new TypeError(`Invalid Version: ${h}`);
            if (
              ((this.raw = h),
              (this.major = +p[1]),
              (this.minor = +p[2]),
              (this.patch = +p[3]),
              this.major > i || this.major < 0)
            )
              throw new TypeError('Invalid major version');
            if (this.minor > i || this.minor < 0)
              throw new TypeError('Invalid minor version');
            if (this.patch > i || this.patch < 0)
              throw new TypeError('Invalid patch version');
            p[4]
              ? (this.prerelease = p[4].split('.').map((g) => {
                  if (/^[0-9]+$/.test(g)) {
                    let d = +g;
                    if (d >= 0 && d < i) return d;
                  }
                  return g;
                }))
              : (this.prerelease = []),
              (this.build = p[5] ? p[5].split('.') : []),
              this.format();
          }
          format() {
            return (
              (this.version = `${this.major}.${this.minor}.${this.patch}`),
              this.prerelease.length &&
                (this.version += `-${this.prerelease.join('.')}`),
              this.version
            );
          }
          toString() {
            return this.version;
          }
          compare(h) {
            if (
              (r('SemVer.compare', this.version, this.options, h),
              !(h instanceof Y))
            ) {
              if (typeof h == 'string' && h === this.version) return 0;
              h = new Y(h, this.options);
            }
            return h.version === this.version
              ? 0
              : this.compareMain(h) || this.comparePre(h);
          }
          compareMain(h) {
            return (
              h instanceof Y || (h = new Y(h, this.options)),
              a(this.major, h.major) ||
                a(this.minor, h.minor) ||
                a(this.patch, h.patch)
            );
          }
          comparePre(h) {
            if (
              (h instanceof Y || (h = new Y(h, this.options)),
              this.prerelease.length && !h.prerelease.length)
            )
              return -1;
            if (!this.prerelease.length && h.prerelease.length) return 1;
            if (!this.prerelease.length && !h.prerelease.length) return 0;
            let f = 0;
            do {
              let p = this.prerelease[f],
                g = h.prerelease[f];
              if (
                (r('prerelease compare', f, p, g), p === void 0 && g === void 0)
              )
                return 0;
              if (g === void 0) return 1;
              if (p === void 0) return -1;
              if (p !== g) return a(p, g);
            } while (++f);
          }
          compareBuild(h) {
            h instanceof Y || (h = new Y(h, this.options));
            let f = 0;
            do {
              let p = this.build[f],
                g = h.build[f];
              if (
                (r('prerelease compare', f, p, g), p === void 0 && g === void 0)
              )
                return 0;
              if (g === void 0) return 1;
              if (p === void 0) return -1;
              if (p !== g) return a(p, g);
            } while (++f);
          }
          inc(h, f, p) {
            switch (h) {
              case 'premajor':
                (this.prerelease.length = 0),
                  (this.patch = 0),
                  (this.minor = 0),
                  this.major++,
                  this.inc('pre', f, p);
                break;
              case 'preminor':
                (this.prerelease.length = 0),
                  (this.patch = 0),
                  this.minor++,
                  this.inc('pre', f, p);
                break;
              case 'prepatch':
                (this.prerelease.length = 0),
                  this.inc('patch', f, p),
                  this.inc('pre', f, p);
                break;
              case 'prerelease':
                this.prerelease.length === 0 && this.inc('patch', f, p),
                  this.inc('pre', f, p);
                break;
              case 'major':
                (this.minor !== 0 ||
                  this.patch !== 0 ||
                  this.prerelease.length === 0) &&
                  this.major++,
                  (this.minor = 0),
                  (this.patch = 0),
                  (this.prerelease = []);
                break;
              case 'minor':
                (this.patch !== 0 || this.prerelease.length === 0) &&
                  this.minor++,
                  (this.patch = 0),
                  (this.prerelease = []);
                break;
              case 'patch':
                this.prerelease.length === 0 && this.patch++,
                  (this.prerelease = []);
                break;
              case 'pre': {
                let g = Number(p) ? 1 : 0;
                if (!f && p === !1)
                  throw new Error(
                    'invalid increment argument: identifier is empty'
                  );
                if (this.prerelease.length === 0) this.prerelease = [g];
                else {
                  let d = this.prerelease.length;
                  for (; --d >= 0; )
                    typeof this.prerelease[d] == 'number' &&
                      (this.prerelease[d]++, (d = -2));
                  if (d === -1) {
                    if (f === this.prerelease.join('.') && p === !1)
                      throw new Error(
                        'invalid increment argument: identifier already exists'
                      );
                    this.prerelease.push(g);
                  }
                }
                if (f) {
                  let d = [f, g];
                  p === !1 && (d = [f]),
                    a(this.prerelease[0], f) === 0
                      ? isNaN(this.prerelease[1]) && (this.prerelease = d)
                      : (this.prerelease = d);
                }
                break;
              }
              default:
                throw new Error(`invalid increment argument: ${h}`);
            }
            return (
              (this.raw = this.format()),
              this.build.length && (this.raw += `+${this.build.join('.')}`),
              this
            );
          }
        };
      e.exports = u;
    },
  }),
  ae = N({
    '../../node_modules/semver/functions/parse.js'(t, e) {
      var r = U(),
        s = (i, o, l = !1) => {
          if (i instanceof r) return i;
          try {
            return new r(i, o);
          } catch (n) {
            if (!l) return null;
            throw n;
          }
        };
      e.exports = s;
    },
  }),
  xi = N({
    '../../node_modules/semver/functions/valid.js'(t, e) {
      var r = ae(),
        s = (i, o) => {
          let l = r(i, o);
          return l ? l.version : null;
        };
      e.exports = s;
    },
  }),
  Ii = N({
    '../../node_modules/semver/functions/clean.js'(t, e) {
      var r = ae(),
        s = (i, o) => {
          let l = r(i.trim().replace(/^[=v]+/, ''), o);
          return l ? l.version : null;
        };
      e.exports = s;
    },
  }),
  Ni = N({
    '../../node_modules/semver/functions/inc.js'(t, e) {
      var r = U(),
        s = (i, o, l, n, a) => {
          typeof l == 'string' && ((a = n), (n = l), (l = void 0));
          try {
            return new r(i instanceof r ? i.version : i, l).inc(o, n, a)
              .version;
          } catch {
            return null;
          }
        };
      e.exports = s;
    },
  }),
  ji = N({
    '../../node_modules/semver/functions/diff.js'(t, e) {
      var r = ae(),
        s = (i, o) => {
          let l = r(i, null, !0),
            n = r(o, null, !0),
            a = l.compare(n);
          if (a === 0) return null;
          let u = a > 0,
            c = u ? l : n,
            h = u ? n : l,
            f = !!c.prerelease.length;
          if (h.prerelease.length && !f)
            return !h.patch && !h.minor
              ? 'major'
              : c.patch
                ? 'patch'
                : c.minor
                  ? 'minor'
                  : 'major';
          let p = f ? 'pre' : '';
          return l.major !== n.major
            ? p + 'major'
            : l.minor !== n.minor
              ? p + 'minor'
              : l.patch !== n.patch
                ? p + 'patch'
                : 'prerelease';
        };
      e.exports = s;
    },
  }),
  Li = N({
    '../../node_modules/semver/functions/major.js'(t, e) {
      var r = U(),
        s = (i, o) => new r(i, o).major;
      e.exports = s;
    },
  }),
  Pi = N({
    '../../node_modules/semver/functions/minor.js'(t, e) {
      var r = U(),
        s = (i, o) => new r(i, o).minor;
      e.exports = s;
    },
  }),
  Ci = N({
    '../../node_modules/semver/functions/patch.js'(t, e) {
      var r = U(),
        s = (i, o) => new r(i, o).patch;
      e.exports = s;
    },
  }),
  Di = N({
    '../../node_modules/semver/functions/prerelease.js'(t, e) {
      var r = ae(),
        s = (i, o) => {
          let l = r(i, o);
          return l && l.prerelease.length ? l.prerelease : null;
        };
      e.exports = s;
    },
  }),
  X = N({
    '../../node_modules/semver/functions/compare.js'(t, e) {
      var r = U(),
        s = (i, o, l) => new r(i, l).compare(new r(o, l));
      e.exports = s;
    },
  }),
  Gi = N({
    '../../node_modules/semver/functions/rcompare.js'(t, e) {
      var r = X(),
        s = (i, o, l) => r(o, i, l);
      e.exports = s;
    },
  }),
  Fi = N({
    '../../node_modules/semver/functions/compare-loose.js'(t, e) {
      var r = X(),
        s = (i, o) => r(i, o, !0);
      e.exports = s;
    },
  }),
  it = N({
    '../../node_modules/semver/functions/compare-build.js'(t, e) {
      var r = U(),
        s = (i, o, l) => {
          let n = new r(i, l),
            a = new r(o, l);
          return n.compare(a) || n.compareBuild(a);
        };
      e.exports = s;
    },
  }),
  Ui = N({
    '../../node_modules/semver/functions/sort.js'(t, e) {
      var r = it(),
        s = (i, o) => i.sort((l, n) => r(l, n, o));
      e.exports = s;
    },
  }),
  Mi = N({
    '../../node_modules/semver/functions/rsort.js'(t, e) {
      var r = it(),
        s = (i, o) => i.sort((l, n) => r(n, l, o));
      e.exports = s;
    },
  }),
  $e = N({
    '../../node_modules/semver/functions/gt.js'(t, e) {
      var r = X(),
        s = (i, o, l) => r(i, o, l) > 0;
      e.exports = s;
    },
  }),
  ot = N({
    '../../node_modules/semver/functions/lt.js'(t, e) {
      var r = X(),
        s = (i, o, l) => r(i, o, l) < 0;
      e.exports = s;
    },
  }),
  cr = N({
    '../../node_modules/semver/functions/eq.js'(t, e) {
      var r = X(),
        s = (i, o, l) => r(i, o, l) === 0;
      e.exports = s;
    },
  }),
  hr = N({
    '../../node_modules/semver/functions/neq.js'(t, e) {
      var r = X(),
        s = (i, o, l) => r(i, o, l) !== 0;
      e.exports = s;
    },
  }),
  lt = N({
    '../../node_modules/semver/functions/gte.js'(t, e) {
      var r = X(),
        s = (i, o, l) => r(i, o, l) >= 0;
      e.exports = s;
    },
  }),
  ut = N({
    '../../node_modules/semver/functions/lte.js'(t, e) {
      var r = X(),
        s = (i, o, l) => r(i, o, l) <= 0;
      e.exports = s;
    },
  }),
  fr = N({
    '../../node_modules/semver/functions/cmp.js'(t, e) {
      var r = cr(),
        s = hr(),
        i = $e(),
        o = lt(),
        l = ot(),
        n = ut(),
        a = (u, c, h, f) => {
          switch (c) {
            case '===':
              return (
                typeof u == 'object' && (u = u.version),
                typeof h == 'object' && (h = h.version),
                u === h
              );
            case '!==':
              return (
                typeof u == 'object' && (u = u.version),
                typeof h == 'object' && (h = h.version),
                u !== h
              );
            case '':
            case '=':
            case '==':
              return r(u, h, f);
            case '!=':
              return s(u, h, f);
            case '>':
              return i(u, h, f);
            case '>=':
              return o(u, h, f);
            case '<':
              return l(u, h, f);
            case '<=':
              return n(u, h, f);
            default:
              throw new TypeError(`Invalid operator: ${c}`);
          }
        };
      e.exports = a;
    },
  }),
  qi = N({
    '../../node_modules/semver/functions/coerce.js'(t, e) {
      var r = U(),
        s = ae(),
        { safeRe: i, t: o } = pe(),
        l = (n, a) => {
          if (n instanceof r) return n;
          if ((typeof n == 'number' && (n = String(n)), typeof n != 'string'))
            return null;
          a = a || {};
          let u = null;
          if (!a.rtl) u = n.match(i[o.COERCE]);
          else {
            let c;
            for (
              ;
              (c = i[o.COERCERTL].exec(n)) &&
              (!u || u.index + u[0].length !== n.length);

            )
              (!u || c.index + c[0].length !== u.index + u[0].length) &&
                (u = c),
                (i[o.COERCERTL].lastIndex =
                  c.index + c[1].length + c[2].length);
            i[o.COERCERTL].lastIndex = -1;
          }
          return u === null
            ? null
            : s(`${u[2]}.${u[3] || '0'}.${u[4] || '0'}`, a);
        };
      e.exports = l;
    },
  }),
  ki = N({
    '../../node_modules/yallist/iterator.js'(t, e) {
      e.exports = function (r) {
        r.prototype[Symbol.iterator] = function* () {
          for (let s = this.head; s; s = s.next) yield s.value;
        };
      };
    },
  }),
  Vi = N({
    '../../node_modules/yallist/yallist.js'(t, e) {
      (e.exports = r), (r.Node = l), (r.create = r);
      function r(n) {
        var a = this;
        if (
          (a instanceof r || (a = new r()),
          (a.tail = null),
          (a.head = null),
          (a.length = 0),
          n && typeof n.forEach == 'function')
        )
          n.forEach(function (h) {
            a.push(h);
          });
        else if (arguments.length > 0)
          for (var u = 0, c = arguments.length; u < c; u++)
            a.push(arguments[u]);
        return a;
      }
      (r.prototype.removeNode = function (n) {
        if (n.list !== this)
          throw new Error('removing node which does not belong to this list');
        var a = n.next,
          u = n.prev;
        return (
          a && (a.prev = u),
          u && (u.next = a),
          n === this.head && (this.head = a),
          n === this.tail && (this.tail = u),
          n.list.length--,
          (n.next = null),
          (n.prev = null),
          (n.list = null),
          a
        );
      }),
        (r.prototype.unshiftNode = function (n) {
          if (n !== this.head) {
            n.list && n.list.removeNode(n);
            var a = this.head;
            (n.list = this),
              (n.next = a),
              a && (a.prev = n),
              (this.head = n),
              this.tail || (this.tail = n),
              this.length++;
          }
        }),
        (r.prototype.pushNode = function (n) {
          if (n !== this.tail) {
            n.list && n.list.removeNode(n);
            var a = this.tail;
            (n.list = this),
              (n.prev = a),
              a && (a.next = n),
              (this.tail = n),
              this.head || (this.head = n),
              this.length++;
          }
        }),
        (r.prototype.push = function () {
          for (var n = 0, a = arguments.length; n < a; n++)
            i(this, arguments[n]);
          return this.length;
        }),
        (r.prototype.unshift = function () {
          for (var n = 0, a = arguments.length; n < a; n++)
            o(this, arguments[n]);
          return this.length;
        }),
        (r.prototype.pop = function () {
          if (this.tail) {
            var n = this.tail.value;
            return (
              (this.tail = this.tail.prev),
              this.tail ? (this.tail.next = null) : (this.head = null),
              this.length--,
              n
            );
          }
        }),
        (r.prototype.shift = function () {
          if (this.head) {
            var n = this.head.value;
            return (
              (this.head = this.head.next),
              this.head ? (this.head.prev = null) : (this.tail = null),
              this.length--,
              n
            );
          }
        }),
        (r.prototype.forEach = function (n, a) {
          a = a || this;
          for (var u = this.head, c = 0; u !== null; c++)
            n.call(a, u.value, c, this), (u = u.next);
        }),
        (r.prototype.forEachReverse = function (n, a) {
          a = a || this;
          for (var u = this.tail, c = this.length - 1; u !== null; c--)
            n.call(a, u.value, c, this), (u = u.prev);
        }),
        (r.prototype.get = function (n) {
          for (var a = 0, u = this.head; u !== null && a < n; a++) u = u.next;
          if (a === n && u !== null) return u.value;
        }),
        (r.prototype.getReverse = function (n) {
          for (var a = 0, u = this.tail; u !== null && a < n; a++) u = u.prev;
          if (a === n && u !== null) return u.value;
        }),
        (r.prototype.map = function (n, a) {
          a = a || this;
          for (var u = new r(), c = this.head; c !== null; )
            u.push(n.call(a, c.value, this)), (c = c.next);
          return u;
        }),
        (r.prototype.mapReverse = function (n, a) {
          a = a || this;
          for (var u = new r(), c = this.tail; c !== null; )
            u.push(n.call(a, c.value, this)), (c = c.prev);
          return u;
        }),
        (r.prototype.reduce = function (n, a) {
          var u,
            c = this.head;
          if (arguments.length > 1) u = a;
          else if (this.head) (c = this.head.next), (u = this.head.value);
          else
            throw new TypeError('Reduce of empty list with no initial value');
          for (var h = 0; c !== null; h++) (u = n(u, c.value, h)), (c = c.next);
          return u;
        }),
        (r.prototype.reduceReverse = function (n, a) {
          var u,
            c = this.tail;
          if (arguments.length > 1) u = a;
          else if (this.tail) (c = this.tail.prev), (u = this.tail.value);
          else
            throw new TypeError('Reduce of empty list with no initial value');
          for (var h = this.length - 1; c !== null; h--)
            (u = n(u, c.value, h)), (c = c.prev);
          return u;
        }),
        (r.prototype.toArray = function () {
          for (
            var n = new Array(this.length), a = 0, u = this.head;
            u !== null;
            a++
          )
            (n[a] = u.value), (u = u.next);
          return n;
        }),
        (r.prototype.toArrayReverse = function () {
          for (
            var n = new Array(this.length), a = 0, u = this.tail;
            u !== null;
            a++
          )
            (n[a] = u.value), (u = u.prev);
          return n;
        }),
        (r.prototype.slice = function (n, a) {
          (a = a || this.length),
            a < 0 && (a += this.length),
            (n = n || 0),
            n < 0 && (n += this.length);
          var u = new r();
          if (a < n || a < 0) return u;
          n < 0 && (n = 0), a > this.length && (a = this.length);
          for (var c = 0, h = this.head; h !== null && c < n; c++) h = h.next;
          for (; h !== null && c < a; c++, h = h.next) u.push(h.value);
          return u;
        }),
        (r.prototype.sliceReverse = function (n, a) {
          (a = a || this.length),
            a < 0 && (a += this.length),
            (n = n || 0),
            n < 0 && (n += this.length);
          var u = new r();
          if (a < n || a < 0) return u;
          n < 0 && (n = 0), a > this.length && (a = this.length);
          for (var c = this.length, h = this.tail; h !== null && c > a; c--)
            h = h.prev;
          for (; h !== null && c > n; c--, h = h.prev) u.push(h.value);
          return u;
        }),
        (r.prototype.splice = function (n, a, ...u) {
          n > this.length && (n = this.length - 1),
            n < 0 && (n = this.length + n);
          for (var c = 0, h = this.head; h !== null && c < n; c++) h = h.next;
          for (var f = [], c = 0; h && c < a; c++)
            f.push(h.value), (h = this.removeNode(h));
          h === null && (h = this.tail),
            h !== this.head && h !== this.tail && (h = h.prev);
          for (var c = 0; c < u.length; c++) h = s(this, h, u[c]);
          return f;
        }),
        (r.prototype.reverse = function () {
          for (
            var n = this.head, a = this.tail, u = n;
            u !== null;
            u = u.prev
          ) {
            var c = u.prev;
            (u.prev = u.next), (u.next = c);
          }
          return (this.head = a), (this.tail = n), this;
        });
      function s(n, a, u) {
        var c = a === n.head ? new l(u, null, a, n) : new l(u, a, a.next, n);
        return (
          c.next === null && (n.tail = c),
          c.prev === null && (n.head = c),
          n.length++,
          c
        );
      }
      function i(n, a) {
        (n.tail = new l(a, n.tail, null, n)),
          n.head || (n.head = n.tail),
          n.length++;
      }
      function o(n, a) {
        (n.head = new l(a, null, n.head, n)),
          n.tail || (n.tail = n.head),
          n.length++;
      }
      function l(n, a, u, c) {
        if (!(this instanceof l)) return new l(n, a, u, c);
        (this.list = c),
          (this.value = n),
          a ? ((a.next = this), (this.prev = a)) : (this.prev = null),
          u ? ((u.prev = this), (this.next = u)) : (this.next = null);
      }
      try {
        ki()(r);
      } catch {}
    },
  }),
  Bi = N({
    '../../node_modules/lru-cache/index.js'(t, e) {
      var r = Vi(),
        s = Symbol('max'),
        i = Symbol('length'),
        o = Symbol('lengthCalculator'),
        l = Symbol('allowStale'),
        n = Symbol('maxAge'),
        a = Symbol('dispose'),
        u = Symbol('noDisposeOnSet'),
        c = Symbol('lruList'),
        h = Symbol('cache'),
        f = Symbol('updateAgeOnGet'),
        p = () => 1,
        g = class {
          constructor(m) {
            if (
              (typeof m == 'number' && (m = { max: m }),
              m || (m = {}),
              m.max && (typeof m.max != 'number' || m.max < 0))
            )
              throw new TypeError('max must be a non-negative number');
            this[s] = m.max || 1 / 0;
            let S = m.length || p;
            if (
              ((this[o] = typeof S != 'function' ? p : S),
              (this[l] = m.stale || !1),
              m.maxAge && typeof m.maxAge != 'number')
            )
              throw new TypeError('maxAge must be a number');
            (this[n] = m.maxAge || 0),
              (this[a] = m.dispose),
              (this[u] = m.noDisposeOnSet || !1),
              (this[f] = m.updateAgeOnGet || !1),
              this.reset();
          }
          set max(m) {
            if (typeof m != 'number' || m < 0)
              throw new TypeError('max must be a non-negative number');
            (this[s] = m || 1 / 0), y(this);
          }
          get max() {
            return this[s];
          }
          set allowStale(m) {
            this[l] = !!m;
          }
          get allowStale() {
            return this[l];
          }
          set maxAge(m) {
            if (typeof m != 'number')
              throw new TypeError('maxAge must be a non-negative number');
            (this[n] = m), y(this);
          }
          get maxAge() {
            return this[n];
          }
          set lengthCalculator(m) {
            typeof m != 'function' && (m = p),
              m !== this[o] &&
                ((this[o] = m),
                (this[i] = 0),
                this[c].forEach((S) => {
                  (S.length = this[o](S.value, S.key)), (this[i] += S.length);
                })),
              y(this);
          }
          get lengthCalculator() {
            return this[o];
          }
          get length() {
            return this[i];
          }
          get itemCount() {
            return this[c].length;
          }
          rforEach(m, S) {
            S = S || this;
            for (let _ = this[c].tail; _ !== null; ) {
              let b = _.prev;
              x(this, m, _, S), (_ = b);
            }
          }
          forEach(m, S) {
            S = S || this;
            for (let _ = this[c].head; _ !== null; ) {
              let b = _.next;
              x(this, m, _, S), (_ = b);
            }
          }
          keys() {
            return this[c].toArray().map((m) => m.key);
          }
          values() {
            return this[c].toArray().map((m) => m.value);
          }
          reset() {
            this[a] &&
              this[c] &&
              this[c].length &&
              this[c].forEach((m) => this[a](m.key, m.value)),
              (this[h] = new Map()),
              (this[c] = new r()),
              (this[i] = 0);
          }
          dump() {
            return this[c]
              .map((m) =>
                v(this, m)
                  ? !1
                  : { k: m.key, v: m.value, e: m.now + (m.maxAge || 0) }
              )
              .toArray()
              .filter((m) => m);
          }
          dumpLru() {
            return this[c];
          }
          set(m, S, _) {
            if (((_ = _ || this[n]), _ && typeof _ != 'number'))
              throw new TypeError('maxAge must be a number');
            let b = _ ? Date.now() : 0,
              P = this[o](S, m);
            if (this[h].has(m)) {
              if (P > this[s]) return w(this, this[h].get(m)), !1;
              let k = this[h].get(m).value;
              return (
                this[a] && (this[u] || this[a](m, k.value)),
                (k.now = b),
                (k.maxAge = _),
                (k.value = S),
                (this[i] += P - k.length),
                (k.length = P),
                this.get(m),
                y(this),
                !0
              );
            }
            let T = new L(m, S, P, b, _);
            return T.length > this[s]
              ? (this[a] && this[a](m, S), !1)
              : ((this[i] += T.length),
                this[c].unshift(T),
                this[h].set(m, this[c].head),
                y(this),
                !0);
          }
          has(m) {
            if (!this[h].has(m)) return !1;
            let S = this[h].get(m).value;
            return !v(this, S);
          }
          get(m) {
            return d(this, m, !0);
          }
          peek(m) {
            return d(this, m, !1);
          }
          pop() {
            let m = this[c].tail;
            return m ? (w(this, m), m.value) : null;
          }
          del(m) {
            w(this, this[h].get(m));
          }
          load(m) {
            this.reset();
            let S = Date.now();
            for (let _ = m.length - 1; _ >= 0; _--) {
              let b = m[_],
                P = b.e || 0;
              if (P === 0) this.set(b.k, b.v);
              else {
                let T = P - S;
                T > 0 && this.set(b.k, b.v, T);
              }
            }
          }
          prune() {
            this[h].forEach((m, S) => d(this, S, !1));
          }
        },
        d = (m, S, _) => {
          let b = m[h].get(S);
          if (b) {
            let P = b.value;
            if (v(m, P)) {
              if ((w(m, b), !m[l])) return;
            } else
              _ && (m[f] && (b.value.now = Date.now()), m[c].unshiftNode(b));
            return P.value;
          }
        },
        v = (m, S) => {
          if (!S || (!S.maxAge && !m[n])) return !1;
          let _ = Date.now() - S.now;
          return S.maxAge ? _ > S.maxAge : m[n] && _ > m[n];
        },
        y = (m) => {
          if (m[i] > m[s])
            for (let S = m[c].tail; m[i] > m[s] && S !== null; ) {
              let _ = S.prev;
              w(m, S), (S = _);
            }
        },
        w = (m, S) => {
          if (S) {
            let _ = S.value;
            m[a] && m[a](_.key, _.value),
              (m[i] -= _.length),
              m[h].delete(_.key),
              m[c].removeNode(S);
          }
        },
        L = class {
          constructor(m, S, _, b, P) {
            (this.key = m),
              (this.value = S),
              (this.length = _),
              (this.now = b),
              (this.maxAge = P || 0);
          }
        },
        x = (m, S, _, b) => {
          let P = _.value;
          v(m, P) && (w(m, _), m[l] || (P = void 0)),
            P && S.call(b, P.value, P.key, m);
        };
      e.exports = g;
    },
  }),
  H = N({
    '../../node_modules/semver/classes/range.js'(t, e) {
      var r = class Se {
        constructor(E, I) {
          if (((I = o(I)), E instanceof Se))
            return E.loose === !!I.loose &&
              E.includePrerelease === !!I.includePrerelease
              ? E
              : new Se(E.raw, I);
          if (E instanceof l)
            return (
              (this.raw = E.value), (this.set = [[E]]), this.format(), this
            );
          if (
            ((this.options = I),
            (this.loose = !!I.loose),
            (this.includePrerelease = !!I.includePrerelease),
            (this.raw = E.trim().split(/\s+/).join(' ')),
            (this.set = this.raw
              .split('||')
              .map((A) => this.parseRange(A.trim()))
              .filter((A) => A.length)),
            !this.set.length)
          )
            throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
          if (this.set.length > 1) {
            let A = this.set[0];
            if (
              ((this.set = this.set.filter(($) => !v($[0]))),
              this.set.length === 0)
            )
              this.set = [A];
            else if (this.set.length > 1) {
              for (let $ of this.set)
                if ($.length === 1 && y($[0])) {
                  this.set = [$];
                  break;
                }
            }
          }
          this.format();
        }
        format() {
          return (
            (this.range = this.set
              .map((E) => E.join(' ').trim())
              .join('||')
              .trim()),
            this.range
          );
        }
        toString() {
          return this.range;
        }
        parseRange(E) {
          let I =
              ((this.options.includePrerelease && g) |
                (this.options.loose && d)) +
              ':' +
              E,
            A = i.get(I);
          if (A) return A;
          let $ = this.options.loose,
            R = $ ? u[c.HYPHENRANGELOOSE] : u[c.HYPHENRANGE];
          (E = E.replace(R, je(this.options.includePrerelease))),
            n('hyphen replace', E),
            (E = E.replace(u[c.COMPARATORTRIM], h)),
            n('comparator trim', E),
            (E = E.replace(u[c.TILDETRIM], f)),
            n('tilde trim', E),
            (E = E.replace(u[c.CARETTRIM], p)),
            n('caret trim', E);
          let j = E.split(' ')
            .map((F) => L(F, this.options))
            .join(' ')
            .split(/\s+/)
            .map((F) => Ne(F, this.options));
          $ &&
            (j = j.filter(
              (F) => (
                n('loose invalid filter', F, this.options),
                !!F.match(u[c.COMPARATORLOOSE])
              )
            )),
            n('range list', j);
          let D = new Map(),
            C = j.map((F) => new l(F, this.options));
          for (let F of C) {
            if (v(F)) return [F];
            D.set(F.value, F);
          }
          D.size > 1 && D.has('') && D.delete('');
          let G = [...D.values()];
          return i.set(I, G), G;
        }
        intersects(E, I) {
          if (!(E instanceof Se)) throw new TypeError('a Range is required');
          return this.set.some(
            (A) =>
              w(A, I) &&
              E.set.some(
                ($) =>
                  w($, I) && A.every((R) => $.every((j) => R.intersects(j, I)))
              )
          );
        }
        test(E) {
          if (!E) return !1;
          if (typeof E == 'string')
            try {
              E = new a(E, this.options);
            } catch {
              return !1;
            }
          for (let I = 0; I < this.set.length; I++)
            if (Le(this.set[I], E, this.options)) return !0;
          return !1;
        }
      };
      e.exports = r;
      var s = Bi(),
        i = new s({ max: 1e3 }),
        o = at(),
        l = xe(),
        n = Ae(),
        a = U(),
        {
          safeRe: u,
          t: c,
          comparatorTrimReplace: h,
          tildeTrimReplace: f,
          caretTrimReplace: p,
        } = pe(),
        { FLAG_INCLUDE_PRERELEASE: g, FLAG_LOOSE: d } = Te(),
        v = (O) => O.value === '<0.0.0-0',
        y = (O) => O.value === '',
        w = (O, E) => {
          let I = !0,
            A = O.slice(),
            $ = A.pop();
          for (; I && A.length; )
            (I = A.every((R) => $.intersects(R, E))), ($ = A.pop());
          return I;
        },
        L = (O, E) => (
          n('comp', O, E),
          (O = _(O, E)),
          n('caret', O),
          (O = m(O, E)),
          n('tildes', O),
          (O = P(O, E)),
          n('xrange', O),
          (O = k(O, E)),
          n('stars', O),
          O
        ),
        x = (O) => !O || O.toLowerCase() === 'x' || O === '*',
        m = (O, E) =>
          O.trim()
            .split(/\s+/)
            .map((I) => S(I, E))
            .join(' '),
        S = (O, E) => {
          let I = E.loose ? u[c.TILDELOOSE] : u[c.TILDE];
          return O.replace(I, (A, $, R, j, D) => {
            n('tilde', O, A, $, R, j, D);
            let C;
            return (
              x($)
                ? (C = '')
                : x(R)
                  ? (C = `>=${$}.0.0 <${+$ + 1}.0.0-0`)
                  : x(j)
                    ? (C = `>=${$}.${R}.0 <${$}.${+R + 1}.0-0`)
                    : D
                      ? (n('replaceTilde pr', D),
                        (C = `>=${$}.${R}.${j}-${D} <${$}.${+R + 1}.0-0`))
                      : (C = `>=${$}.${R}.${j} <${$}.${+R + 1}.0-0`),
              n('tilde return', C),
              C
            );
          });
        },
        _ = (O, E) =>
          O.trim()
            .split(/\s+/)
            .map((I) => b(I, E))
            .join(' '),
        b = (O, E) => {
          n('caret', O, E);
          let I = E.loose ? u[c.CARETLOOSE] : u[c.CARET],
            A = E.includePrerelease ? '-0' : '';
          return O.replace(I, ($, R, j, D, C) => {
            n('caret', O, $, R, j, D, C);
            let G;
            return (
              x(R)
                ? (G = '')
                : x(j)
                  ? (G = `>=${R}.0.0${A} <${+R + 1}.0.0-0`)
                  : x(D)
                    ? R === '0'
                      ? (G = `>=${R}.${j}.0${A} <${R}.${+j + 1}.0-0`)
                      : (G = `>=${R}.${j}.0${A} <${+R + 1}.0.0-0`)
                    : C
                      ? (n('replaceCaret pr', C),
                        R === '0'
                          ? j === '0'
                            ? (G = `>=${R}.${j}.${D}-${C} <${R}.${j}.${+D + 1}-0`)
                            : (G = `>=${R}.${j}.${D}-${C} <${R}.${+j + 1}.0-0`)
                          : (G = `>=${R}.${j}.${D}-${C} <${+R + 1}.0.0-0`))
                      : (n('no pr'),
                        R === '0'
                          ? j === '0'
                            ? (G = `>=${R}.${j}.${D}${A} <${R}.${j}.${+D + 1}-0`)
                            : (G = `>=${R}.${j}.${D}${A} <${R}.${+j + 1}.0-0`)
                          : (G = `>=${R}.${j}.${D} <${+R + 1}.0.0-0`)),
              n('caret return', G),
              G
            );
          });
        },
        P = (O, E) => (
          n('replaceXRanges', O, E),
          O.split(/\s+/)
            .map((I) => T(I, E))
            .join(' ')
        ),
        T = (O, E) => {
          O = O.trim();
          let I = E.loose ? u[c.XRANGELOOSE] : u[c.XRANGE];
          return O.replace(I, (A, $, R, j, D, C) => {
            n('xRange', O, A, $, R, j, D, C);
            let G = x(R),
              F = G || x(j),
              z = F || x(D),
              ie = z;
            return (
              $ === '=' && ie && ($ = ''),
              (C = E.includePrerelease ? '-0' : ''),
              G
                ? $ === '>' || $ === '<'
                  ? (A = '<0.0.0-0')
                  : (A = '*')
                : $ && ie
                  ? (F && (j = 0),
                    (D = 0),
                    $ === '>'
                      ? (($ = '>='),
                        F
                          ? ((R = +R + 1), (j = 0), (D = 0))
                          : ((j = +j + 1), (D = 0)))
                      : $ === '<=' &&
                        (($ = '<'), F ? (R = +R + 1) : (j = +j + 1)),
                    $ === '<' && (C = '-0'),
                    (A = `${$ + R}.${j}.${D}${C}`))
                  : F
                    ? (A = `>=${R}.0.0${C} <${+R + 1}.0.0-0`)
                    : z && (A = `>=${R}.${j}.0${C} <${R}.${+j + 1}.0-0`),
              n('xRange return', A),
              A
            );
          });
        },
        k = (O, E) => (
          n('replaceStars', O, E), O.trim().replace(u[c.STAR], '')
        ),
        Ne = (O, E) => (
          n('replaceGTE0', O, E),
          O.trim().replace(u[E.includePrerelease ? c.GTE0PRE : c.GTE0], '')
        ),
        je = (O) => (E, I, A, $, R, j, D, C, G, F, z, ie, Sl) => (
          x(A)
            ? (I = '')
            : x($)
              ? (I = `>=${A}.0.0${O ? '-0' : ''}`)
              : x(R)
                ? (I = `>=${A}.${$}.0${O ? '-0' : ''}`)
                : j
                  ? (I = `>=${I}`)
                  : (I = `>=${I}${O ? '-0' : ''}`),
          x(G)
            ? (C = '')
            : x(F)
              ? (C = `<${+G + 1}.0.0-0`)
              : x(z)
                ? (C = `<${G}.${+F + 1}.0-0`)
                : ie
                  ? (C = `<=${G}.${F}.${z}-${ie}`)
                  : O
                    ? (C = `<${G}.${F}.${+z + 1}-0`)
                    : (C = `<=${C}`),
          `${I} ${C}`.trim()
        ),
        Le = (O, E, I) => {
          for (let A = 0; A < O.length; A++) if (!O[A].test(E)) return !1;
          if (E.prerelease.length && !I.includePrerelease) {
            for (let A = 0; A < O.length; A++)
              if (
                (n(O[A].semver),
                O[A].semver !== l.ANY && O[A].semver.prerelease.length > 0)
              ) {
                let $ = O[A].semver;
                if (
                  $.major === E.major &&
                  $.minor === E.minor &&
                  $.patch === E.patch
                )
                  return !0;
              }
            return !1;
          }
          return !0;
        };
    },
  }),
  xe = N({
    '../../node_modules/semver/classes/comparator.js'(t, e) {
      var r = Symbol('SemVer ANY'),
        s = class We {
          static get ANY() {
            return r;
          }
          constructor(f, p) {
            if (((p = i(p)), f instanceof We)) {
              if (f.loose === !!p.loose) return f;
              f = f.value;
            }
            (f = f.trim().split(/\s+/).join(' ')),
              a('comparator', f, p),
              (this.options = p),
              (this.loose = !!p.loose),
              this.parse(f),
              this.semver === r
                ? (this.value = '')
                : (this.value = this.operator + this.semver.version),
              a('comp', this);
          }
          parse(f) {
            let p = this.options.loose ? o[l.COMPARATORLOOSE] : o[l.COMPARATOR],
              g = f.match(p);
            if (!g) throw new TypeError(`Invalid comparator: ${f}`);
            (this.operator = g[1] !== void 0 ? g[1] : ''),
              this.operator === '=' && (this.operator = ''),
              g[2]
                ? (this.semver = new u(g[2], this.options.loose))
                : (this.semver = r);
          }
          toString() {
            return this.value;
          }
          test(f) {
            if (
              (a('Comparator.test', f, this.options.loose),
              this.semver === r || f === r)
            )
              return !0;
            if (typeof f == 'string')
              try {
                f = new u(f, this.options);
              } catch {
                return !1;
              }
            return n(f, this.operator, this.semver, this.options);
          }
          intersects(f, p) {
            if (!(f instanceof We))
              throw new TypeError('a Comparator is required');
            return this.operator === ''
              ? this.value === ''
                ? !0
                : new c(f.value, p).test(this.value)
              : f.operator === ''
                ? f.value === ''
                  ? !0
                  : new c(this.value, p).test(f.semver)
                : ((p = i(p)),
                  (p.includePrerelease &&
                    (this.value === '<0.0.0-0' || f.value === '<0.0.0-0')) ||
                  (!p.includePrerelease &&
                    (this.value.startsWith('<0.0.0') ||
                      f.value.startsWith('<0.0.0')))
                    ? !1
                    : !!(
                        (this.operator.startsWith('>') &&
                          f.operator.startsWith('>')) ||
                        (this.operator.startsWith('<') &&
                          f.operator.startsWith('<')) ||
                        (this.semver.version === f.semver.version &&
                          this.operator.includes('=') &&
                          f.operator.includes('=')) ||
                        (n(this.semver, '<', f.semver, p) &&
                          this.operator.startsWith('>') &&
                          f.operator.startsWith('<')) ||
                        (n(this.semver, '>', f.semver, p) &&
                          this.operator.startsWith('<') &&
                          f.operator.startsWith('>'))
                      ));
          }
        };
      e.exports = s;
      var i = at(),
        { safeRe: o, t: l } = pe(),
        n = fr(),
        a = Ae(),
        u = U(),
        c = H();
    },
  }),
  Ie = N({
    '../../node_modules/semver/functions/satisfies.js'(t, e) {
      var r = H(),
        s = (i, o, l) => {
          try {
            o = new r(o, l);
          } catch {
            return !1;
          }
          return o.test(i);
        };
      e.exports = s;
    },
  }),
  Xi = N({
    '../../node_modules/semver/ranges/to-comparators.js'(t, e) {
      var r = H(),
        s = (i, o) =>
          new r(i, o).set.map((l) =>
            l
              .map((n) => n.value)
              .join(' ')
              .trim()
              .split(' ')
          );
      e.exports = s;
    },
  }),
  Hi = N({
    '../../node_modules/semver/ranges/max-satisfying.js'(t, e) {
      var r = U(),
        s = H(),
        i = (o, l, n) => {
          let a = null,
            u = null,
            c = null;
          try {
            c = new s(l, n);
          } catch {
            return null;
          }
          return (
            o.forEach((h) => {
              c.test(h) &&
                (!a || u.compare(h) === -1) &&
                ((a = h), (u = new r(a, n)));
            }),
            a
          );
        };
      e.exports = i;
    },
  }),
  Yi = N({
    '../../node_modules/semver/ranges/min-satisfying.js'(t, e) {
      var r = U(),
        s = H(),
        i = (o, l, n) => {
          let a = null,
            u = null,
            c = null;
          try {
            c = new s(l, n);
          } catch {
            return null;
          }
          return (
            o.forEach((h) => {
              c.test(h) &&
                (!a || u.compare(h) === 1) &&
                ((a = h), (u = new r(a, n)));
            }),
            a
          );
        };
      e.exports = i;
    },
  }),
  Wi = N({
    '../../node_modules/semver/ranges/min-version.js'(t, e) {
      var r = U(),
        s = H(),
        i = $e(),
        o = (l, n) => {
          l = new s(l, n);
          let a = new r('0.0.0');
          if (l.test(a) || ((a = new r('0.0.0-0')), l.test(a))) return a;
          a = null;
          for (let u = 0; u < l.set.length; ++u) {
            let c = l.set[u],
              h = null;
            c.forEach((f) => {
              let p = new r(f.semver.version);
              switch (f.operator) {
                case '>':
                  p.prerelease.length === 0 ? p.patch++ : p.prerelease.push(0),
                    (p.raw = p.format());
                case '':
                case '>=':
                  (!h || i(p, h)) && (h = p);
                  break;
                case '<':
                case '<=':
                  break;
                default:
                  throw new Error(`Unexpected operation: ${f.operator}`);
              }
            }),
              h && (!a || i(a, h)) && (a = h);
          }
          return a && l.test(a) ? a : null;
        };
      e.exports = o;
    },
  }),
  Ki = N({
    '../../node_modules/semver/ranges/valid.js'(t, e) {
      var r = H(),
        s = (i, o) => {
          try {
            return new r(i, o).range || '*';
          } catch {
            return null;
          }
        };
      e.exports = s;
    },
  }),
  ct = N({
    '../../node_modules/semver/ranges/outside.js'(t, e) {
      var r = U(),
        s = xe(),
        { ANY: i } = s,
        o = H(),
        l = Ie(),
        n = $e(),
        a = ot(),
        u = ut(),
        c = lt(),
        h = (f, p, g, d) => {
          (f = new r(f, d)), (p = new o(p, d));
          let v, y, w, L, x;
          switch (g) {
            case '>':
              (v = n), (y = u), (w = a), (L = '>'), (x = '>=');
              break;
            case '<':
              (v = a), (y = c), (w = n), (L = '<'), (x = '<=');
              break;
            default:
              throw new TypeError('Must provide a hilo val of "<" or ">"');
          }
          if (l(f, p, d)) return !1;
          for (let m = 0; m < p.set.length; ++m) {
            let S = p.set[m],
              _ = null,
              b = null;
            if (
              (S.forEach((P) => {
                P.semver === i && (P = new s('>=0.0.0')),
                  (_ = _ || P),
                  (b = b || P),
                  v(P.semver, _.semver, d)
                    ? (_ = P)
                    : w(P.semver, b.semver, d) && (b = P);
              }),
              _.operator === L ||
                _.operator === x ||
                ((!b.operator || b.operator === L) && y(f, b.semver)) ||
                (b.operator === x && w(f, b.semver)))
            )
              return !1;
          }
          return !0;
        };
      e.exports = h;
    },
  }),
  zi = N({
    '../../node_modules/semver/ranges/gtr.js'(t, e) {
      var r = ct(),
        s = (i, o, l) => r(i, o, '>', l);
      e.exports = s;
    },
  }),
  Qi = N({
    '../../node_modules/semver/ranges/ltr.js'(t, e) {
      var r = ct(),
        s = (i, o, l) => r(i, o, '<', l);
      e.exports = s;
    },
  }),
  Ji = N({
    '../../node_modules/semver/ranges/intersects.js'(t, e) {
      var r = H(),
        s = (i, o, l) => (
          (i = new r(i, l)), (o = new r(o, l)), i.intersects(o, l)
        );
      e.exports = s;
    },
  }),
  Zi = N({
    '../../node_modules/semver/ranges/simplify.js'(t, e) {
      var r = Ie(),
        s = X();
      e.exports = (i, o, l) => {
        let n = [],
          a = null,
          u = null,
          c = i.sort((g, d) => s(g, d, l));
        for (let g of c)
          r(g, o, l)
            ? ((u = g), a || (a = g))
            : (u && n.push([a, u]), (u = null), (a = null));
        a && n.push([a, null]);
        let h = [];
        for (let [g, d] of n)
          g === d
            ? h.push(g)
            : !d && g === c[0]
              ? h.push('*')
              : d
                ? g === c[0]
                  ? h.push(`<=${d}`)
                  : h.push(`${g} - ${d}`)
                : h.push(`>=${g}`);
        let f = h.join(' || '),
          p = typeof o.raw == 'string' ? o.raw : String(o);
        return f.length < p.length ? f : o;
      };
    },
  }),
  eo = N({
    '../../node_modules/semver/ranges/subset.js'(t, e) {
      var r = H(),
        s = xe(),
        { ANY: i } = s,
        o = Ie(),
        l = X(),
        n = (p, g, d = {}) => {
          if (p === g) return !0;
          (p = new r(p, d)), (g = new r(g, d));
          let v = !1;
          e: for (let y of p.set) {
            for (let w of g.set) {
              let L = c(y, w, d);
              if (((v = v || L !== null), L)) continue e;
            }
            if (v) return !1;
          }
          return !0;
        },
        a = [new s('>=0.0.0-0')],
        u = [new s('>=0.0.0')],
        c = (p, g, d) => {
          if (p === g) return !0;
          if (p.length === 1 && p[0].semver === i) {
            if (g.length === 1 && g[0].semver === i) return !0;
            d.includePrerelease ? (p = a) : (p = u);
          }
          if (g.length === 1 && g[0].semver === i) {
            if (d.includePrerelease) return !0;
            g = u;
          }
          let v = new Set(),
            y,
            w;
          for (let T of p)
            T.operator === '>' || T.operator === '>='
              ? (y = h(y, T, d))
              : T.operator === '<' || T.operator === '<='
                ? (w = f(w, T, d))
                : v.add(T.semver);
          if (v.size > 1) return null;
          let L;
          if (
            y &&
            w &&
            ((L = l(y.semver, w.semver, d)),
            L > 0 || (L === 0 && (y.operator !== '>=' || w.operator !== '<=')))
          )
            return null;
          for (let T of v) {
            if ((y && !o(T, String(y), d)) || (w && !o(T, String(w), d)))
              return null;
            for (let k of g) if (!o(T, String(k), d)) return !1;
            return !0;
          }
          let x,
            m,
            S,
            _,
            b =
              w && !d.includePrerelease && w.semver.prerelease.length
                ? w.semver
                : !1,
            P =
              y && !d.includePrerelease && y.semver.prerelease.length
                ? y.semver
                : !1;
          b &&
            b.prerelease.length === 1 &&
            w.operator === '<' &&
            b.prerelease[0] === 0 &&
            (b = !1);
          for (let T of g) {
            if (
              ((_ = _ || T.operator === '>' || T.operator === '>='),
              (S = S || T.operator === '<' || T.operator === '<='),
              y)
            ) {
              if (
                (P &&
                  T.semver.prerelease &&
                  T.semver.prerelease.length &&
                  T.semver.major === P.major &&
                  T.semver.minor === P.minor &&
                  T.semver.patch === P.patch &&
                  (P = !1),
                T.operator === '>' || T.operator === '>=')
              ) {
                if (((x = h(y, T, d)), x === T && x !== y)) return !1;
              } else if (y.operator === '>=' && !o(y.semver, String(T), d))
                return !1;
            }
            if (w) {
              if (
                (b &&
                  T.semver.prerelease &&
                  T.semver.prerelease.length &&
                  T.semver.major === b.major &&
                  T.semver.minor === b.minor &&
                  T.semver.patch === b.patch &&
                  (b = !1),
                T.operator === '<' || T.operator === '<=')
              ) {
                if (((m = f(w, T, d)), m === T && m !== w)) return !1;
              } else if (w.operator === '<=' && !o(w.semver, String(T), d))
                return !1;
            }
            if (!T.operator && (w || y) && L !== 0) return !1;
          }
          return !(
            (y && S && !w && L !== 0) ||
            (w && _ && !y && L !== 0) ||
            P ||
            b
          );
        },
        h = (p, g, d) => {
          if (!p) return g;
          let v = l(p.semver, g.semver, d);
          return v > 0
            ? p
            : v < 0 || (g.operator === '>' && p.operator === '>=')
              ? g
              : p;
        },
        f = (p, g, d) => {
          if (!p) return g;
          let v = l(p.semver, g.semver, d);
          return v < 0
            ? p
            : v > 0 || (g.operator === '<' && p.operator === '<=')
              ? g
              : p;
        };
      e.exports = n;
    },
  }),
  to = N({
    '../../node_modules/semver/index.js'(t, e) {
      var r = pe(),
        s = Te(),
        i = U(),
        o = ur(),
        l = ae(),
        n = xi(),
        a = Ii(),
        u = Ni(),
        c = ji(),
        h = Li(),
        f = Pi(),
        p = Ci(),
        g = Di(),
        d = X(),
        v = Gi(),
        y = Fi(),
        w = it(),
        L = Ui(),
        x = Mi(),
        m = $e(),
        S = ot(),
        _ = cr(),
        b = hr(),
        P = lt(),
        T = ut(),
        k = fr(),
        Ne = qi(),
        je = xe(),
        Le = H(),
        O = Ie(),
        E = Xi(),
        I = Hi(),
        A = Yi(),
        $ = Wi(),
        R = Ki(),
        j = ct(),
        D = zi(),
        C = Qi(),
        G = Ji(),
        F = Zi(),
        z = eo();
      e.exports = {
        parse: l,
        valid: n,
        clean: a,
        inc: u,
        diff: c,
        major: h,
        minor: f,
        patch: p,
        prerelease: g,
        compare: d,
        rcompare: v,
        compareLoose: y,
        compareBuild: w,
        sort: L,
        rsort: x,
        gt: m,
        lt: S,
        eq: _,
        neq: b,
        gte: P,
        lte: T,
        cmp: k,
        coerce: Ne,
        Comparator: je,
        Range: Le,
        satisfies: O,
        toComparators: E,
        maxSatisfying: I,
        minSatisfying: A,
        minVersion: $,
        validRange: R,
        outside: j,
        gtr: D,
        ltr: C,
        intersects: G,
        simplifyRange: F,
        subset: z,
        SemVer: i,
        re: r.re,
        src: r.src,
        tokens: r.t,
        SEMVER_SPEC_VERSION: s.SEMVER_SPEC_VERSION,
        RELEASE_TYPES: s.RELEASE_TYPES,
        compareIdentifiers: o.compareIdentifiers,
        rcompareIdentifiers: o.rcompareIdentifiers,
      };
    },
  }),
  ro = ({ api: t, state: e }) => K.createContext({ api: t, state: e }),
  so = (t) => {
    t.fn('set', function (e, r) {
      return t.set(this._area, this._in(e), os(r, { maxDepth: 50 }));
    }),
      t.fn('get', function (e, r) {
        let s = t.get(this._area, this._in(e));
        return s !== null ? ls(s) : r || s;
      });
  };
so(ue._);
var pr = '@storybook/manager/store';
function Ke(t) {
  return t.get(pr) || {};
}
function no(t, e) {
  return t.set(pr, e);
}
function ao(t, e) {
  let r = Ke(t);
  return no(t, { ...r, ...e });
}
var io = class {
    constructor({ setState: t, getState: e }) {
      (this.upstreamSetState = t), (this.upstreamGetState = e);
    }
    getInitialState(t) {
      return { ...t, ...Ke(ue.local), ...Ke(ue.session) };
    }
    getState() {
      return this.upstreamGetState();
    }
    async setState(t, e, r) {
      let s, i;
      typeof e == 'function' ? ((s = e), (i = r)) : (i = e);
      let { persistence: o = 'none' } = i || {},
        l = {},
        n = {};
      typeof t == 'function'
        ? (l = (u) => ((n = t(u)), n))
        : ((l = t), (n = l));
      let a = await new Promise((u) => {
        this.upstreamSetState(l, u);
      });
      if (o !== 'none') {
        let u = o === 'session' ? ue.session : ue.local;
        await ao(u, n);
      }
      return s && s(a), a;
    }
  },
  ee = (t, e) =>
    Qt({}, t, e, (r, s) => {
      if (Array.isArray(s) && Array.isArray(r))
        return (
          s.forEach((i) => {
            r.find((o) => o === i || Ln(o, i)) || r.push(i);
          }),
          r
        );
      if (Array.isArray(r))
        return re.log(['the types mismatch, picking', r]), r;
    }),
  oo = (...t) => t.reduce((e, r) => ee(e, r), {}),
  ze = oo,
  gr = {};
q(gr, { init: () => lo });
var lo = ({ provider: t, fullAPI: e }) => ({
    api: t.renderPreview ? { renderPreview: t.renderPreview } : {},
    state: {},
    init: () => {
      t.handleAPI(e);
    },
  }),
  dr = {};
q(dr, { ensurePanel: () => Qe, init: () => uo });
function Qe(t, e, r) {
  let s = Object.keys(t);
  return s.indexOf(e) >= 0 ? e : s.length ? s[0] : r;
}
var uo = ({ provider: t, store: e, fullAPI: r }) => {
    let s = {
      getElements: (i) => t.getElements(i),
      getPanels: () => s.getElements(ce.PANEL),
      getStoryPanels: () => {
        let i = s.getElements(ce.PANEL),
          { storyId: o } = e.getState(),
          l = r.getData(o);
        if (!i || !l || l.type !== 'story') return i;
        let { parameters: n } = l,
          a = {};
        return (
          Object.entries(i).forEach(([u, c]) => {
            let { paramKey: h } = c;
            (h && n && n[h] && n[h].disable) || (a[u] = c);
          }),
          a
        );
      },
      getSelectedPanel: () => {
        let { selectedPanel: i } = e.getState();
        return Qe(s.getElements(ce.PANEL), i, i);
      },
      setSelectedPanel: (i) => {
        e.setState({ selectedPanel: i }, { persistence: 'session' });
      },
      setAddonState(i, o, l) {
        let n,
          { addons: a } = e.getState();
        return (
          typeof o == 'function' ? (n = o(s.getAddonState(i))) : (n = o),
          e
            .setState({ addons: { ...a, [i]: n } }, l)
            .then(() => s.getAddonState(i))
        );
      },
      getAddonState: (i) =>
        e.getState().addons[i] ||
        (globalThis == null ? void 0 : globalThis.STORYBOOK_ADDON_STATE[i]),
    };
    return {
      api: s,
      state: {
        selectedPanel: Qe(s.getElements(ce.PANEL), e.getState().selectedPanel),
        addons: {},
      },
    };
  },
  mr = {};
q(mr, { init: () => co });
var co = ({ provider: t }) => {
    let e = {
      getChannel: () => t.channel,
      on: (r, s) => (t.channel.on(r, s), () => t.channel.off(r, s)),
      off: (r, s) => t.channel.off(r, s),
      once: (r, s) => t.channel.once(r, s),
      emit: (r, s, ...i) => {
        var o;
        (o = s == null ? void 0 : s.options) != null &&
          o.target &&
          s.options.target !== 'storybook-preview-iframe' &&
          !s.options.target.startsWith('storybook-ref-') &&
          (s.options.target =
            s.options.target !== 'storybook_internal'
              ? `storybook-ref-${s.options.target}`
              : 'storybook-preview-iframe'),
          t.channel.emit(r, s, ...i);
      },
      collapseAll: () => {
        e.emit(hi, {});
      },
      expandAll: () => {
        e.emit(fi);
      },
    };
    return { api: e, state: {} };
  },
  vr = {};
q(vr, { init: () => ho });
var ho = ({ store: t }) => {
    let e = {
      addNotification: (r) => {
        e.clearNotification(r.id);
        let { notifications: s } = t.getState();
        t.setState({ notifications: [...s, r] });
      },
      clearNotification: (r) => {
        let { notifications: s } = t.getState();
        t.setState({ notifications: s.filter((o) => o.id !== r) });
        let i = s.find((o) => o.id === r);
        i && i.onClear && i.onClear({ dismissed: !1 });
      },
    };
    return { api: e, state: { notifications: [] } };
  },
  yr = {};
q(yr, { init: () => fo });
var fo = ({ store: t, navigate: e, fullAPI: r }) => {
    let s = () => {
      let { path: i } = r.getUrlState();
      return !!(i || '').match(/^\/settings/);
    };
    return {
      state: { settings: { lastTrackedStoryId: null } },
      api: {
        closeSettings: () => {
          let {
            settings: { lastTrackedStoryId: i },
          } = t.getState();
          i ? r.selectStory(i) : r.selectFirstStory();
        },
        changeSettingsTab: (i) => {
          e(`/settings/${i}`);
        },
        isSettingsScreenActive: s,
        navigateToSettingsPage: async (i) => {
          if (!s()) {
            let { settings: o, storyId: l } = t.getState();
            await t.setState({ settings: { ...o, lastTrackedStoryId: l } });
          }
          e(i);
        },
        retrieveSelection() {
          let { settings: i } = t.getState();
          return i.lastTrackedStoryId;
        },
        storeSelection: async () => {
          let { storyId: i, settings: o } = t.getState();
          await t.setState({ settings: { ...o, lastTrackedStoryId: i } });
        },
      },
    };
  },
  Sr = {};
q(Sr, { init: () => No });
var Er = {};
q(Er, {
  defaultStoryMapper: () => Or,
  getSourceType: () => _r,
  init: () => Ao,
});
var po = /\s*\/\s*/,
  go = ({ globalParameters: t, kindParameters: e, stories: r }) =>
    Zr(r, (s) => ({ ...s, parameters: Wo(t, e[s.kind], s.parameters) })),
  mo = (t, e) => ht(vo(t), e),
  vo = (t) => ({
    v: 4,
    entries: Object.entries(t).reduce((e, [r, s]) => {
      if (!s) return e;
      let { docsOnly: i, fileName: o, ...l } = s.parameters,
        n = { title: s.kind, id: r, name: s.name, importPath: o };
      if (i)
        e[r] = {
          type: 'docs',
          tags: ['stories-mdx'],
          storiesImports: [],
          ...n,
        };
      else {
        let { argTypes: a, args: u, initialArgs: c } = s;
        e[r] = {
          type: 'story',
          ...n,
          parameters: l,
          argTypes: a,
          args: u,
          initialArgs: c,
        };
      }
      return e;
    }, {}),
  }),
  yo = (t) => ({
    v: 3,
    stories: Object.values(t.stories).reduce(
      (e, r) => (
        (e[r.id] = {
          ...r,
          title: r.kind,
          name: r.name || r.story,
          importPath: r.parameters.fileName || '',
        }),
        e
      ),
      {}
    ),
  }),
  So = (t) => {
    let e = na(Object.values(t.stories), 'title');
    return {
      v: 4,
      entries: Object.values(t.stories).reduce((r, s) => {
        var o;
        let i = 'story';
        return (
          (((o = s.parameters) != null && o.docsOnly) ||
            (s.name === 'Page' && e[s.title] === 1)) &&
            (i = 'docs'),
          (r[s.id] = {
            type: i,
            ...(i === 'docs' && { tags: ['stories-mdx'], storiesImports: [] }),
            ...s,
          }),
          delete r[s.id].story,
          delete r[s.id].kind,
          r
        );
      }, {}),
    };
  },
  ht = (t, { provider: e, docsOptions: r, filters: s, status: i }) => {
    if (!t.v) throw new Error('Composition: Missing stories.json version');
    let o = t;
    (o = o.v === 2 ? yo(o) : o), (o = o.v === 3 ? So(o) : o), (o = o);
    let l = Object.values(o.entries).filter((d) => {
        let v = !0;
        return (
          Object.values(s).forEach((y) => {
            v !== !1 && (v = y({ ...d, status: i[d.id] }));
          }),
          v
        );
      }),
      { sidebar: n = {} } = e.getConfig(),
      { showRoots: a, collapsedRoots: u = [], renderLabel: c } = n,
      h = typeof a < 'u',
      f = l.reduce((d, v) => {
        if (r.docsMode && v.type !== 'docs') return d;
        let { title: y } = v,
          w = y.trim().split(po),
          L = (!h || a) && w.length > 1 ? [w.shift()] : [],
          x = [...L, ...w],
          m = x.reduce((S, _, b) => {
            let P = b > 0 && S[b - 1],
              T = Be(P ? `${P}-${_}` : _);
            if (P === T)
              throw new Error(Bt`
          Invalid part '${_}', leading to id === parentId ('${T}'), inside title '${y}'
          
          Did you create a path that uses the separator char accidentally, such as 'Vue <docs/>' where '/' is a separator char? See https://github.com/storybookjs/storybook/issues/6128
          `);
            return S.push(T), S;
          }, []);
        return (
          m.forEach((S, _) => {
            let b = m[_ + 1] || v.id;
            L.length && _ === 0
              ? (d[S] = ee(d[S] || {}, {
                  type: 'root',
                  id: S,
                  name: x[_],
                  depth: _,
                  renderLabel: c,
                  startCollapsed: u.includes(S),
                  children: [b],
                  isRoot: !0,
                  isComponent: !1,
                  isLeaf: !1,
                }))
              : (!d[S] || d[S].type === 'component') && _ === m.length - 1
                ? (d[S] = ee(d[S] || {}, {
                    type: 'component',
                    id: S,
                    name: x[_],
                    parent: m[_ - 1],
                    depth: _,
                    renderLabel: c,
                    ...(b && { children: [b] }),
                    isRoot: !1,
                    isComponent: !0,
                    isLeaf: !1,
                  }))
                : (d[S] = ee(d[S] || {}, {
                    type: 'group',
                    id: S,
                    name: x[_],
                    parent: m[_ - 1],
                    depth: _,
                    renderLabel: c,
                    ...(b && { children: [b] }),
                    isRoot: !1,
                    isComponent: !1,
                    isLeaf: !1,
                  }));
          }),
          (d[v.id] = {
            type: 'story',
            ...v,
            depth: m.length,
            parent: m[m.length - 1],
            renderLabel: c,
            prepared: !!v.parameters,
            kind: v.title,
            isRoot: !1,
            isComponent: !1,
            isLeaf: !0,
          }),
          d
        );
      }, {});
    function p(d, v) {
      return (
        d[v.id] ||
          ((d[v.id] = v),
          (v.type === 'root' || v.type === 'group' || v.type === 'component') &&
            v.children.forEach((y) => p(d, f[y]))),
        d
      );
    }
    let g = Object.values(f)
      .filter((d) => d.type !== 'root' && !d.parent)
      .reduce(p, {});
    return Object.values(f)
      .filter((d) => d.type === 'root')
      .reduce(p, g);
  },
  Eo = (t, e) =>
    e
      ? Object.fromEntries(
          Object.entries(t).map(([r, s]) => {
            let i = e[r];
            return s.type === 'story' &&
              (i == null ? void 0 : i.type) === 'story' &&
              i.prepared
              ? [r, { ...i, ...s, prepared: !0 }]
              : [r, s];
          })
        )
      : t,
  _o = ne(1)((t) =>
    Object.entries(t).reduce((e, r) => {
      let s = r[1];
      return s.type === 'component' && e.push([...s.children]), e;
    }, [])
  ),
  Oo = ne(1)((t) =>
    Object.keys(t).filter((e) => ['story', 'docs'].includes(t[e].type))
  ),
  { location: bo, fetch: $t } = B,
  xt = /(\/((?:[^\/]+?)\.[^\/]+?)|\/)$/,
  _r = (t, e) => {
    let { origin: r, pathname: s } = bo,
      { origin: i, pathname: o } = new URL(t),
      l = `${r + s}`.replace(xt, ''),
      n = `${i + o}`.replace(xt, '');
    return l === n ? ['local', n] : e || t ? ['external', n] : [null, null];
  },
  Or = (t, e) => ({ ...e, kind: e.kind.replace('|', '/') }),
  Ro = (t, e) =>
    Object.entries(t).reduce(
      (r, [s, i]) => ({ ...r, [s]: { ...i, refId: e.id } }),
      {}
    );
async function It(t) {
  if (!t) return {};
  try {
    let e = await t;
    if (e === !1 || e === !0) throw new Error('Unexpected boolean response');
    if (!e.ok) throw new Error(`Unexpected response not OK: ${e.statusText}`);
    let r = await e.json();
    return r.entries || r.stories ? { storyIndex: r } : r;
  } catch (e) {
    return { indexError: e };
  }
}
var wo = (t) => {
    let e = /https?:\/\/(.+:.+)@/,
      r = t,
      s,
      [, i] = t.match(e) || [];
    return (
      i && ((r = t.replace(`${i}@`, '')), (s = btoa(`${i}`))),
      { url: r, authorization: s }
    );
  },
  To = (t, e, r) => {
    let { storyMapper: s } = r;
    return s
      ? Object.entries(t).reduce((i, [o, l]) => ({ ...i, [o]: s(e, l) }), {})
      : t;
  },
  Ao = (
    { store: t, provider: e, singleStory: r, docsOptions: s = {} },
    { runCheck: i = !0 } = {}
  ) => {
    let o = {
        findRef: (a) => {
          let u = o.getRefs();
          return Object.values(u).find(({ url: c }) => c.match(a));
        },
        changeRefVersion: (a, u) => {
          let { versions: c, title: h } = o.getRefs()[a],
            f = {
              id: a,
              url: u,
              versions: c,
              title: h,
              index: {},
              expanded: !0,
            };
          o.setRef(a, { ...f, type: 'unknown' }, !1), o.checkRef(f);
        },
        changeRefState: (a, u) => {
          let { [a]: c, ...h } = o.getRefs();
          (h[a] = { ...c, previewInitialized: u }), t.setState({ refs: h });
        },
        checkRef: async (a) => {
          let { id: u, url: c, version: h, type: f } = a,
            p = f === 'server-checked',
            g = {},
            d = h ? `?version=${h}` : '',
            v = p ? 'omit' : 'include',
            y = wo(c),
            w = { Accept: 'application/json' };
          y.authorization &&
            Object.assign(w, { Authorization: `Basic ${y.authorization}` });
          let [L, x] = await Promise.all(
            ['index.json', 'stories.json'].map(async (S) =>
              It($t(`${y.url}/${S}${d}`, { headers: w, credentials: v }))
            )
          );
          if (!L.indexError || !x.indexError) {
            let S = await It(
              $t(`${y.url}/metadata.json${d}`, {
                headers: w,
                credentials: v,
                cache: 'no-cache',
              }).catch(() => !1)
            );
            Object.assign(g, {
              ...(L.indexError ? x : L),
              ...(!S.indexError && S),
            });
          } else
            p ||
              (g.indexError = {
                message: Bt`
            Error: Loading of ref failed
              at fetch (lib/api/src/modules/refs.ts)

            URL: ${y.url}

            We weren't able to load the above URL,
            it's possible a CORS error happened.

            Please check your dev-tools network tab.
          `,
              });
          let m =
            a.versions && Object.keys(a.versions).length
              ? a.versions
              : g.versions;
          await o.setRef(u, {
            id: u,
            url: y.url,
            ...g,
            ...(m ? { versions: m } : {}),
            type: g.storyIndex ? 'lazy' : 'auto-inject',
          });
        },
        getRefs: () => {
          let { refs: a = {} } = t.getState();
          return a;
        },
        setRef: (a, { storyIndex: u, setStoriesData: c, ...h }, f = !1) => {
          if (r) return;
          let { storyMapper: p = Or } = e.getConfig(),
            g = o.getRefs()[a],
            d;
          c
            ? (d = mo(To(c, g, { storyMapper: p }), {
                provider: e,
                docsOptions: s,
                filters: {},
                status: {},
              }))
            : u &&
              (d = ht(u, {
                provider: e,
                docsOptions: s,
                filters: {},
                status: {},
              })),
            d && (d = Ro(d, g)),
            o.updateRef(a, { index: d, ...h });
        },
        updateRef: (a, u) => {
          let { [a]: c, ...h } = o.getRefs();
          h[a] = { ...c, ...u };
          let f = Object.keys(n).reduce((p, g) => ((p[g] = h[g]), p), {});
          t.setState({ refs: f });
        },
      },
      l = (!r && B.REFS) || {},
      n = l;
    return (
      i &&
        Object.entries(l).forEach(([a, u]) => {
          o.checkRef({ ...u, stories: {} });
        }),
      { api: o, state: { refs: n } }
    );
  },
  M = (t, e) => {
    let { source: r, refId: s, type: i } = t,
      [o, l] = _r(r, s),
      n = s && e.getRefs()[s] ? e.getRefs()[s] : e.findRef(l),
      a = {
        source: r,
        sourceType: o,
        sourceLocation: l,
        refId: s,
        ref: n,
        type: i,
      };
    switch (!0) {
      case typeof s == 'string':
      case o === 'local':
      case o === 'external':
        return a;
      default:
        return (
          re.warn(`Received a ${i} frame that was not configured as a ref`),
          null
        );
    }
  },
  { FEATURES: De, fetch: $o } = B,
  xo = './index.json',
  Io = ['enableShortcuts', 'theme', 'showRoots'];
function Ge(t) {
  if (!t || typeof t == 'string') return t;
  let e = { ...t };
  return (
    Io.forEach((r) => {
      r in e && delete e[r];
    }),
    e
  );
}
var No = ({
    fullAPI: t,
    store: e,
    navigate: r,
    provider: s,
    storyId: i,
    viewMode: o,
    docsOptions: l = {},
  }) => {
    var u;
    let n = {
      storyId: ge,
      getData: (c, h) => {
        let f = n.resolveStory(c, h);
        if (
          (f == null ? void 0 : f.type) === 'story' ||
          (f == null ? void 0 : f.type) === 'docs'
        )
          return f;
      },
      isPrepared: (c, h) => {
        let f = n.getData(c, h);
        return f ? (f.type === 'story' ? f.prepared : !0) : !1;
      },
      resolveStory: (c, h) => {
        let { refs: f, index: p } = e.getState();
        return h && !f[h]
          ? null
          : h
            ? f[h].index
              ? f[h].index[c]
              : void 0
            : p
              ? p[c]
              : void 0;
      },
      getCurrentStoryData: () => {
        let { storyId: c, refId: h } = e.getState();
        return n.getData(c, h);
      },
      getParameters: (c, h) => {
        let { storyId: f, refId: p } =
            typeof c == 'string' ? { storyId: c, refId: void 0 } : c,
          g = n.getData(f, p);
        if (['story', 'docs'].includes(g == null ? void 0 : g.type)) {
          let { parameters: d } = g;
          if (d) return h ? d[h] : d;
        }
        return null;
      },
      getCurrentParameter: (c) => {
        let { storyId: h, refId: f } = e.getState();
        return n.getParameters({ storyId: h, refId: f }, c) || void 0;
      },
      jumpToComponent: (c) => {
        let { index: h, storyId: f, refs: p, refId: g } = e.getState();
        if (!n.getData(f, g)) return;
        let d = g ? p[g].index || {} : h,
          v = n.findSiblingStoryId(f, d, c, !0);
        v && n.selectStory(v, void 0, { ref: g });
      },
      jumpToStory: (c) => {
        let { index: h, storyId: f, refs: p, refId: g } = e.getState(),
          d = n.getData(f, g);
        if (!d) return;
        let v = d.refId ? p[d.refId].index : h,
          y = n.findSiblingStoryId(f, v, c, !1);
        y && n.selectStory(y, void 0, { ref: g });
      },
      selectFirstStory: () => {
        let { index: c } = e.getState(),
          h = Object.keys(c).find((f) => c[f].type === 'story');
        if (h) {
          n.selectStory(h);
          return;
        }
        r('/');
      },
      selectStory: (c = void 0, h = void 0, f = {}) => {
        let { ref: p } = f,
          { storyId: g, index: d, refs: v } = e.getState(),
          y = p ? v[p].index : d,
          w = g == null ? void 0 : g.split('--', 2)[0];
        if (h)
          if (c) {
            let L = p ? `${p}_${ge(c, h)}` : ge(c, h);
            if (y[L]) n.selectStory(L, void 0, f);
            else {
              let x = y[Be(c)];
              if ((x == null ? void 0 : x.type) === 'component') {
                let m = x.children.find((S) => y[S].name === h);
                m && n.selectStory(m, void 0, f);
              }
            }
          } else {
            let L = ge(w, h);
            n.selectStory(L, void 0, f);
          }
        else {
          let L = c ? y[c] || y[Be(c)] : y[w];
          if (!L) throw new Error(`Unknown id or title: '${c}'`);
          e.setState({
            settings: { ...e.getState().settings, lastTrackedStoryId: L.id },
          });
          let x = n.findLeafEntry(y, L.id),
            m = x.refId ? `${x.refId}_${x.id}` : x.id;
          r(`/${x.type}/${m}`);
        }
      },
      findLeafEntry(c, h) {
        let f = c[h];
        if (f.type === 'docs' || f.type === 'story') return f;
        let p = f.children[0];
        return n.findLeafEntry(c, p);
      },
      findLeafStoryId(c, h) {
        var f;
        return (f = n.findLeafEntry(c, h)) == null ? void 0 : f.id;
      },
      findSiblingStoryId(c, h, f, p) {
        if (p) {
          let v = _o(h),
            y = v.findIndex((w) => w.includes(c));
          return (y === v.length - 1 && f > 0) || (y === 0 && f < 0)
            ? void 0
            : v[y + f]
              ? v[y + f][0]
              : void 0;
        }
        let g = Oo(h),
          d = g.indexOf(c);
        if (!(d === g.length - 1 && f > 0) && !(d === 0 && f < 0))
          return g[d + f];
      },
      updateStoryArgs: (c, h) => {
        let { id: f, refId: p } = c;
        s.channel.emit(pi, {
          storyId: f,
          updatedArgs: h,
          options: { target: p },
        });
      },
      resetStoryArgs: (c, h) => {
        let { id: f, refId: p } = c;
        s.channel.emit(gi, { storyId: f, argNames: h, options: { target: p } });
      },
      fetchIndex: async () => {
        try {
          let c = await $o(xo);
          if (c.status !== 200) throw new Error(await c.text());
          let h = await c.json();
          if (h.v < 3) {
            re.warn(
              `Skipping story index with version v${h.v}, awaiting SET_STORIES.`
            );
            return;
          }
          await n.setIndex(h);
        } catch (c) {
          await e.setState({ indexError: c });
        }
      },
      setIndex: async (c) => {
        let { index: h, status: f, filters: p } = e.getState(),
          g = ht(c, { provider: s, docsOptions: l, status: f, filters: p }),
          d = Eo(g, h);
        await e.setState({ internal_index: c, index: d, indexError: void 0 });
      },
      updateStory: async (c, h, f) => {
        if (f) {
          let { id: p, index: g } = f;
          (g[c] = { ...g[c], ...h }), await t.updateRef(p, { index: g });
        } else {
          let { index: p } = e.getState();
          (p[c] = { ...p[c], ...h }), await e.setState({ index: p });
        }
      },
      updateDocs: async (c, h, f) => {
        if (f) {
          let { id: p, index: g } = f;
          (g[c] = { ...g[c], ...h }), await t.updateRef(p, { index: g });
        } else {
          let { index: p } = e.getState();
          (p[c] = { ...p[c], ...h }), await e.setState({ index: p });
        }
      },
      setPreviewInitialized: async (c) => {
        c
          ? t.updateRef(c.id, { previewInitialized: !0 })
          : e.setState({ previewInitialized: !0 });
      },
      experimental_updateStatus: async (c, h) => {
        let { status: f, internal_index: p } = e.getState(),
          g = { ...f },
          d = typeof h == 'function' ? h(f) : h;
        Object.keys(d).length !== 0 &&
          (Object.entries(d).forEach(([v, y]) => {
            (g[v] = { ...(g[v] || {}) }),
              y === null ? delete g[v][c] : (g[v][c] = y),
              Object.keys(g[v]).length === 0 && delete g[v];
          }),
          await e.setState({ status: g }, { persistence: 'session' }),
          p && (await n.setIndex(p)));
      },
      experimental_setFilter: async (c, h) => {
        let { internal_index: f } = e.getState();
        await e.setState({ filters: { ...e.getState().filters, [c]: h } }),
          await n.setIndex(f);
      },
    };
    s.channel.on(za, function ({ storyId: c, viewMode: h }) {
      let { sourceType: f } = M(this, t);
      if (f === 'local') {
        let p = e.getState(),
          g = p.path === '/' || p.viewMode === 'story' || p.viewMode === 'docs',
          d = p.viewMode && p.storyId,
          v = p.viewMode !== h || p.storyId !== c,
          { type: y } = p.index[p.storyId] || {};
        g &&
          (d && v && !(y === 'root' || y === 'component' || y === 'group')
            ? s.channel.emit(ar, { storyId: p.storyId, viewMode: p.viewMode })
            : v && r(`/${h}/${c}`));
      }
    }),
      s.channel.on(Qa, function () {
        let { ref: c } = M(this, t);
        n.setPreviewInitialized(c);
      }),
      s.channel.on(Ja, function () {
        let { sourceType: c } = M(this, t);
        if (c === 'local') {
          let h = n.getCurrentParameter('options');
          h && t.setOptions(Ge(h));
        }
      }),
      s.channel.on(Za, function ({ id: c, ...h }) {
        let { ref: f, sourceType: p } = M(this, t);
        if (
          (n.updateStory(c, { ...h, prepared: !0 }, f),
          !f && !e.getState().hasCalledSetOptions)
        ) {
          let { options: g } = h.parameters;
          t.setOptions(Ge(g)), e.setState({ hasCalledSetOptions: !0 });
        }
        if (p === 'local') {
          let { storyId: g, index: d, refId: v } = e.getState(),
            y = Array.from(
              new Set([
                n.findSiblingStoryId(g, d, 1, !0),
                n.findSiblingStoryId(g, d, -1, !0),
              ])
            ).filter(Boolean);
          s.channel.emit(ei, { ids: y, options: { target: v } });
        }
      }),
      s.channel.on(ti, function ({ id: c, ...h }) {
        let { ref: f } = M(this, t);
        n.updateStory(c, { ...h, prepared: !0 }, f);
      }),
      s.channel.on(ri, function (c) {
        let { ref: h } = M(this, t);
        if (h) t.setRef(h.id, { ...h, storyIndex: c }, !0);
        else {
          n.setIndex(c);
          let f = n.getCurrentParameter('options');
          t.setOptions(Ge(f));
        }
      }),
      s.channel.on(si, function (c) {
        let { ref: h } = M(this, t),
          f = c.v ? go(c) : c.stories;
        if (h) t.setRef(h.id, { ...h, setStoriesData: f }, !0);
        else throw new Error('Cannot call SET_STORIES for local frame');
      }),
      s.channel.on(
        ni,
        function ({
          kind: c,
          title: h = c,
          story: f,
          name: p = f,
          storyId: g,
          ...d
        }) {
          let { ref: v } = M(this, t);
          v
            ? t.selectStory(g || h, p, { ...d, ref: v.id })
            : t.selectStory(g || h, p, d);
        }
      ),
      s.channel.on(ir, function ({ storyId: c, args: h }) {
        let { ref: f } = M(this, t);
        n.updateStory(c, { args: h }, f);
      }),
      s.channel.on(ai, function (c) {
        let { ref: h } = M(this, t);
        n.setPreviewInitialized(h);
      }),
      s.channel.on(ii, function (c) {
        let { ref: h } = M(this, t);
        n.setPreviewInitialized(h);
      }),
      s.channel.on(Re, () => {
        var h, f;
        let c = s.getConfig();
        (h = c == null ? void 0 : c.sidebar) != null &&
          h.filters &&
          e.setState({
            filters: {
              ...e.getState().filters,
              ...((f = c == null ? void 0 : c.sidebar) == null
                ? void 0
                : f.filters),
            },
          });
      });
    let a = s.getConfig();
    return {
      api: n,
      state: {
        storyId: i,
        viewMode: o,
        hasCalledSetOptions: !1,
        previewInitialized: !1,
        status: {},
        filters:
          ((u = a == null ? void 0 : a.sidebar) == null ? void 0 : u.filters) ||
          {},
      },
      init: async () => {
        De != null &&
          De.storyStoreV7 &&
          (s.channel.on(oi, () => n.fetchIndex()), await n.fetchIndex());
      },
    };
  },
  br = {};
q(br, { ActiveTabs: () => Rr, focusableUIElements: () => Ee, init: () => Lo });
var { document: jo } = B,
  Rr = { SIDEBAR: 'sidebar', CANVAS: 'canvas', ADDONS: 'addons' },
  Z = {
    ui: { enableShortcuts: !0 },
    layout: {
      initialActive: Rr.CANVAS,
      showToolbar: !0,
      isFullscreen: !1,
      showPanel: !0,
      showNav: !0,
      panelPosition: 'bottom',
      showTabs: !0,
    },
    selectedPanel: void 0,
    theme: is(),
  },
  Ee = {
    storySearchField: 'storybook-explorer-searchfield',
    storyListMenu: 'storybook-explorer-menu',
    storyPanelRoot: 'storybook-panel-root',
  },
  Lo = ({ store: t, provider: e, singleStory: r, fullAPI: s }) => {
    let i = {
        toggleFullscreen(l) {
          return t.setState(
            (n) => {
              let { showNav: a } = n.layout,
                u = typeof l == 'boolean' ? l : !n.layout.isFullscreen,
                c = a === !1 && u === !1;
              return {
                layout: {
                  ...n.layout,
                  isFullscreen: u,
                  showNav: !r && c ? !0 : a,
                },
              };
            },
            { persistence: 'session' }
          );
        },
        togglePanel(l) {
          return t.setState(
            (n) => {
              let { showNav: a, isFullscreen: u } = n.layout,
                c = typeof l < 'u' ? l : !n.layout.showPanel,
                h = a === !1 && c === !1;
              return {
                layout: { ...n.layout, showPanel: c, isFullscreen: h ? !0 : u },
              };
            },
            { persistence: 'session' }
          );
        },
        togglePanelPosition(l) {
          return typeof l < 'u'
            ? t.setState(
                (n) => ({ layout: { ...n.layout, panelPosition: l } }),
                { persistence: 'permanent' }
              )
            : t.setState(
                (n) => ({
                  layout: {
                    ...n.layout,
                    panelPosition:
                      n.layout.panelPosition === 'right' ? 'bottom' : 'right',
                  },
                }),
                { persistence: 'permanent' }
              );
        },
        toggleNav(l) {
          return t.setState(
            (n) => {
              if (r) return { layout: n.layout };
              let { showPanel: a, isFullscreen: u } = n.layout,
                c = typeof l < 'u' ? l : !n.layout.showNav,
                h = a === !1 && c === !1;
              return {
                layout: {
                  ...n.layout,
                  showNav: c,
                  isFullscreen: h ? !0 : !c && u,
                },
              };
            },
            { persistence: 'session' }
          );
        },
        toggleToolbar(l) {
          return t.setState(
            (n) => {
              let a = typeof l < 'u' ? l : !n.layout.showToolbar;
              return { layout: { ...n.layout, showToolbar: a } };
            },
            { persistence: 'session' }
          );
        },
        resetLayout() {
          return t.setState(
            (l) => ({
              layout: {
                ...l.layout,
                showNav: !1,
                showPanel: !1,
                isFullscreen: !1,
              },
            }),
            { persistence: 'session' }
          );
        },
        focusOnUIElement(l, n) {
          if (!l) return;
          let a = jo.getElementById(l);
          a && (a.focus(), n && a.select());
        },
        getInitialOptions() {
          let { theme: l, selectedPanel: n, ...a } = e.getConfig();
          return {
            ...Z,
            layout: {
              ...Z.layout,
              ...oe(a, Object.keys(Z.layout)),
              ...(r && { showNav: !1 }),
            },
            ui: { ...Z.ui, ...oe(a, Object.keys(Z.ui)) },
            selectedPanel: n || Z.selectedPanel,
            theme: l || Z.theme,
          };
        },
        setOptions: (l) => {
          let { layout: n, ui: a, selectedPanel: u, theme: c } = t.getState();
          if (l) {
            let h = {
                ...n,
                ...l.layout,
                ...oe(l, Object.keys(n)),
                ...(r && { showNav: !1 }),
              },
              f = { ...a, ...l.ui, ...oe(l, Object.keys(a)) },
              p = { ...c, ...l.theme },
              g = {};
            V(a, f) || (g.ui = f),
              V(n, h) || (g.layout = h),
              l.selectedPanel &&
                !V(u, l.selectedPanel) &&
                (g.selectedPanel = l.selectedPanel),
              Object.keys(g).length &&
                t.setState(g, { persistence: 'permanent' }),
              V(c, p) || t.setState({ theme: p });
          }
        },
      },
      o = oe(t.getState(), 'layout', 'selectedPanel');
    return {
      api: i,
      state: ee(i.getInitialOptions(), o),
      init: () => {
        i.setOptions(ee(i.getInitialOptions(), o)),
          e.channel.on(Re, () => {
            i.setOptions(ee(i.getInitialOptions(), o));
          });
      },
    };
  },
  wr = {};
q(wr, {
  controlOrMetaKey: () => _e,
  defaultShortcuts: () => te,
  init: () => Go,
  isMacLike: () => Tr,
  keys: () => Je,
});
var Po = (t) => {
    var r;
    if (['Meta', 'Alt', 'Control', 'Shift'].includes(t.key)) return null;
    let e = [];
    if (
      (t.altKey && e.push('alt'),
      t.ctrlKey && e.push('control'),
      t.metaKey && e.push('meta'),
      t.shiftKey && e.push('shift'),
      t.key && t.key.length === 1 && t.key !== ' ')
    ) {
      let s = t.key.toUpperCase(),
        i =
          (r = t.code) == null
            ? void 0
            : r.toUpperCase().replace('KEY', '').replace('DIGIT', '');
      i && i.length === 1 && i !== s ? e.push([s, i]) : e.push(s);
    }
    return (
      t.key === ' ' && e.push('space'),
      t.key === 'Escape' && e.push('escape'),
      t.key === 'ArrowRight' && e.push('ArrowRight'),
      t.key === 'ArrowDown' && e.push('ArrowDown'),
      t.key === 'ArrowUp' && e.push('ArrowUp'),
      t.key === 'ArrowLeft' && e.push('ArrowLeft'),
      e.length > 0 ? e : null
    );
  },
  Co = (t, e) =>
    !t ||
    !e ||
    (t.join('').startsWith('shift/') && t.shift(), t.length !== e.length)
      ? !1
      : !t.find((r, s) => (Array.isArray(r) ? !r.includes(e[s]) : r !== e[s])),
  { navigator: Fe, document: Nt } = B,
  Tr = () =>
    Fe && Fe.platform ? !!Fe.platform.match(/(Mac|iPhone|iPod|iPad)/i) : !1,
  _e = () => (Tr() ? 'meta' : 'control');
function Je(t) {
  return Object.keys(t);
}
var te = Object.freeze({
    fullScreen: ['F'],
    togglePanel: ['A'],
    panelPosition: ['D'],
    toggleNav: ['S'],
    toolbar: ['T'],
    search: ['/'],
    focusNav: ['1'],
    focusIframe: ['2'],
    focusPanel: ['3'],
    prevComponent: ['alt', 'ArrowUp'],
    nextComponent: ['alt', 'ArrowDown'],
    prevStory: ['alt', 'ArrowLeft'],
    nextStory: ['alt', 'ArrowRight'],
    shortcutsPage: [_e(), 'shift', ','],
    aboutPage: [','],
    escape: ['escape'],
    collapseAll: [_e(), 'shift', 'ArrowUp'],
    expandAll: [_e(), 'shift', 'ArrowDown'],
    remount: ['alt', 'R'],
  }),
  Ue = {};
function Do(t) {
  let e = t.target;
  return (
    /input|textarea/i.test(e.tagName) ||
    e.getAttribute('contenteditable') !== null
  );
}
var Go = ({ store: t, fullAPI: e, provider: r }) => {
    let s = {
        getShortcutKeys() {
          return t.getState().shortcuts;
        },
        getDefaultShortcuts() {
          return { ...te, ...s.getAddonsShortcutDefaults() };
        },
        getAddonsShortcuts() {
          return Ue;
        },
        getAddonsShortcutLabels() {
          let l = {};
          return (
            Object.entries(s.getAddonsShortcuts()).forEach(
              ([n, { label: a }]) => {
                l[n] = a;
              }
            ),
            l
          );
        },
        getAddonsShortcutDefaults() {
          let l = {};
          return (
            Object.entries(s.getAddonsShortcuts()).forEach(
              ([n, { defaultShortcut: a }]) => {
                l[n] = a;
              }
            ),
            l
          );
        },
        async setShortcuts(l) {
          return (
            await t.setState({ shortcuts: l }, { persistence: 'permanent' }), l
          );
        },
        async restoreAllDefaultShortcuts() {
          return s.setShortcuts(s.getDefaultShortcuts());
        },
        async setShortcut(l, n) {
          let a = s.getShortcutKeys();
          return await s.setShortcuts({ ...a, [l]: n }), n;
        },
        async setAddonShortcut(l, n) {
          let a = s.getShortcutKeys();
          return (
            await s.setShortcuts({
              ...a,
              [`${l}-${n.actionName}`]: n.defaultShortcut,
            }),
            (Ue[`${l}-${n.actionName}`] = n),
            n
          );
        },
        async restoreDefaultShortcut(l) {
          let n = s.getDefaultShortcuts()[l];
          return s.setShortcut(l, n);
        },
        handleKeydownEvent(l) {
          let n = Po(l),
            a = s.getShortcutKeys(),
            u = Je(a).find((c) => Co(n, a[c]));
          u && s.handleShortcutFeature(u, l);
        },
        handleShortcutFeature(l, n) {
          let {
            layout: { isFullscreen: a, showNav: u, showPanel: c },
            ui: { enableShortcuts: h },
            storyId: f,
          } = t.getState();
          if (h)
            switch ((n != null && n.preventDefault && n.preventDefault(), l)) {
              case 'escape': {
                a ? e.toggleFullscreen() : u || e.toggleNav();
                break;
              }
              case 'focusNav': {
                a && e.toggleFullscreen(),
                  u || e.toggleNav(),
                  e.focusOnUIElement(Ee.storyListMenu);
                break;
              }
              case 'search': {
                a && e.toggleFullscreen(),
                  u || e.toggleNav(),
                  setTimeout(() => {
                    e.focusOnUIElement(Ee.storySearchField, !0);
                  }, 0);
                break;
              }
              case 'focusIframe': {
                let p = Nt.getElementById('storybook-preview-iframe');
                if (p)
                  try {
                    p.contentWindow.focus();
                  } catch {}
                break;
              }
              case 'focusPanel': {
                a && e.toggleFullscreen(),
                  c || e.togglePanel(),
                  e.focusOnUIElement(Ee.storyPanelRoot);
                break;
              }
              case 'nextStory': {
                e.jumpToStory(1);
                break;
              }
              case 'prevStory': {
                e.jumpToStory(-1);
                break;
              }
              case 'nextComponent': {
                e.jumpToComponent(1);
                break;
              }
              case 'prevComponent': {
                e.jumpToComponent(-1);
                break;
              }
              case 'fullScreen': {
                e.toggleFullscreen();
                break;
              }
              case 'togglePanel': {
                a && (e.toggleFullscreen(), e.resetLayout()), e.togglePanel();
                break;
              }
              case 'toggleNav': {
                a && (e.toggleFullscreen(), e.resetLayout()), e.toggleNav();
                break;
              }
              case 'toolbar': {
                e.toggleToolbar();
                break;
              }
              case 'panelPosition': {
                a && e.toggleFullscreen(),
                  c || e.togglePanel(),
                  e.togglePanelPosition();
                break;
              }
              case 'aboutPage': {
                e.navigate('/settings/about');
                break;
              }
              case 'shortcutsPage': {
                e.navigate('/settings/shortcuts');
                break;
              }
              case 'collapseAll': {
                e.collapseAll();
                break;
              }
              case 'expandAll': {
                e.expandAll();
                break;
              }
              case 'remount': {
                e.emit(di, { storyId: f });
                break;
              }
              default:
                Ue[l].action();
                break;
            }
        },
      },
      { shortcuts: i = te } = t.getState(),
      o = {
        shortcuts: Je(te).reduce((l, n) => ({ ...l, [n]: i[n] || te[n] }), te),
      };
    return {
      api: s,
      state: o,
      init: () => {
        Nt.addEventListener('keydown', (l) => {
          Do(l) || s.handleKeydownEvent(l);
        }),
          r.channel.on(li, (l) => {
            s.handleKeydownEvent(l.event);
          });
      },
    };
  },
  Ar = {};
q(Ar, { init: () => Uo });
var { window: Me } = B,
  le = (t) => {
    if (t === 'true' || t === '1') return !0;
    if (t === 'false' || t === '0') return !1;
  },
  qe,
  Fo = ({
    state: { location: t, path: e, viewMode: r, storyId: s },
    singleStory: i,
  }) => {
    let {
        full: o,
        panel: l,
        nav: n,
        shortcuts: a,
        addonPanel: u,
        tabs: c,
        path: h,
        ...f
      } = Ka(t),
      p = {
        isFullscreen: le(o),
        showNav: !i && le(n),
        showPanel: le(l),
        panelPosition: ['right', 'bottom'].includes(l) ? l : void 0,
        showTabs: le(c),
      },
      g = { enableShortcuts: le(a) },
      d = u || void 0,
      v = s,
      y = V(qe, f) ? qe : f;
    return (
      (qe = y),
      {
        viewMode: r,
        layout: p,
        ui: g,
        selectedPanel: d,
        location: t,
        path: e,
        customQueryParams: y,
        storyId: v,
      }
    );
  },
  Uo = (t) => {
    let { store: e, navigate: r, provider: s, fullAPI: i } = t,
      o = (u, c = {}, h = {}) => {
        let f = Object.entries(c)
            .filter(([, g]) => g)
            .sort(([g], [d]) => (g < d ? -1 : 1))
            .map(([g, d]) => `${g}=${d}`),
          p = [u, ...f].join('&');
        return r(p, h);
      },
      l = {
        getQueryParam(u) {
          let { customQueryParams: c } = e.getState();
          return c ? c[u] : void 0;
        },
        getUrlState() {
          let {
            path: u,
            customQueryParams: c,
            storyId: h,
            url: f,
            viewMode: p,
          } = e.getState();
          return { path: u, queryParams: c, storyId: h, url: f, viewMode: p };
        },
        setQueryParams(u) {
          let { customQueryParams: c } = e.getState(),
            h = {},
            f = {
              ...c,
              ...Object.entries(u).reduce(
                (p, [g, d]) => (d !== null && (p[g] = d), p),
                h
              ),
            };
          V(c, f) ||
            (e.setState({ customQueryParams: f }), s.channel.emit(mi, f));
        },
        navigateUrl(u, c) {
          r(u, { plain: !0, ...c });
        },
      },
      n = () => {
        let { path: u, queryParams: c, viewMode: h } = l.getUrlState();
        if (h !== 'story') return;
        let f = i.getCurrentStoryData();
        if ((f == null ? void 0 : f.type) !== 'story') return;
        let { args: p, initialArgs: g } = f,
          d = At(g, p);
        o(u, { ...c, args: d }, { replace: !0 }), l.setQueryParams({ args: d });
      };
    s.channel.on(ar, () => n());
    let a;
    return (
      s.channel.on(ir, () => {
        'requestIdleCallback' in Me
          ? (a && Me.cancelIdleCallback(a),
            (a = Me.requestIdleCallback(n, { timeout: 1e3 })))
          : (a && clearTimeout(a), setTimeout(n, 100));
      }),
      s.channel.on(or, ({ globals: u, initialGlobals: c }) => {
        let { path: h, queryParams: f } = l.getUrlState(),
          p = At(c, u);
        o(h, { ...f, globals: p }, { replace: !0 }),
          l.setQueryParams({ globals: p });
      }),
      s.channel.on(ui, (u, c) => {
        l.navigateUrl(u, c);
      }),
      { api: l, state: Fo(t) }
    );
  },
  $r = {};
q($r, { init: () => ko });
var Q = $i(to()),
  Mo = '7.6.10',
  { VERSIONCHECK: qo } = B,
  jt = ne(1)(() => {
    try {
      return { ...(JSON.parse(qo).data || {}) };
    } catch {
      return {};
    }
  }),
  ko = ({ store: t }) => {
    let { dismissedVersionNotification: e } = t.getState(),
      r = {
        versions: { current: { version: Mo }, ...jt() },
        dismissedVersionNotification: e,
      },
      s = {
        getCurrentVersion: () => {
          let {
            versions: { current: i },
          } = t.getState();
          return i;
        },
        getLatestVersion: () => {
          let {
            versions: { latest: i, next: o, current: l },
          } = t.getState();
          return l && Q.default.prerelease(l.version) && o
            ? i && Q.default.gt(i.version, o.version)
              ? i
              : o
            : i;
        },
        versionUpdateAvailable: () => {
          let i = s.getLatestVersion(),
            o = s.getCurrentVersion();
          if (i) {
            if (!i.version || !o.version) return !0;
            let l = Q.default.prerelease(o.version)
                ? `${Q.default.major(o.version)}.${Q.default.minor(o.version)}.${Q.default.patch(o.version)}`
                : o.version,
              n = Q.default.diff(l, i.version);
            return (
              Q.default.gt(i.version, l) && n !== 'patch' && !n.includes('pre')
            );
          }
          return !1;
        },
      };
    return {
      init: async () => {
        let { versions: i = {} } = t.getState(),
          { latest: o, next: l } = jt();
        await t.setState({ versions: { ...i, latest: o, next: l } });
      },
      state: r,
      api: s,
    };
  },
  xr = {};
q(xr, { init: () => Vo });
var Lt = 'whats-new',
  Vo = ({ fullAPI: t, store: e, provider: r }) => {
    let s = { whatsNewData: void 0 };
    function i(a) {
      e.setState({ whatsNewData: a }), (s.whatsNewData = a);
    }
    let o = {
      isWhatsNewUnread() {
        var a;
        return (
          ((a = s.whatsNewData) == null ? void 0 : a.status) === 'SUCCESS' &&
          !s.whatsNewData.postIsRead
        );
      },
      whatsNewHasBeenRead() {
        var a;
        ((a = s.whatsNewData) == null ? void 0 : a.status) === 'SUCCESS' &&
          (n({ lastReadPost: s.whatsNewData.url }),
          i({ ...s.whatsNewData, postIsRead: !0 }),
          t.clearNotification(Lt));
      },
      toggleWhatsNewNotifications() {
        var a;
        ((a = s.whatsNewData) == null ? void 0 : a.status) === 'SUCCESS' &&
          (i({
            ...s.whatsNewData,
            disableWhatsNewNotifications:
              !s.whatsNewData.disableWhatsNewNotifications,
          }),
          r.channel.emit(vi, {
            disableWhatsNewNotifications:
              s.whatsNewData.disableWhatsNewNotifications,
          }));
      },
    };
    function l() {
      return (
        r.channel.emit(yi),
        new Promise((a) => r.channel.once(Si, ({ data: u }) => a(u)))
      );
    }
    function n(a) {
      r.channel.emit(Ei, a);
    }
    return {
      init: async () => {
        var c;
        if (B.CONFIG_TYPE !== 'DEVELOPMENT') return;
        let a = await l();
        i(a);
        let u = t.getUrlState();
        !(
          (u == null ? void 0 : u.path) === '/onboarding' ||
          ((c = u.queryParams) == null ? void 0 : c.onboarding) === 'true'
        ) &&
          a.status === 'SUCCESS' &&
          !a.disableWhatsNewNotifications &&
          a.showNotification &&
          t.addNotification({
            id: Lt,
            link: '/settings/whats-new',
            content: {
              headline: a.excerpt,
              subHeadline: "Click to learn what's new in Storybook",
            },
            icon: { name: 'hearthollow' },
            onClear({ dismissed: h }) {
              h && n({ lastDismissedPost: a.url });
            },
          });
      },
      state: s,
      api: o,
    };
  },
  Ir = {};
q(Ir, { init: () => Bo });
var Bo = ({ store: t, fullAPI: e, provider: r }) => {
  let s = {
      getGlobals() {
        return t.getState().globals;
      },
      getGlobalTypes() {
        return t.getState().globalTypes;
      },
      updateGlobals(l) {
        r.channel.emit(_i, {
          globals: l,
          options: { target: 'storybook-preview-iframe' },
        });
      },
    },
    i = { globals: {}, globalTypes: {} },
    o = (l) => {
      var a;
      let n = (a = t.getState()) == null ? void 0 : a.globals;
      V(l, n) || t.setState({ globals: l });
    };
  return (
    r.channel.on(or, function ({ globals: l }) {
      let { ref: n } = M(this, e);
      n
        ? re.warn(
            'received a GLOBALS_UPDATED from a non-local ref. This is not currently supported.'
          )
        : o(l);
    }),
    r.channel.on(ci, function ({ globals: l, globalTypes: n }) {
      var c;
      let { ref: a } = M(this, e),
        u = (c = t.getState()) == null ? void 0 : c.globals;
      a
        ? Object.keys(l).length > 0 &&
          re.warn(
            'received globals from a non-local ref. This is not currently supported.'
          )
        : t.setState({ globals: l, globalTypes: n }),
        u && Object.keys(u).length !== 0 && !V(l, u) && s.updateGlobals(u);
    }),
    { api: s, state: i }
  );
};
function Xo() {
  let t = { setHandler: () => {}, send: () => {} };
  return new Oi({ transport: t });
}
var Ho = class {
    constructor() {
      (this.loaders = {}),
        (this.elements = {}),
        (this.config = {}),
        (this.getChannel = () => (
          this.channel || this.setChannel(Xo()), this.channel
        )),
        (this.getServerChannel = () => {
          if (!this.serverChannel)
            throw new Error('Accessing non-existent serverChannel');
          return this.serverChannel;
        }),
        (this.ready = () => this.promise),
        (this.hasChannel = () => !!this.channel),
        (this.hasServerChannel = () => !!this.serverChannel),
        (this.setChannel = (t) => {
          (this.channel = t), this.resolve();
        }),
        (this.setServerChannel = (t) => {
          this.serverChannel = t;
        }),
        (this.addPanel = (t, e) => {
          this.add(t, { type: ce.PANEL, ...e });
        }),
        (this.setConfig = (t) => {
          Object.assign(this.config, t),
            this.hasChannel()
              ? this.getChannel().emit(Re, this.config)
              : this.ready().then((e) => {
                  e.emit(Re, this.config);
                });
        }),
        (this.getConfig = () => this.config),
        (this.register = (t, e) => {
          this.loaders[t] &&
            re.warn(`${t} was loaded twice, this could have bad side-effects`),
            (this.loaders[t] = e);
        }),
        (this.loadAddons = (t) => {
          Object.values(this.loaders).forEach((e) => e(t));
        }),
        (this.promise = new Promise((t) => {
          this.resolve = () => t(this.getChannel());
        }));
    }
    getElements(t) {
      return this.elements[t] || (this.elements[t] = {}), this.elements[t];
    }
    add(t, e) {
      let { type: r } = e,
        s = this.getElements(r);
      s[t] = { id: t, ...e };
    }
  },
  ke = '__STORYBOOK_ADDONS_MANAGER';
function Yo() {
  return B[ke] || (B[ke] = new Ho()), B[ke];
}
Yo();
var Nr = ro({ api: void 0, state: ze({}) }),
  Wo = (...t) =>
    Qt({}, ...t, (e, r) => {
      if (Array.isArray(r)) return r;
    }),
  Ko = class extends K.Component {
    constructor(t) {
      super(t),
        (this.api = {}),
        (this.initModules = () => {
          this.modules.forEach((d) => {
            'init' in d && d.init();
          });
        });
      let {
          location: e,
          path: r,
          refId: s,
          viewMode: i = t.docsOptions.docsMode ? 'docs' : t.viewMode,
          singleStory: o,
          storyId: l,
          docsOptions: n,
          navigate: a,
        } = t,
        u = new io({
          getState: () => this.state,
          setState: (d, v) => this.setState(d, v),
        }),
        c = {
          location: e,
          path: r,
          viewMode: i,
          singleStory: o,
          storyId: l,
          refId: s,
        },
        h = { docsOptions: n };
      this.state = u.getInitialState(ze({ ...c, ...h }));
      let f = { navigate: a, store: u, provider: t.provider };
      this.modules = [gr, mr, dr, br, vr, yr, wr, Sr, Er, Ir, Ar, $r, xr].map(
        (d) =>
          d.init({ ...c, ...h, ...f, state: this.state, fullAPI: this.api })
      );
      let p = ze(this.state, ...this.modules.map((d) => d.state)),
        g = Object.assign(
          this.api,
          { navigate: a },
          ...this.modules.map((d) => d.api)
        );
      (this.state = p), (this.api = g);
    }
    static getDerivedStateFromProps(t, e) {
      return e.path !== t.path
        ? {
            ...e,
            location: t.location,
            path: t.path,
            refId: t.refId,
            viewMode: t.viewMode,
            storyId: t.storyId,
          }
        : null;
    }
    shouldComponentUpdate(t, e) {
      let r = this.state,
        s = this.props;
      return r !== e || s.path !== t.path;
    }
    render() {
      let { children: t } = this.props,
        e = { state: this.state, api: this.api };
      return J.createElement(
        zo,
        { effect: this.initModules },
        J.createElement(Nr.Provider, { value: e }, J.createElement(Jo, null, t))
      );
    }
  };
Ko.displayName = 'Manager';
var zo = ({ children: t, effect: e }) => (J.useEffect(e, []), t),
  Qo = (t) => t;
function Jo({ filter: t = Qo, children: e }) {
  let r = K.useContext(Nr),
    s = K.useRef(e),
    i = K.useRef(t);
  if (typeof s.current != 'function')
    return J.createElement(K.Fragment, null, s.current);
  let o = i.current(r),
    l = K.useMemo(
      () => [...Object.entries(o).reduce((n, a) => n.concat(a), [])],
      [r.state]
    );
  return K.useMemo(() => {
    let n = s.current;
    return J.createElement(n, { ...o });
  }, l);
}
globalThis.STORYBOOK_ADDON_STATE = {};
var Zo = function t(e, r) {
  if (e === r) return !0;
  if (e && r && typeof e == 'object' && typeof r == 'object') {
    if (e.constructor !== r.constructor) return !1;
    var s, i, o;
    if (Array.isArray(e)) {
      if (((s = e.length), s != r.length)) return !1;
      for (i = s; i-- !== 0; ) if (!t(e[i], r[i])) return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === r.source && e.flags === r.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === r.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === r.toString();
    if (((o = Object.keys(e)), (s = o.length), s !== Object.keys(r).length))
      return !1;
    for (i = s; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, o[i])) return !1;
    for (i = s; i-- !== 0; ) {
      var l = o[i];
      if (!t(e[l], r[l])) return !1;
    }
    return !0;
  }
  return e !== e && r !== r;
};
const Pt = se(Zo);
function fe(t) {
  '@babel/helpers - typeof';
  return (
    (fe =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == 'function' &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? 'symbol'
              : typeof e;
          }),
    fe(t)
  );
}
var Ve;
function Ct(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    e &&
      (s = s.filter(function (i) {
        return Object.getOwnPropertyDescriptor(t, i).enumerable;
      })),
      r.push.apply(r, s);
  }
  return r;
}
function Dt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2
      ? Ct(Object(r), !0).forEach(function (s) {
          el(t, s, r[s]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
        : Ct(Object(r)).forEach(function (s) {
            Object.defineProperty(t, s, Object.getOwnPropertyDescriptor(r, s));
          });
  }
  return t;
}
function el(t, e, r) {
  return (
    (e = tl(e)),
    e in t
      ? Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (t[e] = r),
    t
  );
}
function tl(t) {
  var e = rl(t, 'string');
  return fe(e) === 'symbol' ? e : String(e);
}
function rl(t, e) {
  if (fe(t) !== 'object' || t === null) return t;
  var r = t[Symbol.toPrimitive];
  if (r !== void 0) {
    var s = r.call(t, e || 'default');
    if (fe(s) !== 'object') return s;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return (e === 'string' ? String : Number)(t);
}
function de(t) {
  return il(t) || al(t) || nl(t) || sl();
}
function sl() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function nl(t, e) {
  if (t) {
    if (typeof t == 'string') return Ze(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (
      (r === 'Object' && t.constructor && (r = t.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(t);
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Ze(t, e);
  }
}
function al(t) {
  if (
    (typeof Symbol < 'u' && t[Symbol.iterator] != null) ||
    t['@@iterator'] != null
  )
    return Array.from(t);
}
function il(t) {
  if (Array.isArray(t)) return Ze(t);
}
function Ze(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, s = new Array(e); r < e; r++) s[r] = t[r];
  return s;
}
const { global: ol } = __STORYBOOK_MODULE_GLOBAL__;
__STORYBOOK_MODULE_CORE_EVENTS__;
var jr = ol,
  ll = jr.document,
  we = jr.window,
  Lr = 'sb-addon-themes-3';
(Ve = we.matchMedia) === null ||
  Ve === void 0 ||
  Ve.call(we, '(prefers-color-scheme: dark)');
var et = {
    classTarget: 'body',
    dark: Oe.dark,
    darkClass: ['dark'],
    light: Oe.light,
    lightClass: ['light'],
    stylePreview: !1,
    userHasExplicitlySetTheTheme: !1,
  },
  Gt = function (e) {
    we.localStorage.setItem(Lr, JSON.stringify(e));
  },
  ul = function (e, r) {
    var s = r.current,
      i = r.darkClass,
      o = i === void 0 ? et.darkClass : i,
      l = r.lightClass,
      n = l === void 0 ? et.lightClass : l;
    if (s === 'dark') {
      var a, u;
      (a = e.classList).remove.apply(a, de(me(n))),
        (u = e.classList).add.apply(u, de(me(o)));
    } else {
      var c, h;
      (c = e.classList).remove.apply(c, de(me(o))),
        (h = e.classList).add.apply(h, de(me(n)));
    }
  },
  me = function (e) {
    var r = [];
    return r.concat(e).map(function (s) {
      return s;
    });
  },
  cl = function (e) {
    var r = ll.querySelector(e.classTarget);
    r && ul(r, e);
  },
  Pr = function () {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      r = we.localStorage.getItem(Lr);
    if (typeof r == 'string') {
      var s = JSON.parse(r);
      return (
        e &&
          (e.dark && !Pt(s.dark, e.dark) && ((s.dark = e.dark), Gt(s)),
          e.light && !Pt(s.light, e.light) && ((s.light = e.light), Gt(s))),
        s
      );
    }
    return Dt(Dt({}, et), e);
  };
cl(Pr());
function hl(t, e) {
  return dl(t) || gl(t, e) || pl(t, e) || fl();
}
function fl() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function pl(t, e) {
  if (t) {
    if (typeof t == 'string') return Ft(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (
      (r === 'Object' && t.constructor && (r = t.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(t);
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Ft(t, e);
  }
}
function Ft(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, s = new Array(e); r < e; r++) s[r] = t[r];
  return s;
}
function gl(t, e) {
  var r =
    t == null
      ? null
      : (typeof Symbol < 'u' && t[Symbol.iterator]) || t['@@iterator'];
  if (r != null) {
    var s,
      i,
      o,
      l,
      n = [],
      a = !0,
      u = !1;
    try {
      if (((o = (r = r.call(t)).next), e === 0)) {
        if (Object(r) !== r) return;
        a = !1;
      } else
        for (
          ;
          !(a = (s = o.call(r)).done) && (n.push(s.value), n.length !== e);
          a = !0
        );
    } catch (c) {
      (u = !0), (i = c);
    } finally {
      try {
        if (!a && r.return != null && ((l = r.return()), Object(l) !== l))
          return;
      } finally {
        if (u) throw i;
      }
    }
    return n;
  }
}
function dl(t) {
  if (Array.isArray(t)) return t;
}
const { addons: ml } = __STORYBOOK_MODULE_ADDONS__;
function vl() {
  var t = J.useState(Pr().current === 'dark'),
    e = hl(t, 2),
    r = e[0],
    s = e[1];
  return (
    J.useEffect(function () {
      var i = ml.getChannel();
      return (
        i.on(pt, s),
        function () {
          return i.off(pt, s);
        }
      );
    }, []),
    r
  );
}
const Bl = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
  options: { storySort: { method: 'alphabetical' } },
  darkMode: {
    stylePreview: !0,
    dark: { ...Oe.dark, ...ft, appBg: '#101010', barBg: '#151515' },
    light: { ...Oe.light, ...ft },
    darkClass: Cr.theme.className,
    lightClass: Dr.theme.className,
  },
};
function yl(t) {
  const e = vl(),
    { setTheme: r } = Gr();
  return (
    K.useEffect(() => {
      r(e ? 'dark' : 'light');
    }, [e]),
    ve.jsx(Fr, { children: t.children })
  );
}
const Xl = [
  (t) => ve.jsx(cs, { children: ve.jsx(yl, { children: ve.jsx(t, {}) }) }),
];
export { Xl as decorators, Bl as parameters };
