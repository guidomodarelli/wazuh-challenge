import { TodoPort } from '../../ports/TodoPort';
import { TodoEntity, TodoEntityRequest } from '../entities/TodoEntity';

export const createTodoUseCase = (todoPort: TodoPort) => (data: TodoEntityRequest) => {
  const todoEntity = new TodoEntity(data);
  return todoPort.save(todoEntity);
};

export type CreateTodoUseCase = ReturnType<typeof createTodoUseCase>;
