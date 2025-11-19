import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { DatabaseConnectionReplica } from '../database/DatabaseConnectionReplica';
import type PaginatedParams from '../paginator/PaginatedParams';
import Block from './Block';
dayjs.extend(utc);

export default class BlockDAO {
  databaseConnection: DatabaseConnectionReplica;

  constructor() {
    this.databaseConnection = DatabaseConnectionReplica.getInstance();
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
        [hash.toLowerCase()],
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
          b._id as blockno,
          b.id as hash,
          b.gas_used as gasused,
          b.total_fee as totalfee,
          b.producer,
          b.timestamp as timestamp
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
      gasUsed: Number(block.gasused) || 0,
      gasUsedInUsd: '',
      totalFee: Number(block.totalfee) || 0,
      totalFeeInUsd: '',
      blockNo: block.blockno,
      blockHash: block.hash,
      producer: block.producer,
    }));
    return {
      nodes: formattedBlocksData,
    };
  }

  async tps() {
    const data = await this.databaseConnection.query(
      `SELECT to_char(hour, 'YYYY-MM-DD HH24') AS date,
        SUM(transactions_count) AS total_tps,
        SUM(gas_used::int) AS total_gas_used
      FROM (
        SELECT date_trunc('hour', "timestamp") AS hour,
          transactions_count,
          gas_used
        FROM indexer.blocks
        WHERE "timestamp" > date_trunc('hour', now()) - interval '24 hours'
        AND "timestamp" < date_trunc('hour', now())
      ) t
      GROUP BY hour
      ORDER BY hour ASC`,
      [],
    );
    const intervals = [];
    for (const row of data) {
      const interval: any = {};
      interval.start = dayjs(row.date)
        .startOf('hour')
        .utcOffset(0, true)
        .toDate();
      interval.end = dayjs(row.date)
        .startOf('hour')
        .add(1, 'hour')
        .utcOffset(0, true)
        .toDate();
      interval.txCount = Number(row.total_tps);
      interval.totalGas = Number(row.total_gas_used);
      intervals.push(interval);
    }
    return {
      nodes: intervals,
    };
  }

  async getAverageTps() {
    const data = await this.databaseConnection.query(
      `SELECT to_char(hour, 'YYYY-MM-DD HH24') AS date,
        avg(transactions_count) AS value
      FROM (
        SELECT date_trunc('hour', "timestamp") AS hour,
          transactions_count
        FROM indexer.blocks
        WHERE "timestamp" > date_trunc('hour', now()) - interval '24 hours'
      ) t
      GROUP BY hour
      ORDER BY hour`,
      [],
    );
    return data.map((row) => ({
      date: dayjs(row.date).startOf('hour').utcOffset(0, true).toDate(),
      value: Number(row.value),
    }));
  }

  async getTotalTps() {
    const data = await this.databaseConnection.query(
      `SELECT to_char(hour, 'YYYY-MM-DD HH24') AS date,
        SUM(transactions_count) AS value
      FROM (
        SELECT date_trunc('hour', "timestamp") AS hour,
          transactions_count
        FROM indexer.blocks
        WHERE "timestamp" > date_trunc('hour', now()) - interval '24 hours'
      ) t
      GROUP BY hour
      ORDER BY hour`,
      [],
    );
    return data.map((row) => ({
      date: dayjs(row.date).startOf('hour').utcOffset(0, true).toDate(),
      value: Number(row.value),
    }));
  }

  async getMaxTps() {
    const data = await this.databaseConnection.query(
      `SELECT to_char(hour, 'YYYY-MM-DD HH24') AS date,
        MAX(transactions_count) AS value
      FROM (
        SELECT date_trunc('hour', "timestamp") AS hour,
          transactions_count
        FROM indexer.blocks
        WHERE "timestamp" > date_trunc('hour', now()) - interval '23 hours'
      ) t
      GROUP BY hour
      ORDER BY hour`,
      [],
    );
    return data.map((row) => ({
      date: dayjs(row.date).startOf('hour').utcOffset(0, true).toDate(),
      value: Number(row.value),
    }));
  }

  async getAverageGasUsed() {
    const data = await this.databaseConnection.query(
      `SELECT to_char(hour, 'YYYY-MM-DD HH24') AS date,
        AVG(gas_used::numeric) AS value
      FROM (
        SELECT date_trunc('hour', "timestamp") AS hour,
          gas_used
          FROM indexer.blocks
          WHERE "timestamp" > date_trunc('hour', now()) - interval '24 hours'
      ) t
      GROUP BY hour
      ORDER BY hour`,
      [],
    );
    return data.map((row) => ({
      date: dayjs(row.date).startOf('hour').utcOffset(0, true).toDate(),
      value: Number(row.value),
    }));
  }

  async getTotalGasUsed() {
    const data = await this.databaseConnection.query(
      `SELECT to_char(hour, 'YYYY-MM-DD HH24') AS date,
        SUM(gas_used::numeric) AS value
      FROM (
        SELECT date_trunc('hour', "timestamp") AS hour,
          gas_used
          FROM indexer.blocks
          WHERE "timestamp" > date_trunc('hour', now()) - interval '24 hours'
      ) t
      GROUP BY hour
      ORDER BY hour`,
      [],
    );
    return data.map((row) => ({
      date: dayjs(row.date).startOf('hour').utcOffset(0, true).toDate(),
      value: Number(row.value),
    }));
  }

  async getMaxGasUsed() {
    const data = await this.databaseConnection.query(
      `SELECT to_char(hour, 'YYYY-MM-DD HH24') AS date,
        MAX(gas_used::numeric) AS value
      FROM (
        SELECT date_trunc('hour', "timestamp") AS hour,
          gas_used
          FROM indexer.blocks
          WHERE "timestamp" > date_trunc('hour', now()) - interval '24 hours'
      ) t
      GROUP BY hour
      ORDER BY hour`,
      [],
    );
    return data.map((row) => ({
      date: dayjs(row.date).startOf('hour').utcOffset(0, true).toDate(),
      value: Number(row.value),
    }));
  }

  async getTotalFee() {
    // Optimized query using materialized view for pre-computed hourly statistics
    // View refreshes every 10 minutes and eliminates expensive JSON extraction
    const data = await this.databaseConnection.query(
      `SELECT to_char(hour, 'YYYY-MM-DD HH24') AS date,
        total_fee AS value
      FROM indexer.hourly_statistics
      WHERE hour > NOW() - INTERVAL '24 hours'
        AND hour <= date_trunc('hour', NOW())
      ORDER BY hour`,
      [],
    );
    return data.map((row) => ({
      date: dayjs(row.date).startOf('hour').utcOffset(0, true).toDate(),
      value: Number(row.value),
    }));
  }
}
