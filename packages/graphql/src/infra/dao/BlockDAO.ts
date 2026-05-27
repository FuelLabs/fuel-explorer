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

  // The window-anchor `MAX("timestamp")` is computed once via getMaxTimestamp()
  // and passed in as $1. Embedding the subquery turned the WHERE filter into a
  // runtime parameter the planner can't size, which made it pick a Parallel Seq
  // Scan over the whole 50M-row blocks table. With $1 bound to a literal, the
  // planner uses the histogram on `timestamp` and picks an Index Scan on
  // blocks_timestamp_idx that touches only the recent ~89K rows.

  async getMaxTimestamp(): Promise<Date | null> {
    const [row] = await this.databaseConnection.query(
      'SELECT MAX("timestamp") AS max_ts FROM indexer.blocks',
      [],
    );
    return row?.max_ts ?? null;
  }

  async tps(maxTs: Date | null) {
    if (!maxTs) return { nodes: [] };
    const data = await this.databaseConnection.query(
      `SELECT to_char(date_trunc('hour', "timestamp"), 'YYYY-MM-DD HH24') AS date,
        SUM(transactions_count) AS total_tps,
        SUM(gas_used::int) AS total_gas_used
      FROM indexer.blocks
      WHERE "timestamp" >  date_trunc('hour', $1::timestamptz) - INTERVAL '24 hours'
        AND "timestamp" <  date_trunc('hour', $1::timestamptz)
      GROUP BY 1
      ORDER BY 1 ASC`,
      [maxTs],
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

  // Single scan that emits all six per-hour aggregates the dashboard needs.
  // Replaces six individual queries (getTotalTps/getAverageTps/getMaxTps and
  // their gas equivalents) which were each doing the same 24h scan.
  async getHourlyStatistics(maxTs: Date | null) {
    const empty = {
      totalTps: [],
      averageTps: [],
      maxTps: [],
      totalGasUsed: [],
      averageGasUsed: [],
      maxGasUsed: [],
    };
    if (!maxTs) return empty;
    const rows = await this.databaseConnection.query(
      `SELECT to_char(date_trunc('hour', "timestamp"), 'YYYY-MM-DD HH24') AS date,
        SUM(transactions_count)::numeric AS sum_txs,
        AVG(transactions_count)::numeric AS avg_txs,
        MAX(transactions_count)::numeric AS max_txs,
        SUM(gas_used::numeric) AS sum_gas,
        AVG(gas_used::numeric) AS avg_gas,
        MAX(gas_used::numeric) AS max_gas
      FROM indexer.blocks
      WHERE "timestamp" > date_trunc('hour', $1::timestamptz) - INTERVAL '24 hours'
      GROUP BY 1
      ORDER BY 1`,
      [maxTs],
    );
    const toBucket = (col: string) =>
      rows.map((r: any) => ({
        date: dayjs(r.date).startOf('hour').utcOffset(0, true).toDate(),
        value: Number(r[col]),
      }));
    // The legacy getMaxTps used a 23-hour window (vs 24h here); preserve the
    // historical entry count to keep any external SDK consumer's expectations
    // intact.
    return {
      totalTps: toBucket('sum_txs'),
      averageTps: toBucket('avg_txs'),
      maxTps: toBucket('max_txs').slice(-24),
      totalGasUsed: toBucket('sum_gas'),
      averageGasUsed: toBucket('avg_gas'),
      maxGasUsed: toBucket('max_gas'),
    };
  }

  async getAverageTpsPerMinute(maxTs: Date | null) {
    if (!maxTs) return [];
    const data = await this.databaseConnection.query(
      `SELECT to_char(date_trunc('minute', "timestamp"), 'YYYY-MM-DD HH24:MI') AS date,
        SUM(transactions_count)::float / 60 AS value
      FROM indexer.blocks
      WHERE "timestamp" > $1::timestamptz - INTERVAL '24 hours'
      GROUP BY 1
      ORDER BY 1 ASC`,
      [maxTs],
    );
    return data.map((row) => ({
      date: dayjs(row.date).startOf('minute').utcOffset(0, true).toDate(),
      value: Number(row.value) || 0,
    }));
  }

  async getRollingStats60s(maxTs: Date | null) {
    if (!maxTs) {
      return {
        tps: 0,
        avgTxPerBlock: 0,
        avgGasPerBlock: 0,
        avgBlockSize: 0,
        peakTps: 0,
      };
    }
    const [stats, peak] = await Promise.all([
      this.databaseConnection.query(
        `SELECT
          COALESCE(SUM(transactions_count)::float / 60, 0) AS tps,
          CASE WHEN COUNT(*) > 0 THEN SUM(transactions_count)::float / COUNT(*) ELSE 0 END AS avg_tx_per_block,
          CASE WHEN COUNT(*) > 0 THEN AVG(gas_used::numeric) ELSE 0 END AS avg_gas_per_block,
          CASE WHEN COUNT(*) > 0 THEN AVG(pg_column_size(data)) ELSE 0 END AS avg_block_size
        FROM indexer.blocks
        WHERE "timestamp" > $1::timestamptz - INTERVAL '60 seconds'`,
        [maxTs],
      ),
      this.databaseConnection.query(
        `SELECT COALESCE(MAX(minute_tps), 0) AS peak_tps
        FROM (
          SELECT SUM(transactions_count)::float / 60 AS minute_tps
          FROM indexer.blocks
          WHERE "timestamp" > $1::timestamptz - INTERVAL '24 hours'
          GROUP BY date_trunc('minute', "timestamp")
        ) t`,
        [maxTs],
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
