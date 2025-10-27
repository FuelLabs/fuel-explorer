import { Switch } from '@fuels/ui';

import { useQueryParamChange } from '~portal/systems/Ecosystem/hooks/useQueryParamChange';

interface HeaderSwitchProps {
  liveOnly: boolean;
  disabled: boolean;
}

export function HeaderSwitch({ liveOnly, disabled }: HeaderSwitchProps) {
  const queryParamChange = useQueryParamChange();
  const onCheckedChange = (checked: boolean) => {
    queryParamChange('liveOnly', checked ? 'on' : 'off');
  };

  return (
    <Switch
      name="liveOnly"
      onCheckedChange={onCheckedChange}
      defaultChecked={liveOnly ?? true}
      mr="2"
      type="button"
      disabled={disabled}
    />
  );
}
