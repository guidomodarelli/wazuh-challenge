import { i18n } from '@osd/i18n';
import { CoreStart } from 'opensearch-dashboards/public';
import React, { createContext, useState } from 'react';
import { TodoItemRequest, TodoItem } from '../../common/types';
import { Services } from '../services';
import { isError } from '../utils/is_error';

interface ToDoContextType {
  todoItems: TodoItem[];
  createTodo: (item: TodoItemRequest) => void;
  updateTodo: (itemIdToUpdate: string, itemToUpdate: TodoItemRequest) => void;
  removeTodo: (todoId: TodoItem['id']) => void;
  deleteTodosByIds: (...ids: string[]) => void;
}

export const TodoContext = createContext<ToDoContextType>({
  todoItems: [],
  createTodo: () => null,
  updateTodo: () => null,
  removeTodo: () => null,
  deleteTodosByIds: () => null,
});

interface ToDoProviderProps {
  children?: React.ReactNode;
  notifications: CoreStart['notifications'];
  services: Services;
}

function ToDoProvider({
  children,
  notifications,
  services: { fetchTodos, createNewTodo, updateTodo, deleteTodo, deleteTodosByIds },
}: ToDoProviderProps) {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

  React.useEffect(() => {
    fetchTodos().then((response) => {
      if (isError(response)) {
        // TODO: Handle error
      } else {
        setTodoItems(response);
      }
    });
  }, []);

  const value: ToDoContextType = {
    todoItems,
    /* The `createTodo` function is responsible for creating a new todo item. */
    async createTodo(newTodoItem: TodoItemRequest) {
      const response = await createNewTodo(newTodoItem);
      if (isError(response)) {
        // TODO: Handle error
      } else {
        notifications.toasts.addSuccess(
          i18n.translate('todoPlugin.todoItemCreatedSuccessfully', {
            defaultMessage: 'Todo item successfully created',
          })
        );
        setTodoItems([response, ...todoItems]);
      }
    },

    /* The `updateTodo` function is responsible for updating an existing todo item. */
    async updateTodo(itemIdToUpdate: string, updatedItem: TodoItemRequest) {
      const response = await updateTodo(itemIdToUpdate, updatedItem);
      if (isError(response)) {
        // TODO: Handle Error
      } else {
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
      }
    },

    /* The `removeTodo` function is responsible for deleting a specific todo item from the list of todo items.  */
    async removeTodo(todoId: TodoItem['id']) {
      const response = await deleteTodo(todoId);
      if (isError(response)) {
        // TODO: Handle Error
      } else {
        notifications.toasts.addSuccess(
          i18n.translate('todoPlugin.todoItemDeletedSuccessfully', {
            defaultMessage: 'Todo item deleted successfully',
          })
        );
        setTodoItems(todoItems.filter((todo) => todo.id !== todoId));
      }
    },

    /* The `deleteTodosByIds` function in the code snippet is responsible for deleting multiple todo items by their IDs.
    */
    async deleteTodosByIds(...ids) {
      const response = await deleteTodosByIds(...ids);
      if (isError(response)) {
        // TODO: Handle Error
      } else {
        notifications.toasts.addSuccess(
          i18n.translate('todoPlugin.todoItemsDeletedSuccessfully', {
            defaultMessage: 'Todo items deleted successfully',
          })
        );
        setTodoItems(todoItems.filter((todo) => !ids.includes(todo.id)));
      }
    },
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export default ToDoProvider;
