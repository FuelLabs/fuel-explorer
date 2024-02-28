import { Flex, Text } from '@fuels/ui';

type ProjectListEmptyProps = {
  text?: string;
};

export const ProjectListEmpty = ({ text }: ProjectListEmptyProps) => (
  <Flex justify="center">
    <Text>{text ?? 'There are no projects to show.'}</Text>
  </Flex>
);
