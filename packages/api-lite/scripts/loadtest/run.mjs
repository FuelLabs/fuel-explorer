import autocannon from 'autocannon';
import { ACCOUNT, HOME, SEARCH, TX } from './queries.mjs';

const URL = process.env.API_URL ?? 'http://localhost:8080/api/graphql';
const [scenario = 'mix', duration = '600', connections = '20'] =
  process.argv.slice(2);

async function gql(query) {
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  return res.json();
}

async function sample() {
  const list = await gql('{ transactions(first: 50) { nodes { id } } }');
  const txIds = (list.data?.transactions?.nodes ?? []).map((n) => n.id);
  const accounts = [];
  for (const id of txIds.slice(0, 10)) {
    const t = await gql(
      `{ transaction(id: "${id}") { inputs { ... on InputCoin { owner } } } }`,
    );
    for (const i of t.data?.transaction?.inputs ?? [])
      if (i.owner) accounts.push(i.owner);
  }
  const health = await (await fetch(URL.replace('/graphql', '/health'))).json();
  return {
    txIds,
    accounts: [...new Set(accounts)],
    tip: health.servedTip,
    indexFrom: health.index.from,
  };
}

async function coldIds(s) {
  const floor = Math.max(0, s.indexFrom - 20000);
  const ids = [];
  for (let h = floor; h < floor + 200; h += 1) {
    const b = await gql(`{ block(height: "${h}") { transactions { id } } }`);
    if (b.data?.block?.transactions?.[0])
      ids.push(b.data.block.transactions[0].id);
  }
  return ids;
}

const s = await sample();
if (s.txIds.length === 0) {
  console.error('sample() found no transactions; aborting.', JSON.stringify(s));
  process.exit(1);
}
if (s.accounts.length === 0) {
  console.error(
    'sample() found no accounts from tx inputs; account scenario will fail.',
  );
}
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const bodies = {
  home: () => pick(HOME),
  tx: () => TX(pick(s.txIds)),
  account: () => ACCOUNT(pick(s.accounts)),
  search: () =>
    SEARCH(
      Math.random() < 0.5
        ? String(s.tip - Math.floor(Math.random() * 100))
        : pick(s.txIds),
    ),
  mix: () => {
    const r = Math.random();
    return r < 0.4
      ? bodies.home()
      : r < 0.7
        ? bodies.tx()
        : r < 0.9
          ? bodies.account()
          : bodies.search();
  },
};
if (scenario === 'cold') {
  const ids = await coldIds(s);
  bodies.cold = () => TX(pick(ids));
}

console.error(
  `sample: ${s.txIds.length} txIds, ${s.accounts.length} accounts, tip=${s.tip}, indexFrom=${s.indexFrom}`,
);

const result = await autocannon({
  url: URL,
  connections: Number(connections),
  duration: Number(duration),
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  requests: [
    {
      method: 'POST',
      setupRequest: (req) => ({
        ...req,
        body: JSON.stringify({ query: bodies[scenario]() }),
      }),
    },
  ],
});

console.log(
  JSON.stringify(
    {
      scenario,
      duration: Number(duration),
      connections: Number(connections),
      rps: result.requests.average,
      p50: result.latency.p50,
      p975: result.latency.p97_5,
      p99: result.latency.p99,
      non2xx: result.non2xx,
      errors: result.errors,
      timeouts: result.timeouts,
    },
    null,
    2,
  ),
);
