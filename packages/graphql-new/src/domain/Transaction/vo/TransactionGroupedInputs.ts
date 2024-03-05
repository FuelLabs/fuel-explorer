import { ValueObject } from '~/core/ValueObject';
import {
  GroupedInputsFactory,
  GroupedInputsValue,
} from '~/domain/Input/factories/GroupedInputsFactory';
import { GQLTransaction } from '~/graphql/generated/sdk';

interface Props {
  value: GroupedInputsValue;
}

export class TransactionGroupedInputs extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static create(data: GQLTransaction) {
    const value = GroupedInputsFactory.create(data.inputs).value;
    return new TransactionGroupedInputs({ value });
  }

  value() {
    return this.props.value;
  }
}
