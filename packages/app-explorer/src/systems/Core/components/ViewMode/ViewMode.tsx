import { ToggleGroup, Tooltip } from '@fuels/ui';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { VIEW_MODE_LABELS, ViewModes } from './constants';

type ViewModeProps = {
  viewModes?: ViewModes[];
  isSimpleDisabled?: boolean;
};

export function ViewMode({
  viewModes = [ViewModes.Simple, ViewModes.Advanced],
  isSimpleDisabled,
}: ViewModeProps) {
  const { mode } = useParams<{ mode: ViewModes }>();
  const navigate = useNavigate();
  const location = useLocation();

  const handleModeChange = (newMode: string) => {
    if (newMode && newMode !== mode) {
      const currentPath = location.pathname;
      const basePath = currentPath.split('/').slice(0, -1).join('/');
      navigate(`${basePath}/${newMode}`);
    }
  };

  return (
    <ToggleGroup
      defaultValue={mode}
      aria-label="View mode"
      onValueChange={handleModeChange}
      className="flex-shrink-0"
    >
      {viewModes.map((viewMode) => {
        const shouldDisableSimple =
          viewMode === ViewModes.Simple && isSimpleDisabled;

        const itemToggle = (
          <ToggleGroup.Item
            key={viewMode}
            value={shouldDisableSimple ? '' : viewMode}
            aria-label={VIEW_MODE_LABELS[viewMode]}
            disabled={shouldDisableSimple}
          >
            {VIEW_MODE_LABELS[viewMode]}
          </ToggleGroup.Item>
        );

        return shouldDisableSimple ? (
          <Tooltip
            key={viewMode}
            content="Simple mode is not available for this transaction"
          >
            {itemToggle}
          </Tooltip>
        ) : (
          itemToggle
        );
      })}
    </ToggleGroup>
  );
}
