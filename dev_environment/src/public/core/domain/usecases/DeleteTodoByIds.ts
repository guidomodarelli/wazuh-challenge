import { TodoPort } from '../../ports/TodoPort';
import { TodoEntityId } from '../entities/TodoEntity';

export class DeleteTodoByIdsUseCase {
  constructor(private todoPort: TodoPort) {}

  async execute(...todoIds: TodoEntityId[]) {
    return this.todoPort.deleteByIds(...todoIds);
  }
}
