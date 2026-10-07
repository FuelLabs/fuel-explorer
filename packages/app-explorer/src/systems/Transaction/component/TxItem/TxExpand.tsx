import { type ReactNode, useEffect, useState } from 'react';
import { tv } from 'tailwind-variants';

type TxExpandProps = {
  open: boolean;
  id?: string;
  children: ReactNode;
  className?: string;
};

// The panel folds with grid rows (0fr to 1fr) like .fuel-faq-panel, so only
// the grid track animates. Closing is faster than opening.
export function TxExpand({ open, id, children, className }: TxExpandProps) {
  const classes = styles({ open });
  return (
    <div id={id} className={classes.root({ className })} aria-hidden={!open}>
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

// Mounts folded and opens on the next frame, for content that appears when a
// control is pressed. Reduced motion shows it at once.
export function TxReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <TxExpand open={open} className={className}>
      {children}
    </TxExpand>
  );
}

const styles = tv({
  slots: {
    root: [
      'grid motion-reduce:[transition:none]',
      '[transition-property:grid-template-rows,visibility]',
    ],
  },
  variants: {
    open: {
      true: {
        root: [
          'visible grid-rows-[1fr]',
          '[transition-delay:0s,0s] [transition-duration:450ms,0s]',
          '[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
        ],
      },
      false: {
        root: [
          'invisible grid-rows-[0fr]',
          '[transition-delay:0s,280ms] [transition-duration:280ms,0s]',
          '[transition-timing-function:cubic-bezier(0.4,0,0.2,1)]',
        ],
      },
    },
  },
});
