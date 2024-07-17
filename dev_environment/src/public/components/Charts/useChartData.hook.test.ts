import { renderHook } from '@testing-library/react-hooks';
import { mockTodoContextFn } from '../../../__mocks__/todo-context.mock';
import { TodoItem } from '../../../common/types';
import * as TodoContext from '../../context/TodoContext';
import useChartData from './useChartData.hook';

let mockTodoContext: ReturnType<typeof mockTodoContextFn>;

describe('useChartData', () => {
  beforeEach(() => {
    mockTodoContext = mockTodoContextFn(jest);
    jest.spyOn(TodoContext, 'useTodoContext').mockImplementation(() => mockTodoContext);
  });

  it('should ', () => {
    const todoItems: Pick<TodoItem, 'assignee'>[] = [
      {
        assignee: 'Tyler',
      },
      {
        assignee: 'Jadyn',
      },
      {
        assignee: 'Nicholas',
      },
      {
        assignee: 'Nicholas',
      },
    ];
    const { result } = renderHook(() => useChartData());

    // @ts-expect-error
    let response = result.current.groupByAssignee(todoItems[3], todoItems);

    expect(response).toBe(2);

    // @ts-expect-error
    response = result.current.groupByAssignee(todoItems[1], todoItems);

    expect(response).toBe(1);
  });
});
