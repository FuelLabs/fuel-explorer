import { GQLOutput } from '~/graphql/generated/sdk';
import {
  OutputChangeGroupedEntry,
  OutputChangedFactory,
} from './OutputChangeFactory';
import { OutputCoinFactory, OutputCoinGroupedEntry } from './OutputCoinFactory';
import {
  OutputContractCreatedFactory,
  OutputContractCreatedGroupedEntry,
} from './OutputContractCreatedFactory';

interface Props {
  value: (
    | OutputCoinGroupedEntry
    | OutputChangeGroupedEntry
    | OutputContractCreatedGroupedEntry
  )[];
}

export class GroupedOutputsFactory {
  private constructor(readonly props: Props) {}

  static create(data?: GQLOutput[] | null) {
    if (!data) {
      return new GroupedOutputsFactory({ value: [] });
    }

    const outputsCoin = OutputCoinFactory.create(data).value;
    const outputsMessage = OutputChangedFactory.create(data).value;
    const outputsContractCreated =
      OutputContractCreatedFactory.create(data).value;
    return new GroupedOutputsFactory({
      value: [...outputsCoin, ...outputsMessage, ...outputsContractCreated],
    });
  }

  value() {
    return this.props.value;
  }
}
