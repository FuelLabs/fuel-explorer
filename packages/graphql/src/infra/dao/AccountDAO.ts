import { AccountEntity } from '../../domain/Account/AccountEntity';
import { DatabaseConnection } from '../database/DatabaseConnection';

export class AccountDAO {
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

  async save(account: AccountEntity) {
    console.log('Inside Account Entity DAO before');
    const accountData = AccountEntity.toDBItem(account);
    console.log('Inside Account Entity DAO');

    // Convert BigInt values to strings before saving
    const balance = accountData.balance.toString(); // Convert BigInt to string
    const data = this.stringifyBigInt(accountData.data); // Use custom function for data

    // Use raw SQL query to insert or update the account record
    await this.databaseConnection.query(
      `
      INSERT INTO accounts (address, balance, transaction_count, data, createTime, updateTime)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (address)
      DO UPDATE SET
        balance = EXCLUDED.balance,
        transaction_count = EXCLUDED.transaction_count,
        data = EXCLUDED.data,
        updateTime = CASE
          WHEN accounts.transaction_count <> EXCLUDED.transaction_count THEN EXCLUDED.updateTime
          ELSE accounts.updateTime
        END
      `,
      [
        accountData.address,
        balance, // Pass stringified balance
        accountData.transaction_count,
        data, // Pass stringified data
        accountData.createTime || new Date().toISOString(), // Set createTime if not present
        new Date().toISOString(), // Set updateTime to current time if needed
      ],
    );
  }

  async getAccountById(id: string): Promise<AccountEntity | null> {
    const result = await this.databaseConnection.query(
      `
      SELECT * FROM accounts WHERE address = $1
      `,
      [id],
    );

    return result.length ? AccountEntity.create(result[0]) : null;
  }

  async getAccounts(): Promise<any[] | null> {
    const result = await this.databaseConnection.query(
      `
      SELECT * FROM accounts
      `,
      [],
    );

    return result.length ? result : null;
  }

  async updateAccountBalance(address: string, newBalance: bigint) {
    await this.databaseConnection.query(
      `
      UPDATE accounts SET balance = $1 WHERE address = $2
      `,
      [newBalance.toString(), address], // Convert BigInt to string
    );
  }

  // New method to increment the transaction count for an account
  // New method to increment the transaction count for an account
  async incrementTransactionCount(address: string, incrementBy = 1) {
    await this.databaseConnection.query(
      `
    UPDATE accounts
    SET transaction_count = transaction_count + $1,
        updateTime = $2
    WHERE address = $3
    `,
      [incrementBy, new Date().toISOString(), address],
    );
  }

  // Updated method to update account data with BigInt handling
  async updateAccountData(address: string, newData: any) {
    const data = this.stringifyBigInt(newData); // Use custom function for BigInt serialization

    await this.databaseConnection.query(
      `
      UPDATE accounts
      SET data = $1,
          updateTime = $2
      WHERE address = $3
      `,
      [data, new Date().toISOString(), address],
    );
  }

  async updateAccountTransactionCount(
    address: string,
    newTransactionCount: number,
  ) {
    await this.databaseConnection.query(
      `
      UPDATE accounts
      SET transaction_count = $1,
          updateTime = $2
      WHERE address = $3
      `,
      [newTransactionCount, new Date().toISOString(), address],
    );
  }

  // New method to get account data content
  async getAccountDataContent(address: string): Promise<any | null> {
    const result = await this.databaseConnection.query(
      `
      SELECT data FROM accounts WHERE address = $1
      `,
      [address],
    );

    return result.length ? result[0].data : null;
  }
}
