var U,
  a,
  a_,
  p_,
  H,
  e_,
  h_,
  R,
  d_,
  N = {},
  v_ = [],
  D_ = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,
  q = Array.isArray;
function $(_, e) {
  for (var t in e) _[t] = e[t];
  return _;
}
function m_(_) {
  var e = _.parentNode;
  e && e.removeChild(_);
}
function z(_, e, t) {
  var n,
    o,
    r,
    l = {};
  for (r in e)
    r == 'key' ? (n = e[r]) : r == 'ref' ? (o = e[r]) : (l[r] = e[r]);
  if (
    (arguments.length > 2 &&
      (l.children = arguments.length > 3 ? U.call(arguments, 2) : t),
    typeof _ == 'function' && _.defaultProps != null)
  )
    for (r in _.defaultProps) l[r] === void 0 && (l[r] = _.defaultProps[r]);
  return D(_, l, n, o, null);
}
function D(_, e, t, n, o) {
  var r = {
    type: _,
    props: e,
    key: t,
    ref: n,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    constructor: void 0,
    __v: o ?? ++a_,
    __i: -1,
    __u: 0,
  };
  return o == null && a.vnode != null && a.vnode(r), r;
}
function T_() {
  return { current: null };
}
function A(_) {
  return _.children;
}
function T(_, e) {
  (this.props = _), (this.context = e);
}
function P(_, e) {
  if (e == null) return _.__ ? P(_.__, _.__i + 1) : null;
  for (var t; e < _.__k.length; e++)
    if ((t = _.__k[e]) != null && t.__e != null) return t.__e;
  return typeof _.type == 'function' ? P(_) : null;
}
function y_(_) {
  var e, t;
  if ((_ = _.__) != null && _.__c != null) {
    for (_.__e = _.__c.base = null, e = 0; e < _.__k.length; e++)
      if ((t = _.__k[e]) != null && t.__e != null) {
        _.__e = _.__c.base = t.__e;
        break;
      }
    return y_(_);
  }
}
function G(_) {
  ((!_.__d && (_.__d = !0) && H.push(_) && !j.__r++) ||
    e_ !== a.debounceRendering) &&
    ((e_ = a.debounceRendering) || h_)(j);
}
function j() {
  var _, e, t, n, o, r, l, u, s;
  for (H.sort(R); (_ = H.shift()); )
    _.__d &&
      ((e = H.length),
      (n = void 0),
      (r = (o = (t = _).__v).__e),
      (u = []),
      (s = []),
      (l = t.__P) &&
        (((n = $({}, o)).__v = o.__v + 1),
        a.vnode && a.vnode(n),
        Q(
          l,
          n,
          o,
          t.__n,
          l.ownerSVGElement !== void 0,
          32 & o.__u ? [r] : null,
          u,
          r ?? P(o),
          !!(32 & o.__u),
          s
        ),
        (n.__.__k[n.__i] = n),
        $_(u, n, s),
        n.__e != r && y_(n)),
      H.length > e && H.sort(R));
  j.__r = 0;
}
function g_(_, e, t, n, o, r, l, u, s, c, p) {
  var i,
    d,
    f,
    m,
    k,
    y = (n && n.__k) || v_,
    v = e.length;
  for (t.__d = s, N_(t, e, y), s = t.__d, i = 0; i < v; i++)
    (f = t.__k[i]) != null &&
      typeof f != 'boolean' &&
      typeof f != 'function' &&
      ((d = f.__i === -1 ? N : y[f.__i] || N),
      (f.__i = i),
      Q(_, f, d, o, r, l, u, s, c, p),
      (m = f.__e),
      f.ref &&
        d.ref != f.ref &&
        (d.ref && X(d.ref, null, f), p.push(f.ref, f.__c || m, f)),
      k == null && m != null && (k = m),
      65536 & f.__u || d.__k === f.__k
        ? (s = b_(f, s, _))
        : typeof f.type == 'function' && f.__d !== void 0
          ? (s = f.__d)
          : m && (s = m.nextSibling),
      (f.__d = void 0),
      (f.__u &= -196609));
  (t.__d = s), (t.__e = k);
}
function N_(_, e, t) {
  var n,
    o,
    r,
    l,
    u,
    s = e.length,
    c = t.length,
    p = c,
    i = 0;
  for (_.__k = [], n = 0; n < s; n++)
    (o = _.__k[n] =
      (o = e[n]) == null || typeof o == 'boolean' || typeof o == 'function'
        ? null
        : typeof o == 'string' ||
            typeof o == 'number' ||
            typeof o == 'bigint' ||
            o.constructor == String
          ? D(null, o, null, null, o)
          : q(o)
            ? D(A, { children: o }, null, null, null)
            : o.constructor === void 0 && o.__b > 0
              ? D(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v)
              : o) != null
      ? ((o.__ = _),
        (o.__b = _.__b + 1),
        (u = U_(o, t, (l = n + i), p)),
        (o.__i = u),
        (r = null),
        u !== -1 && (p--, (r = t[u]) && (r.__u |= 131072)),
        r == null || r.__v === null
          ? (u == -1 && i--, typeof o.type != 'function' && (o.__u |= 65536))
          : u !== l &&
            (u === l + 1
              ? i++
              : u > l
                ? p > s - l
                  ? (i += u - l)
                  : i--
                : (i = u < l && u == l - 1 ? u - l : 0),
            u !== n + i && (o.__u |= 65536)))
      : (r = t[n]) &&
        r.key == null &&
        r.__e &&
        (r.__e == _.__d && (_.__d = P(r)), J(r, r, !1), (t[n] = null), p--);
  if (p)
    for (n = 0; n < c; n++)
      (r = t[n]) != null &&
        !(131072 & r.__u) &&
        (r.__e == _.__d && (_.__d = P(r)), J(r, r));
}
function b_(_, e, t) {
  var n, o;
  if (typeof _.type == 'function') {
    for (n = _.__k, o = 0; n && o < n.length; o++)
      n[o] && ((n[o].__ = _), (e = b_(n[o], e, t)));
    return e;
  }
  return (
    _.__e != e && (t.insertBefore(_.__e, e || null), (e = _.__e)),
    e && e.nextSibling
  );
}
function k_(_, e) {
  return (
    (e = e || []),
    _ == null ||
      typeof _ == 'boolean' ||
      (q(_)
        ? _.some(function (t) {
            k_(t, e);
          })
        : e.push(_)),
    e
  );
}
function U_(_, e, t, n) {
  var o = _.key,
    r = _.type,
    l = t - 1,
    u = t + 1,
    s = e[t];
  if (s === null || (s && o == s.key && r === s.type)) return t;
  if (n > (s != null && !(131072 & s.__u) ? 1 : 0))
    for (; l >= 0 || u < e.length; ) {
      if (l >= 0) {
        if ((s = e[l]) && !(131072 & s.__u) && o == s.key && r === s.type)
          return l;
        l--;
      }
      if (u < e.length) {
        if ((s = e[u]) && !(131072 & s.__u) && o == s.key && r === s.type)
          return u;
        u++;
      }
    }
  return -1;
}
function t_(_, e, t) {
  e[0] === '-'
    ? _.setProperty(e, t ?? '')
    : (_[e] =
        t == null ? '' : typeof t != 'number' || D_.test(e) ? t : t + 'px');
}
function W(_, e, t, n, o) {
  var r;
  _: if (e === 'style')
    if (typeof t == 'string') _.style.cssText = t;
    else {
      if ((typeof n == 'string' && (_.style.cssText = n = ''), n))
        for (e in n) (t && e in t) || t_(_.style, e, '');
      if (t) for (e in t) (n && t[e] === n[e]) || t_(_.style, e, t[e]);
    }
  else if (e[0] === 'o' && e[1] === 'n')
    (r = e !== (e = e.replace(/(PointerCapture)$|Capture$/, '$1'))),
      (e = e.toLowerCase() in _ ? e.toLowerCase().slice(2) : e.slice(2)),
      _.l || (_.l = {}),
      (_.l[e + r] = t),
      t
        ? n
          ? (t.u = n.u)
          : ((t.u = Date.now()), _.addEventListener(e, r ? o_ : n_, r))
        : _.removeEventListener(e, r ? o_ : n_, r);
  else {
    if (o) e = e.replace(/xlink(H|:h)/, 'h').replace(/sName$/, 's');
    else if (
      e !== 'width' &&
      e !== 'height' &&
      e !== 'href' &&
      e !== 'list' &&
      e !== 'form' &&
      e !== 'tabIndex' &&
      e !== 'download' &&
      e !== 'rowSpan' &&
      e !== 'colSpan' &&
      e !== 'role' &&
      e in _
    )
      try {
        _[e] = t ?? '';
        break _;
      } catch {}
    typeof t == 'function' ||
      (t == null || (t === !1 && e[4] !== '-')
        ? _.removeAttribute(e)
        : _.setAttribute(e, t));
  }
}
function n_(_) {
  var e = this.l[_.type + !1];
  if (_.t) {
    if (_.t <= e.u) return;
  } else _.t = Date.now();
  return e(a.event ? a.event(_) : _);
}
function o_(_) {
  return this.l[_.type + !0](a.event ? a.event(_) : _);
}
function Q(_, e, t, n, o, r, l, u, s, c) {
  var p,
    i,
    d,
    f,
    m,
    k,
    y,
    v,
    g,
    x,
    F,
    w,
    __,
    V,
    B,
    b = e.type;
  if (e.constructor !== void 0) return null;
  128 & t.__u && ((s = !!(32 & t.__u)), (r = [(u = e.__e = t.__e)])),
    (p = a.__b) && p(e);
  _: if (typeof b == 'function')
    try {
      if (
        ((v = e.props),
        (g = (p = b.contextType) && n[p.__c]),
        (x = p ? (g ? g.props.value : p.__) : n),
        t.__c
          ? (y = (i = e.__c = t.__c).__ = i.__E)
          : ('prototype' in b && b.prototype.render
              ? (e.__c = i = new b(v, x))
              : ((e.__c = i = new T(v, x)),
                (i.constructor = b),
                (i.render = F_)),
            g && g.sub(i),
            (i.props = v),
            i.state || (i.state = {}),
            (i.context = x),
            (i.__n = n),
            (d = i.__d = !0),
            (i.__h = []),
            (i._sb = [])),
        i.__s == null && (i.__s = i.state),
        b.getDerivedStateFromProps != null &&
          (i.__s == i.state && (i.__s = $({}, i.__s)),
          $(i.__s, b.getDerivedStateFromProps(v, i.__s))),
        (f = i.props),
        (m = i.state),
        (i.__v = e),
        d)
      )
        b.getDerivedStateFromProps == null &&
          i.componentWillMount != null &&
          i.componentWillMount(),
          i.componentDidMount != null && i.__h.push(i.componentDidMount);
      else {
        if (
          (b.getDerivedStateFromProps == null &&
            v !== f &&
            i.componentWillReceiveProps != null &&
            i.componentWillReceiveProps(v, x),
          !i.__e &&
            ((i.shouldComponentUpdate != null &&
              i.shouldComponentUpdate(v, i.__s, x) === !1) ||
              e.__v === t.__v))
        ) {
          for (
            e.__v !== t.__v && ((i.props = v), (i.state = i.__s), (i.__d = !1)),
              e.__e = t.__e,
              e.__k = t.__k,
              e.__k.forEach(function (M) {
                M && (M.__ = e);
              }),
              F = 0;
            F < i._sb.length;
            F++
          )
            i.__h.push(i._sb[F]);
          (i._sb = []), i.__h.length && l.push(i);
          break _;
        }
        i.componentWillUpdate != null && i.componentWillUpdate(v, i.__s, x),
          i.componentDidUpdate != null &&
            i.__h.push(function () {
              i.componentDidUpdate(f, m, k);
            });
      }
      if (
        ((i.context = x),
        (i.props = v),
        (i.__P = _),
        (i.__e = !1),
        (w = a.__r),
        (__ = 0),
        'prototype' in b && b.prototype.render)
      ) {
        for (
          i.state = i.__s,
            i.__d = !1,
            w && w(e),
            p = i.render(i.props, i.state, i.context),
            V = 0;
          V < i._sb.length;
          V++
        )
          i.__h.push(i._sb[V]);
        i._sb = [];
      } else
        do
          (i.__d = !1),
            w && w(e),
            (p = i.render(i.props, i.state, i.context)),
            (i.state = i.__s);
        while (i.__d && ++__ < 25);
      (i.state = i.__s),
        i.getChildContext != null && (n = $($({}, n), i.getChildContext())),
        d ||
          i.getSnapshotBeforeUpdate == null ||
          (k = i.getSnapshotBeforeUpdate(f, m)),
        g_(
          _,
          q(
            (B =
              p != null && p.type === A && p.key == null ? p.props.children : p)
          )
            ? B
            : [B],
          e,
          t,
          n,
          o,
          r,
          l,
          u,
          s,
          c
        ),
        (i.base = e.__e),
        (e.__u &= -161),
        i.__h.length && l.push(i),
        y && (i.__E = i.__ = null);
    } catch (M) {
      (e.__v = null),
        s || r != null
          ? ((e.__e = u), (e.__u |= s ? 160 : 32), (r[r.indexOf(u)] = null))
          : ((e.__e = t.__e), (e.__k = t.__k)),
        a.__e(M, e, t);
    }
  else
    r == null && e.__v === t.__v
      ? ((e.__k = t.__k), (e.__e = t.__e))
      : (e.__e = A_(t.__e, e, t, n, o, r, l, s, c));
  (p = a.diffed) && p(e);
}
function $_(_, e, t) {
  e.__d = void 0;
  for (var n = 0; n < t.length; n++) X(t[n], t[++n], t[++n]);
  a.__c && a.__c(e, _),
    _.some(function (o) {
      try {
        (_ = o.__h),
          (o.__h = []),
          _.some(function (r) {
            r.call(o);
          });
      } catch (r) {
        a.__e(r, o.__v);
      }
    });
}
function A_(_, e, t, n, o, r, l, u, s) {
  var c,
    p,
    i,
    d,
    f,
    m,
    k,
    y = t.props,
    v = e.props,
    g = e.type;
  if ((g === 'svg' && (o = !0), r != null)) {
    for (c = 0; c < r.length; c++)
      if (
        (f = r[c]) &&
        'setAttribute' in f == !!g &&
        (g ? f.localName === g : f.nodeType === 3)
      ) {
        (_ = f), (r[c] = null);
        break;
      }
  }
  if (_ == null) {
    if (g === null) return document.createTextNode(v);
    (_ = o
      ? document.createElementNS('http://www.w3.org/2000/svg', g)
      : document.createElement(g, v.is && v)),
      (r = null),
      (u = !1);
  }
  if (g === null) y === v || (u && _.data === v) || (_.data = v);
  else {
    if (((r = r && U.call(_.childNodes)), (y = t.props || N), !u && r != null))
      for (y = {}, c = 0; c < _.attributes.length; c++)
        y[(f = _.attributes[c]).name] = f.value;
    for (c in y)
      (f = y[c]),
        c == 'children' ||
          (c == 'dangerouslySetInnerHTML'
            ? (i = f)
            : c === 'key' || c in v || W(_, c, null, f, o));
    for (c in v)
      (f = v[c]),
        c == 'children'
          ? (d = f)
          : c == 'dangerouslySetInnerHTML'
            ? (p = f)
            : c == 'value'
              ? (m = f)
              : c == 'checked'
                ? (k = f)
                : c === 'key' ||
                  (u && typeof f != 'function') ||
                  y[c] === f ||
                  W(_, c, f, y[c], o);
    if (p)
      u ||
        (i && (p.__html === i.__html || p.__html === _.innerHTML)) ||
        (_.innerHTML = p.__html),
        (e.__k = []);
    else if (
      (i && (_.innerHTML = ''),
      g_(
        _,
        q(d) ? d : [d],
        e,
        t,
        n,
        o && g !== 'foreignObject',
        r,
        l,
        r ? r[0] : t.__k && P(t, 0),
        u,
        s
      ),
      r != null)
    )
      for (c = r.length; c--; ) r[c] != null && m_(r[c]);
    u ||
      ((c = 'value'),
      m !== void 0 &&
        (m !== _[c] ||
          (g === 'progress' && !m) ||
          (g === 'option' && m !== y[c])) &&
        W(_, c, m, y[c], !1),
      (c = 'checked'),
      k !== void 0 && k !== _[c] && W(_, c, k, y[c], !1));
  }
  return _;
}
function X(_, e, t) {
  try {
    typeof _ == 'function' ? _(e) : (_.current = e);
  } catch (n) {
    a.__e(n, t);
  }
}
function J(_, e, t) {
  var n, o;
  if (
    (a.unmount && a.unmount(_),
    (n = _.ref) && ((n.current && n.current !== _.__e) || X(n, null, e)),
    (n = _.__c) != null)
  ) {
    if (n.componentWillUnmount)
      try {
        n.componentWillUnmount();
      } catch (r) {
        a.__e(r, e);
      }
    (n.base = n.__P = null), (_.__c = void 0);
  }
  if ((n = _.__k))
    for (o = 0; o < n.length; o++)
      n[o] && J(n[o], e, t || typeof _.type != 'function');
  t || _.__e == null || m_(_.__e), (_.__ = _.__e = _.__d = void 0);
}
function F_(_, e, t) {
  return this.constructor(_, t);
}
function C_(_, e, t) {
  var n, o, r, l;
  a.__ && a.__(_, e),
    (o = (n = typeof t == 'function') ? null : (t && t.__k) || e.__k),
    (r = []),
    (l = []),
    Q(
      e,
      (_ = ((!n && t) || e).__k = z(A, null, [_])),
      o || N,
      N,
      e.ownerSVGElement !== void 0,
      !n && t ? [t] : o ? null : e.firstChild ? U.call(e.childNodes) : null,
      r,
      !n && t ? t : o ? o.__e : e.firstChild,
      n,
      l
    ),
    $_(r, _, l);
}
function x_(_, e) {
  C_(_, e, x_);
}
function V_(_, e, t) {
  var n,
    o,
    r,
    l,
    u = $({}, _.props);
  for (r in (_.type && _.type.defaultProps && (l = _.type.defaultProps), e))
    r == 'key'
      ? (n = e[r])
      : r == 'ref'
        ? (o = e[r])
        : (u[r] = e[r] === void 0 && l !== void 0 ? l[r] : e[r]);
  return (
    arguments.length > 2 &&
      (u.children = arguments.length > 3 ? U.call(arguments, 2) : t),
    D(_.type, u, n || _.key, o || _.ref, null)
  );
}
function M_(_, e) {
  var t = {
    __c: (e = '__cC' + d_++),
    __: _,
    Consumer: function (n, o) {
      return n.children(o);
    },
    Provider: function (n) {
      var o, r;
      return (
        this.getChildContext ||
          ((o = []),
          ((r = {})[e] = this),
          (this.getChildContext = function () {
            return r;
          }),
          (this.shouldComponentUpdate = function (l) {
            this.props.value !== l.value &&
              o.some(function (u) {
                (u.__e = !0), G(u);
              });
          }),
          (this.sub = function (l) {
            o.push(l);
            var u = l.componentWillUnmount;
            l.componentWillUnmount = function () {
              o.splice(o.indexOf(l), 1), u && u.call(l);
            };
          })),
        n.children
      );
    },
  };
  return (t.Provider.__ = t.Consumer.contextType = t);
}
(U = v_.slice),
  (a = {
    __e: function (_, e, t, n) {
      for (var o, r, l; (e = e.__); )
        if ((o = e.__c) && !o.__)
          try {
            if (
              ((r = o.constructor) &&
                r.getDerivedStateFromError != null &&
                (o.setState(r.getDerivedStateFromError(_)), (l = o.__d)),
              o.componentDidCatch != null &&
                (o.componentDidCatch(_, n || {}), (l = o.__d)),
              l)
            )
              return (o.__E = o);
          } catch (u) {
            _ = u;
          }
      throw _;
    },
  }),
  (a_ = 0),
  (p_ = function (_) {
    return _ != null && _.constructor == null;
  }),
  (T.prototype.setState = function (_, e) {
    var t;
    (t =
      this.__s != null && this.__s !== this.state
        ? this.__s
        : (this.__s = $({}, this.state))),
      typeof _ == 'function' && (_ = _($({}, t), this.props)),
      _ && $(t, _),
      _ != null && this.__v && (e && this._sb.push(e), G(this));
  }),
  (T.prototype.forceUpdate = function (_) {
    this.__v && ((this.__e = !0), _ && this.__h.push(_), G(this));
  }),
  (T.prototype.render = A),
  (H = []),
  (h_ =
    typeof Promise == 'function'
      ? Promise.prototype.then.bind(Promise.resolve())
      : setTimeout),
  (R = function (_, e) {
    return _.__v.__b - e.__v.__b;
  }),
  (j.__r = 0),
  (d_ = 0);
