import type { BaseProps } from '@fuels/ui';
import { Flex, Text } from '@fuels/ui';
import { tv } from 'tailwind-variants';

export enum ViewModes {
  Simple = 'Simple',
  Advanced = 'Advanced',
}

export type ViewModeProps = BaseProps<{
  mode: ViewModes;
  onChange: (mode: ViewModes) => void;
}>;

export function ViewMode({ mode, onChange, className }: ViewModeProps) {
  const classes = styles();

  return (
    <Flex
      align="stretch"
      justify="center"
      className={classes.root({ className })}
    >
      <Flex
        align="center"
        justify="center"
        className={classes.viewItem()}
        data-mode={ViewModes.Simple}
        data-active={mode === ViewModes.Simple}
        onClick={() => onChange(ViewModes.Simple)}
      >
        <Text size="1">Simple</Text>
      </Flex>
      <Flex
        align="center"
        justify="center"
        className={classes.viewItem()}
        data-mode={ViewModes.Advanced}
        data-active={mode === ViewModes.Advanced}
        onClick={() => onChange(ViewModes.Advanced)}
      >
        <Text size="1">Advanced</Text>
      </Flex>
    </Flex>
  );
}

const styles = tv({
  slots: {
    root: 'bg-gray-3 p-1 rounded h-9',
    viewItem: [
      'flex-1 rounded cursor-pointer',
      'data-[mode=Simple]:px-6',
      'data-[mode=Advanced]:px-3',
      'data-[active=true]:bg-gray-1 data-[active=true]:cursor-default',
    ],
  },
});
