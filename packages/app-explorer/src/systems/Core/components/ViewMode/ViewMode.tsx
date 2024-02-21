import { ButtonSwitch, Flex } from '@fuels/ui';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { tv } from 'tailwind-variants';

export enum ViewModes {
  Simple = 'simple',
  Advanced = 'advanced',
}

export function ViewMode() {
  const { mode } = useParams<{
    mode: ViewModes;
  }>();

  return (
    <ButtonSwitch
      leftButton={{
        label: 'Simple',
        active: mode === ViewModes.Simple,
        props: {
          as: Link,
          prefetch: true,
          href: `./${ViewModes.Simple}`,
        },
      }}
      rightButton={{
        label: 'Advanced',
        active: mode === ViewModes.Advanced,
        props: {
          as: Link,
          prefetch: true,
          href: `./${ViewModes.Advanced}`,
        },
      }}
    />
  );
}
