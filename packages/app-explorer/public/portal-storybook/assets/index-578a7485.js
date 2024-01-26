import { c as Ir, g as Rr } from './_commonjsHelpers-de833af9.js';
import { r as Nr } from './index-0c70cacd.js';
var Tr = function () {
    if (
      typeof Symbol != 'function' ||
      typeof Object.getOwnPropertySymbols != 'function'
    )
      return !1;
    if (typeof Symbol.iterator == 'symbol') return !0;
    var e = {},
      t = Symbol('test'),
      n = Object(t);
    if (
      typeof t == 'string' ||
      Object.prototype.toString.call(t) !== '[object Symbol]' ||
      Object.prototype.toString.call(n) !== '[object Symbol]'
    )
      return !1;
    var o = 42;
    e[t] = o;
    for (t in e) return !1;
    if (
      (typeof Object.keys == 'function' && Object.keys(e).length !== 0) ||
      (typeof Object.getOwnPropertyNames == 'function' &&
        Object.getOwnPropertyNames(e).length !== 0)
    )
      return !1;
    var a = Object.getOwnPropertySymbols(e);
    if (
      a.length !== 1 ||
      a[0] !== t ||
      !Object.prototype.propertyIsEnumerable.call(e, t)
    )
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == 'function') {
      var i = Object.getOwnPropertyDescriptor(e, t);
      if (i.value !== o || i.enumerable !== !0) return !1;
    }
    return !0;
  },
  ke = typeof Symbol < 'u' && Symbol,
  Dr = Tr,
  Mr = function () {
    return typeof ke != 'function' ||
      typeof Symbol != 'function' ||
      typeof ke('foo') != 'symbol' ||
      typeof Symbol('bar') != 'symbol'
      ? !1
      : Dr();
  },
  ze = { foo: {} },
  Br = Object,
  Cr = function () {
    return (
      { __proto__: ze }.foo === ze.foo && !({ __proto__: null } instanceof Br)
    );
  },
  _r = 'Function.prototype.bind called on incompatible ',
  Wr = Object.prototype.toString,
  Ur = Math.max,
  Lr = '[object Function]',
  He = function (e, t) {
    for (var n = [], o = 0; o < e.length; o += 1) n[o] = e[o];
    for (var a = 0; a < t.length; a += 1) n[a + e.length] = t[a];
    return n;
  },
  Gr = function (e, t) {
    for (var n = [], o = t || 0, a = 0; o < e.length; o += 1, a += 1)
      n[a] = e[o];
    return n;
  },
  kr = function (r, e) {
    for (var t = '', n = 0; n < r.length; n += 1)
      (t += r[n]), n + 1 < r.length && (t += e);
    return t;
  },
  zr = function (e) {
    var t = this;
    if (typeof t != 'function' || Wr.apply(t) !== Lr)
      throw new TypeError(_r + t);
    for (
      var n = Gr(arguments, 1),
        o,
        a = function () {
          if (this instanceof o) {
            var c = t.apply(this, He(n, arguments));
            return Object(c) === c ? c : this;
          }
          return t.apply(e, He(n, arguments));
        },
        i = Ur(0, t.length - n.length),
        l = [],
        f = 0;
      f < i;
      f++
    )
      l[f] = '$' + f;
    if (
      ((o = Function(
        'binder',
        'return function (' +
          kr(l, ',') +
          '){ return binder.apply(this,arguments); }'
      )(a)),
      t.prototype)
    ) {
      var u = function () {};
      (u.prototype = t.prototype),
        (o.prototype = new u()),
        (u.prototype = null);
    }
    return o;
  },
  Hr = zr,
  Me = Function.prototype.bind || Hr,
  qr = Function.prototype.call,
  Qr = Object.prototype.hasOwnProperty,
  Vr = Me,
  Jr = Vr.call(qr, Qr),
  y,
  J = SyntaxError,
  pr = Function,
  V = TypeError,
  me = function (r) {
    try {
      return pr('"use strict"; return (' + r + ').constructor;')();
    } catch {}
  },
  C = Object.getOwnPropertyDescriptor;
if (C)
  try {
    C({}, '');
  } catch {
    C = null;
  }
var he = function () {
    throw new V();
  },
  Kr = C
    ? (function () {
        try {
          return arguments.callee, he;
        } catch {
          try {
            return C(arguments, 'callee').get;
          } catch {
            return he;
          }
        }
      })()
    : he,
  H = Mr(),
  Yr = Cr(),
  h =
    Object.getPrototypeOf ||
    (Yr
      ? function (r) {
          return r.__proto__;
        }
      : null),
  Q = {},
  Xr = typeof Uint8Array > 'u' || !h ? y : h(Uint8Array),
  _ = {
    '%AggregateError%': typeof AggregateError > 'u' ? y : AggregateError,
    '%Array%': Array,
    '%ArrayBuffer%': typeof ArrayBuffer > 'u' ? y : ArrayBuffer,
    '%ArrayIteratorPrototype%': H && h ? h([][Symbol.iterator]()) : y,
    '%AsyncFromSyncIteratorPrototype%': y,
    '%AsyncFunction%': Q,
    '%AsyncGenerator%': Q,
    '%AsyncGeneratorFunction%': Q,
    '%AsyncIteratorPrototype%': Q,
    '%Atomics%': typeof Atomics > 'u' ? y : Atomics,
    '%BigInt%': typeof BigInt > 'u' ? y : BigInt,
    '%BigInt64Array%': typeof BigInt64Array > 'u' ? y : BigInt64Array,
    '%BigUint64Array%': typeof BigUint64Array > 'u' ? y : BigUint64Array,
    '%Boolean%': Boolean,
    '%DataView%': typeof DataView > 'u' ? y : DataView,
    '%Date%': Date,
    '%decodeURI%': decodeURI,
    '%decodeURIComponent%': decodeURIComponent,
    '%encodeURI%': encodeURI,
    '%encodeURIComponent%': encodeURIComponent,
    '%Error%': Error,
    '%eval%': eval,
    '%EvalError%': EvalError,
    '%Float32Array%': typeof Float32Array > 'u' ? y : Float32Array,
    '%Float64Array%': typeof Float64Array > 'u' ? y : Float64Array,
    '%FinalizationRegistry%':
      typeof FinalizationRegistry > 'u' ? y : FinalizationRegistry,
    '%Function%': pr,
    '%GeneratorFunction%': Q,
    '%Int8Array%': typeof Int8Array > 'u' ? y : Int8Array,
    '%Int16Array%': typeof Int16Array > 'u' ? y : Int16Array,
    '%Int32Array%': typeof Int32Array > 'u' ? y : Int32Array,
    '%isFinite%': isFinite,
    '%isNaN%': isNaN,
    '%IteratorPrototype%': H && h ? h(h([][Symbol.iterator]())) : y,
    '%JSON%': typeof JSON == 'object' ? JSON : y,
    '%Map%': typeof Map > 'u' ? y : Map,
    '%MapIteratorPrototype%':
      typeof Map > 'u' || !H || !h ? y : h(new Map()[Symbol.iterator]()),
    '%Math%': Math,
    '%Number%': Number,
    '%Object%': Object,
    '%parseFloat%': parseFloat,
    '%parseInt%': parseInt,
    '%Promise%': typeof Promise > 'u' ? y : Promise,
    '%Proxy%': typeof Proxy > 'u' ? y : Proxy,
    '%RangeError%': RangeError,
    '%ReferenceError%': ReferenceError,
    '%Reflect%': typeof Reflect > 'u' ? y : Reflect,
    '%RegExp%': RegExp,
    '%Set%': typeof Set > 'u' ? y : Set,
    '%SetIteratorPrototype%':
      typeof Set > 'u' || !H || !h ? y : h(new Set()[Symbol.iterator]()),
    '%SharedArrayBuffer%':
      typeof SharedArrayBuffer > 'u' ? y : SharedArrayBuffer,
    '%String%': String,
    '%StringIteratorPrototype%': H && h ? h(''[Symbol.iterator]()) : y,
    '%Symbol%': H ? Symbol : y,
    '%SyntaxError%': J,
    '%ThrowTypeError%': Kr,
    '%TypedArray%': Xr,
    '%TypeError%': V,
    '%Uint8Array%': typeof Uint8Array > 'u' ? y : Uint8Array,
    '%Uint8ClampedArray%':
      typeof Uint8ClampedArray > 'u' ? y : Uint8ClampedArray,
    '%Uint16Array%': typeof Uint16Array > 'u' ? y : Uint16Array,
    '%Uint32Array%': typeof Uint32Array > 'u' ? y : Uint32Array,
    '%URIError%': URIError,
    '%WeakMap%': typeof WeakMap > 'u' ? y : WeakMap,
    '%WeakRef%': typeof WeakRef > 'u' ? y : WeakRef,
    '%WeakSet%': typeof WeakSet > 'u' ? y : WeakSet,
  };
