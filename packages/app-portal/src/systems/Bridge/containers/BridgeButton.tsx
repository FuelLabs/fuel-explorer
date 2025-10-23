import { Button, Checkbox, Text, VStack } from '@fuels/ui';
import { relativeUrl } from 'app-commons';
import { useMemo, useState } from 'react';
import { useBridgeButton } from '../hooks';
import {
  WithdrawWarning,
  useWithdrawWarning,
} from '../hooks/useWithdrawWarning';

export const BridgeButton = () => {
  const [acceptWithdrawWarning, setAcceptWithdrawWarning] = useState(false);
  const { isExceeded } = useWithdrawWarning();
  const {
    text,
    hasAcceptedTerms,
    handlers,
    isLoading,
    agree,
    loadingText,
    isDisabled: isDisabledButton,
  } = useBridgeButton();

  const isDisabled = useMemo<boolean>(() => {
    if (isExceeded === WithdrawWarning.Threshold) {
      return !acceptWithdrawWarning;
    }

    return isDisabledButton || isExceeded === WithdrawWarning.Limit;
  }, [isDisabledButton, isExceeded, acceptWithdrawWarning]);

  return (
    <VStack gap="2">
      {isExceeded === WithdrawWarning.Threshold && (
        <Text as="label" size="2">
          <Checkbox
            color="green"
            size="1"
            mr="2"
            aria-label="Withdraw warning"
            checked={acceptWithdrawWarning}
            onCheckedChange={(value) => {
              setAcceptWithdrawWarning(Boolean(value));
            }}
          />
          I understand this withdrawal exceeds the weekly limit and will be
          blocked during relay. I still want to proceed.
        </Text>
      )}

      {!hasAcceptedTerms && (
        <Text as="label" size="2">
          <Checkbox
            color="green"
            size="1"
            mr="2"
            aria-label="Terms of Service"
            checked={agree}
            onCheckedChange={(value) => handlers.setAgree(Boolean(value))}
          />
          I have read and agree to the updated{' '}
          <a
            href={relativeUrl('terms-of-service.pdf')}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-12 transition-colors"
          >
            Terms of Service
          </a>
        </Text>
      )}
      <Button
        isLoading={isLoading}
        loadingText={loadingText}
        disabled={isDisabled}
        color="green"
        size="3"
        aria-label={text}
        onClick={handlers.action}
      >
        {text}
      </Button>
    </VStack>
  );
};
