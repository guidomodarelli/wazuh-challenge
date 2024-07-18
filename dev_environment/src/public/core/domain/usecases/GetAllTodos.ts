import { TodoPort } from '../../ports/TodoPort';

export const getAllTodosUseCase = (todoPort: TodoPort) => () => {
  todoPort.findAll();
};

export type GetAllTodosUseCase = ReturnType<typeof getAllTodosUseCase>;
