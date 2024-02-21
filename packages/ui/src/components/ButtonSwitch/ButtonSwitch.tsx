import { tv } from 'tailwind-variants';
import { Flex } from '../Box';

type ButtonProp = {
  label: string;
  active: boolean;
  props: any;
};

export type ButtonSwitchProps = {
  leftButton: ButtonProp;
  rightButton: ButtonProp;
};

export function ButtonSwitch(props: ButtonSwitchProps) {
  const classes = styles();
  const { leftButton, rightButton } = props;
  const {
    active: leftButtonActive,
    label: leftButtonLabel,
    ...leftButtonProps
  } = leftButton;
  const {
    active: rightButtonActive,
    label: rightButtonLabel,
    ...rightButtonProps
  } = rightButton;

  return (
    <Flex align="stretch" justify="center" className={classes.root()}>
      <Flex
        {...leftButtonProps.props}
        align="center"
        justify="center"
        className={classes.itemSwitch()}
        data-active={leftButtonActive}
      >
        {leftButtonLabel}
      </Flex>
      <Flex
        {...rightButtonProps.props}
        align="center"
        justify="center"
        className={classes.itemSwitch()}
        data-active={rightButtonActive}
      >
        {rightButtonLabel}
      </Flex>
    </Flex>
  );
}

const styles = tv({
  slots: {
    root: 'bg-gray-3 p-1 rounded h-9',
    itemSwitch: [
      'px-3 text-xs flex-1 rounded-xs cursor-pointer text-gray-9',
      'data-[active=true]:bg-gray-1 data-[active=true]:cursor-default',
      'data-[active=true]:text-gray-12',
    ],
  },
});
