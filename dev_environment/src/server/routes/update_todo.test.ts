import { IRouter } from 'opensearch-dashboards/server';
import type { PartialRecordMock } from '../../test/mocks/types';
import { defineRouteUpdateTodo } from './update_todo';

let router: PartialRecordMock<IRouter>;

describe('defineRouteUpdateTodo', () => {
  beforeEach(() => {
    router = {
      put: jest.fn(),
    };
  });

  it('should call the correct endpoint to update a todo', () => {
    // @ts-expect-error
    defineRouteUpdateTodo(router);

    expect(router.put).toHaveBeenCalledTimes(1);
    expect(router.put?.mock.calls[0][0].path).toBe('/api/todo_plugin/{id}');
  });
});
