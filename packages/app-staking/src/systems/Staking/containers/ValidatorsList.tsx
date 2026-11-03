import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatedTable } from '~staking/systems/Core/components/AnimatedTable/AnimatedTable';
import { ValidatorListItem } from '../components/ValidatorListItem';
import { useValidatorsList } from '../hooks/useValidatorsList';

import { VALIDATORS_CELLS } from './constants';

export const ValidatorsList = () => {
  const { t } = useTranslation();
  const { validators, isLoading, isPending, isError } = useValidatorsList();
  const cells = useMemo(
    () =>
      VALIDATORS_CELLS.map((cell) => ({
        ...cell,
        title: cell.title ? t(cell.title) : '',
      })),
    [t],
  );

  return (
    <div className="flex flex-col gap-4">
      <AnimatedTable headerCells={cells}>
        {(!!validators?.length || isLoading || isPending) && (
          <div>
            {validators?.map((validator, idx) => (
              <ValidatorListItem
                key={`${validator.description.moniker}-${validator.rank}`}
                validator={validator}
                index={idx}
                isLast={idx === validators.length - 1}
              />
            ))}
            {(isLoading || isPending) &&
              [1, 2, 3, 4, 5].map((i) => (
                <ValidatorListItem key={`load${i}`} isLoading />
              ))}
          </div>
        )}
        {!validators?.length && isError && (
          <p
            role="alert"
            className="fuel-rise m-0 py-8 text-[16px] leading-[20px] tracking-[-0.32px] text-[var(--fuel-element-low-em)]"
          >
            {t('staking.validator.load_error')}
          </p>
        )}
      </AnimatedTable>
    </div>
  );
};
