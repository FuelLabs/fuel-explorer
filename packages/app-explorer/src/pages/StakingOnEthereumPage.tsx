import { Helmet } from 'react-helmet-async';
import { Navigate, useLocation } from 'react-router-dom';
import { StakingPage } from '~staking/index';

const StakingOnEthereumPage: React.FC = () => {
  const location = useLocation();

  // Redirect /staking/on-ethereum to /staking/on-ethereum/positions (matching Next.js behavior)
  if (location.pathname === '/staking/on-ethereum') {
    return <Navigate to="/staking/on-ethereum/positions" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Staking on Ethereum - Fuel Explorer</title>
        <meta
          name="description"
          content="Stake your tokens on Ethereum for Fuel network"
        />
      </Helmet>
      <StakingPage />
    </>
  );
};

export default StakingOnEthereumPage;
