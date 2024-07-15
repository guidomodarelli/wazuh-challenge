export function mockTodoContextFn(jest: any) {
  return {
    todoItems: [],
    filteredTodoItems: [],
    search: '',
    setSearch: jest.fn(),
    createTodo: jest.fn(),
    updateTodo: jest.fn(),
    removeTodo: jest.fn(),
    deleteTodosByIds: jest.fn(),
    addSampleData: jest.fn(),
  };
}