if (h)
  try {
    null.error;
  } catch (r) {
    var Zr = h(h(r));
    _['%Error.prototype%'] = Zr;
  }
var jr = function r(e) {
    var t;
    if (e === '%AsyncFunction%') t = me('async function () {}');
    else if (e === '%GeneratorFunction%') t = me('function* () {}');
    else if (e === '%AsyncGeneratorFunction%') t = me('async function* () {}');
    else if (e === '%AsyncGenerator%') {
      var n = r('%AsyncGeneratorFunction%');
      n && (t = n.prototype);
    } else if (e === '%AsyncIteratorPrototype%') {
      var o = r('%AsyncGenerator%');
      o && h && (t = h(o.prototype));
    }
    return (_[e] = t), t;
  },
  qe = {
    '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
    '%ArrayPrototype%': ['Array', 'prototype'],
    '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
    '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
    '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
    '%ArrayProto_values%': ['Array', 'prototype', 'values'],
    '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
    '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
    '%AsyncGeneratorPrototype%': [
      'AsyncGeneratorFunction',
      'prototype',
      'prototype',
    ],
    '%BooleanPrototype%': ['Boolean', 'prototype'],
    '%DataViewPrototype%': ['DataView', 'prototype'],
    '%DatePrototype%': ['Date', 'prototype'],
    '%ErrorPrototype%': ['Error', 'prototype'],
    '%EvalErrorPrototype%': ['EvalError', 'prototype'],
    '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
    '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
    '%FunctionPrototype%': ['Function', 'prototype'],
    '%Generator%': ['GeneratorFunction', 'prototype'],
    '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
    '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
    '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
    '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
    '%JSONParse%': ['JSON', 'parse'],
    '%JSONStringify%': ['JSON', 'stringify'],
    '%MapPrototype%': ['Map', 'prototype'],
    '%NumberPrototype%': ['Number', 'prototype'],
    '%ObjectPrototype%': ['Object', 'prototype'],
    '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
    '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
    '%PromisePrototype%': ['Promise', 'prototype'],
    '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
    '%Promise_all%': ['Promise', 'all'],
    '%Promise_reject%': ['Promise', 'reject'],
    '%Promise_resolve%': ['Promise', 'resolve'],
    '%RangeErrorPrototype%': ['RangeError', 'prototype'],
    '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
    '%RegExpPrototype%': ['RegExp', 'prototype'],
    '%SetPrototype%': ['Set', 'prototype'],
    '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
    '%StringPrototype%': ['String', 'prototype'],
    '%SymbolPrototype%': ['Symbol', 'prototype'],
    '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
    '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
    '%TypeErrorPrototype%': ['TypeError', 'prototype'],
    '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
    '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
    '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
    '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
    '%URIErrorPrototype%': ['URIError', 'prototype'],
    '%WeakMapPrototype%': ['WeakMap', 'prototype'],
    '%WeakSetPrototype%': ['WeakSet', 'prototype'],
  },
  oe = Me,
  se = Jr,
  et = oe.call(Function.call, Array.prototype.concat),
  rt = oe.call(Function.apply, Array.prototype.splice),
  Qe = oe.call(Function.call, String.prototype.replace),
  ve = oe.call(Function.call, String.prototype.slice),
  tt = oe.call(Function.call, RegExp.prototype.exec),
  nt =
    /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
  at = /\\(\\)?/g,
  ot = function (e) {
    var t = ve(e, 0, 1),
      n = ve(e, -1);
    if (t === '%' && n !== '%')
      throw new J('invalid intrinsic syntax, expected closing `%`');
    if (n === '%' && t !== '%')
      throw new J('invalid intrinsic syntax, expected opening `%`');
    var o = [];
    return (
      Qe(e, nt, function (a, i, l, f) {
        o[o.length] = l ? Qe(f, at, '$1') : i || a;
      }),
      o
    );
  },
  it = function (e, t) {
    var n = e,
      o;
    if ((se(qe, n) && ((o = qe[n]), (n = '%' + o[0] + '%')), se(_, n))) {
      var a = _[n];
      if ((a === Q && (a = jr(n)), typeof a > 'u' && !t))
        throw new V(
          'intrinsic ' +
            e +
            ' exists, but is not available. Please file an issue!'
        );
      return { alias: o, name: n, value: a };
    }
    throw new J('intrinsic ' + e + ' does not exist!');
  },
  W = function (e, t) {
    if (typeof e != 'string' || e.length === 0)
      throw new V('intrinsic name must be a non-empty string');
    if (arguments.length > 1 && typeof t != 'boolean')
      throw new V('"allowMissing" argument must be a boolean');
    if (tt(/^%?[^%]*%?$/, e) === null)
      throw new J(
        '`%` may not be present anywhere but at the beginning and end of the intrinsic name'
      );
    var n = ot(e),
      o = n.length > 0 ? n[0] : '',
      a = it('%' + o + '%', t),
      i = a.name,
      l = a.value,
      f = !1,
      u = a.alias;
    u && ((o = u[0]), rt(n, et([0, 1], u)));
    for (var c = 1, v = !0; c < n.length; c += 1) {
      var p = n[c],
        g = ve(p, 0, 1),
        d = ve(p, -1);
      if (
        (g === '"' ||
          g === "'" ||
          g === '`' ||
          d === '"' ||
          d === "'" ||
          d === '`') &&
        g !== d
      )
        throw new J('property names with quotes must have matching quotes');
      if (
        ((p === 'constructor' || !v) && (f = !0),
        (o += '.' + p),
        (i = '%' + o + '%'),
        se(_, i))
      )
        l = _[i];
      else if (l != null) {
        if (!(p in l)) {
          if (!t)
            throw new V(
              'base intrinsic for ' +
                e +
                ' exists, but the property is not available.'
            );
          return;
        }
        if (C && c + 1 >= n.length) {
          var w = C(l, p);
          (v = !!w),
            v && 'get' in w && !('originalValue' in w.get)
              ? (l = w.get)
              : (l = l[p]);
        } else (v = se(l, p)), (l = l[p]);
        v && !f && (_[i] = l);
      }
    }
    return l;
  },
  yr = { exports: {} },
  ft = W,
  $e = ft('%Object.defineProperty%', !0),
  Fe = function () {
    if ($e)
      try {
        return $e({}, 'a', { value: 1 }), !0;
      } catch {
        return !1;
      }
    return !1;
  };
