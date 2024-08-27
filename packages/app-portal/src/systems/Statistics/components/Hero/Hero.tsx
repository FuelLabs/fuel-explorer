import { StatsHeader } from '../StatsHeader/StatsHeader';

const Hero = () => {
  return (
    <div className="w-full flex flex-wrap gap-3">
      <StatsHeader
        titleProp="Transaction"
        valuesProp="307, 952 793, 341"
        timeProp="All Time"
      />
      <StatsHeader
        titleProp="Transaction Per Second (TPS)"
        valuesProp="3,299"
        timeProp="Last 1 Hour"
      />
      <StatsHeader
        titleProp="Total Network Fees (ETH)"
        valuesProp="2,292.777"
        timeProp="Last 24h"
      />
      <StatsHeader titleProp="Blocks" valuesProp="41,098" timeProp="Last 24h" />
    </div>
  );
};

export default Hero;
