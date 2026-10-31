import { motion, useReducedMotion } from 'framer-motion';
import { EASE_EXIT, EASE_OUT } from '~staking/systems/Core/utils/motion';

const SLIDE = 16;

type Motion = { reduced: boolean };

// Each page slides in from the side the user is heading to. Reduced motion
// keeps the fade and drops the slide.
function slide(enter: number, exit: number) {
  return {
    initial: ({ reduced }: Motion) => ({
      opacity: 0,
      x: reduced ? 0 : enter,
    }),
    animate: ({ reduced }: Motion) => ({
      opacity: 1,
      x: 0,
      transition: { duration: reduced ? 0.15 : 0.3, ease: EASE_OUT },
    }),
    exit: ({ reduced }: Motion) => ({
      opacity: 0,
      x: reduced ? 0 : exit,
      transition: { duration: 0.15, ease: EASE_EXIT },
    }),
  };
}

const first = slide(-SLIDE, -SLIDE);
const middleForward = slide(SLIDE, -SLIDE);
const middleBack = slide(-SLIDE, SLIDE);
const last = slide(SLIDE, -SLIDE);

type DirectionProps = {
  children: React.ReactNode;
  direction?: string;
};

type Props = {
  children: React.ReactNode;
};

function Page({
  pageKey,
  variants,
  children,
}: {
  pageKey: string;
  variants: ReturnType<typeof slide>;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.div
      key={pageKey}
      custom={{ reduced }}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

export const FirstPageWrapper = ({ children }: Props) => (
  <Page pageKey="start-page" variants={first}>
    {children}
  </Page>
);

export const MiddlePageWrapper = ({
  children,
  direction = 'forward',
}: DirectionProps) => (
  <Page
    pageKey={`middle-page-${direction}`}
    variants={direction === 'forward' ? middleForward : middleBack}
  >
    {children}
  </Page>
);

export const LastPageWrapper = ({ children }: Props) => (
  <Page pageKey="end-page" variants={last}>
    {children}
  </Page>
);
