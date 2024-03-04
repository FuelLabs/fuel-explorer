import { BN, bn } from 'fuels';
import { groupBy } from 'lodash';
import { GQLInput, GQLInputCoin } from '~/graphql/generated/sdk';

export type InputCoinGroupedEntry = {
  type: 'InputCoin';
  owner: string;
  assetId: string;
  totalAmount: BN;
  inputs: GQLInputCoin[];
};

export class InputCoinFactory {
  entries: InputCoinGroupedEntry[];
  private constructor(inputsData: GQLInput[]) {
    const inputs = inputsData.filter(
      (input) => input.__typename === 'InputCoin',
    ) as GQLInputCoin[];

    this.entries = this.entriesFromInputs(inputs);
  }

  static create(inputsData: GQLInput[]) {
    return new InputCoinFactory(inputsData);
  }

  value() {
    return this.entries;
  }

  private entriesFromInputs(inputs: GQLInputCoin[]) {
    return Object.entries(groupBy(inputs, (i) => i.assetId)).map(
      ([assetId, inputs]) => {
        const type = inputs[0].__typename;
        const owner = inputs[0].owner;
        const totalAmount = this.getTotalAmount(inputs);
        return { owner, assetId, type, totalAmount, inputs };
      },
    );
  }

  private getTotalAmount(inputs: GQLInputCoin[]) {
    return inputs.reduce((acc, input) => acc.add(bn(input.amount)), bn(0));
  }
}
