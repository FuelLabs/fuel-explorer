import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export type SetAddressFormValues = {
  address: string;
};

const DEFAULT_VALUES = {
  address: '',
};

type UseSetAddressOpts = {
  defaultValues?: SetAddressFormValues;
};

export const useSetAddressForm = (opts: UseSetAddressOpts = {}) => {
  const schema = yup.object({
    address: yup.string().required('Address is required'),
  });

  const form = useForm<SetAddressFormValues>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'onChange',
    defaultValues: opts.defaultValues || DEFAULT_VALUES,
  });

  return form;
};
