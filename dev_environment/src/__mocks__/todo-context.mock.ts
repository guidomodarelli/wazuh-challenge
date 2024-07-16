export function mockTodoContextFn(_jest: typeof jest) {
  return {
    todoItems: [],
    filteredTodoItems: [],
    completedTodos: 0,
    search: '',
    setSearch: _jest.fn(),
    createTodo: _jest.fn(),
    updateTodo: _jest.fn(),
    removeTodo: _jest.fn(),
    deleteTodosByIds: _jest.fn(),
    addSampleData: _jest.fn(),
  };
}

