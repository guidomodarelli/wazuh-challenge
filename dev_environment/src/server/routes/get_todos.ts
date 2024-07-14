import { ApiResponse } from '@opensearch-project/opensearch';
import { SearchResponse } from '@opensearch-project/opensearch/api/types';
import { IRouter } from 'opensearch-dashboards/server';
import { SERVER_TODO_ROUTE_PATH_GET_ALL } from '../../common';
import { TODO_INDEX } from '../constants';
import { createIndexIfNotExists } from '../utils/create_index';

export function defineRouteGetTodos(router: IRouter) {
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
}
