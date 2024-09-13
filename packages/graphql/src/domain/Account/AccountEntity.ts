import { Hash256 } from '../../application/vo/Hash256';
import { Entity } from '../../core/Entity';
import { AccountData } from './vo/AccountData';
import { AccountModelID } from './vo/AccountModelID';

type AccountInputProps = {
  account_id: Hash256;
  data: AccountData;
  transactionCount: number;
};

export class AccountEntity extends Entity<AccountInputProps, AccountModelID> {
  // Adjust the constructor to not require an ID initially
  static create(account: any) {
    const account_id = Hash256.create(account.account_id);
    const data = AccountData.create(account.data);
    const transactionCount = account.transactionCount || 0;

    const props: AccountInputProps = {
      account_id,
      data,
      transactionCount,
    };

    // If _id is not provided, set it as undefined
    const id = account._id ? AccountModelID.create(account._id) : undefined;

    return new AccountEntity(props, id);
  }

  static toDBItem(account: AccountEntity): any {
    return {
      account_id: account.props.account_id.value(),
      data: AccountEntity.serializeData(account.props.data.value()),
      transaction_count: account.props.transactionCount,
    };
  }

  static serializeData(data: any): string {
    return JSON.stringify(data, (_, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    );
  }

  get cursor() {
    return this.id ? this.id.value() : null;
  }

  get id() {
    return this._id;
  }

  get account_id() {
    return this.props.account_id.value();
  }

  get transactionCount() {
    return this.props.transactionCount;
  }

  get data() {
    return this.props.data.value();
  }
}
