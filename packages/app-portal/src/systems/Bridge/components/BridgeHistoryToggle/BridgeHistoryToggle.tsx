import { Button } from '@fuels/ui';
import { IconArrowBack, IconHistory } from '@fuels/ui';
import { Routes } from 'app-commons';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { tv } from 'tailwind-variants';
import { RollingLabel } from '../RollingLabel/RollingLabel';

const ICON_SPRING = {
  type: 'spring',
  stiffness: 420,
  damping: 26,
  mass: 0.6,
} as const;

// Entering history turns the clock back; leaving turns it forward.
const iconVariants = {
  enter: (direction: number) => ({
    rotate: direction * 120,
    scale: 0.4,
    opacity: 0,
  }),
  center: { rotate: 0, scale: 1, opacity: 1 },
  exit: (direction: number) => ({
    rotate: direction * -120,
    scale: 0.4,
    opacity: 0,
  }),
};

export const BridgeHistoryToggle = () => {
  const { t } = useTranslation();
  const classes = styles();
  const location = useLocation();
  const reduce = useReducedMotion();

  const isBridgeHistory = location.pathname === Routes.bridgeHistory();
  const direction = isBridgeHistory ? 1 : -1;
  const Icon = isBridgeHistory ? IconArrowBack : IconHistory;

  return (
    <Button
      as={Link}
      to={isBridgeHistory ? Routes.bridge() : Routes.bridgeHistory()}
      size="2"
      color="gray"
      variant="ghost"
      className={classes.toggle()}
      aria-label={
        isBridgeHistory
          ? t('portal.bridge.back_to_home')
          : t('portal.bridge.transaction_history')
      }
    >
      <span className={classes.icon()}>
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.span
            key={isBridgeHistory ? 'back' : 'history'}
            custom={direction}
            variants={iconVariants}
            initial={reduce ? false : 'enter'}
            animate="center"
            exit={reduce ? undefined : 'exit'}
            transition={ICON_SPRING}
            className="flex"
          >
            <Icon size={14} />
          </motion.span>
        </AnimatePresence>
      </span>
      <RollingLabel
        text={
          isBridgeHistory ? t('portal.bridge.back') : t('portal.bridge.history')
        }
        direction={direction}
      />
    </Button>
  );
};

const styles = tv({
  slots: {
    toggle: 'h-9 shrink-0 min-w-[96px] justify-center gap-1.5',
    icon: 'relative inline-flex size-[14px] items-center justify-center',
  },
});
