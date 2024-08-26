import type {
  GQLGroupedOutputChanged,
  GQLGroupedOutputCoin,
  GQLGroupedOutputContractCreated,
  GQLOutput,
} from '~/graphql/generated/sdk-provider';
import { OutputChangedFactory } from './OutputChangedFactory';
import { OutputCoinFactory } from './OutputCoinFactory';
import { OutputContractCreatedFactory } from './OutputContractCreatedFactory';

export type GroupedOutputsValue = (
  | GQLGroupedOutputCoin
  | GQLGroupedOutputChanged
  | GQLGroupedOutputContractCreated
)[];

export class GroupedOutputsFactory {
  private constructor(readonly value: GroupedOutputsValue) {}

  static create(data?: GQLOutput[] | null) {
    if (!data) {
      return new GroupedOutputsFactory([]);
    }

    const outputsCoin = OutputCoinFactory.create(data).value;
    const outputsMessage = OutputChangedFactory.create(data).value;
    const outputsContractCreated =
      OutputContractCreatedFactory.create(data).value;
    return new GroupedOutputsFactory([
      ...outputsCoin,
      ...outputsMessage,
      ...outputsContractCreated,
    ]);
  }
}
