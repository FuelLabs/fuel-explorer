import { useNamedQuery } from '@fuels/react';
import type { HexAddress } from 'app-commons';
import type { SequencerValidatorAddress } from '~staking/systems/Core';
import type { Validator } from '~staking/systems/Staking/types/validators';
import { convertEthAddressToSequencerValidatorAddress } from '~staking/systems/Staking/utils/convertEthAddressToSequencerValidatorAddress';
import { cosmosApi } from '../../Core/utils/api';
import { QUERY_KEYS } from '../../Core/utils/query';
import { useValidators } from './useValidators';

const queryFn = async (
  address: string | undefined,
  validators?: Validator[],
) => {
  if (!address) return Promise.resolve(undefined);

  // First try to find validator in existing list
  if (validators?.length) {
    const foundValidator = validators.find(
      (v) => v.operator_address === address,
    );
    if (foundValidator) {
      return foundValidator;
    }
  }

  // Fall back to API call if not found in list
  return await cosmosApi
    .get<{ validator: Validator }>(
      `/cosmos/staking/v1beta1/validators/${address}`,
    )
    .then(({ validator }) => validator);
};

export function useValidator(
  address: string | HexAddress | SequencerValidatorAddress | undefined,
) {
  // Get validators list to check first before API call
  const { query } = useValidators();
  const validators = query.data?.validators || [];

  const validatorAddress = address?.startsWith('0x')
    ? convertEthAddressToSequencerValidatorAddress(address as HexAddress)
    : address;

  return useNamedQuery('validator', {
    queryKey: QUERY_KEYS.validator(address),
    queryFn: () => queryFn(validatorAddress, validators),
    placeholderData: validators.find(
      (v: Validator) => v.operator_address === validatorAddress,
    ),
  });
}
