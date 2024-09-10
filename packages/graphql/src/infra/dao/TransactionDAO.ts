import { DateHelper } from '~/core/Date';
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

  async transactionsFeeStatistics(timeFilter: string) {
    const _interval = getTimeInterval(timeFilter);

    let query = `
        SELECT 
          (data->'status'->>'totalFee')::numeric AS fee,
          (t.data->'status'->>'time')::bigint AS timestamp
        FROM 
            indexer.transactions t
    `;

    // Add the time filtering condition only if an interval is defined
    if (_interval) {
      const intervalStartTimeInMilliseconds = Date.now() - _interval;
      const intervalStartTimeDate = new Date(intervalStartTimeInMilliseconds);
      const intervalStartTimeTai64 = DateHelper.dateToTai64(
        intervalStartTimeDate,
      );
      query += `
            WHERE 
              (t.data->'status'->>'time')::bigint >= ${intervalStartTimeTai64}
        `;
    }

    query += ' ORDER BY timestamp asc';

    // Execute the query
    const transactionsData = await this.databaseConnection.query(query, []);

    const results = {
      nodes: transactionsData,
    };
    return results;
  }

  async transactionsOffset(timeFilter: string) {
    const _interval = getTimeInterval(timeFilter);

    if (_interval) {
      const intervalStartTimeInMilliseconds = Date.now() - 60 * 60 * 1000 * 24;
      const intervalStartTimeDate = new Date(intervalStartTimeInMilliseconds);
      const intervalStartTimeTai64 = DateHelper.dateToTai64(
        intervalStartTimeDate,
      );

      const query = `
        SELECT
          COUNT(*)
        FROM indexer.transactions as t
        WHERE 
            (t.data->'status'->>'time')::bigint < ${intervalStartTimeTai64}
      `;

      const transactionOffsetCount = await this.databaseConnection.query(
        query,
        [],
      );
      return {
        transactionOffset: transactionOffsetCount[0].count,
      };
    }
    return {
      transactionOffset: 0,
    };
  }
}
