import { PartialRecordMock } from '../common/global-types';
import { useTodoContext } from '../public/context/TodoContext';

export function mockTodoContextFn(
  _jest: typeof jest
): PartialRecordMock<ReturnType<typeof useTodoContext>> {
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
