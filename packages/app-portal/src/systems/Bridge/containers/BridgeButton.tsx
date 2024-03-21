import { Button } from '@fuels/ui';
import { useBridgeButton } from '../hooks';

export const BridgeButton = () => {
  const { text, handlers, isLoading, isDisabled } = useBridgeButton();

  return (
    <Button
      isLoading={isLoading}
      disabled={isDisabled}
      color="green"
      size="3"
      aria-label={text}
      onClick={handlers.action}
    >
      {text}
    </Button>
  );
};
