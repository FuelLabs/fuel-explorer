import { DateHelper } from '~/core/Date';
import { DatabaseConnection } from '../database/DatabaseConnection';
import PaginatedParams from '../paginator/PaginatedParams';
import Block from './Block';
import { getTimeInterval } from './utils';

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

  async getBlockRewards(timeFilter: string) {
    const _interval = getTimeInterval(timeFilter);

    let query = `
        SELECT 
            b._id AS id,
            elem->>'mintAmount' AS reward,
            (b.data->'header'->>'time')::bigint AS timestamp
        FROM 
            indexer.blocks b,
            jsonb_array_elements(b.data->'transactions') AS elem
        WHERE 
            elem->>'isMint' = 'true'
    `;

    // Add the time filtering condition only if an interval is defined
    if (_interval) {
      const intervalStartTimeInMilliseconds = Date.now() - _interval;
      const intervalStartTimeDate = new Date(intervalStartTimeInMilliseconds);
      const intervalStartTimeTai64 = DateHelper.dateToTai64(
        intervalStartTimeDate,
      );
      query += `AND
                (b.data->'header'->>'time')::bigint >= ${intervalStartTimeTai64}
        `;
    }

    query += ' ORDER BY id asc';
    // Execute the query
    const blocksData = await this.databaseConnection.query(query, []);

    const results = {
      nodes: blocksData,
    };
    return results;
  }
}
