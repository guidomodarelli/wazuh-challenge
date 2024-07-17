import { IRouter } from 'opensearch-dashboards/server';
import { SERVER_TODO_ROUTE_PATH_DELETE_IDS } from '../../common';
import { TODO_INDEX } from '../constants';
import { schemaIds } from '../schema';
import { createIndexIfNotExists } from '../utils/create_index';

/**
 * The function `defineRouteDeleteTodos` defines a route for deleting todos in an OpenSearch index based on the provided
 * IDs.
 */
export function defineRouteDeleteTodos(router: IRouter) {
  router.delete(
    {
      path: SERVER_TODO_ROUTE_PATH_DELETE_IDS,
      validate: {
        query: schemaIds,
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
