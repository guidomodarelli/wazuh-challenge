import { TodoPort } from '../../ports/TodoPort';
import { Status } from '../entities/Status';
import { TodoEntity, TodoEntityId } from '../entities/TodoEntity';

export class MarkTodoAsCompletedUseCase {
  constructor(private todoPort: TodoPort) {}

  async execute(todoId: TodoEntityId, todoToComplete: TodoEntity) {
    todoToComplete.status = Status.COMPLETED;
    return this.todoPort.update(todoId, todoToComplete);
  }
}
