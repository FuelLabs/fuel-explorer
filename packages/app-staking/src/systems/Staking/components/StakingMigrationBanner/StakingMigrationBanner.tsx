import { Button, Text, VStack } from '@fuels/ui';
import { useTranslation } from 'react-i18next';
import { IconRig } from './IconRig';

const RIG_URL = 'https://rig.st';

// Claimable stFUEL is listed by the attention board above, so this block only
// carries the pointer to The Rig.
export const StakingMigrationBanner = () => {
  const { t } = useTranslation();

  return (
    <VStack gap="3" align="start" className="px-6 py-8 tablet:px-10">
      <Text className="m-0 font-medium text-heading text-[20px] leading-[24px] tracking-[-0.4px]">
        {t('staking.rig_card_title')}
      </Text>
      <Text className="m-0 max-w-[520px] text-[16px] leading-[20px] tracking-[-0.32px] text-[var(--fuel-element-low-em)]">
        {t('staking.rig_card_lead')}
      </Text>
      <Button
        color="gray"
        size="3"
        onClick={() => window.open(RIG_URL, '_blank', 'noopener,noreferrer')}
        leftIcon={IconRig}
        leftIconClassName="relative -top-[1px]"
        className="self-start"
      >
        {t('staking.open_rig')}
      </Button>
    </VStack>
  );
};
