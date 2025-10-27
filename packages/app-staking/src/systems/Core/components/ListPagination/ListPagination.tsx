import {
  Flex,
  IconButton,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  Text,
} from '@fuels/ui';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

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
  return (
    <Flex
      justify="between"
      align="center"
      className="py-3 px-4 border-t border-[--gray-1] rounded-b-lg bg-gray-4 sticky bottom-0 left-0 right-0 z-10"
    >
      <Flex align="center" gap="2">
        <Text size="2" color="gray">
          Show:
        </Text>
        <Select
          value={String(perPage)}
          onValueChange={(value) => {
            onPerPageChange(Number(value));
          }}
        >
          <SelectTrigger className="w-16 h-8 bg-gray-4" />
          <SelectContent>
            {perPageOptions.map((option) => (
              <SelectItem key={option} value={String(option)}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Text size="2" color="gray">
          records
        </Text>
      </Flex>

      <Flex gap="4" align="center">
        <Text size="2" color="gray">
          Page {currentPage}
        </Text>
        <IconButton
          aria-label="Previous page"
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
          aria-label="Next page"
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
