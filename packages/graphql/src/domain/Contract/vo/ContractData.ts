import { jsonb } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';
import type { GQLContract } from '~/graphql/generated/sdk-provider';

interface Props {
  value: GQLContract;
}

export class ContractData extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return jsonb('data').notNull().$type<GQLContract>();
  }

  static create(value: GQLContract) {
    return new ContractData({ value });
  }

  value() {
    return this.props.value;
  }
}
