import { useTranslation } from 'react-i18next';
import { useFuelStreamXPaused } from '../../hooks/useFuelStreamXPaused/useFuelStreamXPaused';

export const BRIDGE_PAUSED_MESSAGE =
  "Withdrawals are on a short pause while we do some maintenance. Your funds are safe, and you can finalize as soon as we're back.";

export const BridgePausedBanner = () => {
  const { t } = useTranslation();
  const isPaused = useFuelStreamXPaused();

  if (!isPaused) return null;

  return (
    <div className="fuel-edge fuel-appear mb-4 flex flex-col gap-2 border border-[var(--fuel-line)] bg-[var(--fuel-card)] p-4">
      <span className="fuel-label flex items-center gap-2 text-[var(--fuel-element-high-em)]">
        <span aria-hidden className="fuel-square" />
        {t('portal.paused.tag')}
      </span>
      <p role="alert" className="m-0 text-sm text-[var(--fuel-element-mid-em)]">
        {t('portal.paused.bridge_message', {
          defaultValue: BRIDGE_PAUSED_MESSAGE,
        })}
      </p>
    </div>
  );
};
