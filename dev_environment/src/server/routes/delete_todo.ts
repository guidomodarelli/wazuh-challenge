import { IRouter } from 'opensearch-dashboards/server';
import { SERVER_TODO_BASE_ROUTE_PATH, SERVER_TODO_ROUTE_PATH_DELETE_IDS } from '../../common';
import { TODO_INDEX } from '../constants';
import { schemeIds, schemeParamId } from '../scheme';
import { createIndexIfNotExists } from '../utils/create_index';

/**
 * The function `defineRouteDeleteTodo` defines a route for deleting a todo item in an OpenSearch index based on the
 * provided ID.
 */
export function defineRouteDeleteTodo(router: IRouter) {
  router.delete(
    {
      path: `${SERVER_TODO_BASE_ROUTE_PATH}/{id}`,
      validate: {
        params: schemeParamId,
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

/**
 * The function `defineRouteDeleteTodos` defines a route for deleting todos in an OpenSearch index based on the provided
 * IDs.
 */
export function defineRouteDeleteTodos(router: IRouter) {
  router.delete(
    {
      path: SERVER_TODO_ROUTE_PATH_DELETE_IDS,
      validate: {
        query: schemeIds,
      },
    },
    async (context, request, response) => {
      const openSearchClient = context.core.opensearch.client.asCurrentUser;
      createIndexIfNotExists(openSearchClient);

      const deleteIds = request.query.ids;

      openSearchClient.deleteByQuery({
        index: TODO_INDEX,
        body: {
          query: {
            ids: {
              values: deleteIds,
            },
          },
        },
      });

      return response.ok();
    }
  );
}
