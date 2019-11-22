import { ArrowDropDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@bigcommerce/big-design-icons';
import React, { memo, useEffect, useState } from 'react';

import { MarginProps } from '../../mixins';
import { Dropdown, DropdownItem } from '../Dropdown';
import { Flex } from '../Flex';

import { StyledButton } from './styled';

export interface PaginationProps extends MarginProps {
  currentPage: number;
  itemsPerPage: number;
  itemsPerPageOptions: number[];
  totalItems: number;
  onPageChange(page: number): void;
  onItemsPerPageChange(range: number): void;
}

export const Pagination: React.FC<PaginationProps> = memo(
  ({ itemsPerPage, currentPage, totalItems, itemsPerPageOptions = [], onPageChange, onItemsPerPageChange }) => {
    const [maxPages, setMaxPages] = useState(Math.ceil(totalItems / itemsPerPage));
    const [itemRange, setItemRange] = useState({ start: 0, end: 0 });

    const handlePageOutOfBounds = () => {
      if (currentPage < 1 || isNaN(currentPage) || currentPage === undefined) {
        onPageChange(1);
      } else if (currentPage > maxPages) {
        onPageChange(maxPages);
      }
    };

    const handlePerPageOutOfBounds = () => {
      if (itemsPerPage < 1 || isNaN(itemsPerPage) || itemsPerPage === undefined) {
        onItemsPerPageChange(itemsPerPageOptions[0]);
      }
    };

    const calculateRange = () => {
      let firstItemInRange = itemsPerPage * (currentPage - 1) + 1;
      let lastItemInRange = itemsPerPage * currentPage;

      firstItemInRange = Math.min(firstItemInRange, totalItems);
      lastItemInRange = Math.min(lastItemInRange, totalItems);

      if (lastItemInRange === 0 || isNaN(lastItemInRange) || isNaN(firstItemInRange)) {
        firstItemInRange = 0;
        lastItemInRange = 0;
      }

      setItemRange({ start: firstItemInRange, end: lastItemInRange });
    };

    useEffect(() => {
      handlePageOutOfBounds();

      handlePerPageOutOfBounds();

      calculateRange();

      setMaxPages(Math.ceil(totalItems / itemsPerPage));
    }, [currentPage, itemsPerPage, totalItems]);

    const handlePageIncrease = () => {
      onPageChange(currentPage + 1);
    };

    const handlePageDecrease = () => {
      onPageChange(currentPage - 1);
    };

    const handleRangeChange = (item: DropdownItem<number>) => {
      return item.value && onItemsPerPageChange(item.value);
    };

    const showRanges = () => {
      return itemRange.start === itemRange.end
        ? `${itemRange.start} of ${totalItems}`
        : `${itemRange.start} - ${itemRange.end} of ${totalItems}`;
    };

    return (
      <Flex role="navigation" aria-label="pagination" flexDirection="row">
        <Flex.Item>
          <Dropdown
            options={itemsPerPageOptions.map(range => ({
              content: `${range}`,
              onClick: handleRangeChange,
              value: range,
            }))}
            trigger={
              <StyledButton variant="subtle" iconRight={<ArrowDropDownIcon size="xxLarge" />}>
                {showRanges()}
              </StyledButton>
            }
          />
        </Flex.Item>
        <Flex.Item>
          <StyledButton
            iconOnly={<ChevronLeftIcon title="Previous page" />}
            variant="subtle"
            disabled={currentPage <= 1}
            onClick={handlePageDecrease}
          />

          <StyledButton
            iconOnly={<ChevronRightIcon title="Next page" />}
            variant="subtle"
            disabled={currentPage >= maxPages}
            onClick={handlePageIncrease}
          />
        </Flex.Item>
      </Flex>
    );
  },
);

Pagination.displayName = 'Pagination';
