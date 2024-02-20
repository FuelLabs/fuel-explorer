import { Services, store } from '~portal/store';

import type {
  OverlayKeys,
  OverlayMachineState,
} from '../machines/overlayMachine';

const selectors = {
  isDialogOpen: (state: OverlayMachineState) => state.matches('opened'),
  overlay(state: OverlayMachineState) {
    return state.matches('opened') && state.context.overlay;
  },
  metadata(state: OverlayMachineState) {
    return state.matches('opened') && state.context.metadata;
  },
};

const settings = {
  closeOnBlur: true,
};

export function useOverlay<T = void>() {
  const isDialogOpen = store.useSelector(
    Services.overlay,
    selectors.isDialogOpen,
  );
  const overlay = store.useSelector(Services.overlay, selectors.overlay);
  const metadata = store.useSelector(Services.overlay, selectors.metadata);

  function is(key: OverlayKeys | ((value: string) => boolean)) {
    return typeof key === 'function' ? key(overlay || '') : overlay === key;
  }

  return {
    is,
    isDialogOpen,
    overlay,
    settings,
    metadata: metadata as T,
    open: store.openOverlay,
    close: store.closeOverlay,
  };
}
