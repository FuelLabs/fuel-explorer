import { yupResolver } from '@hookform/resolvers/yup';
import { type BN, bn } from 'fuels';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export type StepAllowanceFormValues = {
  amount: BN;
};

const DEFAULT_VALUES: StepAllowanceFormValues = {
  amount: bn(0),
};

const schema = yup.object({
  amount: yup
    .mixed<BN>()
    .test('positive', 'Amount must be greater than 0', (value) => {
      const hasAmount = value?.gt(0);
      return hasAmount;
    })
    .test(
      'balance',
      'Amount must be less or equal to available balance',
      (value, context) => {
        const hasBalanceAvailable = value?.lte(context.options.context as BN);
        return hasBalanceAvailable;
      },
    )
    .required('Amount is required'),
});

export const useStepAllowanceForm = (balance: BN) => {
  return useForm<StepAllowanceFormValues>({
    resolver: yupResolver(schema),
    defaultValues: DEFAULT_VALUES,
    reValidateMode: 'onChange',
    context: balance,
  });
};
