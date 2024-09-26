import { AccountEntity } from '../../domain/Account/AccountEntity';
import { DatabaseConnection } from '../database/DatabaseConnection';

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
}
