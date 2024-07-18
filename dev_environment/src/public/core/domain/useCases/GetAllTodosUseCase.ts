import { TodoPort } from '../../ports/TodoPort';

export const getAllTodosUseCase = (todoPort: TodoPort) => () => {
  return todoPort.findAll();
};

export type GetAllTodosUseCase = ReturnType<typeof getAllTodosUseCase>;
