import React, { createContext, useState } from 'react';
import { useOpenSearchDashboards } from '../../../../../src/plugins/opensearch_dashboards_react/public';
import { Status } from '../../core/domain/entities/Status';
import { TodoEntity, TodoEntityRequest } from '../../core/domain/entities/TodoEntity';
import { ToDoPluginServices } from '../../types';
import useTodoStore from '../hooks/useTodoStore.hook';

interface ToDoContextType {
  todoItems: TodoEntity[];
  filteredTodoItems: TodoEntity[];
  completedTodos: number;
  search: string;
  setSearch: (search: string) => void;
  createTodo: (item: TodoEntityRequest) => void;
  updateTodo: (itemIdToUpdate: string, itemToUpdate: TodoEntityRequest) => void;
  deleteTodosByIds: (...ids: string[]) => void;
  addSampleData: (fakes?: number) => void;
}

export const TodoContext = createContext<ToDoContextType>({
  todoItems: [],
  filteredTodoItems: [],
  completedTodos: 0,
  search: '',
  setSearch: () => null,
  createTodo: () => null,
  updateTodo: () => null,
  deleteTodosByIds: () => null,
  addSampleData: () => null,
});

export const useTodoContext = () => React.useContext(TodoContext);

interface ToDoProviderProps {
  children?: React.ReactNode;
}

function ToDoProvider({ children }: ToDoProviderProps) {
  const [search, setSearch] = useState('');
  const {
    services: {
      notifications,
      createTodo,
      getAllTodos,
      addSampleTodos,
      deleteTodosByIds,
      updateTodo,
      searchTodos,
      countTodosCompleted,
    },
  } = useOpenSearchDashboards<ToDoPluginServices>();
  const {
    todoItems,
    saveTodoInStore,
    updateTodoInStore,
    removeTodosInStore,
    addSampleDataInStore,
    setTodoItemsInStore,
  } = useTodoStore(notifications);

  React.useEffect(() => {
    getAllTodos()
      .then(setTodoItemsInStore)
      .catch(() => {});
  }, []);

  const value: ToDoContextType = {
    todoItems,
    filteredTodoItems: todoItems.filter(searchTodos(search)),
    completedTodos: countTodosCompleted(todoItems),
    search,
    setSearch,
    /* The `createTodo` function is responsible for creating a new todo item. */
    async createTodo(newTodoItem: TodoEntityRequest) {
      try {
        const newTodo = await createTodo(newTodoItem);
        saveTodoInStore(newTodo);
      } catch (error) {}
    },

    /* The `updateTodo` function is responsible for updating an existing todo item. */
    async updateTodo(itemIdToUpdate: string, updatedItem: TodoEntityRequest) {
      try {
        await updateTodo(itemIdToUpdate, updatedItem);
        updateTodoInStore(itemIdToUpdate, updatedItem);
      } catch (error) {}
    },

    /* The `deleteTodosByIds` function in the code snippet is responsible for deleting multiple todo items by their IDs.
     */
    async deleteTodosByIds(...ids) {
      try {
        await deleteTodosByIds(...ids);
        removeTodosInStore(...ids);
      } catch (error) {}
    },

    async addSampleData(fakes = 100) {
      try {
        const newTodos = await addSampleTodos(fakes);
        addSampleDataInStore(newTodos);
      } catch (error) {}
    },
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export default ToDoProvider;
