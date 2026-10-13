import { useTranslation } from 'react-i18next';
import { EmptyCard } from '../EmptyCard/EmptyCard';

export function EmptyAssets({ entity }: { entity: string }) {
  const { t } = useTranslation();
  return (
    <EmptyCard>
      <EmptyCard.Title>{t('core.empty.assets_title')}</EmptyCard.Title>
      <EmptyCard.Description>
        {t('core.empty.assets_description', {
          entity: t(`core.entity.${entity}`, { defaultValue: entity }),
        })}
      </EmptyCard.Description>
    </EmptyCard>
  );
}
