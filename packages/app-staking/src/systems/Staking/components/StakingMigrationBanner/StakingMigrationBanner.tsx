import { Button } from '@fuels/ui';
import { useTranslation } from 'react-i18next';
import { IconRig } from './IconRig';

const RIG_URL = 'https://rig.st';

// Claimable stFUEL is listed by the attention board above, so this block only
// carries the pointer to The Rig.
export const StakingMigrationBanner = () => {
  const { t } = useTranslation();

  return (
    <div className="fuel-appear flex flex-col items-start gap-6 px-6 py-8 tablet:flex-row tablet:items-center tablet:justify-between tablet:px-10">
      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex items-center gap-3">
          <span aria-hidden className="fuel-square shrink-0" />
          <p className="m-0 text-[20px] font-medium leading-[24px] tracking-[-0.4px] text-heading">
            {t('staking.rig_card_title')}
          </p>
        </div>
        <p className="m-0 max-w-[520px] text-[16px] leading-[20px] tracking-[-0.32px] text-[var(--fuel-element-low-em)]">
          {t('staking.rig_card_lead')}
        </p>
      </div>
      <Button
        size="2"
        onClick={() => window.open(RIG_URL, '_blank', 'noopener,noreferrer')}
        leftIcon={IconRig}
        leftIconClassName="relative -top-[1px]"
        className="shrink-0"
      >
        {t('staking.open_rig')}
      </Button>
    </div>
  );
};
