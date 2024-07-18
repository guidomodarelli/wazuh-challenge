import { UseCase } from '../../interfaces/UseCase';
import { TodoPort } from '../../ports/TodoPort';
import { TodoEntity, TodoEntityRequest } from '../entities/TodoEntity';

export class CreateTodoUseCase implements UseCase {
  constructor(private todoPort: TodoPort) {}

  async execute(data: TodoEntityRequest) {
    const todoEntity = new TodoEntity(data);
    return this.todoPort.save(todoEntity);
  }
}