Fe.hasArrayLengthDefineBug = function () {
  if (!Fe()) return null;
  try {
    return $e([], 'length', { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var sr = Fe,
  lt = W,
  pe = lt('%Object.getOwnPropertyDescriptor%', !0);
if (pe)
  try {
    pe([], 'length');
  } catch {
    pe = null;
  }
var vr = pe,
  ut = sr(),
  Be = W,
  re = ut && Be('%Object.defineProperty%', !0);
if (re)
  try {
    re({}, 'a', { value: 1 });
  } catch {
    re = !1;
  }
var ct = Be('%SyntaxError%'),
  q = Be('%TypeError%'),
  Ve = vr,
  pt = function (e, t, n) {
    if (!e || (typeof e != 'object' && typeof e != 'function'))
      throw new q('`obj` must be an object or a function`');
    if (typeof t != 'string' && typeof t != 'symbol')
      throw new q('`property` must be a string or a symbol`');
    if (
      arguments.length > 3 &&
      typeof arguments[3] != 'boolean' &&
      arguments[3] !== null
    )
      throw new q('`nonEnumerable`, if provided, must be a boolean or null');
    if (
      arguments.length > 4 &&
      typeof arguments[4] != 'boolean' &&
      arguments[4] !== null
    )
      throw new q('`nonWritable`, if provided, must be a boolean or null');
    if (
      arguments.length > 5 &&
      typeof arguments[5] != 'boolean' &&
      arguments[5] !== null
    )
      throw new q('`nonConfigurable`, if provided, must be a boolean or null');
    if (arguments.length > 6 && typeof arguments[6] != 'boolean')
      throw new q('`loose`, if provided, must be a boolean');
    var o = arguments.length > 3 ? arguments[3] : null,
      a = arguments.length > 4 ? arguments[4] : null,
      i = arguments.length > 5 ? arguments[5] : null,
      l = arguments.length > 6 ? arguments[6] : !1,
      f = !!Ve && Ve(e, t);
    if (re)
      re(e, t, {
        configurable: i === null && f ? f.configurable : !i,
        enumerable: o === null && f ? f.enumerable : !o,
        value: n,
        writable: a === null && f ? f.writable : !a,
      });
    else if (l || (!o && !a && !i)) e[t] = n;
    else
      throw new ct(
        'This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.'
      );
  },
  dr = W,
  Je = pt,
  yt = sr(),
  Ke = vr,
  Ye = dr('%TypeError%'),
  st = dr('%Math.floor%'),
  vt = function (e, t) {
    if (typeof e != 'function') throw new Ye('`fn` is not a function');
    if (typeof t != 'number' || t < 0 || t > 4294967295 || st(t) !== t)
      throw new Ye('`length` must be a positive 32-bit integer');
    var n = arguments.length > 2 && !!arguments[2],
      o = !0,
      a = !0;
    if ('length' in e && Ke) {
      var i = Ke(e, 'length');
      i && !i.configurable && (o = !1), i && !i.writable && (a = !1);
    }
    return (
      (o || a || !n) && (yt ? Je(e, 'length', t, !0, !0) : Je(e, 'length', t)),
      e
    );
  };
(function (r) {
  var e = Me,
    t = W,
    n = vt,
    o = t('%TypeError%'),
    a = t('%Function.prototype.apply%'),
    i = t('%Function.prototype.call%'),
    l = t('%Reflect.apply%', !0) || e.call(i, a),
    f = t('%Object.defineProperty%', !0),
    u = t('%Math.max%');
  if (f)
    try {
      f({}, 'a', { value: 1 });
    } catch {
      f = null;
    }
  r.exports = function (p) {
    if (typeof p != 'function') throw new o('a function is required');
    var g = l(e, i, arguments);
    return n(g, 1 + u(0, p.length - (arguments.length - 1)), !0);
  };
  var c = function () {
    return l(e, a, arguments);
  };
  f ? f(r.exports, 'apply', { value: c }) : (r.exports.apply = c);
})(yr);
var dt = yr.exports,
  gr = W,
  mr = dt,
  gt = mr(gr('String.prototype.indexOf')),
  mt = function (e, t) {
    var n = gr(e, !!t);
    return typeof n == 'function' && gt(e, '.prototype.') > -1 ? mr(n) : n;
  },
  Ce = typeof Map == 'function' && Map.prototype,
  Se =
    Object.getOwnPropertyDescriptor && Ce
      ? Object.getOwnPropertyDescriptor(Map.prototype, 'size')
      : null,
  de = Ce && Se && typeof Se.get == 'function' ? Se.get : null,
  Xe = Ce && Map.prototype.forEach,
  _e = typeof Set == 'function' && Set.prototype,
  be =
    Object.getOwnPropertyDescriptor && _e
      ? Object.getOwnPropertyDescriptor(Set.prototype, 'size')
      : null,
  ge = _e && be && typeof be.get == 'function' ? be.get : null,
  Ze = _e && Set.prototype.forEach,
  ht = typeof WeakMap == 'function' && WeakMap.prototype,
  te = ht ? WeakMap.prototype.has : null,
  St = typeof WeakSet == 'function' && WeakSet.prototype,
  ne = St ? WeakSet.prototype.has : null,
  bt = typeof WeakRef == 'function' && WeakRef.prototype,
  je = bt ? WeakRef.prototype.deref : null,
  wt = Boolean.prototype.valueOf,
  At = Object.prototype.toString,
  Ot = Function.prototype.toString,
  Pt = String.prototype.match,
  We = String.prototype.slice,
  T = String.prototype.replace,
  Et = String.prototype.toUpperCase,
  er = String.prototype.toLowerCase,
  hr = RegExp.prototype.test,
  rr = Array.prototype.concat,
  P = Array.prototype.join,
  $t = Array.prototype.slice,
  tr = Math.floor,
  xe = typeof BigInt == 'function' ? BigInt.prototype.valueOf : null,
  we = Object.getOwnPropertySymbols,
  Ie =
    typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
      ? Symbol.prototype.toString
      : null,
  K = typeof Symbol == 'function' && typeof Symbol.iterator == 'object',
  b =
    typeof Symbol == 'function' &&
    Symbol.toStringTag &&
    (typeof Symbol.toStringTag === K || 'symbol')
      ? Symbol.toStringTag
      : null,
  Sr = Object.prototype.propertyIsEnumerable,
  nr =
    (typeof Reflect == 'function'
      ? Reflect.getPrototypeOf
      : Object.getPrototypeOf) ||
    ([].__proto__ === Array.prototype
      ? function (r) {
          return r.__proto__;
        }
      : null);
function ar(r, e) {
  if (
    r === 1 / 0 ||
    r === -1 / 0 ||
    r !== r ||
    (r && r > -1e3 && r < 1e3) ||
    hr.call(/e/, e)
  )
    return e;
  var t = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof r == 'number') {
    var n = r < 0 ? -tr(-r) : tr(r);
    if (n !== r) {
      var o = String(n),
        a = We.call(e, o.length + 1);
      return (
        T.call(o, t, '$&_') +
        '.' +
        T.call(T.call(a, /([0-9]{3})/g, '$&_'), /_$/, '')
      );
    }
  }
  return T.call(e, t, '$&_');
}
var Re = Nr,
  or = Re.custom,
  ir = wr(or) ? or : null,
  Ft = function r(e, t, n, o) {
    var a = t || {};
    if (
      N(a, 'quoteStyle') &&
      a.quoteStyle !== 'single' &&
      a.quoteStyle !== 'double'
    )
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (
      N(a, 'maxStringLength') &&
      (typeof a.maxStringLength == 'number'
        ? a.maxStringLength < 0 && a.maxStringLength !== 1 / 0
        : a.maxStringLength !== null)
    )
      throw new TypeError(
        'option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`'
      );
    var i = N(a, 'customInspect') ? a.customInspect : !0;
    if (typeof i != 'boolean' && i !== 'symbol')
      throw new TypeError(
        'option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`'
      );
    if (
      N(a, 'indent') &&
      a.indent !== null &&
      a.indent !== '	' &&
      !(parseInt(a.indent, 10) === a.indent && a.indent > 0)
    )
      throw new TypeError(
        'option "indent" must be "\\t", an integer > 0, or `null`'
      );
    if (N(a, 'numericSeparator') && typeof a.numericSeparator != 'boolean')
      throw new TypeError(
        'option "numericSeparator", if provided, must be `true` or `false`'
      );
    var l = a.numericSeparator;
    if (typeof e > 'u') return 'undefined';
    if (e === null) return 'null';
    if (typeof e == 'boolean') return e ? 'true' : 'false';
    if (typeof e == 'string') return Or(e, a);
    if (typeof e == 'number') {
      if (e === 0) return 1 / 0 / e > 0 ? '0' : '-0';
      var f = String(e);
      return l ? ar(e, f) : f;
    }
    if (typeof e == 'bigint') {
      var u = String(e) + 'n';
      return l ? ar(e, u) : u;
    }
    var c = typeof a.depth > 'u' ? 5 : a.depth;
    if ((typeof n > 'u' && (n = 0), n >= c && c > 0 && typeof e == 'object'))
      return Ne(e) ? '[Array]' : '[Object]';
    var v = qt(a, n);
    if (typeof o > 'u') o = [];
    else if (Ar(o, e) >= 0) return '[Circular]';
    function p(F, k, fe) {
      if ((k && ((o = $t.call(o)), o.push(k)), fe)) {
        var z = { depth: a.depth };
        return (
          N(a, 'quoteStyle') && (z.quoteStyle = a.quoteStyle), r(F, z, n + 1, o)
        );
      }
      return r(F, a, n + 1, o);
    }
    if (typeof e == 'function' && !fr(e)) {
      var g = Ct(e),
        d = le(e, p);
      return (
        '[Function' +
        (g ? ': ' + g : ' (anonymous)') +
        ']' +
        (d.length > 0 ? ' { ' + P.call(d, ', ') + ' }' : '')
      );
    }
    if (wr(e)) {
      var w = K
        ? T.call(String(e), /^(Symbol\(.*\))_[^)]*$/, '$1')
        : Ie.call(e);
      return typeof e == 'object' && !K ? ee(w) : w;
    }
    if (kt(e)) {
      for (
        var E = '<' + er.call(String(e.nodeName)),
          s = e.attributes || [],
          $ = 0;
        $ < s.length;
        $++
      )
        E += ' ' + s[$].name + '=' + br(xt(s[$].value), 'double', a);
      return (
        (E += '>'),
        e.childNodes && e.childNodes.length && (E += '...'),
        (E += '</' + er.call(String(e.nodeName)) + '>'),
        E
      );
    }
    if (Ne(e)) {
      if (e.length === 0) return '[]';
      var I = le(e, p);
      return v && !Ht(I) ? '[' + Te(I, v) + ']' : '[ ' + P.call(I, ', ') + ' ]';
    }
    if (Rt(e)) {
      var U = le(e, p);
      return !('cause' in Error.prototype) &&
        'cause' in e &&
        !Sr.call(e, 'cause')
        ? '{ [' +
            String(e) +
            '] ' +
            P.call(rr.call('[cause]: ' + p(e.cause), U), ', ') +
            ' }'
        : U.length === 0
          ? '[' + String(e) + ']'
          : '{ [' + String(e) + '] ' + P.call(U, ', ') + ' }';
    }
    if (typeof e == 'object' && i) {
      if (ir && typeof e[ir] == 'function' && Re)
        return Re(e, { depth: c - n });
      if (i !== 'symbol' && typeof e.inspect == 'function') return e.inspect();
    }
    if (_t(e)) {
      var Z = [];
      return (
        Xe &&
          Xe.call(e, function (F, k) {
            Z.push(p(k, e, !0) + ' => ' + p(F, e));
          }),
        lr('Map', de.call(e), Z, v)
      );
    }
    if (Lt(e)) {
      var ie = [];
      return (
        Ze &&
          Ze.call(e, function (F) {
            ie.push(p(F, e));
          }),
        lr('Set', ge.call(e), ie, v)
      );
    }
    if (Wt(e)) return Ae('WeakMap');
    if (Gt(e)) return Ae('WeakSet');
    if (Ut(e)) return Ae('WeakRef');
    if (Tt(e)) return ee(p(Number(e)));
    if (Mt(e)) return ee(p(xe.call(e)));
    if (Dt(e)) return ee(wt.call(e));
    if (Nt(e)) return ee(p(String(e)));
    if (typeof window < 'u' && e === window) return '{ [object Window] }';
    if (e === Ir) return '{ [object globalThis] }';
    if (!It(e) && !fr(e)) {
      var M = le(e, p),
        R = nr
          ? nr(e) === Object.prototype
          : e instanceof Object || e.constructor === Object,
        L = e instanceof Object ? '' : 'null prototype',
        G =
          !R && b && Object(e) === e && b in e
            ? We.call(D(e), 8, -1)
            : L
              ? 'Object'
              : '',
        j =
          R || typeof e.constructor != 'function'
            ? ''
            : e.constructor.name
              ? e.constructor.name + ' '
              : '',
        A =
          j +
          (G || L
            ? '[' + P.call(rr.call([], G || [], L || []), ': ') + '] '
            : '');
      return M.length === 0
        ? A + '{}'
        : v
          ? A + '{' + Te(M, v) + '}'
          : A + '{ ' + P.call(M, ', ') + ' }';
    }
    return String(e);
  };
function br(r, e, t) {
  var n = (t.quoteStyle || e) === 'double' ? '"' : "'";
  return n + r + n;
}
function xt(r) {
  return T.call(String(r), /"/g, '&quot;');
}
function Ne(r) {
  return D(r) === '[object Array]' && (!b || !(typeof r == 'object' && b in r));
}
function It(r) {
  return D(r) === '[object Date]' && (!b || !(typeof r == 'object' && b in r));
}
function fr(r) {
  return (
    D(r) === '[object RegExp]' && (!b || !(typeof r == 'object' && b in r))
  );
}
function Rt(r) {
  return D(r) === '[object Error]' && (!b || !(typeof r == 'object' && b in r));
}
function Nt(r) {
  return (
    D(r) === '[object String]' && (!b || !(typeof r == 'object' && b in r))
  );
}
function Tt(r) {
  return (
    D(r) === '[object Number]' && (!b || !(typeof r == 'object' && b in r))
  );
}
function Dt(r) {
  return (
    D(r) === '[object Boolean]' && (!b || !(typeof r == 'object' && b in r))
  );
}
function wr(r) {
  if (K) return r && typeof r == 'object' && r instanceof Symbol;
  if (typeof r == 'symbol') return !0;
  if (!r || typeof r != 'object' || !Ie) return !1;
  try {
    return Ie.call(r), !0;
  } catch {}
  return !1;
}
function Mt(r) {
  if (!r || typeof r != 'object' || !xe) return !1;
  try {
    return xe.call(r), !0;
  } catch {}
  return !1;
}
var Bt =
  Object.prototype.hasOwnProperty ||
  function (r) {
    return r in this;
  };
function N(r, e) {
  return Bt.call(r, e);
}
function D(r) {
  return At.call(r);
}
function Ct(r) {
  if (r.name) return r.name;
  var e = Pt.call(Ot.call(r), /^function\s*([\w$]+)/);
  return e ? e[1] : null;
}
function Ar(r, e) {
  if (r.indexOf) return r.indexOf(e);
  for (var t = 0, n = r.length; t < n; t++) if (r[t] === e) return t;
  return -1;
}
function _t(r) {
  if (!de || !r || typeof r != 'object') return !1;
  try {
    de.call(r);
    try {
      ge.call(r);
    } catch {
      return !0;
    }
    return r instanceof Map;
  } catch {}
  return !1;
}
function Wt(r) {
  if (!te || !r || typeof r != 'object') return !1;
  try {
    te.call(r, te);
    try {
      ne.call(r, ne);
    } catch {
      return !0;
    }
    return r instanceof WeakMap;
  } catch {}
  return !1;
}
function Ut(r) {
  if (!je || !r || typeof r != 'object') return !1;
  try {
    return je.call(r), !0;
  } catch {}
  return !1;
}
function Lt(r) {
  if (!ge || !r || typeof r != 'object') return !1;
  try {
    ge.call(r);
    try {
      de.call(r);
    } catch {
      return !0;
    }
    return r instanceof Set;
  } catch {}
  return !1;
}
function Gt(r) {
  if (!ne || !r || typeof r != 'object') return !1;
  try {
    ne.call(r, ne);
    try {
      te.call(r, te);
    } catch {
      return !0;
    }
    return r instanceof WeakSet;
  } catch {}
  return !1;
}
function kt(r) {
  return !r || typeof r != 'object'
    ? !1
    : typeof HTMLElement < 'u' && r instanceof HTMLElement
      ? !0
      : typeof r.nodeName == 'string' && typeof r.getAttribute == 'function';
}
function Or(r, e) {
  if (r.length > e.maxStringLength) {
    var t = r.length - e.maxStringLength,
      n = '... ' + t + ' more character' + (t > 1 ? 's' : '');
    return Or(We.call(r, 0, e.maxStringLength), e) + n;
  }
  var o = T.call(T.call(r, /(['\\])/g, '\\$1'), /[\x00-\x1f]/g, zt);
  return br(o, 'single', e);
}
function zt(r) {
  var e = r.charCodeAt(0),
    t = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[e];
  return t ? '\\' + t : '\\x' + (e < 16 ? '0' : '') + Et.call(e.toString(16));
}
function ee(r) {
  return 'Object(' + r + ')';
}
function Ae(r) {
  return r + ' { ? }';
}
function lr(r, e, t, n) {
  var o = n ? Te(t, n) : P.call(t, ', ');
  return r + ' (' + e + ') {' + o + '}';
}
function Ht(r) {
  for (var e = 0; e < r.length; e++)
    if (
      Ar(
        r[e],
        `
`
      ) >= 0
    )
      return !1;
  return !0;
}
function qt(r, e) {
  var t;
  if (r.indent === '	') t = '	';
  else if (typeof r.indent == 'number' && r.indent > 0)
    t = P.call(Array(r.indent + 1), ' ');
  else return null;
  return { base: t, prev: P.call(Array(e + 1), t) };
}
function Te(r, e) {
  if (r.length === 0) return '';
  var t =
    `
` +
    e.prev +
    e.base;
  return (
    t +
    P.call(r, ',' + t) +
    `
` +
    e.prev
  );
}
function le(r, e) {
  var t = Ne(r),
    n = [];
  if (t) {
    n.length = r.length;
    for (var o = 0; o < r.length; o++) n[o] = N(r, o) ? e(r[o], r) : '';
  }
  var a = typeof we == 'function' ? we(r) : [],
    i;
  if (K) {
    i = {};
    for (var l = 0; l < a.length; l++) i['$' + a[l]] = a[l];
  }
  for (var f in r)
    N(r, f) &&
      ((t && String(Number(f)) === f && f < r.length) ||
        (K && i['$' + f] instanceof Symbol) ||
        (hr.call(/[^\w$]/, f)
          ? n.push(e(f, r) + ': ' + e(r[f], r))
          : n.push(f + ': ' + e(r[f], r))));
  if (typeof we == 'function')
    for (var u = 0; u < a.length; u++)
      Sr.call(r, a[u]) && n.push('[' + e(a[u]) + ']: ' + e(r[a[u]], r));
  return n;
}
var Ue = W,
  X = mt,
  Qt = Ft,
  Vt = Ue('%TypeError%'),
  ue = Ue('%WeakMap%', !0),
  ce = Ue('%Map%', !0),
  Jt = X('WeakMap.prototype.get', !0),
  Kt = X('WeakMap.prototype.set', !0),
  Yt = X('WeakMap.prototype.has', !0),
  Xt = X('Map.prototype.get', !0),
  Zt = X('Map.prototype.set', !0),
  jt = X('Map.prototype.has', !0),
  Le = function (r, e) {
    for (var t = r, n; (n = t.next) !== null; t = n)
      if (n.key === e)
        return (t.next = n.next), (n.next = r.next), (r.next = n), n;
  },
  en = function (r, e) {
    var t = Le(r, e);
    return t && t.value;
  },
  rn = function (r, e, t) {
    var n = Le(r, e);
    n ? (n.value = t) : (r.next = { key: e, next: r.next, value: t });
  },
  tn = function (r, e) {
    return !!Le(r, e);
  },
  nn = function () {
    var e,
      t,
      n,
      o = {
        assert: function (a) {
          if (!o.has(a)) throw new Vt('Side channel does not contain ' + Qt(a));
        },
        get: function (a) {
          if (ue && a && (typeof a == 'object' || typeof a == 'function')) {
            if (e) return Jt(e, a);
          } else if (ce) {
            if (t) return Xt(t, a);
          } else if (n) return en(n, a);
        },
        has: function (a) {
          if (ue && a && (typeof a == 'object' || typeof a == 'function')) {
            if (e) return Yt(e, a);
          } else if (ce) {
            if (t) return jt(t, a);
          } else if (n) return tn(n, a);
          return !1;
        },
        set: function (a, i) {
          ue && a && (typeof a == 'object' || typeof a == 'function')
            ? (e || (e = new ue()), Kt(e, a, i))
            : ce
              ? (t || (t = new ce()), Zt(t, a, i))
              : (n || (n = { key: {}, next: null }), rn(n, a, i));
        },
      };
    return o;
  },
  an = String.prototype.replace,
  on = /%20/g,
  Oe = { RFC1738: 'RFC1738', RFC3986: 'RFC3986' },
  Ge = {
    default: Oe.RFC3986,
    formatters: {
      RFC1738: function (r) {
        return an.call(r, on, '+');
      },
      RFC3986: function (r) {
        return String(r);
      },
    },
    RFC1738: Oe.RFC1738,
    RFC3986: Oe.RFC3986,
  },
  fn = Ge,
  Pe = Object.prototype.hasOwnProperty,
  B = Array.isArray,
  O = (function () {
    for (var r = [], e = 0; e < 256; ++e)
      r.push('%' + ((e < 16 ? '0' : '') + e.toString(16)).toUpperCase());
    return r;
  })(),
  ln = function (e) {
    for (; e.length > 1; ) {
      var t = e.pop(),
        n = t.obj[t.prop];
      if (B(n)) {
        for (var o = [], a = 0; a < n.length; ++a)
          typeof n[a] < 'u' && o.push(n[a]);
        t.obj[t.prop] = o;
      }
    }
  },
  Pr = function (e, t) {
    for (
      var n = t && t.plainObjects ? Object.create(null) : {}, o = 0;
      o < e.length;
      ++o
    )
      typeof e[o] < 'u' && (n[o] = e[o]);
    return n;
  },
  un = function r(e, t, n) {
    if (!t) return e;
    if (typeof t != 'object') {
      if (B(e)) e.push(t);
      else if (e && typeof e == 'object')
        ((n && (n.plainObjects || n.allowPrototypes)) ||
          !Pe.call(Object.prototype, t)) &&
          (e[t] = !0);
      else return [e, t];
      return e;
    }
    if (!e || typeof e != 'object') return [e].concat(t);
    var o = e;
    return (
      B(e) && !B(t) && (o = Pr(e, n)),
      B(e) && B(t)
        ? (t.forEach(function (a, i) {
            if (Pe.call(e, i)) {
              var l = e[i];
              l && typeof l == 'object' && a && typeof a == 'object'
                ? (e[i] = r(l, a, n))
                : e.push(a);
            } else e[i] = a;
          }),
          e)
        : Object.keys(t).reduce(function (a, i) {
            var l = t[i];
            return Pe.call(a, i) ? (a[i] = r(a[i], l, n)) : (a[i] = l), a;
          }, o)
    );
  },
  cn = function (e, t) {
    return Object.keys(t).reduce(function (n, o) {
      return (n[o] = t[o]), n;
    }, e);
  },
  pn = function (r, e, t) {
    var n = r.replace(/\+/g, ' ');
    if (t === 'iso-8859-1') return n.replace(/%[0-9a-f]{2}/gi, unescape);
    try {
      return decodeURIComponent(n);
    } catch {
      return n;
    }
  },
  yn = function (e, t, n, o, a) {
    if (e.length === 0) return e;
    var i = e;
    if (
      (typeof e == 'symbol'
        ? (i = Symbol.prototype.toString.call(e))
        : typeof e != 'string' && (i = String(e)),
      n === 'iso-8859-1')
    )
      return escape(i).replace(/%u[0-9a-f]{4}/gi, function (c) {
        return '%26%23' + parseInt(c.slice(2), 16) + '%3B';
      });
    for (var l = '', f = 0; f < i.length; ++f) {
      var u = i.charCodeAt(f);
      if (
        u === 45 ||
        u === 46 ||
        u === 95 ||
        u === 126 ||
        (u >= 48 && u <= 57) ||
        (u >= 65 && u <= 90) ||
        (u >= 97 && u <= 122) ||
        (a === fn.RFC1738 && (u === 40 || u === 41))
      ) {
        l += i.charAt(f);
        continue;
      }
      if (u < 128) {
        l = l + O[u];
        continue;
      }
      if (u < 2048) {
        l = l + (O[192 | (u >> 6)] + O[128 | (u & 63)]);
        continue;
      }
      if (u < 55296 || u >= 57344) {
        l =
          l +
          (O[224 | (u >> 12)] + O[128 | ((u >> 6) & 63)] + O[128 | (u & 63)]);
        continue;
      }
      (f += 1),
        (u = 65536 + (((u & 1023) << 10) | (i.charCodeAt(f) & 1023))),
        (l +=
          O[240 | (u >> 18)] +
          O[128 | ((u >> 12) & 63)] +
          O[128 | ((u >> 6) & 63)] +
          O[128 | (u & 63)]);
    }
    return l;
  },
  sn = function (e) {
    for (
      var t = [{ obj: { o: e }, prop: 'o' }], n = [], o = 0;
      o < t.length;
      ++o
    )
      for (
        var a = t[o], i = a.obj[a.prop], l = Object.keys(i), f = 0;
        f < l.length;
        ++f
      ) {
        var u = l[f],
          c = i[u];
        typeof c == 'object' &&
          c !== null &&
          n.indexOf(c) === -1 &&
          (t.push({ obj: i, prop: u }), n.push(c));
      }
    return ln(t), e;
  },
  vn = function (e) {
    return Object.prototype.toString.call(e) === '[object RegExp]';
  },
  dn = function (e) {
    return !e || typeof e != 'object'
      ? !1
      : !!(
          e.constructor &&
          e.constructor.isBuffer &&
          e.constructor.isBuffer(e)
        );
  },
  gn = function (e, t) {
    return [].concat(e, t);
  },
  mn = function (e, t) {
    if (B(e)) {
      for (var n = [], o = 0; o < e.length; o += 1) n.push(t(e[o]));
      return n;
    }
    return t(e);
  },
  Er = {
    arrayToObject: Pr,
    assign: cn,
    combine: gn,
    compact: sn,
    decode: pn,
    encode: yn,
    isBuffer: dn,
    isRegExp: vn,
    maybeMap: mn,
    merge: un,
  },
  $r = nn,
  ye = Er,
  ae = Ge,
  hn = Object.prototype.hasOwnProperty,
  ur = {
    brackets: function (e) {
      return e + '[]';
    },
    comma: 'comma',
    indices: function (e, t) {
      return e + '[' + t + ']';
    },
    repeat: function (e) {
      return e;
    },
  },
  x = Array.isArray,
  Sn = Array.prototype.push,
  Fr = function (r, e) {
    Sn.apply(r, x(e) ? e : [e]);
  },
  bn = Date.prototype.toISOString,
  cr = ae.default,
  S = {
    addQueryPrefix: !1,
    allowDots: !1,
    charset: 'utf-8',
    charsetSentinel: !1,
    delimiter: '&',
    encode: !0,
    encoder: ye.encode,
    encodeValuesOnly: !1,
    format: cr,
    formatter: ae.formatters[cr],
    indices: !1,
    serializeDate: function (e) {
      return bn.call(e);
    },
    skipNulls: !1,
    strictNullHandling: !1,
  },
  wn = function (e) {
    return (
      typeof e == 'string' ||
      typeof e == 'number' ||
      typeof e == 'boolean' ||
      typeof e == 'symbol' ||
      typeof e == 'bigint'
    );
  },
  Ee = {},
  An = function r(e, t, n, o, a, i, l, f, u, c, v, p, g, d, w, E) {
    for (var s = e, $ = E, I = 0, U = !1; ($ = $.get(Ee)) !== void 0 && !U; ) {
      var Z = $.get(e);
      if (((I += 1), typeof Z < 'u')) {
        if (Z === I) throw new RangeError('Cyclic object value');
        U = !0;
      }
      typeof $.get(Ee) > 'u' && (I = 0);
    }
    if (
      (typeof f == 'function'
        ? (s = f(t, s))
        : s instanceof Date
          ? (s = v(s))
          : n === 'comma' &&
            x(s) &&
            (s = ye.maybeMap(s, function (z) {
              return z instanceof Date ? v(z) : z;
            })),
      s === null)
    ) {
      if (a) return l && !d ? l(t, S.encoder, w, 'key', p) : t;
      s = '';
    }
    if (wn(s) || ye.isBuffer(s)) {
      if (l) {
        var ie = d ? t : l(t, S.encoder, w, 'key', p);
        return [g(ie) + '=' + g(l(s, S.encoder, w, 'value', p))];
      }
      return [g(t) + '=' + g(String(s))];
    }
    var M = [];
    if (typeof s > 'u') return M;
    var R;
    if (n === 'comma' && x(s))
      d && l && (s = ye.maybeMap(s, l)),
        (R = [{ value: s.length > 0 ? s.join(',') || null : void 0 }]);
    else if (x(f)) R = f;
    else {
      var L = Object.keys(s);
      R = u ? L.sort(u) : L;
    }
    for (
      var G = o && x(s) && s.length === 1 ? t + '[]' : t, j = 0;
      j < R.length;
      ++j
    ) {
      var A = R[j],
        F = typeof A == 'object' && typeof A.value < 'u' ? A.value : s[A];
      if (!(i && F === null)) {
        var k = x(s)
          ? typeof n == 'function'
            ? n(G, A)
            : G
          : G + (c ? '.' + A : '[' + A + ']');
        E.set(e, I);
        var fe = $r();
        fe.set(Ee, E),
          Fr(
            M,
            r(
              F,
              k,
              n,
              o,
              a,
              i,
              n === 'comma' && d && x(s) ? null : l,
              f,
              u,
              c,
              v,
              p,
              g,
              d,
              w,
              fe
            )
          );
      }
    }
    return M;
  },
  On = function (e) {
    if (!e) return S;
    if (
      e.encoder !== null &&
      typeof e.encoder < 'u' &&
      typeof e.encoder != 'function'
    )
      throw new TypeError('Encoder has to be a function.');
    var t = e.charset || S.charset;
    if (
      typeof e.charset < 'u' &&
      e.charset !== 'utf-8' &&
      e.charset !== 'iso-8859-1'
    )
      throw new TypeError(
        'The charset option must be either utf-8, iso-8859-1, or undefined'
      );
    var n = ae.default;
    if (typeof e.format < 'u') {
      if (!hn.call(ae.formatters, e.format))
        throw new TypeError('Unknown format option provided.');
      n = e.format;
    }
    var o = ae.formatters[n],
      a = S.filter;
    return (
      (typeof e.filter == 'function' || x(e.filter)) && (a = e.filter),
      {
        addQueryPrefix:
          typeof e.addQueryPrefix == 'boolean'
            ? e.addQueryPrefix
            : S.addQueryPrefix,
        allowDots: typeof e.allowDots > 'u' ? S.allowDots : !!e.allowDots,
        charset: t,
        charsetSentinel:
          typeof e.charsetSentinel == 'boolean'
            ? e.charsetSentinel
            : S.charsetSentinel,
        delimiter: typeof e.delimiter > 'u' ? S.delimiter : e.delimiter,
        encode: typeof e.encode == 'boolean' ? e.encode : S.encode,
        encoder: typeof e.encoder == 'function' ? e.encoder : S.encoder,
        encodeValuesOnly:
          typeof e.encodeValuesOnly == 'boolean'
            ? e.encodeValuesOnly
            : S.encodeValuesOnly,
        filter: a,
        format: n,
        formatter: o,
        serializeDate:
          typeof e.serializeDate == 'function'
            ? e.serializeDate
            : S.serializeDate,
        skipNulls: typeof e.skipNulls == 'boolean' ? e.skipNulls : S.skipNulls,
        sort: typeof e.sort == 'function' ? e.sort : null,
        strictNullHandling:
          typeof e.strictNullHandling == 'boolean'
            ? e.strictNullHandling
            : S.strictNullHandling,
      }
    );
  },
  Pn = function (r, e) {
    var t = r,
      n = On(e),
      o,
      a;
    typeof n.filter == 'function'
      ? ((a = n.filter), (t = a('', t)))
      : x(n.filter) && ((a = n.filter), (o = a));
    var i = [];
    if (typeof t != 'object' || t === null) return '';
    var l;
    e && e.arrayFormat in ur
      ? (l = e.arrayFormat)
      : e && 'indices' in e
        ? (l = e.indices ? 'indices' : 'repeat')
        : (l = 'indices');
    var f = ur[l];
    if (e && 'commaRoundTrip' in e && typeof e.commaRoundTrip != 'boolean')
      throw new TypeError('`commaRoundTrip` must be a boolean, or absent');
    var u = f === 'comma' && e && e.commaRoundTrip;
    o || (o = Object.keys(t)), n.sort && o.sort(n.sort);
    for (var c = $r(), v = 0; v < o.length; ++v) {
      var p = o[v];
      (n.skipNulls && t[p] === null) ||
        Fr(
          i,
          An(
            t[p],
            p,
            f,
            u,
            n.strictNullHandling,
            n.skipNulls,
            n.encode ? n.encoder : null,
            n.filter,
            n.sort,
            n.allowDots,
            n.serializeDate,
            n.format,
            n.formatter,
            n.encodeValuesOnly,
            n.charset,
            c
          )
        );
    }
    var g = i.join(n.delimiter),
      d = n.addQueryPrefix === !0 ? '?' : '';
    return (
      n.charsetSentinel &&
        (n.charset === 'iso-8859-1'
          ? (d += 'utf8=%26%2310003%3B&')
          : (d += 'utf8=%E2%9C%93&')),
      g.length > 0 ? d + g : ''
    );
  },
  Y = Er,
  De = Object.prototype.hasOwnProperty,
  En = Array.isArray,
  m = {
    allowDots: !1,
    allowPrototypes: !1,
    allowSparse: !1,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: !1,
    comma: !1,
    decoder: Y.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: !1,
    interpretNumericEntities: !1,
    parameterLimit: 1e3,
    parseArrays: !0,
    plainObjects: !1,
    strictNullHandling: !1,
  },
  $n = function (r) {
    return r.replace(/&#(\d+);/g, function (e, t) {
      return String.fromCharCode(parseInt(t, 10));
    });
  },
  xr = function (r, e) {
    return r && typeof r == 'string' && e.comma && r.indexOf(',') > -1
      ? r.split(',')
      : r;
  },
  Fn = 'utf8=%26%2310003%3B',
  xn = 'utf8=%E2%9C%93',
  In = function (e, t) {
    var n = { __proto__: null },
      o = t.ignoreQueryPrefix ? e.replace(/^\?/, '') : e,
      a = t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit,
      i = o.split(t.delimiter, a),
      l = -1,
      f,
      u = t.charset;
    if (t.charsetSentinel)
      for (f = 0; f < i.length; ++f)
        i[f].indexOf('utf8=') === 0 &&
          (i[f] === xn ? (u = 'utf-8') : i[f] === Fn && (u = 'iso-8859-1'),
          (l = f),
          (f = i.length));
    for (f = 0; f < i.length; ++f)
      if (f !== l) {
        var c = i[f],
          v = c.indexOf(']='),
          p = v === -1 ? c.indexOf('=') : v + 1,
          g,
          d;
        p === -1
          ? ((g = t.decoder(c, m.decoder, u, 'key')),
            (d = t.strictNullHandling ? null : ''))
          : ((g = t.decoder(c.slice(0, p), m.decoder, u, 'key')),
            (d = Y.maybeMap(xr(c.slice(p + 1), t), function (w) {
              return t.decoder(w, m.decoder, u, 'value');
            }))),
          d && t.interpretNumericEntities && u === 'iso-8859-1' && (d = $n(d)),
          c.indexOf('[]=') > -1 && (d = En(d) ? [d] : d),
          De.call(n, g) ? (n[g] = Y.combine(n[g], d)) : (n[g] = d);
      }
    return n;
  },
  Rn = function (r, e, t, n) {
    for (var o = n ? e : xr(e, t), a = r.length - 1; a >= 0; --a) {
      var i,
        l = r[a];
      if (l === '[]' && t.parseArrays) i = [].concat(o);
      else {
        i = t.plainObjects ? Object.create(null) : {};
        var f =
            l.charAt(0) === '[' && l.charAt(l.length - 1) === ']'
              ? l.slice(1, -1)
              : l,
          u = parseInt(f, 10);
        !t.parseArrays && f === ''
          ? (i = { 0: o })
          : !isNaN(u) &&
              l !== f &&
              String(u) === f &&
              u >= 0 &&
              t.parseArrays &&
              u <= t.arrayLimit
            ? ((i = []), (i[u] = o))
            : f !== '__proto__' && (i[f] = o);
      }
      o = i;
    }
    return o;
  },
  Nn = function (e, t, n, o) {
    if (e) {
      var a = n.allowDots ? e.replace(/\.([^.[]+)/g, '[$1]') : e,
        i = /(\[[^[\]]*])/,
        l = /(\[[^[\]]*])/g,
        f = n.depth > 0 && i.exec(a),
        u = f ? a.slice(0, f.index) : a,
        c = [];
      if (u) {
        if (
          !n.plainObjects &&
          De.call(Object.prototype, u) &&
          !n.allowPrototypes
        )
          return;
        c.push(u);
      }
      for (
        var v = 0;
        n.depth > 0 && (f = l.exec(a)) !== null && v < n.depth;

      ) {
        if (
          ((v += 1),
          !n.plainObjects &&
            De.call(Object.prototype, f[1].slice(1, -1)) &&
            !n.allowPrototypes)
        )
          return;
        c.push(f[1]);
      }
      return f && c.push('[' + a.slice(f.index) + ']'), Rn(c, t, n, o);
    }
  },
  Tn = function (e) {
    if (!e) return m;
    if (
      e.decoder !== null &&
      e.decoder !== void 0 &&
      typeof e.decoder != 'function'
    )
      throw new TypeError('Decoder has to be a function.');
    if (
      typeof e.charset < 'u' &&
      e.charset !== 'utf-8' &&
      e.charset !== 'iso-8859-1'
    )
      throw new TypeError(
        'The charset option must be either utf-8, iso-8859-1, or undefined'
      );
    var t = typeof e.charset > 'u' ? m.charset : e.charset;
    return {
      allowDots: typeof e.allowDots > 'u' ? m.allowDots : !!e.allowDots,
      allowPrototypes:
        typeof e.allowPrototypes == 'boolean'
          ? e.allowPrototypes
          : m.allowPrototypes,
      allowSparse:
        typeof e.allowSparse == 'boolean' ? e.allowSparse : m.allowSparse,
      arrayLimit: typeof e.arrayLimit == 'number' ? e.arrayLimit : m.arrayLimit,
      charset: t,
      charsetSentinel:
        typeof e.charsetSentinel == 'boolean'
          ? e.charsetSentinel
          : m.charsetSentinel,
      comma: typeof e.comma == 'boolean' ? e.comma : m.comma,
      decoder: typeof e.decoder == 'function' ? e.decoder : m.decoder,
      delimiter:
        typeof e.delimiter == 'string' || Y.isRegExp(e.delimiter)
          ? e.delimiter
          : m.delimiter,
      depth: typeof e.depth == 'number' || e.depth === !1 ? +e.depth : m.depth,
      ignoreQueryPrefix: e.ignoreQueryPrefix === !0,
      interpretNumericEntities:
        typeof e.interpretNumericEntities == 'boolean'
          ? e.interpretNumericEntities
          : m.interpretNumericEntities,
      parameterLimit:
        typeof e.parameterLimit == 'number'
          ? e.parameterLimit
          : m.parameterLimit,
      parseArrays: e.parseArrays !== !1,
      plainObjects:
        typeof e.plainObjects == 'boolean' ? e.plainObjects : m.plainObjects,
      strictNullHandling:
        typeof e.strictNullHandling == 'boolean'
          ? e.strictNullHandling
          : m.strictNullHandling,
    };
  },
  Dn = function (r, e) {
    var t = Tn(e);
    if (r === '' || r === null || typeof r > 'u')
      return t.plainObjects ? Object.create(null) : {};
    for (
      var n = typeof r == 'string' ? In(r, t) : r,
        o = t.plainObjects ? Object.create(null) : {},
        a = Object.keys(n),
        i = 0;
      i < a.length;
      ++i
    ) {
      var l = a[i],
        f = Nn(l, n[l], t, typeof r == 'string');
      o = Y.merge(o, f, t);
    }
    return t.allowSparse === !0 ? o : Y.compact(o);
  },
  Mn = Pn,
  Bn = Dn,
  Cn = Ge,
  _n = { formats: Cn, parse: Bn, stringify: Mn };
const Ln = Rr(_n);
export { _n as l, Ln as q };
