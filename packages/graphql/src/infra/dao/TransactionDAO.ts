import { isB256, isBech32 } from 'fuels';
import { TransactionEntity } from '~/domain/Transaction/TransactionEntity';
import { DatabaseConnection } from '../database/DatabaseConnection';
import PaginatedParams from '../paginator/PaginatedParams';
import { getTimeInterval } from './utils';

export default class TransactionDAO {
  databaseConnection: DatabaseConnection;

  constructor() {
    this.databaseConnection = DatabaseConnection.getInstance();
  }

  async getByHash(txHash: string) {
    const transactionData = (
      await this.databaseConnection.query(
        `
		  select
			  t.*
		  from
			  indexer.transactions t
		  where
			  t.tx_hash = $1
		  `,
        [txHash],
      )
    )[0];
    if (!transactionData) return;
    return TransactionEntity.createFromDAO(transactionData);
  }

  async getPaginatedTransactionsByOwner(
    accountHash: string,
    paginatedParams: PaginatedParams,
  ) {
    const direction = paginatedParams.direction === 'before' ? '<' : '>';
    const order = paginatedParams.direction === 'before' ? 'desc' : 'asc';
    const transactionsData = await this.databaseConnection.query(
      `
		select
			t.*
		from
			indexer.transactions t
		where
			t.tx_hash in (
				select
					ta.tx_hash
				from
					indexer.transactions_accounts ta
				where
					ta.account_hash = $1 and
					($2::text is null or ta._id ${direction} $2)
				order by
					ta._id ${order}
				limit
					10
			)
		`,
      [accountHash, paginatedParams.cursor],
    );
    transactionsData.sort((a: any, b: any) => {
      return a._id.localeCompare(b._id) * -1;
    });
    const transactions = [];
    for (const transactionData of transactionsData) {
      transactions.push(TransactionEntity.createFromDAO(transactionData));
    }
    if (transactions.length === 0) {
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
    const startCursor = transactionsData[0]._id;
    const endCursor = transactionsData[transactionsData.length - 1]._id;
    const hasPreviousPage = (
      await this.databaseConnection.query(
        'select exists(select 1 from indexer.transactions_accounts ta where ta._id < $1 and ta.account_hash = $2)',
        [endCursor, accountHash],
      )
    )[0].exists;
    const hasNextPage = (
      await this.databaseConnection.query(
        'select exists(select 1 from indexer.transactions_accounts ta where ta._id > $1 and ta.account_hash = $2)',
        [startCursor, accountHash],
      )
    )[0].exists;
    const newNodes = transactions.map((n) => n.toGQLNode());
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

  async getPaginatedTransactions(paginatedParams: PaginatedParams) {
    const direction = paginatedParams.direction === 'before' ? '<' : '>';
    const order = paginatedParams.direction === 'before' ? 'desc' : 'asc';
    const transactionsData = await this.databaseConnection.query(
      `
		select 
			*
		from 
			indexer.transactions t
		where
			$1::text is null or t._id ${direction} $1
		order by
			t._id ${order} 
		limit 10
	`,
      [paginatedParams.cursor],
    );
    transactionsData.sort((a: any, b: any) => {
      return a._id.localeCompare(b._id) * -1;
    });
    const transactions = [];
    for (const transactionData of transactionsData) {
      transactions.push(TransactionEntity.createFromDAO(transactionData));
    }
    if (transactions.length === 0) {
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
    const startCursor = transactionsData[0]._id;
    const endCursor = transactionsData[transactionsData.length - 1]._id;
    const hasPreviousPage = (
      await this.databaseConnection.query(
        'select exists(select 1 from indexer.transactions where _id < $1)',
        [endCursor],
      )
    )[0].exists;
    const hasNextPage = (
      await this.databaseConnection.query(
        'select exists(select 1 from indexer.transactions where _id > $1)',
        [startCursor],
      )
    )[0].exists;
    const newNodes = transactions.map((n) => n.toGQLNode());
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

  async getTransactionsByOwner(accountHash: string) {
    const transactionsData = await this.databaseConnection.query(
      `
		select
			t.*
		from
			indexer.transactions t
		where
			t.tx_hash in (
				select
					ta.tx_hash
				from
					indexer.transactions_accounts ta
				where
					ta.account_hash = $1
				order by
					ta._id desc
				limit
					5
			)
		`,
      [accountHash],
    );
    const transactions = [];
    for (const transactionData of transactionsData) {
      transactions.push(TransactionEntity.createFromDAO(transactionData));
    }
    return transactions;
  }

  async getPaginatedTransactionsByBlockId(
    blockId: string,
    paginatedParams: PaginatedParams,
  ) {
    let height = blockId;
    if (isB256(blockId) || isBech32(blockId)) {
      const [block] = await this.databaseConnection.query(
        `
			select
				b._id
			from
				indexer.blocks b
			where
				b.id = $1
		`,
        [blockId],
      );
      height = block._id;
    }
    const direction = paginatedParams.direction === 'before' ? '<' : '>';
    const order = paginatedParams.direction === 'before' ? 'desc' : 'asc';
    const transactionsData = await this.databaseConnection.query(
      `
		select
			t.*
		from
			indexer.transactions t
		where
			t.block_id = $1 and
			($2::text is null or t._id ${direction} $2)
		order by
			t._id ${order}
		limit
			10
		`,
      [height, paginatedParams.cursor],
    );
    transactionsData.sort((a: any, b: any) => {
      return a._id.localeCompare(b._id) * -1;
    });
    const transactions = [];
    for (const transactionData of transactionsData) {
      transactions.push(TransactionEntity.createFromDAO(transactionData));
    }
    if (transactions.length === 0) {
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
    const startCursor = transactionsData[0]._id;
    const endCursor = transactionsData[transactionsData.length - 1]._id;
    const hasPreviousPage = (
      await this.databaseConnection.query(
        'select exists(select 1 from indexer.transactions t where t._id < $1 and t.block_id = $2)',
        [endCursor, height],
      )
    )[0].exists;
    const hasNextPage = (
      await this.databaseConnection.query(
        'select exists(select 1 from indexer.transactions t where t._id > $1 and t.block_id = $2)',
        [startCursor, height],
      )
    )[0].exists;
    const newNodes = transactions.map((n) => n.toGQLNode());
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

  async findLatestStatistics() {
    const [result] = await this.databaseConnection.query(
      `
        SELECT * FROM indexer.transaction_statistics
        ORDER BY timestamp DESC
        LIMIT 1
      `,
      [],
    );
    return result;
  }

  async getEarliestTransactionTimestamp(): Promise<string> {
    const [result] = await this.databaseConnection.query(
      `
      SELECT timestamp
      FROM indexer.transactions
      ORDER BY timestamp ASC
      LIMIT 1
      `,
      [],
    );
    return result ? result.timestamp : null;
  }

  async getTransactionsInRange(startTimestamp: string, endTimestamp: string) {
    const transactionsData = await this.databaseConnection.query(
      `
        SELECT
          (data->'status'->>'totalFee')::numeric AS fee,
          (data->'status'->>'totalGas')::numeric AS gas,
          block_id
        FROM 
          indexer.transactions
        WHERE 
          timestamp >= $1  AND timestamp < $2
        ORDER BY block_id ASC
      `,
      [startTimestamp, endTimestamp],
    );
    return transactionsData;
  }

  async insertTransactionStatistics(
    timestamp: string,
    start_block: number,
    end_block: number,
    transaction_count: number,
    transaction_count_cumulative: number,
    gas_used: number,
    gas_used_cumulative: number,
    fee_spent: number,
    fee_spent_cumulative: number,
  ) {
    await this.databaseConnection.query(
      `
        INSERT INTO indexer.transaction_statistics (timestamp, start_block, end_block, transaction_count, transaction_count_cumulative, gas_used, gas_used_cumulative, fee_spent, fee_spent_cumulative)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
      [
        timestamp,
        start_block,
        end_block,
        transaction_count,
        transaction_count_cumulative,
        gas_used,
        gas_used_cumulative,
        fee_spent,
        fee_spent_cumulative,
      ],
    );
  }

  async getTransactionsStatistics(timeFilter: string) {
    const _hours = getTimeInterval(timeFilter);
    let query;
    if (timeFilter === '1day') {
      query = `
        SELECT 
          to_char(t.timestamp, 'dd/mm/yyyy HH') as time,
          sum(t.transaction_count::numeric) as tx_count 
        FROM 
          indexer.transaction_statistics t
      `;
    } else {
      query = `
        SELECT 
          to_char(t.timestamp, 'dd/mm/yyyy') as time,
          sum(t.transaction_count::numeric) as tx_count 
        FROM 
          indexer.transaction_statistics t
      `;
    }

    if (_hours !== null) {
      query += `
        WHERE t.timestamp > (now() - interval '${_hours} hours')
      `;
    }
    if (timeFilter === '1day') {
      query += `
        GROUP BY to_char(t.timestamp, 'dd/mm/yyyy HH');
      `;
    } else {
      query += `
        GROUP BY to_char(t.timestamp, 'dd/mm/yyyy');
      `;
    }
    const result = await this.databaseConnection.query(query, []);
    return {
      nodes: result,
    };
  }

  async getTransactionFeeStatistics(timeFilter: string) {
    const _hours = getTimeInterval(timeFilter);
    let query;
    if (timeFilter === '1day') {
      query = `
        SELECT
          to_char(t.timestamp, 'dd/mm/yyyy HH') as time,
          sum(t.transaction_count::numeric) as tx_count,
          sum(t.fee_spent::numeric) as fee_spent 
        FROM 
          indexer.transaction_statistics t
      `;
    } else {
      query = `
        SELECT 
          to_char(t.timestamp, 'dd/mm/yyyy') as time,
          sum(t.transaction_count::numeric) as tx_count,
          sum(t.fee_spent::numeric) as fee_spent 
        FROM 
          indexer.transaction_statistics t
      `;
    }

    if (_hours !== null) {
      query += `
        WHERE t.timestamp > (now() - interval '${_hours} hours')
      `;
    }
    if (timeFilter === '1day') {
      query += `
        GROUP BY to_char(t.timestamp, 'dd/mm/yyyy HH');
      `;
    } else {
      query += `
        GROUP BY to_char(t.timestamp, 'dd/mm/yyyy');
      `;
    }
    const result = await this.databaseConnection.query(query, []);
    return {
      nodes: result,
    };
  }

  async getCumulativeFeeStatistics(timeFilter: string) {
    const _hours = getTimeInterval(timeFilter);
    let query;

    if (timeFilter === '1day') {
      query = `
        WITH ranked_transactions AS (
          SELECT
            to_char(t.timestamp, 'dd/mm/yyyy HH') as time,
            t.fee_spent_cumulative,
            ROW_NUMBER() OVER (PARTITION BY to_char(t.timestamp, 'dd/mm/yyyy HH') ORDER BY t.timestamp DESC) as row_num
          FROM 
            indexer.transaction_statistics t
        `;
    } else {
      query = `
        WITH ranked_transactions AS (
          SELECT
            to_char(t.timestamp, 'dd/mm/yyyy') as time,
            t.fee_spent_cumulative,
            ROW_NUMBER() OVER (PARTITION BY to_char(t.timestamp, 'dd/mm/yyyy') ORDER BY t.timestamp DESC) as row_num
          FROM 
            indexer.transaction_statistics t
        `;
    }

    if (_hours !== null) {
      query += `
          WHERE t.timestamp > (now() - interval '${_hours} hours')
        `;
    }

    query += `
        )
        SELECT
          time,
          fee_spent_cumulative as fee_spent_cumulative
        FROM ranked_transactions
        WHERE row_num = 1
    `;

    const result = await this.databaseConnection.query(query, []);
    return {
      nodes: result,
    };
  }

  async getCumulativeTransactionStatistics(timeFilter: string) {
    const _hours = getTimeInterval(timeFilter);
    let query;

    if (timeFilter === '1day') {
      query = `
        WITH ranked_transactions AS (
          SELECT
            to_char(t.timestamp, 'dd/mm/yyyy HH') as time,
            t.transaction_count_cumulative,
            ROW_NUMBER() OVER (PARTITION BY to_char(t.timestamp, 'dd/mm/yyyy HH') ORDER BY t.timestamp DESC) as row_num
          FROM 
            indexer.transaction_statistics t
        `;
    } else {
      query = `
        WITH ranked_transactions AS (
          SELECT
            to_char(t.timestamp, 'dd/mm/yyyy') as time,
            t.transaction_count_cumulative,
            ROW_NUMBER() OVER (PARTITION BY to_char(t.timestamp, 'dd/mm/yyyy') ORDER BY t.timestamp DESC) as row_num
          FROM 
            indexer.transaction_statistics t
        `;
    }

    if (_hours !== null) {
      query += `
          WHERE t.timestamp > (now() - interval '${_hours} hours')
        `;
    }

    query += `
        )
        SELECT
          time,
          transaction_count_cumulative
        FROM ranked_transactions
        WHERE row_num = 1
    `;

    const result = await this.databaseConnection.query(query, []);
    return {
      nodes: result,
    };
  }
}
