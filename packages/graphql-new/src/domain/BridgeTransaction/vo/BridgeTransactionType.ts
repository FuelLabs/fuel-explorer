import { pgEnum } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';
import { GQLBridgeTransactionType } from '~/graphql/generated/sdk';
interface Props {
  value: GQLBridgeTransactionType;
}

export const bridgeTransactionTypeEnum = pgEnum(
  'bridge_transaction_type_enum',
  [GQLBridgeTransactionType.Deposit, GQLBridgeTransactionType.Withdraw],
);

export class BridgeTransactionType extends ValueObject<Props> {
  static type() {
    return bridgeTransactionTypeEnum('type').notNull();
  }

  static create(value: GQLBridgeTransactionType) {
    return new BridgeTransactionType({ value });
  }

  value() {
    return this.props.value;
  }
}
