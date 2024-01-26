import { g as a } from './_commonjsHelpers-de833af9.js';
import { _ as c, a as n, i } from './_getPrototype-aecc109d.js';
var s = c,
  b = n,
  p = i,
  j = '[object Object]',
  f = Function.prototype,
  l = Object.prototype,
  e = f.toString,
  u = l.hasOwnProperty,
  g = e.call(Object);
function O(r) {
  if (!p(r) || s(r) != j) return !1;
  var o = b(r);
  if (o === null) return !0;
  var t = u.call(o, 'constructor') && o.constructor;
  return typeof t == 'function' && t instanceof t && e.call(t) == g;
}
var P = O;
const m = a(P);
export { m as a, P as i };
