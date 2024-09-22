import { DatabaseConnection } from '../database/DatabaseConnection';
import PaginatedParams from '../paginator/PaginatedParams';
import Block from './Block';
import { createIntervals, roundToNearest } from './utils';

export default class BlockDAO {
  databaseConnection: DatabaseConnection;

  constructor() {
    this.databaseConnection = DatabaseConnection.getInstance();
  }

  async getByHeight(height: number) {
    const blockData = (
      await this.databaseConnection.query(
        `
		  select
			  b.*
		  from
			  indexer.blocks b
		  where
			  b._id = $1
		  `,
        [height],
      )
    )[0];
    if (!blockData) return;
    return new Block(blockData);
  }

  async getByHash(hash: string) {
    const blockData = (
      await this.databaseConnection.query(
        `
		  select
			  b.*
		  from
			  indexer.blocks b
		  where
			  b.id = $1
		  `,
        [hash],
      )
    )[0];
    if (!blockData) return;
    return new Block(blockData);
  }

  async getPaginatedBlocks(paginatedParams: PaginatedParams) {
    const direction = paginatedParams.direction === 'before' ? '<' : '>';
    const order = paginatedParams.direction === 'before' ? 'desc' : 'asc';
    const blocksData = await this.databaseConnection.query(
      `
		select 
			*
		from 
			indexer.blocks b
		where
			$1::integer is null or b._id ${direction} $1
		order by
			b._id ${order} 
		limit 10
	`,
      [paginatedParams.cursor],
    );
    blocksData.sort((a: any, b: any) => {
      return (a._id - b._id) * -1;
    });
    const blocks = [];
    for (const blockData of blocksData) {
      blocks.push(new Block(blockData));
    }
    if (blocks.length === 0) {
      return {
        nodes: [],
        edges: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          endCursor: '',
          startCursor: '',
        },
      };
    }
    const startCursor = blocksData[0]._id;
    const endCursor = blocksData[blocksData.length - 1]._id;
    const hasPreviousPage = (
      await this.databaseConnection.query(
        'select exists(select 1 from indexer.blocks where _id < $1)',
        [endCursor],
      )
    )[0].exists;
    const hasNextPage = (
      await this.databaseConnection.query(
        'select exists(select 1 from indexer.blocks where _id > $1)',
        [startCursor],
      )
    )[0].exists;
    const newNodes = blocks.map((n) => n.toGQLNode());
    const edges = newNodes.map((node) => ({
      node,
      cursor: paginatedParams.cursor,
    }));
    const paginatedResults = {
      nodes: newNodes,
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        endCursor,
        startCursor,
      },
    };
    return paginatedResults;
  }

  async findLatestBlockAdded() {
    const [blockData] = await this.databaseConnection.query(
      'select * from indexer.blocks order by _id desc limit 1',
      [],
    );
    if (!blockData) return;
    return new Block(blockData);
  }

  async getBlocksDashboard() {
    const blocksData = await this.databaseConnection.query(
      `
      select 
          b._id AS blockno,
          b.gas_used AS gasused,
          b.producer,
          b.timestamp AS timestamp
      from 
        indexer.blocks b
      order by
        b._id  desc
      limit 6
    `,
      [],
    );

    const formattedBlocksData = blocksData.map((block) => ({
      timestamp: new Date(Number(block.timestamp)).getTime(),
      gasUsed: Number(block.gasused),
      blockNo: block.blockno,
      producer: block.producer,
    }));

    return {
      nodes: formattedBlocksData,
    };
  }

  async tps() {
    const currentTime = new Date();
    const timeMinusOneDay = new Date(
      currentTime.getTime() - 24 * 60 * 60 * 1000,
    );
    const timeMinusOneDayRoundDown = new Date(
      roundToNearest(timeMinusOneDay.getTime()),
    );
    const timeMinusOneDayRoundDownISO = timeMinusOneDayRoundDown.toISOString();

    const blocksData = await this.databaseConnection.query(
      `
      SELECT 
          b.timestamp AS timestamp,
          b.data->'header'->>'transactionsCount' AS tps,
          b.gas_used AS gasused
      FROM 
          indexer.blocks b
      WHERE 
          b.timestamp >= $1
      ORDER BY _id asc;
      `,
      [timeMinusOneDayRoundDownISO],
    );

    if (blocksData.length === 0) {
      return { nodes: [] };
    }

    const lastTimestamp = new Date(
      Number(blocksData[blocksData.length - 1].timestamp),
    ).getTime();
    const firstTimestamp = new Date(Number(blocksData[0].timestamp)).getTime();

    const intervals = createIntervals(firstTimestamp, lastTimestamp, 'hour', 1);

    // Process blocks and put them into the correct interval
    blocksData.forEach((block) => {
      const blockTimestamp = new Date(Number(block.timestamp)).getTime();
      const txCount = Number(block.tps);
      const gasUsed = Number(block.gasused);

      // Find the correct interval for the current block
      for (const interval of intervals) {
        const intervalStart = new Date(interval.start).getTime();
        const intervalEnd = new Date(interval.end).getTime();

        if (blockTimestamp >= intervalStart && blockTimestamp < intervalEnd) {
          interval.txCount += txCount;
          interval.totalGas += gasUsed;
          break;
        }
      }
    });

    return {
      nodes: intervals,
    };
  }
}
