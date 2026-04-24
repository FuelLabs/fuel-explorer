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

  async findLatestBlockHeight(): Promise<number | null> {
    const [row] = await this.databaseConnection.query(
      'select _id from indexer.blocks order by _id desc limit 1',
      [],
    );
    return row ? row._id : null;
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
          b.timestamp as timestamp,
          b.transactions_count as transactionscount,
          pg_column_size(b.data) as blocksize
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
      transactionsCount: Number(block.transactionscount) || 0,
      blockSize: Number(block.blocksize) || 0,
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
        WHERE "timestamp" > date_trunc('hour', (
          SELECT MAX("timestamp") FROM indexer.blocks
        )) - interval '24 hours'
        AND "timestamp" < date_trunc('hour', (
          SELECT MAX("timestamp") FROM indexer.blocks
        ))
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
        WHERE "timestamp" > date_trunc('hour', (
          SELECT MAX("timestamp") FROM indexer.blocks
        )) - interval '24 hours'
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
        WHERE "timestamp" > date_trunc('hour', (
          SELECT MAX("timestamp") FROM indexer.blocks
        )) - interval '24 hours'
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
        WHERE "timestamp" > date_trunc('hour', (
          SELECT MAX("timestamp") FROM indexer.blocks
        )) - interval '23 hours'
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

  async getAverageTpsPerMinute() {
    const data = await this.databaseConnection.query(
      `SELECT to_char(minute, 'YYYY-MM-DD HH24:MI') AS date,
        SUM(transactions_count)::float / 60 AS value
      FROM (
        SELECT date_trunc('minute', "timestamp") AS minute,
          transactions_count
        FROM indexer.blocks
        WHERE "timestamp" > (
          SELECT MAX("timestamp") FROM indexer.blocks
        ) - INTERVAL '24 hours'
      ) t
      GROUP BY minute
      ORDER BY minute ASC`,
      [],
    );
    return data.map((row) => ({
      date: dayjs(row.date).startOf('minute').utcOffset(0, true).toDate(),
      value: Number(row.value) || 0,
    }));
  }

  async getRollingStats60s() {
    const [stats, peak] = await Promise.all([
      this.databaseConnection.query(
        `SELECT
          COALESCE(SUM(transactions_count)::float / 60, 0) AS tps,
          CASE WHEN COUNT(*) > 0 THEN SUM(transactions_count)::float / COUNT(*) ELSE 0 END AS avg_tx_per_block,
          CASE WHEN COUNT(*) > 0 THEN AVG(gas_used::numeric) ELSE 0 END AS avg_gas_per_block,
          CASE WHEN COUNT(*) > 0 THEN AVG(pg_column_size(data)) ELSE 0 END AS avg_block_size
        FROM indexer.blocks
        WHERE "timestamp" > (
          SELECT MAX("timestamp") FROM indexer.blocks
        ) - INTERVAL '60 seconds'`,
        [],
      ),
      this.databaseConnection.query(
        `SELECT COALESCE(MAX(minute_tps), 0) AS peak_tps
        FROM (
          SELECT SUM(transactions_count)::float / 60 AS minute_tps
          FROM indexer.blocks
          WHERE "timestamp" > (
            SELECT MAX("timestamp") FROM indexer.blocks
          ) - INTERVAL '24 hours'
          GROUP BY date_trunc('minute', "timestamp")
        ) t`,
        [],
      ),
    ]);
    return {
      tps: Number(stats[0]?.tps) || 0,
      avgTxPerBlock: Number(stats[0]?.avg_tx_per_block) || 0,
      avgGasPerBlock: Number(stats[0]?.avg_gas_per_block) || 0,
      avgBlockSize: Number(stats[0]?.avg_block_size) || 0,
      peakTps: Number(peak[0]?.peak_tps) || 0,
    };
  }

  async getAverageGasUsed() {
    const data = await this.databaseConnection.query(
      `SELECT to_char(hour, 'YYYY-MM-DD HH24') AS date,
        AVG(gas_used::numeric) AS value
      FROM (
        SELECT date_trunc('hour', "timestamp") AS hour,
          gas_used
          FROM indexer.blocks
          WHERE "timestamp" > date_trunc('hour', (
            SELECT MAX("timestamp") FROM indexer.blocks
          )) - interval '24 hours'
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
          WHERE "timestamp" > date_trunc('hour', (
            SELECT MAX("timestamp") FROM indexer.blocks
          )) - interval '24 hours'
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
          WHERE "timestamp" > date_trunc('hour', (
            SELECT MAX("timestamp") FROM indexer.blocks
          )) - interval '24 hours'
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
      FROM indexer.hourly_statistics_agg
      WHERE hour > (SELECT MAX(hour) FROM indexer.hourly_statistics_agg) - INTERVAL '24 hours'
        AND hour <= (SELECT MAX(hour) FROM indexer.hourly_statistics_agg)
      ORDER BY hour`,
      [],
    );
    return data.map((row) => ({
      date: dayjs(row.date).startOf('hour').utcOffset(0, true).toDate(),
      value: Number(row.value),
    }));
  }
}
