import { f as IA, k as pA, h as mA } from './index-4d435dca.js';
import {
  j as ae,
  l as ue,
  m as he,
  n as De,
  o as Me,
  p as Ie,
} from './index-4d435dca.js';
function Be(A) {
  const e = new Uint8Array(32).fill(0);
  return A ? pA(mA(A)) : IA(e);
}
function UA(A) {
  let e = 0;
  function t() {
    return (A[e++] << 8) | A[e++];
  }
  let r = t(),
    o = 1,
    n = [0, 1];
  for (let f = 1; f < r; f++) n.push((o += t()));
  let C = t(),
    l = e;
  e += C;
  let s = 0,
    g = 0;
  function i() {
    return s == 0 && ((g = (g << 8) | A[e++]), (s = 8)), (g >> --s) & 1;
  }
  const E = 31,
    w = 2 ** E,
    B = w >>> 1,
    I = B >> 1,
    Q = w - 1;
  let a = 0;
  for (let f = 0; f < E; f++) a = (a << 1) | i();
  let W = [],
    R = 0,
    J = w;
  for (;;) {
    let f = Math.floor(((a - R + 1) * o - 1) / J),
      D = 0,
      Y = r;
    for (; Y - D > 1; ) {
      let T = (D + Y) >>> 1;
      f < n[T] ? (Y = T) : (D = T);
    }
    if (D == 0) break;
    W.push(D);
    let u = R + Math.floor((J * n[D]) / o),
      M = R + Math.floor((J * n[D + 1]) / o) - 1;
    for (; !((u ^ M) & B); )
      (a = ((a << 1) & Q) | i()), (u = (u << 1) & Q), (M = ((M << 1) & Q) | 1);
    for (; u & ~M & I; )
      (a = (a & B) | ((a << 1) & (Q >>> 1)) | i()),
        (u = (u << 1) ^ B),
        (M = ((M ^ B) << 1) | B | 1);
    (R = u), (J = 1 + M - u);
  }
  let V = r - 4;
  return W.map((f) => {
    switch (f - V) {
      case 3:
        return V + 65792 + ((A[l++] << 16) | (A[l++] << 8) | A[l++]);
      case 2:
        return V + 256 + ((A[l++] << 8) | A[l++]);
      case 1:
        return V + A[l++];
      default:
        return f - 1;
    }
  });
}
function LA(A) {
  let e = 0;
  return () => A[e++];
}
function oA(A) {
  return LA(UA(PA(A)));
}
function PA(A) {
  let e = [];
  [
    ...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
  ].forEach((o, n) => (e[o.charCodeAt(0)] = n));
  let t = A.length,
    r = new Uint8Array((6 * t) >> 3);
  for (let o = 0, n = 0, C = 0, l = 0; o < t; o++)
    (l = (l << 6) | e[A.charCodeAt(o)]),
      (C += 6),
      C >= 8 && (r[n++] = l >> (C -= 8));
  return r;
}
function FA(A) {
  return A & 1 ? ~A >> 1 : A >> 1;
}
function NA(A, e) {
  let t = Array(A);
  for (let r = 0, o = 0; r < A; r++) t[r] = o += FA(e());
  return t;
}
function h(A, e = 0) {
  let t = [];
  for (;;) {
    let r = A(),
      o = A();
    if (!o) break;
    e += r;
    for (let n = 0; n < o; n++) t.push(e + n);
    e += o + 1;
  }
  return t;
}
function nA(A) {
  return P(() => {
    let e = h(A);
    if (e.length) return e;
  });
}
function rA(A) {
  let e = [];
  for (;;) {
    let t = A();
    if (t == 0) break;
    e.push(SA(t, A));
  }
  for (;;) {
    let t = A() - 1;
    if (t < 0) break;
    e.push(dA(t, A));
  }
  return e.flat();
}
function P(A) {
  let e = [];
  for (;;) {
    let t = A(e.length);
    if (!t) break;
    e.push(t);
  }
  return e;
}
function CA(A, e, t) {
  let r = Array(A)
    .fill()
    .map(() => []);
  for (let o = 0; o < e; o++) NA(A, t).forEach((n, C) => r[C].push(n));
  return r;
}
function SA(A, e) {
  let t = 1 + e(),
    r = e(),
    o = P(e);
  return CA(o.length, 1 + A, e).flatMap((C, l) => {
    let [s, ...g] = C;
    return Array(o[l])
      .fill()
      .map((i, E) => {
        let w = E * r;
        return [s + E * t, g.map((B) => B + w)];
      });
  });
}
function dA(A, e) {
  let t = 1 + e();
  return CA(t, 1 + A, e).map((o) => [o[0], o.slice(1)]);
}
var c = oA(
  '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'
);
const X = new Map([
    [8217, 'apostrophe'],
    [8260, 'fraction slash'],
    [12539, 'middle dot'],
  ]),
  y = 4;
