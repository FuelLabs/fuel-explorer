import { RigStakingPage } from 'app-staking';
import { Helmet } from 'react-helmet-async';

const StakingOnFuelPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Staking on Fuel - Fuel Explorer</title>
        <meta
          name="description"
          content="Stake your tokens directly on the Fuel network"
        />
      </Helmet>
      <RigStakingPage />
    </>
  );
};

export default StakingOnFuelPage;
