import { UseCase } from '../../interfaces/UseCase';
import { TodoPort } from '../../ports/TodoPort';
import { TodoEntity, TodoEntityRequest } from '../entities/TodoEntity';

export class AddSampleTodosUseCase implements UseCase {
  constructor(private todoPort: TodoPort) {}

  async execute(todosRequest: TodoEntityRequest[]) {
    const newTodos = todosRequest.map((todoRequest) => new TodoEntity(todoRequest));
    return this.todoPort.saveAll(newTodos);
  }
}
