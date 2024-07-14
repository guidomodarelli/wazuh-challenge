import { IRouter } from 'opensearch-dashboards/server';
import { SERVER_TODO_BASE_ROUTE_PATH } from '../../common';
import { TODO_INDEX } from '../constants';
import { schemeParamId, schemeTodo } from '../scheme';
import { createIndexIfNotExists } from '../utils/create_index';

export function defineRouteUpdateTodo(router: IRouter) {
  router.put(
    {
      path: `${SERVER_TODO_BASE_ROUTE_PATH}/{id}`,
      validate: {
        params: schemeParamId,
        body: schemeTodo,
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
