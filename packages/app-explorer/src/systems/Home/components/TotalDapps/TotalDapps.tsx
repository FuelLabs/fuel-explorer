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
  const activePercentage = (active / total) * 100;
  const buildingPercentage = ((total - active) / total) * 100;
  const activeBarStyle = {
    width: `${activePercentage}%`,
    height: '5px',
    borderRadius: 0,
    transition: 'width 0.4s ease-in-out',
  };
  const buildingBarStyle = {
    width: `${buildingPercentage}%`,
    height: '5px',
    borderRadius: 0,
    transition: 'width 0.4s ease-in-out',
  };

  return (
    <RoundedContainer className="validators-chart h-full px-5">
      <div className="space-y-[16px]">
        <div className="flex items-center justify-between">
          <h3 className="fuel-label">{t('home.fuel_dapps')}</h3>
          <a
            className="fuel-label block"
            href="https://app.fuel.network/ecosystem"
          >
            {t('common.view_all')}
          </a>
        </div>
        <h2 className="fuel-stat">
          <AnimatedNumber value={total} />
        </h2>
      </div>

      <div className="py-4">
        <div className="progress-bar-background">
          <div className="w-full flex">
            <div style={activeBarStyle} className="bg-[var(--fuel-primary)]" />
            <div style={buildingBarStyle} className="bg-[var(--fuel-muted)]" />
          </div>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[12px] leading-[20px] text-muted block font-bold">
            {t('common.active', { count: active })}
          </span>
          <span className="text-[12px] leading-[20px] text-muted block font-bold">
            {t('common.building', { count: total - active })}
          </span>
        </div>

        <div className="my-2 h-[1px] bg-[rgba(255,255,255,0.04)]" />

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
                  className="flex items-center gap-3 mt-3"
                  key={feature.name}
                >
                  {row}
                </div>
              );
            }
            return (
              <a
                className="flex items-center gap-3 mt-3"
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
