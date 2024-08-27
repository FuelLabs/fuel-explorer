import { Signer } from 'fuels';
import { gql } from 'graphql-request';
import { Cache } from '../utils/cache';
import { tai64toDate } from '../utils/dayjs';
import { Domain } from '../utils/domain';

type Args = {
  first: number;
  before: string | null;
};

export type Block = {
  header: {
    id: string;
    time: string;
    transactionsCount: string;
  };
  transactions: {
    id: string;
  }[];
  consensus: {
    __typename: string;
    signature?: string;
  };
};

export type TPSData = {
  timestamp: number;
  tps: number;
  gasUsed: string;
  blockNo: string;
  producer: string | null;
};

export class TPS extends Domain<any, Args> {
  private static cache = new Cache();

  static createResolvers() {
    const domain = new TPS();
    return {
      Query: {
        getTPS: domain.getTPS.bind(domain),
      },
    };
  }

  async getTPS() {
    const cacheKey = `tps_data_${new Date().toISOString().split('T')[0]}`; // Cache key based on today's date
    let tpsData = TPS.cache.get<TPSData[]>(cacheKey);

    if (tpsData) {
      console.log('Serving TPS data from cache');
      return tpsData;
    }
    const { first, before } = this.args || { first: 4, before: null };

    console.log('Fetching TPS data with args:', { first, before });

    const gqlQuery = gql`
      query getBlocksInRange($first: Int, $before: String) {
        blocks(last: $first, before: $before) {
          edges {
            node {
              header {
                id
                time
                transactionsCount
              }
              transactions {
                id
              }
              consensus {
                __typename
                ... on PoAConsensus {
                  signature
                }
              }
            }
          }
          pageInfo {
            startCursor
            hasPreviousPage
          }
        }
      }
    `;

    let blocks: Block[] = [];
    let endCursor = before;
    let response;

    try {
      do {
        console.log('Fetching blocks with variables:', {
          first,
          before: endCursor,
        });
        response = await this.query<any>(gqlQuery, {
          first,
          before: endCursor,
        });
        console.log(
          'Raw response from executor:',
          JSON.stringify(response, null, 2),
        );

        if (!response || !response.blocks) {
          throw new Error('Invalid response structure');
        }

        const fetchedBlocks = response.blocks.edges.map(
          (edge: any) => edge.node,
        );
        blocks = blocks.concat(fetchedBlocks);
        endCursor = response.blocks.pageInfo.startCursor;

        fetchedBlocks.forEach((block: Block, index: number) => {
          console.log(`Block ${index + 1}:`, JSON.stringify(block, null, 2));
        });
      } while (endCursor && response.blocks.pageInfo.hasPreviousPage);
    } catch (error) {
      console.error('Error fetching blocks:', error);
    }

    console.log(
      'Starting TPS calculation with blocks:',
      JSON.stringify(blocks, null, 2),
    );

    tpsData = await this.calculateTPS(blocks);
    TPS.cache.put(cacheKey, tpsData, 24 * 60 * 60 * 1000); // Cache for 24 hours
    console.log('Calculated TPS data:', JSON.stringify(tpsData, null, 5));

    return tpsData;
  }

  async calculateTPS(blocks: Block[]) {
    const tpsData: TPSData[] = [];
    const transactionsPerSecond = new Map<
      number,
      { tps: number; gasUsed: string; blockNo: string; producer: string | null }
    >();

    console.log('Starting TPS calculation...');
    for (const block of blocks) {
      const timestamp = tai64toDate(block.header.time).unix();
      const transactions = parseInt(block.header.transactionsCount, 10);
      let totalGasUsed = BigInt(0);

      for (const transaction of block.transactions) {
        // Calculate gas used for each transaction using the provider
        const { provider } = this.context;
        const tx = await provider.getTransactionResponse(transaction.id);
        const summ = await tx.getTransactionSummary();
        totalGasUsed += BigInt(summ.gasUsed.toString());
      }

      // Calculate producer as done in BlockDomain
      let producer: string | null = null;
      if (
        block.consensus.__typename !== 'Genesis' &&
        block.consensus.signature
      ) {
        const recoveredProducer = Signer.recoverAddress(
          block.header.id,
          block.consensus.signature,
        );
        producer = recoveredProducer.toString(); // Convert Address to string
      }

      if (transactionsPerSecond.has(timestamp)) {
        const data = transactionsPerSecond.get(timestamp)!;
        transactionsPerSecond.set(timestamp, {
          tps: data.tps + transactions,
          gasUsed: (BigInt(data.gasUsed) + totalGasUsed).toString(),
          blockNo: block.header.id,
          producer: producer || data.producer,
        });
      } else {
        transactionsPerSecond.set(timestamp, {
          tps: transactions,
          gasUsed: totalGasUsed.toString(),
          blockNo: block.header.id,
          producer: producer,
        });
      }
    }

    transactionsPerSecond.forEach((data, second) => {
      tpsData.push({
        timestamp: second * 1000,
        tps: data.tps,
        gasUsed: data.gasUsed,
        blockNo: data.blockNo,
        producer: data.producer,
      });
    });

    console.log('Completed TPS calculation:', JSON.stringify(tpsData, null, 2));
    return tpsData;
  }
}
