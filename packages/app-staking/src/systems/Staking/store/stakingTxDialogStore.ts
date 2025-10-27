import { createStore } from '@xstate/store';
import { getDefaultWagmiConfig } from 'app-commons/src/chains/ethWagmi';
import type { Config } from 'wagmi';
import { getAccount, watchAccount } from 'wagmi/actions';
import type { GetAccountReturnType } from 'wagmi/actions';

const LOCAL_STORAGE_KEY = 'xstate-store-pause-warning';

export type TxDialogNames =
  | 'TxWithdrawStatus'
  | 'TxWithdrawNew'
  | 'TxClaimRewardStatus'
  | 'TxClaimRewardNew'
  | 'TxUndelegateStatus'
  | 'TxUndelegateNew'
  | 'TxRedelegateStatus'
  | 'TxRedelegateNew'
  | 'TxStakeNew'
  | 'TxStakeStatus'
  // deprecated
  | 'TxConvert';

export type PausedContractState = {
  show?: boolean;
  lastShown?: string;
};

export type StakingTxDialogStoreContext = {
  name: TxDialogNames | undefined;
  data?: string | undefined; // Usually the tx id
  pausedContract?: PausedContractState;
};

const loadPausedContractFromStorage = (): PausedContractState | undefined => {
  try {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : undefined;
  } catch (error) {
    console.error(
      'Failed to load paused contract data from localStorage',
      error,
    );
    return undefined;
  }
};

interface StoreContext {
  name: TxDialogNames | undefined;
  data: string | undefined;
  pausedContract: PausedContractState;
}

interface EventPayloads {
  open: {
    name: TxDialogNames;
    data: string | undefined;
  };
  close: {};
  updatePausedContract: {
    pausedContract: Partial<PausedContractState>;
  };
  // biome-ignore lint/suspicious/noExplicitAny:
  [key: string]: any;
}

// Type-safe event creators
export const stakingTxDialogEvents = {
  /**
   * Creates a properly typed 'open' event for the dialog store
   * @param name The dialog name to open
   * @param data Optional data to pass (usually an ID)
   */
  open: (name: TxDialogNames, data?: string | number) => ({
    type: 'open' as const,
    name,
    data,
  }),

  /** Creates a properly typed 'close' event for the dialog store */
  close: () => ({
    type: 'close' as const,
  }),

  /**
   * Creates a properly typed event to update the paused contract state
   * @param pausedContract The partial state to update
   */
  updatePausedContract: (pausedContract: Partial<PausedContractState>) => ({
    type: 'updatePausedContract' as const,
    pausedContract,
  }),
};

export const stakingTxDialogStore = createStore<
  StoreContext,
  EventPayloads,
  {}
>({
  context: {
    name: undefined,
    data: undefined,
    pausedContract: {
      ...loadPausedContractFromStorage(),
      show: false,
    },
  },
  on: {
    open: (
      context,
      event: { name: TxDialogNames; data: string | undefined },
    ): StoreContext => {
      return {
        name: event.name,
        data: typeof event.data !== 'string' ? String(event.data) : event.data,
        pausedContract: context.pausedContract,
      };
    },
    close: (context): StoreContext => {
      // Close paused contract warning dialog first, if open
      if (context.pausedContract?.show) {
        return {
          ...context,
          pausedContract: {
            ...context.pausedContract,
            show: false,
          },
        };
      }

      return {
        name: undefined,
        data: context.data,
        pausedContract: context.pausedContract,
      };
    },
    updatePausedContract: (
      context,
      event: { pausedContract: Partial<PausedContractState> },
    ): StoreContext => {
      const hasName = context.name !== undefined;

      const newPausedContract: PausedContractState = {
        ...context.pausedContract,
        ...event.pausedContract,
        show: hasName ? !!event.pausedContract?.show : false,
      };

      if (newPausedContract.show) {
        newPausedContract.lastShown =
          newPausedContract.lastShown ?? Date.now().toString();
      }

      return {
        name: hasName ? context.name : undefined,
        data: hasName ? context.data : undefined,
        pausedContract: newPausedContract,
      };
    },
  },
});

export const txDialogStoreSelectors = {
  data: (state: { context: StakingTxDialogStoreContext }) => state.context.data,
  name: (state: { context: StakingTxDialogStoreContext }) => state.context.name,
  pausedContract: (state: { context: StakingTxDialogStoreContext }) =>
    state.context.pausedContract,
};

/**
 * Setup a listener for wallet account changes that automatically closes any open dialogs
 * @param config The wagmi config to use (STAKING_WAGMI_CONFIG)
 * @returns An unwatch function to clean up the listener
 */
export function setupAccountChangeListener(config: Config) {
  // Store the last known account address to detect changes
  let previousAccount: string | undefined = getAccount(config)?.address || '';

  // Watch for account changes using wagmi's watchAccount function
  const unwatch = watchAccount(config, {
    onChange(account: GetAccountReturnType) {
      const currentAddress = account.address;

      // If the address has changed and is not just connecting/disconnecting the same account
      if (currentAddress && previousAccount !== currentAddress) {
        // Close any open dialogs when the account changes
        stakingTxDialogStore.send(stakingTxDialogEvents.close());
      }

      // Update the previous account for next comparison
      previousAccount = currentAddress;
    },
  });

  return unwatch;
}

setupAccountChangeListener(getDefaultWagmiConfig('Fuel Staking'));
