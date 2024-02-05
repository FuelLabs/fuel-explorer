import { Flex } from "@fuels/ui";
import Link from "next/link";
import { useParams } from "next/navigation";
import { tv } from "tailwind-variants";

export enum ViewModes {
  Simple = "simple",
  Advanced = "advanced",
}

export function ViewMode() {
  const { mode } = useParams<{
    mode: ViewModes;
  }>();
  const classes = styles();

  return (
    <Flex align="stretch" justify="center" className={classes.root()}>
      <Flex
        as={Link}
        prefetch={true}
        align="center"
        justify="center"
        className={classes.viewItem()}
        data-mode={ViewModes.Simple}
        data-active={mode === ViewModes.Simple}
        href={`./${ViewModes.Simple}`}
      >
        Simple
      </Flex>
      <Flex
        as={Link}
        prefetch={true}
        align="center"
        justify="center"
        className={classes.viewItem()}
        data-mode={ViewModes.Advanced}
        data-active={mode === ViewModes.Advanced}
        href={`./${ViewModes.Advanced}`}
      >
        Advanced
      </Flex>
    </Flex>
  );
}

const styles = tv({
  slots: {
    root: "bg-gray-3 p-1 rounded h-9",
    viewItem: [
      "px-3 text-xs flex-1 rounded-xs cursor-pointer text-gray-9",
      "data-[active=true]:bg-gray-1 data-[active=true]:cursor-default",
      "data-[active=true]:text-gray-12",
    ],
  },
});
