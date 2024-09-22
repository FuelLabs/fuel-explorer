import { isB256, isBech32 } from 'fuels';
import { DateHelper } from '~/core/Date';
import { TransactionEntity } from '~/domain/Transaction/TransactionEntity';
import { DatabaseConnection } from '../database/DatabaseConnection';
import PaginatedParams from '../paginator/PaginatedParams';
import { generateDateIntervals, getTimeInterval } from './utils';

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

  // Fetch transactions by a specific date (daily filter)
  async getDailyActiveAccounts(timeFilter: string): Promise<any[]> {
    let interval = getTimeInterval(timeFilter);

    // If no interval get the first transaction timestamp
    if (!interval) {
      // Fetch the first transaction
      const firstTransactionQuery = `
        SELECT timestamp
        FROM indexer.transactions
        ORDER BY timestamp ASC
        LIMIT 1
      `;
      const firstTransactionData = await this.databaseConnection.query(
        firstTransactionQuery,
        [],
      );

      if (firstTransactionData.length === 0) {
        throw new Error('Failed to fetch first transaction');
      }
      const txDate = new Date(firstTransactionData[0].timestamp);
      interval = Date.now() - txDate.getTime();
    }

    // Calculate start and end date
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - interval);

    // Generate daily intervals between the start and end dates
    const dates = generateDateIntervals(startDate, endDate);

    const dailyActiveAccounts = [];

    // Iterate through each day and fetch transactions and unique accounts
    for (const date of dates) {
      const startDateTime = `${date} 00:00:00`;
      const endDateTime = `${date} 23:59:59`;

      // Fetch transactions for the day
      const transactionsQuery = `
        SELECT tx_hash
        FROM indexer.transactions
        WHERE timestamp >= '${startDateTime}' AND timestamp <= '${endDateTime}'
      `;
      const transactionsData = await this.databaseConnection.query(
        transactionsQuery,
        [],
      );
      const txHashes = transactionsData.map((tx: any) => tx.tx_hash);

      // If no transactions for the day, continue to next date
      if (txHashes.length === 0) continue;

      // Fetch unique accounts involved in those transactions
      const accountsQuery = `
        SELECT DISTINCT account_hash
        FROM indexer.transactions_accounts
        WHERE tx_hash = ANY($1)
      `;
      const accountsData = await this.databaseConnection.query(accountsQuery, [
        txHashes,
      ]);
      const uniqueAccounts = accountsData.map((acc: any) => acc.account_hash);

      const timestamp = new Date(startDateTime);
      // Add the daily active accounts count
      dailyActiveAccounts.push({
        timestamp: timestamp,
        count: uniqueAccounts.length,
      });
    }

    return dailyActiveAccounts;
  }

  async getTransactionsByAccountAndDate(
    account: string,
    startDate: string,
    endDate: string,
  ) {
    const query = `
      WITH filtered_accounts AS (
        SELECT ta.tx_hash
        FROM indexer.transactions_accounts ta
        WHERE ta.account_hash = $1
      )
      SELECT t.tx_hash, t.timestamp, t.data
      FROM indexer.transactions t
      JOIN filtered_accounts fa ON t.tx_hash = fa.tx_hash
      WHERE t.timestamp BETWEEN $2 AND $3
    `;

    const result = await this.databaseConnection.query(query, [
      account,
      startDate,
      endDate,
    ]);

    const transactions = result.map((tx: any) => {
      const inputs = tx.data?.inputs || [];
      const outputs = tx.data?.outputs || [];
      const receipts = tx.data?.status?.receipts || [];

      const totalGas = receipts.reduce((sum: number, receipt: any) => {
        return sum + (parseInt(receipt.gasUsed, 10) || 0);
      }, 0);

      const totalFee = tx.data?.policies?.maxFee || tx.data?.totalFee || null;
      const isMint =
        typeof tx.data?.isMint !== 'undefined' ? tx.data.isMint : null;

      const extractedInputs = inputs.map((input: any) => {
        switch (input.__typename) {
          case 'InputCoin':
            return {
              __typename: 'InputCoin',
              owner: input.owner || null,
              amount: input.amount || null,
              assetId: input.assetId || null,
              utxoId: input.utxoId || null,
              txPointer: input.txPointer || null,
              witnessIndex: input.witnessIndex || null,
            };
          case 'InputContract':
            return {
              __typename: 'InputContract',
              contractId: input.contractId || null,
              balanceRoot: input.balanceRoot || null,
              stateRoot: input.stateRoot || null,
              txPointer: input.txPointer || null,
              utxoId: input.utxoId || null,
            };
          case 'InputMessage':
            return {
              __typename: 'InputMessage',
              sender: input.sender || null,
              recipient: input.recipient || null,
              amount: input.amount || null,
              nonce: input.nonce || null,
            };
          default:
            return {};
        }
      });

      const extractedOutputs = outputs.map((output: any) => {
        switch (output.__typename) {
          case 'VariableOutput':
            return {
              __typename: 'VariableOutput',
              to: output.to || null,
              amount: output.amount || null,
              assetId: output.assetId || null,
            };
          case 'ChangeOutput':
            return {
              __typename: 'ChangeOutput',
              to: output.to || null,
              amount: output.amount || null,
              assetId: output.assetId || null,
            };
          case 'ContractOutput':
            return {
              __typename: 'ContractOutput',
              inputIndex: output.inputIndex || null,
              balanceRoot: output.balanceRoot || null,
              stateRoot: output.stateRoot || null,
            };
          default:
            return {};
        }
      });

      return {
        tx_hash: tx.tx_hash,
        timestamp: tx.timestamp,
        totalGas: totalGas || null,
        totalFee: totalFee,
        isMint: isMint,
        inputs: extractedInputs.length ? extractedInputs : [],
        outputs: extractedOutputs.length ? extractedOutputs : [],
      };
    });

    return transactions;
  }
}
