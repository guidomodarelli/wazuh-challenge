import { renderHook } from '@testing-library/react-hooks';
import { mockTodoContextFn } from '../../../__mocks__/todo-context.mock';
import { Priority, Status, TodoItem } from '../../../common/types';
import * as TodoContext from '../../context/TodoContext';
import useChartData from './useChartData.hook';

let mockTodoContext: ReturnType<typeof mockTodoContextFn>;

describe('useChartData', () => {
  beforeEach(() => {
    mockTodoContext = mockTodoContextFn(jest);
    jest.spyOn(TodoContext, 'useTodoContext').mockImplementation(() => mockTodoContext);
  });

  it('verify function correctly groups todo items by assignee', () => {
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

  it('verify function groups todo items by priority and status', () => {
    const todoItems: Pick<TodoItem, 'status' | 'priority'>[] = [
      {
        status: Status.EXECUTED_WITH_ERROR,
        priority: Priority.LOW,
      },
      {
        status: Status.IN_PROGRESS,
        priority: Priority.LOW,
      },
      {
        status: Status.IN_PROGRESS,
        priority: Priority.LOW,
      },
      {
        status: Status.COMPLETED,
        priority: Priority.HIGH,
      },
    ];
    const { result } = renderHook(() => useChartData());

    // @ts-expect-error
    const response = result.current.groupByPriorityAndStatus(todoItems);

    const expectedType = expect.objectContaining({
      key: expect.any(String),
      count: expect.any(Number),
    });

    expect(response).toEqual(expect.arrayContaining([expectedType, expectedType, expectedType]));

    for (const element of response) {
      if (element.key === `${Status.IN_PROGRESS} (${Priority.LOW})`) {
        expect(element.count).toBe(2);
      }
      if (element.key === `${Status.EXECUTED_WITH_ERROR} (${Priority.LOW})`) {
        expect(element.count).toBe(1);
      }
      if (element.key === `${Status.COMPLETED} (${Priority.HIGH})`) {
        expect(element.count).toBe(1);
      }
    }
  });


});
