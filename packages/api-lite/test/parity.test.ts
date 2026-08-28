import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { decodeBlock } from '../src/decoder/block';
import { FuelCoreClient } from '../src/fuelcore/FuelCoreClient';

const dir = join(__dirname, 'fixtures/blocks');
const heights = existsSync(dir)
  ? readdirSync(dir)
      .filter((f) => f.endsWith('.bin'))
      .map((f) => Number(f.replace('.bin', '')))
  : [];
const SKIP_PATHS = [
  /consensus\.signature$/,
  /amountInUsd$/,
  /feeInUsd$/,
  /\.name$/,
  /\.symbol$/,
  /\.icon$/,
  /\.decimals$/,
  /\.suspicious$/,
  /\.contractId$/,
  /\.rate$/,
  /mintAmountUsd$/,
];

// Tx types where totalFee/totalGas exactness could not be reached against
// mainnet fuel-core within the time budget. decodeBlock nulls both fields for
// these types; document the reason here.
const KNOWN_GAPS: { height: number; path: RegExp; reason: string }[] = [];

function flatten(v: unknown, path = '', out = new Map<string, unknown>()) {
  if (Array.isArray(v)) v.forEach((x, i) => flatten(x, `${path}[${i}]`, out));
  else if (v && typeof v === 'object')
    for (const [k, x] of Object.entries(v))
      flatten(x, path ? `${path}.${k}` : k, out);
  else out.set(path, v);
  return out;
}

const describeIf = heights.length ? describe : describe.skip;

describeIf('parity with fuel-core', () => {
  let ctx: { chainId: number; fee: any; baseAssetId: string };
  beforeAll(async () => {
    const p = await new FuelCoreClient(
      process.env.FUEL_PROVIDER ?? 'https://mainnet.fuel.network/v1/graphql',
    ).chainParams();
    ctx = { chainId: p.chainId, fee: p.fee, baseAssetId: p.baseAssetId };
  }, 30_000);

  for (const h of heights) {
    it(`block ${h} matches`, () => {
      const ours = flatten(
        decodeBlock(readFileSync(join(dir, `${h}.bin`)), ctx),
      );
      const theirs = flatten(
        JSON.parse(readFileSync(join(dir, `${h}.fuelcore.json`), 'utf8')),
      );
      const diffs: string[] = [];
      for (const [path, expected] of theirs) {
        if (SKIP_PATHS.some((re) => re.test(path))) continue;
        if (path.includes('.receipts[') && path.includes('.contractId'))
          continue;
        if (KNOWN_GAPS.some((g) => g.height === h && g.path.test(path)))
          continue;
        const actual = ours.get(path);
        if (String(actual) !== String(expected))
          diffs.push(
            `${path}: ours=${String(actual)} theirs=${String(expected)}`,
          );
      }
      expect(diffs).toEqual([]);
    });
  }
});
