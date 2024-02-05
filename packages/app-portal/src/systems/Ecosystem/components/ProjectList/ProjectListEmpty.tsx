import { Box, Text } from '@fuel-ui/react';

type ProjectListEmptyProps = {
  text?: string;
};

export const ProjectListEmpty = ({ text }: ProjectListEmptyProps) => (
  <Box.Flex justify="center">
    <Text> {text ?? 'There are no projects to show.'} </Text>
  </Box.Flex>
);
