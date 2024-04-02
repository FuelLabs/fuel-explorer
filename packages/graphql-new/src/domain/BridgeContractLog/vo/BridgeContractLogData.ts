import { jsonb } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';
import { GQLBridgeContractLogData } from '~/graphql/generated/sdk';

interface Props {
  value: GQLBridgeContractLogData;
}

export class BridgeContractLogData extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return jsonb('data').notNull().$type<GQLBridgeContractLogData>();
  }

  static create(value: GQLBridgeContractLogData) {
    return new BridgeContractLogData({ value });
  }

  value() {
    return this.props.value;
  }
}
