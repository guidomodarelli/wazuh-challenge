import { UseCase } from '../../interfaces/UseCase';
import { TodoPort } from '../../ports/TodoPort';
import { TodoEntityId } from '../entities/TodoEntity';

export class DeleteTodoByIdsUseCase implements UseCase {
  constructor(private todoPort: TodoPort) {}

  async execute(...todoIds: TodoEntityId[]) {
    return this.todoPort.deleteByIds(...todoIds);
  }
}
