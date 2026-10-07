import { getProjectImage } from 'app-commons';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { type MouseEvent, forwardRef, useState } from 'react';
import type { TxApp } from '../../utils/txAppsCache';

function stopRowNavigation(event: MouseEvent) {
  event.stopPropagation();
}

const MAX_SHOWN = 2;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

type TxAppTagProps = {
  apps?: TxApp[];
  pending?: boolean;
  delay?: number;
  dense?: boolean;
};

const BOX = {
  md: 'size-[24px]',
  sm: 'size-[16px]',
} as const;

function AppLogo({
  app,
  delay,
  box,
}: { app: TxApp; delay: number; box: string }) {
  const [broken, setBroken] = useState(false);
  if (!app.image || broken) return null;
  const shell = {
    title: app.name,
    className: `pointer-events-auto relative z-10 shrink-0 ${box}`,
    initial: { opacity: 0, scale: 0.6 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, ease: EASE_OUT, delay },
  };
  const face = (
    <>
      <motion.img
        src={getProjectImage(app.image)}
        alt={app.name}
        width={24}
        height={24}
        loading="lazy"
        className={`${box} object-cover`}
        onError={() => setBroken(true)}
        initial={{ scale: 0.3, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT, delay }}
      />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 border border-[var(--fuel-primary)]"
        initial={{ scale: 1, opacity: 0.9 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: delay + 0.12 }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--fuel-primary)] to-transparent opacity-40"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 0.7, ease: 'easeInOut', delay: delay + 0.15 }}
        />
      </span>
    </>
  );
  if (!app.url) return <motion.span {...shell}>{face}</motion.span>;
  return (
    <motion.a
      href={app.url}
      target="_blank"
      rel="noreferrer"
      onClick={stopRowNavigation}
      {...shell}
    >
      {face}
    </motion.a>
  );
}

// popLayout clones this child and passes a ref so it can measure the exit.
const Scanning = forwardRef<HTMLSpanElement, { dense?: boolean }>(
  function Scanning({ dense }, ref) {
    return (
      <motion.span
        ref={ref}
        aria-hidden
        className={`relative block shrink-0 overflow-hidden border border-[var(--fuel-line)] ${dense ? BOX.sm : BOX.md}`}
        exit={{ opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.15 }}
      >
        <motion.span
          className="absolute inset-x-0 h-px bg-[var(--fuel-primary)]"
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{
            duration: 1.2,
            ease: 'easeInOut',
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      </motion.span>
    );
  },
);

function StaticTag({ apps, dense }: { apps: TxApp[]; dense?: boolean }) {
  const box = dense ? BOX.sm : BOX.md;
  const shown = apps.slice(0, MAX_SHOWN);
  const hidden = apps.length - shown.length;
  return (
    <span className="flex min-w-0 items-center gap-1">
      {shown
        .filter((app): app is TxApp & { image: string } => Boolean(app.image))
        .map((app) =>
          app.url ? (
            <a
              key={app.name}
              href={app.url}
              target="_blank"
              rel="noreferrer"
              title={app.name}
              onClick={stopRowNavigation}
              className="pointer-events-auto relative z-10 shrink-0"
            >
              <img
                src={getProjectImage(app.image)}
                alt={app.name}
                width={24}
                height={24}
                className={`${box} object-cover`}
              />
            </a>
          ) : (
            <img
              key={app.name}
              src={getProjectImage(app.image)}
              alt={app.name}
              title={app.name}
              width={24}
              height={24}
              className={`${box} shrink-0 object-cover`}
            />
          ),
        )}
      {hidden > 0 && (
        <span
          className={`shrink-0 text-[var(--fuel-element-low-em)] ${dense ? 'text-[12px] leading-[18px]' : 'text-sm'}`}
        >
          +{hidden}
        </span>
      )}
    </span>
  );
}

export function TxAppTag({ apps, pending, delay = 0, dense }: TxAppTagProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return apps?.length ? <StaticTag apps={apps} dense={dense} /> : null;
  }

  const shown = apps?.slice(0, MAX_SHOWN) ?? [];
  const hidden = (apps?.length ?? 0) - shown.length;

  return (
    <span className="flex min-w-0 items-center gap-1">
      <AnimatePresence mode="popLayout">
        {pending && <Scanning key="scanning" dense={dense} />}
      </AnimatePresence>
      {!pending &&
        shown.map((app, i) => (
          <AppLogo
            key={app.name}
            app={app}
            delay={delay + i * 0.08}
            box={dense ? BOX.sm : BOX.md}
          />
        ))}
      {!pending && hidden > 0 && (
        <motion.span
          className={`shrink-0 text-[var(--fuel-element-low-em)] ${dense ? 'text-[12px] leading-[18px]' : 'text-sm'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + shown.length * 0.08 + 0.2 }}
        >
          +{hidden}
        </motion.span>
      )}
    </span>
  );
}