function OA(A) {
  return A.toString(16).toUpperCase().padStart(2, '0');
}
function lA(A) {
  return `{${OA(A)}}`;
}
function RA(A) {
  let e = [];
  for (let t = 0, r = A.length; t < r; ) {
    let o = A.codePointAt(t);
    (t += o < 65536 ? 1 : 2), e.push(o);
  }
  return e;
}
function F(A) {
  let t = A.length;
  if (t < 4096) return String.fromCodePoint(...A);
  let r = [];
  for (let o = 0; o < t; )
    r.push(String.fromCodePoint(...A.slice(o, (o += 4096))));
  return r.join('');
}
var x = oA(
  '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'
);
function U(A) {
  return (A >> 24) & 255;
}
function sA(A) {
  return A & 16777215;
}
const JA = new Map(nA(x).flatMap((A, e) => A.map((t) => [t, (e + 1) << 24]))),
  VA = new Set(h(x)),
  gA = new Map(),
  z = new Map();
for (let [A, e] of rA(x)) {
  if (!VA.has(A) && e.length == 2) {
    let [t, r] = e,
      o = z.get(t);
    o || ((o = new Map()), z.set(t, o)), o.set(r, A);
  }
  gA.set(A, e.reverse());
}
const N = 44032,
  j = 4352,
  v = 4449,
  k = 4519,
  wA = 19,
  cA = 21,
  p = 28,
  K = cA * p,
  jA = wA * K,
  vA = N + jA,
  kA = j + wA,
  KA = v + cA,
  GA = k + p;
function iA(A) {
  return A >= N && A < vA;
}
function HA(A, e) {
  if (A >= j && A < kA && e >= v && e < KA)
    return N + (A - j) * K + (e - v) * p;
  if (iA(A) && e > k && e < GA && (A - N) % p == 0) return A + (e - k);
  {
    let t = z.get(A);
    return t && ((t = t.get(e)), t) ? t : -1;
  }
}
function BA(A) {
  let e = [],
    t = [],
    r = !1;
  function o(n) {
    let C = JA.get(n);
    C && ((r = !0), (n |= C)), e.push(n);
  }
  for (let n of A)
    for (;;) {
      if (n < 128) e.push(n);
      else if (iA(n)) {
        let C = n - N,
          l = (C / K) | 0,
          s = ((C % K) / p) | 0,
          g = C % p;
        o(j + l), o(v + s), g > 0 && o(k + g);
      } else {
        let C = gA.get(n);
        C ? t.push(...C) : o(n);
      }
      if (!t.length) break;
      n = t.pop();
    }
  if (r && e.length > 1) {
    let n = U(e[0]);
    for (let C = 1; C < e.length; C++) {
      let l = U(e[C]);
      if (l == 0 || n <= l) {
        n = l;
        continue;
      }
      let s = C - 1;
      for (;;) {
        let g = e[s + 1];
        if (((e[s + 1] = e[s]), (e[s] = g), !s || ((n = U(e[--s])), n <= l)))
          break;
      }
      n = U(e[C]);
    }
  }
  return e;
}
function YA(A) {
  let e = [],
    t = [],
    r = -1,
    o = 0;
  for (let n of A) {
    let C = U(n),
      l = sA(n);
    if (r == -1) C == 0 ? (r = l) : e.push(l);
    else if (o > 0 && o >= C)
      C == 0 ? (e.push(r, ...t), (t.length = 0), (r = l)) : t.push(l), (o = C);
    else {
      let s = HA(r, l);
      s >= 0
        ? (r = s)
        : o == 0 && C == 0
          ? (e.push(r), (r = l))
          : (t.push(l), (o = C));
    }
  }
  return r >= 0 && e.push(r, ...t), e;
}
function fA(A) {
  return BA(A).map(sA);
}
function TA(A) {
  return YA(BA(A));
}
const b = 65039,
  EA = '.',
  QA = 1,
  _ = 45;
function m() {
  return new Set(h(c));
}
const zA = new Map(rA(c)),
  bA = m(),
  G = m(),
  $ = new Set(
    h(c).map(
      function (A) {
        return this[A];
      },
      [...G]
    )
  ),
  xA = m();
