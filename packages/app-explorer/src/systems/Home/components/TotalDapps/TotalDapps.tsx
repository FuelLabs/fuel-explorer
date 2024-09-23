import { RoundedContainer } from '@fuels/ui';
// components/ValidatorsChart.tsx
import React from 'react';

interface ValidatorStatusProps {
  active: number;
  total: number;
}

const TotalDapps: React.FC<ValidatorStatusProps> = ({ active, total }) => {
  const activePercentage = (active / total) * 100;
  const buildingPercentage = ((total - active) / total) * 100;

  const activeBarStyle = {
    width: `${activePercentage}%`,
    backgroundColor: 'green',
    height: '8px', // Slightly increased height for better visibility
    borderRadius: '4px', // Smoother edges
    transition: 'width 0.4s ease-in-out', // Smooth transition when values change
  };

  const buildingBarStyle = {
    width: `${buildingPercentage}%`,
    backgroundColor: 'whitesmoke',
    height: '8px', // Slightly increased height for better visibility
    borderRadius: '4px', // Smoother edges
    transition: 'width 0.4s ease-in-out', // Smooth transition when values change
  };

  return (
    <RoundedContainer className="validators-chart">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] leading-[24px] text-heading font-semibold">
          Total Dapps
        </h3>
        <span className="text-[13px] leading-[20px] text-muted block">
          View All
        </span>
      </div>
      <h2 className="text-[32px] leading-[36px] text-heading font-bold">
        {total}
      </h2>

      <div className="py-4">
        <div className="progress-bar-background">
          <div className="w-full flex">
            <div style={activeBarStyle} className="bg-brand" />
            <div style={buildingBarStyle} className="bg-gray-1" />
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-[13px] leading-[20px] text-muted block">
            Active. {active}
          </span>
          <span className="text-[13px] leading-[20px] text-muted block">
            Building. {total - active}
          </span>
        </div>
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
