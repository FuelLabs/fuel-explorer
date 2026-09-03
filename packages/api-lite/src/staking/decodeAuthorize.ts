import { fuelsequencer } from '@fuel-infrastructure/fuelsequencerjs';
import { MsgWithdrawDelegatorReward } from '@fuel-infrastructure/fuelsequencerjs/dist/codegen/cosmos/distribution/v1beta1/tx';
import {
  MsgBeginRedelegate,
  MsgDelegate,
  MsgUndelegate,
} from '@fuel-infrastructure/fuelsequencerjs/dist/codegen/cosmos/staking/v1beta1/tx';
import { MsgWithdrawToEthereum } from '@fuel-infrastructure/fuelsequencerjs/dist/codegen/fuelsequencer/bridge/v1/tx';
import { arrayify } from 'fuels';

// Message type URLs the SequencerProxy contract's Authorize(address,bytes)
// event can carry.
export enum CosmosMsgType {
  MsgWithdrawToEthereum = '/fuelsequencer.bridge.v1.MsgWithdrawToEthereum',
  MsgDelegate = '/cosmos.staking.v1beta1.MsgDelegate',
  MsgUndelegate = '/cosmos.staking.v1beta1.MsgUndelegate',
  MsgBeginRedelegate = '/cosmos.staking.v1beta1.MsgBeginRedelegate',
  MsgWithdrawDelegatorReward = '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
}

export type DecodedMessage =
  | { type: CosmosMsgType.MsgDelegate; data: MsgDelegate }
  | { type: CosmosMsgType.MsgUndelegate; data: MsgUndelegate }
  | { type: CosmosMsgType.MsgBeginRedelegate; data: MsgBeginRedelegate }
  | {
      type: CosmosMsgType.MsgWithdrawDelegatorReward;
      data: MsgWithdrawDelegatorReward;
    }
  | { type: CosmosMsgType.MsgWithdrawToEthereum; data: MsgWithdrawToEthereum };

// The SequencerProxy contract batches cosmos sdk.Msg's into one AuthorizeTx;
// each is decoded by its typeUrl. Unknown message types are dropped.
export function decodeAuthorizeMessages(dataHex: string): DecodedMessage[] {
  const bytes = arrayify(dataHex);
  const decoded = fuelsequencer.bridge.AuthorizeTx.decode(bytes);
  const result: DecodedMessage[] = [];
  for (const message of decoded.messages) {
    switch (message.typeUrl) {
      case CosmosMsgType.MsgDelegate:
        result.push({
          type: CosmosMsgType.MsgDelegate,
          data: MsgDelegate.decode(message.value),
        });
        break;
      case CosmosMsgType.MsgUndelegate:
        result.push({
          type: CosmosMsgType.MsgUndelegate,
          data: MsgUndelegate.decode(message.value),
        });
        break;
      case CosmosMsgType.MsgBeginRedelegate:
        result.push({
          type: CosmosMsgType.MsgBeginRedelegate,
          data: MsgBeginRedelegate.decode(message.value),
        });
        break;
      case CosmosMsgType.MsgWithdrawDelegatorReward:
        result.push({
          type: CosmosMsgType.MsgWithdrawDelegatorReward,
          data: MsgWithdrawDelegatorReward.decode(message.value),
        });
        break;
      case CosmosMsgType.MsgWithdrawToEthereum:
        result.push({
          type: CosmosMsgType.MsgWithdrawToEthereum,
          data: MsgWithdrawToEthereum.decode(message.value),
        });
        break;
      default:
        continue;
    }
  }
  return result;
}
