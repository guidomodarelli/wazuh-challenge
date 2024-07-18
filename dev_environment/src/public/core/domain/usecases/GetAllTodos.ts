import { TodoPort } from '../../ports/TodoPort';

export class GetAllTodosUseCase {
  constructor(private todoPort: TodoPort) {}

  async execute() {
    return this.todoPort.findAll();
  }
}
