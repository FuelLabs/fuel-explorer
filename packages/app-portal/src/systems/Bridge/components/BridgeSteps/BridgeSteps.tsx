import { Spinner } from '@fuels/ui';
import { IconCheck } from '@fuels/ui';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { tv } from 'tailwind-variants';

type Step = {
  name: string;
  status: ReactNode;
  isLoading?: boolean;
  isDone?: boolean;
  isSelected?: boolean;
};

type BridgeStepsProps = {
  steps?: Step[];
};

const NAME_KEYS: Record<string, string> = {
  'Submit to bridge': 'portal.bridge_steps.submit_to_bridge',
  Settlement: 'portal.bridge_steps.settlement',
  'Confirm transaction': 'portal.bridge_steps.confirm_transaction',
  'Receive on Ethereum': 'portal.bridge_steps.receive_on_ethereum',
  'Receive on Fuel': 'portal.bridge_steps.receive_on_fuel',
};

const STATUS_KEYS: Record<string, string> = {
  'Done!': 'portal.bridge_steps.done',
  Waiting: 'portal.bridge_steps.waiting',
  Automatic: 'portal.bridge_steps.automatic',
  Action: 'portal.bridge_steps.action',
  'Action required': 'portal.bridge_steps.action_required',
};

const TIME_LEFT = /^~(.+) left$/;

export const BridgeSteps = ({ steps }: BridgeStepsProps) => {
  const { t } = useTranslation();
  const classes = styles();

  // The hooks keep English ids. Translate only when rendering.
  const stepName = (name: string) =>
    NAME_KEYS[name] ? t(NAME_KEYS[name]) : name;
  const stepStatus = (status: ReactNode) => {
    if (typeof status !== 'string') return status;
    if (STATUS_KEYS[status]) return t(STATUS_KEYS[status]);
    const time = status.match(TIME_LEFT);
    return time
      ? t('portal.bridge_steps.time_left', { time: time[1] })
      : status;
  };

  return (
    <ol className={classes.list()}>
      {steps?.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <li
            key={step.name}
            className={classes.item()}
            data-done={step.isDone}
            data-selected={step.isSelected}
            data-loading={step.isLoading}
          >
            <div className={classes.action()}>
              <span className={classes.nodeColumn()}>
                <span className={classes.node()}>
                  {step.isDone ? (
                    <IconCheck
                      size={10}
                      className={`${classes.icon()} fuel-appear`}
                    />
                  ) : step.isSelected ? (
                    <span aria-hidden className="fuel-square" />
                  ) : (
                    <span className={classes.number()}>{index + 1}</span>
                  )}
                </span>
                {!isLast && <span aria-hidden className={classes.rail()} />}
              </span>
              <span className={classes.name()}>{stepName(step.name)}</span>
            </div>
            <div className={classes.statusWrapper()}>
              {step.isLoading && (
                <span className="fuel-appear flex">
                  <Spinner size={14} />
                </span>
              )}
              {/* The key restarts the fade when the status text changes. */}
              <span
                key={String(step.status)}
                aria-label={t('portal.steps.step_status', {
                  name: stepName(step.name),
                  status: String(stepStatus(step.status)),
                })}
                className={`${classes.status()} fuel-appear`}
              >
                {stepStatus(step.status)}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

const styles = tv({
  slots: {
    list: 'm-0 flex list-none flex-col border border-[var(--fuel-line)] p-0',
    item: [
      'group flex items-center justify-between gap-3 px-3',
      '[&_~_&]:border-t [&_~_&]:border-[var(--fuel-line)]',
    ],
    action: 'flex items-stretch gap-3 self-stretch',
    nodeColumn: 'relative flex w-4 shrink-0 flex-col items-center py-3',
    node: [
      'relative z-10 grid size-4 place-items-center border border-solid',
      'border-[var(--fuel-line)] bg-[var(--fuel-background)] text-[var(--fuel-element-low-em)]',
      'transition-[background-color,border-color,color] duration-300 motion-reduce:transition-none',
      'group-[&[data-selected=true]]:border-[var(--fuel-primary)]',
      'group-[&[data-done=true]]:border-[var(--fuel-primary)] group-[&[data-done=true]]:bg-[var(--fuel-primary)]',
    ],
    rail: 'absolute top-[28px] -bottom-3 left-1/2 z-0 w-px -translate-x-1/2 bg-[var(--fuel-line)]',
    name: 'self-center text-xs leading-tight text-heading',
    statusWrapper: 'flex items-center gap-1',
    status: 'fuel-label',
    icon: 'text-[var(--fuel-primary-foreground)]',
    number: 'fuel-eyebrow text-[9px] leading-none',
  },
});
