import { Flex, Text } from '@fuels/ui';

export enum ViewModes {
  Simple = 'Simple',
  Advanced = 'Advanced',
}

export type ViewModeProps = {
  mode: ViewModes;
  onChange: (mode: ViewModes) => void;
};

export function ViewMode({ mode, onChange }: ViewModeProps) {
  return (
    <Flex
      align="stretch"
      justify="center"
      className="bg-gray-3 p-1 rounded h-9"
    >
      <Flex
        align="center"
        justify="center"
        className={`flex-1 rounded px-6 cursor-default ${
          mode === ViewModes.Simple ? 'bg-gray-1' : 'cursor-pointer'
        }`}
        onClick={() => onChange(ViewModes.Simple)}
      >
        <Text size="1">Simple</Text>
      </Flex>
      <Flex
        align="center"
        justify="center"
        className={`flex-1 rounded px-3 cursor-default ${
          mode === ViewModes.Advanced ? 'bg-gray-1' : 'cursor-pointer'
        }`}
        onClick={() => onChange(ViewModes.Advanced)}
      >
        <Text size="1">Advanced</Text>
      </Flex>
    </Flex>
  );
}
