import { groupBy } from 'lodash';
import { GQLInput, GQLInputContract } from '~/graphql/generated/sdk';

export type InputContractGroupedEntry = {
  type: 'InputContract';
  contractId: string;
  inputs: GQLInputContract[];
};

export class InputContractFactory {
  entries: InputContractGroupedEntry[];
  private constructor(inputsData: GQLInput[]) {
    const inputs = inputsData.filter(
      (input) => input.__typename === 'InputContract',
    ) as GQLInputContract[];

    this.entries = this.entriesFromInputs(inputs);
  }

  static create(inputsData: GQLInput[]) {
    return new InputContractFactory(inputsData);
  }

  value() {
    return this.entries;
  }

  private entriesFromInputs(inputs: GQLInputContract[]) {
    return Object.entries(groupBy(inputs, (i) => i.contract.id)).map(
      ([contractId, inputs]) => {
        const type = inputs[0].__typename;
        return { contractId, type, inputs };
      },
    );
  }
}
