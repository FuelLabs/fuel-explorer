import { RoundedContainer } from '@fuels/ui';
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
    borderRadius: '4px',
    transition: 'width 0.4s ease-in-out',
  };
  const buildingBarStyle = {
    width: `${buildingPercentage}%`,
    height: '5px',
    borderRadius: '4px',
    transition: 'width 0.4s ease-in-out',
  };

  return (
    <RoundedContainer className="validators-chart h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] leading-[24px] text-heading font-semibold">
          Fuel Dapps
        </h3>
        <a
          className="text-[13px] leading-[20px] text-muted block"
          href="https://app.fuel.network/ecosystem"
        >
          View All
        </a>
      </div>
      <h2 className="text-[27px] lg:text-[32px] leading-[36px] text-heading font-bold">
        {total}
      </h2>

      <div className="py-4">
        <div className="progress-bar-background">
          <div className="w-full flex">
            <div
              style={activeBarStyle}
              className="dark:bg-[rgb(73,211,112)] bg-[rgb(82,238,135)]"
            />
            <div
              style={buildingBarStyle}
              className="dark:bg-[rgb(87, 87, 87)] bg-[rgb(234,234,234)]"
            />
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
                className="w-5 rounded"
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
