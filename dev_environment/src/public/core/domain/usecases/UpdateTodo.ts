import { TodoPort } from '../../ports/TodoPort';
import { TodoEntity, TodoEntityId } from '../entities/TodoEntity';

export const updateTodoUseCase = (todoPort: TodoPort) => (
  todoId: TodoEntityId,
  updatedTodo: TodoEntity
) => {
  return todoPort.update(todoId, updatedTodo);
};

export type UpdateTodoUseCase = ReturnType<typeof updateTodoUseCase>;
