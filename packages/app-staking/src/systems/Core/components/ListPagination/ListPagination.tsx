import {
  Flex,
  IconButton,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@fuels/ui';
import { IconChevronLeft, IconChevronRight } from '@fuels/ui';
import { useTranslation } from 'react-i18next';

interface ListPaginationProps {
  currentPage?: number;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  onPerPageChange: (perPage: number) => void;
  perPage?: number;
  perPageOptions?: number[];
  isLoadingPrevPage?: boolean;
  isLoadingNextPage?: boolean;
}

export function ListPagination({
  currentPage = 1,
  onNextPage,
  onPrevPage,
  onPerPageChange,
  perPage = 10,
  perPageOptions = [5, 10, 20, 50],
  isLoadingPrevPage = false,
  isLoadingNextPage = false,
}: ListPaginationProps) {
  const { t } = useTranslation();
  return (
    <Flex
      justify="between"
      align="center"
      className="sticky bottom-0 left-0 right-0 z-10 border-t border-[var(--fuel-border)] bg-[var(--fuel-background)] py-3"
    >
      <Flex align="center" gap="2">
        <span className="fuel-label">{t('staking.pagination.show')}</span>
        <Select
          value={String(perPage)}
          onValueChange={(value) => {
            onPerPageChange(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-16 !rounded-none" />
          <SelectContent>
            {perPageOptions.map((option) => (
              <SelectItem key={option} value={String(option)}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="fuel-label">{t('staking.pagination.records')}</span>
      </Flex>

      <Flex gap="4" align="center">
        <span className="fuel-label">
          {t('staking.pagination.page', { page: currentPage })}
        </span>
        <IconButton
          aria-label={t('staking.pagination.previous')}
          variant="ghost"
          color="gray"
          size="1"
          iconSize={24}
          icon={IconChevronLeft}
          disabled={!onPrevPage || isLoadingNextPage || isLoadingPrevPage}
          isLoading={isLoadingPrevPage}
          onClick={onPrevPage}
        />

        <IconButton
          aria-label={t('staking.pagination.next')}
          variant="ghost"
          color="gray"
          size="1"
          iconSize={24}
          icon={IconChevronRight}
          disabled={!onNextPage || isLoadingNextPage || isLoadingPrevPage}
          isLoading={isLoadingNextPage}
          onClick={onNextPage}
        />
      </Flex>
    </Flex>
  );
}