m();
const ZA = nA(c);
function AA() {
  return new Set([h(c).map((A) => ZA[A]), h(c)].flat(2));
}
const qA = c(),
  S = P((A) => {
    let e = P(c).map((t) => t + 96);
    if (e.length) {
      let t = A >= qA;
      (e[0] -= 32), (e = F(e)), t && (e = `Restricted[${e}]`);
      let r = AA(),
        o = AA(),
        n = [...r, ...o].sort((l, s) => l - s),
        C = !c();
      return { N: e, P: r, M: C, R: t, V: new Set(n) };
    }
  }),
  eA = m(),
  d = new Map();
[...eA, ...m()]
  .sort((A, e) => A - e)
  .map((A, e, t) => {
    let r = c(),
      o = (t[e] = r ? t[e - r] : { V: [], M: new Map() });
    o.V.push(A), eA.has(A) || d.set(A, o);
  });
for (let { V: A, M: e } of new Set(d.values())) {
  let t = [];
  for (let o of A) {
    let n = S.filter((l) => l.V.has(o)),
      C = t.find(({ G: l }) => n.some((s) => l.has(s)));
    C || ((C = { G: new Set(), V: [] }), t.push(C)),
      C.V.push(o),
      n.forEach((l) => C.G.add(l));
  }
  let r = t.flatMap(({ G: o }) => [...o]);
  for (let { G: o, V: n } of t) {
    let C = new Set(r.filter((l) => !o.has(l)));
    for (let l of n) e.set(l, C);
  }
}
let O = new Set(),
  aA = new Set();
for (let A of S) for (let e of A.V) (O.has(e) ? aA : O).add(e);
for (let A of O) !d.has(A) && !aA.has(A) && d.set(A, QA);
const WA = new Set([...O, ...fA(O)]),
  XA = h(c),
  yA = uA([]);
