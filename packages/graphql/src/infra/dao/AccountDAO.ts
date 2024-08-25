import { AccountEntity } from '../../domain/Account/AccountEntity';
import { DatabaseConnection } from '../database/DatabaseConnection';

export class AccountDAO {
  private databaseConnection: DatabaseConnection;

  constructor() {
    this.databaseConnection = DatabaseConnection.getInstance();
  }

  async save(account: AccountEntity) {
    const accountData = AccountEntity.toDBItem(account);

    // Use raw SQL query to insert or update the account record
    await this.databaseConnection.query(
      `
      INSERT INTO accounts (_id, address, balance, transaction_count, data)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (address)
      DO UPDATE SET
        balance = EXCLUDED.balance,
        transaction_count = EXCLUDED.transaction_count,
        data = EXCLUDED.data
      `,
      [
        accountData._id,
        accountData.address,
        accountData.balance,
        accountData.transaction_count,
        accountData.data,
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

  async updateAccountBalance(address: string, newBalance: bigint) {
    await this.databaseConnection.query(
      `
      UPDATE accounts SET balance = $1 WHERE address = $2
      `,
      [newBalance, address],
    );
  }

  async updateAccountTransactionCount(
    address: string,
    transactionCount: number,
  ) {
    await this.databaseConnection.query(
      `
      UPDATE accounts SET transaction_count = $1 WHERE address = $2
      `,
      [transactionCount, address],
    );
  }
}
