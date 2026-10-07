import { Button, Checkbox, VStack } from '@fuels/ui';
import { AnimatedHeight } from '@fuels/ui';
import { relativeUrl } from 'app-commons';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBridgeButton } from '../hooks';
import {
  WithdrawWarning,
  useWithdrawWarning,
} from '../hooks/useWithdrawWarning';

const LABEL =
  'fuel-eyebrow flex cursor-pointer items-start gap-2 !leading-5 text-[var(--fuel-element-mid-em)]';

export const BridgeButton = () => {
  const { t } = useTranslation();
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
      <AnimatedHeight enabled={isExceeded === WithdrawWarning.Threshold}>
        <div className="p-0.5">
          {/* biome-ignore lint/a11y/noLabelWithoutControl: the Radix checkbox sits inside the label */}
          <label className={LABEL}>
            <Checkbox
              size="1"
              aria-label={t('portal.bridge.withdraw_warning_label')}
              checked={acceptWithdrawWarning}
              onCheckedChange={(value) => {
                setAcceptWithdrawWarning(Boolean(value));
              }}
            />
            <span>{t('portal.bridge.withdraw_warning_accept')}</span>
          </label>
        </div>
      </AnimatedHeight>

      <AnimatedHeight enabled={!hasAcceptedTerms}>
        <div className="p-0.5">
          {/* biome-ignore lint/a11y/noLabelWithoutControl: the Radix checkbox sits inside the label */}
          <label className={LABEL}>
            <Checkbox
              size="1"
              aria-label={t('portal.bridge.terms_label')}
              checked={agree}
              onCheckedChange={(value) => handlers.setAgree(Boolean(value))}
            />
            <span>
              {t('portal.bridge.terms_accept')}{' '}
              <a
                href={relativeUrl('terms-of-service.pdf')}
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors hover:text-heading motion-reduce:transition-none"
              >
                {t('portal.bridge.terms_link')}
              </a>
            </span>
          </label>
        </div>
      </AnimatedHeight>
      <Button
        isLoading={isLoading}
        loadingText={loadingText}
        disabled={isDisabled}
        size="3"
        aria-label={text}
        onClick={handlers.action}
      >
        {text}
      </Button>
    </VStack>
  );
};
