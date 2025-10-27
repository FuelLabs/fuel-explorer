import { motion } from 'framer-motion';
import { PAGE_VARIANTS_ANIMATION } from '../../containers/constants';

type DirectionProps = {
  children: React.ReactNode;
  direction?: string;
};

type Props = {
  children: React.ReactNode;
};

export const FirstPageWrapper = ({ children }: Props) => {
  return (
    <motion.div
      key="start-page"
      variants={PAGE_VARIANTS_ANIMATION}
      initial="startInitial"
      animate="startAnimate"
      exit="startExit"
      transition={{ duration: 0.25 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export const MiddlePageWrapper = ({
  children,
  direction = 'forward',
}: DirectionProps) => {
  return (
    <motion.div
      key={`middle-page-${direction}`}
      variants={PAGE_VARIANTS_ANIMATION}
      initial={direction === 'forward' ? 'middleInitial' : 'middleBackInitial'}
      animate="middleAnimate"
      exit={direction === 'forward' ? 'middleExit' : 'middleBackExit'}
      transition={{ duration: 0.25 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export const LastPageWrapper = ({ children }: Props) => {
  return (
    <motion.div
      key="end-page"
      variants={PAGE_VARIANTS_ANIMATION}
      initial="endInitial"
      animate="endAnimate"
      exit="endExit"
      transition={{ duration: 0.25 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};
