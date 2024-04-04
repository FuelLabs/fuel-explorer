import { Jsonb } from '~/application/vo';
import { ValueObject } from '~/core/ValueObject';

type CustomArgs = {
  sender?: string;
  recipient?: string;
};

interface Props {
  value: Record<string, unknown> | readonly unknown[];
}

export class BridgeContractLogArgs extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static type() {
    return Jsonb.type<CustomArgs>('args');
  }

  static create(value: Props['value']) {
    return new BridgeContractLogArgs({ value });
  }

  value() {
    return this.props.value as CustomArgs;
  }
}
