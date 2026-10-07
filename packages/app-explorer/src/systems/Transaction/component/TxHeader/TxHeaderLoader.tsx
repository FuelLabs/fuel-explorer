import { HStack, Skeleton } from '@fuels/ui';
import { IconCopy } from '@fuels/ui';
import { PageTitle } from 'app-commons';
import { useTranslation } from 'react-i18next';

export function TxHeaderLoader({ isSimple }: { isSimple?: boolean }) {
  const { t } = useTranslation();
  return (
    <PageTitle
      title={t('tx.details_title')}
      className="mobile:max-tablet:mb-[24px]"
      subtitle={
        isSimple ? null : (
          <HStack gap="3" align="center" justify="center">
            <Skeleton
              height="20px"
              className="mobile:max-tablet:w-[200px] w-[514px]"
            />
            <IconCopy
              className="text-icon opacity-[0.6]"
              width={16}
              height={16}
            />
          </HStack>
        )
      }
    />
  );
}
