import { render } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import { CoreStart } from 'opensearch-dashboards/public';
import React from 'react';
import { RecordMock } from '../../common/global-types';
import { Status, TodoItem } from '../../common/types';
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

  it('filters todo items based on search criteria', async () => {
    const todoItems: Pick<TodoItem, 'title' | 'tags' | 'assignee'>[] = [
      {
        title: 'Absorbeo vulgaris speculum crapula agnosco clarus utpote',
        tags: ['uter', 'vehemens', 'consequuntur', 'tonsor', 'corporis'],
        assignee: 'Tyler',
      },
      {
        title: 'Artificiose vereor asd demum',
        tags: ['modi', 'clementia', 'tonsor', 'curtus', 'qui'],
        assignee: 'Jadyn',
      },
      {
        title: 'Calculus talio damno quia censura absque argumentum',
        tags: ['tum', 'magnam', 'corporis', 'asperiores', 'accusator'],
        assignee: 'Nicholas',
      },
      {
        title: 'Curriculum sublime adfectus deporto',
        tags: ['uter', 'modi', 'clementia', 'corporis', 'qui'],
        assignee: 'Nicholas',
      },
    ];

    services = {
      ...services,
      fetchTodos: jest.fn().mockResolvedValue(todoItems),
    };
    let { result, waitForNextUpdate } = renderHook(() => useTodoContext(), {
      wrapper: wrapper(notifications, services),
    });
    await waitForNextUpdate();

    act(() => {
      result.current.setSearch('qui');
    });

    expect(result.current.filteredTodoItems).toHaveLength(3);
    expect(result.current.filteredTodoItems).toEqual([todoItems[1], todoItems[2], todoItems[3]]);

    act(() => {
      result.current.setSearch('consequuntur');
    });

    expect(result.current.filteredTodoItems).toHaveLength(1);
    expect(result.current.filteredTodoItems).toEqual([todoItems[0]]);

    act(() => {
      result.current.setSearch('Jadyn');
    });

    expect(result.current.filteredTodoItems).toHaveLength(1);
    expect(result.current.filteredTodoItems).toEqual([todoItems[1]]);

    act(() => {
      result.current.setSearch('Nicholas');
    });

    expect(result.current.filteredTodoItems).toHaveLength(2);
    expect(result.current.filteredTodoItems).toEqual([todoItems[2], todoItems[3]]);
  });

  it('verify completedTodos count updates correctly after todo items are completed and reverted', async () => {
    const todoItem1: Pick<TodoItem, 'id' | 'title' | 'status'> = {
      id: '1',
      title: 'test-1',
      status: Status.IN_PROGRESS,
    };
    const todoItem2: Pick<TodoItem, 'id' | 'title' | 'status'> = {
      id: '2',
      title: 'test-2',
      status: Status.IN_PROGRESS,
    };
    const updatedTodoItem2: Pick<TodoItem, 'id' | 'title' | 'status'> = {
      id: '2',
      title: 'test-2',
      status: Status.COMPLETED,
    };
    const todoItem3: Pick<TodoItem, 'id' | 'title' | 'status'> = {
      id: '3',
      title: 'test-3',
      status: Status.IN_PROGRESS,
    };
    const updatedTodoItem3: Pick<TodoItem, 'id' | 'title' | 'status'> = {
      id: '3',
      title: 'test-3',
      status: Status.COMPLETED,
    };
    services = {
      ...services,
      fetchTodos: jest.fn().mockResolvedValue([todoItem1, todoItem2, todoItem3]),
    };
    let { result, waitForNextUpdate } = renderHook(() => useTodoContext(), {
      wrapper: wrapper(notifications, services),
    });
    await waitForNextUpdate();

    expect(result.current.completedTodos).toBe(0);

    await act(async () => {
      // @ts-expect-error
      await result.current.updateTodo(todoItem2.id, updatedTodoItem2);
    });
    expect(result.current.completedTodos).toBe(1);

    await act(async () => {
      // @ts-expect-error
      await result.current.updateTodo(todoItem3.id, updatedTodoItem3);
    });
    expect(result.current.completedTodos).toBe(2);

    await act(async () => {
      // @ts-expect-error
      await result.current.updateTodo(todoItem2.id, todoItem2);
      // @ts-expect-error
      await result.current.updateTodo(todoItem3.id, todoItem3);
    });
    expect(result.current.completedTodos).toBe(0);
  });

  it('should fetch and populate todoItems correctly on initial render', async () => {
    const todoItem1: Pick<TodoItem, 'title'> = {
      title: 'test-1',
    };
    const todoItem2: Pick<TodoItem, 'title'> = {
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
    const todoItem1: Pick<TodoItem, 'title'> = {
      title: 'test-1',
    };
    services.createNewTodo = jest.fn().mockResolvedValue(todoItem1);
    let { result, waitForNextUpdate } = renderHook(() => useTodoContext(), {
      wrapper: wrapper(notifications, services),
    });
    await waitForNextUpdate();

    expect(result.current.todoItems).toHaveLength(0);

    await act(async () => {
      // @ts-expect-error
      await result.current.createTodo(todoItem1);
    });

    expect(services.createNewTodo).toHaveBeenCalledTimes(1);
    expect(services.createNewTodo).toHaveBeenCalledWith(todoItem1);
    expect(notifications.toasts.addSuccess).toHaveBeenCalledTimes(1);
    expect(result.current.todoItems).toHaveLength(1);
    expect(result.current.todoItems[0]).toEqual(todoItem1);
  });

  it('should update a specific todo item and notify success', async () => {
    const todoItem1: Pick<TodoItem, 'id' | 'title'> = {
      id: '1',
      title: 'test-1',
    };
    const todoItem2: Pick<TodoItem, 'id' | 'title'> = {
      id: '2',
      title: 'test-2',
    };
    const todoItem3: Pick<TodoItem, 'id' | 'title'> = {
      id: '3',
      title: 'test-3',
    };
    const updatedtodoItem2: Pick<TodoItem, 'id' | 'title'> = {
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

    await act(async () => {
      // @ts-expect-error
      await result.current.updateTodo(todoItem2.id, updatedtodoItem2);
    });

    expect(services.updateTodo).toHaveBeenCalledTimes(1);
    expect(services.updateTodo).toHaveBeenCalledWith(todoItem2.id, updatedtodoItem2);
    expect(notifications.toasts.addSuccess).toHaveBeenCalledTimes(1);
    expect(result.current.todoItems).toHaveLength(3);
    expect(result.current.todoItems[1]).toEqual(updatedtodoItem2);
  });

  it('should delete specified todo items by their IDs and notify success', async () => {
    const todoItem1: Pick<TodoItem, 'id' | 'title'> = {
      id: '1',
      title: 'test-1',
    };
    const todoItem2: Pick<TodoItem, 'id' | 'title'> = {
      id: '2',
      title: 'test-2',
    };
    const todoItem3: Pick<TodoItem, 'id' | 'title'> = {
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

    await result.current.deleteTodosByIds(todoItem1.id, todoItem3.id);

    expect(services.deleteTodosByIds).toHaveBeenCalledTimes(1);
    expect(services.deleteTodosByIds).toHaveBeenCalledWith(todoItem1.id, todoItem3.id);
    expect(notifications.toasts.addSuccess).toHaveBeenCalledTimes(1);
    expect(result.current.todoItems).toHaveLength(1);
    expect(result.current.todoItems[0]).toEqual(todoItem2);
  });

  it('should add sample data with expected properties and notify success', async () => {
    services.bulkCreateTodos = jest.fn().mockResolvedValue([]);

    const todoItemExpected = {
      id: expect.any(String),
      createdAt: expect.any(String),
      priority: expect.any(String),
      status: expect.any(String),
      title: expect.any(String),
      tags: expect.arrayContaining([expect.any(String)]),
      assignee: expect.any(String),
    };

    let { result, waitForNextUpdate } = renderHook(() => useTodoContext(), {
      wrapper: wrapper(notifications, services),
    });
    await waitForNextUpdate();

    expect(result.current.todoItems).toHaveLength(0);

    const fakes = 3;
    await result.current.addSampleData(fakes);

    expect(services.bulkCreateTodos).toHaveBeenCalledTimes(1);
    expect(services.bulkCreateTodos).toHaveBeenCalledWith(
      expect.objectContaining(todoItemExpected),
      expect.objectContaining(todoItemExpected),
      expect.objectContaining(todoItemExpected)
    );
    expect(notifications.toasts.addSuccess).toHaveBeenCalledTimes(1);
    expect(result.current.todoItems).toHaveLength(fakes);
    expect(result.current.todoItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining(todoItemExpected),
        expect.objectContaining(todoItemExpected),
        expect.objectContaining(todoItemExpected),
      ])
    );
  });
});
