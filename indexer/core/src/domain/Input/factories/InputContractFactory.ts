import type {
  GQLGroupedInputContract,
  GQLInput,
  GQLInputContract,
} from '@core/generated/gql-types';
import { GQLNode } from '@core/shared/GQLNode';
import { groupBy } from 'lodash';

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
