import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// Page Components
import { AccountPage } from './pages/AccountPage';
import { BlockPage } from './pages/BlockPage';
import { BlocksPage } from './pages/BlocksPage';
import ContractPage from './pages/ContractPage';
import { EcosystemPageWrapper } from './pages/EcosystemPage';
import { HomePage } from './pages/HomePage';
import TransactionLoadingPage from './pages/TransactionLoadingPage';
import { TransactionPage } from './pages/TransactionPage';
import UpgradePage from './pages/UpgradePage';

// Layout Components (only keeping the ones we still need)
import BlockLayout from './layouts/BlockLayout';
import BridgeLayout from './layouts/BridgeLayout';
import ContractLayout from './layouts/ContractLayout';
import StakingLayout from './layouts/StakingLayout';
import TransactionLayout from './layouts/TransactionLayout';
import { Layout } from './systems/Core/components/Layout/Layout';
import { StakingScreenLoader } from './systems/Staking/screens/StakingScreenLoader';

import { ErrorPageComponent } from './systems/Core/components/ErrorPage/ErrorPage';

// Staking pages pull in wagmi, viem and connectkit.
const StakingOnEthereumPage = lazy(
  () => import('./pages/StakingOnEthereumPage'),
);
const StakingOnFuelPage = lazy(() => import('./pages/StakingOnFuelPage'));

const OverlayDialog = lazy(() =>
  import('app-portal').then((module) => ({ default: module.OverlayDialog })),
);

function App() {
  return (
    <>
      <Layout>
        <TooltipProvider>
          <Routes>
            {/* Home route */}
            <Route path="/" element={<HomePage />} />

            {/* Blocks routes */}
            <Route path="/blocks" element={<BlocksPage />} />

            {/* Block detail routes with nested layouts */}
            <Route path="/block/:id" element={<BlockLayout />}>
              <Route index element={<Navigate to="simple" replace />} />
              <Route path=":mode" element={<BlockPage />} />
            </Route>

            {/* Transaction routes with nested layouts */}
            <Route path="/tx/:id" element={<TransactionLayout />}>
              <Route index element={<Navigate to="simple" replace />} />
              <Route path=":mode" element={<TransactionPage />} />
            </Route>
            <Route
              path="/tx/:id/loading"
              element={<TransactionLoadingPage />}
            />

            <Route path="/account/:id" element={<AccountPage />} />
            <Route path="/account/:id/:tab" element={<AccountPage />} />

            <Route path="/contract/:id" element={<ContractLayout />}>
              <Route index element={<Navigate to="assets" replace />} />
              <Route path=":tab" element={<ContractPage />} />
            </Route>

            <Route path="/bridge" element={<BridgeLayout />}>
              <Route index />
              <Route path="history" />
            </Route>

            <Route path="/staking" element={<StakingLayout />}>
              <Route
                index
                element={<Navigate to="/staking/on-fuel" replace />}
              />
              <Route
                path="on-ethereum"
                element={
                  <Suspense fallback={<StakingScreenLoader />}>
                    <StakingOnEthereumPage />
                  </Suspense>
                }
              />
              <Route
                path="on-ethereum/positions"
                element={
                  <Suspense fallback={<StakingScreenLoader />}>
                    <StakingOnEthereumPage />
                  </Suspense>
                }
              />
              <Route
                path="on-ethereum/validators"
                element={
                  <Suspense fallback={<StakingScreenLoader />}>
                    <StakingOnEthereumPage />
                  </Suspense>
                }
              />
              <Route
                path="on-ethereum/transactions"
                element={
                  <Suspense fallback={<StakingScreenLoader />}>
                    <StakingOnEthereumPage />
                  </Suspense>
                }
              />
              <Route
                path="on-fuel"
                element={
                  <Suspense fallback={<StakingScreenLoader tab="fuel" />}>
                    <StakingOnFuelPage />
                  </Suspense>
                }
              />
            </Route>

            <Route path="/ecosystem" element={<EcosystemPageWrapper />} />

            <Route path="/upgrade" element={<UpgradePage />} />

            <Route path="*" element={<ErrorPageComponent />} />
          </Routes>
        </TooltipProvider>
      </Layout>

      {/* Render overlay dialogs for transaction completion */}
      <Suspense fallback={null}>
        <OverlayDialog />
      </Suspense>
    </>
  );
}

export default App;
