import type { GQLChainInfo } from '@core/generated/gql-types';
import { ValueObject } from '@core/shared/ValueObject';
import { jsonb } from 'drizzle-orm/pg-core';

interface Props {
  value: GQLChainInfo;
}

export class ChainData extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return jsonb('data').notNull().$type<GQLChainInfo>();
  }

  static create(value: GQLChainInfo) {
    return new ChainData({ value });
  }

  value() {
    return this.props.value;
  }
}
