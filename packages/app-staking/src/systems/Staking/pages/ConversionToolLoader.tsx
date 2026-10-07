import { GridFrame, LoadingBox } from '@fuels/ui';
import { useTranslation } from 'react-i18next';

export const ConversionToolLoader = () => {
  const { t } = useTranslation();
  return (
    <div>
      <GridFrame className="mt-5 grid-cols-1 md:grid-cols-2">
        {[1, 2].map((cell) => (
          <div
            key={cell}
            className="fuel-edge flex flex-col justify-between gap-6 px-6 py-5 tablet:px-10"
          >
            <LoadingBox className="h-4 w-32 !rounded-none" />
            <LoadingBox className="h-6 w-40 !rounded-none" />
          </div>
        ))}
      </GridFrame>

      <div className="mt-16 flex flex-col gap-4">
        <span className="fuel-label">{t('staking.upgrade.vesting_fuel')}</span>
        <LoadingBox className="h-[72px] w-full !rounded-none" />
      </div>
    </div>
  );
};
