import { IRouter } from 'opensearch-dashboards/server';
import type { PartialRecordMock } from '../../test/mocks/types';
import { defineRouteGetTodos } from './get_todos';

let router: PartialRecordMock<IRouter>;

describe('defineRouteGetTodos', () => {
  beforeEach(() => {
    router = {
      get: jest.fn(),
    };
  });

  it('should call the correct endpoint to get all todos', () => {
    // @ts-expect-error
    defineRouteGetTodos(router);

    expect(router.get).toHaveBeenCalledTimes(1);
    expect(router.get?.mock.calls[0][0].path).toBe('/api/todo_plugin/getAll');
  });
});
