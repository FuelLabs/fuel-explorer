import { readFileSync } from 'node:fs';
import VerifiedAssets from '~/infra/cache/VerifiedAssets';
import { providerDocPath } from '../../fuelcore/FuelCoreClient';
import type { AppContext } from '../context';

// Read once at module load (there are only a handful of these documents, and
// they never change at runtime), instead of a synchronous disk read per request.
const docCache = new Map<string, string>();
const doc = (name: string) => {
  let d = docCache.get(name);
  if (d === undefined) {
    d = readFileSync(providerDocPath(name), 'utf8');
    docCache.set(name, d);
  }
  return d;
};

const MAX_PAGE_SIZE = 100;

// Clamps `first`/`last` before forwarding so a caller cannot turn api-lite into
// an amplifier against the shared upstream mainnet node.
function clampPageArgs(args: Record<string, unknown>): Record<string, unknown> {
  const clamped = { ...args };
  if (typeof clamped.first === 'number')
    clamped.first = Math.min(clamped.first, MAX_PAGE_SIZE);
  if (typeof clamped.last === 'number')
    clamped.last = Math.min(clamped.last, MAX_PAGE_SIZE);
  return clamped;
}

function forward(field: string, file: string) {
  const document = doc(file);
  return async (_: unknown, args: Record<string, unknown>, ctx: AppContext) => {
    const data = await ctx.client.query<Record<string, unknown>>(
      document,
      clampPageArgs(args),
    );
    return data[field];
  };
}

async function enrichAssetNodes(container: any, ctx: AppContext) {
  if (!container) return container;
  const targets: any[] = [
    ...(container.nodes ?? []),
    ...(container.edges ?? []).map((e: any) => e?.node).filter(Boolean),
  ];
  if (!targets.length) return container;

  let verified: any[] = [];
  try {
    verified = (await VerifiedAssets.getInstance().fetch()) ?? [];
  } catch {
    verified = [];
  }

  for (const node of targets) {
    let match: { asset: any; network: any } | null = null;
    for (const asset of verified) {
      const network = (asset.networks ?? []).find(
        (n: any) =>
          n.type === 'fuel' &&
          n.chainId === ctx.chain.chainId &&
          n.assetId === node.assetId,
      );
      if (network) {
        match = { asset, network };
        break;
      }
    }
    node.name = match?.asset.name ?? null;
    node.symbol = match?.asset.symbol ?? null;
    node.icon = match?.asset.icon ?? null;
    node.decimals = match?.network.decimals ?? null;
    node.suspicious = false;
    node.amountInUsd = null;
  }
  return container;
}

function forwardEnriched(field: string, file: string) {
  const document = doc(file);
  return async (_: unknown, args: Record<string, unknown>, ctx: AppContext) => {
    const data = await ctx.client.query<Record<string, unknown>>(
      document,
      clampPageArgs(args),
    );
    return enrichAssetNodes(data[field], ctx);
  };
}

export const passthroughResolvers = {
  Query: {
    balances: forwardEnriched('balances', 'balances'),
    balance: forward('balance', 'balance'),
    coins: forward('coins', 'coins'),
    contract: forward('contract', 'contract'),
    contractBalances: forwardEnriched('contractBalances', 'contractBalances'),
    chain: async (_: unknown, __: unknown, ctx: AppContext) =>
      ctx.client.rawChain(),
    nodeInfo: forward('nodeInfo', 'nodeInfo'),
  },
};
