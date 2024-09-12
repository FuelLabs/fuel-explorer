import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export type AddAssetFormValues = {
  symbol: string;
  decimals: string;
};

const DEFAULT_VALUES = {
  symbol: '',
  decimals: '',
};

type UseAddAssetOpts = {
  defaultValues?: AddAssetFormValues;
};

export const useAddAssetForm = (opts: UseAddAssetOpts = {}) => {
  const schema: any = yup.object({
    symbol: yup.string().required('Symbol is required'),
    decimals: yup
      .string()
      .required('Decimals is required')
      .test(
        'Number',
        'Decimals must be greater than 0',
        (val) => Number(val) > 0,
      ),
  });

  const form = useForm<AddAssetFormValues>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'onChange',
    defaultValues: opts.defaultValues || DEFAULT_VALUES,
  });

  return form;
};
