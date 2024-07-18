import { TodoEntity, TodoEntityId, TodoEntityRequest } from '../domain/entities/TodoEntity';

export interface TodoPort {
  findAll(): Promise<TodoEntity[]>;
  save(todo: TodoEntityRequest): Promise<TodoEntity>;
  saveAll(todos: TodoEntityRequest[]): Promise<TodoEntity[]>;
  update(todoId: TodoEntityId, updatedTodo: TodoEntity): Promise<void>;
  deleteByIds(...todoIds: TodoEntityId[]): Promise<void>;
}
