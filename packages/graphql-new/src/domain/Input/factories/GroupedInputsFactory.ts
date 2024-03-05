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

export type GroupedInputsValue = (
  | InputCoinGroupedEntry
  | InputMessageGroupedEntry
  | InputContractGroupedEntry
)[];

export class GroupedInputsFactory {
  private constructor(readonly value: GroupedInputsValue) {}

  static create(data?: GQLInput[] | null) {
    if (!data) {
      return new GroupedInputsFactory([]);
    }

    const inputsCoin = InputCoinFactory.create(data).value;
    const inputsMessage = InputMessageFactory.create(data).value;
    const inputsContract = InputContractFactory.create(data).value;
    return new GroupedInputsFactory([
      ...inputsCoin,
      ...inputsMessage,
      ...inputsContract,
    ]);
  }
}
