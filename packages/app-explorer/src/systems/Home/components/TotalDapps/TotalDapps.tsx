import { AnimatedNumber, RoundedContainer } from '@fuels/ui';
import { getProjectImage } from 'app-commons';

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
          <h3 className="fuel-label">Fuel Dapps</h3>
          <a
            className="fuel-label block"
            href="https://app.fuel.network/ecosystem"
          >
            View All
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
            Active: {active}
          </span>
          <span className="text-[12px] leading-[20px] text-muted block font-bold">
            Building: {total - active}
          </span>
        </div>

        <div className="my-2 h-[1px] bg-[rgba(255,255,255,0.04)]" />

        <span className="text-[12px] leading-[20px] text-muted block font-bold">
          Featured Dapps
        </span>

        {featured.map((feature: any) => {
          return (
            <a
              className="flex items-center gap-3 mt-3"
              href={feature.url}
              key={feature.name}
            >
              <img
                src={getProjectImage(feature.image)}
                alt={feature.name}
                className="w-5 h-5 shrink-0 rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <p className="text-[13px] leading-[20px] block">{feature.name}</p>
            </a>
          );
        })}
      </div>
    </RoundedContainer>
  );
};
export default TotalDapps;
