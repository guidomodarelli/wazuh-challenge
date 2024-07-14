import { i18n } from '@osd/i18n';
import { CoreStart } from 'opensearch-dashboards/public';
import React, { createContext, useState } from 'react';
import { TodoItem } from '../../common/types';
import { Services } from '../services';
import { isError } from '../utils/is_error';

type CreateTodoItem = Omit<TodoItem, 'id' | 'status' | 'createdAt'>;

interface ToDoContextType {
  todoItems: TodoItem[];
  createTodo: (item: CreateTodoItem) => void;
  updateTodo: (itemToUpdate: TodoItem) => void;
  removeTodo: (itemToRemove: TodoItem) => void;
}

export const TodoContext = createContext<ToDoContextType>({
  todoItems: [],
  createTodo: () => null,
  updateTodo: () => null,
  removeTodo: () => null,
});

interface ToDoProviderProps {
  children?: React.ReactNode;
  notifications: CoreStart['notifications'];
  services: Services;
}

function ToDoProvider({
  children,
  notifications,
  services: { fetchTodos, createNewTodo },
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
    async createTodo(newTodoItem: CreateTodoItem) {
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
    updateTodo(itemToUpdate: TodoItem) {
      const newTodos = todoItems.map((previousTodo) => {
        if (previousTodo.id === itemToUpdate.id) {
          return {
            ...previousTodo,
            ...itemToUpdate,
          };
        }
        return previousTodo;
      });
      setTodoItems(newTodos);
    },
    removeTodo(itemToRemove: TodoItem) {
      setTodoItems(todoItems.filter((todo) => todo.id !== itemToRemove.id));
    },
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export default ToDoProvider;
