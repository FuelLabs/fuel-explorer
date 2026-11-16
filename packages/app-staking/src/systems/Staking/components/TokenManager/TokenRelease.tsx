import { Tooltip } from '@fuels/ui';
import { FuelToken, TOKENS } from 'app-commons';
import { useTranslation } from 'react-i18next';
import type { Address } from 'viem';
import { useVesting } from '../../hooks/useVesting';
import {
  type AccountData,
  useSequencerAccount,
} from '../../services/useSequencerAccount';
import { formatTimestamp } from '../../utils/formatTimestamp';
import { StatCell, StatRow } from './StatCell';

type TokenReleaseProps = {
  account: Address | undefined;
};

const vestingSelector = (data: AccountData) => data.account.vesting_account;
const { symbol: symbolV2 } = TOKENS[FuelToken.V2];

export const TokenRelease = ({ account }: TokenReleaseProps) => {
  const { t } = useTranslation();
  const { data: vesting } = useSequencerAccount(account, {
    select: vestingSelector,
  });

  const { vesting_start, vesting_end, vestingTotalBalance } = useVesting({
    account,
  });

  if (!vesting) return null;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="fuel-label m-0 text-heading">
        {t('staking.upgrade.vesting_fuel')}
      </h2>
      <StatRow className="laptop:grid-cols-3">
        <StatCell label={t('staking.upgrade.total_vesting')}>
          <Tooltip
            content={`${vestingTotalBalance.original.display} ${symbolV2}`}
            delayDuration={0}
          >
            <span>
              {vestingTotalBalance.formatted.display} {symbolV2}
            </span>
          </Tooltip>
        </StatCell>
        <StatCell label={t('staking.upgrade.start_date')}>
          {formatTimestamp(vesting_start)}
        </StatCell>
        <StatCell label={t('staking.upgrade.release_end')}>
          {formatTimestamp(vesting_end)}
        </StatCell>
      </StatRow>
    </section>
  );
};
