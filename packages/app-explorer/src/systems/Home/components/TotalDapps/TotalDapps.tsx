import { RoundedContainer } from '@fuels/ui';
import Link from 'next/link';
import React from 'react';

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
  const _image = 'zap';

  return (
    <RoundedContainer className="validators-chart h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] leading-[24px] text-heading font-semibold">
          Fuel Dapps
        </h3>
        <Link
          className="text-[13px] leading-[20px] text-muted block"
          href="https://app.fuel.network/ecosystem"
        >
          View All
        </Link>
      </div>
      <h2 className="text-[32px] leading-[36px] text-heading font-bold">
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
            <Link
              className="flex items-center gap-3 mt-3"
              href={feature.url}
              key={feature.name}
            >
              <img
                src={`https://app.fuel.network/ecosystem/images/${feature.image}.jpeg`}
                alt=""
                className="w-5 rounded"
              />
              <p className="text-[13px] leading-[20px] block">{feature.name}</p>
            </Link>
          );
        })}
      </div>
    </RoundedContainer>
  );
};
<style jsx>{`
  .validators-chart {
    width: 100%;
    max-width: 350px;
    padding: 20px;
    background-color: #1e1e1e;
    border-radius: 12px;
    color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  h3 {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 500;
  }
  .status-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .status-label {
    font-size: 14px;
    color: #ccc;
  }
  .status-number {
    font-size: 14px;
    font-weight: bold;
  }
  .progress-bar-background {
    width: 100%;
    background-color: #333;
    border-radius: 4px;
  }
  .percentage-label {
    margin-top: 8px;
    text-align: right;
    font-size: 14px;
    color: #fff;
  }
`}</style>;
export default TotalDapps;
