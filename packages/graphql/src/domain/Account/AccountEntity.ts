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
  static create(account: any) {
    const id = AccountModelID.create(account);
    const address = Hash256.create(account.address);
    const balance = AccountBalance.create(account.balance);
    const data = AccountData.create(account.data);
    const transactionCount = account.transactionCount || 0;

    const props = {
      address,
      balance,
      data,
      transactionCount,
    };

    return new AccountEntity(props, id);
  }

  static toDBItem(account: AccountEntity): any {
    return {
      _id: account.id.value(), // Updated this to properly fetch the value from the ID
      address: account.props.address.value(),
      balance: account.props.balance.value(),
      data: account.props.data.value(),
      transaction_count: account.props.transactionCount,
    };
  }

  get cursor() {
    return this.id.value();
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
