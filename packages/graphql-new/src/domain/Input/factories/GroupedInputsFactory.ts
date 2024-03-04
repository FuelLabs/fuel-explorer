import {
  InputCoinFactory,
  InputCoinGroupedEntry,
} from '~/domain/Input/factories/InputCoinFactory';
import {
  InputContractFactory,
  InputContractGroupedEntry,
} from '~/domain/Input/factories/InputContractFactory';
import {
  InputMessageFactory,
  InputMessageGroupedEntry,
} from '~/domain/Input/factories/InputMessageFactory';
import { GQLInput } from '~/graphql/generated/sdk';

interface Props {
  value: (
    | InputCoinGroupedEntry
    | InputMessageGroupedEntry
    | InputContractGroupedEntry
  )[];
}

export class GroupedInputsFactory {
  private constructor(readonly props: Props) {}

  static create(data?: GQLInput[] | null) {
    if (!data) {
      return new GroupedInputsFactory({ value: [] });
    }

    const inputsCoin = InputCoinFactory.create(data).value;
    const inputsMessage = InputMessageFactory.create(data).value;
    const inputsContract = InputContractFactory.create(data).value;
    return new GroupedInputsFactory({
      value: [...inputsCoin, ...inputsMessage, ...inputsContract],
    });
  }

  value() {
    return this.props.value;
  }
}
