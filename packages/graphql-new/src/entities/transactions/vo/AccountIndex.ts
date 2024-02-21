import { text } from 'drizzle-orm/pg-core';
import { GQLTransaction } from '~/generated/types';
import { ValueObject } from '~/shared/domain/ValueObject';

interface Props {
  value: string;
}

export class AccountIndex extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return text('accountsIndex').notNull().default('');
  }

  static create(transaction: GQLTransaction) {
    const value = AccountIndex.getAccountIndex(transaction);
    return new AccountIndex({ value });
  }

  get() {
    return this.props.value;
  }

  private static getAccountIndex(transaction: GQLTransaction): string {
    return [
      ...new Set(
        [
          transaction.inputContract?.contract.id || '',
          ...(transaction.inputs || []).reduce(
            (acc, i) => {
              switch (i.__typename) {
                case 'InputCoin':
                  return acc.concat([i.owner]);
                case 'InputMessage':
                  return acc.concat([i.recipient, i.sender]);
                case 'InputContract':
                  return acc.concat([i.contract.id]);
                default:
                  return acc;
              }
            },
            [] as Array<string>,
          ),
          ...(transaction.outputs || []).reduce(
            (acc, i) => {
              switch (i.__typename) {
                case 'ChangeOutput':
                  return acc.concat([i.to]);
                case 'CoinOutput':
                  return acc.concat([i.to]);
                default:
                  return acc;
              }
            },
            [] as Array<string>,
          ),
        ]
          .map((a) => a.toLocaleLowerCase())
          .filter((i) => !!i),
      ),
    ]
      .sort()
      .join('|');
  }
}
