import { Button, Icon } from '@fuels/ui';
import { IconHelpCircle } from '@tabler/icons-react';

export function HelpLink() {
  return (
    <a
      href="https://forum.fuel.network/c/fuel-network/8"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button
        variant="ghost"
        color="gray"
        size="2"
        className="fixed bottom-4 right-4 rounded-full shadow-lg z-50 flex items-center gap-2"
      >
        <Icon icon={IconHelpCircle} className="w-4 h-4" />
        Need Help
      </Button>
    </a>
  );
}
