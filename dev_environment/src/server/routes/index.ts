import { IRouter } from '../../../../src/core/server';
import { defineRouteCreateNewTodo } from './create_new_todo';
import { defineRouteDeleteTodo, defineRouteDeleteTodos } from './delete_todo';
import { defineRouteGetTodos } from './get_todos';
import { defineRouteUpdateTodo } from './update_todo';

export function defineRoutes(router: IRouter) {
  defineRouteCreateNewTodo(router);
  defineRouteGetTodos(router);
  defineRouteUpdateTodo(router);
  defineRouteDeleteTodo(router);
  defineRouteDeleteTodos(router);
}
