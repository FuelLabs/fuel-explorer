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

  static create(value?: GQLInput[] | null) {
    if (!value) {
      return new GroupedInputsFactory({ value: [] });
    }

    const inputsCoin = InputCoinFactory.create(value).value();
    const inputsMessage = InputMessageFactory.create(value).value();
    const inputsContract = InputContractFactory.create(value).value();
    return new GroupedInputsFactory({
      value: [...inputsCoin, ...inputsMessage, ...inputsContract],
    });
  }

  value() {
    return this.props.value;
  }
}
