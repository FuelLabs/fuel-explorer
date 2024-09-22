import { AccountEntity } from '../../domain/Account/AccountEntity';
import { DatabaseConnection } from '../database/DatabaseConnection';
import { getTimeInterval } from './utils';

export default class AccountDAO {
  private databaseConnection: DatabaseConnection;

  constructor() {
    this.databaseConnection = DatabaseConnection.getInstance();
  }

  // Custom function to stringify BigInt values
  private stringifyBigInt(data: any): string {
    return JSON.stringify(data, (_key, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    );
  }

  async save(account: AccountEntity, blockTransactionTime: Date) {
    const accountData = AccountEntity.toDBItem(account);

    const balance = accountData.balance.toString();
    const data = this.stringifyBigInt(accountData.data);

    // Use raw SQL query to insert or update the account record
    await this.databaseConnection.query(
      `
      INSERT INTO indexer.accounts (account_id, balance, transaction_count, data, first_transaction_timestamp, recent_transaction_timestamp)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (account_id)
      DO UPDATE SET
        balance = EXCLUDED.balance,
        transaction_count = EXCLUDED.transaction_count,
        data = EXCLUDED.data,
        recent_transaction_timestamp = CASE
          WHEN accounts.transaction_count <> EXCLUDED.transaction_count THEN EXCLUDED.recent_transaction_timestamp
          ELSE accounts.recent_transaction_timestamp
        END
      `,
      [
        accountData.account_id,
        balance,
        accountData.transaction_count,
        data,
        blockTransactionTime.toISOString(),
        blockTransactionTime.toISOString(),
      ],
    );
  }

  async getAccountById(id: string): Promise<AccountEntity | null> {
    const result = await this.databaseConnection.query(
      `
      SELECT * FROM indexer.accounts WHERE account_id = $1
      `,
      [id],
    );

    return result.length ? AccountEntity.create(result[0]) : null;
  }

  async incrementTransactionCount(
    account_id: string,
    blockTransactionTime: Date,
    incrementBy = 1,
  ) {
    await this.databaseConnection.query(
      `
    UPDATE indexer.accounts
    SET transaction_count = transaction_count + $1,
        recent_transaction_timestamp = $2
    WHERE account_id = $3
    `,
      [incrementBy, blockTransactionTime.toISOString(), account_id],
    );
  }

  // Updated method to update account data with BigInt handling
  async updateAccountData(
    account_id: string,
    newData: any,
    blockTransactionTime: Date,
  ) {
    const data = this.stringifyBigInt(newData); // Use custom function for BigInt serialization

    await this.databaseConnection.query(
      `
      UPDATE indexer.accounts
      SET data = $1,
          recent_transaction_timestamp = $2
      WHERE account_id = $3
      `,
      [data, blockTransactionTime.toISOString(), account_id],
    );
  }

  async updateAccountTransactionCount(
    account_id: string,
    newTransactionCount: number,
    blockTransactionTime: Date,
  ) {
    await this.databaseConnection.query(
      `
      UPDATE indexer.accounts
      SET transaction_count = $1,
          recent_transaction_timestamp = $2
      WHERE account_id = $3
      `,
      [newTransactionCount, blockTransactionTime.toISOString(), account_id],
    );
  }

  async updateAccountBalance(account_id: string, newBalance: bigint) {
    await this.databaseConnection.query(
      `
      UPDATE indexer.accounts SET balance = $1 WHERE account_id = $2
      `,
      [newBalance.toString(), account_id], // Convert BigInt to string
    );
  }

  // New method to get account data content
  async getAccountDataContent(account_id: string): Promise<any | null> {
    const result = await this.databaseConnection.query(
      `
      SELECT data FROM indexer.accounts WHERE account_id = $1
      `,
      [account_id],
    );

    return result.length ? result[0].data : null;
  }

  async cumulativeAccountCreationStatistics(timeFilter: string) {
    const _interval = getTimeInterval(timeFilter);

    let query = `
      SELECT 
        first_transaction_timestamp AS timestamp
      FROM indexer.accounts
    `;

    let intervalStartTimeDate = '';

    if (_interval) {
      const intervalStartTimeInMilliseconds = Date.now() - _interval;
      intervalStartTimeDate = new Date(
        intervalStartTimeInMilliseconds,
      ).toISOString();

      // Add the WHERE clause, parameterizing the date value to ensure proper handling
      query += 'WHERE first_transaction_timestamp >= $1';
    }

    query += ' ORDER BY timestamp ASC';

    // Execute the main query with the interval start date as a parameter
    const accountsData = await this.databaseConnection.query(query, [
      intervalStartTimeDate,
    ]);

    // Calculate accountOffset: Accounts created before the first timestamp in the interval
    const offsetQuery = `
      SELECT COUNT(*) as "accountOffset"
      FROM indexer.accounts
      WHERE first_transaction_timestamp < $1
    `;

    const offsetResult = await this.databaseConnection.query(offsetQuery, [
      intervalStartTimeDate,
    ]);

    return {
      nodes: accountsData,
      accountOffset: offsetResult[0].accountOffset || 0,
    };
  }

  async newAccountStatistics(timeFilter: string) {
    const _interval = getTimeInterval(timeFilter);

    let query = `
      SELECT 
        first_transaction_timestamp AS timestamp
      FROM indexer.accounts
    `;
    // Prepare interval start time as a valid ISO string
    let intervalStartTimeDate = '';

    if (_interval) {
      const intervalStartTimeInMilliseconds = Date.now() - _interval;
      intervalStartTimeDate = new Date(
        intervalStartTimeInMilliseconds,
      ).toISOString();

      // Add the WHERE clause, parameterizing the date value to ensure proper handling
      query += 'WHERE first_transaction_timestamp >= $1';
    }

    query += ' ORDER BY timestamp ASC';

    // Execute the main query with the interval start date as a parameter
    const accountsData = await this.databaseConnection.query(query, [
      intervalStartTimeDate,
    ]);
    return {
      nodes: accountsData,
      count: accountsData.length,
    };
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

    console.log(first);
    const limitClause =
      first !== undefined && first !== null
        ? `LIMIT $${queryParams.length + 1}`
        : '';

    console.log(limitClause);

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
            data, 
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

    // hasPreviousPage: If the first record's row_num is greater than 1, there is a previous page
    const hasPreviousPage = startCursor > 1;

    // hasNextPage: If the number of fetched records is equal to the limit, there is a next page
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
}
