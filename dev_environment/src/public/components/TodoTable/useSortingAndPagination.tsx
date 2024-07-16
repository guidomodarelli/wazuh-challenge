import React from 'react';
import { Comparators, Criteria, Direction, EuiTableSortingType } from '@elastic/eui';
import { useState } from 'react';

interface UseSortingAndPaginationProps<T> {
  items: T[];
  defaultSortField: keyof T;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
}

function useSortingAndPagination<T extends { [x: string]: any }>({
  items,
  defaultSortField,
  pageSizeOptions = [10, 25, 50],
  defaultPageSize = 10,
}: UseSortingAndPaginationProps<T>) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [sortField, setSortField] = useState(defaultSortField);
  const [sortDirection, setSortDirection] = useState<Direction>('asc');

  const onTableChange = ({ page, sort }: Criteria<T>) => {
    if (page) {
      const { index: pageIndex, size: pageSize } = page;
      setPageIndex(pageIndex);
      setPageSize(pageSize);
    }
    if (sort) {
      const { field: sortField, direction: sortDirection } = sort;
      setSortField(sortField);
      setSortDirection(sortDirection);
    }
  };

  // Manually handle sorting and pagination of data
  const findTodos = (
    todoItems: T[],
    pageIndex: number,
    pageSize: number,
    sortField: keyof T,
    sortDirection: Direction
  ) => {
    let _items;

    if (sortField) {
      _items = todoItems
        .slice(0)
        .sort(Comparators.property(sortField as string, Comparators.default(sortDirection)));
    } else {
      _items = todoItems;
    }

    let pageOfItems;

    if (!pageIndex && !pageSize) {
      pageOfItems = _items;
    } else {
      const startIndex = pageIndex * pageSize;
      pageOfItems = _items.slice(startIndex, Math.min(startIndex + pageSize, todoItems.length));
    }

    return {
      pageOfItems,
      totalItemCount: todoItems.length,
    };
  };

  const { pageOfItems, totalItemCount } = findTodos(
    items,
    pageIndex,
    pageSize,
    sortField,
    sortDirection
  );

  const pagination = {
    pageIndex: pageIndex,
    pageSize: pageSize,
    totalItemCount: totalItemCount,
    pageSizeOptions,
  };

  const sorting: EuiTableSortingType<T> = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
  };

  const resultsCount =
    pageSize === 0 ? (
      <strong>All</strong>
    ) : (
      <>
        <strong>
          {pageSize * pageIndex + 1}-{pageSize * pageIndex + pageSize}
        </strong>{' '}
        of <strong>{totalItemCount}</strong>
      </>
    );

  return {
    pageOfItems,
    pagination,
    sorting,
    onTableChange,
    resultsCount,
  };
}

export default useSortingAndPagination;
