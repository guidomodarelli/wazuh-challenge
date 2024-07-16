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

const wrapper = (
  notifications: RecordMock<CoreStart['notifications']>,
  services: RecordMock<Services>
) => {
  return ({ children }: { children?: React.ReactNode }) => (
    <ToDoProvider notifications={notifications} services={services}>
      {children}
    </ToDoProvider>
  );
};

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

  it('should fetch and populate todoItems correctly on initial render', async () => {
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
    let { result, waitForNextUpdate } = renderHook(() => useTodoContext(), {
      wrapper: wrapper(notifications, services),
    });

    await waitForNextUpdate();

    const { todoItems } = result.current;
    expect(todoItems).toHaveLength(2);
    expect(todoItems[0]).toEqual(todoItem1);
    expect(todoItems[1]).toEqual(todoItem2);
  });

  it('should call createNewTodo service and update context with new todo item', async () => {
    const todoItem1: Partial<TodoItem> = {
      title: 'test-1',
    };
    services.createNewTodo = jest.fn().mockResolvedValue(todoItem1);
    let { result, waitForNextUpdate } = renderHook(() => useTodoContext(), {
      wrapper: wrapper(notifications, services),
    });
    await waitForNextUpdate();

    expect(result.current.todoItems).toHaveLength(0);

    // @ts-expect-error
    await result.current.createTodo(todoItem1);

    expect(services.createNewTodo).toHaveBeenCalledTimes(1);
    expect(services.createNewTodo).toHaveBeenCalledWith(todoItem1);
    expect(notifications.toasts.addSuccess).toHaveBeenCalledTimes(1);
    expect(result.current.todoItems).toHaveLength(1);
    expect(result.current.todoItems[0]).toEqual(todoItem1);
  });

  it('should update a specific todo item and notify success', async () => {
    const todoItem1: Partial<TodoItem> = {
      id: '1',
      title: 'test-1',
    };
    const todoItem2: Partial<TodoItem> = {
      id: '2',
      title: 'test-2',
    };
    const todoItem3: Partial<TodoItem> = {
      id: '3',
      title: 'test-3',
    };
    const updatedtodoItem2: Partial<TodoItem> = {
      id: '2',
      title: 'test-2-updated',
    };
    services = {
      ...services,
      fetchTodos: jest.fn().mockResolvedValue([todoItem1, todoItem2, todoItem3]),
      updateTodo: jest.fn().mockResolvedValue([updatedtodoItem2]),
    };

    let { result, waitForNextUpdate } = renderHook(() => useTodoContext(), {
      wrapper: wrapper(notifications, services),
    });
    await waitForNextUpdate();

    expect(result.current.todoItems).toHaveLength(3);

    // @ts-expect-error
    await result.current.updateTodo(todoItem2.id, updatedtodoItem2);

    expect(services.updateTodo).toHaveBeenCalledTimes(1);
    expect(services.updateTodo).toHaveBeenCalledWith(todoItem2.id, updatedtodoItem2);
    expect(notifications.toasts.addSuccess).toHaveBeenCalledTimes(1);
    expect(result.current.todoItems).toHaveLength(3);
    expect(result.current.todoItems[1]).toEqual(updatedtodoItem2);
  });

  it('should delete specified todo items by their IDs and notify success', async () => {
    const todoItem1: Partial<TodoItem> = {
      id: '1',
      title: 'test-1',
    };
    const todoItem2: Partial<TodoItem> = {
      id: '2',
      title: 'test-2',
    };
    const todoItem3: Partial<TodoItem> = {
      id: '3',
      title: 'test-3',
    };
    services = {
      ...services,
      fetchTodos: jest.fn().mockResolvedValue([todoItem1, todoItem2, todoItem3]),
      deleteTodosByIds: jest.fn().mockResolvedValue([todoItem2]),
    };

    let { result, waitForNextUpdate } = renderHook(() => useTodoContext(), {
      wrapper: wrapper(notifications, services),
    });
    await waitForNextUpdate();

    expect(result.current.todoItems).toHaveLength(3);

    // @ts-expect-error
    await result.current.deleteTodosByIds(todoItem1.id, todoItem3.id)

    expect(services.deleteTodosByIds).toHaveBeenCalledTimes(1);
    expect(services.deleteTodosByIds).toHaveBeenCalledWith(todoItem1.id, todoItem3.id);
    expect(notifications.toasts.addSuccess).toHaveBeenCalledTimes(1);
    expect(result.current.todoItems).toHaveLength(1);
    expect(result.current.todoItems[0]).toEqual(todoItem2);
  });
});
