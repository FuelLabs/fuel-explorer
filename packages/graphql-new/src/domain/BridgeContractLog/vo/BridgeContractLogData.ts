import { AbiEvent, Log as LogEvent } from 'viem';

import { Jsonb } from '~/application/vo';
import { ValueObject } from '~/core/ValueObject';

export type Log = LogEvent<
  bigint,
  number,
  false,
  undefined,
  false,
  AbiEvent[],
  string
>;

interface Props {
  value: Log;
}

export class BridgeContractLogData extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return Jsonb.type<Log>('data');
  }

  static create(value: Log) {
    return new BridgeContractLogData({ value });
  }

  value() {
    return this.props.value;
  }
}
