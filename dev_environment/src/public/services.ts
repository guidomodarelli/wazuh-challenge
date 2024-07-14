import { CoreStart, HttpFetchError } from 'opensearch-dashboards/public';
import { TodoItem, CreateTodoItem } from '../common/types';
import { OpenSearchSearchHit } from 'src/plugins/discover/public/application/doc_views/doc_views_types';
import { SERVER_TODO_ROUTE_PATH_CREATE, SERVER_TODO_ROUTE_PATH_GET_ALL } from '../common';

export interface Services {
  fetchTodos: () => Promise<TodoItem[] | HttpFetchError>;
  createNewTodo: (newTodoItem: CreateTodoItem) => Promise<TodoItem | HttpFetchError>;
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
    async createNewTodo(newTodoItem: CreateTodoItem) {
      try {
        const response = await http.post(SERVER_TODO_ROUTE_PATH_CREATE, {
          body: JSON.stringify(newTodoItem),
        });
        return response as TodoItem;
      } catch (error) {
        return error as HttpFetchError;
      }
    },
  };

  return services;
}
