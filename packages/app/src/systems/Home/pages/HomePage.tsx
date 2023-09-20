import { Flex } from 'pn-ui-primitives/Box';
import { Link } from 'pn-ui-primitives/Link';

export function HomePage() {
  return (
    <Flex className="w-screen h-screen gap-4 items-center justify-center">
      <Link href="/storybook">Go to Storybook</Link>
    </Flex>
  );
}
