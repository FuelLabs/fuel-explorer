import { bn } from 'fuels';
import { groupBy } from 'lodash';
import { GQLNode } from '~/core/GQLNode';
import {
  type GQLGroupedInputCoin,
  GQLGroupedInputType,
  type GQLInput,
  type GQLInputCoin,
} from '~/graphql/generated/sdk-provider';

type Source = GQLInputCoin;
type Typename = GQLGroupedInputCoin['__typename'];
export type InputCoinGroupedEntry = GQLGroupedInputCoin;

export class InputCoinFactory {
  value: InputCoinGroupedEntry[];
  private constructor(data: GQLInput[]) {
    const inputs = GQLNode.filterByType(data, 'InputCoin');
    this.value = this.entriesFromInputs(inputs as Source[]);
  }

  static create(inputsData: GQLInput[]) {
    return new InputCoinFactory(inputsData);
  }

  private entriesFromInputs(inputs: Source[]) {
    return Object.entries(groupBy(inputs, (i) => i.assetId)).map(
      ([assetId, inputs]) => {
        const owner = inputs[0].owner;
        const totalAmount = this.getTotalAmount(inputs).toString();
        return {
          __typename: 'GroupedInputCoin' as Typename,
          type: GQLGroupedInputType.InputCoin,
          owner,
          assetId,
          totalAmount,
          inputs,
        };
      },
    );
  }

  private getTotalAmount(inputs: Source[]) {
    return inputs.reduce((acc, input) => acc.add(bn(input.amount)), bn(0));
  }
}
