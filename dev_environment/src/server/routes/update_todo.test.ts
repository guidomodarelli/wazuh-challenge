import { IRouter } from 'opensearch-dashboards/server';
import { PartialRecordMock } from '../../common/global-types';
import { defineRouteUpdateTodo } from './update_todo';

let router: PartialRecordMock<IRouter>;

describe('defineRouteUpdateTodo', () => {
  beforeEach(() => {
    router = {
      put: jest.fn(),
    };
  });

  it('verify the correct API endpoint', () => {
    // @ts-expect-error
    defineRouteUpdateTodo(router);

    expect(router.put).toHaveBeenCalledTimes(1);
    expect(router.put?.mock.calls[0][0].path).toBe('/api/todo_plugin/{id}');
  });
});
