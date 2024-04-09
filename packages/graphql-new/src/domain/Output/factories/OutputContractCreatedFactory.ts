import { groupBy } from 'lodash';
import { GQLNode } from '~/core/GQLNode';
import {
  GQLContractCreated,
  GQLGroupedOutputContractCreated,
  GQLOutput,
} from '~/graphql/generated/sdk';

type Source = GQLContractCreated;
type Typename = GQLGroupedOutputContractCreated['__typename'];
export type OutputContractCreatedGroupedEntry = GQLGroupedOutputContractCreated;

export class OutputContractCreatedFactory {
  value: OutputContractCreatedGroupedEntry[];
  private constructor(data: GQLOutput[]) {
    const outputs = GQLNode.filterByType(data, 'ContractCreated');
    this.value = this.entriesFromOutputs(outputs as Source[]);
  }

  static create(outputsData: GQLOutput[]) {
    return new OutputContractCreatedFactory(outputsData);
  }

  private entriesFromOutputs(outputs: Source[]) {
    return Object.entries(groupBy(outputs, (i) => i.contract?.id)).map(
      ([_assetId, outputs]) => {
        const contract = outputs[0].contract;
        return {
          __typename: 'GroupedOutputContractCreated' as Typename,
          contract,
          outputs,
        };
      },
    );
  }
}
