import { SERVER_TODO_ROUTE_PATH_EXAMPLE } from "../../common";
import { IRouter } from '../../../../src/core/server';

export function defineRoutes(router: IRouter) {
  router.get(
    {
      path: SERVER_TODO_ROUTE_PATH_EXAMPLE,
      validate: false,
    },
    async (context, request, response) => {
      return response.ok({
        body: {
          time: new Date().toISOString(),
        },
      });
    }
  );
}
