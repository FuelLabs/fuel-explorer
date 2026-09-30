import { HStack } from '@fuels/ui';
import { DEFAULT_PAGETITLE_MB } from 'app-commons';
import { useTranslation } from 'react-i18next';

// pl: 1px frame border + the TxCard body's px-4, so the title lines up with the card text.
export function TxsTitle() {
  const { t } = useTranslation();
  return (
    <HStack mb={DEFAULT_PAGETITLE_MB} className="pl-[17px]">
      <h2 className="m-0 font-medium text-heading text-[28px] leading-[32px] tracking-[-1.12px] tablet:text-[32px] tablet:leading-[34px] tablet:tracking-[-1.28px]">
        {t('home.recent_transactions')}
      </h2>
    </HStack>
  );
}
