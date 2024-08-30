import { Hash256 } from '../../application/vo/Hash256';
import { Entity } from '../../core/Entity';
import { AccountBalance } from './vo/AccountBalance';
import { AccountData } from './vo/AccountData';
import { AccountModelID } from './vo/AccountModelID';

type AccountInputProps = {
  address: Hash256;
  balance: AccountBalance;
  data: AccountData;
  transactionCount: number;
};

export class AccountEntity extends Entity<AccountInputProps, AccountModelID> {
  // Adjust the constructor to not require an ID initially
  static create(account: any) {
    const address = Hash256.create(account.address);
    const balance = AccountBalance.create(account.balance);
    const data = AccountData.create(account.data);
    const transactionCount = account.transactionCount || 0;

    const props: AccountInputProps = {
      address,
      balance,
      data,
      transactionCount,
    };

    // If _id is not provided, set it as undefined
    const id = account._id ? AccountModelID.create(account._id) : undefined;

    return new AccountEntity(props, id);
  }

  static toDBItem(account: AccountEntity): any {
    return {
      address: account.props.address.value(),
      balance: account.props.balance.value().toString(), // Convert BigInt to string
      data: AccountEntity.serializeData(account.props.data.value()), // Use custom serializer for data
      transaction_count: account.props.transactionCount,
    };
  }

  // Add a new static method for serializing data
  static serializeData(data: any): string {
    // Custom serializer to handle BigInt values
    return JSON.stringify(data, (_, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    );
  }

  get cursor() {
    return this.id ? this.id.value() : null; // Adjust to handle possible undefined ID
  }

  get id() {
    return this._id;
  }

  get address() {
    return this.props.address.value();
  }

  get balance() {
    return this.props.balance.value();
  }

  get transactionCount() {
    return this.props.transactionCount;
  }

  get data() {
    return this.props.data.value();
  }
}
