import { IRouter } from 'opensearch-dashboards/server';
import { SERVER_TODO_BASE_ROUTE_PATH } from '../../common';
import { TODO_INDEX } from '../constants';
import { schemaParamId, schemaTodo } from '../schema';
import { createIndexIfNotExists } from '../utils/create_index';

/**
 * The `defineRouteUpdateTodo` function updates a todo item in an OpenSearch index based on the provided ID and request
 * body.
 */
export function defineRouteUpdateTodo(router: IRouter) {
  router.put(
    {
      path: `${SERVER_TODO_BASE_ROUTE_PATH}/{id}`,
      validate: {
        params: schemaParamId,
        body: schemaTodo,
      },
    },
    async (context, request, response) => {
      const openSearchClient = context.core.opensearch.client.asCurrentUser;
      createIndexIfNotExists(openSearchClient);

      const id = request.params.id;

      await openSearchClient.update({
        index: TODO_INDEX,
        id,
        body: {
          doc: request.body,
        },
      });
      return response.ok();
    }
  );
}
