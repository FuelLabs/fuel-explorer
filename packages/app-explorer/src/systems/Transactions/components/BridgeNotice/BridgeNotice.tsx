import { Routes as PortalRoutes } from 'app-commons';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { TxNotice } from '~/systems/Transaction/component/TxNotice/TxNotice';

export function BridgeNotice({ className }: { className?: string }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <TxNotice className={className}>
      <Trans
        i18nKey="tx.bridge_notice"
        components={{
          history: (
            <button
              type="button"
              onClick={() => navigate(PortalRoutes.bridgeHistory())}
              className="m-0 cursor-pointer border-0 bg-transparent p-0 text-[length:inherit] text-heading underline underline-offset-4 transition-colors hover:text-[var(--fuel-brand-text)] focus-visible:outline-2 focus-visible:outline-[var(--fuel-primary)] motion-reduce:transition-none"
            >
              {t('tx.bridge_history_link')}
            </button>
          ),
        }}
      />
    </TxNotice>
  );
}
