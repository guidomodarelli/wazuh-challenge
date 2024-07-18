import { renderHook } from '@testing-library/react-hooks';
import useSortingAndPagination from './useSortingAndPagination.hook';
import { TodoEntity } from '../../core/domain/entities/TodoEntity';
import { faker } from '@faker-js/faker';
import { render } from '@testing-library/react';

const textMatcher = (content: string) => (_: string, element: Element | null): boolean => {
  const _element = element as HTMLElement;
  const hasText = (node: HTMLElement) => node.textContent === content;
  const elementHasText = hasText(_element);
  const childrenDontHaveText = Array.from(_element.children).every(
    (child) => !hasText(child as HTMLElement)
  );
  return elementHasText && childrenDontHaveText;
};

describe('useSortingAndPagination', () => {
  it('should ', () => {
    const items: Pick<TodoEntity, 'title'>[] = [];
    for (let i = 0; i < 10; i++) {
      items.push({ title: faker.lorem.sentence() });
    }

    const { result } = renderHook(() =>
      useSortingAndPagination({
        items,
        defaultSortField: 'title',
        defaultPageSize: 3,
      })
    );

    expect(result.current.pagination.pageIndex).toBe(0);
    expect(result.current.pagination.pageSize).toBe(3);
    expect(result.current.pagination.totalItemCount).toBe(10);

    const screen = render(result.current.resultsCount);

    expect(screen.getByText(textMatcher('1-3 of 10'))).toBeTruthy();
  });
});
