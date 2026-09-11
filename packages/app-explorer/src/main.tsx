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
import { ErrorBoundary } from './systems/Core/components/ErrorBoundary/ErrorBoundary';
import {
  ThemeProvider,
  useTheme,
} from './systems/Core/components/Theme/ThemeProvider';
import { ApiError } from './systems/Core/utils/api';

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
      retry: (failureCount, error) => {
        // Never retry a 429: nginx is already rate-limiting us, so retrying
        // just piles more requests into the same burst. Other 4xx errors
        // are also the caller's fault and won't succeed on retry.
        const status = error instanceof ApiError ? error.status : undefined;
        if (status !== undefined && status >= 400 && status < 500) {
          return false;
        }
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => 1000 * 2 ** attemptIndex, // 1s, 2s, ...
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
                  <ErrorBoundary>
                    <App />
                  </ErrorBoundary>
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
