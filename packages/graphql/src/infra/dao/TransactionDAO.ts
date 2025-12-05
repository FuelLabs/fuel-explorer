import { isB256 } from 'fuels';
import { TransactionEntity } from '~/domain/Transaction/TransactionEntity';
import { DatabaseConnectionReplica } from '../database/DatabaseConnectionReplica';
import type PaginatedParams from '../paginator/PaginatedParams';

export default class TransactionDAO {
  databaseConnection: DatabaseConnectionReplica;

  constructor() {
    this.databaseConnection = DatabaseConnectionReplica.getInstance();
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
        [txHash.toLowerCase()],
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
      select t.*, ta._id as ta_id
      from indexer.transactions_accounts ta
      inner join indexer.transactions t on t.tx_hash = ta.tx_hash
      where ta.account_hash = $1 and ($2::text is null or ta._id ${direction} $2)
      order by ta._id ${order}
      limit 10
      `,
      [accountHash.toLowerCase(), paginatedParams.cursor],
    );

    transactionsData.sort((a: any, b: any) => {
      return a.ta_id.localeCompare(b.ta_id) * -1;
    });

    if (transactionsData.length === 0) {
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

    const transactions = [];
    for (const transactionData of transactionsData) {
      transactions.push(TransactionEntity.createFromDAO(transactionData));
    }

    // Use ta_id (transactions_accounts._id) for cursors, not t._id
    const startCursor = transactionsData[0].ta_id;
    const endCursor = transactionsData[transactionsData.length - 1].ta_id;

    // Check pagination + bounded counts (stops at 1001 to avoid full scan)
    const [paginationInfo] = await this.databaseConnection.query(
      `
      select
        exists(select 1 from indexer.transactions_accounts where account_hash = $1 and _id < $2 limit 1) as has_prev,
        exists(select 1 from indexer.transactions_accounts where account_hash = $1 and _id > $3 limit 1) as has_next,
        (select count(*) from (select 1 from indexer.transactions_accounts where account_hash = $1 limit 1001) sub) as total_count,
        (select count(*) from (select 1 from indexer.transactions_accounts where account_hash = $1 and _id > $3 limit 1001) sub) as items_before
      `,
      [accountHash.toLowerCase(), endCursor, startCursor],
    );

    const hasPreviousPage = paginationInfo?.has_prev || false;
    const hasNextPage = paginationInfo?.has_next || false;
    // Capped at 1000 to avoid slow full counts; frontend shows "1000+" when totalCount === 1000
    const itemsBefore = Math.min(
      Number(paginationInfo?.items_before) || 0,
      1000,
    );
    const pageSize = transactionsData.length;
    const newNodes = transactions.map((n) => n.toGQLListNode());

    const edges = newNodes.map((node) => ({
      node,
      cursor: paginatedParams.cursor,
    }));

    return {
      nodes: newNodes,
      edges,
      pageInfo: {
        startCount: itemsBefore + 1,
        endCount: itemsBefore + pageSize,
        totalCount: Math.min(Number(paginationInfo?.total_count) || 0, 1000),
        hasNextPage,
        hasPreviousPage,
        endCursor,
        startCursor,
      },
    };
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
		limit $2
	`,
      [paginatedParams.cursor, paginatedParams.last],
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
    const newNodes = transactions.map((n) => n.toGQLListNode());

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

  async accountExists(accountHash: string): Promise<boolean> {
    // Fast check: does this account have any transactions?
    // Used for search validation only
    const result = await this.databaseConnection.query(
      'SELECT EXISTS(SELECT 1 FROM indexer.transactions_accounts WHERE account_hash = $1) as exists',
      [accountHash.toLowerCase()],
    );

    return result[0]?.exists || false;
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
				select distinct on (tx_hash)
					tx_hash
				from
					indexer.transactions_accounts
				where
					account_hash = $1
				order by
					tx_hash, _id desc
				limit 5
			)
		order by
			t._id desc
		`,
      [accountHash.toLowerCase()],
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
    if (isB256(blockId)) {
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
    const [previousRows] = await this.databaseConnection.query(
      'select count(*)::integer as count from indexer.transactions where _id > $1 and block_id = $2',
      [startCursor, height],
    );
    const [totalCount] = await this.databaseConnection.query(
      'select count(*)::integer as count from indexer.transactions where block_id = $1',
      [height],
    );
    const newNodes = transactions.map((n) => n.toGQLListNode());

    const edges = newNodes.map((node) => ({
      node,
      cursor: paginatedParams.cursor,
    }));
    const paginatedResults = {
      nodes: newNodes,
      edges,
      pageInfo: {
        startCount: previousRows.count + 1,
        endCount: previousRows.count + paginatedParams.last,
        totalCount: totalCount.count,
        hasNextPage,
        hasPreviousPage,
        endCursor,
        startCursor,
      },
    };

    return paginatedResults;
  }
}