const J_ = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      Component: T,
      Fragment: A,
      cloneElement: V_,
      createContext: M_,
      createElement: z,
      createRef: T_,
      h: z,
      hydrate: x_,
      get isValidElement() {
        return p_;
      },
      get options() {
        return a;
      },
      render: C_,
      toChildArray: k_,
    },
    Symbol.toStringTag,
    { value: 'Module' }
  )
);
var C,
  h,
  I,
  r_,
  S = 0,
  H_ = [],
  L = [],
  i_ = a.__b,
  u_ = a.__r,
  l_ = a.diffed,
  c_ = a.__c,
  f_ = a.unmount;
function E(_, e) {
  a.__h && a.__h(h, _, S || e), (S = 0);
  var t = h.__H || (h.__H = { __: [], __h: [] });
  return _ >= t.__.length && t.__.push({ __V: L }), t.__[_];
}
function E_(_) {
  return (S = 1), P_(w_, _);
}
function P_(_, e, t) {
  var n = E(C++, 2);
  if (
    ((n.t = _),
    !n.__c &&
      ((n.__ = [
        t ? t(e) : w_(void 0, e),
        function (u) {
          var s = n.__N ? n.__N[0] : n.__[0],
            c = n.t(s, u);
          s !== c && ((n.__N = [c, n.__[1]]), n.__c.setState({}));
        },
      ]),
      (n.__c = h),
      !h.u))
  ) {
    var o = function (u, s, c) {
      if (!n.__c.__H) return !0;
      var p = n.__c.__H.__.filter(function (d) {
        return d.__c;
      });
      if (
        p.every(function (d) {
          return !d.__N;
        })
      )
        return !r || r.call(this, u, s, c);
      var i = !1;
      return (
        p.forEach(function (d) {
          if (d.__N) {
            var f = d.__[0];
            (d.__ = d.__N), (d.__N = void 0), f !== d.__[0] && (i = !0);
          }
        }),
        !(!i && n.__c.props === u) && (!r || r.call(this, u, s, c))
      );
    };
    h.u = !0;
    var r = h.shouldComponentUpdate,
      l = h.componentWillUpdate;
    (h.componentWillUpdate = function (u, s, c) {
      if (this.__e) {
        var p = r;
        (r = void 0), o(u, s, c), (r = p);
      }
      l && l.call(this, u, s, c);
    }),
      (h.shouldComponentUpdate = o);
  }
  return n.__N || n.__;
}
function W_(_, e) {
  var t = E(C++, 3);
  !a.__s && Z(t.__H, e) && ((t.__ = _), (t.i = e), h.__H.__h.push(t));
}
function S_(_, e) {
  var t = E(C++, 4);
  !a.__s && Z(t.__H, e) && ((t.__ = _), (t.i = e), h.__h.push(t));
}
function L_(_) {
  return (
    (S = 5),
    Y(function () {
      return { current: _ };
    }, [])
  );
}
function O_(_, e, t) {
  (S = 6),
    S_(
      function () {
        return typeof _ == 'function'
          ? (_(e()),
            function () {
              return _(null);
            })
          : _
            ? ((_.current = e()),
              function () {
                return (_.current = null);
              })
            : void 0;
      },
      t == null ? t : t.concat(_)
    );
}
function Y(_, e) {
  var t = E(C++, 7);
  return Z(t.__H, e) ? ((t.__V = _()), (t.i = e), (t.__h = _), t.__V) : t.__;
}
function j_(_, e) {
  return (
    (S = 8),
    Y(function () {
      return _;
    }, e)
  );
}
function q_(_) {
  var e = h.context[_.__c],
    t = E(C++, 9);
  return (
    (t.c = _),
    e ? (t.__ == null && ((t.__ = !0), e.sub(h)), e.props.value) : _.__
  );
}
function B_(_, e) {
  a.useDebugValue && a.useDebugValue(e ? e(_) : _);
}
function I_(_) {
  var e = E(C++, 10),
    t = E_();
  return (
    (e.__ = _),
    h.componentDidCatch ||
      (h.componentDidCatch = function (n, o) {
        e.__ && e.__(n, o), t[1](n);
      }),
    [
      t[0],
      function () {
        t[1](void 0);
      },
    ]
  );
}
function R_() {
  var _ = E(C++, 11);
  if (!_.__) {
    for (var e = h.__v; e !== null && !e.__m && e.__ !== null; ) e = e.__;
    var t = e.__m || (e.__m = [0, 0]);
    _.__ = 'P' + t[0] + '-' + t[1]++;
  }
  return _.__;
}
function z_() {
  for (var _; (_ = H_.shift()); )
    if (_.__P && _.__H)
      try {
        _.__H.__h.forEach(O), _.__H.__h.forEach(K), (_.__H.__h = []);
      } catch (e) {
        (_.__H.__h = []), a.__e(e, _.__v);
      }
}
(a.__b = function (_) {
  (h = null), i_ && i_(_);
}),
  (a.__r = function (_) {
    u_ && u_(_), (C = 0);
    var e = (h = _.__c).__H;
    e &&
      (I === h
        ? ((e.__h = []),
          (h.__h = []),
          e.__.forEach(function (t) {
            t.__N && (t.__ = t.__N), (t.__V = L), (t.__N = t.i = void 0);
          }))
        : (e.__h.forEach(O), e.__h.forEach(K), (e.__h = []), (C = 0))),
      (I = h);
  }),
  (a.diffed = function (_) {
    l_ && l_(_);
    var e = _.__c;
    e &&
      e.__H &&
      (e.__H.__h.length &&
        ((H_.push(e) !== 1 && r_ === a.requestAnimationFrame) ||
          ((r_ = a.requestAnimationFrame) || G_)(z_)),
      e.__H.__.forEach(function (t) {
        t.i && (t.__H = t.i),
          t.__V !== L && (t.__ = t.__V),
          (t.i = void 0),
          (t.__V = L);
      })),
      (I = h = null);
  }),
  (a.__c = function (_, e) {
    e.some(function (t) {
      try {
        t.__h.forEach(O),
          (t.__h = t.__h.filter(function (n) {
            return !n.__ || K(n);
          }));
      } catch (n) {
        e.some(function (o) {
          o.__h && (o.__h = []);
        }),
          (e = []),
          a.__e(n, t.__v);
      }
    }),
      c_ && c_(_, e);
  }),
  (a.unmount = function (_) {
    f_ && f_(_);
    var e,
      t = _.__c;
    t &&
      t.__H &&
      (t.__H.__.forEach(function (n) {
        try {
          O(n);
        } catch (o) {
          e = o;
        }
      }),
      (t.__H = void 0),
      e && a.__e(e, t.__v));
  });
