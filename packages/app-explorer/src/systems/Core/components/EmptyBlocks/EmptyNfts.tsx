import { useTranslation } from 'react-i18next';
import { EmptyCard } from '../EmptyCard/EmptyCard';

export function EmptyNfts({ entity }: { entity: string }) {
  const { t } = useTranslation();
  return (
    <EmptyCard>
      <EmptyCard.Title>{t('core.empty.nfts_title')}</EmptyCard.Title>
      <EmptyCard.Description>
        {t('core.empty.nfts_description', {
          entity: t(`core.entity.${entity}`, { defaultValue: entity }),
        })}
      </EmptyCard.Description>
    </EmptyCard>
  );
}
