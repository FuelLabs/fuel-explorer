import { useMemo } from 'react';

import type { BaseValidator } from '~staking/systems/Staking/types/validators';
import { type PoolData, usePool } from '../services/usePool';
import { type ValidatorsData, useValidators } from '../services/useValidators';

const selectors = {
  validators: (data: ValidatorsData) => data.validators,
  pool: (data: PoolData) => data.pool,
};

export interface ValidatorItem extends BaseValidator {
  rank: number;
}

export const useValidatorsList = () => {
  const { data: pool } = usePool({
    select: selectors.pool,
  });

  const {
    query: { data, isLoading, isPending, isFetching, isError },
    pagination,
  } = useValidators({
    enabled: !!pool,
  });

  const list = useMemo<ValidatorItem[] | null>(() => {
    if (!data || !pool) return null;

    return data.validators
      .map((validator) => {
        const rankValue =
          Number.parseFloat(validator.tokens) /
          Number.parseFloat(pool.bonded_tokens);

        return {
          operator_address: validator.operator_address,
          tokens: validator.tokens,
          description: validator.description,
          commission: validator.commission,
          rank: rankValue,
        };
      })
      .sort((a, b) => b.rank - a.rank);
  }, [data, pool]);

  return {
    validators: list,
    isLoading,
    isPending,
    isFetching,
    pagination,
    isError,
  };
};
