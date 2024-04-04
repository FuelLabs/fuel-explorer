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

export type LogData = Omit<
  Log,
  'args' | 'eventName' | 'address' | 'logIndex' | 'blockNumber'
>;

interface Props {
  value: LogData;
}

export class BridgeContractLogData extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return Jsonb.type<LogData>('data');
  }

  static create(value: LogData) {
    return new BridgeContractLogData({ value });
  }

  value() {
    return this.props.value;
  }
}
