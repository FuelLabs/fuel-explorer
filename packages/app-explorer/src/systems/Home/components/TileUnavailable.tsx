import { RoundedContainer } from '@fuels/ui';
import { useTranslation } from 'react-i18next';

// The tile's query keeps polling, so it recovers on its own.
export function TileUnavailable({ label }: { label: string }) {
  const { t } = useTranslation();
  return (
    <RoundedContainer className="h-full py-4 px-5 flex flex-col">
      <h2 className="fuel-label m-0">{label}</h2>
      <p className="m-0 mt-4 text-[13px] leading-[20px] text-muted">
        {t('home.unavailable')}
      </p>
    </RoundedContainer>
  );
}
