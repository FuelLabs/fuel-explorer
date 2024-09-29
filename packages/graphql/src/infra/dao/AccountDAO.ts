import { AccountEntity } from '../../domain/Account/AccountEntity';
import { DatabaseConnection } from '../database/DatabaseConnection';
import { getTimeInterval } from './utils';

export default class AccountDAO {
  private databaseConnection: DatabaseConnection;

  constructor() {
    this.databaseConnection = DatabaseConnection.getInstance();
  }

  // Keep this method as it is still being used
  async getAccountById(id: string): Promise<AccountEntity | null> {
    const result = await this.databaseConnection.query(
      `
      SELECT * FROM indexer.accounts WHERE account_id = $1
      `,
      [id],
    );

    return result.length ? AccountEntity.create(result[0]) : null;
  }

  // Optionally keep this method if you need it elsewhere
  async getAccountDataContent(account_id: string): Promise<any | null> {
    const result = await this.databaseConnection.query(
      `
      SELECT data FROM indexer.accounts WHERE account_id = $1
      `,
      [account_id],
    );

    return result.length ? result[0].data : null;
  }

  async getPaginatedAccounts(
    sortBy = 'transaction_count',
    sortOrder: 'asc' | 'desc' = 'desc',
    first?: number | null,
    cursor?: string,
  ) {
    let cursorCondition = '';
    const queryParams: (number | string)[] = [];

    if (cursor !== undefined && cursor !== null) {
      cursorCondition = `AND row_num ${sortOrder === 'asc' ? '<' : '>'} $${
        queryParams.length + 1
      }`;
      queryParams.push(cursor);
    }

    const limitClause =
      first !== undefined && first !== null
        ? `LIMIT $${queryParams.length + 1}`
        : '';

    if (first !== undefined && first !== null) {
      queryParams.push(first);
    }

    const accountsData = await this.databaseConnection.query(
      `
        WITH ranked_accounts AS (
          SELECT 
            ROW_NUMBER() OVER (ORDER BY ${sortBy} ${sortOrder}) AS row_num,
            _id as id, 
            account_id, 
            balance, 
            transaction_count, 
            first_transaction_timestamp, 
            recent_transaction_timestamp
          FROM 
            indexer.accounts
        )
        SELECT *
        FROM ranked_accounts
        WHERE TRUE ${cursorCondition}
        ORDER BY ${sortBy} ${sortOrder}
        ${limitClause}
      `,
      queryParams,
    );

    // Handle case where no data is returned
    if (!accountsData.length) {
      return {
        nodes: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          endCursor: null,
          startCursor: null,
        },
      };
    }

    const startCursor = accountsData[0]?.row_num;
    const endCursor = accountsData[accountsData.length - 1]?.row_num;

    const hasPreviousPage = startCursor > 1;

    const hasNextPage =
      first !== undefined && first !== null && accountsData.length === first;

    return {
      nodes: accountsData.map((account) => ({
        ...account,
        id: account.id || null, // Ensure 'id' is either present or set to null
      })),
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        endCursor,
        startCursor,
      },
    };
  }

  // Retrieve the latest account statistics (for cumulative calculations)
  async findLatestStatistics() {
    const [result] = await this.databaseConnection.query(
      `
        SELECT * FROM indexer.account_statistics
        ORDER BY timestamp DESC
        LIMIT 1
      `,
      [],
    );
    return result;
  }

  // Retrieve the earliest account timestamp
  async getEarliestAccountTimestamp(): Promise<string> {
    const [result] = await this.databaseConnection.query(
      `
        SELECT timestamp
        FROM indexer.accounts
        ORDER BY timestamp ASC
        LIMIT 1
      `,
      [],
    );
    return result ? result.timestamp : null;
  }

  // Insert new statistics for accounts
  async insertAccountStatistics(
    timestamp: string,
    new_accounts: number,
    active_accounts: number,
    cumulative_accounts: number,
  ) {
    await this.databaseConnection.query(
      `
        INSERT INTO indexer.account_statistics (timestamp, new_accounts, active_accounts, cumulative_accounts)
        VALUES ($1, $2, $3, $4)
      `,
      [timestamp, new_accounts, active_accounts, cumulative_accounts],
    );
  }

  // Get account statistics within a specified time range
  async getAccountsInRange(startTimestamp: string, endTimestamp: string) {
    const accountsData = await this.databaseConnection.query(
      `
        SELECT *
        FROM indexer.accounts
        WHERE timestamp >= $1 AND timestamp < $2
        ORDER BY timestamp ASC
      `,
      [startTimestamp, endTimestamp],
    );
    return accountsData;
  }

  // Get new account statistics over a specified time filter
  async getNewAccountStatistics(timeFilter: string) {
    const _hours = getTimeInterval(timeFilter);
    let query;
    if (timeFilter === '1day') {
      query = `
        SELECT 
          to_char(t.timestamp, 'dd/mm/yyyy HH') as time,
          sum(t.new_accounts::numeric) as new_accounts 
        FROM 
          indexer.account_statistics t
      `;
    } else {
      query = `
        SELECT 
          to_char(t.timestamp, 'dd/mm/yyyy') as time,
          sum(t.new_accounts::numeric) as new_accounts 
        FROM 
          indexer.account_statistics t
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

  // Get daily active account statistics over a specified time filter
  async getDailyActiveAccountStatistics(timeFilter: string) {
    const _hours = getTimeInterval(timeFilter);
    let query;
    if (timeFilter === '1day') {
      query = `
        SELECT 
          to_char(t.timestamp, 'dd/mm/yyyy HH') as time,
          sum(t.active_accounts::numeric) as active_accounts 
        FROM 
          indexer.account_statistics t
      `;
    } else {
      query = `
        SELECT 
          to_char(t.timestamp, 'dd/mm/yyyy') as time,
          sum(t.active_accounts::numeric) as active_accounts 
        FROM 
          indexer.account_statistics t
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

  // Get cumulative account statistics over a specified time filter
  async getCumulativeAccountStatistics(timeFilter: string) {
    const _hours = getTimeInterval(timeFilter);
    let query;

    if (timeFilter === '1day') {
      query = `
        WITH ranked_accounts AS (
          SELECT
            to_char(t.timestamp, 'dd/mm/yyyy HH') as time,
            t.cumulative_accounts,
            ROW_NUMBER() OVER (PARTITION BY to_char(t.timestamp, 'dd/mm/yyyy HH') ORDER BY t.timestamp DESC) as row_num
          FROM 
            indexer.account_statistics t
        `;
    } else {
      query = `
        WITH ranked_accounts AS (
          SELECT
            to_char(t.timestamp, 'dd/mm/yyyy') as time,
            t.cumulative_accounts,
            ROW_NUMBER() OVER (PARTITION BY to_char(t.timestamp, 'dd/mm/yyyy') ORDER BY t.timestamp DESC) as row_num
          FROM 
            indexer.account_statistics t
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
          cumulative_accounts
        FROM ranked_accounts
        WHERE row_num = 1
    `;

    const result = await this.databaseConnection.query(query, []);
    return {
      nodes: result,
    };
  }

  async getDailyActiveAccountsInRange(
    startTimestamp: string,
    endTimestamp: string,
  ) {
    const activeAccountsData = await this.databaseConnection.query(
      `
        SELECT DISTINCT account_id
        FROM indexer.transactions
        WHERE timestamp >= $1 AND timestamp < $2
      `,
      [startTimestamp, endTimestamp],
    );

    return activeAccountsData.length; // Number of unique active accounts in the range
  }
}
