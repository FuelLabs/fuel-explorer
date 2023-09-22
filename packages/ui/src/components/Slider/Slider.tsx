import { Slider as RadixSlider } from '@radix-ui/themes';

import { createComponent } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type SliderProps = PropsOf<typeof RadixSlider>;

export const Slider = createComponent<SliderProps, typeof RadixSlider>({
  id: 'Slider',
  baseElement: RadixSlider,
  defaultProps: {
    radius: 'full',
  },
});
