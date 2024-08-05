import { InputCoinFactory } from '~/domain/Input/factories/InputCoinFactory';
import { InputContractFactory } from '~/domain/Input/factories/InputContractFactory';
import { InputMessageFactory } from '~/domain/Input/factories/InputMessageFactory';
import type {
  GQLGroupedInputCoin,
  GQLGroupedInputContract,
  GQLGroupedInputMessage,
  GQLInput,
} from '~/graphql/generated/sdk-provider';

export type GroupedInputsValue = (
  | GQLGroupedInputCoin
  | GQLGroupedInputMessage
  | GQLGroupedInputContract
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
