import { UseCase } from '../../interfaces/UseCase';
import { TodoPort } from '../../ports/TodoPort';

export class GetAllTodosUseCase implements UseCase {
  constructor(private todoPort: TodoPort) {}

  async execute() {
    return this.todoPort.findAll();
  }
}
