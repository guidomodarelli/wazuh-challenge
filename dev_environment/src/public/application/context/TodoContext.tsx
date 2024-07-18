import { i18n } from '@osd/i18n';
import React, { createContext, useState } from 'react';
import { useOpenSearchDashboards } from '../../../../../src/plugins/opensearch_dashboards_react/public';
import { Status } from '../../core/domain/entities/Status';
import { TodoEntity, TodoEntityRequest } from '../../core/domain/entities/TodoEntity';
import { ToDoPluginServices } from '../../types';

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
  const [todoItems, setTodoItems] = useState<TodoEntity[]>([]);
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
    },
  } = useOpenSearchDashboards<ToDoPluginServices>();

  const completedTodos = todoItems.reduce((previous, { status }) => {
    return status === Status.COMPLETED ? previous + 1 : previous;
  }, 0);

  React.useEffect(() => {
    getAllTodos()
      .then(setTodoItems)
      .catch(() => {});
  }, []);

  const value: ToDoContextType = {
    todoItems,
    filteredTodoItems: todoItems.filter(searchTodos(search)),
    completedTodos,
    search,
    setSearch,
    /* The `createTodo` function is responsible for creating a new todo item. */
    async createTodo(newTodoItem: TodoEntityRequest) {
      try {
        const response = await createTodo(newTodoItem);
        notifications.toasts.addSuccess(
          i18n.translate('todoPlugin.todoItemCreatedSuccessfully', {
            defaultMessage: 'Todo item successfully created',
          })
        );
        setTodoItems([response, ...todoItems]);
      } catch (error) {}
    },

    /* The `updateTodo` function is responsible for updating an existing todo item. */
    async updateTodo(itemIdToUpdate: string, updatedItem: TodoEntityRequest) {
      try {
        await updateTodo(itemIdToUpdate, updatedItem);
        notifications.toasts.addSuccess(
          i18n.translate('todoPlugin.todoItemUpdatedSuccessfully', {
            defaultMessage: 'Todo item updated successfully',
          })
        );
        const newTodos = todoItems.map((previousTodo) => {
          if (previousTodo.id === itemIdToUpdate) {
            return { ...previousTodo, ...updatedItem };
          }
          return previousTodo;
        });
        setTodoItems(newTodos);
      } catch (error) {}
    },

    /* The `deleteTodosByIds` function in the code snippet is responsible for deleting multiple todo items by their IDs.
     */
    async deleteTodosByIds(...ids) {
      try {
        await deleteTodosByIds(...ids);
        notifications.toasts.addSuccess(
          i18n.translate('todoPlugin.todoItemsDeletedSuccessfully', {
            defaultMessage: 'Todo items deleted successfully',
          })
        );
        setTodoItems(todoItems.filter((todo) => !ids.includes(todo.id)));
      } catch (error) {}
    },

    async addSampleData(fakes = 100) {
      try {
        const newTodos = await addSampleTodos(fakes);
        notifications.toasts.addSuccess(
          i18n.translate('todoPlugin.todoItemsCreatedSuccessfully', {
            defaultMessage: 'Todo items created successfully',
          })
        );
        setTodoItems([...newTodos, ...todoItems]);
      } catch (error) {}
    },
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export default ToDoProvider;
