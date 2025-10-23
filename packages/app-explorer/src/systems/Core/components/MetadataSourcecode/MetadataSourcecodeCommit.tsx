import { Button, Tooltip } from '@fuels/ui';
import { IconExternalLink } from '@tabler/icons-react';

type MetadataSourcecodeCommitProps = {
  url: string;
  commit: string;
};

export function MetadataSourcecodeCommit({
  url,
  commit,
}: MetadataSourcecodeCommitProps) {
  return (
    <Tooltip
      content={
        <span>
          <b>View raw file</b>
          <br />
          {commit}
        </span>
      }
      delayDuration={0}
    >
      <Button
        as="a"
        target="_blank"
        rel="noreferrer"
        href={url}
        variant="soft"
        color="gray"
        size="1"
        rightIcon={IconExternalLink}
        iconSize={15}
        iconColor="text-muted"
      >
        {commit.substring(0, 7)}
      </Button>
    </Tooltip>
  );
}
