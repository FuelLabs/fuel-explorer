import { DatabaseConnection } from '../database/DatabaseConnection';
import PaginatedParams from '../paginator/PaginatedParams';
import Block from './Block';

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
      SELECT 
      jsonb_build_object(
          'isMint', elem->>'isMint',
          'mintAmount', elem->>'mintAmount'
      ) AS transactions
      timestamp
      FROM 
          indexer.blocks b,
          jsonb_array_elements(b.data->'transactions') AS elem
      WHERE
          $1::integer IS NULL OR b._id ${direction} $1
      ORDER BY
          b._id ${order}
      LIMIT 10;
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
    let _interval;

    switch (timeFilter) {
      case '1hr':
        _interval = '1 hour';
        break;
      case '12hr':
        _interval = '12 hours';
        break;
      case '1day':
        _interval = '1 day';
        break;
      case '7days':
        _interval = '7 days';
        break;
      case '14days':
        _interval = '14 days';
        break;
      case '30days':
        _interval = '30 days';
        break;
      case '90days':
        _interval = '90 days';
        break;
      default:
        _interval = null;
    }

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
    // if (interval) {
    //   query += `
    //         AND
    //             b.timestamp >= NOW() - INTERVAL '${interval}'
    //     `;
    // }

    query += ' ORDER BY id asc';
    // Execute the query
    const blocksData = await this.databaseConnection.query(query, []);

    const results = {
      nodes: blocksData,
    };
    return results;
  }
}
