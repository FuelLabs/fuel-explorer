import { _ as yt } from './iframe-d50da200.js';
import { r as b, a as Ko, R as a } from './index-76fb7be0.js';
import { r as Bu, u as Iu } from './react-18-988a5df2.js';
import {
  g as _i,
  m as tr,
  h as za,
  i as Ht,
  j as Vt,
  l as Nu,
  t as ca,
  n as Zu,
  o as W,
  q as Xo,
  r as Hu,
  u as pr,
  k as qa,
  e as ju,
  _ as un,
  v as Di,
  b as Pu,
  a as Vu,
  c as zu,
  d as qu,
  w as Uu,
  s as Wu,
} from './_basePickBy-2c05180b.js';
import { r as Fi, R as Gu } from './index-d3ea75b5.js';
import { L as Mi, O as Yu } from './index-b75c9059.js';
import { _ as dn } from './extends-98964cd2.js';
import { g as Ua, c as $n } from './_commonjsHelpers-de833af9.js';
import {
  E as Ku,
  a as Xu,
  G as $i,
  H as Ju,
  I as Qu,
  J as e0,
  B as t0,
  K as r0,
  L as Bi,
  M as n0,
  N as a0,
  O as Ii,
  D as o0,
  P as Wa,
  i as Ni,
  Q as Zi,
  R as Hi,
  v as l0,
  s as i0,
  c as s0,
  S as c0,
  r as u0,
} from './_getPrototype-aecc109d.js';
import { d as Ee } from './index-356e4a49.js';
import { S as Jo, s as ua, b as Bn } from './index-c457595d.js';
function d0(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function gr(e, t) {
  return (
    (gr = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (n, o) {
          return (n.__proto__ = o), n;
        }),
    gr(e, t)
  );
}
function da(e) {
  return (
    (da = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }),
    da(e)
  );
}
function ji() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
  } catch {}
  return (ji = function () {
    return !!e;
  })();
}
var p0 = function (t) {
    return t();
  },
  Pi = Ko['useInsertionEffect'] ? Ko['useInsertionEffect'] : !1,
  Ga = Pi || p0,
  Qo = Pi || b.useLayoutEffect;
const { logger: f0 } = __STORYBOOK_MODULE_CLIENT_LOGGER__;
var m0 = za({
    '../../node_modules/react-is/cjs/react-is.development.js'(e) {
      (function () {
        var t = typeof Symbol == 'function' && Symbol.for,
          r = t ? Symbol.for('react.element') : 60103,
          n = t ? Symbol.for('react.portal') : 60106,
          o = t ? Symbol.for('react.fragment') : 60107,
          l = t ? Symbol.for('react.strict_mode') : 60108,
          i = t ? Symbol.for('react.profiler') : 60114,
          s = t ? Symbol.for('react.provider') : 60109,
          c = t ? Symbol.for('react.context') : 60110,
          u = t ? Symbol.for('react.async_mode') : 60111,
          d = t ? Symbol.for('react.concurrent_mode') : 60111,
          h = t ? Symbol.for('react.forward_ref') : 60112,
          m = t ? Symbol.for('react.suspense') : 60113,
          p = t ? Symbol.for('react.suspense_list') : 60120,
          g = t ? Symbol.for('react.memo') : 60115,
          f = t ? Symbol.for('react.lazy') : 60116,
          A = t ? Symbol.for('react.block') : 60121,
          w = t ? Symbol.for('react.fundamental') : 60117,
          v = t ? Symbol.for('react.responder') : 60118,
          y = t ? Symbol.for('react.scope') : 60119;
        function x(F) {
          return (
            typeof F == 'string' ||
            typeof F == 'function' ||
            F === o ||
            F === d ||
            F === i ||
            F === l ||
            F === m ||
            F === p ||
            (typeof F == 'object' &&
              F !== null &&
              (F.$$typeof === f ||
                F.$$typeof === g ||
                F.$$typeof === s ||
                F.$$typeof === c ||
                F.$$typeof === h ||
                F.$$typeof === w ||
                F.$$typeof === v ||
                F.$$typeof === y ||
                F.$$typeof === A))
          );
        }
        function E(F) {
          if (typeof F == 'object' && F !== null) {
            var Be = F.$$typeof;
            switch (Be) {
              case r:
                var je = F.type;
                switch (je) {
                  case u:
                  case d:
                  case o:
                  case i:
                  case l:
                  case m:
                    return je;
                  default:
                    var xt = je && je.$$typeof;
                    switch (xt) {
                      case c:
                      case h:
                      case f:
                      case g:
                      case s:
                        return xt;
                      default:
                        return Be;
                    }
                }
              case n:
                return Be;
            }
          }
        }
        var C = u,
          S = d,
          k = c,
          R = s,
          O = r,
          L = h,
          _ = o,
          D = f,
          H = g,
          M = n,
          I = i,
          j = l,
          z = m,
          N = !1;
        function Z(F) {
          return (
            N ||
              ((N = !0),
              console.warn(
                'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.'
              )),
            K(F) || E(F) === u
          );
        }
        function K(F) {
          return E(F) === d;
        }
        function se(F) {
          return E(F) === c;
        }
        function X(F) {
          return E(F) === s;
        }
        function de(F) {
          return typeof F == 'object' && F !== null && F.$$typeof === r;
        }
        function $(F) {
          return E(F) === h;
        }
        function q(F) {
          return E(F) === o;
        }
        function U(F) {
          return E(F) === f;
        }
        function oe(F) {
          return E(F) === g;
        }
        function he(F) {
          return E(F) === n;
        }
        function nt(F) {
          return E(F) === i;
        }
        function Oe(F) {
          return E(F) === l;
        }
        function He(F) {
          return E(F) === m;
        }
        (e.AsyncMode = C),
          (e.ConcurrentMode = S),
          (e.ContextConsumer = k),
          (e.ContextProvider = R),
          (e.Element = O),
          (e.ForwardRef = L),
          (e.Fragment = _),
          (e.Lazy = D),
          (e.Memo = H),
          (e.Portal = M),
          (e.Profiler = I),
          (e.StrictMode = j),
          (e.Suspense = z),
          (e.isAsyncMode = Z),
          (e.isConcurrentMode = K),
          (e.isContextConsumer = se),
          (e.isContextProvider = X),
          (e.isElement = de),
          (e.isForwardRef = $),
          (e.isFragment = q),
          (e.isLazy = U),
          (e.isMemo = oe),
          (e.isPortal = he),
          (e.isProfiler = nt),
          (e.isStrictMode = Oe),
          (e.isSuspense = He),
          (e.isValidElementType = x),
          (e.typeOf = E);
      })();
    },
  }),
  g0 = za({
    '../../node_modules/react-is/index.js'(e, t) {
      t.exports = m0();
    },
  }),
  Vi = za({
    '../../node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js'(
      e,
      t
    ) {
      var r = g0(),
        n = {
          childContextTypes: !0,
          contextType: !0,
          contextTypes: !0,
          defaultProps: !0,
          displayName: !0,
          getDefaultProps: !0,
          getDerivedStateFromError: !0,
          getDerivedStateFromProps: !0,
          mixins: !0,
          propTypes: !0,
          type: !0,
        },
        o = {
          name: !0,
          length: !0,
          prototype: !0,
          caller: !0,
          callee: !0,
          arguments: !0,
          arity: !0,
        },
        l = {
          $$typeof: !0,
          render: !0,
          defaultProps: !0,
          displayName: !0,
          propTypes: !0,
        },
        i = {
          $$typeof: !0,
          compare: !0,
          defaultProps: !0,
          displayName: !0,
          propTypes: !0,
          type: !0,
        },
        s = {};
      (s[r.ForwardRef] = l), (s[r.Memo] = i);
      function c(A) {
        return r.isMemo(A) ? i : s[A.$$typeof] || n;
      }
      var u = Object.defineProperty,
        d = Object.getOwnPropertyNames,
        h = Object.getOwnPropertySymbols,
        m = Object.getOwnPropertyDescriptor,
        p = Object.getPrototypeOf,
        g = Object.prototype;
      function f(A, w, v) {
        if (typeof w != 'string') {
          if (g) {
            var y = p(w);
            y && y !== g && f(A, y, v);
          }
          var x = d(w);
          h && (x = x.concat(h(w)));
          for (var E = c(A), C = c(w), S = 0; S < x.length; ++S) {
            var k = x[S];
            if (!o[k] && !(v && v[k]) && !(C && C[k]) && !(E && E[k])) {
              var R = m(w, k);
              try {
                u(A, k, R);
              } catch {}
            }
          }
        }
        return A;
      }
      t.exports = f;
    },
  });
function pa() {
  return (
    (pa = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    pa.apply(this, arguments)
  );
}
function zi(e) {
  var t = Object.create(null);
  return function (r) {
    return t[r] === void 0 && (t[r] = e(r)), t[r];
  };
}
var h0 =
    /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
  Ya = zi(function (e) {
    return (
      h0.test(e) ||
      (e.charCodeAt(0) === 111 &&
        e.charCodeAt(1) === 110 &&
        e.charCodeAt(2) < 91)
    );
  });
function b0(e) {
  if (e.sheet) return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function y0(e) {
  var t = document.createElement('style');
  return (
    t.setAttribute('data-emotion', e.key),
    e.nonce !== void 0 && t.setAttribute('nonce', e.nonce),
    t.appendChild(document.createTextNode('')),
    t.setAttribute('data-s', ''),
    t
  );
}
var v0 = (function () {
    function e(r) {
      var n = this;
      (this._insertTag = function (o) {
        var l;
        n.tags.length === 0
          ? n.insertionPoint
            ? (l = n.insertionPoint.nextSibling)
            : n.prepend
              ? (l = n.container.firstChild)
              : (l = n.before)
          : (l = n.tags[n.tags.length - 1].nextSibling),
          n.container.insertBefore(o, l),
          n.tags.push(o);
      }),
        (this.isSpeedy = r.speedy === void 0 ? !1 : r.speedy),
        (this.tags = []),
        (this.ctr = 0),
        (this.nonce = r.nonce),
        (this.key = r.key),
        (this.container = r.container),
        (this.prepend = r.prepend),
        (this.insertionPoint = r.insertionPoint),
        (this.before = null);
    }
    var t = e.prototype;
    return (
      (t.hydrate = function (r) {
        r.forEach(this._insertTag);
      }),
      (t.insert = function (r) {
        this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 &&
          this._insertTag(y0(this));
        var n = this.tags[this.tags.length - 1],
          o = r.charCodeAt(0) === 64 && r.charCodeAt(1) === 105;
        if (
          (o &&
            this._alreadyInsertedOrderInsensitiveRule &&
            console.error(
              `You're attempting to insert the following rule:
` +
                r +
                '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.'
            ),
          (this._alreadyInsertedOrderInsensitiveRule =
            this._alreadyInsertedOrderInsensitiveRule || !o),
          this.isSpeedy)
        ) {
          var l = b0(n);
          try {
            l.insertRule(r, l.cssRules.length);
          } catch (i) {
            /:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(
              r
            ) ||
              console.error(
                'There was a problem inserting the following rule: "' + r + '"',
                i
              );
          }
        } else n.appendChild(document.createTextNode(r));
        this.ctr++;
      }),
      (t.flush = function () {
        this.tags.forEach(function (r) {
          return r.parentNode && r.parentNode.removeChild(r);
        }),
          (this.tags = []),
          (this.ctr = 0),
          (this._alreadyInsertedOrderInsensitiveRule = !1);
      }),
      e
    );
  })(),
  ge = '-ms-',
  rn = '-moz-',
  P = '-webkit-',
  Ka = 'comm',
  Xa = 'rule',
  Ja = 'decl',
  E0 = '@import',
  qi = '@keyframes',
  x0 = '@layer',
  A0 = Math.abs,
  pn = String.fromCharCode,
  w0 = Object.assign;
function C0(e, t) {
  return ce(e, 0) ^ 45
    ? (((((((t << 2) ^ ce(e, 0)) << 2) ^ ce(e, 1)) << 2) ^ ce(e, 2)) << 2) ^
        ce(e, 3)
    : 0;
}
function Ui(e) {
  return e.trim();
}
function S0(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function V(e, t, r) {
  return e.replace(t, r);
}
function fa(e, t) {
  return e.indexOf(t);
}
function ce(e, t) {
  return e.charCodeAt(t) | 0;
}
function hr(e, t, r) {
  return e.slice(t, r);
}
function Ye(e) {
  return e.length;
}
function Qa(e) {
  return e.length;
}
function Nr(e, t) {
  return t.push(e), e;
}
function k0(e, t) {
  return e.map(t).join('');
}
var fn = 1,
  Wt = 1,
  Wi = 0,
  we = 0,
  te = 0,
  rr = '';
function mn(e, t, r, n, o, l, i) {
  return {
    value: e,
    root: t,
    parent: r,
    type: n,
    props: o,
    children: l,
    line: fn,
    column: Wt,
    length: i,
    return: '',
  };
}
function sr(e, t) {
  return w0(mn('', null, null, '', null, null, 0), e, { length: -e.length }, t);
}
function T0() {
  return te;
}
function R0() {
  return (
    (te = we > 0 ? ce(rr, --we) : 0), Wt--, te === 10 && ((Wt = 1), fn--), te
  );
}
function Ce() {
  return (
    (te = we < Wi ? ce(rr, we++) : 0), Wt++, te === 10 && ((Wt = 1), fn++), te
  );
}
function et() {
  return ce(rr, we);
}
function Ur() {
  return we;
}
function Tr(e, t) {
  return hr(rr, e, t);
}
function br(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function Gi(e) {
  return (fn = Wt = 1), (Wi = Ye((rr = e))), (we = 0), [];
}
function Yi(e) {
  return (rr = ''), e;
}
function Wr(e) {
  return Ui(Tr(we - 1, ma(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function O0(e) {
  for (; (te = et()) && te < 33; ) Ce();
  return br(e) > 2 || br(te) > 3 ? '' : ' ';
}
function L0(e, t) {
  for (
    ;
    --t &&
    Ce() &&
    !(te < 48 || te > 102 || (te > 57 && te < 65) || (te > 70 && te < 97));

  );
  return Tr(e, Ur() + (t < 6 && et() == 32 && Ce() == 32));
}
function ma(e) {
  for (; Ce(); )
    switch (te) {
      case e:
        return we;
      case 34:
      case 39:
        e !== 34 && e !== 39 && ma(te);
        break;
      case 40:
        e === 41 && ma(e);
        break;
      case 92:
        Ce();
        break;
    }
  return we;
}
function _0(e, t) {
  for (; Ce() && e + te !== 47 + 10 && !(e + te === 42 + 42 && et() === 47); );
  return '/*' + Tr(t, we - 1) + '*' + pn(e === 47 ? e : Ce());
}
function D0(e) {
  for (; !br(et()); ) Ce();
  return Tr(e, we);
}
function F0(e) {
  return Yi(Gr('', null, null, null, [''], (e = Gi(e)), 0, [0], e));
}
function Gr(e, t, r, n, o, l, i, s, c) {
  for (
    var u = 0,
      d = 0,
      h = i,
      m = 0,
      p = 0,
      g = 0,
      f = 1,
      A = 1,
      w = 1,
      v = 0,
      y = '',
      x = o,
      E = l,
      C = n,
      S = y;
    A;

  )
    switch (((g = v), (v = Ce()))) {
      case 40:
        if (g != 108 && ce(S, h - 1) == 58) {
          fa((S += V(Wr(v), '&', '&\f')), '&\f') != -1 && (w = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        S += Wr(v);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        S += O0(g);
        break;
      case 92:
        S += L0(Ur() - 1, 7);
        continue;
      case 47:
        switch (et()) {
          case 42:
          case 47:
            Nr(M0(_0(Ce(), Ur()), t, r), c);
            break;
          default:
            S += '/';
        }
        break;
      case 123 * f:
        s[u++] = Ye(S) * w;
      case 125 * f:
      case 59:
      case 0:
        switch (v) {
          case 0:
          case 125:
            A = 0;
          case 59 + d:
            w == -1 && (S = V(S, /\f/g, '')),
              p > 0 &&
                Ye(S) - h &&
                Nr(
                  p > 32
                    ? tl(S + ';', n, r, h - 1)
                    : tl(V(S, ' ', '') + ';', n, r, h - 2),
                  c
                );
            break;
          case 59:
            S += ';';
          default:
            if (
              (Nr((C = el(S, t, r, u, d, o, s, y, (x = []), (E = []), h)), l),
              v === 123)
            )
              if (d === 0) Gr(S, t, C, C, x, l, h, s, E);
              else
                switch (m === 99 && ce(S, 3) === 110 ? 100 : m) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Gr(
                      e,
                      C,
                      C,
                      n && Nr(el(e, C, C, 0, 0, o, s, y, o, (x = []), h), E),
                      o,
                      E,
                      h,
                      s,
                      n ? x : E
                    );
                    break;
                  default:
                    Gr(S, C, C, C, [''], E, 0, s, E);
                }
        }
        (u = d = p = 0), (f = w = 1), (y = S = ''), (h = i);
        break;
      case 58:
        (h = 1 + Ye(S)), (p = g);
      default:
        if (f < 1) {
          if (v == 123) --f;
          else if (v == 125 && f++ == 0 && R0() == 125) continue;
        }
        switch (((S += pn(v)), v * f)) {
          case 38:
            w = d > 0 ? 1 : ((S += '\f'), -1);
            break;
          case 44:
            (s[u++] = (Ye(S) - 1) * w), (w = 1);
            break;
          case 64:
            et() === 45 && (S += Wr(Ce())),
              (m = et()),
              (d = h = Ye((y = S += D0(Ur())))),
              v++;
            break;
          case 45:
            g === 45 && Ye(S) == 2 && (f = 0);
        }
    }
  return l;
}
function el(e, t, r, n, o, l, i, s, c, u, d) {
  for (
    var h = o - 1, m = o === 0 ? l : [''], p = Qa(m), g = 0, f = 0, A = 0;
    g < n;
    ++g
  )
    for (var w = 0, v = hr(e, h + 1, (h = A0((f = i[g])))), y = e; w < p; ++w)
      (y = Ui(f > 0 ? m[w] + ' ' + v : V(v, /&\f/g, m[w]))) && (c[A++] = y);
  return mn(e, t, r, o === 0 ? Xa : s, c, u, d);
}
function M0(e, t, r) {
  return mn(e, t, r, Ka, pn(T0()), hr(e, 2, -2), 0);
}
function tl(e, t, r, n) {
  return mn(e, t, r, Ja, hr(e, 0, n), hr(e, n + 1, -1), n);
}
function Ut(e, t) {
  for (var r = '', n = Qa(e), o = 0; o < n; o++) r += t(e[o], o, e, t) || '';
  return r;
}
function $0(e, t, r, n) {
  switch (e.type) {
    case x0:
      if (e.children.length) break;
    case E0:
    case Ja:
      return (e.return = e.return || e.value);
    case Ka:
      return '';
    case qi:
      return (e.return = e.value + '{' + Ut(e.children, n) + '}');
    case Xa:
      e.value = e.props.join(',');
  }
  return Ye((r = Ut(e.children, n)))
    ? (e.return = e.value + '{' + r + '}')
    : '';
}
function B0(e) {
  var t = Qa(e);
  return function (r, n, o, l) {
    for (var i = '', s = 0; s < t; s++) i += e[s](r, n, o, l) || '';
    return i;
  };
}
var rl = function (e) {
    var t = new WeakMap();
    return function (r) {
      if (t.has(r)) return t.get(r);
      var n = e(r);
      return t.set(r, n), n;
    };
  },
  I0 = function (e, t, r) {
    for (
      var n = 0, o = 0;
      (n = o), (o = et()), n === 38 && o === 12 && (t[r] = 1), !br(o);

    )
      Ce();
    return Tr(e, we);
  },
  N0 = function (e, t) {
    var r = -1,
      n = 44;
    do
      switch (br(n)) {
        case 0:
          n === 38 && et() === 12 && (t[r] = 1), (e[r] += I0(we - 1, t, r));
          break;
        case 2:
          e[r] += Wr(n);
          break;
        case 4:
          if (n === 44) {
            (e[++r] = et() === 58 ? '&\f' : ''), (t[r] = e[r].length);
            break;
          }
        default:
          e[r] += pn(n);
      }
    while ((n = Ce()));
    return e;
  },
  Z0 = function (e, t) {
    return Yi(N0(Gi(e), t));
  },
  nl = new WeakMap(),
  H0 = function (e) {
    if (!(e.type !== 'rule' || !e.parent || e.length < 1)) {
      for (
        var t = e.value,
          r = e.parent,
          n = e.column === r.column && e.line === r.line;
        r.type !== 'rule';

      )
        if (((r = r.parent), !r)) return;
      if (
        !(e.props.length === 1 && t.charCodeAt(0) !== 58 && !nl.get(r)) &&
        !n
      ) {
        nl.set(e, !0);
        for (
          var o = [], l = Z0(t, o), i = r.props, s = 0, c = 0;
          s < l.length;
          s++
        )
          for (var u = 0; u < i.length; u++, c++)
            e.props[c] = o[s] ? l[s].replace(/&\f/g, i[u]) : i[u] + ' ' + l[s];
      }
    }
  },
  j0 = function (e) {
    if (e.type === 'decl') {
      var t = e.value;
      t.charCodeAt(0) === 108 &&
        t.charCodeAt(2) === 98 &&
        ((e.return = ''), (e.value = ''));
    }
  },
  P0 =
    'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason',
  V0 = function (e) {
    return e.type === 'comm' && e.children.indexOf(P0) > -1;
  },
  z0 = function (e) {
    return function (t, r, n) {
      if (!(t.type !== 'rule' || e.compat)) {
        var o = t.value.match(/(:first|:nth|:nth-last)-child/g);
        if (o) {
          for (
            var l = !!t.parent, i = l ? t.parent.children : n, s = i.length - 1;
            s >= 0;
            s--
          ) {
            var c = i[s];
            if (c.line < t.line) break;
            if (c.column < t.column) {
              if (V0(c)) return;
              break;
            }
          }
          o.forEach(function (u) {
            console.error(
              'The pseudo class "' +
                u +
                '" is potentially unsafe when doing server-side rendering. Try changing it to "' +
                u.split('-child')[0] +
                '-of-type".'
            );
          });
        }
      }
    };
  },
  Ki = function (e) {
    return e.type.charCodeAt(1) === 105 && e.type.charCodeAt(0) === 64;
  },
  q0 = function (e, t) {
    for (var r = e - 1; r >= 0; r--) if (!Ki(t[r])) return !0;
    return !1;
  },
  al = function (e) {
    (e.type = ''),
      (e.value = ''),
      (e.return = ''),
      (e.children = ''),
      (e.props = '');
  },
  U0 = function (e, t, r) {
    Ki(e) &&
      (e.parent
        ? (console.error(
            "`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."
          ),
          al(e))
        : q0(t, r) &&
          (console.error(
            "`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."
          ),
          al(e)));
  };
function Xi(e, t) {
  switch (C0(e, t)) {
    case 5103:
      return P + 'print-' + e + e;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return P + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return P + e + rn + e + ge + e + e;
    case 6828:
    case 4268:
      return P + e + ge + e + e;
    case 6165:
      return P + e + ge + 'flex-' + e + e;
    case 5187:
      return (
        P + e + V(e, /(\w+).+(:[^]+)/, P + 'box-$1$2' + ge + 'flex-$1$2') + e
      );
    case 5443:
      return P + e + ge + 'flex-item-' + V(e, /flex-|-self/, '') + e;
    case 4675:
      return (
        P +
        e +
        ge +
        'flex-line-pack' +
        V(e, /align-content|flex-|-self/, '') +
        e
      );
    case 5548:
      return P + e + ge + V(e, 'shrink', 'negative') + e;
    case 5292:
      return P + e + ge + V(e, 'basis', 'preferred-size') + e;
    case 6060:
      return (
        P +
        'box-' +
        V(e, '-grow', '') +
        P +
        e +
        ge +
        V(e, 'grow', 'positive') +
        e
      );
    case 4554:
      return P + V(e, /([^-])(transform)/g, '$1' + P + '$2') + e;
    case 6187:
      return (
        V(V(V(e, /(zoom-|grab)/, P + '$1'), /(image-set)/, P + '$1'), e, '') + e
      );
    case 5495:
    case 3959:
      return V(e, /(image-set\([^]*)/, P + '$1$`$1');
    case 4968:
      return (
        V(
          V(e, /(.+:)(flex-)?(.*)/, P + 'box-pack:$3' + ge + 'flex-pack:$3'),
          /s.+-b[^;]+/,
          'justify'
        ) +
        P +
        e +
        e
      );
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return V(e, /(.+)-inline(.+)/, P + '$1$2') + e;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (Ye(e) - 1 - t > 6)
        switch (ce(e, t + 1)) {
          case 109:
            if (ce(e, t + 4) !== 45) break;
          case 102:
            return (
              V(
                e,
                /(.+:)(.+)-([^]+)/,
                '$1' +
                  P +
                  '$2-$3$1' +
                  rn +
                  (ce(e, t + 3) == 108 ? '$3' : '$2-$3')
              ) + e
            );
          case 115:
            return ~fa(e, 'stretch')
              ? Xi(V(e, 'stretch', 'fill-available'), t) + e
              : e;
        }
      break;
    case 4949:
      if (ce(e, t + 1) !== 115) break;
    case 6444:
      switch (ce(e, Ye(e) - 3 - (~fa(e, '!important') && 10))) {
        case 107:
          return V(e, ':', ':' + P) + e;
        case 101:
          return (
            V(
              e,
              /(.+:)([^;!]+)(;|!.+)?/,
              '$1' +
                P +
                (ce(e, 14) === 45 ? 'inline-' : '') +
                'box$3$1' +
                P +
                '$2$3$1' +
                ge +
                '$2box$3'
            ) + e
          );
      }
      break;
    case 5936:
      switch (ce(e, t + 11)) {
        case 114:
          return P + e + ge + V(e, /[svh]\w+-[tblr]{2}/, 'tb') + e;
        case 108:
          return P + e + ge + V(e, /[svh]\w+-[tblr]{2}/, 'tb-rl') + e;
        case 45:
          return P + e + ge + V(e, /[svh]\w+-[tblr]{2}/, 'lr') + e;
      }
      return P + e + ge + e + e;
  }
  return e;
}
var W0 = function (e, t, r, n) {
    if (e.length > -1 && !e.return)
      switch (e.type) {
        case Ja:
          e.return = Xi(e.value, e.length);
          break;
        case qi:
          return Ut([sr(e, { value: V(e.value, '@', '@' + P) })], n);
        case Xa:
          if (e.length)
            return k0(e.props, function (o) {
              switch (S0(o, /(::plac\w+|:read-\w+)/)) {
                case ':read-only':
                case ':read-write':
                  return Ut(
                    [sr(e, { props: [V(o, /:(read-\w+)/, ':' + rn + '$1')] })],
                    n
                  );
                case '::placeholder':
                  return Ut(
                    [
                      sr(e, {
                        props: [V(o, /:(plac\w+)/, ':' + P + 'input-$1')],
                      }),
                      sr(e, { props: [V(o, /:(plac\w+)/, ':' + rn + '$1')] }),
                      sr(e, { props: [V(o, /:(plac\w+)/, ge + 'input-$1')] }),
                    ],
                    n
                  );
              }
              return '';
            });
      }
  },
  G0 = [W0],
  Y0 = function (e) {
    var t = e.key;
    if (!t)
      throw new Error(`You have to configure \`key\` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.
If multiple caches share the same key they might "fight" for each other's style elements.`);
    if (t === 'css') {
      var r = document.querySelectorAll('style[data-emotion]:not([data-s])');
      Array.prototype.forEach.call(r, function (g) {
        var f = g.getAttribute('data-emotion');
        f.indexOf(' ') !== -1 &&
          (document.head.appendChild(g), g.setAttribute('data-s', ''));
      });
    }
    var n = e.stylisPlugins || G0;
    if (/[^a-z-]/.test(t))
      throw new Error(
        'Emotion key must only contain lower case alphabetical characters and - but "' +
          t +
          '" was passed'
      );
    var o = {},
      l,
      i = [];
    (l = e.container || document.head),
      Array.prototype.forEach.call(
        document.querySelectorAll('style[data-emotion^="' + t + ' "]'),
        function (g) {
          for (
            var f = g.getAttribute('data-emotion').split(' '), A = 1;
            A < f.length;
            A++
          )
            o[f[A]] = !0;
          i.push(g);
        }
      );
    var s,
      c = [H0, j0];
    c.push(
      z0({
        get compat() {
          return p.compat;
        },
      }),
      U0
    );
    {
      var u,
        d = [
          $0,
          function (g) {
            g.root ||
              (g.return
                ? u.insert(g.return)
                : g.value && g.type !== Ka && u.insert(g.value + '{}'));
          },
        ],
        h = B0(c.concat(n, d)),
        m = function (g) {
          return Ut(F0(g), h);
        };
      s = function (g, f, A, w) {
        (u = A),
          f.map !== void 0 &&
            (u = {
              insert: function (v) {
                A.insert(v + f.map);
              },
            }),
          m(g ? g + '{' + f.styles + '}' : f.styles),
          w && (p.inserted[f.name] = !0);
      };
    }
    var p = {
      key: t,
      sheet: new v0({
        key: t,
        container: l,
        nonce: e.nonce,
        speedy: e.speedy,
        prepend: e.prepend,
        insertionPoint: e.insertionPoint,
      }),
      nonce: e.nonce,
      inserted: o,
      registered: {},
      insert: s,
    };
    return p.sheet.hydrate(i), p;
  };
function ga() {
  return (
    (ga = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    ga.apply(this, arguments)
  );
}
_i(Vi());
var K0 = !0;
function eo(e, t, r) {
  var n = '';
  return (
    r.split(' ').forEach(function (o) {
      e[o] !== void 0 ? t.push(e[o] + ';') : (n += o + ' ');
    }),
    n
  );
}
var gn = function (e, t, r) {
    var n = e.key + '-' + t.name;
    (r === !1 || K0 === !1) &&
      e.registered[n] === void 0 &&
      (e.registered[n] = t.styles);
  },
  hn = function (e, t, r) {
    gn(e, t, r);
    var n = e.key + '-' + t.name;
    if (e.inserted[t.name] === void 0) {
      var o = t;
      do e.insert(t === o ? '.' + n : '', o, e.sheet, !0), (o = o.next);
      while (o !== void 0);
    }
  };
function X0(e) {
  for (var t = 0, r, n = 0, o = e.length; o >= 4; ++n, o -= 4)
    (r =
      (e.charCodeAt(n) & 255) |
      ((e.charCodeAt(++n) & 255) << 8) |
      ((e.charCodeAt(++n) & 255) << 16) |
      ((e.charCodeAt(++n) & 255) << 24)),
      (r = (r & 65535) * 1540483477 + (((r >>> 16) * 59797) << 16)),
      (r ^= r >>> 24),
      (t =
        ((r & 65535) * 1540483477 + (((r >>> 16) * 59797) << 16)) ^
        ((t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)));
  switch (o) {
    case 3:
      t ^= (e.charCodeAt(n + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(n + 1) & 255) << 8;
    case 1:
      (t ^= e.charCodeAt(n) & 255),
        (t = (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16));
  }
  return (
    (t ^= t >>> 13),
    (t = (t & 65535) * 1540483477 + (((t >>> 16) * 59797) << 16)),
    ((t ^ (t >>> 15)) >>> 0).toString(36)
  );
}
var J0 = {
    animationIterationCount: 1,
    aspectRatio: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1,
  },
  ol = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  Q0 =
    "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).",
  e1 = /[A-Z]|^ms/g,
  Ji = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
  to = function (e) {
    return e.charCodeAt(1) === 45;
  },
  ll = function (e) {
    return e != null && typeof e != 'boolean';
  },
  In = zi(function (e) {
    return to(e) ? e : e.replace(e1, '-$&').toLowerCase();
  }),
  nn = function (e, t) {
    switch (e) {
      case 'animation':
      case 'animationName':
        if (typeof t == 'string')
          return t.replace(Ji, function (r, n, o) {
            return (Ke = { name: n, styles: o, next: Ke }), n;
          });
    }
    return J0[e] !== 1 && !to(e) && typeof t == 'number' && t !== 0
      ? t + 'px'
      : t;
  };
(il =
  /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/),
  (sl = ['normal', 'none', 'initial', 'inherit', 'unset']),
  (cl = nn),
  (ul = /^-ms-/),
  (dl = /-(.)/g),
  (Nn = {}),
  (nn = function (e, t) {
    if (
      e === 'content' &&
      (typeof t != 'string' ||
        (sl.indexOf(t) === -1 &&
          !il.test(t) &&
          (t.charAt(0) !== t.charAt(t.length - 1) ||
            (t.charAt(0) !== '"' && t.charAt(0) !== "'"))))
    )
      throw new Error(
        "You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" +
          t +
          '"\'`'
      );
    var r = cl(e, t);
    return (
      r !== '' &&
        !to(e) &&
        e.indexOf('-') !== -1 &&
        Nn[e] === void 0 &&
        ((Nn[e] = !0),
        console.error(
          'Using kebab-case for css properties in objects is not supported. Did you mean ' +
            e.replace(ul, 'ms-').replace(dl, function (n, o) {
              return o.toUpperCase();
            }) +
            '?'
        )),
      r
    );
  });
var il,
  sl,
  cl,
  ul,
  dl,
  Nn,
  Qi =
    'Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.';
function yr(e, t, r) {
  if (r == null) return '';
  if (r.__emotion_styles !== void 0) {
    if (r.toString() === 'NO_COMPONENT_SELECTOR') throw new Error(Qi);
    return r;
  }
  switch (typeof r) {
    case 'boolean':
      return '';
    case 'object': {
      if (r.anim === 1)
        return (Ke = { name: r.name, styles: r.styles, next: Ke }), r.name;
      if (r.styles !== void 0) {
        var n = r.next;
        if (n !== void 0)
          for (; n !== void 0; )
            (Ke = { name: n.name, styles: n.styles, next: Ke }), (n = n.next);
        var o = r.styles + ';';
        return r.map !== void 0 && (o += r.map), o;
      }
      return t1(e, t, r);
    }
    case 'function': {
      if (e !== void 0) {
        var l = Ke,
          i = r(e);
        return (Ke = l), yr(e, t, i);
      } else
        console.error(
          "Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`"
        );
      break;
    }
    case 'string':
      var s = [],
        c = r.replace(Ji, function (d, h, m) {
          var p = 'animation' + s.length;
          return (
            s.push(
              'const ' +
                p +
                ' = keyframes`' +
                m.replace(/^@keyframes animation-\w+/, '') +
                '`'
            ),
            '${' + p + '}'
          );
        });
      s.length &&
        console.error(
          '`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n' +
            [].concat(s, ['`' + c + '`']).join(`
`) +
            `

You should wrap it with \`css\` like this:

` +
            ('css`' + c + '`')
        );
      break;
  }
  if (t == null) return r;
  var u = t[r];
  return u !== void 0 ? u : r;
}
function t1(e, t, r) {
  var n = '';
  if (Array.isArray(r))
    for (var o = 0; o < r.length; o++) n += yr(e, t, r[o]) + ';';
  else
    for (var l in r) {
      var i = r[l];
      if (typeof i != 'object')
        t != null && t[i] !== void 0
          ? (n += l + '{' + t[i] + '}')
          : ll(i) && (n += In(l) + ':' + nn(l, i) + ';');
      else {
        if (l === 'NO_COMPONENT_SELECTOR') throw new Error(Qi);
        if (
          Array.isArray(i) &&
          typeof i[0] == 'string' &&
          (t == null || t[i[0]] === void 0)
        )
          for (var s = 0; s < i.length; s++)
            ll(i[s]) && (n += In(l) + ':' + nn(l, i[s]) + ';');
        else {
          var c = yr(e, t, i);
          switch (l) {
            case 'animation':
            case 'animationName': {
              n += In(l) + ':' + c + ';';
              break;
            }
            default:
              l === 'undefined' && console.error(Q0), (n += l + '{' + c + '}');
          }
        }
      }
    }
  return n;
}
var pl = /label:\s*([^\s;\n{]+)\s*(;|$)/g,
  es;
es = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
var Ke,
  Gt = function (e, t, r) {
    if (
      e.length === 1 &&
      typeof e[0] == 'object' &&
      e[0] !== null &&
      e[0].styles !== void 0
    )
      return e[0];
    var n = !0,
      o = '';
    Ke = void 0;
    var l = e[0];
    l == null || l.raw === void 0
      ? ((n = !1), (o += yr(r, t, l)))
      : (l[0] === void 0 && console.error(ol), (o += l[0]));
    for (var i = 1; i < e.length; i++)
      (o += yr(r, t, e[i])),
        n && (l[i] === void 0 && console.error(ol), (o += l[i]));
    var s;
    (o = o.replace(es, function (h) {
      return (s = h), '';
    })),
      (pl.lastIndex = 0);
    for (var c = '', u; (u = pl.exec(o)) !== null; ) c += '-' + u[1];
    var d = X0(o) + c;
    return {
      name: d,
      styles: o,
      map: s,
      next: Ke,
      toString: function () {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      },
    };
  },
  r1 = {}.hasOwnProperty,
  ro = b.createContext(typeof HTMLElement < 'u' ? Y0({ key: 'css' }) : null);
ro.displayName = 'EmotionCacheContext';
ro.Provider;
var bn = function (e) {
    return b.forwardRef(function (t, r) {
      var n = b.useContext(ro);
      return e(t, n, r);
    });
  },
  vt = b.createContext({});
vt.displayName = 'EmotionThemeContext';
var n1 = function () {
    return b.useContext(vt);
  },
  a1 = function (e, t) {
    if (typeof t == 'function') {
      var r = t(e);
      if (r == null || typeof r != 'object' || Array.isArray(r))
        throw new Error(
          '[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!'
        );
      return r;
    }
    if (t == null || typeof t != 'object' || Array.isArray(t))
      throw new Error(
        '[ThemeProvider] Please make your theme prop a plain object'
      );
    return ga({}, e, t);
  },
  o1 = rl(function (e) {
    return rl(function (t) {
      return a1(e, t);
    });
  }),
  ts = function (e) {
    var t = b.useContext(vt);
    return (
      e.theme !== t && (t = o1(t)(e.theme)),
      b.createElement(vt.Provider, { value: t }, e.children)
    );
  },
  fl = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
  ml = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__',
  l1 = function (e) {
    var t = e.cache,
      r = e.serialized,
      n = e.isStringTag;
    return (
      gn(t, r, n),
      Ga(function () {
        return hn(t, r, n);
      }),
      null
    );
  },
  i1 = bn(function (e, t, r) {
    var n = e.css;
    typeof n == 'string' && t.registered[n] !== void 0 && (n = t.registered[n]);
    var o = e[fl],
      l = [n],
      i = '';
    typeof e.className == 'string'
      ? (i = eo(t.registered, l, e.className))
      : e.className != null && (i = e.className + ' ');
    var s = Gt(l, void 0, b.useContext(vt));
    if (s.name.indexOf('-') === -1) {
      var c = e[ml];
      c && (s = Gt([s, 'label:' + c + ';']));
    }
    i += t.key + '-' + s.name;
    var u = {};
    for (var d in e)
      r1.call(e, d) && d !== 'css' && d !== fl && d !== ml && (u[d] = e[d]);
    return (
      (u.ref = r),
      (u.className = i),
      b.createElement(
        b.Fragment,
        null,
        b.createElement(l1, {
          cache: t,
          serialized: s,
          isStringTag: typeof o == 'string',
        }),
        b.createElement(o, u)
      )
    );
  });
i1.displayName = 'EmotionCssPropInternal';
_i(Vi());
var s1 = {
    name: '@emotion/react',
    version: '11.11.1',
    main: 'dist/emotion-react.cjs.js',
    module: 'dist/emotion-react.esm.js',
    browser: {
      './dist/emotion-react.esm.js': './dist/emotion-react.browser.esm.js',
    },
    exports: {
      '.': {
        module: {
          worker: './dist/emotion-react.worker.esm.js',
          browser: './dist/emotion-react.browser.esm.js',
          default: './dist/emotion-react.esm.js',
        },
        import: './dist/emotion-react.cjs.mjs',
        default: './dist/emotion-react.cjs.js',
      },
      './jsx-runtime': {
        module: {
          worker: './jsx-runtime/dist/emotion-react-jsx-runtime.worker.esm.js',
          browser:
            './jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
          default: './jsx-runtime/dist/emotion-react-jsx-runtime.esm.js',
        },
        import: './jsx-runtime/dist/emotion-react-jsx-runtime.cjs.mjs',
        default: './jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js',
      },
      './_isolated-hnrs': {
        module: {
          worker:
            './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.worker.esm.js',
          browser:
            './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js',
          default: './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.esm.js',
        },
        import: './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.mjs',
        default: './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js',
      },
      './jsx-dev-runtime': {
        module: {
          worker:
            './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.worker.esm.js',
          browser:
            './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js',
          default:
            './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.esm.js',
        },
        import: './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.mjs',
        default: './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js',
      },
      './package.json': './package.json',
      './types/css-prop': './types/css-prop.d.ts',
      './macro': {
        types: { import: './macro.d.mts', default: './macro.d.ts' },
        default: './macro.js',
      },
    },
    types: 'types/index.d.ts',
    files: [
      'src',
      'dist',
      'jsx-runtime',
      'jsx-dev-runtime',
      '_isolated-hnrs',
      'types/*.d.ts',
      'macro.*',
    ],
    sideEffects: !1,
    author: 'Emotion Contributors',
    license: 'MIT',
    scripts: { 'test:typescript': 'dtslint types' },
    dependencies: {
      '@babel/runtime': '^7.18.3',
      '@emotion/babel-plugin': '^11.11.0',
      '@emotion/cache': '^11.11.0',
      '@emotion/serialize': '^1.1.2',
      '@emotion/use-insertion-effect-with-fallbacks': '^1.0.1',
      '@emotion/utils': '^1.2.1',
      '@emotion/weak-memoize': '^0.3.1',
      'hoist-non-react-statics': '^3.3.1',
    },
    peerDependencies: { react: '>=16.8.0' },
    peerDependenciesMeta: { '@types/react': { optional: !0 } },
    devDependencies: {
      '@definitelytyped/dtslint': '0.0.112',
      '@emotion/css': '11.11.0',
      '@emotion/css-prettifier': '1.1.3',
      '@emotion/server': '11.11.0',
      '@emotion/styled': '11.11.0',
      'html-tag-names': '^1.1.2',
      react: '16.14.0',
      'svg-tag-names': '^1.1.1',
      typescript: '^4.5.5',
    },
    repository:
      'https://github.com/emotion-js/emotion/tree/main/packages/react',
    publishConfig: { access: 'public' },
    'umd:main': 'dist/emotion-react.umd.min.js',
    preconstruct: {
      entrypoints: [
        './index.js',
        './jsx-runtime.js',
        './jsx-dev-runtime.js',
        './_isolated-hnrs.js',
      ],
      umdName: 'emotionReact',
      exports: {
        envConditions: ['browser', 'worker'],
        extra: {
          './types/css-prop': './types/css-prop.d.ts',
          './macro': {
            types: { import: './macro.d.mts', default: './macro.d.ts' },
            default: './macro.js',
          },
        },
      },
    },
  },
  gl = !1,
  c1 = bn(function (e, t) {
    !gl &&
      (e.className || e.css) &&
      (console.error(
        "It looks like you're using the css prop on Global, did you mean to use the styles prop instead?"
      ),
      (gl = !0));
    var r = e.styles,
      n = Gt([r], void 0, b.useContext(vt)),
      o = b.useRef();
    return (
      Qo(
        function () {
          var l = t.key + '-global',
            i = new t.sheet.constructor({
              key: l,
              nonce: t.sheet.nonce,
              container: t.sheet.container,
              speedy: t.sheet.isSpeedy,
            }),
            s = !1,
            c = document.querySelector(
              'style[data-emotion="' + l + ' ' + n.name + '"]'
            );
          return (
            t.sheet.tags.length && (i.before = t.sheet.tags[0]),
            c !== null &&
              ((s = !0), c.setAttribute('data-emotion', l), i.hydrate([c])),
            (o.current = [i, s]),
            function () {
              i.flush();
            }
          );
        },
        [t]
      ),
      Qo(
        function () {
          var l = o.current,
            i = l[0],
            s = l[1];
          if (s) {
            l[1] = !1;
            return;
          }
          if ((n.next !== void 0 && hn(t, n.next, !0), i.tags.length)) {
            var c = i.tags[i.tags.length - 1].nextElementSibling;
            (i.before = c), i.flush();
          }
          t.insert('', n, i, !1);
        },
        [t, n.name]
      ),
      null
    );
  });
c1.displayName = 'EmotionGlobal';
function no() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return Gt(t);
}
var nr = function () {
    var e = no.apply(void 0, arguments),
      t = 'animation-' + e.name;
    return {
      name: t,
      styles: '@keyframes ' + t + '{' + e.styles + '}',
      anim: 1,
      toString: function () {
        return '_EMO_' + this.name + '_' + this.styles + '_EMO_';
      },
    };
  },
  u1 = function e(t) {
    for (var r = t.length, n = 0, o = ''; n < r; n++) {
      var l = t[n];
      if (l != null) {
        var i = void 0;
        switch (typeof l) {
          case 'boolean':
            break;
          case 'object': {
            if (Array.isArray(l)) i = e(l);
            else {
              l.styles !== void 0 &&
                l.name !== void 0 &&
                console.error(
                  'You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.'
                ),
                (i = '');
              for (var s in l) l[s] && s && (i && (i += ' '), (i += s));
            }
            break;
          }
          default:
            i = l;
        }
        i && (o && (o += ' '), (o += i));
      }
    }
    return o;
  };
function d1(e, t, r) {
  var n = [],
    o = eo(e, n, r);
  return n.length < 2 ? r : o + t(n);
}
var p1 = function (e) {
    var t = e.cache,
      r = e.serializedArr;
    return (
      Ga(function () {
        for (var n = 0; n < r.length; n++) hn(t, r[n], !1);
      }),
      null
    );
  },
  f1 = bn(function (e, t) {
    var r = !1,
      n = [],
      o = function () {
        if (r) throw new Error('css can only be used during render');
        for (var c = arguments.length, u = new Array(c), d = 0; d < c; d++)
          u[d] = arguments[d];
        var h = Gt(u, t.registered);
        return n.push(h), gn(t, h, !1), t.key + '-' + h.name;
      },
      l = function () {
        if (r) throw new Error('cx can only be used during render');
        for (var c = arguments.length, u = new Array(c), d = 0; d < c; d++)
          u[d] = arguments[d];
        return d1(t.registered, o, u1(u));
      },
      i = { css: o, cx: l, theme: b.useContext(vt) },
      s = e.children(i);
    return (
      (r = !0),
      b.createElement(
        b.Fragment,
        null,
        b.createElement(p1, { cache: t, serializedArr: n }),
        s
      )
    );
  });
f1.displayName = 'EmotionClassNames';
(Zn = !0),
  (hl = typeof jest < 'u' || typeof vi < 'u'),
  Zn &&
    !hl &&
    ((Hn = typeof globalThis < 'u' ? globalThis : Zn ? window : global),
    (jn = '__EMOTION_REACT_' + s1.version.split('.')[0] + '__'),
    Hn[jn] &&
      console.warn(
        'You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.'
      ),
    (Hn[jn] = !0));
var Zn,
  hl,
  Hn,
  jn,
  m1 = Ya,
  g1 = function (e) {
    return e !== 'theme';
  },
  bl = function (e) {
    return typeof e == 'string' && e.charCodeAt(0) > 96 ? m1 : g1;
  },
  yl = function (e, t, r) {
    var n;
    if (t) {
      var o = t.shouldForwardProp;
      n =
        e.__emotion_forwardProp && o
          ? function (l) {
              return e.__emotion_forwardProp(l) && o(l);
            }
          : o;
    }
    return typeof n != 'function' && r && (n = e.__emotion_forwardProp), n;
  },
  vl = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`,
  h1 = function (e) {
    var t = e.cache,
      r = e.serialized,
      n = e.isStringTag;
    return (
      gn(t, r, n),
      Ga(function () {
        return hn(t, r, n);
      }),
      null
    );
  },
  b1 = function e(t, r) {
    if (t === void 0)
      throw new Error(`You are trying to create a styled element with an undefined component.
You may have forgotten to import it.`);
    var n = t.__emotion_real === t,
      o = (n && t.__emotion_base) || t,
      l,
      i;
    r !== void 0 && ((l = r.label), (i = r.target));
    var s = yl(t, r, n),
      c = s || bl(o),
      u = !c('as');
    return function () {
      var d = arguments,
        h =
          n && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
      if (
        (l !== void 0 && h.push('label:' + l + ';'),
        d[0] == null || d[0].raw === void 0)
      )
        h.push.apply(h, d);
      else {
        d[0][0] === void 0 && console.error(vl), h.push(d[0][0]);
        for (var m = d.length, p = 1; p < m; p++)
          d[0][p] === void 0 && console.error(vl), h.push(d[p], d[0][p]);
      }
      var g = bn(function (f, A, w) {
        var v = (u && f.as) || o,
          y = '',
          x = [],
          E = f;
        if (f.theme == null) {
          E = {};
          for (var C in f) E[C] = f[C];
          E.theme = b.useContext(vt);
        }
        typeof f.className == 'string'
          ? (y = eo(A.registered, x, f.className))
          : f.className != null && (y = f.className + ' ');
        var S = Gt(h.concat(x), A.registered, E);
        (y += A.key + '-' + S.name), i !== void 0 && (y += ' ' + i);
        var k = u && s === void 0 ? bl(v) : c,
          R = {};
        for (var O in f) (u && O === 'as') || (k(O) && (R[O] = f[O]));
        return (
          (R.className = y),
          (R.ref = w),
          b.createElement(
            b.Fragment,
            null,
            b.createElement(h1, {
              cache: A,
              serialized: S,
              isStringTag: typeof v == 'string',
            }),
            b.createElement(v, R)
          )
        );
      });
      return (
        (g.displayName =
          l !== void 0
            ? l
            : 'Styled(' +
              (typeof o == 'string'
                ? o
                : o.displayName || o.name || 'Component') +
              ')'),
        (g.defaultProps = t.defaultProps),
        (g.__emotion_real = g),
        (g.__emotion_base = o),
        (g.__emotion_styles = h),
        (g.__emotion_forwardProp = s),
        Object.defineProperty(g, 'toString', {
          value: function () {
            return i === void 0 ? 'NO_COMPONENT_SELECTOR' : '.' + i;
          },
        }),
        (g.withComponent = function (f, A) {
          return e(f, pa({}, r, A, { shouldForwardProp: yl(g, A, !0) })).apply(
            void 0,
            h
          );
        }),
        g
      );
    };
  },
  y1 = [
    'a',
    'abbr',
    'address',
    'area',
    'article',
    'aside',
    'audio',
    'b',
    'base',
    'bdi',
    'bdo',
    'big',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'cite',
    'code',
    'col',
    'colgroup',
    'data',
    'datalist',
    'dd',
    'del',
    'details',
    'dfn',
    'dialog',
    'div',
    'dl',
    'dt',
    'em',
    'embed',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hgroup',
    'hr',
    'html',
    'i',
    'iframe',
    'img',
    'input',
    'ins',
    'kbd',
    'keygen',
    'label',
    'legend',
    'li',
    'link',
    'main',
    'map',
    'mark',
    'marquee',
    'menu',
    'menuitem',
    'meta',
    'meter',
    'nav',
    'noscript',
    'object',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'param',
    'picture',
    'pre',
    'progress',
    'q',
    'rp',
    'rt',
    'ruby',
    's',
    'samp',
    'script',
    'section',
    'select',
    'small',
    'source',
    'span',
    'strong',
    'style',
    'sub',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'title',
    'tr',
    'track',
    'u',
    'ul',
    'var',
    'video',
    'wbr',
    'circle',
    'clipPath',
    'defs',
    'ellipse',
    'foreignObject',
    'g',
    'image',
    'line',
    'linearGradient',
    'mask',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'radialGradient',
    'rect',
    'stop',
    'svg',
    'text',
    'tspan',
  ],
  T = b1.bind();
y1.forEach(function (e) {
  T[e] = T(e);
});
var v1 = tr(1)(({ typography: e }) => ({
  body: {
    fontFamily: e.fonts.base,
    fontSize: e.size.s3,
    margin: 0,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    WebkitOverflowScrolling: 'touch',
  },
  '*': { boxSizing: 'border-box' },
  'h1, h2, h3, h4, h5, h6': {
    fontWeight: e.weight.regular,
    margin: 0,
    padding: 0,
  },
  'button, input, textarea, select': {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    boxSizing: 'border-box',
  },
  sub: { fontSize: '0.8em', bottom: '-0.2em' },
  sup: { fontSize: '0.8em', top: '-0.2em' },
  'b, strong': { fontWeight: e.weight.bold },
  hr: {
    border: 'none',
    borderTop: '1px solid silver',
    clear: 'both',
    marginBottom: '1.25rem',
  },
  code: {
    fontFamily: e.fonts.mono,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    display: 'inline-block',
    paddingLeft: 2,
    paddingRight: 2,
    verticalAlign: 'baseline',
    color: 'inherit',
  },
  pre: {
    fontFamily: e.fonts.mono,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    lineHeight: '18px',
    padding: '11px 1rem',
    whiteSpace: 'pre-wrap',
    color: 'inherit',
    borderRadius: 3,
    margin: '1rem 0',
  },
}));
tr(1)(({ color: e, background: t, typography: r }) => {
  let n = v1({ typography: r });
  return {
    ...n,
    body: {
      ...n.body,
      color: e.defaultText,
      background: t.app,
      overflow: 'hidden',
    },
    hr: { ...n.hr, borderTop: `1px solid ${e.border}` },
  };
});
var E1 = { rubber: 'cubic-bezier(0.175, 0.885, 0.335, 1.05)' },
  x1 = nr`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`,
  rs = nr`
  0%, 100% { opacity: 1; }
  50% { opacity: .4; }
`,
  A1 = nr`
  0% { transform: translateY(1px); }
  25% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(1px); }
`,
  w1 = nr`
  0%, 100% { transform:translate3d(0,0,0); }
  12.5%, 62.5% { transform:translate3d(-4px,0,0); }
  37.5%, 87.5% {  transform: translate3d(4px,0,0);  }
`,
  C1 = no`
  animation: ${rs} 1.5s ease-in-out infinite;
  color: transparent;
  cursor: progress;
`,
  S1 = no`
  transition: all 150ms ease-out;
  transform: translate3d(0, 0, 0);

  &:hover {
    transform: translate3d(0, -2px, 0);
  }

  &:active {
    transform: translate3d(0, 0, 0);
  }
`,
  k1 = {
    rotate360: x1,
    glow: rs,
    float: A1,
    jiggle: w1,
    inlineGlow: C1,
    hoverable: S1,
  },
  T1 = {
    BASE_FONT_FAMILY: 'Menlo, monospace',
    BASE_FONT_SIZE: '11px',
    BASE_LINE_HEIGHT: 1.2,
    BASE_BACKGROUND_COLOR: 'rgb(36, 36, 36)',
    BASE_COLOR: 'rgb(213, 213, 213)',
    OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
    OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
    OBJECT_NAME_COLOR: 'rgb(227, 110, 236)',
    OBJECT_VALUE_NULL_COLOR: 'rgb(127, 127, 127)',
    OBJECT_VALUE_UNDEFINED_COLOR: 'rgb(127, 127, 127)',
    OBJECT_VALUE_REGEXP_COLOR: 'rgb(233, 63, 59)',
    OBJECT_VALUE_STRING_COLOR: 'rgb(233, 63, 59)',
    OBJECT_VALUE_SYMBOL_COLOR: 'rgb(233, 63, 59)',
    OBJECT_VALUE_NUMBER_COLOR: 'hsl(252, 100%, 75%)',
    OBJECT_VALUE_BOOLEAN_COLOR: 'hsl(252, 100%, 75%)',
    OBJECT_VALUE_FUNCTION_PREFIX_COLOR: 'rgb(85, 106, 242)',
    HTML_TAG_COLOR: 'rgb(93, 176, 215)',
    HTML_TAGNAME_COLOR: 'rgb(93, 176, 215)',
    HTML_TAGNAME_TEXT_TRANSFORM: 'lowercase',
    HTML_ATTRIBUTE_NAME_COLOR: 'rgb(155, 187, 220)',
    HTML_ATTRIBUTE_VALUE_COLOR: 'rgb(242, 151, 102)',
    HTML_COMMENT_COLOR: 'rgb(137, 137, 137)',
    HTML_DOCTYPE_COLOR: 'rgb(192, 192, 192)',
    ARROW_COLOR: 'rgb(145, 145, 145)',
    ARROW_MARGIN_RIGHT: 3,
    ARROW_FONT_SIZE: 12,
    ARROW_ANIMATION_DURATION: '0',
    TREENODE_FONT_FAMILY: 'Menlo, monospace',
    TREENODE_FONT_SIZE: '11px',
    TREENODE_LINE_HEIGHT: 1.2,
    TREENODE_PADDING_LEFT: 12,
    TABLE_BORDER_COLOR: 'rgb(85, 85, 85)',
    TABLE_TH_BACKGROUND_COLOR: 'rgb(44, 44, 44)',
    TABLE_TH_HOVER_COLOR: 'rgb(48, 48, 48)',
    TABLE_SORT_ICON_COLOR: 'black',
    TABLE_DATA_BACKGROUND_IMAGE:
      'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 50%, rgba(51, 139, 255, 0.0980392) 50%, rgba(51, 139, 255, 0.0980392))',
    TABLE_DATA_BACKGROUND_SIZE: '128px 32px',
  },
  R1 = {
    BASE_FONT_FAMILY: 'Menlo, monospace',
    BASE_FONT_SIZE: '11px',
    BASE_LINE_HEIGHT: 1.2,
    BASE_BACKGROUND_COLOR: 'white',
    BASE_COLOR: 'black',
    OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
    OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
    OBJECT_NAME_COLOR: 'rgb(136, 19, 145)',
    OBJECT_VALUE_NULL_COLOR: 'rgb(128, 128, 128)',
    OBJECT_VALUE_UNDEFINED_COLOR: 'rgb(128, 128, 128)',
    OBJECT_VALUE_REGEXP_COLOR: 'rgb(196, 26, 22)',
    OBJECT_VALUE_STRING_COLOR: 'rgb(196, 26, 22)',
    OBJECT_VALUE_SYMBOL_COLOR: 'rgb(196, 26, 22)',
    OBJECT_VALUE_NUMBER_COLOR: 'rgb(28, 0, 207)',
    OBJECT_VALUE_BOOLEAN_COLOR: 'rgb(28, 0, 207)',
    OBJECT_VALUE_FUNCTION_PREFIX_COLOR: 'rgb(13, 34, 170)',
    HTML_TAG_COLOR: 'rgb(168, 148, 166)',
    HTML_TAGNAME_COLOR: 'rgb(136, 18, 128)',
    HTML_TAGNAME_TEXT_TRANSFORM: 'lowercase',
    HTML_ATTRIBUTE_NAME_COLOR: 'rgb(153, 69, 0)',
    HTML_ATTRIBUTE_VALUE_COLOR: 'rgb(26, 26, 166)',
    HTML_COMMENT_COLOR: 'rgb(35, 110, 37)',
    HTML_DOCTYPE_COLOR: 'rgb(192, 192, 192)',
    ARROW_COLOR: '#6e6e6e',
    ARROW_MARGIN_RIGHT: 3,
    ARROW_FONT_SIZE: 12,
    ARROW_ANIMATION_DURATION: '0',
    TREENODE_FONT_FAMILY: 'Menlo, monospace',
    TREENODE_FONT_SIZE: '11px',
    TREENODE_LINE_HEIGHT: 1.2,
    TREENODE_PADDING_LEFT: 12,
    TABLE_BORDER_COLOR: '#aaa',
    TABLE_TH_BACKGROUND_COLOR: '#eee',
    TABLE_TH_HOVER_COLOR: 'hsla(0, 0%, 90%, 1)',
    TABLE_SORT_ICON_COLOR: '#6e6e6e',
    TABLE_DATA_BACKGROUND_IMAGE:
      'linear-gradient(to bottom, white, white 50%, rgb(234, 243, 255) 50%, rgb(234, 243, 255))',
    TABLE_DATA_BACKGROUND_SIZE: '128px 32px',
  },
  O1 = (e) =>
    Object.entries(e).reduce((t, [r, n]) => ({ ...t, [r]: Hu(n) }), {}),
  L1 = ({ colors: e, mono: t }) => {
    let r = O1(e);
    return {
      token: {
        fontFamily: t,
        WebkitFontSmoothing: 'antialiased',
        '&.tag': r.red3,
        '&.comment': { ...r.green1, fontStyle: 'italic' },
        '&.prolog': { ...r.green1, fontStyle: 'italic' },
        '&.doctype': { ...r.green1, fontStyle: 'italic' },
        '&.cdata': { ...r.green1, fontStyle: 'italic' },
        '&.string': r.red1,
        '&.url': r.cyan1,
        '&.symbol': r.cyan1,
        '&.number': r.cyan1,
        '&.boolean': r.cyan1,
        '&.variable': r.cyan1,
        '&.constant': r.cyan1,
        '&.inserted': r.cyan1,
        '&.atrule': r.blue1,
        '&.keyword': r.blue1,
        '&.attr-value': r.blue1,
        '&.punctuation': r.gray1,
        '&.operator': r.gray1,
        '&.function': r.gray1,
        '&.deleted': r.red2,
        '&.important': { fontWeight: 'bold' },
        '&.bold': { fontWeight: 'bold' },
        '&.italic': { fontStyle: 'italic' },
        '&.class-name': r.cyan2,
        '&.selector': r.red3,
        '&.attr-name': r.red4,
        '&.property': r.red4,
        '&.regex': r.red4,
        '&.entity': r.red4,
        '&.directive.tag .tag': { background: '#ffff00', ...r.gray1 },
      },
      'language-json .token.boolean': r.blue1,
      'language-json .token.number': r.blue1,
      'language-json .token.property': r.cyan2,
      namespace: { opacity: 0.7 },
    };
  },
  _1 = {
    green1: '#008000',
    red1: '#A31515',
    red2: '#9a050f',
    red3: '#800000',
    red4: '#ff0000',
    gray1: '#393A34',
    cyan1: '#36acaa',
    cyan2: '#2B91AF',
    blue1: '#0000ff',
    blue2: '#00009f',
  },
  D1 = {
    green1: '#7C7C7C',
    red1: '#92C379',
    red2: '#9a050f',
    red3: '#A8FF60',
    red4: '#96CBFE',
    gray1: '#EDEDED',
    cyan1: '#C6C5FE',
    cyan2: '#FFFFB6',
    blue1: '#B474DD',
    blue2: '#00009f',
  },
  F1 = (e) => ({
    primary: e.colorPrimary,
    secondary: e.colorSecondary,
    tertiary: W.tertiary,
    ancillary: W.ancillary,
    orange: W.orange,
    gold: W.gold,
    green: W.green,
    seafoam: W.seafoam,
    purple: W.purple,
    ultraviolet: W.ultraviolet,
    lightest: W.lightest,
    lighter: W.lighter,
    light: W.light,
    mediumlight: W.mediumlight,
    medium: W.medium,
    mediumdark: W.mediumdark,
    dark: W.dark,
    darker: W.darker,
    darkest: W.darkest,
    border: W.border,
    positive: W.positive,
    negative: W.negative,
    warning: W.warning,
    critical: W.critical,
    defaultText: e.textColor || W.darkest,
    inverseText: e.textInverseColor || W.lightest,
    positiveText: W.positiveText,
    negativeText: W.negativeText,
    warningText: W.warningText,
  }),
  ha = (e = ca[Zu()]) => {
    let {
      base: t,
      colorPrimary: r,
      colorSecondary: n,
      appBg: o,
      appContentBg: l,
      appPreviewBg: i,
      appBorderColor: s,
      appBorderRadius: c,
      fontBase: u,
      fontCode: d,
      textColor: h,
      textInverseColor: m,
      barTextColor: p,
      barHoverColor: g,
      barSelectedColor: f,
      barBg: A,
      buttonBg: w,
      buttonBorder: v,
      booleanBg: y,
      booleanSelectedBg: x,
      inputBg: E,
      inputBorder: C,
      inputTextColor: S,
      inputBorderRadius: k,
      brandTitle: R,
      brandUrl: O,
      brandImage: L,
      brandTarget: _,
      gridCellSize: D,
      ...H
    } = e;
    return {
      ...H,
      base: t,
      color: F1(e),
      background: {
        app: o,
        bar: A,
        content: l,
        preview: i,
        gridCellSize: D || Ht.gridCellSize,
        hoverable: Ht.hoverable,
        positive: Ht.positive,
        negative: Ht.negative,
        warning: Ht.warning,
        critical: Ht.critical,
      },
      typography: {
        fonts: { base: u, mono: d },
        weight: Vt.weight,
        size: Vt.size,
      },
      animation: k1,
      easing: E1,
      input: { background: E, border: C, borderRadius: k, color: S },
      button: { background: w || E, border: v || C },
      boolean: { background: y || C, selectedBackground: x || E },
      layoutMargin: 10,
      appBorderColor: s,
      appBorderRadius: c,
      barTextColor: p,
      barHoverColor: g || n,
      barSelectedColor: f || n,
      barBg: A,
      brand: { title: R, url: O, image: L || (R ? null : void 0), target: _ },
      code: L1({ colors: t === 'light' ? _1 : D1, mono: d }),
      addonActionsTheme: {
        ...(t === 'light' ? R1 : T1),
        BASE_FONT_FAMILY: d,
        BASE_FONT_SIZE: Vt.size.s2 - 1,
        BASE_LINE_HEIGHT: '18px',
        BASE_BACKGROUND_COLOR: 'transparent',
        BASE_COLOR: h,
        ARROW_COLOR: Nu(0.2, s),
        ARROW_MARGIN_RIGHT: 4,
        ARROW_FONT_SIZE: 8,
        TREENODE_FONT_FAMILY: d,
        TREENODE_FONT_SIZE: Vt.size.s2 - 1,
        TREENODE_LINE_HEIGHT: '18px',
        TREENODE_PADDING_LEFT: 12,
      },
    };
  },
  M1 = (e) => Object.keys(e).length === 0,
  Pn = (e) => e != null && typeof e == 'object',
  $1 = (e, ...t) => Object.prototype.hasOwnProperty.call(e, ...t),
  B1 = () => Object.create(null),
  ns = (e, t) =>
    e === t || !Pn(e) || !Pn(t)
      ? {}
      : Object.keys(e).reduce((r, n) => {
          if ($1(t, n)) {
            let o = ns(e[n], t[n]);
            return (Pn(o) && M1(o)) || (r[n] = o), r;
          }
          return (r[n] = void 0), r;
        }, B1()),
  I1 = ns;
function N1(e) {
  for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
  var n = Array.from(typeof e == 'string' ? [e] : e);
  n[n.length - 1] = n[n.length - 1].replace(/\r?\n([\t ]*)$/, '');
  var o = n.reduce(function (s, c) {
    var u = c.match(/\n([\t ]+|(?!\s).)/g);
    return u
      ? s.concat(
          u.map(function (d) {
            var h, m;
            return (m =
              (h = d.match(/[\t ]/g)) === null || h === void 0
                ? void 0
                : h.length) !== null && m !== void 0
              ? m
              : 0;
          })
        )
      : s;
  }, []);
  if (o.length) {
    var l = new RegExp(
      `
[	 ]{` +
        Math.min.apply(Math, o) +
        '}',
      'g'
    );
    n = n.map(function (s) {
      return s.replace(
        l,
        `
`
      );
    });
  }
  n[0] = n[0].replace(/^\r?\n/, '');
  var i = n[0];
  return (
    t.forEach(function (s, c) {
      var u = i.match(/(?:^|\n)( *)$/),
        d = u ? u[1] : '',
        h = s;
      typeof s == 'string' &&
        s.includes(`
`) &&
        (h = String(s)
          .split(
            `
`
          )
          .map(function (m, p) {
            return p === 0 ? m : '' + d + m;
          }).join(`
`)),
        (i += h + n[c + 1]);
    }),
    i
  );
}
var Z1 = (e) => {
    if (!e) return ha(Xo);
    let t = I1(Xo, e);
    return (
      Object.keys(t).length &&
        f0.warn(
          N1`
          Your theme is missing properties, you should update your theme!

          theme-data missing:
        `,
          t
        ),
      ha(e)
    );
  },
  ba =
    '/* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */',
  H1 = Object.create,
  as = Object.defineProperty,
  j1 = Object.getOwnPropertyDescriptor,
  os = Object.getOwnPropertyNames,
  P1 = Object.getPrototypeOf,
  V1 = Object.prototype.hasOwnProperty,
  B = (e, t) =>
    function () {
      return t || (0, e[os(e)[0]])((t = { exports: {} }).exports, t), t.exports;
    },
  z1 = (e, t, r, n) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let o of os(t))
        !V1.call(e, o) &&
          o !== r &&
          as(e, o, {
            get: () => t[o],
            enumerable: !(n = j1(t, o)) || n.enumerable,
          });
    return e;
  },
  ke = (e, t, r) => (
    (r = e != null ? H1(P1(e)) : {}),
    z1(
      t || !e || !e.__esModule
        ? as(r, 'default', { value: e, enumerable: !0 })
        : r,
      e
    )
  ),
  q1 = B({
    '../../node_modules/refractor/lang/markdown.js'(e, t) {
      (t.exports = r), (r.displayName = 'markdown'), (r.aliases = ['md']);
      function r(n) {
        (function (o) {
          var l = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;
          function i(g) {
            return (
              (g = g.replace(/<inner>/g, function () {
                return l;
              })),
              RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + '(?:' + g + ')')
            );
          }
          var s = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/
              .source,
            c = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(
              /__/g,
              function () {
                return s;
              }
            ),
            u =
              /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/
                .source;
          (o.languages.markdown = o.languages.extend('markup', {})),
            o.languages.insertBefore('markdown', 'prolog', {
              'front-matter-block': {
                pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
                lookbehind: !0,
                greedy: !0,
                inside: {
                  punctuation: /^---|---$/,
                  'front-matter': {
                    pattern: /\S+(?:\s+\S+)*/,
                    alias: ['yaml', 'language-yaml'],
                    inside: o.languages.yaml,
                  },
                },
              },
              blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: 'punctuation' },
              table: {
                pattern: RegExp('^' + c + u + '(?:' + c + ')*', 'm'),
                inside: {
                  'table-data-rows': {
                    pattern: RegExp('^(' + c + u + ')(?:' + c + ')*$'),
                    lookbehind: !0,
                    inside: {
                      'table-data': {
                        pattern: RegExp(s),
                        inside: o.languages.markdown,
                      },
                      punctuation: /\|/,
                    },
                  },
                  'table-line': {
                    pattern: RegExp('^(' + c + ')' + u + '$'),
                    lookbehind: !0,
                    inside: { punctuation: /\||:?-{3,}:?/ },
                  },
                  'table-header-row': {
                    pattern: RegExp('^' + c + '$'),
                    inside: {
                      'table-header': {
                        pattern: RegExp(s),
                        alias: 'important',
                        inside: o.languages.markdown,
                      },
                      punctuation: /\|/,
                    },
                  },
                },
              },
              code: [
                {
                  pattern:
                    /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
                  lookbehind: !0,
                  alias: 'keyword',
                },
                {
                  pattern: /^```[\s\S]*?^```$/m,
                  greedy: !0,
                  inside: {
                    'code-block': {
                      pattern:
                        /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
                      lookbehind: !0,
                    },
                    'code-language': { pattern: /^(```).+/, lookbehind: !0 },
                    punctuation: /```/,
                  },
                },
              ],
              title: [
                {
                  pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
                  alias: 'important',
                  inside: { punctuation: /==+$|--+$/ },
                },
                {
                  pattern: /(^\s*)#.+/m,
                  lookbehind: !0,
                  alias: 'important',
                  inside: { punctuation: /^#+|#+$/ },
                },
              ],
              hr: {
                pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
                lookbehind: !0,
                alias: 'punctuation',
              },
              list: {
                pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
                lookbehind: !0,
                alias: 'punctuation',
              },
              'url-reference': {
                pattern:
                  /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
                inside: {
                  variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
                  string:
                    /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
                  punctuation: /^[\[\]!:]|[<>]/,
                },
                alias: 'url',
              },
              bold: {
                pattern: i(
                  /\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/
                    .source
                ),
                lookbehind: !0,
                greedy: !0,
                inside: {
                  content: {
                    pattern: /(^..)[\s\S]+(?=..$)/,
                    lookbehind: !0,
                    inside: {},
                  },
                  punctuation: /\*\*|__/,
                },
              },
              italic: {
                pattern: i(
                  /\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/
                    .source
                ),
                lookbehind: !0,
                greedy: !0,
                inside: {
                  content: {
                    pattern: /(^.)[\s\S]+(?=.$)/,
                    lookbehind: !0,
                    inside: {},
                  },
                  punctuation: /[*_]/,
                },
              },
              strike: {
                pattern: i(/(~~?)(?:(?!~)<inner>)+\2/.source),
                lookbehind: !0,
                greedy: !0,
                inside: {
                  content: {
                    pattern: /(^~~?)[\s\S]+(?=\1$)/,
                    lookbehind: !0,
                    inside: {},
                  },
                  punctuation: /~~?/,
                },
              },
              'code-snippet': {
                pattern:
                  /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
                lookbehind: !0,
                greedy: !0,
                alias: ['code', 'keyword'],
              },
              url: {
                pattern: i(
                  /!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/
                    .source
                ),
                lookbehind: !0,
                greedy: !0,
                inside: {
                  operator: /^!/,
                  content: {
                    pattern: /(^\[)[^\]]+(?=\])/,
                    lookbehind: !0,
                    inside: {},
                  },
                  variable: {
                    pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
                    lookbehind: !0,
                  },
                  url: { pattern: /(^\]\()[^\s)]+/, lookbehind: !0 },
                  string: {
                    pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
                    lookbehind: !0,
                  },
                },
              },
            }),
            ['url', 'bold', 'italic', 'strike'].forEach(function (g) {
              ['url', 'bold', 'italic', 'strike', 'code-snippet'].forEach(
                function (f) {
                  g !== f &&
                    (o.languages.markdown[g].inside.content.inside[f] =
                      o.languages.markdown[f]);
                }
              );
            }),
            o.hooks.add('after-tokenize', function (g) {
              if (g.language !== 'markdown' && g.language !== 'md') return;
              function f(A) {
                if (!(!A || typeof A == 'string'))
                  for (var w = 0, v = A.length; w < v; w++) {
                    var y = A[w];
                    if (y.type !== 'code') {
                      f(y.content);
                      continue;
                    }
                    var x = y.content[1],
                      E = y.content[3];
                    if (
                      x &&
                      E &&
                      x.type === 'code-language' &&
                      E.type === 'code-block' &&
                      typeof x.content == 'string'
                    ) {
                      var C = x.content
                        .replace(/\b#/g, 'sharp')
                        .replace(/\b\+\+/g, 'pp');
                      C = (/[a-z][\w-]*/i.exec(C) || [''])[0].toLowerCase();
                      var S = 'language-' + C;
                      E.alias
                        ? typeof E.alias == 'string'
                          ? (E.alias = [E.alias, S])
                          : E.alias.push(S)
                        : (E.alias = [S]);
                    }
                  }
              }
              f(g.tokens);
            }),
            o.hooks.add('wrap', function (g) {
              if (g.type === 'code-block') {
                for (var f = '', A = 0, w = g.classes.length; A < w; A++) {
                  var v = g.classes[A],
                    y = /language-(.+)/.exec(v);
                  if (y) {
                    f = y[1];
                    break;
                  }
                }
                var x = o.languages[f];
                if (x) g.content = o.highlight(p(g.content.value), x, f);
                else if (f && f !== 'none' && o.plugins.autoloader) {
                  var E =
                    'md-' +
                    new Date().valueOf() +
                    '-' +
                    Math.floor(Math.random() * 1e16);
                  (g.attributes.id = E),
                    o.plugins.autoloader.loadLanguages(f, function () {
                      var C = document.getElementById(E);
                      C &&
                        (C.innerHTML = o.highlight(
                          C.textContent,
                          o.languages[f],
                          f
                        ));
                    });
                }
              }
            });
          var d = RegExp(o.languages.markup.tag.pattern.source, 'gi'),
            h = { amp: '&', lt: '<', gt: '>', quot: '"' },
            m = String.fromCodePoint || String.fromCharCode;
          function p(g) {
            var f = g.replace(d, '');
            return (
              (f = f.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function (A, w) {
                if (((w = w.toLowerCase()), w[0] === '#')) {
                  var v;
                  return (
                    w[1] === 'x'
                      ? (v = parseInt(w.slice(2), 16))
                      : (v = Number(w.slice(1))),
                    m(v)
                  );
                } else {
                  var y = h[w];
                  return y || A;
                }
              })),
              f
            );
          }
          o.languages.md = o.languages.markdown;
        })(n);
      }
    },
  }),
  U1 = B({
    '../../node_modules/refractor/lang/yaml.js'(e, t) {
      (t.exports = r), (r.displayName = 'yaml'), (r.aliases = ['yml']);
      function r(n) {
        (function (o) {
          var l = /[*&][^\s[\]{},]+/,
            i =
              /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/,
            s =
              '(?:' +
              i.source +
              '(?:[ 	]+' +
              l.source +
              ')?|' +
              l.source +
              '(?:[ 	]+' +
              i.source +
              ')?)',
            c =
              /(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(
                /<PLAIN>/g,
                function () {
                  return /[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/
                    .source;
                }
              ),
            u = /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;
          function d(h, m) {
            m = (m || '').replace(/m/g, '') + 'm';
            var p =
              /([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source
                .replace(/<<prop>>/g, function () {
                  return s;
                })
                .replace(/<<value>>/g, function () {
                  return h;
                });
            return RegExp(p, m);
          }
          (o.languages.yaml = {
            scalar: {
              pattern: RegExp(
                /([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(
                  /<<prop>>/g,
                  function () {
                    return s;
                  }
                )
              ),
              lookbehind: !0,
              alias: 'string',
            },
            comment: /#.*/,
            key: {
              pattern: RegExp(
                /((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source
                  .replace(/<<prop>>/g, function () {
                    return s;
                  })
                  .replace(/<<key>>/g, function () {
                    return '(?:' + c + '|' + u + ')';
                  })
              ),
              lookbehind: !0,
              greedy: !0,
              alias: 'atrule',
            },
            directive: {
              pattern: /(^[ \t]*)%.+/m,
              lookbehind: !0,
              alias: 'important',
            },
            datetime: {
              pattern: d(
                /\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/
                  .source
              ),
              lookbehind: !0,
              alias: 'number',
            },
            boolean: {
              pattern: d(/false|true/.source, 'i'),
              lookbehind: !0,
              alias: 'important',
            },
            null: {
              pattern: d(/null|~/.source, 'i'),
              lookbehind: !0,
              alias: 'important',
            },
            string: { pattern: d(u), lookbehind: !0, greedy: !0 },
            number: {
              pattern: d(
                /[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/
                  .source,
                'i'
              ),
              lookbehind: !0,
            },
            tag: i,
            important: l,
            punctuation: /---|[:[\]{}\-,|>?]|\.\.\./,
          }),
            (o.languages.yml = o.languages.yaml);
        })(n);
      }
    },
  }),
  ls = B({
    '../../node_modules/refractor/lang/typescript.js'(e, t) {
      (t.exports = r), (r.displayName = 'typescript'), (r.aliases = ['ts']);
      function r(n) {
        (function (o) {
          (o.languages.typescript = o.languages.extend('javascript', {
            'class-name': {
              pattern:
                /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
              lookbehind: !0,
              greedy: !0,
              inside: null,
            },
            builtin:
              /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/,
          })),
            o.languages.typescript.keyword.push(
              /\b(?:abstract|declare|is|keyof|readonly|require)\b/,
              /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
              /\btype\b(?=\s*(?:[\{*]|$))/
            ),
            delete o.languages.typescript.parameter,
            delete o.languages.typescript['literal-property'];
          var l = o.languages.extend('typescript', {});
          delete l['class-name'],
            (o.languages.typescript['class-name'].inside = l),
            o.languages.insertBefore('typescript', 'function', {
              decorator: {
                pattern: /@[$\w\xA0-\uFFFF]+/,
                inside: {
                  at: { pattern: /^@/, alias: 'operator' },
                  function: /^[\s\S]+/,
                },
              },
              'generic-function': {
                pattern:
                  /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
                greedy: !0,
                inside: {
                  function:
                    /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
                  generic: {
                    pattern: /<[\s\S]+/,
                    alias: 'class-name',
                    inside: l,
                  },
                },
              },
            }),
            (o.languages.ts = o.languages.typescript);
        })(n);
      }
    },
  }),
  is = B({
    '../../node_modules/refractor/lang/jsx.js'(e, t) {
      (t.exports = r), (r.displayName = 'jsx'), (r.aliases = []);
      function r(n) {
        (function (o) {
          var l = o.util.clone(o.languages.javascript),
            i = /(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source,
            s = /(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source,
            c = /(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;
          function u(m, p) {
            return (
              (m = m
                .replace(/<S>/g, function () {
                  return i;
                })
                .replace(/<BRACES>/g, function () {
                  return s;
                })
                .replace(/<SPREAD>/g, function () {
                  return c;
                })),
              RegExp(m, p)
            );
          }
          (c = u(c).source),
            (o.languages.jsx = o.languages.extend('markup', l)),
            (o.languages.jsx.tag.pattern = u(
              /<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/
                .source
            )),
            (o.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/),
            (o.languages.jsx.tag.inside['attr-value'].pattern =
              /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/),
            (o.languages.jsx.tag.inside.tag.inside['class-name'] =
              /^[A-Z]\w*(?:\.[A-Z]\w*)*$/),
            (o.languages.jsx.tag.inside.comment = l.comment),
            o.languages.insertBefore(
              'inside',
              'attr-name',
              {
                spread: {
                  pattern: u(/<SPREAD>/.source),
                  inside: o.languages.jsx,
                },
              },
              o.languages.jsx.tag
            ),
            o.languages.insertBefore(
              'inside',
              'special-attr',
              {
                script: {
                  pattern: u(/=<BRACES>/.source),
                  alias: 'language-javascript',
                  inside: {
                    'script-punctuation': {
                      pattern: /^=(?=\{)/,
                      alias: 'punctuation',
                    },
                    rest: o.languages.jsx,
                  },
                },
              },
              o.languages.jsx.tag
            );
          var d = function (m) {
              return m
                ? typeof m == 'string'
                  ? m
                  : typeof m.content == 'string'
                    ? m.content
                    : m.content.map(d).join('')
                : '';
            },
            h = function (m) {
              for (var p = [], g = 0; g < m.length; g++) {
                var f = m[g],
                  A = !1;
                if (
                  (typeof f != 'string' &&
                    (f.type === 'tag' &&
                    f.content[0] &&
                    f.content[0].type === 'tag'
                      ? f.content[0].content[0].content === '</'
                        ? p.length > 0 &&
                          p[p.length - 1].tagName ===
                            d(f.content[0].content[1]) &&
                          p.pop()
                        : f.content[f.content.length - 1].content === '/>' ||
                          p.push({
                            tagName: d(f.content[0].content[1]),
                            openedBraces: 0,
                          })
                      : p.length > 0 &&
                          f.type === 'punctuation' &&
                          f.content === '{'
                        ? p[p.length - 1].openedBraces++
                        : p.length > 0 &&
                            p[p.length - 1].openedBraces > 0 &&
                            f.type === 'punctuation' &&
                            f.content === '}'
                          ? p[p.length - 1].openedBraces--
                          : (A = !0)),
                  (A || typeof f == 'string') &&
                    p.length > 0 &&
                    p[p.length - 1].openedBraces === 0)
                ) {
                  var w = d(f);
                  g < m.length - 1 &&
                    (typeof m[g + 1] == 'string' ||
                      m[g + 1].type === 'plain-text') &&
                    ((w += d(m[g + 1])), m.splice(g + 1, 1)),
                    g > 0 &&
                      (typeof m[g - 1] == 'string' ||
                        m[g - 1].type === 'plain-text') &&
                      ((w = d(m[g - 1]) + w), m.splice(g - 1, 1), g--),
                    (m[g] = new o.Token('plain-text', w, null, w));
                }
                f.content && typeof f.content != 'string' && h(f.content);
              }
            };
          o.hooks.add('after-tokenize', function (m) {
            (m.language !== 'jsx' && m.language !== 'tsx') || h(m.tokens);
          });
        })(n);
      }
    },
  }),
  W1 = B({
    '../../node_modules/refractor/lang/tsx.js'(e, t) {
      var r = is(),
        n = ls();
      (t.exports = o), (o.displayName = 'tsx'), (o.aliases = []);
      function o(l) {
        l.register(r),
          l.register(n),
          (function (i) {
            var s = i.util.clone(i.languages.typescript);
            (i.languages.tsx = i.languages.extend('jsx', s)),
              delete i.languages.tsx.parameter,
              delete i.languages.tsx['literal-property'];
            var c = i.languages.tsx.tag;
            (c.pattern = RegExp(
              /(^|[^\w$]|(?=<\/))/.source + '(?:' + c.pattern.source + ')',
              c.pattern.flags
            )),
              (c.lookbehind = !0);
          })(l);
      }
    },
  }),
  G1 = B({
    '../../node_modules/refractor/lang/clike.js'(e, t) {
      (t.exports = r), (r.displayName = 'clike'), (r.aliases = []);
      function r(n) {
        n.languages.clike = {
          comment: [
            {
              pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
              lookbehind: !0,
              greedy: !0,
            },
            { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
          ],
          string: {
            pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
            greedy: !0,
          },
          'class-name': {
            pattern:
              /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
            lookbehind: !0,
            inside: { punctuation: /[.\\]/ },
          },
          keyword:
            /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
          boolean: /\b(?:false|true)\b/,
          function: /\b\w+(?=\()/,
          number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
          operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
          punctuation: /[{}[\];(),.:]/,
        };
      }
    },
  }),
  Y1 = B({
    '../../node_modules/refractor/lang/javascript.js'(e, t) {
      (t.exports = r), (r.displayName = 'javascript'), (r.aliases = ['js']);
      function r(n) {
        (n.languages.javascript = n.languages.extend('clike', {
          'class-name': [
            n.languages.clike['class-name'],
            {
              pattern:
                /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
              lookbehind: !0,
            },
          ],
          keyword: [
            { pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 },
            {
              pattern:
                /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
              lookbehind: !0,
            },
          ],
          function:
            /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
          number: {
            pattern: RegExp(
              /(^|[^\w$])/.source +
                '(?:' +
                (/NaN|Infinity/.source +
                  '|' +
                  /0[bB][01]+(?:_[01]+)*n?/.source +
                  '|' +
                  /0[oO][0-7]+(?:_[0-7]+)*n?/.source +
                  '|' +
                  /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source +
                  '|' +
                  /\d+(?:_\d+)*n/.source +
                  '|' +
                  /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/
                    .source) +
                ')' +
                /(?![\w$])/.source
            ),
            lookbehind: !0,
          },
          operator:
            /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
        })),
          (n.languages.javascript['class-name'][0].pattern =
            /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/),
          n.languages.insertBefore('javascript', 'keyword', {
            regex: {
              pattern:
                /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
              lookbehind: !0,
              greedy: !0,
              inside: {
                'regex-source': {
                  pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                  lookbehind: !0,
                  alias: 'language-regex',
                  inside: n.languages.regex,
                },
                'regex-delimiter': /^\/|\/$/,
                'regex-flags': /^[a-z]+$/,
              },
            },
            'function-variable': {
              pattern:
                /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
              alias: 'function',
            },
            parameter: [
              {
                pattern:
                  /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
                lookbehind: !0,
                inside: n.languages.javascript,
              },
              {
                pattern:
                  /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
                lookbehind: !0,
                inside: n.languages.javascript,
              },
              {
                pattern:
                  /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
                lookbehind: !0,
                inside: n.languages.javascript,
              },
              {
                pattern:
                  /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
                lookbehind: !0,
                inside: n.languages.javascript,
              },
            ],
            constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
          }),
          n.languages.insertBefore('javascript', 'string', {
            hashbang: { pattern: /^#!.*/, greedy: !0, alias: 'comment' },
            'template-string': {
              pattern:
                /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
              greedy: !0,
              inside: {
                'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
                interpolation: {
                  pattern:
                    /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
                  lookbehind: !0,
                  inside: {
                    'interpolation-punctuation': {
                      pattern: /^\$\{|\}$/,
                      alias: 'punctuation',
                    },
                    rest: n.languages.javascript,
                  },
                },
                string: /[\s\S]+/,
              },
            },
            'string-property': {
              pattern:
                /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
              lookbehind: !0,
              greedy: !0,
              alias: 'property',
            },
          }),
          n.languages.insertBefore('javascript', 'operator', {
            'literal-property': {
              pattern:
                /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
              lookbehind: !0,
              alias: 'property',
            },
          }),
          n.languages.markup &&
            (n.languages.markup.tag.addInlined('script', 'javascript'),
            n.languages.markup.tag.addAttribute(
              /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/
                .source,
              'javascript'
            )),
          (n.languages.js = n.languages.javascript);
      }
    },
  }),
  ss = B({
    '../../node_modules/refractor/lang/css.js'(e, t) {
      (t.exports = r), (r.displayName = 'css'), (r.aliases = []);
      function r(n) {
        (function (o) {
          var l =
            /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
          (o.languages.css = {
            comment: /\/\*[\s\S]*?\*\//,
            atrule: {
              pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
              inside: {
                rule: /^@[\w-]+/,
                'selector-function-argument': {
                  pattern:
                    /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                  lookbehind: !0,
                  alias: 'selector',
                },
                keyword: {
                  pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                  lookbehind: !0,
                },
              },
            },
            url: {
              pattern: RegExp(
                '\\burl\\((?:' +
                  l.source +
                  '|' +
                  /(?:[^\\\r\n()"']|\\[\s\S])*/.source +
                  ')\\)',
                'i'
              ),
              greedy: !0,
              inside: {
                function: /^url/i,
                punctuation: /^\(|\)$/,
                string: { pattern: RegExp('^' + l.source + '$'), alias: 'url' },
              },
            },
            selector: {
              pattern: RegExp(
                `(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` +
                  l.source +
                  ')*(?=\\s*\\{)'
              ),
              lookbehind: !0,
            },
            string: { pattern: l, greedy: !0 },
            property: {
              pattern:
                /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
              lookbehind: !0,
            },
            important: /!important\b/i,
            function: {
              pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
              lookbehind: !0,
            },
            punctuation: /[(){};:,]/,
          }),
            (o.languages.css.atrule.inside.rest = o.languages.css);
          var i = o.languages.markup;
          i &&
            (i.tag.addInlined('style', 'css'),
            i.tag.addAttribute('style', 'css'));
        })(n);
      }
    },
  }),
  cs = B({
    '../../node_modules/refractor/lang/markup.js'(e, t) {
      (t.exports = r),
        (r.displayName = 'markup'),
        (r.aliases = ['html', 'mathml', 'svg', 'xml', 'ssml', 'atom', 'rss']);
      function r(n) {
        (n.languages.markup = {
          comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 },
          prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 },
          doctype: {
            pattern:
              /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
            greedy: !0,
            inside: {
              'internal-subset': {
                pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
                lookbehind: !0,
                greedy: !0,
                inside: null,
              },
              string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
              punctuation: /^<!|>$|[[\]]/,
              'doctype-tag': /^DOCTYPE/i,
              name: /[^\s<>'"]+/,
            },
          },
          cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 },
          tag: {
            pattern:
              /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
            greedy: !0,
            inside: {
              tag: {
                pattern: /^<\/?[^\s>\/]+/,
                inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
              },
              'special-attr': [],
              'attr-value': {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                inside: {
                  punctuation: [{ pattern: /^=/, alias: 'attr-equals' }, /"|'/],
                },
              },
              punctuation: /\/?>/,
              'attr-name': {
                pattern: /[^\s>\/]+/,
                inside: { namespace: /^[^\s>\/:]+:/ },
              },
            },
          },
          entity: [
            { pattern: /&[\da-z]{1,8};/i, alias: 'named-entity' },
            /&#x?[\da-f]{1,8};/i,
          ],
        }),
          (n.languages.markup.tag.inside['attr-value'].inside.entity =
            n.languages.markup.entity),
          (n.languages.markup.doctype.inside['internal-subset'].inside =
            n.languages.markup),
          n.hooks.add('wrap', function (o) {
            o.type === 'entity' &&
              (o.attributes.title = o.content.value.replace(/&amp;/, '&'));
          }),
          Object.defineProperty(n.languages.markup.tag, 'addInlined', {
            value: function (o, l) {
              var i = {};
              (i['language-' + l] = {
                pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
                lookbehind: !0,
                inside: n.languages[l],
              }),
                (i.cdata = /^<!\[CDATA\[|\]\]>$/i);
              var s = {
                'included-cdata': {
                  pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                  inside: i,
                },
              };
              s['language-' + l] = {
                pattern: /[\s\S]+/,
                inside: n.languages[l],
              };
              var c = {};
              (c[o] = {
                pattern: RegExp(
                  /(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(
                    /__/g,
                    function () {
                      return o;
                    }
                  ),
                  'i'
                ),
                lookbehind: !0,
                greedy: !0,
                inside: s,
              }),
                n.languages.insertBefore('markup', 'cdata', c);
            },
          }),
          Object.defineProperty(n.languages.markup.tag, 'addAttribute', {
            value: function (o, l) {
              n.languages.markup.tag.inside['special-attr'].push({
                pattern: RegExp(
                  /(^|["'\s])/.source +
                    '(?:' +
                    o +
                    ')' +
                    /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
                  'i'
                ),
                lookbehind: !0,
                inside: {
                  'attr-name': /^[^\s=]+/,
                  'attr-value': {
                    pattern: /=[\s\S]+/,
                    inside: {
                      value: {
                        pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                        lookbehind: !0,
                        alias: [l, 'language-' + l],
                        inside: n.languages[l],
                      },
                      punctuation: [
                        { pattern: /^=/, alias: 'attr-equals' },
                        /"|'/,
                      ],
                    },
                  },
                },
              });
            },
          }),
          (n.languages.html = n.languages.markup),
          (n.languages.mathml = n.languages.markup),
          (n.languages.svg = n.languages.markup),
          (n.languages.xml = n.languages.extend('markup', {})),
          (n.languages.ssml = n.languages.xml),
          (n.languages.atom = n.languages.xml),
          (n.languages.rss = n.languages.xml);
      }
    },
  }),
  K1 = B({
    '../../node_modules/xtend/immutable.js'(e, t) {
      t.exports = n;
      var r = Object.prototype.hasOwnProperty;
      function n() {
        for (var o = {}, l = 0; l < arguments.length; l++) {
          var i = arguments[l];
          for (var s in i) r.call(i, s) && (o[s] = i[s]);
        }
        return o;
      }
    },
  }),
  us = B({
    '../../node_modules/property-information/lib/util/schema.js'(e, t) {
      t.exports = n;
      var r = n.prototype;
      (r.space = null), (r.normal = {}), (r.property = {});
      function n(o, l, i) {
        (this.property = o), (this.normal = l), i && (this.space = i);
      }
    },
  }),
  X1 = B({
    '../../node_modules/property-information/lib/util/merge.js'(e, t) {
      var r = K1(),
        n = us();
      t.exports = o;
      function o(l) {
        for (var i = l.length, s = [], c = [], u = -1, d, h; ++u < i; )
          (d = l[u]), s.push(d.property), c.push(d.normal), (h = d.space);
        return new n(r.apply(null, s), r.apply(null, c), h);
      }
    },
  }),
  ao = B({
    '../../node_modules/property-information/normalize.js'(e, t) {
      t.exports = r;
      function r(n) {
        return n.toLowerCase();
      }
    },
  }),
  ds = B({
    '../../node_modules/property-information/lib/util/info.js'(e, t) {
      t.exports = n;
      var r = n.prototype;
      (r.space = null),
        (r.attribute = null),
        (r.property = null),
        (r.boolean = !1),
        (r.booleanish = !1),
        (r.overloadedBoolean = !1),
        (r.number = !1),
        (r.commaSeparated = !1),
        (r.spaceSeparated = !1),
        (r.commaOrSpaceSeparated = !1),
        (r.mustUseProperty = !1),
        (r.defined = !1);
      function n(o, l) {
        (this.property = o), (this.attribute = l);
      }
    },
  }),
  oo = B({
    '../../node_modules/property-information/lib/util/types.js'(e) {
      var t = 0;
      (e.boolean = r()),
        (e.booleanish = r()),
        (e.overloadedBoolean = r()),
        (e.number = r()),
        (e.spaceSeparated = r()),
        (e.commaSeparated = r()),
        (e.commaOrSpaceSeparated = r());
      function r() {
        return Math.pow(2, ++t);
      }
    },
  }),
  ps = B({
    '../../node_modules/property-information/lib/util/defined-info.js'(e, t) {
      var r = ds(),
        n = oo();
      (t.exports = i), (i.prototype = new r()), (i.prototype.defined = !0);
      var o = [
          'boolean',
          'booleanish',
          'overloadedBoolean',
          'number',
          'commaSeparated',
          'spaceSeparated',
          'commaOrSpaceSeparated',
        ],
        l = o.length;
      function i(c, u, d, h) {
        var m = -1,
          p;
        for (s(this, 'space', h), r.call(this, c, u); ++m < l; )
          (p = o[m]), s(this, p, (d & n[p]) === n[p]);
      }
      function s(c, u, d) {
        d && (c[u] = d);
      }
    },
  }),
  Rr = B({
    '../../node_modules/property-information/lib/util/create.js'(e, t) {
      var r = ao(),
        n = us(),
        o = ps();
      t.exports = l;
      function l(i) {
        var s = i.space,
          c = i.mustUseProperty || [],
          u = i.attributes || {},
          d = i.properties,
          h = i.transform,
          m = {},
          p = {},
          g,
          f;
        for (g in d)
          (f = new o(g, h(u, g), d[g], s)),
            c.indexOf(g) !== -1 && (f.mustUseProperty = !0),
            (m[g] = f),
            (p[r(g)] = g),
            (p[r(f.attribute)] = g);
        return new n(m, p, s);
      }
    },
  }),
  J1 = B({
    '../../node_modules/property-information/lib/xlink.js'(e, t) {
      var r = Rr();
      t.exports = r({
        space: 'xlink',
        transform: n,
        properties: {
          xLinkActuate: null,
          xLinkArcRole: null,
          xLinkHref: null,
          xLinkRole: null,
          xLinkShow: null,
          xLinkTitle: null,
          xLinkType: null,
        },
      });
      function n(o, l) {
        return 'xlink:' + l.slice(5).toLowerCase();
      }
    },
  }),
  Q1 = B({
    '../../node_modules/property-information/lib/xml.js'(e, t) {
      var r = Rr();
      t.exports = r({
        space: 'xml',
        transform: n,
        properties: { xmlLang: null, xmlBase: null, xmlSpace: null },
      });
      function n(o, l) {
        return 'xml:' + l.slice(3).toLowerCase();
      }
    },
  }),
  ed = B({
    '../../node_modules/property-information/lib/util/case-sensitive-transform.js'(
      e,
      t
    ) {
      t.exports = r;
      function r(n, o) {
        return o in n ? n[o] : o;
      }
    },
  }),
  fs = B({
    '../../node_modules/property-information/lib/util/case-insensitive-transform.js'(
      e,
      t
    ) {
      var r = ed();
      t.exports = n;
      function n(o, l) {
        return r(o, l.toLowerCase());
      }
    },
  }),
  td = B({
    '../../node_modules/property-information/lib/xmlns.js'(e, t) {
      var r = Rr(),
        n = fs();
      t.exports = r({
        space: 'xmlns',
        attributes: { xmlnsxlink: 'xmlns:xlink' },
        transform: n,
        properties: { xmlns: null, xmlnsXLink: null },
      });
    },
  }),
  rd = B({
    '../../node_modules/property-information/lib/aria.js'(e, t) {
      var r = oo(),
        n = Rr(),
        o = r.booleanish,
        l = r.number,
        i = r.spaceSeparated;
      t.exports = n({
        transform: s,
        properties: {
          ariaActiveDescendant: null,
          ariaAtomic: o,
          ariaAutoComplete: null,
          ariaBusy: o,
          ariaChecked: o,
          ariaColCount: l,
          ariaColIndex: l,
          ariaColSpan: l,
          ariaControls: i,
          ariaCurrent: null,
          ariaDescribedBy: i,
          ariaDetails: null,
          ariaDisabled: o,
          ariaDropEffect: i,
          ariaErrorMessage: null,
          ariaExpanded: o,
          ariaFlowTo: i,
          ariaGrabbed: o,
          ariaHasPopup: null,
          ariaHidden: o,
          ariaInvalid: null,
          ariaKeyShortcuts: null,
          ariaLabel: null,
          ariaLabelledBy: i,
          ariaLevel: l,
          ariaLive: null,
          ariaModal: o,
          ariaMultiLine: o,
          ariaMultiSelectable: o,
          ariaOrientation: null,
          ariaOwns: i,
          ariaPlaceholder: null,
          ariaPosInSet: l,
          ariaPressed: o,
          ariaReadOnly: o,
          ariaRelevant: null,
          ariaRequired: o,
          ariaRoleDescription: i,
          ariaRowCount: l,
          ariaRowIndex: l,
          ariaRowSpan: l,
          ariaSelected: o,
          ariaSetSize: l,
          ariaSort: null,
          ariaValueMax: l,
          ariaValueMin: l,
          ariaValueNow: l,
          ariaValueText: null,
          role: null,
        },
      });
      function s(c, u) {
        return u === 'role' ? u : 'aria-' + u.slice(4).toLowerCase();
      }
    },
  }),
  nd = B({
    '../../node_modules/property-information/lib/html.js'(e, t) {
      var r = oo(),
        n = Rr(),
        o = fs(),
        l = r.boolean,
        i = r.overloadedBoolean,
        s = r.booleanish,
        c = r.number,
        u = r.spaceSeparated,
        d = r.commaSeparated;
      t.exports = n({
        space: 'html',
        attributes: {
          acceptcharset: 'accept-charset',
          classname: 'class',
          htmlfor: 'for',
          httpequiv: 'http-equiv',
        },
        transform: o,
        mustUseProperty: ['checked', 'multiple', 'muted', 'selected'],
        properties: {
          abbr: null,
          accept: d,
          acceptCharset: u,
          accessKey: u,
          action: null,
          allow: null,
          allowFullScreen: l,
          allowPaymentRequest: l,
          allowUserMedia: l,
          alt: null,
          as: null,
          async: l,
          autoCapitalize: null,
          autoComplete: u,
          autoFocus: l,
          autoPlay: l,
          capture: l,
          charSet: null,
          checked: l,
          cite: null,
          className: u,
          cols: c,
          colSpan: null,
          content: null,
          contentEditable: s,
          controls: l,
          controlsList: u,
          coords: c | d,
          crossOrigin: null,
          data: null,
          dateTime: null,
          decoding: null,
          default: l,
          defer: l,
          dir: null,
          dirName: null,
          disabled: l,
          download: i,
          draggable: s,
          encType: null,
          enterKeyHint: null,
          form: null,
          formAction: null,
          formEncType: null,
          formMethod: null,
          formNoValidate: l,
          formTarget: null,
          headers: u,
          height: c,
          hidden: l,
          high: c,
          href: null,
          hrefLang: null,
          htmlFor: u,
          httpEquiv: u,
          id: null,
          imageSizes: null,
          imageSrcSet: d,
          inputMode: null,
          integrity: null,
          is: null,
          isMap: l,
          itemId: null,
          itemProp: u,
          itemRef: u,
          itemScope: l,
          itemType: u,
          kind: null,
          label: null,
          lang: null,
          language: null,
          list: null,
          loading: null,
          loop: l,
          low: c,
          manifest: null,
          max: null,
          maxLength: c,
          media: null,
          method: null,
          min: null,
          minLength: c,
          multiple: l,
          muted: l,
          name: null,
          nonce: null,
          noModule: l,
          noValidate: l,
          onAbort: null,
          onAfterPrint: null,
          onAuxClick: null,
          onBeforePrint: null,
          onBeforeUnload: null,
          onBlur: null,
          onCancel: null,
          onCanPlay: null,
          onCanPlayThrough: null,
          onChange: null,
          onClick: null,
          onClose: null,
          onContextMenu: null,
          onCopy: null,
          onCueChange: null,
          onCut: null,
          onDblClick: null,
          onDrag: null,
          onDragEnd: null,
          onDragEnter: null,
          onDragExit: null,
          onDragLeave: null,
          onDragOver: null,
          onDragStart: null,
          onDrop: null,
          onDurationChange: null,
          onEmptied: null,
          onEnded: null,
          onError: null,
          onFocus: null,
          onFormData: null,
          onHashChange: null,
          onInput: null,
          onInvalid: null,
          onKeyDown: null,
          onKeyPress: null,
          onKeyUp: null,
          onLanguageChange: null,
          onLoad: null,
          onLoadedData: null,
          onLoadedMetadata: null,
          onLoadEnd: null,
          onLoadStart: null,
          onMessage: null,
          onMessageError: null,
          onMouseDown: null,
          onMouseEnter: null,
          onMouseLeave: null,
          onMouseMove: null,
          onMouseOut: null,
          onMouseOver: null,
          onMouseUp: null,
          onOffline: null,
          onOnline: null,
          onPageHide: null,
          onPageShow: null,
          onPaste: null,
          onPause: null,
          onPlay: null,
          onPlaying: null,
          onPopState: null,
          onProgress: null,
          onRateChange: null,
          onRejectionHandled: null,
          onReset: null,
          onResize: null,
          onScroll: null,
          onSecurityPolicyViolation: null,
          onSeeked: null,
          onSeeking: null,
          onSelect: null,
          onSlotChange: null,
          onStalled: null,
          onStorage: null,
          onSubmit: null,
          onSuspend: null,
          onTimeUpdate: null,
          onToggle: null,
          onUnhandledRejection: null,
          onUnload: null,
          onVolumeChange: null,
          onWaiting: null,
          onWheel: null,
          open: l,
          optimum: c,
          pattern: null,
          ping: u,
          placeholder: null,
          playsInline: l,
          poster: null,
          preload: null,
          readOnly: l,
          referrerPolicy: null,
          rel: u,
          required: l,
          reversed: l,
          rows: c,
          rowSpan: c,
          sandbox: u,
          scope: null,
          scoped: l,
          seamless: l,
          selected: l,
          shape: null,
          size: c,
          sizes: null,
          slot: null,
          span: c,
          spellCheck: s,
          src: null,
          srcDoc: null,
          srcLang: null,
          srcSet: d,
          start: c,
          step: null,
          style: null,
          tabIndex: c,
          target: null,
          title: null,
          translate: null,
          type: null,
          typeMustMatch: l,
          useMap: null,
          value: s,
          width: c,
          wrap: null,
          align: null,
          aLink: null,
          archive: u,
          axis: null,
          background: null,
          bgColor: null,
          border: c,
          borderColor: null,
          bottomMargin: c,
          cellPadding: null,
          cellSpacing: null,
          char: null,
          charOff: null,
          classId: null,
          clear: null,
          code: null,
          codeBase: null,
          codeType: null,
          color: null,
          compact: l,
          declare: l,
          event: null,
          face: null,
          frame: null,
          frameBorder: null,
          hSpace: c,
          leftMargin: c,
          link: null,
          longDesc: null,
          lowSrc: null,
          marginHeight: c,
          marginWidth: c,
          noResize: l,
          noHref: l,
          noShade: l,
          noWrap: l,
          object: null,
          profile: null,
          prompt: null,
          rev: null,
          rightMargin: c,
          rules: null,
          scheme: null,
          scrolling: s,
          standby: null,
          summary: null,
          text: null,
          topMargin: c,
          valueType: null,
          version: null,
          vAlign: null,
          vLink: null,
          vSpace: c,
          allowTransparency: null,
          autoCorrect: null,
          autoSave: null,
          disablePictureInPicture: l,
          disableRemotePlayback: l,
          prefix: null,
          property: null,
          results: c,
          security: null,
          unselectable: null,
        },
      });
    },
  }),
  ad = B({
    '../../node_modules/property-information/html.js'(e, t) {
      var r = X1(),
        n = J1(),
        o = Q1(),
        l = td(),
        i = rd(),
        s = nd();
      t.exports = r([o, n, l, i, s]);
    },
  }),
  od = B({
    '../../node_modules/property-information/find.js'(e, t) {
      var r = ao(),
        n = ps(),
        o = ds(),
        l = 'data';
      t.exports = u;
      var i = /^data[-\w.:]+$/i,
        s = /-[a-z]/g,
        c = /[A-Z]/g;
      function u(g, f) {
        var A = r(f),
          w = f,
          v = o;
        return A in g.normal
          ? g.property[g.normal[A]]
          : (A.length > 4 &&
              A.slice(0, 4) === l &&
              i.test(f) &&
              (f.charAt(4) === '-' ? (w = d(f)) : (f = h(f)), (v = n)),
            new v(w, f));
      }
      function d(g) {
        var f = g.slice(5).replace(s, p);
        return l + f.charAt(0).toUpperCase() + f.slice(1);
      }
      function h(g) {
        var f = g.slice(4);
        return s.test(f)
          ? g
          : ((f = f.replace(c, m)),
            f.charAt(0) !== '-' && (f = '-' + f),
            l + f);
      }
      function m(g) {
        return '-' + g.toLowerCase();
      }
      function p(g) {
        return g.charAt(1).toUpperCase();
      }
    },
  }),
  ld = B({
    '../../node_modules/hast-util-parse-selector/index.js'(e, t) {
      t.exports = n;
      var r = /[#.]/g;
      function n(o, l) {
        for (
          var i = o || '', s = l || 'div', c = {}, u = 0, d, h, m;
          u < i.length;

        )
          (r.lastIndex = u),
            (m = r.exec(i)),
            (d = i.slice(u, m ? m.index : i.length)),
            d &&
              (h
                ? h === '#'
                  ? (c.id = d)
                  : c.className
                    ? c.className.push(d)
                    : (c.className = [d])
                : (s = d),
              (u += d.length)),
            m && ((h = m[0]), u++);
        return { type: 'element', tagName: s, properties: c, children: [] };
      }
    },
  }),
  id = B({
    '../../node_modules/space-separated-tokens/index.js'(e) {
      (e.parse = o), (e.stringify = l);
      var t = '',
        r = ' ',
        n = /[ \t\n\r\f]+/g;
      function o(i) {
        var s = String(i || t).trim();
        return s === t ? [] : s.split(n);
      }
      function l(i) {
        return i.join(r).trim();
      }
    },
  }),
  sd = B({
    '../../node_modules/comma-separated-tokens/index.js'(e) {
      (e.parse = o), (e.stringify = l);
      var t = ',',
        r = ' ',
        n = '';
      function o(i) {
        for (
          var s = [], c = String(i || n), u = c.indexOf(t), d = 0, h = !1, m;
          !h;

        )
          u === -1 && ((u = c.length), (h = !0)),
            (m = c.slice(d, u).trim()),
            (m || !h) && s.push(m),
            (d = u + 1),
            (u = c.indexOf(t, d));
        return s;
      }
      function l(i, s) {
        var c = s || {},
          u = c.padLeft === !1 ? n : r,
          d = c.padRight ? r : n;
        return (
          i[i.length - 1] === n && (i = i.concat(n)), i.join(d + t + u).trim()
        );
      }
    },
  }),
  cd = B({
    '../../node_modules/hastscript/factory.js'(e, t) {
      var r = od(),
        n = ao(),
        o = ld(),
        l = id().parse,
        i = sd().parse;
      t.exports = c;
      var s = {}.hasOwnProperty;
      function c(A, w, v) {
        var y = v ? f(v) : null;
        return x;
        function x(C, S) {
          var k = o(C, w),
            R = Array.prototype.slice.call(arguments, 2),
            O = k.tagName.toLowerCase(),
            L;
          if (
            ((k.tagName = y && s.call(y, O) ? y[O] : O),
            S && u(S, k) && (R.unshift(S), (S = null)),
            S)
          )
            for (L in S) E(k.properties, L, S[L]);
          return (
            h(k.children, R),
            k.tagName === 'template' &&
              ((k.content = { type: 'root', children: k.children }),
              (k.children = [])),
            k
          );
        }
        function E(C, S, k) {
          var R, O, L;
          k == null ||
            k !== k ||
            ((R = r(A, S)),
            (O = R.property),
            (L = k),
            typeof L == 'string' &&
              (R.spaceSeparated
                ? (L = l(L))
                : R.commaSeparated
                  ? (L = i(L))
                  : R.commaOrSpaceSeparated && (L = l(i(L).join(' ')))),
            O === 'style' && typeof k != 'string' && (L = g(L)),
            O === 'className' && C.className && (L = C.className.concat(L)),
            (C[O] = m(R, O, L)));
        }
      }
      function u(A, w) {
        return typeof A == 'string' || 'length' in A || d(w.tagName, A);
      }
      function d(A, w) {
        var v = w.type;
        return A === 'input' || !v || typeof v != 'string'
          ? !1
          : typeof w.children == 'object' && 'length' in w.children
            ? !0
            : ((v = v.toLowerCase()),
              A === 'button'
                ? v !== 'menu' &&
                  v !== 'submit' &&
                  v !== 'reset' &&
                  v !== 'button'
                : 'value' in w);
      }
      function h(A, w) {
        var v, y;
        if (typeof w == 'string' || typeof w == 'number') {
          A.push({ type: 'text', value: String(w) });
          return;
        }
        if (typeof w == 'object' && 'length' in w) {
          for (v = -1, y = w.length; ++v < y; ) h(A, w[v]);
          return;
        }
        if (typeof w != 'object' || !('type' in w))
          throw new Error('Expected node, nodes, or string, got `' + w + '`');
        A.push(w);
      }
      function m(A, w, v) {
        var y, x, E;
        if (typeof v != 'object' || !('length' in v)) return p(A, w, v);
        for (x = v.length, y = -1, E = []; ++y < x; ) E[y] = p(A, w, v[y]);
        return E;
      }
      function p(A, w, v) {
        var y = v;
        return (
          A.number || A.positiveNumber
            ? !isNaN(y) && y !== '' && (y = Number(y))
            : (A.boolean || A.overloadedBoolean) &&
              typeof y == 'string' &&
              (y === '' || n(v) === n(w)) &&
              (y = !0),
          y
        );
      }
      function g(A) {
        var w = [],
          v;
        for (v in A) w.push([v, A[v]].join(': '));
        return w.join('; ');
      }
      function f(A) {
        for (var w = A.length, v = -1, y = {}, x; ++v < w; )
          (x = A[v]), (y[x.toLowerCase()] = x);
        return y;
      }
    },
  }),
  ud = B({
    '../../node_modules/hastscript/html.js'(e, t) {
      var r = ad(),
        n = cd(),
        o = n(r, 'div');
      (o.displayName = 'html'), (t.exports = o);
    },
  }),
  dd = B({
    '../../node_modules/hastscript/index.js'(e, t) {
      t.exports = ud();
    },
  }),
  pd = B({
    '../../node_modules/parse-entities/node_modules/character-entities-legacy/index.json'(
      e,
      t
    ) {
      t.exports = {
        AElig: 'Æ',
        AMP: '&',
        Aacute: 'Á',
        Acirc: 'Â',
        Agrave: 'À',
        Aring: 'Å',
        Atilde: 'Ã',
        Auml: 'Ä',
        COPY: '©',
        Ccedil: 'Ç',
        ETH: 'Ð',
        Eacute: 'É',
        Ecirc: 'Ê',
        Egrave: 'È',
        Euml: 'Ë',
        GT: '>',
        Iacute: 'Í',
        Icirc: 'Î',
        Igrave: 'Ì',
        Iuml: 'Ï',
        LT: '<',
        Ntilde: 'Ñ',
        Oacute: 'Ó',
        Ocirc: 'Ô',
        Ograve: 'Ò',
        Oslash: 'Ø',
        Otilde: 'Õ',
        Ouml: 'Ö',
        QUOT: '"',
        REG: '®',
        THORN: 'Þ',
        Uacute: 'Ú',
        Ucirc: 'Û',
        Ugrave: 'Ù',
        Uuml: 'Ü',
        Yacute: 'Ý',
        aacute: 'á',
        acirc: 'â',
        acute: '´',
        aelig: 'æ',
        agrave: 'à',
        amp: '&',
        aring: 'å',
        atilde: 'ã',
        auml: 'ä',
        brvbar: '¦',
        ccedil: 'ç',
        cedil: '¸',
        cent: '¢',
        copy: '©',
        curren: '¤',
        deg: '°',
        divide: '÷',
        eacute: 'é',
        ecirc: 'ê',
        egrave: 'è',
        eth: 'ð',
        euml: 'ë',
        frac12: '½',
        frac14: '¼',
        frac34: '¾',
        gt: '>',
        iacute: 'í',
        icirc: 'î',
        iexcl: '¡',
        igrave: 'ì',
        iquest: '¿',
        iuml: 'ï',
        laquo: '«',
        lt: '<',
        macr: '¯',
        micro: 'µ',
        middot: '·',
        nbsp: ' ',
        not: '¬',
        ntilde: 'ñ',
        oacute: 'ó',
        ocirc: 'ô',
        ograve: 'ò',
        ordf: 'ª',
        ordm: 'º',
        oslash: 'ø',
        otilde: 'õ',
        ouml: 'ö',
        para: '¶',
        plusmn: '±',
        pound: '£',
        quot: '"',
        raquo: '»',
        reg: '®',
        sect: '§',
        shy: '­',
        sup1: '¹',
        sup2: '²',
        sup3: '³',
        szlig: 'ß',
        thorn: 'þ',
        times: '×',
        uacute: 'ú',
        ucirc: 'û',
        ugrave: 'ù',
        uml: '¨',
        uuml: 'ü',
        yacute: 'ý',
        yen: '¥',
        yuml: 'ÿ',
      };
    },
  }),
  fd = B({
    '../../node_modules/character-reference-invalid/index.json'(e, t) {
      t.exports = {
        0: '�',
        128: '€',
        130: '‚',
        131: 'ƒ',
        132: '„',
        133: '…',
        134: '†',
        135: '‡',
        136: 'ˆ',
        137: '‰',
        138: 'Š',
        139: '‹',
        140: 'Œ',
        142: 'Ž',
        145: '‘',
        146: '’',
        147: '“',
        148: '”',
        149: '•',
        150: '–',
        151: '—',
        152: '˜',
        153: '™',
        154: 'š',
        155: '›',
        156: 'œ',
        158: 'ž',
        159: 'Ÿ',
      };
    },
  }),
  ms = B({
    '../../node_modules/is-decimal/index.js'(e, t) {
      t.exports = r;
      function r(n) {
        var o = typeof n == 'string' ? n.charCodeAt(0) : n;
        return o >= 48 && o <= 57;
      }
    },
  }),
  md = B({
    '../../node_modules/is-hexadecimal/index.js'(e, t) {
      t.exports = r;
      function r(n) {
        var o = typeof n == 'string' ? n.charCodeAt(0) : n;
        return (
          (o >= 97 && o <= 102) || (o >= 65 && o <= 70) || (o >= 48 && o <= 57)
        );
      }
    },
  }),
  gd = B({
    '../../node_modules/is-alphabetical/index.js'(e, t) {
      t.exports = r;
      function r(n) {
        var o = typeof n == 'string' ? n.charCodeAt(0) : n;
        return (o >= 97 && o <= 122) || (o >= 65 && o <= 90);
      }
    },
  }),
  hd = B({
    '../../node_modules/is-alphanumerical/index.js'(e, t) {
      var r = gd(),
        n = ms();
      t.exports = o;
      function o(l) {
        return r(l) || n(l);
      }
    },
  }),
  bd = B({
    '../../node_modules/parse-entities/node_modules/character-entities/index.json'(
      e,
      t
    ) {
      t.exports = {
        AEli: 'Æ',
        AElig: 'Æ',
        AM: '&',
        AMP: '&',
        Aacut: 'Á',
        Aacute: 'Á',
        Abreve: 'Ă',
        Acir: 'Â',
        Acirc: 'Â',
        Acy: 'А',
        Afr: '𝔄',
        Agrav: 'À',
        Agrave: 'À',
        Alpha: 'Α',
        Amacr: 'Ā',
        And: '⩓',
        Aogon: 'Ą',
        Aopf: '𝔸',
        ApplyFunction: '⁡',
        Arin: 'Å',
        Aring: 'Å',
        Ascr: '𝒜',
        Assign: '≔',
        Atild: 'Ã',
        Atilde: 'Ã',
        Aum: 'Ä',
        Auml: 'Ä',
        Backslash: '∖',
        Barv: '⫧',
        Barwed: '⌆',
        Bcy: 'Б',
        Because: '∵',
        Bernoullis: 'ℬ',
        Beta: 'Β',
        Bfr: '𝔅',
        Bopf: '𝔹',
        Breve: '˘',
        Bscr: 'ℬ',
        Bumpeq: '≎',
        CHcy: 'Ч',
        COP: '©',
        COPY: '©',
        Cacute: 'Ć',
        Cap: '⋒',
        CapitalDifferentialD: 'ⅅ',
        Cayleys: 'ℭ',
        Ccaron: 'Č',
        Ccedi: 'Ç',
        Ccedil: 'Ç',
        Ccirc: 'Ĉ',
        Cconint: '∰',
        Cdot: 'Ċ',
        Cedilla: '¸',
        CenterDot: '·',
        Cfr: 'ℭ',
        Chi: 'Χ',
        CircleDot: '⊙',
        CircleMinus: '⊖',
        CirclePlus: '⊕',
        CircleTimes: '⊗',
        ClockwiseContourIntegral: '∲',
        CloseCurlyDoubleQuote: '”',
        CloseCurlyQuote: '’',
        Colon: '∷',
        Colone: '⩴',
        Congruent: '≡',
        Conint: '∯',
        ContourIntegral: '∮',
        Copf: 'ℂ',
        Coproduct: '∐',
        CounterClockwiseContourIntegral: '∳',
        Cross: '⨯',
        Cscr: '𝒞',
        Cup: '⋓',
        CupCap: '≍',
        DD: 'ⅅ',
        DDotrahd: '⤑',
        DJcy: 'Ђ',
        DScy: 'Ѕ',
        DZcy: 'Џ',
        Dagger: '‡',
        Darr: '↡',
        Dashv: '⫤',
        Dcaron: 'Ď',
        Dcy: 'Д',
        Del: '∇',
        Delta: 'Δ',
        Dfr: '𝔇',
        DiacriticalAcute: '´',
        DiacriticalDot: '˙',
        DiacriticalDoubleAcute: '˝',
        DiacriticalGrave: '`',
        DiacriticalTilde: '˜',
        Diamond: '⋄',
        DifferentialD: 'ⅆ',
        Dopf: '𝔻',
        Dot: '¨',
        DotDot: '⃜',
        DotEqual: '≐',
        DoubleContourIntegral: '∯',
        DoubleDot: '¨',
        DoubleDownArrow: '⇓',
        DoubleLeftArrow: '⇐',
        DoubleLeftRightArrow: '⇔',
        DoubleLeftTee: '⫤',
        DoubleLongLeftArrow: '⟸',
        DoubleLongLeftRightArrow: '⟺',
        DoubleLongRightArrow: '⟹',
        DoubleRightArrow: '⇒',
        DoubleRightTee: '⊨',
        DoubleUpArrow: '⇑',
        DoubleUpDownArrow: '⇕',
        DoubleVerticalBar: '∥',
        DownArrow: '↓',
        DownArrowBar: '⤓',
        DownArrowUpArrow: '⇵',
        DownBreve: '̑',
        DownLeftRightVector: '⥐',
        DownLeftTeeVector: '⥞',
        DownLeftVector: '↽',
        DownLeftVectorBar: '⥖',
        DownRightTeeVector: '⥟',
        DownRightVector: '⇁',
        DownRightVectorBar: '⥗',
        DownTee: '⊤',
        DownTeeArrow: '↧',
        Downarrow: '⇓',
        Dscr: '𝒟',
        Dstrok: 'Đ',
        ENG: 'Ŋ',
        ET: 'Ð',
        ETH: 'Ð',
        Eacut: 'É',
        Eacute: 'É',
        Ecaron: 'Ě',
        Ecir: 'Ê',
        Ecirc: 'Ê',
        Ecy: 'Э',
        Edot: 'Ė',
        Efr: '𝔈',
        Egrav: 'È',
        Egrave: 'È',
        Element: '∈',
        Emacr: 'Ē',
        EmptySmallSquare: '◻',
        EmptyVerySmallSquare: '▫',
        Eogon: 'Ę',
        Eopf: '𝔼',
        Epsilon: 'Ε',
        Equal: '⩵',
        EqualTilde: '≂',
        Equilibrium: '⇌',
        Escr: 'ℰ',
        Esim: '⩳',
        Eta: 'Η',
        Eum: 'Ë',
        Euml: 'Ë',
        Exists: '∃',
        ExponentialE: 'ⅇ',
        Fcy: 'Ф',
        Ffr: '𝔉',
        FilledSmallSquare: '◼',
        FilledVerySmallSquare: '▪',
        Fopf: '𝔽',
        ForAll: '∀',
        Fouriertrf: 'ℱ',
        Fscr: 'ℱ',
        GJcy: 'Ѓ',
        G: '>',
        GT: '>',
        Gamma: 'Γ',
        Gammad: 'Ϝ',
        Gbreve: 'Ğ',
        Gcedil: 'Ģ',
        Gcirc: 'Ĝ',
        Gcy: 'Г',
        Gdot: 'Ġ',
        Gfr: '𝔊',
        Gg: '⋙',
        Gopf: '𝔾',
        GreaterEqual: '≥',
        GreaterEqualLess: '⋛',
        GreaterFullEqual: '≧',
        GreaterGreater: '⪢',
        GreaterLess: '≷',
        GreaterSlantEqual: '⩾',
        GreaterTilde: '≳',
        Gscr: '𝒢',
        Gt: '≫',
        HARDcy: 'Ъ',
        Hacek: 'ˇ',
        Hat: '^',
        Hcirc: 'Ĥ',
        Hfr: 'ℌ',
        HilbertSpace: 'ℋ',
        Hopf: 'ℍ',
        HorizontalLine: '─',
        Hscr: 'ℋ',
        Hstrok: 'Ħ',
        HumpDownHump: '≎',
        HumpEqual: '≏',
        IEcy: 'Е',
        IJlig: 'Ĳ',
        IOcy: 'Ё',
        Iacut: 'Í',
        Iacute: 'Í',
        Icir: 'Î',
        Icirc: 'Î',
        Icy: 'И',
        Idot: 'İ',
        Ifr: 'ℑ',
        Igrav: 'Ì',
        Igrave: 'Ì',
        Im: 'ℑ',
        Imacr: 'Ī',
        ImaginaryI: 'ⅈ',
        Implies: '⇒',
        Int: '∬',
        Integral: '∫',
        Intersection: '⋂',
        InvisibleComma: '⁣',
        InvisibleTimes: '⁢',
        Iogon: 'Į',
        Iopf: '𝕀',
        Iota: 'Ι',
        Iscr: 'ℐ',
        Itilde: 'Ĩ',
        Iukcy: 'І',
        Ium: 'Ï',
        Iuml: 'Ï',
        Jcirc: 'Ĵ',
        Jcy: 'Й',
        Jfr: '𝔍',
        Jopf: '𝕁',
        Jscr: '𝒥',
        Jsercy: 'Ј',
        Jukcy: 'Є',
        KHcy: 'Х',
        KJcy: 'Ќ',
        Kappa: 'Κ',
        Kcedil: 'Ķ',
        Kcy: 'К',
        Kfr: '𝔎',
        Kopf: '𝕂',
        Kscr: '𝒦',
        LJcy: 'Љ',
        L: '<',
        LT: '<',
        Lacute: 'Ĺ',
        Lambda: 'Λ',
        Lang: '⟪',
        Laplacetrf: 'ℒ',
        Larr: '↞',
        Lcaron: 'Ľ',
        Lcedil: 'Ļ',
        Lcy: 'Л',
        LeftAngleBracket: '⟨',
        LeftArrow: '←',
        LeftArrowBar: '⇤',
        LeftArrowRightArrow: '⇆',
        LeftCeiling: '⌈',
        LeftDoubleBracket: '⟦',
        LeftDownTeeVector: '⥡',
        LeftDownVector: '⇃',
        LeftDownVectorBar: '⥙',
        LeftFloor: '⌊',
        LeftRightArrow: '↔',
        LeftRightVector: '⥎',
        LeftTee: '⊣',
        LeftTeeArrow: '↤',
        LeftTeeVector: '⥚',
        LeftTriangle: '⊲',
        LeftTriangleBar: '⧏',
        LeftTriangleEqual: '⊴',
        LeftUpDownVector: '⥑',
        LeftUpTeeVector: '⥠',
        LeftUpVector: '↿',
        LeftUpVectorBar: '⥘',
        LeftVector: '↼',
        LeftVectorBar: '⥒',
        Leftarrow: '⇐',
        Leftrightarrow: '⇔',
        LessEqualGreater: '⋚',
        LessFullEqual: '≦',
        LessGreater: '≶',
        LessLess: '⪡',
        LessSlantEqual: '⩽',
        LessTilde: '≲',
        Lfr: '𝔏',
        Ll: '⋘',
        Lleftarrow: '⇚',
        Lmidot: 'Ŀ',
        LongLeftArrow: '⟵',
        LongLeftRightArrow: '⟷',
        LongRightArrow: '⟶',
        Longleftarrow: '⟸',
        Longleftrightarrow: '⟺',
        Longrightarrow: '⟹',
        Lopf: '𝕃',
        LowerLeftArrow: '↙',
        LowerRightArrow: '↘',
        Lscr: 'ℒ',
        Lsh: '↰',
        Lstrok: 'Ł',
        Lt: '≪',
        Map: '⤅',
        Mcy: 'М',
        MediumSpace: ' ',
        Mellintrf: 'ℳ',
        Mfr: '𝔐',
        MinusPlus: '∓',
        Mopf: '𝕄',
        Mscr: 'ℳ',
        Mu: 'Μ',
        NJcy: 'Њ',
        Nacute: 'Ń',
        Ncaron: 'Ň',
        Ncedil: 'Ņ',
        Ncy: 'Н',
        NegativeMediumSpace: '​',
        NegativeThickSpace: '​',
        NegativeThinSpace: '​',
        NegativeVeryThinSpace: '​',
        NestedGreaterGreater: '≫',
        NestedLessLess: '≪',
        NewLine: `
`,
        Nfr: '𝔑',
        NoBreak: '⁠',
        NonBreakingSpace: ' ',
        Nopf: 'ℕ',
        Not: '⫬',
        NotCongruent: '≢',
        NotCupCap: '≭',
        NotDoubleVerticalBar: '∦',
        NotElement: '∉',
        NotEqual: '≠',
        NotEqualTilde: '≂̸',
        NotExists: '∄',
        NotGreater: '≯',
        NotGreaterEqual: '≱',
        NotGreaterFullEqual: '≧̸',
        NotGreaterGreater: '≫̸',
        NotGreaterLess: '≹',
        NotGreaterSlantEqual: '⩾̸',
        NotGreaterTilde: '≵',
        NotHumpDownHump: '≎̸',
        NotHumpEqual: '≏̸',
        NotLeftTriangle: '⋪',
        NotLeftTriangleBar: '⧏̸',
        NotLeftTriangleEqual: '⋬',
        NotLess: '≮',
        NotLessEqual: '≰',
        NotLessGreater: '≸',
        NotLessLess: '≪̸',
        NotLessSlantEqual: '⩽̸',
        NotLessTilde: '≴',
        NotNestedGreaterGreater: '⪢̸',
        NotNestedLessLess: '⪡̸',
        NotPrecedes: '⊀',
        NotPrecedesEqual: '⪯̸',
        NotPrecedesSlantEqual: '⋠',
        NotReverseElement: '∌',
        NotRightTriangle: '⋫',
        NotRightTriangleBar: '⧐̸',
        NotRightTriangleEqual: '⋭',
        NotSquareSubset: '⊏̸',
        NotSquareSubsetEqual: '⋢',
        NotSquareSuperset: '⊐̸',
        NotSquareSupersetEqual: '⋣',
        NotSubset: '⊂⃒',
        NotSubsetEqual: '⊈',
        NotSucceeds: '⊁',
        NotSucceedsEqual: '⪰̸',
        NotSucceedsSlantEqual: '⋡',
        NotSucceedsTilde: '≿̸',
        NotSuperset: '⊃⃒',
        NotSupersetEqual: '⊉',
        NotTilde: '≁',
        NotTildeEqual: '≄',
        NotTildeFullEqual: '≇',
        NotTildeTilde: '≉',
        NotVerticalBar: '∤',
        Nscr: '𝒩',
        Ntild: 'Ñ',
        Ntilde: 'Ñ',
        Nu: 'Ν',
        OElig: 'Œ',
        Oacut: 'Ó',
        Oacute: 'Ó',
        Ocir: 'Ô',
        Ocirc: 'Ô',
        Ocy: 'О',
        Odblac: 'Ő',
        Ofr: '𝔒',
        Ograv: 'Ò',
        Ograve: 'Ò',
        Omacr: 'Ō',
        Omega: 'Ω',
        Omicron: 'Ο',
        Oopf: '𝕆',
        OpenCurlyDoubleQuote: '“',
        OpenCurlyQuote: '‘',
        Or: '⩔',
        Oscr: '𝒪',
        Oslas: 'Ø',
        Oslash: 'Ø',
        Otild: 'Õ',
        Otilde: 'Õ',
        Otimes: '⨷',
        Oum: 'Ö',
        Ouml: 'Ö',
        OverBar: '‾',
        OverBrace: '⏞',
        OverBracket: '⎴',
        OverParenthesis: '⏜',
        PartialD: '∂',
        Pcy: 'П',
        Pfr: '𝔓',
        Phi: 'Φ',
        Pi: 'Π',
        PlusMinus: '±',
        Poincareplane: 'ℌ',
        Popf: 'ℙ',
        Pr: '⪻',
        Precedes: '≺',
        PrecedesEqual: '⪯',
        PrecedesSlantEqual: '≼',
        PrecedesTilde: '≾',
        Prime: '″',
        Product: '∏',
        Proportion: '∷',
        Proportional: '∝',
        Pscr: '𝒫',
        Psi: 'Ψ',
        QUO: '"',
        QUOT: '"',
        Qfr: '𝔔',
        Qopf: 'ℚ',
        Qscr: '𝒬',
        RBarr: '⤐',
        RE: '®',
        REG: '®',
        Racute: 'Ŕ',
        Rang: '⟫',
        Rarr: '↠',
        Rarrtl: '⤖',
        Rcaron: 'Ř',
        Rcedil: 'Ŗ',
        Rcy: 'Р',
        Re: 'ℜ',
        ReverseElement: '∋',
        ReverseEquilibrium: '⇋',
        ReverseUpEquilibrium: '⥯',
        Rfr: 'ℜ',
        Rho: 'Ρ',
        RightAngleBracket: '⟩',
        RightArrow: '→',
        RightArrowBar: '⇥',
        RightArrowLeftArrow: '⇄',
        RightCeiling: '⌉',
        RightDoubleBracket: '⟧',
        RightDownTeeVector: '⥝',
        RightDownVector: '⇂',
        RightDownVectorBar: '⥕',
        RightFloor: '⌋',
        RightTee: '⊢',
        RightTeeArrow: '↦',
        RightTeeVector: '⥛',
        RightTriangle: '⊳',
        RightTriangleBar: '⧐',
        RightTriangleEqual: '⊵',
        RightUpDownVector: '⥏',
        RightUpTeeVector: '⥜',
        RightUpVector: '↾',
        RightUpVectorBar: '⥔',
        RightVector: '⇀',
        RightVectorBar: '⥓',
        Rightarrow: '⇒',
        Ropf: 'ℝ',
        RoundImplies: '⥰',
        Rrightarrow: '⇛',
        Rscr: 'ℛ',
        Rsh: '↱',
        RuleDelayed: '⧴',
        SHCHcy: 'Щ',
        SHcy: 'Ш',
        SOFTcy: 'Ь',
        Sacute: 'Ś',
        Sc: '⪼',
        Scaron: 'Š',
        Scedil: 'Ş',
        Scirc: 'Ŝ',
        Scy: 'С',
        Sfr: '𝔖',
        ShortDownArrow: '↓',
        ShortLeftArrow: '←',
        ShortRightArrow: '→',
        ShortUpArrow: '↑',
        Sigma: 'Σ',
        SmallCircle: '∘',
        Sopf: '𝕊',
        Sqrt: '√',
        Square: '□',
        SquareIntersection: '⊓',
        SquareSubset: '⊏',
        SquareSubsetEqual: '⊑',
        SquareSuperset: '⊐',
        SquareSupersetEqual: '⊒',
        SquareUnion: '⊔',
        Sscr: '𝒮',
        Star: '⋆',
        Sub: '⋐',
        Subset: '⋐',
        SubsetEqual: '⊆',
        Succeeds: '≻',
        SucceedsEqual: '⪰',
        SucceedsSlantEqual: '≽',
        SucceedsTilde: '≿',
        SuchThat: '∋',
        Sum: '∑',
        Sup: '⋑',
        Superset: '⊃',
        SupersetEqual: '⊇',
        Supset: '⋑',
        THOR: 'Þ',
        THORN: 'Þ',
        TRADE: '™',
        TSHcy: 'Ћ',
        TScy: 'Ц',
        Tab: '	',
        Tau: 'Τ',
        Tcaron: 'Ť',
        Tcedil: 'Ţ',
        Tcy: 'Т',
        Tfr: '𝔗',
        Therefore: '∴',
        Theta: 'Θ',
        ThickSpace: '  ',
        ThinSpace: ' ',
        Tilde: '∼',
        TildeEqual: '≃',
        TildeFullEqual: '≅',
        TildeTilde: '≈',
        Topf: '𝕋',
        TripleDot: '⃛',
        Tscr: '𝒯',
        Tstrok: 'Ŧ',
        Uacut: 'Ú',
        Uacute: 'Ú',
        Uarr: '↟',
        Uarrocir: '⥉',
        Ubrcy: 'Ў',
        Ubreve: 'Ŭ',
        Ucir: 'Û',
        Ucirc: 'Û',
        Ucy: 'У',
        Udblac: 'Ű',
        Ufr: '𝔘',
        Ugrav: 'Ù',
        Ugrave: 'Ù',
        Umacr: 'Ū',
        UnderBar: '_',
        UnderBrace: '⏟',
        UnderBracket: '⎵',
        UnderParenthesis: '⏝',
        Union: '⋃',
        UnionPlus: '⊎',
        Uogon: 'Ų',
        Uopf: '𝕌',
        UpArrow: '↑',
        UpArrowBar: '⤒',
        UpArrowDownArrow: '⇅',
        UpDownArrow: '↕',
        UpEquilibrium: '⥮',
        UpTee: '⊥',
        UpTeeArrow: '↥',
        Uparrow: '⇑',
        Updownarrow: '⇕',
        UpperLeftArrow: '↖',
        UpperRightArrow: '↗',
        Upsi: 'ϒ',
        Upsilon: 'Υ',
        Uring: 'Ů',
        Uscr: '𝒰',
        Utilde: 'Ũ',
        Uum: 'Ü',
        Uuml: 'Ü',
        VDash: '⊫',
        Vbar: '⫫',
        Vcy: 'В',
        Vdash: '⊩',
        Vdashl: '⫦',
        Vee: '⋁',
        Verbar: '‖',
        Vert: '‖',
        VerticalBar: '∣',
        VerticalLine: '|',
        VerticalSeparator: '❘',
        VerticalTilde: '≀',
        VeryThinSpace: ' ',
        Vfr: '𝔙',
        Vopf: '𝕍',
        Vscr: '𝒱',
        Vvdash: '⊪',
        Wcirc: 'Ŵ',
        Wedge: '⋀',
        Wfr: '𝔚',
        Wopf: '𝕎',
        Wscr: '𝒲',
        Xfr: '𝔛',
        Xi: 'Ξ',
        Xopf: '𝕏',
        Xscr: '𝒳',
        YAcy: 'Я',
        YIcy: 'Ї',
        YUcy: 'Ю',
        Yacut: 'Ý',
        Yacute: 'Ý',
        Ycirc: 'Ŷ',
        Ycy: 'Ы',
        Yfr: '𝔜',
        Yopf: '𝕐',
        Yscr: '𝒴',
        Yuml: 'Ÿ',
        ZHcy: 'Ж',
        Zacute: 'Ź',
        Zcaron: 'Ž',
        Zcy: 'З',
        Zdot: 'Ż',
        ZeroWidthSpace: '​',
        Zeta: 'Ζ',
        Zfr: 'ℨ',
        Zopf: 'ℤ',
        Zscr: '𝒵',
        aacut: 'á',
        aacute: 'á',
        abreve: 'ă',
        ac: '∾',
        acE: '∾̳',
        acd: '∿',
        acir: 'â',
        acirc: 'â',
        acut: '´',
        acute: '´',
        acy: 'а',
        aeli: 'æ',
        aelig: 'æ',
        af: '⁡',
        afr: '𝔞',
        agrav: 'à',
        agrave: 'à',
        alefsym: 'ℵ',
        aleph: 'ℵ',
        alpha: 'α',
        amacr: 'ā',
        amalg: '⨿',
        am: '&',
        amp: '&',
        and: '∧',
        andand: '⩕',
        andd: '⩜',
        andslope: '⩘',
        andv: '⩚',
        ang: '∠',
        ange: '⦤',
        angle: '∠',
        angmsd: '∡',
        angmsdaa: '⦨',
        angmsdab: '⦩',
        angmsdac: '⦪',
        angmsdad: '⦫',
        angmsdae: '⦬',
        angmsdaf: '⦭',
        angmsdag: '⦮',
        angmsdah: '⦯',
        angrt: '∟',
        angrtvb: '⊾',
        angrtvbd: '⦝',
        angsph: '∢',
        angst: 'Å',
        angzarr: '⍼',
        aogon: 'ą',
        aopf: '𝕒',
        ap: '≈',
        apE: '⩰',
        apacir: '⩯',
        ape: '≊',
        apid: '≋',
        apos: "'",
        approx: '≈',
        approxeq: '≊',
        arin: 'å',
        aring: 'å',
        ascr: '𝒶',
        ast: '*',
        asymp: '≈',
        asympeq: '≍',
        atild: 'ã',
        atilde: 'ã',
        aum: 'ä',
        auml: 'ä',
        awconint: '∳',
        awint: '⨑',
        bNot: '⫭',
        backcong: '≌',
        backepsilon: '϶',
        backprime: '‵',
        backsim: '∽',
        backsimeq: '⋍',
        barvee: '⊽',
        barwed: '⌅',
        barwedge: '⌅',
        bbrk: '⎵',
        bbrktbrk: '⎶',
        bcong: '≌',
        bcy: 'б',
        bdquo: '„',
        becaus: '∵',
        because: '∵',
        bemptyv: '⦰',
        bepsi: '϶',
        bernou: 'ℬ',
        beta: 'β',
        beth: 'ℶ',
        between: '≬',
        bfr: '𝔟',
        bigcap: '⋂',
        bigcirc: '◯',
        bigcup: '⋃',
        bigodot: '⨀',
        bigoplus: '⨁',
        bigotimes: '⨂',
        bigsqcup: '⨆',
        bigstar: '★',
        bigtriangledown: '▽',
        bigtriangleup: '△',
        biguplus: '⨄',
        bigvee: '⋁',
        bigwedge: '⋀',
        bkarow: '⤍',
        blacklozenge: '⧫',
        blacksquare: '▪',
        blacktriangle: '▴',
        blacktriangledown: '▾',
        blacktriangleleft: '◂',
        blacktriangleright: '▸',
        blank: '␣',
        blk12: '▒',
        blk14: '░',
        blk34: '▓',
        block: '█',
        bne: '=⃥',
        bnequiv: '≡⃥',
        bnot: '⌐',
        bopf: '𝕓',
        bot: '⊥',
        bottom: '⊥',
        bowtie: '⋈',
        boxDL: '╗',
        boxDR: '╔',
        boxDl: '╖',
        boxDr: '╓',
        boxH: '═',
        boxHD: '╦',
        boxHU: '╩',
        boxHd: '╤',
        boxHu: '╧',
        boxUL: '╝',
        boxUR: '╚',
        boxUl: '╜',
        boxUr: '╙',
        boxV: '║',
        boxVH: '╬',
        boxVL: '╣',
        boxVR: '╠',
        boxVh: '╫',
        boxVl: '╢',
        boxVr: '╟',
        boxbox: '⧉',
        boxdL: '╕',
        boxdR: '╒',
        boxdl: '┐',
        boxdr: '┌',
        boxh: '─',
        boxhD: '╥',
        boxhU: '╨',
        boxhd: '┬',
        boxhu: '┴',
        boxminus: '⊟',
        boxplus: '⊞',
        boxtimes: '⊠',
        boxuL: '╛',
        boxuR: '╘',
        boxul: '┘',
        boxur: '└',
        boxv: '│',
        boxvH: '╪',
        boxvL: '╡',
        boxvR: '╞',
        boxvh: '┼',
        boxvl: '┤',
        boxvr: '├',
        bprime: '‵',
        breve: '˘',
        brvba: '¦',
        brvbar: '¦',
        bscr: '𝒷',
        bsemi: '⁏',
        bsim: '∽',
        bsime: '⋍',
        bsol: '\\',
        bsolb: '⧅',
        bsolhsub: '⟈',
        bull: '•',
        bullet: '•',
        bump: '≎',
        bumpE: '⪮',
        bumpe: '≏',
        bumpeq: '≏',
        cacute: 'ć',
        cap: '∩',
        capand: '⩄',
        capbrcup: '⩉',
        capcap: '⩋',
        capcup: '⩇',
        capdot: '⩀',
        caps: '∩︀',
        caret: '⁁',
        caron: 'ˇ',
        ccaps: '⩍',
        ccaron: 'č',
        ccedi: 'ç',
        ccedil: 'ç',
        ccirc: 'ĉ',
        ccups: '⩌',
        ccupssm: '⩐',
        cdot: 'ċ',
        cedi: '¸',
        cedil: '¸',
        cemptyv: '⦲',
        cen: '¢',
        cent: '¢',
        centerdot: '·',
        cfr: '𝔠',
        chcy: 'ч',
        check: '✓',
        checkmark: '✓',
        chi: 'χ',
        cir: '○',
        cirE: '⧃',
        circ: 'ˆ',
        circeq: '≗',
        circlearrowleft: '↺',
        circlearrowright: '↻',
        circledR: '®',
        circledS: 'Ⓢ',
        circledast: '⊛',
        circledcirc: '⊚',
        circleddash: '⊝',
        cire: '≗',
        cirfnint: '⨐',
        cirmid: '⫯',
        cirscir: '⧂',
        clubs: '♣',
        clubsuit: '♣',
        colon: ':',
        colone: '≔',
        coloneq: '≔',
        comma: ',',
        commat: '@',
        comp: '∁',
        compfn: '∘',
        complement: '∁',
        complexes: 'ℂ',
        cong: '≅',
        congdot: '⩭',
        conint: '∮',
        copf: '𝕔',
        coprod: '∐',
        cop: '©',
        copy: '©',
        copysr: '℗',
        crarr: '↵',
        cross: '✗',
        cscr: '𝒸',
        csub: '⫏',
        csube: '⫑',
        csup: '⫐',
        csupe: '⫒',
        ctdot: '⋯',
        cudarrl: '⤸',
        cudarrr: '⤵',
        cuepr: '⋞',
        cuesc: '⋟',
        cularr: '↶',
        cularrp: '⤽',
        cup: '∪',
        cupbrcap: '⩈',
        cupcap: '⩆',
        cupcup: '⩊',
        cupdot: '⊍',
        cupor: '⩅',
        cups: '∪︀',
        curarr: '↷',
        curarrm: '⤼',
        curlyeqprec: '⋞',
        curlyeqsucc: '⋟',
        curlyvee: '⋎',
        curlywedge: '⋏',
        curre: '¤',
        curren: '¤',
        curvearrowleft: '↶',
        curvearrowright: '↷',
        cuvee: '⋎',
        cuwed: '⋏',
        cwconint: '∲',
        cwint: '∱',
        cylcty: '⌭',
        dArr: '⇓',
        dHar: '⥥',
        dagger: '†',
        daleth: 'ℸ',
        darr: '↓',
        dash: '‐',
        dashv: '⊣',
        dbkarow: '⤏',
        dblac: '˝',
        dcaron: 'ď',
        dcy: 'д',
        dd: 'ⅆ',
        ddagger: '‡',
        ddarr: '⇊',
        ddotseq: '⩷',
        de: '°',
        deg: '°',
        delta: 'δ',
        demptyv: '⦱',
        dfisht: '⥿',
        dfr: '𝔡',
        dharl: '⇃',
        dharr: '⇂',
        diam: '⋄',
        diamond: '⋄',
        diamondsuit: '♦',
        diams: '♦',
        die: '¨',
        digamma: 'ϝ',
        disin: '⋲',
        div: '÷',
        divid: '÷',
        divide: '÷',
        divideontimes: '⋇',
        divonx: '⋇',
        djcy: 'ђ',
        dlcorn: '⌞',
        dlcrop: '⌍',
        dollar: '$',
        dopf: '𝕕',
        dot: '˙',
        doteq: '≐',
        doteqdot: '≑',
        dotminus: '∸',
        dotplus: '∔',
        dotsquare: '⊡',
        doublebarwedge: '⌆',
        downarrow: '↓',
        downdownarrows: '⇊',
        downharpoonleft: '⇃',
        downharpoonright: '⇂',
        drbkarow: '⤐',
        drcorn: '⌟',
        drcrop: '⌌',
        dscr: '𝒹',
        dscy: 'ѕ',
        dsol: '⧶',
        dstrok: 'đ',
        dtdot: '⋱',
        dtri: '▿',
        dtrif: '▾',
        duarr: '⇵',
        duhar: '⥯',
        dwangle: '⦦',
        dzcy: 'џ',
        dzigrarr: '⟿',
        eDDot: '⩷',
        eDot: '≑',
        eacut: 'é',
        eacute: 'é',
        easter: '⩮',
        ecaron: 'ě',
        ecir: 'ê',
        ecirc: 'ê',
        ecolon: '≕',
        ecy: 'э',
        edot: 'ė',
        ee: 'ⅇ',
        efDot: '≒',
        efr: '𝔢',
        eg: '⪚',
        egrav: 'è',
        egrave: 'è',
        egs: '⪖',
        egsdot: '⪘',
        el: '⪙',
        elinters: '⏧',
        ell: 'ℓ',
        els: '⪕',
        elsdot: '⪗',
        emacr: 'ē',
        empty: '∅',
        emptyset: '∅',
        emptyv: '∅',
        emsp13: ' ',
        emsp14: ' ',
        emsp: ' ',
        eng: 'ŋ',
        ensp: ' ',
        eogon: 'ę',
        eopf: '𝕖',
        epar: '⋕',
        eparsl: '⧣',
        eplus: '⩱',
        epsi: 'ε',
        epsilon: 'ε',
        epsiv: 'ϵ',
        eqcirc: '≖',
        eqcolon: '≕',
        eqsim: '≂',
        eqslantgtr: '⪖',
        eqslantless: '⪕',
        equals: '=',
        equest: '≟',
        equiv: '≡',
        equivDD: '⩸',
        eqvparsl: '⧥',
        erDot: '≓',
        erarr: '⥱',
        escr: 'ℯ',
        esdot: '≐',
        esim: '≂',
        eta: 'η',
        et: 'ð',
        eth: 'ð',
        eum: 'ë',
        euml: 'ë',
        euro: '€',
        excl: '!',
        exist: '∃',
        expectation: 'ℰ',
        exponentiale: 'ⅇ',
        fallingdotseq: '≒',
        fcy: 'ф',
        female: '♀',
        ffilig: 'ﬃ',
        fflig: 'ﬀ',
        ffllig: 'ﬄ',
        ffr: '𝔣',
        filig: 'ﬁ',
        fjlig: 'fj',
        flat: '♭',
        fllig: 'ﬂ',
        fltns: '▱',
        fnof: 'ƒ',
        fopf: '𝕗',
        forall: '∀',
        fork: '⋔',
        forkv: '⫙',
        fpartint: '⨍',
        frac1: '¼',
        frac12: '½',
        frac13: '⅓',
        frac14: '¼',
        frac15: '⅕',
        frac16: '⅙',
        frac18: '⅛',
        frac23: '⅔',
        frac25: '⅖',
        frac3: '¾',
        frac34: '¾',
        frac35: '⅗',
        frac38: '⅜',
        frac45: '⅘',
        frac56: '⅚',
        frac58: '⅝',
        frac78: '⅞',
        frasl: '⁄',
        frown: '⌢',
        fscr: '𝒻',
        gE: '≧',
        gEl: '⪌',
        gacute: 'ǵ',
        gamma: 'γ',
        gammad: 'ϝ',
        gap: '⪆',
        gbreve: 'ğ',
        gcirc: 'ĝ',
        gcy: 'г',
        gdot: 'ġ',
        ge: '≥',
        gel: '⋛',
        geq: '≥',
        geqq: '≧',
        geqslant: '⩾',
        ges: '⩾',
        gescc: '⪩',
        gesdot: '⪀',
        gesdoto: '⪂',
        gesdotol: '⪄',
        gesl: '⋛︀',
        gesles: '⪔',
        gfr: '𝔤',
        gg: '≫',
        ggg: '⋙',
        gimel: 'ℷ',
        gjcy: 'ѓ',
        gl: '≷',
        glE: '⪒',
        gla: '⪥',
        glj: '⪤',
        gnE: '≩',
        gnap: '⪊',
        gnapprox: '⪊',
        gne: '⪈',
        gneq: '⪈',
        gneqq: '≩',
        gnsim: '⋧',
        gopf: '𝕘',
        grave: '`',
        gscr: 'ℊ',
        gsim: '≳',
        gsime: '⪎',
        gsiml: '⪐',
        g: '>',
        gt: '>',
        gtcc: '⪧',
        gtcir: '⩺',
        gtdot: '⋗',
        gtlPar: '⦕',
        gtquest: '⩼',
        gtrapprox: '⪆',
        gtrarr: '⥸',
        gtrdot: '⋗',
        gtreqless: '⋛',
        gtreqqless: '⪌',
        gtrless: '≷',
        gtrsim: '≳',
        gvertneqq: '≩︀',
        gvnE: '≩︀',
        hArr: '⇔',
        hairsp: ' ',
        half: '½',
        hamilt: 'ℋ',
        hardcy: 'ъ',
        harr: '↔',
        harrcir: '⥈',
        harrw: '↭',
        hbar: 'ℏ',
        hcirc: 'ĥ',
        hearts: '♥',
        heartsuit: '♥',
        hellip: '…',
        hercon: '⊹',
        hfr: '𝔥',
        hksearow: '⤥',
        hkswarow: '⤦',
        hoarr: '⇿',
        homtht: '∻',
        hookleftarrow: '↩',
        hookrightarrow: '↪',
        hopf: '𝕙',
        horbar: '―',
        hscr: '𝒽',
        hslash: 'ℏ',
        hstrok: 'ħ',
        hybull: '⁃',
        hyphen: '‐',
        iacut: 'í',
        iacute: 'í',
        ic: '⁣',
        icir: 'î',
        icirc: 'î',
        icy: 'и',
        iecy: 'е',
        iexc: '¡',
        iexcl: '¡',
        iff: '⇔',
        ifr: '𝔦',
        igrav: 'ì',
        igrave: 'ì',
        ii: 'ⅈ',
        iiiint: '⨌',
        iiint: '∭',
        iinfin: '⧜',
        iiota: '℩',
        ijlig: 'ĳ',
        imacr: 'ī',
        image: 'ℑ',
        imagline: 'ℐ',
        imagpart: 'ℑ',
        imath: 'ı',
        imof: '⊷',
        imped: 'Ƶ',
        in: '∈',
        incare: '℅',
        infin: '∞',
        infintie: '⧝',
        inodot: 'ı',
        int: '∫',
        intcal: '⊺',
        integers: 'ℤ',
        intercal: '⊺',
        intlarhk: '⨗',
        intprod: '⨼',
        iocy: 'ё',
        iogon: 'į',
        iopf: '𝕚',
        iota: 'ι',
        iprod: '⨼',
        iques: '¿',
        iquest: '¿',
        iscr: '𝒾',
        isin: '∈',
        isinE: '⋹',
        isindot: '⋵',
        isins: '⋴',
        isinsv: '⋳',
        isinv: '∈',
        it: '⁢',
        itilde: 'ĩ',
        iukcy: 'і',
        ium: 'ï',
        iuml: 'ï',
        jcirc: 'ĵ',
        jcy: 'й',
        jfr: '𝔧',
        jmath: 'ȷ',
        jopf: '𝕛',
        jscr: '𝒿',
        jsercy: 'ј',
        jukcy: 'є',
        kappa: 'κ',
        kappav: 'ϰ',
        kcedil: 'ķ',
        kcy: 'к',
        kfr: '𝔨',
        kgreen: 'ĸ',
        khcy: 'х',
        kjcy: 'ќ',
        kopf: '𝕜',
        kscr: '𝓀',
        lAarr: '⇚',
        lArr: '⇐',
        lAtail: '⤛',
        lBarr: '⤎',
        lE: '≦',
        lEg: '⪋',
        lHar: '⥢',
        lacute: 'ĺ',
        laemptyv: '⦴',
        lagran: 'ℒ',
        lambda: 'λ',
        lang: '⟨',
        langd: '⦑',
        langle: '⟨',
        lap: '⪅',
        laqu: '«',
        laquo: '«',
        larr: '←',
        larrb: '⇤',
        larrbfs: '⤟',
        larrfs: '⤝',
        larrhk: '↩',
        larrlp: '↫',
        larrpl: '⤹',
        larrsim: '⥳',
        larrtl: '↢',
        lat: '⪫',
        latail: '⤙',
        late: '⪭',
        lates: '⪭︀',
        lbarr: '⤌',
        lbbrk: '❲',
        lbrace: '{',
        lbrack: '[',
        lbrke: '⦋',
        lbrksld: '⦏',
        lbrkslu: '⦍',
        lcaron: 'ľ',
        lcedil: 'ļ',
        lceil: '⌈',
        lcub: '{',
        lcy: 'л',
        ldca: '⤶',
        ldquo: '“',
        ldquor: '„',
        ldrdhar: '⥧',
        ldrushar: '⥋',
        ldsh: '↲',
        le: '≤',
        leftarrow: '←',
        leftarrowtail: '↢',
        leftharpoondown: '↽',
        leftharpoonup: '↼',
        leftleftarrows: '⇇',
        leftrightarrow: '↔',
        leftrightarrows: '⇆',
        leftrightharpoons: '⇋',
        leftrightsquigarrow: '↭',
        leftthreetimes: '⋋',
        leg: '⋚',
        leq: '≤',
        leqq: '≦',
        leqslant: '⩽',
        les: '⩽',
        lescc: '⪨',
        lesdot: '⩿',
        lesdoto: '⪁',
        lesdotor: '⪃',
        lesg: '⋚︀',
        lesges: '⪓',
        lessapprox: '⪅',
        lessdot: '⋖',
        lesseqgtr: '⋚',
        lesseqqgtr: '⪋',
        lessgtr: '≶',
        lesssim: '≲',
        lfisht: '⥼',
        lfloor: '⌊',
        lfr: '𝔩',
        lg: '≶',
        lgE: '⪑',
        lhard: '↽',
        lharu: '↼',
        lharul: '⥪',
        lhblk: '▄',
        ljcy: 'љ',
        ll: '≪',
        llarr: '⇇',
        llcorner: '⌞',
        llhard: '⥫',
        lltri: '◺',
        lmidot: 'ŀ',
        lmoust: '⎰',
        lmoustache: '⎰',
        lnE: '≨',
        lnap: '⪉',
        lnapprox: '⪉',
        lne: '⪇',
        lneq: '⪇',
        lneqq: '≨',
        lnsim: '⋦',
        loang: '⟬',
        loarr: '⇽',
        lobrk: '⟦',
        longleftarrow: '⟵',
        longleftrightarrow: '⟷',
        longmapsto: '⟼',
        longrightarrow: '⟶',
        looparrowleft: '↫',
        looparrowright: '↬',
        lopar: '⦅',
        lopf: '𝕝',
        loplus: '⨭',
        lotimes: '⨴',
        lowast: '∗',
        lowbar: '_',
        loz: '◊',
        lozenge: '◊',
        lozf: '⧫',
        lpar: '(',
        lparlt: '⦓',
        lrarr: '⇆',
        lrcorner: '⌟',
        lrhar: '⇋',
        lrhard: '⥭',
        lrm: '‎',
        lrtri: '⊿',
        lsaquo: '‹',
        lscr: '𝓁',
        lsh: '↰',
        lsim: '≲',
        lsime: '⪍',
        lsimg: '⪏',
        lsqb: '[',
        lsquo: '‘',
        lsquor: '‚',
        lstrok: 'ł',
        l: '<',
        lt: '<',
        ltcc: '⪦',
        ltcir: '⩹',
        ltdot: '⋖',
        lthree: '⋋',
        ltimes: '⋉',
        ltlarr: '⥶',
        ltquest: '⩻',
        ltrPar: '⦖',
        ltri: '◃',
        ltrie: '⊴',
        ltrif: '◂',
        lurdshar: '⥊',
        luruhar: '⥦',
        lvertneqq: '≨︀',
        lvnE: '≨︀',
        mDDot: '∺',
        mac: '¯',
        macr: '¯',
        male: '♂',
        malt: '✠',
        maltese: '✠',
        map: '↦',
        mapsto: '↦',
        mapstodown: '↧',
        mapstoleft: '↤',
        mapstoup: '↥',
        marker: '▮',
        mcomma: '⨩',
        mcy: 'м',
        mdash: '—',
        measuredangle: '∡',
        mfr: '𝔪',
        mho: '℧',
        micr: 'µ',
        micro: 'µ',
        mid: '∣',
        midast: '*',
        midcir: '⫰',
        middo: '·',
        middot: '·',
        minus: '−',
        minusb: '⊟',
        minusd: '∸',
        minusdu: '⨪',
        mlcp: '⫛',
        mldr: '…',
        mnplus: '∓',
        models: '⊧',
        mopf: '𝕞',
        mp: '∓',
        mscr: '𝓂',
        mstpos: '∾',
        mu: 'μ',
        multimap: '⊸',
        mumap: '⊸',
        nGg: '⋙̸',
        nGt: '≫⃒',
        nGtv: '≫̸',
        nLeftarrow: '⇍',
        nLeftrightarrow: '⇎',
        nLl: '⋘̸',
        nLt: '≪⃒',
        nLtv: '≪̸',
        nRightarrow: '⇏',
        nVDash: '⊯',
        nVdash: '⊮',
        nabla: '∇',
        nacute: 'ń',
        nang: '∠⃒',
        nap: '≉',
        napE: '⩰̸',
        napid: '≋̸',
        napos: 'ŉ',
        napprox: '≉',
        natur: '♮',
        natural: '♮',
        naturals: 'ℕ',
        nbs: ' ',
        nbsp: ' ',
        nbump: '≎̸',
        nbumpe: '≏̸',
        ncap: '⩃',
        ncaron: 'ň',
        ncedil: 'ņ',
        ncong: '≇',
        ncongdot: '⩭̸',
        ncup: '⩂',
        ncy: 'н',
        ndash: '–',
        ne: '≠',
        neArr: '⇗',
        nearhk: '⤤',
        nearr: '↗',
        nearrow: '↗',
        nedot: '≐̸',
        nequiv: '≢',
        nesear: '⤨',
        nesim: '≂̸',
        nexist: '∄',
        nexists: '∄',
        nfr: '𝔫',
        ngE: '≧̸',
        nge: '≱',
        ngeq: '≱',
        ngeqq: '≧̸',
        ngeqslant: '⩾̸',
        nges: '⩾̸',
        ngsim: '≵',
        ngt: '≯',
        ngtr: '≯',
        nhArr: '⇎',
        nharr: '↮',
        nhpar: '⫲',
        ni: '∋',
        nis: '⋼',
        nisd: '⋺',
        niv: '∋',
        njcy: 'њ',
        nlArr: '⇍',
        nlE: '≦̸',
        nlarr: '↚',
        nldr: '‥',
        nle: '≰',
        nleftarrow: '↚',
        nleftrightarrow: '↮',
        nleq: '≰',
        nleqq: '≦̸',
        nleqslant: '⩽̸',
        nles: '⩽̸',
        nless: '≮',
        nlsim: '≴',
        nlt: '≮',
        nltri: '⋪',
        nltrie: '⋬',
        nmid: '∤',
        nopf: '𝕟',
        no: '¬',
        not: '¬',
        notin: '∉',
        notinE: '⋹̸',
        notindot: '⋵̸',
        notinva: '∉',
        notinvb: '⋷',
        notinvc: '⋶',
        notni: '∌',
        notniva: '∌',
        notnivb: '⋾',
        notnivc: '⋽',
        npar: '∦',
        nparallel: '∦',
        nparsl: '⫽⃥',
        npart: '∂̸',
        npolint: '⨔',
        npr: '⊀',
        nprcue: '⋠',
        npre: '⪯̸',
        nprec: '⊀',
        npreceq: '⪯̸',
        nrArr: '⇏',
        nrarr: '↛',
        nrarrc: '⤳̸',
        nrarrw: '↝̸',
        nrightarrow: '↛',
        nrtri: '⋫',
        nrtrie: '⋭',
        nsc: '⊁',
        nsccue: '⋡',
        nsce: '⪰̸',
        nscr: '𝓃',
        nshortmid: '∤',
        nshortparallel: '∦',
        nsim: '≁',
        nsime: '≄',
        nsimeq: '≄',
        nsmid: '∤',
        nspar: '∦',
        nsqsube: '⋢',
        nsqsupe: '⋣',
        nsub: '⊄',
        nsubE: '⫅̸',
        nsube: '⊈',
        nsubset: '⊂⃒',
        nsubseteq: '⊈',
        nsubseteqq: '⫅̸',
        nsucc: '⊁',
        nsucceq: '⪰̸',
        nsup: '⊅',
        nsupE: '⫆̸',
        nsupe: '⊉',
        nsupset: '⊃⃒',
        nsupseteq: '⊉',
        nsupseteqq: '⫆̸',
        ntgl: '≹',
        ntild: 'ñ',
        ntilde: 'ñ',
        ntlg: '≸',
        ntriangleleft: '⋪',
        ntrianglelefteq: '⋬',
        ntriangleright: '⋫',
        ntrianglerighteq: '⋭',
        nu: 'ν',
        num: '#',
        numero: '№',
        numsp: ' ',
        nvDash: '⊭',
        nvHarr: '⤄',
        nvap: '≍⃒',
        nvdash: '⊬',
        nvge: '≥⃒',
        nvgt: '>⃒',
        nvinfin: '⧞',
        nvlArr: '⤂',
        nvle: '≤⃒',
        nvlt: '<⃒',
        nvltrie: '⊴⃒',
        nvrArr: '⤃',
        nvrtrie: '⊵⃒',
        nvsim: '∼⃒',
        nwArr: '⇖',
        nwarhk: '⤣',
        nwarr: '↖',
        nwarrow: '↖',
        nwnear: '⤧',
        oS: 'Ⓢ',
        oacut: 'ó',
        oacute: 'ó',
        oast: '⊛',
        ocir: 'ô',
        ocirc: 'ô',
        ocy: 'о',
        odash: '⊝',
        odblac: 'ő',
        odiv: '⨸',
        odot: '⊙',
        odsold: '⦼',
        oelig: 'œ',
        ofcir: '⦿',
        ofr: '𝔬',
        ogon: '˛',
        ograv: 'ò',
        ograve: 'ò',
        ogt: '⧁',
        ohbar: '⦵',
        ohm: 'Ω',
        oint: '∮',
        olarr: '↺',
        olcir: '⦾',
        olcross: '⦻',
        oline: '‾',
        olt: '⧀',
        omacr: 'ō',
        omega: 'ω',
        omicron: 'ο',
        omid: '⦶',
        ominus: '⊖',
        oopf: '𝕠',
        opar: '⦷',
        operp: '⦹',
        oplus: '⊕',
        or: '∨',
        orarr: '↻',
        ord: 'º',
        order: 'ℴ',
        orderof: 'ℴ',
        ordf: 'ª',
        ordm: 'º',
        origof: '⊶',
        oror: '⩖',
        orslope: '⩗',
        orv: '⩛',
        oscr: 'ℴ',
        oslas: 'ø',
        oslash: 'ø',
        osol: '⊘',
        otild: 'õ',
        otilde: 'õ',
        otimes: '⊗',
        otimesas: '⨶',
        oum: 'ö',
        ouml: 'ö',
        ovbar: '⌽',
        par: '¶',
        para: '¶',
        parallel: '∥',
        parsim: '⫳',
        parsl: '⫽',
        part: '∂',
        pcy: 'п',
        percnt: '%',
        period: '.',
        permil: '‰',
        perp: '⊥',
        pertenk: '‱',
        pfr: '𝔭',
        phi: 'φ',
        phiv: 'ϕ',
        phmmat: 'ℳ',
        phone: '☎',
        pi: 'π',
        pitchfork: '⋔',
        piv: 'ϖ',
        planck: 'ℏ',
        planckh: 'ℎ',
        plankv: 'ℏ',
        plus: '+',
        plusacir: '⨣',
        plusb: '⊞',
        pluscir: '⨢',
        plusdo: '∔',
        plusdu: '⨥',
        pluse: '⩲',
        plusm: '±',
        plusmn: '±',
        plussim: '⨦',
        plustwo: '⨧',
        pm: '±',
        pointint: '⨕',
        popf: '𝕡',
        poun: '£',
        pound: '£',
        pr: '≺',
        prE: '⪳',
        prap: '⪷',
        prcue: '≼',
        pre: '⪯',
        prec: '≺',
        precapprox: '⪷',
        preccurlyeq: '≼',
        preceq: '⪯',
        precnapprox: '⪹',
        precneqq: '⪵',
        precnsim: '⋨',
        precsim: '≾',
        prime: '′',
        primes: 'ℙ',
        prnE: '⪵',
        prnap: '⪹',
        prnsim: '⋨',
        prod: '∏',
        profalar: '⌮',
        profline: '⌒',
        profsurf: '⌓',
        prop: '∝',
        propto: '∝',
        prsim: '≾',
        prurel: '⊰',
        pscr: '𝓅',
        psi: 'ψ',
        puncsp: ' ',
        qfr: '𝔮',
        qint: '⨌',
        qopf: '𝕢',
        qprime: '⁗',
        qscr: '𝓆',
        quaternions: 'ℍ',
        quatint: '⨖',
        quest: '?',
        questeq: '≟',
        quo: '"',
        quot: '"',
        rAarr: '⇛',
        rArr: '⇒',
        rAtail: '⤜',
        rBarr: '⤏',
        rHar: '⥤',
        race: '∽̱',
        racute: 'ŕ',
        radic: '√',
        raemptyv: '⦳',
        rang: '⟩',
        rangd: '⦒',
        range: '⦥',
        rangle: '⟩',
        raqu: '»',
        raquo: '»',
        rarr: '→',
        rarrap: '⥵',
        rarrb: '⇥',
        rarrbfs: '⤠',
        rarrc: '⤳',
        rarrfs: '⤞',
        rarrhk: '↪',
        rarrlp: '↬',
        rarrpl: '⥅',
        rarrsim: '⥴',
        rarrtl: '↣',
        rarrw: '↝',
        ratail: '⤚',
        ratio: '∶',
        rationals: 'ℚ',
        rbarr: '⤍',
        rbbrk: '❳',
        rbrace: '}',
        rbrack: ']',
        rbrke: '⦌',
        rbrksld: '⦎',
        rbrkslu: '⦐',
        rcaron: 'ř',
        rcedil: 'ŗ',
        rceil: '⌉',
        rcub: '}',
        rcy: 'р',
        rdca: '⤷',
        rdldhar: '⥩',
        rdquo: '”',
        rdquor: '”',
        rdsh: '↳',
        real: 'ℜ',
        realine: 'ℛ',
        realpart: 'ℜ',
        reals: 'ℝ',
        rect: '▭',
        re: '®',
        reg: '®',
        rfisht: '⥽',
        rfloor: '⌋',
        rfr: '𝔯',
        rhard: '⇁',
        rharu: '⇀',
        rharul: '⥬',
        rho: 'ρ',
        rhov: 'ϱ',
        rightarrow: '→',
        rightarrowtail: '↣',
        rightharpoondown: '⇁',
        rightharpoonup: '⇀',
        rightleftarrows: '⇄',
        rightleftharpoons: '⇌',
        rightrightarrows: '⇉',
        rightsquigarrow: '↝',
        rightthreetimes: '⋌',
        ring: '˚',
        risingdotseq: '≓',
        rlarr: '⇄',
        rlhar: '⇌',
        rlm: '‏',
        rmoust: '⎱',
        rmoustache: '⎱',
        rnmid: '⫮',
        roang: '⟭',
        roarr: '⇾',
        robrk: '⟧',
        ropar: '⦆',
        ropf: '𝕣',
        roplus: '⨮',
        rotimes: '⨵',
        rpar: ')',
        rpargt: '⦔',
        rppolint: '⨒',
        rrarr: '⇉',
        rsaquo: '›',
        rscr: '𝓇',
        rsh: '↱',
        rsqb: ']',
        rsquo: '’',
        rsquor: '’',
        rthree: '⋌',
        rtimes: '⋊',
        rtri: '▹',
        rtrie: '⊵',
        rtrif: '▸',
        rtriltri: '⧎',
        ruluhar: '⥨',
        rx: '℞',
        sacute: 'ś',
        sbquo: '‚',
        sc: '≻',
        scE: '⪴',
        scap: '⪸',
        scaron: 'š',
        sccue: '≽',
        sce: '⪰',
        scedil: 'ş',
        scirc: 'ŝ',
        scnE: '⪶',
        scnap: '⪺',
        scnsim: '⋩',
        scpolint: '⨓',
        scsim: '≿',
        scy: 'с',
        sdot: '⋅',
        sdotb: '⊡',
        sdote: '⩦',
        seArr: '⇘',
        searhk: '⤥',
        searr: '↘',
        searrow: '↘',
        sec: '§',
        sect: '§',
        semi: ';',
        seswar: '⤩',
        setminus: '∖',
        setmn: '∖',
        sext: '✶',
        sfr: '𝔰',
        sfrown: '⌢',
        sharp: '♯',
        shchcy: 'щ',
        shcy: 'ш',
        shortmid: '∣',
        shortparallel: '∥',
        sh: '­',
        shy: '­',
        sigma: 'σ',
        sigmaf: 'ς',
        sigmav: 'ς',
        sim: '∼',
        simdot: '⩪',
        sime: '≃',
        simeq: '≃',
        simg: '⪞',
        simgE: '⪠',
        siml: '⪝',
        simlE: '⪟',
        simne: '≆',
        simplus: '⨤',
        simrarr: '⥲',
        slarr: '←',
        smallsetminus: '∖',
        smashp: '⨳',
        smeparsl: '⧤',
        smid: '∣',
        smile: '⌣',
        smt: '⪪',
        smte: '⪬',
        smtes: '⪬︀',
        softcy: 'ь',
        sol: '/',
        solb: '⧄',
        solbar: '⌿',
        sopf: '𝕤',
        spades: '♠',
        spadesuit: '♠',
        spar: '∥',
        sqcap: '⊓',
        sqcaps: '⊓︀',
        sqcup: '⊔',
        sqcups: '⊔︀',
        sqsub: '⊏',
        sqsube: '⊑',
        sqsubset: '⊏',
        sqsubseteq: '⊑',
        sqsup: '⊐',
        sqsupe: '⊒',
        sqsupset: '⊐',
        sqsupseteq: '⊒',
        squ: '□',
        square: '□',
        squarf: '▪',
        squf: '▪',
        srarr: '→',
        sscr: '𝓈',
        ssetmn: '∖',
        ssmile: '⌣',
        sstarf: '⋆',
        star: '☆',
        starf: '★',
        straightepsilon: 'ϵ',
        straightphi: 'ϕ',
        strns: '¯',
        sub: '⊂',
        subE: '⫅',
        subdot: '⪽',
        sube: '⊆',
        subedot: '⫃',
        submult: '⫁',
        subnE: '⫋',
        subne: '⊊',
        subplus: '⪿',
        subrarr: '⥹',
        subset: '⊂',
        subseteq: '⊆',
        subseteqq: '⫅',
        subsetneq: '⊊',
        subsetneqq: '⫋',
        subsim: '⫇',
        subsub: '⫕',
        subsup: '⫓',
        succ: '≻',
        succapprox: '⪸',
        succcurlyeq: '≽',
        succeq: '⪰',
        succnapprox: '⪺',
        succneqq: '⪶',
        succnsim: '⋩',
        succsim: '≿',
        sum: '∑',
        sung: '♪',
        sup: '⊃',
        sup1: '¹',
        sup2: '²',
        sup3: '³',
        supE: '⫆',
        supdot: '⪾',
        supdsub: '⫘',
        supe: '⊇',
        supedot: '⫄',
        suphsol: '⟉',
        suphsub: '⫗',
        suplarr: '⥻',
        supmult: '⫂',
        supnE: '⫌',
        supne: '⊋',
        supplus: '⫀',
        supset: '⊃',
        supseteq: '⊇',
        supseteqq: '⫆',
        supsetneq: '⊋',
        supsetneqq: '⫌',
        supsim: '⫈',
        supsub: '⫔',
        supsup: '⫖',
        swArr: '⇙',
        swarhk: '⤦',
        swarr: '↙',
        swarrow: '↙',
        swnwar: '⤪',
        szli: 'ß',
        szlig: 'ß',
        target: '⌖',
        tau: 'τ',
        tbrk: '⎴',
        tcaron: 'ť',
        tcedil: 'ţ',
        tcy: 'т',
        tdot: '⃛',
        telrec: '⌕',
        tfr: '𝔱',
        there4: '∴',
        therefore: '∴',
        theta: 'θ',
        thetasym: 'ϑ',
        thetav: 'ϑ',
        thickapprox: '≈',
        thicksim: '∼',
        thinsp: ' ',
        thkap: '≈',
        thksim: '∼',
        thor: 'þ',
        thorn: 'þ',
        tilde: '˜',
        time: '×',
        times: '×',
        timesb: '⊠',
        timesbar: '⨱',
        timesd: '⨰',
        tint: '∭',
        toea: '⤨',
        top: '⊤',
        topbot: '⌶',
        topcir: '⫱',
        topf: '𝕥',
        topfork: '⫚',
        tosa: '⤩',
        tprime: '‴',
        trade: '™',
        triangle: '▵',
        triangledown: '▿',
        triangleleft: '◃',
        trianglelefteq: '⊴',
        triangleq: '≜',
        triangleright: '▹',
        trianglerighteq: '⊵',
        tridot: '◬',
        trie: '≜',
        triminus: '⨺',
        triplus: '⨹',
        trisb: '⧍',
        tritime: '⨻',
        trpezium: '⏢',
        tscr: '𝓉',
        tscy: 'ц',
        tshcy: 'ћ',
        tstrok: 'ŧ',
        twixt: '≬',
        twoheadleftarrow: '↞',
        twoheadrightarrow: '↠',
        uArr: '⇑',
        uHar: '⥣',
        uacut: 'ú',
        uacute: 'ú',
        uarr: '↑',
        ubrcy: 'ў',
        ubreve: 'ŭ',
        ucir: 'û',
        ucirc: 'û',
        ucy: 'у',
        udarr: '⇅',
        udblac: 'ű',
        udhar: '⥮',
        ufisht: '⥾',
        ufr: '𝔲',
        ugrav: 'ù',
        ugrave: 'ù',
        uharl: '↿',
        uharr: '↾',
        uhblk: '▀',
        ulcorn: '⌜',
        ulcorner: '⌜',
        ulcrop: '⌏',
        ultri: '◸',
        umacr: 'ū',
        um: '¨',
        uml: '¨',
        uogon: 'ų',
        uopf: '𝕦',
        uparrow: '↑',
        updownarrow: '↕',
        upharpoonleft: '↿',
        upharpoonright: '↾',
        uplus: '⊎',
        upsi: 'υ',
        upsih: 'ϒ',
        upsilon: 'υ',
        upuparrows: '⇈',
        urcorn: '⌝',
        urcorner: '⌝',
        urcrop: '⌎',
        uring: 'ů',
        urtri: '◹',
        uscr: '𝓊',
        utdot: '⋰',
        utilde: 'ũ',
        utri: '▵',
        utrif: '▴',
        uuarr: '⇈',
        uum: 'ü',
        uuml: 'ü',
        uwangle: '⦧',
        vArr: '⇕',
        vBar: '⫨',
        vBarv: '⫩',
        vDash: '⊨',
        vangrt: '⦜',
        varepsilon: 'ϵ',
        varkappa: 'ϰ',
        varnothing: '∅',
        varphi: 'ϕ',
        varpi: 'ϖ',
        varpropto: '∝',
        varr: '↕',
        varrho: 'ϱ',
        varsigma: 'ς',
        varsubsetneq: '⊊︀',
        varsubsetneqq: '⫋︀',
        varsupsetneq: '⊋︀',
        varsupsetneqq: '⫌︀',
        vartheta: 'ϑ',
        vartriangleleft: '⊲',
        vartriangleright: '⊳',
        vcy: 'в',
        vdash: '⊢',
        vee: '∨',
        veebar: '⊻',
        veeeq: '≚',
        vellip: '⋮',
        verbar: '|',
        vert: '|',
        vfr: '𝔳',
        vltri: '⊲',
        vnsub: '⊂⃒',
        vnsup: '⊃⃒',
        vopf: '𝕧',
        vprop: '∝',
        vrtri: '⊳',
        vscr: '𝓋',
        vsubnE: '⫋︀',
        vsubne: '⊊︀',
        vsupnE: '⫌︀',
        vsupne: '⊋︀',
        vzigzag: '⦚',
        wcirc: 'ŵ',
        wedbar: '⩟',
        wedge: '∧',
        wedgeq: '≙',
        weierp: '℘',
        wfr: '𝔴',
        wopf: '𝕨',
        wp: '℘',
        wr: '≀',
        wreath: '≀',
        wscr: '𝓌',
        xcap: '⋂',
        xcirc: '◯',
        xcup: '⋃',
        xdtri: '▽',
        xfr: '𝔵',
        xhArr: '⟺',
        xharr: '⟷',
        xi: 'ξ',
        xlArr: '⟸',
        xlarr: '⟵',
        xmap: '⟼',
        xnis: '⋻',
        xodot: '⨀',
        xopf: '𝕩',
        xoplus: '⨁',
        xotime: '⨂',
        xrArr: '⟹',
        xrarr: '⟶',
        xscr: '𝓍',
        xsqcup: '⨆',
        xuplus: '⨄',
        xutri: '△',
        xvee: '⋁',
        xwedge: '⋀',
        yacut: 'ý',
        yacute: 'ý',
        yacy: 'я',
        ycirc: 'ŷ',
        ycy: 'ы',
        ye: '¥',
        yen: '¥',
        yfr: '𝔶',
        yicy: 'ї',
        yopf: '𝕪',
        yscr: '𝓎',
        yucy: 'ю',
        yum: 'ÿ',
        yuml: 'ÿ',
        zacute: 'ź',
        zcaron: 'ž',
        zcy: 'з',
        zdot: 'ż',
        zeetrf: 'ℨ',
        zeta: 'ζ',
        zfr: '𝔷',
        zhcy: 'ж',
        zigrarr: '⇝',
        zopf: '𝕫',
        zscr: '𝓏',
        zwj: '‍',
        zwnj: '‌',
      };
    },
  }),
  yd = B({
    '../../node_modules/parse-entities/decode-entity.js'(e, t) {
      var r = bd();
      t.exports = o;
      var n = {}.hasOwnProperty;
      function o(l) {
        return n.call(r, l) ? r[l] : !1;
      }
    },
  }),
  vd = B({
    '../../node_modules/parse-entities/index.js'(e, t) {
      var r = pd(),
        n = fd(),
        o = ms(),
        l = md(),
        i = hd(),
        s = yd();
      t.exports = K;
      var c = {}.hasOwnProperty,
        u = String.fromCharCode,
        d = Function.prototype,
        h = {
          warning: null,
          reference: null,
          text: null,
          warningContext: null,
          referenceContext: null,
          textContext: null,
          position: {},
          additional: null,
          attribute: !1,
          nonTerminated: !0,
        },
        m = 9,
        p = 10,
        g = 12,
        f = 32,
        A = 38,
        w = 59,
        v = 60,
        y = 61,
        x = 35,
        E = 88,
        C = 120,
        S = 65533,
        k = 'named',
        R = 'hexadecimal',
        O = 'decimal',
        L = {};
      (L[R] = 16), (L[O] = 10);
      var _ = {};
      (_[k] = i), (_[O] = o), (_[R] = l);
      var D = 1,
        H = 2,
        M = 3,
        I = 4,
        j = 5,
        z = 6,
        N = 7,
        Z = {};
      (Z[D] = 'Named character references must be terminated by a semicolon'),
        (Z[H] =
          'Numeric character references must be terminated by a semicolon'),
        (Z[M] = 'Named character references cannot be empty'),
        (Z[I] = 'Numeric character references cannot be empty'),
        (Z[j] = 'Named character references must be known'),
        (Z[z] = 'Numeric character references cannot be disallowed'),
        (Z[N] =
          'Numeric character references cannot be outside the permissible Unicode range');
      function K($, q) {
        var U = {},
          oe,
          he;
        q || (q = {});
        for (he in h) (oe = q[he]), (U[he] = oe ?? h[he]);
        return (
          (U.position.indent || U.position.start) &&
            ((U.indent = U.position.indent || []),
            (U.position = U.position.start)),
          se($, U)
        );
      }
      function se($, q) {
        var U = q.additional,
          oe = q.nonTerminated,
          he = q.text,
          nt = q.reference,
          Oe = q.warning,
          He = q.textContext,
          F = q.referenceContext,
          Be = q.warningContext,
          je = q.position,
          xt = q.indent || [],
          It = $.length,
          Pe = 0,
          $r = -1,
          be = je.column || 1,
          At = je.line || 1,
          Ve = '',
          Nt = [],
          ze,
          Zt,
          qe,
          pe,
          Ie,
          le,
          ee,
          Ue,
          Br,
          Fn,
          wt,
          or,
          Ct,
          at,
          Uo,
          lr,
          Ir,
          We,
          ie;
        for (
          typeof U == 'string' && (U = U.charCodeAt(0)),
            lr = ir(),
            Ue = Oe ? $u : d,
            Pe--,
            It++;
          ++Pe < It;

        )
          if (
            (Ie === p && (be = xt[$r] || 1), (Ie = $.charCodeAt(Pe)), Ie === A)
          ) {
            if (
              ((ee = $.charCodeAt(Pe + 1)),
              ee === m ||
                ee === p ||
                ee === g ||
                ee === f ||
                ee === A ||
                ee === v ||
                ee !== ee ||
                (U && ee === U))
            ) {
              (Ve += u(Ie)), be++;
              continue;
            }
            for (
              Ct = Pe + 1,
                or = Ct,
                ie = Ct,
                ee === x
                  ? ((ie = ++or),
                    (ee = $.charCodeAt(ie)),
                    ee === E || ee === C ? ((at = R), (ie = ++or)) : (at = O))
                  : (at = k),
                ze = '',
                wt = '',
                pe = '',
                Uo = _[at],
                ie--;
              ++ie < It && ((ee = $.charCodeAt(ie)), !!Uo(ee));

            )
              (pe += u(ee)),
                at === k && c.call(r, pe) && ((ze = pe), (wt = r[pe]));
            (qe = $.charCodeAt(ie) === w),
              qe &&
                (ie++,
                (Zt = at === k ? s(pe) : !1),
                Zt && ((ze = pe), (wt = Zt))),
              (We = 1 + ie - Ct),
              (!qe && !oe) ||
                (pe
                  ? at === k
                    ? (qe && !wt
                        ? Ue(j, 1)
                        : (ze !== pe &&
                            ((ie = or + ze.length),
                            (We = 1 + ie - or),
                            (qe = !1)),
                          qe ||
                            ((Br = ze ? D : M),
                            q.attribute
                              ? ((ee = $.charCodeAt(ie)),
                                ee === y
                                  ? (Ue(Br, We), (wt = null))
                                  : i(ee)
                                    ? (wt = null)
                                    : Ue(Br, We))
                              : Ue(Br, We))),
                      (le = wt))
                    : (qe || Ue(H, We),
                      (le = parseInt(pe, L[at])),
                      X(le)
                        ? (Ue(N, We), (le = u(S)))
                        : le in n
                          ? (Ue(z, We), (le = n[le]))
                          : ((Fn = ''),
                            de(le) && Ue(z, We),
                            le > 65535 &&
                              ((le -= 65536),
                              (Fn += u((le >>> 10) | 55296)),
                              (le = 56320 | (le & 1023))),
                            (le = Fn + u(le))))
                  : at !== k && Ue(I, We)),
              le
                ? (Wo(),
                  (lr = ir()),
                  (Pe = ie - 1),
                  (be += ie - Ct + 1),
                  Nt.push(le),
                  (Ir = ir()),
                  Ir.offset++,
                  nt &&
                    nt.call(F, le, { start: lr, end: Ir }, $.slice(Ct - 1, ie)),
                  (lr = Ir))
                : ((pe = $.slice(Ct - 1, ie)),
                  (Ve += pe),
                  (be += pe.length),
                  (Pe = ie - 1));
          } else
            Ie === 10 && (At++, $r++, (be = 0)),
              Ie === Ie ? ((Ve += u(Ie)), be++) : Wo();
        return Nt.join('');
        function ir() {
          return { line: At, column: be, offset: Pe + (je.offset || 0) };
        }
        function $u(Go, Yo) {
          var Mn = ir();
          (Mn.column += Yo), (Mn.offset += Yo), Oe.call(Be, Z[Go], Mn, Go);
        }
        function Wo() {
          Ve &&
            (Nt.push(Ve),
            he && he.call(He, Ve, { start: lr, end: ir() }),
            (Ve = ''));
        }
      }
      function X($) {
        return ($ >= 55296 && $ <= 57343) || $ > 1114111;
      }
      function de($) {
        return (
          ($ >= 1 && $ <= 8) ||
          $ === 11 ||
          ($ >= 13 && $ <= 31) ||
          ($ >= 127 && $ <= 159) ||
          ($ >= 64976 && $ <= 65007) ||
          ($ & 65535) === 65535 ||
          ($ & 65535) === 65534
        );
      }
    },
  }),
  Ed = B({
    '../../node_modules/refractor/node_modules/prismjs/components/prism-core.js'(
      e,
      t
    ) {
      var r =
          typeof window < 'u'
            ? window
            : typeof WorkerGlobalScope < 'u' &&
                self instanceof WorkerGlobalScope
              ? self
              : {},
        n = (function (o) {
          var l = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,
            i = 0,
            s = {},
            c = {
              manual: o.Prism && o.Prism.manual,
              disableWorkerMessageHandler:
                o.Prism && o.Prism.disableWorkerMessageHandler,
              util: {
                encode: function y(x) {
                  return x instanceof u
                    ? new u(x.type, y(x.content), x.alias)
                    : Array.isArray(x)
                      ? x.map(y)
                      : x
                          .replace(/&/g, '&amp;')
                          .replace(/</g, '&lt;')
                          .replace(/\u00a0/g, ' ');
                },
                type: function (y) {
                  return Object.prototype.toString.call(y).slice(8, -1);
                },
                objId: function (y) {
                  return (
                    y.__id || Object.defineProperty(y, '__id', { value: ++i }),
                    y.__id
                  );
                },
                clone: function y(x, E) {
                  E = E || {};
                  var C, S;
                  switch (c.util.type(x)) {
                    case 'Object':
                      if (((S = c.util.objId(x)), E[S])) return E[S];
                      (C = {}), (E[S] = C);
                      for (var k in x)
                        x.hasOwnProperty(k) && (C[k] = y(x[k], E));
                      return C;
                    case 'Array':
                      return (
                        (S = c.util.objId(x)),
                        E[S]
                          ? E[S]
                          : ((C = []),
                            (E[S] = C),
                            x.forEach(function (R, O) {
                              C[O] = y(R, E);
                            }),
                            C)
                      );
                    default:
                      return x;
                  }
                },
                getLanguage: function (y) {
                  for (; y; ) {
                    var x = l.exec(y.className);
                    if (x) return x[1].toLowerCase();
                    y = y.parentElement;
                  }
                  return 'none';
                },
                setLanguage: function (y, x) {
                  (y.className = y.className.replace(RegExp(l, 'gi'), '')),
                    y.classList.add('language-' + x);
                },
                currentScript: function () {
                  if (typeof document > 'u') return null;
                  if ('currentScript' in document && 1 < 2)
                    return document.currentScript;
                  try {
                    throw new Error();
                  } catch (C) {
                    var y = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(
                      C.stack
                    ) || [])[1];
                    if (y) {
                      var x = document.getElementsByTagName('script');
                      for (var E in x) if (x[E].src == y) return x[E];
                    }
                    return null;
                  }
                },
                isActive: function (y, x, E) {
                  for (var C = 'no-' + x; y; ) {
                    var S = y.classList;
                    if (S.contains(x)) return !0;
                    if (S.contains(C)) return !1;
                    y = y.parentElement;
                  }
                  return !!E;
                },
              },
              languages: {
                plain: s,
                plaintext: s,
                text: s,
                txt: s,
                extend: function (y, x) {
                  var E = c.util.clone(c.languages[y]);
                  for (var C in x) E[C] = x[C];
                  return E;
                },
                insertBefore: function (y, x, E, C) {
                  C = C || c.languages;
                  var S = C[y],
                    k = {};
                  for (var R in S)
                    if (S.hasOwnProperty(R)) {
                      if (R == x)
                        for (var O in E) E.hasOwnProperty(O) && (k[O] = E[O]);
                      E.hasOwnProperty(R) || (k[R] = S[R]);
                    }
                  var L = C[y];
                  return (
                    (C[y] = k),
                    c.languages.DFS(c.languages, function (_, D) {
                      D === L && _ != y && (this[_] = k);
                    }),
                    k
                  );
                },
                DFS: function y(x, E, C, S) {
                  S = S || {};
                  var k = c.util.objId;
                  for (var R in x)
                    if (x.hasOwnProperty(R)) {
                      E.call(x, R, x[R], C || R);
                      var O = x[R],
                        L = c.util.type(O);
                      L === 'Object' && !S[k(O)]
                        ? ((S[k(O)] = !0), y(O, E, null, S))
                        : L === 'Array' &&
                          !S[k(O)] &&
                          ((S[k(O)] = !0), y(O, E, R, S));
                    }
                },
              },
              plugins: {},
              highlightAll: function (y, x) {
                c.highlightAllUnder(document, y, x);
              },
              highlightAllUnder: function (y, x, E) {
                var C = {
                  callback: E,
                  container: y,
                  selector:
                    'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
                };
                c.hooks.run('before-highlightall', C),
                  (C.elements = Array.prototype.slice.apply(
                    C.container.querySelectorAll(C.selector)
                  )),
                  c.hooks.run('before-all-elements-highlight', C);
                for (var S = 0, k; (k = C.elements[S++]); )
                  c.highlightElement(k, x === !0, C.callback);
              },
              highlightElement: function (y, x, E) {
                var C = c.util.getLanguage(y),
                  S = c.languages[C];
                c.util.setLanguage(y, C);
                var k = y.parentElement;
                k &&
                  k.nodeName.toLowerCase() === 'pre' &&
                  c.util.setLanguage(k, C);
                var R = y.textContent,
                  O = { element: y, language: C, grammar: S, code: R };
                function L(D) {
                  (O.highlightedCode = D),
                    c.hooks.run('before-insert', O),
                    (O.element.innerHTML = O.highlightedCode),
                    c.hooks.run('after-highlight', O),
                    c.hooks.run('complete', O),
                    E && E.call(O.element);
                }
                if (
                  (c.hooks.run('before-sanity-check', O),
                  (k = O.element.parentElement),
                  k &&
                    k.nodeName.toLowerCase() === 'pre' &&
                    !k.hasAttribute('tabindex') &&
                    k.setAttribute('tabindex', '0'),
                  !O.code)
                ) {
                  c.hooks.run('complete', O), E && E.call(O.element);
                  return;
                }
                if ((c.hooks.run('before-highlight', O), !O.grammar)) {
                  L(c.util.encode(O.code));
                  return;
                }
                if (x && o.Worker) {
                  var _ = new Worker(c.filename);
                  (_.onmessage = function (D) {
                    L(D.data);
                  }),
                    _.postMessage(
                      JSON.stringify({
                        language: O.language,
                        code: O.code,
                        immediateClose: !0,
                      })
                    );
                } else L(c.highlight(O.code, O.grammar, O.language));
              },
              highlight: function (y, x, E) {
                var C = { code: y, grammar: x, language: E };
                if ((c.hooks.run('before-tokenize', C), !C.grammar))
                  throw new Error(
                    'The language "' + C.language + '" has no grammar.'
                  );
                return (
                  (C.tokens = c.tokenize(C.code, C.grammar)),
                  c.hooks.run('after-tokenize', C),
                  u.stringify(c.util.encode(C.tokens), C.language)
                );
              },
              tokenize: function (y, x) {
                var E = x.rest;
                if (E) {
                  for (var C in E) x[C] = E[C];
                  delete x.rest;
                }
                var S = new m();
                return p(S, S.head, y), h(y, S, x, S.head, 0), f(S);
              },
              hooks: {
                all: {},
                add: function (y, x) {
                  var E = c.hooks.all;
                  (E[y] = E[y] || []), E[y].push(x);
                },
                run: function (y, x) {
                  var E = c.hooks.all[y];
                  if (!(!E || !E.length))
                    for (var C = 0, S; (S = E[C++]); ) S(x);
                },
              },
              Token: u,
            };
          o.Prism = c;
          function u(y, x, E, C) {
            (this.type = y),
              (this.content = x),
              (this.alias = E),
              (this.length = (C || '').length | 0);
          }
          u.stringify = function y(x, E) {
            if (typeof x == 'string') return x;
            if (Array.isArray(x)) {
              var C = '';
              return (
                x.forEach(function (L) {
                  C += y(L, E);
                }),
                C
              );
            }
            var S = {
                type: x.type,
                content: y(x.content, E),
                tag: 'span',
                classes: ['token', x.type],
                attributes: {},
                language: E,
              },
              k = x.alias;
            k &&
              (Array.isArray(k)
                ? Array.prototype.push.apply(S.classes, k)
                : S.classes.push(k)),
              c.hooks.run('wrap', S);
            var R = '';
            for (var O in S.attributes)
              R +=
                ' ' +
                O +
                '="' +
                (S.attributes[O] || '').replace(/"/g, '&quot;') +
                '"';
            return (
              '<' +
              S.tag +
              ' class="' +
              S.classes.join(' ') +
              '"' +
              R +
              '>' +
              S.content +
              '</' +
              S.tag +
              '>'
            );
          };
          function d(y, x, E, C) {
            y.lastIndex = x;
            var S = y.exec(E);
            if (S && C && S[1]) {
              var k = S[1].length;
              (S.index += k), (S[0] = S[0].slice(k));
            }
            return S;
          }
          function h(y, x, E, C, S, k) {
            for (var R in E)
              if (!(!E.hasOwnProperty(R) || !E[R])) {
                var O = E[R];
                O = Array.isArray(O) ? O : [O];
                for (var L = 0; L < O.length; ++L) {
                  if (k && k.cause == R + ',' + L) return;
                  var _ = O[L],
                    D = _.inside,
                    H = !!_.lookbehind,
                    M = !!_.greedy,
                    I = _.alias;
                  if (M && !_.pattern.global) {
                    var j = _.pattern.toString().match(/[imsuy]*$/)[0];
                    _.pattern = RegExp(_.pattern.source, j + 'g');
                  }
                  for (
                    var z = _.pattern || _, N = C.next, Z = S;
                    N !== x.tail && !(k && Z >= k.reach);
                    Z += N.value.length, N = N.next
                  ) {
                    var K = N.value;
                    if (x.length > y.length) return;
                    if (!(K instanceof u)) {
                      var se = 1,
                        X;
                      if (M) {
                        if (((X = d(z, Z, y, H)), !X || X.index >= y.length))
                          break;
                        var U = X.index,
                          de = X.index + X[0].length,
                          $ = Z;
                        for ($ += N.value.length; U >= $; )
                          (N = N.next), ($ += N.value.length);
                        if (
                          (($ -= N.value.length), (Z = $), N.value instanceof u)
                        )
                          continue;
                        for (
                          var q = N;
                          q !== x.tail &&
                          ($ < de || typeof q.value == 'string');
                          q = q.next
                        )
                          se++, ($ += q.value.length);
                        se--, (K = y.slice(Z, $)), (X.index -= Z);
                      } else if (((X = d(z, 0, K, H)), !X)) continue;
                      var U = X.index,
                        oe = X[0],
                        he = K.slice(0, U),
                        nt = K.slice(U + oe.length),
                        Oe = Z + K.length;
                      k && Oe > k.reach && (k.reach = Oe);
                      var He = N.prev;
                      he && ((He = p(x, He, he)), (Z += he.length)),
                        g(x, He, se);
                      var F = new u(R, D ? c.tokenize(oe, D) : oe, I, oe);
                      if (((N = p(x, He, F)), nt && p(x, N, nt), se > 1)) {
                        var Be = { cause: R + ',' + L, reach: Oe };
                        h(y, x, E, N.prev, Z, Be),
                          k && Be.reach > k.reach && (k.reach = Be.reach);
                      }
                    }
                  }
                }
              }
          }
          function m() {
            var y = { value: null, prev: null, next: null },
              x = { value: null, prev: y, next: null };
            (y.next = x), (this.head = y), (this.tail = x), (this.length = 0);
          }
          function p(y, x, E) {
            var C = x.next,
              S = { value: E, prev: x, next: C };
            return (x.next = S), (C.prev = S), y.length++, S;
          }
          function g(y, x, E) {
            for (var C = x.next, S = 0; S < E && C !== y.tail; S++) C = C.next;
            (x.next = C), (C.prev = x), (y.length -= S);
          }
          function f(y) {
            for (var x = [], E = y.head.next; E !== y.tail; )
              x.push(E.value), (E = E.next);
            return x;
          }
          if (!o.document)
            return (
              o.addEventListener &&
                (c.disableWorkerMessageHandler ||
                  o.addEventListener(
                    'message',
                    function (y) {
                      var x = JSON.parse(y.data),
                        E = x.language,
                        C = x.code,
                        S = x.immediateClose;
                      o.postMessage(c.highlight(C, c.languages[E], E)),
                        S && o.close();
                    },
                    !1
                  )),
              c
            );
          var A = c.util.currentScript();
          A &&
            ((c.filename = A.src),
            A.hasAttribute('data-manual') && (c.manual = !0));
          function w() {
            c.manual || c.highlightAll();
          }
          if (!c.manual) {
            var v = document.readyState;
            v === 'loading' || (v === 'interactive' && A && A.defer)
              ? document.addEventListener('DOMContentLoaded', w)
              : window.requestAnimationFrame
                ? window.requestAnimationFrame(w)
                : window.setTimeout(w, 16);
          }
          return c;
        })(r);
      typeof t < 'u' && t.exports && (t.exports = n),
        typeof global < 'u' && (global.Prism = n);
    },
  }),
  xd = B({
    '../../node_modules/refractor/core.js'(e, t) {
      var r =
          typeof globalThis == 'object'
            ? globalThis
            : typeof self == 'object'
              ? self
              : typeof window == 'object'
                ? window
                : typeof global == 'object'
                  ? global
                  : {},
        n = S();
      r.Prism = { manual: !0, disableWorkerMessageHandler: !0 };
      var o = dd(),
        l = vd(),
        i = Ed(),
        s = cs(),
        c = ss(),
        u = G1(),
        d = Y1();
      n();
      var h = {}.hasOwnProperty;
      function m() {}
      m.prototype = i;
      var p = new m();
      (t.exports = p),
        (p.highlight = A),
        (p.register = g),
        (p.alias = f),
        (p.registered = w),
        (p.listLanguages = v),
        g(s),
        g(c),
        g(u),
        g(d),
        (p.util.encode = E),
        (p.Token.stringify = y);
      function g(k) {
        if (typeof k != 'function' || !k.displayName)
          throw new Error('Expected `function` for `grammar`, got `' + k + '`');
        p.languages[k.displayName] === void 0 && k(p);
      }
      function f(k, R) {
        var O = p.languages,
          L = k,
          _,
          D,
          H,
          M;
        R && ((L = {}), (L[k] = R));
        for (_ in L)
          for (
            D = L[_], D = typeof D == 'string' ? [D] : D, H = D.length, M = -1;
            ++M < H;

          )
            O[D[M]] = O[_];
      }
      function A(k, R) {
        var O = i.highlight,
          L;
        if (typeof k != 'string')
          throw new Error('Expected `string` for `value`, got `' + k + '`');
        if (p.util.type(R) === 'Object') (L = R), (R = null);
        else {
          if (typeof R != 'string')
            throw new Error('Expected `string` for `name`, got `' + R + '`');
          if (h.call(p.languages, R)) L = p.languages[R];
          else
            throw new Error('Unknown language: `' + R + '` is not registered');
        }
        return O.call(this, k, L, R);
      }
      function w(k) {
        if (typeof k != 'string')
          throw new Error('Expected `string` for `language`, got `' + k + '`');
        return h.call(p.languages, k);
      }
      function v() {
        var k = p.languages,
          R = [],
          O;
        for (O in k) h.call(k, O) && typeof k[O] == 'object' && R.push(O);
        return R;
      }
      function y(k, R, O) {
        var L;
        return typeof k == 'string'
          ? { type: 'text', value: k }
          : p.util.type(k) === 'Array'
            ? x(k, R)
            : ((L = {
                type: k.type,
                content: p.Token.stringify(k.content, R, O),
                tag: 'span',
                classes: ['token', k.type],
                attributes: {},
                language: R,
                parent: O,
              }),
              k.alias && (L.classes = L.classes.concat(k.alias)),
              p.hooks.run('wrap', L),
              o(L.tag + '.' + L.classes.join('.'), C(L.attributes), L.content));
      }
      function x(k, R) {
        for (var O = [], L = k.length, _ = -1, D; ++_ < L; )
          (D = k[_]), D !== '' && D !== null && D !== void 0 && O.push(D);
        for (_ = -1, L = O.length; ++_ < L; )
          (D = O[_]), (O[_] = p.Token.stringify(D, R, O));
        return O;
      }
      function E(k) {
        return k;
      }
      function C(k) {
        var R;
        for (R in k) k[R] = l(k[R]);
        return k;
      }
      function S() {
        var k = 'Prism' in r,
          R = k ? r.Prism : void 0;
        return O;
        function O() {
          k ? (r.Prism = R) : delete r.Prism, (k = void 0), (R = void 0);
        }
      }
    },
  }),
  Ad = B({
    '../../node_modules/refractor/lang/bash.js'(e, t) {
      (t.exports = r), (r.displayName = 'bash'), (r.aliases = ['shell']);
      function r(n) {
        (function (o) {
          var l =
              '\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b',
            i = {
              pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
              lookbehind: !0,
              alias: 'punctuation',
              inside: null,
            },
            s = {
              bash: i,
              environment: { pattern: RegExp('\\$' + l), alias: 'constant' },
              variable: [
                {
                  pattern: /\$?\(\([\s\S]+?\)\)/,
                  greedy: !0,
                  inside: {
                    variable: [
                      { pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 },
                      /^\$\(\(/,
                    ],
                    number:
                      /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
                    operator:
                      /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,
                    punctuation: /\(\(?|\)\)?|,|;/,
                  },
                },
                {
                  pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
                  greedy: !0,
                  inside: { variable: /^\$\(|^`|\)$|`$/ },
                },
                {
                  pattern: /\$\{[^}]+\}/,
                  greedy: !0,
                  inside: {
                    operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
                    punctuation: /[\[\]]/,
                    environment: {
                      pattern: RegExp('(\\{)' + l),
                      lookbehind: !0,
                      alias: 'constant',
                    },
                  },
                },
                /\$(?:\w+|[#?*!@$])/,
              ],
              entity:
                /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/,
            };
          (o.languages.bash = {
            shebang: { pattern: /^#!\s*\/.*/, alias: 'important' },
            comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: !0 },
            'function-name': [
              {
                pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,
                lookbehind: !0,
                alias: 'function',
              },
              { pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/, alias: 'function' },
            ],
            'for-or-select': {
              pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
              alias: 'variable',
              lookbehind: !0,
            },
            'assign-left': {
              pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
              inside: {
                environment: {
                  pattern: RegExp('(^|[\\s;|&]|[<>]\\()' + l),
                  lookbehind: !0,
                  alias: 'constant',
                },
              },
              alias: 'variable',
              lookbehind: !0,
            },
            string: [
              {
                pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,
                lookbehind: !0,
                greedy: !0,
                inside: s,
              },
              {
                pattern:
                  /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
                lookbehind: !0,
                greedy: !0,
                inside: { bash: i },
              },
              {
                pattern:
                  /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,
                lookbehind: !0,
                greedy: !0,
                inside: s,
              },
              { pattern: /(^|[^$\\])'[^']*'/, lookbehind: !0, greedy: !0 },
              {
                pattern: /\$'(?:[^'\\]|\\[\s\S])*'/,
                greedy: !0,
                inside: { entity: s.entity },
              },
            ],
            environment: { pattern: RegExp('\\$?' + l), alias: 'constant' },
            variable: s.variable,
            function: {
              pattern:
                /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
              lookbehind: !0,
            },
            keyword: {
              pattern:
                /(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,
              lookbehind: !0,
            },
            builtin: {
              pattern:
                /(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,
              lookbehind: !0,
              alias: 'class-name',
            },
            boolean: {
              pattern: /(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,
              lookbehind: !0,
            },
            'file-descriptor': { pattern: /\B&\d\b/, alias: 'important' },
            operator: {
              pattern:
                /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
              inside: {
                'file-descriptor': { pattern: /^\d/, alias: 'important' },
              },
            },
            punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
            number: {
              pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
              lookbehind: !0,
            },
          }),
            (i.inside = o.languages.bash);
          for (
            var c = [
                'comment',
                'function-name',
                'for-or-select',
                'assign-left',
                'string',
                'environment',
                'function',
                'keyword',
                'builtin',
                'boolean',
                'file-descriptor',
                'operator',
                'punctuation',
                'number',
              ],
              u = s.variable[1].inside,
              d = 0;
            d < c.length;
            d++
          )
            u[c[d]] = o.languages.bash[c[d]];
          o.languages.shell = o.languages.bash;
        })(n);
      }
    },
  }),
  wd = B({
    '../../node_modules/refractor/lang/js-extras.js'(e, t) {
      (t.exports = r), (r.displayName = 'jsExtras'), (r.aliases = []);
      function r(n) {
        (function (o) {
          o.languages.insertBefore('javascript', 'function-variable', {
            'method-variable': {
              pattern: RegExp(
                '(\\.\\s*)' +
                  o.languages.javascript['function-variable'].pattern.source
              ),
              lookbehind: !0,
              alias: [
                'function-variable',
                'method',
                'function',
                'property-access',
              ],
            },
          }),
            o.languages.insertBefore('javascript', 'function', {
              method: {
                pattern: RegExp(
                  '(\\.\\s*)' + o.languages.javascript.function.source
                ),
                lookbehind: !0,
                alias: ['function', 'property-access'],
              },
            }),
            o.languages.insertBefore('javascript', 'constant', {
              'known-class-name': [
                {
                  pattern:
                    /\b(?:(?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)?Array|ArrayBuffer|BigInt|Boolean|DataView|Date|Error|Function|Intl|JSON|(?:Weak)?(?:Map|Set)|Math|Number|Object|Promise|Proxy|Reflect|RegExp|String|Symbol|WebAssembly)\b/,
                  alias: 'class-name',
                },
                { pattern: /\b(?:[A-Z]\w*)Error\b/, alias: 'class-name' },
              ],
            });
          function l(h, m) {
            return RegExp(
              h.replace(/<ID>/g, function () {
                return /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/
                  .source;
              }),
              m
            );
          }
          o.languages.insertBefore('javascript', 'keyword', {
            imports: {
              pattern: l(
                /(\bimport\b\s*)(?:<ID>(?:\s*,\s*(?:\*\s*as\s+<ID>|\{[^{}]*\}))?|\*\s*as\s+<ID>|\{[^{}]*\})(?=\s*\bfrom\b)/
                  .source
              ),
              lookbehind: !0,
              inside: o.languages.javascript,
            },
            exports: {
              pattern: l(
                /(\bexport\b\s*)(?:\*(?:\s*as\s+<ID>)?(?=\s*\bfrom\b)|\{[^{}]*\})/
                  .source
              ),
              lookbehind: !0,
              inside: o.languages.javascript,
            },
          }),
            o.languages.javascript.keyword.unshift(
              {
                pattern: /\b(?:as|default|export|from|import)\b/,
                alias: 'module',
              },
              {
                pattern:
                  /\b(?:await|break|catch|continue|do|else|finally|for|if|return|switch|throw|try|while|yield)\b/,
                alias: 'control-flow',
              },
              { pattern: /\bnull\b/, alias: ['null', 'nil'] },
              { pattern: /\bundefined\b/, alias: 'nil' }
            ),
            o.languages.insertBefore('javascript', 'operator', {
              spread: { pattern: /\.{3}/, alias: 'operator' },
              arrow: { pattern: /=>/, alias: 'operator' },
            }),
            o.languages.insertBefore('javascript', 'punctuation', {
              'property-access': {
                pattern: l(/(\.\s*)#?<ID>/.source),
                lookbehind: !0,
              },
              'maybe-class-name': {
                pattern: /(^|[^$\w\xA0-\uFFFF])[A-Z][$\w\xA0-\uFFFF]+/,
                lookbehind: !0,
              },
              dom: {
                pattern:
                  /\b(?:document|(?:local|session)Storage|location|navigator|performance|window)\b/,
                alias: 'variable',
              },
              console: { pattern: /\bconsole(?=\s*\.)/, alias: 'class-name' },
            });
          for (
            var i = [
                'function',
                'function-variable',
                'method',
                'method-variable',
                'property-access',
              ],
              s = 0;
            s < i.length;
            s++
          ) {
            var c = i[s],
              u = o.languages.javascript[c];
            o.util.type(u) === 'RegExp' &&
              (u = o.languages.javascript[c] = { pattern: u });
            var d = u.inside || {};
            (u.inside = d), (d['maybe-class-name'] = /^[A-Z][\s\S]*/);
          }
        })(n);
      }
    },
  }),
  Cd = B({
    '../../node_modules/refractor/lang/json.js'(e, t) {
      (t.exports = r), (r.displayName = 'json'), (r.aliases = ['webmanifest']);
      function r(n) {
        (n.languages.json = {
          property: {
            pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
            lookbehind: !0,
            greedy: !0,
          },
          string: {
            pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
            lookbehind: !0,
            greedy: !0,
          },
          comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
          number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
          punctuation: /[{}[\],]/,
          operator: /:/,
          boolean: /\b(?:false|true)\b/,
          null: { pattern: /\bnull\b/, alias: 'keyword' },
        }),
          (n.languages.webmanifest = n.languages.json);
      }
    },
  }),
  Sd = B({
    '../../node_modules/refractor/lang/graphql.js'(e, t) {
      (t.exports = r), (r.displayName = 'graphql'), (r.aliases = []);
      function r(n) {
        (n.languages.graphql = {
          comment: /#.*/,
          description: {
            pattern:
              /(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i,
            greedy: !0,
            alias: 'string',
            inside: {
              'language-markdown': {
                pattern: /(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/,
                lookbehind: !0,
                inside: n.languages.markdown,
              },
            },
          },
          string: {
            pattern: /"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/,
            greedy: !0,
          },
          number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
          boolean: /\b(?:false|true)\b/,
          variable: /\$[a-z_]\w*/i,
          directive: { pattern: /@[a-z_]\w*/i, alias: 'function' },
          'attr-name': {
            pattern:
              /\b[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
            greedy: !0,
          },
          'atom-input': { pattern: /\b[A-Z]\w*Input\b/, alias: 'class-name' },
          scalar: /\b(?:Boolean|Float|ID|Int|String)\b/,
          constant: /\b[A-Z][A-Z_\d]*\b/,
          'class-name': {
            pattern:
              /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*|:\s*|\[)[A-Z_]\w*/,
            lookbehind: !0,
          },
          fragment: {
            pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
            lookbehind: !0,
            alias: 'function',
          },
          'definition-mutation': {
            pattern: /(\bmutation\s+)[a-zA-Z_]\w*/,
            lookbehind: !0,
            alias: 'function',
          },
          'definition-query': {
            pattern: /(\bquery\s+)[a-zA-Z_]\w*/,
            lookbehind: !0,
            alias: 'function',
          },
          keyword:
            /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,
          operator: /[!=|&]|\.{3}/,
          'property-query': /\w+(?=\s*\()/,
          object: /\w+(?=\s*\{)/,
          punctuation: /[!(){}\[\]:=,]/,
          property: /\w+/,
        }),
          n.hooks.add('after-tokenize', function (o) {
            if (o.language !== 'graphql') return;
            var l = o.tokens.filter(function (v) {
                return (
                  typeof v != 'string' &&
                  v.type !== 'comment' &&
                  v.type !== 'scalar'
                );
              }),
              i = 0;
            function s(v) {
              return l[i + v];
            }
            function c(v, y) {
              y = y || 0;
              for (var x = 0; x < v.length; x++) {
                var E = s(x + y);
                if (!E || E.type !== v[x]) return !1;
              }
              return !0;
            }
            function u(v, y) {
              for (var x = 1, E = i; E < l.length; E++) {
                var C = l[E],
                  S = C.content;
                if (C.type === 'punctuation' && typeof S == 'string') {
                  if (v.test(S)) x++;
                  else if (y.test(S) && (x--, x === 0)) return E;
                }
              }
              return -1;
            }
            function d(v, y) {
              var x = v.alias;
              x ? Array.isArray(x) || (v.alias = x = [x]) : (v.alias = x = []),
                x.push(y);
            }
            for (; i < l.length; ) {
              var h = l[i++];
              if (h.type === 'keyword' && h.content === 'mutation') {
                var m = [];
                if (
                  c(['definition-mutation', 'punctuation']) &&
                  s(1).content === '('
                ) {
                  i += 2;
                  var p = u(/^\($/, /^\)$/);
                  if (p === -1) continue;
                  for (; i < p; i++) {
                    var g = s(0);
                    g.type === 'variable' &&
                      (d(g, 'variable-input'), m.push(g.content));
                  }
                  i = p + 1;
                }
                if (
                  c(['punctuation', 'property-query']) &&
                  s(0).content === '{' &&
                  (i++, d(s(0), 'property-mutation'), m.length > 0)
                ) {
                  var f = u(/^\{$/, /^\}$/);
                  if (f === -1) continue;
                  for (var A = i; A < f; A++) {
                    var w = l[A];
                    w.type === 'variable' &&
                      m.indexOf(w.content) >= 0 &&
                      d(w, 'variable-input');
                  }
                }
              }
            }
          });
      }
    },
  });
const { logger: kd } = __STORYBOOK_MODULE_CLIENT_LOGGER__,
  { global: Td } = __STORYBOOK_MODULE_GLOBAL__;
var Rd = ke(is()),
  Od = Rd.default,
  Ld = ke(Ad()),
  _d = Ld.default,
  Dd = ke(ss()),
  Fd = Dd.default,
  Md = ke(wd()),
  $d = Md.default,
  Bd = ke(Cd()),
  Id = Bd.default,
  Nd = ke(Sd()),
  Zd = Nd.default,
  Hd = ke(cs()),
  jd = Hd.default,
  Pd = ke(q1()),
  Vd = Pd.default,
  zd = ke(U1()),
  qd = zd.default,
  Ud = ke(W1()),
  Wd = Ud.default,
  Gd = ke(ls()),
  Yd = Gd.default;
function Kd(e, t) {
  if (e == null) return {};
  var r = {},
    n = Object.keys(e),
    o,
    l;
  for (l = 0; l < n.length; l++)
    (o = n[l]), !(t.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
function Xd(e, t) {
  if (e == null) return {};
  var r = Kd(e, t),
    n,
    o;
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(e);
    for (o = 0; o < l.length; o++)
      (n = l[o]),
        !(t.indexOf(n) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, n) &&
          (r[n] = e[n]);
  }
  return r;
}
function ya(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Jd(e) {
  if (Array.isArray(e)) return ya(e);
}
function Qd(e) {
  if (
    (typeof Symbol < 'u' && e[Symbol.iterator] != null) ||
    e['@@iterator'] != null
  )
    return Array.from(e);
}
function e2(e, t) {
  if (e) {
    if (typeof e == 'string') return ya(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (r === 'Object' && e.constructor && (r = e.constructor.name),
      r === 'Map' || r === 'Set')
    )
      return Array.from(e);
    if (r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return ya(e, t);
  }
}
function t2() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function r2(e) {
  return Jd(e) || Qd(e) || e2(e) || t2();
}
function vr(e) {
  '@babel/helpers - typeof';
  return (
    (vr =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t;
          }),
    vr(e)
  );
}
function n2(e, t) {
  if (vr(e) !== 'object' || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || 'default');
    if (vr(n) !== 'object') return n;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return (t === 'string' ? String : Number)(e);
}
function a2(e) {
  var t = n2(e, 'string');
  return vr(t) === 'symbol' ? t : String(t);
}
function gs(e, t, r) {
  return (
    (t = a2(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function va() {
  return (
    (va = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    va.apply(this, arguments)
  );
}
function El(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (o) {
        return Object.getOwnPropertyDescriptor(e, o).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function zt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? El(Object(r), !0).forEach(function (n) {
          gs(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : El(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function o2(e) {
  var t = e.length;
  if (t === 0 || t === 1) return e;
  if (t === 2)
    return [
      e[0],
      e[1],
      ''.concat(e[0], '.').concat(e[1]),
      ''.concat(e[1], '.').concat(e[0]),
    ];
  if (t === 3)
    return [
      e[0],
      e[1],
      e[2],
      ''.concat(e[0], '.').concat(e[1]),
      ''.concat(e[0], '.').concat(e[2]),
      ''.concat(e[1], '.').concat(e[0]),
      ''.concat(e[1], '.').concat(e[2]),
      ''.concat(e[2], '.').concat(e[0]),
      ''.concat(e[2], '.').concat(e[1]),
      ''.concat(e[0], '.').concat(e[1], '.').concat(e[2]),
      ''.concat(e[0], '.').concat(e[2], '.').concat(e[1]),
      ''.concat(e[1], '.').concat(e[0], '.').concat(e[2]),
      ''.concat(e[1], '.').concat(e[2], '.').concat(e[0]),
      ''.concat(e[2], '.').concat(e[0], '.').concat(e[1]),
      ''.concat(e[2], '.').concat(e[1], '.').concat(e[0]),
    ];
  if (t >= 4)
    return [
      e[0],
      e[1],
      e[2],
      e[3],
      ''.concat(e[0], '.').concat(e[1]),
      ''.concat(e[0], '.').concat(e[2]),
      ''.concat(e[0], '.').concat(e[3]),
      ''.concat(e[1], '.').concat(e[0]),
      ''.concat(e[1], '.').concat(e[2]),
      ''.concat(e[1], '.').concat(e[3]),
      ''.concat(e[2], '.').concat(e[0]),
      ''.concat(e[2], '.').concat(e[1]),
      ''.concat(e[2], '.').concat(e[3]),
      ''.concat(e[3], '.').concat(e[0]),
      ''.concat(e[3], '.').concat(e[1]),
      ''.concat(e[3], '.').concat(e[2]),
      ''.concat(e[0], '.').concat(e[1], '.').concat(e[2]),
      ''.concat(e[0], '.').concat(e[1], '.').concat(e[3]),
      ''.concat(e[0], '.').concat(e[2], '.').concat(e[1]),
      ''.concat(e[0], '.').concat(e[2], '.').concat(e[3]),
      ''.concat(e[0], '.').concat(e[3], '.').concat(e[1]),
      ''.concat(e[0], '.').concat(e[3], '.').concat(e[2]),
      ''.concat(e[1], '.').concat(e[0], '.').concat(e[2]),
      ''.concat(e[1], '.').concat(e[0], '.').concat(e[3]),
      ''.concat(e[1], '.').concat(e[2], '.').concat(e[0]),
      ''.concat(e[1], '.').concat(e[2], '.').concat(e[3]),
      ''.concat(e[1], '.').concat(e[3], '.').concat(e[0]),
      ''.concat(e[1], '.').concat(e[3], '.').concat(e[2]),
      ''.concat(e[2], '.').concat(e[0], '.').concat(e[1]),
      ''.concat(e[2], '.').concat(e[0], '.').concat(e[3]),
      ''.concat(e[2], '.').concat(e[1], '.').concat(e[0]),
      ''.concat(e[2], '.').concat(e[1], '.').concat(e[3]),
      ''.concat(e[2], '.').concat(e[3], '.').concat(e[0]),
      ''.concat(e[2], '.').concat(e[3], '.').concat(e[1]),
      ''.concat(e[3], '.').concat(e[0], '.').concat(e[1]),
      ''.concat(e[3], '.').concat(e[0], '.').concat(e[2]),
      ''.concat(e[3], '.').concat(e[1], '.').concat(e[0]),
      ''.concat(e[3], '.').concat(e[1], '.').concat(e[2]),
      ''.concat(e[3], '.').concat(e[2], '.').concat(e[0]),
      ''.concat(e[3], '.').concat(e[2], '.').concat(e[1]),
      ''.concat(e[0], '.').concat(e[1], '.').concat(e[2], '.').concat(e[3]),
      ''.concat(e[0], '.').concat(e[1], '.').concat(e[3], '.').concat(e[2]),
      ''.concat(e[0], '.').concat(e[2], '.').concat(e[1], '.').concat(e[3]),
      ''.concat(e[0], '.').concat(e[2], '.').concat(e[3], '.').concat(e[1]),
      ''.concat(e[0], '.').concat(e[3], '.').concat(e[1], '.').concat(e[2]),
      ''.concat(e[0], '.').concat(e[3], '.').concat(e[2], '.').concat(e[1]),
      ''.concat(e[1], '.').concat(e[0], '.').concat(e[2], '.').concat(e[3]),
      ''.concat(e[1], '.').concat(e[0], '.').concat(e[3], '.').concat(e[2]),
      ''.concat(e[1], '.').concat(e[2], '.').concat(e[0], '.').concat(e[3]),
      ''.concat(e[1], '.').concat(e[2], '.').concat(e[3], '.').concat(e[0]),
      ''.concat(e[1], '.').concat(e[3], '.').concat(e[0], '.').concat(e[2]),
      ''.concat(e[1], '.').concat(e[3], '.').concat(e[2], '.').concat(e[0]),
      ''.concat(e[2], '.').concat(e[0], '.').concat(e[1], '.').concat(e[3]),
      ''.concat(e[2], '.').concat(e[0], '.').concat(e[3], '.').concat(e[1]),
      ''.concat(e[2], '.').concat(e[1], '.').concat(e[0], '.').concat(e[3]),
      ''.concat(e[2], '.').concat(e[1], '.').concat(e[3], '.').concat(e[0]),
      ''.concat(e[2], '.').concat(e[3], '.').concat(e[0], '.').concat(e[1]),
      ''.concat(e[2], '.').concat(e[3], '.').concat(e[1], '.').concat(e[0]),
      ''.concat(e[3], '.').concat(e[0], '.').concat(e[1], '.').concat(e[2]),
      ''.concat(e[3], '.').concat(e[0], '.').concat(e[2], '.').concat(e[1]),
      ''.concat(e[3], '.').concat(e[1], '.').concat(e[0], '.').concat(e[2]),
      ''.concat(e[3], '.').concat(e[1], '.').concat(e[2], '.').concat(e[0]),
      ''.concat(e[3], '.').concat(e[2], '.').concat(e[0], '.').concat(e[1]),
      ''.concat(e[3], '.').concat(e[2], '.').concat(e[1], '.').concat(e[0]),
    ];
}
var Vn = {};
function l2(e) {
  if (e.length === 0 || e.length === 1) return e;
  var t = e.join('.');
  return Vn[t] || (Vn[t] = o2(e)), Vn[t];
}
function i2(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r = arguments.length > 2 ? arguments[2] : void 0,
    n = e.filter(function (l) {
      return l !== 'token';
    }),
    o = l2(n);
  return o.reduce(function (l, i) {
    return zt(zt({}, l), r[i]);
  }, t);
}
function xl(e) {
  return e.join(' ');
}
function s2(e, t) {
  var r = 0;
  return function (n) {
    return (
      (r += 1),
      n.map(function (o, l) {
        return lo({
          node: o,
          stylesheet: e,
          useInlineStyles: t,
          key: 'code-segment-'.concat(r, '-').concat(l),
        });
      })
    );
  };
}
function lo(e) {
  var t = e.node,
    r = e.stylesheet,
    n = e.style,
    o = n === void 0 ? {} : n,
    l = e.useInlineStyles,
    i = e.key,
    s = t.properties,
    c = t.type,
    u = t.tagName,
    d = t.value;
  if (c === 'text') return d;
  if (u) {
    var h = s2(r, l),
      m;
    if (!l) m = zt(zt({}, s), {}, { className: xl(s.className) });
    else {
      var p = Object.keys(r).reduce(function (w, v) {
          return (
            v.split('.').forEach(function (y) {
              w.includes(y) || w.push(y);
            }),
            w
          );
        }, []),
        g = s.className && s.className.includes('token') ? ['token'] : [],
        f =
          s.className &&
          g.concat(
            s.className.filter(function (w) {
              return !p.includes(w);
            })
          );
      m = zt(
        zt({}, s),
        {},
        {
          className: xl(f) || void 0,
          style: i2(s.className, Object.assign({}, s.style, o), r),
        }
      );
    }
    var A = h(t.children);
    return a.createElement(u, va({ key: i }, m), A);
  }
}
var c2 = function (e, t) {
    var r = e.listLanguages();
    return r.indexOf(t) !== -1;
  },
  u2 = [
    'language',
    'children',
    'style',
    'customStyle',
    'codeTagProps',
    'useInlineStyles',
    'showLineNumbers',
    'showInlineLineNumbers',
    'startingLineNumber',
    'lineNumberContainerStyle',
    'lineNumberStyle',
    'wrapLines',
    'wrapLongLines',
    'lineProps',
    'renderer',
    'PreTag',
    'CodeTag',
    'code',
    'astGenerator',
  ];
function Al(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t &&
      (n = n.filter(function (o) {
        return Object.getOwnPropertyDescriptor(e, o).enumerable;
      })),
      r.push.apply(r, n);
  }
  return r;
}
function Xe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Al(Object(r), !0).forEach(function (n) {
          gs(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : Al(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
var d2 = /\n/g;
function p2(e) {
  return e.match(d2);
}
function f2(e) {
  var t = e.lines,
    r = e.startingLineNumber,
    n = e.style;
  return t.map(function (o, l) {
    var i = l + r;
    return a.createElement(
      'span',
      {
        key: 'line-'.concat(l),
        className: 'react-syntax-highlighter-line-number',
        style: typeof n == 'function' ? n(i) : n,
      },
      ''.concat(
        i,
        `
`
      )
    );
  });
}
function m2(e) {
  var t = e.codeString,
    r = e.codeStyle,
    n = e.containerStyle,
    o = n === void 0 ? { float: 'left', paddingRight: '10px' } : n,
    l = e.numberStyle,
    i = l === void 0 ? {} : l,
    s = e.startingLineNumber;
  return a.createElement(
    'code',
    { style: Object.assign({}, r, o) },
    f2({
      lines: t.replace(/\n$/, '').split(`
`),
      style: i,
      startingLineNumber: s,
    })
  );
}
function g2(e) {
  return ''.concat(e.toString().length, '.25em');
}
function hs(e, t) {
  return {
    type: 'element',
    tagName: 'span',
    properties: {
      key: 'line-number--'.concat(e),
      className: [
        'comment',
        'linenumber',
        'react-syntax-highlighter-line-number',
      ],
      style: t,
    },
    children: [{ type: 'text', value: e }],
  };
}
function bs(e, t, r) {
  var n = {
      display: 'inline-block',
      minWidth: g2(r),
      paddingRight: '1em',
      textAlign: 'right',
      userSelect: 'none',
    },
    o = typeof e == 'function' ? e(t) : e,
    l = Xe(Xe({}, n), o);
  return l;
}
function Yr(e) {
  var t = e.children,
    r = e.lineNumber,
    n = e.lineNumberStyle,
    o = e.largestLineNumber,
    l = e.showInlineLineNumbers,
    i = e.lineProps,
    s = i === void 0 ? {} : i,
    c = e.className,
    u = c === void 0 ? [] : c,
    d = e.showLineNumbers,
    h = e.wrapLongLines,
    m = typeof s == 'function' ? s(r) : s;
  if (((m.className = u), r && l)) {
    var p = bs(n, r, o);
    t.unshift(hs(r, p));
  }
  return (
    h & d && (m.style = Xe(Xe({}, m.style), {}, { display: 'flex' })),
    { type: 'element', tagName: 'span', properties: m, children: t }
  );
}
function ys(e) {
  for (
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [],
      r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [],
      n = 0;
    n < e.length;
    n++
  ) {
    var o = e[n];
    if (o.type === 'text')
      r.push(Yr({ children: [o], className: r2(new Set(t)) }));
    else if (o.children) {
      var l = t.concat(o.properties.className);
      ys(o.children, l).forEach(function (i) {
        return r.push(i);
      });
    }
  }
  return r;
}
function h2(e, t, r, n, o, l, i, s, c) {
  var u,
    d = ys(e.value),
    h = [],
    m = -1,
    p = 0;
  function g(E, C) {
    var S = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
    return Yr({
      children: E,
      lineNumber: C,
      lineNumberStyle: s,
      largestLineNumber: i,
      showInlineLineNumbers: o,
      lineProps: r,
      className: S,
      showLineNumbers: n,
      wrapLongLines: c,
    });
  }
  function f(E, C) {
    if (n && C && o) {
      var S = bs(s, C, i);
      E.unshift(hs(C, S));
    }
    return E;
  }
  function A(E, C) {
    var S = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
    return t || S.length > 0 ? g(E, C, S) : f(E, C);
  }
  for (
    var w = function () {
      var E = d[p],
        C = E.children[0].value,
        S = p2(C);
      if (S) {
        var k = C.split(`
`);
        k.forEach(function (R, O) {
          var L = n && h.length + l,
            _ = {
              type: 'text',
              value: ''.concat(
                R,
                `
`
              ),
            };
          if (O === 0) {
            var D = d
                .slice(m + 1, p)
                .concat(
                  Yr({ children: [_], className: E.properties.className })
                ),
              H = A(D, L);
            h.push(H);
          } else if (O === k.length - 1) {
            var M = d[p + 1] && d[p + 1].children && d[p + 1].children[0],
              I = { type: 'text', value: ''.concat(R) };
            if (M) {
              var j = Yr({ children: [I], className: E.properties.className });
              d.splice(p + 1, 0, j);
            } else {
              var z = [I],
                N = A(z, L, E.properties.className);
              h.push(N);
            }
          } else {
            var Z = [_],
              K = A(Z, L, E.properties.className);
            h.push(K);
          }
        }),
          (m = p);
      }
      p++;
    };
    p < d.length;

  )
    w();
  if (m !== d.length - 1) {
    var v = d.slice(m + 1, d.length);
    if (v && v.length) {
      var y = n && h.length + l,
        x = A(v, y);
      h.push(x);
    }
  }
  return t ? h : (u = []).concat.apply(u, h);
}
function b2(e) {
  var t = e.rows,
    r = e.stylesheet,
    n = e.useInlineStyles;
  return t.map(function (o, l) {
    return lo({
      node: o,
      stylesheet: r,
      useInlineStyles: n,
      key: 'code-segement'.concat(l),
    });
  });
}
function vs(e) {
  return e && typeof e.highlightAuto < 'u';
}
function y2(e) {
  var t = e.astGenerator,
    r = e.language,
    n = e.code,
    o = e.defaultCodeValue;
  if (vs(t)) {
    var l = c2(t, r);
    return r === 'text'
      ? { value: o, language: 'text' }
      : l
        ? t.highlight(r, n)
        : t.highlightAuto(n);
  }
  try {
    return r && r !== 'text' ? { value: t.highlight(n, r) } : { value: o };
  } catch {
    return { value: o };
  }
}
function v2(e, t) {
  return function (r) {
    var n = r.language,
      o = r.children,
      l = r.style,
      i = l === void 0 ? t : l,
      s = r.customStyle,
      c = s === void 0 ? {} : s,
      u = r.codeTagProps,
      d =
        u === void 0
          ? {
              className: n ? 'language-'.concat(n) : void 0,
              style: Xe(
                Xe({}, i['code[class*="language-"]']),
                i['code[class*="language-'.concat(n, '"]')]
              ),
            }
          : u,
      h = r.useInlineStyles,
      m = h === void 0 ? !0 : h,
      p = r.showLineNumbers,
      g = p === void 0 ? !1 : p,
      f = r.showInlineLineNumbers,
      A = f === void 0 ? !0 : f,
      w = r.startingLineNumber,
      v = w === void 0 ? 1 : w,
      y = r.lineNumberContainerStyle,
      x = r.lineNumberStyle,
      E = x === void 0 ? {} : x,
      C = r.wrapLines,
      S = r.wrapLongLines,
      k = S === void 0 ? !1 : S,
      R = r.lineProps,
      O = R === void 0 ? {} : R,
      L = r.renderer,
      _ = r.PreTag,
      D = _ === void 0 ? 'pre' : _,
      H = r.CodeTag,
      M = H === void 0 ? 'code' : H,
      I = r.code,
      j = I === void 0 ? (Array.isArray(o) ? o[0] : o) || '' : I,
      z = r.astGenerator,
      N = Xd(r, u2);
    z = z || e;
    var Z = g
        ? a.createElement(m2, {
            containerStyle: y,
            codeStyle: d.style || {},
            numberStyle: E,
            startingLineNumber: v,
            codeString: j,
          })
        : null,
      K = i.hljs || i['pre[class*="language-"]'] || { backgroundColor: '#fff' },
      se = vs(z) ? 'hljs' : 'prismjs',
      X = m
        ? Object.assign({}, N, { style: Object.assign({}, K, c) })
        : Object.assign({}, N, {
            className: N.className
              ? ''.concat(se, ' ').concat(N.className)
              : se,
            style: Object.assign({}, c),
          });
    if (
      (k
        ? (d.style = Xe(Xe({}, d.style), {}, { whiteSpace: 'pre-wrap' }))
        : (d.style = Xe(Xe({}, d.style), {}, { whiteSpace: 'pre' })),
      !z)
    )
      return a.createElement(D, X, Z, a.createElement(M, d, j));
    ((C === void 0 && L) || k) && (C = !0), (L = L || b2);
    var de = [{ type: 'text', value: j }],
      $ = y2({ astGenerator: z, language: n, code: j, defaultCodeValue: de });
    $.language === null && ($.value = de);
    var q = $.value.length + v,
      U = h2($, C, O, g, A, v, q, E, k);
    return a.createElement(
      D,
      X,
      a.createElement(
        M,
        d,
        !A && Z,
        L({ rows: U, stylesheet: i, useInlineStyles: m })
      )
    );
  };
}
var io = ke(xd()),
  so = v2(io.default, {});
so.registerLanguage = function (e, t) {
  return io.default.register(t);
};
so.alias = function (e, t) {
  return io.default.alias(e, t);
};
var Te = so,
  E2 = T.div(({ theme: e }) => ({
    position: 'absolute',
    bottom: 0,
    right: 0,
    maxWidth: '100%',
    display: 'flex',
    background: e.background.content,
    zIndex: 1,
  })),
  Es = T.button(
    ({ theme: e }) => ({
      margin: 0,
      border: '0 none',
      padding: '4px 10px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      color: e.color.defaultText,
      background: e.background.content,
      fontSize: 12,
      lineHeight: '16px',
      fontFamily: e.typography.fonts.base,
      fontWeight: e.typography.weight.bold,
      borderTop: `1px solid ${e.appBorderColor}`,
      borderLeft: `1px solid ${e.appBorderColor}`,
      marginLeft: -1,
      borderRadius: '4px 0 0 0',
      '&:not(:last-child)': { borderRight: `1px solid ${e.appBorderColor}` },
      '& + *': { borderLeft: `1px solid ${e.appBorderColor}`, borderRadius: 0 },
      '&:focus': {
        boxShadow: `${e.color.secondary} 0 -3px 0 0 inset`,
        outline: '0 none',
      },
    }),
    ({ disabled: e }) => e && { cursor: 'not-allowed', opacity: 0.5 }
  );
Es.displayName = 'ActionButton';
var co = ({ actionItems: e, ...t }) =>
  a.createElement(
    E2,
    { ...t },
    e.map(({ title: r, className: n, onClick: o, disabled: l }, i) =>
      a.createElement(Es, { key: i, className: n, onClick: o, disabled: l }, r)
    )
  );
function re() {
  return (
    (re = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    re.apply(this, arguments)
  );
}
function Ea() {
  return (
    (Ea = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    Ea.apply(this, arguments)
  );
}
function an() {
  return (
    (an = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    an.apply(this, arguments)
  );
}
function x2(e, t) {
  typeof e == 'function' ? e(t) : e != null && (e.current = t);
}
function xs(...e) {
  return (t) => e.forEach((r) => x2(r, t));
}
function $t(...e) {
  return b.useCallback(xs(...e), e);
}
var As = b.forwardRef((e, t) => {
  let { children: r, ...n } = e,
    o = b.Children.toArray(r),
    l = o.find(w2);
  if (l) {
    let i = l.props.children,
      s = o.map((c) =>
        c === l
          ? b.Children.count(i) > 1
            ? b.Children.only(null)
            : b.isValidElement(i)
              ? i.props.children
              : null
          : c
      );
    return b.createElement(
      xa,
      an({}, n, { ref: t }),
      b.isValidElement(i) ? b.cloneElement(i, void 0, s) : null
    );
  }
  return b.createElement(xa, an({}, n, { ref: t }), r);
});
As.displayName = 'Slot';
var xa = b.forwardRef((e, t) => {
  let { children: r, ...n } = e;
  return b.isValidElement(r)
    ? b.cloneElement(r, { ...C2(n, r.props), ref: t ? xs(t, r.ref) : r.ref })
    : b.Children.count(r) > 1
      ? b.Children.only(null)
      : null;
});
xa.displayName = 'SlotClone';
var A2 = ({ children: e }) => b.createElement(b.Fragment, null, e);
function w2(e) {
  return b.isValidElement(e) && e.type === A2;
}
function C2(e, t) {
  let r = { ...t };
  for (let n in t) {
    let o = e[n],
      l = t[n];
    /^on[A-Z]/.test(n)
      ? o && l
        ? (r[n] = (...i) => {
            l(...i), o(...i);
          })
        : o && (r[n] = o)
      : n === 'style'
        ? (r[n] = { ...o, ...l })
        : n === 'className' && (r[n] = [o, l].filter(Boolean).join(' '));
  }
  return { ...e, ...r };
}
var S2 = [
    'a',
    'button',
    'div',
    'form',
    'h2',
    'h3',
    'img',
    'input',
    'label',
    'li',
    'nav',
    'ol',
    'p',
    'span',
    'svg',
    'ul',
  ],
  Or = S2.reduce((e, t) => {
    let r = b.forwardRef((n, o) => {
      let { asChild: l, ...i } = n,
        s = l ? As : t;
      return (
        b.useEffect(() => {
          window[Symbol.for('radix-ui')] = !0;
        }, []),
        b.createElement(s, Ea({}, i, { ref: o }))
      );
    });
    return (r.displayName = `Primitive.${t}`), { ...e, [t]: r };
  }, {}),
  Aa = globalThis != null && globalThis.document ? b.useLayoutEffect : () => {};
function k2(e, t) {
  return b.useReducer((r, n) => t[r][n] ?? r, e);
}
var Lr = (e) => {
  let { present: t, children: r } = e,
    n = T2(t),
    o =
      typeof r == 'function' ? r({ present: n.isPresent }) : b.Children.only(r),
    l = $t(n.ref, o.ref);
  return typeof r == 'function' || n.isPresent
    ? b.cloneElement(o, { ref: l })
    : null;
};
Lr.displayName = 'Presence';
function T2(e) {
  let [t, r] = b.useState(),
    n = b.useRef({}),
    o = b.useRef(e),
    l = b.useRef('none'),
    i = e ? 'mounted' : 'unmounted',
    [s, c] = k2(i, {
      mounted: { UNMOUNT: 'unmounted', ANIMATION_OUT: 'unmountSuspended' },
      unmountSuspended: { MOUNT: 'mounted', ANIMATION_END: 'unmounted' },
      unmounted: { MOUNT: 'mounted' },
    });
  return (
    b.useEffect(() => {
      let u = Zr(n.current);
      l.current = s === 'mounted' ? u : 'none';
    }, [s]),
    Aa(() => {
      let u = n.current,
        d = o.current;
      if (d !== e) {
        let h = l.current,
          m = Zr(u);
        e
          ? c('MOUNT')
          : m === 'none' || (u == null ? void 0 : u.display) === 'none'
            ? c('UNMOUNT')
            : c(d && h !== m ? 'ANIMATION_OUT' : 'UNMOUNT'),
          (o.current = e);
      }
    }, [e, c]),
    Aa(() => {
      if (t) {
        let u = (h) => {
            let m = Zr(n.current).includes(h.animationName);
            h.target === t && m && Fi.flushSync(() => c('ANIMATION_END'));
          },
          d = (h) => {
            h.target === t && (l.current = Zr(n.current));
          };
        return (
          t.addEventListener('animationstart', d),
          t.addEventListener('animationcancel', u),
          t.addEventListener('animationend', u),
          () => {
            t.removeEventListener('animationstart', d),
              t.removeEventListener('animationcancel', u),
              t.removeEventListener('animationend', u);
          }
        );
      } else c('ANIMATION_END');
    }, [t, c]),
    {
      isPresent: ['mounted', 'unmountSuspended'].includes(s),
      ref: b.useCallback((u) => {
        u && (n.current = getComputedStyle(u)), r(u);
      }, []),
    }
  );
}
function Zr(e) {
  return (e == null ? void 0 : e.animationName) || 'none';
}
function R2(e, t = []) {
  let r = [];
  function n(l, i) {
    let s = b.createContext(i),
      c = r.length;
    r = [...r, i];
    function u(h) {
      let { scope: m, children: p, ...g } = h,
        f = (m == null ? void 0 : m[e][c]) || s,
        A = b.useMemo(() => g, Object.values(g));
      return b.createElement(f.Provider, { value: A }, p);
    }
    function d(h, m) {
      let p = (m == null ? void 0 : m[e][c]) || s,
        g = b.useContext(p);
      if (g) return g;
      if (i !== void 0) return i;
      throw new Error(`\`${h}\` must be used within \`${l}\``);
    }
    return (u.displayName = l + 'Provider'), [u, d];
  }
  let o = () => {
    let l = r.map((i) => b.createContext(i));
    return function (i) {
      let s = (i == null ? void 0 : i[e]) || l;
      return b.useMemo(() => ({ [`__scope${e}`]: { ...i, [e]: s } }), [i, s]);
    };
  };
  return (o.scopeName = e), [n, O2(o, ...t)];
}
function O2(...e) {
  let t = e[0];
  if (e.length === 1) return t;
  let r = () => {
    let n = e.map((o) => ({ useScope: o(), scopeName: o.scopeName }));
    return function (o) {
      let l = n.reduce((i, { useScope: s, scopeName: c }) => {
        let u = s(o)[`__scope${c}`];
        return { ...i, ...u };
      }, {});
      return b.useMemo(() => ({ [`__scope${t.scopeName}`]: l }), [l]);
    };
  };
  return (r.scopeName = t.scopeName), r;
}
function Rt(e) {
  let t = b.useRef(e);
  return (
    b.useEffect(() => {
      t.current = e;
    }),
    b.useMemo(
      () =>
        (...r) => {
          var n;
          return (n = t.current) === null || n === void 0
            ? void 0
            : n.call(t, ...r);
        },
      []
    )
  );
}
var L2 = b.createContext(void 0);
function _2(e) {
  let t = b.useContext(L2);
  return e || t || 'ltr';
}
function D2(e, [t, r]) {
  return Math.min(r, Math.max(t, e));
}
function Lt(e, t, { checkForDefaultPrevented: r = !0 } = {}) {
  return function (n) {
    if ((e == null || e(n), r === !1 || !n.defaultPrevented))
      return t == null ? void 0 : t(n);
  };
}
function F2(e, t) {
  return b.useReducer((r, n) => t[r][n] ?? r, e);
}
var ws = 'ScrollArea',
  [Cs, F6] = R2(ws),
  [M2, $e] = Cs(ws),
  $2 = b.forwardRef((e, t) => {
    let {
        __scopeScrollArea: r,
        type: n = 'hover',
        dir: o,
        scrollHideDelay: l = 600,
        ...i
      } = e,
      [s, c] = b.useState(null),
      [u, d] = b.useState(null),
      [h, m] = b.useState(null),
      [p, g] = b.useState(null),
      [f, A] = b.useState(null),
      [w, v] = b.useState(0),
      [y, x] = b.useState(0),
      [E, C] = b.useState(!1),
      [S, k] = b.useState(!1),
      R = $t(t, (L) => c(L)),
      O = _2(o);
    return b.createElement(
      M2,
      {
        scope: r,
        type: n,
        dir: O,
        scrollHideDelay: l,
        scrollArea: s,
        viewport: u,
        onViewportChange: d,
        content: h,
        onContentChange: m,
        scrollbarX: p,
        onScrollbarXChange: g,
        scrollbarXEnabled: E,
        onScrollbarXEnabledChange: C,
        scrollbarY: f,
        onScrollbarYChange: A,
        scrollbarYEnabled: S,
        onScrollbarYEnabledChange: k,
        onCornerWidthChange: v,
        onCornerHeightChange: x,
      },
      b.createElement(
        Or.div,
        re({ dir: O }, i, {
          ref: R,
          style: {
            position: 'relative',
            '--radix-scroll-area-corner-width': w + 'px',
            '--radix-scroll-area-corner-height': y + 'px',
            ...e.style,
          },
        })
      )
    );
  }),
  B2 = 'ScrollAreaViewport',
  I2 = b.forwardRef((e, t) => {
    let { __scopeScrollArea: r, children: n, ...o } = e,
      l = $e(B2, r),
      i = b.useRef(null),
      s = $t(t, i, l.onViewportChange);
    return b.createElement(
      b.Fragment,
      null,
      b.createElement('style', {
        dangerouslySetInnerHTML: {
          __html:
            '[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}',
        },
      }),
      b.createElement(
        Or.div,
        re({ 'data-radix-scroll-area-viewport': '' }, o, {
          ref: s,
          style: {
            overflowX: l.scrollbarXEnabled ? 'scroll' : 'hidden',
            overflowY: l.scrollbarYEnabled ? 'scroll' : 'hidden',
            ...e.style,
          },
        }),
        b.createElement(
          'div',
          {
            ref: l.onContentChange,
            style: { minWidth: '100%', display: 'table' },
          },
          n
        )
      )
    );
  }),
  ut = 'ScrollAreaScrollbar',
  N2 = b.forwardRef((e, t) => {
    let { forceMount: r, ...n } = e,
      o = $e(ut, e.__scopeScrollArea),
      { onScrollbarXEnabledChange: l, onScrollbarYEnabledChange: i } = o,
      s = e.orientation === 'horizontal';
    return (
      b.useEffect(
        () => (
          s ? l(!0) : i(!0),
          () => {
            s ? l(!1) : i(!1);
          }
        ),
        [s, l, i]
      ),
      o.type === 'hover'
        ? b.createElement(Z2, re({}, n, { ref: t, forceMount: r }))
        : o.type === 'scroll'
          ? b.createElement(H2, re({}, n, { ref: t, forceMount: r }))
          : o.type === 'auto'
            ? b.createElement(Ss, re({}, n, { ref: t, forceMount: r }))
            : o.type === 'always'
              ? b.createElement(uo, re({}, n, { ref: t }))
              : null
    );
  }),
  Z2 = b.forwardRef((e, t) => {
    let { forceMount: r, ...n } = e,
      o = $e(ut, e.__scopeScrollArea),
      [l, i] = b.useState(!1);
    return (
      b.useEffect(() => {
        let s = o.scrollArea,
          c = 0;
        if (s) {
          let u = () => {
              window.clearTimeout(c), i(!0);
            },
            d = () => {
              c = window.setTimeout(() => i(!1), o.scrollHideDelay);
            };
          return (
            s.addEventListener('pointerenter', u),
            s.addEventListener('pointerleave', d),
            () => {
              window.clearTimeout(c),
                s.removeEventListener('pointerenter', u),
                s.removeEventListener('pointerleave', d);
            }
          );
        }
      }, [o.scrollArea, o.scrollHideDelay]),
      b.createElement(
        Lr,
        { present: r || l },
        b.createElement(
          Ss,
          re({ 'data-state': l ? 'visible' : 'hidden' }, n, { ref: t })
        )
      )
    );
  }),
  H2 = b.forwardRef((e, t) => {
    let { forceMount: r, ...n } = e,
      o = $e(ut, e.__scopeScrollArea),
      l = e.orientation === 'horizontal',
      i = vn(() => c('SCROLL_END'), 100),
      [s, c] = F2('hidden', {
        hidden: { SCROLL: 'scrolling' },
        scrolling: { SCROLL_END: 'idle', POINTER_ENTER: 'interacting' },
        interacting: { SCROLL: 'interacting', POINTER_LEAVE: 'idle' },
        idle: {
          HIDE: 'hidden',
          SCROLL: 'scrolling',
          POINTER_ENTER: 'interacting',
        },
      });
    return (
      b.useEffect(() => {
        if (s === 'idle') {
          let u = window.setTimeout(() => c('HIDE'), o.scrollHideDelay);
          return () => window.clearTimeout(u);
        }
      }, [s, o.scrollHideDelay, c]),
      b.useEffect(() => {
        let u = o.viewport,
          d = l ? 'scrollLeft' : 'scrollTop';
        if (u) {
          let h = u[d],
            m = () => {
              let p = u[d];
              h !== p && (c('SCROLL'), i()), (h = p);
            };
          return (
            u.addEventListener('scroll', m),
            () => u.removeEventListener('scroll', m)
          );
        }
      }, [o.viewport, l, c, i]),
      b.createElement(
        Lr,
        { present: r || s !== 'hidden' },
        b.createElement(
          uo,
          re({ 'data-state': s === 'hidden' ? 'hidden' : 'visible' }, n, {
            ref: t,
            onPointerEnter: Lt(e.onPointerEnter, () => c('POINTER_ENTER')),
            onPointerLeave: Lt(e.onPointerLeave, () => c('POINTER_LEAVE')),
          })
        )
      )
    );
  }),
  Ss = b.forwardRef((e, t) => {
    let r = $e(ut, e.__scopeScrollArea),
      { forceMount: n, ...o } = e,
      [l, i] = b.useState(!1),
      s = e.orientation === 'horizontal',
      c = vn(() => {
        if (r.viewport) {
          let u = r.viewport.offsetWidth < r.viewport.scrollWidth,
            d = r.viewport.offsetHeight < r.viewport.scrollHeight;
          i(s ? u : d);
        }
      }, 10);
    return (
      Yt(r.viewport, c),
      Yt(r.content, c),
      b.createElement(
        Lr,
        { present: n || l },
        b.createElement(
          uo,
          re({ 'data-state': l ? 'visible' : 'hidden' }, o, { ref: t })
        )
      )
    );
  }),
  uo = b.forwardRef((e, t) => {
    let { orientation: r = 'vertical', ...n } = e,
      o = $e(ut, e.__scopeScrollArea),
      l = b.useRef(null),
      i = b.useRef(0),
      [s, c] = b.useState({
        content: 0,
        viewport: 0,
        scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 },
      }),
      u = Os(s.viewport, s.content),
      d = {
        ...n,
        sizes: s,
        onSizesChange: c,
        hasThumb: u > 0 && u < 1,
        onThumbChange: (m) => (l.current = m),
        onThumbPointerUp: () => (i.current = 0),
        onThumbPointerDown: (m) => (i.current = m),
      };
    function h(m, p) {
      return G2(m, i.current, s, p);
    }
    return r === 'horizontal'
      ? b.createElement(
          j2,
          re({}, d, {
            ref: t,
            onThumbPositionChange: () => {
              if (o.viewport && l.current) {
                let m = o.viewport.scrollLeft,
                  p = wl(m, s, o.dir);
                l.current.style.transform = `translate3d(${p}px, 0, 0)`;
              }
            },
            onWheelScroll: (m) => {
              o.viewport && (o.viewport.scrollLeft = m);
            },
            onDragScroll: (m) => {
              o.viewport && (o.viewport.scrollLeft = h(m, o.dir));
            },
          })
        )
      : r === 'vertical'
        ? b.createElement(
            P2,
            re({}, d, {
              ref: t,
              onThumbPositionChange: () => {
                if (o.viewport && l.current) {
                  let m = o.viewport.scrollTop,
                    p = wl(m, s);
                  l.current.style.transform = `translate3d(0, ${p}px, 0)`;
                }
              },
              onWheelScroll: (m) => {
                o.viewport && (o.viewport.scrollTop = m);
              },
              onDragScroll: (m) => {
                o.viewport && (o.viewport.scrollTop = h(m));
              },
            })
          )
        : null;
  }),
  j2 = b.forwardRef((e, t) => {
    let { sizes: r, onSizesChange: n, ...o } = e,
      l = $e(ut, e.__scopeScrollArea),
      [i, s] = b.useState(),
      c = b.useRef(null),
      u = $t(t, c, l.onScrollbarXChange);
    return (
      b.useEffect(() => {
        c.current && s(getComputedStyle(c.current));
      }, [c]),
      b.createElement(
        Ts,
        re({ 'data-orientation': 'horizontal' }, o, {
          ref: u,
          sizes: r,
          style: {
            bottom: 0,
            left: l.dir === 'rtl' ? 'var(--radix-scroll-area-corner-width)' : 0,
            right:
              l.dir === 'ltr' ? 'var(--radix-scroll-area-corner-width)' : 0,
            '--radix-scroll-area-thumb-width': yn(r) + 'px',
            ...e.style,
          },
          onThumbPointerDown: (d) => e.onThumbPointerDown(d.x),
          onDragScroll: (d) => e.onDragScroll(d.x),
          onWheelScroll: (d, h) => {
            if (l.viewport) {
              let m = l.viewport.scrollLeft + d.deltaX;
              e.onWheelScroll(m), _s(m, h) && d.preventDefault();
            }
          },
          onResize: () => {
            c.current &&
              l.viewport &&
              i &&
              n({
                content: l.viewport.scrollWidth,
                viewport: l.viewport.offsetWidth,
                scrollbar: {
                  size: c.current.clientWidth,
                  paddingStart: on(i.paddingLeft),
                  paddingEnd: on(i.paddingRight),
                },
              });
          },
        })
      )
    );
  }),
  P2 = b.forwardRef((e, t) => {
    let { sizes: r, onSizesChange: n, ...o } = e,
      l = $e(ut, e.__scopeScrollArea),
      [i, s] = b.useState(),
      c = b.useRef(null),
      u = $t(t, c, l.onScrollbarYChange);
    return (
      b.useEffect(() => {
        c.current && s(getComputedStyle(c.current));
      }, [c]),
      b.createElement(
        Ts,
        re({ 'data-orientation': 'vertical' }, o, {
          ref: u,
          sizes: r,
          style: {
            top: 0,
            right: l.dir === 'ltr' ? 0 : void 0,
            left: l.dir === 'rtl' ? 0 : void 0,
            bottom: 'var(--radix-scroll-area-corner-height)',
            '--radix-scroll-area-thumb-height': yn(r) + 'px',
            ...e.style,
          },
          onThumbPointerDown: (d) => e.onThumbPointerDown(d.y),
          onDragScroll: (d) => e.onDragScroll(d.y),
          onWheelScroll: (d, h) => {
            if (l.viewport) {
              let m = l.viewport.scrollTop + d.deltaY;
              e.onWheelScroll(m), _s(m, h) && d.preventDefault();
            }
          },
          onResize: () => {
            c.current &&
              l.viewport &&
              i &&
              n({
                content: l.viewport.scrollHeight,
                viewport: l.viewport.offsetHeight,
                scrollbar: {
                  size: c.current.clientHeight,
                  paddingStart: on(i.paddingTop),
                  paddingEnd: on(i.paddingBottom),
                },
              });
          },
        })
      )
    );
  }),
  [V2, ks] = Cs(ut),
  Ts = b.forwardRef((e, t) => {
    let {
        __scopeScrollArea: r,
        sizes: n,
        hasThumb: o,
        onThumbChange: l,
        onThumbPointerUp: i,
        onThumbPointerDown: s,
        onThumbPositionChange: c,
        onDragScroll: u,
        onWheelScroll: d,
        onResize: h,
        ...m
      } = e,
      p = $e(ut, r),
      [g, f] = b.useState(null),
      A = $t(t, (R) => f(R)),
      w = b.useRef(null),
      v = b.useRef(''),
      y = p.viewport,
      x = n.content - n.viewport,
      E = Rt(d),
      C = Rt(c),
      S = vn(h, 10);
    function k(R) {
      if (w.current) {
        let O = R.clientX - w.current.left,
          L = R.clientY - w.current.top;
        u({ x: O, y: L });
      }
    }
    return (
      b.useEffect(() => {
        let R = (O) => {
          let L = O.target;
          g != null && g.contains(L) && E(O, x);
        };
        return (
          document.addEventListener('wheel', R, { passive: !1 }),
          () => document.removeEventListener('wheel', R, { passive: !1 })
        );
      }, [y, g, x, E]),
      b.useEffect(C, [n, C]),
      Yt(g, S),
      Yt(p.content, S),
      b.createElement(
        V2,
        {
          scope: r,
          scrollbar: g,
          hasThumb: o,
          onThumbChange: Rt(l),
          onThumbPointerUp: Rt(i),
          onThumbPositionChange: C,
          onThumbPointerDown: Rt(s),
        },
        b.createElement(
          Or.div,
          re({}, m, {
            ref: A,
            style: { position: 'absolute', ...m.style },
            onPointerDown: Lt(e.onPointerDown, (R) => {
              R.button === 0 &&
                (R.target.setPointerCapture(R.pointerId),
                (w.current = g.getBoundingClientRect()),
                (v.current = document.body.style.webkitUserSelect),
                (document.body.style.webkitUserSelect = 'none'),
                p.viewport && (p.viewport.style.scrollBehavior = 'auto'),
                k(R));
            }),
            onPointerMove: Lt(e.onPointerMove, k),
            onPointerUp: Lt(e.onPointerUp, (R) => {
              let O = R.target;
              O.hasPointerCapture(R.pointerId) &&
                O.releasePointerCapture(R.pointerId),
                (document.body.style.webkitUserSelect = v.current),
                p.viewport && (p.viewport.style.scrollBehavior = ''),
                (w.current = null);
            }),
          })
        )
      )
    );
  }),
  wa = 'ScrollAreaThumb',
  z2 = b.forwardRef((e, t) => {
    let { forceMount: r, ...n } = e,
      o = ks(wa, e.__scopeScrollArea);
    return b.createElement(
      Lr,
      { present: r || o.hasThumb },
      b.createElement(q2, re({ ref: t }, n))
    );
  }),
  q2 = b.forwardRef((e, t) => {
    let { __scopeScrollArea: r, style: n, ...o } = e,
      l = $e(wa, r),
      i = ks(wa, r),
      { onThumbPositionChange: s } = i,
      c = $t(t, (h) => i.onThumbChange(h)),
      u = b.useRef(),
      d = vn(() => {
        u.current && (u.current(), (u.current = void 0));
      }, 100);
    return (
      b.useEffect(() => {
        let h = l.viewport;
        if (h) {
          let m = () => {
            if ((d(), !u.current)) {
              let p = Y2(h, s);
              (u.current = p), s();
            }
          };
          return (
            s(),
            h.addEventListener('scroll', m),
            () => h.removeEventListener('scroll', m)
          );
        }
      }, [l.viewport, d, s]),
      b.createElement(
        Or.div,
        re({ 'data-state': i.hasThumb ? 'visible' : 'hidden' }, o, {
          ref: c,
          style: {
            width: 'var(--radix-scroll-area-thumb-width)',
            height: 'var(--radix-scroll-area-thumb-height)',
            ...n,
          },
          onPointerDownCapture: Lt(e.onPointerDownCapture, (h) => {
            let m = h.target.getBoundingClientRect(),
              p = h.clientX - m.left,
              g = h.clientY - m.top;
            i.onThumbPointerDown({ x: p, y: g });
          }),
          onPointerUp: Lt(e.onPointerUp, i.onThumbPointerUp),
        })
      )
    );
  }),
  Rs = 'ScrollAreaCorner',
  U2 = b.forwardRef((e, t) => {
    let r = $e(Rs, e.__scopeScrollArea),
      n = !!(r.scrollbarX && r.scrollbarY);
    return r.type !== 'scroll' && n
      ? b.createElement(W2, re({}, e, { ref: t }))
      : null;
  }),
  W2 = b.forwardRef((e, t) => {
    let { __scopeScrollArea: r, ...n } = e,
      o = $e(Rs, r),
      [l, i] = b.useState(0),
      [s, c] = b.useState(0),
      u = !!(l && s);
    return (
      Yt(o.scrollbarX, () => {
        var d;
        let h =
          ((d = o.scrollbarX) === null || d === void 0
            ? void 0
            : d.offsetHeight) || 0;
        o.onCornerHeightChange(h), c(h);
      }),
      Yt(o.scrollbarY, () => {
        var d;
        let h =
          ((d = o.scrollbarY) === null || d === void 0
            ? void 0
            : d.offsetWidth) || 0;
        o.onCornerWidthChange(h), i(h);
      }),
      u
        ? b.createElement(
            Or.div,
            re({}, n, {
              ref: t,
              style: {
                width: l,
                height: s,
                position: 'absolute',
                right: o.dir === 'ltr' ? 0 : void 0,
                left: o.dir === 'rtl' ? 0 : void 0,
                bottom: 0,
                ...e.style,
              },
            })
          )
        : null
    );
  });
function on(e) {
  return e ? parseInt(e, 10) : 0;
}
function Os(e, t) {
  let r = e / t;
  return isNaN(r) ? 0 : r;
}
function yn(e) {
  let t = Os(e.viewport, e.content),
    r = e.scrollbar.paddingStart + e.scrollbar.paddingEnd,
    n = (e.scrollbar.size - r) * t;
  return Math.max(n, 18);
}
function G2(e, t, r, n = 'ltr') {
  let o = yn(r),
    l = o / 2,
    i = t || l,
    s = o - i,
    c = r.scrollbar.paddingStart + i,
    u = r.scrollbar.size - r.scrollbar.paddingEnd - s,
    d = r.content - r.viewport,
    h = n === 'ltr' ? [0, d] : [d * -1, 0];
  return Ls([c, u], h)(e);
}
function wl(e, t, r = 'ltr') {
  let n = yn(t),
    o = t.scrollbar.paddingStart + t.scrollbar.paddingEnd,
    l = t.scrollbar.size - o,
    i = t.content - t.viewport,
    s = l - n,
    c = r === 'ltr' ? [0, i] : [i * -1, 0],
    u = D2(e, c);
  return Ls([0, i], [0, s])(u);
}
function Ls(e, t) {
  return (r) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    let n = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + n * (r - e[0]);
  };
}
function _s(e, t) {
  return e > 0 && e < t;
}
var Y2 = (e, t = () => {}) => {
  let r = { left: e.scrollLeft, top: e.scrollTop },
    n = 0;
  return (
    (function o() {
      let l = { left: e.scrollLeft, top: e.scrollTop },
        i = r.left !== l.left,
        s = r.top !== l.top;
      (i || s) && t(), (r = l), (n = window.requestAnimationFrame(o));
    })(),
    () => window.cancelAnimationFrame(n)
  );
};
function vn(e, t) {
  let r = Rt(e),
    n = b.useRef(0);
  return (
    b.useEffect(() => () => window.clearTimeout(n.current), []),
    b.useCallback(() => {
      window.clearTimeout(n.current), (n.current = window.setTimeout(r, t));
    }, [r, t])
  );
}
function Yt(e, t) {
  let r = Rt(t);
  Aa(() => {
    let n = 0;
    if (e) {
      let o = new ResizeObserver(() => {
        cancelAnimationFrame(n), (n = window.requestAnimationFrame(r));
      });
      return (
        o.observe(e),
        () => {
          window.cancelAnimationFrame(n), o.unobserve(e);
        }
      );
    }
  }, [e, r]);
}
var K2 = $2,
  X2 = I2,
  J2 = N2,
  Q2 = z2,
  ep = U2,
  tp = T(K2)(({ scrollbarsize: e, offset: t }) => ({
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    '--scrollbar-size': `${e + t}px`,
    '--radix-scroll-area-thumb-width': `${e}px`,
  })),
  rp = T(X2)({ width: '100%', height: '100%' }),
  Cl = T(J2)(({ offset: e, horizontal: t, vertical: r }) => ({
    display: 'flex',
    userSelect: 'none',
    touchAction: 'none',
    background: 'transparent',
    transition: 'all 0.2s ease-out',
    borderRadius: 'var(--scrollbar-size)',
    '&[data-orientation="vertical"]': {
      width: 'var(--scrollbar-size)',
      paddingRight: e,
      marginTop: e,
      marginBottom: t === 'true' && r === 'true' ? 0 : e,
    },
    '&[data-orientation="horizontal"]': {
      flexDirection: 'column',
      height: 'var(--scrollbar-size)',
      paddingBottom: e,
      marginLeft: e,
      marginRight: t === 'true' && r === 'true' ? 0 : e,
    },
  })),
  Sl = T(Q2)(({ theme: e }) => ({
    flex: 1,
    background: e.textMutedColor,
    opacity: 0.5,
    borderRadius: 'var(--scrollbar-size)',
    position: 'relative',
    transition: 'opacity 0.2s ease-out',
    '&:hover': { opacity: 0.8 },
    '::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      width: '100%',
      height: '100%',
      minWidth: 44,
      minHeight: 44,
    },
  })),
  po = ({
    children: e,
    horizontal: t = !1,
    vertical: r = !1,
    offset: n = 2,
    scrollbarSize: o = 6,
    className: l,
  }) =>
    a.createElement(
      tp,
      { scrollbarsize: o, offset: n, className: l },
      a.createElement(rp, null, e),
      t &&
        a.createElement(
          Cl,
          {
            orientation: 'horizontal',
            offset: n,
            horizontal: t.toString(),
            vertical: r.toString(),
          },
          a.createElement(Sl, null)
        ),
      r &&
        a.createElement(
          Cl,
          {
            orientation: 'vertical',
            offset: n,
            horizontal: t.toString(),
            vertical: r.toString(),
          },
          a.createElement(Sl, null)
        ),
      t && r && a.createElement(ep, null)
    ),
  { navigator: Hr, document: cr, window: np } = Td;
Te.registerLanguage('jsextra', $d);
Te.registerLanguage('jsx', Od);
Te.registerLanguage('json', Id);
Te.registerLanguage('yml', qd);
Te.registerLanguage('md', Vd);
Te.registerLanguage('bash', _d);
Te.registerLanguage('css', Fd);
Te.registerLanguage('html', jd);
Te.registerLanguage('tsx', Wd);
Te.registerLanguage('typescript', Yd);
Te.registerLanguage('graphql', Zd);
var ap = tr(2)((e) =>
    Object.entries(e.code || {}).reduce(
      (t, [r, n]) => ({ ...t, [`* .${r}`]: n }),
      {}
    )
  ),
  op = Ds();
function Ds() {
  return Hr != null && Hr.clipboard
    ? (e) => Hr.clipboard.writeText(e)
    : async (e) => {
        let t = cr.createElement('TEXTAREA'),
          r = cr.activeElement;
        (t.value = e),
          cr.body.appendChild(t),
          t.select(),
          cr.execCommand('copy'),
          cr.body.removeChild(t),
          r.focus();
      };
}
var lp = T.div(
    ({ theme: e }) => ({
      position: 'relative',
      overflow: 'hidden',
      color: e.color.defaultText,
    }),
    ({ theme: e, bordered: t }) =>
      t
        ? {
            border: `1px solid ${e.appBorderColor}`,
            borderRadius: e.borderRadius,
            background: e.background.content,
          }
        : {},
    ({ showLineNumbers: e }) =>
      e
        ? {
            '.react-syntax-highlighter-line-number::before': {
              content: 'attr(data-line-number)',
            },
          }
        : {}
  ),
  ip = ({ children: e, className: t }) =>
    a.createElement(po, { horizontal: !0, vertical: !0, className: t }, e),
  sp = T(ip)({ position: 'relative' }, ({ theme: e }) => ap(e)),
  cp = T.pre(({ theme: e, padded: t }) => ({
    display: 'flex',
    justifyContent: 'flex-start',
    margin: 0,
    padding: t ? e.layoutMargin : 0,
  })),
  up = T.div(({ theme: e }) => ({
    flex: 1,
    paddingLeft: 2,
    paddingRight: e.layoutMargin,
    opacity: 1,
  })),
  Fs = (e) => {
    let t = [...e.children],
      r = t[0],
      n = r.children[0].value,
      o = {
        ...r,
        children: [],
        properties: {
          ...r.properties,
          'data-line-number': n,
          style: { ...r.properties.style, userSelect: 'auto' },
        },
      };
    return (t[0] = o), { ...e, children: t };
  },
  dp = ({ rows: e, stylesheet: t, useInlineStyles: r }) =>
    e.map((n, o) =>
      lo({
        node: Fs(n),
        stylesheet: t,
        useInlineStyles: r,
        key: `code-segement${o}`,
      })
    ),
  pp = (e, t) =>
    t
      ? e
        ? ({ rows: r, ...n }) => e({ rows: r.map((o) => Fs(o)), ...n })
        : dp
      : e,
  fo = ({
    children: e,
    language: t = 'jsx',
    copyable: r = !1,
    bordered: n = !1,
    padded: o = !1,
    format: l = !0,
    formatter: i = null,
    className: s = null,
    showLineNumbers: c = !1,
    ...u
  }) => {
    if (typeof e != 'string' || !e.trim()) return null;
    let d = i ? i(l, e) : e.trim(),
      [h, m] = b.useState(!1),
      p = b.useCallback(
        (f) => {
          f.preventDefault(),
            op(d)
              .then(() => {
                m(!0), np.setTimeout(() => m(!1), 1500);
              })
              .catch(kd.error);
        },
        [d]
      ),
      g = pp(u.renderer, c);
    return a.createElement(
      lp,
      { bordered: n, padded: o, showLineNumbers: c, className: s },
      a.createElement(
        sp,
        null,
        a.createElement(
          Te,
          {
            padded: o || n,
            language: t,
            showLineNumbers: c,
            showInlineLineNumbers: c,
            useInlineStyles: !1,
            PreTag: cp,
            CodeTag: up,
            lineNumberContainerStyle: {},
            ...u,
            renderer: g,
          },
          d
        )
      ),
      r
        ? a.createElement(co, {
            actionItems: [{ title: h ? 'Copied' : 'Copy', onClick: p }],
          })
        : null
    );
  };
fo.registerLanguage = (...e) => Te.registerLanguage(...e);
var M6 = fo;
const { global: fp } = __STORYBOOK_MODULE_GLOBAL__;
var mp = B({
  '../../node_modules/react-fast-compare/index.js'(e, t) {
    var r = typeof Element < 'u',
      n = typeof Map == 'function',
      o = typeof Set == 'function',
      l = typeof ArrayBuffer == 'function' && !!ArrayBuffer.isView;
    function i(s, c) {
      if (s === c) return !0;
      if (s && c && typeof s == 'object' && typeof c == 'object') {
        if (s.constructor !== c.constructor) return !1;
        var u, d, h;
        if (Array.isArray(s)) {
          if (((u = s.length), u != c.length)) return !1;
          for (d = u; d-- !== 0; ) if (!i(s[d], c[d])) return !1;
          return !0;
        }
        var m;
        if (n && s instanceof Map && c instanceof Map) {
          if (s.size !== c.size) return !1;
          for (m = s.entries(); !(d = m.next()).done; )
            if (!c.has(d.value[0])) return !1;
          for (m = s.entries(); !(d = m.next()).done; )
            if (!i(d.value[1], c.get(d.value[0]))) return !1;
          return !0;
        }
        if (o && s instanceof Set && c instanceof Set) {
          if (s.size !== c.size) return !1;
          for (m = s.entries(); !(d = m.next()).done; )
            if (!c.has(d.value[0])) return !1;
          return !0;
        }
        if (l && ArrayBuffer.isView(s) && ArrayBuffer.isView(c)) {
          if (((u = s.length), u != c.length)) return !1;
          for (d = u; d-- !== 0; ) if (s[d] !== c[d]) return !1;
          return !0;
        }
        if (s.constructor === RegExp)
          return s.source === c.source && s.flags === c.flags;
        if (
          s.valueOf !== Object.prototype.valueOf &&
          typeof s.valueOf == 'function' &&
          typeof c.valueOf == 'function'
        )
          return s.valueOf() === c.valueOf();
        if (
          s.toString !== Object.prototype.toString &&
          typeof s.toString == 'function' &&
          typeof c.toString == 'function'
        )
          return s.toString() === c.toString();
        if (((h = Object.keys(s)), (u = h.length), u !== Object.keys(c).length))
          return !1;
        for (d = u; d-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(c, h[d])) return !1;
        if (r && s instanceof Element) return !1;
        for (d = u; d-- !== 0; )
          if (
            !(
              (h[d] === '_owner' || h[d] === '__v' || h[d] === '__o') &&
              s.$$typeof
            ) &&
            !i(s[h[d]], c[h[d]])
          )
            return !1;
        return !0;
      }
      return s !== s && c !== c;
    }
    t.exports = function (s, c) {
      try {
        return i(s, c);
      } catch (u) {
        if ((u.message || '').match(/stack|recursion/i))
          return (
            console.warn('react-fast-compare cannot handle circular refs'), !1
          );
        throw u;
      }
    };
  },
});
function gp(e, t) {
  if (e == null) return {};
  var r = {},
    n = Object.keys(e),
    o,
    l;
  for (l = 0; l < n.length; l++)
    (o = n[l]), !(t.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
function lt() {
  return (
    (lt = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    lt.apply(this, arguments)
  );
}
var kl = function (e) {
    return e.reduce(function (t, r) {
      var n = r[0],
        o = r[1];
      return (t[n] = o), t;
    }, {});
  },
  Tl =
    typeof window < 'u' && window.document && window.document.createElement
      ? b.useLayoutEffect
      : b.useEffect,
  xe = 'top',
  Fe = 'bottom',
  Me = 'right',
  Ae = 'left',
  En = 'auto',
  _r = [xe, Fe, Me, Ae],
  Kt = 'start',
  Er = 'end',
  hp = 'clippingParents',
  Ms = 'viewport',
  ur = 'popper',
  bp = 'reference',
  Rl = _r.reduce(function (e, t) {
    return e.concat([t + '-' + Kt, t + '-' + Er]);
  }, []),
  $s = [].concat(_r, [En]).reduce(function (e, t) {
    return e.concat([t, t + '-' + Kt, t + '-' + Er]);
  }, []),
  yp = 'beforeRead',
  vp = 'read',
  Ep = 'afterRead',
  xp = 'beforeMain',
  Ap = 'main',
  wp = 'afterMain',
  Cp = 'beforeWrite',
  Sp = 'write',
  kp = 'afterWrite',
  Tp = [yp, vp, Ep, xp, Ap, wp, Cp, Sp, kp];
function rt(e) {
  return e ? (e.nodeName || '').toLowerCase() : null;
}
function Se(e) {
  if (e == null) return window;
  if (e.toString() !== '[object Window]') {
    var t = e.ownerDocument;
    return (t && t.defaultView) || window;
  }
  return e;
}
function Mt(e) {
  var t = Se(e).Element;
  return e instanceof t || e instanceof Element;
}
function De(e) {
  var t = Se(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function mo(e) {
  if (typeof ShadowRoot > 'u') return !1;
  var t = Se(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Rp(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function (r) {
    var n = t.styles[r] || {},
      o = t.attributes[r] || {},
      l = t.elements[r];
    !De(l) ||
      !rt(l) ||
      (Object.assign(l.style, n),
      Object.keys(o).forEach(function (i) {
        var s = o[i];
        s === !1 ? l.removeAttribute(i) : l.setAttribute(i, s === !0 ? '' : s);
      }));
  });
}
function Op(e) {
  var t = e.state,
    r = {
      popper: {
        position: t.options.strategy,
        left: '0',
        top: '0',
        margin: '0',
      },
      arrow: { position: 'absolute' },
      reference: {},
    };
  return (
    Object.assign(t.elements.popper.style, r.popper),
    (t.styles = r),
    t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow),
    function () {
      Object.keys(t.elements).forEach(function (n) {
        var o = t.elements[n],
          l = t.attributes[n] || {},
          i = Object.keys(t.styles.hasOwnProperty(n) ? t.styles[n] : r[n]),
          s = i.reduce(function (c, u) {
            return (c[u] = ''), c;
          }, {});
        !De(o) ||
          !rt(o) ||
          (Object.assign(o.style, s),
          Object.keys(l).forEach(function (c) {
            o.removeAttribute(c);
          }));
      });
    }
  );
}
var Lp = {
  name: 'applyStyles',
  enabled: !0,
  phase: 'write',
  fn: Rp,
  effect: Op,
  requires: ['computeStyles'],
};
function tt(e) {
  return e.split('-')[0];
}
var _t = Math.max,
  ln = Math.min,
  Xt = Math.round;
function Ca() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands)
    ? e.brands
        .map(function (t) {
          return t.brand + '/' + t.version;
        })
        .join(' ')
    : navigator.userAgent;
}
function Bs() {
  return !/^((?!chrome|android).)*safari/i.test(Ca());
}
function Jt(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  var n = e.getBoundingClientRect(),
    o = 1,
    l = 1;
  t &&
    De(e) &&
    ((o = (e.offsetWidth > 0 && Xt(n.width) / e.offsetWidth) || 1),
    (l = (e.offsetHeight > 0 && Xt(n.height) / e.offsetHeight) || 1));
  var i = Mt(e) ? Se(e) : window,
    s = i.visualViewport,
    c = !Bs() && r,
    u = (n.left + (c && s ? s.offsetLeft : 0)) / o,
    d = (n.top + (c && s ? s.offsetTop : 0)) / l,
    h = n.width / o,
    m = n.height / l;
  return {
    width: h,
    height: m,
    top: d,
    right: u + h,
    bottom: d + m,
    left: u,
    x: u,
    y: d,
  };
}
function go(e) {
  var t = Jt(e),
    r = e.offsetWidth,
    n = e.offsetHeight;
  return (
    Math.abs(t.width - r) <= 1 && (r = t.width),
    Math.abs(t.height - n) <= 1 && (n = t.height),
    { x: e.offsetLeft, y: e.offsetTop, width: r, height: n }
  );
}
function Is(e, t) {
  var r = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (r && mo(r)) {
    var n = t;
    do {
      if (n && e.isSameNode(n)) return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function ct(e) {
  return Se(e).getComputedStyle(e);
}
function _p(e) {
  return ['table', 'td', 'th'].indexOf(rt(e)) >= 0;
}
function Et(e) {
  return ((Mt(e) ? e.ownerDocument : e.document) || window.document)
    .documentElement;
}
function xn(e) {
  return rt(e) === 'html'
    ? e
    : e.assignedSlot || e.parentNode || (mo(e) ? e.host : null) || Et(e);
}
function Ol(e) {
  return !De(e) || ct(e).position === 'fixed' ? null : e.offsetParent;
}
function Dp(e) {
  var t = /firefox/i.test(Ca()),
    r = /Trident/i.test(Ca());
  if (r && De(e)) {
    var n = ct(e);
    if (n.position === 'fixed') return null;
  }
  var o = xn(e);
  for (mo(o) && (o = o.host); De(o) && ['html', 'body'].indexOf(rt(o)) < 0; ) {
    var l = ct(o);
    if (
      l.transform !== 'none' ||
      l.perspective !== 'none' ||
      l.contain === 'paint' ||
      ['transform', 'perspective'].indexOf(l.willChange) !== -1 ||
      (t && l.willChange === 'filter') ||
      (t && l.filter && l.filter !== 'none')
    )
      return o;
    o = o.parentNode;
  }
  return null;
}
function Dr(e) {
  for (var t = Se(e), r = Ol(e); r && _p(r) && ct(r).position === 'static'; )
    r = Ol(r);
  return r &&
    (rt(r) === 'html' || (rt(r) === 'body' && ct(r).position === 'static'))
    ? t
    : r || Dp(e) || t;
}
function ho(e) {
  return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y';
}
function fr(e, t, r) {
  return _t(e, ln(t, r));
}
function Fp(e, t, r) {
  var n = fr(e, t, r);
  return n > r ? r : n;
}
function Ns() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function Zs(e) {
  return Object.assign({}, Ns(), e);
}
function Hs(e, t) {
  return t.reduce(function (r, n) {
    return (r[n] = e), r;
  }, {});
}
var Mp = function (e, t) {
  return (
    (e =
      typeof e == 'function'
        ? e(Object.assign({}, t.rects, { placement: t.placement }))
        : e),
    Zs(typeof e != 'number' ? e : Hs(e, _r))
  );
};
function $p(e) {
  var t,
    r = e.state,
    n = e.name,
    o = e.options,
    l = r.elements.arrow,
    i = r.modifiersData.popperOffsets,
    s = tt(r.placement),
    c = ho(s),
    u = [Ae, Me].indexOf(s) >= 0,
    d = u ? 'height' : 'width';
  if (!(!l || !i)) {
    var h = Mp(o.padding, r),
      m = go(l),
      p = c === 'y' ? xe : Ae,
      g = c === 'y' ? Fe : Me,
      f =
        r.rects.reference[d] + r.rects.reference[c] - i[c] - r.rects.popper[d],
      A = i[c] - r.rects.reference[c],
      w = Dr(l),
      v = w ? (c === 'y' ? w.clientHeight || 0 : w.clientWidth || 0) : 0,
      y = f / 2 - A / 2,
      x = h[p],
      E = v - m[d] - h[g],
      C = v / 2 - m[d] / 2 + y,
      S = fr(x, C, E),
      k = c;
    r.modifiersData[n] = ((t = {}), (t[k] = S), (t.centerOffset = S - C), t);
  }
}
function Bp(e) {
  var t = e.state,
    r = e.options,
    n = r.element,
    o = n === void 0 ? '[data-popper-arrow]' : n;
  o != null &&
    ((typeof o == 'string' && ((o = t.elements.popper.querySelector(o)), !o)) ||
      (Is(t.elements.popper, o) && (t.elements.arrow = o)));
}
var Ip = {
  name: 'arrow',
  enabled: !0,
  phase: 'main',
  fn: $p,
  effect: Bp,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow'],
};
function Qt(e) {
  return e.split('-')[1];
}
var Np = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' };
function Zp(e, t) {
  var r = e.x,
    n = e.y,
    o = t.devicePixelRatio || 1;
  return { x: Xt(r * o) / o || 0, y: Xt(n * o) / o || 0 };
}
function Ll(e) {
  var t,
    r = e.popper,
    n = e.popperRect,
    o = e.placement,
    l = e.variation,
    i = e.offsets,
    s = e.position,
    c = e.gpuAcceleration,
    u = e.adaptive,
    d = e.roundOffsets,
    h = e.isFixed,
    m = i.x,
    p = m === void 0 ? 0 : m,
    g = i.y,
    f = g === void 0 ? 0 : g,
    A = typeof d == 'function' ? d({ x: p, y: f }) : { x: p, y: f };
  (p = A.x), (f = A.y);
  var w = i.hasOwnProperty('x'),
    v = i.hasOwnProperty('y'),
    y = Ae,
    x = xe,
    E = window;
  if (u) {
    var C = Dr(r),
      S = 'clientHeight',
      k = 'clientWidth';
    if (
      (C === Se(r) &&
        ((C = Et(r)),
        ct(C).position !== 'static' &&
          s === 'absolute' &&
          ((S = 'scrollHeight'), (k = 'scrollWidth'))),
      (C = C),
      o === xe || ((o === Ae || o === Me) && l === Er))
    ) {
      x = Fe;
      var R = h && C === E && E.visualViewport ? E.visualViewport.height : C[S];
      (f -= R - n.height), (f *= c ? 1 : -1);
    }
    if (o === Ae || ((o === xe || o === Fe) && l === Er)) {
      y = Me;
      var O = h && C === E && E.visualViewport ? E.visualViewport.width : C[k];
      (p -= O - n.width), (p *= c ? 1 : -1);
    }
  }
  var L = Object.assign({ position: s }, u && Np),
    _ = d === !0 ? Zp({ x: p, y: f }, Se(r)) : { x: p, y: f };
  if (((p = _.x), (f = _.y), c)) {
    var D;
    return Object.assign(
      {},
      L,
      ((D = {}),
      (D[x] = v ? '0' : ''),
      (D[y] = w ? '0' : ''),
      (D.transform =
        (E.devicePixelRatio || 1) <= 1
          ? 'translate(' + p + 'px, ' + f + 'px)'
          : 'translate3d(' + p + 'px, ' + f + 'px, 0)'),
      D)
    );
  }
  return Object.assign(
    {},
    L,
    ((t = {}),
    (t[x] = v ? f + 'px' : ''),
    (t[y] = w ? p + 'px' : ''),
    (t.transform = ''),
    t)
  );
}
function Hp(e) {
  var t = e.state,
    r = e.options,
    n = r.gpuAcceleration,
    o = n === void 0 ? !0 : n,
    l = r.adaptive,
    i = l === void 0 ? !0 : l,
    s = r.roundOffsets,
    c = s === void 0 ? !0 : s,
    u = {
      placement: tt(t.placement),
      variation: Qt(t.placement),
      popper: t.elements.popper,
      popperRect: t.rects.popper,
      gpuAcceleration: o,
      isFixed: t.options.strategy === 'fixed',
    };
  t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      Ll(
        Object.assign({}, u, {
          offsets: t.modifiersData.popperOffsets,
          position: t.options.strategy,
          adaptive: i,
          roundOffsets: c,
        })
      )
    )),
    t.modifiersData.arrow != null &&
      (t.styles.arrow = Object.assign(
        {},
        t.styles.arrow,
        Ll(
          Object.assign({}, u, {
            offsets: t.modifiersData.arrow,
            position: 'absolute',
            adaptive: !1,
            roundOffsets: c,
          })
        )
      )),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      'data-popper-placement': t.placement,
    }));
}
var jp = {
    name: 'computeStyles',
    enabled: !0,
    phase: 'beforeWrite',
    fn: Hp,
    data: {},
  },
  jr = { passive: !0 };
function Pp(e) {
  var t = e.state,
    r = e.instance,
    n = e.options,
    o = n.scroll,
    l = o === void 0 ? !0 : o,
    i = n.resize,
    s = i === void 0 ? !0 : i,
    c = Se(t.elements.popper),
    u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return (
    l &&
      u.forEach(function (d) {
        d.addEventListener('scroll', r.update, jr);
      }),
    s && c.addEventListener('resize', r.update, jr),
    function () {
      l &&
        u.forEach(function (d) {
          d.removeEventListener('scroll', r.update, jr);
        }),
        s && c.removeEventListener('resize', r.update, jr);
    }
  );
}
var Vp = {
    name: 'eventListeners',
    enabled: !0,
    phase: 'write',
    fn: function () {},
    effect: Pp,
    data: {},
  },
  zp = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
function Kr(e) {
  return e.replace(/left|right|bottom|top/g, function (t) {
    return zp[t];
  });
}
var qp = { start: 'end', end: 'start' };
function _l(e) {
  return e.replace(/start|end/g, function (t) {
    return qp[t];
  });
}
function bo(e) {
  var t = Se(e),
    r = t.pageXOffset,
    n = t.pageYOffset;
  return { scrollLeft: r, scrollTop: n };
}
function yo(e) {
  return Jt(Et(e)).left + bo(e).scrollLeft;
}
function Up(e, t) {
  var r = Se(e),
    n = Et(e),
    o = r.visualViewport,
    l = n.clientWidth,
    i = n.clientHeight,
    s = 0,
    c = 0;
  if (o) {
    (l = o.width), (i = o.height);
    var u = Bs();
    (u || (!u && t === 'fixed')) && ((s = o.offsetLeft), (c = o.offsetTop));
  }
  return { width: l, height: i, x: s + yo(e), y: c };
}
function Wp(e) {
  var t,
    r = Et(e),
    n = bo(e),
    o = (t = e.ownerDocument) == null ? void 0 : t.body,
    l = _t(
      r.scrollWidth,
      r.clientWidth,
      o ? o.scrollWidth : 0,
      o ? o.clientWidth : 0
    ),
    i = _t(
      r.scrollHeight,
      r.clientHeight,
      o ? o.scrollHeight : 0,
      o ? o.clientHeight : 0
    ),
    s = -n.scrollLeft + yo(e),
    c = -n.scrollTop;
  return (
    ct(o || r).direction === 'rtl' &&
      (s += _t(r.clientWidth, o ? o.clientWidth : 0) - l),
    { width: l, height: i, x: s, y: c }
  );
}
function vo(e) {
  var t = ct(e),
    r = t.overflow,
    n = t.overflowX,
    o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + o + n);
}
function js(e) {
  return ['html', 'body', '#document'].indexOf(rt(e)) >= 0
    ? e.ownerDocument.body
    : De(e) && vo(e)
      ? e
      : js(xn(e));
}
function mr(e, t) {
  var r;
  t === void 0 && (t = []);
  var n = js(e),
    o = n === ((r = e.ownerDocument) == null ? void 0 : r.body),
    l = Se(n),
    i = o ? [l].concat(l.visualViewport || [], vo(n) ? n : []) : n,
    s = t.concat(i);
  return o ? s : s.concat(mr(xn(i)));
}
function Sa(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height,
  });
}
function Gp(e, t) {
  var r = Jt(e, !1, t === 'fixed');
  return (
    (r.top = r.top + e.clientTop),
    (r.left = r.left + e.clientLeft),
    (r.bottom = r.top + e.clientHeight),
    (r.right = r.left + e.clientWidth),
    (r.width = e.clientWidth),
    (r.height = e.clientHeight),
    (r.x = r.left),
    (r.y = r.top),
    r
  );
}
function Dl(e, t, r) {
  return t === Ms ? Sa(Up(e, r)) : Mt(t) ? Gp(t, r) : Sa(Wp(Et(e)));
}
function Yp(e) {
  var t = mr(xn(e)),
    r = ['absolute', 'fixed'].indexOf(ct(e).position) >= 0,
    n = r && De(e) ? Dr(e) : e;
  return Mt(n)
    ? t.filter(function (o) {
        return Mt(o) && Is(o, n) && rt(o) !== 'body';
      })
    : [];
}
function Kp(e, t, r, n) {
  var o = t === 'clippingParents' ? Yp(e) : [].concat(t),
    l = [].concat(o, [r]),
    i = l[0],
    s = l.reduce(
      function (c, u) {
        var d = Dl(e, u, n);
        return (
          (c.top = _t(d.top, c.top)),
          (c.right = ln(d.right, c.right)),
          (c.bottom = ln(d.bottom, c.bottom)),
          (c.left = _t(d.left, c.left)),
          c
        );
      },
      Dl(e, i, n)
    );
  return (
    (s.width = s.right - s.left),
    (s.height = s.bottom - s.top),
    (s.x = s.left),
    (s.y = s.top),
    s
  );
}
function Ps(e) {
  var t = e.reference,
    r = e.element,
    n = e.placement,
    o = n ? tt(n) : null,
    l = n ? Qt(n) : null,
    i = t.x + t.width / 2 - r.width / 2,
    s = t.y + t.height / 2 - r.height / 2,
    c;
  switch (o) {
    case xe:
      c = { x: i, y: t.y - r.height };
      break;
    case Fe:
      c = { x: i, y: t.y + t.height };
      break;
    case Me:
      c = { x: t.x + t.width, y: s };
      break;
    case Ae:
      c = { x: t.x - r.width, y: s };
      break;
    default:
      c = { x: t.x, y: t.y };
  }
  var u = o ? ho(o) : null;
  if (u != null) {
    var d = u === 'y' ? 'height' : 'width';
    switch (l) {
      case Kt:
        c[u] = c[u] - (t[d] / 2 - r[d] / 2);
        break;
      case Er:
        c[u] = c[u] + (t[d] / 2 - r[d] / 2);
        break;
    }
  }
  return c;
}
function xr(e, t) {
  t === void 0 && (t = {});
  var r = t,
    n = r.placement,
    o = n === void 0 ? e.placement : n,
    l = r.strategy,
    i = l === void 0 ? e.strategy : l,
    s = r.boundary,
    c = s === void 0 ? hp : s,
    u = r.rootBoundary,
    d = u === void 0 ? Ms : u,
    h = r.elementContext,
    m = h === void 0 ? ur : h,
    p = r.altBoundary,
    g = p === void 0 ? !1 : p,
    f = r.padding,
    A = f === void 0 ? 0 : f,
    w = Zs(typeof A != 'number' ? A : Hs(A, _r)),
    v = m === ur ? bp : ur,
    y = e.rects.popper,
    x = e.elements[g ? v : m],
    E = Kp(Mt(x) ? x : x.contextElement || Et(e.elements.popper), c, d, i),
    C = Jt(e.elements.reference),
    S = Ps({ reference: C, element: y, strategy: 'absolute', placement: o }),
    k = Sa(Object.assign({}, y, S)),
    R = m === ur ? k : C,
    O = {
      top: E.top - R.top + w.top,
      bottom: R.bottom - E.bottom + w.bottom,
      left: E.left - R.left + w.left,
      right: R.right - E.right + w.right,
    },
    L = e.modifiersData.offset;
  if (m === ur && L) {
    var _ = L[o];
    Object.keys(O).forEach(function (D) {
      var H = [Me, Fe].indexOf(D) >= 0 ? 1 : -1,
        M = [xe, Fe].indexOf(D) >= 0 ? 'y' : 'x';
      O[D] += _[M] * H;
    });
  }
  return O;
}
function Xp(e, t) {
  t === void 0 && (t = {});
  var r = t,
    n = r.placement,
    o = r.boundary,
    l = r.rootBoundary,
    i = r.padding,
    s = r.flipVariations,
    c = r.allowedAutoPlacements,
    u = c === void 0 ? $s : c,
    d = Qt(n),
    h = d
      ? s
        ? Rl
        : Rl.filter(function (g) {
            return Qt(g) === d;
          })
      : _r,
    m = h.filter(function (g) {
      return u.indexOf(g) >= 0;
    });
  m.length === 0 && (m = h);
  var p = m.reduce(function (g, f) {
    return (
      (g[f] = xr(e, { placement: f, boundary: o, rootBoundary: l, padding: i })[
        tt(f)
      ]),
      g
    );
  }, {});
  return Object.keys(p).sort(function (g, f) {
    return p[g] - p[f];
  });
}
function Jp(e) {
  if (tt(e) === En) return [];
  var t = Kr(e);
  return [_l(e), t, _l(t)];
}
function Qp(e) {
  var t = e.state,
    r = e.options,
    n = e.name;
  if (!t.modifiersData[n]._skip) {
    for (
      var o = r.mainAxis,
        l = o === void 0 ? !0 : o,
        i = r.altAxis,
        s = i === void 0 ? !0 : i,
        c = r.fallbackPlacements,
        u = r.padding,
        d = r.boundary,
        h = r.rootBoundary,
        m = r.altBoundary,
        p = r.flipVariations,
        g = p === void 0 ? !0 : p,
        f = r.allowedAutoPlacements,
        A = t.options.placement,
        w = tt(A),
        v = w === A,
        y = c || (v || !g ? [Kr(A)] : Jp(A)),
        x = [A].concat(y).reduce(function (de, $) {
          return de.concat(
            tt($) === En
              ? Xp(t, {
                  placement: $,
                  boundary: d,
                  rootBoundary: h,
                  padding: u,
                  flipVariations: g,
                  allowedAutoPlacements: f,
                })
              : $
          );
        }, []),
        E = t.rects.reference,
        C = t.rects.popper,
        S = new Map(),
        k = !0,
        R = x[0],
        O = 0;
      O < x.length;
      O++
    ) {
      var L = x[O],
        _ = tt(L),
        D = Qt(L) === Kt,
        H = [xe, Fe].indexOf(_) >= 0,
        M = H ? 'width' : 'height',
        I = xr(t, {
          placement: L,
          boundary: d,
          rootBoundary: h,
          altBoundary: m,
          padding: u,
        }),
        j = H ? (D ? Me : Ae) : D ? Fe : xe;
      E[M] > C[M] && (j = Kr(j));
      var z = Kr(j),
        N = [];
      if (
        (l && N.push(I[_] <= 0),
        s && N.push(I[j] <= 0, I[z] <= 0),
        N.every(function (de) {
          return de;
        }))
      ) {
        (R = L), (k = !1);
        break;
      }
      S.set(L, N);
    }
    if (k)
      for (
        var Z = g ? 3 : 1,
          K = function (de) {
            var $ = x.find(function (q) {
              var U = S.get(q);
              if (U)
                return U.slice(0, de).every(function (oe) {
                  return oe;
                });
            });
            if ($) return (R = $), 'break';
          },
          se = Z;
        se > 0;
        se--
      ) {
        var X = K(se);
        if (X === 'break') break;
      }
    t.placement !== R &&
      ((t.modifiersData[n]._skip = !0), (t.placement = R), (t.reset = !0));
  }
}
var e5 = {
  name: 'flip',
  enabled: !0,
  phase: 'main',
  fn: Qp,
  requiresIfExists: ['offset'],
  data: { _skip: !1 },
};
function Fl(e, t, r) {
  return (
    r === void 0 && (r = { x: 0, y: 0 }),
    {
      top: e.top - t.height - r.y,
      right: e.right - t.width + r.x,
      bottom: e.bottom - t.height + r.y,
      left: e.left - t.width - r.x,
    }
  );
}
function Ml(e) {
  return [xe, Me, Fe, Ae].some(function (t) {
    return e[t] >= 0;
  });
}
function t5(e) {
  var t = e.state,
    r = e.name,
    n = t.rects.reference,
    o = t.rects.popper,
    l = t.modifiersData.preventOverflow,
    i = xr(t, { elementContext: 'reference' }),
    s = xr(t, { altBoundary: !0 }),
    c = Fl(i, n),
    u = Fl(s, o, l),
    d = Ml(c),
    h = Ml(u);
  (t.modifiersData[r] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: u,
    isReferenceHidden: d,
    hasPopperEscaped: h,
  }),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      'data-popper-reference-hidden': d,
      'data-popper-escaped': h,
    }));
}
var r5 = {
  name: 'hide',
  enabled: !0,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: t5,
};
function n5(e, t, r) {
  var n = tt(e),
    o = [Ae, xe].indexOf(n) >= 0 ? -1 : 1,
    l = typeof r == 'function' ? r(Object.assign({}, t, { placement: e })) : r,
    i = l[0],
    s = l[1];
  return (
    (i = i || 0),
    (s = (s || 0) * o),
    [Ae, Me].indexOf(n) >= 0 ? { x: s, y: i } : { x: i, y: s }
  );
}
function a5(e) {
  var t = e.state,
    r = e.options,
    n = e.name,
    o = r.offset,
    l = o === void 0 ? [0, 0] : o,
    i = $s.reduce(function (d, h) {
      return (d[h] = n5(h, t.rects, l)), d;
    }, {}),
    s = i[t.placement],
    c = s.x,
    u = s.y;
  t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += c),
    (t.modifiersData.popperOffsets.y += u)),
    (t.modifiersData[n] = i);
}
var o5 = {
  name: 'offset',
  enabled: !0,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: a5,
};
function l5(e) {
  var t = e.state,
    r = e.name;
  t.modifiersData[r] = Ps({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: 'absolute',
    placement: t.placement,
  });
}
var i5 = {
  name: 'popperOffsets',
  enabled: !0,
  phase: 'read',
  fn: l5,
  data: {},
};
function s5(e) {
  return e === 'x' ? 'y' : 'x';
}
function c5(e) {
  var t = e.state,
    r = e.options,
    n = e.name,
    o = r.mainAxis,
    l = o === void 0 ? !0 : o,
    i = r.altAxis,
    s = i === void 0 ? !1 : i,
    c = r.boundary,
    u = r.rootBoundary,
    d = r.altBoundary,
    h = r.padding,
    m = r.tether,
    p = m === void 0 ? !0 : m,
    g = r.tetherOffset,
    f = g === void 0 ? 0 : g,
    A = xr(t, { boundary: c, rootBoundary: u, padding: h, altBoundary: d }),
    w = tt(t.placement),
    v = Qt(t.placement),
    y = !v,
    x = ho(w),
    E = s5(x),
    C = t.modifiersData.popperOffsets,
    S = t.rects.reference,
    k = t.rects.popper,
    R =
      typeof f == 'function'
        ? f(Object.assign({}, t.rects, { placement: t.placement }))
        : f,
    O =
      typeof R == 'number'
        ? { mainAxis: R, altAxis: R }
        : Object.assign({ mainAxis: 0, altAxis: 0 }, R),
    L = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    _ = { x: 0, y: 0 };
  if (C) {
    if (l) {
      var D,
        H = x === 'y' ? xe : Ae,
        M = x === 'y' ? Fe : Me,
        I = x === 'y' ? 'height' : 'width',
        j = C[x],
        z = j + A[H],
        N = j - A[M],
        Z = p ? -k[I] / 2 : 0,
        K = v === Kt ? S[I] : k[I],
        se = v === Kt ? -k[I] : -S[I],
        X = t.elements.arrow,
        de = p && X ? go(X) : { width: 0, height: 0 },
        $ = t.modifiersData['arrow#persistent']
          ? t.modifiersData['arrow#persistent'].padding
          : Ns(),
        q = $[H],
        U = $[M],
        oe = fr(0, S[I], de[I]),
        he = y ? S[I] / 2 - Z - oe - q - O.mainAxis : K - oe - q - O.mainAxis,
        nt = y ? -S[I] / 2 + Z + oe + U + O.mainAxis : se + oe + U + O.mainAxis,
        Oe = t.elements.arrow && Dr(t.elements.arrow),
        He = Oe ? (x === 'y' ? Oe.clientTop || 0 : Oe.clientLeft || 0) : 0,
        F = (D = L == null ? void 0 : L[x]) != null ? D : 0,
        Be = j + he - F - He,
        je = j + nt - F,
        xt = fr(p ? ln(z, Be) : z, j, p ? _t(N, je) : N);
      (C[x] = xt), (_[x] = xt - j);
    }
    if (s) {
      var It,
        Pe = x === 'x' ? xe : Ae,
        $r = x === 'x' ? Fe : Me,
        be = C[E],
        At = E === 'y' ? 'height' : 'width',
        Ve = be + A[Pe],
        Nt = be - A[$r],
        ze = [xe, Ae].indexOf(w) !== -1,
        Zt = (It = L == null ? void 0 : L[E]) != null ? It : 0,
        qe = ze ? Ve : be - S[At] - k[At] - Zt + O.altAxis,
        pe = ze ? be + S[At] + k[At] - Zt - O.altAxis : Nt,
        Ie = p && ze ? Fp(qe, be, pe) : fr(p ? qe : Ve, be, p ? pe : Nt);
      (C[E] = Ie), (_[E] = Ie - be);
    }
    t.modifiersData[n] = _;
  }
}
var u5 = {
  name: 'preventOverflow',
  enabled: !0,
  phase: 'main',
  fn: c5,
  requiresIfExists: ['offset'],
};
function d5(e) {
  return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function p5(e) {
  return e === Se(e) || !De(e) ? bo(e) : d5(e);
}
function f5(e) {
  var t = e.getBoundingClientRect(),
    r = Xt(t.width) / e.offsetWidth || 1,
    n = Xt(t.height) / e.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function m5(e, t, r) {
  r === void 0 && (r = !1);
  var n = De(t),
    o = De(t) && f5(t),
    l = Et(t),
    i = Jt(e, o, r),
    s = { scrollLeft: 0, scrollTop: 0 },
    c = { x: 0, y: 0 };
  return (
    (n || (!n && !r)) &&
      ((rt(t) !== 'body' || vo(l)) && (s = p5(t)),
      De(t)
        ? ((c = Jt(t, !0)), (c.x += t.clientLeft), (c.y += t.clientTop))
        : l && (c.x = yo(l))),
    {
      x: i.left + s.scrollLeft - c.x,
      y: i.top + s.scrollTop - c.y,
      width: i.width,
      height: i.height,
    }
  );
}
function g5(e) {
  var t = new Map(),
    r = new Set(),
    n = [];
  e.forEach(function (l) {
    t.set(l.name, l);
  });
  function o(l) {
    r.add(l.name);
    var i = [].concat(l.requires || [], l.requiresIfExists || []);
    i.forEach(function (s) {
      if (!r.has(s)) {
        var c = t.get(s);
        c && o(c);
      }
    }),
      n.push(l);
  }
  return (
    e.forEach(function (l) {
      r.has(l.name) || o(l);
    }),
    n
  );
}
function h5(e) {
  var t = g5(e);
  return Tp.reduce(function (r, n) {
    return r.concat(
      t.filter(function (o) {
        return o.phase === n;
      })
    );
  }, []);
}
function b5(e) {
  var t;
  return function () {
    return (
      t ||
        (t = new Promise(function (r) {
          Promise.resolve().then(function () {
            (t = void 0), r(e());
          });
        })),
      t
    );
  };
}
function y5(e) {
  var t = e.reduce(function (r, n) {
    var o = r[n.name];
    return (
      (r[n.name] = o
        ? Object.assign({}, o, n, {
            options: Object.assign({}, o.options, n.options),
            data: Object.assign({}, o.data, n.data),
          })
        : n),
      r
    );
  }, {});
  return Object.keys(t).map(function (r) {
    return t[r];
  });
}
var $l = { placement: 'bottom', modifiers: [], strategy: 'absolute' };
function Bl() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return !t.some(function (n) {
    return !(n && typeof n.getBoundingClientRect == 'function');
  });
}
function v5(e) {
  e === void 0 && (e = {});
  var t = e,
    r = t.defaultModifiers,
    n = r === void 0 ? [] : r,
    o = t.defaultOptions,
    l = o === void 0 ? $l : o;
  return function (i, s, c) {
    c === void 0 && (c = l);
    var u = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, $l, l),
        modifiersData: {},
        elements: { reference: i, popper: s },
        attributes: {},
        styles: {},
      },
      d = [],
      h = !1,
      m = {
        state: u,
        setOptions: function (f) {
          var A = typeof f == 'function' ? f(u.options) : f;
          g(),
            (u.options = Object.assign({}, l, u.options, A)),
            (u.scrollParents = {
              reference: Mt(i)
                ? mr(i)
                : i.contextElement
                  ? mr(i.contextElement)
                  : [],
              popper: mr(s),
            });
          var w = h5(y5([].concat(n, u.options.modifiers)));
          return (
            (u.orderedModifiers = w.filter(function (v) {
              return v.enabled;
            })),
            p(),
            m.update()
          );
        },
        forceUpdate: function () {
          if (!h) {
            var f = u.elements,
              A = f.reference,
              w = f.popper;
            if (Bl(A, w)) {
              (u.rects = {
                reference: m5(A, Dr(w), u.options.strategy === 'fixed'),
                popper: go(w),
              }),
                (u.reset = !1),
                (u.placement = u.options.placement),
                u.orderedModifiers.forEach(function (k) {
                  return (u.modifiersData[k.name] = Object.assign({}, k.data));
                });
              for (var v = 0; v < u.orderedModifiers.length; v++) {
                if (u.reset === !0) {
                  (u.reset = !1), (v = -1);
                  continue;
                }
                var y = u.orderedModifiers[v],
                  x = y.fn,
                  E = y.options,
                  C = E === void 0 ? {} : E,
                  S = y.name;
                typeof x == 'function' &&
                  (u = x({ state: u, options: C, name: S, instance: m }) || u);
              }
            }
          }
        },
        update: b5(function () {
          return new Promise(function (f) {
            m.forceUpdate(), f(u);
          });
        }),
        destroy: function () {
          g(), (h = !0);
        },
      };
    if (!Bl(i, s)) return m;
    m.setOptions(c).then(function (f) {
      !h && c.onFirstUpdate && c.onFirstUpdate(f);
    });
    function p() {
      u.orderedModifiers.forEach(function (f) {
        var A = f.name,
          w = f.options,
          v = w === void 0 ? {} : w,
          y = f.effect;
        if (typeof y == 'function') {
          var x = y({ state: u, name: A, instance: m, options: v }),
            E = function () {};
          d.push(x || E);
        }
      });
    }
    function g() {
      d.forEach(function (f) {
        return f();
      }),
        (d = []);
    }
    return m;
  };
}
var E5 = [Vp, i5, jp, Lp, o5, e5, u5, Ip, r5],
  x5 = v5({ defaultModifiers: E5 }),
  A5 = ke(mp()),
  w5 = [],
  C5 = function (e, t, r) {
    r === void 0 && (r = {});
    var n = b.useRef(null),
      o = {
        onFirstUpdate: r.onFirstUpdate,
        placement: r.placement || 'bottom',
        strategy: r.strategy || 'absolute',
        modifiers: r.modifiers || w5,
      },
      l = b.useState({
        styles: {
          popper: { position: o.strategy, left: '0', top: '0' },
          arrow: { position: 'absolute' },
        },
        attributes: {},
      }),
      i = l[0],
      s = l[1],
      c = b.useMemo(function () {
        return {
          name: 'updateState',
          enabled: !0,
          phase: 'write',
          fn: function (h) {
            var m = h.state,
              p = Object.keys(m.elements);
            Fi.flushSync(function () {
              s({
                styles: kl(
                  p.map(function (g) {
                    return [g, m.styles[g] || {}];
                  })
                ),
                attributes: kl(
                  p.map(function (g) {
                    return [g, m.attributes[g]];
                  })
                ),
              });
            });
          },
          requires: ['computeStyles'],
        };
      }, []),
      u = b.useMemo(
        function () {
          var h = {
            onFirstUpdate: o.onFirstUpdate,
            placement: o.placement,
            strategy: o.strategy,
            modifiers: [].concat(o.modifiers, [
              c,
              { name: 'applyStyles', enabled: !1 },
            ]),
          };
          return (0, A5.default)(n.current, h)
            ? n.current || h
            : ((n.current = h), h);
        },
        [o.onFirstUpdate, o.placement, o.strategy, o.modifiers, c]
      ),
      d = b.useRef();
    return (
      Tl(
        function () {
          d.current && d.current.setOptions(u);
        },
        [u]
      ),
      Tl(
        function () {
          if (!(e == null || t == null)) {
            var h = r.createPopper || x5,
              m = h(e, t, u);
            return (
              (d.current = m),
              function () {
                m.destroy(), (d.current = null);
              }
            );
          }
        },
        [e, t, r.createPopper]
      ),
      {
        state: d.current ? d.current.state : null,
        styles: i.styles,
        attributes: i.attributes,
        update: d.current ? d.current.update : null,
        forceUpdate: d.current ? d.current.forceUpdate : null,
      }
    );
  };
function Vs(e) {
  var t = b.useRef(e);
  return (
    (t.current = e),
    b.useCallback(function () {
      return t.current;
    }, [])
  );
}
var S5 = function () {};
function k5(e) {
  var t = e.initial,
    r = e.value,
    n = e.onChange,
    o = n === void 0 ? S5 : n;
  if (t === void 0 && r === void 0)
    throw new TypeError(
      'Either "value" or "initial" variable must be set. Now both are undefined'
    );
  var l = b.useState(t),
    i = l[0],
    s = l[1],
    c = Vs(i),
    u = b.useCallback(
      function (h) {
        var m = c(),
          p = typeof h == 'function' ? h(m) : h;
        typeof p.persist == 'function' && p.persist(),
          s(p),
          typeof o == 'function' && o(p);
      },
      [c, o]
    ),
    d = r !== void 0;
  return [d ? r : i, d ? o : u];
}
function zs(e, t) {
  return (
    e === void 0 && (e = 0),
    t === void 0 && (t = 0),
    function () {
      return {
        width: 0,
        height: 0,
        top: t,
        right: e,
        bottom: t,
        left: e,
        x: 0,
        y: 0,
        toJSON: function () {
          return null;
        },
      };
    }
  );
}
var T5 = ['styles', 'attributes'],
  Il = { getBoundingClientRect: zs() },
  Nl = {
    closeOnOutsideClick: !0,
    closeOnTriggerHidden: !1,
    defaultVisible: !1,
    delayHide: 0,
    delayShow: 0,
    followCursor: !1,
    interactive: !1,
    mutationObserverOptions: { attributes: !0, childList: !0, subtree: !0 },
    offset: [0, 6],
    trigger: 'hover',
  };
function R5(e, t) {
  var r, n, o;
  e === void 0 && (e = {}), t === void 0 && (t = {});
  var l = Object.keys(Nl).reduce(function (M, I) {
      var j;
      return lt({}, M, ((j = {}), (j[I] = M[I] !== void 0 ? M[I] : Nl[I]), j));
    }, e),
    i = b.useMemo(
      function () {
        return [{ name: 'offset', options: { offset: l.offset } }];
      },
      Array.isArray(l.offset) ? l.offset : []
    ),
    s = lt({}, t, {
      placement: t.placement || l.placement,
      modifiers: t.modifiers || i,
    }),
    c = b.useState(null),
    u = c[0],
    d = c[1],
    h = b.useState(null),
    m = h[0],
    p = h[1],
    g = k5({
      initial: l.defaultVisible,
      value: l.visible,
      onChange: l.onVisibleChange,
    }),
    f = g[0],
    A = g[1],
    w = b.useRef();
  b.useEffect(function () {
    return function () {
      return clearTimeout(w.current);
    };
  }, []);
  var v = C5(l.followCursor ? Il : u, m, s),
    y = v.styles,
    x = v.attributes,
    E = gp(v, T5),
    C = E.update,
    S = Vs({ visible: f, triggerRef: u, tooltipRef: m, finalConfig: l }),
    k = b.useCallback(
      function (M) {
        return Array.isArray(l.trigger)
          ? l.trigger.includes(M)
          : l.trigger === M;
      },
      Array.isArray(l.trigger) ? l.trigger : [l.trigger]
    ),
    R = b.useCallback(
      function () {
        clearTimeout(w.current),
          (w.current = window.setTimeout(function () {
            return A(!1);
          }, l.delayHide));
      },
      [l.delayHide, A]
    ),
    O = b.useCallback(
      function () {
        clearTimeout(w.current),
          (w.current = window.setTimeout(function () {
            return A(!0);
          }, l.delayShow));
      },
      [l.delayShow, A]
    ),
    L = b.useCallback(
      function () {
        S().visible ? R() : O();
      },
      [S, R, O]
    );
  b.useEffect(
    function () {
      if (S().finalConfig.closeOnOutsideClick) {
        var M = function (I) {
          var j,
            z = S(),
            N = z.tooltipRef,
            Z = z.triggerRef,
            K =
              (I.composedPath == null || (j = I.composedPath()) == null
                ? void 0
                : j[0]) || I.target;
          K instanceof Node &&
            N != null &&
            Z != null &&
            !N.contains(K) &&
            !Z.contains(K) &&
            R();
        };
        return (
          document.addEventListener('mousedown', M),
          function () {
            return document.removeEventListener('mousedown', M);
          }
        );
      }
    },
    [S, R]
  ),
    b.useEffect(
      function () {
        if (!(u == null || !k('click')))
          return (
            u.addEventListener('click', L),
            function () {
              return u.removeEventListener('click', L);
            }
          );
      },
      [u, k, L]
    ),
    b.useEffect(
      function () {
        if (!(u == null || !k('double-click')))
          return (
            u.addEventListener('dblclick', L),
            function () {
              return u.removeEventListener('dblclick', L);
            }
          );
      },
      [u, k, L]
    ),
    b.useEffect(
      function () {
        if (!(u == null || !k('right-click'))) {
          var M = function (I) {
            I.preventDefault(), L();
          };
          return (
            u.addEventListener('contextmenu', M),
            function () {
              return u.removeEventListener('contextmenu', M);
            }
          );
        }
      },
      [u, k, L]
    ),
    b.useEffect(
      function () {
        if (!(u == null || !k('focus')))
          return (
            u.addEventListener('focus', O),
            u.addEventListener('blur', R),
            function () {
              u.removeEventListener('focus', O),
                u.removeEventListener('blur', R);
            }
          );
      },
      [u, k, O, R]
    ),
    b.useEffect(
      function () {
        if (!(u == null || !k('hover')))
          return (
            u.addEventListener('mouseenter', O),
            u.addEventListener('mouseleave', R),
            function () {
              u.removeEventListener('mouseenter', O),
                u.removeEventListener('mouseleave', R);
            }
          );
      },
      [u, k, O, R]
    ),
    b.useEffect(
      function () {
        if (!(m == null || !k('hover') || !S().finalConfig.interactive))
          return (
            m.addEventListener('mouseenter', O),
            m.addEventListener('mouseleave', R),
            function () {
              m.removeEventListener('mouseenter', O),
                m.removeEventListener('mouseleave', R);
            }
          );
      },
      [m, k, O, R, S]
    );
  var _ =
    E == null ||
    (r = E.state) == null ||
    (n = r.modifiersData) == null ||
    (o = n.hide) == null
      ? void 0
      : o.isReferenceHidden;
  b.useEffect(
    function () {
      l.closeOnTriggerHidden && _ && R();
    },
    [l.closeOnTriggerHidden, R, _]
  ),
    b.useEffect(
      function () {
        if (!l.followCursor || u == null) return;
        function M(I) {
          var j = I.clientX,
            z = I.clientY;
          (Il.getBoundingClientRect = zs(j, z)), C == null || C();
        }
        return (
          u.addEventListener('mousemove', M),
          function () {
            return u.removeEventListener('mousemove', M);
          }
        );
      },
      [l.followCursor, u, C]
    ),
    b.useEffect(
      function () {
        if (!(m == null || C == null || l.mutationObserverOptions == null)) {
          var M = new MutationObserver(C);
          return (
            M.observe(m, l.mutationObserverOptions),
            function () {
              return M.disconnect();
            }
          );
        }
      },
      [l.mutationObserverOptions, m, C]
    );
  var D = function (M) {
      return (
        M === void 0 && (M = {}),
        lt({}, M, { style: lt({}, M.style, y.popper) }, x.popper, {
          'data-popper-interactive': l.interactive,
        })
      );
    },
    H = function (M) {
      return (
        M === void 0 && (M = {}),
        lt({}, M, x.arrow, {
          style: lt({}, M.style, y.arrow),
          'data-popper-arrow': !0,
        })
      );
    };
  return lt(
    {
      getArrowProps: H,
      getTooltipProps: D,
      setTooltipRef: p,
      setTriggerRef: d,
      tooltipRef: m,
      triggerRef: u,
      visible: f,
    },
    E
  );
}
var Le = tr(1e3)((e, t, r, n = 0) => (t.split('-')[0] === e ? r : n)),
  pt = 8,
  O5 = T.div(
    { position: 'absolute', borderStyle: 'solid' },
    ({ placement: e }) => {
      let t = 0,
        r = 0;
      switch (!0) {
        case e.startsWith('left') || e.startsWith('right'): {
          r = 8;
          break;
        }
        case e.startsWith('top') || e.startsWith('bottom'): {
          t = 8;
          break;
        }
      }
      return { transform: `translate3d(${t}px, ${r}px, 0px)` };
    },
    ({ theme: e, color: t, placement: r }) => ({
      bottom: `${Le('top', r, `${pt * -1}px`, 'auto')}`,
      top: `${Le('bottom', r, `${pt * -1}px`, 'auto')}`,
      right: `${Le('left', r, `${pt * -1}px`, 'auto')}`,
      left: `${Le('right', r, `${pt * -1}px`, 'auto')}`,
      borderBottomWidth: `${Le('top', r, '0', pt)}px`,
      borderTopWidth: `${Le('bottom', r, '0', pt)}px`,
      borderRightWidth: `${Le('left', r, '0', pt)}px`,
      borderLeftWidth: `${Le('right', r, '0', pt)}px`,
      borderTopColor: Le(
        'top',
        r,
        e.color[t] || t || e.base === 'light'
          ? pr(e.background.app)
          : e.background.app,
        'transparent'
      ),
      borderBottomColor: Le(
        'bottom',
        r,
        e.color[t] || t || e.base === 'light'
          ? pr(e.background.app)
          : e.background.app,
        'transparent'
      ),
      borderLeftColor: Le(
        'left',
        r,
        e.color[t] || t || e.base === 'light'
          ? pr(e.background.app)
          : e.background.app,
        'transparent'
      ),
      borderRightColor: Le(
        'right',
        r,
        e.color[t] || t || e.base === 'light'
          ? pr(e.background.app)
          : e.background.app,
        'transparent'
      ),
    })
  ),
  L5 = T.div(
    ({ hidden: e }) => ({
      display: e ? 'none' : 'inline-block',
      zIndex: 2147483647,
    }),
    ({ theme: e, color: t, hasChrome: r }) =>
      r
        ? {
            background:
              e.color[t] || t || e.base === 'light'
                ? pr(e.background.app)
                : e.background.app,
            filter: `
            drop-shadow(0px 5px 5px rgba(0,0,0,0.05))
            drop-shadow(0 1px 3px rgba(0,0,0,0.1))
          `,
            borderRadius: e.appBorderRadius,
            fontSize: e.typography.size.s1,
          }
        : {}
  ),
  Eo = a.forwardRef(
    (
      {
        placement: e,
        hasChrome: t,
        children: r,
        arrowProps: n,
        tooltipRef: o,
        color: l,
        withArrows: i,
        ...s
      },
      c
    ) =>
      a.createElement(
        L5,
        { 'data-testid': 'tooltip', hasChrome: t, ref: c, ...s, color: l },
        t && i && a.createElement(O5, { placement: e, ...n, color: l }),
        r
      )
  );
Eo.displayName = 'Tooltip';
Eo.defaultProps = {
  color: void 0,
  tooltipRef: void 0,
  hasChrome: !0,
  placement: 'top',
  arrowProps: {},
};
var { document: Xr } = fp,
  _5 = T.div`
  display: inline-block;
  cursor: ${(e) => (e.trigger === 'hover' || e.trigger.includes('hover') ? 'default' : 'pointer')};
`,
  D5 = T.g`
  cursor: ${(e) => (e.trigger === 'hover' || e.trigger.includes('hover') ? 'default' : 'pointer')};
`,
  qs = ({
    svg: e,
    trigger: t,
    closeOnOutsideClick: r,
    placement: n,
    hasChrome: o,
    withArrows: l,
    offset: i,
    tooltip: s,
    children: c,
    closeOnTriggerHidden: u,
    mutationObserverOptions: d,
    closeOnClick: h,
    tooltipShown: m,
    onVisibilityChange: p,
    defaultVisible: g,
    delayHide: f,
    visible: A,
    interactive: w,
    delayShow: v,
    modifiers: y,
    strategy: x,
    followCursor: E,
    onVisibleChange: C,
    ...S
  }) => {
    let k = e ? D5 : _5,
      {
        getArrowProps: R,
        getTooltipProps: O,
        setTooltipRef: L,
        setTriggerRef: _,
        visible: D,
        state: H,
      } = R5(
        {
          trigger: t,
          placement: n,
          defaultVisible: g ?? m,
          delayHide: f,
          interactive: w,
          closeOnOutsideClick: r ?? h,
          closeOnTriggerHidden: u,
          onVisibleChange: (I) => {
            p == null || p(I), C == null || C(I);
          },
          delayShow: v,
          followCursor: E,
          mutationObserverOptions: d,
          visible: A,
          offset: i,
        },
        { modifiers: y, strategy: x }
      ),
      M = a.createElement(
        Eo,
        {
          placement: H == null ? void 0 : H.placement,
          ref: L,
          hasChrome: o,
          arrowProps: R(),
          withArrows: l,
          ...O(),
        },
        typeof s == 'function' ? s({ onHide: () => C(!1) }) : s
      );
    return a.createElement(
      a.Fragment,
      null,
      a.createElement(k, { trigger: t, ref: _, ...S }, c),
      D && Gu.createPortal(M, Xr.body)
    );
  };
qs.defaultProps = {
  svg: !1,
  trigger: 'click',
  closeOnOutsideClick: !1,
  placement: 'top',
  modifiers: [
    { name: 'preventOverflow', options: { padding: 8 } },
    { name: 'offset', options: { offset: [8, 8] } },
    { name: 'arrow', options: { padding: 8 } },
  ],
  hasChrome: !0,
  defaultVisible: !1,
};
var F5 = ({ startOpen: e = !1, onVisibleChange: t, ...r }) => {
  let [n, o] = b.useState(e),
    l = b.useCallback(
      (i) => {
        (t && t(i) === !1) || o(i);
      },
      [t]
    );
  return (
    b.useEffect(() => {
      let i = () => l(!1);
      Xr.addEventListener('keydown', i, !1);
      let s = Array.from(Xr.getElementsByTagName('iframe')),
        c = [];
      return (
        s.forEach((u) => {
          let d = () => {
            try {
              u.contentWindow.document &&
                (u.contentWindow.document.addEventListener('click', i),
                c.push(() => {
                  try {
                    u.contentWindow.document.removeEventListener('click', i);
                  } catch {}
                }));
            } catch {}
          };
          d(),
            u.addEventListener('load', d),
            c.push(() => {
              u.removeEventListener('load', d);
            });
        }),
        () => {
          Xr.removeEventListener('keydown', i),
            c.forEach((u) => {
              u();
            });
        }
      );
    }),
    a.createElement(qs, { ...r, visible: n, onVisibleChange: l })
  );
};
function M5(e, t) {
  var r = b.useRef(null),
    n = b.useRef(null);
  n.current = t;
  var o = b.useRef(null);
  b.useEffect(function () {
    l();
  });
  var l = b.useCallback(
    function () {
      var i = o.current,
        s = n.current,
        c = i || (s ? (s instanceof Element ? s : s.current) : null);
      (r.current && r.current.element === c && r.current.subscriber === e) ||
        (r.current && r.current.cleanup && r.current.cleanup(),
        (r.current = {
          element: c,
          subscriber: e,
          cleanup: c ? e(c) : void 0,
        }));
    },
    [e]
  );
  return (
    b.useEffect(function () {
      return function () {
        r.current &&
          r.current.cleanup &&
          (r.current.cleanup(), (r.current = null));
      };
    }, []),
    b.useCallback(
      function (i) {
        (o.current = i), l();
      },
      [l]
    )
  );
}
function Zl(e, t, r) {
  return e[t]
    ? e[t][0]
      ? e[t][0][r]
      : e[t][r]
    : t === 'contentBoxSize'
      ? e.contentRect[r === 'inlineSize' ? 'width' : 'height']
      : void 0;
}
function Us(e) {
  e === void 0 && (e = {});
  var t = e.onResize,
    r = b.useRef(void 0);
  r.current = t;
  var n = e.round || Math.round,
    o = b.useRef(),
    l = b.useState({ width: void 0, height: void 0 }),
    i = l[0],
    s = l[1],
    c = b.useRef(!1);
  b.useEffect(function () {
    return (
      (c.current = !1),
      function () {
        c.current = !0;
      }
    );
  }, []);
  var u = b.useRef({ width: void 0, height: void 0 }),
    d = M5(
      b.useCallback(
        function (h) {
          return (
            (!o.current || o.current.box !== e.box || o.current.round !== n) &&
              (o.current = {
                box: e.box,
                round: n,
                instance: new ResizeObserver(function (m) {
                  var p = m[0],
                    g =
                      e.box === 'border-box'
                        ? 'borderBoxSize'
                        : e.box === 'device-pixel-content-box'
                          ? 'devicePixelContentBoxSize'
                          : 'contentBoxSize',
                    f = Zl(p, g, 'inlineSize'),
                    A = Zl(p, g, 'blockSize'),
                    w = f ? n(f) : void 0,
                    v = A ? n(A) : void 0;
                  if (u.current.width !== w || u.current.height !== v) {
                    var y = { width: w, height: v };
                    (u.current.width = w),
                      (u.current.height = v),
                      r.current ? r.current(y) : c.current || s(y);
                  }
                }),
              }),
            o.current.instance.observe(h, { box: e.box }),
            function () {
              o.current && o.current.instance.unobserve(h);
            }
          );
        },
        [e.box, n]
      ),
      e.ref
    );
  return b.useMemo(
    function () {
      return { ref: d, width: i.width, height: i.height };
    },
    [d, i.width, i.height]
  );
}
const { global: $5 } = __STORYBOOK_MODULE_GLOBAL__;
var Y = ({ ...e }, t) => {
  let r = [e.class, e.className];
  return (
    delete e.class,
    (e.className = ['sbdocs', `sbdocs-${t}`, ...r].filter(Boolean).join(' ')),
    e
  );
};
function Ar() {
  return (
    (Ar = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    Ar.apply(this, arguments)
  );
}
function B5(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function wr(e, t) {
  return (
    (wr = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, n) {
          return (r.__proto__ = n), r;
        }),
    wr(e, t)
  );
}
function I5(e, t) {
  (e.prototype = Object.create(t.prototype)),
    (e.prototype.constructor = e),
    wr(e, t);
}
function ka(e) {
  return (
    (ka = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        }),
    ka(e)
  );
}
function N5(e) {
  return Function.toString.call(e).indexOf('[native code]') !== -1;
}
function Z5() {
  if (typeof Reflect > 'u' || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == 'function') return !0;
  try {
    return (
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      ),
      !0
    );
  } catch {
    return !1;
  }
}
function Jr(e, t, r) {
  return (
    Z5()
      ? (Jr = Reflect.construct.bind())
      : (Jr = function (n, o, l) {
          var i = [null];
          i.push.apply(i, o);
          var s = Function.bind.apply(n, i),
            c = new s();
          return l && wr(c, l.prototype), c;
        }),
    Jr.apply(null, arguments)
  );
}
function Ta(e) {
  var t = typeof Map == 'function' ? new Map() : void 0;
  return (
    (Ta = function (r) {
      if (r === null || !N5(r)) return r;
      if (typeof r != 'function')
        throw new TypeError(
          'Super expression must either be null or a function'
        );
      if (typeof t < 'u') {
        if (t.has(r)) return t.get(r);
        t.set(r, n);
      }
      function n() {
        return Jr(r, arguments, ka(this).constructor);
      }
      return (
        (n.prototype = Object.create(r.prototype, {
          constructor: {
            value: n,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        })),
        wr(n, r)
      );
    }),
    Ta(e)
  );
}
var Je = (function (e) {
  I5(t, e);
  function t(r) {
    var n;
    return (
      (n =
        e.call(
          this,
          'An error occurred. See https://github.com/styled-components/polished/blob/main/src/internalHelpers/errors.md#' +
            r +
            ' for more information.'
        ) || this),
      B5(n)
    );
  }
  return t;
})(Ta(Error));
function zn(e) {
  return Math.round(e * 255);
}
function H5(e, t, r) {
  return zn(e) + ',' + zn(t) + ',' + zn(r);
}
function Cr(e, t, r, n) {
  if ((n === void 0 && (n = H5), t === 0)) return n(r, r, r);
  var o = (((e % 360) + 360) % 360) / 60,
    l = (1 - Math.abs(2 * r - 1)) * t,
    i = l * (1 - Math.abs((o % 2) - 1)),
    s = 0,
    c = 0,
    u = 0;
  o >= 0 && o < 1
    ? ((s = l), (c = i))
    : o >= 1 && o < 2
      ? ((s = i), (c = l))
      : o >= 2 && o < 3
        ? ((c = l), (u = i))
        : o >= 3 && o < 4
          ? ((c = i), (u = l))
          : o >= 4 && o < 5
            ? ((s = i), (u = l))
            : o >= 5 && o < 6 && ((s = l), (u = i));
  var d = r - l / 2,
    h = s + d,
    m = c + d,
    p = u + d;
  return n(h, m, p);
}
var Hl = {
  aliceblue: 'f0f8ff',
  antiquewhite: 'faebd7',
  aqua: '00ffff',
  aquamarine: '7fffd4',
  azure: 'f0ffff',
  beige: 'f5f5dc',
  bisque: 'ffe4c4',
  black: '000',
  blanchedalmond: 'ffebcd',
  blue: '0000ff',
  blueviolet: '8a2be2',
  brown: 'a52a2a',
  burlywood: 'deb887',
  cadetblue: '5f9ea0',
  chartreuse: '7fff00',
  chocolate: 'd2691e',
  coral: 'ff7f50',
  cornflowerblue: '6495ed',
  cornsilk: 'fff8dc',
  crimson: 'dc143c',
  cyan: '00ffff',
  darkblue: '00008b',
  darkcyan: '008b8b',
  darkgoldenrod: 'b8860b',
  darkgray: 'a9a9a9',
  darkgreen: '006400',
  darkgrey: 'a9a9a9',
  darkkhaki: 'bdb76b',
  darkmagenta: '8b008b',
  darkolivegreen: '556b2f',
  darkorange: 'ff8c00',
  darkorchid: '9932cc',
  darkred: '8b0000',
  darksalmon: 'e9967a',
  darkseagreen: '8fbc8f',
  darkslateblue: '483d8b',
  darkslategray: '2f4f4f',
  darkslategrey: '2f4f4f',
  darkturquoise: '00ced1',
  darkviolet: '9400d3',
  deeppink: 'ff1493',
  deepskyblue: '00bfff',
  dimgray: '696969',
  dimgrey: '696969',
  dodgerblue: '1e90ff',
  firebrick: 'b22222',
  floralwhite: 'fffaf0',
  forestgreen: '228b22',
  fuchsia: 'ff00ff',
  gainsboro: 'dcdcdc',
  ghostwhite: 'f8f8ff',
  gold: 'ffd700',
  goldenrod: 'daa520',
  gray: '808080',
  green: '008000',
  greenyellow: 'adff2f',
  grey: '808080',
  honeydew: 'f0fff0',
  hotpink: 'ff69b4',
  indianred: 'cd5c5c',
  indigo: '4b0082',
  ivory: 'fffff0',
  khaki: 'f0e68c',
  lavender: 'e6e6fa',
  lavenderblush: 'fff0f5',
  lawngreen: '7cfc00',
  lemonchiffon: 'fffacd',
  lightblue: 'add8e6',
  lightcoral: 'f08080',
  lightcyan: 'e0ffff',
  lightgoldenrodyellow: 'fafad2',
  lightgray: 'd3d3d3',
  lightgreen: '90ee90',
  lightgrey: 'd3d3d3',
  lightpink: 'ffb6c1',
  lightsalmon: 'ffa07a',
  lightseagreen: '20b2aa',
  lightskyblue: '87cefa',
  lightslategray: '789',
  lightslategrey: '789',
  lightsteelblue: 'b0c4de',
  lightyellow: 'ffffe0',
  lime: '0f0',
  limegreen: '32cd32',
  linen: 'faf0e6',
  magenta: 'f0f',
  maroon: '800000',
  mediumaquamarine: '66cdaa',
  mediumblue: '0000cd',
  mediumorchid: 'ba55d3',
  mediumpurple: '9370db',
  mediumseagreen: '3cb371',
  mediumslateblue: '7b68ee',
  mediumspringgreen: '00fa9a',
  mediumturquoise: '48d1cc',
  mediumvioletred: 'c71585',
  midnightblue: '191970',
  mintcream: 'f5fffa',
  mistyrose: 'ffe4e1',
  moccasin: 'ffe4b5',
  navajowhite: 'ffdead',
  navy: '000080',
  oldlace: 'fdf5e6',
  olive: '808000',
  olivedrab: '6b8e23',
  orange: 'ffa500',
  orangered: 'ff4500',
  orchid: 'da70d6',
  palegoldenrod: 'eee8aa',
  palegreen: '98fb98',
  paleturquoise: 'afeeee',
  palevioletred: 'db7093',
  papayawhip: 'ffefd5',
  peachpuff: 'ffdab9',
  peru: 'cd853f',
  pink: 'ffc0cb',
  plum: 'dda0dd',
  powderblue: 'b0e0e6',
  purple: '800080',
  rebeccapurple: '639',
  red: 'f00',
  rosybrown: 'bc8f8f',
  royalblue: '4169e1',
  saddlebrown: '8b4513',
  salmon: 'fa8072',
  sandybrown: 'f4a460',
  seagreen: '2e8b57',
  seashell: 'fff5ee',
  sienna: 'a0522d',
  silver: 'c0c0c0',
  skyblue: '87ceeb',
  slateblue: '6a5acd',
  slategray: '708090',
  slategrey: '708090',
  snow: 'fffafa',
  springgreen: '00ff7f',
  steelblue: '4682b4',
  tan: 'd2b48c',
  teal: '008080',
  thistle: 'd8bfd8',
  tomato: 'ff6347',
  turquoise: '40e0d0',
  violet: 'ee82ee',
  wheat: 'f5deb3',
  white: 'fff',
  whitesmoke: 'f5f5f5',
  yellow: 'ff0',
  yellowgreen: '9acd32',
};
function j5(e) {
  if (typeof e != 'string') return e;
  var t = e.toLowerCase();
  return Hl[t] ? '#' + Hl[t] : e;
}
var P5 = /^#[a-fA-F0-9]{6}$/,
  V5 = /^#[a-fA-F0-9]{8}$/,
  z5 = /^#[a-fA-F0-9]{3}$/,
  q5 = /^#[a-fA-F0-9]{4}$/,
  qn = /^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i,
  U5 =
    /^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i,
  W5 =
    /^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i,
  G5 =
    /^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
function xo(e) {
  if (typeof e != 'string') throw new Je(3);
  var t = j5(e);
  if (t.match(P5))
    return {
      red: parseInt('' + t[1] + t[2], 16),
      green: parseInt('' + t[3] + t[4], 16),
      blue: parseInt('' + t[5] + t[6], 16),
    };
  if (t.match(V5)) {
    var r = parseFloat((parseInt('' + t[7] + t[8], 16) / 255).toFixed(2));
    return {
      red: parseInt('' + t[1] + t[2], 16),
      green: parseInt('' + t[3] + t[4], 16),
      blue: parseInt('' + t[5] + t[6], 16),
      alpha: r,
    };
  }
  if (t.match(z5))
    return {
      red: parseInt('' + t[1] + t[1], 16),
      green: parseInt('' + t[2] + t[2], 16),
      blue: parseInt('' + t[3] + t[3], 16),
    };
  if (t.match(q5)) {
    var n = parseFloat((parseInt('' + t[4] + t[4], 16) / 255).toFixed(2));
    return {
      red: parseInt('' + t[1] + t[1], 16),
      green: parseInt('' + t[2] + t[2], 16),
      blue: parseInt('' + t[3] + t[3], 16),
      alpha: n,
    };
  }
  var o = qn.exec(t);
  if (o)
    return {
      red: parseInt('' + o[1], 10),
      green: parseInt('' + o[2], 10),
      blue: parseInt('' + o[3], 10),
    };
  var l = U5.exec(t.substring(0, 50));
  if (l)
    return {
      red: parseInt('' + l[1], 10),
      green: parseInt('' + l[2], 10),
      blue: parseInt('' + l[3], 10),
      alpha:
        parseFloat('' + l[4]) > 1
          ? parseFloat('' + l[4]) / 100
          : parseFloat('' + l[4]),
    };
  var i = W5.exec(t);
  if (i) {
    var s = parseInt('' + i[1], 10),
      c = parseInt('' + i[2], 10) / 100,
      u = parseInt('' + i[3], 10) / 100,
      d = 'rgb(' + Cr(s, c, u) + ')',
      h = qn.exec(d);
    if (!h) throw new Je(4, t, d);
    return {
      red: parseInt('' + h[1], 10),
      green: parseInt('' + h[2], 10),
      blue: parseInt('' + h[3], 10),
    };
  }
  var m = G5.exec(t.substring(0, 50));
  if (m) {
    var p = parseInt('' + m[1], 10),
      g = parseInt('' + m[2], 10) / 100,
      f = parseInt('' + m[3], 10) / 100,
      A = 'rgb(' + Cr(p, g, f) + ')',
      w = qn.exec(A);
    if (!w) throw new Je(4, t, A);
    return {
      red: parseInt('' + w[1], 10),
      green: parseInt('' + w[2], 10),
      blue: parseInt('' + w[3], 10),
      alpha:
        parseFloat('' + m[4]) > 1
          ? parseFloat('' + m[4]) / 100
          : parseFloat('' + m[4]),
    };
  }
  throw new Je(5);
}
function Y5(e) {
  var t = e.red / 255,
    r = e.green / 255,
    n = e.blue / 255,
    o = Math.max(t, r, n),
    l = Math.min(t, r, n),
    i = (o + l) / 2;
  if (o === l)
    return e.alpha !== void 0
      ? { hue: 0, saturation: 0, lightness: i, alpha: e.alpha }
      : { hue: 0, saturation: 0, lightness: i };
  var s,
    c = o - l,
    u = i > 0.5 ? c / (2 - o - l) : c / (o + l);
  switch (o) {
    case t:
      s = (r - n) / c + (r < n ? 6 : 0);
      break;
    case r:
      s = (n - t) / c + 2;
      break;
    default:
      s = (t - r) / c + 4;
      break;
  }
  return (
    (s *= 60),
    e.alpha !== void 0
      ? { hue: s, saturation: u, lightness: i, alpha: e.alpha }
      : { hue: s, saturation: u, lightness: i }
  );
}
function Ws(e) {
  return Y5(xo(e));
}
var K5 = function (e) {
    return e.length === 7 && e[1] === e[2] && e[3] === e[4] && e[5] === e[6]
      ? '#' + e[1] + e[3] + e[5]
      : e;
  },
  Ra = K5;
function St(e) {
  var t = e.toString(16);
  return t.length === 1 ? '0' + t : t;
}
function Un(e) {
  return St(Math.round(e * 255));
}
function X5(e, t, r) {
  return Ra('#' + Un(e) + Un(t) + Un(r));
}
function sn(e, t, r) {
  return Cr(e, t, r, X5);
}
function J5(e, t, r) {
  if (typeof e == 'number' && typeof t == 'number' && typeof r == 'number')
    return sn(e, t, r);
  if (typeof e == 'object' && t === void 0 && r === void 0)
    return sn(e.hue, e.saturation, e.lightness);
  throw new Je(1);
}
function Q5(e, t, r, n) {
  if (
    typeof e == 'number' &&
    typeof t == 'number' &&
    typeof r == 'number' &&
    typeof n == 'number'
  )
    return n >= 1 ? sn(e, t, r) : 'rgba(' + Cr(e, t, r) + ',' + n + ')';
  if (typeof e == 'object' && t === void 0 && r === void 0 && n === void 0)
    return e.alpha >= 1
      ? sn(e.hue, e.saturation, e.lightness)
      : 'rgba(' + Cr(e.hue, e.saturation, e.lightness) + ',' + e.alpha + ')';
  throw new Je(2);
}
function Oa(e, t, r) {
  if (typeof e == 'number' && typeof t == 'number' && typeof r == 'number')
    return Ra('#' + St(e) + St(t) + St(r));
  if (typeof e == 'object' && t === void 0 && r === void 0)
    return Ra('#' + St(e.red) + St(e.green) + St(e.blue));
  throw new Je(6);
}
function it(e, t, r, n) {
  if (typeof e == 'string' && typeof t == 'number') {
    var o = xo(e);
    return 'rgba(' + o.red + ',' + o.green + ',' + o.blue + ',' + t + ')';
  } else {
    if (
      typeof e == 'number' &&
      typeof t == 'number' &&
      typeof r == 'number' &&
      typeof n == 'number'
    )
      return n >= 1
        ? Oa(e, t, r)
        : 'rgba(' + e + ',' + t + ',' + r + ',' + n + ')';
    if (typeof e == 'object' && t === void 0 && r === void 0 && n === void 0)
      return e.alpha >= 1
        ? Oa(e.red, e.green, e.blue)
        : 'rgba(' + e.red + ',' + e.green + ',' + e.blue + ',' + e.alpha + ')';
  }
  throw new Je(7);
}
var ef = function (e) {
    return (
      typeof e.red == 'number' &&
      typeof e.green == 'number' &&
      typeof e.blue == 'number' &&
      (typeof e.alpha != 'number' || typeof e.alpha > 'u')
    );
  },
  tf = function (e) {
    return (
      typeof e.red == 'number' &&
      typeof e.green == 'number' &&
      typeof e.blue == 'number' &&
      typeof e.alpha == 'number'
    );
  },
  rf = function (e) {
    return (
      typeof e.hue == 'number' &&
      typeof e.saturation == 'number' &&
      typeof e.lightness == 'number' &&
      (typeof e.alpha != 'number' || typeof e.alpha > 'u')
    );
  },
  nf = function (e) {
    return (
      typeof e.hue == 'number' &&
      typeof e.saturation == 'number' &&
      typeof e.lightness == 'number' &&
      typeof e.alpha == 'number'
    );
  };
function Gs(e) {
  if (typeof e != 'object') throw new Je(8);
  if (tf(e)) return it(e);
  if (ef(e)) return Oa(e);
  if (nf(e)) return Q5(e);
  if (rf(e)) return J5(e);
  throw new Je(8);
}
function Ys(e, t, r) {
  return function () {
    var n = r.concat(Array.prototype.slice.call(arguments));
    return n.length >= t ? e.apply(this, n) : Ys(e, t, n);
  };
}
function Ao(e) {
  return Ys(e, e.length, []);
}
function wo(e, t, r) {
  return Math.max(e, Math.min(t, r));
}
function af(e, t) {
  if (t === 'transparent') return t;
  var r = Ws(t);
  return Gs(Ar({}, r, { lightness: wo(0, 1, r.lightness - parseFloat(e)) }));
}
var of = Ao(af),
  qt = of;
function lf(e, t) {
  if (t === 'transparent') return t;
  var r = Ws(t);
  return Gs(Ar({}, r, { lightness: wo(0, 1, r.lightness + parseFloat(e)) }));
}
var sf = Ao(lf),
  cf = sf;
function uf(e, t) {
  if (t === 'transparent') return t;
  var r = xo(t),
    n = typeof r.alpha == 'number' ? r.alpha : 1,
    o = Ar({}, r, {
      alpha: wo(0, 1, +(n * 100 - parseFloat(e) * 100).toFixed(2) / 100),
    });
  return it(o);
}
var df = Ao(uf),
  ve = df,
  ar = ({ theme: e }) => ({
    margin: '20px 0 8px',
    padding: 0,
    cursor: 'text',
    position: 'relative',
    color: e.color.defaultText,
    '&:first-of-type': { marginTop: 0, paddingTop: 0 },
    '&:hover a.anchor': { textDecoration: 'none' },
    '& tt, & code': { fontSize: 'inherit' },
  }),
  dt = ({ theme: e }) => ({
    lineHeight: 1,
    margin: '0 2px',
    padding: '3px 5px',
    whiteSpace: 'nowrap',
    borderRadius: 3,
    fontSize: e.typography.size.s2 - 1,
    border:
      e.base === 'light'
        ? `1px solid ${e.color.mediumlight}`
        : `1px solid ${e.color.darker}`,
    color:
      e.base === 'light'
        ? ve(0.1, e.color.defaultText)
        : ve(0.3, e.color.defaultText),
    backgroundColor: e.base === 'light' ? e.color.lighter : e.color.border,
  }),
  Q = ({ theme: e }) => ({
    fontFamily: e.typography.fonts.base,
    fontSize: e.typography.size.s3,
    margin: 0,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    WebkitOverflowScrolling: 'touch',
  }),
  Bt = { margin: '16px 0' },
  pf = ({ href: e, children: t, ...r }) => {
    let n = /^\//.test(e),
      o = /^#.*/.test(e),
      l = n ? `./?path=${e}` : e;
    return a.createElement(
      'a',
      { href: l, target: o ? '_self' : '_top', ...r },
      t
    );
  },
  Ks = T(pf)(Q, ({ theme: e }) => ({
    fontSize: 'inherit',
    lineHeight: '24px',
    color: e.color.secondary,
    textDecoration: 'none',
    '&.absent': { color: '#cc0000' },
    '&.anchor': {
      display: 'block',
      paddingLeft: 30,
      marginLeft: -30,
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
    },
  })),
  Xs = T.blockquote(Q, Bt, ({ theme: e }) => ({
    borderLeft: `4px solid ${e.color.medium}`,
    padding: '0 15px',
    color: e.color.dark,
    '& > :first-of-type': { marginTop: 0 },
    '& > :last-child': { marginBottom: 0 },
  })),
  ff = (e) => typeof e == 'string',
  mf = /[\n\r]/g,
  gf = T.code(
    ({ theme: e }) => ({
      fontFamily: e.typography.fonts.mono,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      display: 'inline-block',
      paddingLeft: 2,
      paddingRight: 2,
      verticalAlign: 'baseline',
      color: 'inherit',
    }),
    dt
  ),
  hf = T(fo)(({ theme: e }) => ({
    fontFamily: e.typography.fonts.mono,
    fontSize: `${e.typography.size.s2 - 1}px`,
    lineHeight: '19px',
    margin: '25px 0 40px',
    borderRadius: e.appBorderRadius,
    boxShadow:
      e.base === 'light'
        ? 'rgba(0, 0, 0, 0.10) 0 1px 3px 0'
        : 'rgba(0, 0, 0, 0.20) 0 2px 5px 0',
    'pre.prismjs': { padding: 20, background: 'inherit' },
  })),
  Co = ({ className: e, children: t, ...r }) => {
    let n = (e || '').match(/lang-(\S+)/),
      o = b.Children.toArray(t);
    return o.filter(ff).some((l) => l.match(mf))
      ? a.createElement(
          hf,
          {
            bordered: !0,
            copyable: !0,
            language: (n == null ? void 0 : n[1]) ?? 'plaintext',
            format: !1,
            ...r,
          },
          t
        )
      : a.createElement(gf, { ...r, className: e }, o);
  },
  Js = T.div(Q),
  Qs = T.dl(Q, Bt, {
    padding: 0,
    '& dt': {
      fontSize: '14px',
      fontWeight: 'bold',
      fontStyle: 'italic',
      padding: 0,
      margin: '16px 0 4px',
    },
    '& dt:first-of-type': { padding: 0 },
    '& dt > :first-of-type': { marginTop: 0 },
    '& dt > :last-child': { marginBottom: 0 },
    '& dd': { margin: '0 0 16px', padding: '0 15px' },
    '& dd > :first-of-type': { marginTop: 0 },
    '& dd > :last-child': { marginBottom: 0 },
  }),
  ec = T.h1(Q, ar, ({ theme: e }) => ({
    fontSize: `${e.typography.size.l1}px`,
    fontWeight: e.typography.weight.bold,
  })),
  So = T.h2(Q, ar, ({ theme: e }) => ({
    fontSize: `${e.typography.size.m2}px`,
    paddingBottom: 4,
    borderBottom: `1px solid ${e.appBorderColor}`,
  })),
  ko = T.h3(Q, ar, ({ theme: e }) => ({
    fontSize: `${e.typography.size.m1}px`,
  })),
  tc = T.h4(Q, ar, ({ theme: e }) => ({
    fontSize: `${e.typography.size.s3}px`,
  })),
  rc = T.h5(Q, ar, ({ theme: e }) => ({
    fontSize: `${e.typography.size.s2}px`,
  })),
  nc = T.h6(Q, ar, ({ theme: e }) => ({
    fontSize: `${e.typography.size.s2}px`,
    color: e.color.dark,
  })),
  ac = T.hr(({ theme: e }) => ({
    border: '0 none',
    borderTop: `1px solid ${e.appBorderColor}`,
    height: 4,
    padding: 0,
  })),
  oc = T.img({ maxWidth: '100%' }),
  lc = T.li(Q, ({ theme: e }) => ({
    fontSize: e.typography.size.s2,
    color: e.color.defaultText,
    lineHeight: '24px',
    '& + li': { marginTop: '.25em' },
    '& ul, & ol': { marginTop: '.25em', marginBottom: 0 },
    '& code': dt({ theme: e }),
  })),
  bf = {
    paddingLeft: 30,
    '& :first-of-type': { marginTop: 0 },
    '& :last-child': { marginBottom: 0 },
  },
  ic = T.ol(Q, Bt, bf, { listStyle: 'decimal' }),
  sc = T.p(Q, Bt, ({ theme: e }) => ({
    fontSize: e.typography.size.s2,
    lineHeight: '24px',
    color: e.color.defaultText,
    '& code': dt({ theme: e }),
  })),
  cc = T.pre(Q, Bt, ({ theme: e }) => ({
    fontFamily: e.typography.fonts.mono,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    lineHeight: '18px',
    padding: '11px 1rem',
    whiteSpace: 'pre-wrap',
    color: 'inherit',
    borderRadius: 3,
    margin: '1rem 0',
    '&:not(.prismjs)': {
      background: 'transparent',
      border: 'none',
      borderRadius: 0,
      padding: 0,
      margin: 0,
    },
    '& pre, &.prismjs': {
      padding: 15,
      margin: 0,
      whiteSpace: 'pre-wrap',
      color: 'inherit',
      fontSize: '13px',
      lineHeight: '19px',
      code: { color: 'inherit', fontSize: 'inherit' },
    },
    '& code': { whiteSpace: 'pre' },
    '& code, & tt': { border: 'none' },
  })),
  uc = T.span(Q, ({ theme: e }) => ({
    '&.frame': {
      display: 'block',
      overflow: 'hidden',
      '& > span': {
        border: `1px solid ${e.color.medium}`,
        display: 'block',
        float: 'left',
        overflow: 'hidden',
        margin: '13px 0 0',
        padding: 7,
        width: 'auto',
      },
      '& span img': { display: 'block', float: 'left' },
      '& span span': {
        clear: 'both',
        color: e.color.darkest,
        display: 'block',
        padding: '5px 0 0',
      },
    },
    '&.align-center': {
      display: 'block',
      overflow: 'hidden',
      clear: 'both',
      '& > span': {
        display: 'block',
        overflow: 'hidden',
        margin: '13px auto 0',
        textAlign: 'center',
      },
      '& span img': { margin: '0 auto', textAlign: 'center' },
    },
    '&.align-right': {
      display: 'block',
      overflow: 'hidden',
      clear: 'both',
      '& > span': {
        display: 'block',
        overflow: 'hidden',
        margin: '13px 0 0',
        textAlign: 'right',
      },
      '& span img': { margin: 0, textAlign: 'right' },
    },
    '&.float-left': {
      display: 'block',
      marginRight: 13,
      overflow: 'hidden',
      float: 'left',
      '& span': { margin: '13px 0 0' },
    },
    '&.float-right': {
      display: 'block',
      marginLeft: 13,
      overflow: 'hidden',
      float: 'right',
      '& > span': {
        display: 'block',
        overflow: 'hidden',
        margin: '13px auto 0',
        textAlign: 'right',
      },
    },
  })),
  dc = T.table(Q, Bt, ({ theme: e }) => ({
    fontSize: e.typography.size.s2,
    lineHeight: '24px',
    padding: 0,
    borderCollapse: 'collapse',
    '& tr': {
      borderTop: `1px solid ${e.appBorderColor}`,
      backgroundColor: e.appContentBg,
      margin: 0,
      padding: 0,
    },
    '& tr:nth-of-type(2n)': {
      backgroundColor: e.base === 'dark' ? e.color.darker : e.color.lighter,
    },
    '& tr th': {
      fontWeight: 'bold',
      color: e.color.defaultText,
      border: `1px solid ${e.appBorderColor}`,
      margin: 0,
      padding: '6px 13px',
    },
    '& tr td': {
      border: `1px solid ${e.appBorderColor}`,
      color: e.color.defaultText,
      margin: 0,
      padding: '6px 13px',
    },
    '& tr th :first-of-type, & tr td :first-of-type': { marginTop: 0 },
    '& tr th :last-child, & tr td :last-child': { marginBottom: 0 },
  })),
  pc = T.title(dt),
  yf = {
    paddingLeft: 30,
    '& :first-of-type': { marginTop: 0 },
    '& :last-child': { marginBottom: 0 },
  },
  fc = T.ul(Q, Bt, yf, { listStyle: 'disc' }),
  To = T.div(Q),
  mc = {
    h1: (e) => a.createElement(ec, { ...Y(e, 'h1') }),
    h2: (e) => a.createElement(So, { ...Y(e, 'h2') }),
    h3: (e) => a.createElement(ko, { ...Y(e, 'h3') }),
    h4: (e) => a.createElement(tc, { ...Y(e, 'h4') }),
    h5: (e) => a.createElement(rc, { ...Y(e, 'h5') }),
    h6: (e) => a.createElement(nc, { ...Y(e, 'h6') }),
    pre: (e) => a.createElement(cc, { ...Y(e, 'pre') }),
    a: (e) => a.createElement(Ks, { ...Y(e, 'a') }),
    hr: (e) => a.createElement(ac, { ...Y(e, 'hr') }),
    dl: (e) => a.createElement(Qs, { ...Y(e, 'dl') }),
    blockquote: (e) => a.createElement(Xs, { ...Y(e, 'blockquote') }),
    table: (e) => a.createElement(dc, { ...Y(e, 'table') }),
    img: (e) => a.createElement(oc, { ...Y(e, 'img') }),
    div: (e) => a.createElement(Js, { ...Y(e, 'div') }),
    span: (e) => a.createElement(uc, { ...Y(e, 'span') }),
    li: (e) => a.createElement(lc, { ...Y(e, 'li') }),
    ul: (e) => a.createElement(fc, { ...Y(e, 'ul') }),
    ol: (e) => a.createElement(ic, { ...Y(e, 'ol') }),
    p: (e) => a.createElement(sc, { ...Y(e, 'p') }),
    code: (e) => a.createElement(Co, { ...Y(e, 'code') }),
    tt: (e) => a.createElement(pc, { ...Y(e, 'tt') }),
    resetwrapper: (e) => a.createElement(To, { ...Y(e, 'resetwrapper') }),
  },
  vf = T.div(
    ({ theme: e }) => ({
      display: 'inline-block',
      fontSize: 11,
      lineHeight: '12px',
      alignSelf: 'center',
      padding: '4px 12px',
      borderRadius: '3em',
      fontWeight: e.typography.weight.bold,
    }),
    {
      svg: {
        height: 12,
        width: 12,
        marginRight: 4,
        marginTop: -2,
        path: { fill: 'currentColor' },
      },
    },
    ({ theme: e, status: t }) => {
      switch (t) {
        case 'critical':
          return { color: e.color.critical, background: e.background.critical };
        case 'negative':
          return {
            color: e.color.negativeText,
            background: e.background.negative,
            boxShadow:
              e.base === 'light'
                ? `inset 0 0 0 1px ${ve(0.9, e.color.negativeText)}`
                : 'none',
          };
        case 'warning':
          return {
            color: e.color.warningText,
            background: e.background.warning,
            boxShadow:
              e.base === 'light'
                ? `inset 0 0 0 1px ${ve(0.9, e.color.warningText)}`
                : 'none',
          };
        case 'neutral':
          return {
            color: e.color.dark,
            background: e.color.mediumlight,
            boxShadow:
              e.base === 'light'
                ? `inset 0 0 0 1px ${ve(0.9, e.color.dark)}`
                : 'none',
          };
        case 'positive':
          return {
            color: e.color.positiveText,
            background: e.background.positive,
            boxShadow:
              e.base === 'light'
                ? `inset 0 0 0 1px ${ve(0.9, e.color.positiveText)}`
                : 'none',
          };
        default:
          return {};
      }
    }
  ),
  Ef = ({ ...e }) => a.createElement(vf, { ...e }),
  Sr = {
    user: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M14 7A7 7 0 1 1 0 7a7 7 0 0 1 14 0ZM2.67 11.15c.7-1 2.6-1.81 3.2-1.9.22-.04.23-.66.23-.66s-.67-.66-.81-1.55c-.4 0-.63-.94-.24-1.27l-.02-.13c-.06-.6-.28-2.6 1.97-2.6s2.03 2 1.97 2.6l-.02.13c.4.33.15 1.27-.24 1.27-.14.89-.8 1.55-.8 1.55s0 .62.22.66c.6.09 2.5.9 3.2 1.9a6 6 0 1 0-8.66 0Z',
      })
    ),
    useralt: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M7.27 13.16a11.39 11.39 0 0 0 5.18-1.23v-.25c0-1.57-3.24-3-4.1-3.13-.27-.05-.28-.79-.28-.79s.8-.78.96-1.83c.47 0 .75-1.12.29-1.52.02-.41.6-3.25-2.32-3.25S4.65 4 4.67 4.41c-.46.4-.17 1.52.29 1.52.17 1.05.96 1.83.96 1.83s0 .74-.27.79c-.86.13-4.04 1.53-4.1 3.08a11.44 11.44 0 0 0 5.72 1.53Z',
      })
    ),
    useradd: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M1.18 11.9c-.4-.17-.8-.36-1.18-.58.06-1.44 3.02-2.74 3.82-2.87.25-.04.26-.73.26-.73s-.74-.73-.9-1.7c-.43 0-.7-1.05-.27-1.42l-.01-.14c-.07-.67-.31-2.88 2.18-2.88 2.48 0 2.24 2.2 2.17 2.88l-.01.14c.43.37.16 1.41-.27 1.41-.16.98-.9 1.71-.9 1.71s.01.69.26.73c.8.13 3.82 1.46 3.82 2.91v.24a10.63 10.63 0 0 1-8.97.3ZM11.5 2.16c.28 0 .5.22.5.5v1.5h1.5a.5.5 0 0 1 0 1H12v1.5a.5.5 0 0 1-1 0v-1.5H9.5a.5.5 0 1 1 0-1H11v-1.5c0-.28.22-.5.5-.5Z',
      })
    ),
    users: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M9.21 11.62A10.59 10.59 0 0 1 0 11.07c.06-1.35 2.93-2.58 3.7-2.7.25-.03.26-.68.26-.68s-.72-.69-.87-1.6c-.42 0-.68-.99-.26-1.33 0-.03 0-.08-.02-.14-.07-.63-.3-2.71 2.12-2.71 2.41 0 2.18 2.08 2.11 2.71l-.01.14c.42.34.16 1.32-.26 1.32-.16.92-.87 1.6-.87 1.6s0 .66.25.7c.78.11 3.7 1.36 3.7 2.73v.22l-.64.3Z',
      }),
      a.createElement('path', {
        d: 'M8.81 8.42a9.64 9.64 0 0 0-.74-.4 5.2 5.2 0 0 1 1.7-.76c.17-.02.17-.47.17-.47s-.49-.47-.6-1.1c-.28 0-.46-.68-.17-.91l-.01-.1c-.05-.43-.2-1.86 1.45-1.86 1.66 0 1.5 1.43 1.45 1.86v.1c.28.23.1.9-.18.9-.11.64-.6 1.11-.6 1.11s0 .45.17.47c.54.08 2.55.94 2.55 1.89v.62a10.6 10.6 0 0 1-3.3.56 2.97 2.97 0 0 0-.58-.88c-.37-.41-.85-.76-1.31-1.03Z',
      })
    ),
    profile: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M9.1 7.35a5.06 5.06 0 0 1-4.52-.28C4.6 6.4 6.02 5.77 6.4 5.7c.12-.02.12-.35.12-.35s-.35-.34-.43-.81c-.2 0-.33-.5-.12-.67l-.01-.07C5.93 3.48 5.81 2.42 7 2.42S8.07 3.48 8.04 3.8v.07c.2.17.07.67-.13.67-.08.47-.43.81-.43.81s0 .33.12.35c.38.06 1.82.7 1.82 1.4v.1c-.1.06-.2.1-.31.15Zm-5.35 3.9c0-.14.11-.25.25-.25h6a.25.25 0 1 1 0 .5H4a.25.25 0 0 1-.25-.25ZM4 9a.25.25 0 0 0 0 .5h6a.25.25 0 1 0 0-.5H4Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M1 .5c0-.28.22-.5.5-.5h11c.28 0 .5.22.5.5v13a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V.5ZM2 13V1h10v12H2Z',
      })
    ),
    facehappy: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M3.97 8.75a.5.5 0 0 0-.87.5 4.5 4.5 0 0 0 7.8 0 .5.5 0 1 0-.87-.5 3.5 3.5 0 0 1-6.06 0ZM5.5 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9.5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M14 7A7 7 0 1 1 0 7a7 7 0 0 1 14 0Zm-1 0A6 6 0 1 1 1 7a6 6 0 0 1 12 0Z',
      })
    ),
    faceneutral: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M4.5 9a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5ZM5.5 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9.5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M14 7A7 7 0 1 1 0 7a7 7 0 0 1 14 0Zm-1 0A6 6 0 1 1 1 7a6 6 0 0 1 12 0Z',
      })
    ),
    facesad: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M3.97 10.25a.5.5 0 0 1-.87-.5 4.5 4.5 0 0 1 7.8 0 .5.5 0 1 1-.87.5 3.5 3.5 0 0 0-6.06 0ZM5.5 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9.5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M14 7A7 7 0 1 1 0 7a7 7 0 0 1 14 0Zm-1 0A6 6 0 1 1 1 7a6 6 0 0 1 12 0Z',
      })
    ),
    accessibility: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M3.53 4.84a.5.5 0 0 1 .63-.31l2.05.68a2.5 2.5 0 0 0 1.58 0l2.05-.68a.5.5 0 0 1 .32.94L7.7 6.3a.3.3 0 0 0-.21.29v.24c0 .7.16 1.39.48 2.01l.97 1.95a.5.5 0 1 1-.9.44L7 9.12l-1.05 2.1a.5.5 0 1 1-.9-.44l.97-1.95a4.5 4.5 0 0 0 .48-2.01v-.24a.3.3 0 0 0-.2-.29l-2.46-.82a.5.5 0 0 1-.31-.63Z',
      }),
      a.createElement('path', { d: 'M7 4.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z' }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M7 14A7 7 0 1 0 7 0a7 7 0 0 0 0 14Zm0-1A6 6 0 1 0 7 1a6 6 0 0 0 0 12Z',
      })
    ),
    accessibilityalt: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M7 14A7 7 0 1 0 7 0a7 7 0 0 0 0 14ZM8 3.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM3.53 4.84a.5.5 0 0 1 .63-.31l2.05.68a2.5 2.5 0 0 0 1.58 0l2.05-.68a.5.5 0 0 1 .32.94L7.7 6.3a.3.3 0 0 0-.21.29v.24c0 .7.16 1.39.48 2.01l.97 1.95a.5.5 0 1 1-.9.44L7 9.12l-1.05 2.1a.5.5 0 1 1-.9-.44l.97-1.95a4.5 4.5 0 0 0 .48-2.01v-.24a.3.3 0 0 0-.2-.29l-2.46-.82a.5.5 0 0 1-.31-.63Z',
      })
    ),
    arrowup: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'm7.35 2.9 5.5 5.5a.5.5 0 0 1-.7.7L7 3.96 1.85 9.1a.5.5 0 1 1-.7-.7l5.5-5.5c.2-.2.5-.2.7 0Z',
      })
    ),
    arrowdown: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'm1.15 5.6 5.5 5.5c.2.2.5.2.7 0l5.5-5.5a.5.5 0 0 0-.7-.7L7 10.04 1.85 4.9a.5.5 0 1 0-.7.7Z',
      })
    ),
    arrowleft: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M2.76 7.1c.02.09.06.18.14.25l5.5 5.5a.5.5 0 0 0 .7-.7L3.96 7 9.1 1.85a.5.5 0 1 0-.7-.7l-5.5 5.5a.5.5 0 0 0-.14.45Z',
      })
    ),
    arrowright: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'm11.1 7.35-5.5 5.5a.5.5 0 0 1-.7-.7L10.04 7 4.9 1.85a.5.5 0 1 1 .7-.7l5.5 5.5c.2.2.2.5 0 .7Z',
      })
    ),
    arrowupalt: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M11.85 4.65 7.35.15a.5.5 0 0 0-.7 0l-4.5 4.5a.5.5 0 1 0 .7.7L6.5 1.71V13.5a.5.5 0 0 0 1 0V1.7l3.65 3.65a.5.5 0 0 0 .7-.7Z',
      })
    ),
    arrowdownalt: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M7.5.5a.5.5 0 0 0-1 0v11.8L2.85 8.64a.5.5 0 1 0-.7.7l4.5 4.5A.5.5 0 0 0 7 14a.5.5 0 0 0 .35-.15l4.5-4.5a.5.5 0 0 0-.7-.7L7.5 12.29V.5Z',
      })
    ),
    arrowleftalt: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M5.35 2.15c.2.2.2.5 0 .7L1.71 6.5H13.5a.5.5 0 0 1 0 1H1.7l3.65 3.65a.5.5 0 0 1-.7.7l-4.5-4.5a.5.5 0 0 1 0-.7l4.5-4.5c.2-.2.5-.2.7 0Z',
      })
    ),
    arrowrightalt: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M8.65 2.15c.2-.2.5-.2.7 0l4.5 4.5c.2.2.2.5 0 .7l-4.5 4.5a.5.5 0 0 1-.7-.7l3.64-3.65H.5a.5.5 0 0 1 0-1h11.8L8.64 2.85a.5.5 0 0 1 0-.7Z',
      })
    ),
    expandalt: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'm7.35.15 4 4a.5.5 0 0 1-.7.7L7 1.21 3.35 4.85a.5.5 0 1 1-.7-.7l4-4c.2-.2.5-.2.7 0ZM11.35 9.15c.2.2.2.5 0 .7l-4 4a.5.5 0 0 1-.7 0l-4-4a.5.5 0 1 1 .7-.7L7 12.79l3.65-3.64c.2-.2.5-.2.7 0Z',
      })
    ),
    collapse: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M3.354.146a.5.5 0 1 0-.708.708l4 4a.5.5 0 0 0 .708 0l4-4a.5.5 0 0 0-.708-.708L7 3.793 3.354.146Zm3.292 9a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1-.708.708L7 10.207l-3.646 3.647a.5.5 0 0 1-.708-.708l4-4Z',
      })
    ),
    expand: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M1.5 1h2a.5.5 0 0 1 0 1h-.8l3.15 3.15a.5.5 0 1 1-.7.7L2 2.71v.79a.5.5 0 0 1-1 0v-2c0-.28.22-.5.5-.5ZM10 1.5c0-.28.22-.5.5-.5h2c.28 0 .5.22.5.5v2a.5.5 0 0 1-1 0v-.8L8.85 5.86a.5.5 0 1 1-.7-.7L11.29 2h-.79a.5.5 0 0 1-.5-.5ZM12.5 10c.28 0 .5.22.5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h.8L8.14 8.85a.5.5 0 1 1 .7-.7L12 11.29v-.79c0-.28.22-.5.5-.5ZM2 11.3v-.8a.5.5 0 0 0-1 0v2c0 .28.22.5.5.5h2a.5.5 0 0 0 0-1h-.8l3.15-3.15a.5.5 0 1 0-.7-.7L2 11.29Z',
      })
    ),
    unfold: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'm6.65.15-1.5 1.5a.5.5 0 1 0 .7.7l.65-.64V5a.5.5 0 0 0 1 0V1.7l.65.65a.5.5 0 1 0 .7-.7L7.35.15a.5.5 0 0 0-.7 0Z',
      }),
      a.createElement('path', {
        d: 'M1.3 4.04a.5.5 0 0 0-.16.82L3.3 7 1.15 9.15a.5.5 0 0 0 .35.85h3a.5.5 0 0 0 0-1H2.7l1.5-1.5h5.6l2.35 2.35a.5.5 0 0 0 .7-.7L10.71 7l2.14-2.15.11-.54-.1.54A.5.5 0 0 0 13 4.5a.5.5 0 0 0-.14-.35.5.5 0 0 0-.36-.15h-3a.5.5 0 0 0 0 1h1.8L9.8 6.5H4.2L2.7 5h1.8a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.2.04Z',
      }),
      a.createElement('path', {
        d: 'M7 8.5c.28 0 .5.22.5.5v3.3l.65-.65a.5.5 0 0 1 .7.7l-1.5 1.5a.5.5 0 0 1-.7 0l-1.5-1.5a.5.5 0 0 1 .7-.7l.65.64V9c0-.28.22-.5.5-.5ZM9 9.5c0-.28.22-.5.5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z',
      })
    ),
    transfer: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M10.65 2.65c.2-.2.5-.2.7 0l1.5 1.5c.2.2.2.5 0 .7l-1.5 1.5a.5.5 0 0 1-.7-.7l.64-.65H1.5a.5.5 0 0 1 0-1h9.8l-.65-.65a.5.5 0 0 1 0-.7ZM3.35 8.35 2.71 9h9.79a.5.5 0 0 1 0 1H2.7l.65.65a.5.5 0 0 1-.7.7l-1.5-1.5a.5.5 0 0 1 0-.7l1.5-1.5a.5.5 0 1 1 .7.7Z',
      })
    ),
    redirect: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M1.5 1c.28 0 .5.22.5.5V10a2 2 0 0 0 4 0V4a3 3 0 0 1 6 0v7.8l1.15-1.15a.5.5 0 0 1 .7.7l-2 2a.5.5 0 0 1-.7 0l-2-2a.5.5 0 0 1 .7-.7L11 11.79V4a2 2 0 1 0-4 0v6a3 3 0 0 1-6 0V1.5c0-.28.22-.5.5-.5Z',
      })
    ),
    undo: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M1.15 3.85a.5.5 0 0 1 0-.7l2-2a.5.5 0 1 1 .7.7L2.71 3H9a4 4 0 0 1 0 8H3a.5.5 0 0 1 0-1h6a3 3 0 1 0 0-6H2.7l1.15 1.15a.5.5 0 1 1-.7.7l-2-2Z',
      })
    ),
    reply: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M4.35 2.15c.2.2.2.5 0 .7L1.71 5.5H9.5A4.5 4.5 0 0 1 14 10v1.5a.5.5 0 0 1-1 0V10a3.5 3.5 0 0 0-3.5-3.5H1.7l2.65 2.65a.5.5 0 1 1-.7.7l-3.5-3.5a.5.5 0 0 1 0-.7l3.5-3.5c.2-.2.5-.2.7 0Z',
      })
    ),
    sync: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M5.5 1A.5.5 0 0 0 5 .5H2a.5.5 0 0 0 0 1h1.53a6.5 6.5 0 0 0 2.39 11.91.5.5 0 1 0 .16-.99A5.5 5.5 0 0 1 4.5 2.1V4a.5.5 0 0 0 1 0V1ZM7.5 1a.5.5 0 0 1 .58-.41 6.5 6.5 0 0 1 2.39 11.91H12a.5.5 0 0 1 0 1H9a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 1 0v1.9A5.5 5.5 0 0 0 7.92 1.58.5.5 0 0 1 7.5 1Z',
      })
    ),
    upload: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M8.65 5.85 7.5 4.71v5.79a.5.5 0 0 1-1 0V4.7L5.35 5.86a.5.5 0 1 1-.7-.7l2-2c.2-.2.5-.2.7 0l2 2a.5.5 0 1 1-.7.7Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M14 7A7 7 0 1 1 0 7a7 7 0 0 1 14 0Zm-1 0A6 6 0 1 1 1 7a6 6 0 0 1 12 0Z',
      })
    ),
    download: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M5.35 8.15 6.5 9.29V3.5a.5.5 0 0 1 1 0v5.8l1.15-1.15a.5.5 0 1 1 .7.7l-2 2a.5.5 0 0 1-.7 0l-2-2a.5.5 0 1 1 .7-.7Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M0 7a7 7 0 1 1 14 0A7 7 0 0 1 0 7Zm1 0a6 6 0 1 1 12 0A6 6 0 0 1 1 7Z',
      })
    ),
    back: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M5.85 5.35 4.71 6.5h5.79a.5.5 0 0 1 0 1H4.7l1.15 1.15a.5.5 0 1 1-.7.7l-2-2a.5.5 0 0 1 0-.7l2-2a.5.5 0 1 1 .7.7Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M7 0a7 7 0 1 1 0 14A7 7 0 0 1 7 0Zm0 1a6 6 0 1 1 0 12A6 6 0 0 1 7 1Z',
      })
    ),
    proceed: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M3.5 6.5h5.8L8.14 5.35a.5.5 0 1 1 .7-.7l2 2c.2.2.2.5 0 .7l-2 2a.5.5 0 1 1-.7-.7L9.29 7.5H3.5a.5.5 0 0 1 0-1Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M7 14A7 7 0 1 1 7 0a7 7 0 0 1 0 14Zm0-1A6 6 0 1 1 7 1a6 6 0 0 1 0 12Z',
      })
    ),
    refresh: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M7.1.5H7a6.5 6.5 0 1 0 6.41 7.58.5.5 0 1 0-.99-.16A5.47 5.47 0 0 1 7 12.5a5.5 5.5 0 0 1 0-11 5.5 5.5 0 0 1 4.9 3H10a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5V2a.5.5 0 0 0-1 0v1.53A6.5 6.5 0 0 0 7.1.5Z',
      })
    ),
    globe: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M14 7A7 7 0 1 0 0 7a7 7 0 0 0 14 0Zm-6.53 5.74c-.24.23-.4.26-.47.26-.08 0-.23-.03-.47-.26-.23-.24-.5-.62-.73-1.18A11.57 11.57 0 0 1 5 7.5h4a11.57 11.57 0 0 1-.8 4.06c-.24.56-.5.94-.73 1.18ZM8.99 6.5H5.01c.05-1.62.35-3.04.79-4.06.24-.56.5-.94.73-1.18.24-.23.4-.26.47-.26.08 0 .23.03.47.26.23.24.5.62.73 1.18.44 1.02.74 2.44.8 4.06Zm1 1c-.06 2.18-.56 4.08-1.28 5.25a6 6 0 0 0 4.27-5.25H9.99Zm2.99-1H9.99c-.06-2.18-.56-4.08-1.28-5.25a6 6 0 0 1 4.27 5.25ZM4 6.5c.06-2.18.56-4.08 1.28-5.25A6 6 0 0 0 1.02 6.5h2.99Zm-2.99 1a6 6 0 0 0 4.27 5.25c-.72-1.17-1.22-3.07-1.28-5.25H1.02Z',
      })
    ),
    compass: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M10.09 3.4 5.95 5.8a.37.37 0 0 0-.11.09.38.38 0 0 0-.04.05l-2.4 4.15a.37.37 0 0 0 0 .38c.1.18.33.24.5.14l4.15-2.4a.37.37 0 0 0 .15-.15l2.4-4.15a.37.37 0 0 0-.03-.44.37.37 0 0 0-.48-.07ZM4.75 9.25 7.6 7.6 6.4 6.4 4.75 9.25Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M14 7A7 7 0 1 1 0 7a7 7 0 0 1 14 0Zm-1 0A6 6 0 1 1 1 7a6 6 0 0 1 12 0Z',
      })
    ),
    location: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M0 7a7 7 0 1 1 14 0A7 7 0 0 1 0 7Zm6.5 3.5v2.48A6 6 0 0 1 1.02 7.5H3.5a.5.5 0 0 0 0-1H1.02A6 6 0 0 1 6.5 1.02V3.5a.5.5 0 0 0 1 0V1.02a6 6 0 0 1 5.48 5.48H10.5a.5.5 0 0 0 0 1h2.48a6 6 0 0 1-5.48 5.48V10.5a.5.5 0 0 0-1 0Z',
      })
    ),
    pin: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M9 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M12 5A5 5 0 0 0 2 5c0 2.63 2.27 6.15 4.65 8.64.2.2.5.2.7 0C9.73 11.15 12 7.64 12 5ZM7 1a4 4 0 0 1 4 4c0 1.06-.47 2.42-1.3 3.88A21.23 21.23 0 0 1 7 12.55c-1-1.1-1.97-2.39-2.7-3.67A8.46 8.46 0 0 1 3 5a4 4 0 0 1 4-4Z',
      })
    ),
    time: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M7 2c.28 0 .5.22.5.5v4H10a.5.5 0 0 1 0 1H7a.5.5 0 0 1-.5-.5V2.5c0-.28.22-.5.5-.5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M7 14A7 7 0 1 0 7 0a7 7 0 0 0 0 14Zm0-1A6 6 0 1 0 7 1a6 6 0 0 0 0 12Z',
      })
    ),
    dashboard: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M9.8 4.1a.5.5 0 0 1 .1.7L7.92 7.58A1 1 0 1 1 7.1 7l2-2.8a.5.5 0 0 1 .7-.12Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M2.07 12.97a7 7 0 1 1 9.86 0 12.96 12.96 0 0 0-9.86 0Zm9.58-1.18a6 6 0 1 0-9.3 0 13.98 13.98 0 0 1 9.3 0Z',
      })
    ),
    timer: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M7.5 4.5a.5.5 0 0 0-1 0v2.63a1 1 0 1 0 1 0V4.5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M5.5.5c0-.28.22-.5.5-.5h2a.5.5 0 0 1 0 1h-.5v1.02c1.28.1 2.45.61 3.37 1.4l.78-.77a.5.5 0 0 1 .7.7l-.77.78a6 6 0 1 1-5.08-2.1V1H6a.5.5 0 0 1-.5-.5ZM7 3a5 5 0 1 0 0 10A5 5 0 0 0 7 3Z',
      })
    ),
    home: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'm7.35 1.15 5.5 5.5a.5.5 0 0 1-.7.7L12 7.21v5.29a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V9H6v3.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V7.2l-.15.15a.5.5 0 1 1-.7-.7l1-1 4.5-4.5c.2-.2.5-.2.7 0ZM3 6.2V12h2V8.5c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5V12h2V6.2l-4-4-4 4Z',
      })
    ),
    admin: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M1.21 4.1a.5.5 0 0 1 .06-.04l5.48-3a.5.5 0 0 1 .5 0l5.48 3a.5.5 0 0 1 .27.39.5.5 0 0 1-.51.55H1.51a.5.5 0 0 1-.3-.9ZM3.46 4h7.08L7 2.07 3.46 4Z',
      }),
      a.createElement('path', {
        d: 'M4 6a.5.5 0 1 0-1 0v5a.5.5 0 0 0 1 0V6ZM11 6a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0V6ZM5.75 5.5c.28 0 .5.22.5.5v5a.5.5 0 0 1-1 0V6c0-.28.22-.5.5-.5ZM8.75 6a.5.5 0 1 0-1 0v5a.5.5 0 0 0 1 0V6ZM1.5 12.5c0-.27.22-.5.5-.5h10a.5.5 0 0 1 0 1H2a.5.5 0 0 1-.5-.5Z',
      })
    ),
    info: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M7 5.5c.28 0 .5.22.5.5v4a.5.5 0 0 1-1 0V6c0-.28.22-.5.5-.5ZM7 4.5A.75.75 0 1 0 7 3a.75.75 0 0 0 0 1.5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M7 14A7 7 0 1 0 7 0a7 7 0 0 0 0 14Zm0-1A6 6 0 1 0 7 1a6 6 0 0 0 0 12Z',
      })
    ),
    question: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M5.25 5.25A1.75 1.75 0 1 1 7 7a.5.5 0 0 0-.5.5V9a.5.5 0 0 0 1 0V7.95a2.75 2.75 0 1 0-3.25-2.7.5.5 0 0 0 1 0ZM7 11.5A.75.75 0 1 0 7 10a.75.75 0 0 0 0 1.5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M14 7A7 7 0 1 1 0 7a7 7 0 0 1 14 0Zm-1 0A6 6 0 1 1 1 7a6 6 0 0 1 12 0Z',
      })
    ),
    support: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M14 7A7 7 0 1 1 0 7a7 7 0 0 1 14 0Zm-3.52 4.9a5.97 5.97 0 0 1-6.96 0l1.45-1.45a3.98 3.98 0 0 0 4.06 0l1.45 1.44Zm-.03-2.87 1.44 1.45a5.97 5.97 0 0 0 0-6.96l-1.44 1.45a3.98 3.98 0 0 1 0 4.06ZM9.03 3.55l1.45-1.44a5.97 5.97 0 0 0-6.96 0l1.45 1.44a3.98 3.98 0 0 1 4.06 0ZM3.55 4.97 2.11 3.52a5.97 5.97 0 0 0 0 6.96l1.44-1.45a3.98 3.98 0 0 1 0-4.06ZM10 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
      })
    ),
    alert: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M7 4.5c.28 0 .5.22.5.5v3.5a.5.5 0 0 1-1 0V5c0-.28.22-.5.5-.5ZM7.75 10.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M7.2 1.04a.5.5 0 0 1 .24.21l6.49 11a.5.5 0 0 1-.44.75H.51a.5.5 0 0 1-.5-.45.5.5 0 0 1 .06-.31l6.5-10.99a.5.5 0 0 1 .64-.2ZM7 2.48 1.38 12h11.24L7 2.48Z',
      })
    ),
    email: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M0 2.5c0-.27.22-.5.5-.5h13c.28 0 .5.23.5.5v9a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-9Zm1 1.02V11h12V3.52L7.31 7.89a.5.5 0 0 1-.52.07.5.5 0 0 1-.1-.07L1 3.52ZM12.03 3H1.97L7 6.87 12.03 3Z',
      })
    ),
    phone: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'm7.76 8.13-.05.05a.2.2 0 0 1-.28.03A6.76 6.76 0 0 1 5.8 6.56a.21.21 0 0 1 .04-.27l.05-.05c.23-.2.54-.47.71-.96.17-.47-.02-1.04-.66-1.94-.26-.38-.72-.96-1.22-1.46-.68-.69-1.2-1-1.65-1a.98.98 0 0 0-.51.13A3.23 3.23 0 0 0 .9 3.42c-.13 1.1.26 2.37 1.17 3.78a16.68 16.68 0 0 0 4.55 4.6 6.57 6.57 0 0 0 3.53 1.32A3.2 3.2 0 0 0 13 11.46c.14-.24.24-.64-.07-1.18a7.8 7.8 0 0 0-1.73-1.8c-.64-.5-1.52-1.12-2.13-1.12a.97.97 0 0 0-.34.06c-.47.17-.74.46-.95.69l-.02.02Zm4.32 2.68a6.8 6.8 0 0 0-1.48-1.54h-.02c-.3-.25-.64-.49-.95-.67a2.7 2.7 0 0 0-.56-.24h-.01c-.23.09-.34.21-.56.45l-.02.02-.04.04a1.2 1.2 0 0 1-1.6.15 7.76 7.76 0 0 1-1.86-1.89l-.01-.01-.02-.02a1.21 1.21 0 0 1 .2-1.53l.06-.06.02-.02c.22-.2.35-.31.43-.53v-.02c0-.02 0-.06-.03-.14a3.7 3.7 0 0 0-.5-.88h-.01V3.9c-.23-.33-.65-.87-1.1-1.32H4c-.31-.32-.55-.5-.72-.6a.6.6 0 0 0-.22-.1h-.03a2.23 2.23 0 0 0-1.15 1.66c-.09.78.18 1.8 1.02 3.1a15.68 15.68 0 0 0 4.27 4.33l.02.01.02.02a5.57 5.57 0 0 0 2.97 1.11 2.2 2.2 0 0 0 1.93-1.14h.01v-.05a.57.57 0 0 0-.05-.12Z',
      })
    ),
    link: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M11.84 2.16a2.25 2.25 0 0 0-3.18 0l-2.5 2.5c-.88.88-.88 2.3 0 3.18a.5.5 0 0 1-.7.7 3.25 3.25 0 0 1 0-4.59l2.5-2.5a3.25 3.25 0 0 1 4.59 4.6L10.48 8.1c.04-.44.01-.89-.09-1.32l1.45-1.45c.88-.88.88-2.3 0-3.18Z',
      }),
      a.createElement('path', {
        d: 'M3.6 7.2c-.1-.42-.12-.87-.08-1.31L1.45 7.95a3.25 3.25 0 1 0 4.6 4.6l2.5-2.5a3.25 3.25 0 0 0 0-4.6.5.5 0 0 0-.7.7c.87.89.87 2.31 0 3.2l-2.5 2.5a2.25 2.25 0 1 1-3.2-3.2l1.46-1.44Z',
      })
    ),
    unlink: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'm1.45 7.95 1.3-1.3.71.7-1.3 1.3a2.25 2.25 0 1 0 3.18 3.2l1.3-1.31.71.7-1.3 1.3a3.25 3.25 0 0 1-4.6-4.59ZM12.55 6.05l-1.3 1.3-.71-.7 1.3-1.3a2.25 2.25 0 1 0-3.18-3.2l-1.3 1.31-.71-.7 1.3-1.3a3.25 3.25 0 0 1 4.6 4.59ZM1.85 1.15a.5.5 0 1 0-.7.7l11 11a.5.5 0 0 0 .7-.7l-11-11Z',
      })
    ),
    bell: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M8 1.11a1 1 0 1 0-1.99 0A4.5 4.5 0 0 0 2.5 5.5v3.88l-.94 1.89a.5.5 0 0 0-.06.3.5.5 0 0 0 .51.43h3.58a1.5 1.5 0 1 0 2.82 0H12a.5.5 0 0 0 .45-.73l-.94-1.89V5.5A4.5 4.5 0 0 0 8 1.11ZM2.8 11h8.4l-.5-1H3.3l-.5 1Zm7.7-2V5.5a3.5 3.5 0 1 0-7 0V9h7Zm-4 3.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Z',
      })
    ),
    rss: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M1.5.5c0-.28.22-.5.5-.5a12 12 0 0 1 12 12 .5.5 0 0 1-1 0A11 11 0 0 0 2 1a.5.5 0 0 1-.5-.5Z',
      }),
      a.createElement('path', {
        d: 'M1.5 4.5c0-.28.22-.5.5-.5a8 8 0 0 1 8 8 .5.5 0 0 1-1 0 7 7 0 0 0-7-7 .5.5 0 0 1-.5-.5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M5 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-1 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z',
      })
    ),
    sharealt: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M2 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7.5a.5.5 0 0 0-1 0V12H2V2h4.5a.5.5 0 0 0 0-1H2Z',
      }),
      a.createElement('path', {
        d: 'M7.35 7.36 12 2.7v1.8a.5.5 0 0 0 1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 1 0 0 1h1.8L6.64 6.64a.5.5 0 1 0 .7.7Z',
      })
    ),
    share: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M6.65.15c.2-.2.5-.2.7 0l2 2a.5.5 0 1 1-.7.7L7.5 1.72v6.8a.5.5 0 0 1-1 0V1.7L5.35 2.86a.5.5 0 1 1-.7-.71l2-2Z',
      }),
      a.createElement('path', {
        d: 'M2 4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H9.5a.5.5 0 1 0 0 1H12v7H2V5h2.5a.5.5 0 0 0 0-1H2Z',
      })
    ),
    circlehollow: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M7 13A6 6 0 1 0 7 1a6 6 0 0 0 0 12Zm0 1A7 7 0 1 0 7 0a7 7 0 0 0 0 14Z',
      })
    ),
    circle: a.createElement('path', {
      d: 'M14 7A7 7 0 1 1 0 7a7 7 0 0 1 14 0Z',
    }),
    bookmarkhollow: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M3.5 0h7c.28 0 .5.22.5.5v13a.5.5 0 0 1-.45.5.46.46 0 0 1-.38-.12L7 11.16l-3.17 2.72a.46.46 0 0 1-.38.12.5.5 0 0 1-.45-.5V.5c0-.28.22-.5.5-.5ZM4 12.41l2.66-2.28a.45.45 0 0 1 .38-.13c.1.01.2.05.29.12l2.67 2.3V1H4v11.41Z',
      })
    ),
    bookmark: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M3.5 0h7c.28 0 .5.22.5.5v13a.5.5 0 0 1-.45.5.46.46 0 0 1-.38-.12L7 11.16l-3.17 2.72a.46.46 0 0 1-.38.12.5.5 0 0 1-.45-.5V.5c0-.28.22-.5.5-.5Z',
      })
    ),
    hearthollow: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M12.81 1.85 13 2a2.97 2.97 0 0 1 .75 1.17 4.39 4.39 0 0 1 .12 2.51 6.26 6.26 0 0 1-1.65 2.55l-4.78 4.6A.59.59 0 0 1 7 13a.67.67 0 0 1-.44-.17L1.78 8.22a7.84 7.84 0 0 1-1.25-1.6C.37 6.31.24 6 .14 5.67a4.32 4.32 0 0 1 .12-2.51 3.2 3.2 0 0 1 1.95-1.9c.47-.18 1-.27 1.57-.27.3 0 .61.04.91.14.3.09.59.21.86.36s.52.33.77.52c.24.19.47.38.68.58a7.56 7.56 0 0 1 1.46-1.1c.27-.15.55-.27.84-.36.3-.1.6-.14.9-.14.59 0 1.12.09 1.59.26.39.15.73.34 1.02.59ZM1.2 3.53A2.2 2.2 0 0 1 2.57 2.2M1.2 3.53c-.13.33-.2.72-.2 1.18 0 .22.03.45.1.68a3.97 3.97 0 0 0 .79 1.46c.19.23.38.45.59.65l4.51 4.36 4.52-4.35c.2-.2.4-.4.59-.65.18-.23.34-.47.49-.73.13-.23.23-.48.3-.73.08-.23.11-.46.11-.7 0-.45-.07-.84-.2-1.18-.12-.33-.3-.6-.51-.8v-.01c-.22-.2-.5-.38-.85-.51-.34-.13-.75-.2-1.24-.2-.2 0-.4.03-.6.09a4.95 4.95 0 0 0-1.9 1.22l-.68.67-.7-.65a9.97 9.97 0 0 0-.62-.53c-.2-.16-.42-.3-.63-.42h-.01c-.21-.12-.43-.22-.66-.29C4.2 2.03 4 2 3.77 2c-.48 0-.88.07-1.21.2',
      })
    ),
    heart: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M12.81 1.85 13 2a2.97 2.97 0 0 1 .75 1.17 4.39 4.39 0 0 1 .12 2.51 6.26 6.26 0 0 1-1.65 2.55l-4.78 4.6A.59.59 0 0 1 7 13a.67.67 0 0 1-.44-.17L1.78 8.22a7.84 7.84 0 0 1-1.25-1.6C.37 6.31.24 6 .14 5.67a4.32 4.32 0 0 1 .12-2.51 3.2 3.2 0 0 1 1.95-1.9c.47-.18 1-.27 1.57-.27.3 0 .61.04.91.14.3.09.59.21.86.36s.52.33.77.52c.24.19.47.38.68.58a7.56 7.56 0 0 1 1.46-1.1c.27-.15.55-.27.84-.36.3-.1.6-.14.9-.14.59 0 1.12.09 1.59.26.39.15.73.34 1.02.59Z',
      })
    ),
    starhollow: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M6.32.78a.75.75 0 0 1 1.36 0l1.63 3.54 3.87.46c.63.07.89.86.42 1.3l-2.86 2.64.76 3.81a.75.75 0 0 1-1.1.8L7 11.43l-3.4 1.9a.75.75 0 0 1-1.1-.8l.76-3.81L.4 6.07a.75.75 0 0 1 .42-1.3l3.87-.45L6.32.78ZM7 1.7 5.54 4.86c-.11.24-.34.4-.6.43l-3.46.42 2.56 2.37c.2.17.28.44.23.7l-.68 3.42 3.04-1.7c.23-.14.5-.14.74 0l3.04 1.7-.68-3.43a.75.75 0 0 1 .23-.7l2.56-2.36-3.47-.42a.75.75 0 0 1-.59-.43L7 1.7Z',
      })
    ),
    star: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M7.68.78a.75.75 0 0 0-1.36 0L4.69 4.32l-3.87.46a.75.75 0 0 0-.42 1.3l2.86 2.64-.76 3.81a.75.75 0 0 0 1.1.8l3.4-1.9 3.4 1.9a.75.75 0 0 0 1.1-.8l-.76-3.81 2.86-2.65a.75.75 0 0 0-.42-1.3L9.3 4.33 7.68.78Z',
      })
    ),
    certificate: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M10 7.85A4.49 4.49 0 0 0 7 0a4.5 4.5 0 0 0-3 7.85V13a.5.5 0 0 0 .5.5.5.5 0 0 0 .35-.15L7 11.21l2.15 2.14A.5.5 0 0 0 10 13V7.85ZM7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-.35 2.15c.2-.2.5-.2.7 0L9 11.79V8.53a4.48 4.48 0 0 1-4 0v3.26l1.65-1.64Z',
      })
    ),
    verified: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M6.56 13.12a1 1 0 0 1 .88 0l.98.49a1 1 0 0 0 1.31-.43l.52-.97a1 1 0 0 1 .7-.51l1.08-.2a1 1 0 0 0 .81-1.1l-.15-1.1a1 1 0 0 1 .27-.82l.76-.8a1 1 0 0 0 0-1.37l-.76-.79a1 1 0 0 1-.27-.83l.15-1.08a1 1 0 0 0-.8-1.12l-1.09-.19a1 1 0 0 1-.7-.5L9.73.81A1 1 0 0 0 8.43.4l-1 .49a1 1 0 0 1-.87 0L5.58.39a1 1 0 0 0-1.31.43l-.52.97a1 1 0 0 1-.7.51l-1.08.2a1 1 0 0 0-.81 1.1l.15 1.1a1 1 0 0 1-.27.82l-.76.8a1 1 0 0 0 0 1.37l.76.79a1 1 0 0 1 .27.83l-.15 1.08a1 1 0 0 0 .8 1.12l1.09.19a1 1 0 0 1 .7.5l.52.98a1 1 0 0 0 1.3.43l1-.49Zm4.3-8.47c.19.2.19.5 0 .7l-4.5 4.5a.5.5 0 0 1-.71 0l-2.5-2.5a.5.5 0 1 1 .7-.7L6 8.79l4.15-4.14c.2-.2.5-.2.7 0Z',
      })
    ),
    thumbsup: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M11 12.02c-.4.37-.91.56-1.56.56h-.88a5.5 5.5 0 0 1-1.3-.16c-.42-.1-.91-.25-1.47-.45-.3-.12-.63-.21-.95-.27H2.88a.84.84 0 0 1-.62-.26.84.84 0 0 1-.26-.61V6.45c0-.24.09-.45.26-.62a.84.84 0 0 1 .62-.25h1.87c.16-.11.47-.47.93-1.06.27-.35.51-.64.74-.88.1-.11.19-.3.24-.58.05-.28.12-.57.2-.87.1-.3.24-.55.43-.74a.87.87 0 0 1 .62-.25c.38 0 .72.07 1.03.22.3.15.54.38.7.7a2.94 2.94 0 0 1 .21 1.58 3 3 0 0 1-.3 1h1.2c.47 0 .88.17 1.23.52s.52.8.52 1.22c0 .29-.04.66-.34 1.12.05.15.07.3.07.47 0 .35-.09.68-.26.98.07.54-.07 1.08-.4 1.51a1.9 1.9 0 0 1-.57 1.5Zm.47-5.33a.96.96 0 0 0 .03-.25.74.74 0 0 0-.23-.51.68.68 0 0 0-.52-.23H7.93l.73-1.45a2 2 0 0 0 .21-.87c0-.44-.07-.7-.13-.82a.53.53 0 0 0-.24-.24 1.3 1.3 0 0 0-.54-.12.99.99 0 0 0-.14.28c-.08.27-.13.52-.18.76-.06.38-.2.77-.48 1.07v.01l-.02.01c-.2.2-.4.46-.67.8l-.61.76c-.15.17-.35.38-.54.51l-.26.18H5v4.13h.02c.38.08.76.18 1.12.32.53.2.98.33 1.35.42.36.09.71.13 1.07.13h.88c.43 0 .68-.11.87-.29a.9.9 0 0 0 .26-.7l-.02-.37.22-.3c.17-.23.25-.5.2-.78l-.04-.33.17-.3a.97.97 0 0 0 .13-.48c0-.09 0-.13-.02-.15l-.15-.46.26-.4c.1-.15.13-.25.15-.33ZM3.5 10.8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z',
      })
    ),
    shield: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M11.76 2.08a.5.5 0 0 1 .24.42v6a.5.5 0 0 1-.17.38l-4.5 3.99a.5.5 0 0 1-.67 0l-4.49-4A.5.5 0 0 1 2 8.5V2.5c0-.18.1-.34.24-.42l.01-.02a2.5 2.5 0 0 1 .3-.16c.22-.1.52-.24.92-.37C4.27 1.26 5.44 1 7 1c1.56 0 2.73.26 3.53.53a6.97 6.97 0 0 1 1.22.53l.01.02ZM3 2.79v5.49l1.07.94 6.59-6.58-.44-.17C9.52 2.24 8.44 2 7 2c-1.44 0-2.52.24-3.22.47-.35.12-.6.24-.78.32Zm4 9.04L4.82 9.9 11 3.71v4.57l-4 3.55Z',
      })
    ),
    basket: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M10.35 2.85a.5.5 0 1 0-.7-.7l-3 3a.5.5 0 1 0 .7.7l3-3Z',
      }),
      a.createElement('path', {
        d: 'M2.09 6H4.5a.5.5 0 0 0 0-1H1.8a.75.75 0 0 0-.74.87l.8 4.88A1.5 1.5 0 0 0 3.36 12h7.3a1.5 1.5 0 0 0 1.48-1.25l.81-4.88A.75.75 0 0 0 12.2 5H10a.5.5 0 0 0 0 1h1.91l-.76 4.58a.5.5 0 0 1-.5.42h-7.3a.5.5 0 0 1-.5-.42L2.1 6Z',
      }),
      a.createElement('path', {
        d: 'M4.5 7c.28 0 .5.22.5.5v2a.5.5 0 0 1-1 0v-2c0-.28.22-.5.5-.5ZM10 7.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2ZM6.5 9.5v-2a.5.5 0 0 1 1 0v2a.5.5 0 0 1-1 0Z',
      })
    ),
    beaker: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M4.5 2h.75v3.87l-3.03 5.26c-.48.83.12 1.87 1.08 1.87h7.4c.96 0 1.57-1.04 1.08-1.87L8.75 5.87V2h.75a.5.5 0 0 0 0-1h-5a.5.5 0 0 0 0 1Zm1.75 4V2h1.5v4.13l.07.12 1 1.75H5.18l1.01-1.75.07-.12V6ZM4.6 9l-1.52 2.63c-.1.16.03.37.22.37h7.4c.2 0 .31-.2.22-.37L9.4 9H4.6Z',
      })
    ),
    hourglass: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M7.5 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M3.5 1a.5.5 0 0 0-.5.5c0 1.06.14 1.9.68 2.97.34.7.86 1.5 1.6 2.53a16.53 16.53 0 0 0-1.8 2.96A6 6 0 0 0 3 12.49v.01a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5 6 6 0 0 0-.48-2.54c-.34-.8-.9-1.71-1.8-2.96a19.78 19.78 0 0 0 1.6-2.53c.54-1.08.68-1.9.68-2.97a.5.5 0 0 0-.5-.5h-7Zm6.49 11a4.68 4.68 0 0 0-.39-1.65c-.27-.65-.73-1.4-1.5-2.5a133 133 0 0 1-.75 1 .5.5 0 0 1-.56.1.5.5 0 0 1-.2-.16l-.7-.94a14.36 14.36 0 0 0-1.5 2.5A4.68 4.68 0 0 0 4.02 12H10ZM6.3 6.72l.7.94a90.06 90.06 0 0 0 .7-.96c.49-.67.87-1.22 1.17-1.7H5.13A32.67 32.67 0 0 0 6.3 6.72ZM4.56 4h4.88c.36-.73.5-1.31.55-2H4c.04.69.19 1.27.55 2Z',
      })
    ),
    flag: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M11.5 1h-9a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 1 0V8h8.5a.5.5 0 0 0 .35-.85L9.21 4.5l2.64-2.65A.5.5 0 0 0 11.5 1ZM8.15 4.15 10.29 2H3v5h7.3L8.14 4.85a.5.5 0 0 1 0-.7Z',
      })
    ),
    cloudhollow: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M10 7V6a3 3 0 0 0-5.9-.74l-.18.68-.7.07A2.5 2.5 0 0 0 3.5 11h3.19l.07-.01h.08L7 11h4a2 2 0 1 0 0-4h-1ZM3.12 5.02A3.5 3.5 0 0 0 3.5 12H11a3 3 0 1 0 0-6 4 4 0 0 0-7.88-.98Z',
      })
    ),
    cloud: a.createElement('path', {
      d: 'M7 2a4 4 0 0 1 4 4 3 3 0 1 1 0 6H3.5a3.5 3.5 0 0 1-.38-6.98A4 4 0 0 1 7 2Z',
    }),
    edit: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'm13.85 2.15-2-2a.5.5 0 0 0-.7 0l-1.5 1.5-9 9a.5.5 0 0 0-.14.26L0 13.39a.5.5 0 0 0 .14.46.5.5 0 0 0 .46.14l2.48-.5a.5.5 0 0 0 .27-.14l9-9 1.5-1.5a.5.5 0 0 0 0-.7ZM12 3.29l.8-.79-1.3-1.3-.8.8L12 3.3Zm-2-.58L1.7 11 3 12.3 11.3 4 10 2.7ZM1.14 12.86l.17-.85.68.68-.85.17Z',
      })
    ),
    cog: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M5.59 5.59a2 2 0 0 1 3.27 2.14.5.5 0 1 0 .93.37 3 3 0 1 0-1.7 1.7.5.5 0 1 0-.36-.94A2 2 0 0 1 5.6 5.6Z',
        fill: '#333',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M.94 6.53c.13.12.19.3.18.46 0 .17-.05.34-.18.47L0 8.39c.19.94.55 1.81 1.07 2.58h1.32c.18 0 .34.07.46.2.12.11.2.27.2.45v1.32c.76.51 1.62.88 2.55 1.06l.94-.94a.63.63 0 0 1 .45-.19h.03c.16 0 .33.07.45.19l.94.94a7.1 7.1 0 0 0 2.55-1.06v-1.33c0-.18.07-.35.2-.46.11-.12.27-.2.45-.2h1.33A7.1 7.1 0 0 0 14 8.4l-.95-.94a.64.64 0 0 1-.18-.47c0-.17.06-.34.18-.46l.95-.95a7.1 7.1 0 0 0-1.05-2.52h-1.34a.63.63 0 0 1-.46-.2.64.64 0 0 1-.2-.46V1.06A7.1 7.1 0 0 0 8.42 0l-.94.94a.63.63 0 0 1-.45.19H7a.63.63 0 0 1-.45-.19L5.6 0a7.1 7.1 0 0 0-2.56 1.06v1.33c0 .18-.07.34-.2.46a.63.63 0 0 1-.45.2H1.06A7.1 7.1 0 0 0 0 5.59l.94.94Zm.7 1.63c.33-.32.49-.75.48-1.17 0-.42-.15-.85-.47-1.17l-.54-.54c.12-.43.3-.85.51-1.23h.77c.46 0 .87-.2 1.17-.5.3-.29.48-.7.48-1.16v-.77c.4-.22.81-.39 1.25-.52l.54.55c.33.32.75.48 1.16.48h.03c.42 0 .84-.16 1.16-.48l.54-.54c.44.12.85.3 1.24.5v.8c0 .45.19.87.49 1.16.3.3.7.5 1.16.5h.78c.2.37.38.78.5 1.2l-.54.55c-.33.32-.49.75-.48 1.17 0 .42.15.85.48 1.17l.55.55c-.13.44-.3.85-.52 1.24h-.77c-.45 0-.87.2-1.16.5-.3.29-.5.7-.5 1.16v.77c-.38.21-.8.39-1.23.51l-.54-.54a1.64 1.64 0 0 0-1.16-.48H7c-.41 0-.83.16-1.16.48l-.54.55a6.1 6.1 0 0 1-1.25-.52v-.76c0-.45-.19-.87-.48-1.16-.3-.3-.71-.5-1.17-.5h-.76a6.1 6.1 0 0 1-.53-1.25l.55-.55Z',
      })
    ),
    nut: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M5.59 8.41a2 2 0 1 1 3.27-.68.5.5 0 1 0 .93.37 3 3 0 1 0-1.7 1.7.5.5 0 0 0-.36-.94 2 2 0 0 1-2.14-.45Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M6.5.29a1 1 0 0 1 1 0l5.06 2.92c.31.18.5.51.5.87v5.84a1 1 0 0 1-.5.87L7.5 13.7a1 1 0 0 1-1 0L1.44 10.8a1 1 0 0 1-.5-.87V4.08a1 1 0 0 1 .5-.87L6.5.3Zm.5.86 5.06 2.93v5.84L7 12.85 1.94 9.92V4.08L7 1.15Z',
      })
    ),
    wrench: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M10.5 1c.44 0 .56.52.25.83l-.8.81c-.2.2-.2.52 0 .72l.69.7c.2.2.52.2.72 0l.8-.81c.32-.31.84-.2.84.25a2.5 2.5 0 0 1-3.41 2.33L2.7 12.7a1 1 0 0 1-1.42-1.42l6.88-6.88A2.5 2.5 0 0 1 10.5 1ZM2 12.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z',
      })
    ),
    ellipsis: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M4 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM13 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM7 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
      })
    ),
    check: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M13.85 3.35a.5.5 0 0 0-.7-.7L5 10.79.85 6.65a.5.5 0 1 0-.7.7l4.5 4.5c.2.2.5.2.7 0l8.5-8.5Z',
      })
    ),
    form: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M2 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6.4a.5.5 0 0 0-1 0V12H2V2h7.5a.5.5 0 0 0 0-1H2Z',
      }),
      a.createElement('path', {
        d: 'm6.35 9.86 7.5-7.5a.5.5 0 0 0-.7-.71L6 8.8 3.85 6.65a.5.5 0 1 0-.7.7l2.5 2.5c.2.2.5.2.7 0Z',
      })
    ),
    batchdeny: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M11.5 2a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2Zm-2.646.646a.5.5 0 0 1 0 .708L5.207 7l3.647 3.646a.5.5 0 0 1-.708.708L4.5 7.707.854 11.354a.5.5 0 0 1-.708-.708L3.793 7 .146 3.354a.5.5 0 1 1 .708-.708L4.5 6.293l3.646-3.647a.5.5 0 0 1 .708 0ZM11 7a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 11 7Zm.5 4a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2Z',
      })
    ),
    batchaccept: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M11.5 2a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2Zm-2.2.6a.5.5 0 0 1 .1.7l-5.995 7.993a.505.505 0 0 1-.37.206.5.5 0 0 1-.395-.152L.146 8.854a.5.5 0 1 1 .708-.708l2.092 2.093L8.6 2.7a.5.5 0 0 1 .7-.1ZM11 7a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 11 7Zm.5 4a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2Z',
      })
    ),
    controls: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M10.5 1c.28 0 .5.22.5.5V2h1.5a.5.5 0 0 1 0 1H11v.5a.5.5 0 0 1-1 0V3H1.5a.5.5 0 0 1 0-1H10v-.5c0-.28.22-.5.5-.5ZM1.5 11a.5.5 0 0 0 0 1H10v.5a.5.5 0 0 0 1 0V12h1.5a.5.5 0 0 0 0-1H11v-.5a.5.5 0 0 0-1 0v.5H1.5ZM1 7c0-.28.22-.5.5-.5H3V6a.5.5 0 0 1 1 0v.5h8.5a.5.5 0 0 1 0 1H4V8a.5.5 0 0 1-1 0v-.5H1.5A.5.5 0 0 1 1 7Z',
      })
    ),
    plus: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M7.5.5a.5.5 0 0 0-1 0v6h-6a.5.5 0 0 0 0 1h6v6a.5.5 0 0 0 1 0v-6h6a.5.5 0 0 0 0-1h-6v-6Z',
      })
    ),
    closeAlt: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M2.03.97A.75.75 0 0 0 .97 2.03L5.94 7 .97 11.97a.75.75 0 1 0 1.06 1.06L7 8.06l4.97 4.97a.75.75 0 1 0 1.06-1.06L8.06 7l4.97-4.97A.75.75 0 0 0 11.97.97L7 5.94 2.03.97Z',
      })
    ),
    cross: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M1.85 1.15a.5.5 0 1 0-.7.7L6.29 7l-5.14 5.15a.5.5 0 0 0 .7.7L7 7.71l5.15 5.14a.5.5 0 0 0 .7-.7L7.71 7l5.14-5.15a.5.5 0 0 0-.7-.7L7 6.29 1.85 1.15Z',
      })
    ),
    trash: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M5.5 4.5c.28 0 .5.22.5.5v5a.5.5 0 0 1-1 0V5c0-.28.22-.5.5-.5ZM9 5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0V5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M4.5.5c0-.28.22-.5.5-.5h4c.28 0 .5.22.5.5V2h3a.5.5 0 0 1 0 1H12v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3h-.5a.5.5 0 0 1 0-1h3V.5ZM3 3v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3H3Zm2.5-2h3v1h-3V1Z',
      })
    ),
    pinalt: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M13.44 4.44 9.56.56a1.5 1.5 0 0 0-2.12 0L7 1a1.41 1.41 0 0 0 0 2L5 5H3.66A4 4 0 0 0 .83 6.17l-.48.48a.5.5 0 0 0 0 .7l2.8 2.8-3 3a.5.5 0 0 0 .7.7l3-3 2.8 2.8c.2.2.5.2.7 0l.48-.48A4 4 0 0 0 9 10.34V9l2-2c.55.55 1.45.55 2 0l.44-.44a1.5 1.5 0 0 0 0-2.12ZM11 5.59l-3 3v1.75a3 3 0 0 1-.88 2.12L7 12.6 1.41 7l.13-.12A3 3 0 0 1 3.66 6H5.4l3-3-.7-.7a.41.41 0 0 1 0-.6l.44-.43c.2-.2.5-.2.7 0l3.88 3.88c.2.2.2.5 0 .7l-.44.44a.41.41 0 0 1-.58 0L11 5.6Z',
      })
    ),
    unpin: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M13.44 4.44 9.56.56a1.5 1.5 0 0 0-2.12 0L7 1a1.41 1.41 0 0 0 0 2L5.7 4.3l.71.7 2-2-.7-.7a.41.41 0 0 1 0-.6l.44-.43c.2-.2.5-.2.7 0l3.88 3.88c.2.2.2.5 0 .7l-.44.44a.41.41 0 0 1-.58 0L11 5.6l-2 2 .7.7L11 7c.55.55 1.45.55 2 0l.44-.44a1.5 1.5 0 0 0 0-2.12ZM.83 6.17A4 4 0 0 1 3.59 5l1 1h-.93a3 3 0 0 0-2.12.88L1.4 7 7 12.59l.12-.13A3 3 0 0 0 8 10.34v-.93l1 1a4 4 0 0 1-1.17 2.76l-.48.48a.5.5 0 0 1-.7 0l-2.8-2.8-3 3a.5.5 0 0 1-.7-.7l3-3-2.8-2.8a.5.5 0 0 1 0-.7l.48-.48Zm1.02-5.02a.5.5 0 1 0-.7.7l11 11a.5.5 0 0 0 .7-.7l-11-11Z',
      })
    ),
    add: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M7 3c.28 0 .5.22.5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3c0-.28.22-.5.5-.5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M7 14A7 7 0 1 0 7 0a7 7 0 0 0 0 14Zm0-1A6 6 0 1 0 7 1a6 6 0 0 0 0 12Z',
      })
    ),
    subtract: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M3.5 6.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M14 7A7 7 0 1 1 0 7a7 7 0 0 1 14 0Zm-1 0A6 6 0 1 1 1 7a6 6 0 0 1 12 0Z',
      })
    ),
    close: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M9.85 4.15c.2.2.2.5 0 .7L7.71 7l2.14 2.15a.5.5 0 0 1-.7.7L7 7.71 4.85 9.85a.5.5 0 0 1-.7-.7L6.29 7 4.15 4.85a.5.5 0 1 1 .7-.7L7 6.29l2.15-2.14c.2-.2.5-.2.7 0Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M7 14A7 7 0 1 0 7 0a7 7 0 0 0 0 14Zm0-1A6 6 0 1 0 7 1a6 6 0 0 0 0 12Z',
      })
    ),
    delete: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M14 7A7 7 0 1 1 0 7a7 7 0 0 1 14 0Zm-1 0a6 6 0 0 1-9.87 4.58l8.45-8.45A5.98 5.98 0 0 1 13 7ZM2.42 10.87l8.45-8.45a6 6 0 0 0-8.46 8.46Z',
      })
    ),
    passed: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M7 14A7 7 0 1 0 7 0a7 7 0 0 0 0 14Zm3.85-9.35c.2.2.2.5 0 .7l-4.5 4.5a.5.5 0 0 1-.7 0l-2.5-2.5a.5.5 0 1 1 .7-.7L6 8.79l4.15-4.14c.2-.2.5-.2.7 0Z',
      })
    ),
    changed: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M7 14A7 7 0 1 0 7 0a7 7 0 0 0 0 14ZM3.5 6.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7Z',
      })
    ),
    failed: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M7 14A7 7 0 1 0 7 0a7 7 0 0 0 0 14Zm2.85-9.85c.2.2.2.5 0 .7L7.71 7l2.14 2.15a.5.5 0 0 1-.7.7L7 7.71 4.85 9.85a.5.5 0 0 1-.7-.7L6.29 7 4.15 4.85a.5.5 0 1 1 .7-.7L7 6.29l2.15-2.14c.2-.2.5-.2.7 0Z',
      })
    ),
    clear: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M5 2h7a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-1.41-.59l-3-3a2 2 0 0 1 0-2.82l3-3A2 2 0 0 1 5 2Zm1.15 3.15c.2-.2.5-.2.7 0L8 6.29l1.15-1.14a.5.5 0 1 1 .7.7L8.71 7l1.14 1.15a.5.5 0 0 1-.7.7L8 7.71 6.85 8.85a.5.5 0 1 1-.7-.7L7.29 7 6.15 5.85a.5.5 0 0 1 0-.7Z',
      })
    ),
    comment: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M3.5 5a.5.5 0 1 0 0 1h7a.5.5 0 0 0 0-1h-7ZM3 8.5c0-.27.22-.5.5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M12.5 12H5.7l-1.85 1.86a.5.5 0 0 1-.35.14.5.5 0 0 1-.5-.5V12H1.5a.5.5 0 0 1-.5-.5v-9c0-.27.22-.5.5-.5h11c.28 0 .5.23.5.5v9a.5.5 0 0 1-.5.5ZM2 11V3h10v8H2Z',
      })
    ),
    commentadd: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M7.5 5a.5.5 0 1 0-1 0v1.5H5a.5.5 0 1 0 0 1h1.5V9a.5.5 0 0 0 1 0V7.5H9a.5.5 0 0 0 0-1H7.5V5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M3.7 13.97a.5.5 0 0 1-.7-.46V12H1.5a.5.5 0 0 1-.5-.5v-9c0-.28.22-.5.5-.5h11c.28 0 .5.22.5.5v9a.5.5 0 0 1-.5.5H5.7l-1.85 1.85a.5.5 0 0 1-.16.1ZM2 3v8h10V3H2Z',
      })
    ),
    requestchange: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M9.85 6.65c.2.2.2.51 0 .7l-2 2a.5.5 0 1 1-.7-.7L8.3 7.5H4.5a.5.5 0 0 1 0-1h3.79L7.15 5.36a.5.5 0 1 1 .7-.71l2 2Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M3.7 13.97a.5.5 0 0 1-.7-.46V12H1.5a.5.5 0 0 1-.5-.5v-9c0-.28.22-.5.5-.5h11c.28 0 .5.22.5.5v9a.5.5 0 0 1-.5.5H5.7l-1.85 1.85a.5.5 0 0 1-.16.1ZM2 3v8h10V3H2Z',
      })
    ),
    comments: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M8.5 7a.5.5 0 0 0 0-1h-5a.5.5 0 1 0 0 1h5ZM9 8.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h5c.28 0 .5.23.5.5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M12 11.5V10h1.5a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5V3H.5a.5.5 0 0 0-.5.5v8c0 .28.22.5.5.5H2v1.5a.5.5 0 0 0 .5.5.5.5 0 0 0 .35-.14L4.71 12h6.79a.5.5 0 0 0 .5-.5ZM3 3V2h10v7h-1V3.5a.5.5 0 0 0-.5-.5H3Zm-2 8V4h10v7H1Z',
      })
    ),
    lock: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M8 8a1 1 0 0 1-.5.87v1.63a.5.5 0 0 1-1 0V8.87A1 1 0 1 1 8 8Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M3 4a4 4 0 1 1 8 0v1h1.5c.28 0 .5.23.5.5v8a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-8c0-.27.22-.5.5-.5H3V4Zm7 1V4a3 3 0 1 0-6 0v1h6Zm2 1H2v7h10V6Z',
      })
    ),
    unlock: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M6.5 8.87a1 1 0 1 1 1 0v1.63a.5.5 0 0 1-1 0V8.87Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        d: 'M7 1a3 3 0 0 0-3 3v1h8.5c.28 0 .5.23.5.5v8a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-8c0-.27.22-.5.5-.5H3V4a4 4 0 0 1 7.76-1.38.5.5 0 0 1-.94.34A3 3 0 0 0 7 1ZM2 6h10v7H2V6Z',
      })
    ),
    key: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', { d: 'M11 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z' }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M7.5 8.53v.97a.5.5 0 0 1-.5.5H5.5v1.5a.5.5 0 0 1-.5.5H3.5v1.5a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .15-.36l5.12-5.11a4.5 4.5 0 1 1 2.23 2.5ZM6 4.5a3.5 3.5 0 1 1 1.5 2.87c-.29-.2-1-.37-1 .48V9H5a.5.5 0 0 0-.5.5V11H3a.5.5 0 0 0-.5.5V13H1v-1.3l5.2-5.19c.15-.16.18-.4.1-.6A3.47 3.47 0 0 1 6 4.5Z',
      })
    ),
    outbox: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M7.35.15a.5.5 0 0 0-.7 0l-2 2a.5.5 0 1 0 .7.7L6.5 1.72v6.8a.5.5 0 0 0 1 0V1.7l1.15 1.15a.5.5 0 1 0 .7-.71l-2-2Z',
      }),
      a.createElement('path', {
        d: 'M2 7.5a.5.5 0 1 0-1 0v5c0 .28.22.5.5.5h11a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-1 0V12H2V7.5Z',
      })
    ),
    credit: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M2.5 8a.5.5 0 1 0 0 1h3a.5.5 0 0 0 0-1h-3Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M0 11.5c0 .28.22.5.5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H.5a.5.5 0 0 0-.5.5v9ZM1 3v1h12V3H1Zm0 8h12V6H1v5Z',
      })
    ),
    button: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M1 3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h3.5a.5.5 0 1 0 0-1H1V4h12v5h-1a.5.5 0 0 0 0 1h1a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H1Z',
      }),
      a.createElement('path', {
        d: 'M6.45 7a.5.5 0 0 1 .3.08l3.48 2.02a.5.5 0 0 1 0 .87l-1.08.62.75 1.3a.75.75 0 0 1-1.3.75l-.75-1.3-1.07.62a.5.5 0 0 1-.67-.13.5.5 0 0 1-.1-.3L6 7.5a.5.5 0 0 1 .45-.5Z',
      })
    ),
    type: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M4 1.5c0-.27.22-.5.5-.5h5a.5.5 0 1 1 0 1h-2v10h2a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h2V2h-2a.5.5 0 0 1-.5-.5Z',
      }),
      a.createElement('path', {
        d: 'M0 4.5c0-.27.22-.5.5-.5h4a.5.5 0 1 1 0 1H1v4h3.5a.5.5 0 1 1 0 1h-4a.5.5 0 0 1-.5-.5v-5ZM9.5 4a.5.5 0 1 0 0 1H13v4H9.5a.5.5 0 1 0 0 1h4a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5h-4Z',
      })
    ),
    pointerdefault: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M5.94 12.46c.11 0 .2-.06.25-.15l1.58-3.16 2.54 2.54c.04.05.1.07.19.07a.3.3 0 0 0 .2-.07l.8-.8a.27.27 0 0 0 0-.38L8.9 7.9l3.4-1.7c.06-.03.1-.07.12-.11a.22.22 0 0 0 .04-.14.33.33 0 0 0-.06-.16.17.17 0 0 0-.09-.07h-.02L1.91 1.55a.27.27 0 0 0-.35.36l4.15 10.37c.04.09.12.16.23.17Zm-.03 1h-.02a1.28 1.28 0 0 1-1.1-.8L.62 2.29A1.27 1.27 0 0 1 2.3.63l10.35 4.15c.52.18.79.65.81 1.11.04.53-.27.98-.7 1.2l-2.17 1.08L12.2 9.8c.5.5.5 1.3 0 1.8l-.8.8v.01c-.5.46-1.3.48-1.8-.01l-1.56-1.56-.95 1.92c-.23.45-.68.7-1.15.7h-.03Z',
      })
    ),
    pointerhand: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M11.87 6v-.02c-.03-.27-.23-.48-.47-.5a.5.5 0 0 0-.53.5v1.41c0 .25-.22.47-.47.47a.48.48 0 0 1-.47-.47V5.17a.6.6 0 0 0 0-.05c-.02-.27-.23-.5-.47-.5a.5.5 0 0 0-.52.5v1.65l-.01.1a.49.49 0 0 1-.46.37.48.48 0 0 1-.47-.47V4.62a.6.6 0 0 0 0-.05c-.03-.27-.23-.48-.47-.5a.5.5 0 0 0-.53.5v2.2c0 .25-.22.47-.47.47a.49.49 0 0 1-.47-.47V1.75c-.02-.27-.22-.5-.47-.5a.5.5 0 0 0-.52.5v6.78c0 .25-.22.47-.47.47a.48.48 0 0 1-.47-.47v-.26a.78.78 0 0 0-.06-.31.65.65 0 0 0-.16-.22l-.2-.19A6.37 6.37 0 0 0 3.06 7h-.02c-.43-.34-.62-.25-.69-.2-.26.14-.29.5-.13.74l1.73 2.6v.01h-.01l-.04.02.05-.02s1.21 2.6 3.57 2.6c3.54 0 4.2-1.9 4.31-4.42.04-.6.04-1.19.03-1.78V6Zm.97 2.38c-.06 1.29-.26 2.67-1.08 3.72-.88 1.12-2.29 1.65-4.23 1.65a4.64 4.64 0 0 1-3.4-1.62 6.96 6.96 0 0 1-1.05-1.5v-.02L1.4 8.1A1.6 1.6 0 0 1 1.15 7c.05-.38.26-.8.69-1.04.2-.13.48-.23.85-.19.36.05.68.22.98.45.14.1.27.22.4.33v-4.8A1.5 1.5 0 0 1 5.63.25c.93.04 1.43.86 1.43 1.55v1.33c.17-.05.35-.07.53-.06h.02c.5.04.91.33 1.15.71a1.5 1.5 0 0 1 .74-.16c.66.03 1.12.46 1.32.97a1.5 1.5 0 0 1 .64-.1h.02c.85.06 1.39.8 1.39 1.55v.48c0 .6 0 1.24-.03 1.86Z',
      })
    ),
    browser: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M.5 13a.5.5 0 0 1-.5-.5v-11c0-.27.22-.5.5-.5h13c.28 0 .5.23.5.5v11a.5.5 0 0 1-.5.5H.5Zm.5-1V4h12v8H1Zm1-9.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm2 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm2 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z',
      })
    ),
    tablet: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M3.5 0C2.67 0 2 .68 2 1.5v11c0 .83.67 1.5 1.5 1.5h7c.83 0 1.5-.67 1.5-1.5v-11c0-.82-.67-1.5-1.5-1.5h-7Zm0 1h7c.28 0 .5.23.5.5V11H3V1.5c0-.27.22-.5.5-.5ZM6 12a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H6Z',
      })
    ),
    mobile: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M3 1.5C3 .68 3.67 0 4.5 0h5c.83 0 1.5.68 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-5A1.5 1.5 0 0 1 3 12.5v-11ZM4 12V2h6v10H4Z',
      })
    ),
    watch: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        key: 'watch',
        fillRule: 'evenodd',
        d: 'M4 .5c0-.27.22-.5.5-.5h5a.5.5 0 0 1 0 1h-5A.5.5 0 0 1 4 .5ZM9.5 3h-5a.5.5 0 0 0-.5.5v7c0 .28.22.5.5.5h5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5Zm-5-1C3.67 2 3 2.68 3 3.5v7c0 .83.67 1.5 1.5 1.5h5c.83 0 1.5-.67 1.5-1.5v-7c0-.82-.67-1.5-1.5-1.5h-5ZM7 4c.28 0 .5.23.5.5v2h1a.5.5 0 1 1 0 1H7a.5.5 0 0 1-.5-.5V4.5c0-.27.22-.5.5-.5Zm-2.5 9a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5Z',
      })
    ),
    sidebar: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M2.5 4.5c0-.27.22-.5.5-.5h1a.5.5 0 1 1 0 1H3a.5.5 0 0 1-.5-.5ZM3 6a.5.5 0 1 0 0 1h1a.5.5 0 0 0 0-1H3Zm-.5 2.5c0-.27.22-.5.5-.5h1a.5.5 0 1 1 0 1H3a.5.5 0 0 1-.5-.5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M1.5 13a.5.5 0 0 1-.5-.5v-11c0-.27.22-.5.5-.5h11c.28 0 .5.23.5.5v11a.5.5 0 0 1-.5.5h-11Zm.5-1V2h3v10H2ZM6 2h6v10H6V2Z',
      })
    ),
    sidebaralt: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M9.5 4.5c0-.27.22-.5.5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5ZM10 6a.5.5 0 1 0 0 1h1a.5.5 0 0 0 0-1h-1Zm-.5 2.5c0-.27.22-.5.5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M1.5 13a.5.5 0 0 1-.5-.5v-11c0-.27.22-.5.5-.5h11c.28 0 .5.23.5.5v11a.5.5 0 0 1-.5.5h-11Zm.5-1V2h6v10H2ZM9 2h3v10H9V2Z',
      })
    ),
    sidebaralttoggle: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M11.5 4.5A.5.5 0 0 0 11 4h-1a.5.5 0 1 0 0 1h1a.5.5 0 0 0 .5-.5ZM11 6a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1h1Zm.5 2.5A.5.5 0 0 0 11 8h-1a.5.5 0 1 0 0 1h1a.5.5 0 0 0 .5-.5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M1.5 13a.5.5 0 0 1-.5-.5v-11c0-.27.22-.5.5-.5h11c.28 0 .5.23.5.5v11a.5.5 0 0 1-.5.5h-11ZM9 12h3V2H9v10Zm-1 0H2V2h6v4.5H5.2l.66-.65a.5.5 0 1 0-.71-.7l-1.5 1.5a.5.5 0 0 0 0 .7l1.5 1.5a.5.5 0 1 0 .7-.7l-.64-.65H8V12Z',
      })
    ),
    sidebartoggle: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M2.5 4.5c0-.27.22-.5.5-.5h1a.5.5 0 1 1 0 1H3a.5.5 0 0 1-.5-.5ZM3 6a.5.5 0 1 0 0 1h1a.5.5 0 0 0 0-1H3Zm-.5 2.5c0-.27.22-.5.5-.5h1a.5.5 0 1 1 0 1H3a.5.5 0 0 1-.5-.5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M1.5 13a.5.5 0 0 1-.5-.5v-11c0-.27.22-.5.5-.5h11c.28 0 .5.23.5.5v11a.5.5 0 0 1-.5.5h-11Zm.5-1V2h3v10H2Zm4 0V7.5h2.8l-.65.65a.5.5 0 1 0 .7.7l1.5-1.5a.5.5 0 0 0 0-.7l-1.5-1.5a.5.5 0 1 0-.7.7l.64.65H6V2h6v10H6Z',
      })
    ),
    bottombar: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M3 10.5c0-.27.22-.5.5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5Zm3.5-.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1Zm2.5.5c0-.27.22-.5.5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M1 1.5c0-.27.22-.5.5-.5h11c.28 0 .5.23.5.5v11a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11ZM2 8V2h10v6H2Zm10 1v3H2V9h10Z',
      })
    ),
    bottombartoggle: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M3.5 10a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1Zm2.5.5c0-.27.22-.5.5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5Zm3.5-.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M1 12.5v-11c0-.27.22-.5.5-.5h11c.28 0 .5.23.5.5v11a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5Zm1-.5V9h10v3H2Zm4.5-4H2V2h10v6H7.5V5.21l.65.65a.5.5 0 1 0 .7-.71l-1.5-1.5a.5.5 0 0 0-.7 0l-1.5 1.5a.5.5 0 1 0 .7.7l.65-.64v2.8Z',
      })
    ),
    cpu: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M5 5.5c0-.27.22-.5.5-.5h3c.28 0 .5.23.5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3ZM6 8V6h2v2H6Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M5.5 0c.28 0 .5.23.5.5V2h2V.5a.5.5 0 0 1 1 0V2h2.5c.28 0 .5.23.5.5V5h1.5a.5.5 0 0 1 0 1H12v2h1.5a.5.5 0 0 1 0 1H12v2.5a.5.5 0 0 1-.5.5H9v1.5a.5.5 0 0 1-1 0V12H6v1.5a.5.5 0 0 1-1 0V12H2.5a.5.5 0 0 1-.5-.5V9H.5a.5.5 0 0 1 0-1H2V6H.5a.5.5 0 0 1 0-1H2V2.5c0-.27.22-.5.5-.5H5V.5c0-.27.22-.5.5-.5ZM11 3H3v8h8V3Z',
      })
    ),
    database: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M12 3c0-1.1-2.24-2-5-2s-5 .9-5 2v8c0 .43.26.75.54.98.3.23.68.41 1.12.55.88.3 2.06.47 3.34.47 1.28 0 2.46-.17 3.34-.46.44-.15.83-.33 1.12-.56.28-.23.54-.55.54-.98V3Zm-1.03 0a2.45 2.45 0 0 0-.8-.49A8.88 8.88 0 0 0 7 2c-1.29 0-2.4.21-3.16.51a2.45 2.45 0 0 0-.81.49l.05.05c.13.13.37.28.76.44C4.6 3.79 5.7 4 7 4s2.4-.21 3.16-.51a2.45 2.45 0 0 0 .81-.49ZM11 5.75V4.2A8.9 8.9 0 0 1 7 5a8.98 8.98 0 0 1-4-.8v1.55l.02.04c.02.04.06.09.14.15.17.13.44.27.82.4A10 10 0 0 0 7 6.75a10 10 0 0 0 3.02-.41c.38-.13.65-.27.82-.4a.62.62 0 0 0 .14-.15.15.15 0 0 0 .02-.03v-.01ZM3 7.01c.2.1.42.2.66.28.88.29 2.06.46 3.34.46 1.28 0 2.46-.17 3.34-.46.24-.08.46-.17.66-.28V8.5l-.02.04a.62.62 0 0 1-.14.15c-.17.13-.44.27-.82.4A10 10 0 0 1 7 9.5a10 10 0 0 1-3.02-.41 2.76 2.76 0 0 1-.82-.4.62.62 0 0 1-.14-.15.15.15 0 0 1-.02-.03V7Zm0 2.75V11l.02.04c.02.04.06.09.14.15.17.13.44.27.82.4A10 10 0 0 0 7 12a10 10 0 0 0 3.02-.41c.38-.13.65-.27.82-.4a.62.62 0 0 0 .14-.15.15.15 0 0 0 .02-.03V9.76c-.2.1-.42.2-.66.28-.88.29-2.06.46-3.34.46-1.28 0-2.46-.17-3.34-.46A4.77 4.77 0 0 1 3 9.76Z',
      })
    ),
    memory: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M5 3a.5.5 0 0 0-1 0v3a.5.5 0 0 0 1 0V3Zm2-.5c.28 0 .5.22.5.5v3a.5.5 0 0 1-1 0V3c0-.28.22-.5.5-.5Zm3 2a.5.5 0 1 0-1 0V6a.5.5 0 0 0 1 0V4.5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M12 3.54a.5.5 0 0 0-.15-.39l-3-3a.5.5 0 0 0-.38-.14H2.5a.5.5 0 0 0-.5.5v13c0 .27.22.5.5.5h9a.5.5 0 0 0 .5-.5V3.53ZM3 1h5.3L11 3.71v5.3H3V1Zm0 9v3h8v-3H3Z',
      })
    ),
    structure: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M8.16 3.45a1.5 1.5 0 1 0-2.33 0l-4.02 6.58A1.5 1.5 0 1 0 2.91 12h8.18a1.5 1.5 0 1 0 1.1-1.97L8.16 3.45Zm-1.47.52a1.5 1.5 0 0 0 .62 0l4.03 6.58c-.11.14-.2.29-.25.45H2.9a1.5 1.5 0 0 0-.25-.45L6.7 3.97Z',
      })
    ),
    box: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'm7.21.05 6.49 2.99a.5.5 0 0 1 .3.47v6.98a.5.5 0 0 1-.3.47l-6.47 2.98a.5.5 0 0 1-.46 0L.3 10.96a.5.5 0 0 1-.3-.47V3.5a.5.5 0 0 1 .3-.47L6.79.05a.5.5 0 0 1 .43 0ZM1 4.28v5.9l5.5 2.54v-5.9L1 4.28Zm6.5 8.44 5.5-2.54v-5.9L7.5 6.82v5.9Zm4.8-9.22L7 5.95 1.7 3.5 7 1.05l5.3 2.45Z',
      })
    ),
    power: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M7.5.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0v-6Z',
      }),
      a.createElement('path', {
        d: 'M4.27 2.8a.5.5 0 0 0-.54-.83 6 6 0 1 0 6.54 0 .5.5 0 0 0-.54.84 5 5 0 1 1-5.46 0Z',
      })
    ),
    photo: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M6.25 4.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm-.5 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M13 1.5v11a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11c0-.27.22-.5.5-.5h11c.28 0 .5.23.5.5ZM2 9.3V2h10v5.3L9.85 5.15a.5.5 0 0 0-.7 0L6.5 7.8 5.35 6.65a.5.5 0 0 0-.7 0L2 9.3Zm7.5-3.1L12 8.7V12H2v-1.3l3-3 3.15 3.15a.5.5 0 0 0 .7-.71L7.21 8.5 9.5 6.21Z',
      })
    ),
    component: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M3.5 1A2.5 2.5 0 0 0 1 3.5v7A2.5 2.5 0 0 0 3.5 13h7a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 10.5 1h-7ZM12 6.5H7.5V2h3c.83 0 1.5.68 1.5 1.5v3Zm0 1v3c0 .83-.67 1.5-1.5 1.5h-3V7.5H12ZM6.5 12V7.5H2v3c0 .83.67 1.5 1.5 1.5h3ZM2 6.5h4.5V2h-3C2.67 2 2 2.68 2 3.5v3Z',
      })
    ),
    grid: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M1 1.5c0-.27.22-.5.5-.5H6c.28 0 .5.23.5.5V6a.5.5 0 0 1-.5.5H1.5A.5.5 0 0 1 1 6V1.5Zm1 4V2h3.5v3.5H2Zm5.5-4c0-.27.22-.5.5-.5h4.5c.28 0 .5.23.5.5V6a.5.5 0 0 1-.5.5H8a.5.5 0 0 1-.5-.5V1.5Zm1 4V2H12v3.5H8.5Zm-7 2A.5.5 0 0 0 1 8v4.5c0 .28.22.5.5.5H6a.5.5 0 0 0 .5-.5V8a.5.5 0 0 0-.5-.5H1.5Zm.5 1V12h3.5V8.5H2ZM7.5 8c0-.27.22-.5.5-.5h4.5c.28 0 .5.23.5.5v4.5a.5.5 0 0 1-.5.5H8a.5.5 0 0 1-.5-.5V8Zm1 4V8.5H12V12H8.5Z',
      })
    ),
    outline: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M2 2v2H1V1.5c0-.27.22-.5.5-.5H4v1H2ZM1 9V5h1v4H1Zm0 1v2.5c0 .28.22.5.5.5H4v-1H2v-2H1Zm9 3h2.5a.5.5 0 0 0 .5-.5V10h-1v2h-2v1Zm2-9h1V1.5a.5.5 0 0 0-.5-.5H10v1h2v2Zm-3 8v1H5v-1h4ZM9 1v1H5V1h4Zm4 8h-1V5h1v4ZM7 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
      })
    ),
    photodrag: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M8.25 3.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm-.5 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M14 7V.5a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0-.5.5V3H.5a.5.5 0 0 0-.5.5V6h1V4h2v6.5c0 .28.22.5.5.5H10v2H8v1h2.5a.5.5 0 0 0 .5-.5V11h2.5a.5.5 0 0 0 .5-.5V7ZM4 1v5.8l1.65-1.65c.2-.2.5-.2.7 0L7.5 6.3l2.65-2.65c.2-.2.5-.2.7 0L13 5.8V1H4Zm9 6.21-2.5-2.5-2.3 2.3 1.15 1.14a.5.5 0 1 1-.7.7L6 6.22l-2 2v1.8h9V7.2Z',
      }),
      a.createElement('path', {
        d: 'M0 10V7h1v3H0Zm0 3.5V11h1v2h2v1H.5a.5.5 0 0 1-.5-.5Zm7 .5H4v-1h3v1Z',
      })
    ),
    search: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M9.54 10.2a5.5 5.5 0 1 1 .66-.66c.06.03.11.06.15.1l3 3a.5.5 0 0 1-.7.71l-3-3a.5.5 0 0 1-.1-.14ZM10.5 6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z',
      })
    ),
    zoom: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M6 3.5c.28 0 .5.22.5.5v1.5H8a.5.5 0 0 1 0 1H6.5V8a.5.5 0 0 1-1 0V6.5H4a.5.5 0 0 1 0-1h1.5V4c0-.28.22-.5.5-.5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M9.54 10.2a5.5 5.5 0 1 1 .66-.66c.06.03.11.06.15.1l3 3a.5.5 0 0 1-.7.71l-3-3a.5.5 0 0 1-.1-.14ZM10.5 6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z',
      })
    ),
    zoomout: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M4 5.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H4Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M6 11.5c1.35 0 2.59-.49 3.54-1.3.03.06.06.11.1.15l3 3a.5.5 0 0 0 .71-.7l-3-3a.5.5 0 0 0-.14-.1A5.5 5.5 0 1 0 6 11.5Zm0-1a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z',
      })
    ),
    zoomreset: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M1.5 2.84V1.5a.5.5 0 0 0-1 0V4c0 .28.22.5.5.5h2.5a.5.5 0 0 0 0-1H2.26a4.5 4.5 0 1 1-.5 4.02.5.5 0 1 0-.94.33 5.5 5.5 0 0 0 8.72 2.36l.1.14 3 3a.5.5 0 0 0 .71-.7l-3-3a.5.5 0 0 0-.14-.1 5.5 5.5 0 1 0-8.7-6.7Z',
      })
    ),
    eye: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M7 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'm14 7-.2.3c-.13.16-3.06 4.2-6.8 4.2C3.26 11.5.33 7.46.2 7.3L0 7l.2-.3C.34 6.55 3.27 2.5 7 2.5c3.74 0 6.67 4.04 6.8 4.2l.2.3ZM2.9 5.3A13 13 0 0 0 1.24 7 13 13 0 0 0 2.9 8.7c1.14.97 2.58 1.8 4.1 1.8 1.52 0 2.96-.83 4.1-1.8A13 13 0 0 0 12.76 7a13 13 0 0 0-1.66-1.7C9.96 4.33 8.52 3.5 7 3.5c-1.52 0-2.96.83-4.1 1.8Z',
      })
    ),
    eyeclose: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M1.85 1.15a.5.5 0 1 0-.7.7l11 11a.5.5 0 0 0 .7-.7l-11-11ZM11.1 8.7c-.17.15-.36.3-.55.44l.72.71a13.25 13.25 0 0 0 2.52-2.56L14 7l-.2-.3c-.13-.16-3.06-4.2-6.8-4.2-.89 0-1.73.23-2.5.58l.76.76A4.86 4.86 0 0 1 7 3.5c1.52 0 2.96.83 4.1 1.8A13 13 0 0 1 12.76 7a13 13 0 0 1-1.66 1.7ZM.2 6.7c.08-.09 1.04-1.41 2.53-2.55l.72.71c-.2.14-.38.3-.55.44A13 13 0 0 0 1.24 7 13 13 0 0 0 2.9 8.7c1.14.97 2.58 1.8 4.1 1.8.6 0 1.18-.13 1.74-.34l.77.76c-.78.35-1.62.58-2.51.58C3.26 11.5.33 7.46.2 7.3L0 7l.2-.3Z',
      }),
      a.createElement('path', {
        d: 'M4.5 7c0-.32.06-.63.17-.91l3.24 3.24A2.5 2.5 0 0 1 4.5 7Zm4.83.91L6.09 4.67a2.5 2.5 0 0 1 3.24 3.24Z',
      })
    ),
    lightning: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M2.52 6.6a.57.57 0 0 0-.17.54c.04.2.19.37.38.41l2.78.73-1.5 5c-.06.24.02.5.22.63a.5.5 0 0 0 .28.09.5.5 0 0 0 .35-.14L11.5 7.4c.14-.13.2-.34.15-.54a.53.53 0 0 0-.38-.4l-2.7-.7L10.79.78c.1-.23.04-.5-.15-.66a.5.5 0 0 0-.65 0L2.52 6.6Zm7.72.63-3.07-.8 1.85-4.14-5.2 4.51 2.94.77-1.27 4.28 4.75-4.62Zm-5.73 6.2.04.02Z',
      })
    ),
    lightningoff: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M10.14 8.72 11.5 7.4c.14-.13.2-.34.15-.54a.53.53 0 0 0-.38-.4l-2.7-.7L10.79.78c.1-.23.04-.5-.15-.66a.5.5 0 0 0-.65 0L5.46 4.05l.71.7L9.02 2.3 7.38 5.97l.7.7 2.16.56-.8.79.7.7ZM2.52 6.6a.57.57 0 0 0-.17.54c.04.2.19.37.38.41l2.78.73-1.5 5c-.06.24.02.5.22.63a.5.5 0 0 0 .63-.05l3.84-3.74-.7-.7-2.51 2.43 1.13-3.81-.68-.69L3.8 6.8l.85-.73-.71-.7L2.52 6.6Zm-.67-5.45a.5.5 0 1 0-.7.7l11 11a.5.5 0 0 0 .7-.7l-11-11Z',
      })
    ),
    contrast: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M3 3H.5a.5.5 0 0 0-.5.5v10c0 .28.22.5.5.5h10a.5.5 0 0 0 .5-.5V11h2.5a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0-.5.5V3Zm1 1v2.3L6.3 4H4ZM3 4v6.5a.5.5 0 0 0 .5.5H10v2H1V4h2Zm1-1h6.5a.5.5 0 0 1 .5.5V10h2V1H4v2Zm6 7V7.71l-2.3 2.3H10Zm0-3.7V4.7L4.7 10h1.6L10 6.3ZM9.3 4H7.7L4 7.71V9.3L9.3 4Z',
      })
    ),
    switchalt: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M3 3V.5c0-.27.22-.5.5-.5h10c.28 0 .5.23.5.5v10a.5.5 0 0 1-.5.5H11v2.5a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-10c0-.27.22-.5.5-.5H3Zm1 0V1h9v9h-2V3.5a.5.5 0 0 0-.5-.5H4Zm6 8v2H1V4h2v6.5c0 .28.22.5.5.5H10Zm0-1H4V4h6v6Z',
      })
    ),
    mirror: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M1 1.5c0-.27.22-.5.5-.5h11c.28 0 .5.23.5.5v11a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11ZM2 12h10V2L2 12Z',
      })
    ),
    grow: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M1.5 1a.5.5 0 1 0 0 1H12v10.5a.5.5 0 0 0 1 0V2a1 1 0 0 0-1-1H1.5Z',
      }),
      a.createElement('path', {
        d: 'M1 3.5c0-.27.22-.5.5-.5H10a1 1 0 0 1 1 1v8.5a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1-.5-.5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M1.5 5a.5.5 0 0 0-.5.5v7c0 .28.22.5.5.5h7a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-7ZM2 6v6h6V6H2Z',
      })
    ),
    paintbrush: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M11.8535.1464a.5.5 0 0 0-.7071 0L2.9827 8.3102a2.2396 2.2396 0 0 0-1.0737.599C.6772 10.141.2402 11.903.0852 12.9978 0 13.5998 0 14.0002 0 14.0002s.4004 0 1.0023-.0853c1.095-.155 2.8569-.5919 4.0887-1.8237.307-.307.5067-.6806.5992-1.0743l8.1633-8.1633a.5.5 0 0 0 0-.7071l-2-2Zm-6.253 9.546L6.543 8.75l-1.293-1.2929-.9424.9424a2.242 2.242 0 0 1 .7835.5097c.23.2302.4.4977.5095.7831ZM7.25 8.0428 12.7929 2.5 11.5 1.2071 5.957 6.75 7.25 8.0429ZM4.3839 9.6163c.4881.4882.4881 1.2796 0 1.7678-.7665.7664-1.832 1.1845-2.7791 1.403a8.6972 8.6972 0 0 1-.49.0982 8.7151 8.7151 0 0 1 .0982-.4899c.2186-.9471.6367-2.0126 1.403-2.779.4882-.4882 1.2797-.4882 1.7679 0Z',
      })
    ),
    ruler: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M1.5 1c.28 0 .5.23.5.5V2h10v-.5a.5.5 0 0 1 1 0v2a.5.5 0 0 1-1 0V3H2v.5a.5.5 0 0 1-1 0v-2c0-.27.22-.5.5-.5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M1.5 6a.5.5 0 0 0-.5.5v6c0 .28.22.5.5.5h11a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.5-.5h-11ZM2 7v5h10V7h-1v2.5a.5.5 0 0 1-1 0V7h-.75v1a.5.5 0 0 1-1 0V7H7.5v2.5a.5.5 0 0 1-1 0V7h-.75v1a.5.5 0 0 1-1 0V7H4v2.5a.5.5 0 0 1-1 0V7H2Z',
      })
    ),
    stop: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M4.5 4a.5.5 0 0 0-.5.5v5c0 .28.22.5.5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5h-5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M14 7A7 7 0 1 1 0 7a7 7 0 0 1 14 0Zm-1 0A6 6 0 1 1 1 7a6 6 0 0 1 12 0Z',
      })
    ),
    camera: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M10 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM9 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M2.5 1a.5.5 0 0 0-.5.5V2H.5a.5.5 0 0 0-.5.5v9c0 .28.22.5.5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H6v-.5a.5.5 0 0 0-.5-.5h-3ZM1 3v8h12V3H1Z',
      })
    ),
    video: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', { d: 'M2.5 10a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z' }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M0 4c0-1.1.9-2 2-2h6a2 2 0 0 1 2 2v.5l3.19-2.4a.5.5 0 0 1 .81.4v9a.5.5 0 0 1-.8.4L10 9.5v.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm9 0v1.5a.5.5 0 0 0 .8.4L13 3.5v7L9.8 8.1a.5.5 0 0 0-.8.4V10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1Z',
      })
    ),
    speaker: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M1 4.50004V9.50004C1 9.77618 1.22386 10 1.5 10H4L7.17075 12.7744C7.49404 13.0573 8 12.8277 8 12.3982V1.60192C8 1.17235 7.49404 0.942757 7.17075 1.22564L4 4.00004H1.5C1.22386 4.00004 1 4.2239 1 4.50004ZM4 9.00004V5.00004H2V9.00004H4ZM4.99804 9.54456C4.99934 9.52989 5 9.51505 5 9.50004V4.50004C5 4.48504 4.99934 4.47019 4.99804 4.45552L7 2.70381V11.2963L4.99804 9.54456Z',
      }),
      a.createElement('path', {
        d: 'M10.1498 1.75202C9.88637 1.66927 9.60572 1.81577 9.52297 2.07922C9.44023 2.34267 9.58672 2.62332 9.85017 2.70607C11.6763 3.27963 13 4.98596 13 7.00014C13 9.01433 11.6763 10.7207 9.85017 11.2942C9.58672 11.377 9.44023 11.6576 9.52297 11.9211C9.60572 12.1845 9.88637 12.331 10.1498 12.2483C12.3808 11.5476 14 9.4636 14 7.00014C14 4.53669 12.3808 2.45272 10.1498 1.75202Z',
      }),
      a.createElement('path', {
        d: 'M10.2504 3.96861C10.0113 3.83033 9.70547 3.91201 9.5672 4.15105C9.42893 4.39008 9.51061 4.69594 9.74964 4.83421C10.4982 5.26723 11 6.07534 11 7.00006C11 7.92479 10.4982 8.7329 9.74964 9.16591C9.51061 9.30418 9.42893 9.61005 9.5672 9.84908C9.70547 10.0881 10.0113 10.1698 10.2504 10.0315C11.2952 9.42711 12 8.29619 12 7.00006C12 5.70394 11.2952 4.57302 10.2504 3.96861Z',
      })
    ),
    play: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'm12.81 7.43-9.05 5.6A.5.5 0 0 1 3 12.6V1.4c0-.4.43-.63.76-.43l9.05 5.6a.5.5 0 0 1 0 .86Z',
      })
    ),
    playback: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M11.24 12.04 3.7 7.42a.5.5 0 0 1-.2-.23v4.05a.75.75 0 0 1-1.5 0v-8.5a.75.75 0 0 1 1.5 0V6.8a.5.5 0 0 1 .2-.23l7.54-4.6a.5.5 0 0 1 .76.42v9.22a.5.5 0 0 1-.76.43Z',
      })
    ),
    playnext: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'm2.76 12.04 7.54-4.61a.5.5 0 0 0 .2-.23v4.05a.75.75 0 0 0 1.5 0v-8.5a.75.75 0 0 0-1.5 0V6.8a.5.5 0 0 0-.2-.23l-7.54-4.6a.5.5 0 0 0-.76.42v9.22c0 .39.43.63.76.43Z',
      })
    ),
    rewind: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M9 2.42v2.32L13.23 2a.5.5 0 0 1 .77.42v9.16a.5.5 0 0 1-.77.42L9 9.26v2.32a.5.5 0 0 1-.77.42L1.5 7.65v3.6a.75.75 0 0 1-1.5 0v-8.5a.75.75 0 0 1 1.5 0v3.6L8.23 2a.5.5 0 0 1 .77.42Z',
      })
    ),
    fastforward: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M5 2.42v2.32L.77 2a.5.5 0 0 0-.77.42v9.16c0 .4.44.64.77.42L5 9.26v2.32c0 .4.44.64.77.42l6.73-4.35v3.6a.75.75 0 0 0 1.5 0v-8.5a.75.75 0 0 0-1.5 0v3.6L5.77 2a.5.5 0 0 0-.77.42Z',
      })
    ),
    stopalt: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M1 1.5c0-.27.22-.5.5-.5h11c.28 0 .5.23.5.5v11a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11Z',
      })
    ),
    sidebyside: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M1 1.5c0-.27.22-.5.5-.5h11c.28 0 .5.23.5.5v11a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11ZM2 12V2h5v10H2Z',
      })
    ),
    stacked: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M12.5 1c.28 0 .5.23.5.5v11a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11c0-.27.22-.5.5-.5h11ZM2 2h10v5H2V2Z',
      })
    ),
    sun: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M7.5.5a.5.5 0 0 0-1 0V2a.5.5 0 0 0 1 0V.5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M7 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0-1a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
      }),
      a.createElement('path', {
        d: 'M7 11.5c.28 0 .5.22.5.5v1.5a.5.5 0 0 1-1 0V12c0-.28.22-.5.5-.5ZM11.5 7c0-.28.22-.5.5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5ZM.5 6.5a.5.5 0 0 0 0 1H2a.5.5 0 0 0 0-1H.5ZM3.82 10.18c.2.2.2.51 0 .7l-1.06 1.07a.5.5 0 1 1-.71-.7l1.06-1.07c.2-.2.51-.2.7 0ZM11.95 2.76a.5.5 0 1 0-.7-.71l-1.07 1.06a.5.5 0 1 0 .7.7l1.07-1.05ZM10.18 10.18c.2-.2.51-.2.7 0l1.07 1.06a.5.5 0 1 1-.7.71l-1.07-1.06a.5.5 0 0 1 0-.7ZM2.76 2.05a.5.5 0 1 0-.71.7l1.06 1.07a.5.5 0 0 0 .7-.7L2.77 2.04Z',
      })
    ),
    moon: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M7.78.04a7.03 7.03 0 0 0-4.28.9 7 7 0 1 0 9.87 8.96c.1-.21-.14-.41-.36-.32a4.98 4.98 0 0 1-2 .42A5 5 0 0 1 8.53.65c.2-.12.19-.44-.04-.49a7.04 7.04 0 0 0-.72-.12Zm-1.27.98a6 6 0 0 0 4.98 9.96 6 6 0 1 1-4.98-9.96Z',
      })
    ),
    book: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M13 2a2 2 0 0 0-2-2H1.5a.5.5 0 0 0-.5.5v13c0 .28.22.5.5.5H11a2 2 0 0 0 2-2V2ZM3 13h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H7v6a.5.5 0 0 1-.86.36L5.5 6.7l-.65.65A.5.5 0 0 1 4 7V1H3v12ZM5 1v4.8l.15-.15a.5.5 0 0 1 .74.04l.11.1V1H5Z',
      })
    ),
    document: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M4 5.5c0-.28.22-.5.5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5ZM4.5 7.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5ZM4 10.5c0-.28.22-.5.5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M1.5 0a.5.5 0 0 0-.5.5v13c0 .28.22.5.5.5h11a.5.5 0 0 0 .5-.5V3.2a.5.5 0 0 0-.15-.35l-2.7-2.7A.5.5 0 0 0 9.79 0H1.5ZM2 1h7.5v2c0 .28.22.5.5.5h2V13H2V1Z',
      })
    ),
    copy: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M11.75.07A.5.5 0 0 0 11.5 0h-6a.5.5 0 0 0-.5.5V3H.5a.5.5 0 0 0-.5.5v10c0 .28.22.5.5.5h8a.5.5 0 0 0 .5-.5V11h4.5a.5.5 0 0 0 .5-.5V2.51a.5.5 0 0 0-.15-.36l-2-2a.5.5 0 0 0-.1-.08ZM9 10h4V3h-1.5a.5.5 0 0 1-.5-.5V1H6v2h.5a.5.5 0 0 1 .36.15l1.99 2c.1.09.15.21.15.35v4.51ZM1 4v9h7V6H6.5a.5.5 0 0 1-.5-.5V4H1Z',
      })
    ),
    category: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M3 1.5c0-.28.22-.5.5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm-1 2c0-.27.22-.5.5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M1 5.5c0-.28.22-.5.5-.5h11c.28 0 .5.22.5.5v7a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-7ZM2 12V6h10v6H2Z',
      })
    ),
    folder: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M6.59 3.5 5.09 2H1v9h12V3.5H6.59Zm.41-1L5.8 1.3a1 1 0 0 0-.71-.3H.5a.5.5 0 0 0-.5.5v10c0 .28.22.5.5.5h13a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H7Z',
      })
    ),
    print: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M4.5 8a.5.5 0 1 0 0 1h5a.5.5 0 0 0 0-1h-5Zm0 2a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M2 1.5c0-.27.22-.5.5-.5h8a.5.5 0 0 1 .36.15l.99 1c.1.09.15.21.15.35v1.51h1.5c.28 0 .5.22.5.5v5a.5.5 0 0 1-.5.5H12v2.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10H.5a.5.5 0 0 1-.5-.5v-5c0-.28.22-.5.5-.5H2V1.5ZM13 9h-1V6.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5V9H1V5h12v4Zm-2-6v1H3V2h7v.5c0 .28.22.5.5.5h.5Zm-8 9h8V7H3v5Z',
      })
    ),
    graphline: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M5.15 6.15c.2-.2.5-.2.7 0L7 7.3l2.15-2.15c.2-.2.5-.2.7 0l1 1a.5.5 0 0 1-.7.7l-.65-.64-2.15 2.15a.5.5 0 0 1-.7 0L5.5 7.2 3.85 8.86a.5.5 0 1 1-.7-.71l2-2Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M1.5 1a.5.5 0 0 0-.5.5v11c0 .28.22.5.5.5h11a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-11ZM2 2v10h10V2H2Z',
      })
    ),
    calendar: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M3.5 0c.28 0 .5.22.5.5V1h6V.5a.5.5 0 0 1 1 0V1h1.5c.28 0 .5.22.5.5v11a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11c0-.28.22-.5.5-.5H3V.5c0-.28.22-.5.5-.5ZM2 4v2.3h3V4H2Zm0 5.2V6.8h3v2.4H2Zm0 .5V12h3V9.7H2Zm3.5 0V12h3V9.7h-3Zm3.5 0V12h3V9.7H9Zm3-.5H9V6.8h3v2.4Zm-3.5 0h-3V6.8h3v2.4ZM9 4v2.3h3V4H9ZM5.5 6.3h3V4h-3v2.3Z',
      })
    ),
    graphbar: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M12 2.5a.5.5 0 0 0-1 0v10a.5.5 0 0 0 1 0v-10Zm-3 2a.5.5 0 0 0-1 0v8a.5.5 0 0 0 1 0v-8ZM5.5 7c.28 0 .5.22.5.5v5a.5.5 0 0 1-1 0v-5c0-.28.22-.5.5-.5ZM3 10.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2Z',
      })
    ),
    menu: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M13 2a.5.5 0 0 1 0 1H1a.5.5 0 0 1 0-1h12Zm-3 3a.5.5 0 0 1 0 1H1a.5.5 0 0 1 0-1h9Zm1.5 3.5A.5.5 0 0 0 11 8H1a.5.5 0 0 0 0 1h10a.5.5 0 0 0 .5-.5Zm-4 2.5a.5.5 0 0 1 0 1H1a.5.5 0 0 1 0-1h6.5Z',
      })
    ),
    menualt: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M1 2a.5.5 0 0 0 0 1h12a.5.5 0 0 0 0-1H1Zm3 3a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1H4ZM2.5 8.5c0-.28.22-.5.5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5Zm4 2.5a.5.5 0 0 0 0 1H13a.5.5 0 0 0 0-1H6.5Z',
      })
    ),
    filter: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M1 2a.5.5 0 0 0 0 1h12a.5.5 0 0 0 0-1H1Zm2 3a.5.5 0 0 0 0 1h8a.5.5 0 0 0 0-1H3Zm1.5 3.5c0-.28.22-.5.5-.5h4a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5Zm2 2.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1Z',
      })
    ),
    docchart: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M1 1.5C1 1.22386 1.22386 1 1.5 1H12.5C12.7761 1 13 1.22386 13 1.5V12.5C13 12.7761 12.7761 13 12.5 13H1.5C1.22386 13 1 12.7761 1 12.5V1.5ZM2 4V6.2998H5V4H2ZM2 9.2002V6.7998H5V9.2002H2ZM2 9.7002V12H5V9.7002H2ZM5.5 9.7002V12H8.5V9.7002H5.5ZM9 9.7002V12H12V9.7002H9ZM12 9.2002H9V6.7998H12V9.2002ZM8.5 9.2002H5.5V6.7998H8.5V9.2002ZM9 6.2998H12V4H9V6.2998ZM5.5 6.2998H8.5V4H5.5V6.2998Z',
      })
    ),
    doclist: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M3.5 6.5c0-.28.22-.5.5-.5h6a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5ZM4 9a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H4Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M1 1.5c0-.28.22-.5.5-.5h11c.28 0 .5.22.5.5v11a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11ZM2 4v8h10V4H2Z',
      })
    ),
    markup: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M8.98 1.63a.5.5 0 0 0-.96-.26l-3 11a.5.5 0 1 0 .96.26l3-11ZM3.32 3.62a.5.5 0 0 1 .06.7L1.15 7l2.23 2.68a.5.5 0 1 1-.76.64l-2.5-3a.5.5 0 0 1 0-.64l2.5-3a.5.5 0 0 1 .7-.06Zm7.36 0a.5.5 0 0 0-.06.7L12.85 7l-2.23 2.68a.5.5 0 0 0 .76.64l2.5-3a.5.5 0 0 0 0-.64l-2.5-3a.5.5 0 0 0-.7-.06Z',
      })
    ),
    bold: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M3 2v1.5h1v7H3V12h5a3 3 0 0 0 1.8-5.4A2.74 2.74 0 0 0 8 2H3Zm5 5.5H5.5v3H8a1.5 1.5 0 1 0 0-3Zm-.25-4H5.5V6h2.25a1.25 1.25 0 1 0 0-2.5Z',
      })
    ),
    italic: a.createElement('path', {
      d: 'M5 2h6v1H8.5l-2 8H9v1H3v-1h2.5l2-8H5V2Z',
    }),
    paperclip: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M10.55 2.27a1.5 1.5 0 0 0-2.12 0L2.78 7.92a2.5 2.5 0 0 0 3.53 3.54l3.54-3.54a.5.5 0 1 1 .7.71l-3.53 3.54a3.5 3.5 0 0 1-4.96-4.94v-.01l5.66-5.66h.01a2.5 2.5 0 0 1 3.53 3.53L5.6 10.76a1.5 1.5 0 0 1-2.12-2.12L7.02 5.1a.5.5 0 1 1 .7.7L4.2 9.34a.5.5 0 0 0 .7.7l5.66-5.65a1.5 1.5 0 0 0 0-2.12Z',
      })
    ),
    listordered: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M5 2.5c0-.28.22-.5.5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5ZM5 7c0-.28.22-.5.5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 7Zm.5 4a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7Zm-3-9H1v1h1v3h1V2.5a.5.5 0 0 0-.5-.5ZM3 8.5v1a.5.5 0 0 1-1 0V9h-.5a.5.5 0 0 1 0-1h1c.28 0 .5.22.5.5Zm-1 2a.5.5 0 0 0-1 0V12h2v-1H2v-.5Z',
      })
    ),
    listunordered: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M2.75 2.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM5.5 2a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7Zm0 9a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7ZM2 12.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 7c0-.28.22-.5.5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 7Zm-3 .75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z',
      })
    ),
    paragraph: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M6 7a3 3 0 1 1 0-6h5.5a.5.5 0 0 1 0 1H10v10.5a.5.5 0 0 1-1 0V2H7v10.5a.5.5 0 0 1-1 0V7Z',
      })
    ),
    markdown: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M2 4.5h1.5L5 6.38 6.5 4.5H8v5H6.5V7L5 8.88 3.5 7v2.5H2v-5Zm7.75 0h1.5V7h1.25l-2 2.5-2-2.5h1.25V4.5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M.5 2a.5.5 0 0 0-.5.5v9c0 .28.22.5.5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H.5ZM1 3v8h12V3H1Z',
      })
    ),
    repository: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M5 2.5C5 2.77614 4.77614 3 4.5 3C4.22386 3 4 2.77614 4 2.5C4 2.22386 4.22386 2 4.5 2C4.77614 2 5 2.22386 5 2.5Z',
      }),
      a.createElement('path', {
        d: 'M4.5 5C4.77614 5 5 4.77614 5 4.5C5 4.22386 4.77614 4 4.5 4C4.22386 4 4 4.22386 4 4.5C4 4.77614 4.22386 5 4.5 5Z',
      }),
      a.createElement('path', {
        d: 'M5 6.5C5 6.77614 4.77614 7 4.5 7C4.22386 7 4 6.77614 4 6.5C4 6.22386 4.22386 6 4.5 6C4.77614 6 5 6.22386 5 6.5Z',
      }),
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M11 0C12.1046 0 13 0.895431 13 2V12C13 13.1046 12.1046 14 11 14H1.5C1.22386 14 1 13.7761 1 13.5V0.5C1 0.223857 1.22386 0 1.5 0H11ZM11 1H3V13H11C11.5523 13 12 12.5523 12 12V2C12 1.44772 11.5523 1 11 1Z',
      })
    ),
    commit: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M3.03 7.5a4 4 0 0 0 7.94 0h2.53a.5.5 0 0 0 0-1h-2.53a4 4 0 0 0-7.94 0H.5a.5.5 0 0 0 0 1h2.53ZM7 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
      })
    ),
    branch: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M6 2.5c0 .65-.42 1.2-1 1.41v4.06A3.36 3.36 0 0 1 7.5 7a2.7 2.7 0 0 0 1.81-.56c.22-.18.38-.4.48-.62a1.5 1.5 0 1 1 1.03.15c-.16.42-.43.87-.86 1.24-.57.47-1.37.79-2.46.79-1.04 0-1.64.42-2 .92-.26.37-.4.8-.47 1.18A1.5 1.5 0 1 1 4 10.09V3.9a1.5 1.5 0 1 1 2-1.4Zm-2 9a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Zm1-9a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm6 2a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z',
      })
    ),
    pullrequest: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M8.35 1.35 7.71 2h.79A2.5 2.5 0 0 1 11 4.5v5.59a1.5 1.5 0 1 1-1 0V4.5C10 3.67 9.33 3 8.5 3h-.8l.65.65a.5.5 0 1 1-.7.7l-1.5-1.5a.5.5 0 0 1 0-.7l1.5-1.5a.5.5 0 1 1 .7.7ZM11 11.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM4 3.91a1.5 1.5 0 1 0-1 0v6.18a1.5 1.5 0 1 0 1 0V3.9ZM3.5 11a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1Zm0-8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z',
      })
    ),
    merge: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M4.1 3.87a1.5 1.5 0 1 0-1.1.04v6.18a1.5 1.5 0 1 0 1 0V6.4c.26.4.57.77.93 1.08A6.57 6.57 0 0 0 9.08 9a1.5 1.5 0 1 0 0-1 5.57 5.57 0 0 1-3.5-1.25 4.74 4.74 0 0 1-1.47-2.87ZM3.5 11a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1ZM4 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm7 6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z',
      })
    ),
    apple: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M11.03 8.1a3.05 3.05 0 0 1-.2-1.74 2.7 2.7 0 0 1 1.4-1.94 3.13 3.13 0 0 0-2.35-1.4c-.84-.08-2.01.56-2.65.57h-.02c-.63 0-1.81-.65-2.64-.57-.42.04-1.75.32-2.55 1.6-.28.44-.5 1.01-.58 1.74a6.36 6.36 0 0 0 .02 1.74 7.5 7.5 0 0 0 1.35 3.33c.7 1.01 1.51 1.6 1.97 1.6.93.02 1.74-.6 2.41-.6l.02.01h.04c.67-.02 1.48.61 2.42.6.45-.02 1.26-.6 1.97-1.6a7.95 7.95 0 0 0 .97-1.86 2.6 2.6 0 0 1-1.58-1.48ZM8.86 2.13c.72-.85.7-2.07.63-2.12-.07-.06-1.25.16-1.99.98a2.78 2.78 0 0 0-.62 2.13c.06.05 1.27-.14 1.98-.99Z',
      })
    ),
    linux: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M7 0a3 3 0 0 1 3 3v1.24c.13.13.25.27.36.42l.52.43.2.15c.32.26.7.59 1.09.97A6.28 6.28 0 0 1 14 9.54a.5.5 0 0 1-.35.44c-.31.1-.8.18-1.34.13-.33-.03-.7-.12-1.05-.3-.04.17-.1.34-.17.51a2 2 0 1 1-2.89 2.56 5.5 5.5 0 0 1-2.4 0 2 2 0 1 1-2.9-2.56 5.56 5.56 0 0 1-.16-.51c-.35.18-.72.27-1.05.3a3.4 3.4 0 0 1-1.34-.13.5.5 0 0 1-.35-.44l.01-.14a6.28 6.28 0 0 1 1.82-3.2 13.42 13.42 0 0 1 1.3-1.11c.22-.19.4-.32.5-.43.12-.15.24-.29.37-.42V3a3 3 0 0 1 3-3Zm1 11.9a2 2 0 0 1 2.14-1.9 5.5 5.5 0 0 0 .36-2c0-.51-.1-1.07-.3-1.6l-.03-.02a4.4 4.4 0 0 0-.86-.42 6.71 6.71 0 0 0-1-.31l-.86.64c-.27.2-.63.2-.9 0l-.85-.64a6.72 6.72 0 0 0-1.87.73l-.03.02A4.6 4.6 0 0 0 3.5 8c0 .68.11 1.39.36 2H4a2 2 0 0 1 2 1.9 4.49 4.49 0 0 0 2 0ZM5 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm6 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.1 4.3a1.5 1.5 0 0 1 1.8 0l.27.2L7 5.38 5.83 4.5l.27-.2ZM8.5 2c.28 0 .5.22.5.5V3a.5.5 0 0 1-1 0v-.5c0-.28.22-.5.5-.5ZM6 2.5a.5.5 0 0 0-1 0V3a.5.5 0 0 0 1 0v-.5Z',
      })
    ),
    ubuntu: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M12.26 2.07c0 1.14-.89 2.06-1.99 2.06s-1.99-.92-1.99-2.06c0-1.14.9-2.07 2-2.07s1.98.93 1.98 2.07ZM3.98 6.6c0 1.14-.9 2.07-2 2.07C.9 8.67 0 7.74 0 6.6c0-1.14.9-2.07 1.99-2.07 1.1 0 1.99.93 1.99 2.07ZM6.47 11.92a4.76 4.76 0 0 1-3.3-2.62c-.53.25-1.12.33-1.7.22a6.72 6.72 0 0 0 1.84 2.63 6.38 6.38 0 0 0 4.24 1.58c-.37-.5-.57-1.1-.59-1.73a4.77 4.77 0 0 1-.49-.08ZM11.81 11.93c0 1.14-.89 2.07-1.99 2.07s-1.98-.93-1.98-2.07c0-1.14.89-2.06 1.98-2.06 1.1 0 2 .92 2 2.06ZM12.6 11.17a6.93 6.93 0 0 0 .32-7.93A2.95 2.95 0 0 1 11.8 4.6a5.23 5.23 0 0 1-.16 5.03c.47.4.8.94.95 1.54ZM1.99 3.63h-.15A6.48 6.48 0 0 1 8 .24a3.07 3.07 0 0 0-.6 1.68 4.7 4.7 0 0 0-3.9 2.17c-.46-.3-.98-.45-1.51-.45Z',
      })
    ),
    windows: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M6.5 1H1v5.5h5.5V1ZM13 1H7.5v5.5H13V1ZM7.5 7.5H13V13H7.5V7.5ZM6.5 7.5H1V13h5.5V7.5Z',
      })
    ),
    storybook: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M2.04.62a.7.7 0 0 0-.66.72l.44 11.56c.01.37.3.66.67.68l9.4.42h.02a.7.7 0 0 0 .7-.7V.66a.7.7 0 0 0-.74-.66l-.77.05.05 1.62a.1.1 0 0 1-.17.08l-.52-.4-.61.46a.1.1 0 0 1-.17-.09L9.75.13l-7.7.49Zm8 4.74c-.24.2-2.09.33-2.09.05.04-1.04-.43-1.09-.69-1.09-.24 0-.66.08-.66.64 0 .57.6.89 1.32 1.27 1.02.53 2.24 1.18 2.24 2.82 0 1.57-1.27 2.43-2.9 2.43-1.67 0-3.14-.68-2.97-3.03.06-.27 2.2-.2 2.2 0-.03.97.19 1.26.75 1.26.43 0 .62-.24.62-.64 0-.6-.63-.95-1.36-1.36-.99-.56-2.15-1.2-2.15-2.7 0-1.5 1.03-2.5 2.86-2.5 1.83 0 2.84.99 2.84 2.85Z',
      })
    ),
    azuredevops: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'm0 5.18 1.31-1.73 4.9-2V.01l4.3 3.15-8.78 1.7v4.8L0 9.16V5.18Zm14-2.6v8.55l-3.36 2.86-5.42-1.79V14L1.73 9.66l8.78 1.05V3.16L14 2.58Z',
      })
    ),
    bitbucket: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M1 1.52A.41.41 0 0 0 .59 2l1.74 10.6c.05.26.28.46.55.46h8.37c.2 0 .38-.14.42-.34l1.01-6.25H8.81l-.46 2.71H5.68L4.95 5.4h7.91L13.4 2a.41.41 0 0 0-.41-.48H1Z',
      })
    ),
    chrome: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M13.02 3.43a.11.11 0 0 1-.1.17H7a3.4 3.4 0 0 0-3.3 2.55.11.11 0 0 1-.21.03L1.52 2.76a.11.11 0 0 1 0-.12 6.97 6.97 0 0 1 9-1.7c1.03.6 1.9 1.47 2.5 2.5ZM7 9.62a2.62 2.62 0 1 1 0-5.24 2.62 2.62 0 0 1 0 5.24Zm1.03.7a.11.11 0 0 0-.12-.04 3.4 3.4 0 0 1-4-1.84L1.1 3.57a.11.11 0 0 0-.2 0 7 7 0 0 0 5.07 10.35c.04 0 .08-.02.1-.05l1.97-3.42a.11.11 0 0 0 0-.13Zm1.43-5.95h3.95c.05 0 .1.03.1.07a6.97 6.97 0 0 1-1.53 7.48A6.96 6.96 0 0 1 7.08 14a.11.11 0 0 1-.1-.17l2.81-4.88h.01a3.38 3.38 0 0 0-.42-4.38.11.11 0 0 1 .08-.2Z',
      })
    ),
    chromatic: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M0 7a7 7 0 1 0 14 0A7 7 0 0 0 0 7Zm5.22-3.87a1.97 1.97 0 0 1 3.75.83v1.29L5.61 3.32a2.49 2.49 0 0 0-.4-.19ZM8.7 5.71 5.35 3.78a1.97 1.97 0 0 0-2.6 2.83c.12-.1.24-.18.37-.26l1.51-.87a.27.27 0 0 1 .27 0L7 6.69l1.7-.98Zm-.32 4.97-1.52-.87a.27.27 0 0 1-.13-.23V7.15l-1.7-.97v3.86a1.97 1.97 0 0 0 3.75.83 2.5 2.5 0 0 1-.4-.19Zm.26-.46a1.97 1.97 0 0 0 2.6-2.83c-.11.1-.23.18-.36.26L7.53 9.58l1.11.64Zm-4.1.26h-.17a1.97 1.97 0 0 1-1.9-2.47 2 2 0 0 1 .92-1.2l1.11-.63v3.86c0 .14.01.29.04.44Zm6.79-5.98a1.97 1.97 0 0 0-1.87-.97c.03.14.04.29.04.43v1.75c0 .1-.05.19-.14.23l-2.1 1.22V9.1l3.35-1.93a1.97 1.97 0 0 0 .72-2.68Z',
      })
    ),
    componentdriven: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M10.85 2.18 8.87.2a.69.69 0 0 0-.97 0L3.09 5.01a.69.69 0 0 0 0 .97l2.46 2.46-2.4 2.4a.69.69 0 0 0 0 .98l1.98 1.98c.27.27.7.27.97 0l4.8-4.81a.69.69 0 0 0 0-.97L8.45 5.56l2.4-2.4a.69.69 0 0 0 0-.98Z',
      })
    ),
    discord: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M11.85 2.88C10.95 2.48 10 2.18 9 2a7.05 7.05 0 0 0-.4.75 10.66 10.66 0 0 0-3.2 0c-.1-.23-.24-.5-.36-.73A.04.04 0 0 0 4.99 2a11.51 11.51 0 0 0-2.86.9 11.82 11.82 0 0 0-2.05 8 11.6 11.6 0 0 0 3.5 1.77c.01 0 .03 0 .04-.02.27-.36.51-.75.72-1.16a.04.04 0 0 0-.03-.06 7.66 7.66 0 0 1-1.09-.52.04.04 0 0 1 0-.08 5.96 5.96 0 0 0 .26-.17 8.28 8.28 0 0 0 7.08 0l.22.17c.02.02.02.06 0 .08-.36.2-.72.37-1.1.52a.04.04 0 0 0-.02.06c.2.4.45.8.71 1.16.01.02.03.02.05.02a11.57 11.57 0 0 0 3.52-1.8 11.74 11.74 0 0 0-2.09-7.99Zm-7.17 6.4c-.7 0-1.26-.63-1.26-1.41 0-.78.56-1.41 1.26-1.41s1.27.64 1.26 1.4c0 .79-.56 1.42-1.26 1.42Zm4.65 0c-.69 0-1.26-.63-1.26-1.41 0-.78.56-1.41 1.26-1.41s1.27.64 1.26 1.4c0 .79-.55 1.42-1.26 1.42Z',
      })
    ),
    facebook: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M7.4 14H5.06V7H3.5V4.59h1.56V3.17C5.06 1.2 5.53 0 7.6 0h1.72v2.41H8.25c-.8 0-.85.34-.85.97v1.2h1.93L9.11 7H7.4l-.01 7Z',
      })
    ),
    figma: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        fillRule: 'evenodd',
        d: 'M9.2 0H4.8a2.6 2.6 0 0 0-1.4 4.8 2.6 2.6 0 0 0 0 4.4 2.6 2.6 0 1 0 4 2.2V8.89a2.6 2.6 0 1 0 3.2-4.09A2.6 2.6 0 0 0 9.2 0ZM7.4 7A1.8 1.8 0 1 0 11 7a1.8 1.8 0 0 0-3.6 0Zm-.8 2.6H4.8a1.8 1.8 0 1 0 1.8 1.8V9.6ZM4.8 4.4h1.8V.8H4.8a1.8 1.8 0 0 0 0 3.59Zm0 .8a1.8 1.8 0 0 0 0 3.6h1.8V5.2H4.8Zm4.4-.8H7.4V.8h1.8a1.8 1.8 0 1 1 0 3.59Z',
      })
    ),
    gdrive: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M6.37 8.77 4.33 12.3h6.75l2.04-3.54H6.38Zm6.18-1-3.5-6.08h-4.1l3.51 6.08h4.09ZM4.38 2.7.88 8.77l2.04 3.54 3.5-6.07L4.38 2.7Z',
      })
    ),
    github: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M7 0a7 7 0 0 0-2.21 13.64c.35.06.48-.15.48-.33L5.26 12c-1.76.32-2.21-.43-2.35-.83-.08-.2-.43-.82-.72-.99-.25-.13-.6-.45-.01-.46.55 0 .94.5 1.07.72.63 1.06 1.64.76 2.04.58.07-.46.25-.77.45-.94-1.56-.18-3.19-.78-3.19-3.46 0-.76.28-1.39.72-1.88-.07-.17-.31-.9.07-1.85 0 0 .59-.19 1.93.71a6.5 6.5 0 0 1 3.5 0c1.34-.9 1.92-.71 1.92-.71.39.96.14 1.68.07 1.85.45.5.72 1.11.72 1.88 0 2.69-1.64 3.28-3.2 3.46.26.22.48.64.48 1.3l-.01 1.92c0 .18.13.4.48.33A7.01 7.01 0 0 0 7 0Z',
      })
    ),
    gitlab: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M4.53 5.58H1.07l1.49-4.55a.26.26 0 0 1 .48 0l1.49 4.55ZM7 13.15 1.07 5.58l-.75 2.3a.5.5 0 0 0 .18.57l6.5 4.7Zm0 0 6.5-4.7a.5.5 0 0 0 .18-.57l-.75-2.3L7 13.15l2.47-7.57H4.53L7 13.15Zm2.47-7.57h3.46l-1.49-4.55a.26.26 0 0 0-.48 0L9.47 5.58Z',
      })
    ),
    google: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M10.92 1.1H7.26c-1.64 0-3.19 1.24-3.19 2.68 0 1.47 1.12 2.66 2.8 2.66l.33-.01c-.1.2-.18.44-.18.68 0 .41.22.75.5 1.02h-.64c-2.03 0-3.6 1.3-3.6 2.64 0 1.32 1.72 2.15 3.75 2.15 2.32 0 3.6-1.31 3.6-2.64 0-1.06-.31-1.7-1.28-2.38-.33-.23-.96-.8-.96-1.14 0-.39.1-.58.7-1.04a2.46 2.46 0 0 0 1.03-1.92c0-.92-.4-1.82-1.18-2.11h1.17l.81-.6ZM9.6 10.04c.03.13.05.25.05.38 0 1.07-.7 1.9-2.67 1.9-1.4 0-2.42-.88-2.42-1.95 0-1.05 1.26-1.92 2.66-1.9a3 3 0 0 1 .92.14c.76.53 1.3.83 1.46 1.43ZM7.34 6.07c-.94-.03-1.84-1.06-2-2.3-.17-1.24.47-2.19 1.41-2.16.94.03 1.84 1.03 2 2.26.17 1.24-.47 2.23-1.41 2.2Z',
      })
    ),
    graphql: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M7.87 11.6a1.17 1.17 0 0 0-1.7-.02l-2.71-1.56.01-.04h7.07l.02.07-2.69 1.56Zm-1.7-9.18.03.03-3.54 6.12h-.04V5.43a1.17 1.17 0 0 0 .84-1.46l2.7-1.56Zm4.38 1.56a1.17 1.17 0 0 0 .84 1.46v3.12l-.04.01-3.54-6.12c.02 0 .03-.02.04-.03l2.7 1.56ZM3.47 9.42a1.17 1.17 0 0 0-.32-.57l3.53-6.12a1.17 1.17 0 0 0 .65 0l3.54 6.12a1.17 1.17 0 0 0-.33.57H3.47Zm8.8-.74c-.1-.05-.21-.1-.32-.12V5.44a1.17 1.17 0 1 0-1.12-1.94l-2.7-1.56a1.17 1.17 0 1 0-2.24 0L3.19 3.5a1.17 1.17 0 1 0-1.13 1.94v3.12a1.17 1.17 0 1 0 1.12 1.94l2.7 1.56a1.17 1.17 0 1 0 2.24-.03l2.69-1.55a1.17 1.17 0 1 0 1.45-1.8Z',
      })
    ),
    medium: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M0 0v14h14V0H0Zm11.63 3.32-.75.72a.22.22 0 0 0-.08.2v5.33c0 .07.03.14.08.18l.73.72v.16H7.92v-.16l.76-.74c.08-.07.08-.1.08-.21V5.24l-2.11 5.37h-.29L3.9 5.24v3.67c0 .13.05.25.14.34l.99 1.2v.16h-2.8v-.16l.98-1.2a.48.48 0 0 0 .13-.41V4.65c0-.11-.04-.2-.12-.27l-.88-1.06v-.16h2.73l2.1 4.62 1.86-4.62h2.6v.16Z',
      })
    ),
    redux: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M4.06 9.69c.02.49.42.88.91.88H5a.91.91 0 0 0-.03-1.83h-.03c-.03 0-.08 0-.11.02a5.97 5.97 0 0 1-.85-3.62c.06-.98.39-1.82.96-2.52.47-.6 1.39-.9 2-.92 1.73-.03 2.47 2.12 2.51 2.99.22.04.57.16.82.24-.2-2.64-1.83-4-3.4-4-1.46 0-2.81 1.05-3.35 2.61a6.67 6.67 0 0 0 .65 5.68.74.74 0 0 0-.11.47Zm8.28-2.3a6.62 6.62 0 0 0-5.15-2.25h-.26a.9.9 0 0 0-.8-.49H6.1a.91.91 0 0 0 .03 1.83h.03a.92.92 0 0 0 .8-.56h.3c1.23 0 2.4.36 3.47 1.06.81.54 1.4 1.24 1.72 2.09.28.68.26 1.35-.03 1.92a2.4 2.4 0 0 1-2.23 1.34c-.65 0-1.27-.2-1.6-.34-.18.16-.5.42-.73.58.7.33 1.41.5 2.1.5 1.56 0 2.72-.85 3.16-1.72.47-.94.44-2.57-.78-3.96ZM4.9 12.9a4 4 0 0 1-.98.11c-1.2 0-2.3-.5-2.84-1.32C.38 10.6.13 8.3 2.5 6.58c.05.26.15.62.22.83-.31.23-.8.68-1.11 1.3a2.4 2.4 0 0 0 .13 2.53c.36.54.93.86 1.66.96.9.11 1.8-.05 2.66-.5a5.83 5.83 0 0 0 2.67-2.56.91.91 0 0 1 .62-1.55h.03a.92.92 0 0 1 .1 1.82 6.26 6.26 0 0 1-4.56 3.49Z',
      })
    ),
    twitter: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M14 2.55c-.51.23-1.07.39-1.65.46.6-.36 1.05-.94 1.26-1.63-.55.34-1.17.58-1.82.72a2.84 2.84 0 0 0-2.1-.93 2.9 2.9 0 0 0-2.8 3.61 8.09 8.09 0 0 1-5.9-3.07 2.99 2.99 0 0 0 .88 3.93 2.8 2.8 0 0 1-1.3-.37v.04c0 1.42 1 2.61 2.3 2.89a2.82 2.82 0 0 1-1.3.05 2.89 2.89 0 0 0 2.7 2.04A5.67 5.67 0 0 1 0 11.51a7.98 7.98 0 0 0 4.4 1.32c5.29 0 8.17-4.48 8.17-8.38v-.38A5.93 5.93 0 0 0 14 2.55Z',
      })
    ),
    youtube: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M13.99 8.17V5.83a14.95 14.95 0 0 0-.23-2.22c-.09-.38-.27-.7-.55-.96s-.6-.41-.97-.45A51.3 51.3 0 0 0 7 2c-2.34 0-4.09.07-5.24.2A1.78 1.78 0 0 0 .25 3.61 15.26 15.26 0 0 0 0 7v1.16a15.24 15.24 0 0 0 .24 2.22c.09.38.27.7.55.96.27.26.6.41.97.45 1.15.13 2.9.2 5.24.2 2.34 0 4.08-.06 5.24-.2.37-.04.7-.19.97-.45s.45-.58.54-.96a15.26 15.26 0 0 0 .24-2.22Zm-4.23-1.6c.16.1.24.24.24.43 0 .2-.08.33-.24.42l-4 2.5a.44.44 0 0 1-.26.08.54.54 0 0 1-.24-.06A.46.46 0 0 1 5 9.5v-5c0-.2.08-.34.26-.44.17-.1.34-.09.5.02l4 2.5Z',
      })
    ),
    vscode: a.createElement(
      a.Fragment,
      null,
      a.createElement('path', {
        d: 'M10.24.04c.13 0 .26.03.38.09L13.5 1.5a.87.87 0 0 1 .5.8v.03-.01 9.39c0 .33-.2.63-.5.78l-2.88 1.38a.87.87 0 0 1-1-.17l-5.5-5.03-2.4 1.83a.58.58 0 0 1-.75-.04l-.77-.7a.58.58 0 0 1 0-.86L2.27 7 .2 5.1a.58.58 0 0 1 0-.86l.77-.7c.21-.2.52-.2.75-.04l2.4 1.83L9.63.3a.87.87 0 0 1 .61-.26Zm.26 3.78L6.32 7l4.18 3.18V3.82Z',
      })
    ),
  },
  gc = T.svg`
  display: inline-block;
  shape-rendering: inherit;
  vertical-align: middle;
  fill: currentColor;

  path {
    fill: currentColor;
  }
`,
  ye = ({ icon: e, useSymbol: t, ...r }) =>
    a.createElement(
      gc,
      { viewBox: '0 0 14 14', width: '14px', height: '14px', ...r },
      t ? a.createElement('use', { xlinkHref: `#icon--${e}` }) : Sr[e]
    ),
  xf = b.memo(function ({ icons: e = Object.keys(Sr) }) {
    return a.createElement(
      gc,
      {
        viewBox: '0 0 14 14',
        style: { position: 'absolute', width: 0, height: 0 },
        'data-chromatic': 'ignore',
      },
      e.map((t) =>
        a.createElement('symbol', { id: `icon--${t}`, key: t }, Sr[t])
      )
    );
  }),
  Af = 0,
  wf = (e) =>
    e.button === Af && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey,
  Cf = (e, t) => {
    wf(e) && (e.preventDefault(), t(e));
  },
  Sf = T.span(
    ({ withArrow: e }) =>
      e
        ? {
            '> svg:last-of-type': {
              height: '0.7em',
              width: '0.7em',
              marginRight: 0,
              marginLeft: '0.25em',
              bottom: 'auto',
              verticalAlign: 'inherit',
            },
          }
        : {},
    ({ containsIcon: e }) =>
      e
        ? {
            svg: {
              height: '1em',
              width: '1em',
              verticalAlign: 'middle',
              position: 'relative',
              bottom: 0,
              marginRight: 0,
            },
          }
        : {}
  ),
  kf = T.a(
    ({ theme: e }) => ({
      display: 'inline-block',
      transition: 'all 150ms ease-out',
      textDecoration: 'none',
      color: e.color.secondary,
      '&:hover, &:focus': {
        cursor: 'pointer',
        color: qt(0.07, e.color.secondary),
        'svg path:not([fill])': { fill: qt(0.07, e.color.secondary) },
      },
      '&:active': {
        color: qt(0.1, e.color.secondary),
        'svg path:not([fill])': { fill: qt(0.1, e.color.secondary) },
      },
      svg: {
        display: 'inline-block',
        height: '1em',
        width: '1em',
        verticalAlign: 'text-top',
        position: 'relative',
        bottom: '-0.125em',
        marginRight: '0.4em',
        '& path': { fill: e.color.secondary },
      },
    }),
    ({ theme: e, secondary: t, tertiary: r }) => {
      let n;
      return (
        t && (n = [e.textMutedColor, e.color.dark, e.color.darker]),
        r && (n = [e.color.dark, e.color.darkest, e.textMutedColor]),
        n
          ? {
              color: n[0],
              'svg path:not([fill])': { fill: n[0] },
              '&:hover': {
                color: n[1],
                'svg path:not([fill])': { fill: n[1] },
              },
              '&:active': {
                color: n[2],
                'svg path:not([fill])': { fill: n[2] },
              },
            }
          : {}
      );
    },
    ({ nochrome: e }) =>
      e
        ? {
            color: 'inherit',
            '&:hover, &:active': {
              color: 'inherit',
              textDecoration: 'underline',
            },
          }
        : {},
    ({ theme: e, inverse: t }) =>
      t
        ? {
            color: e.color.lightest,
            ':not([fill])': { fill: e.color.lightest },
            '&:hover': {
              color: e.color.lighter,
              'svg path:not([fill])': { fill: e.color.lighter },
            },
            '&:active': {
              color: e.color.light,
              'svg path:not([fill])': { fill: e.color.light },
            },
          }
        : {},
    ({ isButton: e }) =>
      e
        ? {
            border: 0,
            borderRadius: 0,
            background: 'none',
            padding: 0,
            fontSize: 'inherit',
          }
        : {}
  ),
  bt = ({
    cancel: e,
    children: t,
    onClick: r,
    withArrow: n,
    containsIcon: o,
    className: l,
    ...i
  }) =>
    a.createElement(
      kf,
      { ...i, onClick: r && e ? (s) => Cf(s, r) : r, className: l },
      a.createElement(
        Sf,
        { withArrow: n, containsIcon: o },
        t,
        n && a.createElement(ye, { icon: 'arrowright' })
      )
    );
bt.defaultProps = {
  cancel: !0,
  className: void 0,
  style: void 0,
  onClick: void 0,
  withArrow: !1,
  containsIcon: !1,
};
var Tf = T.div(({ theme: e }) => ({
    fontSize: `${e.typography.size.s2}px`,
    lineHeight: '1.6',
    h1: {
      fontSize: `${e.typography.size.l1}px`,
      fontWeight: e.typography.weight.bold,
    },
    h2: {
      fontSize: `${e.typography.size.m2}px`,
      borderBottom: `1px solid ${e.appBorderColor}`,
    },
    h3: { fontSize: `${e.typography.size.m1}px` },
    h4: { fontSize: `${e.typography.size.s3}px` },
    h5: { fontSize: `${e.typography.size.s2}px` },
    h6: { fontSize: `${e.typography.size.s2}px`, color: e.color.dark },
    'pre:not(.prismjs)': {
      background: 'transparent',
      border: 'none',
      borderRadius: 0,
      padding: 0,
      margin: 0,
    },
    'pre pre, pre.prismjs': {
      padding: 15,
      margin: 0,
      whiteSpace: 'pre-wrap',
      color: 'inherit',
      fontSize: '13px',
      lineHeight: '19px',
    },
    'pre pre code, pre.prismjs code': { color: 'inherit', fontSize: 'inherit' },
    'pre code': {
      margin: 0,
      padding: 0,
      whiteSpace: 'pre',
      border: 'none',
      background: 'transparent',
    },
    'pre code, pre tt': { backgroundColor: 'transparent', border: 'none' },
    'body > *:first-of-type': { marginTop: '0 !important' },
    'body > *:last-child': { marginBottom: '0 !important' },
    a: { color: e.color.secondary, textDecoration: 'none' },
    'a.absent': { color: '#cc0000' },
    'a.anchor': {
      display: 'block',
      paddingLeft: 30,
      marginLeft: -30,
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
    },
    'h1, h2, h3, h4, h5, h6': {
      margin: '20px 0 10px',
      padding: 0,
      cursor: 'text',
      position: 'relative',
      '&:first-of-type': { marginTop: 0, paddingTop: 0 },
      '&:hover a.anchor': { textDecoration: 'none' },
      '& tt, & code': { fontSize: 'inherit' },
    },
    'h1:first-of-type + h2': { marginTop: 0, paddingTop: 0 },
    'p, blockquote, ul, ol, dl, li, table, pre': { margin: '15px 0' },
    hr: {
      border: '0 none',
      borderTop: `1px solid ${e.appBorderColor}`,
      height: 4,
      padding: 0,
    },
    'body > h1:first-of-type, body > h2:first-of-type, body > h3:first-of-type, body > h4:first-of-type, body > h5:first-of-type, body > h6:first-of-type':
      { marginTop: 0, paddingTop: 0 },
    'body > h1:first-of-type + h2': { marginTop: 0, paddingTop: 0 },
    'a:first-of-type h1, a:first-of-type h2, a:first-of-type h3, a:first-of-type h4, a:first-of-type h5, a:first-of-type h6':
      { marginTop: 0, paddingTop: 0 },
    'h1 p, h2 p, h3 p, h4 p, h5 p, h6 p': { marginTop: 0 },
    'li p.first': { display: 'inline-block' },
    'ul, ol': {
      paddingLeft: 30,
      '& :first-of-type': { marginTop: 0 },
      '& :last-child': { marginBottom: 0 },
    },
    dl: { padding: 0 },
    'dl dt': {
      fontSize: '14px',
      fontWeight: 'bold',
      fontStyle: 'italic',
      margin: '0 0 15px',
      padding: '0 15px',
      '&:first-of-type': { padding: 0 },
      '& > :first-of-type': { marginTop: 0 },
      '& > :last-child': { marginBottom: 0 },
    },
    blockquote: {
      borderLeft: `4px solid ${e.color.medium}`,
      padding: '0 15px',
      color: e.color.dark,
      '& > :first-of-type': { marginTop: 0 },
      '& > :last-child': { marginBottom: 0 },
    },
    table: {
      padding: 0,
      borderCollapse: 'collapse',
      '& tr': {
        borderTop: `1px solid ${e.appBorderColor}`,
        backgroundColor: 'white',
        margin: 0,
        padding: 0,
        '& th': {
          fontWeight: 'bold',
          border: `1px solid ${e.appBorderColor}`,
          textAlign: 'left',
          margin: 0,
          padding: '6px 13px',
        },
        '& td': {
          border: `1px solid ${e.appBorderColor}`,
          textAlign: 'left',
          margin: 0,
          padding: '6px 13px',
        },
        '&:nth-of-type(2n)': { backgroundColor: e.color.lighter },
        '& th :first-of-type, & td :first-of-type': { marginTop: 0 },
        '& th :last-child, & td :last-child': { marginBottom: 0 },
      },
    },
    img: { maxWidth: '100%' },
    'span.frame': {
      display: 'block',
      overflow: 'hidden',
      '& > span': {
        border: `1px solid ${e.color.medium}`,
        display: 'block',
        float: 'left',
        overflow: 'hidden',
        margin: '13px 0 0',
        padding: 7,
        width: 'auto',
      },
      '& span img': { display: 'block', float: 'left' },
      '& span span': {
        clear: 'both',
        color: e.color.darkest,
        display: 'block',
        padding: '5px 0 0',
      },
    },
    'span.align-center': {
      display: 'block',
      overflow: 'hidden',
      clear: 'both',
      '& > span': {
        display: 'block',
        overflow: 'hidden',
        margin: '13px auto 0',
        textAlign: 'center',
      },
      '& span img': { margin: '0 auto', textAlign: 'center' },
    },
    'span.align-right': {
      display: 'block',
      overflow: 'hidden',
      clear: 'both',
      '& > span': {
        display: 'block',
        overflow: 'hidden',
        margin: '13px 0 0',
        textAlign: 'right',
      },
      '& span img': { margin: 0, textAlign: 'right' },
    },
    'span.float-left': {
      display: 'block',
      marginRight: 13,
      overflow: 'hidden',
      float: 'left',
      '& span': { margin: '13px 0 0' },
    },
    'span.float-right': {
      display: 'block',
      marginLeft: 13,
      overflow: 'hidden',
      float: 'right',
      '& > span': {
        display: 'block',
        overflow: 'hidden',
        margin: '13px auto 0',
        textAlign: 'right',
      },
    },
    'code, tt': {
      margin: '0 2px',
      padding: '0 5px',
      whiteSpace: 'nowrap',
      border: `1px solid ${e.color.mediumlight}`,
      backgroundColor: e.color.lighter,
      borderRadius: 3,
      color: e.base === 'dark' && e.color.darkest,
    },
  })),
  Dt = [],
  er = null,
  Rf = b.lazy(async () => {
    let { SyntaxHighlighter: e } = await yt(
      () => import('./syntaxhighlighter-V7JZZA35-c2b80220.js'),
      [
        './syntaxhighlighter-V7JZZA35-c2b80220.js',
        './iframe-d50da200.js',
        './index-76fb7be0.js',
        './_commonjsHelpers-de833af9.js',
        './react-18-988a5df2.js',
        './index-d3ea75b5.js',
        './_basePickBy-2c05180b.js',
        './_getPrototype-aecc109d.js',
        './_commonjs-dynamic-modules-302442b1.js',
        './index-b75c9059.js',
        './extends-98964cd2.js',
        './index-356e4a49.js',
        './index-c457595d.js',
      ],
      import.meta.url
    );
    return (
      Dt.length > 0 &&
        (Dt.forEach((t) => {
          e.registerLanguage(...t);
        }),
        (Dt = [])),
      er === null && (er = e),
      { default: (t) => a.createElement(e, { ...t }) }
    );
  }),
  Of = b.lazy(async () => {
    let [{ SyntaxHighlighter: e }, { formatter: t }] = await Promise.all([
      yt(
        () => import('./syntaxhighlighter-V7JZZA35-c2b80220.js'),
        [
          './syntaxhighlighter-V7JZZA35-c2b80220.js',
          './iframe-d50da200.js',
          './index-76fb7be0.js',
          './_commonjsHelpers-de833af9.js',
          './react-18-988a5df2.js',
          './index-d3ea75b5.js',
          './_basePickBy-2c05180b.js',
          './_getPrototype-aecc109d.js',
          './_commonjs-dynamic-modules-302442b1.js',
          './index-b75c9059.js',
          './extends-98964cd2.js',
          './index-356e4a49.js',
          './index-c457595d.js',
        ],
        import.meta.url
      ),
      yt(
        () => import('./formatter-SWP5E3XI-a07e43c4.js'),
        [
          './formatter-SWP5E3XI-a07e43c4.js',
          './_basePickBy-2c05180b.js',
          './_getPrototype-aecc109d.js',
          './_commonjsHelpers-de833af9.js',
          './_commonjs-dynamic-modules-302442b1.js',
          './iframe-d50da200.js',
          './index-76fb7be0.js',
          './react-18-988a5df2.js',
          './index-d3ea75b5.js',
          './index-b75c9059.js',
          './extends-98964cd2.js',
          './index-356e4a49.js',
          './index-c457595d.js',
        ],
        import.meta.url
      ),
    ]);
    return (
      Dt.length > 0 &&
        (Dt.forEach((r) => {
          e.registerLanguage(...r);
        }),
        (Dt = [])),
      er === null && (er = e),
      { default: (r) => a.createElement(e, { ...r, formatter: t }) }
    );
  }),
  An = (e) =>
    a.createElement(
      b.Suspense,
      { fallback: a.createElement('div', null) },
      e.format !== !1
        ? a.createElement(Of, { ...e })
        : a.createElement(Rf, { ...e })
    );
An.registerLanguage = (...e) => {
  if (er !== null) {
    er.registerLanguage(...e);
    return;
  }
  Dt.push(e);
};
var Lf = (e) => (typeof e == 'number' ? e : Number(e)),
  _f = T.div(
    ({ theme: e, col: t, row: r = 1 }) =>
      t
        ? {
            display: 'inline-block',
            verticalAlign: 'inherit',
            '& > *': {
              marginLeft: t * e.layoutMargin,
              verticalAlign: 'inherit',
            },
            [`& > *:first-child${ba}`]: { marginLeft: 0 },
          }
        : {
            '& > *': { marginTop: r * e.layoutMargin },
            [`& > *:first-child${ba}`]: { marginTop: 0 },
          },
    ({ theme: e, outer: t, col: r, row: n }) => {
      switch (!0) {
        case !!(t && r):
          return {
            marginLeft: t * e.layoutMargin,
            marginRight: t * e.layoutMargin,
          };
        case !!(t && n):
          return {
            marginTop: t * e.layoutMargin,
            marginBottom: t * e.layoutMargin,
          };
        default:
          return {};
      }
    }
  ),
  Df = ({ col: e, row: t, outer: r, children: n, ...o }) => {
    let l = Lf(typeof r == 'number' || !r ? r : e || t);
    return a.createElement(_f, { col: e, row: t, outer: l, ...o }, n);
  },
  Ff = T.div(({ theme: e }) => ({ fontWeight: e.typography.weight.bold })),
  Mf = T.div(),
  $f = T.div(({ theme: e }) => ({
    padding: 30,
    textAlign: 'center',
    color: e.color.defaultText,
    fontSize: e.typography.size.s2 - 1,
  })),
  hc = ({ children: e, ...t }) => {
    let [r, n] = b.Children.toArray(e);
    return a.createElement(
      $f,
      { ...t },
      a.createElement(Ff, null, r),
      n && a.createElement(Mf, null, n)
    );
  },
  Bf = T.div(({ scale: e = 1, elementHeight: t }) => ({
    height: t || 'auto',
    transformOrigin: 'top left',
    transform: `scale(${1 / e})`,
  }));
function If({ scale: e, children: t }) {
  let r = b.useRef(null),
    [n, o] = b.useState(0),
    l = b.useCallback(
      ({ height: i }) => {
        i && o(i / e);
      },
      [e]
    );
  return (
    b.useEffect(() => {
      r.current && o(r.current.getBoundingClientRect().height);
    }, [e]),
    Us({ ref: r, onResize: l }),
    a.createElement(
      Bf,
      { scale: e, elementHeight: n },
      a.createElement(
        'div',
        { ref: r, className: 'innerZoomElementWrapper' },
        t
      )
    )
  );
}
var Nf = class extends b.Component {
    constructor() {
      super(...arguments), (this.iframe = null);
    }
    componentDidMount() {
      let { iFrameRef: e } = this.props;
      this.iframe = e.current;
    }
    shouldComponentUpdate(e) {
      let { scale: t, active: r } = this.props;
      return (
        t !== e.scale && this.setIframeInnerZoom(e.scale),
        r !== e.active &&
          this.iframe.setAttribute(
            'data-is-storybook',
            e.active ? 'true' : 'false'
          ),
        e.children.props.src !== this.props.children.props.src
      );
    }
    setIframeInnerZoom(e) {
      try {
        Object.assign(this.iframe.contentDocument.body.style, {
          width: `${e * 100}%`,
          height: `${e * 100}%`,
          transform: `scale(${1 / e})`,
          transformOrigin: 'top left',
        });
      } catch {
        this.setIframeZoom(e);
      }
    }
    setIframeZoom(e) {
      Object.assign(this.iframe.style, {
        width: `${e * 100}%`,
        height: `${e * 100}%`,
        transform: `scale(${1 / e})`,
        transformOrigin: 'top left',
      });
    }
    render() {
      let { children: e } = this.props;
      return a.createElement(a.Fragment, null, e);
    }
  },
  bc = { Element: If, IFrame: Nf },
  { document: Zf } = $5,
  Hf = T.strong(({ theme: e }) => ({ color: e.color.orange })),
  jf = T.strong(({ theme: e }) => ({
    color: e.color.ancillary,
    textDecoration: 'underline',
  })),
  jl = T.em(({ theme: e }) => ({ color: e.textMutedColor })),
  Pf = /(Error): (.*)\n/,
  Vf = /at (?:(.*) )?\(?(.+)\)?/,
  zf = /([^@]+)?(?:\/<)?@(.+)?/,
  qf = /([^@]+)?@(.+)?/,
  yc = ({ error: e }) => {
    if (!e)
      return a.createElement(
        b.Fragment,
        null,
        'This error has no stack or message'
      );
    if (!e.stack)
      return a.createElement(
        b.Fragment,
        null,
        e.message || 'This error has no stack or message'
      );
    let t = e.stack.toString();
    t &&
      e.message &&
      !t.includes(e.message) &&
      (t = `Error: ${e.message}

${t}`);
    let r = t.match(Pf);
    if (!r) return a.createElement(b.Fragment, null, t);
    let [, n, o] = r,
      l = t.split(/\n/).slice(1),
      [, ...i] = l
        .map((s) => {
          let c = s.match(Vf) || s.match(zf) || s.match(qf);
          return c
            ? {
                name: (c[1] || '').replace('/<', ''),
                location: c[2].replace(Zf.location.origin, ''),
              }
            : null;
        })
        .filter(Boolean);
    return a.createElement(
      b.Fragment,
      null,
      a.createElement('span', null, n),
      ': ',
      a.createElement(Hf, null, o),
      a.createElement('br', null),
      i.map((s, c) =>
        s.name
          ? a.createElement(
              b.Fragment,
              { key: c },
              '  ',
              'at ',
              a.createElement(jf, null, s.name),
              ' (',
              a.createElement(jl, null, s.location),
              ')',
              a.createElement('br', null)
            )
          : a.createElement(
              b.Fragment,
              { key: c },
              '  ',
              'at ',
              a.createElement(jl, null, s.location),
              a.createElement('br', null)
            )
      )
    );
  },
  vc = T.button(
    ({ small: e, theme: t }) => ({
      border: 0,
      borderRadius: '3em',
      cursor: 'pointer',
      display: 'inline-block',
      overflow: 'hidden',
      padding: e ? '8px 16px' : '13px 20px',
      position: 'relative',
      textAlign: 'center',
      textDecoration: 'none',
      transitionProperty: 'background, box-shadow',
      transitionDuration: '150ms',
      transitionTimingFunction: 'ease-out',
      verticalAlign: 'top',
      whiteSpace: 'nowrap',
      userSelect: 'none',
      opacity: 1,
      margin: 0,
      background: 'transparent',
      fontSize: `${e ? t.typography.size.s1 : t.typography.size.s2 - 1}px`,
      fontWeight: t.typography.weight.bold,
      lineHeight: '1',
      svg: {
        display: 'inline-block',
        height: e ? 12 : 14,
        width: e ? 12 : 14,
        verticalAlign: 'top',
        marginRight: e ? 4 : 6,
        marginTop: e ? 0 : -1,
        marginBottom: e ? 0 : -1,
        pointerEvents: 'none',
        path: { fill: 'currentColor' },
      },
    }),
    ({ disabled: e }) =>
      e
        ? {
            cursor: 'not-allowed !important',
            opacity: 0.5,
            '&:hover': { transform: 'none' },
          }
        : {},
    ({ containsIcon: e, small: t }) =>
      e
        ? {
            svg: { display: 'block', margin: 0 },
            ...(t ? { padding: 10 } : { padding: 13 }),
          }
        : {},
    ({ theme: e, primary: t, secondary: r, gray: n }) => {
      let o;
      return (
        n
          ? (o = e.color.mediumlight)
          : r
            ? (o = e.color.secondary)
            : t && (o = e.color.primary),
        o
          ? {
              background: o,
              color: n ? e.color.darkest : e.color.lightest,
              '&:hover': { background: qt(0.05, o) },
              '&:active': { boxShadow: 'rgba(0, 0, 0, 0.1) 0 0 0 3em inset' },
              '&:focus': {
                boxShadow: `${it(o, 1)} 0 1px 9px 2px`,
                outline: 'none',
              },
              '&:focus:hover': { boxShadow: `${it(o, 0.2)} 0 8px 18px 0px` },
            }
          : {}
      );
    },
    ({ theme: e, tertiary: t, inForm: r, small: n }) =>
      t
        ? {
            background: e.button.background,
            color: e.input.color,
            boxShadow: `${e.button.border} 0 0 0 1px inset`,
            borderRadius: e.input.borderRadius,
            ...(r && n ? { padding: '10px 16px' } : {}),
            '&:hover': {
              background:
                e.base === 'light'
                  ? qt(0.02, e.button.background)
                  : cf(0.03, e.button.background),
              ...(r
                ? {}
                : {
                    boxShadow:
                      'rgba(0,0,0,.2) 0 2px 6px 0, rgba(0,0,0,.1) 0 0 0 1px inset',
                  }),
            },
            '&:active': { background: e.button.background },
            '&:focus': {
              boxShadow: `${it(e.color.secondary, 1)} 0 0 0 1px inset`,
              outline: 'none',
            },
          }
        : {},
    ({ theme: e, outline: t }) =>
      t
        ? {
            boxShadow: `${ve(0.8, e.color.defaultText)} 0 0 0 1px inset`,
            color: ve(0.3, e.color.defaultText),
            background: 'transparent',
            '&:hover, &:focus': {
              boxShadow: `${ve(0.5, e.color.defaultText)} 0 0 0 1px inset`,
              outline: 'none',
            },
            '&:active': {
              boxShadow: `${ve(0.5, e.color.defaultText)} 0 0 0 2px inset`,
              color: ve(0, e.color.defaultText),
            },
          }
        : {},
    ({ theme: e, outline: t, primary: r }) => {
      let n = e.color.primary;
      return t && r
        ? {
            boxShadow: `${n} 0 0 0 1px inset`,
            color: n,
            'svg path:not([fill])': { fill: n },
            '&:hover': {
              boxShadow: `${n} 0 0 0 1px inset`,
              background: 'transparent',
            },
            '&:active': {
              background: n,
              boxShadow: `${n} 0 0 0 1px inset`,
              color: e.color.tertiary,
            },
            '&:focus': {
              boxShadow: `${n} 0 0 0 1px inset, ${it(n, 0.4)} 0 1px 9px 2px`,
              outline: 'none',
            },
            '&:focus:hover': {
              boxShadow: `${n} 0 0 0 1px inset, ${it(n, 0.2)} 0 8px 18px 0px`,
            },
          }
        : {};
    },
    ({ theme: e, outline: t, primary: r, secondary: n }) => {
      let o;
      return (
        n ? (o = e.color.secondary) : r && (o = e.color.primary),
        t && o
          ? {
              boxShadow: `${o} 0 0 0 1px inset`,
              color: o,
              'svg path:not([fill])': { fill: o },
              '&:hover': {
                boxShadow: `${o} 0 0 0 1px inset`,
                background: 'transparent',
              },
              '&:active': {
                background: o,
                boxShadow: `${o} 0 0 0 1px inset`,
                color: e.color.tertiary,
              },
              '&:focus': {
                boxShadow: `${o} 0 0 0 1px inset, ${it(o, 0.4)} 0 1px 9px 2px`,
                outline: 'none',
              },
              '&:focus:hover': {
                boxShadow: `${o} 0 0 0 1px inset, ${it(o, 0.2)} 0 8px 18px 0px`,
              },
            }
          : {}
      );
    }
  ),
  Uf = vc.withComponent('a'),
  Ec = Object.assign(
    b.forwardRef(function ({ isLink: e, children: t, ...r }, n) {
      return e
        ? a.createElement(Uf, { ...r, ref: n }, t)
        : a.createElement(vc, { ...r, ref: n }, t);
    }),
    { defaultProps: { isLink: !1 } }
  ),
  Wf = T.label(({ theme: e }) => ({
    display: 'flex',
    borderBottom: `1px solid ${e.appBorderColor}`,
    margin: '0 15px',
    padding: '8px 0',
    '&:last-child': { marginBottom: '3rem' },
  })),
  Gf = T.span(({ theme: e }) => ({
    minWidth: 100,
    fontWeight: e.typography.weight.bold,
    marginRight: 15,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    lineHeight: '16px',
  })),
  xc = ({ label: e, children: t, ...r }) =>
    a.createElement(
      Wf,
      { ...r },
      e ? a.createElement(Gf, null, a.createElement('span', null, e)) : null,
      t
    );
xc.defaultProps = { label: void 0 };
function La() {
  return (
    (La = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    La.apply(this, arguments)
  );
}
function Yf(e, t) {
  if (e == null) return {};
  var r = {},
    n = Object.keys(e),
    o,
    l;
  for (l = 0; l < n.length; l++)
    (o = n[l]), !(t.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
var Pl = function (e, t) {
    if (typeof e == 'function') {
      e(t);
      return;
    }
    e.current = t;
  },
  Kf = function (e, t) {
    var r = b.useRef();
    return b.useCallback(
      function (n) {
        (e.current = n),
          r.current && Pl(r.current, null),
          (r.current = t),
          t && Pl(t, n);
      },
      [t]
    );
  },
  Xf = Kf,
  Jf = function () {},
  Qf = [
    'cacheMeasurements',
    'maxRows',
    'minRows',
    'onChange',
    'onHeightChange',
  ],
  em = function (e, t) {
    e.cacheMeasurements, e.maxRows, e.minRows;
    var r = e.onChange,
      n = r === void 0 ? Jf : r;
    e.onHeightChange;
    var o = Yf(e, Qf);
    o.value;
    var l = b.useRef(null),
      i = Xf(l, t);
    return (
      b.useRef(0),
      b.useRef(),
      b.createElement('textarea', La({}, o, { onChange: n, ref: i }))
    );
  },
  tm = b.forwardRef(em),
  rm = {
    appearance: 'none',
    border: '0 none',
    boxSizing: 'inherit',
    display: ' block',
    margin: ' 0',
    background: 'transparent',
    padding: 0,
    fontSize: 'inherit',
    position: 'relative',
  },
  Ro = ({ theme: e }) => ({
    ...rm,
    transition: 'box-shadow 200ms ease-out, opacity 200ms ease-out',
    color: e.input.color || 'inherit',
    background: e.input.background,
    boxShadow: `${e.input.border} 0 0 0 1px inset`,
    borderRadius: e.input.borderRadius,
    fontSize: e.typography.size.s2 - 1,
    lineHeight: '20px',
    padding: '6px 10px',
    boxSizing: 'border-box',
    height: 32,
    '&[type="file"]': { height: 'auto' },
    '&:focus': {
      boxShadow: `${e.color.secondary} 0 0 0 1px inset`,
      outline: 'none',
    },
    '&[disabled]': { cursor: 'not-allowed', opacity: 0.5 },
    '&:-webkit-autofill': {
      WebkitBoxShadow: `0 0 0 3em ${e.color.lightest} inset`,
    },
    '&::placeholder': { color: e.textMutedColor, opacity: 1 },
  }),
  wn = ({ size: e }) => {
    switch (e) {
      case '100%':
        return { width: '100%' };
      case 'flex':
        return { flex: 1 };
      case 'auto':
      default:
        return { display: 'inline' };
    }
  },
  Ac = ({ align: e }) => {
    switch (e) {
      case 'end':
        return { textAlign: 'right' };
      case 'center':
        return { textAlign: 'center' };
      case 'start':
      default:
        return { textAlign: 'left' };
    }
  },
  Cn = ({ valid: e, theme: t }) => {
    switch (e) {
      case 'valid':
        return { boxShadow: `${t.color.positive} 0 0 0 1px inset !important` };
      case 'error':
        return { boxShadow: `${t.color.negative} 0 0 0 1px inset !important` };
      case 'warn':
        return { boxShadow: `${t.color.warning} 0 0 0 1px inset` };
      case void 0:
      case null:
      default:
        return {};
    }
  },
  nm = Object.assign(
    T(
      b.forwardRef(function ({ size: e, valid: t, align: r, ...n }, o) {
        return a.createElement('input', { ...n, ref: o });
      })
    )(Ro, wn, Ac, Cn, { minHeight: 32 }),
    { displayName: 'Input' }
  ),
  am = Object.assign(
    T(
      b.forwardRef(function ({ size: e, valid: t, align: r, ...n }, o) {
        return a.createElement('select', { ...n, ref: o });
      })
    )(Ro, wn, Cn, {
      height: 32,
      userSelect: 'none',
      paddingRight: 20,
      appearance: 'menulist',
    }),
    { displayName: 'Select' }
  ),
  om = Object.assign(
    T(
      b.forwardRef(function ({ size: e, valid: t, align: r, ...n }, o) {
        return a.createElement(tm, { ...n, ref: o });
      })
    )(Ro, wn, Ac, Cn, ({ height: e = 400 }) => ({
      overflow: 'visible',
      maxHeight: e,
    })),
    { displayName: 'Textarea' }
  ),
  lm = T(
    b.forwardRef(function ({ size: e, valid: t, align: r, ...n }, o) {
      return a.createElement(Ec, { ...n, ref: o });
    })
  )(wn, Cn, {
    userSelect: 'none',
    overflow: 'visible',
    zIndex: 2,
    '&:hover': { transform: 'none' },
  }),
  im = Object.assign(
    b.forwardRef(function (e, t) {
      return a.createElement(lm, {
        ...e,
        tertiary: !0,
        small: !0,
        inForm: !0,
        ref: t,
      });
    }),
    { displayName: 'Button' }
  ),
  Ne = Object.assign(T.form({ boxSizing: 'border-box', width: '100%' }), {
    Field: xc,
    Input: nm,
    Select: am,
    Textarea: om,
    Button: im,
  }),
  sm = b.lazy(() =>
    yt(
      () => import('./WithTooltip-V3YHNWJZ-f17dee65.js'),
      [
        './WithTooltip-V3YHNWJZ-f17dee65.js',
        './iframe-d50da200.js',
        './index-76fb7be0.js',
        './_commonjsHelpers-de833af9.js',
        './react-18-988a5df2.js',
        './index-d3ea75b5.js',
        './_basePickBy-2c05180b.js',
        './_getPrototype-aecc109d.js',
        './_commonjs-dynamic-modules-302442b1.js',
        './index-b75c9059.js',
        './extends-98964cd2.js',
        './index-356e4a49.js',
        './index-c457595d.js',
      ],
      import.meta.url
    ).then((e) => ({ default: e.WithTooltip }))
  ),
  cm = (e) =>
    a.createElement(
      b.Suspense,
      { fallback: a.createElement('div', null) },
      a.createElement(sm, { ...e })
    ),
  um = b.lazy(() =>
    yt(
      () => import('./WithTooltip-V3YHNWJZ-f17dee65.js'),
      [
        './WithTooltip-V3YHNWJZ-f17dee65.js',
        './iframe-d50da200.js',
        './index-76fb7be0.js',
        './_commonjsHelpers-de833af9.js',
        './react-18-988a5df2.js',
        './index-d3ea75b5.js',
        './_basePickBy-2c05180b.js',
        './_getPrototype-aecc109d.js',
        './_commonjs-dynamic-modules-302442b1.js',
        './index-b75c9059.js',
        './extends-98964cd2.js',
        './index-356e4a49.js',
        './index-c457595d.js',
      ],
      import.meta.url
    ).then((e) => ({ default: e.WithTooltipPure }))
  ),
  wc = (e) =>
    a.createElement(
      b.Suspense,
      { fallback: a.createElement('div', null) },
      a.createElement(um, { ...e })
    ),
  dm = T.div(({ theme: e }) => ({ fontWeight: e.typography.weight.bold })),
  pm = T.span(),
  fm = T.div(({ theme: e }) => ({
    marginTop: 8,
    textAlign: 'center',
    '> *': { margin: '0 8px', fontWeight: e.typography.weight.bold },
  })),
  mm = T.div(({ theme: e }) => ({
    color: e.color.defaultText,
    lineHeight: '18px',
  })),
  gm = T.div({ padding: 15, width: 280, boxSizing: 'border-box' }),
  Cc = ({ title: e, desc: t, links: r }) =>
    a.createElement(
      gm,
      null,
      a.createElement(
        mm,
        null,
        e && a.createElement(dm, null, e),
        t && a.createElement(pm, null, t)
      ),
      r &&
        a.createElement(
          fm,
          null,
          r.map(({ title: n, ...o }) =>
            a.createElement(bt, { ...o, key: n }, n)
          )
        )
    );
Cc.defaultProps = { title: null, desc: null, links: null };
var hm = T.div(({ theme: e }) => ({
    padding: '2px 6px',
    lineHeight: '16px',
    fontSize: 10,
    fontWeight: e.typography.weight.bold,
    color: e.color.lightest,
    boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.3)',
    borderRadius: 4,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    zIndex: -1,
    background:
      e.base === 'light' ? 'rgba(60, 60, 60, 0.9)' : 'rgba(0, 0, 0, 0.95)',
    margin: 6,
  })),
  bm = ({ note: e, ...t }) => a.createElement(hm, { ...t }, e),
  ym = T(({ active: e, loading: t, disabled: r, ...n }) =>
    a.createElement('span', { ...n })
  )(
    ({ theme: e }) => ({
      color: e.color.defaultText,
      fontWeight: e.typography.weight.regular,
    }),
    ({ active: e, theme: t }) =>
      e
        ? { color: t.color.secondary, fontWeight: t.typography.weight.bold }
        : {},
    ({ loading: e, theme: t }) =>
      e
        ? { display: 'inline-block', flex: 'none', ...t.animation.inlineGlow }
        : {},
    ({ disabled: e, theme: t }) =>
      e ? { color: ve(0.7, t.color.defaultText) } : {}
  ),
  vm = T.span({
    display: 'flex',
    '& svg': { height: 12, width: 12, margin: '3px 0', verticalAlign: 'top' },
    '& path': { fill: 'inherit' },
  }),
  Em = T.span(
    { flex: 1, textAlign: 'left', display: 'flex', flexDirection: 'column' },
    ({ isIndented: e }) => (e ? { marginLeft: 24 } : {})
  ),
  xm = T.span(
    ({ theme: e }) => ({ fontSize: '11px', lineHeight: '14px' }),
    ({ active: e, theme: t }) => (e ? { color: t.color.secondary } : {}),
    ({ theme: e, disabled: t }) => (t ? { color: e.textMutedColor } : {})
  ),
  Vl = T.span(
    ({ active: e, theme: t }) =>
      e
        ? {
            '& svg': { opacity: 1 },
            '& svg path:not([fill])': { fill: t.color.secondary },
          }
        : {},
    () => ({ display: 'flex', maxWidth: 14 })
  ),
  Am = T.a(
    ({ theme: e }) => ({
      fontSize: e.typography.size.s1,
      transition: 'all 150ms ease-out',
      color: e.color.dark,
      textDecoration: 'none',
      cursor: 'pointer',
      justifyContent: 'space-between',
      lineHeight: '18px',
      padding: '7px 10px',
      display: 'flex',
      alignItems: 'center',
      '& > * + *': { paddingLeft: 10 },
      '&:hover': { background: e.background.hoverable },
      '&:hover svg': { opacity: 1 },
    }),
    ({ disabled: e }) => (e ? { cursor: 'not-allowed' } : {})
  ),
  wm = tr(100)((e, t, r) => {
    let n = {};
    return (
      e && Object.assign(n, { onClick: e }),
      t && Object.assign(n, { href: t }),
      r && t && Object.assign(n, { to: t, as: r }),
      n
    );
  }),
  Sc = ({
    loading: e,
    left: t,
    title: r,
    center: n,
    right: o,
    icon: l,
    active: i,
    disabled: s,
    isIndented: c,
    href: u,
    onClick: d,
    LinkWrapper: h,
    ...m
  }) => {
    let p = wm(d, u, h),
      g = { active: i, disabled: s },
      f = typeof l == 'string' && Sr[l];
    return a.createElement(
      Am,
      { ...g, ...m, ...p },
      l
        ? a.createElement(
            Vl,
            { ...g },
            f ? a.createElement(ye, { icon: l }) : l
          )
        : t && a.createElement(Vl, { ...g }, t),
      r || n
        ? a.createElement(
            Em,
            { isIndented: !t && !l && c },
            r && a.createElement(ym, { ...g, loading: e }, r),
            n && a.createElement(xm, { ...g }, n)
          )
        : null,
      o && a.createElement(vm, { ...g }, o)
    );
  };
Sc.defaultProps = {
  loading: !1,
  left: null,
  title: a.createElement('span', null, 'Loading state'),
  center: null,
  right: null,
  active: !1,
  disabled: !1,
  href: null,
  LinkWrapper: null,
  onClick: null,
};
var Oo = Sc,
  Cm = T.div(
    {
      minWidth: 180,
      overflow: 'hidden',
      overflowY: 'auto',
      maxHeight: 15.5 * 32,
    },
    ({ theme: e }) => ({ borderRadius: e.appBorderRadius })
  ),
  Sm = (e) => {
    let { LinkWrapper: t, onClick: r, id: n, isIndented: o, ...l } = e,
      { title: i, href: s, active: c } = l,
      u = b.useCallback(
        (h) => {
          r(h, l);
        },
        [r]
      ),
      d = !!r;
    return a.createElement(Oo, {
      title: i,
      active: c,
      href: s,
      id: `list-item-${n}`,
      LinkWrapper: t,
      isIndented: o,
      ...l,
      ...(d ? { onClick: u } : {}),
    });
  },
  Lo = ({ links: e, LinkWrapper: t }) => {
    let r = e.some((n) => n.left || n.icon);
    return a.createElement(
      Cm,
      null,
      e.map(({ isGatsby: n, ...o }) =>
        a.createElement(Sm, {
          key: o.id,
          LinkWrapper: n ? t : null,
          isIndented: r,
          ...o,
        })
      )
    );
  };
Lo.defaultProps = { LinkWrapper: Oo.defaultProps.LinkWrapper };
var _o = a.forwardRef(({ children: e, ...t }, r) =>
  t.href != null
    ? a.createElement('a', { ref: r, ...t }, e)
    : a.createElement('button', { ref: r, type: 'button', ...t }, e)
);
_o.displayName = 'ButtonOrLink';
var Fr = T(_o, { shouldForwardProp: Ya })(
  {
    whiteSpace: 'normal',
    display: 'inline-flex',
    overflow: 'hidden',
    verticalAlign: 'top',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textDecoration: 'none',
    '&:empty': { display: 'none' },
  },
  ({ theme: e }) => ({
    padding: '0 15px',
    transition: 'color 0.2s linear, border-bottom-color 0.2s linear',
    height: 40,
    lineHeight: '12px',
    cursor: 'pointer',
    background: 'transparent',
    border: '0 solid transparent',
    borderTop: '3px solid transparent',
    borderBottom: '3px solid transparent',
    fontWeight: 'bold',
    fontSize: 13,
    '&:focus': { outline: '0 none', borderBottomColor: e.color.secondary },
  }),
  ({ active: e, textColor: t, theme: r }) =>
    e
      ? {
          color: t || r.barSelectedColor,
          borderBottomColor: r.barSelectedColor,
        }
      : { color: t || r.barTextColor, borderBottomColor: 'transparent' }
);
Fr.displayName = 'TabButton';
var Ft = T(_o, { shouldForwardProp: Ya })(
  () => ({
    alignItems: 'center',
    background: 'transparent',
    border: 'none',
    borderRadius: 4,
    color: 'inherit',
    cursor: 'pointer',
    display: 'inline-flex',
    fontSize: 13,
    fontWeight: 'bold',
    height: 28,
    justifyContent: 'center',
    marginTop: 6,
    padding: '8px 7px',
    '& > svg': { width: 14 },
  }),
  ({ active: e, theme: t }) =>
    e
      ? { backgroundColor: t.background.hoverable, color: t.barSelectedColor }
      : {},
  ({ disabled: e, theme: t }) =>
    e
      ? { opacity: 0.5, cursor: 'not-allowed' }
      : {
          '&:hover, &:focus-visible': {
            background: ve(0.88, t.color.secondary),
            color: t.barHoverColor,
          },
          '&:focus-visible': { outline: En },
          '&:focus:not(:focus-visible)': { outline: 'none' },
        }
);
Ft.displayName = 'IconButton';
var km = T.div(({ theme: e }) => ({
    width: 14,
    height: 14,
    backgroundColor: e.appBorderColor,
    animation: `${e.animation.glow} 1.5s ease-in-out infinite`,
  })),
  Tm = T.div(() => ({ marginTop: 6, padding: 7, height: 28 })),
  kc = () => a.createElement(Tm, null, a.createElement(km, null)),
  _a = T.div(
    {
      display: 'flex',
      whiteSpace: 'nowrap',
      flexBasis: 'auto',
      marginLeft: 3,
      marginRight: 3,
    },
    ({ scrollable: e }) => (e ? { flexShrink: 0 } : {}),
    ({ left: e }) => (e ? { '& > *': { marginLeft: 4 } } : {}),
    ({ right: e }) => (e ? { marginLeft: 30, '& > *': { marginRight: 4 } } : {})
  );
_a.displayName = 'Side';
var Rm = ({ children: e, className: t, scrollable: r }) =>
    r
      ? a.createElement(po, { vertical: !1, className: t }, e)
      : a.createElement('div', { className: t }, e),
  Do = T(Rm)(
    ({ theme: e, scrollable: t = !0 }) => ({
      color: e.barTextColor,
      width: '100%',
      height: 40,
      flexShrink: 0,
      overflow: t ? 'auto' : 'hidden',
      overflowY: 'hidden',
    }),
    ({ theme: e, border: t = !1 }) =>
      t
        ? {
            boxShadow: `${e.appBorderColor}  0 -1px 0 0 inset`,
            background: e.barBg,
          }
        : {}
  );
Do.displayName = 'Bar';
var Om = T.div(({ bgColor: e }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    flexWrap: 'nowrap',
    flexShrink: 0,
    height: 40,
    backgroundColor: e || '',
  })),
  Sn = ({ children: e, backgroundColor: t, ...r }) => {
    let [n, o] = b.Children.toArray(e);
    return a.createElement(
      Do,
      { ...r },
      a.createElement(
        Om,
        { bgColor: t },
        a.createElement(_a, { scrollable: r.scrollable, left: !0 }, n),
        o ? a.createElement(_a, { right: !0 }, o) : null
      )
    );
  };
Sn.displayName = 'FlexBar';
var Tc = T.div(({ active: e }) =>
    e ? { display: 'block' } : { display: 'none' }
  ),
  zl = (e) =>
    b.Children.toArray(e).map(
      ({ props: { title: t, id: r, color: n, children: o } }) => {
        let l = Array.isArray(o) ? o[0] : o;
        return {
          title: t,
          id: r,
          ...(n ? { color: n } : {}),
          render:
            typeof l == 'function'
              ? l
              : ({ active: i }) =>
                  a.createElement(Tc, { active: i, role: 'tabpanel' }, l),
        };
      }
    ),
  Lm = T.span(({ theme: e, isActive: t }) => ({
    display: 'inline-block',
    width: 0,
    height: 0,
    marginLeft: 8,
    color: t ? e.color.secondary : e.color.mediumdark,
    borderRight: '3px solid transparent',
    borderLeft: '3px solid transparent',
    borderTop: '3px solid',
    transition: 'transform .1s ease-out',
  })),
  _m = T(Fr)(
    ({ active: e, theme: t, preActive: r }) => `
    color: ${r || e ? t.color.secondary : t.color.mediumdark};
    &:hover {
      color: ${t.color.secondary};
      .addon-collapsible-icon {
        color: ${t.color.secondary};
      }
    }
  `
  );
function Dm(e) {
  let t = b.useRef(),
    r = b.useRef(),
    n = b.useRef(new Map()),
    { width: o = 1 } = Us({ ref: t }),
    [l, i] = b.useState(e),
    [s, c] = b.useState([]),
    u = b.useRef(e),
    d = b.useCallback(
      ({ menuName: m, actions: p }) => {
        let g = s.some(({ active: w }) => w),
          [f, A] = b.useState(!1);
        return a.createElement(
          a.Fragment,
          null,
          a.createElement(
            F5,
            {
              interactive: !0,
              visible: f,
              onVisibleChange: A,
              placement: 'bottom',
              delayHide: 100,
              tooltip: a.createElement(Lo, {
                links: s.map(({ title: w, id: v, color: y, active: x }) => ({
                  id: v,
                  title: w,
                  color: y,
                  active: x,
                  onClick: (E) => {
                    E.preventDefault(), p.onSelect(v);
                  },
                })),
              }),
            },
            a.createElement(
              _m,
              {
                ref: r,
                active: g,
                preActive: f,
                style: { visibility: s.length ? 'visible' : 'hidden' },
                'aria-hidden': !s.length,
                className: 'tabbutton',
                type: 'button',
                role: 'tab',
              },
              m,
              a.createElement(Lm, {
                className: 'addon-collapsible-icon',
                isActive: g || f,
              })
            )
          ),
          s.map(({ title: w, id: v, color: y }, x) => {
            let E = `index-${x}`;
            return a.createElement(
              Fr,
              {
                id: `tabbutton-${Mi(v) ?? E}`,
                style: { visibility: 'hidden' },
                'aria-hidden': !0,
                tabIndex: -1,
                ref: (C) => {
                  n.current.set(v, C);
                },
                className: 'tabbutton',
                type: 'button',
                key: v,
                textColor: y,
                role: 'tab',
              },
              w
            );
          })
        );
      },
      [s]
    ),
    h = b.useCallback(() => {
      if (!t.current || !r.current) return;
      let { x: m, width: p } = t.current.getBoundingClientRect(),
        { width: g } = r.current.getBoundingClientRect(),
        f = s.length ? m + p - g : m + p,
        A = [],
        w = 0,
        v = e.filter((y) => {
          let { id: x } = y,
            E = n.current.get(x),
            { width: C = 0 } =
              (E == null ? void 0 : E.getBoundingClientRect()) || {},
            S = m + w + C > f;
          return (!S || !E) && A.push(y), (w += C), S;
        });
      (A.length !== l.length || u.current !== e) &&
        (i(A), c(v), (u.current = e));
    }, [s.length, e, l]);
  return (
    b.useLayoutEffect(h, [h, o]),
    {
      tabRefs: n,
      addonsRef: r,
      tabBarRef: t,
      visibleList: l,
      invisibleList: s,
      AddonTab: d,
    }
  );
}
var Fm =
    '/* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */',
  Mm = T.div(
    ({ theme: e, bordered: t }) =>
      t
        ? {
            backgroundClip: 'padding-box',
            border: `1px solid ${e.appBorderColor}`,
            borderRadius: e.appBorderRadius,
            overflow: 'hidden',
            boxSizing: 'border-box',
          }
        : {},
    ({ absolute: e }) =>
      e
        ? {
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
          }
        : { display: 'block' }
  ),
  Fo = T.div({
    overflow: 'hidden',
    '&:first-of-type': { marginLeft: -3 },
    whiteSpace: 'nowrap',
    flexGrow: 1,
  });
Fo.displayName = 'TabBar';
var $m = T.div(
    { display: 'block', position: 'relative' },
    ({ theme: e }) => ({
      fontSize: e.typography.size.s2 - 1,
      background: e.background.content,
    }),
    ({ bordered: e, theme: t }) =>
      e
        ? {
            borderRadius: `0 0 ${t.appBorderRadius - 1}px ${t.appBorderRadius - 1}px`,
          }
        : {},
    ({ absolute: e, bordered: t }) =>
      e
        ? {
            height: `calc(100% - ${t ? 42 : 40}px)`,
            position: 'absolute',
            left: 0 + (t ? 1 : 0),
            right: 0 + (t ? 1 : 0),
            bottom: 0 + (t ? 1 : 0),
            top: 40 + (t ? 1 : 0),
            overflow: 'auto',
            [`& > *:first-child${Fm}`]: {
              position: 'absolute',
              left: 0 + (t ? 1 : 0),
              right: 0 + (t ? 1 : 0),
              bottom: 0 + (t ? 1 : 0),
              top: 0 + (t ? 1 : 0),
              height: `calc(100% - ${t ? 2 : 0}px)`,
              overflow: 'auto',
            },
          }
        : {}
  ),
  Bm = ({ active: e, render: t, children: r }) =>
    a.createElement(Tc, { active: e }, t ? t() : r),
  kn = b.memo(
    ({
      children: e,
      selected: t,
      actions: r,
      absolute: n,
      bordered: o,
      tools: l,
      backgroundColor: i,
      id: s,
      menuName: c,
    }) => {
      let u = zl(e).map((f) => f.id),
        d = b.useMemo(
          () =>
            zl(e).map((f, A) => ({ ...f, active: t ? f.id === t : A === 0 })),
          [t, ...u]
        ),
        { visibleList: h, tabBarRef: m, tabRefs: p, AddonTab: g } = Dm(d);
      return d.length
        ? a.createElement(
            Mm,
            { absolute: n, bordered: o, id: s },
            a.createElement(
              Sn,
              { scrollable: !1, border: !0, backgroundColor: i },
              a.createElement(
                Fo,
                { style: { whiteSpace: 'normal' }, ref: m, role: 'tablist' },
                h.map(({ title: f, id: A, active: w, color: v }, y) => {
                  let x = `index-${y}`;
                  return a.createElement(
                    Fr,
                    {
                      id: `tabbutton-${Mi(A) ?? x}`,
                      ref: (E) => {
                        p.current.set(A, E);
                      },
                      className: `tabbutton ${w ? 'tabbutton-active' : ''}`,
                      type: 'button',
                      key: A,
                      active: w,
                      textColor: v,
                      onClick: (E) => {
                        E.preventDefault(), r.onSelect(A);
                      },
                      role: 'tab',
                    },
                    typeof f == 'function' ? a.createElement('title', null) : f
                  );
                }),
                a.createElement(g, { menuName: c, actions: r })
              ),
              l
            ),
            a.createElement(
              $m,
              { id: 'panel-tab-content', bordered: o, absolute: n },
              d.map(({ id: f, active: A, render: w }) =>
                a.createElement(w, { key: f, active: A }, null)
              )
            )
          )
        : a.createElement(
            hc,
            null,
            a.createElement(b.Fragment, { key: 'title' }, 'Nothing found')
          );
    }
  );
kn.displayName = 'Tabs';
kn.defaultProps = {
  id: null,
  children: null,
  tools: null,
  selected: null,
  absolute: !1,
  bordered: !1,
  menuName: 'Tabs',
};
var Rc = class extends b.Component {
  constructor(e) {
    super(e),
      (this.handlers = { onSelect: (t) => this.setState({ selected: t }) }),
      (this.state = { selected: e.initial });
  }
  render() {
    let {
        bordered: e = !1,
        absolute: t = !1,
        children: r,
        backgroundColor: n,
        menuName: o,
      } = this.props,
      { selected: l } = this.state;
    return a.createElement(
      kn,
      {
        bordered: e,
        absolute: t,
        selected: l,
        backgroundColor: n,
        menuName: o,
        actions: this.handlers,
      },
      r
    );
  }
};
Rc.defaultProps = {
  children: [],
  initial: null,
  absolute: !1,
  bordered: !1,
  backgroundColor: '',
  menuName: void 0,
};
var Mo = T.span(
  ({ theme: e }) => ({
    width: 1,
    height: 20,
    background: e.appBorderColor,
    marginTop: 10,
    marginLeft: 6,
    marginRight: 2,
  }),
  ({ force: e }) => (e ? {} : { '& + &': { display: 'none' } })
);
Mo.displayName = 'Separator';
var Im = (e) =>
    e.reduce(
      (t, r, n) =>
        r
          ? a.createElement(
              b.Fragment,
              { key: r.id || r.key || `f-${n}` },
              t,
              n > 0 ? a.createElement(Mo, { key: `s-${n}` }) : null,
              r.render() || r
            )
          : t,
      null
    ),
  Nm = (e) => {
    let t = b.useRef();
    return (
      b.useEffect(() => {
        t.current = e;
      }, [e]),
      t.current
    );
  },
  Zm = (e, t) => {
    let r = Nm(t);
    return e ? t : r;
  },
  Hm = ({ active: e, children: t }) =>
    a.createElement('div', { hidden: !e }, Zm(e, t)),
  jm = ({ alt: e, ...t }) =>
    a.createElement(
      'svg',
      {
        width: '200px',
        height: '40px',
        viewBox: '0 0 200 40',
        ...t,
        role: 'img',
      },
      e ? a.createElement('title', null, e) : null,
      a.createElement(
        'defs',
        null,
        a.createElement('path', {
          d: 'M1.2 36.9L0 3.9c0-1.1.8-2 1.9-2.1l28-1.8a2 2 0 0 1 2.2 1.9 2 2 0 0 1 0 .1v36a2 2 0 0 1-2 2 2 2 0 0 1-.1 0L3.2 38.8a2 2 0 0 1-2-2z',
          id: 'a',
        })
      ),
      a.createElement(
        'g',
        { fill: 'none', fillRule: 'evenodd' },
        a.createElement('path', {
          d: 'M53.3 31.7c-1.7 0-3.4-.3-5-.7-1.5-.5-2.8-1.1-3.9-2l1.6-3.5c2.2 1.5 4.6 2.3 7.3 2.3 1.5 0 2.5-.2 3.3-.7.7-.5 1.1-1 1.1-1.9 0-.7-.3-1.3-1-1.7s-2-.8-3.7-1.2c-2-.4-3.6-.9-4.8-1.5-1.1-.5-2-1.2-2.6-2-.5-1-.8-2-.8-3.2 0-1.4.4-2.6 1.2-3.6.7-1.1 1.8-2 3.2-2.6 1.3-.6 2.9-.9 4.7-.9 1.6 0 3.1.3 4.6.7 1.5.5 2.7 1.1 3.5 2l-1.6 3.5c-2-1.5-4.2-2.3-6.5-2.3-1.3 0-2.3.2-3 .8-.8.5-1.2 1.1-1.2 2 0 .5.2 1 .5 1.3.2.3.7.6 1.4.9l2.9.8c2.9.6 5 1.4 6.2 2.4a5 5 0 0 1 2 4.2 6 6 0 0 1-2.5 5c-1.7 1.2-4 1.9-7 1.9zm21-3.6l1.4-.1-.2 3.5-1.9.1c-2.4 0-4.1-.5-5.2-1.5-1.1-1-1.6-2.7-1.6-4.8v-6h-3v-3.6h3V11h4.8v4.6h4v3.6h-4v6c0 1.8.9 2.8 2.6 2.8zm11.1 3.5c-1.6 0-3-.3-4.3-1a7 7 0 0 1-3-2.8c-.6-1.3-1-2.7-1-4.4 0-1.6.4-3 1-4.3a7 7 0 0 1 3-2.8c1.2-.7 2.7-1 4.3-1 1.7 0 3.2.3 4.4 1a7 7 0 0 1 3 2.8c.6 1.2 1 2.7 1 4.3 0 1.7-.4 3.1-1 4.4a7 7 0 0 1-3 2.8c-1.2.7-2.7 1-4.4 1zm0-3.6c2.4 0 3.6-1.6 3.6-4.6 0-1.5-.3-2.6-1-3.4a3.2 3.2 0 0 0-2.6-1c-2.3 0-3.5 1.4-3.5 4.4 0 3 1.2 4.6 3.5 4.6zm21.7-8.8l-2.7.3c-1.3.2-2.3.5-2.8 1.2-.6.6-.9 1.4-.9 2.5v8.2H96V15.7h4.6v2.6c.8-1.8 2.5-2.8 5-3h1.3l.3 4zm14-3.5h4.8L116.4 37h-4.9l3-6.6-6.4-14.8h5l4 10 4-10zm16-.4c1.4 0 2.6.3 3.6 1 1 .6 1.9 1.6 2.5 2.8.6 1.2.9 2.7.9 4.3 0 1.6-.3 3-1 4.3a6.9 6.9 0 0 1-2.4 2.9c-1 .7-2.2 1-3.6 1-1 0-2-.2-3-.7-.8-.4-1.5-1-2-1.9v2.4h-4.7V8.8h4.8v9c.5-.8 1.2-1.4 2-1.9.9-.4 1.8-.6 3-.6zM135.7 28c1.1 0 2-.4 2.6-1.2.6-.8 1-2 1-3.4 0-1.5-.4-2.5-1-3.3s-1.5-1.1-2.6-1.1-2 .3-2.6 1.1c-.6.8-1 2-1 3.3 0 1.5.4 2.6 1 3.4.6.8 1.5 1.2 2.6 1.2zm18.9 3.6c-1.7 0-3.2-.3-4.4-1a7 7 0 0 1-3-2.8c-.6-1.3-1-2.7-1-4.4 0-1.6.4-3 1-4.3a7 7 0 0 1 3-2.8c1.2-.7 2.7-1 4.4-1 1.6 0 3 .3 4.3 1a7 7 0 0 1 3 2.8c.6 1.2 1 2.7 1 4.3 0 1.7-.4 3.1-1 4.4a7 7 0 0 1-3 2.8c-1.2.7-2.7 1-4.3 1zm0-3.6c2.3 0 3.5-1.6 3.5-4.6 0-1.5-.3-2.6-1-3.4a3.2 3.2 0 0 0-2.5-1c-2.4 0-3.6 1.4-3.6 4.4 0 3 1.2 4.6 3.6 4.6zm18 3.6c-1.7 0-3.2-.3-4.4-1a7 7 0 0 1-3-2.8c-.6-1.3-1-2.7-1-4.4 0-1.6.4-3 1-4.3a7 7 0 0 1 3-2.8c1.2-.7 2.7-1 4.4-1 1.6 0 3 .3 4.4 1a7 7 0 0 1 2.9 2.8c.6 1.2 1 2.7 1 4.3 0 1.7-.4 3.1-1 4.4a7 7 0 0 1-3 2.8c-1.2.7-2.7 1-4.3 1zm0-3.6c2.3 0 3.5-1.6 3.5-4.6 0-1.5-.3-2.6-1-3.4a3.2 3.2 0 0 0-2.5-1c-2.4 0-3.6 1.4-3.6 4.4 0 3 1.2 4.6 3.6 4.6zm27.4 3.4h-6l-6-7v7h-4.8V8.8h4.9v13.6l5.8-6.7h5.7l-6.6 7.5 7 8.2z',
          fill: 'currentColor',
        }),
        a.createElement(
          'mask',
          { id: 'b', fill: '#fff' },
          a.createElement('use', { xlinkHref: '#a' })
        ),
        a.createElement('use', {
          fill: '#FF4785',
          fillRule: 'nonzero',
          xlinkHref: '#a',
        }),
        a.createElement('path', {
          d: 'M23.7 5L24 .2l3.9-.3.1 4.8a.3.3 0 0 1-.5.2L26 3.8l-1.7 1.4a.3.3 0 0 1-.5-.3zm-5 10c0 .9 5.3.5 6 0 0-5.4-2.8-8.2-8-8.2-5.3 0-8.2 2.8-8.2 7.1 0 7.4 10 7.6 10 11.6 0 1.2-.5 1.9-1.8 1.9-1.6 0-2.2-.9-2.1-3.6 0-.6-6.1-.8-6.3 0-.5 6.7 3.7 8.6 8.5 8.6 4.6 0 8.3-2.5 8.3-7 0-7.9-10.2-7.7-10.2-11.6 0-1.6 1.2-1.8 2-1.8.6 0 2 0 1.9 3z',
          fill: '#FFF',
          fillRule: 'nonzero',
          mask: 'url(#b)',
        })
      )
    ),
  Pm = ({ ...e }) =>
    a.createElement(
      'svg',
      { viewBox: '0 0 64 64', ...e },
      a.createElement('title', null, 'Storybook icon'),
      a.createElement(
        'g',
        {
          id: 'Artboard',
          stroke: 'none',
          strokeWidth: '1',
          fill: 'none',
          fillRule: 'evenodd',
        },
        a.createElement('path', {
          d: 'M8.04798541,58.7875918 L6.07908839,6.32540407 C6.01406344,4.5927838 7.34257463,3.12440831 9.07303814,3.01625434 L53.6958037,0.227331489 C55.457209,0.117243658 56.974354,1.45590096 57.0844418,3.21730626 C57.0885895,3.28366922 57.0906648,3.35014546 57.0906648,3.41663791 L57.0906648,60.5834697 C57.0906648,62.3483119 55.6599776,63.7789992 53.8951354,63.7789992 C53.847325,63.7789992 53.7995207,63.7779262 53.7517585,63.775781 L11.0978899,61.8600599 C9.43669044,61.7854501 8.11034889,60.4492961 8.04798541,58.7875918 Z',
          id: 'path-1',
          fill: '#FF4785',
          fillRule: 'nonzero',
        }),
        a.createElement('path', {
          d: 'M35.9095005,24.1768792 C35.9095005,25.420127 44.2838488,24.8242707 45.4080313,23.9509748 C45.4080313,15.4847538 40.8652557,11.0358878 32.5466666,11.0358878 C24.2280775,11.0358878 19.5673077,15.553972 19.5673077,22.3311017 C19.5673077,34.1346028 35.4965208,34.3605071 35.4965208,40.7987804 C35.4965208,42.606015 34.6115646,43.6790606 32.6646607,43.6790606 C30.127786,43.6790606 29.1248356,42.3834613 29.2428298,37.9783269 C29.2428298,37.0226907 19.5673077,36.7247626 19.2723223,37.9783269 C18.5211693,48.6535354 25.1720308,51.7326752 32.7826549,51.7326752 C40.1572906,51.7326752 45.939005,47.8018145 45.939005,40.6858282 C45.939005,28.035186 29.7738035,28.3740425 29.7738035,22.1051974 C29.7738035,19.5637737 31.6617103,19.2249173 32.7826549,19.2249173 C33.9625966,19.2249173 36.0864917,19.4328883 35.9095005,24.1768792 Z',
          id: 'path9_fill-path',
          fill: '#FFFFFF',
          fillRule: 'nonzero',
        }),
        a.createElement('path', {
          d: 'M44.0461638,0.830433986 L50.1874092,0.446606143 L50.443532,7.7810017 C50.4527198,8.04410717 50.2468789,8.26484453 49.9837734,8.27403237 C49.871115,8.27796649 49.7607078,8.24184808 49.6721567,8.17209069 L47.3089847,6.3104681 L44.5110468,8.43287463 C44.3012992,8.591981 44.0022839,8.55092814 43.8431776,8.34118051 C43.7762017,8.25288717 43.742082,8.14401677 43.7466857,8.03329059 L44.0461638,0.830433986 Z',
          id: 'Path',
          fill: '#FFFFFF',
        })
      )
    ),
  Vm = nr`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`,
  zm = T.div(({ size: e = 32 }) => ({
    borderRadius: '50%',
    cursor: 'progress',
    display: 'inline-block',
    overflow: 'hidden',
    position: 'absolute',
    transition: 'all 200ms ease-out',
    verticalAlign: 'top',
    top: '50%',
    left: '50%',
    marginTop: -(e / 2),
    marginLeft: -(e / 2),
    height: e,
    width: e,
    zIndex: 4,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(97, 97, 97, 0.29)',
    borderTopColor: 'rgb(100,100,100)',
    animation: `${Vm} 0.7s linear infinite`,
    mixBlendMode: 'difference',
  })),
  ql = T.div({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  }),
  qm = T.div(({ theme: e }) => ({
    position: 'relative',
    width: '80%',
    marginBottom: '0.75rem',
    maxWidth: 300,
    height: 5,
    borderRadius: 5,
    background: ve(0.8, e.color.secondary),
    overflow: 'hidden',
    cursor: 'progress',
  })),
  Um = T.div(({ theme: e }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    background: e.color.secondary,
  })),
  Ul = T.div(({ theme: e }) => ({
    minHeight: '2em',
    fontSize: `${e.typography.size.s1}px`,
    color: e.barTextColor,
  })),
  Wm = T(ye)(({ theme: e }) => ({
    width: 20,
    height: 20,
    marginBottom: '0.5rem',
    color: e.textMutedColor,
  })),
  Gm = nr`
  from { content: "..." }
  33% { content: "." }
  66% { content: ".." }
  to { content: "..." }
`,
  Ym = T.span({
    '&::after': {
      content: "'...'",
      animation: `${Gm} 1s linear infinite`,
      animationDelay: '1s',
      display: 'inline-block',
      width: '1em',
      height: 'auto',
    },
  }),
  Oc = ({ progress: e, error: t, size: r, ...n }) => {
    if (t)
      return a.createElement(
        ql,
        {
          'aria-label': t.toString(),
          'aria-live': 'polite',
          role: 'status',
          ...n,
        },
        a.createElement(Wm, { icon: 'lightningoff' }),
        a.createElement(Ul, null, t.message)
      );
    if (e) {
      let { value: o, modules: l } = e,
        { message: i } = e;
      return (
        l && (i += ` ${l.complete} / ${l.total} modules`),
        a.createElement(
          ql,
          {
            'aria-label': 'Content is loading...',
            'aria-live': 'polite',
            'aria-valuemin': 0,
            'aria-valuemax': 100,
            'aria-valuenow': o * 100,
            'aria-valuetext': i,
            role: 'progressbar',
            ...n,
          },
          a.createElement(
            qm,
            null,
            a.createElement(Um, { style: { width: `${o * 100}%` } })
          ),
          a.createElement(Ul, null, i, o < 1 && a.createElement(Ym, { key: i }))
        )
      );
    }
    return a.createElement(zm, {
      'aria-label': 'Content is loading...',
      'aria-live': 'polite',
      role: 'status',
      size: r,
      ...n,
    });
  };
function Km(e) {
  let t = {},
    r = e.split('&');
  for (let n = 0; n < r.length; n++) {
    let o = r[n].split('=');
    t[decodeURIComponent(o[0])] = decodeURIComponent(o[1] || '');
  }
  return t;
}
var Lc = (e, t, r = {}) => {
    let [n, o] = e.split('?'),
      l = o ? { ...Km(o), ...r, id: t } : { ...r, id: t };
    return `${n}?${Object.entries(l)
      .map((i) => `${i[0]}=${i[1]}`)
      .join('&')}`;
  },
  Xm = T.pre`
  line-height: 18px;
  padding: 11px 1rem;
  white-space: pre-wrap;
  background: rgba(0, 0, 0, 0.05);
  color: ${W.darkest};
  border-radius: 3px;
  margin: 1rem 0;
  width: 100%;
  display: block;
  overflow: hidden;
  font-family: ${Vt.fonts.mono};
  font-size: ${Vt.size.s2 - 1}px;
`,
  Jm = ({ code: e, ...t }) =>
    a.createElement(Xm, { id: 'clipboard-code', ...t }, e),
  _c = mc,
  Dc = {};
Object.keys(mc).forEach((e) => {
  Dc[e] = b.forwardRef((t, r) => b.createElement(e, { ...t, ref: r }));
});
const Qm = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      A: Ks,
      ActionBar: co,
      AddonPanel: Hm,
      Badge: Ef,
      Bar: Do,
      Blockquote: Xs,
      Button: Ec,
      ClipboardCode: Jm,
      Code: Co,
      DL: Qs,
      Div: Js,
      DocumentWrapper: Tf,
      ErrorFormatter: yc,
      FlexBar: Sn,
      Form: Ne,
      H1: ec,
      H2: So,
      H3: ko,
      H4: tc,
      H5: rc,
      H6: nc,
      HR: ac,
      IconButton: Ft,
      IconButtonSkeleton: kc,
      Icons: ye,
      Img: oc,
      LI: lc,
      Link: bt,
      ListItem: Oo,
      Loader: Oc,
      OL: ic,
      P: sc,
      Placeholder: hc,
      Pre: cc,
      ResetWrapper: To,
      ScrollArea: po,
      Separator: Mo,
      Spaced: Df,
      Span: uc,
      StorybookIcon: Pm,
      StorybookLogo: jm,
      Symbols: xf,
      SyntaxHighlighter: An,
      TT: pc,
      TabBar: Fo,
      TabButton: Fr,
      TabWrapper: Bm,
      Table: dc,
      Tabs: kn,
      TabsState: Rc,
      TooltipLinkList: Lo,
      TooltipMessage: Cc,
      TooltipNote: bm,
      UL: fc,
      WithTooltip: cm,
      WithTooltipPure: wc,
      Zoom: bc,
      codeCommon: dt,
      components: _c,
      createCopyToClipboardFunction: Ds,
      getStoryHref: Lc,
      icons: Sr,
      interleaveSeparators: Im,
      nameSpaceClassNames: Y,
      resetComponents: Dc,
      withReset: Q,
    },
    Symbol.toStringTag,
    { value: 'Module' }
  )
);
var Ze = (e) => `control-${e.replace(/\s+/g, '-')}`,
  Tn = (e) => `set-${e.replace(/\s+/g, '-')}`;
function eg(e, t) {
  (e.prototype = Object.create(t.prototype)),
    (e.prototype.constructor = e),
    gr(e, t);
}
function tg(e) {
  try {
    return Function.toString.call(e).indexOf('[native code]') !== -1;
  } catch {
    return typeof e == 'function';
  }
}
function rg(e, t, r) {
  if (ji()) return Reflect.construct.apply(null, arguments);
  var n = [null];
  n.push.apply(n, t);
  var o = new (e.bind.apply(e, n))();
  return r && gr(o, r.prototype), o;
}
function Da(e) {
  var t = typeof Map == 'function' ? new Map() : void 0;
  return (
    (Da = function (n) {
      if (n === null || !tg(n)) return n;
      if (typeof n != 'function')
        throw new TypeError(
          'Super expression must either be null or a function'
        );
      if (typeof t < 'u') {
        if (t.has(n)) return t.get(n);
        t.set(n, o);
      }
      function o() {
        return rg(n, arguments, da(this).constructor);
      }
      return (
        (o.prototype = Object.create(n.prototype, {
          constructor: {
            value: o,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        })),
        gr(o, n)
      );
    }),
    Da(e)
  );
}
var Qe = (function (e) {
  eg(t, e);
  function t(r) {
    var n;
    return (
      (n =
        e.call(
          this,
          'An error occurred. See https://github.com/styled-components/polished/blob/main/src/internalHelpers/errors.md#' +
            r +
            ' for more information.'
        ) || this),
      d0(n)
    );
  }
  return t;
})(Da(Error));
function Wn(e) {
  return Math.round(e * 255);
}
function ng(e, t, r) {
  return Wn(e) + ',' + Wn(t) + ',' + Wn(r);
}
function kr(e, t, r, n) {
  if ((n === void 0 && (n = ng), t === 0)) return n(r, r, r);
  var o = (((e % 360) + 360) % 360) / 60,
    l = (1 - Math.abs(2 * r - 1)) * t,
    i = l * (1 - Math.abs((o % 2) - 1)),
    s = 0,
    c = 0,
    u = 0;
  o >= 0 && o < 1
    ? ((s = l), (c = i))
    : o >= 1 && o < 2
      ? ((s = i), (c = l))
      : o >= 2 && o < 3
        ? ((c = l), (u = i))
        : o >= 3 && o < 4
          ? ((c = i), (u = l))
          : o >= 4 && o < 5
            ? ((s = i), (u = l))
            : o >= 5 && o < 6 && ((s = l), (u = i));
  var d = r - l / 2,
    h = s + d,
    m = c + d,
    p = u + d;
  return n(h, m, p);
}
var Wl = {
  aliceblue: 'f0f8ff',
  antiquewhite: 'faebd7',
  aqua: '00ffff',
  aquamarine: '7fffd4',
  azure: 'f0ffff',
  beige: 'f5f5dc',
  bisque: 'ffe4c4',
  black: '000',
  blanchedalmond: 'ffebcd',
  blue: '0000ff',
  blueviolet: '8a2be2',
  brown: 'a52a2a',
  burlywood: 'deb887',
  cadetblue: '5f9ea0',
  chartreuse: '7fff00',
  chocolate: 'd2691e',
  coral: 'ff7f50',
  cornflowerblue: '6495ed',
  cornsilk: 'fff8dc',
  crimson: 'dc143c',
  cyan: '00ffff',
  darkblue: '00008b',
  darkcyan: '008b8b',
  darkgoldenrod: 'b8860b',
  darkgray: 'a9a9a9',
  darkgreen: '006400',
  darkgrey: 'a9a9a9',
  darkkhaki: 'bdb76b',
  darkmagenta: '8b008b',
  darkolivegreen: '556b2f',
  darkorange: 'ff8c00',
  darkorchid: '9932cc',
  darkred: '8b0000',
  darksalmon: 'e9967a',
  darkseagreen: '8fbc8f',
  darkslateblue: '483d8b',
  darkslategray: '2f4f4f',
  darkslategrey: '2f4f4f',
  darkturquoise: '00ced1',
  darkviolet: '9400d3',
  deeppink: 'ff1493',
  deepskyblue: '00bfff',
  dimgray: '696969',
  dimgrey: '696969',
  dodgerblue: '1e90ff',
  firebrick: 'b22222',
  floralwhite: 'fffaf0',
  forestgreen: '228b22',
  fuchsia: 'ff00ff',
  gainsboro: 'dcdcdc',
  ghostwhite: 'f8f8ff',
  gold: 'ffd700',
  goldenrod: 'daa520',
  gray: '808080',
  green: '008000',
  greenyellow: 'adff2f',
  grey: '808080',
  honeydew: 'f0fff0',
  hotpink: 'ff69b4',
  indianred: 'cd5c5c',
  indigo: '4b0082',
  ivory: 'fffff0',
  khaki: 'f0e68c',
  lavender: 'e6e6fa',
  lavenderblush: 'fff0f5',
  lawngreen: '7cfc00',
  lemonchiffon: 'fffacd',
  lightblue: 'add8e6',
  lightcoral: 'f08080',
  lightcyan: 'e0ffff',
  lightgoldenrodyellow: 'fafad2',
  lightgray: 'd3d3d3',
  lightgreen: '90ee90',
  lightgrey: 'd3d3d3',
  lightpink: 'ffb6c1',
  lightsalmon: 'ffa07a',
  lightseagreen: '20b2aa',
  lightskyblue: '87cefa',
  lightslategray: '789',
  lightslategrey: '789',
  lightsteelblue: 'b0c4de',
  lightyellow: 'ffffe0',
  lime: '0f0',
  limegreen: '32cd32',
  linen: 'faf0e6',
  magenta: 'f0f',
  maroon: '800000',
  mediumaquamarine: '66cdaa',
  mediumblue: '0000cd',
  mediumorchid: 'ba55d3',
  mediumpurple: '9370db',
  mediumseagreen: '3cb371',
  mediumslateblue: '7b68ee',
  mediumspringgreen: '00fa9a',
  mediumturquoise: '48d1cc',
  mediumvioletred: 'c71585',
  midnightblue: '191970',
  mintcream: 'f5fffa',
  mistyrose: 'ffe4e1',
  moccasin: 'ffe4b5',
  navajowhite: 'ffdead',
  navy: '000080',
  oldlace: 'fdf5e6',
  olive: '808000',
  olivedrab: '6b8e23',
  orange: 'ffa500',
  orangered: 'ff4500',
  orchid: 'da70d6',
  palegoldenrod: 'eee8aa',
  palegreen: '98fb98',
  paleturquoise: 'afeeee',
  palevioletred: 'db7093',
  papayawhip: 'ffefd5',
  peachpuff: 'ffdab9',
  peru: 'cd853f',
  pink: 'ffc0cb',
  plum: 'dda0dd',
  powderblue: 'b0e0e6',
  purple: '800080',
  rebeccapurple: '639',
  red: 'f00',
  rosybrown: 'bc8f8f',
  royalblue: '4169e1',
  saddlebrown: '8b4513',
  salmon: 'fa8072',
  sandybrown: 'f4a460',
  seagreen: '2e8b57',
  seashell: 'fff5ee',
  sienna: 'a0522d',
  silver: 'c0c0c0',
  skyblue: '87ceeb',
  slateblue: '6a5acd',
  slategray: '708090',
  slategrey: '708090',
  snow: 'fffafa',
  springgreen: '00ff7f',
  steelblue: '4682b4',
  tan: 'd2b48c',
  teal: '008080',
  thistle: 'd8bfd8',
  tomato: 'ff6347',
  turquoise: '40e0d0',
  violet: 'ee82ee',
  wheat: 'f5deb3',
  white: 'fff',
  whitesmoke: 'f5f5f5',
  yellow: 'ff0',
  yellowgreen: '9acd32',
};
function ag(e) {
  if (typeof e != 'string') return e;
  var t = e.toLowerCase();
  return Wl[t] ? '#' + Wl[t] : e;
}
var og = /^#[a-fA-F0-9]{6}$/,
  lg = /^#[a-fA-F0-9]{8}$/,
  ig = /^#[a-fA-F0-9]{3}$/,
  sg = /^#[a-fA-F0-9]{4}$/,
  Gn = /^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i,
  cg =
    /^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i,
  ug =
    /^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i,
  dg =
    /^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
function Rn(e) {
  if (typeof e != 'string') throw new Qe(3);
  var t = ag(e);
  if (t.match(og))
    return {
      red: parseInt('' + t[1] + t[2], 16),
      green: parseInt('' + t[3] + t[4], 16),
      blue: parseInt('' + t[5] + t[6], 16),
    };
  if (t.match(lg)) {
    var r = parseFloat((parseInt('' + t[7] + t[8], 16) / 255).toFixed(2));
    return {
      red: parseInt('' + t[1] + t[2], 16),
      green: parseInt('' + t[3] + t[4], 16),
      blue: parseInt('' + t[5] + t[6], 16),
      alpha: r,
    };
  }
  if (t.match(ig))
    return {
      red: parseInt('' + t[1] + t[1], 16),
      green: parseInt('' + t[2] + t[2], 16),
      blue: parseInt('' + t[3] + t[3], 16),
    };
  if (t.match(sg)) {
    var n = parseFloat((parseInt('' + t[4] + t[4], 16) / 255).toFixed(2));
    return {
      red: parseInt('' + t[1] + t[1], 16),
      green: parseInt('' + t[2] + t[2], 16),
      blue: parseInt('' + t[3] + t[3], 16),
      alpha: n,
    };
  }
  var o = Gn.exec(t);
  if (o)
    return {
      red: parseInt('' + o[1], 10),
      green: parseInt('' + o[2], 10),
      blue: parseInt('' + o[3], 10),
    };
  var l = cg.exec(t.substring(0, 50));
  if (l)
    return {
      red: parseInt('' + l[1], 10),
      green: parseInt('' + l[2], 10),
      blue: parseInt('' + l[3], 10),
      alpha:
        parseFloat('' + l[4]) > 1
          ? parseFloat('' + l[4]) / 100
          : parseFloat('' + l[4]),
    };
  var i = ug.exec(t);
  if (i) {
    var s = parseInt('' + i[1], 10),
      c = parseInt('' + i[2], 10) / 100,
      u = parseInt('' + i[3], 10) / 100,
      d = 'rgb(' + kr(s, c, u) + ')',
      h = Gn.exec(d);
    if (!h) throw new Qe(4, t, d);
    return {
      red: parseInt('' + h[1], 10),
      green: parseInt('' + h[2], 10),
      blue: parseInt('' + h[3], 10),
    };
  }
  var m = dg.exec(t.substring(0, 50));
  if (m) {
    var p = parseInt('' + m[1], 10),
      g = parseInt('' + m[2], 10) / 100,
      f = parseInt('' + m[3], 10) / 100,
      A = 'rgb(' + kr(p, g, f) + ')',
      w = Gn.exec(A);
    if (!w) throw new Qe(4, t, A);
    return {
      red: parseInt('' + w[1], 10),
      green: parseInt('' + w[2], 10),
      blue: parseInt('' + w[3], 10),
      alpha:
        parseFloat('' + m[4]) > 1
          ? parseFloat('' + m[4]) / 100
          : parseFloat('' + m[4]),
    };
  }
  throw new Qe(5);
}
function pg(e) {
  var t = e.red / 255,
    r = e.green / 255,
    n = e.blue / 255,
    o = Math.max(t, r, n),
    l = Math.min(t, r, n),
    i = (o + l) / 2;
  if (o === l)
    return e.alpha !== void 0
      ? { hue: 0, saturation: 0, lightness: i, alpha: e.alpha }
      : { hue: 0, saturation: 0, lightness: i };
  var s,
    c = o - l,
    u = i > 0.5 ? c / (2 - o - l) : c / (o + l);
  switch (o) {
    case t:
      s = (r - n) / c + (r < n ? 6 : 0);
      break;
    case r:
      s = (n - t) / c + 2;
      break;
    default:
      s = (t - r) / c + 4;
      break;
  }
  return (
    (s *= 60),
    e.alpha !== void 0
      ? { hue: s, saturation: u, lightness: i, alpha: e.alpha }
      : { hue: s, saturation: u, lightness: i }
  );
}
function Fc(e) {
  return pg(Rn(e));
}
var fg = function (t) {
    return t.length === 7 && t[1] === t[2] && t[3] === t[4] && t[5] === t[6]
      ? '#' + t[1] + t[3] + t[5]
      : t;
  },
  Fa = fg;
function kt(e) {
  var t = e.toString(16);
  return t.length === 1 ? '0' + t : t;
}
function Yn(e) {
  return kt(Math.round(e * 255));
}
function mg(e, t, r) {
  return Fa('#' + Yn(e) + Yn(t) + Yn(r));
}
function cn(e, t, r) {
  return kr(e, t, r, mg);
}
function gg(e, t, r) {
  if (typeof e == 'number' && typeof t == 'number' && typeof r == 'number')
    return cn(e, t, r);
  if (typeof e == 'object' && t === void 0 && r === void 0)
    return cn(e.hue, e.saturation, e.lightness);
  throw new Qe(1);
}
function hg(e, t, r, n) {
  if (
    typeof e == 'number' &&
    typeof t == 'number' &&
    typeof r == 'number' &&
    typeof n == 'number'
  )
    return n >= 1 ? cn(e, t, r) : 'rgba(' + kr(e, t, r) + ',' + n + ')';
  if (typeof e == 'object' && t === void 0 && r === void 0 && n === void 0)
    return e.alpha >= 1
      ? cn(e.hue, e.saturation, e.lightness)
      : 'rgba(' + kr(e.hue, e.saturation, e.lightness) + ',' + e.alpha + ')';
  throw new Qe(2);
}
function Ma(e, t, r) {
  if (typeof e == 'number' && typeof t == 'number' && typeof r == 'number')
    return Fa('#' + kt(e) + kt(t) + kt(r));
  if (typeof e == 'object' && t === void 0 && r === void 0)
    return Fa('#' + kt(e.red) + kt(e.green) + kt(e.blue));
  throw new Qe(6);
}
function st(e, t, r, n) {
  if (typeof e == 'string' && typeof t == 'number') {
    var o = Rn(e);
    return 'rgba(' + o.red + ',' + o.green + ',' + o.blue + ',' + t + ')';
  } else {
    if (
      typeof e == 'number' &&
      typeof t == 'number' &&
      typeof r == 'number' &&
      typeof n == 'number'
    )
      return n >= 1
        ? Ma(e, t, r)
        : 'rgba(' + e + ',' + t + ',' + r + ',' + n + ')';
    if (typeof e == 'object' && t === void 0 && r === void 0 && n === void 0)
      return e.alpha >= 1
        ? Ma(e.red, e.green, e.blue)
        : 'rgba(' + e.red + ',' + e.green + ',' + e.blue + ',' + e.alpha + ')';
  }
  throw new Qe(7);
}
var bg = function (t) {
    return (
      typeof t.red == 'number' &&
      typeof t.green == 'number' &&
      typeof t.blue == 'number' &&
      (typeof t.alpha != 'number' || typeof t.alpha > 'u')
    );
  },
  yg = function (t) {
    return (
      typeof t.red == 'number' &&
      typeof t.green == 'number' &&
      typeof t.blue == 'number' &&
      typeof t.alpha == 'number'
    );
  },
  vg = function (t) {
    return (
      typeof t.hue == 'number' &&
      typeof t.saturation == 'number' &&
      typeof t.lightness == 'number' &&
      (typeof t.alpha != 'number' || typeof t.alpha > 'u')
    );
  },
  Eg = function (t) {
    return (
      typeof t.hue == 'number' &&
      typeof t.saturation == 'number' &&
      typeof t.lightness == 'number' &&
      typeof t.alpha == 'number'
    );
  };
function Mc(e) {
  if (typeof e != 'object') throw new Qe(8);
  if (yg(e)) return st(e);
  if (bg(e)) return Ma(e);
  if (Eg(e)) return hg(e);
  if (vg(e)) return gg(e);
  throw new Qe(8);
}
function $c(e, t, r) {
  return function () {
    var o = r.concat(Array.prototype.slice.call(arguments));
    return o.length >= t ? e.apply(this, o) : $c(e, t, o);
  };
}
function On(e) {
  return $c(e, e.length, []);
}
function Ln(e, t, r) {
  return Math.max(e, Math.min(t, r));
}
function xg(e, t) {
  if (t === 'transparent') return t;
  var r = Fc(t);
  return Mc(dn({}, r, { lightness: Ln(0, 1, r.lightness - parseFloat(e)) }));
}
var Ag = On(xg),
  Ge = Ag;
function wg(e, t) {
  if (t === 'transparent') return t;
  var r = Fc(t);
  return Mc(dn({}, r, { lightness: Ln(0, 1, r.lightness + parseFloat(e)) }));
}
var Cg = On(wg),
  Tt = Cg;
function Sg(e, t) {
  if (t === 'transparent') return t;
  var r = Rn(t),
    n = typeof r.alpha == 'number' ? r.alpha : 1,
    o = dn({}, r, { alpha: Ln(0, 1, (n * 100 + parseFloat(e) * 100) / 100) });
  return st(o);
}
var kg = On(Sg),
  Pr = kg;
function Tg(e, t) {
  if (t === 'transparent') return t;
  var r = Rn(t),
    n = typeof r.alpha == 'number' ? r.alpha : 1,
    o = dn({}, r, {
      alpha: Ln(0, 1, +(n * 100 - parseFloat(e) * 100).toFixed(2) / 100),
    });
  return st(o);
}
var Rg = On(Tg),
  J = Rg,
  Og = Ku,
  Lg = Xu,
  _g = $i,
  Dg = Ju,
  Fg = Object.getOwnPropertySymbols,
  Mg = Fg
    ? function (e) {
        for (var t = []; e; ) Og(t, _g(e)), (e = Lg(e));
        return t;
      }
    : Dg,
  Bc = Mg,
  $g = Qu,
  Bg = Bc,
  Ig = qa;
function Ng(e) {
  return $g(e, Ig, Bg);
}
var Ic = Ng,
  Zg = e0,
  Hg = t0,
  jg = ju,
  Pg = Ic;
function Vg(e, t) {
  if (e == null) return {};
  var r = Zg(Pg(e), function (n) {
    return [n];
  });
  return (
    (t = Hg(t)),
    jg(e, r, function (n, o) {
      return t(n, o[0]);
    })
  );
}
var zg = Vg;
const qg = Ua(zg);
function Ot() {
  return (
    (Ot = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    Ot.apply(this, arguments)
  );
}
const Ug = ['children', 'options'];
var Gl, Yl;
(function (e) {
  (e.blockQuote = '0'),
    (e.breakLine = '1'),
    (e.breakThematic = '2'),
    (e.codeBlock = '3'),
    (e.codeFenced = '4'),
    (e.codeInline = '5'),
    (e.footnote = '6'),
    (e.footnoteReference = '7'),
    (e.gfmTask = '8'),
    (e.heading = '9'),
    (e.headingSetext = '10'),
    (e.htmlBlock = '11'),
    (e.htmlComment = '12'),
    (e.htmlSelfClosing = '13'),
    (e.image = '14'),
    (e.link = '15'),
    (e.linkAngleBraceStyleDetector = '16'),
    (e.linkBareUrlDetector = '17'),
    (e.linkMailtoDetector = '18'),
    (e.newlineCoalescer = '19'),
    (e.orderedList = '20'),
    (e.paragraph = '21'),
    (e.ref = '22'),
    (e.refImage = '23'),
    (e.refLink = '24'),
    (e.table = '25'),
    (e.tableSeparator = '26'),
    (e.text = '27'),
    (e.textBolded = '28'),
    (e.textEmphasized = '29'),
    (e.textEscaped = '30'),
    (e.textMarked = '31'),
    (e.textStrikethroughed = '32'),
    (e.unorderedList = '33');
})(Gl || (Gl = {})),
  (function (e) {
    (e[(e.MAX = 0)] = 'MAX'),
      (e[(e.HIGH = 1)] = 'HIGH'),
      (e[(e.MED = 2)] = 'MED'),
      (e[(e.LOW = 3)] = 'LOW'),
      (e[(e.MIN = 4)] = 'MIN');
  })(Yl || (Yl = {}));
const Kl = [
    'allowFullScreen',
    'allowTransparency',
    'autoComplete',
    'autoFocus',
    'autoPlay',
    'cellPadding',
    'cellSpacing',
    'charSet',
    'className',
    'classId',
    'colSpan',
    'contentEditable',
    'contextMenu',
    'crossOrigin',
    'encType',
    'formAction',
    'formEncType',
    'formMethod',
    'formNoValidate',
    'formTarget',
    'frameBorder',
    'hrefLang',
    'inputMode',
    'keyParams',
    'keyType',
    'marginHeight',
    'marginWidth',
    'maxLength',
    'mediaGroup',
    'minLength',
    'noValidate',
    'radioGroup',
    'readOnly',
    'rowSpan',
    'spellCheck',
    'srcDoc',
    'srcLang',
    'srcSet',
    'tabIndex',
    'useMap',
  ].reduce((e, t) => ((e[t.toLowerCase()] = t), e), { for: 'htmlFor' }),
  Xl = { amp: '&', apos: "'", gt: '>', lt: '<', nbsp: ' ', quot: '“' },
  Wg = ['style', 'script'],
  Gg =
    /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,
  Yg = /mailto:/i,
  Kg = /\n{2,}$/,
  Nc = /^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/,
  Xg = /^ *> ?/gm,
  Jg = /^ {2,}\n/,
  Qg = /^(?:( *[-*_])){3,} *(?:\n *)+\n/,
  Zc = /^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/,
  Hc = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,
  eh = /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
  th = /^(?:\n *)*\n/,
  rh = /\r\n?/g,
  nh = /^\[\^([^\]]+)](:.*)\n/,
  ah = /^\[\^([^\]]+)]/,
  oh = /\f/g,
  lh = /^\s*?\[(x|\s)\]/,
  jc = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,
  Pc = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,
  Vc = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,
  $a =
    /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i,
  ih = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,
  zc = /^<!--[\s\S]*?(?:-->)/,
  sh = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/,
  Ba = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,
  ch = /^\{.*\}$/,
  uh = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
  dh = /^<([^ >]+@[^ >]+)>/,
  ph = /^<([^ >]+:\/[^ >]+)>/,
  fh = /-([a-z])?/gi,
  qc = /^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,
  mh = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/,
  gh = /^!\[([^\]]*)\] ?\[([^\]]*)\]/,
  hh = /^\[([^\]]*)\] ?\[([^\]]*)\]/,
  bh = /(\[|\])/g,
  yh = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,
  vh = /\t/g,
  Eh = /^ *\| */,
  xh = /(^ *\||\| *$)/g,
  Ah = / *$/,
  wh = /^ *:-+: *$/,
  Ch = /^ *:-+ *$/,
  Sh = /^ *-+: *$/,
  kh =
    /^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,
  Th =
    /^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,
  Rh = /^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/,
  Oh = /^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,
  Lh = /^\\([^0-9A-Za-z\s])/,
  _h =
    /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,
  Dh = /^\n+/,
  Fh = /^([ \t]*)/,
  Mh = /\\([^\\])/g,
  Jl = / *\n+$/,
  $h = /(?:^|\n)( *)$/,
  $o = '(?:\\d+\\.)',
  Bo = '(?:[*+-])';
function Uc(e) {
  return '( *)(' + (e === 1 ? $o : Bo) + ') +';
}
const Wc = Uc(1),
  Gc = Uc(2);
function Yc(e) {
  return new RegExp('^' + (e === 1 ? Wc : Gc));
}
const Bh = Yc(1),
  Ih = Yc(2);
function Kc(e) {
  return new RegExp(
    '^' +
      (e === 1 ? Wc : Gc) +
      '[^\\n]*(?:\\n(?!\\1' +
      (e === 1 ? $o : Bo) +
      ' )[^\\n]*)*(\\n|$)',
    'gm'
  );
}
const Xc = Kc(1),
  Jc = Kc(2);
function Qc(e) {
  const t = e === 1 ? $o : Bo;
  return new RegExp(
    '^( *)(' +
      t +
      ') [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1' +
      t +
      ' (?!' +
      t +
      ' ))\\n*|\\s*\\n*$)'
  );
}
const eu = Qc(1),
  tu = Qc(2);
function Ql(e, t) {
  const r = t === 1,
    n = r ? eu : tu,
    o = r ? Xc : Jc,
    l = r ? Bh : Ih;
  return {
    match(i, s, c) {
      const u = $h.exec(c);
      return u && (s.list || (!s.inline && !s.simple))
        ? n.exec((i = u[1] + i))
        : null;
    },
    order: 1,
    parse(i, s, c) {
      const u = r ? +i[2] : void 0,
        d = i[0]
          .replace(
            Kg,
            `
`
          )
          .match(o);
      let h = !1;
      return {
        items: d.map(function (m, p) {
          const g = l.exec(m)[0].length,
            f = new RegExp('^ {1,' + g + '}', 'gm'),
            A = m.replace(f, '').replace(l, ''),
            w = p === d.length - 1,
            v =
              A.indexOf(`

`) !== -1 ||
              (w && h);
          h = v;
          const y = c.inline,
            x = c.list;
          let E;
          (c.list = !0),
            v
              ? ((c.inline = !1),
                (E = A.replace(
                  Jl,
                  `

`
                )))
              : ((c.inline = !0), (E = A.replace(Jl, '')));
          const C = s(E, c);
          return (c.inline = y), (c.list = x), C;
        }),
        ordered: r,
        start: u,
      };
    },
    render: (i, s, c) =>
      e(
        i.ordered ? 'ol' : 'ul',
        { key: c.key, start: i.type === '20' ? i.start : void 0 },
        i.items.map(function (u, d) {
          return e('li', { key: d }, s(u, c));
        })
      ),
  };
}
const Nh = /^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,
  Zh = /^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/,
  ru = [Nc, Zc, Hc, jc, Vc, Pc, zc, qc, Xc, eu, Jc, tu],
  Hh = [...ru, /^[^\n]+(?:  \n|\n{2,})/, $a, Ba];
function jh(e) {
  return e
    .replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, 'a')
    .replace(/[çÇ]/g, 'c')
    .replace(/[ðÐ]/g, 'd')
    .replace(/[ÈÉÊËéèêë]/g, 'e')
    .replace(/[ÏïÎîÍíÌì]/g, 'i')
    .replace(/[Ññ]/g, 'n')
    .replace(/[øØœŒÕõÔôÓóÒò]/g, 'o')
    .replace(/[ÜüÛûÚúÙù]/g, 'u')
    .replace(/[ŸÿÝý]/g, 'y')
    .replace(/[^a-z0-9- ]/gi, '')
    .replace(/ /gi, '-')
    .toLowerCase();
}
function Ph(e) {
  return Sh.test(e)
    ? 'right'
    : wh.test(e)
      ? 'center'
      : Ch.test(e)
        ? 'left'
        : null;
}
function ei(e, t, r) {
  const n = r.inTable;
  r.inTable = !0;
  const o = t(e.trim(), r);
  r.inTable = n;
  let l = [[]];
  return (
    o.forEach(function (i, s) {
      i.type === '26'
        ? s !== 0 && s !== o.length - 1 && l.push([])
        : (i.type !== '27' ||
            (o[s + 1] != null && o[s + 1].type !== '26') ||
            (i.text = i.text.replace(Ah, '')),
          l[l.length - 1].push(i));
    }),
    l
  );
}
function Vh(e, t, r) {
  r.inline = !0;
  const n = ei(e[1], t, r),
    o = e[2].replace(xh, '').split('|').map(Ph),
    l = (function (i, s, c) {
      return i
        .trim()
        .split(
          `
`
        )
        .map(function (u) {
          return ei(u, s, c);
        });
    })(e[3], t, r);
  return (r.inline = !1), { align: o, cells: l, header: n, type: '25' };
}
function ti(e, t) {
  return e.align[t] == null ? {} : { textAlign: e.align[t] };
}
function ft(e) {
  return function (t, r) {
    return r.inline ? e.exec(t) : null;
  };
}
function mt(e) {
  return function (t, r) {
    return r.inline || r.simple ? e.exec(t) : null;
  };
}
function ot(e) {
  return function (t, r) {
    return r.inline || r.simple ? null : e.exec(t);
  };
}
function dr(e) {
  return function (t) {
    return e.exec(t);
  };
}
function zh(e, t, r) {
  if (
    t.inline ||
    t.simple ||
    (r &&
      !r.endsWith(`
`))
  )
    return null;
  let n = '';
  e.split(
    `
`
  ).every(
    (l) =>
      !ru.some((i) => i.test(l)) &&
      ((n +=
        l +
        `
`),
      l.trim())
  );
  const o = n.trimEnd();
  return o == '' ? null : [n, o];
}
function jt(e) {
  try {
    if (
      decodeURIComponent(e)
        .replace(/[^A-Za-z0-9/:]/g, '')
        .match(/^\s*(javascript|vbscript|data(?!:image)):/i)
    )
      return;
  } catch {
    return null;
  }
  return e;
}
function ri(e) {
  return e.replace(Mh, '$1');
}
function Qr(e, t, r) {
  const n = r.inline || !1,
    o = r.simple || !1;
  (r.inline = !0), (r.simple = !0);
  const l = e(t, r);
  return (r.inline = n), (r.simple = o), l;
}
function qh(e, t, r) {
  const n = r.inline || !1,
    o = r.simple || !1;
  (r.inline = !1), (r.simple = !0);
  const l = e(t, r);
  return (r.inline = n), (r.simple = o), l;
}
function Uh(e, t, r) {
  return (r.inline = !1), e(t, r);
}
const Kn = (e, t, r) => ({ children: Qr(t, e[1], r) });
function Xn() {
  return {};
}
function Jn() {
  return null;
}
function Wh(...e) {
  return e.filter(Boolean).join(' ');
}
function Qn(e, t, r) {
  let n = e;
  const o = t.split('.');
  for (; o.length && ((n = n[o[0]]), n !== void 0); ) o.shift();
  return n || r;
}
function Gh(e, t = {}) {
  (t.overrides = t.overrides || {}),
    (t.slugify = t.slugify || jh),
    (t.namedCodesToUnicode = t.namedCodesToUnicode
      ? Ot({}, Xl, t.namedCodesToUnicode)
      : Xl);
  const r = t.createElement || b.createElement;
  function n(p, g, ...f) {
    const A = Qn(t.overrides, `${p}.props`, {});
    return r(
      (function (w, v) {
        const y = Qn(v, w);
        return y
          ? typeof y == 'function' || (typeof y == 'object' && 'render' in y)
            ? y
            : Qn(v, `${w}.component`, w)
          : w;
      })(p, t.overrides),
      Ot({}, g, A, {
        className: Wh(g == null ? void 0 : g.className, A.className) || void 0,
      }),
      ...f
    );
  }
  function o(p) {
    let g = !1;
    t.forceInline ? (g = !0) : t.forceBlock || (g = yh.test(p) === !1);
    const f = d(
      u(
        g
          ? p
          : `${p.trimEnd().replace(Dh, '')}

`,
        { inline: g }
      )
    );
    for (; typeof f[f.length - 1] == 'string' && !f[f.length - 1].trim(); )
      f.pop();
    if (t.wrapper === null) return f;
    const A = t.wrapper || (g ? 'span' : 'div');
    let w;
    if (f.length > 1 || t.forceWrapper) w = f;
    else {
      if (f.length === 1)
        return (
          (w = f[0]), typeof w == 'string' ? n('span', { key: 'outer' }, w) : w
        );
      w = null;
    }
    return b.createElement(A, { key: 'outer' }, w);
  }
  function l(p) {
    const g = p.match(Gg);
    return g
      ? g.reduce(function (f, A, w) {
          const v = A.indexOf('=');
          if (v !== -1) {
            const y = (function (S) {
                return (
                  S.indexOf('-') !== -1 &&
                    S.match(sh) === null &&
                    (S = S.replace(fh, function (k, R) {
                      return R.toUpperCase();
                    })),
                  S
                );
              })(A.slice(0, v)).trim(),
              x = (function (S) {
                const k = S[0];
                return (k === '"' || k === "'") &&
                  S.length >= 2 &&
                  S[S.length - 1] === k
                  ? S.slice(1, -1)
                  : S;
              })(A.slice(v + 1).trim()),
              E = Kl[y] || y,
              C = (f[E] = (function (S, k) {
                return S === 'style'
                  ? k.split(/;\s?/).reduce(function (R, O) {
                      const L = O.slice(0, O.indexOf(':'));
                      return (
                        (R[L.replace(/(-[a-z])/g, (_) => _[1].toUpperCase())] =
                          O.slice(L.length + 1).trim()),
                        R
                      );
                    }, {})
                  : S === 'href' || S === 'src'
                    ? jt(k)
                    : (k.match(ch) && (k = k.slice(1, k.length - 1)),
                      k === 'true' || (k !== 'false' && k));
              })(y, x));
            typeof C == 'string' &&
              ($a.test(C) || Ba.test(C)) &&
              (f[E] = b.cloneElement(o(C.trim()), { key: w }));
          } else A !== 'style' && (f[Kl[A] || A] = !0);
          return f;
        }, {})
      : null;
  }
  const i = [],
    s = {},
    c = {
      0: {
        match: ot(Nc),
        order: 1,
        parse: (p, g, f) => ({ children: g(p[0].replace(Xg, ''), f) }),
        render: (p, g, f) => n('blockquote', { key: f.key }, g(p.children, f)),
      },
      1: {
        match: dr(Jg),
        order: 1,
        parse: Xn,
        render: (p, g, f) => n('br', { key: f.key }),
      },
      2: {
        match: ot(Qg),
        order: 1,
        parse: Xn,
        render: (p, g, f) => n('hr', { key: f.key }),
      },
      3: {
        match: ot(Hc),
        order: 0,
        parse: (p) => ({
          lang: void 0,
          text: p[0].replace(/^ {4}/gm, '').replace(/\n+$/, ''),
        }),
        render: (p, g, f) =>
          n(
            'pre',
            { key: f.key },
            n(
              'code',
              Ot({}, p.attrs, { className: p.lang ? `lang-${p.lang}` : '' }),
              p.text
            )
          ),
      },
      4: {
        match: ot(Zc),
        order: 0,
        parse: (p) => ({
          attrs: l(p[3] || ''),
          lang: p[2] || void 0,
          text: p[4],
          type: '3',
        }),
      },
      5: {
        match: mt(eh),
        order: 3,
        parse: (p) => ({ text: p[2] }),
        render: (p, g, f) => n('code', { key: f.key }, p.text),
      },
      6: {
        match: ot(nh),
        order: 0,
        parse: (p) => (i.push({ footnote: p[2], identifier: p[1] }), {}),
        render: Jn,
      },
      7: {
        match: ft(ah),
        order: 1,
        parse: (p) => ({ target: `#${t.slugify(p[1])}`, text: p[1] }),
        render: (p, g, f) =>
          n(
            'a',
            { key: f.key, href: jt(p.target) },
            n('sup', { key: f.key }, p.text)
          ),
      },
      8: {
        match: ft(lh),
        order: 1,
        parse: (p) => ({ completed: p[1].toLowerCase() === 'x' }),
        render: (p, g, f) =>
          n('input', {
            checked: p.completed,
            key: f.key,
            readOnly: !0,
            type: 'checkbox',
          }),
      },
      9: {
        match: ot(t.enforceAtxHeadings ? Pc : jc),
        order: 1,
        parse: (p, g, f) => ({
          children: Qr(g, p[2], f),
          id: t.slugify(p[2]),
          level: p[1].length,
        }),
        render: (p, g, f) =>
          n(`h${p.level}`, { id: p.id, key: f.key }, g(p.children, f)),
      },
      10: {
        match: ot(Vc),
        order: 0,
        parse: (p, g, f) => ({
          children: Qr(g, p[1], f),
          level: p[2] === '=' ? 1 : 2,
          type: '9',
        }),
      },
      11: {
        match: dr($a),
        order: 1,
        parse(p, g, f) {
          const [, A] = p[3].match(Fh),
            w = new RegExp(`^${A}`, 'gm'),
            v = p[3].replace(w, ''),
            y = ((x = v), Hh.some((k) => k.test(x)) ? Uh : Qr);
          var x;
          const E = p[1].toLowerCase(),
            C = Wg.indexOf(E) !== -1,
            S = { attrs: l(p[2]), noInnerParse: C, tag: C ? E : p[1] };
          return (
            (f.inAnchor = f.inAnchor || E === 'a'),
            C ? (S.text = p[3]) : (S.children = y(g, v, f)),
            (f.inAnchor = !1),
            S
          );
        },
        render: (p, g, f) =>
          n(p.tag, Ot({ key: f.key }, p.attrs), p.text || g(p.children, f)),
      },
      13: {
        match: dr(Ba),
        order: 1,
        parse: (p) => ({ attrs: l(p[2] || ''), tag: p[1] }),
        render: (p, g, f) => n(p.tag, Ot({}, p.attrs, { key: f.key })),
      },
      12: { match: dr(zc), order: 1, parse: () => ({}), render: Jn },
      14: {
        match: mt(Zh),
        order: 1,
        parse: (p) => ({ alt: p[1], target: ri(p[2]), title: p[3] }),
        render: (p, g, f) =>
          n('img', {
            key: f.key,
            alt: p.alt || void 0,
            title: p.title || void 0,
            src: jt(p.target),
          }),
      },
      15: {
        match: ft(Nh),
        order: 3,
        parse: (p, g, f) => ({
          children: qh(g, p[1], f),
          target: ri(p[2]),
          title: p[3],
        }),
        render: (p, g, f) =>
          n(
            'a',
            { key: f.key, href: jt(p.target), title: p.title },
            g(p.children, f)
          ),
      },
      16: {
        match: ft(ph),
        order: 0,
        parse: (p) => ({
          children: [{ text: p[1], type: '27' }],
          target: p[1],
          type: '15',
        }),
      },
      17: {
        match: (p, g) => (g.inAnchor ? null : ft(uh)(p, g)),
        order: 0,
        parse: (p) => ({
          children: [{ text: p[1], type: '27' }],
          target: p[1],
          title: void 0,
          type: '15',
        }),
      },
      18: {
        match: ft(dh),
        order: 0,
        parse(p) {
          let g = p[1],
            f = p[1];
          return (
            Yg.test(f) || (f = 'mailto:' + f),
            {
              children: [{ text: g.replace('mailto:', ''), type: '27' }],
              target: f,
              type: '15',
            }
          );
        },
      },
      20: Ql(n, 1),
      33: Ql(n, 2),
      19: {
        match: ot(th),
        order: 3,
        parse: Xn,
        render: () => `
`,
      },
      21: {
        match: zh,
        order: 3,
        parse: Kn,
        render: (p, g, f) => n('p', { key: f.key }, g(p.children, f)),
      },
      22: {
        match: ft(mh),
        order: 0,
        parse: (p) => ((s[p[1]] = { target: p[2], title: p[4] }), {}),
        render: Jn,
      },
      23: {
        match: mt(gh),
        order: 0,
        parse: (p) => ({ alt: p[1] || void 0, ref: p[2] }),
        render: (p, g, f) =>
          n('img', {
            key: f.key,
            alt: p.alt,
            src: jt(s[p.ref].target),
            title: s[p.ref].title,
          }),
      },
      24: {
        match: ft(hh),
        order: 0,
        parse: (p, g, f) => ({
          children: g(p[1], f),
          fallbackChildren: g(p[0].replace(bh, '\\$1'), f),
          ref: p[2],
        }),
        render: (p, g, f) =>
          s[p.ref]
            ? n(
                'a',
                {
                  key: f.key,
                  href: jt(s[p.ref].target),
                  title: s[p.ref].title,
                },
                g(p.children, f)
              )
            : n('span', { key: f.key }, g(p.fallbackChildren, f)),
      },
      25: {
        match: ot(qc),
        order: 1,
        parse: Vh,
        render: (p, g, f) =>
          n(
            'table',
            { key: f.key },
            n(
              'thead',
              null,
              n(
                'tr',
                null,
                p.header.map(function (A, w) {
                  return n('th', { key: w, style: ti(p, w) }, g(A, f));
                })
              )
            ),
            n(
              'tbody',
              null,
              p.cells.map(function (A, w) {
                return n(
                  'tr',
                  { key: w },
                  A.map(function (v, y) {
                    return n('td', { key: y, style: ti(p, y) }, g(v, f));
                  })
                );
              })
            )
          ),
      },
      26: {
        match: function (p, g) {
          return g.inTable ? ((g.inline = !0), Eh.exec(p)) : null;
        },
        order: 1,
        parse: function () {
          return { type: '26' };
        },
        render: () => ' | ',
      },
      27: {
        match: dr(_h),
        order: 4,
        parse: (p) => ({
          text: p[0].replace(ih, (g, f) =>
            t.namedCodesToUnicode[f] ? t.namedCodesToUnicode[f] : g
          ),
        }),
        render: (p) => p.text,
      },
      28: {
        match: mt(kh),
        order: 2,
        parse: (p, g, f) => ({ children: g(p[2], f) }),
        render: (p, g, f) => n('strong', { key: f.key }, g(p.children, f)),
      },
      29: {
        match: mt(Th),
        order: 3,
        parse: (p, g, f) => ({ children: g(p[2], f) }),
        render: (p, g, f) => n('em', { key: f.key }, g(p.children, f)),
      },
      30: {
        match: mt(Lh),
        order: 1,
        parse: (p) => ({ text: p[1], type: '27' }),
      },
      31: {
        match: mt(Rh),
        order: 3,
        parse: Kn,
        render: (p, g, f) => n('mark', { key: f.key }, g(p.children, f)),
      },
      32: {
        match: mt(Oh),
        order: 3,
        parse: Kn,
        render: (p, g, f) => n('del', { key: f.key }, g(p.children, f)),
      },
    };
  t.disableParsingRawHTML === !0 && (delete c[11], delete c[13]);
  const u = (function (p) {
      let g = Object.keys(p);
      function f(A, w) {
        let v = [],
          y = '';
        for (; A; ) {
          let x = 0;
          for (; x < g.length; ) {
            const E = g[x],
              C = p[E],
              S = C.match(A, w, y);
            if (S) {
              const k = S[0];
              A = A.substring(k.length);
              const R = C.parse(S, f, w);
              R.type == null && (R.type = E), v.push(R), (y = k);
              break;
            }
            x++;
          }
        }
        return v;
      }
      return (
        g.sort(function (A, w) {
          let v = p[A].order,
            y = p[w].order;
          return v !== y ? v - y : 1;
        }),
        function (A, w) {
          return f(
            (function (v) {
              return v
                .replace(
                  rh,
                  `
`
                )
                .replace(oh, '')
                .replace(vh, '    ');
            })(A),
            w
          );
        }
      );
    })(c),
    d =
      ((h = (function (p, g) {
        return function (f, A, w) {
          const v = p[f.type].render;
          return g ? g(() => v(f, A, w), f, A, w) : v(f, A, w);
        };
      })(c, t.renderRule)),
      function p(g, f = {}) {
        if (Array.isArray(g)) {
          const A = f.key,
            w = [];
          let v = !1;
          for (let y = 0; y < g.length; y++) {
            f.key = y;
            const x = p(g[y], f),
              E = typeof x == 'string';
            E && v ? (w[w.length - 1] += x) : x !== null && w.push(x), (v = E);
          }
          return (f.key = A), w;
        }
        return h(g, p, f);
      });
  var h;
  const m = o(e);
  return i.length
    ? n(
        'div',
        null,
        m,
        n(
          'footer',
          { key: 'footer' },
          i.map(function (p) {
            return n(
              'div',
              { id: t.slugify(p.identifier), key: p.identifier },
              p.identifier,
              d(u(p.footnote, { inline: !0 }))
            );
          })
        )
      )
    : m;
}
const nu = (e) => {
  let { children: t, options: r } = e,
    n = (function (o, l) {
      if (o == null) return {};
      var i,
        s,
        c = {},
        u = Object.keys(o);
      for (s = 0; s < u.length; s++)
        l.indexOf((i = u[s])) >= 0 || (c[i] = o[i]);
      return c;
    })(e, Ug);
  return b.cloneElement(Gh(t, r), n);
};
function Yh(e, t, r, n) {
  for (var o = e.length, l = r + (n ? 1 : -1); n ? l-- : ++l < o; )
    if (t(e[l], l, e)) return l;
  return -1;
}
var Kh = Yh;
function Xh(e) {
  return e !== e;
}
var Jh = Xh;
function Qh(e, t, r) {
  for (var n = r - 1, o = e.length; ++n < o; ) if (e[n] === t) return n;
  return -1;
}
var eb = Qh,
  tb = Kh,
  rb = Jh,
  nb = eb;
function ab(e, t, r) {
  return t === t ? nb(e, t, r) : tb(e, rb, r);
}
var ob = ab,
  lb = ob;
function ib(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && lb(e, t, 0) > -1;
}
var sb = ib;
function cb(e, t, r) {
  for (var n = -1, o = e == null ? 0 : e.length; ++n < o; )
    if (r(t, e[n])) return !0;
  return !1;
}
var ub = cb;
function db() {}
var pb = db,
  ea = r0,
  fb = pb,
  mb = Bi,
  gb = 1 / 0,
  hb =
    ea && 1 / mb(new ea([, -0]))[1] == gb
      ? function (e) {
          return new ea(e);
        }
      : fb,
  bb = hb,
  yb = n0,
  vb = sb,
  Eb = ub,
  xb = a0,
  Ab = bb,
  wb = Bi,
  Cb = 200;
function Sb(e, t, r) {
  var n = -1,
    o = vb,
    l = e.length,
    i = !0,
    s = [],
    c = s;
  if (r) (i = !1), (o = Eb);
  else if (l >= Cb) {
    var u = t ? null : Ab(e);
    if (u) return wb(u);
    (i = !1), (o = xb), (c = new yb());
  } else c = t ? [] : s;
  e: for (; ++n < l; ) {
    var d = e[n],
      h = t ? t(d) : d;
    if (((d = r || d !== 0 ? d : 0), i && h === h)) {
      for (var m = c.length; m--; ) if (c[m] === h) continue e;
      t && c.push(h), s.push(d);
    } else o(c, h, r) || (c !== s && c.push(h), s.push(d));
  }
  return s;
}
var kb = Sb,
  Tb = kb;
function Rb(e) {
  return e && e.length ? Tb(e) : [];
}
var Ob = Rb;
const Lb = Ua(Ob);
function _b(e, t) {
  for (
    var r = -1, n = e == null ? 0 : e.length;
    ++r < n && t(e[r], r, e) !== !1;

  );
  return e;
}
var Db = _b,
  Fb = un,
  Mb = Ii;
function $b(e, t) {
  return e && Fb(t, Mb(t), e);
}
var Bb = $b,
  Ib = un,
  Nb = qa;
function Zb(e, t) {
  return e && Ib(t, Nb(t), e);
}
var Hb = Zb,
  jb = un,
  Pb = $i;
function Vb(e, t) {
  return jb(e, Pb(e), t);
}
var zb = Vb,
  qb = un,
  Ub = Bc;
function Wb(e, t) {
  return qb(e, Ub(e), t);
}
var Gb = Wb,
  Yb = Object.prototype,
  Kb = Yb.hasOwnProperty;
function Xb(e) {
  var t = e.length,
    r = new e.constructor(t);
  return (
    t &&
      typeof e[0] == 'string' &&
      Kb.call(e, 'index') &&
      ((r.index = e.index), (r.input = e.input)),
    r
  );
}
var Jb = Xb,
  Qb = Di;
function e3(e, t) {
  var r = t ? Qb(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var t3 = e3,
  r3 = /\w*$/;
function n3(e) {
  var t = new e.constructor(e.source, r3.exec(e));
  return (t.lastIndex = e.lastIndex), t;
}
var a3 = n3,
  ni = o0,
  ai = ni ? ni.prototype : void 0,
  oi = ai ? ai.valueOf : void 0;
function o3(e) {
  return oi ? Object(oi.call(e)) : {};
}
var l3 = o3,
  i3 = Di,
  s3 = t3,
  c3 = a3,
  u3 = l3,
  d3 = Pu,
  p3 = '[object Boolean]',
  f3 = '[object Date]',
  m3 = '[object Map]',
  g3 = '[object Number]',
  h3 = '[object RegExp]',
  b3 = '[object Set]',
  y3 = '[object String]',
  v3 = '[object Symbol]',
  E3 = '[object ArrayBuffer]',
  x3 = '[object DataView]',
  A3 = '[object Float32Array]',
  w3 = '[object Float64Array]',
  C3 = '[object Int8Array]',
  S3 = '[object Int16Array]',
  k3 = '[object Int32Array]',
  T3 = '[object Uint8Array]',
  R3 = '[object Uint8ClampedArray]',
  O3 = '[object Uint16Array]',
  L3 = '[object Uint32Array]';
function _3(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case E3:
      return i3(e);
    case p3:
    case f3:
      return new n(+e);
    case x3:
      return s3(e, r);
    case A3:
    case w3:
    case C3:
    case S3:
    case k3:
    case T3:
    case R3:
    case O3:
    case L3:
      return d3(e, r);
    case m3:
      return new n();
    case g3:
    case y3:
      return new n(e);
    case h3:
      return c3(e);
    case b3:
      return new n();
    case v3:
      return u3(e);
  }
}
var D3 = _3,
  F3 = Wa,
  M3 = Ni,
  $3 = '[object Map]';
function B3(e) {
  return M3(e) && F3(e) == $3;
}
var I3 = B3,
  N3 = I3,
  Z3 = Hi,
  li = Zi,
  ii = li && li.isMap,
  H3 = ii ? Z3(ii) : N3,
  j3 = H3,
  P3 = Wa,
  V3 = Ni,
  z3 = '[object Set]';
function q3(e) {
  return V3(e) && P3(e) == z3;
}
var U3 = q3,
  W3 = U3,
  G3 = Hi,
  si = Zi,
  ci = si && si.isSet,
  Y3 = ci ? G3(ci) : W3,
  K3 = Y3,
  X3 = l0,
  J3 = Db,
  Q3 = Uu,
  e7 = Bb,
  t7 = Hb,
  r7 = Vu,
  n7 = zu,
  a7 = zb,
  o7 = Gb,
  l7 = c0,
  i7 = Ic,
  s7 = Wa,
  c7 = Jb,
  u7 = D3,
  d7 = qu,
  p7 = u0,
  f7 = i0,
  m7 = j3,
  g7 = s0,
  h7 = K3,
  b7 = Ii,
  y7 = qa,
  v7 = 1,
  E7 = 2,
  x7 = 4,
  au = '[object Arguments]',
  A7 = '[object Array]',
  w7 = '[object Boolean]',
  C7 = '[object Date]',
  S7 = '[object Error]',
  ou = '[object Function]',
  k7 = '[object GeneratorFunction]',
  T7 = '[object Map]',
  R7 = '[object Number]',
  lu = '[object Object]',
  O7 = '[object RegExp]',
  L7 = '[object Set]',
  _7 = '[object String]',
  D7 = '[object Symbol]',
  F7 = '[object WeakMap]',
  M7 = '[object ArrayBuffer]',
  $7 = '[object DataView]',
  B7 = '[object Float32Array]',
  I7 = '[object Float64Array]',
  N7 = '[object Int8Array]',
  Z7 = '[object Int16Array]',
  H7 = '[object Int32Array]',
  j7 = '[object Uint8Array]',
  P7 = '[object Uint8ClampedArray]',
  V7 = '[object Uint16Array]',
  z7 = '[object Uint32Array]',
  G = {};
G[au] =
  G[A7] =
  G[M7] =
  G[$7] =
  G[w7] =
  G[C7] =
  G[B7] =
  G[I7] =
  G[N7] =
  G[Z7] =
  G[H7] =
  G[T7] =
  G[R7] =
  G[lu] =
  G[O7] =
  G[L7] =
  G[_7] =
  G[D7] =
  G[j7] =
  G[P7] =
  G[V7] =
  G[z7] =
    !0;
G[S7] = G[ou] = G[F7] = !1;
function en(e, t, r, n, o, l) {
  var i,
    s = t & v7,
    c = t & E7,
    u = t & x7;
  if ((r && (i = o ? r(e, n, o, l) : r(e)), i !== void 0)) return i;
  if (!g7(e)) return e;
  var d = p7(e);
  if (d) {
    if (((i = c7(e)), !s)) return n7(e, i);
  } else {
    var h = s7(e),
      m = h == ou || h == k7;
    if (f7(e)) return r7(e, s);
    if (h == lu || h == au || (m && !o)) {
      if (((i = c || m ? {} : d7(e)), !s))
        return c ? o7(e, t7(i, e)) : a7(e, e7(i, e));
    } else {
      if (!G[h]) return o ? e : {};
      i = u7(e, h, s);
    }
  }
  l || (l = new X3());
  var p = l.get(e);
  if (p) return p;
  l.set(e, i),
    h7(e)
      ? e.forEach(function (A) {
          i.add(en(A, t, r, A, e, l));
        })
      : m7(e) &&
        e.forEach(function (A, w) {
          i.set(w, en(A, t, r, w, e, l));
        });
  var g = u ? (c ? i7 : l7) : c ? y7 : b7,
    f = d ? void 0 : g(e);
  return (
    J3(f || e, function (A, w) {
      f && ((w = A), (A = e[w])), Q3(i, w, en(A, t, r, w, e, l));
    }),
    i
  );
}
var q7 = en,
  U7 = q7,
  W7 = 1,
  G7 = 4;
function Y7(e) {
  return U7(e, W7 | G7);
}
var K7 = Y7;
const X7 = Ua(K7);
var iu = { exports: {} },
  ta,
  ui;
function J7() {
  return (
    ui ||
      ((ui = 1),
      (ta = {
        tocSelector: '.js-toc',
        contentSelector: '.js-toc-content',
        headingSelector: 'h1, h2, h3',
        ignoreSelector: '.js-toc-ignore',
        hasInnerContainers: !1,
        linkClass: 'toc-link',
        extraLinkClasses: '',
        activeLinkClass: 'is-active-link',
        listClass: 'toc-list',
        extraListClasses: '',
        isCollapsedClass: 'is-collapsed',
        collapsibleClass: 'is-collapsible',
        listItemClass: 'toc-list-item',
        activeListItemClass: 'is-active-li',
        collapseDepth: 0,
        scrollSmooth: !0,
        scrollSmoothDuration: 420,
        scrollSmoothOffset: 0,
        scrollEndCallback: function (e) {},
        headingsOffset: 1,
        throttleTimeout: 50,
        positionFixedSelector: null,
        positionFixedClass: 'is-position-fixed',
        fixedSidebarOffset: 'auto',
        includeHtml: !1,
        includeTitleTags: !1,
        onClick: function (e) {},
        orderedList: !0,
        scrollContainer: null,
        skipRendering: !1,
        headingLabelCallback: !1,
        ignoreHiddenElements: !1,
        headingObjectCallback: null,
        basePath: '',
        disableTocScrollSync: !1,
        tocScrollOffset: 0,
      })),
    ta
  );
}
var ra, di;
function Q7() {
  return (
    di ||
      ((di = 1),
      (ra = function (e) {
        var t = [].forEach,
          r = [].some,
          n = document.body,
          o,
          l = !0,
          i = ' ';
        function s(v, y) {
          var x = y.appendChild(u(v));
          if (v.children.length) {
            var E = d(v.isCollapsed);
            v.children.forEach(function (C) {
              s(C, E);
            }),
              x.appendChild(E);
          }
        }
        function c(v, y) {
          var x = !1,
            E = d(x);
          if (
            (y.forEach(function (C) {
              s(C, E);
            }),
            (o = v || o),
            o !== null)
          )
            return (
              o.firstChild && o.removeChild(o.firstChild),
              y.length === 0 ? o : o.appendChild(E)
            );
        }
        function u(v) {
          var y = document.createElement('li'),
            x = document.createElement('a');
          return (
            e.listItemClass && y.setAttribute('class', e.listItemClass),
            e.onClick && (x.onclick = e.onClick),
            e.includeTitleTags && x.setAttribute('title', v.textContent),
            e.includeHtml && v.childNodes.length
              ? t.call(v.childNodes, function (E) {
                  x.appendChild(E.cloneNode(!0));
                })
              : (x.textContent = v.textContent),
            x.setAttribute('href', e.basePath + '#' + v.id),
            x.setAttribute(
              'class',
              e.linkClass +
                i +
                'node-name--' +
                v.nodeName +
                i +
                e.extraLinkClasses
            ),
            y.appendChild(x),
            y
          );
        }
        function d(v) {
          var y = e.orderedList ? 'ol' : 'ul',
            x = document.createElement(y),
            E = e.listClass + i + e.extraListClasses;
          return (
            v &&
              ((E = E + i + e.collapsibleClass),
              (E = E + i + e.isCollapsedClass)),
            x.setAttribute('class', E),
            x
          );
        }
        function h() {
          if (e.scrollContainer && document.querySelector(e.scrollContainer)) {
            var v;
            v = document.querySelector(e.scrollContainer).scrollTop;
          } else v = document.documentElement.scrollTop || n.scrollTop;
          var y = document.querySelector(e.positionFixedSelector);
          e.fixedSidebarOffset === 'auto' &&
            (e.fixedSidebarOffset = o.offsetTop),
            v > e.fixedSidebarOffset
              ? y.className.indexOf(e.positionFixedClass) === -1 &&
                (y.className += i + e.positionFixedClass)
              : (y.className = y.className.replace(
                  i + e.positionFixedClass,
                  ''
                ));
        }
        function m(v) {
          var y = 0;
          return (
            v !== null &&
              ((y = v.offsetTop),
              e.hasInnerContainers && (y += m(v.offsetParent))),
            y
          );
        }
        function p(v, y) {
          return v && v.className !== y && (v.className = y), v;
        }
        function g(v) {
          if (e.scrollContainer && document.querySelector(e.scrollContainer)) {
            var y;
            y = document.querySelector(e.scrollContainer).scrollTop;
          } else y = document.documentElement.scrollTop || n.scrollTop;
          e.positionFixedSelector && h();
          var x = v,
            E;
          if (l && o !== null && x.length > 0) {
            r.call(x, function (_, D) {
              if (m(_) > y + e.headingsOffset + 10) {
                var H = D === 0 ? D : D - 1;
                return (E = x[H]), !0;
              } else if (D === x.length - 1) return (E = x[x.length - 1]), !0;
            });
            var C = o.querySelector('.' + e.activeLinkClass),
              S = o.querySelector(
                '.' +
                  e.linkClass +
                  '.node-name--' +
                  E.nodeName +
                  '[href="' +
                  e.basePath +
                  '#' +
                  E.id.replace(/([ #;&,.+*~':"!^$[\]()=>|/\\@])/g, '\\$1') +
                  '"]'
              );
            if (C === S) return;
            var k = o.querySelectorAll('.' + e.linkClass);
            t.call(k, function (_) {
              p(_, _.className.replace(i + e.activeLinkClass, ''));
            });
            var R = o.querySelectorAll('.' + e.listItemClass);
            t.call(R, function (_) {
              p(_, _.className.replace(i + e.activeListItemClass, ''));
            }),
              S &&
                S.className.indexOf(e.activeLinkClass) === -1 &&
                (S.className += i + e.activeLinkClass);
            var O = S && S.parentNode;
            O &&
              O.className.indexOf(e.activeListItemClass) === -1 &&
              (O.className += i + e.activeListItemClass);
            var L = o.querySelectorAll(
              '.' + e.listClass + '.' + e.collapsibleClass
            );
            t.call(L, function (_) {
              _.className.indexOf(e.isCollapsedClass) === -1 &&
                (_.className += i + e.isCollapsedClass);
            }),
              S &&
                S.nextSibling &&
                S.nextSibling.className.indexOf(e.isCollapsedClass) !== -1 &&
                p(
                  S.nextSibling,
                  S.nextSibling.className.replace(i + e.isCollapsedClass, '')
                ),
              f(S && S.parentNode.parentNode);
          }
        }
        function f(v) {
          return v &&
            v.className.indexOf(e.collapsibleClass) !== -1 &&
            v.className.indexOf(e.isCollapsedClass) !== -1
            ? (p(v, v.className.replace(i + e.isCollapsedClass, '')),
              f(v.parentNode.parentNode))
            : v;
        }
        function A(v) {
          var y = v.target || v.srcElement;
          typeof y.className != 'string' ||
            y.className.indexOf(e.linkClass) === -1 ||
            (l = !1);
        }
        function w() {
          l = !0;
        }
        return {
          enableTocAnimation: w,
          disableTocAnimation: A,
          render: c,
          updateToc: g,
        };
      })),
    ra
  );
}
var na, pi;
function e4() {
  return (
    pi ||
      ((pi = 1),
      (na = function (t) {
        var r = [].reduce;
        function n(d) {
          return d[d.length - 1];
        }
        function o(d) {
          return +d.nodeName.toUpperCase().replace('H', '');
        }
        function l(d) {
          try {
            return (
              d instanceof window.HTMLElement ||
              d instanceof window.parent.HTMLElement
            );
          } catch {
            return d instanceof window.HTMLElement;
          }
        }
        function i(d) {
          if (!l(d)) return d;
          if (t.ignoreHiddenElements && (!d.offsetHeight || !d.offsetParent))
            return null;
          const h =
            d.getAttribute('data-heading-label') ||
            (t.headingLabelCallback
              ? String(t.headingLabelCallback(d.innerText))
              : (d.innerText || d.textContent).trim());
          var m = {
            id: d.id,
            children: [],
            nodeName: d.nodeName,
            headingLevel: o(d),
            textContent: h,
          };
          return (
            t.includeHtml && (m.childNodes = d.childNodes),
            t.headingObjectCallback ? t.headingObjectCallback(m, d) : m
          );
        }
        function s(d, h) {
          for (
            var m = i(d),
              p = m.headingLevel,
              g = h,
              f = n(g),
              A = f ? f.headingLevel : 0,
              w = p - A;
            w > 0 && ((f = n(g)), !(f && p === f.headingLevel));

          )
            f && f.children !== void 0 && (g = f.children), w--;
          return p >= t.collapseDepth && (m.isCollapsed = !0), g.push(m), g;
        }
        function c(d, h) {
          var m = h;
          t.ignoreSelector &&
            (m = h.split(',').map(function (g) {
              return g.trim() + ':not(' + t.ignoreSelector + ')';
            }));
          try {
            return d.querySelectorAll(m);
          } catch {
            return console.warn('Headers not found with selector: ' + m), null;
          }
        }
        function u(d) {
          return r.call(
            d,
            function (m, p) {
              var g = i(p);
              return g && s(g, m.nest), m;
            },
            { nest: [] }
          );
        }
        return { nestHeadingsArray: u, selectHeadings: c };
      })),
    na
  );
}
var aa, fi;
function t4() {
  if (fi) return aa;
  fi = 1;
  const e = 30;
  return (
    (aa = function (r) {
      var n = r.tocElement || document.querySelector(r.tocSelector);
      if (n && n.scrollHeight > n.clientHeight) {
        var o = n.querySelector('.' + r.activeListItemClass);
        if (o) {
          var l = n.scrollTop,
            i = l + n.clientHeight,
            s = o.offsetTop,
            c = s + o.clientHeight;
          s < l + r.tocScrollOffset
            ? (n.scrollTop -= l - s + r.tocScrollOffset)
            : c > i - r.tocScrollOffset - e &&
              (n.scrollTop += c - i + r.tocScrollOffset + 2 * e);
        }
      }
    }),
    aa
  );
}
var oa = {},
  mi;
function r4() {
  if (mi) return oa;
  (mi = 1), (oa.initSmoothScrolling = e);
  function e(r) {
    var n = r.duration,
      o = r.offset,
      l = location.hash ? c(location.href) : location.href;
    i();
    function i() {
      document.body.addEventListener('click', d, !1);
      function d(h) {
        !s(h.target) ||
          h.target.className.indexOf('no-smooth-scroll') > -1 ||
          (h.target.href.charAt(h.target.href.length - 2) === '#' &&
            h.target.href.charAt(h.target.href.length - 1) === '!') ||
          h.target.className.indexOf(r.linkClass) === -1 ||
          t(h.target.hash, {
            duration: n,
            offset: o,
            callback: function () {
              u(h.target.hash);
            },
          });
      }
    }
    function s(d) {
      return (
        d.tagName.toLowerCase() === 'a' &&
        (d.hash.length > 0 || d.href.charAt(d.href.length - 1) === '#') &&
        (c(d.href) === l || c(d.href) + '#' === l)
      );
    }
    function c(d) {
      return d.slice(0, d.lastIndexOf('#'));
    }
    function u(d) {
      var h = document.getElementById(d.substring(1));
      h &&
        (/^(?:a|select|input|button|textarea)$/i.test(h.tagName) ||
          (h.tabIndex = -1),
        h.focus());
    }
  }
  function t(r, n) {
    var o = window.pageYOffset,
      l = {
        duration: n.duration,
        offset: n.offset || 0,
        callback: n.callback,
        easing: n.easing || p,
      },
      i =
        document.querySelector(
          '[id="' + decodeURI(r).split('#').join('') + '"]'
        ) || document.querySelector('[id="' + r.split('#').join('') + '"]'),
      s =
        typeof r == 'string'
          ? l.offset +
            (r
              ? (i && i.getBoundingClientRect().top) || 0
              : -(
                  document.documentElement.scrollTop || document.body.scrollTop
                ))
          : r,
      c = typeof l.duration == 'function' ? l.duration(s) : l.duration,
      u,
      d;
    requestAnimationFrame(function (g) {
      (u = g), h(g);
    });
    function h(g) {
      (d = g - u),
        window.scrollTo(0, l.easing(d, o, s, c)),
        d < c ? requestAnimationFrame(h) : m();
    }
    function m() {
      window.scrollTo(0, o + s),
        typeof l.callback == 'function' && l.callback();
    }
    function p(g, f, A, w) {
      return (
        (g /= w / 2),
        g < 1 ? (A / 2) * g * g + f : (g--, (-A / 2) * (g * (g - 2) - 1) + f)
      );
    }
  }
  return oa;
}
(function (e, t) {
  (function (r, n) {
    e.exports = n(r);
  })(typeof $n < 'u' ? $n : window || $n, function (r) {
    var n = J7(),
      o = {},
      l = {},
      i = Q7(),
      s = e4(),
      c = t4(),
      u,
      d,
      h =
        !!r &&
        !!r.document &&
        !!r.document.querySelector &&
        !!r.addEventListener;
    if (typeof window > 'u' && !h) return;
    var m,
      p = Object.prototype.hasOwnProperty;
    function g() {
      for (var v = {}, y = 0; y < arguments.length; y++) {
        var x = arguments[y];
        for (var E in x) p.call(x, E) && (v[E] = x[E]);
      }
      return v;
    }
    function f(v, y, x) {
      y || (y = 250);
      var E, C;
      return function () {
        var S = x || this,
          k = +new Date(),
          R = arguments;
        E && k < E + y
          ? (clearTimeout(C),
            (C = setTimeout(function () {
              (E = k), v.apply(S, R);
            }, y)))
          : ((E = k), v.apply(S, R));
      };
    }
    function A(v) {
      try {
        return v.contentElement || document.querySelector(v.contentSelector);
      } catch {
        return (
          console.warn('Contents element not found: ' + v.contentSelector), null
        );
      }
    }
    function w(v) {
      try {
        return v.tocElement || document.querySelector(v.tocSelector);
      } catch {
        return console.warn('TOC element not found: ' + v.tocSelector), null;
      }
    }
    return (
      (l.destroy = function () {
        var v = w(o);
        v !== null &&
          (o.skipRendering || (v && (v.innerHTML = '')),
          o.scrollContainer && document.querySelector(o.scrollContainer)
            ? (document
                .querySelector(o.scrollContainer)
                .removeEventListener('scroll', this._scrollListener, !1),
              document
                .querySelector(o.scrollContainer)
                .removeEventListener('resize', this._scrollListener, !1),
              u &&
                document
                  .querySelector(o.scrollContainer)
                  .removeEventListener('click', this._clickListener, !1))
            : (document.removeEventListener('scroll', this._scrollListener, !1),
              document.removeEventListener('resize', this._scrollListener, !1),
              u &&
                document.removeEventListener(
                  'click',
                  this._clickListener,
                  !1
                )));
      }),
      (l.init = function (v) {
        if (h) {
          (o = g(n, v || {})),
            (this.options = o),
            (this.state = {}),
            o.scrollSmooth &&
              ((o.duration = o.scrollSmoothDuration),
              (o.offset = o.scrollSmoothOffset),
              (l.scrollSmooth = r4().initSmoothScrolling(o))),
            (u = i(o)),
            (d = s(o)),
            (this._buildHtml = u),
            (this._parseContent = d),
            (this._headingsArray = m),
            l.destroy();
          var y = A(o);
          if (y !== null) {
            var x = w(o);
            if (
              x !== null &&
              ((m = d.selectHeadings(y, o.headingSelector)), m !== null)
            ) {
              var E = d.nestHeadingsArray(m),
                C = E.nest;
              if (!o.skipRendering) u.render(x, C);
              else return this;
              (this._scrollListener = f(function (k) {
                u.updateToc(m), !o.disableTocScrollSync && c(o);
                var R =
                  k &&
                  k.target &&
                  k.target.scrollingElement &&
                  k.target.scrollingElement.scrollTop === 0;
                ((k && (k.eventPhase === 0 || k.currentTarget === null)) ||
                  R) &&
                  (u.updateToc(m),
                  o.scrollEndCallback && o.scrollEndCallback(k));
              }, o.throttleTimeout)),
                this._scrollListener(),
                o.scrollContainer && document.querySelector(o.scrollContainer)
                  ? (document
                      .querySelector(o.scrollContainer)
                      .addEventListener('scroll', this._scrollListener, !1),
                    document
                      .querySelector(o.scrollContainer)
                      .addEventListener('resize', this._scrollListener, !1))
                  : (document.addEventListener(
                      'scroll',
                      this._scrollListener,
                      !1
                    ),
                    document.addEventListener(
                      'resize',
                      this._scrollListener,
                      !1
                    ));
              var S = null;
              return (
                (this._clickListener = f(function (k) {
                  o.scrollSmooth && u.disableTocAnimation(k),
                    u.updateToc(m),
                    S && clearTimeout(S),
                    (S = setTimeout(function () {
                      u.enableTocAnimation();
                    }, o.scrollSmoothDuration));
                }, o.throttleTimeout)),
                o.scrollContainer && document.querySelector(o.scrollContainer)
                  ? document
                      .querySelector(o.scrollContainer)
                      .addEventListener('click', this._clickListener, !1)
                  : document.addEventListener('click', this._clickListener, !1),
                this
              );
            }
          }
        }
      }),
      (l.refresh = function (v) {
        l.destroy(), l.init(v || this.options);
      }),
      (r.tocbot = l),
      l
    );
  });
})(iu);
var gi = iu.exports;
const { global: _e } = __STORYBOOK_MODULE_GLOBAL__,
  { deprecate: ue, once: n4, logger: Io } = __STORYBOOK_MODULE_CLIENT_LOGGER__,
  {
    filterArgTypes: a4,
    composeConfigs: $6,
    Preview: B6,
    DocsContext: I6,
  } = __STORYBOOK_MODULE_PREVIEW_API__,
  {
    STORY_ARGS_UPDATED: hi,
    UPDATE_STORY_ARGS: o4,
    RESET_STORY_ARGS: l4,
    GLOBALS_UPDATED: bi,
    NAVIGATE_URL: i4,
  } = __STORYBOOK_MODULE_CORE_EVENTS__;
__STORYBOOK_MODULE_CHANNELS__;
var s4 = T.div(Q, ({ theme: e }) => ({
    backgroundColor:
      e.base === 'light' ? 'rgba(0,0,0,.01)' : 'rgba(255,255,255,.01)',
    borderRadius: e.appBorderRadius,
    border: `1px dashed ${e.appBorderColor}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: '25px 0 40px',
    color: J(0.3, e.color.defaultText),
    fontSize: e.typography.size.s2,
  })),
  su = (e) =>
    a.createElement(s4, { ...e, className: 'docblock-emptyblock sb-unstyled' }),
  c4 = T(An)(({ theme: e }) => ({
    fontSize: `${e.typography.size.s2 - 1}px`,
    lineHeight: '19px',
    margin: '25px 0 40px',
    borderRadius: e.appBorderRadius,
    boxShadow:
      e.base === 'light'
        ? 'rgba(0, 0, 0, 0.10) 0 1px 3px 0'
        : 'rgba(0, 0, 0, 0.20) 0 2px 5px 0',
    'pre.prismjs': { padding: 20, background: 'inherit' },
  })),
  u4 = T.div(({ theme: e }) => ({
    background: e.background.content,
    borderRadius: e.appBorderRadius,
    border: `1px solid ${e.appBorderColor}`,
    boxShadow:
      e.base === 'light'
        ? 'rgba(0, 0, 0, 0.10) 0 1px 3px 0'
        : 'rgba(0, 0, 0, 0.20) 0 2px 5px 0',
    margin: '25px 0 40px',
    padding: '20px 20px 20px 22px',
  })),
  Vr = T.div(({ theme: e }) => ({
    animation: `${e.animation.glow} 1.5s ease-in-out infinite`,
    background: e.appBorderColor,
    height: 17,
    marginTop: 1,
    width: '60%',
    [`&:first-child${ba}`]: { margin: 0 },
  })),
  d4 = () =>
    a.createElement(
      u4,
      null,
      a.createElement(Vr, null),
      a.createElement(Vr, { style: { width: '80%' } }),
      a.createElement(Vr, { style: { width: '30%' } }),
      a.createElement(Vr, { style: { width: '80%' } })
    ),
  No = ({
    isLoading: e,
    error: t,
    language: r,
    code: n,
    dark: o,
    format: l,
    ...i
  }) => {
    if (e) return a.createElement(d4, null);
    if (t) return a.createElement(su, null, t);
    let s = a.createElement(
      c4,
      {
        bordered: !0,
        copyable: !0,
        format: l,
        language: r,
        className: 'docblock-source sb-unstyled',
        ...i,
      },
      n
    );
    if (typeof o > 'u') return s;
    let c = o ? ca.dark : ca.light;
    return a.createElement(ts, { theme: ha(c) }, s);
  };
No.defaultProps = { format: !1 };
var ne = (e) =>
    `& :where(${e}:not(.sb-anchor, .sb-unstyled, .sb-unstyled ${e}))`,
  Zo = 600,
  p4 = T.h1(Q, ({ theme: e }) => ({
    color: e.color.defaultText,
    fontSize: e.typography.size.m3,
    fontWeight: e.typography.weight.bold,
    lineHeight: '32px',
    [`@media (min-width: ${Zo}px)`]: {
      fontSize: e.typography.size.l1,
      lineHeight: '36px',
      marginBottom: '16px',
    },
  })),
  f4 = T.h2(Q, ({ theme: e }) => ({
    fontWeight: e.typography.weight.regular,
    fontSize: e.typography.size.s3,
    lineHeight: '20px',
    borderBottom: 'none',
    marginBottom: 15,
    [`@media (min-width: ${Zo}px)`]: {
      fontSize: e.typography.size.m1,
      lineHeight: '28px',
      marginBottom: 24,
    },
    color: J(0.25, e.color.defaultText),
  })),
  m4 = T.div(({ theme: e }) => {
    let t = {
        fontFamily: e.typography.fonts.base,
        fontSize: e.typography.size.s3,
        margin: 0,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
        WebkitOverflowScrolling: 'touch',
      },
      r = {
        margin: '20px 0 8px',
        padding: 0,
        cursor: 'text',
        position: 'relative',
        color: e.color.defaultText,
        '&:first-of-type': { marginTop: 0, paddingTop: 0 },
        '&:hover a.anchor': { textDecoration: 'none' },
        '& code': { fontSize: 'inherit' },
      },
      n = {
        lineHeight: 1,
        margin: '0 2px',
        padding: '3px 5px',
        whiteSpace: 'nowrap',
        borderRadius: 3,
        fontSize: e.typography.size.s2 - 1,
        border:
          e.base === 'light'
            ? `1px solid ${e.color.mediumlight}`
            : `1px solid ${e.color.darker}`,
        color:
          e.base === 'light'
            ? J(0.1, e.color.defaultText)
            : J(0.3, e.color.defaultText),
        backgroundColor: e.base === 'light' ? e.color.lighter : e.color.border,
      };
    return {
      maxWidth: 1e3,
      width: '100%',
      [ne('a')]: {
        ...t,
        fontSize: 'inherit',
        lineHeight: '24px',
        color: e.color.secondary,
        textDecoration: 'none',
        '&.absent': { color: '#cc0000' },
        '&.anchor': {
          display: 'block',
          paddingLeft: 30,
          marginLeft: -30,
          cursor: 'pointer',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
        },
      },
      [ne('blockquote')]: {
        ...t,
        margin: '16px 0',
        borderLeft: `4px solid ${e.color.medium}`,
        padding: '0 15px',
        color: e.color.dark,
        '& > :first-of-type': { marginTop: 0 },
        '& > :last-child': { marginBottom: 0 },
      },
      [ne('div')]: t,
      [ne('dl')]: {
        ...t,
        margin: '16px 0',
        padding: 0,
        '& dt': {
          fontSize: '14px',
          fontWeight: 'bold',
          fontStyle: 'italic',
          padding: 0,
          margin: '16px 0 4px',
        },
        '& dt:first-of-type': { padding: 0 },
        '& dt > :first-of-type': { marginTop: 0 },
        '& dt > :last-child': { marginBottom: 0 },
        '& dd': { margin: '0 0 16px', padding: '0 15px' },
        '& dd > :first-of-type': { marginTop: 0 },
        '& dd > :last-child': { marginBottom: 0 },
      },
      [ne('h1')]: {
        ...t,
        ...r,
        fontSize: `${e.typography.size.l1}px`,
        fontWeight: e.typography.weight.bold,
      },
      [ne('h2')]: {
        ...t,
        ...r,
        fontSize: `${e.typography.size.m2}px`,
        paddingBottom: 4,
        borderBottom: `1px solid ${e.appBorderColor}`,
      },
      [ne('h3')]: {
        ...t,
        ...r,
        fontSize: `${e.typography.size.m1}px`,
        fontWeight: e.typography.weight.bold,
      },
      [ne('h4')]: { ...t, ...r, fontSize: `${e.typography.size.s3}px` },
      [ne('h5')]: { ...t, ...r, fontSize: `${e.typography.size.s2}px` },
      [ne('h6')]: {
        ...t,
        ...r,
        fontSize: `${e.typography.size.s2}px`,
        color: e.color.dark,
      },
      [ne('hr')]: {
        border: '0 none',
        borderTop: `1px solid ${e.appBorderColor}`,
        height: 4,
        padding: 0,
      },
      [ne('img')]: { maxWidth: '100%' },
      [ne('li')]: {
        ...t,
        fontSize: e.typography.size.s2,
        color: e.color.defaultText,
        lineHeight: '24px',
        '& + li': { marginTop: '.25em' },
        '& ul, & ol': { marginTop: '.25em', marginBottom: 0 },
        '& code': n,
      },
      [ne('ol')]: {
        ...t,
        margin: '16px 0',
        paddingLeft: 30,
        '& :first-of-type': { marginTop: 0 },
        '& :last-child': { marginBottom: 0 },
      },
      [ne('p')]: {
        ...t,
        margin: '16px 0',
        fontSize: e.typography.size.s2,
        lineHeight: '24px',
        color: e.color.defaultText,
        '& code': n,
      },
      [ne('pre')]: {
        ...t,
        fontFamily: e.typography.fonts.mono,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        lineHeight: '18px',
        padding: '11px 1rem',
        whiteSpace: 'pre-wrap',
        color: 'inherit',
        borderRadius: 3,
        margin: '1rem 0',
        '&:not(.prismjs)': {
          background: 'transparent',
          border: 'none',
          borderRadius: 0,
          padding: 0,
          margin: 0,
        },
        '& pre, &.prismjs': {
          padding: 15,
          margin: 0,
          whiteSpace: 'pre-wrap',
          color: 'inherit',
          fontSize: '13px',
          lineHeight: '19px',
          code: { color: 'inherit', fontSize: 'inherit' },
        },
        '& code': { whiteSpace: 'pre' },
        '& code, & tt': { border: 'none' },
      },
      [ne('span')]: {
        ...t,
        '&.frame': {
          display: 'block',
          overflow: 'hidden',
          '& > span': {
            border: `1px solid ${e.color.medium}`,
            display: 'block',
            float: 'left',
            overflow: 'hidden',
            margin: '13px 0 0',
            padding: 7,
            width: 'auto',
          },
          '& span img': { display: 'block', float: 'left' },
          '& span span': {
            clear: 'both',
            color: e.color.darkest,
            display: 'block',
            padding: '5px 0 0',
          },
        },
        '&.align-center': {
          display: 'block',
          overflow: 'hidden',
          clear: 'both',
          '& > span': {
            display: 'block',
            overflow: 'hidden',
            margin: '13px auto 0',
            textAlign: 'center',
          },
          '& span img': { margin: '0 auto', textAlign: 'center' },
        },
        '&.align-right': {
          display: 'block',
          overflow: 'hidden',
          clear: 'both',
          '& > span': {
            display: 'block',
            overflow: 'hidden',
            margin: '13px 0 0',
            textAlign: 'right',
          },
          '& span img': { margin: 0, textAlign: 'right' },
        },
        '&.float-left': {
          display: 'block',
          marginRight: 13,
          overflow: 'hidden',
          float: 'left',
          '& span': { margin: '13px 0 0' },
        },
        '&.float-right': {
          display: 'block',
          marginLeft: 13,
          overflow: 'hidden',
          float: 'right',
          '& > span': {
            display: 'block',
            overflow: 'hidden',
            margin: '13px auto 0',
            textAlign: 'right',
          },
        },
      },
      [ne('table')]: {
        ...t,
        margin: '16px 0',
        fontSize: e.typography.size.s2,
        lineHeight: '24px',
        padding: 0,
        borderCollapse: 'collapse',
        '& tr': {
          borderTop: `1px solid ${e.appBorderColor}`,
          backgroundColor: e.appContentBg,
          margin: 0,
          padding: 0,
        },
        '& tr:nth-of-type(2n)': {
          backgroundColor: e.base === 'dark' ? e.color.darker : e.color.lighter,
        },
        '& tr th': {
          fontWeight: 'bold',
          color: e.color.defaultText,
          border: `1px solid ${e.appBorderColor}`,
          margin: 0,
          padding: '6px 13px',
        },
        '& tr td': {
          border: `1px solid ${e.appBorderColor}`,
          color: e.color.defaultText,
          margin: 0,
          padding: '6px 13px',
        },
        '& tr th :first-of-type, & tr td :first-of-type': { marginTop: 0 },
        '& tr th :last-child, & tr td :last-child': { marginBottom: 0 },
      },
      [ne('ul')]: {
        ...t,
        margin: '16px 0',
        paddingLeft: 30,
        '& :first-of-type': { marginTop: 0 },
        '& :last-child': { marginBottom: 0 },
        listStyle: 'disc',
      },
    };
  }),
  g4 = T.div(({ theme: e }) => ({
    background: e.background.content,
    display: 'flex',
    justifyContent: 'center',
    padding: '4rem 20px',
    minHeight: '100vh',
    boxSizing: 'border-box',
    gap: '3rem',
    [`@media (min-width: ${Zo}px)`]: {},
  })),
  h4 = ({ children: e, toc: t }) =>
    a.createElement(
      g4,
      { className: 'sbdocs sbdocs-wrapper' },
      a.createElement(m4, { className: 'sbdocs sbdocs-content' }, e),
      t
    ),
  _n = (e) => ({
    borderRadius: e.appBorderRadius,
    background: e.background.content,
    boxShadow:
      e.base === 'light'
        ? 'rgba(0, 0, 0, 0.10) 0 1px 3px 0'
        : 'rgba(0, 0, 0, 0.20) 0 2px 5px 0',
    border: `1px solid ${e.appBorderColor}`,
  }),
  b4 = ({ zoom: e, resetZoom: t }) =>
    a.createElement(
      a.Fragment,
      null,
      a.createElement(
        Ft,
        {
          key: 'zoomin',
          onClick: (r) => {
            r.preventDefault(), e(0.8);
          },
          title: 'Zoom in',
        },
        a.createElement(ye, { icon: 'zoom' })
      ),
      a.createElement(
        Ft,
        {
          key: 'zoomout',
          onClick: (r) => {
            r.preventDefault(), e(1.25);
          },
          title: 'Zoom out',
        },
        a.createElement(ye, { icon: 'zoomout' })
      ),
      a.createElement(
        Ft,
        {
          key: 'zoomreset',
          onClick: (r) => {
            r.preventDefault(), t();
          },
          title: 'Reset zoom',
        },
        a.createElement(ye, { icon: 'zoomreset' })
      )
    ),
  y4 = T(Sn)({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    transition: 'transform .2s linear',
  }),
  v4 = ({
    isLoading: e,
    storyId: t,
    baseUrl: r,
    zoom: n,
    resetZoom: o,
    ...l
  }) =>
    a.createElement(
      y4,
      { ...l },
      a.createElement(
        b.Fragment,
        { key: 'left' },
        e
          ? [1, 2, 3].map((i) => a.createElement(kc, { key: i }))
          : a.createElement(b4, { zoom: n, resetZoom: o })
      )
    ),
  cu = b.createContext({ scale: 1 }),
  { window: E4 } = _e,
  x4 = class extends b.Component {
    constructor() {
      super(...arguments), (this.iframe = null);
    }
    componentDidMount() {
      let { id: e } = this.props;
      this.iframe = E4.document.getElementById(e);
    }
    shouldComponentUpdate(e) {
      let { scale: t } = e;
      return (
        t !== this.props.scale &&
          this.setIframeBodyStyle({
            width: `${t * 100}%`,
            height: `${t * 100}%`,
            transform: `scale(${1 / t})`,
            transformOrigin: 'top left',
          }),
        !1
      );
    }
    setIframeBodyStyle(e) {
      return Object.assign(this.iframe.contentDocument.body.style, e);
    }
    render() {
      let {
        id: e,
        title: t,
        src: r,
        allowFullScreen: n,
        scale: o,
        ...l
      } = this.props;
      return a.createElement('iframe', {
        id: e,
        title: t,
        src: r,
        ...(n ? { allow: 'fullscreen' } : {}),
        loading: 'lazy',
        ...l,
      });
    }
  },
  { PREVIEW_URL: A4 } = _e,
  w4 = A4 || 'iframe.html',
  Ia = ({ story: e, primary: t }) => `story--${e.id}${t ? '--primary' : ''}`,
  C4 = (e) => {
    let t = b.useRef(),
      [r, n] = b.useState(!0),
      [o, l] = b.useState(),
      {
        story: i,
        height: s,
        autoplay: c,
        forceInitialArgs: u,
        renderStoryToElement: d,
      } = e;
    return (
      b.useEffect(() => {
        if (!(i && t.current)) return () => {};
        let h = t.current,
          m = d(
            i,
            h,
            {
              showMain: () => {},
              showError: ({ title: p, description: g }) =>
                l(new Error(`${p} - ${g}`)),
              showException: (p) => l(p),
            },
            { autoplay: c, forceInitialArgs: u }
          );
        return (
          n(!1),
          () => {
            Promise.resolve().then(() => m());
          }
        );
      }, [c, d, i]),
      o
        ? a.createElement('pre', null, a.createElement(yc, { error: o }))
        : a.createElement(
            a.Fragment,
            null,
            s
              ? a.createElement(
                  'style',
                  null,
                  `#${Ia(e)} { min-height: ${s}; transform: translateZ(0); overflow: auto }`
                )
              : null,
            r && a.createElement(Ho, null),
            a.createElement('div', {
              ref: t,
              id: `${Ia(e)}-inner`,
              'data-name': i.name,
            })
          )
    );
  },
  S4 = ({ story: e, height: t = '500px' }) =>
    a.createElement(
      'div',
      { style: { width: '100%', height: t } },
      a.createElement(cu.Consumer, null, ({ scale: r }) =>
        a.createElement(x4, {
          key: 'iframe',
          id: `iframe--${e.id}`,
          title: e.name,
          src: Lc(w4, e.id, { viewMode: 'story' }),
          allowFullScreen: !0,
          scale: r,
          style: { width: '100%', height: '100%', border: '0 none' },
        })
      )
    ),
  k4 = (e) => {
    let { inline: t } = e;
    return a.createElement(
      'div',
      {
        id: Ia(e),
        className: 'sb-story sb-unstyled',
        'data-story-block': 'true',
      },
      t ? a.createElement(C4, { ...e }) : a.createElement(S4, { ...e })
    );
  },
  Ho = () => a.createElement(Oc, null),
  T4 = T.div(
    ({ isColumn: e, columns: t, layout: r }) => ({
      display: e || !t ? 'block' : 'flex',
      position: 'relative',
      flexWrap: 'wrap',
      overflow: 'auto',
      flexDirection: e ? 'column' : 'row',
      '& .innerZoomElementWrapper > *': e
        ? {
            width: r !== 'fullscreen' ? 'calc(100% - 20px)' : '100%',
            display: 'block',
          }
        : {
            maxWidth: r !== 'fullscreen' ? 'calc(100% - 20px)' : '100%',
            display: 'inline-block',
          },
    }),
    ({ layout: e = 'padded' }) =>
      e === 'centered' || e === 'padded'
        ? {
            padding: '30px 20px',
            '& .innerZoomElementWrapper > *': {
              width: 'auto',
              border: '10px solid transparent!important',
            },
          }
        : {},
    ({ layout: e = 'padded' }) =>
      e === 'centered'
        ? {
            display: 'flex',
            justifyContent: 'center',
            justifyItems: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }
        : {},
    ({ columns: e }) =>
      e && e > 1
        ? {
            '.innerZoomElementWrapper > *': {
              minWidth: `calc(100% / ${e} - 20px)`,
            },
          }
        : {}
  ),
  yi = T(No)(({ theme: e }) => ({
    margin: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: e.appBorderRadius,
    borderBottomRightRadius: e.appBorderRadius,
    border: 'none',
    background:
      e.base === 'light'
        ? 'rgba(0, 0, 0, 0.85)'
        : Ge(0.05, e.background.content),
    color: e.color.lightest,
    button: {
      background:
        e.base === 'light'
          ? 'rgba(0, 0, 0, 0.85)'
          : Ge(0.05, e.background.content),
    },
  })),
  R4 = T.div(
    ({ theme: e, withSource: t, isExpanded: r }) => ({
      position: 'relative',
      overflow: 'hidden',
      margin: '25px 0 40px',
      ..._n(e),
      borderBottomLeftRadius: t && r && 0,
      borderBottomRightRadius: t && r && 0,
      borderBottomWidth: r && 0,
      'h3 + &': { marginTop: '16px' },
    }),
    ({ withToolbar: e }) => e && { paddingTop: 40 }
  ),
  O4 = (e, t, r) => {
    switch (!0) {
      case !!(e && e.error):
        return {
          source: null,
          actionItem: {
            title: 'No code available',
            className: 'docblock-code-toggle docblock-code-toggle--disabled',
            disabled: !0,
            onClick: () => r(!1),
          },
        };
      case t:
        return {
          source: a.createElement(yi, { ...e, dark: !0 }),
          actionItem: {
            title: 'Hide code',
            className: 'docblock-code-toggle docblock-code-toggle--expanded',
            onClick: () => r(!1),
          },
        };
      default:
        return {
          source: a.createElement(yi, { ...e, dark: !0 }),
          actionItem: {
            title: 'Show code',
            className: 'docblock-code-toggle',
            onClick: () => r(!0),
          },
        };
    }
  };
function L4(e) {
  if (b.Children.count(e) === 1) {
    let t = e;
    if (t.props) return t.props.id;
  }
  return null;
}
var _4 = T(v4)({ position: 'absolute', top: 0, left: 0, right: 0, height: 40 }),
  D4 = T.div({ overflow: 'hidden', position: 'relative' }),
  Na = ({
    isLoading: e,
    isColumn: t,
    columns: r,
    children: n,
    withSource: o,
    withToolbar: l = !1,
    isExpanded: i = !1,
    additionalActions: s,
    className: c,
    layout: u = 'padded',
    ...d
  }) => {
    let [h, m] = b.useState(i),
      { source: p, actionItem: g } = O4(o, h, m),
      [f, A] = b.useState(1),
      w = [c].concat(['sbdocs', 'sbdocs-preview', 'sb-unstyled']),
      v = o ? [g] : [],
      [y, x] = b.useState(s ? [...s] : []),
      E = [...v, ...y],
      { window: C } = _e,
      S = b.useCallback(async (R) => {
        let { createCopyToClipboardFunction: O } = await yt(
          () => Promise.resolve().then(() => Qm),
          void 0,
          import.meta.url
        );
        O();
      }, []),
      k = (R) => {
        let O = C.getSelection();
        (O && O.type === 'Range') ||
          (R.preventDefault(),
          y.filter((L) => L.title === 'Copied').length === 0 &&
            S(p.props.code).then(() => {
              x([...y, { title: 'Copied', onClick: () => {} }]),
                C.setTimeout(
                  () => x(y.filter((L) => L.title !== 'Copied')),
                  1500
                );
            }));
      };
    return a.createElement(
      R4,
      { withSource: o, withToolbar: l, ...d, className: w.join(' ') },
      l &&
        a.createElement(_4, {
          isLoading: e,
          border: !0,
          zoom: (R) => A(f * R),
          resetZoom: () => A(1),
          storyId: L4(n),
          baseUrl: './iframe.html',
        }),
      a.createElement(
        cu.Provider,
        { value: { scale: f } },
        a.createElement(
          D4,
          { className: 'docs-story', onCopyCapture: o && k },
          a.createElement(
            T4,
            { isColumn: t || !Array.isArray(n), columns: r, layout: u },
            a.createElement(
              bc.Element,
              { scale: f },
              Array.isArray(n)
                ? n.map((R, O) => a.createElement('div', { key: O }, R))
                : a.createElement('div', null, n)
            )
          ),
          a.createElement(co, { actionItems: E })
        )
      ),
      o && h && p
    );
  },
  F4 = T(Na)(() => ({ '.docs-story': { paddingTop: 32, paddingBottom: 40 } })),
  M4 = () =>
    a.createElement(
      F4,
      { isLoading: !0, withToolbar: !0 },
      a.createElement(Ho, null)
    ),
  $4 = T.table(({ theme: e }) => ({
    '&&': {
      borderCollapse: 'collapse',
      borderSpacing: 0,
      border: 'none',
      tr: { border: 'none !important', background: 'none' },
      'td, th': { padding: 0, border: 'none', width: 'auto!important' },
      marginTop: 0,
      marginBottom: 0,
      'th:first-of-type, td:first-of-type': { paddingLeft: 0 },
      'th:last-of-type, td:last-of-type': { paddingRight: 0 },
      td: {
        paddingTop: 0,
        paddingBottom: 4,
        '&:not(:first-of-type)': { paddingLeft: 10, paddingRight: 0 },
      },
      tbody: { boxShadow: 'none', border: 'none' },
      code: dt({ theme: e }),
      div: { span: { fontWeight: 'bold' } },
      '& code': {
        margin: 0,
        display: 'inline-block',
        fontSize: e.typography.size.s1,
      },
    },
  })),
  B4 = ({ tags: e }) => {
    let t = (e.params || []).filter((l) => l.description),
      r = t.length !== 0,
      n = e.deprecated != null,
      o = e.returns != null && e.returns.description != null;
    return !r && !o && !n
      ? null
      : a.createElement(
          a.Fragment,
          null,
          a.createElement(
            $4,
            null,
            a.createElement(
              'tbody',
              null,
              n &&
                a.createElement(
                  'tr',
                  { key: 'deprecated' },
                  a.createElement(
                    'td',
                    { colSpan: 2 },
                    a.createElement('strong', null, 'Deprecated'),
                    ': ',
                    e.deprecated
                  )
                ),
              r &&
                t.map((l) =>
                  a.createElement(
                    'tr',
                    { key: l.name },
                    a.createElement(
                      'td',
                      null,
                      a.createElement('code', null, l.name)
                    ),
                    a.createElement('td', null, l.description)
                  )
                ),
              o &&
                a.createElement(
                  'tr',
                  { key: 'returns' },
                  a.createElement(
                    'td',
                    null,
                    a.createElement('code', null, 'Returns')
                  ),
                  a.createElement('td', null, e.returns.description)
                )
            )
          )
        );
  },
  Za = 8,
  Ei = T.div(({ isExpanded: e }) => ({
    display: 'flex',
    flexDirection: e ? 'column' : 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: '-4px',
    minWidth: 100,
  })),
  I4 = T.span(dt, ({ theme: e, simple: t = !1 }) => ({
    flex: '0 0 auto',
    fontFamily: e.typography.fonts.mono,
    fontSize: e.typography.size.s1,
    wordBreak: 'break-word',
    whiteSpace: 'normal',
    maxWidth: '100%',
    margin: 0,
    marginRight: '4px',
    marginBottom: '4px',
    paddingTop: '2px',
    paddingBottom: '2px',
    lineHeight: '13px',
    ...(t && { background: 'transparent', border: '0 none', paddingLeft: 0 }),
  })),
  N4 = T.button(({ theme: e }) => ({
    fontFamily: e.typography.fonts.mono,
    color: e.color.secondary,
    marginBottom: '4px',
    background: 'none',
    border: 'none',
  })),
  Z4 = T.div(dt, ({ theme: e }) => ({
    fontFamily: e.typography.fonts.mono,
    color: e.color.secondary,
    fontSize: e.typography.size.s1,
    margin: 0,
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
  })),
  H4 = T.div(({ theme: e, width: t }) => ({
    width: t,
    minWidth: 200,
    maxWidth: 800,
    padding: 15,
    fontFamily: e.typography.fonts.mono,
    fontSize: e.typography.size.s1,
    boxSizing: 'content-box',
    '& code': { padding: '0 !important' },
  })),
  j4 = T(ye)({ height: 10, width: 10, minWidth: 10, marginLeft: 4 }),
  P4 = () => a.createElement('span', null, '-'),
  uu = ({ text: e, simple: t }) => a.createElement(I4, { simple: t }, e),
  V4 = tr(1e3)((e) => {
    let t = e.split(/\r?\n/);
    return `${Math.max(...t.map((r) => r.length))}ch`;
  }),
  z4 = (e) => {
    if (!e) return [e];
    let t = e.split('|').map((r) => r.trim());
    return Lb(t);
  },
  xi = (e, t = !0) => {
    let r = e;
    return (
      t || (r = e.slice(0, Za)),
      r.map((n) => a.createElement(uu, { key: n, text: n === '' ? '""' : n }))
    );
  },
  q4 = ({ value: e, initialExpandedArgs: t }) => {
    let { summary: r, detail: n } = e,
      [o, l] = b.useState(!1),
      [i, s] = b.useState(t || !1);
    if (r == null) return null;
    let c = typeof r.toString == 'function' ? r.toString() : r;
    if (n == null) {
      if (/[(){}[\]<>]/.test(c)) return a.createElement(uu, { text: c });
      let u = z4(c),
        d = u.length;
      return d > Za
        ? a.createElement(
            Ei,
            { isExpanded: i },
            xi(u, i),
            a.createElement(
              N4,
              { onClick: () => s(!i) },
              i ? 'Show less...' : `Show ${d - Za} more...`
            )
          )
        : a.createElement(Ei, null, xi(u));
    }
    return a.createElement(
      wc,
      {
        closeOnOutsideClick: !0,
        placement: 'bottom',
        visible: o,
        onVisibleChange: (u) => {
          l(u);
        },
        tooltip: a.createElement(
          H4,
          { width: V4(n) },
          a.createElement(An, { language: 'jsx', format: !1 }, n)
        ),
      },
      a.createElement(
        Z4,
        { className: 'sbdocs-expandable' },
        a.createElement('span', null, c),
        a.createElement(j4, { icon: o ? 'arrowup' : 'arrowdown' })
      )
    );
  },
  la = ({ value: e, initialExpandedArgs: t }) =>
    e == null
      ? a.createElement(P4, null)
      : a.createElement(q4, { value: e, initialExpandedArgs: t }),
  U4 = T.label(({ theme: e }) => ({
    lineHeight: '18px',
    alignItems: 'center',
    marginBottom: 8,
    display: 'inline-block',
    position: 'relative',
    whiteSpace: 'nowrap',
    background: e.boolean.background,
    borderRadius: '3em',
    padding: 1,
    input: {
      appearance: 'none',
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
      margin: 0,
      padding: 0,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      borderRadius: '3em',
      '&:focus': {
        outline: 'none',
        boxShadow: `${e.color.secondary} 0 0 0 1px inset !important`,
      },
    },
    span: {
      textAlign: 'center',
      fontSize: e.typography.size.s1,
      fontWeight: e.typography.weight.bold,
      lineHeight: '1',
      cursor: 'pointer',
      display: 'inline-block',
      padding: '7px 15px',
      transition: 'all 100ms ease-out',
      userSelect: 'none',
      borderRadius: '3em',
      color: J(0.5, e.color.defaultText),
      background: 'transparent',
      '&:hover': { boxShadow: `${Pr(0.3, e.appBorderColor)} 0 0 0 1px inset` },
      '&:active': {
        boxShadow: `${Pr(0.05, e.appBorderColor)} 0 0 0 2px inset`,
        color: Pr(1, e.appBorderColor),
      },
      '&:first-of-type': { paddingRight: 8 },
      '&:last-of-type': { paddingLeft: 8 },
    },
    'input:checked ~ span:last-of-type, input:not(:checked) ~ span:first-of-type':
      {
        background: e.boolean.selectedBackground,
        boxShadow:
          e.base === 'light'
            ? `${Pr(0.1, e.appBorderColor)} 0 0 2px`
            : `${e.appBorderColor} 0 0 0 1px`,
        color: e.color.defaultText,
        padding: '7px 15px',
      },
  })),
  W4 = (e) => e === 'true',
  G4 = ({ name: e, value: t, onChange: r, onBlur: n, onFocus: o }) => {
    let l = b.useCallback(() => r(!1), [r]);
    if (t === void 0)
      return a.createElement(
        Ne.Button,
        { id: Tn(e), onClick: l },
        'Set boolean'
      );
    let i = Ze(e),
      s = typeof t == 'string' ? W4(t) : t;
    return a.createElement(
      U4,
      { htmlFor: i, 'aria-label': e },
      a.createElement('input', {
        id: i,
        type: 'checkbox',
        onChange: (c) => r(c.target.checked),
        checked: s,
        role: 'switch',
        name: e,
        onBlur: n,
        onFocus: o,
      }),
      a.createElement('span', { 'aria-hidden': 'true' }, 'False'),
      a.createElement('span', { 'aria-hidden': 'true' }, 'True')
    );
  },
  Y4 = (e) => {
    let [t, r, n] = e.split('-'),
      o = new Date();
    return (
      o.setFullYear(parseInt(t, 10), parseInt(r, 10) - 1, parseInt(n, 10)), o
    );
  },
  K4 = (e) => {
    let [t, r] = e.split(':'),
      n = new Date();
    return n.setHours(parseInt(t, 10)), n.setMinutes(parseInt(r, 10)), n;
  },
  X4 = (e) => {
    let t = new Date(e),
      r = `000${t.getFullYear()}`.slice(-4),
      n = `0${t.getMonth() + 1}`.slice(-2),
      o = `0${t.getDate()}`.slice(-2);
    return `${r}-${n}-${o}`;
  },
  J4 = (e) => {
    let t = new Date(e),
      r = `0${t.getHours()}`.slice(-2),
      n = `0${t.getMinutes()}`.slice(-2);
    return `${r}:${n}`;
  },
  Q4 = T.div(({ theme: e }) => ({
    flex: 1,
    display: 'flex',
    input: {
      marginLeft: 10,
      flex: 1,
      height: 32,
      '&::-webkit-calendar-picker-indicator': {
        opacity: 0.5,
        height: 12,
        filter: e.base === 'light' ? void 0 : 'invert(1)',
      },
    },
    'input:first-of-type': { marginLeft: 0, flexGrow: 4 },
    'input:last-of-type': { flexGrow: 3 },
  })),
  ey = ({ name: e, value: t, onChange: r, onFocus: n, onBlur: o }) => {
    let [l, i] = b.useState(!0),
      s = b.useRef(),
      c = b.useRef();
    b.useEffect(() => {
      l !== !1 &&
        (s && s.current && (s.current.value = X4(t)),
        c && c.current && (c.current.value = J4(t)));
    }, [t]);
    let u = (m) => {
        let p = Y4(m.target.value),
          g = new Date(t);
        g.setFullYear(p.getFullYear(), p.getMonth(), p.getDate());
        let f = g.getTime();
        f && r(f), i(!!f);
      },
      d = (m) => {
        let p = K4(m.target.value),
          g = new Date(t);
        g.setHours(p.getHours()), g.setMinutes(p.getMinutes());
        let f = g.getTime();
        f && r(f), i(!!f);
      },
      h = Ze(e);
    return a.createElement(
      Q4,
      null,
      a.createElement(Ne.Input, {
        type: 'date',
        max: '9999-12-31',
        ref: s,
        id: `${h}-date`,
        name: `${h}-date`,
        onChange: u,
        onFocus: n,
        onBlur: o,
      }),
      a.createElement(Ne.Input, {
        type: 'time',
        id: `${h}-time`,
        name: `${h}-time`,
        ref: c,
        onChange: d,
        onFocus: n,
        onBlur: o,
      }),
      l ? null : a.createElement('div', null, 'invalid')
    );
  },
  ty = T.label({ display: 'flex' }),
  ry = (e) => {
    let t = parseFloat(e);
    return Number.isNaN(t) ? void 0 : t;
  },
  ny = ({
    name: e,
    value: t,
    onChange: r,
    min: n,
    max: o,
    step: l,
    onBlur: i,
    onFocus: s,
  }) => {
    let [c, u] = b.useState(typeof t == 'number' ? t : ''),
      [d, h] = b.useState(!1),
      [m, p] = b.useState(null),
      g = b.useCallback(
        (w) => {
          u(w.target.value);
          let v = parseFloat(w.target.value);
          Number.isNaN(v)
            ? p(new Error(`'${w.target.value}' is not a number`))
            : (r(v), p(null));
        },
        [r, p]
      ),
      f = b.useCallback(() => {
        u('0'), r(0), h(!0);
      }, [h]),
      A = b.useRef(null);
    return (
      b.useEffect(() => {
        d && A.current && A.current.select();
      }, [d]),
      b.useEffect(() => {
        c !== (typeof t == 'number' ? t : '') && u(t);
      }, [t]),
      !d && t === void 0
        ? a.createElement(Ne.Button, { id: Tn(e), onClick: f }, 'Set number')
        : a.createElement(
            ty,
            null,
            a.createElement(Ne.Input, {
              ref: A,
              id: Ze(e),
              type: 'number',
              onChange: g,
              size: 'flex',
              placeholder: 'Edit number...',
              value: c,
              valid: m ? 'error' : null,
              autoFocus: d,
              name: e,
              min: n,
              max: o,
              step: l,
              onFocus: s,
              onBlur: i,
            })
          )
    );
  },
  du = (e, t) => {
    let r = t && Object.entries(t).find(([n, o]) => o === e);
    return r ? r[0] : void 0;
  },
  Ha = (e, t) =>
    e && t
      ? Object.entries(t)
          .filter((r) => e.includes(r[1]))
          .map((r) => r[0])
      : [],
  pu = (e, t) => e && t && e.map((r) => t[r]),
  ay = T.div(({ isInline: e }) =>
    e
      ? {
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          label: { display: 'inline-flex', marginRight: 15 },
        }
      : { label: { display: 'flex' } }
  ),
  oy = T.span({}),
  ly = T.label({
    lineHeight: '20px',
    alignItems: 'center',
    marginBottom: 8,
    '&:last-child': { marginBottom: 0 },
    input: { margin: 0, marginRight: 6 },
  }),
  Ai = ({ name: e, options: t, value: r, onChange: n, isInline: o }) => {
    if (!t)
      return (
        Io.warn(`Checkbox with no options: ${e}`),
        a.createElement(a.Fragment, null, '-')
      );
    let l = Ha(r, t),
      [i, s] = b.useState(l),
      c = (d) => {
        let h = d.target.value,
          m = [...i];
        m.includes(h) ? m.splice(m.indexOf(h), 1) : m.push(h),
          n(pu(m, t)),
          s(m);
      };
    b.useEffect(() => {
      s(Ha(r, t));
    }, [r]);
    let u = Ze(e);
    return a.createElement(
      ay,
      { isInline: o },
      Object.keys(t).map((d, h) => {
        let m = `${u}-${h}`;
        return a.createElement(
          ly,
          { key: m, htmlFor: m },
          a.createElement('input', {
            type: 'checkbox',
            id: m,
            name: m,
            value: d,
            onChange: c,
            checked: i == null ? void 0 : i.includes(d),
          }),
          a.createElement(oy, null, d)
        );
      })
    );
  },
  iy = T.div(({ isInline: e }) =>
    e
      ? {
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          label: { display: 'inline-flex', marginRight: 15 },
        }
      : { label: { display: 'flex' } }
  ),
  sy = T.span({}),
  cy = T.label({
    lineHeight: '20px',
    alignItems: 'center',
    marginBottom: 8,
    '&:last-child': { marginBottom: 0 },
    input: { margin: 0, marginRight: 6 },
  }),
  wi = ({ name: e, options: t, value: r, onChange: n, isInline: o }) => {
    if (!t)
      return (
        Io.warn(`Radio with no options: ${e}`),
        a.createElement(a.Fragment, null, '-')
      );
    let l = du(r, t),
      i = Ze(e);
    return a.createElement(
      iy,
      { isInline: o },
      Object.keys(t).map((s, c) => {
        let u = `${i}-${c}`;
        return a.createElement(
          cy,
          { key: u, htmlFor: u },
          a.createElement('input', {
            type: 'radio',
            id: u,
            name: u,
            value: s,
            onChange: (d) => n(t[d.currentTarget.value]),
            checked: s === l,
          }),
          a.createElement(sy, null, s)
        );
      })
    );
  },
  uy = {
    appearance: 'none',
    border: '0 none',
    boxSizing: 'inherit',
    display: ' block',
    margin: ' 0',
    background: 'transparent',
    padding: 0,
    fontSize: 'inherit',
    position: 'relative',
  },
  fu = T.select(uy, ({ theme: e }) => ({
    boxSizing: 'border-box',
    position: 'relative',
    padding: '6px 10px',
    width: '100%',
    color: e.input.color || 'inherit',
    background: e.input.background,
    borderRadius: e.input.borderRadius,
    boxShadow: `${e.input.border} 0 0 0 1px inset`,
    fontSize: e.typography.size.s2 - 1,
    lineHeight: '20px',
    '&:focus': {
      boxShadow: `${e.color.secondary} 0 0 0 1px inset`,
      outline: 'none',
    },
    '&[disabled]': { cursor: 'not-allowed', opacity: 0.5 },
    '::placeholder': { color: e.textMutedColor },
    '&[multiple]': {
      overflow: 'auto',
      padding: 0,
      option: {
        display: 'block',
        padding: '6px 10px',
        marginLeft: 1,
        marginRight: 1,
      },
    },
  })),
  mu = T.span(({ theme: e }) => ({
    display: 'inline-block',
    lineHeight: 'normal',
    overflow: 'hidden',
    position: 'relative',
    verticalAlign: 'top',
    width: '100%',
    svg: {
      position: 'absolute',
      zIndex: 1,
      pointerEvents: 'none',
      height: '12px',
      marginTop: '-6px',
      right: '12px',
      top: '50%',
      fill: e.textMutedColor,
      path: { fill: e.textMutedColor },
    },
  })),
  Ci = 'Choose option...',
  dy = ({ name: e, value: t, options: r, onChange: n }) => {
    let o = (s) => {
        n(r[s.currentTarget.value]);
      },
      l = du(t, r) || Ci,
      i = Ze(e);
    return a.createElement(
      mu,
      null,
      a.createElement(ye, { icon: 'arrowdown' }),
      a.createElement(
        fu,
        { id: i, value: l, onChange: o },
        a.createElement('option', { key: 'no-selection', disabled: !0 }, Ci),
        Object.keys(r).map((s) =>
          a.createElement('option', { key: s, value: s }, s)
        )
      )
    );
  },
  py = ({ name: e, value: t, options: r, onChange: n }) => {
    let o = (s) => {
        let c = Array.from(s.currentTarget.options)
          .filter((u) => u.selected)
          .map((u) => u.value);
        n(pu(c, r));
      },
      l = Ha(t, r),
      i = Ze(e);
    return a.createElement(
      mu,
      null,
      a.createElement(
        fu,
        { id: i, multiple: !0, value: l, onChange: o },
        Object.keys(r).map((s) =>
          a.createElement('option', { key: s, value: s }, s)
        )
      )
    );
  },
  Si = (e) => {
    let { name: t, options: r } = e;
    return r
      ? e.isMulti
        ? a.createElement(py, { ...e })
        : a.createElement(dy, { ...e })
      : (Io.warn(`Select with no options: ${t}`),
        a.createElement(a.Fragment, null, '-'));
  },
  fy = (e, t) =>
    Array.isArray(e)
      ? e.reduce(
          (r, n) => ((r[(t == null ? void 0 : t[n]) || String(n)] = n), r),
          {}
        )
      : e,
  my = {
    check: Ai,
    'inline-check': Ai,
    radio: wi,
    'inline-radio': wi,
    select: Si,
    'multi-select': Si,
  },
  Pt = (e) => {
    let { type: t = 'select', labels: r, argType: n } = e,
      o = {
        ...e,
        options: n ? fy(n.options, r) : {},
        isInline: t.includes('inline'),
        isMulti: t.includes('multi'),
      },
      l = my[t];
    if (l) return a.createElement(l, { ...o });
    throw new Error(`Unknown options type: ${t}`);
  },
  jo = 'value',
  gy = 'key',
  hy = 'Error',
  by = 'Object',
  yy = 'Array',
  vy = 'String',
  Ey = 'Number',
  xy = 'Boolean',
  Ay = 'Date',
  wy = 'Null',
  Cy = 'Undefined',
  Sy = 'Function',
  ky = 'Symbol',
  gu = 'ADD_DELTA_TYPE',
  hu = 'REMOVE_DELTA_TYPE',
  bu = 'UPDATE_DELTA_TYPE';
function ht(e) {
  return e !== null &&
    typeof e == 'object' &&
    !Array.isArray(e) &&
    typeof e[Symbol.iterator] == 'function'
    ? 'Iterable'
    : Object.prototype.toString.call(e).slice(8, -1);
}
function yu(e, t) {
  let r = ht(e),
    n = ht(t);
  return (r === 'Function' || n === 'Function') && n !== r;
}
var Po = class extends b.Component {
  constructor(e) {
    super(e),
      (this.state = { inputRefKey: null, inputRefValue: null }),
      (this.refInputValue = this.refInputValue.bind(this)),
      (this.refInputKey = this.refInputKey.bind(this)),
      (this.onKeydown = this.onKeydown.bind(this)),
      (this.onSubmit = this.onSubmit.bind(this));
  }
  componentDidMount() {
    let { inputRefKey: e, inputRefValue: t } = this.state,
      { onlyValue: r } = this.props;
    e && typeof e.focus == 'function' && e.focus(),
      r && t && typeof t.focus == 'function' && t.focus(),
      document.addEventListener('keydown', this.onKeydown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown);
  }
  onKeydown(e) {
    e.altKey ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey ||
      e.repeat ||
      ((e.code === 'Enter' || e.key === 'Enter') &&
        (e.preventDefault(), this.onSubmit()),
      (e.code === 'Escape' || e.key === 'Escape') &&
        (e.preventDefault(), this.props.handleCancel()));
  }
  onSubmit() {
    let {
        handleAdd: e,
        onlyValue: t,
        onSubmitValueParser: r,
        keyPath: n,
        deep: o,
      } = this.props,
      { inputRefKey: l, inputRefValue: i } = this.state,
      s = {};
    if (!t) {
      if (!l.value) return;
      s.key = l.value;
    }
    (s.newValue = r(!1, n, o, s.key, i.value)), e(s);
  }
  refInputKey(e) {
    this.state.inputRefKey = e;
  }
  refInputValue(e) {
    this.state.inputRefValue = e;
  }
  render() {
    let {
        handleCancel: e,
        onlyValue: t,
        addButtonElement: r,
        cancelButtonElement: n,
        inputElementGenerator: o,
        keyPath: l,
        deep: i,
      } = this.props,
      s = b.cloneElement(r, { onClick: this.onSubmit }),
      c = b.cloneElement(n, { onClick: e }),
      u = o(jo, l, i),
      d = b.cloneElement(u, { placeholder: 'Value', ref: this.refInputValue }),
      h = null;
    if (!t) {
      let m = o(gy, l, i);
      h = b.cloneElement(m, { placeholder: 'Key', ref: this.refInputKey });
    }
    return a.createElement(
      'span',
      { className: 'rejt-add-value-node' },
      h,
      d,
      c,
      s
    );
  }
};
Po.defaultProps = {
  onlyValue: !1,
  addButtonElement: a.createElement('button', null, '+'),
  cancelButtonElement: a.createElement('button', null, 'c'),
};
var vu = class extends b.Component {
  constructor(e) {
    super(e);
    let t = [...e.keyPath, e.name];
    (this.state = {
      data: e.data,
      name: e.name,
      keyPath: t,
      deep: e.deep,
      nextDeep: e.deep + 1,
      collapsed: e.isCollapsed(t, e.deep, e.data),
      addFormVisible: !1,
    }),
      (this.handleCollapseMode = this.handleCollapseMode.bind(this)),
      (this.handleRemoveItem = this.handleRemoveItem.bind(this)),
      (this.handleAddMode = this.handleAddMode.bind(this)),
      (this.handleAddValueAdd = this.handleAddValueAdd.bind(this)),
      (this.handleAddValueCancel = this.handleAddValueCancel.bind(this)),
      (this.handleEditValue = this.handleEditValue.bind(this)),
      (this.onChildUpdate = this.onChildUpdate.bind(this)),
      (this.renderCollapsed = this.renderCollapsed.bind(this)),
      (this.renderNotCollapsed = this.renderNotCollapsed.bind(this));
  }
  static getDerivedStateFromProps(e, t) {
    return e.data !== t.data ? { data: e.data } : null;
  }
  onChildUpdate(e, t) {
    let { data: r, keyPath: n } = this.state;
    (r[e] = t), this.setState({ data: r });
    let { onUpdate: o } = this.props,
      l = n.length;
    o(n[l - 1], r);
  }
  handleAddMode() {
    this.setState({ addFormVisible: !0 });
  }
  handleCollapseMode() {
    this.setState((e) => ({ collapsed: !e.collapsed }));
  }
  handleRemoveItem(e) {
    return () => {
      let { beforeRemoveAction: t, logger: r } = this.props,
        { data: n, keyPath: o, nextDeep: l } = this.state,
        i = n[e];
      t(e, o, l, i)
        .then(() => {
          let s = { keyPath: o, deep: l, key: e, oldValue: i, type: hu };
          n.splice(e, 1), this.setState({ data: n });
          let { onUpdate: c, onDeltaUpdate: u } = this.props;
          c(o[o.length - 1], n), u(s);
        })
        .catch(r.error);
    };
  }
  handleAddValueAdd({ newValue: e }) {
    let { data: t, keyPath: r, nextDeep: n } = this.state,
      { beforeAddAction: o, logger: l } = this.props;
    o(t.length, r, n, e)
      .then(() => {
        let i = [...t, e];
        this.setState({ data: i }), this.handleAddValueCancel();
        let { onUpdate: s, onDeltaUpdate: c } = this.props;
        s(r[r.length - 1], i),
          c({ type: gu, keyPath: r, deep: n, key: i.length - 1, newValue: e });
      })
      .catch(l.error);
  }
  handleAddValueCancel() {
    this.setState({ addFormVisible: !1 });
  }
  handleEditValue({ key: e, value: t }) {
    return new Promise((r, n) => {
      let { beforeUpdateAction: o } = this.props,
        { data: l, keyPath: i, nextDeep: s } = this.state,
        c = l[e];
      o(e, i, s, c, t)
        .then(() => {
          (l[e] = t), this.setState({ data: l });
          let { onUpdate: u, onDeltaUpdate: d } = this.props;
          u(i[i.length - 1], l),
            d({
              type: bu,
              keyPath: i,
              deep: s,
              key: e,
              newValue: t,
              oldValue: c,
            }),
            r(void 0);
        })
        .catch(n);
    });
  }
  renderCollapsed() {
    let { name: e, data: t, keyPath: r, deep: n } = this.state,
      {
        handleRemove: o,
        readOnly: l,
        getStyle: i,
        dataType: s,
        minusMenuElement: c,
      } = this.props,
      { minus: u, collapsed: d } = i(e, t, r, n, s),
      h = l(e, t, r, n, s),
      m = b.cloneElement(c, {
        onClick: o,
        className: 'rejt-minus-menu',
        style: u,
      });
    return a.createElement(
      'span',
      { className: 'rejt-collapsed' },
      a.createElement(
        'span',
        {
          className: 'rejt-collapsed-text',
          style: d,
          onClick: this.handleCollapseMode,
        },
        '[...] ',
        t.length,
        ' ',
        t.length === 1 ? 'item' : 'items'
      ),
      !h && m
    );
  }
  renderNotCollapsed() {
    let {
        name: e,
        data: t,
        keyPath: r,
        deep: n,
        addFormVisible: o,
        nextDeep: l,
      } = this.state,
      {
        isCollapsed: i,
        handleRemove: s,
        onDeltaUpdate: c,
        readOnly: u,
        getStyle: d,
        dataType: h,
        addButtonElement: m,
        cancelButtonElement: p,
        editButtonElement: g,
        inputElementGenerator: f,
        textareaElementGenerator: A,
        minusMenuElement: w,
        plusMenuElement: v,
        beforeRemoveAction: y,
        beforeAddAction: x,
        beforeUpdateAction: E,
        logger: C,
        onSubmitValueParser: S,
      } = this.props,
      { minus: k, plus: R, delimiter: O, ul: L, addForm: _ } = d(e, t, r, n, h),
      D = u(e, t, r, n, h),
      H = b.cloneElement(v, {
        onClick: this.handleAddMode,
        className: 'rejt-plus-menu',
        style: R,
      }),
      M = b.cloneElement(w, {
        onClick: s,
        className: 'rejt-minus-menu',
        style: k,
      }),
      I = !0,
      j = '[',
      z = ']';
    return a.createElement(
      'span',
      { className: 'rejt-not-collapsed' },
      a.createElement(
        'span',
        { className: 'rejt-not-collapsed-delimiter', style: O },
        j
      ),
      !o && H,
      a.createElement(
        'ul',
        { className: 'rejt-not-collapsed-list', style: L },
        t.map((N, Z) =>
          a.createElement(Dn, {
            key: Z,
            name: Z.toString(),
            data: N,
            keyPath: r,
            deep: l,
            isCollapsed: i,
            handleRemove: this.handleRemoveItem(Z),
            handleUpdateValue: this.handleEditValue,
            onUpdate: this.onChildUpdate,
            onDeltaUpdate: c,
            readOnly: u,
            getStyle: d,
            addButtonElement: m,
            cancelButtonElement: p,
            editButtonElement: g,
            inputElementGenerator: f,
            textareaElementGenerator: A,
            minusMenuElement: w,
            plusMenuElement: v,
            beforeRemoveAction: y,
            beforeAddAction: x,
            beforeUpdateAction: E,
            logger: C,
            onSubmitValueParser: S,
          })
        )
      ),
      !D &&
        o &&
        a.createElement(
          'div',
          { className: 'rejt-add-form', style: _ },
          a.createElement(Po, {
            handleAdd: this.handleAddValueAdd,
            handleCancel: this.handleAddValueCancel,
            onlyValue: I,
            addButtonElement: m,
            cancelButtonElement: p,
            inputElementGenerator: f,
            keyPath: r,
            deep: n,
            onSubmitValueParser: S,
          })
        ),
      a.createElement(
        'span',
        { className: 'rejt-not-collapsed-delimiter', style: O },
        z
      ),
      !D && M
    );
  }
  render() {
    let { name: e, collapsed: t, data: r, keyPath: n, deep: o } = this.state,
      { dataType: l, getStyle: i } = this.props,
      s = t ? this.renderCollapsed() : this.renderNotCollapsed(),
      c = i(e, r, n, o, l);
    return a.createElement(
      'div',
      { className: 'rejt-array-node' },
      a.createElement(
        'span',
        { onClick: this.handleCollapseMode },
        a.createElement(
          'span',
          { className: 'rejt-name', style: c.name },
          e,
          ' :',
          ' '
        )
      ),
      s
    );
  }
};
vu.defaultProps = {
  keyPath: [],
  deep: 0,
  minusMenuElement: a.createElement('span', null, ' - '),
  plusMenuElement: a.createElement('span', null, ' + '),
};
var Eu = class extends b.Component {
  constructor(e) {
    super(e);
    let t = [...e.keyPath, e.name];
    (this.state = {
      value: e.value,
      name: e.name,
      keyPath: t,
      deep: e.deep,
      editEnabled: !1,
      inputRef: null,
    }),
      (this.handleEditMode = this.handleEditMode.bind(this)),
      (this.refInput = this.refInput.bind(this)),
      (this.handleCancelEdit = this.handleCancelEdit.bind(this)),
      (this.handleEdit = this.handleEdit.bind(this)),
      (this.onKeydown = this.onKeydown.bind(this));
  }
  static getDerivedStateFromProps(e, t) {
    return e.value !== t.value ? { value: e.value } : null;
  }
  componentDidUpdate() {
    let {
        editEnabled: e,
        inputRef: t,
        name: r,
        value: n,
        keyPath: o,
        deep: l,
      } = this.state,
      { readOnly: i, dataType: s } = this.props,
      c = i(r, n, o, l, s);
    e && !c && typeof t.focus == 'function' && t.focus();
  }
  componentDidMount() {
    document.addEventListener('keydown', this.onKeydown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown);
  }
  onKeydown(e) {
    e.altKey ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey ||
      e.repeat ||
      ((e.code === 'Enter' || e.key === 'Enter') &&
        (e.preventDefault(), this.handleEdit()),
      (e.code === 'Escape' || e.key === 'Escape') &&
        (e.preventDefault(), this.handleCancelEdit()));
  }
  handleEdit() {
    let {
        handleUpdateValue: e,
        originalValue: t,
        logger: r,
        onSubmitValueParser: n,
        keyPath: o,
      } = this.props,
      { inputRef: l, name: i, deep: s } = this.state;
    if (!l) return;
    let c = n(!0, o, s, i, l.value);
    e({ value: c, key: i })
      .then(() => {
        yu(t, c) || this.handleCancelEdit();
      })
      .catch(r.error);
  }
  handleEditMode() {
    this.setState({ editEnabled: !0 });
  }
  refInput(e) {
    this.state.inputRef = e;
  }
  handleCancelEdit() {
    this.setState({ editEnabled: !1 });
  }
  render() {
    let { name: e, value: t, editEnabled: r, keyPath: n, deep: o } = this.state,
      {
        handleRemove: l,
        originalValue: i,
        readOnly: s,
        dataType: c,
        getStyle: u,
        editButtonElement: d,
        cancelButtonElement: h,
        textareaElementGenerator: m,
        minusMenuElement: p,
        keyPath: g,
      } = this.props,
      f = u(e, i, n, o, c),
      A = null,
      w = null,
      v = s(e, i, n, o, c);
    if (r && !v) {
      let y = m(jo, g, o, e, i, c),
        x = b.cloneElement(d, { onClick: this.handleEdit }),
        E = b.cloneElement(h, { onClick: this.handleCancelEdit }),
        C = b.cloneElement(y, { ref: this.refInput, defaultValue: i });
      (A = a.createElement(
        'span',
        { className: 'rejt-edit-form', style: f.editForm },
        C,
        ' ',
        E,
        x
      )),
        (w = null);
    } else {
      A = a.createElement(
        'span',
        {
          className: 'rejt-value',
          style: f.value,
          onClick: v ? null : this.handleEditMode,
        },
        t
      );
      let y = b.cloneElement(p, {
        onClick: l,
        className: 'rejt-minus-menu',
        style: f.minus,
      });
      w = v ? null : y;
    }
    return a.createElement(
      'li',
      { className: 'rejt-function-value-node', style: f.li },
      a.createElement(
        'span',
        { className: 'rejt-name', style: f.name },
        e,
        ' :',
        ' '
      ),
      A,
      w
    );
  }
};
Eu.defaultProps = {
  keyPath: [],
  deep: 0,
  handleUpdateValue: () => {},
  editButtonElement: a.createElement('button', null, 'e'),
  cancelButtonElement: a.createElement('button', null, 'c'),
  minusMenuElement: a.createElement('span', null, ' - '),
};
var Dn = class extends b.Component {
  constructor(e) {
    super(e),
      (this.state = {
        data: e.data,
        name: e.name,
        keyPath: e.keyPath,
        deep: e.deep,
      });
  }
  static getDerivedStateFromProps(e, t) {
    return e.data !== t.data ? { data: e.data } : null;
  }
  render() {
    let { data: e, name: t, keyPath: r, deep: n } = this.state,
      {
        isCollapsed: o,
        handleRemove: l,
        handleUpdateValue: i,
        onUpdate: s,
        onDeltaUpdate: c,
        readOnly: u,
        getStyle: d,
        addButtonElement: h,
        cancelButtonElement: m,
        editButtonElement: p,
        inputElementGenerator: g,
        textareaElementGenerator: f,
        minusMenuElement: A,
        plusMenuElement: w,
        beforeRemoveAction: v,
        beforeAddAction: y,
        beforeUpdateAction: x,
        logger: E,
        onSubmitValueParser: C,
      } = this.props,
      S = () => !0,
      k = ht(e);
    switch (k) {
      case hy:
        return a.createElement(ja, {
          data: e,
          name: t,
          isCollapsed: o,
          keyPath: r,
          deep: n,
          handleRemove: l,
          onUpdate: s,
          onDeltaUpdate: c,
          readOnly: S,
          dataType: k,
          getStyle: d,
          addButtonElement: h,
          cancelButtonElement: m,
          editButtonElement: p,
          inputElementGenerator: g,
          textareaElementGenerator: f,
          minusMenuElement: A,
          plusMenuElement: w,
          beforeRemoveAction: v,
          beforeAddAction: y,
          beforeUpdateAction: x,
          logger: E,
          onSubmitValueParser: C,
        });
      case by:
        return a.createElement(ja, {
          data: e,
          name: t,
          isCollapsed: o,
          keyPath: r,
          deep: n,
          handleRemove: l,
          onUpdate: s,
          onDeltaUpdate: c,
          readOnly: u,
          dataType: k,
          getStyle: d,
          addButtonElement: h,
          cancelButtonElement: m,
          editButtonElement: p,
          inputElementGenerator: g,
          textareaElementGenerator: f,
          minusMenuElement: A,
          plusMenuElement: w,
          beforeRemoveAction: v,
          beforeAddAction: y,
          beforeUpdateAction: x,
          logger: E,
          onSubmitValueParser: C,
        });
      case yy:
        return a.createElement(vu, {
          data: e,
          name: t,
          isCollapsed: o,
          keyPath: r,
          deep: n,
          handleRemove: l,
          onUpdate: s,
          onDeltaUpdate: c,
          readOnly: u,
          dataType: k,
          getStyle: d,
          addButtonElement: h,
          cancelButtonElement: m,
          editButtonElement: p,
          inputElementGenerator: g,
          textareaElementGenerator: f,
          minusMenuElement: A,
          plusMenuElement: w,
          beforeRemoveAction: v,
          beforeAddAction: y,
          beforeUpdateAction: x,
          logger: E,
          onSubmitValueParser: C,
        });
      case vy:
        return a.createElement(gt, {
          name: t,
          value: `"${e}"`,
          originalValue: e,
          keyPath: r,
          deep: n,
          handleRemove: l,
          handleUpdateValue: i,
          readOnly: u,
          dataType: k,
          getStyle: d,
          cancelButtonElement: m,
          editButtonElement: p,
          inputElementGenerator: g,
          minusMenuElement: A,
          logger: E,
          onSubmitValueParser: C,
        });
      case Ey:
        return a.createElement(gt, {
          name: t,
          value: e,
          originalValue: e,
          keyPath: r,
          deep: n,
          handleRemove: l,
          handleUpdateValue: i,
          readOnly: u,
          dataType: k,
          getStyle: d,
          cancelButtonElement: m,
          editButtonElement: p,
          inputElementGenerator: g,
          minusMenuElement: A,
          logger: E,
          onSubmitValueParser: C,
        });
      case xy:
        return a.createElement(gt, {
          name: t,
          value: e ? 'true' : 'false',
          originalValue: e,
          keyPath: r,
          deep: n,
          handleRemove: l,
          handleUpdateValue: i,
          readOnly: u,
          dataType: k,
          getStyle: d,
          cancelButtonElement: m,
          editButtonElement: p,
          inputElementGenerator: g,
          minusMenuElement: A,
          logger: E,
          onSubmitValueParser: C,
        });
      case Ay:
        return a.createElement(gt, {
          name: t,
          value: e.toISOString(),
          originalValue: e,
          keyPath: r,
          deep: n,
          handleRemove: l,
          handleUpdateValue: i,
          readOnly: S,
          dataType: k,
          getStyle: d,
          cancelButtonElement: m,
          editButtonElement: p,
          inputElementGenerator: g,
          minusMenuElement: A,
          logger: E,
          onSubmitValueParser: C,
        });
      case wy:
        return a.createElement(gt, {
          name: t,
          value: 'null',
          originalValue: 'null',
          keyPath: r,
          deep: n,
          handleRemove: l,
          handleUpdateValue: i,
          readOnly: u,
          dataType: k,
          getStyle: d,
          cancelButtonElement: m,
          editButtonElement: p,
          inputElementGenerator: g,
          minusMenuElement: A,
          logger: E,
          onSubmitValueParser: C,
        });
      case Cy:
        return a.createElement(gt, {
          name: t,
          value: 'undefined',
          originalValue: 'undefined',
          keyPath: r,
          deep: n,
          handleRemove: l,
          handleUpdateValue: i,
          readOnly: u,
          dataType: k,
          getStyle: d,
          cancelButtonElement: m,
          editButtonElement: p,
          inputElementGenerator: g,
          minusMenuElement: A,
          logger: E,
          onSubmitValueParser: C,
        });
      case Sy:
        return a.createElement(Eu, {
          name: t,
          value: e.toString(),
          originalValue: e,
          keyPath: r,
          deep: n,
          handleRemove: l,
          handleUpdateValue: i,
          readOnly: u,
          dataType: k,
          getStyle: d,
          cancelButtonElement: m,
          editButtonElement: p,
          textareaElementGenerator: f,
          minusMenuElement: A,
          logger: E,
          onSubmitValueParser: C,
        });
      case ky:
        return a.createElement(gt, {
          name: t,
          value: e.toString(),
          originalValue: e,
          keyPath: r,
          deep: n,
          handleRemove: l,
          handleUpdateValue: i,
          readOnly: S,
          dataType: k,
          getStyle: d,
          cancelButtonElement: m,
          editButtonElement: p,
          inputElementGenerator: g,
          minusMenuElement: A,
          logger: E,
          onSubmitValueParser: C,
        });
      default:
        return null;
    }
  }
};
Dn.defaultProps = { keyPath: [], deep: 0 };
var ja = class extends b.Component {
  constructor(e) {
    super(e);
    let t = e.deep === -1 ? [] : [...e.keyPath, e.name];
    (this.state = {
      name: e.name,
      data: e.data,
      keyPath: t,
      deep: e.deep,
      nextDeep: e.deep + 1,
      collapsed: e.isCollapsed(t, e.deep, e.data),
      addFormVisible: !1,
    }),
      (this.handleCollapseMode = this.handleCollapseMode.bind(this)),
      (this.handleRemoveValue = this.handleRemoveValue.bind(this)),
      (this.handleAddMode = this.handleAddMode.bind(this)),
      (this.handleAddValueAdd = this.handleAddValueAdd.bind(this)),
      (this.handleAddValueCancel = this.handleAddValueCancel.bind(this)),
      (this.handleEditValue = this.handleEditValue.bind(this)),
      (this.onChildUpdate = this.onChildUpdate.bind(this)),
      (this.renderCollapsed = this.renderCollapsed.bind(this)),
      (this.renderNotCollapsed = this.renderNotCollapsed.bind(this));
  }
  static getDerivedStateFromProps(e, t) {
    return e.data !== t.data ? { data: e.data } : null;
  }
  onChildUpdate(e, t) {
    let { data: r, keyPath: n } = this.state;
    (r[e] = t), this.setState({ data: r });
    let { onUpdate: o } = this.props,
      l = n.length;
    o(n[l - 1], r);
  }
  handleAddMode() {
    this.setState({ addFormVisible: !0 });
  }
  handleAddValueCancel() {
    this.setState({ addFormVisible: !1 });
  }
  handleAddValueAdd({ key: e, newValue: t }) {
    let { data: r, keyPath: n, nextDeep: o } = this.state,
      { beforeAddAction: l, logger: i } = this.props;
    l(e, n, o, t)
      .then(() => {
        (r[e] = t), this.setState({ data: r }), this.handleAddValueCancel();
        let { onUpdate: s, onDeltaUpdate: c } = this.props;
        s(n[n.length - 1], r),
          c({ type: gu, keyPath: n, deep: o, key: e, newValue: t });
      })
      .catch(i.error);
  }
  handleRemoveValue(e) {
    return () => {
      let { beforeRemoveAction: t, logger: r } = this.props,
        { data: n, keyPath: o, nextDeep: l } = this.state,
        i = n[e];
      t(e, o, l, i)
        .then(() => {
          let s = { keyPath: o, deep: l, key: e, oldValue: i, type: hu };
          delete n[e], this.setState({ data: n });
          let { onUpdate: c, onDeltaUpdate: u } = this.props;
          c(o[o.length - 1], n), u(s);
        })
        .catch(r.error);
    };
  }
  handleCollapseMode() {
    this.setState((e) => ({ collapsed: !e.collapsed }));
  }
  handleEditValue({ key: e, value: t }) {
    return new Promise((r, n) => {
      let { beforeUpdateAction: o } = this.props,
        { data: l, keyPath: i, nextDeep: s } = this.state,
        c = l[e];
      o(e, i, s, c, t)
        .then(() => {
          (l[e] = t), this.setState({ data: l });
          let { onUpdate: u, onDeltaUpdate: d } = this.props;
          u(i[i.length - 1], l),
            d({
              type: bu,
              keyPath: i,
              deep: s,
              key: e,
              newValue: t,
              oldValue: c,
            }),
            r();
        })
        .catch(n);
    });
  }
  renderCollapsed() {
    let { name: e, keyPath: t, deep: r, data: n } = this.state,
      {
        handleRemove: o,
        readOnly: l,
        dataType: i,
        getStyle: s,
        minusMenuElement: c,
      } = this.props,
      { minus: u, collapsed: d } = s(e, n, t, r, i),
      h = Object.getOwnPropertyNames(n),
      m = l(e, n, t, r, i),
      p = b.cloneElement(c, {
        onClick: o,
        className: 'rejt-minus-menu',
        style: u,
      });
    return a.createElement(
      'span',
      { className: 'rejt-collapsed' },
      a.createElement(
        'span',
        {
          className: 'rejt-collapsed-text',
          style: d,
          onClick: this.handleCollapseMode,
        },
        '{...}',
        ' ',
        h.length,
        ' ',
        h.length === 1 ? 'key' : 'keys'
      ),
      !m && p
    );
  }
  renderNotCollapsed() {
    let {
        name: e,
        data: t,
        keyPath: r,
        deep: n,
        nextDeep: o,
        addFormVisible: l,
      } = this.state,
      {
        isCollapsed: i,
        handleRemove: s,
        onDeltaUpdate: c,
        readOnly: u,
        getStyle: d,
        dataType: h,
        addButtonElement: m,
        cancelButtonElement: p,
        editButtonElement: g,
        inputElementGenerator: f,
        textareaElementGenerator: A,
        minusMenuElement: w,
        plusMenuElement: v,
        beforeRemoveAction: y,
        beforeAddAction: x,
        beforeUpdateAction: E,
        logger: C,
        onSubmitValueParser: S,
      } = this.props,
      { minus: k, plus: R, addForm: O, ul: L, delimiter: _ } = d(e, t, r, n, h),
      D = Object.getOwnPropertyNames(t),
      H = u(e, t, r, n, h),
      M = b.cloneElement(v, {
        onClick: this.handleAddMode,
        className: 'rejt-plus-menu',
        style: R,
      }),
      I = b.cloneElement(w, {
        onClick: s,
        className: 'rejt-minus-menu',
        style: k,
      }),
      j = D.map((Z) =>
        a.createElement(Dn, {
          key: Z,
          name: Z,
          data: t[Z],
          keyPath: r,
          deep: o,
          isCollapsed: i,
          handleRemove: this.handleRemoveValue(Z),
          handleUpdateValue: this.handleEditValue,
          onUpdate: this.onChildUpdate,
          onDeltaUpdate: c,
          readOnly: u,
          getStyle: d,
          addButtonElement: m,
          cancelButtonElement: p,
          editButtonElement: g,
          inputElementGenerator: f,
          textareaElementGenerator: A,
          minusMenuElement: w,
          plusMenuElement: v,
          beforeRemoveAction: y,
          beforeAddAction: x,
          beforeUpdateAction: E,
          logger: C,
          onSubmitValueParser: S,
        })
      ),
      z = '{',
      N = '}';
    return a.createElement(
      'span',
      { className: 'rejt-not-collapsed' },
      a.createElement(
        'span',
        { className: 'rejt-not-collapsed-delimiter', style: _ },
        z
      ),
      !H && M,
      a.createElement(
        'ul',
        { className: 'rejt-not-collapsed-list', style: L },
        j
      ),
      !H &&
        l &&
        a.createElement(
          'div',
          { className: 'rejt-add-form', style: O },
          a.createElement(Po, {
            handleAdd: this.handleAddValueAdd,
            handleCancel: this.handleAddValueCancel,
            addButtonElement: m,
            cancelButtonElement: p,
            inputElementGenerator: f,
            keyPath: r,
            deep: n,
            onSubmitValueParser: S,
          })
        ),
      a.createElement(
        'span',
        { className: 'rejt-not-collapsed-delimiter', style: _ },
        N
      ),
      !H && I
    );
  }
  render() {
    let { name: e, collapsed: t, data: r, keyPath: n, deep: o } = this.state,
      { getStyle: l, dataType: i } = this.props,
      s = t ? this.renderCollapsed() : this.renderNotCollapsed(),
      c = l(e, r, n, o, i);
    return a.createElement(
      'div',
      { className: 'rejt-object-node' },
      a.createElement(
        'span',
        { onClick: this.handleCollapseMode },
        a.createElement(
          'span',
          { className: 'rejt-name', style: c.name },
          e,
          ' :',
          ' '
        )
      ),
      s
    );
  }
};
ja.defaultProps = {
  keyPath: [],
  deep: 0,
  minusMenuElement: a.createElement('span', null, ' - '),
  plusMenuElement: a.createElement('span', null, ' + '),
};
var gt = class extends b.Component {
  constructor(e) {
    super(e);
    let t = [...e.keyPath, e.name];
    (this.state = {
      value: e.value,
      name: e.name,
      keyPath: t,
      deep: e.deep,
      editEnabled: !1,
      inputRef: null,
    }),
      (this.handleEditMode = this.handleEditMode.bind(this)),
      (this.refInput = this.refInput.bind(this)),
      (this.handleCancelEdit = this.handleCancelEdit.bind(this)),
      (this.handleEdit = this.handleEdit.bind(this)),
      (this.onKeydown = this.onKeydown.bind(this));
  }
  static getDerivedStateFromProps(e, t) {
    return e.value !== t.value ? { value: e.value } : null;
  }
  componentDidUpdate() {
    let {
        editEnabled: e,
        inputRef: t,
        name: r,
        value: n,
        keyPath: o,
        deep: l,
      } = this.state,
      { readOnly: i, dataType: s } = this.props,
      c = i(r, n, o, l, s);
    e && !c && typeof t.focus == 'function' && t.focus();
  }
  componentDidMount() {
    document.addEventListener('keydown', this.onKeydown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown);
  }
  onKeydown(e) {
    e.altKey ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey ||
      e.repeat ||
      ((e.code === 'Enter' || e.key === 'Enter') &&
        (e.preventDefault(), this.handleEdit()),
      (e.code === 'Escape' || e.key === 'Escape') &&
        (e.preventDefault(), this.handleCancelEdit()));
  }
  handleEdit() {
    let {
        handleUpdateValue: e,
        originalValue: t,
        logger: r,
        onSubmitValueParser: n,
        keyPath: o,
      } = this.props,
      { inputRef: l, name: i, deep: s } = this.state;
    if (!l) return;
    let c = n(!0, o, s, i, l.value);
    e({ value: c, key: i })
      .then(() => {
        yu(t, c) || this.handleCancelEdit();
      })
      .catch(r.error);
  }
  handleEditMode() {
    this.setState({ editEnabled: !0 });
  }
  refInput(e) {
    this.state.inputRef = e;
  }
  handleCancelEdit() {
    this.setState({ editEnabled: !1 });
  }
  render() {
    let { name: e, value: t, editEnabled: r, keyPath: n, deep: o } = this.state,
      {
        handleRemove: l,
        originalValue: i,
        readOnly: s,
        dataType: c,
        getStyle: u,
        editButtonElement: d,
        cancelButtonElement: h,
        inputElementGenerator: m,
        minusMenuElement: p,
        keyPath: g,
      } = this.props,
      f = u(e, i, n, o, c),
      A = s(e, i, n, o, c),
      w = r && !A,
      v = m(jo, g, o, e, i, c),
      y = b.cloneElement(d, { onClick: this.handleEdit }),
      x = b.cloneElement(h, { onClick: this.handleCancelEdit }),
      E = b.cloneElement(v, {
        ref: this.refInput,
        defaultValue: JSON.stringify(i),
      }),
      C = b.cloneElement(p, {
        onClick: l,
        className: 'rejt-minus-menu',
        style: f.minus,
      });
    return a.createElement(
      'li',
      { className: 'rejt-value-node', style: f.li },
      a.createElement(
        'span',
        { className: 'rejt-name', style: f.name },
        e,
        ' : '
      ),
      w
        ? a.createElement(
            'span',
            { className: 'rejt-edit-form', style: f.editForm },
            E,
            ' ',
            x,
            y
          )
        : a.createElement(
            'span',
            {
              className: 'rejt-value',
              style: f.value,
              onClick: A ? null : this.handleEditMode,
            },
            String(t)
          ),
      !A && !w && C
    );
  }
};
gt.defaultProps = {
  keyPath: [],
  deep: 0,
  handleUpdateValue: () => Promise.resolve(),
  editButtonElement: a.createElement('button', null, 'e'),
  cancelButtonElement: a.createElement('button', null, 'c'),
  minusMenuElement: a.createElement('span', null, ' - '),
};
var Ty = {
    minus: { color: 'red' },
    plus: { color: 'green' },
    collapsed: { color: 'grey' },
    delimiter: {},
    ul: { padding: '0px', margin: '0 0 0 25px', listStyle: 'none' },
    name: { color: '#2287CD' },
    addForm: {},
  },
  Ry = {
    minus: { color: 'red' },
    plus: { color: 'green' },
    collapsed: { color: 'grey' },
    delimiter: {},
    ul: { padding: '0px', margin: '0 0 0 25px', listStyle: 'none' },
    name: { color: '#2287CD' },
    addForm: {},
  },
  Oy = {
    minus: { color: 'red' },
    editForm: {},
    value: { color: '#7bba3d' },
    li: { minHeight: '22px', lineHeight: '22px', outline: '0px' },
    name: { color: '#2287CD' },
  };
function Ly(e) {
  let t = e;
  if (t.indexOf('function') === 0) return (0, eval)(`(${t})`);
  try {
    t = JSON.parse(e);
  } catch {}
  return t;
}
var xu = class extends b.Component {
  constructor(e) {
    super(e),
      (this.state = { data: e.data, rootName: e.rootName }),
      (this.onUpdate = this.onUpdate.bind(this)),
      (this.removeRoot = this.removeRoot.bind(this));
  }
  static getDerivedStateFromProps(e, t) {
    return e.data !== t.data || e.rootName !== t.rootName
      ? { data: e.data, rootName: e.rootName }
      : null;
  }
  onUpdate(e, t) {
    this.setState({ data: t }), this.props.onFullyUpdate(t);
  }
  removeRoot() {
    this.onUpdate(null, null);
  }
  render() {
    let { data: e, rootName: t } = this.state,
      {
        isCollapsed: r,
        onDeltaUpdate: n,
        readOnly: o,
        getStyle: l,
        addButtonElement: i,
        cancelButtonElement: s,
        editButtonElement: c,
        inputElement: u,
        textareaElement: d,
        minusMenuElement: h,
        plusMenuElement: m,
        beforeRemoveAction: p,
        beforeAddAction: g,
        beforeUpdateAction: f,
        logger: A,
        onSubmitValueParser: w,
        fallback: v = null,
      } = this.props,
      y = ht(e),
      x = o;
    ht(o) === 'Boolean' && (x = () => o);
    let E = u;
    u && ht(u) !== 'Function' && (E = () => u);
    let C = d;
    return (
      d && ht(d) !== 'Function' && (C = () => d),
      y === 'Object' || y === 'Array'
        ? a.createElement(
            'div',
            { className: 'rejt-tree' },
            a.createElement(Dn, {
              data: e,
              name: t,
              deep: -1,
              isCollapsed: r,
              onUpdate: this.onUpdate,
              onDeltaUpdate: n,
              readOnly: x,
              getStyle: l,
              addButtonElement: i,
              cancelButtonElement: s,
              editButtonElement: c,
              inputElementGenerator: E,
              textareaElementGenerator: C,
              minusMenuElement: h,
              plusMenuElement: m,
              handleRemove: this.removeRoot,
              beforeRemoveAction: p,
              beforeAddAction: g,
              beforeUpdateAction: f,
              logger: A,
              onSubmitValueParser: w,
            })
          )
        : v
    );
  }
};
xu.defaultProps = {
  rootName: 'root',
  isCollapsed: (e, t) => t !== -1,
  getStyle: (e, t, r, n, o) => {
    switch (o) {
      case 'Object':
      case 'Error':
        return Ty;
      case 'Array':
        return Ry;
      default:
        return Oy;
    }
  },
  readOnly: () => !1,
  onFullyUpdate: () => {},
  onDeltaUpdate: () => {},
  beforeRemoveAction: () => Promise.resolve(),
  beforeAddAction: () => Promise.resolve(),
  beforeUpdateAction: () => Promise.resolve(),
  logger: { error: () => {} },
  onSubmitValueParser: (e, t, r, n, o) => Ly(o),
  inputElement: () => a.createElement('input', null),
  textareaElement: () => a.createElement('textarea', null),
  fallback: null,
};
var { window: _y } = _e,
  Dy = T.div(({ theme: e }) => ({
    position: 'relative',
    display: 'flex',
    '.rejt-tree': { marginLeft: '1rem', fontSize: '13px' },
    '.rejt-value-node, .rejt-object-node > .rejt-collapsed, .rejt-array-node > .rejt-collapsed, .rejt-object-node > .rejt-not-collapsed, .rejt-array-node > .rejt-not-collapsed':
      { '& > svg': { opacity: 0, transition: 'opacity 0.2s' } },
    '.rejt-value-node:hover, .rejt-object-node:hover > .rejt-collapsed, .rejt-array-node:hover > .rejt-collapsed, .rejt-object-node:hover > .rejt-not-collapsed, .rejt-array-node:hover > .rejt-not-collapsed':
      { '& > svg': { opacity: 1 } },
    '.rejt-edit-form button': { display: 'none' },
    '.rejt-add-form': { marginLeft: 10 },
    '.rejt-add-value-node': { display: 'inline-flex', alignItems: 'center' },
    '.rejt-name': { lineHeight: '22px' },
    '.rejt-not-collapsed-delimiter': { lineHeight: '22px' },
    '.rejt-plus-menu': { marginLeft: 5 },
    '.rejt-object-node > span > *, .rejt-array-node > span > *': {
      position: 'relative',
      zIndex: 2,
    },
    '.rejt-object-node, .rejt-array-node': { position: 'relative' },
    '.rejt-object-node > span:first-of-type::after, .rejt-array-node > span:first-of-type::after, .rejt-collapsed::before, .rejt-not-collapsed::before':
      {
        content: '""',
        position: 'absolute',
        top: 0,
        display: 'block',
        width: '100%',
        marginLeft: '-1rem',
        padding: '0 4px 0 1rem',
        height: 22,
      },
    '.rejt-collapsed::before, .rejt-not-collapsed::before': {
      zIndex: 1,
      background: 'transparent',
      borderRadius: 4,
      transition: 'background 0.2s',
      pointerEvents: 'none',
      opacity: 0.1,
    },
    '.rejt-object-node:hover, .rejt-array-node:hover': {
      '& > .rejt-collapsed::before, & > .rejt-not-collapsed::before': {
        background: e.color.secondary,
      },
    },
    '.rejt-collapsed::after, .rejt-not-collapsed::after': {
      content: '""',
      position: 'absolute',
      display: 'inline-block',
      pointerEvents: 'none',
      width: 0,
      height: 0,
    },
    '.rejt-collapsed::after': {
      left: -8,
      top: 8,
      borderTop: '3px solid transparent',
      borderBottom: '3px solid transparent',
      borderLeft: '3px solid rgba(153,153,153,0.6)',
    },
    '.rejt-not-collapsed::after': {
      left: -10,
      top: 10,
      borderTop: '3px solid rgba(153,153,153,0.6)',
      borderLeft: '3px solid transparent',
      borderRight: '3px solid transparent',
    },
    '.rejt-value': {
      display: 'inline-block',
      border: '1px solid transparent',
      borderRadius: 4,
      margin: '1px 0',
      padding: '0 4px',
      cursor: 'text',
      color: e.color.defaultText,
    },
    '.rejt-value-node:hover > .rejt-value': {
      background: e.color.lighter,
      borderColor: e.appBorderColor,
    },
  })),
  ia = T.button(({ theme: e, primary: t }) => ({
    border: 0,
    height: 20,
    margin: 1,
    borderRadius: 4,
    background: t ? e.color.secondary : 'transparent',
    color: t ? e.color.lightest : e.color.dark,
    fontWeight: t ? 'bold' : 'normal',
    cursor: 'pointer',
    order: t ? 'initial' : 9,
  })),
  ki = T(ye)(({ theme: e, icon: t, disabled: r }) => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    width: 15,
    height: 15,
    padding: 3,
    marginLeft: 5,
    cursor: r ? 'not-allowed' : 'pointer',
    color: e.textMutedColor,
    '&:hover': r
      ? {}
      : { color: t === 'subtract' ? e.color.negative : e.color.ancillary },
    'svg + &': { marginLeft: 0 },
  })),
  Ti = T.input(({ theme: e, placeholder: t }) => ({
    outline: 0,
    margin: t ? 1 : '1px 0',
    padding: '3px 4px',
    color: e.color.defaultText,
    background: e.background.app,
    border: `1px solid ${e.appBorderColor}`,
    borderRadius: 4,
    lineHeight: '14px',
    width: t === 'Key' ? 80 : 120,
    '&:focus': { border: `1px solid ${e.color.secondary}` },
  })),
  Fy = T(Ft)(({ theme: e }) => ({
    position: 'absolute',
    zIndex: 2,
    top: 2,
    right: 2,
    height: 21,
    padding: '0 3px',
    background: e.background.bar,
    border: `1px solid ${e.appBorderColor}`,
    borderRadius: 3,
    color: e.textMutedColor,
    fontSize: '9px',
    fontWeight: 'bold',
    textDecoration: 'none',
    span: { marginLeft: 3, marginTop: 1 },
  })),
  My = T(Ne.Textarea)(({ theme: e }) => ({
    flex: 1,
    padding: '7px 6px',
    fontFamily: e.typography.fonts.mono,
    fontSize: '12px',
    lineHeight: '18px',
    '&::placeholder': { fontFamily: e.typography.fonts.base, fontSize: '13px' },
    '&:placeholder-shown': { padding: '7px 10px' },
  })),
  $y = {
    bubbles: !0,
    cancelable: !0,
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
  },
  By = (e) => {
    e.currentTarget.dispatchEvent(new _y.KeyboardEvent('keydown', $y));
  },
  Iy = (e) => {
    e.currentTarget.select();
  },
  Ny = (e) => () => ({
    name: { color: e.color.secondary },
    collapsed: { color: e.color.dark },
    ul: { listStyle: 'none', margin: '0 0 0 1rem', padding: 0 },
    li: { outline: 0 },
  }),
  Ri = ({ name: e, value: t, onChange: r }) => {
    let n = n1(),
      o = b.useMemo(() => t && X7(t), [t]),
      l = o != null,
      [i, s] = b.useState(!l),
      [c, u] = b.useState(null),
      d = b.useCallback(
        (A) => {
          try {
            A && r(JSON.parse(A)), u(void 0);
          } catch (w) {
            u(w);
          }
        },
        [r]
      ),
      [h, m] = b.useState(!1),
      p = b.useCallback(() => {
        r({}), m(!0);
      }, [m]),
      g = b.useRef(null);
    if (
      (b.useEffect(() => {
        h && g.current && g.current.select();
      }, [h]),
      !l)
    )
      return a.createElement(
        Ne.Button,
        { id: Tn(e), onClick: p },
        'Set object'
      );
    let f = a.createElement(My, {
      ref: g,
      id: Ze(e),
      name: e,
      defaultValue: t === null ? '' : JSON.stringify(t, null, 2),
      onBlur: (A) => d(A.target.value),
      placeholder: 'Edit JSON string...',
      autoFocus: h,
      valid: c ? 'error' : null,
    });
    return a.createElement(
      Dy,
      null,
      ['Object', 'Array'].includes(ht(o)) &&
        a.createElement(
          Fy,
          {
            href: '#',
            onClick: (A) => {
              A.preventDefault(), s((w) => !w);
            },
          },
          a.createElement(ye, { icon: i ? 'eyeclose' : 'eye' }),
          a.createElement('span', null, 'RAW')
        ),
      i
        ? f
        : a.createElement(xu, {
            data: o,
            rootName: e,
            onFullyUpdate: r,
            getStyle: Ny(n),
            cancelButtonElement: a.createElement(
              ia,
              { type: 'button' },
              'Cancel'
            ),
            editButtonElement: a.createElement(ia, { type: 'submit' }, 'Save'),
            addButtonElement: a.createElement(
              ia,
              { type: 'submit', primary: !0 },
              'Save'
            ),
            plusMenuElement: a.createElement(ki, { icon: 'add' }),
            minusMenuElement: a.createElement(ki, { icon: 'subtract' }),
            inputElement: (A, w, v, y) =>
              y
                ? a.createElement(Ti, { onFocus: Iy, onBlur: By })
                : a.createElement(Ti, null),
            fallback: f,
          })
    );
  },
  Zy = T.input(({ theme: e, min: t, max: r, value: n }) => ({
    '&': { width: '100%', backgroundColor: 'transparent', appearance: 'none' },
    '&::-webkit-slider-runnable-track': {
      background:
        e.base === 'light'
          ? `linear-gradient(to right, 
            ${e.color.green} 0%, ${e.color.green} ${((n - t) / (r - t)) * 100}%, 
            ${Ge(0.02, e.input.background)} ${((n - t) / (r - t)) * 100}%, 
            ${Ge(0.02, e.input.background)} 100%)`
          : `linear-gradient(to right, 
            ${e.color.green} 0%, ${e.color.green} ${((n - t) / (r - t)) * 100}%, 
            ${Tt(0.02, e.input.background)} ${((n - t) / (r - t)) * 100}%, 
            ${Tt(0.02, e.input.background)} 100%)`,
      boxShadow: `${e.appBorderColor} 0 0 0 1px inset`,
      borderRadius: 6,
      width: '100%',
      height: 6,
      cursor: 'pointer',
    },
    '&::-webkit-slider-thumb': {
      marginTop: '-6px',
      width: 16,
      height: 16,
      border: `1px solid ${st(e.appBorderColor, 0.2)}`,
      borderRadius: '50px',
      boxShadow: `0 1px 3px 0px ${st(e.appBorderColor, 0.2)}`,
      cursor: 'grab',
      appearance: 'none',
      background: `${e.input.background}`,
      transition: 'all 150ms ease-out',
      '&:hover': {
        background: `${Ge(0.05, e.input.background)}`,
        transform: 'scale3d(1.1, 1.1, 1.1) translateY(-1px)',
        transition: 'all 50ms ease-out',
      },
      '&:active': {
        background: `${e.input.background}`,
        transform: 'scale3d(1, 1, 1) translateY(0px)',
        cursor: 'grabbing',
      },
    },
    '&:focus': {
      outline: 'none',
      '&::-webkit-slider-runnable-track': {
        borderColor: st(e.color.secondary, 0.4),
      },
      '&::-webkit-slider-thumb': {
        borderColor: e.color.secondary,
        boxShadow: `0 0px 5px 0px ${e.color.secondary}`,
      },
    },
    '&::-moz-range-track': {
      background:
        e.base === 'light'
          ? `linear-gradient(to right, 
            ${e.color.green} 0%, ${e.color.green} ${((n - t) / (r - t)) * 100}%, 
            ${Ge(0.02, e.input.background)} ${((n - t) / (r - t)) * 100}%, 
            ${Ge(0.02, e.input.background)} 100%)`
          : `linear-gradient(to right, 
            ${e.color.green} 0%, ${e.color.green} ${((n - t) / (r - t)) * 100}%, 
            ${Tt(0.02, e.input.background)} ${((n - t) / (r - t)) * 100}%, 
            ${Tt(0.02, e.input.background)} 100%)`,
      boxShadow: `${e.appBorderColor} 0 0 0 1px inset`,
      borderRadius: 6,
      width: '100%',
      height: 6,
      cursor: 'pointer',
      outline: 'none',
    },
    '&::-moz-range-thumb': {
      width: 16,
      height: 16,
      border: `1px solid ${st(e.appBorderColor, 0.2)}`,
      borderRadius: '50px',
      boxShadow: `0 1px 3px 0px ${st(e.appBorderColor, 0.2)}`,
      cursor: 'grab',
      background: `${e.input.background}`,
      transition: 'all 150ms ease-out',
      '&:hover': {
        background: `${Ge(0.05, e.input.background)}`,
        transform: 'scale3d(1.1, 1.1, 1.1) translateY(-1px)',
        transition: 'all 50ms ease-out',
      },
      '&:active': {
        background: `${e.input.background}`,
        transform: 'scale3d(1, 1, 1) translateY(0px)',
        cursor: 'grabbing',
      },
    },
    '&::-ms-track': {
      background:
        e.base === 'light'
          ? `linear-gradient(to right, 
            ${e.color.green} 0%, ${e.color.green} ${((n - t) / (r - t)) * 100}%, 
            ${Ge(0.02, e.input.background)} ${((n - t) / (r - t)) * 100}%, 
            ${Ge(0.02, e.input.background)} 100%)`
          : `linear-gradient(to right, 
            ${e.color.green} 0%, ${e.color.green} ${((n - t) / (r - t)) * 100}%, 
            ${Tt(0.02, e.input.background)} ${((n - t) / (r - t)) * 100}%, 
            ${Tt(0.02, e.input.background)} 100%)`,
      boxShadow: `${e.appBorderColor} 0 0 0 1px inset`,
      color: 'transparent',
      width: '100%',
      height: '6px',
      cursor: 'pointer',
    },
    '&::-ms-fill-lower': { borderRadius: 6 },
    '&::-ms-fill-upper': { borderRadius: 6 },
    '&::-ms-thumb': {
      width: 16,
      height: 16,
      background: `${e.input.background}`,
      border: `1px solid ${st(e.appBorderColor, 0.2)}`,
      borderRadius: 50,
      cursor: 'grab',
      marginTop: 0,
    },
    '@supports (-ms-ime-align:auto)': { 'input[type=range]': { margin: '0' } },
  })),
  Au = T.span({
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 12,
    whiteSpace: 'nowrap',
    fontFeatureSettings: 'tnum',
    fontVariantNumeric: 'tabular-nums',
  }),
  Hy = T(Au)(({ numberOFDecimalsPlaces: e, max: t }) => ({
    width: `${e + t.toString().length * 2 + 3}ch`,
    textAlign: 'right',
    flexShrink: 0,
  })),
  jy = T.div({ display: 'flex', alignItems: 'center', width: '100%' });
function Py(e) {
  let t = e.toString().match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0;
}
var Vy = ({
    name: e,
    value: t,
    onChange: r,
    min: n = 0,
    max: o = 100,
    step: l = 1,
    onBlur: i,
    onFocus: s,
  }) => {
    let c = (h) => {
        r(ry(h.target.value));
      },
      u = t !== void 0,
      d = b.useMemo(() => Py(l), [l]);
    return a.createElement(
      jy,
      null,
      a.createElement(Au, null, n),
      a.createElement(Zy, {
        id: Ze(e),
        type: 'range',
        onChange: c,
        name: e,
        value: t,
        min: n,
        max: o,
        step: l,
        onFocus: s,
        onBlur: i,
      }),
      a.createElement(
        Hy,
        { numberOFDecimalsPlaces: d, max: o },
        u ? t.toFixed(d) : '--',
        ' / ',
        o
      )
    );
  },
  zy = T.label({ display: 'flex' }),
  qy = T.div(({ isMaxed: e }) => ({
    marginLeft: '0.75rem',
    paddingTop: '0.35rem',
    color: e ? 'red' : void 0,
  })),
  Uy = ({
    name: e,
    value: t,
    onChange: r,
    onFocus: n,
    onBlur: o,
    maxLength: l,
  }) => {
    let i = (h) => {
        r(h.target.value);
      },
      [s, c] = b.useState(!1),
      u = b.useCallback(() => {
        r(''), c(!0);
      }, [c]);
    if (t === void 0)
      return a.createElement(
        Ne.Button,
        { id: Tn(e), onClick: u },
        'Set string'
      );
    let d = typeof t == 'string';
    return a.createElement(
      zy,
      null,
      a.createElement(Ne.Textarea, {
        id: Ze(e),
        maxLength: l,
        onChange: i,
        size: 'flex',
        placeholder: 'Edit string...',
        autoFocus: s,
        valid: d ? null : 'error',
        name: e,
        value: d ? t : '',
        onFocus: n,
        onBlur: o,
      }),
      l &&
        a.createElement(
          qy,
          { isMaxed: (t == null ? void 0 : t.length) === l },
          (t == null ? void 0 : t.length) ?? 0,
          ' / ',
          l
        )
    );
  },
  Wy = T(Ne.Input)({ padding: 10 });
function Gy(e) {
  e.forEach((t) => {
    t.startsWith('blob:') && URL.revokeObjectURL(t);
  });
}
var Yy = ({ onChange: e, name: t, accept: r = 'image/*', value: n }) => {
    let o = b.useRef(null);
    function l(i) {
      if (!i.target.files) return;
      let s = Array.from(i.target.files).map((c) => URL.createObjectURL(c));
      e(s), Gy(n);
    }
    return (
      b.useEffect(() => {
        n == null && o.current && (o.current.value = null);
      }, [n, t]),
      a.createElement(Wy, {
        ref: o,
        id: Ze(t),
        type: 'file',
        name: t,
        multiple: !0,
        onChange: l,
        accept: r,
        size: 'flex',
      })
    );
  },
  Ky = b.lazy(() =>
    yt(
      () => import('./Color-6VNJS4EI-c5b7bc62.js'),
      [
        './Color-6VNJS4EI-c5b7bc62.js',
        './index-76fb7be0.js',
        './_commonjsHelpers-de833af9.js',
        './_getPrototype-aecc109d.js',
        './iframe-d50da200.js',
        './react-18-988a5df2.js',
        './index-d3ea75b5.js',
        './_basePickBy-2c05180b.js',
        './_commonjs-dynamic-modules-302442b1.js',
        './index-b75c9059.js',
        './extends-98964cd2.js',
        './index-356e4a49.js',
        './index-c457595d.js',
      ],
      import.meta.url
    )
  ),
  Xy = (e) =>
    a.createElement(
      b.Suspense,
      { fallback: a.createElement('div', null) },
      a.createElement(Ky, { ...e })
    ),
  Jy = {
    array: Ri,
    object: Ri,
    boolean: G4,
    color: Xy,
    date: ey,
    number: ny,
    check: Pt,
    'inline-check': Pt,
    radio: Pt,
    'inline-radio': Pt,
    select: Pt,
    'multi-select': Pt,
    range: Vy,
    text: Uy,
    file: Yy,
  },
  Oi = () => a.createElement(a.Fragment, null, '-'),
  Qy = ({ row: e, arg: t, updateArgs: r, isHovered: n }) => {
    let { key: o, control: l } = e,
      [i, s] = b.useState(!1),
      [c, u] = b.useState({ value: t });
    b.useEffect(() => {
      i || u({ value: t });
    }, [i, t]);
    let d = b.useCallback((f) => (u({ value: f }), r({ [o]: f }), f), [r, o]),
      h = b.useCallback(() => s(!1), []),
      m = b.useCallback(() => s(!0), []);
    if (!l || l.disable)
      return n
        ? a.createElement(
            bt,
            {
              href: 'https://storybook.js.org/docs/react/essentials/controls',
              target: '_blank',
              withArrow: !0,
            },
            'Setup controls'
          )
        : a.createElement(Oi, null);
    let p = {
        name: o,
        argType: e,
        value: c.value,
        onChange: d,
        onBlur: h,
        onFocus: m,
      },
      g = Jy[l.type] || Oi;
    return a.createElement(g, { ...p, ...l, controlType: l.type });
  },
  ev = T.span({ fontWeight: 'bold' }),
  tv = T.span(({ theme: e }) => ({
    color: e.color.negative,
    fontFamily: e.typography.fonts.mono,
    cursor: 'help',
  })),
  rv = T.div(({ theme: e }) => ({
    '&&': { p: { margin: '0 0 10px 0' }, a: { color: e.color.secondary } },
    code: {
      ...dt({ theme: e }),
      fontSize: 12,
      fontFamily: e.typography.fonts.mono,
    },
    '& code': { margin: 0, display: 'inline-block' },
    '& pre > code': { whiteSpace: 'pre-wrap' },
  })),
  nv = T.div(({ theme: e, hasDescription: t }) => ({
    color:
      e.base === 'light'
        ? J(0.1, e.color.defaultText)
        : J(0.2, e.color.defaultText),
    marginTop: t ? 4 : 0,
  })),
  av = T.div(({ theme: e, hasDescription: t }) => ({
    color:
      e.base === 'light'
        ? J(0.1, e.color.defaultText)
        : J(0.2, e.color.defaultText),
    marginTop: t ? 12 : 0,
    marginBottom: 12,
  })),
  ov = T.td(({ theme: e, expandable: t }) => ({
    paddingLeft: t ? '40px !important' : '20px !important',
  })),
  zr = (e) => {
    var f;
    let [t, r] = b.useState(!1),
      {
        row: n,
        updateArgs: o,
        compact: l,
        expandable: i,
        initialExpandedArgs: s,
      } = e,
      { name: c, description: u } = n,
      d = n.table || {},
      h = d.type || n.type,
      m = d.defaultValue || n.defaultValue,
      p = (f = n.type) == null ? void 0 : f.required,
      g = u != null && u !== '';
    return a.createElement(
      'tr',
      { onMouseEnter: () => r(!0), onMouseLeave: () => r(!1) },
      a.createElement(
        ov,
        { expandable: i },
        a.createElement(ev, null, c),
        p ? a.createElement(tv, { title: 'Required' }, '*') : null
      ),
      l
        ? null
        : a.createElement(
            'td',
            null,
            g && a.createElement(rv, null, a.createElement(nu, null, u)),
            d.jsDocTags != null
              ? a.createElement(
                  a.Fragment,
                  null,
                  a.createElement(
                    av,
                    { hasDescription: g },
                    a.createElement(la, { value: h, initialExpandedArgs: s })
                  ),
                  a.createElement(B4, { tags: d.jsDocTags })
                )
              : a.createElement(
                  nv,
                  { hasDescription: g },
                  a.createElement(la, { value: h, initialExpandedArgs: s })
                )
          ),
      l
        ? null
        : a.createElement(
            'td',
            null,
            a.createElement(la, { value: m, initialExpandedArgs: s })
          ),
      o
        ? a.createElement(
            'td',
            null,
            a.createElement(Qy, { ...e, isHovered: t })
          )
        : null
    );
  },
  lv = T(ye)(({ theme: e }) => ({
    marginRight: 8,
    marginLeft: -10,
    marginTop: -2,
    height: 12,
    width: 12,
    color:
      e.base === 'light'
        ? J(0.25, e.color.defaultText)
        : J(0.3, e.color.defaultText),
    border: 'none',
    display: 'inline-block',
  })),
  iv = T.span(({ theme: e }) => ({
    display: 'flex',
    lineHeight: '20px',
    alignItems: 'center',
  })),
  sv = T.td(({ theme: e }) => ({
    position: 'relative',
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    fontWeight: e.typography.weight.bold,
    fontSize: e.typography.size.s1 - 1,
    color:
      e.base === 'light'
        ? J(0.4, e.color.defaultText)
        : J(0.6, e.color.defaultText),
    background: `${e.background.app} !important`,
    '& ~ td': { background: `${e.background.app} !important` },
  })),
  cv = T.td(({ theme: e }) => ({
    position: 'relative',
    fontWeight: e.typography.weight.bold,
    fontSize: e.typography.size.s2 - 1,
    background: e.background.app,
  })),
  uv = T.td(() => ({ position: 'relative' })),
  dv = T.tr(({ theme: e }) => ({
    '&:hover > td': {
      backgroundColor: `${Tt(0.005, e.background.app)} !important`,
      boxShadow: `${e.color.mediumlight} 0 - 1px 0 0 inset`,
      cursor: 'row-resize',
    },
  })),
  Li = T.button(() => ({
    background: 'none',
    border: 'none',
    padding: '0',
    font: 'inherit',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    color: 'transparent',
    cursor: 'row-resize !important',
  })),
  sa = ({
    level: e = 'section',
    label: t,
    children: r,
    initialExpanded: n = !0,
    colSpan: o = 3,
  }) => {
    let [l, i] = b.useState(n),
      s = e === 'subsection' ? cv : sv,
      c = (r == null ? void 0 : r.length) || 0,
      u = e === 'subsection' ? `${c} item${c !== 1 ? 's' : ''}` : '',
      d = l ? 'arrowdown' : 'arrowright',
      h = `${l ? 'Hide' : 'Show'} ${e === 'subsection' ? c : t} item${c !== 1 ? 's' : ''}`;
    return a.createElement(
      a.Fragment,
      null,
      a.createElement(
        dv,
        { title: h },
        a.createElement(
          s,
          { colSpan: 1 },
          a.createElement(Li, { onClick: (m) => i(!l), tabIndex: 0 }, h),
          a.createElement(iv, null, a.createElement(lv, { icon: d }), t)
        ),
        a.createElement(
          uv,
          { colSpan: o - 1 },
          a.createElement(
            Li,
            { onClick: (m) => i(!l), tabIndex: -1, style: { outline: 'none' } },
            h
          ),
          l ? null : u
        )
      ),
      l ? r : null
    );
  },
  qr = T.div(({ theme: e }) => ({
    display: 'flex',
    gap: 16,
    borderBottom: `1px solid ${e.appBorderColor}`,
    '&:last-child': { borderBottom: 0 },
  })),
  fe = T.div(({ numColumn: e }) => ({
    display: 'flex',
    flexDirection: 'column',
    flex: e || 1,
    gap: 5,
    padding: '12px 20px',
  })),
  ae = T.div(({ theme: e, width: t, height: r }) => ({
    animation: `${e.animation.glow} 1.5s ease-in-out infinite`,
    background: e.appBorderColor,
    width: t || '100%',
    height: r || 16,
    borderRadius: 3,
  })),
  me = [2, 4, 2, 2],
  pv = () =>
    a.createElement(
      a.Fragment,
      null,
      a.createElement(
        qr,
        null,
        a.createElement(
          fe,
          { numColumn: me[0] },
          a.createElement(ae, { width: '60%' })
        ),
        a.createElement(
          fe,
          { numColumn: me[1] },
          a.createElement(ae, { width: '30%' })
        ),
        a.createElement(
          fe,
          { numColumn: me[2] },
          a.createElement(ae, { width: '60%' })
        ),
        a.createElement(
          fe,
          { numColumn: me[3] },
          a.createElement(ae, { width: '60%' })
        )
      ),
      a.createElement(
        qr,
        null,
        a.createElement(
          fe,
          { numColumn: me[0] },
          a.createElement(ae, { width: '60%' })
        ),
        a.createElement(
          fe,
          { numColumn: me[1] },
          a.createElement(ae, { width: '80%' }),
          a.createElement(ae, { width: '30%' })
        ),
        a.createElement(
          fe,
          { numColumn: me[2] },
          a.createElement(ae, { width: '60%' })
        ),
        a.createElement(
          fe,
          { numColumn: me[3] },
          a.createElement(ae, { width: '60%' })
        )
      ),
      a.createElement(
        qr,
        null,
        a.createElement(
          fe,
          { numColumn: me[0] },
          a.createElement(ae, { width: '60%' })
        ),
        a.createElement(
          fe,
          { numColumn: me[1] },
          a.createElement(ae, { width: '80%' }),
          a.createElement(ae, { width: '30%' })
        ),
        a.createElement(
          fe,
          { numColumn: me[2] },
          a.createElement(ae, { width: '60%' })
        ),
        a.createElement(
          fe,
          { numColumn: me[3] },
          a.createElement(ae, { width: '60%' })
        )
      ),
      a.createElement(
        qr,
        null,
        a.createElement(
          fe,
          { numColumn: me[0] },
          a.createElement(ae, { width: '60%' })
        ),
        a.createElement(
          fe,
          { numColumn: me[1] },
          a.createElement(ae, { width: '80%' }),
          a.createElement(ae, { width: '30%' })
        ),
        a.createElement(
          fe,
          { numColumn: me[2] },
          a.createElement(ae, { width: '60%' })
        ),
        a.createElement(
          fe,
          { numColumn: me[3] },
          a.createElement(ae, { width: '60%' })
        )
      )
    ),
  fv = T.div(({ inAddonPanel: e, theme: t }) => ({
    height: e ? '100%' : 'auto',
    display: 'flex',
    border: e ? 'none' : `1px solid ${t.appBorderColor}`,
    borderRadius: e ? 0 : t.appBorderRadius,
    padding: e ? 0 : 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 15,
    background: t.background.content,
    boxShadow: 'rgba(0, 0, 0, 0.10) 0 1px 3px 0',
  })),
  mv = T.div({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    maxWidth: 415,
  }),
  gv = T.div(({ theme: e }) => ({
    fontWeight: e.typography.weight.bold,
    fontSize: e.typography.size.s2 - 1,
    textAlign: 'center',
    color: e.textColor,
  })),
  hv = T.div(({ theme: e }) => ({
    fontWeight: e.typography.weight.regular,
    fontSize: e.typography.size.s2 - 1,
    textAlign: 'center',
    color: e.textMutedColor,
  })),
  bv = T.div(({ theme: e }) => ({
    display: 'flex',
    fontSize: e.typography.size.s2 - 1,
    gap: 25,
  })),
  yv = T.div(({ theme: e }) => ({
    width: 1,
    height: 16,
    backgroundColor: e.appBorderColor,
  })),
  vv = ({ inAddonPanel: e }) => {
    let [t, r] = b.useState(!0);
    return (
      b.useEffect(() => {
        let n = setTimeout(() => {
          r(!1);
        }, 100);
        return () => clearTimeout(n);
      }, []),
      t
        ? null
        : a.createElement(
            fv,
            { inAddonPanel: e },
            a.createElement(
              mv,
              null,
              a.createElement(
                gv,
                null,
                e
                  ? 'Interactive story playground'
                  : "Args table with interactive controls couldn't be auto-generated"
              ),
              a.createElement(
                hv,
                null,
                "Controls give you an easy to use interface to test your components. Set your story args and you'll see controls appearing here automatically."
              )
            ),
            a.createElement(
              bv,
              null,
              e &&
                a.createElement(
                  a.Fragment,
                  null,
                  a.createElement(
                    bt,
                    {
                      href: 'https://youtu.be/0gOfS6K0x0E',
                      target: '_blank',
                      withArrow: !0,
                    },
                    a.createElement(ye, { icon: 'video' }),
                    ' Watch 5m video'
                  ),
                  a.createElement(yv, null),
                  a.createElement(
                    bt,
                    {
                      href: 'https://storybook.js.org/docs/react/essentials/controls',
                      target: '_blank',
                      withArrow: !0,
                    },
                    'Read docs'
                  )
                ),
              !e &&
                a.createElement(
                  bt,
                  {
                    href: 'https://storybook.js.org/docs/react/essentials/controls',
                    target: '_blank',
                    withArrow: !0,
                  },
                  'Learn how to set that up'
                )
            )
          )
    );
  },
  Ev = T.table(({ theme: e, compact: t, inAddonPanel: r }) => ({
    '&&': {
      borderSpacing: 0,
      color: e.color.defaultText,
      'td, th': {
        padding: 0,
        border: 'none',
        verticalAlign: 'top',
        textOverflow: 'ellipsis',
      },
      fontSize: e.typography.size.s2 - 1,
      lineHeight: '20px',
      textAlign: 'left',
      width: '100%',
      marginTop: r ? 0 : 25,
      marginBottom: r ? 0 : 40,
      'thead th:first-of-type, td:first-of-type': { width: '25%' },
      'th:first-of-type, td:first-of-type': { paddingLeft: 20 },
      'th:nth-of-type(2), td:nth-of-type(2)': {
        ...(t ? null : { width: '35%' }),
      },
      'td:nth-of-type(3)': { ...(t ? null : { width: '15%' }) },
      'th:last-of-type, td:last-of-type': {
        paddingRight: 20,
        ...(t ? null : { width: '25%' }),
      },
      th: {
        color:
          e.base === 'light'
            ? J(0.25, e.color.defaultText)
            : J(0.45, e.color.defaultText),
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
      },
      td: {
        paddingTop: '10px',
        paddingBottom: '10px',
        '&:not(:first-of-type)': { paddingLeft: 15, paddingRight: 15 },
        '&:last-of-type': { paddingRight: 20 },
      },
      marginLeft: r ? 0 : 1,
      marginRight: r ? 0 : 1,
      tbody: {
        ...(r
          ? null
          : {
              filter:
                e.base === 'light'
                  ? 'drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.10))'
                  : 'drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.20))',
            }),
        '> tr > *': {
          background: e.background.content,
          borderTop: `1px solid ${e.appBorderColor}`,
        },
        ...(r
          ? null
          : {
              '> tr:first-of-type > *': {
                borderBlockStart: `1px solid ${e.appBorderColor}`,
              },
              '> tr:last-of-type > *': {
                borderBlockEnd: `1px solid ${e.appBorderColor}`,
              },
              '> tr > *:first-of-type': {
                borderInlineStart: `1px solid ${e.appBorderColor}`,
              },
              '> tr > *:last-of-type': {
                borderInlineEnd: `1px solid ${e.appBorderColor}`,
              },
              '> tr:first-of-type > td:first-of-type': {
                borderTopLeftRadius: e.appBorderRadius,
              },
              '> tr:first-of-type > td:last-of-type': {
                borderTopRightRadius: e.appBorderRadius,
              },
              '> tr:last-of-type > td:first-of-type': {
                borderBottomLeftRadius: e.appBorderRadius,
              },
              '> tr:last-of-type > td:last-of-type': {
                borderBottomRightRadius: e.appBorderRadius,
              },
            }),
      },
    },
  })),
  xv = T(Ft)(({ theme: e }) => ({
    color: e.barTextColor,
    margin: '-4px -12px -4px 0',
  })),
  Av = T.span({ display: 'flex', justifyContent: 'space-between' }),
  wv = {
    alpha: (e, t) => e.name.localeCompare(t.name),
    requiredFirst: (e, t) => {
      var r, n;
      return (
        +!!((r = t.type) != null && r.required) -
          +!!((n = e.type) != null && n.required) ||
        e.name.localeCompare(t.name)
      );
    },
    none: void 0,
  },
  Cv = (e, t) => {
    let r = { ungrouped: [], ungroupedSubsections: {}, sections: {} };
    if (!e) return r;
    Object.entries(e).forEach(([l, i]) => {
      let { category: s, subcategory: c } =
        (i == null ? void 0 : i.table) || {};
      if (s) {
        let u = r.sections[s] || { ungrouped: [], subsections: {} };
        if (!c) u.ungrouped.push({ key: l, ...i });
        else {
          let d = u.subsections[c] || [];
          d.push({ key: l, ...i }), (u.subsections[c] = d);
        }
        r.sections[s] = u;
      } else if (c) {
        let u = r.ungroupedSubsections[c] || [];
        u.push({ key: l, ...i }), (r.ungroupedSubsections[c] = u);
      } else r.ungrouped.push({ key: l, ...i });
    });
    let n = wv[t],
      o = (l) =>
        n
          ? Object.keys(l).reduce((i, s) => ({ ...i, [s]: l[s].sort(n) }), {})
          : l;
    return {
      ungrouped: r.ungrouped.sort(n),
      ungroupedSubsections: o(r.ungroupedSubsections),
      sections: Object.keys(r.sections).reduce(
        (l, i) => ({
          ...l,
          [i]: {
            ungrouped: r.sections[i].ungrouped.sort(n),
            subsections: o(r.sections[i].subsections),
          },
        }),
        {}
      ),
    };
  },
  Sv = (e, t, r) => {
    try {
      return Yu(e, t, r);
    } catch (n) {
      return n4.warn(n.message), !1;
    }
  },
  kv = (e) => {
    let {
      updateArgs: t,
      resetArgs: r,
      compact: n,
      inAddonPanel: o,
      initialExpandedArgs: l,
      sort: i = 'none',
      isLoading: s,
    } = e;
    if ('error' in e) {
      let { error: v } = e;
      return a.createElement(
        su,
        null,
        v,
        ' ',
        a.createElement(
          bt,
          {
            href: 'http://storybook.js.org/docs/',
            target: '_blank',
            withArrow: !0,
          },
          'Read the docs'
        )
      );
    }
    if (s) return a.createElement(pv, null);
    let { rows: c, args: u, globals: d } = 'rows' in e && e,
      h = Cv(
        qg(c, (v) => {
          var y;
          return (
            !((y = v == null ? void 0 : v.table) != null && y.disable) &&
            Sv(v, u || {}, d || {})
          );
        }),
        i
      ),
      m = h.ungrouped.length === 0,
      p = Object.entries(h.sections).length === 0,
      g = Object.entries(h.ungroupedSubsections).length === 0;
    if (m && p && g) return a.createElement(vv, { inAddonPanel: o });
    let f = 1;
    t && (f += 1), n || (f += 2);
    let A = Object.keys(h.sections).length > 0,
      w = {
        updateArgs: t,
        compact: n,
        inAddonPanel: o,
        initialExpandedArgs: l,
      };
    return a.createElement(
      To,
      null,
      a.createElement(
        Ev,
        {
          compact: n,
          inAddonPanel: o,
          className: 'docblock-argstable sb-unstyled',
        },
        a.createElement(
          'thead',
          { className: 'docblock-argstable-head' },
          a.createElement(
            'tr',
            null,
            a.createElement('th', null, a.createElement('span', null, 'Name')),
            n
              ? null
              : a.createElement(
                  'th',
                  null,
                  a.createElement('span', null, 'Description')
                ),
            n
              ? null
              : a.createElement(
                  'th',
                  null,
                  a.createElement('span', null, 'Default')
                ),
            t
              ? a.createElement(
                  'th',
                  null,
                  a.createElement(
                    Av,
                    null,
                    'Control',
                    ' ',
                    !s &&
                      r &&
                      a.createElement(
                        xv,
                        { onClick: () => r(), title: 'Reset controls' },
                        a.createElement(ye, { icon: 'undo', 'aria-hidden': !0 })
                      )
                  )
                )
              : null
          )
        ),
        a.createElement(
          'tbody',
          { className: 'docblock-argstable-body' },
          h.ungrouped.map((v) =>
            a.createElement(zr, {
              key: v.key,
              row: v,
              arg: u && u[v.key],
              ...w,
            })
          ),
          Object.entries(h.ungroupedSubsections).map(([v, y]) =>
            a.createElement(
              sa,
              { key: v, label: v, level: 'subsection', colSpan: f },
              y.map((x) =>
                a.createElement(zr, {
                  key: x.key,
                  row: x,
                  arg: u && u[x.key],
                  expandable: A,
                  ...w,
                })
              )
            )
          ),
          Object.entries(h.sections).map(([v, y]) =>
            a.createElement(
              sa,
              { key: v, label: v, level: 'section', colSpan: f },
              y.ungrouped.map((x) =>
                a.createElement(zr, {
                  key: x.key,
                  row: x,
                  arg: u && u[x.key],
                  ...w,
                })
              ),
              Object.entries(y.subsections).map(([x, E]) =>
                a.createElement(
                  sa,
                  { key: x, label: x, level: 'subsection', colSpan: f },
                  E.map((C) =>
                    a.createElement(zr, {
                      key: C.key,
                      row: C,
                      arg: u && u[C.key],
                      expandable: A,
                      ...w,
                    })
                  )
                )
              )
            )
          )
        )
      )
    );
  };
T.div(({ theme: e }) => ({
  marginRight: 30,
  fontSize: `${e.typography.size.s1}px`,
  color:
    e.base === 'light'
      ? J(0.4, e.color.defaultText)
      : J(0.6, e.color.defaultText),
}));
T.div({ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' });
T.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'baseline',
  '&:not(:last-child)': { marginBottom: '1rem' },
});
T.div(Q, ({ theme: e }) => ({
  ..._n(e),
  margin: '25px 0 40px',
  padding: '30px 20px',
}));
T.div(({ theme: e }) => ({
  fontWeight: e.typography.weight.bold,
  color: e.color.defaultText,
}));
T.div(({ theme: e }) => ({
  color:
    e.base === 'light'
      ? J(0.2, e.color.defaultText)
      : J(0.6, e.color.defaultText),
}));
T.div({ flex: '0 0 30%', lineHeight: '20px', marginTop: 5 });
T.div(({ theme: e }) => ({
  flex: 1,
  textAlign: 'center',
  fontFamily: e.typography.fonts.mono,
  fontSize: e.typography.size.s1,
  lineHeight: 1,
  overflow: 'hidden',
  color:
    e.base === 'light'
      ? J(0.4, e.color.defaultText)
      : J(0.6, e.color.defaultText),
  '> div': {
    display: 'inline-block',
    overflow: 'hidden',
    maxWidth: '100%',
    textOverflow: 'ellipsis',
  },
  span: { display: 'block', marginTop: 2 },
}));
T.div({ display: 'flex', flexDirection: 'row' });
T.div(({ background: e }) => ({
  position: 'relative',
  flex: 1,
  '&::before': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: e,
    content: '""',
  },
}));
T.div(({ theme: e }) => ({
  ..._n(e),
  display: 'flex',
  flexDirection: 'row',
  height: 50,
  marginBottom: 5,
  overflow: 'hidden',
  backgroundColor: 'white',
  backgroundImage:
    'repeating-linear-gradient(-45deg, #ccc, #ccc 1px, #fff 1px, #fff 16px)',
  backgroundClip: 'padding-box',
}));
T.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  position: 'relative',
  marginBottom: 30,
});
T.div({ flex: 1, display: 'flex', flexDirection: 'row' });
T.div({ display: 'flex', alignItems: 'flex-start' });
T.div({ flex: '0 0 30%' });
T.div({ flex: 1 });
T.div(({ theme: e }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  paddingBottom: 20,
  fontWeight: e.typography.weight.bold,
  color:
    e.base === 'light'
      ? J(0.4, e.color.defaultText)
      : J(0.6, e.color.defaultText),
}));
T.div(({ theme: e }) => ({
  fontSize: e.typography.size.s2,
  lineHeight: '20px',
  display: 'flex',
  flexDirection: 'column',
}));
T.div(({ theme: e }) => ({
  fontFamily: e.typography.fonts.base,
  fontSize: e.typography.size.s2,
  color: e.color.defaultText,
  marginLeft: 10,
  lineHeight: 1.2,
}));
T.div(({ theme: e }) => ({
  ..._n(e),
  overflow: 'hidden',
  height: 40,
  width: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 'none',
  '> img, > svg': { width: 20, height: 20 },
}));
T.div({
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: '0 1 calc(20% - 10px)',
  minWidth: 120,
  margin: '0px 10px 30px 0',
});
T.div({ display: 'flex', flexFlow: 'row wrap' });
var Tv = (e) => `anchor--${e}`,
  Rv = ({ storyId: e, children: t }) =>
    a.createElement('div', { id: Tv(e), className: 'sb-anchor' }, t);
_e &&
  _e.__DOCS_CONTEXT__ === void 0 &&
  ((_e.__DOCS_CONTEXT__ = b.createContext(null)),
  (_e.__DOCS_CONTEXT__.displayName = 'DocsContext'));
var Re = _e ? _e.__DOCS_CONTEXT__ : b.createContext(null),
  Mr = (e, t) => b.useContext(Re).resolveOf(e, t);
function Ov(e, t = 'start') {
  e.scrollIntoView({ behavior: 'smooth', block: t, inline: 'nearest' });
}
function Lv(e, t) {
  let r = Vo([e], t);
  return r && r[0];
}
function Vo(e, t) {
  let [r, n] = b.useState({});
  return (
    b.useEffect(() => {
      Promise.all(
        e.map(async (o) => {
          let l = await t.loadStory(o);
          n((i) => (i[o] === l ? i : { ...i, [o]: l }));
        })
      );
    }),
    e.map((o) => {
      if (r[o]) return r[o];
      try {
        return t.storyById(o);
      } catch {
        return null;
      }
    })
  );
}
function wu(e) {
  return Wu(e);
}
var Cu = b.createContext({ sources: {} }),
  Su = '--unknown--',
  _v = ({ children: e, channel: t }) => {
    let [r, n] = b.useState({});
    return (
      b.useEffect(() => {
        let o = (l, i = null, s = !1) => {
          let {
              id: c,
              args: u = void 0,
              source: d,
              format: h,
            } = typeof l == 'string' ? { id: l, source: i, format: s } : l,
            m = u ? wu(u) : Su;
          n((p) => ({ ...p, [c]: { ...p[c], [m]: { code: d, format: h } } }));
        };
        return t.on(Jo, o), () => t.off(Jo, o);
      }, []),
      a.createElement(Cu.Provider, { value: { sources: r } }, e)
    );
  },
  Dv = ((e) => (
    (e.OPEN = 'open'), (e.CLOSED = 'closed'), (e.NONE = 'none'), e
  ))(Dv || {}),
  Fv = (e) => {
    let t = e
      .map((r) => {
        var n, o;
        return (o = (n = r.parameters.docs) == null ? void 0 : n.source) == null
          ? void 0
          : o.state;
      })
      .filter(Boolean);
    return t.length === 0 ? 'closed' : t[0];
  },
  Mv = (e, t, r) => {
    let { sources: n } = r,
      o = n == null ? void 0 : n[e];
    return (
      (o == null ? void 0 : o[wu(t)]) ||
      (o == null ? void 0 : o[Su]) || { code: '' }
    );
  },
  $v = ({
    snippet: e,
    storyContext: t,
    typeFromProps: r,
    transformFromProps: n,
  }) => {
    var c, u, d, h, m, p;
    let { __isArgsStory: o } = t.parameters,
      l = ((c = t.parameters.docs) == null ? void 0 : c.source) || {},
      i = r || l.type || Bn.AUTO;
    if (l.code !== void 0) return l.code;
    let s =
      i === Bn.DYNAMIC || (i === Bn.AUTO && e && o)
        ? e
        : l.originalSource || '';
    return (
      l.transformSource &&
        ue(Ee`The \`transformSource\` parameter at \`parameters.docs.source.transformSource\` is deprecated, please use \`parameters.docs.source.transform\` instead. 
    
    Please refer to the migration guide: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#source-block
  `),
      (u = t.parameters.docs) != null &&
        u.transformSource &&
        ue(Ee`The \`transformSource\` parameter at \`parameters.docs.transformSource\` is deprecated, please use \`parameters.docs.source.transform\` instead. 
    
    Please refer to the migration guide: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#source-block
  `),
      (d = t.parameters.jsx) != null &&
        d.transformSource &&
        ue(Ee`The \`transformSource\` parameter at \`parameters.jsx.transformSource\` is deprecated, please use \`parameters.docs.source.transform\` instead. 
    
    Please refer to the migration guide: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#source-block
  `),
      ((p =
        n ??
        l.transform ??
        l.transformSource ??
        ((h = t.parameters.docs) == null ? void 0 : h.transformSource) ??
        ((m = t.parameters.jsx) == null ? void 0 : m.transformSource)) == null
        ? void 0
        : p(s, t)) || s
    );
  },
  ku = (e, t, r) => {
    var p, g, f;
    let n = e.ids || (e.id ? [e.id] : []),
      o = Vo(n, t),
      l = o,
      { of: i } = e;
    if ('of' in e && i === void 0)
      throw new Error(
        'Unexpected `of={undefined}`, did you mistype a CSF file reference?'
      );
    if (i) l = [t.resolveOf(i, ['story']).story];
    else if (l.length === 0)
      try {
        l = [t.storyById()];
      } catch {}
    if (!o.every(Boolean))
      return { error: 'Oh no! The source is not available.', state: 'none' };
    let s =
        ((f =
          (g = (p = l[0]) == null ? void 0 : p.parameters) == null
            ? void 0
            : g.docs) == null
          ? void 0
          : f.source) || {},
      { code: c } = e,
      u = e.format ?? s.format,
      d = e.language ?? s.language ?? 'jsx',
      h = e.dark ?? s.dark ?? !1;
    c ||
      (c = l.map((A, w) => {
        var E, C;
        if (!A) return '';
        let v = t.getStoryContext(A),
          y = e.__forceInitialArgs ? v.initialArgs : v.unmappedArgs,
          x = Mv(A.id, y, r);
        return (
          w === 0 &&
            (u =
              x.format ??
              ((C = (E = A.parameters.docs) == null ? void 0 : E.source) == null
                ? void 0
                : C.format) ??
              !1),
          $v({
            snippet: x.code,
            storyContext: { ...v, args: y },
            typeFromProps: e.type,
            transformFromProps: e.transform,
          })
        );
      }).join(`

`));
    let m = Fv(l);
    return c
      ? { code: c, format: u, language: d, dark: h, state: m }
      : { error: 'Oh no! The source is not available.', state: m };
  },
  Tu = (e, t) => {
    let { id: r, of: n, meta: o, story: l } = e;
    if ('of' in e && n === void 0)
      throw new Error(
        'Unexpected `of={undefined}`, did you mistype a CSF file reference?'
      );
    if (r)
      return (
        ue(Ee`Referencing stories by \`id\` is deprecated, please use \`of\` instead. 
    
      Please refer to the migration guide: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#story-block'`),
        r
      );
    let { name: i } = e;
    return i
      ? (ue(Ee`Referencing stories by \`name\` is deprecated, please use \`of\` instead. 
    
      Please refer to the migration guide: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#story-block'`),
        t.storyIdByName(i))
      : (l &&
          ue(Ee`The \`story\` prop is deprecated, please export your stories from CSF files and reference them with \`of={}\`.

      Please refer to the migration guide: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#story-block'`),
        o && t.referenceMeta(o, !1),
        t.resolveOf(n || l || 'story', ['story']).story.id);
  },
  Bv = (e, t, r) => {
    let { parameters: n = {} } = t || {},
      { docs: o = {} } = n,
      l = o.story || {};
    if (o.disable) return null;
    let { inlineStories: i, iframeHeight: s } = o;
    typeof i < 'u' &&
      ue(Ee`The \`docs.inlineStories\` parameter is deprecated, use \`docs.story.inline\` instead. 
    
      Please refer to the migration guide: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#autodocs-changes'
    `);
    let c = e.inline ?? l.inline ?? i ?? !1;
    if (
      (typeof s < 'u' &&
        ue(Ee`The \`docs.iframeHeight\` parameter is deprecated, use \`docs.story.iframeHeight\` instead. 
    
      Please refer to the migration guide: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#autodocs-changes'
    `),
      c)
    ) {
      let d = e.height ?? l.height,
        h = e.autoplay ?? l.autoplay ?? !1;
      return {
        story: t,
        inline: !0,
        height: d,
        autoplay: h,
        forceInitialArgs: !!e.__forceInitialArgs,
        primary: !!e.__primary,
        renderStoryToElement: r.renderStoryToElement,
      };
    }
    let u = e.height ?? l.height ?? l.iframeHeight ?? s ?? '100px';
    return { story: t, inline: !1, height: u, primary: !!e.__primary };
  },
  Iv = (e = { __forceInitialArgs: !1, __primary: !1 }) => {
    let t = b.useContext(Re),
      r = Tu(e, t),
      n = Lv(r, t);
    if (!n) return a.createElement(Ho, null);
    let o = Bv(e, n, t);
    return o ? a.createElement(k4, { ...o }) : null;
  },
  Nv = (
    { withSource: e, mdxSource: t, children: r, layout: n, ...o },
    l,
    i
  ) => {
    let s = b.Children.toArray(r)
        .filter((m) => m.props && (m.props.id || m.props.name || m.props.of))
        .map((m) => Tu(m.props, l)),
      c = Vo(s, l),
      u = c.some((m) => !m),
      d = ku(
        {
          ...(t ? { code: decodeURI(t) } : { ids: s }),
          ...(o.of && { of: o.of }),
        },
        l,
        i
      );
    if (e === 'none') return { isLoading: u, previewProps: o };
    let h = n;
    return (
      b.Children.forEach(r, (m) => {
        var p, g;
        h ||
          (h =
            (g =
              (p = m == null ? void 0 : m.props) == null
                ? void 0
                : p.parameters) == null
              ? void 0
              : g.layout);
      }),
      c.forEach((m) => {
        var p, g;
        h ||
          !m ||
          (h =
            (m == null ? void 0 : m.parameters.layout) ??
            ((g = (p = m.parameters.docs) == null ? void 0 : p.canvas) == null
              ? void 0
              : g.layout));
      }),
      {
        isLoading: u,
        previewProps: {
          ...o,
          layout: h ?? 'padded',
          withSource: d,
          isExpanded: (e || d.state) === 'open',
        },
      }
    );
  },
  Zv = (e) => {
    var A, w, v, y, x, E, C, S, k, R;
    let t = b.useContext(Re),
      r = b.useContext(Cu),
      { children: n, of: o, source: l } = e;
    if ('of' in e && o === void 0)
      throw new Error(
        'Unexpected `of={undefined}`, did you mistype a CSF file reference?'
      );
    let { isLoading: i, previewProps: s } = Nv(e, t, r),
      c,
      u,
      d;
    try {
      ({ story: c } = Mr(o || 'story', ['story']));
    } catch (O) {
      n || (d = O);
    }
    try {
      u = ku({ ...l, ...(o && { of: o }) }, t, r);
    } catch (O) {
      n || (d = O);
    }
    if (d) throw d;
    if (
      (e.withSource &&
        ue(Ee`Setting source state with \`withSource\` is deprecated, please use \`sourceState\` with 'hidden', 'shown' or 'none' instead. 
    
    Please refer to the migration guide: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#canvas-block
    `),
      e.mdxSource &&
        ue(Ee`Setting source code with \`mdxSource\` is deprecated, please use source={{code: '...'}} instead. 
    
    Please refer to the migration guide: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#canvas-block
    `),
      (e.isColumn !== void 0 || e.columns !== void 0) &&
        ue(Ee`\`isColumn\` and \`columns\` props are deprecated as the Canvas block now only supports showing a single story. 
    
    Please refer to the migration guide: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#canvas-block
    `),
      n)
    )
      return (
        ue(Ee`Passing children to Canvas is deprecated, please use the \`of\` prop instead to reference a story. 
    
    Please refer to the migration guide: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#canvas-block
  `),
        i ? a.createElement(M4, null) : a.createElement(Na, { ...s }, n)
      );
    let h =
        e.layout ??
        c.parameters.layout ??
        ((w = (A = c.parameters.docs) == null ? void 0 : A.canvas) == null
          ? void 0
          : w.layout) ??
        'padded',
      m =
        e.withToolbar ??
        ((y = (v = c.parameters.docs) == null ? void 0 : v.canvas) == null
          ? void 0
          : y.withToolbar) ??
        !1,
      p =
        e.additionalActions ??
        ((E = (x = c.parameters.docs) == null ? void 0 : x.canvas) == null
          ? void 0
          : E.additionalActions),
      g =
        e.sourceState ??
        ((S = (C = c.parameters.docs) == null ? void 0 : C.canvas) == null
          ? void 0
          : S.sourceState) ??
        'hidden',
      f =
        e.className ??
        ((R = (k = c.parameters.docs) == null ? void 0 : k.canvas) == null
          ? void 0
          : R.className);
    return a.createElement(
      Na,
      {
        withSource: g === 'none' ? void 0 : u,
        isExpanded: g === 'shown',
        withToolbar: m,
        additionalActions: p,
        className: f,
        layout: h,
      },
      a.createElement(Iv, { of: o || c.moduleExport, meta: e.meta, ...e.story })
    );
  },
  Hv = (e, t) => {
    let r = t.getStoryContext(e),
      [n, o] = b.useState(r.globals);
    return (
      b.useEffect(() => {
        let l = (i) => {
          o(i.globals);
        };
        return t.channel.on(bi, l), () => t.channel.off(bi, l);
      }, [t.channel]),
      [n]
    );
  },
  jv = (e, t) => {
    let r = Pv(e, t);
    if (!r) throw new Error('No result when story was defined');
    return r;
  },
  Pv = (e, t) => {
    let r = e ? t.getStoryContext(e) : { args: {} },
      { id: n } = e || { id: 'none' },
      [o, l] = b.useState(r.args);
    b.useEffect(() => {
      let c = (u) => {
        u.storyId === n && l(u.args);
      };
      return t.channel.on(hi, c), () => t.channel.off(hi, c);
    }, [n, t.channel]);
    let i = b.useCallback(
        (c) => t.channel.emit(o4, { storyId: n, updatedArgs: c }),
        [n, t.channel]
      ),
      s = b.useCallback(
        (c) => t.channel.emit(l4, { storyId: n, argNames: c }),
        [n, t.channel]
      );
    return e && [o, i, s];
  },
  Vv = (e) => {
    var f;
    let { of: t } = e;
    if ('of' in e && t === void 0)
      throw new Error(
        'Unexpected `of={undefined}`, did you mistype a CSF file reference?'
      );
    let r = b.useContext(Re),
      { story: n } = r.resolveOf(t || 'story', ['story']),
      { parameters: o, argTypes: l } = n,
      i = ((f = o.docs) == null ? void 0 : f.controls) || {},
      s = e.include ?? i.include,
      c = e.exclude ?? i.exclude,
      u = e.sort ?? i.sort,
      [d, h, m] = jv(n, r),
      [p] = Hv(n, r),
      g = a4(l, s, c);
    return a.createElement(kv, {
      rows: g,
      args: d,
      globals: p,
      updateArgs: h,
      resetArgs: m,
      sort: u,
    });
  },
  { document: Ru } = _e,
  Ou = ({ className: e, children: t, ...r }) => {
    if (typeof e != 'string' && (typeof t != 'string' || !t.match(/[\n\r]/g)))
      return a.createElement(Co, null, t);
    let n = e && e.split('-');
    return a.createElement(No, {
      language: (n && n[1]) || 'plaintext',
      format: !1,
      code: t,
      ...r,
    });
  };
function zo(e, t) {
  e.channel.emit(i4, t);
}
var Pa = _c.a,
  zv = ({ hash: e, children: t }) => {
    let r = b.useContext(Re);
    return a.createElement(
      Pa,
      {
        href: e,
        target: '_self',
        onClick: (n) => {
          let o = e.substring(1);
          Ru.getElementById(o) && zo(r, e);
        },
      },
      t
    );
  },
  Lu = (e) => {
    let { href: t, target: r, children: n, ...o } = e,
      l = b.useContext(Re);
    if (t) {
      if (t.startsWith('#')) return a.createElement(zv, { hash: t }, n);
      if (r !== '_blank' && !t.startsWith('https://'))
        return a.createElement(
          Pa,
          {
            href: t,
            onClick: (i) => {
              i.button === 0 &&
                !i.altKey &&
                !i.ctrlKey &&
                !i.metaKey &&
                !i.shiftKey &&
                (i.preventDefault(),
                zo(l, i.currentTarget.getAttribute('href')));
            },
            target: r,
            ...o,
          },
          n
        );
    }
    return a.createElement(Pa, { ...e });
  },
  _u = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  qv = _u.reduce(
    (e, t) => ({
      ...e,
      [t]: T(t)({
        '& svg': { position: 'relative', top: '-0.1em', visibility: 'hidden' },
        '&:hover svg': { visibility: 'visible' },
      }),
    }),
    {}
  ),
  Uv = T.a(() => ({
    float: 'left',
    lineHeight: 'inherit',
    paddingRight: '10px',
    marginLeft: '-24px',
    color: 'inherit',
  })),
  Wv = ({ as: e, id: t, children: r, ...n }) => {
    let o = b.useContext(Re),
      l = qv[e],
      i = `#${t}`;
    return a.createElement(
      l,
      { id: t, ...n },
      a.createElement(
        Uv,
        {
          'aria-hidden': 'true',
          href: i,
          tabIndex: -1,
          target: '_self',
          onClick: (s) => {
            Ru.getElementById(t) && zo(o, i);
          },
        },
        a.createElement(ye, { icon: 'link' })
      ),
      r
    );
  },
  qo = (e) => {
    let { as: t, id: r, children: n, ...o } = e;
    if (r) return a.createElement(Wv, { as: t, id: r, ...o }, n);
    let l = t,
      { as: i, ...s } = e;
    return a.createElement(l, { ...Y(s, t) });
  },
  Du = _u.reduce(
    (e, t) => ({ ...e, [t]: (r) => a.createElement(qo, { as: t, ...r }) }),
    {}
  ),
  Gv = (e) => {
    var t;
    if (!e.children) return null;
    if (typeof e.children != 'string')
      throw new Error(Ee`The Markdown block only accepts children as a single string, but children were of type: '${typeof e.children}'
        This is often caused by not wrapping the child in a template string.
        
        This is invalid:
        <Markdown>
          # Some heading
          A paragraph
        </Markdown>

        Instead do:
        <Markdown>
        {\`
          # Some heading
          A paragraph
        \`}
        </Markdown>
      `);
    return a.createElement(nu, {
      ...e,
      options: {
        forceBlock: !0,
        overrides: {
          code: Ou,
          a: Lu,
          ...Du,
          ...((t = e == null ? void 0 : e.options) == null
            ? void 0
            : t.overrides),
        },
        ...(e == null ? void 0 : e.options),
      },
    });
  },
  Yv = ((e) => (
    (e.INFO = 'info'),
    (e.NOTES = 'notes'),
    (e.DOCGEN = 'docgen'),
    (e.AUTO = 'auto'),
    e
  ))(Yv || {}),
  tn =
    'https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#description-block-parametersnotes-and-parametersinfo',
  Kv = (e) => e && (typeof e == 'string' ? e : ua(e.markdown) || ua(e.text)),
  Xv = (e) => e && (typeof e == 'string' ? e : ua(e.text)),
  Jv = (e) => null,
  Qv = (e) => {
    var t, r, n, o, l, i, s, c;
    switch (e.type) {
      case 'story':
        return (
          ((r =
            (t = e.story.parameters.docs) == null ? void 0 : t.description) ==
          null
            ? void 0
            : r.story) || null
        );
      case 'meta': {
        let { parameters: u, component: d } = e.preparedMeta;
        return (
          ((o = (n = u.docs) == null ? void 0 : n.description) == null
            ? void 0
            : o.component) ||
          ((i =
            (l = u.docs) == null ? void 0 : l.extractComponentDescription) ==
          null
            ? void 0
            : i.call(l, d, { component: d, parameters: u })) ||
          null
        );
      }
      case 'component': {
        let {
          component: u,
          projectAnnotations: { parameters: d },
        } = e;
        return (
          ((c =
            (s = d.docs) == null ? void 0 : s.extractComponentDescription) ==
          null
            ? void 0
            : c.call(s, u, { component: u, parameters: d })) || null
        );
      }
      default:
        throw new Error(
          `Unrecognized module type resolved from 'useOf', got: ${e.type}`
        );
    }
  },
  e6 = ({ type: e, markdown: t, children: r }, { storyById: n }) => {
    let { component: o, parameters: l } = n();
    if (r || t) return r || t;
    let { notes: i, info: s, docs: c } = l;
    (i || s) &&
      ue(
        `Using 'parameters.notes' or 'parameters.info' properties to describe stories is deprecated. See ${tn}`
      );
    let { extractComponentDescription: u = Jv, description: d } = c || {},
      h = d == null ? void 0 : d.component;
    if (h) return h;
    switch (e) {
      case 'info':
        return Xv(s);
      case 'notes':
        return Kv(i);
      case 'docgen':
      case 'auto':
      default:
        return u(o, { component: o, ...l });
    }
  },
  Va = (e) => {
    let { of: t, type: r, markdown: n, children: o } = e;
    if ('of' in e && t === void 0)
      throw new Error(
        'Unexpected `of={undefined}`, did you mistype a CSF file reference?'
      );
    let l = b.useContext(Re),
      i = Mr(t || 'meta'),
      s;
    return (
      r || n || o ? (s = e6(e, l)) : (s = Qv(i)),
      r && ue(`Manually specifying description type is deprecated. See ${tn}`),
      n &&
        ue(
          `The 'markdown' prop on the Description block is deprecated. See ${tn}`
        ),
      o &&
        ue(
          `The 'children' prop on the Description block is deprecated. See ${tn}`
        ),
      s ? a.createElement(Gv, null, s) : null
    );
  },
  t6 = T.div(({ theme: e }) => ({
    width: '10rem',
    '@media (max-width: 768px)': { display: 'none' },
  })),
  r6 = T.div(({ theme: e }) => ({
    position: 'fixed',
    bottom: 0,
    top: 0,
    width: '10rem',
    paddingTop: '4rem',
    paddingBottom: '2rem',
    overflowY: 'auto',
    fontFamily: e.typography.fonts.base,
    fontSize: e.typography.size.s2,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    WebkitOverflowScrolling: 'touch',
    '& *': { boxSizing: 'border-box' },
    '& > .toc-wrapper > .toc-list': {
      paddingLeft: 0,
      borderLeft: `solid 2px ${e.color.mediumlight}`,
      '.toc-list': {
        paddingLeft: 0,
        borderLeft: `solid 2px ${e.color.mediumlight}`,
        '.toc-list': {
          paddingLeft: 0,
          borderLeft: `solid 2px ${e.color.mediumlight}`,
        },
      },
    },
    '& .toc-list-item': {
      position: 'relative',
      listStyleType: 'none',
      marginLeft: 20,
      paddingTop: 3,
      paddingBottom: 3,
    },
    '& .toc-list-item::before': {
      content: '""',
      position: 'absolute',
      height: '100%',
      top: 0,
      left: 0,
      transform: 'translateX(calc(-2px - 20px))',
      borderLeft: `solid 2px ${e.color.mediumdark}`,
      opacity: 0,
      transition: 'opacity 0.2s',
    },
    '& .toc-list-item.is-active-li::before': { opacity: 1 },
    '& .toc-list-item > a': {
      color: e.color.defaultText,
      textDecoration: 'none',
    },
    '& .toc-list-item.is-active-li > a': {
      fontWeight: 600,
      color: e.color.secondary,
      textDecoration: 'none',
    },
  })),
  n6 = T.p(({ theme: e }) => ({
    fontWeight: 600,
    fontSize: '0.875em',
    color: e.textColor,
    textTransform: 'uppercase',
    marginBottom: 10,
  })),
  a6 = ({ title: e }) =>
    e === null ? null : typeof e == 'string' ? a.createElement(n6, null, e) : e,
  o6 = ({
    title: e,
    disable: t,
    headingSelector: r,
    contentsSelector: n,
    ignoreSelector: o,
    unsafeTocbotOptions: l,
  }) => (
    b.useEffect(() => {
      let i = {
          tocSelector: '.toc-wrapper',
          contentSelector: n ?? '.sbdocs-content',
          headingSelector: r ?? 'h3',
          ignoreSelector: o ?? '.skip-toc',
          headingsOffset: 40,
          scrollSmoothOffset: -40,
          orderedList: !1,
          onClick: () => !1,
          ...l,
        },
        s = setTimeout(() => gi.init(i), 100);
      return () => {
        clearTimeout(s), gi.destroy();
      };
    }, [t]),
    a.createElement(
      a.Fragment,
      null,
      a.createElement(
        t6,
        null,
        t
          ? null
          : a.createElement(
              r6,
              null,
              a.createElement(a6, { title: e || null }),
              a.createElement('div', { className: 'toc-wrapper' })
            )
      )
    )
  ),
  { document: l6, window: i6 } = _e,
  s6 = ({ context: e, theme: t, children: r }) => {
    var o, l, i, s, c;
    let n;
    try {
      n =
        (l =
          (o = e.resolveOf('meta', ['meta']).preparedMeta.parameters) == null
            ? void 0
            : o.docs) == null
          ? void 0
          : l.toc;
    } catch {
      n =
        (c =
          (s =
            (i = e == null ? void 0 : e.projectAnnotations) == null
              ? void 0
              : i.parameters) == null
            ? void 0
            : s.docs) == null
          ? void 0
          : c.toc;
    }
    return (
      b.useEffect(() => {
        let u;
        try {
          if (((u = new URL(i6.parent.location.toString())), u.hash)) {
            let d = l6.getElementById(u.hash.substring(1));
            d &&
              setTimeout(() => {
                Ov(d);
              }, 200);
          }
        } catch {}
      }),
      a.createElement(
        Re.Provider,
        { value: e },
        a.createElement(
          _v,
          { channel: e.channel },
          a.createElement(
            ts,
            { theme: Z1(t) },
            a.createElement(
              h4,
              {
                toc: n
                  ? a.createElement(o6, {
                      className: 'sbdocs sbdocs-toc--custom',
                      ...n,
                    })
                  : null,
              },
              r
            )
          )
        )
      )
    );
  },
  c6 = /\s*\/\s*/,
  u6 = (e) => {
    let t = e.trim().split(c6);
    return (t && t[t.length - 1]) || e;
  },
  d6 = ({ children: e }) => {
    let t = b.useContext(Re),
      r = e || u6(t.storyById().title);
    return r
      ? a.createElement(p4, { className: 'sbdocs-title sb-unstyled' }, r)
      : null;
  },
  p6 = ({ children: e }) => {
    var n;
    let t = b.useContext(Re),
      r =
        e ||
        ((n = t.storyById().parameters) == null ? void 0 : n.componentSubtitle);
    return r
      ? a.createElement(f4, { className: 'sbdocs-subtitle sb-unstyled' }, r)
      : null;
  },
  f6 = ({ children: e, disableAnchor: t }) => {
    if (t || typeof e != 'string') return a.createElement(ko, null, e);
    let r = e.toLowerCase().replace(/[^a-z0-9]/gi, '-');
    return a.createElement(qo, { as: 'h3', id: r }, e);
  },
  Fu = ({
    of: e,
    expanded: t = !0,
    withToolbar: r = !1,
    __forceInitialArgs: n = !1,
    __primary: o = !1,
  }) => {
    var s, c;
    let { story: l } = Mr(e || 'story', ['story']),
      i =
        ((c = (s = l.parameters.docs) == null ? void 0 : s.canvas) == null
          ? void 0
          : c.withToolbar) ?? r;
    return a.createElement(
      Rv,
      { storyId: l.id },
      t &&
        a.createElement(
          a.Fragment,
          null,
          a.createElement(f6, null, l.name),
          a.createElement(Va, { of: e })
        ),
      a.createElement(Zv, {
        of: e,
        withToolbar: i,
        story: { __forceInitialArgs: n, __primary: o },
        source: { __forceInitialArgs: n },
      })
    );
  },
  m6 = (e) => {
    let { name: t, of: r } = e;
    if ('of' in e && r === void 0)
      throw new Error(
        'Unexpected `of={undefined}`, did you mistype a CSF file reference?'
      );
    let n = b.useContext(Re),
      o;
    if ((r && (o = Mr(r || 'meta', ['meta']).csfFile.stories[0] || null), !o)) {
      let l = t && n.storyIdByName(t);
      o = n.storyById(l);
    }
    return (
      t &&
        ue(Ee`\`name\` prop is deprecated on the Primary block.
    The Primary block should only be used to render the primary story, which is automatically found.
    `),
      o
        ? a.createElement(Fu, {
            of: o.moduleExport,
            expanded: !1,
            __primary: !0,
            withToolbar: !0,
          })
        : null
    );
  },
  g6 = ({ children: e, disableAnchor: t, ...r }) => {
    if (t || typeof e != 'string') return a.createElement(So, null, e);
    let n = e.toLowerCase().replace(/[^a-z0-9]/gi, '-');
    return a.createElement(qo, { as: 'h2', id: n, ...r }, e);
  },
  h6 = T(g6)(({ theme: e }) => ({
    fontSize: `${e.typography.size.s2 - 1}px`,
    fontWeight: e.typography.weight.bold,
    lineHeight: '16px',
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    color: e.textMutedColor,
    border: 0,
    marginBottom: '12px',
    '&:first-of-type': { marginTop: '56px' },
  })),
  b6 = ({ title: e = 'Stories', includePrimary: t = !0 }) => {
    let { componentStories: r } = b.useContext(Re),
      n = r().filter((o) => {
        var l, i;
        return !(
          (i = (l = o.parameters) == null ? void 0 : l.docs) != null &&
          i.disable
        );
      });
    return (
      t || (n = n.slice(1)),
      !n || n.length === 0
        ? null
        : a.createElement(
            a.Fragment,
            null,
            a.createElement(h6, null, e),
            n.map(
              (o) =>
                o &&
                a.createElement(Fu, {
                  key: o.id,
                  of: o.moduleExport,
                  expanded: !0,
                  __forceInitialArgs: !0,
                })
            )
          )
    );
  },
  y6 = () => {
    let e = Mr('meta', ['meta']),
      { stories: t } = e.csfFile,
      r = Object.keys(t).length === 1;
    return a.createElement(
      a.Fragment,
      null,
      a.createElement(d6, null),
      a.createElement(p6, null),
      a.createElement(Va, { of: 'meta' }),
      r ? a.createElement(Va, { of: 'story' }) : null,
      a.createElement(m6, null),
      a.createElement(Vv, null),
      r ? null : a.createElement(b6, null)
    );
  };
function v6({ context: e, docsParameter: t }) {
  let r = t.container || s6,
    n = t.page || y6;
  return a.createElement(
    r,
    { context: e, theme: t.theme },
    a.createElement(n, null)
  );
}
var Mu = { code: Ou, a: Lu, ...Du },
  E6 = class extends b.Component {
    constructor() {
      super(...arguments), (this.state = { hasError: !1 });
    }
    static getDerivedStateFromError() {
      return { hasError: !0 };
    }
    componentDidCatch(e) {
      let { showException: t } = this.props;
      t(e);
    }
    render() {
      let { hasError: e } = this.state,
        { children: t } = this.props;
      return e ? null : a.createElement(a.Fragment, null, t);
    }
  },
  x6 = class {
    constructor() {
      (this.render = async (e, t, r) => {
        let n = { ...Mu, ...(t == null ? void 0 : t.components) },
          o = v6;
        return new Promise((l, i) => {
          yt(
            () => import('./index-3fd0d1ea.js'),
            [
              './index-3fd0d1ea.js',
              './index-76fb7be0.js',
              './_commonjsHelpers-de833af9.js',
            ],
            import.meta.url
          )
            .then(({ MDXProvider: s }) =>
              Bu(
                a.createElement(
                  E6,
                  { showException: i, key: Math.random() },
                  a.createElement(
                    s,
                    { components: n },
                    a.createElement(o, { context: e, docsParameter: t })
                  )
                ),
                r
              )
            )
            .then(() => l());
        });
      }),
        (this.unmount = (e) => {
          Iu(e);
        });
    }
  };
const N6 = Object.freeze(
  Object.defineProperty(
    { __proto__: null, DocsRenderer: x6, defaultComponents: Mu },
    Symbol.toStringTag,
    { value: 'Module' }
  )
);
export {
  N6 as D,
  Ne as F,
  ye as I,
  fo as S,
  bm as T,
  F5 as W,
  ke as _,
  qs as a,
  B as b,
  Ds as c,
  cm as d,
  Ze as g,
  T as n,
  M6 as s,
};
