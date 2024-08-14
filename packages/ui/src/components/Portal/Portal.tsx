import { Portal as RadixPortal } from '@radix-ui/react-portal';

import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type PortalProps = PropsOf<typeof RadixPortal>;
export const PortalRoot = createComponent<PortalProps, typeof RadixPortal>({
  id: 'Portal',
  baseElement: RadixPortal,
});

export const Portal = withNamespace(PortalRoot, {});
