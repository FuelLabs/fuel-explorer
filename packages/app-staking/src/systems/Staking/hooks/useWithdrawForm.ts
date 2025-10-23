import { yupResolver } from '@hookform/resolvers/yup';
import { type BN, bn } from 'fuels';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export type WithdrawFormValues = {
  amount?: BN;
};

const DEFAULT_VALUES: WithdrawFormValues = {
  amount: bn(0),
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
        'Amount must be less or equal to available balance',
        (value, context) => {
          const hasBalanceAvailable = value?.lte(context.options.context as BN);
          return hasBalanceAvailable;
        },
      ),
  });
};

export const useWithdrawForm = (balance: BN) => {
  const schema = createSchema();

  return useForm<WithdrawFormValues>({
    resolver: yupResolver(schema),
    defaultValues: DEFAULT_VALUES,
    context: balance,
  });
};
