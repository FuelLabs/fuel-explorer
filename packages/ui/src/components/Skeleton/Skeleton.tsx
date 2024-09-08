import {
  Skeleton as RadixSkeleton,
  type SkeletonProps,
} from '@radix-ui/themes';
import { createComponent } from '../../utils/component';

export type { SkeletonProps };
export const Skeleton = createComponent<SkeletonProps, typeof RadixSkeleton>({
  id: 'Skeleton',
  baseElement: RadixSkeleton,
});
