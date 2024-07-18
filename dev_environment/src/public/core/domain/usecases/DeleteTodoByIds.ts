import { TodoPort } from '../../ports/TodoPort';
import { TodoEntityId } from '../entities/TodoEntity';

export const deleteTodoByIdsUseCase = (todoPort: TodoPort) => (...todoIds: TodoEntityId[]) => {
  todoPort.deleteByIds(...todoIds);
};

export type DeleteTodoByIdsUseCase = ReturnType<typeof deleteTodoByIdsUseCase>;
