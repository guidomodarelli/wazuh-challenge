import { TodoPort } from '../../ports/TodoPort';
import { TodoEntityId, TodoEntityRequest } from '../entities/TodoEntity';

export const updateTodoUseCase = (todoPort: TodoPort) => (
  todoId: TodoEntityId,
  updatedTodo: TodoEntityRequest
) => {
  return todoPort.update(todoId, updatedTodo);
};

export type UpdateTodoUseCase = ReturnType<typeof updateTodoUseCase>;
