import { ValueObject } from '~/core/ValueObject';
import {
  GroupedOutputsFactory,
  type GroupedOutputsValue,
} from '~/domain/Output/factories/GroupedOutputsFactory';
import type { GQLTransaction } from '~/graphql/generated/sdk-provider';

interface Props {
  value: GroupedOutputsValue;
}

export class TransactionGroupedOutputs extends ValueObject<Props> {
  private constructor(props: Props) {
    super(props);
  }

  static create(data: GQLTransaction) {
    const value = GroupedOutputsFactory.create(data.outputs).value;
    return new TransactionGroupedOutputs({ value });
  }

  value() {
    return this.props.value;
  }
}
