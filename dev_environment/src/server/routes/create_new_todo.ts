import { IRouter } from 'opensearch-dashboards/server';
import { v4 as UUID } from 'uuid';
import { SERVER_TODO_ROUTE_PATH_CREATE } from '../../common';
import { Status } from '../../common/types';
import { TODO_INDEX } from '../constants';
import { schemeTodo } from '../scheme';
import { createIndexIfNotExists } from '../utils/create_index';

export function defineRouteCreateNewTodo(router: IRouter) {
  router.post(
    {
      path: SERVER_TODO_ROUTE_PATH_CREATE,
      validate: { body: schemeTodo },
    },
    async (context, request, response) => {
      const openSearchClient = context.core.opensearch.client.asCurrentUser;
      createIndexIfNotExists(openSearchClient);

      const newTodo = {
        id: UUID(),
        createdAt: new Date().toISOString(),
        status: Status.NOT_STARTED,
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
}
