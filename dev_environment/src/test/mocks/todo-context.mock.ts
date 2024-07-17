import { useTodoContext } from "../../public/application/context/TodoContext";
import type { RecordMock } from './types';

export function mockTodoContextFn(
  _jest: typeof jest
): RecordMock<ReturnType<typeof useTodoContext>> {
  return {
    todoItems: [],
    filteredTodoItems: [],
    completedTodos: 0,
    search: '',
    setSearch: _jest.fn(),
    createTodo: _jest.fn(),
    updateTodo: _jest.fn(),
    deleteTodosByIds: _jest.fn(),
    addSampleData: _jest.fn(),
  };
}
