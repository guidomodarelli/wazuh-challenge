import { IRouter } from '../../../../src/core/server';
import { defineRouteBulkCreateNewTodos, defineRouteCreateNewTodo } from './create_new_todo';
import { defineRouteDeleteTodos } from './delete_todo';
import { defineRouteGetTodos } from './get_todos';
import { defineRouteUpdateTodo } from './update_todo';

export function defineRoutes(router: IRouter) {
  defineRouteCreateNewTodo(router);
  defineRouteBulkCreateNewTodos(router);
  defineRouteGetTodos(router);
  defineRouteUpdateTodo(router);
  defineRouteDeleteTodos(router);
}
