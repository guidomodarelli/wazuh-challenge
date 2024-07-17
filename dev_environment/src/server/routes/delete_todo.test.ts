import { IRouter } from 'opensearch-dashboards/server';
import { PartialRecordMock } from '../../common/global-types';
import { defineRouteDeleteTodos } from './delete_todo';

let router: PartialRecordMock<IRouter>;

describe('defineRouteDeleteTodos', () => {
  beforeEach(() => {
    router = {
      delete: jest.fn(),
    };
  });

  it('verify the correct API endpoint', () => {
    // @ts-expect-error
    defineRouteDeleteTodos(router);

    expect(router.delete).toHaveBeenCalledTimes(1);
    expect(router.delete?.mock.calls[0][0].path).toBe('/api/todo_plugin/deleteIds');
  });
});