var s_ = typeof requestAnimationFrame == 'function';
function G_(_) {
  var e,
    t = function () {
      clearTimeout(n), s_ && cancelAnimationFrame(e), setTimeout(_);
    },
    n = setTimeout(t, 100);
  s_ && (e = requestAnimationFrame(t));
}
function O(_) {
  var e = h,
    t = _.__c;
  typeof t == 'function' && ((_.__c = void 0), t()), (h = e);
}
function K(_) {
  var e = h;
  (_.__c = _.__()), (h = e);
}
function Z(_, e) {
  return (
    !_ ||
    _.length !== e.length ||
    e.some(function (t, n) {
      return t !== _[n];
    })
  );
}
function w_(_, e) {
  return typeof e == 'function' ? e(_) : e;
}
const K_ = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      useCallback: j_,
      useContext: q_,
      useDebugValue: B_,
      useEffect: W_,
      useErrorBoundary: I_,
      useId: R_,
      useImperativeHandle: O_,
      useLayoutEffect: S_,
      useMemo: Y,
      useReducer: P_,
      useRef: L_,
      useState: E_,
    },
    Symbol.toStringTag,
    { value: 'Module' }
  )
);
export {
  k_ as $,
  O_ as A,
  x_ as B,
  V_ as E,
  Y as F,
  I_ as P,
  j_ as T,
  R_ as V,
  L_ as _,
  S_ as a,
  T as b,
  E_ as c,
  W_ as d,
  q_ as e,
  M_ as f,
  A as g,
  K_ as h,
  T_ as i,
  a as l,
  J_ as p,
  C_ as q,
  P_ as s,
  B_ as x,
  z as y,
};
