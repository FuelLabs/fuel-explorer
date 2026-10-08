import { AnimatedNumber, RoundedContainer } from '@fuels/ui';
import { getProjectImage } from 'app-commons';
import { useTranslation } from 'react-i18next';

import type React from 'react';

interface ValidatorStatusProps {
  active: number;
  total: number;
  featured: any;
}

const TotalDapps: React.FC<ValidatorStatusProps> = ({
  active,
  total,
  featured,
}) => {
  const { t } = useTranslation();
  const activeRatio = total > 0 ? Math.min(active / total, 1) : 0;

  return (
    <RoundedContainer className="validators-chart h-full px-5">
      <div className="space-y-[16px]">
        <div className="flex items-center justify-between">
          <h2 className="fuel-label m-0">{t('home.fuel_dapps')}</h2>
          <a
            className="fuel-label block"
            href="https://app.fuel.network/ecosystem"
            rel="noreferrer"
          >
            {t('common.view_all')}
          </a>
        </div>
        <p className="fuel-stat m-0">
          <AnimatedNumber value={total} />
        </p>
      </div>

      <div className="py-2">
        <div className="h-[5px] w-full bg-[var(--fuel-muted)]">
          <div
            className="h-full w-full origin-left bg-[var(--fuel-primary)] transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{ transform: `scaleX(${activeRatio})` }}
          />
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[12px] leading-[20px] text-muted block font-bold">
            {t('common.active', { count: active })}
          </span>
          <span className="text-[12px] leading-[20px] text-muted block font-bold">
            {t('common.building', { count: total - active })}
          </span>
        </div>

        <div className="my-1 h-[1px] bg-[rgba(255,255,255,0.04)]" />

        <span className="text-[12px] leading-[20px] text-muted block font-bold">
          {t('common.top_apps')}
        </span>

        {featured.map(
          (feature: { name: string; image?: string; url?: string }) => {
            const row = (
              <>
                <img
                  src={getProjectImage(feature.image ?? '')}
                  alt={feature.name}
                  className="w-5 h-5 shrink-0 rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <p className="text-[13px] leading-[20px] block">
                  {feature.name}
                </p>
              </>
            );
            if (!feature.url) {
              return (
                <div
                  className="flex items-center gap-3 mt-1"
                  key={feature.name}
                >
                  {row}
                </div>
              );
            }
            return (
              <a
                className="flex items-center gap-3 mt-1"
                href={feature.url}
                target="_blank"
                rel="noreferrer"
                key={feature.name}
              >
                {row}
              </a>
            );
          },
        )}
      </div>
    </RoundedContainer>
  );
};
export default TotalDapps;
