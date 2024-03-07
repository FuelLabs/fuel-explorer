import {
  GQLGroupedOutputChanged,
  GQLGroupedOutputCoin,
  GQLGroupedOutputContractCreadted,
  GQLOutput,
} from '~/graphql/generated/sdk';
import { OutputChangedFactory } from './OutputChangedFactory';
import { OutputCoinFactory } from './OutputCoinFactory';
import { OutputContractCreatedFactory } from './OutputContractCreatedFactory';

export type GroupedOutputsValue = (
  | GQLGroupedOutputCoin
  | GQLGroupedOutputChanged
  | GQLGroupedOutputContractCreadted
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
