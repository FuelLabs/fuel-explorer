import { Button } from '@fuels/ui';
import { useQueryParamChange } from '~portal/systems/Ecosystem/hooks/useQueryParamChange';

interface EcosystemTagProps {
  tag: string;
  activeTag: string | undefined;
}

export function EcosystemTag({ tag, activeTag }: EcosystemTagProps) {
  const queryParamChange = useQueryParamChange();
  const onTagPress = () => {
    queryParamChange('tag', tag);
  };

  return (
    <Button
      key={tag}
      name="tag"
      value={tag}
      color={activeTag === tag ? 'green' : 'gray'}
      onClick={onTagPress}
      className="bg-panel-solid"
      size="2"
      variant="outline"
      type="button"
    >
      {tag}
    </Button>
  );
}
