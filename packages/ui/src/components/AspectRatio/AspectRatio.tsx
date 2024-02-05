/// <reference types="@radix-ui/react-aspect-ratio" />
import { AspectRatio as RadixAspectRatio } from '@radix-ui/themes';

import { createComponent } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type AspectRatioProps = PropsOf<typeof RadixAspectRatio>;

export const AspectRatio = createComponent<
  AspectRatioProps,
  typeof RadixAspectRatio
>({
  id: 'AspectRatio',
  baseElement: RadixAspectRatio,
});
