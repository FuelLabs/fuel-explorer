import { Navigate, useLocation } from 'react-router-dom';
import { StakingPage } from '~staking/index';

const StakingOnEthereumPage: React.FC = () => {
  const location = useLocation();

  // Redirect /staking/on-ethereum to /staking/on-ethereum/positions (matching Next.js behavior)
  if (location.pathname === '/staking/on-ethereum') {
    return <Navigate to="/staking/on-ethereum/positions" replace />;
  }

  return <StakingPage />;
};

export default StakingOnEthereumPage;
