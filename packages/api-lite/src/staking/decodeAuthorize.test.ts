import { MsgDelegate } from '@fuel-infrastructure/fuelsequencerjs/dist/codegen/cosmos/staking/v1beta1/tx';
import { AuthorizeTx } from '@fuel-infrastructure/fuelsequencerjs/dist/codegen/fuelsequencer/bridge/authorize_transaction';
import { hexlify } from 'fuels';
import { CosmosMsgType, decodeAuthorizeMessages } from './decodeAuthorize';

// Confirms the deep subpath imports into @fuel-infrastructure/fuelsequencerjs
// resolve and round-trip under this package's CJS + swc/jest setup.
describe('decodeAuthorizeMessages', () => {
  it('round-trips a MsgDelegate packed inside an AuthorizeTx', () => {
    const msgDelegate = MsgDelegate.fromPartial({
      delegatorAddress: 'fuelsequencer1delegator',
      validatorAddress: 'fuelsequencervaloper1validator',
      amount: { denom: 'ufuel', amount: '1000000' },
    });
    const authorizeTx = AuthorizeTx.fromPartial({
      messages: [
        {
          typeUrl: CosmosMsgType.MsgDelegate,
          value: MsgDelegate.encode(msgDelegate).finish(),
        },
      ],
    });
    const bytes = AuthorizeTx.encode(authorizeTx).finish();

    const result = decodeAuthorizeMessages(hexlify(bytes));

    expect(result).toHaveLength(1);
    expect(result[0].type).toBe(CosmosMsgType.MsgDelegate);
    const data = result[0].data as MsgDelegate;
    expect(data.delegatorAddress).toBe('fuelsequencer1delegator');
    expect(data.validatorAddress).toBe('fuelsequencervaloper1validator');
    expect(data.amount?.amount).toBe('1000000');
  });

  it('drops unknown message types instead of throwing', () => {
    const authorizeTx = AuthorizeTx.fromPartial({
      messages: [{ typeUrl: '/some.unknown.Msg', value: new Uint8Array() }],
    });
    const bytes = AuthorizeTx.encode(authorizeTx).finish();

    expect(decodeAuthorizeMessages(hexlify(bytes))).toEqual([]);
  });
});
