import { IRouter } from 'opensearch-dashboards/server';
import { PartialRecordMock } from '../../common/global-types';
import { defineRouteCreateNewTodo } from './create_new_todo';

let router: PartialRecordMock<IRouter>;

describe('defineRouteCreateNewTodo', () => {
  beforeEach(() => {
    router = {
      post: jest.fn(),
    };
  });

  it('should call the correct endpoint to create a new todo', () => {
    // @ts-expect-error
    defineRouteCreateNewTodo(router);

    expect(router.post).toHaveBeenCalledTimes(1);
    expect(router.post?.mock.calls[0][0].path).toBe('/api/todo_plugin/create');
  });
});
