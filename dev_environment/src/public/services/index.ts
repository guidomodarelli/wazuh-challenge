import { CoreStart, HttpFetchError } from 'opensearch-dashboards/public';
import type { OpenSearchSearchHit } from 'src/plugins/discover/public/application/doc_views/doc_views_types';
import {
  SERVER_TODO_BASE_ROUTE_PATH,
  SERVER_TODO_ROUTE_PATH_BULK_CREATE,
  SERVER_TODO_ROUTE_PATH_CREATE,
  SERVER_TODO_ROUTE_PATH_DELETE_IDS,
  SERVER_TODO_ROUTE_PATH_GET_ALL,
} from '../../common';
import { TodoEntity, TodoEntityRequest } from '../core/domain/entities/TodoEntity';

export interface Services {
  fetchTodos: () => Promise<TodoEntity[] | HttpFetchError>;
  createNewTodo: (newTodoItem: TodoEntityRequest) => Promise<TodoEntity | HttpFetchError>;
  bulkCreateTodos: (
    ...newTodos: (TodoEntityRequest | TodoEntity)[]
  ) => Promise<TodoEntity[] | HttpFetchError>;
  updateTodo: (
    itemIdToUpdate: string,
    updatedTodo: TodoEntityRequest
  ) => Promise<undefined | HttpFetchError>;
  deleteTodosByIds: (...todoIds: string[]) => Promise<undefined | HttpFetchError>;
}

export function getServices({ http }: CoreStart): Services {
  const services: Services = {
    /* The `fetchTodos` function fetches all todo items from the server. */
    async fetchTodos() {
      try {
        const searchHits = await http.get<OpenSearchSearchHit[]>(SERVER_TODO_ROUTE_PATH_GET_ALL);
        const todos = searchHits.map(
          (hit) =>
            ({
              ...(hit._source as TodoEntity),
              id: hit._id,
            } as TodoEntity)
        );
        return todos;
      } catch (err) {
        return err as HttpFetchError;
      }
    },

    /* The `createNewTodo` function is responsible for creating a new todo item on the server. */
    async createNewTodo(newTodoItem: TodoEntityRequest) {
      try {
        const response = await http.post(SERVER_TODO_ROUTE_PATH_CREATE, {
          body: JSON.stringify(newTodoItem),
        });
        return response as TodoEntity;
      } catch (error) {
        return error as HttpFetchError;
      }
    },

    async bulkCreateTodos(...newTodos) {
      try {
        const response = await http.post(SERVER_TODO_ROUTE_PATH_BULK_CREATE, {
          body: JSON.stringify(newTodos),
        });
        return response as TodoEntity[];
      } catch (error) {
        return error as HttpFetchError;
      }
    },

    /* The `updateTodo` function is responsible for updating an existing todo item on the server. */
    async updateTodo(itemIdToUpdate, updatedTodo) {
      try {
        await http.put(`${SERVER_TODO_BASE_ROUTE_PATH}/${itemIdToUpdate}`, {
          body: JSON.stringify(updatedTodo),
        });
        return;
      } catch (error) {
        return error as HttpFetchError;
      }
    },

    /* The `deleteTodosByIds` function is responsible for deleting multiple todo items from the server based on their
    IDs. */
    async deleteTodosByIds(...todoIds) {
      try {
        await http.delete(SERVER_TODO_ROUTE_PATH_DELETE_IDS, {
          query: {
            ids: JSON.stringify(todoIds),
          },
        });
        return;
      } catch (error) {
        return error as HttpFetchError;
      }
    },
  };

  return services;
}
