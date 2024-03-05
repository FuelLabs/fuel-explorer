import { GQLOutput } from '~/graphql/generated/sdk';
import {
  OutputChangeGroupedEntry,
  OutputChangedFactory,
} from './OutputChangedFactory';
import { OutputCoinFactory, OutputCoinGroupedEntry } from './OutputCoinFactory';
import {
  OutputContractCreatedFactory,
  OutputContractCreatedGroupedEntry,
} from './OutputContractCreatedFactory';

export type GroupedOutputsValue = (
  | OutputCoinGroupedEntry
  | OutputChangeGroupedEntry
  | OutputContractCreatedGroupedEntry
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
