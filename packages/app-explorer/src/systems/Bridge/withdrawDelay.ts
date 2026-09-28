import { createContext, useContext, useEffect } from 'react';

// The delay is read with wallet code, which lives in the lazy page chunks,
// while the frame that shows it lives in the eagerly loaded layout.
const SetWithdrawDelayContext = createContext<(delay: string) => void>(
  () => {},
);

export const WithdrawDelayProvider = SetWithdrawDelayContext.Provider;

export function useReportWithdrawDelay(delay: string) {
  const setDelay = useContext(SetWithdrawDelayContext);
  useEffect(() => setDelay(delay), [delay, setDelay]);
}
