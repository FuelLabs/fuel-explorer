import { groupBy } from 'lodash';
import { GQLNode } from '~/core/GQLNode';
import { GQLContractCreated, GQLOutput } from '~/graphql/generated/sdk';

type Source = GQLContractCreated;
export type OutputContractCreatedGroupedEntry = {
  type: Source['__typename'];
  contract: Source['contract'];
  outputs: Source[];
};

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
    return Object.entries(groupBy(outputs, (i) => i.contract.id)).map(
      ([_assetId, outputs]) => {
        const type = outputs[0].__typename;
        const contract = outputs[0].contract;
        return { contract, type, outputs };
      },
    );
  }
}
