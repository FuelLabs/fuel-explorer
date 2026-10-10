import {
  BRIDGE_STEP_ID,
  BRIDGE_STEP_STATUS_ID,
  type BridgeStep,
} from '~portal/systems/Bridge/components/BridgeSteps/constants';
import { kindOf } from './transferKind';

const step = (overrides: Partial<BridgeStep> & Pick<BridgeStep, 'id'>) =>
  ({ name: overrides.id, status: '', ...overrides }) as BridgeStep;

const withConfirm = (confirm: Partial<BridgeStep>): BridgeStep[] => [
  step({ id: BRIDGE_STEP_ID.submitToBridge, isDone: true }),
  step({ id: BRIDGE_STEP_ID.settlement, isDone: true }),
  step({ id: BRIDGE_STEP_ID.confirmTransaction, isSelected: true, ...confirm }),
  step({ id: BRIDGE_STEP_ID.receiveOnEthereum }),
];

describe('kindOf', () => {
  it('is settled once the receive step is done', () => {
    expect(kindOf({ steps: undefined, settled: true })).toBe('settled');
  });

  it('is loading while the steps are unknown', () => {
    expect(kindOf({ steps: undefined, settled: false })).toBe('loading');
  });

  it('needs an action on a manual confirm step', () => {
    const steps = withConfirm({ statusId: BRIDGE_STEP_STATUS_ID.action });
    expect(kindOf({ steps, settled: false })).toBe('action');
  });

  it('needs an action when the wallet approval is waiting', () => {
    const steps = withConfirm({
      statusId: BRIDGE_STEP_STATUS_ID.actionRequired,
    });
    expect(kindOf({ steps, settled: false })).toBe('action');
  });

  it('needs nothing from the user on an automatic confirm step', () => {
    const steps = withConfirm({ statusId: BRIDGE_STEP_STATUS_ID.automatic });
    expect(kindOf({ steps, settled: false })).toBe('progress');
  });

  it('is in progress while the confirm step is loading', () => {
    const steps = withConfirm({
      statusId: BRIDGE_STEP_STATUS_ID.action,
      isLoading: true,
    });
    expect(kindOf({ steps, settled: false })).toBe('progress');
  });

  it('is in progress during settlement', () => {
    const steps: BridgeStep[] = [
      step({ id: BRIDGE_STEP_ID.submitToBridge, isDone: true }),
      step({ id: BRIDGE_STEP_ID.settlement, isSelected: true }),
      step({ id: BRIDGE_STEP_ID.confirmTransaction }),
    ];
    expect(kindOf({ steps, settled: false })).toBe('progress');
  });

  it('is not fooled by a translated or renamed step name', () => {
    const steps = withConfirm({
      name: '取引を確認',
      statusId: BRIDGE_STEP_STATUS_ID.action,
    });
    expect(kindOf({ steps, settled: false })).toBe('action');
  });
});
