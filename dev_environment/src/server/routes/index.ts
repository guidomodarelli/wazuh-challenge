import { schema } from '@osd/config-schema';
import { v4 as UUID } from 'uuid';
import { IRouter, OpenSearchClient } from '../../../../src/core/server';
import {
  SERVER_TODO_BASE_ROUTE_PATH,
  SERVER_TODO_ROUTE_PATH_CREATE,
  SERVER_TODO_ROUTE_PATH_GET_ALL,
} from '../../common';
import { TODO_INDEX } from '../constants';
import { ApiResponse } from '@opensearch-project/opensearch';
import { SearchResponse } from '@opensearch-project/opensearch/api/types';

async function createIndexIfNotExists(openSearchClient: OpenSearchClient) {
  if (!(await openSearchClient.indices.exists({ index: TODO_INDEX }))) {
    await openSearchClient.indices.create({ index: TODO_INDEX });
  }
}

export function defineRoutes(router: IRouter) {
  router.post(
    {
      path: SERVER_TODO_ROUTE_PATH_CREATE,
      validate: {
        body: schema.object({
          title: schema.string({ minLength: 3 }),
          priority: schema.string(),
          dueDate: schema.maybe(schema.string()),
          plannedDate: schema.maybe(schema.string()),
        }),
      },
    },
    async (context, request, response) => {
      const openSearchClient = context.core.opensearch.client.asCurrentUser;
      createIndexIfNotExists(openSearchClient);
      const newTodo = {
        id: UUID(),
        ...request.body,
      };
      await openSearchClient.create({
        id: newTodo.id,
        index: TODO_INDEX,
        body: newTodo,
      });
      return response.custom({
        statusCode: 201,
        body: newTodo,
      });
    }
  );
  router.get(
    {
      path: SERVER_TODO_ROUTE_PATH_GET_ALL,
      validate: false,
    },
    async (context, request, response) => {
      const openSearchClient = context.core.opensearch.client.asCurrentUser;
      createIndexIfNotExists(openSearchClient);

      const todos: ApiResponse<SearchResponse> = await openSearchClient.search({
        index: TODO_INDEX,
      });
      return response.ok({
        body: todos.body.hits.hits,
      });
    }
  );
  router.delete(
    {
      path: `${SERVER_TODO_BASE_ROUTE_PATH}/{id}`,
      validate: {
        params: schema.object({
          // This parameter name matches the one in POST_MESSAGE_ROUTE_PATH: `api/post_message/{id}`.
          // Params are often used for ids like this.
          id: schema.string(),
        }),
      },
    },
    async (context, request, response) => {
      const openSearchClient = context.core.opensearch.client.asCurrentUser;
      createIndexIfNotExists(openSearchClient);

      const id = request.params.id;

      await openSearchClient.delete({ index: TODO_INDEX, id });
      return response.ok();
    }
  );
}
