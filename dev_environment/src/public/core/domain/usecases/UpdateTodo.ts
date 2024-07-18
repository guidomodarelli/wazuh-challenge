import { UseCase } from '../../interfaces/UseCase';
import { TodoPort } from '../../ports/TodoPort';
import { TodoEntity, TodoEntityId } from '../entities/TodoEntity';

export class UpdateTodoUseCase implements UseCase {
  constructor(private todoPort: TodoPort) {}

  async execute(todoId: TodoEntityId, updatedTodo: TodoEntity) {
    return this.todoPort.update(todoId, updatedTodo);
  }
}
