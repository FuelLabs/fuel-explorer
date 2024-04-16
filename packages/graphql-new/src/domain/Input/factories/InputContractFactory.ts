import { groupBy } from 'lodash';
import { GQLNode } from '~/core/GQLNode';
import type {
  GQLGroupedInputContract,
  GQLInput,
  GQLInputContract,
} from '~/graphql/generated/sdk';

type Source = GQLInputContract;
type Typename = GQLGroupedInputContract['__typename'];
export type InputContractGroupedEntry = GQLGroupedInputContract;

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
    return Object.entries(groupBy(inputs, (i) => i.contract?.id)).map(
      ([contractId, inputs]) => {
        return {
          __typename: 'GroupedInputContract' as Typename,
          contractId,
          inputs,
        };
      },
    );
  }
}
