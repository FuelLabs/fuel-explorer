import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Routes } from 'app-commons';
import { ViewMode } from '~/systems/Core/components/ViewMode/ViewMode';
import { ViewModes } from '~/systems/Core/components/ViewMode/constants';
import { PendingTxResponse } from '~/systems/Transaction/constants/pendingTxResponse';
import { TxHeaderLoader } from '../TxHeader/TxHeaderLoader';
import { TxScreenAdvanced } from './TxScreenAdvanced';
import { TxScreenSimpleLoader } from './TxScreenSimpleLoader';
import { TxScreenStandard } from './TxScreenStandard';

type TxScreenLoaderProps = {
  pendingTxResponse?: PendingTxResponse;
  id?: string;
  shouldRedirect?: boolean;
  hideHeader?: boolean;
};

export function TxScreenLoader({
  pendingTxResponse,
  hideHeader,
  id,
  shouldRedirect,
}: TxScreenLoaderProps) {
  const navigate = useNavigate();
  const { mode } = useParams<{ mode?: string }>();

  useEffect(() => {
    if (shouldRedirect && id) {
      navigate(Routes.txSimple(id));
    }
  }, [shouldRedirect, id, navigate]);

  // Graciously reloads the page without causing a full refresh
  useEffect(() => {
    if (
      !pendingTxResponse ||
      pendingTxResponse === PendingTxResponse.InvalidInput ||
      pendingTxResponse === PendingTxResponse.NotPending
    ) {
      return;
    }
    const interval = setInterval(() => {
      // In React Router, we don't have prefetch or refresh methods
      // This functionality would need to be implemented differently
    }, 5000);

    return () => clearInterval(interval);
  }, [id, pendingTxResponse]);

  // Render appropriate loader based on mode
  const renderContent = () => {
    switch (mode) {
      case 'simple':
        return <TxScreenSimpleLoader />;
      case 'standard':
        return <TxScreenStandard isLoading={true} />;
      case 'advanced':
        return <TxScreenAdvanced isLoading={true} />;
      default:
        return <TxScreenStandard isLoading={true} />;
    }
  };

  return (
    <>
      {!hideHeader && <TxHeaderLoader isSimple={mode === 'simple'} />}

      <div className="mb-6">
        <ViewMode
          viewModes={[ViewModes.Simple, ViewModes.Standard, ViewModes.Advanced]}
          isSimpleDisabled={true}
        />
      </div>

      {renderContent()}
    </>
  );
}
