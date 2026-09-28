import { Alert } from '@fuels/ui';
import { IconInfoCircle } from '@tabler/icons-react';
import { useFuelStreamXPaused } from '../../hooks/useFuelStreamXPaused/useFuelStreamXPaused';

export const BRIDGE_PAUSED_MESSAGE =
  "Withdrawals are on a short pause while we do some maintenance. Your funds are safe, and you can finalize as soon as we're back.";

export const BridgePausedBanner = () => {
  const isPaused = useFuelStreamXPaused();

  if (!isPaused) return null;

  return (
    <Alert color="orange" size="2" variant="surface" className="mb-4">
      <Alert.Icon>
        <IconInfoCircle size={20} />
      </Alert.Icon>
      <Alert.Text>{BRIDGE_PAUSED_MESSAGE}</Alert.Text>
    </Alert>
  );
};
