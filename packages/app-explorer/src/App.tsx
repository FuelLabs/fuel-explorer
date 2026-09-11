import { LoadingBox } from '@fuels/ui';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
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

// Bridge and staking pages pull in wagmi/viem/connectkit; lazy-load them so
// that weight only ships to visitors who open those routes.
const BridgePage = lazy(() => import('./pages/BridgePage'));
const BridgeHistoryPage = lazy(() => import('./pages/BridgeHistoryPage'));
const StakingOnEthereumPage = lazy(
  () => import('./pages/StakingOnEthereumPage'),
);
const StakingOnFuelPage = lazy(() => import('./pages/StakingOnFuelPage'));

// OverlayDialog pulls in the same wallet/bridge dependency chain as the
// bridge pages, so it is lazy-loaded too even though it mounts on every
// route (it renders a closed dialog until the user opens one).
const OverlayDialog = lazy(() =>
  import('app-portal').then((module) => ({ default: module.OverlayDialog })),
);

function App() {
  return (
    <>
      <Helmet>
        <title>Fuel Explorer</title>
        <meta
          name="description"
          content="Fuel Ignition is a high-performance Ethereum layer-2 rollup powered by the FuelVM; built for home verification and scalable for all."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Fuel Explorer" />
        <meta
          property="og:description"
          content="Fuel Ignition is a high-performance Ethereum layer-2 rollup powered by the FuelVM; built for home verification and scalable for all."
        />
        <meta property="og:image" content="/preview.png?v=ignition" />
      </Helmet>

      <Layout contentClassName="[&_.rt-ContainerInner]:flex-col [&_.rt-ContainerInner]:gap-10 bg-gray-3 dark:bg-gray-1">
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
              <Route
                index
                element={
                  <Suspense
                    fallback={<LoadingBox className="w-full h-[400px]" />}
                  >
                    <BridgePage />
                  </Suspense>
                }
              />
              <Route
                path="history"
                element={
                  <Suspense
                    fallback={<LoadingBox className="w-full h-[400px]" />}
                  >
                    <BridgeHistoryPage />
                  </Suspense>
                }
              />
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
                  <Suspense fallback={<StakingScreenLoader />}>
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
