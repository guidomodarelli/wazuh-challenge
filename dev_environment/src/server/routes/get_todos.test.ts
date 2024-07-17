import { IRouter } from 'opensearch-dashboards/server';
import { PartialRecordMock } from '../../common/global-types';
import { defineRouteGetTodos } from './get_todos';

let router: PartialRecordMock<IRouter>;

describe('defineRouteGetTodos', () => {
  beforeEach(() => {
    router = {
      get: jest.fn(),
    };
  });

  it('verify the correct API endpoint', () => {
    // @ts-expect-error
    defineRouteGetTodos(router);

    expect(router.get).toHaveBeenCalledTimes(1);
    expect(router.get?.mock.calls[0][0].path).toBe('/api/todo_plugin/getAll');
  });
});
