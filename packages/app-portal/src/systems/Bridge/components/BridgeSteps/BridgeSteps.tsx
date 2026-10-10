import { Spinner } from '@fuels/ui';
import { IconCheck } from '@fuels/ui';
import { useTranslation } from 'react-i18next';
import { tv } from 'tailwind-variants';
import {
  BRIDGE_STEP_ID,
  BRIDGE_STEP_STATUS_ID,
  type BridgeStep,
  type BridgeStepId,
  type BridgeStepStatusId,
} from './constants';

export * from './constants';

type BridgeStepsProps = {
  steps?: BridgeStep[];
};

const NAME_KEYS: Record<BridgeStepId, string> = {
  [BRIDGE_STEP_ID.submitToBridge]: 'portal.bridge_steps.submit_to_bridge',
  [BRIDGE_STEP_ID.settlement]: 'portal.bridge_steps.settlement',
  [BRIDGE_STEP_ID.confirmTransaction]:
    'portal.bridge_steps.confirm_transaction',
  [BRIDGE_STEP_ID.receiveOnEthereum]: 'portal.bridge_steps.receive_on_ethereum',
  [BRIDGE_STEP_ID.receiveOnFuel]: 'portal.bridge_steps.receive_on_fuel',
};

const STATUS_KEYS: Record<BridgeStepStatusId, string> = {
  [BRIDGE_STEP_STATUS_ID.automatic]: 'portal.bridge_steps.automatic',
  [BRIDGE_STEP_STATUS_ID.action]: 'portal.bridge_steps.action',
  [BRIDGE_STEP_STATUS_ID.actionRequired]: 'portal.bridge_steps.action_required',
  [BRIDGE_STEP_STATUS_ID.done]: 'portal.bridge_steps.done',
  [BRIDGE_STEP_STATUS_ID.waiting]: 'portal.bridge_steps.waiting',
  [BRIDGE_STEP_STATUS_ID.timeLeft]: 'portal.bridge_steps.time_left',
};

/** Translators for step names and statuses, keyed by id, never by English text. */
export function useBridgeStepLabels() {
  const { t } = useTranslation();
  const stepName = (step: Pick<BridgeStep, 'id'>) => t(NAME_KEYS[step.id]);
  const stepStatus = (step: Pick<BridgeStep, 'statusId' | 'eta' | 'status'>) =>
    step.statusId
      ? t(STATUS_KEYS[step.statusId], { time: step.eta })
      : step.status;
  return { stepName, stepStatus };
}

export const BridgeSteps = ({ steps }: BridgeStepsProps) => {
  const { t } = useTranslation();
  const { stepName, stepStatus } = useBridgeStepLabels();
  const classes = styles();

  return (
    <ol className={classes.list()}>
      {steps?.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <li
            key={step.id}
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
              <span className={classes.name()}>{stepName(step)}</span>
            </div>
            <div className={classes.statusWrapper()}>
              {step.isLoading && (
                <span className="fuel-appear flex">
                  <Spinner size={14} />
                </span>
              )}
              {/* The key restarts the fade when the status text changes. */}
              <span
                key={String(stepStatus(step))}
                aria-label={t('portal.steps.step_status', {
                  name: stepName(step),
                  status: String(stepStatus(step)),
                })}
                className={`${classes.status()} fuel-appear`}
              >
                {stepStatus(step)}
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
