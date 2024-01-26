let e;
const p = new Uint8Array(16);
function y() {
  if (
    !e &&
    ((e =
      typeof crypto < 'u' &&
      crypto.getRandomValues &&
      crypto.getRandomValues.bind(crypto)),
    !e)
  )
    throw new Error(
      'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported'
    );
  return e(p);
}
const d = [];
for (let n = 0; n < 256; ++n) d.push((n + 256).toString(16).slice(1));
function r(n, t = 0) {
  return (
    d[n[t + 0]] +
    d[n[t + 1]] +
    d[n[t + 2]] +
    d[n[t + 3]] +
    '-' +
    d[n[t + 4]] +
    d[n[t + 5]] +
    '-' +
    d[n[t + 6]] +
    d[n[t + 7]] +
    '-' +
    d[n[t + 8]] +
    d[n[t + 9]] +
    '-' +
    d[n[t + 10]] +
    d[n[t + 11]] +
    d[n[t + 12]] +
    d[n[t + 13]] +
    d[n[t + 14]] +
    d[n[t + 15]]
  );
}
const m =
    typeof crypto < 'u' && crypto.randomUUID && crypto.randomUUID.bind(crypto),
  o = { randomUUID: m };
function U(n, t, i) {
  if (o.randomUUID && !t && !n) return o.randomUUID();
  n = n || {};
  const u = n.random || (n.rng || y)();
  if (((u[6] = (u[6] & 15) | 64), (u[8] = (u[8] & 63) | 128), t)) {
    i = i || 0;
    for (let c = 0; c < 16; ++c) t[i + c] = u[c];
    return t;
  }
  return r(u);
}
export { U as v };
