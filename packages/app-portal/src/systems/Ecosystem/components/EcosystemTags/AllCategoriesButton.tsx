import { Button } from '@fuels/ui';
import { useQueryParamChange } from '~portal/systems/Ecosystem/hooks/useQueryParamChange';

interface AllCategoriesButtonProps {
  activeTag?: string;
}

export function AllCategoriesButton({ activeTag }: AllCategoriesButtonProps) {
  const queryParamChange = useQueryParamChange();

  return (
    <Button
      type="submit"
      name="tag"
      value=""
      size="2"
      onClick={() => queryParamChange('tag', '')}
      variant="outline"
      color={!activeTag ? 'green' : 'gray'}
      className="bg-panel-solid"
    >
      All categories
    </Button>
  );
}
