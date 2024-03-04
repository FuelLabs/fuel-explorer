import { groupBy } from 'lodash';
import { GQLNode } from '~/core/GQLNode';
import { GQLInput, GQLInputContract } from '~/graphql/generated/sdk';

type Source = GQLInputContract;
export type InputContractGroupedEntry = {
  type: 'InputContract';
  contractId: string;
  inputs: Source[];
};

export class InputContractFactory {
  value: InputContractGroupedEntry[];
  private constructor(data: GQLInput[]) {
    const inputs = GQLNode.filterByType(data, 'InputContract');
    this.value = this.entriesFromInputs(inputs as Source[]);
  }

  static create(inputsData: GQLInput[]) {
    return new InputContractFactory(inputsData);
  }

  private entriesFromInputs(inputs: Source[]) {
    return Object.entries(groupBy(inputs, (i) => i.contract.id)).map(
      ([contractId, inputs]) => {
        const type = inputs[0].__typename;
        return { contractId, type, inputs };
      },
    );
  }
}
