import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLError } from 'graphql';
import { PoliciesResolver } from '~/graphql/resolvers/PoliciesResolver';
import { providerDocPath } from '../fuelcore/FuelCoreClient';
import type { AppContext } from './context';
import { analyticsResolvers } from './resolvers/analytics';
import { blockResolvers } from './resolvers/blocks';
import { passthroughResolvers } from './resolvers/passthrough';
import { searchResolvers } from './resolvers/search';
import { stubResolvers } from './resolvers/stubs';
import { transactionResolvers } from './resolvers/transactions';

function schemasDir(): string {
  const bundled = join(__dirname, 'schemas');
  if (existsSync(bundled)) return bundled;
  return join(
    __dirname,
    '..',
    '..',
    '..',
    'graphql',
    'src',
    'graphql',
    'schemas',
  );
}

function tryReadDoc(name: string): string | null {
  try {
    return readFileSync(providerDocPath(name), 'utf8');
  } catch {
    return null;
  }
}

const typeDefs = mergeTypeDefs(loadFilesSync(schemasDir()));
const policies = PoliciesResolver.create();
const coinsDoc = tryReadDoc('coins');

// Matches production's BalanceResolver.utxos cap (packages/graphql/src/graphql/resolvers/BalanceResolver.ts).
const UTXOS_PAGE_SIZE = 2500;
// One full balances page (first: 100, the most the explorer asks for). Each
// balance node costs a coins query upstream, so without a per-request budget
// aliased balances pages multiply into thousands of them.
const UTXOS_LOOKUPS_PER_REQUEST = 100;
const utxosLookupsByRequest = new WeakMap<object, number>();

const balanceResolvers = {
  async utxos(
    parent: { owner: string; assetId: string },
    _args: unknown,
    ctx: AppContext & { request?: object },
  ) {
    if (!coinsDoc) return [];
    if (ctx.request) {
      const used = (utxosLookupsByRequest.get(ctx.request) ?? 0) + 1;
      utxosLookupsByRequest.set(ctx.request, used);
      if (used > UTXOS_LOOKUPS_PER_REQUEST) {
        throw new GraphQLError(
          `Requests are limited to ${UTXOS_LOOKUPS_PER_REQUEST} utxos lookups`,
        );
      }
    }
    const data = await ctx.client.query<{ coins?: { nodes?: unknown[] } }>(
      coinsDoc,
      {
        filter: { owner: parent.owner, assetId: parent.assetId },
        first: UTXOS_PAGE_SIZE,
      },
    );
    return data.coins?.nodes ?? [];
  },
};

export function buildSchema() {
  return makeExecutableSchema<AppContext>({
    typeDefs,
    resolvers: {
      Query: {
        ...stubResolvers.Query,
        ...passthroughResolvers.Query,
        ...blockResolvers.Query,
        ...transactionResolvers.Query,
        ...searchResolvers.Query,
        ...analyticsResolvers.Query,
      },
      Transaction: { ...policies.Transaction },
      Policies: policies.Policies,
      Balance: balanceResolvers,
    },
  });
}
