import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { CoreStart } from 'opensearch-dashboards/public';
import React from 'react';
import { RecordMock } from '../../common/global-types';
import { TodoItem } from '../../common/types';
import { Services } from '../services';
import ToDoProvider, { useTodoContext } from './TodoContext';

let notifications: RecordMock<CoreStart['notifications']>;
let services: RecordMock<Services>;

describe('TodoContext', () => {
  beforeEach(() => {
    notifications = {
      // @ts-expect-error
      toasts: {
        addSuccess: jest.fn(),
      },
    };
    services = {
      fetchTodos: jest.fn().mockResolvedValue([]),
      bulkCreateTodos: jest.fn(),
      createNewTodo: jest.fn(),
      deleteTodosByIds: jest.fn(),
      updateTodo: jest.fn(),
    };
  });

  it('should call fetchTodos service once on render', () => {
    render(<ToDoProvider notifications={notifications} services={services}></ToDoProvider>);

    expect(services.fetchTodos).toHaveBeenCalledTimes(1);
  });

  it('should ', async () => {
    const todoItem1: Partial<TodoItem> = {
      title: 'test-1',
    };
    const todoItem2: Partial<TodoItem> = {
      title: 'test-2',
    };
    services = {
      ...services,
      fetchTodos: jest.fn().mockResolvedValue([todoItem1, todoItem2]),
    };
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <ToDoProvider notifications={notifications} services={services}>
        {children}
      </ToDoProvider>
    );

    let { result, waitForNextUpdate } = renderHook(() => useTodoContext(), {
      wrapper,
      initialProps: {
        services,
        notifications,
      },
    });

    await waitForNextUpdate();

    const { todoItems } = result.current;
    expect(todoItems).toHaveLength(2);
    expect(todoItems[0]).toEqual(todoItem1);
    expect(todoItems[1]).toEqual(todoItem2);
  });
});
