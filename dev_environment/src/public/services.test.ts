import { CoreStart } from 'opensearch-dashboards/public';
import { RecordMock } from '../common/global-types';
import { getServices } from './services';
import { TodoItem } from '../common/types';

let http: RecordMock<CoreStart['http']>;

describe('services', () => {
  beforeEach(() => {
    // @ts-expect-error
    http = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    };
  });

  it('fetches and returns todo items with ids', async () => {
    const todoItems: Pick<TodoItem, 'title'>[] = [
      {
        title: 'Absorbeo vulgaris speculum crapula agnosco clarus utpote',
      },
      {
        title: 'Artificiose vereor asd demum',
      },
      {
        title: 'Calculus talio damno quia censura absque argumentum',
      },
      {
        title: 'Curriculum sublime adfectus deporto',
      },
    ];
    const openSearchSearchHit = todoItems.map((item, index) => ({
      _source: item,
      _id: index,
    }));
    http.get = jest.fn().mockResolvedValue(openSearchSearchHit);
    // @ts-expect-error
    const services = getServices({ http });

    const todosReturned = await services.fetchTodos();

    expect(http.get).toHaveBeenCalledTimes(1);
    expect(http.get).toHaveBeenCalledWith('/api/todo_plugin/getAll');
    const todosExpected = todoItems.map((item, index) => {
      return {
        ...item,
        id: index,
      };
    });
    expect(todosReturned).toEqual(todosExpected);
  });

  it('creates and returns a new todo item with an id', async () => {
    const todoItem: Pick<TodoItem, 'title'> = {
      title: 'Absorbeo vulgaris speculum crapula agnosco clarus utpote',
    };
    const todosExpected = { id: 1, ...todoItem };
    http.post = jest.fn().mockResolvedValue(todosExpected);
    // @ts-expect-error
    const services = getServices({ http });

    // @ts-expect-error
    const todoReturned = await services.createNewTodo(todoItem);

    expect(http.post).toHaveBeenCalledTimes(1);
    expect(http.post).toHaveBeenCalledWith('/api/todo_plugin/create', {
      body: JSON.stringify(todoItem),
    });
    expect(todoReturned).toEqual(todosExpected);
  });

  it('bulk creates and returns multiple todo items with ids', async () => {
    const todoItems: Pick<TodoItem, 'title'>[] = [
      {
        title: 'Absorbeo vulgaris speculum crapula agnosco clarus utpote',
      },
      {
        title: 'Artificiose vereor asd demum',
      },
      {
        title: 'Calculus talio damno quia censura absque argumentum',
      },
      {
        title: 'Curriculum sublime adfectus deporto',
      },
    ];
    const todosExpected = todoItems.map((item, index) => {
      return {
        ...item,
        id: index,
      };
    });
    http.post = jest.fn().mockResolvedValue(todosExpected);
    // @ts-expect-error
    const services = getServices({ http });

    // @ts-expect-error
    const todoReturned = await services.bulkCreateTodos(...todoItems);

    expect(http.post).toHaveBeenCalledTimes(1);
    expect(http.post).toHaveBeenCalledWith('/api/todo_plugin/bulkCreate', {
      body: JSON.stringify(todoItems),
    });
    expect(todoReturned).toEqual(todosExpected);
  });

  it('updates an existing todo item by id', async () => {
    const todoItem: Pick<TodoItem, 'id' | 'title'> = {
      id: '1',
      title: 'Absorbeo vulgaris speculum crapula agnosco clarus utpote',
    };

    // @ts-expect-error
    const services = getServices({ http });

    // @ts-expect-error
    await services.updateTodo(todoItem.id, todoItem);

    expect(http.put).toHaveBeenCalledTimes(1);
    expect(http.put).toHaveBeenCalledWith(`/api/todo_plugin/${todoItem.id}`, {
      body: JSON.stringify(todoItem),
    });
  });

  it('deletes multiple todo items by ids', async () => {
    const todoIds: string[] = ['1', '2', '3', '4'];
    // @ts-expect-error
    const services = getServices({ http });

    await services.deleteTodosByIds(...todoIds);

    expect(http.delete).toHaveBeenCalledTimes(1);
    expect(http.delete).toHaveBeenCalledWith('/api/todo_plugin/deleteIds', {
      query: {
        ids: JSON.stringify(todoIds),
      }
    });
  });
});
