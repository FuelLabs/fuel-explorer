import { Button } from '@fuels/ui';
import { useBridgeButton } from '../hooks';

export const BridgeButton = () => {
  const { text, handlers, isLoading, isDisabled } = useBridgeButton();
  const _text = text === 'Connect Ethereum Wallet' ? text : 'Catchme';

  return (
    <Button
      isLoading={isLoading}
      disabled={isDisabled}
      color="green"
      size="3"
      aria-label={_text}
      onClick={handlers.action}
    >
      {_text}
    </Button>
  );
};
