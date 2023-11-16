import { Flex } from '@fuels/ui';
import { tv } from 'tailwind-variants';

export enum ViewModes {
  Simple = 'simple',
  Advanced = 'advanced',
}

export type ViewModeProps = {
  mode: ViewModes;
  onChange: (mode: ViewModes) => void;
};

export function ViewMode({ mode, onChange }: ViewModeProps) {
  const classes = styles();

  return (
    <Flex align="stretch" justify="center" className={classes.root()}>
      <Flex
        align="center"
        justify="center"
        className={classes.viewItem()}
        data-mode={ViewModes.Simple}
        data-active={mode === ViewModes.Simple}
        onClick={() => onChange(ViewModes.Simple)}
      >
        Simple
      </Flex>
      <Flex
        align="center"
        justify="center"
        className={classes.viewItem()}
        data-mode={ViewModes.Advanced}
        data-active={mode === ViewModes.Advanced}
        onClick={() => onChange(ViewModes.Advanced)}
      >
        Advanced
      </Flex>
    </Flex>
  );
}

const styles = tv({
  slots: {
    root: 'bg-gray-3 p-1 rounded h-9',
    viewItem: [
      'px-3 text-xs flex-1 rounded-xs cursor-pointer text-gray-9',
      'data-[active=true]:bg-gray-1 data-[active=true]:cursor-default',
      'data-[active=true]:text-gray-12',
    ],
  },
});
