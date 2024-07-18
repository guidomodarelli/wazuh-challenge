import { CoreStart } from 'opensearch-dashboards/public';
import { OpenSearchSearchHit } from 'src/plugins/discover/public/application/doc_views/doc_views_types';
import {
  SERVER_TODO_BASE_ROUTE_PATH,
  SERVER_TODO_ROUTE_PATH_BULK_CREATE,
  SERVER_TODO_ROUTE_PATH_CREATE,
  SERVER_TODO_ROUTE_PATH_DELETE_IDS,
  SERVER_TODO_ROUTE_PATH_GET_ALL,
} from '../../../common';
import { TodoEntity, TodoEntityId, TodoEntityRequest } from '../domain/entities/TodoEntity';
import { TodoPort } from '../ports/TodoPort';

export class TodoAdapterOpenSearchHTTP implements TodoPort {
  private readonly http: CoreStart['http'];

  constructor(core: CoreStart) {
    this.http = core.http;
  }

  async findAll(): Promise<TodoEntity[]> {
    const searchHits = await this.http.get<OpenSearchSearchHit[]>(SERVER_TODO_ROUTE_PATH_GET_ALL);
    const todos = searchHits.map((hit) => ({
      ...(hit._source as TodoEntity),
      id: hit._id,
    }));
    return todos;
  }

  async save(todo: TodoEntityRequest): Promise<TodoEntity> {
    const response = await this.http.post(SERVER_TODO_ROUTE_PATH_CREATE, {
      body: JSON.stringify(todo),
    });
    return response;
  }

  async saveAll(todos: TodoEntityRequest[]): Promise<TodoEntity[]> {
    const response = await this.http.post(SERVER_TODO_ROUTE_PATH_BULK_CREATE, {
      body: JSON.stringify(todos),
    });
    return response as TodoEntity[];
  }

  async update(todoId: TodoEntityId, updatedTodo: TodoEntityRequest): Promise<void> {
    await this.http.put(`${SERVER_TODO_BASE_ROUTE_PATH}/${todoId}`, {
      body: JSON.stringify(updatedTodo),
    });
  }

  async deleteByIds(...todoIds: TodoEntityId[]): Promise<void> {
    await this.http.delete(SERVER_TODO_ROUTE_PATH_DELETE_IDS, {
      query: {
        ids: JSON.stringify(todoIds),
      },
    });
  }
}
