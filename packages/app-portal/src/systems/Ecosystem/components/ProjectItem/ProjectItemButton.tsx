import { Button } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { stopPropagation } from '~portal/systems/Core/utils/stopPropagation';

interface ProjectItemButtonProps {
  href: string;
  children: React.ReactNode;
}

export function ProjectItemButton({ href, children }: ProjectItemButtonProps) {
  const classes = styles();

  return (
    <Button
      as="a"
      href={href}
      className={classes.socialButton()}
      onClick={stopPropagation}
      variant="ghost"
      size="1"
      target="_blank"
    >
      {children}
    </Button>
  );
}

const styles = tv({
  slots: {
    socialButton: 'bg-transparent',
  },
});
