import { Button } from '@fuel-ui/react';

import { useBridgeButton } from '../hooks';

export const BridgeButton = () => {
  const { text, handlers, isLoading, isDisabled } = useBridgeButton();

  return (
    <Button
      isLoading={isLoading}
      isDisabled={isDisabled}
      variant={isDisabled ? 'ghost' : 'solid'}
      intent={isDisabled ? 'base' : 'primary'}
      size="lg"
      aria-label={text}
      onPress={handlers.action}
    >
      <b>{text}</b>
    </Button>
  );
};
