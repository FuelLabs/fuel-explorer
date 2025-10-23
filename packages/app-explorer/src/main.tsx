import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ConnectProvider } from '~portal/systems/Settings/providers/ConnectProvider';
import { FuelConnectProvider } from '~portal/systems/Settings/providers/FuelConnectProvider/FuelConnectProvider';
import { StoreProvider } from '~portal/systems/Store';
import App from './App.tsx';

// Import CSS - index.css has everything we need
import './index.css';
import {
  ThemeProvider,
  useTheme,
} from './systems/Core/components/Theme/ThemeProvider';

// Wrapper component to pass theme to FuelConnectProvider
function FuelConnectProviderWithTheme({
  children,
}: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  return (
    <FuelConnectProvider theme={resolvedTheme}>{children}</FuelConnectProvider>
  );
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <ThemeProvider>
            <ConnectProvider>
              <FuelConnectProviderWithTheme>
                <BrowserRouter>
                  <App />
                  <Analytics />
                </BrowserRouter>
              </FuelConnectProviderWithTheme>
            </ConnectProvider>
          </ThemeProvider>
        </StoreProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
