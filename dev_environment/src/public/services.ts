import { CoreStart, HttpFetchError } from 'opensearch-dashboards/public';
import { TodoItem, TodoItemRequest } from '../common/types';
import { OpenSearchSearchHit } from 'src/plugins/discover/public/application/doc_views/doc_views_types';
import {
  SERVER_TODO_BASE_ROUTE_PATH,
  SERVER_TODO_ROUTE_PATH_CREATE,
  SERVER_TODO_ROUTE_PATH_DELETE_IDS,
  SERVER_TODO_ROUTE_PATH_GET_ALL,
} from '../common';

export interface Services {
  fetchTodos: () => Promise<TodoItem[] | HttpFetchError>;
  createNewTodo: (newTodoItem: TodoItemRequest) => Promise<TodoItem | HttpFetchError>;
  updateTodo: (
    itemIdToUpdate: string,
    updatedTodo: TodoItemRequest
  ) => Promise<undefined | HttpFetchError>;
  deleteTodo: (todoId: string) => Promise<undefined | HttpFetchError>;
  deleteTodosByIds: (...todoIds: string[]) => Promise<undefined | HttpFetchError>;
}

export function getServices({ http }: CoreStart): Services {
  const services: Services = {
    async fetchTodos() {
      try {
        const searchHits = await http.get<OpenSearchSearchHit[]>(SERVER_TODO_ROUTE_PATH_GET_ALL);
        const todos = searchHits.map(
          (hit) =>
            ({
              ...(hit._source as TodoItem),
              id: hit._id,
            } as TodoItem)
        );
        return todos;
      } catch (err) {
        return err as HttpFetchError;
      }
    },
    async createNewTodo(newTodoItem: TodoItemRequest) {
      try {
        const response = await http.post(SERVER_TODO_ROUTE_PATH_CREATE, {
          body: JSON.stringify(newTodoItem),
        });
        return response as TodoItem;
      } catch (error) {
        return error as HttpFetchError;
      }
    },
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
    async deleteTodo(todoId) {
      try {
        await http.delete(`${SERVER_TODO_BASE_ROUTE_PATH}/${todoId}`);
        return;
      } catch (error) {
        return error as HttpFetchError;
      }
    },
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
