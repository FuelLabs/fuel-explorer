import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Helmet } from 'react-helmet-async';
import { Navigate, Route, Routes } from 'react-router-dom';

// Page Components
import { AccountPage } from './pages/AccountPage';
import { BlockPage } from './pages/BlockPage';
import { BlocksPage } from './pages/BlocksPage';
import BridgeHistoryPage from './pages/BridgeHistoryPage';
import BridgePage from './pages/BridgePage';
import ContractPage from './pages/ContractPage';
import { EcosystemPageWrapper } from './pages/EcosystemPage';
import { HomePage } from './pages/HomePage';
import StakingOnEthereumPage from './pages/StakingOnEthereumPage';
import StakingOnFuelPage from './pages/StakingOnFuelPage';
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

// Portal Components
import { OverlayDialog } from 'app-portal';
import { ErrorPageComponent } from './systems/Core/components/ErrorPage/ErrorPage';

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
              <Route index element={<BridgePage />} />
              <Route path="history" element={<BridgeHistoryPage />} />
            </Route>

            <Route path="/staking" element={<StakingLayout />}>
              <Route
                index
                element={<Navigate to="/staking/on-fuel" replace />}
              />
              <Route path="on-ethereum" element={<StakingOnEthereumPage />} />
              <Route
                path="on-ethereum/positions"
                element={<StakingOnEthereumPage />}
              />
              <Route
                path="on-ethereum/validators"
                element={<StakingOnEthereumPage />}
              />
              <Route
                path="on-ethereum/transactions"
                element={<StakingOnEthereumPage />}
              />
              <Route path="on-fuel" element={<StakingOnFuelPage />} />
            </Route>

            <Route path="/ecosystem" element={<EcosystemPageWrapper />} />

            <Route path="/upgrade" element={<UpgradePage />} />

            <Route path="*" element={<ErrorPageComponent />} />
          </Routes>
        </TooltipProvider>
      </Layout>

      {/* Render overlay dialogs for transaction completion */}
      <OverlayDialog />
    </>
  );
}

export default App;
