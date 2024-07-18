import { Status } from '../entities/Status';
import { TodoEntity } from '../entities/TodoEntity';

export const countTodosCompletedUseCase = () => (todoItems: TodoEntity[]) => {
  return todoItems.reduce((previous, { status }) => {
    return status === Status.COMPLETED ? previous + 1 : previous;
  }, 0);
};

export type CountTodosCompletedUseCase = ReturnType<typeof countTodosCompletedUseCase>;
