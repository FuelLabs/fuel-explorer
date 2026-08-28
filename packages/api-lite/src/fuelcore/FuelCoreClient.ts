import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { GQLBlock } from '~/graphql/generated/sdk-provider';
import type { FeeParams } from '../decoder/fee';

export function providerDocPath(name: string): string {
  const candidates = [
    join(__dirname, 'provider', `${name}.graphql`), // bundled: dist/provider/
    join(
      __dirname,
      '..',
      '..',
      '..',
      'graphql',
      'src',
      'graphql',
      'queries',
      'provider',
      `${name}.graphql`,
    ), // source tree from src/fuelcore/
  ];
  const found = candidates.find((p) => existsSync(p));
  if (!found)
    throw new Error(
      `provider document ${name}.graphql not found in ${candidates.join(', ')}`,
    );
  return found;
}

const CHAIN_DOC = readFileSync(providerDocPath('chain'), 'utf8');

const BLOCKS_DOC = readFileSync(providerDocPath('blocks'), 'utf8');
// blocks.graphql is `fragment BlockItems on Block { ... }` followed by query
// operations that consume it; slice just the fragment (see scripts/fetch-fixture.ts)
// and pair it with a single-block-by-height query of our own.
const BLOCK_ITEMS_FRAGMENT = BLOCKS_DOC.slice(0, BLOCKS_DOC.indexOf('query '));
const BLOCK_QUERY = `${BLOCK_ITEMS_FRAGMENT}\nquery($h: U32!) { block(height: $h) { ...BlockItems } }`;

export class FuelCoreClient {
  constructor(
    private readonly url: string,
    private readonly fetchImpl: typeof fetch = fetch,
  ) {}

  async query<T>(query: string, variables: object = {}): Promise<T> {
    const res = await this.fetchImpl(this.url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ query, variables }),
      signal: AbortSignal.timeout(15_000),
    });
    const json = (await res.json()) as {
      data?: T;
      errors?: { message: string }[];
    };
    if (json.errors?.length)
      throw new Error(
        `fuel-core: ${json.errors.map((e) => e.message).join('; ')}`,
      );
    if (!json.data) throw new Error('fuel-core: empty response');
    return json.data;
  }

  async latestHeight(): Promise<number> {
    const d = await this.query<{
      blocks: { nodes: { header: { height: string } }[] };
    }>('{ blocks(last: 1) { nodes { header { height } } } }');
    return Number(d.blocks.nodes[0]?.header.height ?? 0);
  }

  async heightForTx(hash: string): Promise<number | null> {
    const d = await this.query<{
      transaction: { status: { block?: { height: string } } | null } | null;
    }>(
      'query($id: TransactionId!) { transaction(id: $id) { status { __typename ... on SuccessStatus { block { height } } ... on FailureStatus { block { height } } } } }',
      { id: hash },
    );
    const h = d.transaction?.status?.block?.height;
    return h == null ? null : Number(h);
  }

  async heightForBlock(hash: string): Promise<number | null> {
    const d = await this.query<{ block: { height: string } | null }>(
      'query($id: BlockId!) { block(id: $id) { height } }',
      { id: hash },
    );
    return d.block ? Number(d.block.height) : null;
  }

  async txsByOwner(
    owner: string,
    opts: { first: number; after?: string } | { last: number; before?: string },
  ): Promise<{
    items: { id: string; height: number; cursor: string }[];
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }> {
    const variables: Record<string, unknown> =
      'first' in opts
        ? {
            owner,
            first: opts.first,
            ...(opts.after !== undefined ? { after: opts.after } : {}),
          }
        : {
            owner,
            last: opts.last,
            ...(opts.before !== undefined ? { before: opts.before } : {}),
          };
    const d = await this.query<{
      transactionsByOwner: {
        pageInfo: { hasNextPage: boolean; hasPreviousPage: boolean };
        edges: {
          cursor: string;
          node: {
            id: string;
            status: { __typename: string; block?: { height: string } };
          };
        }[];
      };
    }>(
      'query($owner: Address!, $first: Int, $after: String, $last: Int, $before: String) { transactionsByOwner(owner: $owner, first: $first, after: $after, last: $last, before: $before) { pageInfo { startCursor endCursor hasNextPage hasPreviousPage } edges { cursor node { id status { __typename ... on SuccessStatus { block { height } } ... on FailureStatus { block { height } } } } } } }',
      variables,
    );
    const items: { id: string; height: number; cursor: string }[] = [];
    for (const edge of d.transactionsByOwner.edges) {
      const height = edge.node.status.block?.height;
      if (height != null)
        items.push({
          id: edge.node.id,
          height: Number(height),
          cursor: edge.cursor,
        });
    }
    return {
      items,
      hasNextPage: d.transactionsByOwner.pageInfo.hasNextPage,
      hasPreviousPage: d.transactionsByOwner.pageInfo.hasPreviousPage,
    };
  }

  async blockSignatures(heights: number[]): Promise<Map<number, string>> {
    const result = new Map<number, string>();
    try {
      for (let i = 0; i < heights.length; i += 20) {
        const chunk = heights.slice(i, i + 20);
        const query = `{ ${chunk
          .map(
            (h, j) =>
              `b${j}: block(height: "${h}") { consensus { __typename ... on PoAConsensus { signature } } }`,
          )
          .join(' ')} }`;
        const data =
          await this.query<
            Record<
              string,
              {
                consensus: { __typename: string; signature?: string } | null;
              } | null
            >
          >(query);
        chunk.forEach((h, j) => {
          const consensus = data[`b${j}`]?.consensus;
          if (consensus?.__typename === 'PoAConsensus' && consensus.signature) {
            result.set(h, consensus.signature);
          }
        });
      }
      return result;
    } catch (e) {
      console.error('FuelCoreClient.blockSignatures failed', e);
      return new Map();
    }
  }

  async blockJson(height: number): Promise<GQLBlock | null> {
    const d = await this.query<{ block: GQLBlock | null }>(BLOCK_QUERY, {
      h: String(height),
    });
    return d.block ?? null;
  }

  async rawChain(): Promise<unknown> {
    const d = await this.query<{ chain: unknown }>(CHAIN_DOC);
    return d.chain;
  }

  async chainParams(): Promise<{
    chainId: number;
    baseAssetId: string;
    fee: FeeParams;
  }> {
    const chain = (await this.rawChain()) as any;
    const cp = chain.consensusParameters;
    return {
      chainId: Number(cp.chainId),
      baseAssetId: cp.baseAssetId,
      fee: {
        gasPriceFactor: cp.feeParams.gasPriceFactor,
        gasPerByte: cp.feeParams.gasPerByte,
        maxGasPerTx: cp.txParams.maxGasPerTx,
        gasCosts: cp.gasCosts,
      },
    };
  }
}
