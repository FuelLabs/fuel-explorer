import { BN, bn } from 'fuels';
import { groupBy } from 'lodash';
import { GQLNode } from '~/core/GQLNode';
import { GQLInput, GQLInputCoin } from '~/graphql/generated/sdk';

type Source = GQLInputCoin;
export type InputCoinGroupedEntry = {
  type: 'InputCoin';
  owner: string;
  assetId: string;
  totalAmount: BN;
  inputs: Source[];
};

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
        const type = inputs[0].__typename;
        const owner = inputs[0].owner;
        const totalAmount = this.getTotalAmount(inputs);
        return { owner, assetId, type, totalAmount, inputs };
      },
    );
  }

  private getTotalAmount(inputs: Source[]) {
    return inputs.reduce((acc, input) => acc.add(bn(input.amount)), bn(0));
  }
}
