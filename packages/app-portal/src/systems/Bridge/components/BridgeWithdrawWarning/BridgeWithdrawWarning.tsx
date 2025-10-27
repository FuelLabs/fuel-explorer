import { Alert, AnimatedHeight } from '@fuels/ui';
import {
  IconAlertCircleFilled,
  IconInfoCircleFilled,
} from '@tabler/icons-react';
import {
  WITHDRAW_WARNING_PERCENTAGE,
  WithdrawWarning,
  useWithdrawWarning,
} from '../../hooks/useWithdrawWarning';

export const BridgeWithdrawWarning = () => {
  const { isExceeded } = useWithdrawWarning();

  const isWithdrawOverThreshold = isExceeded === WithdrawWarning.Threshold;
  const isWithdrawOverLimit = isExceeded === WithdrawWarning.Limit;

  return (
    <AnimatedHeight enabled={isWithdrawOverThreshold || isWithdrawOverLimit}>
      <div className="pt-2">
        {isWithdrawOverThreshold && (
          <Alert
            variant="soft"
            color="blue"
            size="1"
            className="border border-blue-6"
          >
            <Alert.Icon>
              <IconInfoCircleFilled size="md" />
            </Alert.Icon>
            <Alert.Text>
              This withdrawal is over {WITHDRAW_WARNING_PERCENTAGE}% of the
              weekly limit for this asset. While large withdrawals may be
              blocked during relay, splitting into smaller transactions could
              allow you to withdraw a larger total amount before reaching the
              weekly limit.
            </Alert.Text>
          </Alert>
        )}
        {isWithdrawOverLimit && (
          <Alert
            variant="soft"
            color="red"
            size="1"
            className="border border-red-6"
          >
            <Alert.Icon>
              <IconAlertCircleFilled size="md" />
            </Alert.Icon>
            <Alert.Text>
              This withdrawal exceeds the weekly limit for this asset and would
              be blocked during relay. Splitting into smaller transactions could
              allow you to withdraw a larger total amount before reaching the
              weekly limit.
            </Alert.Text>
          </Alert>
        )}
      </div>
    </AnimatedHeight>
  );
};
