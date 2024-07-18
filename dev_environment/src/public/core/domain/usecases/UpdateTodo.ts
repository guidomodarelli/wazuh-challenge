import { TodoPort } from '../../ports/TodoPort';
import { TodoEntity, TodoEntityId } from '../entities/TodoEntity';

export class UpdateTodoUseCase {
  constructor(private todoPort: TodoPort) {}

  async execute(todoId: TodoEntityId, updatedTodo: TodoEntity) {
    return this.todoPort.update(todoId, updatedTodo);
  }
}
