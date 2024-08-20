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
    time: string;
    transactionsCount: string;
  };
};

export type TPSData = {
  timestamp: number;
  tps: number;
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

        // Ensure response has data before attempting to access it
        if (!response || !response.blocks) {
          throw new Error('Invalid response structure');
        }

        const fetchedBlocks = response.blocks.edges.map(
          (edge: any) => edge.node,
        );
        blocks = blocks.concat(fetchedBlocks);
        endCursor = response.blocks.pageInfo.startCursor;

        // Log each fetched block
        fetchedBlocks.forEach((block: Block, index: number) => {
          console.log(`Block ${index + 1}:`, JSON.stringify(block, null, 2));
        });
      } while (endCursor && response.blocks.pageInfo.hasPreviousPage);
    } catch (error) {
      console.error('Error fetching blocks:', error);
    }

    // Log the entire blocks array before starting TPS calculation
    console.log(
      'Starting TPS calculation with blocks:',
      JSON.stringify(blocks, null, 2),
    );

    tpsData = this.calculateTPS(blocks);
    TPS.cache.put(cacheKey, tpsData, 24 * 60 * 60 * 1000); // Cache for 24 hours
    console.log('Calculated TPS data:', JSON.stringify(tpsData, null, 5));

    return tpsData;
  }

  calculateTPS(blocks: Block[]) {
    const tpsData: TPSData[] = [];
    const transactionsPerSecond = new Map<number, number>();

    console.log('Starting TPS calculation...');
    blocks.forEach((block) => {
      const timestamp = tai64toDate(block.header.time).unix();
      const transactions = parseInt(block.header.transactionsCount, 10);

      if (transactionsPerSecond.has(timestamp)) {
        transactionsPerSecond.set(
          timestamp,
          transactionsPerSecond.get(timestamp)! + transactions,
        );
      } else {
        transactionsPerSecond.set(timestamp, transactions);
      }
    });

    transactionsPerSecond.forEach((transactions, second) => {
      tpsData.push({
        timestamp: second * 1000,
        tps: transactions,
      });
    });

    console.log('Completed TPS calculation:', JSON.stringify(tpsData, null, 2));
    return tpsData;
  }
}
