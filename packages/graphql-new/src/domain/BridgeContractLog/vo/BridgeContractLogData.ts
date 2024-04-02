import { jsonb } from 'drizzle-orm/pg-core';
import { ValueObject } from '~/core/ValueObject';

interface Props {
  value: {
    anything: string;
  };
}

export class BridgeContractLogData extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return jsonb('data').notNull().$type<Props['value']>();
  }

  static create(data: Props['value']) {
    return new BridgeContractLogData({
      value: data,
    });
  }

  value() {
    return this.props.value;
  }
}