function uA(A) {
  let e = P(() => {
      let l = h(c).map((s) => XA[s]);
      if (l.length) return uA(l);
    }).sort((l, s) => s.Q.size - l.Q.size),
    t = c(),
    r = t % 3;
  t = (t / 3) | 0;
  let o = t & 1;
  t >>= 1;
  let n = t & 1,
    C = t & 2;
  return { B: e, V: r, F: o, S: n, C, Q: new Set(A) };
}
class _A extends Array {
  get is_emoji() {
    return !0;
  }
}
function H(A, e = lA) {
  let t = [];
  ee(A[0]) && t.push('◌');
  let r = 0,
    o = A.length;
  for (let n = 0; n < o; n++) {
    let C = A[n];
    hA(C) && (t.push(F(A.slice(r, n))), t.push(e(C)), (r = n + 1));
  }
  return t.push(F(A.slice(r, o))), t.join('');
}
function Z(A) {
  return (hA(A) ? '' : `${q(H([A]))} `) + lA(A);
}
function q(A) {
  return `"${A}"‎`;
}
function $A(A) {
  if (A.length >= 4 && A[2] == _ && A[3] == _)
    throw new Error('invalid label extension');
}
function tA(A) {
  for (let t = A.lastIndexOf(95); t > 0; )
    if (A[--t] !== 95) throw new Error('underscore allowed only at start');
}
function Ae(A) {
  let e = A[0],
    t = X.get(e);
  if (t) throw L(`leading ${t}`);
  let r = A.length,
    o = -1;
  for (let n = 1; n < r; n++) {
    e = A[n];
    let C = X.get(e);
    if (C) {
      if (o == n) throw L(`${t} + ${C}`);
      (o = n + 1), (t = C);
    }
  }
  if (o == r) throw L(`trailing ${t}`);
}
function ee(A) {
  return G.has(A);
}
function hA(A) {
  return xA.has(A);
}
function te(A) {
  return Ce(oe(A));
}
function oe(A, e) {
  let t = 0;
  return A.split(EA).map((r) => {
    let o = RA(r),
      n = { input: o, offset: t };
    t += o.length + 1;
    let C;
    try {
      let l = (n.tokens = se(o, TA)),
        s = l.length,
        g;
      if (s) {
        let i = l[0],
          E = s > 1 || i.is_emoji;
        if (!E && i.every((w) => w < 128)) (C = i), tA(C), $A(C), (g = 'ASCII');
        else if (
          (E && ((n.emoji = !0), (i = l.flatMap((w) => (w.is_emoji ? [] : w)))),
          (C = l.flatMap((w) => (!e && w.is_emoji ? ge(w) : w))),
          tA(C),
          !i.length)
        )
          g = 'Emoji';
        else {
          if (G.has(C[0])) throw L('leading combining mark');
          for (let I = 1; I < s; I++) {
            let Q = l[I];
            if (!Q.is_emoji && G.has(Q[0]))
              throw L(
                `emoji + combining mark: "${F(l[I - 1])} + ${H([Q[0]])}"`
              );
          }
          Ae(C);
          let w = [...new Set(i)],
            [B] = re(w);
          le(B, i), ne(B, w), (g = B.N);
        }
      } else throw new Error('empty label');
      n.type = g;
    } catch (l) {
      n.error = l;
    }
    return (n.output = C), n;
  });
}
function ne(A, e) {
  let t,
    r = [];
  for (let o of e) {
    let n = d.get(o);
    if (n === QA) return;
    if (n) {
      let C = n.M.get(o);
      if (((t = t ? t.filter((l) => C.has(l)) : [...C]), !t.length)) return;
    } else r.push(o);
  }
  if (t) {
    for (let o of t)
      if (r.every((n) => o.V.has(n)))
        throw new Error(`whole-script confusable: ${A.N}/${o.N}`);
  }
}
function re(A) {
  let e = S;
  for (let t of A) {
    let r = e.filter((o) => o.V.has(t));
    if (!r.length) throw e === S ? DA(t) : MA(e[0], t);
    if (((e = r), r.length == 1)) break;
  }
  return e;
}
function Ce(A) {
  return A.map(({ input: e, error: t, output: r }) => {
    if (t) {
      let o = t.message;
      throw new Error(A.length == 1 ? o : `Invalid label ${q(H(e))}: ${o}`);
    }
    return F(r);
  }).join(EA);
}
function DA(A) {
  return new Error(`disallowed character: ${Z(A)}`);
}
function MA(A, e) {
  let t = Z(e),
    r = S.find((o) => o.P.has(e));
  return r && (t = `${r.N} ${t}`), new Error(`illegal mixture: ${A.N} + ${t}`);
}
function L(A) {
  return new Error(`illegal placement: ${A}`);
}
function le(A, e) {
  let { V: t, M: r } = A;
  for (let o of e) if (!t.has(o)) throw MA(A, o);
  if (r) {
    let o = fA(e);
    for (let n = 1, C = o.length; n < C; n++)
      if ($.has(o[n])) {
        let l = n + 1;
        for (let s; l < C && $.has((s = o[l])); l++)
          for (let g = n; g < l; g++)
            if (o[g] == s)
              throw new Error(`non-spacing marks: repeated ${Z(s)}`);
        if (l - n > y)
          throw new Error(
            `non-spacing marks: too many ${q(H(o.slice(n - 1, l)))} (${l - n}/${y})`
          );
        n = l;
      }
  }
}
function se(A, e) {
  let t = [],
    r = [];
  for (A = A.slice().reverse(); A.length; ) {
    let o = we(A);
    if (o) r.length && (t.push(e(r)), (r = [])), t.push(o);
    else {
      let n = A.pop();
      if (WA.has(n)) r.push(n);
      else {
        let C = zA.get(n);
        if (C) r.push(...C);
        else if (!bA.has(n)) throw DA(n);
      }
    }
  }
  return r.length && t.push(e(r)), t;
}
function ge(A) {
  return A.filter((e) => e != b);
}
function we(A, e) {
  let t = yA,
    r,
    o,
    n = [],
    C = A.length;
  for (e && (e.length = 0); C; ) {
    let l = A[--C];
    if (((t = t.B.find((s) => s.Q.has(l))), !t)) break;
    if (t.S) o = l;
    else if (t.C && l === o) break;
    n.push(l),
      t.F && (n.push(b), C > 0 && A[C - 1] == b && C--),
      t.V &&
        ((r = ce(n, t)), e && e.push(...A.slice(C).reverse()), (A.length = C));
  }
  return r;
}
function ce(A, e) {
  let t = _A.from(A);
  return e.V == 2 && t.splice(1, 1), t;
}
function fe(A) {
  return te(A);
}
export {
  ae as getEnsAddress,
  ue as getEnsAvatar,
  he as getEnsName,
  De as getEnsResolver,
  Me as getEnsText,
  Be as labelhash,
  Ie as namehash,
  fe as normalize,
};
