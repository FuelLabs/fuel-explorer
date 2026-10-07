import { Alert } from '@fuels/ui';
import { IconAlertCircleFilled, IconInfoCircleFilled } from '@fuels/ui';
import { AnimatedHeight } from '@fuels/ui';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  WITHDRAW_WARNING_PERCENTAGE,
  WithdrawWarning,
  useWithdrawWarning,
} from '../../hooks/useWithdrawWarning';

const EASE = [0.16, 1, 0.3, 1] as const;

export const BridgeWithdrawWarning = () => {
  const { t } = useTranslation();
  const { isExceeded } = useWithdrawWarning();
  const reduce = useReducedMotion();

  const isWithdrawOverThreshold = isExceeded === WithdrawWarning.Threshold;
  const isWithdrawOverLimit = isExceeded === WithdrawWarning.Limit;

  // Threshold and Limit swap in place: the old alert fades out, then the new one fades in.
  const fade = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: reduce ? 0.1 : 0.15, ease: EASE },
  };

  return (
    <AnimatedHeight enabled={isWithdrawOverThreshold || isWithdrawOverLimit}>
      <div className="pt-2">
        <AnimatePresence mode="wait" initial={false}>
          {isWithdrawOverThreshold && (
            <motion.div key="threshold" {...fade}>
              <Alert size="1">
                <Alert.Icon>
                  <IconInfoCircleFilled size={16} />
                </Alert.Icon>
                <Alert.Text>
                  {t('portal.bridge.withdraw_threshold', {
                    percentage: WITHDRAW_WARNING_PERCENTAGE,
                  })}
                </Alert.Text>
              </Alert>
            </motion.div>
          )}
          {isWithdrawOverLimit && (
            <motion.div key="limit" {...fade}>
              <Alert size="1" color="red">
                <Alert.Icon>
                  <IconAlertCircleFilled size={16} />
                </Alert.Icon>
                <Alert.Text>{t('portal.bridge.withdraw_limit')}</Alert.Text>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedHeight>
  );
};
