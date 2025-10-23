import { yupResolver } from '@hookform/resolvers/yup';
import { type BN, bn } from 'fuels';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import type { SequencerValidatorAddress } from '~staking/systems/Core/utils/address';

export type StakeFormValues = {
  amount?: BN;
  validator?: SequencerValidatorAddress;
};

const DEFAULT_VALUES: StakeFormValues = {
  amount: bn(0),
  validator: undefined,
};

const createSchema = () => {
  return yup.object({
    amount: yup
      .mixed<BN>()
      // .test('positive', 'Amount must be greater than 0', (value) => {
      //   const hasAmount = value?.gt(0);
      //   return hasAmount;
      // })
      .test(
        'balance',
        'Amount must be less or equal to staked amount',
        (value, context) => {
          const hasBalanceAvailable = value?.lte(context.options.context as BN);
          return hasBalanceAvailable;
        },
      ),
    validator: yup.string(),
  });
};

export const useStakeForm = (balance: BN) => {
  const schema = createSchema();

  return useForm<StakeFormValues>({
    resolver: yupResolver(schema as any),
    defaultValues: DEFAULT_VALUES,
    context: balance,
  });
};
