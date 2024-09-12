'use client';

import {} from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import type { ToastActionElement, ToastIconElement, ToastProps } from './Toast';

// Constants
const DEFAULT_TOAST_LIMIT = 3;
const DEFAULT_TOAST_DURATION = 4000;

// Action Types
const ACTION_TYPES = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

// Toast Types
type Toast = Omit<ToasterToast, 'id'>;
type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  icon?: ToastIconElement;
  limit?: number;
  duration?: number;
  width?: string | number;
};

// Action Definitions
type ActionType = typeof ACTION_TYPES;
type Action =
  | { type: ActionType['ADD_TOAST']; toast: ToasterToast }
  | { type: ActionType['UPDATE_TOAST']; toast: Partial<ToasterToast> }
  | { type: ActionType['DISMISS_TOAST']; toastId?: string; duration?: number }
  | { type: ActionType['REMOVE_TOAST']; toastId?: string };

// State
interface State {
  toasts: ToasterToast[];
}

// Utility Functions
let count = 0;
function generateId(): string {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

function scheduleToastRemoval(
  toastId: string,
  duration: number = DEFAULT_TOAST_DURATION,
) {
  if (toastTimeouts.has(toastId)) return;
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: ACTION_TYPES.REMOVE_TOAST, toastId });
  }, duration);
  toastTimeouts.set(toastId, timeout);
}

// Reducer
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(
          0,
          action.toast.limit || DEFAULT_TOAST_LIMIT,
        ),
      };

    case ACTION_TYPES.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t,
        ),
      };

    case ACTION_TYPES.DISMISS_TOAST: {
      const { toastId, duration = DEFAULT_TOAST_DURATION } = action;

      if (toastId) {
        scheduleToastRemoval(toastId, duration);
      } else {
        state.toasts.forEach(({ id }) => {
          scheduleToastRemoval(id, duration);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || !toastId ? { ...t, open: false } : t,
        ),
      };
    }

    case ACTION_TYPES.REMOVE_TOAST:
      return {
        ...state,
        toasts: action.toastId
          ? state.toasts.filter((t) => t.id !== action.toastId)
          : [],
      };

    default:
      return state;
  }
};

// Toast Functions
const listeners: Array<(state: State) => void> = [];
let memoryState: State = { toasts: [] };
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

function createToast(props: Toast) {
  const id = generateId();
  const duration = props.duration || DEFAULT_TOAST_DURATION;

  function update(toastProps: ToasterToast) {
    dispatch({ type: ACTION_TYPES.UPDATE_TOAST, toast: { ...toastProps, id } });
  }

  function dismiss() {
    dispatch({
      duration: props.duration,
      type: ACTION_TYPES.DISMISS_TOAST,
      toastId: id,
    });
  }

  dispatch({
    type: ACTION_TYPES.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      duration,
      onOpenChange: (open) => {
        if (!open) {
          dismiss();
        }
      },
    },
  });

  return {
    id,
    dismiss,
    update,
  };
}

// Hook
function useToast() {
  const [state, setState] = useState<State>(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast: createToast,
    dismiss: (toastId?: string) => {
      dispatch({ type: ACTION_TYPES.DISMISS_TOAST, toastId });
    },
  };
}

let toast = createToast as typeof createToast & {
  success: (
    msg: string,
    props?: Partial<Omit<ToasterToast, 'variant'>>,
  ) => void;
  base: (msg: string, props?: Partial<Omit<ToasterToast, 'variant'>>) => void;
  info: (msg: string, props?: Partial<Omit<ToasterToast, 'variant'>>) => void;
  warning: (
    msg: string,
    props?: Partial<Omit<ToasterToast, 'variant'>>,
  ) => void;
  error: (msg: string, props?: Partial<Omit<ToasterToast, 'variant'>>) => void;
};

toast = Object.assign(toast, {
  success: (msg: string, props?: Omit<ToasterToast, 'variant'>) => {
    createToast({
      ...props,
      title: msg,
      variant: 'success',
    });
  },
  base: (msg: string, props?: Omit<ToasterToast, 'variant'>) => {
    createToast({
      ...props,
      title: msg,
      variant: 'base',
    });
  },
  info: (msg: string, props?: Omit<ToasterToast, 'variant'>) => {
    createToast({
      ...props,
      title: msg,
      variant: 'info',
    });
  },
  warning: (msg: string, props?: Omit<ToasterToast, 'variant'>) => {
    createToast({
      ...props,
      title: msg,
      variant: 'warning',
    });
  },
  error: (msg: string, props?: Omit<ToasterToast, 'variant'>) => {
    createToast({
      ...props,
      title: msg,
      variant: 'error',
    });
  },
});

export { useToast, toast };
