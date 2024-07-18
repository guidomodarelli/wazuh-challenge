import { TodoPort } from '../../ports/TodoPort';
import { Status } from '../entities/Status';
import { TodoEntity, TodoEntityId } from '../entities/TodoEntity';

export const markTodoAsCompletedUseCase = (todoPort: TodoPort) => (
  todoId: TodoEntityId,
  todoToComplete: TodoEntity
) => {
  todoToComplete.status = Status.COMPLETED;
  return todoPort.update(todoId, todoToComplete);
};

export type MarkTodoAsCompletedUseCase = ReturnType<typeof markTodoAsCompletedUseCase>;
